import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { contactSchema, formatZodError } from "@/lib/validation";
import { mailConfigured, sendContactNotification } from "@/lib/mailer";
import { hubspotConfigured, upsertHubspotContact } from "@/lib/hubspot";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Solicitud no válida." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: formatZodError(parsed.error) }, { status: 422 });
  }

  const data = parsed.data;
  // Trampa anti-bot: respondemos 200 para no dar pistas al robot.
  if (data.website) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  let leadId: string | null = null;
  try {
    const lead = await prisma.contact.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        company: data.company || null,
        service: data.service || null,
        message: data.message,
        locale: data.locale,
        pageUrl: data.pageUrl || null,
        consent: data.consent,
      },
    });
    leadId = lead.id;
  } catch (err) {
    console.error("[contact] no se pudo guardar en la base de datos:", err);
    return NextResponse.json(
      { error: "No se ha podido registrar tu mensaje. Inténtalo de nuevo." },
      { status: 500 },
    );
  }

  const notification = {
    name: data.name,
    email: data.email,
    phone: data.phone,
    company: data.company,
    service: data.service,
    message: data.message,
    locale: data.locale,
    pageUrl: data.pageUrl,
  };

  // El correo y el CRM son avisos secundarios: si fallan, el lead ya esta
  // guardado y respondemos igualmente con exito.
  const [mail, hubspot] = await Promise.allSettled([
    mailConfigured()
      ? sendContactNotification(notification)
      : Promise.reject(new Error("SMTP no configurado")),
    hubspotConfigured()
      ? upsertHubspotContact(notification)
      : Promise.reject(new Error("HubSpot no configurado")),
  ]);

  const mailOk = mail.status === "fulfilled";
  const hubspotOk = hubspot.status === "fulfilled";
  if (!mailOk) console.error("[contact] correo no enviado:", mail.reason);
  if (!hubspotOk) console.error("[contact] HubSpot no actualizado:", hubspot.reason);

  if (leadId && (mailOk || hubspotOk)) {
    await prisma.contact
      .update({
        where: { id: leadId },
        data: {
          emailSentAt: mailOk ? new Date() : null,
          emailError: mailOk ? null : String(mail.reason).slice(0, 500),
          hubspotId: hubspotOk ? hubspot.value : null,
          hubspotSyncedAt: hubspotOk ? new Date() : null,
          hubspotError: hubspotOk ? null : String(hubspot.reason).slice(0, 500),
        },
      })
      .catch((err) => console.error("[contact] no se pudo actualizar el lead:", err));
  }

  return NextResponse.json({ ok: true, mail: mailOk, hubspot: hubspotOk });
}

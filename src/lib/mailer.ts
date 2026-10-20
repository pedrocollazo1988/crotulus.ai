import nodemailer, { type Transporter } from "nodemailer";

/**
 * Datos que necesita el correo de aviso. Es un subconjunto de la fila `Contact`
 * (no dependemos del modelo de Prisma para poder probar el envio aislado).
 */
export type NotificationPayload = {
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  service?: string | null;
  message: string;
  locale?: string | null;
  pageUrl?: string | null;
  createdAt?: Date;
};

const gmailish = (host: string) => /gmail|google/i.test(host);

export function mailConfigured(): boolean {
  return Boolean(process.env.MAIL_SMTP_PASS && process.env.CONTACT_EMAIL);
}

let cached: Transporter | null = null;

function transporter(): Transporter {
  if (cached) return cached;
  const host = process.env.MAIL_SMTP_HOST || "smtp.gmail.com";
  const port = Number(process.env.MAIL_SMTP_PORT || 465);
  cached = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user: process.env.MAIL_SMTP_USER || process.env.CONTACT_EMAIL,
      pass: process.env.MAIL_SMTP_PASS,
    },
    // Gmail exige el remitente exacto de la cuenta autenticada.
    ...(gmailish(host) ? { tls: { servername: host } } : {}),
  });
  return cached;
}

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const LOCALE_LABEL: Record<string, string> = {
  es: "Espanol",
  en: "Ingles",
  pt: "Portugues",
};

function row(label: string, value?: string | null) {
  if (!value) return "";
  return `<tr><td style="padding:6px 14px 6px 0;color:#617b96;font-size:13px;white-space:nowrap;vertical-align:top">${label}</td><td style="padding:6px 0;color:#073b70;font-size:14px">${esc(value)}</td></tr>`;
}

export function buildNotification(p: NotificationPayload) {
  const when = (p.createdAt ?? new Date()).toLocaleString("es-ES", {
    timeZone: "Europe/Madrid",
  });
  const subject = `Nuevo mensaje web · ${p.name}${p.company ? ` (${p.company})` : ""}`;
  const text = [
    "Nuevo mensaje desde el formulario de C-ROTULUS IA",
    "",
    `Nombre:   ${p.name}`,
    `Correo:   ${p.email}`,
    p.phone ? `Telefono: ${p.phone}` : "",
    p.company ? `Negocio:  ${p.company}` : "",
    p.service ? `Area:     ${p.service}` : "",
    p.locale ? `Idioma:   ${LOCALE_LABEL[p.locale] ?? p.locale}` : "",
    `Fecha:    ${when}`,
    p.pageUrl ? `Pagina:   ${p.pageUrl}` : "",
    "",
    "Mensaje:",
    p.message,
  ]
    .filter(Boolean)
    .join("\n");

  const html = `<!doctype html><html><body style="margin:0;background:#f6f8fa;font-family:Inter,Arial,sans-serif">
  <div style="max-width:600px;margin:0 auto;padding:28px 16px">
    <div style="background:#0B5A93;border-radius:14px 14px 0 0;padding:22px 26px">
      <div style="color:#fff;font-size:18px;font-weight:700;letter-spacing:-.3px">C-ROTULUS IA</div>
      <div style="color:#cfe6f7;font-size:12px;margin-top:3px">Nuevo mensaje desde la web</div>
    </div>
    <div style="background:#fff;border:1px solid #e3ecf3;border-top:0;border-radius:0 0 14px 14px;padding:24px 26px">
      <table style="border-collapse:collapse;width:100%">
        ${row("Nombre", p.name)}
        ${row("Correo", p.email)}
        ${row("Telefono", p.phone)}
        ${row("Negocio", p.company)}
        ${row("Area", p.service)}
        ${row("Idioma", p.locale ? LOCALE_LABEL[p.locale] ?? p.locale : null)}
        ${row("Fecha", when)}
        ${row("Pagina", p.pageUrl)}
      </table>
      <div style="margin-top:18px;padding-top:18px;border-top:1px solid #eef3f7">
        <div style="color:#617b96;font-size:13px;margin-bottom:6px">Mensaje</div>
        <div style="color:#073b70;font-size:15px;line-height:1.7;white-space:pre-wrap">${esc(p.message)}</div>
      </div>
      <a href="mailto:${esc(p.email)}" style="display:inline-block;margin-top:22px;background:#0B5A93;color:#fff;text-decoration:none;padding:11px 20px;border-radius:8px;font-size:14px;font-weight:600">Responder a ${esc(p.name)}</a>
    </div>
    <div style="color:#8fa3b5;font-size:11px;text-align:center;margin-top:14px">Este aviso se ha generado automaticamente desde crotulus.ai</div>
  </div></body></html>`;

  return { subject, text, html };
}

/** Envia el aviso al buzon de CONTACT_EMAIL. Lanza si el transporte falla. */
export async function sendContactNotification(p: NotificationPayload) {
  const to = process.env.CONTACT_EMAIL;
  if (!mailConfigured() || !to) {
    throw new Error("SMTP no configurado (falta MAIL_SMTP_PASS o CONTACT_EMAIL).");
  }
  const { subject, text, html } = buildNotification(p);
  const info = await transporter().sendMail({
    from: process.env.MAIL_FROM || `C-ROTULUS IA <${process.env.MAIL_SMTP_USER}>`,
    to,
    replyTo: p.email,
    subject,
    text,
    html,
  });
  return info.messageId as string;
}

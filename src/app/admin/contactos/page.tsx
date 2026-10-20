import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { adminEnabled, isAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contactos · Panel privado",
  robots: { index: false, follow: false },
};

const dateFmt = new Intl.DateTimeFormat("es-ES", {
  dateStyle: "short",
  timeStyle: "short",
  timeZone: "Europe/Madrid",
});

export default async function ContactosPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; ok?: string }>;
}) {
  if (!adminEnabled()) {
    return (
      <div className="admin">
        <div className="admin__card">
          <h1>Panel deshabilitado</h1>
          <p>
            Define la variable <code>ADMIN_PASSWORD</code> en el entorno para activar el panel de
            contactos.
          </p>
        </div>
      </div>
    );
  }

  if (!(await isAdmin())) {
    const { error } = await searchParams;
    return (
      <div className="admin">
        <form className="admin__card" method="post" action="/api/admin/login">
          <h1>Panel de contactos</h1>
          <p>Introduce la contraseña para ver los mensajes recibidos.</p>
          <label htmlFor="password">Contraseña</label>
          <input id="password" name="password" type="password" autoComplete="current-password" required />
          {error ? <p className="admin__error">Contraseña incorrecta.</p> : null}
          <button type="submit">Entrar</button>
        </form>
      </div>
    );
  }

  const contacts = await prisma.contact.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  return (
    <div className="admin admin--wide">
      <header className="admin__head">
        <div>
          <h1>Contactos recibidos</h1>
          <p>
            {contacts.length} {contacts.length === 1 ? "mensaje" : "mensajes"} (últimos 200).
          </p>
        </div>
        <form method="post" action="/api/admin/logout">
          <button type="submit">Salir</button>
        </form>
      </header>

      {contacts.length === 0 ? (
        <p className="admin__card">Todavía no hay mensajes.</p>
      ) : (
        <div className="admin__list">
          {contacts.map((c) => (
            <article key={c.id} className="admin__item">
              <div className="admin__item-head">
                <strong>{c.name}</strong>
                <span>{dateFmt.format(c.createdAt)}</span>
              </div>
              <div className="admin__meta">
                <a href={`mailto:${c.email}`}>{c.email}</a>
                {c.phone ? <span>{c.phone}</span> : null}
                {c.company ? <span>{c.company}</span> : null}
                {c.service ? <span>{c.service}</span> : null}
                <span className="admin__badge">{c.locale}</span>
                <span className="admin__badge">{c.status}</span>
                <span className={c.emailSentAt ? "admin__ok" : "admin__ko"}>
                  {c.emailSentAt ? "correo enviado" : "correo pendiente"}
                </span>
                <span className={c.hubspotId ? "admin__ok" : "admin__ko"}>
                  {c.hubspotId ? `HubSpot ${c.hubspotId}` : "sin CRM"}
                </span>
              </div>
              <p className="admin__msg">{c.message}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

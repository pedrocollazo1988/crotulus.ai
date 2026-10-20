/**
 * Cliente minimo de la API de HubSpot (CRM v3) para crear/actualizar contactos.
 * No usamos el SDK oficial para no anadir dependencias al bundle del servidor.
 *
 * Token: app privada con el scope `crm.objects.contacts.write`.
 * Docs: https://developers.hubspot.com/docs/api/crm/contacts
 */

// El host se puede sobrescribir para pruebas locales con un servidor falso.
const BASE = process.env.HUBSPOT_API_BASE || "https://api.hubapi.com";

export type HubspotContact = {
  email: string;
  name: string;
  phone?: string | null;
  company?: string | null;
  service?: string | null;
  message: string;
  locale?: string | null;
  pageUrl?: string | null;
};

export function hubspotConfigured(): boolean {
  return Boolean(process.env.HUBSPOT_TOKEN);
}

function splitName(full: string) {
  const parts = full.trim().split(/\s+/);
  if (parts.length === 1) return { firstname: parts[0] };
  return {
    firstname: parts[0],
    lastname: parts.slice(1).join(" "),
  };
}

function propertiesFor(c: HubspotContact): Record<string, string> {
  const { firstname, lastname } = splitName(c.name);
  const props: Record<string, string> = {
    email: c.email,
    firstname,
    hs_lead_status: "NEW",
    lifecyclestage: "lead",
    // Campos personalizados (los crea el propietario en HubSpot, ver README).
    area_de_interes: c.service || "Sin especificar",
    origen_del_mensaje: c.pageUrl || "web",
    idioma_preferido: c.locale || "es",
    detalle_del_reto: c.message.slice(0, 65000),
  };
  if (lastname) props.lastname = lastname;
  if (c.phone) props.phone = c.phone;
  if (c.company) props.company = c.company;
  return props;
}

async function call(path: string, init: RequestInit) {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${process.env.HUBSPOT_TOKEN}`,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
    cache: "no-store",
  });
  const body = await res.text();
  if (!res.ok) {
    throw new Error(`HubSpot ${res.status}: ${body.slice(0, 400)}`);
  }
  return body ? JSON.parse(body) : {};
}

/**
 * Crea el contacto o lo actualiza si el correo ya existe (409 + id).
 * Devuelve el id de HubSpot.
 */
export async function upsertHubspotContact(c: HubspotContact): Promise<string> {
  if (!hubspotConfigured()) throw new Error("HUBSPOT_TOKEN no configurado.");
  const properties = propertiesFor(c);
  try {
    const created = await call("/crm/v3/objects/contacts", {
      method: "POST",
      body: JSON.stringify({ properties }),
    });
    return String(created.id);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    // 409 = el contacto ya existe: recuperamos su id y lo actualizamos.
    if (!message.includes("409")) throw err;
    const existing = await call(
      `/crm/v3/objects/contacts/${encodeURIComponent(c.email)}?idProperty=email`,
      { method: "GET" },
    );
    const id = String(existing.id);
    await call(`/crm/v3/objects/contacts/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ properties }),
    });
    return id;
  }
}

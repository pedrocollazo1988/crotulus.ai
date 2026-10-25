/**
 * Cliente minimo de la API de HubSpot (CRM v3) para crear/actualizar contactos.
 */

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

  if (parts.length === 1) {
    return { firstname: parts[0] };
  }

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
  area_de_interes: c.service || "Sin especificar",
  origen_del_mensaje: c.pageUrl || "web",
  hs_language: c.locale || "es",
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

export async function upsertHubspotContact(
  c: HubspotContact,
): Promise<string> {
  if (!hubspotConfigured()) {
    throw new Error("HUBSPOT_TOKEN no configurado.");
  }

  const properties = propertiesFor(c);

  try {
    const created = await call("/crm/v3/objects/contacts", {
      method: "POST",
      body: JSON.stringify({ properties }),
    });

    return String(created.id);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);

    if (!message.includes("409")) {
      throw err;
    }

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

/**
 * Sincroniza el contacto y crea una oportunidad de venta en HubSpot.
 */
export async function upsertHubspotLeadWithDeal(
  c: HubspotContact,
): Promise<string> {
  const contactId = await upsertHubspotContact(c);

  const dealName = `Solicitud web - ${c.name} - ${c.email}`;

  const searchResult = await call("/crm/v3/objects/deals/search", {
    method: "POST",
    body: JSON.stringify({
      filterGroups: [
        {
          filters: [
            {
              propertyName: "dealname",
              operator: "EQ",
              value: dealName,
            },
          ],
        },
      ],
      properties: ["dealname", "pipeline", "dealstage"],
      limit: 1,
    }),
  });

  let dealId: string;

  if (searchResult.results?.length > 0) {
    dealId = String(searchResult.results[0].id);
  } else {
    const deal = await call("/crm/v3/objects/deals", {
      method: "POST",
      body: JSON.stringify({
        properties: {
          dealname: dealName,
          pipeline: "default",
          dealstage: "appointmentscheduled",
          description: [
            `Contacto: ${c.name}`,
            `Correo: ${c.email}`,
            `Empresa: ${c.company || "No especificada"}`,
            `Servicio: ${c.service || "Sin especificar"}`,
            `Mensaje: ${c.message}`,
            `Página de origen: ${c.pageUrl || "web"}`,
          ].join("\n"),
        },
      }),
    });

    dealId = String(deal.id);
  }

  await call(
    `/crm/v4/objects/deals/${dealId}/associations/contacts/${contactId}`,
    {
      method: "PUT",
      body: JSON.stringify([
        {
          associationCategory: "HUBSPOT_DEFINED",
          associationTypeId: 3,
        },
      ]),
    },
  );

  return contactId;
}

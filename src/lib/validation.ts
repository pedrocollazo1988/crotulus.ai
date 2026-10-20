import { z } from "zod";

/**
 * Valores canonicos de "Donde necesitas ayuda?". Se guardan tal cual en la base
 * de datos y en HubSpot (`area_de_interes`), asi que NO deben cambiar de idioma:
 * el desplegable muestra la traduccion, pero el valor enviado es este.
 * El orden se corresponde con `dict.contact.serviceOptions`.
 */
export const CONTACT_SERVICES = [
  "Agentes de IA para atención al cliente",
  "Agentes de IA para captar clientes y solicitudes de citas",
  "Automatización de tareas administrativas",
  "Automatización del seguimiento comercial",
  "Integración de agentes de IA con hojas de cálculo y CRM",
] as const;

export type ContactService = (typeof CONTACT_SERVICES)[number];

/** Valida un valor recibido desde el cliente contra la lista canonica. */
export function isContactService(value: string): value is ContactService {
  return (CONTACT_SERVICES as readonly string[]).includes(value);
}

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Escribe tu nombre.")
    .max(120, "El nombre es demasiado largo."),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Revisa el correo electrónico."),
  phone: z
    .string()
    .trim()
    .max(40, "El teléfono es demasiado largo.")
    .optional()
    .or(z.literal("")),
  company: z
    .string()
    .trim()
    .max(160, "El nombre del negocio es demasiado largo.")
    .optional()
    .or(z.literal("")),
  // El servicio debe ser uno de los canonicos; si no viene, queda vacio.
  service: z
    .string()
    .trim()
    .optional()
    .or(z.literal(""))
    .refine((v) => !v || isContactService(v), "Elige un servicio de la lista."),
  message: z
    .string()
    .trim()
    .min(10, "Cuéntanos un poco más (10 caracteres como mínimo).")
    .max(4000, "El mensaje es demasiado largo."),
  consent: z
    .union([z.boolean(), z.literal("on"), z.literal("true")])
    .transform((v) => v === true || v === "on" || v === "true"),
  locale: z.enum(["es", "en", "pt"]).default("es"),
  pageUrl: z.string().trim().max(400).optional().or(z.literal("")),
  // Campo trampa: si un bot lo rellena, descartamos el envio.
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;

export function formatZodError(error: z.ZodError): string {
  return error.issues[0]?.message ?? "Revisa los datos del formulario.";
}

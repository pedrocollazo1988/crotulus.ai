import { z } from "zod";

export const CONTACT_SERVICES = [
  "Atención al cliente",
  "Ventas y seguimiento",
  "Operaciones internas",
  "Quiero explorar mi caso",
] as const;

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
  service: z
    .string()
    .trim()
    .max(80)
    .optional()
    .or(z.literal("")),
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

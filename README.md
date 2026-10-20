# crotulus.ai

Web corporativa de **C-ROTULUS S.U.R.L.** (agencia de IA), construida con
Next.js (App Router), Prisma y PostgreSQL. Pensada para desplegarse en **Vercel**
con base de datos **Neon**.

## Qué incluye

- **Portada** con hero, retos, soluciones (con simulaciones interactivas), cómo
  trabajamos, testimonios, preguntas frecuentes y llamada a la acción.
- **Página de Equipo** (`/equipo`) con datos leídos de la base de datos. El
  puesto y la biografía de cada persona se traducen (`roleEn`/`bioEn`,
  `rolePt`/`bioPt`); si falta la traducción se muestra el texto en español.
- **Buscador en la cabecera** (⌘/Ctrl + K) que indexa páginas, secciones, el
  equipo y las preguntas frecuentes.
- **Selector de idioma con banderas**: español (ES), inglés (EN) y portugués (PT).
  La preferencia se guarda en la cookie `crotulus_lang`.
- **Modo noche** con memoria en `localStorage` (`crotulus_theme`) y detección de
  la preferencia del sistema.
- **Formulario de contacto** que guarda el mensaje en PostgreSQL, lo replica en
  **HubSpot CRM** y envía un **correo de aviso** a `crotulus.mipyme@gmail.com`.
- **Panel privado de contactos** en `/admin/contactos` (protegido con contraseña)
  para consultar los mensajes recibidos.

## Puesta en marcha en local

```bash
npm install
cp .env.example .env.local     # rellena las variables (ver abajo)
npx prisma db push             # crea las tablas
npm run db:seed                # carga el equipo inicial (opcional)
npm run dev                    # http://localhost:3000
```

Necesitas un PostgreSQL en marcha. En local sirve cualquiera
(`postgresql://usuario:clave@127.0.0.1:5432/crotulus`); en producción usa Neon.

## Variables de entorno

Están documentadas en `.env.example`. Las imprescindibles:

| Variable | Para qué sirve |
| --- | --- |
| `DATABASE_URL` | Conexión con *pooling* que usa la web (Neon). |
| `DIRECT_URL` | Conexión directa que usan las migraciones (`prisma db push`). |
| `NEXT_PUBLIC_SITE_URL` | Dominio público (`https://crotulus.ai`). |
| `CONTACT_EMAIL` | Buzón que recibe los avisos (`crotulus.mipyme@gmail.com`). |
| `MAIL_SMTP_*` | Servidor SMTP de salida. Con Gmail hace falta una **contraseña de aplicación**. |
| `HUBSPOT_TOKEN` | Token de app privada de HubSpot (escritura de contactos). |
| `ADMIN_PASSWORD` | Contraseña del panel `/admin/contactos`. Si está vacía, el panel queda desactivado. |

El correo y HubSpot son avisos **secundarios**: si fallan, el mensaje ya está
guardado en la base de datos y el usuario ve la confirmación igualmente.

### Contraseña de aplicación de Gmail

1. Activa la verificación en dos pasos en la cuenta de Google.
2. Entra en <https://myaccount.google.com/apppasswords> y crea una contraseña
   para "Correo".
3. Pega los 16 caracteres en `MAIL_SMTP_PASS`.

### HubSpot

1. En HubSpot: **Configuración → Integraciones → Apps privadas**.
2. Crea una app con el permiso `crm.objects.contacts.write` (y `read`).
3. Copia el token en `HUBSPOT_TOKEN`.

## Despliegue en Vercel

1. Sube el repositorio a GitHub y conéctalo en Vercel (**Add New → Project**).
2. Vercel detecta Next.js solo. No hay que cambiar *Build Command* ni
   *Output Directory* (`npm run build` ya ejecuta `prisma generate`).
3. En **Settings → Environment Variables** añade todas las variables de
   `.env.example` (con los valores reales) para *Production*, *Preview* y
   *Development*.
4. Crea la base de datos en **Neon** y copia sus dos cadenas de conexión en
   `DATABASE_URL` (con `-pooler`) y `DIRECT_URL` (sin `-pooler`).
5. Despliega. Después, desde tu equipo, crea las tablas una vez:

   ```bash
   npx prisma db push
   npm run db:seed
   ```

   (con `DATABASE_URL`/`DIRECT_URL` de producción en el entorno).

## Dominio en Namecheap

En Vercel, **Settings → Domains → Add**, escribe `crotulus.ai` y añade también
`www.crotulus.ai` (Vercel te dará la redirección a la versión principal).

Después, en Namecheap (**Domain List → Manage → Advanced DNS**), borra los
registros por defecto y crea:

| Tipo | Host | Valor |
| --- | --- | --- |
| `A` | `@` | `76.76.21.21` |
| `CNAME` | `www` | `cname.vercel-dns.com` |

La propagación suele tardar entre 10 minutos y unas horas. Vercel emite el
certificado HTTPS automáticamente cuando detecta los registros.

## Comandos útiles

```bash
npm run dev        # servidor de desarrollo
npm run build      # compilación de producción
npm run typecheck  # comprobación de tipos
npm run db:push    # sincroniza el esquema con la base de datos
npm run db:seed    # carga el equipo inicial
npm run db:studio  # interfaz visual de la base de datos
```

## Estructura

```
prisma/schema.prisma        modelos TeamMember y Contact
src/app/                    páginas y rutas de API (App Router)
src/components/             cabecera, pie, buscador, formulario, modo noche...
src/i18n/                   diccionarios es/en/pt
src/lib/                    prisma, correo, HubSpot, validación, utilidades
```

# Memoria del proyecto C-ROTULUS IA

Sitio corporativo de C-ROTULUS S.U.R.L. **reescrito desde cero** en
`/workspace/project/crotulus.ai` (repo `pedrocollazo1988/crotulus.ai`, rama de
trabajo `dev_plca_ai`). El proyecto PHP anterior + `legacy/` esta en
`legacy-crotulus-php.md`: **no aplica** a este codigo (solo contexto historico).
El detalle largo de cada sesion esta en los ficheros `2026-*.md` de esta carpeta.

## Stack y rutas
- **Next.js 16.4.2 (Turbopack) + Prisma 6.19.3 + PostgreSQL 17**. Todo el sitio
  son Server Components.
- Rutas: `/`, `/equipo`, `/admin/contactos`, `/api/contact`, `/api/admin/login`,
  `/api/admin/logout`, `/sitemap.xml`, `not-found.tsx`.
- **Antes de tocar codigo de Next, leer `node_modules/next/dist/docs/`** (lo pide
  el propio `AGENTS.md`): esta version difiere de lo habitual.

## Estado actual (2026-10-20)
- `dev_plca_ai` = `21be2d5`, **subida a GitHub**; preview Vercel OK. Va 13 commits
  por delante de `main` (`cc8ee6e`): **falta unirla**.
- Produccion = `crotulusai.vercel.app` (despliega sola al empujar a `main`).
- Verificado: `next build` OK, 0 desbordes en 1440/1080/860/390, contraste AA en
  claro y noche, formulario end-to-end (BD + correo + HubSpot con servidores
  falsos locales).

## Requisitos del propietario (los 4 que pidio)
1. Pagina de **Equipo**.
2. **Buscador** en la barra (⌘/Ctrl+K o `/`; indice de paginas, secciones, equipo
   y FAQ; flechas + Enter; Escape devuelve el foco al boton).
3. **Selector de idiomas** es/en/pt (cookie `crotulus_lang`).
4. **Modo noche** (`localStorage["crotulus_theme"]`, sin destello al cargar).
Ademas: contactos -> BD + HubSpot + correo; despliegue en Vercel.

## Equipo: fotos reales y seccion en la portada (commit `c4aa47d`)
- **`src/lib/team.ts` es la FUENTE DE VERDAD del equipo, en codigo**; ya NO lee de
  Prisma. Motivo: la BD de produccion seguia sirviendo los 3 miembros de ejemplo
  (`Pedro Collazo`, `Equipo de agentes`, `Acompanamiento`) y no hay acceso a esa
  BD. `prisma/seed.ts` si quedo actualizado al equipo real, por si se ejecuta.
  **Editar el equipo = editar `src/lib/team.ts`.**
- **Roles**: Pedro = CEO; Olga, Rogelio y Manuel = Especialista en IA. Nombres
  completos en `public/team/*.jpg` (retrato 4:5, 800x1000, recortado con **YuNet**
  y brillo normalizado; la de Pedro venia mucho mas oscura).
- **Seccion `#equipo`** en la portada (`src/components/team-section.tsx`),
  rejilla 4 columnas con foto 4:5. Menu, pie y buscador apuntan a `/#equipo`.
- **Contraste**: en noche el puesto sobre la tarjeta daba 4.03:1 (bajo AA); ahora
  usa `--electric` = 4.85:1.

## Logotipo y paleta
- Marca real: cuadrado azul `#136493` redondeado con "C" blanca abierta y punto
  turquesa `#5FA8C9`. SVG en `src/components/brand-logo.tsx` (cabecera = lockup,
  pie = con tagline); `public/favicon.svg|png` + `apple-touch-icon.png`.
- Regla del propietario: **nada de negro**; azul + gris/blanco. Logo transparente.
- En noche los azules casi negros suben a azul-gris (contraste AA conservado).
- `IconSpark` sigue usandose como adorno en hero y demos: es correcto, solo
  cambio el LOGOTIPO.

## Widget de chat + boton "volver arriba"
- Widget de terceros (CreatuAgente) cargado con `next/script` desde
  `src/components/chat-widget.tsx`; URL en `SITE.chatWidget`
  (`NEXT_PUBLIC_CHAT_WIDGET_URL`, vacio = no se carga). Inyecta el suyo propio:
  boton `#ab-widget-btn` y panel `#ab-widget-panel`, con su azul `#3b82f6` (no se
  puede sobreescribir). Ya en `main` (`48a6eed`) y en produccion.
- `.to-top` (`src/components/to-top.tsx`): aparece >600px, `bottom: 96px`,
  `z-index: 45`, 12px por encima del boton del chat. Contraste AA.

## Trampas costosas (repetirlas cuesta tiempo)
- **Token y permisos de GitHub**: el campo `permissions.push` de
  `GET /repos/{o}/{r}` es el rol del **USUARIO**, no del token. Prueba buena:
  `POST /git/refs` (403 = no escribe) o la cabecera `x-accepted-github-permissions`.
  Un PAT fine-grained puede **leer todo y no escribir nada** (nos paso: fallaba
  `contents=write` y `issues=write` en los DOS repos; el fallo estaba en el
  token, no en el repo). El repo es **publico**: `git ls-remote` funciona SIN
  token y no prueba nada.
- **Push**: pasar el token explicito en la URL
  (`git push https://x-access-token:$TOKEN@github.com/OWNER/REPO.git rama:rama`);
  asi no queda guardado en `.git/config`. **Recordar al propietario revocarlo**.
- **El clon es SUPERFICIAL** y su `remote.origin.fetch` es no estandar (solo mapea
  `dev_plca_ai`): `git fetch origin` **no refresca `origin/main`**. Refrescar a
  mano: `git fetch origin main:refs/remotes/origin/main --force`.
- **Codificacion**: escribir SIEMPRE en UTF-8. Un `MEMORY.md` en latin-1 provoco
  un conflicto en todo el fichero al fusionar.
- **`next start` viejo se queda en el puerto** y `curl` sigue sirviendo el build
  antiguo: matar el proceso anterior antes de reiniciar.
- **Verificacion headless**: Chromium (`/usr/bin/chromium`) + CDP por WebSocket
  (Node trae `WebSocket` global; **no** hay playwright/puppeteer). Trampas:
  `Page.captureScreenshot` con `clip` usa coordenadas de **pagina**, no de
  ventana; `scrollIntoView` con `scroll-behavior: smooth` no termina a tiempo;
  tras `click()` hay que esperar 600-900 ms o React aun no ha repintado; asignar
  `input.value = x` a secas NO dispara React (usar el setter nativo + evento
  `input`). Scripts en `.agent_tmp/` (ignorado por git).
- **Formulario**: el correo y HubSpot son avisos secundarios; si fallan, el lead
  ya esta guardado. `mailConfigured()` exige `MAIL_SMTP_PASS` + `CONTACT_EMAIL`.
  Con Gmail hace falta **contrasena de aplicacion**. HubSpot necesita 4
  propiedades personalizadas creadas a mano (`area_de_interes`,
  `origen_del_mensaje`, `idioma_preferido`, `detalle_del_reto`); si no existen, la
  API da 400 y el contacto NO se crea.
- **`ADMIN_PASSWORD` vacia = panel desactivado** (muestra "Panel deshabilitado").
- **Pruebas de integracion sin servicios reales**: `.agent_tmp/fake-hubspot.mjs`
  levanta SMTP (2525) y HubSpot (4599) falsos. El SMTP **exige `onAuth`**. Borrar
  los leads de prueba (`delete from "Contact";`) al terminar.

## Reglas de trabajo
- **Escribir y explicar SIEMPRE en espanol** (peticion expresa del propietario).
- **No borrar NADA ni fusionar NINGUNA PR sin pedirle permiso antes.** Fusionar no
  implica limpiar ramas. Ante la duda, preguntar. (Se incumplio una vez y molesto.)
- **La rama de trabajo es `dev_plca_ai`, NO `main`**: commitear alli, empujar, y
  solo despues llevar el trabajo a `main`. Mirar `git branch --show-current` antes
  de empujar.
- `.env.local` no se versiona; `.env.example` si (plantilla sin secretos).
- `AGENTS.md` lo regenera `next dev`: commitearlo con el trabajo.

## Pendiente / seguimiento
- **El dominio propio queda APARCADO** (decision del propietario: "no lo voy a
  hacer ahora"). **No volver a proponerlo.** Dato objetivo por si se retoma:
  `crotulus.ai` NO esta registrado (RDAP `.ai` -> 404). Los pasos de Namecheap
  (Vercel: `A @ -> 76.76.21.21`, `CNAME www -> cname.vercel-dns.com`) estan en el
  README, sin ejecutar.
- **En Vercel falta configurar** (unico bloqueante real): Neon (`DATABASE_URL` con
  `-pooler`, `DIRECT_URL` sin pooling), `NEXT_PUBLIC_SITE_URL`, SMTP de Gmail
  (`MAIL_SMTP_PASS`), `HUBSPOT_TOKEN` y `ADMIN_PASSWORD`. Despues, una vez:
  `npx prisma db push` + `npm run db:seed`.
- **HubSpot**: crear antes las 4 propiedades personalizadas (ver arriba).
- **`dev_plca_ai` va por delante de `main`**: hay que unirla (con permiso del
  propietario). Commits clave sin fusionar: `36e93f5` (redes sociales y
  WhatsApp), `d1b5fda` (seccion Servicios), `c4aa47d` (equipo + fotos),
  `bbee958` (contraste); `48a6eed` (widget) ya esta en `main`.
- **Contacto/redes**: `SITE` (`src/lib/site.ts`) es la fuente unica. WhatsApp
  del propietario **+5359888821** (10 digitos, Cuba) y redes
  Instagram/Facebook; se muestran en pie, banda CTA y dialogo de contacto
  (componente `social-links.tsx`). Detalle en `2026-10-20.md`.
- El dominio de la maqueta que dio el propietario
  (`c-rotulus-ia.qvafunded.chatgpt.site`) es solo referencia de diseno.

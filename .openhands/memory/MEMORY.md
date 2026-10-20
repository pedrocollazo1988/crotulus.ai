# Memoria del proyecto C-ROTULUS IA

Sitio corporativo de C-ROTULUS S.U.R.L. **reescrito desde cero** en
`/workspace/project/crotulus.ai` (repo `pedrocollazo1988/crotulus.ai`, rama de
trabajo `dev_plca_ai`). La memoria anterior (proyecto PHP + `legacy/`) se guarda
en `legacy-crotulus-php.md`: **no aplica** a este código, pero sirve de contexto
histórico (misma empresa, mismo dominio).

## Stack y estado (2026-10-20)
- **Next.js 16.4.2 (Turbopack) + Prisma 6.19.3 + PostgreSQL 17**. Todo el sitio
  son Server Components; el HTML del repo anterior ya no se usa.
- Rutas: `/` (portada), `/equipo`, `/admin/contactos`, `/api/contact`,
  `/api/admin/login`, `/api/admin/logout`, `/sitemap.xml`, `not-found.tsx`.
- Verificado: `next build` OK, 0 desbordes horizontales en 1440/1024/768/390,
  0 fallos de contraste AA (19 comprobaciones × home claro/oscuro/equipo),
  formulario end-to-end (BD + correo + HubSpot con servidores falsos locales).

## Requisitos del propietario (los 4 que pidió)
1. Página de **Equipo** (datos en BD, no en el HTML).
2. **Buscador** en la barra principal (⌘/Ctrl+K o `/`, índice de páginas,
   secciones, equipo y FAQ; flechas + Enter; Escape devuelve el foco al botón).
3. **Selector de idiomas con banderas** es/en/pt (cookie `crotulus_lang`).
4. **Modo noche** (`localStorage["crotulus_theme"]`, sin destello al cargar).
Además: contactos → **BD + HubSpot + correo** a `crotulus.mipyme@gmail.com`;
tecnología desplegable en **Vercel** con dominio de **Namecheap**.

## Trampas aprendidas (costosas)
- **El correo y HubSpot son avisos secundarios**: si fallan, el lead ya está
  guardado y el usuario ve "¡Gracias!". `mailConfigured()` exige
  `MAIL_SMTP_PASS` + `CONTACT_EMAIL`; sin ellos el aviso no sale (silencioso).
  Comprobar `emailSentAt`/`hubspotId` de la fila `Contact` o el panel.
- **Con Gmail hay que usar contraseña de aplicación**; `MAIL_SMTP_USER` es la
  cuenta autenticada y `MAIL_FROM` debe coincidir con ella.
- **Traducción de datos de la BD**: los textos del equipo viven en la tabla
  (`role`/`bio` en español + `roleEn`/`bioEn`/`rolePt`/`bioPt` opcionales).
  `getTeamMembers(locale)` hace el respaldo al español; el **nombre propio no se
  traduce**. El seed rellena las traducciones que falten sin duplicar filas.
- **`ADMIN_PASSWORD` vacía = panel desactivado** (404). La sesión es una cookie
  `httpOnly` firmada con HMAC; no hay tabla de usuarios.
- **Pruebas de integración sin servicios reales**: `.agent_tmp/fake-hubspot.mjs`
  levanta SMTP (2525) y HubSpot (4599) falsos. El SMTP **exige `onAuth`**
  (nodemailer falla con `535 Authentication not implemented`) y el script se
  autocierra, así que hay que relanzarlo antes de cada prueba.
- **Al probar integraciones, apuntar `.env.local` a los servidores falsos y
  restaurarlo después** (`MAIL_SMTP_HOST/PORT/PASS`, `HUBSPOT_TOKEN`,
  `HUBSPOT_API_BASE`). Y borrar las filas de prueba: `delete from "Contact";`.
- **Prueba de UI headless**: Chromium (`/usr/bin/chromium`) + CDP por Node
  (WebSocket nativo). **No leer el DOM justo después de `click()`**: React aún no
  ha repintado. Esperar ~600-900 ms y volver a evaluar. Selectores reales:
  `.tab`, `[role=tabpanel]`, `.search__item[data-active="true"]`,
  `.nav__links .button` (el CTA vive ahí, ya no hay `.nav__cta`).
- **`check-ui.mjs` y demás scripts en `.agent_tmp/`** (ignorado) usan selectores
  que cambian con el código; si un script falla con
  `Cannot read properties of null`, revisar el selector antes de sospechar del
  sitio.

## Reglas de trabajo
- **Escribir y explicar SIEMPRE en español** (petición expresa del propietario).
- `.env.local` es local y no se versiona; `.env.example` sí (plantilla sin
  secretos) y `!.env.example` está en `.gitignore`.
- `AGENTS.md` lo regenera `next dev` (bloque `BEGIN:nextjs-agent-rules`); se
  commitea con el trabajo para no dejar el árbol sucio.

## Credenciales de GitHub: SOLO LECTURA (2026-10-20)
- **El push NO es posible desde este entorno.** Los tres tokens disponibles
  (`GITHUB_TOKEN`, `allhands` y el guardado en la URL de `origin`) pertenecen a
  `pedrocollazo1988` pero **solo tienen lectura**: la API responde
  `403 Resource not accessible by integration` / `... by personal access token`
  al crear una ref, y el push HTTPS da `Permission to ... denied`. `create_pr`
  tambien da 403.
- `x-oauth-scopes` viene **vacio** en `GITHUB_TOKEN` (no es un PAT clasico con
  `repo`), y el fine-grained (`allhands`, 93 caracteres) no incluye Contents:write.
- No hay `~/.ssh` (ni binario `ssh`), ni `~/.netrc`, ni `gh auth` utilizable.
- La lectura si funciona: `git ls-remote` devuelve `main` y `dev_plca_ai`, ambas
  en `529f175` (Initial commit).
- El commit `02b5975` esta **listo en local** (50 ficheros, +7019 lineas). Para
  subirlo hace falta que el propietario aporte un token con `Contents: write`
  (o ejecute el push/PR el mismo).

## Pendiente / seguimiento
- **Nada commiteado todavía** en `dev_plca_ai` (solo `529f175 Initial commit` con
  el README). Falta commit + push/PR.
- **En Vercel hay que configurar**: Neon (`DATABASE_URL` con `-pooler`,
  `DIRECT_URL` sin pooling), `NEXT_PUBLIC_SITE_URL`, SMTP de Gmail, `HUBSPOT_TOKEN`
  y `ADMIN_PASSWORD`. Después, una vez: `npx prisma db push` + `npm run db:seed`.
- **Namecheap**: `A @ → 76.76.21.21` y `CNAME www → cname.vercel-dns.com`.
- El dominio de la maqueta que dio el propietario
  (`c-rotulus-ia.qvafunded.chatgpt.site`) es solo referencia de diseño.

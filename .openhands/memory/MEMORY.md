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


## Logotipo de marca (2026-10-20)
- **La marca real** (recuperada del sitio viejo, que NO est� en este repo) es un
  cuadrado azul redondeado con una **"C" blanca abierta a la derecha** y un
  **punto turquesa** dentro. Colores oficiales: azul `#136493`, turquesa
  `#5FA8C9`, blanco. Antes el sitio Next usaba un icono de chispa gen�rico
  (`IconSpark`, estrella de 4 puntas con degradado `#1689ed`->`#004f92`): era
  provisional y **no** era la marca.
- **Fuente de verdad vectorial**: `.agent_tmp/old-favicon.svg` del sitio viejo
  (`viewBox 0 0 64 64`, `rect rx=14 fill #136493`, `path M40 16 A17 17 0 1 0 40 48
  stroke #fff width 7`, `circle cx24 cy32 r3.2 fill #5FA8C9`). Coincide con el
  apple-touch-icon 180x180 oficial (comparado pixel a pixel, 99% igual).
- **Como se aplico**: nuevo `src/components/brand-mark.tsx` (trazo con
  `currentColor`, punto turquesa) sustituye a `IconSpark` en cabecera
  (`site-header.tsx`) y pie (`site-footer.tsx`); `.brand__mark` en `globals.css`
  pasa a fondo plano `#136493` (antes degradado). `public/favicon.svg` es el SVG
  oficial; se anaden `public/favicon.png` (64) y `public/apple-touch-icon.png`
  (180), declarados en `metadata.icons` de `src/app/layout.tsx`.
- **Ojo**: `IconSpark` SIGUE usandose como icono decorativo en el hero y en el
  panel de demos (`home-top.tsx`, `solutions-demo.tsx` tiene su copia local). Eso
  es correcto: solo el LOGOTIPO debia cambiar.
- **Contraste**: "C" blanca sobre `#136493` = 6.42:1 (AA/AAA texto normal). El
  punto turquesa sobre azul da 2.42:1, pero es un adorno grafico (no texto), asi
  que no aplica el minimo AA.
- **Defecto extra corregido**: el nombre y el subtitulo del logotipo estaban
  **fijos en espa�ol** en cabecera y pie. Ahora salen del diccionario con la
  clave nueva `brand: { name, sub }` (`es.ts` fuente de verdad; `en.ts` y `pt.ts`
  obligadas por el tipo `Dict`). Verificado: es / en / pt.
- **Trampa al verificar**: `next start` viejo se queda escuchando en el puerto y
  `curl` sigue sirviendo el build antiguo. Matar SIEMPRE el proceso anterior
  (`ss -ltnp | grep :3111`) antes de reiniciar; si no, se ven cambios "que no
  aparecen".
- **Estado del logo**: commit local `748352a` en `dev_plca_ai`. **NO subido**:
  los dos tokens disponibles (`GITHUB_TOKEN` y `allhands`) dan **403 al escribir**
  en `pedrocollazo1988/crotulus.ai` (solo lectura; `git ls-remote` funciona, el
  `push` no). Hace falta un token nuevo con permiso `Contents: write`.

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

## Push y PR (2026-10-20)
- **Subido**: rama `dev_plca_ai` en `00aedeb` -> **PR #1** (borrador)
  https://github.com/pedrocollazo1988/crotulus.ai/pull/1
  (2 commits, 50 ficheros, +7035/-1). Base `main` (`529f175`).
- **El token `GITHUB_TOKEN` del entorno y el de `origin` son de SOLO LECTURA**
  (`403 Resource not accessible by integration`; `x-oauth-scopes` vacio; el
  fine-grained `allhands` tampoco vale). **El push falla con esos dos.**
- El **propietario aporto un fine-grained PAT** con `Contents: write` +
  `Pull requests: write`; con ese token el push y la creacion de la PR funcionan.
  **`create_pr` (herramienta) NO lo usa**: sigue leyendo `GITHUB_TOKEN` y da 403.
  Hay que crear la PR por API con `urllib`/`curl` pasando el token nuevo.
- `main` tiene proteccion de rama: `mergeable_state` sale `unstable`; **no
  fusionar sin permiso del propietario**.
- Vercel construye solo: check `Vercel Preview Comments` -> `success` en ~30 s.
  El preview (`crotulusai-git-devplcaai-pedrocollazo1988.vercel.app`) sale **302 a
  `vercel.com/sso-api`** por Vercel Authentication: hace falta un *Protection
  Bypass* (`?x-vercel-protection-bypass=<secreto>`) para probarlo desde fuera.
## Variables de entorno para Vercel y trampa de HubSpot (2026-10-20)
- Las de `.env.local` **NO sirven en Vercel**: `DATABASE_URL`/`DIRECT_URL` apuntan
  a `127.0.0.1:5432` (Postgres local). Hay que crear un Neon y usar sus cadenas
  (una con `-pooler` para la app, otra directa para `prisma db push`).
- Vacias en local y necesarias en produccion: `MAIL_SMTP_PASS` (contrasena de
  aplicacion de Gmail, 16 caracteres) y `HUBSPOT_TOKEN`.
- **Trampa de HubSpot**: `propertiesFor()` en `src/lib/hubspot.ts` escribe
  propiedades PERSONALIZADAS (`area_de_interes`, `origen_del_mensaje`,
  `idioma_preferido`, `detalle_del_reto`) que **el propietario debe crear antes
  en HubSpot**. Si no existen, la API devuelve 400, `call()` lanza, y el
  contacto NO se crea (el lead si queda en la BD). No hay reintento sin esos
  campos. El README NO lo documenta.
- El panel `/admin/contactos` sin `ADMIN_PASSWORD` no se rompe: muestra
  "Panel deshabilitado". Util para comprobar si la env llego a Vercel.
- Plantilla con las 15 variables (y valores de ejemplo) en
  `.agent_tmp/vercel-env.txt` (ignorado por git).

## Revision en vivo del preview (2026-10-20, tras arreglar Vercel)
- **El preview YA FUNCIONA** (`crotulusai-git-devplcaai-pedrocollazo1988.vercel.app`):
  la home sirve la web nueva (Next) y todas las rutas dan 200. El arreglo de
  configuracion de Vercel se aplico hacia las 02:05 (el comentario del bot se
  actualizo a esa hora). NO hizo falta el `vercel.json` (commit `21b1461`
  queda por si acaso: `framework: nextjs` + `outputDirectory: null`).
- **Selector REAL de la cabecera**: `.nav__links` (no `.primary-nav`). El boton
  de busqueda es `.site-header .icon-btn[aria-haspopup="dialog"]`, el de modo
  noche `.site-header .icon-btn[aria-pressed]`, y el menu de idiomas `.lang`.
- **Las banderas son CSS, no SVG**: `<span class="flag">` con `linear-gradient`
  (22x15 px). Contar `svg` dentro de `.lang__opt` da 0 y NO es un fallo.
- **Buscador OK** (probado como lo hace React: setter nativo de
  `HTMLInputElement.prototype.value` + evento `input`): "equipo" -> Paginas/
  Secciones/Preguntas, flechas + Escape devuelven el foco al boton. Asignar
  `i.value = x` a secas NO dispara React y da 0 resultados (falso positivo).
- **Idiomas OK**: menu con Español/English/Português, cambia a EN (h1 "Less
  friction. More time. More business.", cookie `crotulus_lang=en`).
- **Modo noche OK**: `theme-dark` + `localStorage.crotulus_theme=dark` +
  `colorScheme`, cabecera `rgba(11,28,41,.95)`.
- **CONTRASTE: 4 fallos AA corregidos** en `globals.css` (commit `bbee958`):
  `.online` `#228568`->`#1a6e5b` (4.22->5.69), `.event` `#28866b`->`#1c7158`
  (4.46->5.91), `.cta p` `#d0e7fa`->`#e8f4ff` (4.47->5.10) y `.cta .eyebrow`
  `#c7e5ff`->`#e8f4ff` (4.36->5.10). Ahora **0 fallos en claro y en noche**
  (97 elementos comprobados en cada uno). El script `.agent_tmp/contrast.mjs`
  viejo usa selectores del sitio PHP: usar `.agent_tmp/verify-live.mjs`.
- **El preview NO tiene base de datos**: `/equipo` sale con `"member":[]` y el
  aviso "Estamos preparando las fichas del equipo". En local SI salen los 3
  miembros. Falta configurar `DATABASE_URL` en Vercel (y `HUBSPOT_TOKEN`,
  `MAIL_SMTP_PASS`, `ADMIN_PASSWORD`): por eso `/admin/contactos` dice
  "Panel deshabilitado" y la API devuelve `mail:false, hubspot:false`.
- **Formulario de contacto OK en local**: guarda en BD (`ok:true`), pero
  `MAIL_SMTP_PASS` y `HUBSPOT_TOKEN` estan VACIOS en `.env.local`, asi que el
  correo y HubSpot se saltan (no fallan). Borrar siempre el lead de prueba.
- **Scripts de verificacion utiles** (`.agent_tmp/`, ignorado):
  `verify-live.mjs` (idiomas/noche/buscador/contraste), `verify-search.mjs`
  (buscador con teclado), `review-design.mjs` (cabecera/banderas/anclas/movil),
  `audit-layout.mjs` (overflow 8 viewports), `shots.mjs` (capturas).

## Preview de Vercel roto: sirve `public/` como sitio estatico (2026-10-20)
- **Sintoma**: el preview `crotulusai-git-devplcaai-pedrocollazo1988.vercel.app`
  existe y sale **Ready**, pero `/` da **404 de plataforma Vercel**
  (`x-vercel-error: NOT_FOUND`, texto "The page could not be found / NOT_FOUND"),
  no el 404 HTML de Next.
- **Evidencia de que NO se despliega Next**: `/robots.txt`, `/favicon.svg` y
  `/team/placeholder.svg` (los 3 ficheros de `public/`) responden **200**, mientras
  `/_next/static/`, `/index.html`, `/equipo`, `/api/contact` dan 404. Es decir,
  Vercel publica **la carpeta `public/` tal cual** y descarta el build de Next.
- **Causa CONFIRMADA**: el proyecto Vercel `crotulus.ai` (id `prj_8a0LT9oINsjzofrHtZev1ODFCKm9`)
  tiene **Output Directory = `public`** (herencia del sitio estatico/PHP): Vercel no
  compila Next, publica la carpeta `public/` como sitio estatico. Prueba fina:
  `/robots.txt` responde 200 pero `/public/robots.txt` da 404 -> la salida ES
  `public/`. Se arregla en **Settings - Build and Deployment**: Framework Preset
  `Next.js`, Root Directory vacio, Output Directory vacio. Alternativa rapida:
  borrar el proyecto y reimportar el repo (Vercel detecta Next.js solo).
- **Arreglo por codigo (intentado 2026-10-20)**: `vercel.json` en la raiz con
  `{"framework":"nextjs","outputDirectory":null}`. El esquema oficial
  (`https://openapi.vercel.sh/vercel.json`) confirma que `outputDirectory: null`
  = "se detecta automaticamente" y que **`vercel.json` PISA la configuracion del
  panel**. Funciona SOLO si el *Root Directory* esta bien (si apunta a `public`,
  Vercel no llega a leer el `vercel.json`); en ese caso hay que tocar el panel.
- **El token del propietario ya esta revocado** -> no se pudo empujar el
  `vercel.json` (commit local, pendiente de subir con un token nuevo).
- **El BUILD esta bien**: verificado dos veces con `.next` limpio, con y sin
  `DATABASE_URL` (`getTeamMembers` captura el error y devuelve []), y `next start`
  sirve 200 en `/`, `/equipo`, `/sitemap.xml`, `/admin/contactos` (405 en
  `/api/contact` sin POST = correcto). El fallo es SOLO configuracion de Vercel.
- **Causa ANTIGUA (descartada)**: el proyecto Vercel `crotulus.ai` (id `prj_8a0LT9oINsjzofJId...`) hereda
  la configuracion de la epoca del sitio estatico/PHP (Root Directory u Output
  Directory apuntando a `public`, preset distinto de Next.js). Se arregla en
  **Settings - Build and Deployment**, no con codigo: preset Next.js, Root
  Directory vacio, Output Directory vacio. Un `vercel.json` **no basta** si el
  Root Directory esta mal (no se llega a leer).
- **Ojo**: `crotulus.vercel.app` (produccion) sirve el sitio **viejo**
  (`index.html`, `empresa.html`, `js/main.js`), que **no esta en este repo**
  (el commit inicial solo tiene el README). Es **otro proyecto/despliegue**: no
  confundirlo con el preview de `crotulus.ai`.
- **El token del propietario ya esta revocado** (`Bad credentials`): bien. Para
  volver a empujar hace falta uno nuevo.

- Al terminar, recordar al propietario **revocar el token** en
  https://github.com/settings/personal-access-tokens

## Pendiente / seguimiento (actualizado 2026-10-20)
- **DECISION DEL PROPIETARIO: el dominio propio queda APARCADO** ("no lo voy a
  hacer ahora"). No volver a proponerlo como tarea ni dar por hecho que existe.
  Dato objetivo, por si se retoma: **`crotulus.ai` NO esta registrado** (RDAP
  oficial `.ai` -> 404); tampoco resuelven `www`, `crotulus.com`, `c-rotulus.es`
  ni `c-rotulus.ai`. Los pasos de Namecheap (Vercel: `A @ -> 76.76.21.21` y
  `CNAME www -> cname.vercel-dns.com`) quedan escritos en el README, sin ejecutar.
  Mientras tanto la web vive en el preview/alias `*.vercel.app`.
- **En Vercel hay que configurar** (unico bloqueante real): Neon (`DATABASE_URL`
  con `-pooler`, `DIRECT_URL` sin pooling), `NEXT_PUBLIC_SITE_URL`, SMTP de Gmail
  (`MAIL_SMTP_PASS`), `HUBSPOT_TOKEN` y `ADMIN_PASSWORD`. Despues, una vez:
  `npx prisma db push` + `npm run db:seed`.
- **HubSpot**: crear antes las 4 propiedades personalizadas (ver seccion propia).
- **5 commits locales sin subir** (el token del propietario esta revocado): los
  dos que importan de verdad son `21b1461` (vercel.json) y `bbee958` (contraste).
- El dominio de la maqueta que dio el propietario
  (`c-rotulus-ia.qvafunded.chatgpt.site`) es solo referencia de diseño.

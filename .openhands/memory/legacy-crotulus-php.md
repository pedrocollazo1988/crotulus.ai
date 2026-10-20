# Memoria del proyecto C-ROTULUS

## Despliegue (Vercel + GitHub)
- Ramas: `main` = produccion; **`dev_plca` = desarrollo** (Vercel le crea un
  **Preview** automatico en cada push). El repo es `pedrocollazo1988/crotulus`.
- El token de `origin` (URL con `ghu_...`) esta **caducado**; para empujar usar
  `GIT_TERMINAL_PROMPT=0 git push "https://x-access-token:${GITHUB_TOKEN}@github.com/pedrocollazo1988/crotulus.git" dev_plca:dev_plca`.
  Luego `git fetch origin dev_plca` (el ref local queda viejo tras un push por URL).
- Vercel esta conectado al repo: no hace falta CLI. Ver el preview con la API de
  GitHub (`/repos/.../deployments` + `/statuses`). Los previews salen con
  **Vercel Authentication** (302); para probarlos hace falta login o un
  *Protection Bypass* (`?x-vercel-protection-bypass=<secreto>`).
- **Falta configurar en Vercel** las variables de entorno (Neon `DATABASE_URL`,
  `DIRECT_URL`, `APP_KEY`, SMTP...). Sin ellas, la web estatica carga pero el
  panel/API no tienen base de datos.
- **Preview "no muestra los cambios" (2026-10-16)**: casi nunca es codigo. El
  codigo si llega (comprobar `gh api repos/.../compare/main...dev_plca` y los
  commits de las PR son ancestros). La causa es **entorno**: (a) Vercel
  Authentication pone un 302 a `vercel.com/sso-api` en TODOS los previews; (b)
  `tools/setup-vercel-env.sh` ataba Preview a la rama actual (`--git-branch`), asi
  que el preview de `dev_plca` se queda sin BD/APP_KEY/Google -> 500 o boton de
  Google apagado. Arreglado: el script sube Preview **sin rama (todas)** por
  defecto. Queda del lado del propietario: desactivar la proteccion de preview o
  crear un Protection Bypass, reejecutar el script con `npx vercel login` y
  Redeploy. `deploy/vercel.env` tiene vacias GOOGLE_CLIENT_ID/SECRET,
  MAIL_SMTP_PASS y ADMIN_PASSWORD (en produccion van a mano en el dashboard).
- **`main` vs `dev_plca` "1 por detras"**: `main` tiene el commit de merge
  `f96ef50` que no aporta contenido (`git diff f96ef50 51fdd51` sale vacio). Se
  resuelve con `git merge origin/main` en `dev_plca` (limpio). Tras eso,
  `main...dev_plca` = ahead>0, behind=0.
- `npm run build` debe pasar **con `.next` limpio** (parar `next dev` y `rm -rf .next`
  antes); si no, aparece `Invariant: no direct app page entry found for /_not-found`.

## Arquitectura (desde 2026-10-15)
- El proyecto migro de **PHP + SQLite/MySQL** a **Next.js 15 (App Router) + Prisma +
  PostgreSQL**, para desplegar de forma nativa en Vercel (Vercel no ejecuta PHP y su
  WAF bloquea las URLs `.php`). El backend PHP original vive en `legacy/` y **no se
  ejecuta ni se despliega**.
- El sitio publico sigue siendo HTML/CSS/JS estatico, ahora en `public/`.
- Backend en `src/app/api/*` (route handlers) y `src/app/admin/*` (React + Server
  Actions). Logica en `src/lib/*` (una lib por modulo del PHP antiguo).
- `next.config.mjs` reescribe las rutas `.php` antiguas a las nuevas para no tocar
  `public/js/main.js` (que usa `BACKEND_URL=""` + rutas relativas y quita el `.php`).

## Comandos clave
- Vista previa local: `bash tools/serve-next.sh --ensure` (Postgres + Next en :12000
  + vigilante). `--watch` (primer plano), `--prod` (build + next start).
- Postgres local: `tools/pgdev.sh` (cluster en `/workspace/.pg-runtime`, usuario y
  base `crotulus`, puerto 5432).
- Datos: `npm run db:seed`; importar el SQLite antiguo:
  `npm run db:migrate-sqlite -- legacy/app/data/c-rotulus.sqlite` (conserva IDs,
  `meta`->JSONB, reajusta secuencias con setval, idempotente con `--force`).
- Build de produccion: `npm run build` (prisma generate && next build).
- Contrasena de un usuario: `NEW_PASSWORD='...' npm run user:password -- correo@x.com`
  (bcrypt coste 10, activa/verifica la cuenta y limpia los limites de intentos de login).

## Acceso al panel (credenciales y utilidades)
- Admin del preview local: `crotulus.mipyme@gmail.com` / `Crotulus-2026`.
- Si "no autentica": casi siempre es **tecleo** (bcrypt distingue mayusculas) o el
  **limite de intentos** (`LOGIN_RATE_MAX`, 10 en 900 s; tabla `rate_limit`, bucket
  `login`). Revisar `app-data/app.log` (`login_failed <correo>` revela el correo exacto
  que llego). El formulario de login tiene boton **Mostrar/Ocultar** contrasena.

## Trampas aprendidas (costosas)
- **Nombres de campo del formulario de contacto**: el backend usa claves en
  espanol CON acento en el `name` del formulario (`nombre`, `correo`, `teléfono`/
  `telefono`, `servicio`, `mensaje`). Los servicios permitidos estan en
  `ALLOWED_SERVICES` (`src/lib/validator.ts`) y deben coincidir exactamente.
- **CSRF**: el campo se llama `_csrf` (o cabecera `X-CSRF-Token`), NO `csrf_token`.
  El token es autocontenido (`<ts>.<hmac>`), no se guarda en sesion.
- **Captcha**: campos `captcha` (respuesta) + `captcha_token` (token firmado). El
  reto puede ser suma O resta; hay que evaluarlo bien al probar.
- **`testimonials` devuelve `items: []` a proposito**: lista aportaciones aprobadas
  de usuarios (`user_submissions`), no los testimonios de ejemplo de la portada
  (esos salen de `content_items`). Paridad con el PHP antiguo.
- **Funciones serverless en Vercel (Hobby)**: el limite de 12 aplica a "Serverless
  Functions", no a paginas; en Next.js App Router las rutas se agrupan. La doc
  actual de Vercel ya no lista ese limite. El riesgo real en Hobby es el uso
  **no comercial** y el limite de 250 MB por funcion.
- **CSS del panel (`public/admin/assets/admin.css`)**: la regla global `form {...}`
  estiliza CUALQUIER formulario como tarjeta blanca; hay que excluir los envoltorios
  con `form.inline, form:has(> .settings-card), .settings-card form`. Y `.btn` debe
  mantener una escala coherente (~41px normal / 32px `--sm`) con `white-space:nowrap`,
  o los botones parecen deformes. El topbar usa `.topbar__inner` (mismo ancho que
  `.wrap`) para que su contenido alinee con el del panel.
- **Medir el layout sin playwright**: Chromium en `/usr/bin/chromium` +
  `--headless=new --remote-debugging-port=9222` y CDP por Node (`WebSocket` nativo).
  Comparar cajas de contenido (x + paddingLeft), no de borde; ignorar lo que esta
  dentro de un `overflow-x:auto`; y comparar centros para detectar envoltura.
- **Formularios POST con CSRF en el panel**: un `<form method="post">` de HTML plano
  NO envia `_csrf`, asi que cualquier endpoint que llame a `csrfRequire()` responde
  419. Hay que pintar `<input type="hidden" name="_csrf" value={csrfToken()}>` (los
  layout/pages son server components, se genera ahi). Sintoma tipico: el boton "no
  hace nada" porque el fetch/redirect devuelve JSON con error.
- **Redirects detras de un proxy**: `new URL(path, req.url)` da el host INTERNO
  (`https://localhost:12000`). Usar `requestOrigin(req)` (`src/lib/http.ts`), que
  reconstruye el origen publico desde `X-Forwarded-Proto`/`X-Forwarded-Host`/`Host`.
  Aplica a `NextResponse.redirect`; los `redirect()` de Next con rutas relativas van bien.
- **`npm run build` con `next dev` en marcha corrompe `.next`** (error
  `Cannot read properties of undefined (reading 'call')`). Parar el dev server,
  `rm -rf .next` y relanzar `tools/serve-next.sh --ensure`; o usar `--prod`.
- **Un secreto VACIO en la tabla `settings` PISA la variable de entorno**
  (2026-10-17, bug "registro OK pero login 403 no verificada"). `scripts/seed.ts`
  siembra TODAS las claves de `DEFAULTS`, incluidas `mail_smtp_pass=""`,
  `google_places_api_key=""` y `sms_twilio_auth_token=""`; y
  `settingsApplyOverrides()` copiaba la BD sobre la config sin filtrar, asi que
  `MAIL_SMTP_PASS` de Vercel se perdia -> Gmail `535` -> el correo de verificacion
  no salia -> cuenta en `pending` -> login 403. Arreglado: los secretos vacios ya
  no pisan la env (`src/lib/settings.ts`, commit `ae2ce97`). PISTA DIAGNOSTICA:
  `google_client_id/secret` NO estan en `DEFAULTS` (por eso Google OAuth si
  funcionaba) mientras los otros 3 si -> asimetria que delata el clobber.
  Al anadir claves secretas nuevas, meterlas en `settingsSecretKeys()`.
- **Verificar el flujo de auth en local**: no hay tests; levantar Postgres
  portatil (`bash tools/pgdev.sh --ensure`), `.env.local` con `DATABASE_URL`/
  `DIRECT_URL`/`APP_KEY`/`MAIL_TRANSPORT=log`, `node scripts/prisma.mjs migrate
  deploy`, `tsx scripts/seed.ts`, `npx next dev -p 12000`. Con `MAIL_TRANSPORT=log`
  el enlace de verificacion se escribe en `app-data/mail.log` (el token en claro
  solo esta en la BD; se puede fabricar un token de prueba con
  `sha256(token + "|" + APP_KEY)`). Los scripts `tsx` no cargan `.env.local`:
  exportar las variables a mano; y `server-only` no esta instalado fuera de Next.

## Despliegue (Vercel + Neon)
- `DATABASE_URL` = host **pooler** de Neon (runtime serverless);
  `DIRECT_URL` = cadena directa (migraciones). `APP_KEY` estable entre despliegues
  (si cambia, caducan CSRF/captcha/sesiones).
- Ver `VERCEL.md` para la guia completa.

## Assets publicos: minificados (IMPORTANTE)
- `public/index.html` y `empresa.html` cargan **`js/main.min.js` y `css/styles.min.css`**,
  NO los originales. Los `.min.*` estan en `.gitignore` y los genera
  `scripts/minify-assets.mjs` (forma parte de `npm run dev`, `npm run build` y el
  `buildCommand` de Vercel). Editar `public/js/main.js` **no se ve** hasta
  re-minificar. Al tocar assets, subir `?v=` en los dos HTML (hoy `20261027`).
- El minificador **renombra funciones**: buscar `setupX` en el `.min.js` da 0 aunque
  el codigo este. Verificar con cadenas literales visibles ("Foto lista").
- **La CSP del sitio limita `img-src 'self' data: https:` y por tanto BLOQUEA
  `blob:`**. En JS del front, leer ficheros con `FileReader` (data URL), nunca
  `URL.createObjectURL`. El fallo solo aparece en consola (usar CDP `Log.entryAdded`).

## Registro en produccion (estado 2026-10-18)
- **Funciona.** Verificado con buzon temporal mail.tm: registro -> correo real
  (desde `crotulus.mipyme@gmail.com`) -> `/api/verify?token=` -> login 200. Ya no
  devuelve `mail_sent:false`, asi que produccion tiene `MAIL_SMTP_PASS`.
- `email_verification=required`: las cuentas nuevas quedan `pending`; el login da
  **403 "aun no verificada"** hasta pulsar el enlace. Si el correo cae en spam
  parece que "el registro esta roto". `EMAIL_VERIFICATION=optional` lo desactiva.
- El correo del propietario ya tiene cuenta admin (`admin-bootstrap.mjs`), asi que
  registrarse con el da **409** -> debe usar login o "Olvide mi contrasena".

## Registro con correo/contrasena: "no funciona" (recurrente)
El registro **NO esta roto**: con `email_verification=required` (por defecto) las
cuentas nuevas quedan `pending` y el login da 403 "aun no verificada" hasta pulsar
el enlace del correo. Si el correo cae en spam parece roto. Causa extra: el correo
del propietario ya es admin (`admin-bootstrap.mjs` con `ADMIN_EMAIL` o `MAIL_TO`),
asi que registrarse con el da 409. Arreglo sin codigo: Ajustes · Seguridad ->
"Verificacion por correo: No obligatoria" o `EMAIL_VERIFICATION=optional` en Vercel
(la env gana a la BD). Detalle y cuentas de prueba en `2026-10-18.md`.

## Pendiente / seguimiento
- **Pendiente de fusion a `main`**: commit `6c882c7` en `dev_plca` (contraste AA en
  modo noche y textos secundarios). Requiere visto bueno del propietario.
- **PR #13/#14/#15 FUSIONADAS a `main` y desplegadas (2026-10-18)**: testimonios
  publicos sin cuenta + mensaje 409; subida de foto en testimonios; retirada de la
  barra superior `.topbar`. `dev_plca` sincronizada con `main` (fast-forward).
- **PR #17 FUSIONADA a `main` y desplegada (2026-10-19)**: completado el i18n
  del sitio publico (textos del panel + atributos en runtime). `dev_plca`
  sincronizada. La PR #16 (traduccion base) ya estaba en `main`.
- **Datos de prueba en PROD que el propietario debe borrar** (no hay acceso a la BD
  de produccion desde el entorno): cuentas `qa.*`, `lat.*`, `nadie.*`, `diag*`,
  `tm*`/`tz*` y `prueba*` @example.com (panel · Usuarios); y el testimonio
  `"QA Produccion"` / `"Tester"` (panel · Aportaciones; `submissions_auto_approve`
  esta ACTIVO alli). NO enviar formularios reales a produccion para probar.
- `APP_KEY` de produccion y `MAIL_SMTP_PASS` los aporta el propietario; sin ellos
  el correo no sale.
- **APROBACIONES**: trabajo y push a `dev_plca` son autonomos. Aprobacion del
  propietario solo para produccion (fusionar a `main`, tocar hosting/BD de prod,
  borrar ramas/repos, `push --force`). **FLUJO POR PR**: `main` tiene proteccion de
  rama; NUNCA empujar directo a `main`. Ver `AGENTS.md`.

## Registro / verificacion de cuentas (2026-10-17)
- **Bug resuelto**: los ajustes del panel NO se aplicaban en runtime. `bootstrap()`
  sobrescribia un objeto que luego descartaba y `getConfig()` devolvia la config
  base (solo env). Arreglado con `setConfig()` (`src/lib/config.ts`). Ahora **la BD
  tiene prioridad sobre las variables de entorno** (los secretos vacios no pisan la
  env). Ver `2026-10-17.md`.
- Ajuste `email_verification` (`required` por defecto / `optional`) en
  Ajustes · Seguridad, y env `EMAIL_VERIFICATION` como interruptor de emergencia
  (manda sobre la BD, igual que `TWO_FACTOR_MODE`).
- **Regla de diseno**: si la verificacion por correo esta activa pero el correo no
  puede salir, la cuenta se **autoactiva** (registro y `resend_verify`) para que
  nadie quede bloqueado. El mensaje real viaja al login en `?msg=`.

## Contraste AA (2026-10-18)
- **Regla**: al anadir un color de TEXTO usar `--color-link` (no `--color-primary`);
  si el fondo no es una variable (degradado o `#fff` fijo), anadir override
  `.theme-dark`. `--color-link` es el azul de marca en modo dia y azul hielo
  (`#A8D3EE`) en modo noche. El modo noche solo redefine variables: cualquier uso
  directo de `--color-primary` como texto queda ilegible (~2:1) sobre fondo oscuro.
- Al tocar `public/css/styles.css` hay que regenerar los `.min`
  (`node scripts/minify-assets.mjs`) y subir `?v=` en `index.html` y `empresa.html`.
- Auditoria reproducible y detalle del arreglo (commit `6c882c7`) en `2026-10-18.md`.

## Ramas y push (2026-10-16)
- **Rama unica de trabajo: `dev_plca`.** NO crear ramas nuevas. Commits y push a
  `dev_plca` son autonomos. Vercel previsualiza `dev_plca`; el propietario la
  aprueba y la pasa a `main` por PR. Aprobacion solo para produccion.
- El `remote` guarda un token **caducado**: `git push origin ...` pide contrasena.
  Empujar con
  `git push "https://${GITHUB_TOKEN}@github.com/pedrocollazo1988/crotulus.git" dev_plca`
  y luego `git fetch origin dev_plca` (el ref local queda viejo tras un push por URL).
- **2FA** (commit b8f7c2d): `two_factor_mode` = `optional` por defecto; cada usuario
  lo activa en "Mi cuenta". Interruptor de emergencia `TWO_FACTOR_MODE=disabled` en
  el entorno (salta el 2FA aunque la BD diga `required`). OTP de 6 digitos por
  correo; en local `MAIL_TRANSPORT=log` lo escribe en `app-data/mail.log`.
- **Comprobar despliegues**: `gh api repos/pedrocollazo1988/crotulus/commits/<sha>/status`
  hasta `success`, o `.../deployments`. La URL concreta del deployment esta tras
  Vercel Authentication (302); el alias `crotulus.vercel.app` es publico.
- **Imagenes de la portada: fotos reales**. Las rutas viven en la BD con prioridad
  sobre el HTML (`settings.hero_image`/`about_image`, `content_items.meta.image`,
  `blog_posts.image`); `scripts/migrate-images.ts` (SVG->JPG, idempotente) corre en
  `db-bootstrap.mjs` para migrar tambien una BD ya sembrada. Detalle en `2026-10-18.md`.

## PR: abrir, marcar lista y fusionar (2026-10-17)
- `create_pr` abre la PR como **borrador**. Con draft + proteccion de `main` sale
  `mergeStateStatus: BLOCKED` / `reviewDecision: REVIEW_REQUIRED`. Hay que
  `gh pr ready <n>` y despues `gh pr merge <n> --merge --admin` (el token del
  propietario es admin y salta la proteccion). Tras fusionar, sincronizar
  `dev_plca` con `main` (fetch + merge fast-forward + push) para no quedar "behind".
- Tras fusionar, Vercel despliega Produccion sola; comprobar con
  `gh api repos/.../commits/<sha>/status` hasta `success`.
- **NO crear cuentas de prueba en produccion**: no hay acceso a la BD de
  produccion desde el entorno (DATABASE_URL = 127.0.0.1; sin VERCEL_TOKEN ni
  ~/.vercel) y el admin de produccion da 401, asi que no se pueden borrar.

## i18n del sitio publico: es/en/pt (2026-10-31)
- El selector de idioma traduce **todo** el sitio publico (`public/index.html`,
  `public/empresa.html`). Vive en `public/js/main.js`: `I18N_CLAVES.en` /
  `.pt` (diccionario indexado por **texto origen en espanol**; `es` va vacio) y
  `t(texto)`. Si no hay clave, se conserva el original: anadir idioma = rellenar
  dos objetos; anadir texto = una clave por idioma (mantener simetria en/pt).
- **Invariante**: el diccionario se indexa por el texto en espanol del HTML. Si
  se edita un texto en el HTML, hay que renombrar su clave o la traduccion se
  pierde. Comprobar simetria en/pt -> `en only: [] pt only: []`.
- **Textos del panel (Ajustes - Textos)**: como el diccionario se indexa por el
  texto, si el propietario edita un texto en el panel la clave antigua deja de
  coincidir y **ese texto se queda sin traducir**. Hay que anadir la variante
  nueva (texto exacto de produccion) como clave. Ya paso con `hero_title_accent`
  ("tecnologia"), `horario` ("9:00 a.m. a 5:00 p.m."), `process_lead` y
  `team_lead`. Para detectarlo: comparar `?resource=settings` de produccion
  contra `src/lib/defaults.ts` y contra el diccionario (solo los textos visibles;
  marca, direccion, telefono, correo y meta_description NO se traducen).
- **Atributos fijados en runtime por el JS** (no pasan por el TreeWalker): hay
  que envolverlos con `t()` al asignarlos. Corregidos: `alt` de las imagenes de
  ajustes, `aria-label` del boton de menu (abrir/cerrar) y de los puntos del
  carrusel de testimonios, y el banner de modo mantenimiento.
- Prueba fiel: inyectar los ajustes REALES de produccion en `fetch` (patron
  `Page.addScriptToEvaluateOnNewDocument`) antes de cargar; asi se comprueba el
  texto que vera el propietario, no el de por defecto.
- `aplicarIdiomaDOM()` recorre nodos de texto (TreeWalker; `I18N_IGNORAR` salta
  SCRIPT/STYLE/NOSCRIPT) y **conserva los espacios de los extremos** (`/^\s*/`,
  `/\s*$/`) porque el HTML parte frases en linea junto a `<strong>` (p. ej. las
  cifras de los testimonios). No volver a usar `nodeValue.trim()`.
- Atributos: marcadores `data-i18n-aria|ph|alt|title|content` (sin valor). El
  original se guarda en el propio atributo `<marcador>-es`. Los `<meta>` del
  `head` usan `data-i18n-content` (el `content` NO se traduce solo: hay que
  anadirlo a `I18N_ATRIBUTOS`); sin esa entrada la `description`/`og:*` se quedan
  en espanol aunque el `<title>` cambie.
- **Paginas con titulo/descripcion propios** (p. ej. `empresa.html`): marcarlas
  con `data-page="<nombre>"` en `<html>`. `aplicarSeo()` (que escribe los ajustes
  de la portada: `site_name`, `meta_description`) debe saltarlas, o pisa su
  titulo y su descripcion. Los `<meta>` que vienen del panel se aplican con
  `setMetaI18n()` (guarda el original y traduce con `t()`).
- Pregunta de FAQ en el HTML: el nodo de TEXTO no incluye el "?" (se pinta
  aparte), asi que la clave i18n va sin signos; registrar ambas variantes.
- Contenido de la BD: al cambiar de idioma se vuelve a pintar
  (`loadContent`/`loadBlog`/`loadTeam`/`aplicarAjustes`) y se aplica `t()` en los
  renderers (`itemTestimonio`, etc.). El texto de la BD **debe** tener su clave.
- Mensajes de validacion: se traducen al **mostrarse** (`setError`), no al
  definirlos; si no, quedan fijados al idioma del arranque.
- Fechas ("13 oct 2026") y tiempos ("4 min", prefijo "·") via `traducirPatron()`
  + `MESES_ABREV`.
- `<option>`: se traduce la etiqueta, el `value` se queda en espanol (contrato
  con `ALLOWED_SERVICES`).
- Idioma en `localStorage["crotulus_lang"]`; `<html lang>` y `data-lang` al dia.
- `public/**/*.min.{css,js}` son artefactos de `scripts/minify-assets.mjs` y
  estan en `.gitignore`: **no se commitean**. El HTML sirve los `.min`, asi que
  tras tocar `main.js` hay que regenerar y subir el `?v=` (`20261031`).
- Prueba headless (CDP, `/usr/bin/chromium`): abrir pagina, pulsar
  `#langMenu [data-lang="en"]`, y recoger textos. Falsos positivos: el heurista
  "sigue en espanol" marca palabras compartidas pt/es; revisar a mano.
- **Huecos que reaparecen**: (a) textos fijados en runtime por el JS
  (`navAuthLink` "Acceder"/"Mi cuenta", `status.textContent` de los formularios,
  `hint` de la foto) hay que envolverlos con `t()` o volver a llamar
  `aplicarIdiomaDOM()`; (b) HTML inyectado por `innerHTML` despues de
  `aplicarIdiomaDOM()` (p. ej. el iframe del mapa en `aplicarAjustes`) pierde la
  traduccion: traducir en el propio `innerHTML` con `esc(t(...))`; un
  `data-i18n-title` no basta.

## Modo noche del menu de cabecera (2026-10-19)
- **Invariante**: en modo noche `.primary-nav` NO debe ser una superficie solida
  en escritorio (>=1260 px). Si se pinta como bloque (`--color-white` = `#162C3B`)
  aparece el "descuadre" que reporto el propietario: una caja clara con esquinas
  rectas detras de las pastillas. El fondo solido se limita a
  `@media (max-width: 1259px)` (el panel desplegable movil).
- El CTA `.btn--nav-cta` es un boton azul: en modo noche debe ir blanco con texto
  azul, como el resto de botones sobre fondos oscuros. Si no, el degradado azul se
  funde con la cabecera oscura.
- `.theme-dark .site-header.is-scrolled` necesita su propia regla: la base pinta
  la cabecera blanca al bajar.
- Tinte de marca en modo noche: `rgba(95,168,201,...)` (no `rgba(46,134,184,...)`).
- `404.html` es autonoma (no carga `main.js`): no tiene modo noche ni i18n. Se
  sirve en Vercel con status 404.

## Rediseno "base44" metido en un commit i18n (2026-10-19)
- El commit `58edbdf` dice "i18n: traducir metadatos SEO..." pero incluye un
  **rediseno visual completo** (`base44`, `circuit-grid`, `statbar`, `cta-band`,
  `value-card`, `flow`): `styles.css` +351/-323, `index.html` +200/-164,
  `empresa.html`, `main.js`, `defaults.ts`. Produccion aun no lo tiene. **No te
  fies del mensaje del commit: mira el diff.**
- **Paleta vigente (2026-10-19)**: `#0B5A93` primario, `#08456F` oscuro,
  `#E7F3FB` suave, `#1F2937` ink/heading, `#5F6D82` ink-soft, `#D9D9D9` line,
  `#F6F8FA` bg-alt, `#0B3A5C` navy/footer. Debe estar IGUAL en
  `public/css/styles.css`, `public/admin/assets/admin.css`, `src/lib/mailer.ts`,
  `src/app/api/verify/route.ts` y el `meta theme-color` de los dos HTML.
- **Los ajustes de la BD mandan sobre los defaults** (`settingsApplyOverrides`).
  Lo que se ve en produccion NO es el texto del HTML ni `defaults.ts`. Para
  probar de verdad hay que inyectar los ajustes reales (sobrescribir `fetch` de
  `resource=settings` con `Page.addScriptToEvaluateOnNewDocument`).
- **Trampa del hero**: el `<h1>` parte la frase en nodos de texto alrededor del
  `<span class="text-accent">`; el diccionario indexa por el texto COMPLETO, asi
  que el respaldo estatico necesita claves para cada fragmento.
- **Trampa de las cifras**: `animarStat()` usa `data-suffix` ("+" por defecto).
  El sufijo se deduce del valor/etiqueta ("%" solo para satisfaccion), o una
  etiqueta como "horas de respuesta" se pinta "24%".
- **`hero_cta2_label` es el boton de WhatsApp** del panel (no "Ver servicios");
  el hero debe llevar `data-whatsapp-link` con href `wa.me` ya escrito.
- **Regla de herramientas**: `.agent_tmp/` (ignorado) guarda los scripts de
  verificacion CDP: `i18n-dom-gaps.mjs`, `verify-fixes.mjs`,
  `check-visual.mjs`, `check-defaults-i18n.mjs`, `smoke-admin.mjs`,
  `measure-header.mjs`.

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

## Estado actual (2026-10-21)
- **NO HAY NADA PENDIENTE DE SUBIR.** `main` = `028f131` (merge `--no-ff` de
  `dev_plca_ai`), `dev_plca_ai` = `e8cd677`, y **el arbol de `main` y el de
  `dev_plca_ai` son identicos** (`git diff --stat dev_plca_ai origin/main` vacio).
  Comprobado tambien contra `git ls-remote`: `origin/main` = `028f131`.
- **Produccion ya sirve el build nuevo.** `GET /commits/028f131/status` ->
  `Vercel -> success` (22:31:45Z, ~50 s despues del commit). El episodio "Vercel
  no desplego `main`" (ver la trampa del webhook) **se resolvio con el reintento**.
- Verificado en `crotulusai.vercel.app` con Chromium headless (2026-10-21):
  nucleo del hero = **IA**, `.service__channels` con **4 canales**, `/equipo` con
  los **4 miembros reales** y sus cargos (sin `member__bio`), `svg{width:1em}`
  presente, `dialog.modal` con `max-height:calc(100dvh - 32px)` y boton de enviar
  **visible** (900px de alto), buscador abriendo y filtrando, boton de tema
  alternando y guardando en `localStorage`, `scrollWidth == clientWidth` a 1280 y
  360px, `sitemap.xml` 200, `robots.txt` con `Sitemap:`.
- **Los 4 `svg` de 0x0 que quedan son normales**: el boton movil (oculto en
  escritorio), el aspa del dialogo y el icono del boton de enviar (ambos dentro
  del `<dialog>` cerrado) y el del buscador. No confundir con el fallo historico.
- **El propietario dio permiso explicito para llevar todo a `main`** (2026-10-20).
  Para empujar hizo falta un PAT fine-grained con **Contents: Read and write**.
- Produccion despliega sola al empujar a `main`. Alias del preview:
  `crotulusai-git-devplcaai-pedrocollazo1988.vercel.app`.

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
- **Los iconos son SVG inline SIN `width`/`height`** y **faltaba la regla CSS
  general que los limitara**. Un `<svg>` sin `width`/`height` y sin regla CSS NO
  usa el tamano intrinseco 300x150: **toma el 100% del contenedor**. Eso hizo
  que el icono del boton de enviar midiera **296px** (el ancho del boton) y el
  de la linea `.event` del panel, **341px**; el boton quedo en **494x324**.
  Otros 15 iconos sin contenedor que los midiera colapsaban a **0x0**
  (invisibles: flechas de los botones del hero, iconos de las pestanas, etc.).
  **Arreglado de raiz** en `globals.css`: `svg { width: 1em; height: 1em }`
  (commit en `dev_plca_ai`; ya en `main` y en produccion). Las reglas mas
  especificas (`.brand-logo--header`, `.icon-btn svg`, `.service__icon svg`...)
  siguen ganando, asi que no rompe
  nada. **Antes de tocar un icono, medir su `getBoundingClientRect`**: 0x0 o un
  valor igual al del contenedor = falta de tamano explicito.
- **`.bubble` y `.event` son `<p>`**: sin `margin: 0` el margen por defecto
  descentra lo que se superpone encima.
- **Boton de tema**: es `.icon-btn[aria-pressed]` (el de busqueda NO lo lleva).
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
- **Ningun token del entorno sirve para escribir** (comprobado 2026-10-21): tanto
  `$GITHUB_TOKEN` como `$allhands` dan **403** en `git push --dry-run` y en
  `POST /git/refs`; el token guardado en la URL de `origin` tambien. Para empujar
  hace falta que el propietario pegue un PAT fine-grained con **Contents: Read
  and write**. `git push --dry-run` es la prueba mas rapida y no cambia nada.
- **Comprobar si Vercel desplego**: `GET /repos/{o}/{r}/commits/{sha}/status`;
  debe salir `Vercel -> success` (tarda ~50 s). `pending` con **0 estados** = el
  webhook no llego. No hay credenciales de Vercel en el entorno, asi que no se
  puede forzar el despliegue; hay que reintentar con otro push.
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
- **BUG ABIERTO: la trampa anti-bot del formulario esta muerta** (detectado
  2026-10-21). `contactSchema` valida `website: z.string().max(0)...` **antes** de
  llegar al `if (data.website) return 200 skipped` de `route.ts`, asi que un bot
  que rellene el campo recibe **422** con el mensaje
  `"String must contain at most 0 character(s)"` en vez del 200 silencioso; la
  rama `skipped` es codigo inalcanzable y ademas **revela que es una trampa**.
  El spam no se guarda (sigue rechazado), asi que el impacto es bajo. Arreglo
  correcto: quitar el `max(0)` del esquema (dejarlo como string libre) y decidir
  el descarte solo en `route.ts`. Sin tocar todavia: hace falta permiso para
  escribir (ver la trampa de los tokens).
- **El formulario SI envia `website`** (`contact-provider.tsx`, dentro de
  `<div className="hp" aria-hidden>`), asi que el envio legitimo lleva
  `website: ""` y pasa el `max(0)`. Comprobado en vivo.
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
- **En Vercel YA ESTA CONFIGURADO** (comprobado en vivo, 2026-10-21): Neon
  (`DATABASE_URL`; un `POST /api/contact` valido responde `{"ok":true,...}` =
  el lead se guarda), `NEXT_PUBLIC_SITE_URL` (canonical = `https://crotulus.ai`),
  `ADMIN_PASSWORD` (el panel NO dice "deshabilitado") y el widget de chat.
  **Falta solo**: `MAIL_SMTP_PASS` (`mail:false`) y `HUBSPOT_TOKEN`
  (`hubspot:false`) — el formulario guarda el lead, pero no avisa por correo ni
  crea el contacto en el CRM.
- **HubSpot**: crear antes las 4 propiedades personalizadas (ver arriba).
- **`og:image` sigue sin existir** (hueco conocido): `openGraph` en
  `src/app/layout.tsx` no declara `images` y no hay ninguna imagen social en
  `public/`. Al compartir el enlace no sale tarjeta. Pendiente de proponer al
  propietario (una imagen 1200x630, sin negro, con la marca).
- **`/privacidad` ya existe** (commit `b9d82fd`): pagina INFORMATIVA en formato
  de acordeon (`<details>`, mismo `.faq` que "Preguntas"), 7 bloques y 18
  preguntas, en es/en/pt. Enlazada desde el pie, el consentimiento del
  formulario, el sitemap y el buscador. Contenido en `dict.privacy`; el correo
  se inyecta con el hueco `{email}` (funcion `fill()` en la pagina).
- **Ramas**: `main` y `dev_plca_ai` estan al dia (2026-10-21), con el **mismo
  arbol**. En `main`: `028f131` (ultima fusion `--no-ff`), `32ca3f8`, `1e51394`,
  `a6f2e27` (formulario + arreglo del `svg`), `48a6eed` (widget), `6a4a061`
  (contraste), `c4aa47d` (equipo + fotos), `0018a4a` (WhatsApp del pie en texto),
  `d1b5fda` (Servicios) y `36e93f5` (redes y WhatsApp). Los tres PR (`#1`, `#2`,
  `#3`) estan **fusionados**.
- **Contacto/redes**: `SITE` (`src/lib/site.ts`) es la fuente unica. WhatsApp
  del propietario **+5359888821** (10 digitos, Cuba) y redes
  Instagram/Facebook; se muestran en pie, banda CTA y dialogo de contacto
  (componente `social-links.tsx`). En el pie el numero va como **texto**
  (`<p>`), no como enlace; solo el icono enlaza. Detalle en `2026-10-20.md`.
- El dominio de la maqueta que dio el propietario
  (`c-rotulus-ia.qvafunded.chatgpt.site`) es solo referencia de diseno.

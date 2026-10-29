# Memoria del proyecto C-ROTULUS IA

Sitio corporativo de C-ROTULUS S.U.R.L. **reescrito desde cero** en
`/workspace/project` (repo `pedrocollazo1988/crotulus.ai`). **Rama de trabajo:
`dev_plca_ai`** (decidido 2026-10-29 por el propietario: "tener en `dev_plca_ai`
lo mismo que en `main` y luego cambiarte a esa rama como antes"). **Las dos
ramas estan sincronizadas e identicas** (`5754eca`); se trabaja en `dev_plca_ai`.
El proyecto PHP anterior + `legacy/` esta en
`legacy-crotulus-php.md`: **no aplica** a este codigo (solo contexto historico).
El detalle largo de cada sesion esta en los ficheros `2026-*.md` de esta carpeta.

## Stack y rutas
- **Next.js 16.4.2 (Turbopack) + Prisma 6.19.3 + PostgreSQL 17**. Todo el sitio
  son Server Components.
- Rutas: `/`, `/equipo`, `/privacidad`, `/admin/contactos`, `/api/contact`,
  `/api/demo-chat`, `/api/admin/login`, `/api/admin/logout`, `/sitemap.xml`,
  `not-found.tsx`.
- **Antes de tocar codigo de Next, leer `node_modules/next/dist/docs/`** (lo pide
  el propio `AGENTS.md`): esta version difiere de lo habitual.

## Estado actual (2026-10-29)
- **Rama de trabajo: `dev_plca_ai`** (por peticion del propietario). **`main` y
  `dev_plca_ai` estan SINCRONIZADAS al mismo commit `5754eca`** y con el mismo
  arbol. Antes de eso, `dev_plca_ai` iba 60 commits atras; se igualo con un
  **fast-forward** limpio (`git checkout -b dev_plca_ai origin/dev_plca_ai` +
  `git merge --ff-only main` + push sin `--force`), sin perder nada.
- **PRODUCCION AL DIA**: `GET /commits/d62cb40/status` -> `Vercel -> success`
  (2026-10-28T20:48:10Z); `https://crotulusai.vercel.app/` responde **200**.
- **El propietario dio permiso explicito para llevar todo a `main`** (2026-10-20).
  Para empujar hace falta un PAT fine-grained con **Contents: Read and write**.
- Produccion despliega sola al empujar a `main`. Alias del preview:
  `crotulusai-git-devplcaai-pedrocollazo1988.vercel.app`.
- **Nuevo desde la sesion del 2026-10-21** (todo ya en `main` y en produccion):
  chat de demostracion con IA real (`/api/demo-chat` + Gemini), limite por
  sesion con **Redis/Upstash**, biografias en las tarjetas del equipo, y
  reescritura de textos (hero/lead, 3 servicios, "Como trabajamos"). Detalle en
  `2026-10-26.md` y en el codigo; lo esencial, en las secciones de abajo.

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
- **Roles (actualizado 2026-10-26/28)**: los puestos ya **no** son "Especialista
  en IA" para todos; son titulos largos y cada uno el suyo. Pedro = CEO
  (estrategia y direccion de proyectos de IA); Olga = Especialista en Soluciones
  de IA y Automatizacion; Rogelio = Especialista en Desarrollo e Implementacion
  de Soluciones de IA; **Manuel = Especialista en Marketing Digital y Estrategias
  de Crecimiento** (antes "en IA"; cambio del 2026-10-26). Cada miembro lleva
  ahora **`bio` en los 3 idiomas** (`role`/`roleEn`/`rolePt`, `bio`/`bioEn`/`bioPt`)
  y la **biografia se muestra en la tarjeta** (commit "Mostrar biografías en las
  tarjetas del equipo"). Nombres completos en `public/team/*.jpg` (retrato 4:5,
  800x1000, recortado con **YuNet** y brillo normalizado; la de Pedro venia mucho
  mas oscura).
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

## Chat de demostracion con IA real (nuevo, 2026-10-26/28)
- **`src/app/api/demo-chat/route.ts`** (`runtime = "nodejs"`): llama a la API de
  **Gemini** (`generativelanguage.googleapis.com`, modelo `gemini-3.5-flash-lite`)
  con `x-goog-api-key: GEMINI_API_KEY`. Sin la clave -> **503**; error de Gemini
  -> 502; fallo interno -> 500. Escenarios (`SCENARIOS`): `dental`, `restaurant`,
  `realestate`, `administration`; el `scenario` debe existir o **400**. Mensaje
  vacio o **>1500** caracteres -> 400. El historial se recorta a los **ultimos 10**
  turnos. `maxOutputTokens: 500`, `temperature: 0.7`, timeout 20 s.
- **Limite por sesion en Redis** (`src/lib/demo-session.ts` + `src/lib/redis.ts`,
  **Upstash**, dep `@upstash/redis`): **15 mensajes** por sesion (TTL 24 h) y
  **5 peticiones/minuto**. Al pasarse -> **429** con `code: "SESSION_LIMIT"` o
  `"RATE_LIMIT"` y `messagesRemaining`. El `sessionId` se valida con regex UUID
  (`/^[0-9a-f-]{36}$/i`); si no cuadra, se genera uno nuevo. Claves:
  `crotulus:demo:session:<id>` y `...:rate`.
- **`src/components/solutions-demo.tsx`** es cliente: guarda el `sessionId` en
  `localStorage["crotulus-demo-session"]` (`crypto.randomUUID()`) y lo manda en
  cada peticion. **4 pestanas** de demo (una por escenario), con `dict.solutions.tabs`.
- **Sin `UPSTASH_REDIS_REST_URL/TOKEN`, `getRedis()` LANZA**: la ruta cae en 500.
  Es la trampa principal de este chat (no hay degradacion elegante).

## Textos y servicios (reescritos, 2026-10-26/28)
- **Servicios: de 5 tarjetas a 3** (2026-10-26), renumeradas 01/02/03: 01 Agentes
  de IA para atencion al cliente; 02 Automatizacion de tareas administrativas
  (antes 03); 03 Automatizacion del seguimiento comercial (antes 04). Borradas
  "Captacion de clientes y gestion de citas" y "Integracion de IA con hojas de
  calculo y CRM". Tocado en los 3 idiomas (`src/i18n/{es,en,pt}.ts`),
  `contact.serviceOptions`, `src/lib/validation.ts` (`CONTACT_SERVICES`),
  `services.tsx` (3 iconos) y `globals.css` (rejilla de 3 columnas).
- **Textos afinados 2026-10-28** (commits `b6f080f`..`d62cb40`): descripciones de
  las tarjetas 01/02/03, `lead` de servicios, **hero/lead** y el bloque
  **"Como trabajamos"** (`dict.process`; encabezado `valuesEyebrow` "Cómo
  trabajamos", pasos ESCUCHAMOS/DISEÑAMOS/ACOMPAÑAMOS, `fitSub` con los sectores).
  Son cambios de copy en `es.ts` (+ en/pt); no tocan estructura.

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
  mano: `git fetch origin main:refs/remotes/origin/main --force`. (El clon de esta
  maquina, 2026-10-29, se hizo completo con `git fetch --unshallow`, asi que ya no
  aplica aqui, pero si se re-clona con `--depth` vuelve el problema.)
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
- **Rama de trabajo (actualizado 2026-10-29): `dev_plca_ai`.** El propietario
  pidio volver a trabajar en `dev_plca_ai` "como antes", con las dos ramas
  iguales. `main` y `dev_plca_ai` estan en el mismo commit (`5754eca`). Mirar
  `git branch --show-current` antes de empujar y empujar a `dev_plca_ai`.
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
- **El chat de demo (nuevo) exige DOS variables mas**: `GEMINI_API_KEY`
  (si falta, `/api/demo-chat` responde **503** "El servicio de demostración no
  está configurado") y **Upstash Redis** (`UPSTASH_REDIS_REST_URL` +
  `UPSTASH_REDIS_REST_TOKEN`; sin ellas `getRedis()` lanza y la ruta da 500).
  **Estado en Vercel sin comprobar en esta sesion** (2026-10-29): si el chat de
  demo funciona en produccion, estan puestas; si no, hay que anadirlas.
- **HubSpot**: crear antes las 4 propiedades personalizadas (ver arriba).
- **`og:image` sigue sin existir** (hueco conocido): `openGraph` en
  `src/app/layout.tsx` no declara `images` y no hay ninguna imagen social en
  `public/`. Al compartir el enlace no sale tarjeta. Pendiente de proponer al
  propietario (una imagen 1200x630, sin negro, con la marca).
- **Despliegue de Vercel: lento, pero no roto** (2026-10-21). Tras empujar a
  `main`, el commit se quedo en `pending` **~14 minutos** (404 en produccion) y
  despues paso a `Vercel is deploying your app` -> `success`. El estado se
  consulta en `GET /repos/{o}/{r}/commits/{sha}/status`; **el commit anterior ya
  tenia `success`**, asi que sirve para comparar. No hay `.github/workflows` ni
  `vercel.json`: Vercel va solo por integracion. **No entrar en panico a los 5
  minutos**: esperar al menos 15-20 antes de sospechar. Si el despliegue no
  aparece ni como `pending`, el commit de `028f131` se titula "reintento del
  despliegue de produccion": ya paso antes y se arreglo re-empujando.
- **`{email}` en el HTML de produccion**: aparece **solo** dentro del payload de
  hidratacion de Next (`<script>`), no en el HTML visible. Para comprobar el
  texto hay que quitar los `<script>` antes de buscar (`re.sub(r'<script.*?</script>','',h,flags=re.S)`).
  Buscar en el HTML crudo da falsos positivos.
- **Credencial en `.git/config` (actualizado 2026-10-29)**: en ESTE clon el
  remoto `origin` es **limpio**, `https://github.com/pedrocollazo1988/crotulus.ai.git`
  (sin token embebido); el `fetch` funciona con `GITHUB_TOKEN`. En clones
  anteriores si habia un **token de SOLO LECTURA** embebido (huella identica a
  `GITHUB_TOKEN`). Comprobar siempre con `git config --get remote.origin.url` y
  comparar huellas (`sha256sum`), **sin imprimir el valor**.
- **Empujar a `main`**: `git push "https://<TOKEN_RW>@github.com/pedrocollazo1988/crotulus.ai.git" main`.
  `GITHUB_TOKEN` y `allhands` son de SOLO LECTURA -> 403. **2026-10-29**: el
  propietario aporto un **PAT fine-grained con Contents: R/W** y el push
  funciono (`d62cb40..cf6f256`). Ese token **NO incluye `Pull requests`**, asi
  que el agente **no puede abrir ni fusionar PRs** (403): la politica es push
  si, PR/merge no. Empujar solo cuando el propietario lo pida.
- **`/privacidad` ya existe** (commit `b9d82fd`): pagina INFORMATIVA en formato
  de acordeon (`<details>`, mismo `.faq` que "Preguntas"), 7 bloques y 18
  preguntas, en es/en/pt. Enlazada desde el pie, el consentimiento del
  formulario, el sitemap y el buscador. Contenido en `dict.privacy`; el correo
  se inyecta con el hueco `{email}` (funcion `fill()` en la pagina).
  **2026-10-29: se quito el CTA final** que llevaba al formulario de contacto
  (`section.cta` + `ContactButton`); la pagina quedo solo informativa.
- **`next lint` ya no existe en Next 16** y **`next build` ya no ejecuta ESLint**
  (`node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md`, seccion
  "next lint Command"). Por eso `eslint.config.mjs` era un **huerfano real**
  (importaba `eslint-config-next`, nunca instalado): se borro el 2026-10-21. Si
  algun dia se quiere lint, hay que instalar `eslint` + `eslint-config-next` y
  anadir un script propio.
- **Trampa de limpieza: los imports sin usar no dan error** con el `tsconfig.json`
  del proyecto (no tiene `noUnusedLocals`). Para encontrarlos:
  `npx tsc --noEmit --noUnusedLocals --noUnusedParameters`. Asi aparecieron
  `redirect`, `SITE` y 5 iconos (todos del commit inicial, no de sesiones
  recientes). Ejecutarlo tambien como red de seguridad tras cada limpieza.
- **Las clases CSS muertas se detectan comparando** las definidas en
  `globals.css` contra las que aparecen en `className`. Ojo: `button--ghost`,
  `form-status--ok` y `search__foot` no se usaban (borradas 2026-10-21). Hay que
  confirmar que no se construyan por plantilla antes de borrar.
- **`/equipo` sale vacio en local sin `.env.local`** (no hay BD): es normal, la
  pagina devuelve 200 y 96 KB. El texto "error" que aparece en el HTML es el
  payload de hidratacion de Next, **no un fallo**. No confundirlo.
- **CDP: `/json/new` exige `PUT`** (`fetch(url,{method:"PUT"})`); con `GET`
  responde "Using unsafe HTTP verb".
- **Ramas (actualizado 2026-10-29)**: **`main` = `dev_plca_ai` = `5754eca`**
  (sincronizadas; rama de trabajo `dev_plca_ai`). Antes, `dev_plca_ai` iba 60
  commits atras; se igualo con fast-forward. El trabajo reciente (chat de demo,
  Redis, biografias, textos) fue directo a `main`. Hitos anteriores en `main`:
  `00944a2` (pagina `/privacidad`, 2026-10-21), `028f131`, `32ca3f8`, `1e51394`,
  `a6f2e27` (formulario + arreglo del `svg`), `48a6eed` (widget), `6a4a061`
  (contraste), `c4aa47d` (equipo + fotos), `0018a4a` (WhatsApp del pie en texto),
  `d1b5fda` (Servicios) y `36e93f5` (redes y WhatsApp). Los tres PR (`#1`, `#2`,
  `#3`) estan
  **fusionados**. Desplegado en produccion y verificado.
- **Contacto/redes**: `SITE` (`src/lib/site.ts`) es la fuente unica. WhatsApp
  del propietario **+5359888821** (10 digitos, Cuba) y redes Instagram/Facebook.
  **Decidido 2026-10-29: el numero NO se muestra en texto en ninguna parte**;
  solo el icono/boton de WhatsApp (pie y banda CTA, componente
  `social-links.tsx`). El formulario de contacto (`contact-provider.tsx`) ya no
  lleva correo ni WhatsApp al pie. Detalle en `2026-10-20.md` y `2026-10-29.md`.
- **Modo noche/dia = automatico por el sistema operativo** (`prefers-color-scheme`),
  **no** por hora ni uso horario. Lo gestiona `src/components/theme-toggle.tsx`;
  con el toggle manual manda `localStorage.crotulus_theme` ("light"/"dark").
- El dominio de la maqueta que dio el propietario
  (`c-rotulus-ia.qvafunded.chatgpt.site`) es solo referencia de diseno.

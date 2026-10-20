/**
 * Diccionario en ESPANOL: es la fuente de verdad de los textos del sitio.
 * El tipo `Dict` se deriva de este objeto, de modo que `en.ts` y `pt.ts` no
 * compilan si les falta una clave o si anaden una que aqui no existe.
 */
export const es = {
  meta: {
    title: "C-ROTULUS IA · Menos trabas. Más negocio.",
    description:
      "Diseñamos agentes de IA a medida para que tu negocio deje atrás las tareas repetitivas y avance. Descubre qué puedes automatizar con C-ROTULUS IA.",
    teamTitle: "Equipo · C-ROTULUS IA",
    teamDescription:
      "Conoce al equipo de C-ROTULUS S.U.R.L.: las personas que diseñan, construyen y acompañan tus agentes de IA.",
  },
  a11y: {
    skip: "Saltar al contenido",
    mainNav: "Navegación principal",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    themeLight: "Activar modo noche",
    themeDark: "Activar modo día",
    langLabel: "Idioma",
    search: "Buscar",
    searchOpen: "Abrir el buscador",
    searchClose: "Cerrar el buscador",
    logoAlt: "C-ROTULUS IA · Agencia de Inteligencia Artificial",
    toTop: "Volver arriba",
    heroVisual:
      "Un agente de IA conecta atención, seguimiento y tareas del negocio",
  },
  brand: {
    name: "C-ROTULUS IA",
    sub: "Agencia de Inteligencia Artificial",
  },
  nav: {
    solutions: "Soluciones",
    process: "Cómo trabajamos",
    faq: "Preguntas",
    team: "Equipo",
    contact: "Hablemos de tu negocio",
  },
  search: {
    placeholder: "Buscar en la web…",
    hint: "Escribe para buscar en soluciones, equipo y preguntas.",
    empty: "Sin resultados para",
    tryOther: "Prueba con otra palabra.",
    results: "Resultados",
    typeSection: "Sección",
    typeTeam: "Equipo",
    typeFaq: "Pregunta",
    typePage: "Página",
    groupPages: "Páginas",
    groupSections: "Secciones",
    groupTeam: "Equipo",
    groupFaq: "Preguntas",
  },
  hero: {
    eyebrow: "Inteligencia artificial. Impacto real.",
    titleLine1: "Menos trabas.",
    titleLine2: "Más tiempo.",
    titleAccent: "Más negocio.",
    lead: "Tu equipo tiene talento. No lo gastes en tareas repetitivas. Creamos agentes de IA que resuelven, conectan y hacen avanzar tu negocio.",
    ctaPrimary: "Descubre qué puedes automatizar",
    ctaSecondary: "Ver cómo funciona",
    micro: "Soluciones a medida · Lenguaje claro · Sin compromiso",
    chipAttention: "Atención",
    chipSales: "Ventas",
    chipOps: "Operaciones",
    coreLabel: "EN TU EQUIPO",
    float1Title: "Una consulta. Resuelta.",
    float1Sub: "Atención que sigue el ritmo.",
    float2Title: "Un contacto. Un siguiente paso.",
    float2Sub: "Seguimiento sin olvidos.",
    float3Title: "Una tarea menos.",
    float3Sub: "Más espacio para lo importante.",
    caption: "Así podría trabajar tu negocio",
  },
  strip: {
    title: "Un negocio más ágil empieza aquí.",
    time: "Recupera tiempo",
    opportunity: "Aprovecha oportunidades",
    connect: "Conecta tus procesos",
  },
  problems: {
    eyebrow: "Lo cotidiano también se puede mejorar",
    title: "¿Tu negocio crece…<br>o crece tu lista de pendientes?",
    lead: "Las pequeñas trabas se acumulan. Encontramos dónde se atasca tu día y diseñamos una forma más inteligente de resolverlo.",
    items: [
      {
        num: "01 / ATENCIÓN",
        title: "Las mismas preguntas.<br>Una y otra vez.",
        text: "Consultas, horarios, disponibilidad. Tu equipo responde lo mismo mientras otras tareas esperan.",
      },
      {
        num: "02 / VENTAS",
        title: "Muchos contactos.<br>Poco seguimiento.",
        text: "Llegan oportunidades, pero entre mensajes y pendientes, algunas conversaciones se quedan a medias.",
      },
      {
        num: "03 / OPERACIONES",
        title: "Copiar. Pegar.<br>Volver a empezar.",
        text: "Datos que pasan a mano de una herramienta a otra. Trabajo repetitivo que frena lo que de verdad importa.",
      },
    ],
  },
  solutions: {
    eyebrow: "Agentes que se ponen a trabajar",
    title: "No es añadir IA.<br>Es <em>quitarte trabajo.</em>",
    lead: "Diseñamos cada agente alrededor de un problema concreto. Explora cómo podría ayudarte.",
    tabs: [
      {
        id: "atencion",
        title: "Atención al cliente",
        sub: "Respuestas claras, sin hacer esperar.",
        panelTitle: "Agente de atención",
        user: "Hola, ¿tienen citas disponibles esta semana?",
        agent:
          "¡Hola! Puedo ayudarte a consultar la disponibilidad. ¿Qué servicio necesitas y qué día te viene mejor?",
        reply: "Una consulta el jueves por la tarde.",
        event: "✓ Recoge la información y prepara el siguiente paso.",
      },
      {
        id: "ventas",
        title: "Ventas y seguimiento",
        sub: "Cada oportunidad, con un siguiente paso.",
        panelTitle: "Agente de ventas y seguimiento",
        user: "Me interesa el servicio, pero necesito más información.",
        agent:
          "Claro. Cuéntame qué necesitas resolver y te ayudo a encontrar la opción adecuada. Si hace falta, preparo tu consulta para el equipo.",
        reply: "Busco una solución para mi tienda.",
        event: "✓ Organiza el contacto y facilita el seguimiento comercial.",
      },
      {
        id: "operaciones",
        title: "Operaciones internas",
        sub: "Menos tareas manuales entre herramientas.",
        panelTitle: "Agente de operaciones",
        user: "Necesito preparar el resumen de las solicitudes de hoy.",
        agent:
          "Puedo organizar la información de las herramientas conectadas y preparar un borrador para que lo revises. ¿Lo agrupamos por estado?",
        reply: "Sí, separa las pendientes de las completadas.",
        event: "✓ Prepara un resumen y deja la revisión en tus manos.",
      },
    ],
    panelBrand: "C-ROTULUS IA / Ejemplo ilustrativo",
    demoBadge: "Demo",
    note: "Simulación. Las funciones finales dependen de tus procesos y de las herramientas que conectemos.",
  },
  process: {
    eyebrow: "De la idea a tu día a día",
    title:
      "Primero entendemos tu negocio.<br>Después, construimos la solución.",
    steps: [
      {
        num: "01 — ESCUCHAMOS",
        title: "Cuéntanos qué te frena.",
        text: "Revisamos tus tareas, tus herramientas y los puntos donde se pierde tiempo. Elegimos un problema que valga la pena resolver.",
      },
      {
        num: "02 — DISEÑAMOS",
        title: "Un agente con propósito.",
        text: "Definimos qué hará, qué información necesita y cuándo debe pedir ayuda a una persona. Lo probamos con situaciones de tu negocio.",
      },
      {
        num: "03 — ACOMPAÑAMOS",
        title: "Lo ponemos en marcha.",
        text: "Integramos, ajustamos y revisamos los resultados contigo. Tu equipo aprende a usarlo y mantiene el control.",
      },
    ],
    workflowHeading: "De pendiente a resuelto",
    workflowLabel: "Un flujo posible",
    workflowAria:
      "De una solicitud a una acción, con revisión de tu equipo",
    workflow: [
      { title: "Llega una solicitud", sub: "Un mensaje, una consulta, una tarea." },
      { title: "Tu agente la organiza", sub: "Entiende el contexto y prepara la acción." },
      { title: "Tu negocio avanza", sub: "Con los controles de tu equipo." },
    ],
    fitTitle:
      "Tu sector cambia. Nuestro punto de partida es el mismo: tu problema.",
    fitSub: "Comercio, servicios, hostelería, equipos comerciales y más.",
    fitCta: "Exploremos tu caso",
  },
  faq: {
    eyebrow: "Sin tecnicismos",
    title: "Preguntas reales.<br>Respuestas claras.",
    lead: "No necesitas saber de inteligencia artificial. Solo saber qué te gustaría mejorar.",
    items: [
      {
        q: "¿Qué es un agente de IA?",
        a: "Es un sistema que usa inteligencia artificial para entender una solicitud y realizar tareas definidas: responder preguntas, organizar información o coordinar pasos entre herramientas. Se diseña con límites y supervisión según tu caso.",
      },
      {
        q: "¿Sirve para un negocio pequeño?",
        a: "Sí, si existe una tarea repetitiva o un atasco concreto que compense resolver. Empezamos por una necesidad acotada y evaluamos contigo su utilidad.",
      },
      {
        q: "¿Puede trabajar con mis herramientas?",
        a: "Primero revisamos las herramientas que usas y las opciones de integración que ofrecen. Te explicamos qué se puede conectar y qué cambios serían necesarios antes de desarrollar.",
      },
      {
        q: "¿Cuánto cuesta y cuánto tarda?",
        a: "Depende de la complejidad, las conexiones y el alcance. Tras entender tu caso, definimos una propuesta con entregables, precio y plazos antes de empezar.",
      },
      {
        q: "¿Qué pasa con mis datos y mi equipo?",
        a: "Acordamos qué información necesita el agente, quién puede acceder y qué acciones requieren revisión. Tu equipo participa en las pruebas y conserva los puntos de control definidos.",
      },
    ],
  },
  cta: {
    eyebrow: "Tu próximo paso es sencillo",
    title: "¿Qué tarea te gustaría<br>dejar de hacer mañana?",
    text: "Cuéntanos tu reto. Empecemos por ahí.",
    button: "Hablemos de tu negocio",
  },
  footer: {
    tagline: "Inteligencia artificial para que tu negocio avance.",
    rights: "Todos los derechos reservados.",
    legal: "C-ROTULUS S.U.R.L.",
    linksTitle: "Enlaces",
  },
  contact: {
    eyebrow: "Empecemos por tu reto",
    title: "Tu negocio tiene un siguiente paso.",
    lead: "Cuéntanos qué necesitas y te responderemos en menos de 24 horas laborables.",
    name: "Tu nombre",
    namePh: "¿Cómo te llamas?",
    email: "Tu correo electrónico",
    emailPh: "nombre@correo.com",
    phone: "Teléfono (opcional)",
    phonePh: "600 000 000",
    company: "Tu negocio o sector",
    companyPh: "Ej. tienda, restaurante, servicios…",
    service: "¿Dónde necesitas ayuda?",
    message: "¿Qué tarea o problema quieres resolver?",
    messagePh: "Cuéntanos qué te quita tiempo o frena tu negocio.",
    consent:
      "He leído y acepto la política de privacidad. Autorizo el tratamiento de mis datos para responder a esta consulta.",
    consentRequired: "Debes aceptar la política de privacidad.",
    submit: "Enviar mi consulta",
    sending: "Enviando…",
    successTitle: "¡Gracias! Hemos recibido tu mensaje.",
    successText:
      "Te hemos registrado correctamente y te responderemos muy pronto en el correo que nos has indicado.",
    errorTitle: "No se ha podido enviar",
    errorText:
      "Inténtalo de nuevo en unos minutos o escríbenos directamente por correo.",
    close: "Cerrar",
    orWrite: "O escríbenos directamente",
  },
  team: {
    eyebrow: "Las personas detrás",
    title: "Un equipo pequeño,<br>implicado y directo.",
    lead: "En C-ROTULUS trabajamos cerca del negocio: pocas capas, decisiones rápidas y alguien que conoce tu caso de principio a fin.",
    empty: "Estamos preparando las fichas del equipo. Vuelve pronto.",
    valuesEyebrow: "Cómo trabajamos",
    valuesTitle: "Nuestros principios",
    values: [
      {
        title: "Cercanía",
        text: "Hablamos claro y sin tecnicismos. Siempre sabes en qué punto está tu proyecto y por qué.",
      },
      {
        title: "Resultados",
        text: "Nos medimos por el tiempo que recuperas y por lo que tu equipo deja de repetir cada día.",
      },
      {
        title: "Confianza",
        text: "Definimos límites, permisos y puntos de control. La IA propone; tu equipo decide.",
      },
    ],
    joinEyebrow: "Únete al equipo",
    joinTitle: "¿Te apetece construir con nosotros?",
    joinText:
      "Siempre buscamos personas curiosas que disfruten resolviendo problemas reales de negocio.",
    joinCta: "Escríbenos",
    ctaEyebrow: "Tu próximo paso es sencillo",
    ctaTitle: "Hablemos de tu proyecto.",
    ctaButton: "Contactar",
  },
  notFound: {
    title: "Página no encontrada",
    text: "La página que buscas no existe o ha cambiado de sitio.",
    cta: "Volver al inicio",
  },
};

export type Dict = typeof es;

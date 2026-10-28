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
    privacyTitle: "Privacidad y protección de datos · C-ROTULUS IA",
    privacyDescription:
      "Qué datos personales tratamos en C-ROTULUS IA, para qué los usamos, con quién los compartimos y qué derechos tienes según el marco europeo, estadounidense y latinoamericano.",
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
    services: "Servicios",
    solutions: "Soluciones",
    process: "Cómo trabajamos",
    faq: "Preguntas",
    team: "Equipo",
    contact: "Hablemos de tu negocio",
    privacy: "Privacidad",
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
    groupServices: "Servicios",
    groupSections: "Secciones",
    groupTeam: "Equipo",
    groupFaq: "Preguntas",
  },
  hero: {
    eyebrow: "Inteligencia artificial para empresas.",
    titleLine1: "Menos tareas",
    titleLine2: "repetitivas.",
    titleAccent: "Más tiempo para crecer.",
    lead: "Haz que tu negocio trabaje de forma más inteligente. Combinamos inteligencia artificial, automatización y marketing digital para reducir tareas repetitivas, optimizar tus operaciones y convertir más oportunidades en resultados.",
    ctaPrimary: "Quiero mejorar mi negocio",
    ctaSecondary: "Descubrir nuestros servicios",
    micro: "Soluciones a medida · Atención personalizada · Sin compromiso",
    chipAttention: "Atención al cliente",
    chipSales: "Ventas",
    chipOps: "Automatización",
    coreValue: "IA",
    coreLabel: "A TU SERVICIO",
    float1Title: "Una consulta. Resuelta.",
    float1Sub: "Atención ágil para tus clientes.",
    float2Title: "Un contacto. Un siguiente paso.",
    float2Sub: "Seguimiento comercial organizado.",
    float3Title: "Una tarea menos.",
    float3Sub: "Más tiempo para lo importante.",
    caption: "Así puede ayudarte la IA",
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
  lead: "Prueba nuestros agentes de IA y descubre cómo pueden ayudar a tu negocio.",

  tabs: [
    {
      id: "dental",
      title: "Clínica dental",
      sub: "Atención y orientación a pacientes.",
      panelTitle: "Agente para clínicas dentales",
      user: "Hola, ¿cómo puedo solicitar una cita?",
      agent: "¡Hola! Puedo orientarte sobre cómo solicitar una cita. ¿Qué tipo de consulta necesitas?",
      reply: "Quiero una revisión dental.",
      event: "✓ Simula la atención inicial al paciente.",
    },
    {
      id: "restaurant",
      title: "Restaurante",
      sub: "Consultas y solicitudes de reserva.",
      panelTitle: "Agente para restaurantes",
      user: "Hola, quiero reservar una mesa.",
      agent: "¡Bienvenido! Puedo ayudarte a preparar una solicitud de reserva. ¿Para cuántas personas y qué día?",
      reply: "Para cuatro personas el sábado.",
      event: "✓ Simula la atención de solicitudes de reserva.",
    },
    {
      id: "realestate",
      title: "Inmobiliaria",
      sub: "Ayuda para encontrar una propiedad.",
      panelTitle: "Agente inmobiliario",
      user: "Busco un apartamento de dos habitaciones.",
      agent: "Puedo ayudarte a definir lo que buscas. ¿En qué zona te gustaría vivir y cuál es tu presupuesto aproximado?",
      reply: "Busco algo económico cerca del centro.",
      event: "✓ Identifica preferencias y necesidades del cliente.",
    },
    {
      id: "administration",
      title: "Automatización administrativa",
      sub: "Menos tareas repetitivas.",
      panelTitle: "Agente de automatización administrativa",
      user: "Quiero organizar mejor mis facturas.",
      agent: "Podemos estudiar cómo automatizar la clasificación de facturas, extraer sus datos y preparar informes. ¿Cómo las gestionas actualmente?",
      reply: "Las recibo por correo y las paso a Excel.",
      event: "✓ Propone oportunidades de automatización.",
    },
  ],

  panelBrand: "C-ROTULUS IA / Demostración interactiva",
  demoBadge: "IA en demo",
  note: "Demostración con IA. Las citas, reservas y acciones externas no se ejecutan realmente.",

  chatWelcome: "¡Hola! Soy un agente de demostración de C-ROTULUS IA. Escribe tu pregunta y descubre cómo puedo ayudarte.",
  chatPlaceholder: "Escribe tu pregunta aquí...",
  sendButton: "Enviar",
  sendingLabel: "Pensando...",
  errorMessage: "No he podido responder en este momento. Inténtalo de nuevo.",
  emptyMessage: "Escribe una pregunta para comenzar.",
  chatDisclaimer: "Esta conversación es una demostración. No introduzcas información personal ni confidencial.",
},
  services: {
    eyebrow: "Nuestros servicios",
    title: "Soluciones de inteligencia artificial para tu negocio",
    lead: "Desde la atención al cliente hasta la automatización de procesos y el seguimiento comercial, diseñamos soluciones prácticas adaptadas a las necesidades de tu empresa.",
    numSr: "Servicio ",
    cardCta: "Consultar este servicio",
    items: [
      {
        num: "01",
        title: "Agentes de IA para atención al cliente",
        text: "Ofrece respuestas rápidas a las consultas habituales, informa sobre tus productos o servicios y atiende a tus clientes incluso fuera del horario comercial.",
        channels: [
          { key: "whatsapp", label: "WhatsApp" },
          { key: "instagram", label: "Instagram" },
          { key: "facebook", label: "Facebook" },
          { key: "web", label: "en la Web" },
        ],
      },
      {
        num: "02",
        title: "Automatización de tareas administrativas",
        text: "Reduce el trabajo manual en tareas repetitivas, organiza la información y agiliza los procesos administrativos de tu empresa.",
      },
      {
        num: "03",
        title: "Automatización del seguimiento comercial",
        text: "Organiza tus contactos, programa recordatorios y facilita el seguimiento de clientes potenciales para reducir las oportunidades olvidadas.",
      },
    ],
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
  social: {
    title: "Síguenos",
    whatsapp: "WhatsApp",
    instagram: "Instagram",
    facebook: "Facebook",
    message: "Hola, quiero información sobre los servicios de C-ROTULUS IA.",
  },
  contact: {
    eyebrow: "Empecemos por tu reto",
    title: "Tu negocio tiene un siguiente paso.",
    lead: "Prepara un resumen para tu consulta. Solo necesitas un minuto.",
    name: "Tu nombre",
    namePh: "¿Cómo te llamas?",
    email: "Tu correo electrónico",
    emailPh: "nombre@correo.com",
    phone: "Teléfono",
    phonePh: "600 000 000",
    company: "Tu negocio o sector",
    companyPh: "Ej. tienda, restaurante, servicios…",
    service: "¿Dónde necesitas ayuda?",
    // Traducciones del desplegable: el VALOR enviado es el canonico de
    // `CONTACT_SERVICES` (mismo orden), para no traducir los datos guardados.
    serviceOptions: [
      "Agentes de IA para atención al cliente",
      "Automatización de tareas administrativas",
      "Automatización del seguimiento comercial",
    ],
    message: "¿Qué tarea o problema quieres resolver?",
    messagePh: "Cuéntanos qué te quita tiempo o frena tu negocio.",
    consent:
      "He leído y acepto la {privacy}. Autorizo el tratamiento de mis datos para responder a esta consulta.",
    privacyLink: "política de privacidad",
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
    title: "Un equipo profesional,<br>implicado y comprometido.",
    lead: "En C-ROTULUS IA trabajamos cerca del negocio: pocas capas, decisiones rápidas y alguien que conoce tu caso de principio a fin.",
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
    more: "Conoce al equipo",
    ctaEyebrow: "Tu próximo paso es sencillo",
    ctaTitle: "Hablemos de tu proyecto.",
    ctaButton: "Contactar",
  },
  /**
   * Politica de privacidad: contenido INFORMATIVO en formato de preguntas
   * frecuentes (acordeon). Cada entrada es una pregunta y su respuesta.
   * `q` admite HTML en linea (enlaces); `a` admite <strong>, <a> y <ul><li>.
   */
  privacy: {
    eyebrow: "Tus datos, claros",
    title: "Privacidad y protección<br>de datos personales",
    lead: "Esta página explica, sin tecnicismos, qué datos personales tratamos cuando usas nuestra web o nos escribes, para qué los usamos y qué derechos te reconoce la ley.",
    updated: "Última actualización",
    informativeNote:
      "Este documento es informativo y no sustituye al aviso de privacidad que, cuando corresponda, te facilitemos por escrito para un servicio concreto.",
    tocTitle: "En esta página",
    groups: [
      {
        title: "Quiénes somos y qué datos tratamos",
        items: [
          {
            q: "¿Quién es el responsable del tratamiento de mis datos?",
            a: 'El responsable es <strong>C-ROTULUS S.U.R.L.</strong>, que opera bajo la marca <strong>C-ROTULUS IA</strong> y es la entidad que decide para qué y cómo se tratan los datos que nos facilitas. Para cualquier asunto relacionado con la privacidad puedes escribir a <a href="mailto:{email}">{email}</a>.',
          },
          {
            q: "¿Qué datos personales recogemos?",
            a: "Solo los que nos das tú o los que se generan al usar la web: (1) <strong>datos de contacto y consulta</strong> del formulario: nombre, correo electrónico, teléfono, negocio o sector, área de interés y el mensaje que escribes; (2) <strong>datos técnicos</strong> de la solicitud: idioma, página de origen, dirección IP y navegador, que usamos para seguridad y para evitar el envío automático de formularios (spam); (3) <strong>preferencias</strong> guardadas en tu propio navegador: idioma y modo día/noche.",
          },
          {
            q: "¿De dónde salen los datos y es obligatorio dártelos?",
            a: "Los datos de contacto y consulta los facilitas tú. Son <strong>obligatorios</strong> el nombre, el correo, el teléfono y el mensaje: sin ellos no podemos atenderte. El negocio o sector y el área de interés son <strong>opcionales</strong>. Los datos técnicos y las preferencias se generan automáticamente al usar la web.",
          },
          {
            q: "¿Tratamos datos de categorías especiales o de menores?",
            a: "No. No solicitamos ni tratamos a propósito datos sensibles (salud, ideología, origen étnico, etc.) ni datos de menores de edad. Si nos envías información de este tipo dentro de tu mensaje, te pediremos que la retires y la eliminaremos de nuestros sistemas.",
          },
        ],
      },
      {
        title: "Para qué usamos los datos y con qué base legal",
        items: [
          {
            q: "¿Para qué usamos tus datos y con qué base legal?",
            a: "Los tratamos para: (1) <strong>atender tu consulta y responderte</strong> — base jurídica: tu consentimiento y las medidas precontractuales que solicitas; (2) <strong>gestionar la relación comercial</strong> y el seguimiento de la oportunidad — interés legítimo y, si hay contrato, su ejecución; (3) <strong>seguridad de la web y prevención del spam</strong> — interés legítimo; (4) <strong>cumplir obligaciones legales</strong> y atender responsabilidades — obligación legal. Cuando la base es el consentimiento, puedes retirarlo en cualquier momento sin que afecte a la licitud del tratamiento ya realizado.",
          },
          {
            q: "¿Usamos tus datos para decisiones automatizadas o perfilado?",
            a: "No tomamos decisiones con efectos jurídicos sobre ti ni elaboramos perfiles basados únicamente en un tratamiento automatizado. Los agentes de IA que diseñamos para terceros se configuran con límites, permisos y puntos de control revisados por personas.",
          },
        ],
      },
      {
        title: "Con quién compartimos los datos",
        items: [
          {
            q: "¿Con quién compartimos tus datos?",
            a: "No vendemos ni alquilamos tus datos a nadie. Los compartimos solo con proveedores que nos prestan un servicio y actúan por nuestra cuenta: el <strong>proveedor de alojamiento y base de datos en la nube</strong> donde se guardan los mensajes, el <strong>proveedor de correo</strong> que nos avisa de tu consulta y el <strong>proveedor de CRM</strong> donde registramos el contacto comercial. También podríamos comunicarlos a autoridades cuando la ley nos lo exija.",
          },
          {
            q: "¿Los proveedores pueden usar mis datos para sus propios fines?",
            a: "No. Con cada proveedor que trata datos por nuestra cuenta mantenemos un contrato de encargo del tratamiento que le obliga a: tratar los datos <strong>solo siguiendo nuestras instrucciones</strong>, mantener la confidencialidad de su personal, aplicar medidas de seguridad, avisarnos si hay una brecha, ayudarnos a atender tus derechos y <strong>suprimir o devolver</strong> los datos cuando termine el servicio.",
          },
          {
            q: "¿Hay transferencias internacionales de datos?",
            a: "Sí, puede haberlas, porque nuestros proveedores de nube, correo y CRM pueden estar fuera de tu país. En esos casos aplicamos un mecanismo legal válido: una <strong>decisión de adecuación</strong> de la autoridad, <strong>cláusulas contractuales tipo</strong> aprobadas por la autoridad de protección de datos o, cuando procede, tu <strong>consentimiento explícito</strong>. Puedes solicitar más información escribiéndonos a <a href=\"mailto:{email}\">{email}</a>.",
          },
        ],
      },
      {
        title: "Cuánto tiempo los guardamos",
        items: [
          {
            q: "¿Cuánto tiempo conservamos tus datos?",
            a: "Conservamos los datos del formulario mientras tu consulta o la relación comercial siga viva y, después, durante los plazos de prescripción legal que nos obligan a poder acreditarlos. Cuando dejan de ser necesarios, los <strong>eliminamos o los anonimizamos</strong> de forma segura. Las preferencias de idioma y de modo día/noche se quedan en tu navegador hasta que las borres tú.",
          },
          {
            q: "¿Qué medidas de seguridad aplicamos?",
            a: "Aplicamos medidas técnicas y organizativas proporcionadas al riesgo: <strong>cifrado en tránsito</strong>, acceso restringido a la base de datos, contraseñas protegidas, registro de las operaciones y copias de seguridad. Ninguna medida es infalible al 100 %, pero si se produjera una brecha que afecte a tus derechos te lo comunicaremos sin dilación indebida.",
          },
        ],
      },
      {
        title: "Tus derechos",
        items: [
          {
            q: "¿Qué derechos tienes sobre tus datos?",
            a: "Puedes <strong>acceder</strong> a tus datos, <strong>rectificarlos</strong> si son inexactos, <strong>suprimirlos</strong> cuando ya no sean necesarios, <strong>limitar</strong> u <strong>oponerte</strong> a su tratamiento, pedir su <strong>portabilidad</strong> y <strong>retirar tu consentimiento</strong> en cualquier momento. También tienes derecho a no ser discriminado por ejercer estos derechos. Escríbenos a <a href=\"mailto:{email}\">{email}</a> y responderemos en el plazo legal aplicable (con carácter general, un mes).",
          },
          {
            q: "¿Cómo puedes ejercerlos y ante quién puedes reclamar?",
            a: "Basta con que nos escribas a <a href=\"mailto:{email}\">{email}</a> indicando qué derecho quieres ejercer; podemos pedirte que acredites tu identidad para evitar accesos indebidos. Si no quedas satisfecho, puedes <strong>reclamar ante la autoridad de protección de datos</strong> de tu país. En la Unión Europea, además, tienes derecho a presentar una reclamación ante la autoridad de control de tu Estado miembro.",
          },
        ],
      },
      {
        title: "Cookies y tecnologías parecidas",
        items: [
          {
            q: "¿Usamos cookies o herramientas de seguimiento?",
            a: "No usamos cookies de publicidad ni de análisis con fines de perfilado. Solo guardamos en tu navegador lo <strong>estrictamente necesario</strong> para recordar tu idioma y tu modo día/noche, y cargamos el <strong>widget de chat</strong> de un tercero cuando está activo, que puede instalar sus propias cookies para funcionar. Puedes borrarlas o bloquearlas desde los ajustes de tu navegador.",
          },
        ],
      },
      {
        title: "Marco europeo, Estados Unidos y América Latina",
        items: [
          {
            q: "Si estás en la Unión Europea, ¿qué debes saber?",
            a: "Tratamos tus datos conforme al <strong>Reglamento (UE) 2016/679 (RGPD)</strong>. Esto significa que te informamos de la identidad del responsable, de las finalidades y bases jurídicas, de los destinatarios, de las transferencias internacionales y de sus garantías, del plazo de conservación y de todos tus derechos, incluido el de reclamar ante una autoridad de control. Las transferencias fuera del Espacio Económico Europeo se amparan en una decisión de adecuación o en cláusulas contractuales tipo.",
          },
          {
            q: "Si estás en Estados Unidos, ¿qué debes saber?",
            a: "Aplicamos la normativa de privacidad que corresponda, incluida la de <strong>California (CCPA/CPRA)</strong> cuando resulte aplicable: informamos de las categorías de datos que recogemos, las finalidades, las categorías de terceros y los plazos de conservación. <strong>No vendemos ni compartimos tus datos personales</strong> con fines de publicidad, así que no hay que ejercer ninguna exclusión. Si lo pides, atenderemos tus derechos de conocer, eliminar y corregir en los plazos legales (con carácter general, 45 días, prorrogables una vez).",
          },
          {
            q: "Si estás en América Latina, ¿qué debes saber?",
            a: "También reconocemos los derechos que te otorga la normativa de tu país: en <strong>Brasil</strong>, la <strong>LGPD</strong> (confirmación, acceso, corrección, anonimización, portabilidad y supresión); en <strong>México</strong>, la <strong>LFPDPPP</strong> y tus derechos <strong>ARCO</strong> (acceso, rectificación, cancelación y oposición); en <strong>Colombia</strong>, la <strong>Ley 1581 de 2012</strong> (conocer, actualizar, rectificar, suprimir y revocar la autorización); en <strong>Argentina</strong>, la <strong>Ley 25.326</strong> (acceso, rectificación y supresión); y en <strong>Cuba</strong>, la <strong>Ley 149 de 2022</strong> (acceso, rectificación, cancelación y oposición). En todos los casos puedes ejercerlos escribiéndonos a <a href=\"mailto:{email}\">{email}</a>.",
          },
          {
            q: "¿Qué pasa si cambiamos esta política?",
            a: "Podemos actualizarla para reflejar cambios legales o de nuestros servicios. Publicaremos siempre la versión vigente en esta misma página con su <strong>fecha de actualización</strong> y, si el cambio es sustancial, te lo comunicaremos por un medio razonable.",
          },
        ],
      },
    ],
    contact: {
      title: "¿Hablamos de tus datos?",
      text: "Si tienes cualquier duda sobre esta política o quieres ejercer tus derechos, escríbenos y te respondemos.",
      button: "Escríbenos",
    },
  },
  notFound: {
    title: "Página no encontrada",
    text: "La página que buscas no existe o ha cambiado de sitio.",
    cta: "Volver al inicio",
  },
};

export type Dict = typeof es;

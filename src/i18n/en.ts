import type { Dict } from "./es";

/** Traduccion al INGLES. El tipo `Dict` obliga a mantener la misma forma. */
export const en: Dict = {
  meta: {
    title: "C-ROTULUS AI · Less friction. More business.",
    description:
      "We build custom AI agents so your business can leave repetitive tasks behind and move forward. Discover what you can automate with C-ROTULUS AI.",
    teamTitle: "Team · C-ROTULUS AI",
    teamDescription:
      "Meet the team at C-ROTULUS S.U.R.L.: the people who design, build and support your AI agents.",
    privacyTitle: "Privacy and data protection · C-ROTULUS AI",
    privacyDescription:
      "What personal data we process at C-ROTULUS IA, why we use it, who we share it with and the rights you have under European, United States and Latin American law.",
  },
  a11y: {
    skip: "Skip to content",
    mainNav: "Main navigation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    themeLight: "Turn on dark mode",
    themeDark: "Turn on light mode",
    langLabel: "Language",
    search: "Search",
    searchOpen: "Open search",
    searchClose: "Close search",
    logoAlt: "C-ROTULUS AI · Artificial Intelligence Agency",
    toTop: "Back to top",
    heroVisual: "An AI agent connects customer service, follow-up and business tasks",
  },
  brand: {
    name: "C-ROTULUS AI",
    sub: "Artificial Intelligence Agency",
  },
  nav: {
    services: "Services",
    solutions: "Solutions",
    process: "How we work",
    faq: "Questions",
    team: "Team",
    contact: "Let's talk about your business",
    privacy: "Privacy",
  },
  search: {
    placeholder: "Search the site…",
    hint: "Start typing to search solutions, team and questions.",
    empty: "No results for",
    tryOther: "Try another word.",
    results: "Results",
    typeSection: "Section",
    typeTeam: "Team",
    typeFaq: "Question",
    typePage: "Page",
    groupPages: "Pages",
    groupServices: "Services",
    groupSections: "Sections",
    groupTeam: "Team",
    groupFaq: "Questions",
  },
  hero: {
    eyebrow: "Artificial intelligence. Real impact.",
    titleLine1: "Less friction.",
    titleLine2: "More time.",
    titleAccent: "More business.",
    lead: "Your team has talent. Don't spend it on repetitive tasks. We build AI agents that solve, connect and move your business forward.",
    ctaPrimary: "Find out what you can automate",
    ctaSecondary: "See how it works",
    micro: "Tailored solutions · Plain language · No commitment",
    chipAttention: "Support",
    chipSales: "Sales",
    chipOps: "Operations",
    coreValue: "AI",
    coreLabel: "ON YOUR TEAM",
    float1Title: "One query. Resolved.",
    float1Sub: "Support that keeps up.",
    float2Title: "One contact. One next step.",
    float2Sub: "Follow-up without forgetting.",
    float3Title: "One task less.",
    float3Sub: "More room for what matters.",
    caption: "This is how your business could work",
  },
  strip: {
    title: "A more agile business starts here.",
    time: "Win back time",
    opportunity: "Seize opportunities",
    connect: "Connect your processes",
  },
  problems: {
    eyebrow: "Everyday work can be improved too",
    title: "Is your business growing…<br>or is your to-do list?",
    lead: "Small blockers pile up. We find where your day gets stuck and design a smarter way to solve it.",
    items: [
      {
        num: "01 / SUPPORT",
        title: "The same questions.<br>Over and over.",
        text: "Enquiries, opening hours, availability. Your team answers the same thing while other tasks wait.",
      },
      {
        num: "02 / SALES",
        title: "Lots of contacts.<br>Little follow-up.",
        text: "Opportunities arrive, but between messages and to-dos, some conversations fade out.",
      },
      {
        num: "03 / OPERATIONS",
        title: "Copy. Paste.<br>Start again.",
        text: "Data passed by hand from one tool to another. Repetitive work that holds back what really matters.",
      },
    ],
  },
  solutions: {
  eyebrow: "AI agents that get to work",
  title: "It's not adding AI.<br>It's <em>taking work off you.</em>",
  lead: "Try our AI agents and discover how they can help your business.",

  tabs: [
    {
      id: "dental",
      title: "Dental clinic",
      sub: "Patient support and guidance.",
      panelTitle: "Dental clinic agent",
      user: "Hello, how can I request an appointment?",
      agent: "Hello! I can guide you through requesting an appointment. What type of consultation do you need?",
      reply: "I'd like a dental check-up.",
      event: "✓ Simulates initial patient support.",
    },
    {
      id: "restaurant",
      title: "Restaurant",
      sub: "Questions and reservation requests.",
      panelTitle: "Restaurant agent",
      user: "Hello, I'd like to book a table.",
      agent: "Welcome! I can help prepare a reservation request. For how many people and on which day?",
      reply: "For four people on Saturday.",
      event: "✓ Simulates handling reservation requests.",
    },
    {
      id: "realestate",
      title: "Real estate",
      sub: "Help finding the right property.",
      panelTitle: "Real estate agent",
      user: "I'm looking for a two-bedroom apartment.",
      agent: "I can help you define what you're looking for. Which area would you prefer, and what's your approximate budget?",
      reply: "Something affordable near the city centre.",
      event: "✓ Identifies the customer's needs and preferences.",
    },
    {
      id: "administration",
      title: "Administrative automation",
      sub: "Fewer repetitive tasks.",
      panelTitle: "Administrative automation agent",
      user: "I want to organise my invoices more efficiently.",
      agent: "We can explore automating invoice classification, extracting invoice data, and preparing reports. How do you manage invoices today?",
      reply: "I receive them by email and transfer the details to Excel.",
      event: "✓ Identifies automation opportunities.",
    },
  ],

  panelBrand: "C-ROTULUS AI / Interactive demo",
  demoBadge: "AI demo",
  note: "AI demonstration. Appointments, reservations, and external actions are not actually executed.",

  chatWelcome: "Hello! I'm a C-ROTULUS AI demonstration agent. Type your question and discover how I can help.",
  chatPlaceholder: "Type your question here...",
  sendButton: "Send",
  sendingLabel: "Thinking...",
  errorMessage: "I couldn't respond right now. Please try again.",
  emptyMessage: "Type a question to get started.",
  chatDisclaimer: "This conversation is a demonstration. Don't enter personal or confidential information.",
},
  services: {
    eyebrow: "Services",
    title: "AI agent and automation services for your business",
    lead: "Three concrete ways to take repetitive work off your team. Pick the one closest to your day-to-day.",
    numSr: "Service ",
    cardCta: "Ask about this service",
    items: [
      {
        num: "01",
        title: "AI agents for customer support",
        text: "Assistants that answer questions and resolve your customers' enquiries.",
        channels: [
          { key: "whatsapp", label: "WhatsApp" },
          { key: "instagram", label: "Instagram" },
          { key: "facebook", label: "Facebook" },
          { key: "web", label: "on the Web" },
        ],
      },
      {
        num: "02",
        title: "Automation of administrative tasks",
        text: "Repetitive internal processes that run on their own.",
      },
      {
        num: "03",
        title: "Automation of sales follow-up",
        text: "Automatic follow-up of leads and prospective customers.",
      },
    ],
  },
  process: {
    eyebrow: "From idea to your daily work",
    title: "First we understand your business.<br>Then we build the solution.",
    steps: [
      {
        num: "01 — WE LISTEN",
        title: "Tell us what's slowing you down.",
        text: "We review your tasks, your tools and the points where time is lost. We pick a problem worth solving.",
      },
      {
        num: "02 — WE DESIGN",
        title: "An agent with a purpose.",
        text: "We define what it will do, what information it needs and when it should ask a person for help. We test it with situations from your business.",
      },
      {
        num: "03 — WE SUPPORT",
        title: "We get it running.",
        text: "We integrate, adjust and review the results with you. Your team learns to use it and keeps control.",
      },
    ],
    workflowHeading: "From to-do to done",
    workflowLabel: "One possible flow",
    workflowAria: "From a request to an action, with your team's review",
    workflow: [
      { title: "A request arrives", sub: "A message, a query, a task." },
      { title: "Your agent organises it", sub: "It understands the context and prepares the action." },
      { title: "Your business moves on", sub: "With your team's controls." },
    ],
    fitTitle: "Your sector changes. Our starting point is the same: your problem.",
    fitSub: "Retail, services, hospitality, sales teams and more.",
    fitCta: "Let's explore your case",
  },
  faq: {
    eyebrow: "No jargon",
    title: "Real questions.<br>Clear answers.",
    lead: "You don't need to know about artificial intelligence. Just what you'd like to improve.",
    items: [
      {
        q: "What is an AI agent?",
        a: "It's a system that uses artificial intelligence to understand a request and carry out defined tasks: answering questions, organising information or coordinating steps between tools. It's designed with limits and supervision for your case.",
      },
      {
        q: "Does it work for a small business?",
        a: "Yes, if there's a repetitive task or a specific blocker worth solving. We start with a focused need and assess its usefulness with you.",
      },
      {
        q: "Can it work with my tools?",
        a: "First we review the tools you use and the integration options they offer. We explain what can be connected and what changes would be needed before developing.",
      },
      {
        q: "How much does it cost and how long does it take?",
        a: "It depends on the complexity, the connections and the scope. After understanding your case, we define a proposal with deliverables, price and timelines before starting.",
      },
      {
        q: "What about my data and my team?",
        a: "We agree on what information the agent needs, who can access it and which actions require review. Your team takes part in the tests and keeps the defined control points.",
      },
    ],
  },
  cta: {
    eyebrow: "Your next step is simple",
    title: "Which task would you like<br>to stop doing tomorrow?",
    text: "Tell us your challenge. Let's start there.",
    button: "Let's talk about your business",
  },
  footer: {
    tagline: "Artificial intelligence to move your business forward.",
    rights: "All rights reserved.",
    legal: "C-ROTULUS S.U.R.L.",
    linksTitle: "Links",
  },
  social: {
    title: "Follow us",
    whatsapp: "WhatsApp",
    instagram: "Instagram",
    facebook: "Facebook",
    message: "Hi, I'd like information about C-ROTULUS AI services.",
  },
  contact: {
    eyebrow: "Let's start with your challenge",
    title: "Your business has a next step.",
    lead: "Prepare a summary for your enquiry. It only takes a minute.",
    name: "Your name",
    namePh: "What's your name?",
    email: "Your email",
    emailPh: "name@email.com",
    phone: "Phone",
    phonePh: "+34 600 000 000",
    company: "Your business or sector",
    companyPh: "E.g. shop, restaurant, services…",
    service: "Where do you need help?",
    serviceOptions: [
      "AI agents for customer support",
      "Automation of administrative tasks",
      "Automation of sales follow-up",
    ],
    message: "Which task or problem would you like to solve?",
    messagePh: "Tell us what takes up your time or slows your business down.",
    consent:
      "I have read and accept the {privacy}. I authorise the processing of my data to answer this enquiry.",
    privacyLink: "privacy policy",
    consentRequired: "You must accept the privacy policy.",
    submit: "Send my enquiry",
    sending: "Sending…",
    successTitle: "Thank you! We've received your message.",
    successText:
      "We've registered it correctly and will get back to you very soon at the email you gave us.",
    errorTitle: "It couldn't be sent",
    errorText: "Please try again in a few minutes or email us directly.",
    close: "Close",
    orWrite: "Or email us directly",
  },
  team: {
    eyebrow: "The people behind it",
    title: "A professional team,<br>committed and involved.",
    lead: "At C-ROTULUS AI we work close to the business: few layers, quick decisions and someone who knows your case from start to finish.",
    empty: "We're preparing the team profiles. Come back soon.",
    valuesEyebrow: "How we work",
    valuesTitle: "Our principles",
    values: [
      {
        title: "Closeness",
        text: "We speak plainly, without jargon. You always know where your project stands and why.",
      },
      {
        title: "Results",
        text: "We measure ourselves by the time you win back and by what your team stops repeating every day.",
      },
      {
        title: "Trust",
        text: "We define limits, permissions and control points. The AI proposes; your team decides.",
      },
    ],
    joinEyebrow: "Join the team",
    joinTitle: "Fancy building with us?",
    joinText:
      "We're always looking for curious people who enjoy solving real business problems.",
    joinCta: "Email us",
    more: "Meet the team",
    ctaEyebrow: "Your next step is simple",
    ctaTitle: "Let's talk about your project.",
    ctaButton: "Get in touch",
  },
  /**
   * Privacy policy: INFORMATIONAL content in a questions-and-answers
   * (accordion) format. Each entry is a question and its answer.
   * `q` allows inline HTML (links); `a` allows <strong>, <a> and <ul><li>.
   */
  privacy: {
    eyebrow: "Your data, clearly",
    title: "Privacy and personal<br>data protection",
    lead: "This page explains, without jargon, what personal data we process when you use our website or write to us, what we use it for and what rights the law gives you.",
    updated: "Last updated",
    informativeNote:
      "This document is informative and does not replace the privacy notice we may provide you in writing for a specific service.",
    tocTitle: "On this page",
    groups: [
      {
        title: "Who we are and what data we process",
        items: [
          {
            q: "Who is responsible for processing my data?",
            a: 'The controller is <strong>C-ROTULUS S.U.R.L.</strong>, which operates under the <strong>C-ROTULUS IA</strong> brand and decides why and how the data you give us is processed. For any privacy matter you can write to <a href="mailto:{email}">{email}</a>.',
          },
          {
            q: "What personal data do we collect?",
            a: "Only what you give us or what is generated when you use the site: (1) <strong>contact and enquiry data</strong> from the form: name, email, phone, company or sector, area of interest and your message; (2) <strong>technical data</strong> from the request: language, source page, IP address and browser, used for security and to prevent automated form submissions (spam); (3) <strong>preferences</strong> stored in your own browser: language and light/dark mode.",
          },
          {
            q: "Where does the data come from and is it mandatory to provide it?",
            a: "You provide the contact and enquiry data. Name, email, phone and message are <strong>mandatory</strong>: without them we cannot help you. Company or sector and area of interest are <strong>optional</strong>. Technical data and preferences are generated automatically when you use the site.",
          },
          {
            q: "Do we process special-category data or children's data?",
            a: "No. We do not ask for or intentionally process sensitive data (health, ideology, ethnic origin, etc.) or children's data. If you send this kind of information in your message, we will ask you to remove it and will delete it from our systems.",
          },
        ],
      },
      {
        title: "Why we use the data and on what legal basis",
        items: [
          {
            q: "Why do we use your data and on what legal basis?",
            a: "We use it to: (1) <strong>handle your enquiry and reply to you</strong> — legal basis: your consent and the pre-contractual steps you request; (2) <strong>manage the business relationship</strong> and follow up the opportunity — legitimate interest and, where there is a contract, its performance; (3) <strong>website security and spam prevention</strong> — legitimate interest; (4) <strong>comply with legal obligations</strong> and handle liabilities — legal obligation. Where the basis is consent, you can withdraw it at any time without affecting the lawfulness of processing already carried out.",
          },
          {
            q: "Do we use your data for automated decisions or profiling?",
            a: "We do not make decisions with legal effects on you or build profiles based solely on automated processing. The AI agents we design for third parties are configured with limits, permissions and checkpoints reviewed by people.",
          },
        ],
      },
      {
        title: "Who we share the data with",
        items: [
          {
            q: "Who do we share your data with?",
            a: "We do not sell or rent your data to anyone. We share it only with providers that supply us a service and act on our behalf: the <strong>cloud hosting and database provider</strong> where messages are stored, the <strong>email provider</strong> that alerts us to your enquiry and the <strong>CRM provider</strong> where we log the business contact. We may also disclose it to authorities where the law requires it.",
          },
          {
            q: "Can providers use my data for their own purposes?",
            a: "No. With every provider that processes data on our behalf we keep a data processing agreement requiring it to: process the data <strong>only on our instructions</strong>, keep its staff bound by confidentiality, apply security measures, notify us of a breach, help us handle your rights and <strong>delete or return</strong> the data when the service ends.",
          },
          {
            q: "Are there international data transfers?",
            a: 'Yes, there may be, because our cloud, email and CRM providers may be outside your country. In those cases we rely on a valid legal mechanism: an adequacy decision by the authority, <strong>standard contractual clauses</strong> approved by the data protection authority or, where applicable, your <strong>explicit consent</strong>. You can request more information by writing to <a href="mailto:{email}">{email}</a>.',
          },
        ],
      },
      {
        title: "How long we keep it",
        items: [
          {
            q: "How long do we keep your data?",
            a: "We keep the form data while your enquiry or the business relationship is alive and, afterwards, for the legal limitation periods that require us to be able to prove it. When it is no longer needed, we <strong>delete or anonymise</strong> it securely. Language and light/dark preferences stay in your browser until you delete them.",
          },
          {
            q: "What security measures do we apply?",
            a: "We apply technical and organisational measures proportionate to the risk: <strong>encryption in transit</strong>, restricted database access, protected passwords, activity logging and backups. No measure is 100% infallible, but if a breach affecting your rights occurred we would tell you without undue delay.",
          },
        ],
      },
      {
        title: "Your rights",
        items: [
          {
            q: "What rights do you have over your data?",
            a: 'You can <strong>access</strong> your data, <strong>rectify</strong> it if inaccurate, <strong>erase</strong> it when no longer needed, <strong>restrict</strong> or <strong>object</strong> to its processing, request its <strong>portability</strong> and <strong>withdraw your consent</strong> at any time. You also have the right not to be discriminated against for exercising these rights. Write to <a href="mailto:{email}">{email}</a> and we will reply within the applicable legal deadline (generally one month).',
          },
          {
            q: "How can you exercise them and who can you complain to?",
            a: 'Just write to <a href="mailto:{email}">{email}</a> stating which right you want to exercise; we may ask you to prove your identity to prevent unauthorised access. If you are not satisfied, you can <strong>complain to the data protection authority</strong> in your country. In the European Union you also have the right to lodge a complaint with the supervisory authority of your member state.',
          },
        ],
      },
      {
        title: "Cookies and similar technologies",
        items: [
          {
            q: "Do we use cookies or tracking tools?",
            a: "We do not use advertising or analytics cookies for profiling. We only store in your browser what is <strong>strictly necessary</strong> to remember your language and light/dark mode, and we load a third party's <strong>chat widget</strong> when active, which may set its own cookies to work. You can delete or block them from your browser settings.",
          },
        ],
      },
      {
        title: "European, United States and Latin American framework",
        items: [
          {
            q: "If you are in the European Union, what should you know?",
            a: "We process your data in accordance with <strong>Regulation (EU) 2016/679 (GDPR)</strong>. This means we inform you of the controller's identity, the purposes and legal bases, the recipients, the international transfers and their safeguards, the retention period and all your rights, including the right to complain to a supervisory authority. Transfers outside the European Economic Area rely on an adequacy decision or standard contractual clauses.",
          },
          {
            q: "If you are in the United States, what should you know?",
            a: "We apply the privacy law that corresponds, including <strong>California's (CCPA/CPRA)</strong> where applicable: we disclose the categories of data we collect, the purposes, the categories of third parties and the retention periods. <strong>We do not sell or share your personal data</strong> for advertising, so there is no opt-out to exercise. On request we will honour your rights to know, delete and correct within the legal deadlines (generally 45 days, extendable once).",
          },
          {
            q: "If you are in Latin America, what should you know?",
            a: 'We also recognise the rights granted by your country\'s law: in <strong>Brazil</strong>, the <strong>LGPD</strong> (confirmation, access, correction, anonymisation, portability and deletion); in <strong>Mexico</strong>, the <strong>LFPDPPP</strong> and your <strong>ARCO</strong> rights (access, rectification, cancellation and objection); in <strong>Colombia</strong>, <strong>Law 1581 of 2012</strong> (know, update, rectify, delete and revoke authorisation); in <strong>Argentina</strong>, <strong>Law 25.326</strong> (access, rectification and deletion); and in <strong>Cuba</strong>, <strong>Law 149 of 2022</strong> (access, rectification, cancellation and objection). In every case you can exercise them by writing to <a href="mailto:{email}">{email}</a>.',
          },
          {
            q: "What happens if we change this policy?",
            a: "We may update it to reflect legal or service changes. We will always publish the current version on this same page with its <strong>last-updated date</strong> and, if the change is substantial, we will tell you by a reasonable means.",
          },
        ],
      },
    ],
    contact: {
      title: "Shall we talk about your data?",
      text: "If you have any question about this policy or want to exercise your rights, write to us and we will reply.",
      button: "Write to us",
    },
  },
  notFound: {
    title: "Page not found",
    text: "The page you're looking for doesn't exist or has moved.",
    cta: "Back to home",
  },
};

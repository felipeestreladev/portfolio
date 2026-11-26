export type Lang = "pt" | "en" | "es";

export const LINKS = {
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  phone: "+55 (45) 98435-0276",
  whatsapp: "https://wa.me/5545984350276",
  linkedin: "https://www.linkedin.com/in/felipe-gte",
  github: "https://github.com/felipeestreladev",
};

const pt = {
  meta: {
    title: "Felipe Estrela | Desenvolvedor Full Stack",
    description:
      "Portfólio de Felipe Estrela, desenvolvedor full stack de Toledo, PR. Node.js, TypeScript, Next.js e automações com IA.",
  },
  skip: "Pular para o conteúdo",
  preloader: "Carregando portfólio",
  nav: {
    about: "Sobre",
    stack: "Arsenal",
    projects: "Projetos",
    journey: "Trajetória",
    contact: "Contato",
    menu: "Menu",
    close: "Fechar",
  },
  hero: {
    eyebrow: "Desenvolvedor full stack",
    base: "Toledo, PR, Brasil",
    role: "Node.js, TypeScript e automações com IA que aguentam produção.",
    ctaProjects: "Ver projetos",
    ctaContact: "Falar comigo",
    scroll: "Role",
    badge: "Full Stack ■ IA ■ Node.js ■ TypeScript ■ Next.js ■ ",
  },
  marquee: ["Node.js", "TypeScript", "Next.js", "Agentes de IA", "MCP", "APIs", "Automação", "Docker"],
  about: {
    kicker: "01 / Sobre",
    statement:
      "Construo APIs, sistemas web e automações com IA que não caem quando o tráfego chega.",
    text1:
      "Sou de Toledo, no Paraná. Comecei em 2014 criando mods e plugins de Minecraft, passei pelos bots de Discord e hoje trabalho com desenvolvimento full stack.",
    text2:
      "Atualmente sou desenvolvedor full stack na Hagap e estudo Engenharia de Software na Biopark, com formatura em 2027.",
    stats: [
      { to: 2021, suffix: "", label: "Criando produtos desde" },
      { to: 4, suffix: "+", label: "Anos escrevendo código" },
      { to: 54, suffix: "", label: "Certificados concluídos" },
      { to: 2027, suffix: "", label: "Formatura em Eng. de Software" },
    ],
  },
  stack: {
    kicker: "02 / Arsenal",
    title: "Arsenal",
    note: "Tecnologias com as quais trabalho",
    groups: [
      { title: "Linguagens", items: ["TypeScript", "JavaScript", "Python", "C#", "Java", "Go", "PHP", "Lua", "C++", "C"] },
      { title: "Frontend", items: ["HTML5", "CSS3", "React", "Next.js", "Angular", "Vue.js", "Tailwind CSS"] },
      { title: "Backend", items: ["Node.js", "Express", "NestJS", "Django", "Spring", "GraphQL"] },
      { title: "IA e automação", items: ["Claude", "OpenCode", "DeepSeek", "Kimi", "Gemini", "n8n", "MCP", "Puppeteer", "Selenium", "Playwright"] },
      { title: "Dados", items: ["PostgreSQL", "MySQL", "MariaDB", "MongoDB", "Redis", "SQLite", "Prisma", "Supabase", "Firebase", "Elasticsearch"] },
      { title: "Infra", items: ["Docker", "Linux", "Nginx", "AWS", "Google Cloud", "Git", "GitHub Actions", "RabbitMQ", "Kafka"] },
      { title: "Ferramentas", items: ["Postman", "Insomnia", "Swagger", "Electron", "Figma", "VS Code", "Cursor", "GitHub", "npm", "Vite", "Jest", "Bash", "Obsidian"] },
    ],
  },
  projects: {
    kicker: "03 / Projetos",
    title: "Projetos",
    visit: "Visitar",
    status: { online: "No ar", offline: "Fora do ar", checking: "Verificando" },
    items: [
      {
        name: "Free Gemini API",
        desc: "API gratuita com sessões para integrar modelos Gemini em apps e automações.",
        url: "https://freegemini.felipeestrela.com.br",
        domain: "freegemini.felipeestrela.com.br",
        tag: "API",
      },
      {
        name: "AllDrive",
        desc: "Workspace unificado para Google Drive e S3, com compartilhamento rápido e gestão de armazenamento.",
        url: "https://alldrive.cloud",
        domain: "alldrive.cloud",
        tag: "Cloud",
      },
      {
        name: "Galaxy CDN",
        desc: "CDN para entrega rápida de assets, imagens e mídia, com cache distribuído.",
        url: "https://galaxycdn.com.br",
        domain: "galaxycdn.com.br",
        tag: "Infra",
      },
      {
        name: "Frameclear",
        desc: "Estúdio web para remover logos e áreas fixas de vídeos direto no navegador.",
        url: "https://frameclear.felipeestrela.com.br",
        domain: "frameclear.felipeestrela.com.br",
        tag: "Vídeo",
      },
    ],
  },
  journey: {
    kicker: "04 / Trajetória",
    title: "Trajetória",
    roles: [
      {
        period: "2023 / Atual",
        role: "Desenvolvedor Full Stack",
        company: "Hagap",
        points: [
          "Sistemas web e desktop que automatizam processos internos",
          "Automações e automações com IA para os fluxos da empresa",
          "Módulos de GPS e aplicativos mobile para gestão de equipes em campo",
          "Gestão de equipes, emissão de notas fiscais e organização de documentos",
          "Formulários personalizados e fluxos operacionais sob medida",
        ],
      },
      {
        period: "2023",
        role: "Especialista em E-commerce",
        company: "Ativa EPIS",
        points: [
          "Controle de estoque online com monitoramento para evitar rupturas",
          "Manutenção da loja: banners, ajustes de layout e conteúdo visual",
        ],
      },
      {
        period: "2021 / 2022",
        role: "Fundador e Desenvolvedor",
        company: "Lunar Bot",
        points: [
          "Bot de Discord para venda de produtos digitais, que cresceu até 35.000+ usuários",
          "Responsável por disponibilidade, desempenho e crescimento da base de clientes",
        ],
      },
    ],
    education: [
      { period: "2024 / 2027", title: "Engenharia de Software", place: "Biopark Educação, 6º período" },
      { period: "2021 / 2022", title: "Projeto Zero ao Um", place: "Biopark, melhor aluno da Turma 2" },
      { period: "2020 / 2023", title: "Ensino Médio", place: "Colégio Estadual Jardim Gisele" },
    ],
    educationTitle: "Formação",
    languagesTitle: "Idiomas",
    languages: [
      { name: "Português", level: 5, label: "Nativo" },
      { name: "Espanhol", level: 4, label: "Fluente" },
      { name: "Inglês", level: 3, label: "Intermediário" },
    ],
  },
  contact: {
    kicker: "05 / Contato",
    title: "Vamos construir algo absurdo?",
    text: "Conte o que você precisa. Respondo por e-mail.",
    emailLabel: "E-mail",
    emailMissing: "Configure NEXT_PUBLIC_CONTACT_EMAIL para exibir o e-mail aqui",
    form: {
      name: "Seu nome",
      email: "Seu e-mail",
      message: "Sua mensagem",
      send: "Enviar mensagem",
      errName: "Digite seu nome",
      errEmail: "Digite um e-mail válido",
      errMessage: "Escreva ao menos 10 caracteres",
      opening: "Abrindo seu aplicativo de e-mail",
      subject: "Contato pelo portfólio",
      viaLabel: "Enviar por",
      viaEmail: "E-mail",
      viaWhatsapp: "WhatsApp",
      sendEmail: "Enviar por e-mail",
      sendWhatsapp: "Enviar no WhatsApp",
      openingWhatsapp: "Abrindo o WhatsApp",
      greeting: "Olá Felipe, meu nome é {name} e vim pelo seu portfólio!",
    },
    social: "Redes",
  },
  footer: {
    time: "Horário em Toledo",
    top: "Voltar ao topo",
    rights: "Todos os direitos reservados",
    thanks: "Obrigado pela visita",
  },
};

export type Dict = typeof pt;

const en: Dict = {
  meta: {
    title: "Felipe Estrela | Full Stack Developer",
    description:
      "Portfolio of Felipe Estrela, full stack developer from Toledo, Brazil. Node.js, TypeScript, Next.js and AI automation.",
  },
  skip: "Skip to content",
  preloader: "Loading portfolio",
  nav: {
    about: "About",
    stack: "Arsenal",
    projects: "Projects",
    journey: "Journey",
    contact: "Contact",
    menu: "Menu",
    close: "Close",
  },
  hero: {
    eyebrow: "Full stack developer",
    base: "Toledo, PR, Brazil",
    role: "Node.js, TypeScript and AI automation built to survive production.",
    ctaProjects: "See projects",
    ctaContact: "Talk to me",
    scroll: "Scroll",
    badge: "Full Stack ■ AI ■ Node.js ■ TypeScript ■ Next.js ■ ",
  },
  marquee: ["Node.js", "TypeScript", "Next.js", "AI Agents", "MCP", "APIs", "Automation", "Docker"],
  about: {
    kicker: "01 / About",
    statement:
      "I build APIs, web systems and AI automations that stay up when the traffic shows up.",
    text1:
      "I am from Toledo, in Paraná. I started in 2014 making Minecraft mods and plugins, moved on to Discord bots and today I work in full stack development.",
    text2:
      "I am currently a full stack developer at Hagap and a Software Engineering student at Biopark, graduating in 2027.",
    stats: [
      { to: 2021, suffix: "", label: "Building products since" },
      { to: 4, suffix: "+", label: "Years writing code" },
      { to: 54, suffix: "", label: "Completed certificates" },
      { to: 2027, suffix: "", label: "Software Engineering graduation" },
    ],
  },
  stack: {
    kicker: "02 / Arsenal",
    title: "Arsenal",
    note: "Technologies I work with",
    groups: [
      { title: "Languages", items: ["TypeScript", "JavaScript", "Python", "C#", "Java", "Go", "PHP", "Lua", "C++", "C"] },
      { title: "Frontend", items: ["HTML5", "CSS3", "React", "Next.js", "Angular", "Vue.js", "Tailwind CSS"] },
      { title: "Backend", items: ["Node.js", "Express", "NestJS", "Django", "Spring", "GraphQL"] },
      { title: "AI and automation", items: ["Claude", "OpenCode", "DeepSeek", "Kimi", "Gemini", "n8n", "MCP", "Puppeteer", "Selenium", "Playwright"] },
      { title: "Data", items: ["PostgreSQL", "MySQL", "MariaDB", "MongoDB", "Redis", "SQLite", "Prisma", "Supabase", "Firebase", "Elasticsearch"] },
      { title: "Infra", items: ["Docker", "Linux", "Nginx", "AWS", "Google Cloud", "Git", "GitHub Actions", "RabbitMQ", "Kafka"] },
      { title: "Tools", items: ["Postman", "Insomnia", "Swagger", "Electron", "Figma", "VS Code", "Cursor", "GitHub", "npm", "Vite", "Jest", "Bash", "Obsidian"] },
    ],
  },
  projects: {
    kicker: "03 / Projects",
    title: "Projects",
    visit: "Visit",
    status: { online: "Online", offline: "Offline", checking: "Checking" },
    items: [
      {
        name: "Free Gemini API",
        desc: "Free API with sessions to plug Gemini models into apps and automations.",
        url: "https://freegemini.felipeestrela.com.br",
        domain: "freegemini.felipeestrela.com.br",
        tag: "API",
      },
      {
        name: "AllDrive",
        desc: "Unified workspace for Google Drive and S3, with fast sharing and storage management.",
        url: "https://alldrive.cloud",
        domain: "alldrive.cloud",
        tag: "Cloud",
      },
      {
        name: "Galaxy CDN",
        desc: "CDN for fast delivery of assets, images and media, with distributed caching.",
        url: "https://galaxycdn.com.br",
        domain: "galaxycdn.com.br",
        tag: "Infra",
      },
      {
        name: "Frameclear",
        desc: "Web studio for removing logos and fixed areas from videos right in the browser.",
        url: "https://frameclear.felipeestrela.com.br",
        domain: "frameclear.felipeestrela.com.br",
        tag: "Video",
      },
    ],
  },
  journey: {
    kicker: "04 / Journey",
    title: "Journey",
    roles: [
      {
        period: "2023 / Now",
        role: "Full Stack Developer",
        company: "Hagap",
        points: [
          "Web and desktop systems that automate internal processes",
          "Automations and AI automations for company workflows",
          "GPS modules and mobile apps for field team management",
          "Team management, invoice issuing and document organization",
          "Custom forms and tailored operational workflows",
        ],
      },
      {
        period: "2023",
        role: "E-commerce Specialist",
        company: "Ativa EPIS",
        points: [
          "Online inventory control with monitoring to prevent stockouts",
          "Storefront maintenance: banners, layout adjustments and visual content",
        ],
      },
      {
        period: "2021 / 2022",
        role: "Founder and Developer",
        company: "Lunar Bot",
        points: [
          "Discord bot for selling digital products, grown to 35,000+ users",
          "Owned availability, performance and customer base growth",
        ],
      },
    ],
    education: [
      { period: "2024 / 2027", title: "Software Engineering", place: "Biopark Educação, 6th term" },
      { period: "2021 / 2022", title: "Projeto Zero ao Um", place: "Biopark, top student of Class 2" },
      { period: "2020 / 2023", title: "High School", place: "Colégio Estadual Jardim Gisele" },
    ],
    educationTitle: "Education",
    languagesTitle: "Languages",
    languages: [
      { name: "Portuguese", level: 5, label: "Native" },
      { name: "Spanish", level: 4, label: "Fluent" },
      { name: "English", level: 3, label: "Intermediate" },
    ],
  },
  contact: {
    kicker: "05 / Contact",
    title: "Let's build something absurd?",
    text: "Tell me what you need. I reply by email.",
    emailLabel: "Email",
    emailMissing: "Set NEXT_PUBLIC_CONTACT_EMAIL to show the email here",
    form: {
      name: "Your name",
      email: "Your email",
      message: "Your message",
      send: "Send message",
      errName: "Enter your name",
      errEmail: "Enter a valid email",
      errMessage: "Write at least 10 characters",
      opening: "Opening your email app",
      subject: "Contact from the portfolio",
      viaLabel: "Send via",
      viaEmail: "Email",
      viaWhatsapp: "WhatsApp",
      sendEmail: "Send by email",
      sendWhatsapp: "Send on WhatsApp",
      openingWhatsapp: "Opening WhatsApp",
      greeting: "Hi Felipe, my name is {name} and I came from your portfolio!",
    },
    social: "Social",
  },
  footer: {
    time: "Time in Toledo",
    top: "Back to top",
    rights: "All rights reserved",
    thanks: "Thanks for visiting",
  },
};

const es: Dict = {
  meta: {
    title: "Felipe Estrela | Desarrollador Full Stack",
    description:
      "Portafolio de Felipe Estrela, desarrollador full stack de Toledo, Brasil. Node.js, TypeScript, Next.js y automatizaciones con IA.",
  },
  skip: "Saltar al contenido",
  preloader: "Cargando portafolio",
  nav: {
    about: "Sobre mí",
    stack: "Arsenal",
    projects: "Proyectos",
    journey: "Trayectoria",
    contact: "Contacto",
    menu: "Menú",
    close: "Cerrar",
  },
  hero: {
    eyebrow: "Desarrollador full stack",
    base: "Toledo, PR, Brasil",
    role: "Node.js, TypeScript y automatizaciones con IA hechas para aguantar producción.",
    ctaProjects: "Ver proyectos",
    ctaContact: "Hablemos",
    scroll: "Desliza",
    badge: "Full Stack ■ IA ■ Node.js ■ TypeScript ■ Next.js ■ ",
  },
  marquee: ["Node.js", "TypeScript", "Next.js", "Agentes de IA", "MCP", "APIs", "Automatización", "Docker"],
  about: {
    kicker: "01 / Sobre mí",
    statement:
      "Construyo APIs, sistemas web y automatizaciones con IA que no se caen cuando llega el tráfico.",
    text1:
      "Soy de Toledo, en Paraná. Empecé en 2014 creando mods y plugins de Minecraft, pasé por los bots de Discord y hoy trabajo en desarrollo full stack.",
    text2:
      "Actualmente soy desarrollador full stack en Hagap y estudio Ingeniería de Software en Biopark, con graduación en 2027.",
    stats: [
      { to: 2021, suffix: "", label: "Creando productos desde" },
      { to: 4, suffix: "+", label: "Años escribiendo código" },
      { to: 54, suffix: "", label: "Certificados completados" },
      { to: 2027, suffix: "", label: "Graduación en Ing. de Software" },
    ],
  },
  stack: {
    kicker: "02 / Arsenal",
    title: "Arsenal",
    note: "Tecnologías con las que trabajo",
    groups: [
      { title: "Lenguajes", items: ["TypeScript", "JavaScript", "Python", "C#", "Java", "Go", "PHP", "Lua", "C++", "C"] },
      { title: "Frontend", items: ["HTML5", "CSS3", "React", "Next.js", "Angular", "Vue.js", "Tailwind CSS"] },
      { title: "Backend", items: ["Node.js", "Express", "NestJS", "Django", "Spring", "GraphQL"] },
      { title: "IA y automatización", items: ["Claude", "OpenCode", "DeepSeek", "Kimi", "Gemini", "n8n", "MCP", "Puppeteer", "Selenium", "Playwright"] },
      { title: "Datos", items: ["PostgreSQL", "MySQL", "MariaDB", "MongoDB", "Redis", "SQLite", "Prisma", "Supabase", "Firebase", "Elasticsearch"] },
      { title: "Infra", items: ["Docker", "Linux", "Nginx", "AWS", "Google Cloud", "Git", "GitHub Actions", "RabbitMQ", "Kafka"] },
      { title: "Herramientas", items: ["Postman", "Insomnia", "Swagger", "Electron", "Figma", "VS Code", "Cursor", "GitHub", "npm", "Vite", "Jest", "Bash", "Obsidian"] },
    ],
  },
  projects: {
    kicker: "03 / Proyectos",
    title: "Proyectos",
    visit: "Visitar",
    status: { online: "En línea", offline: "Fuera de línea", checking: "Verificando" },
    items: [
      {
        name: "Free Gemini API",
        desc: "API gratuita con sesiones para integrar modelos Gemini en apps y automatizaciones.",
        url: "https://freegemini.felipeestrela.com.br",
        domain: "freegemini.felipeestrela.com.br",
        tag: "API",
      },
      {
        name: "AllDrive",
        desc: "Espacio de trabajo unificado para Google Drive y S3, con uso compartido rápido y gestión de almacenamiento.",
        url: "https://alldrive.cloud",
        domain: "alldrive.cloud",
        tag: "Cloud",
      },
      {
        name: "Galaxy CDN",
        desc: "CDN para entregar rápido assets, imágenes y medios, con caché distribuido.",
        url: "https://galaxycdn.com.br",
        domain: "galaxycdn.com.br",
        tag: "Infra",
      },
      {
        name: "Frameclear",
        desc: "Estudio web para quitar logos y áreas fijas de videos directamente en el navegador.",
        url: "https://frameclear.felipeestrela.com.br",
        domain: "frameclear.felipeestrela.com.br",
        tag: "Video",
      },
    ],
  },
  journey: {
    kicker: "04 / Trayectoria",
    title: "Trayectoria",
    roles: [
      {
        period: "2023 / Actual",
        role: "Desarrollador Full Stack",
        company: "Hagap",
        points: [
          "Sistemas web y de escritorio que automatizan procesos internos",
          "Automatizaciones y automatizaciones con IA para los flujos de la empresa",
          "Módulos de GPS y aplicaciones móviles para la gestión de equipos en campo",
          "Gestión de equipos, emisión de facturas y organización de documentos",
          "Formularios personalizados y flujos operativos a medida",
        ],
      },
      {
        period: "2023",
        role: "Especialista en E-commerce",
        company: "Ativa EPIS",
        points: [
          "Control de inventario en línea con monitoreo para evitar faltantes",
          "Mantenimiento de la tienda: banners, ajustes de diseño y contenido visual",
        ],
      },
      {
        period: "2021 / 2022",
        role: "Fundador y Desarrollador",
        company: "Lunar Bot",
        points: [
          "Bot de Discord para vender productos digitales, que creció hasta más de 35.000 usuarios",
          "Responsable de disponibilidad, rendimiento y crecimiento de la base de clientes",
        ],
      },
    ],
    education: [
      { period: "2024 / 2027", title: "Ingeniería de Software", place: "Biopark Educação, 6.º período" },
      { period: "2021 / 2022", title: "Projeto Zero ao Um", place: "Biopark, mejor alumno de la Clase 2" },
      { period: "2020 / 2023", title: "Educación Secundaria", place: "Colégio Estadual Jardim Gisele" },
    ],
    educationTitle: "Formación",
    languagesTitle: "Idiomas",
    languages: [
      { name: "Portugués", level: 5, label: "Nativo" },
      { name: "Español", level: 4, label: "Fluido" },
      { name: "Inglés", level: 3, label: "Intermedio" },
    ],
  },
  contact: {
    kicker: "05 / Contacto",
    title: "¿Construimos algo absurdo?",
    text: "Cuéntame qué necesitas. Respondo por correo.",
    emailLabel: "Correo",
    emailMissing: "Configura NEXT_PUBLIC_CONTACT_EMAIL para mostrar el correo aquí",
    form: {
      name: "Tu nombre",
      email: "Tu correo",
      message: "Tu mensaje",
      send: "Enviar mensaje",
      errName: "Escribe tu nombre",
      errEmail: "Escribe un correo válido",
      errMessage: "Escribe al menos 10 caracteres",
      opening: "Abriendo tu app de correo",
      subject: "Contacto desde el portafolio",
      viaLabel: "Enviar por",
      viaEmail: "Correo",
      viaWhatsapp: "WhatsApp",
      sendEmail: "Enviar por correo",
      sendWhatsapp: "Enviar por WhatsApp",
      openingWhatsapp: "Abriendo WhatsApp",
      greeting: "¡Hola Felipe, me llamo {name} y vengo de tu portafolio!",
    },
    social: "Redes",
  },
  footer: {
    time: "Hora en Toledo",
    top: "Volver arriba",
    rights: "Todos los derechos reservados",
    thanks: "Gracias por la visita",
  },
};

export const CONTENT: Record<Lang, Dict> = { pt, en, es };

/** Localidade usada para formatar numeros e horas em cada idioma. */
export const LOCALE: Record<Lang, string> = { pt: "pt-BR", en: "en-US", es: "es-ES" };
export const HTML_LANG: Record<Lang, string> = { pt: "pt-BR", en: "en", es: "es" };

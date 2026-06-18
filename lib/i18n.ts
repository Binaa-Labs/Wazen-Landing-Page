export const LOCALES = ["en", "ar"] as const;
export type Locale = (typeof LOCALES)[number];

/* English is the source of truth; `type Dictionary = typeof en` is derived
   from it, so `const ar: Dictionary` is forced to match the shape exactly —
   a missing or misnamed key fails the build. Arrays are index-coupled to the
   structural arrays in each component (icons, hrefs, prices, image src), so
   keep the order here identical to the components. */
const en = {
  nav: {
    features: "Features",
    howItWorks: "How it works",
    pricing: "Pricing",
    faq: "FAQ",
    startFree: "Start free",
    poweredBy: "Powered by Binaa Lab",
    switchToAr: "Switch to Arabic",
    switchToEn: "Switch to English",
    toDark: "Switch to dark mode",
    toLight: "Switch to light mode",
    menu: "Toggle menu",
  },
  hero: {
    badge: "Free for your first 5 clients — full platform, no limits",
    h1Line1: "Run your coaching practice from",
    h1Underlined: "one calm, organized place",
    subheadline:
      "Wazen brings your clients, plans, check-ins, progress, and messages into a single system — so you spend less time chasing and more time coaching.",
    ctaPrimary: "Start free — up to 5 clients",
    ctaSecondary: "See how it works ↓",
    trust: [
      "No credit card required",
      "Free forever for 5 clients",
      "Arabic & English",
    ],
    dashboardAlt:
      "Wazen coach dashboard showing the client roster, attention queue, and upcoming check-ins",
  },
  trustBar: {
    items: [
      "Built for UAE, GCC & MENA",
      "Arabic & English — full RTL support",
      "Free for your first 5 clients",
      "Powered by Binaa Lab",
    ],
  },
  problem: {
    eyebrow: "The scattered-tools problem",
    h2: "The problem isn't your coaching — it's your tools",
    description:
      "When clients, plans, and check-ins live across WhatsApp, spreadsheets, and PDFs, you become a full-time admin. Wazen replaces the scattered setup with one organized system.",
    oldWayHeading: "The Old Way (Scattered Tools)",
    oldWay: [
      { title: "Living in your DMs", body: "Client check-ins buried in endless WhatsApp chats" },
      { title: "Plans in spreadsheets & PDFs", body: "Files clients lose, forget, or can't open" },
      { title: "Chasing check-ins manually", body: "Texting every client individually" },
      { title: "No clear view of progress", body: "Results scattered across notes and sheets" },
    ],
    wazenWayHeading: "The Wazen Way (One System)",
    wazenWay: [
      { title: "Everything in one place", body: "Clients, plans, check-ins, progress, messages" },
      { title: "Plans in the client app", body: "Clients follow them clearly in their own app" },
      { title: "Structured check-ins", body: "Review them all from one dashboard" },
      { title: "Progress you can actually see", body: "Clear charts and summaries" },
    ],
  },
  features: {
    eyebrow: "Everything you need",
    h2: "One platform. Every tool your coaching practice needs.",
    description:
      "Stop stitching together apps. Wazen brings client management, plans, check-ins, progress tracking, and messaging into one organized system.",
    tabs: [
      {
        label: "Client Management",
        headline: "Every client, fully organized",
        body: "Manage all your clients from one dashboard. See their compliance, upcoming check-ins, active plans, and recent activity at a glance.",
        caption: "Individual client overview",
        primaryAlt: "Wazen client roster showing compliance scores for each client",
        secondaryAlt: "Individual client overview in the coach dashboard",
      },
      {
        label: "Check-ins",
        headline: "Structured check-ins, zero chasing",
        body: "Create check-in schedules for each client. They submit from their app, you review everything from one organized queue — no more hunting through messages.",
        caption: "Check-in management tab",
        primaryAlt: "Coach dashboard attention queue with submitted check-ins",
        secondaryAlt: "Check-in management tab for a single client",
      },
      {
        label: "Progress & Analytics",
        headline: "See exactly how your clients are doing",
        body: "Track weight, body metrics, and adherence over time. The analytics dashboard shows plan performance, top performers, and at-risk clients across your entire roster.",
        caption: "Analytics overview",
        primaryAlt: "Client progress charts showing a steady weight trend over time",
        secondaryAlt: "Coach analytics overview across the client roster",
      },
      {
        label: "Plans & Templates",
        headline: "Build plans once, assign to anyone",
        body: "Create workout and nutrition plans from scratch or from your template library. Assign to any client in seconds — they appear instantly in the client app.",
        caption: "Assigned workout plans",
        primaryAlt: "Template library with workout and nutrition plan templates",
        secondaryAlt: "Workout plans assigned to a client",
      },
    ],
    coachLabel: "Coach Dashboard",
    clientLabel: "Client App",
    connectedCaption:
      "A coach dashboard and a client app — working as one connected system",
  },
  how: {
    eyebrow: "How it works",
    h2: "From scattered to organized in three steps",
    description:
      "No migration headaches, no technical setup. Bring your clients in, assign their plans, and follow their progress — all from one place.",
    steps: [
      {
        title: "Add your clients",
        body: "Invite your clients by email. They join and set up their profile in the Wazen client app in minutes — no technical setup required on their end.",
        alt: "Inviting a client by email from the Wazen coach dashboard",
      },
      {
        title: "Assign plans & check-ins",
        body: "Give each client their workout and nutrition plans and check-in schedule. Everything appears instantly in their app.",
        alt: "Assigned plans as they appear in the Wazen client app",
      },
      {
        title: "Track progress & stay in touch",
        body: "Review check-ins from your dashboard, follow each client's progress charts, and message them directly — all from one organized place.",
        alt: "Progress analytics in the Wazen coach dashboard",
      },
    ],
  },
  pricing: {
    eyebrow: "Simple pricing",
    h2: "Start free. Grow on your terms.",
    description:
      "Your first 5 clients are always free. Upgrade when you're ready to grow your practice.",
    monthly: "Monthly",
    yearly: "Yearly",
    save2mo: "Save 2 months",
    mostPopular: "Most popular",
    free: "Free",
    forever: "forever",
    perMonth: "/month",
    perYear: "/year",
    plans: [
      {
        name: "Starter",
        highlight: "Up to 5 active clients",
        features: [
          "Full core platform",
          "Client app access",
          "Plans & templates",
          "Check-ins & messaging",
          "Client analytics",
          "Standard support",
        ],
        addOn: "",
        cta: "Start free",
        note: "",
        savings: "",
      },
      {
        name: "Professional",
        highlight: "20 active clients included · up to 30 with add-ons",
        features: [
          "Everything in Starter",
          "20 active clients (up to 30)",
          "Priority support",
          "Standard progress report export",
          "Scheduled messages",
          "Extra client bundles available",
        ],
        addOn: "+5 clients from $12/mo · +10 clients from $20/mo",
        cta: "Get started",
        note: "",
        savings: "Save $98/year",
      },
      {
        name: "Premium",
        highlight: "50 active clients included · scale to 100+",
        features: [
          "Everything in Professional",
          "50 active clients (scale to 100+)",
          "Highest priority support",
          "Advanced progress report export",
          "Advanced automation",
          "Suggested follow-up list",
          "Basic branding customization",
        ],
        addOn: "+10 clients from $18/mo · up to +50 clients",
        cta: "Get started",
        note: "Full white-label branding — coming soon",
        savings: "Save $198/year",
      },
    ],
    stripHeadline:
      "Most coaches pay $400+/month across separate tools. Wazen replaces all of them.",
    tools: [
      "WhatsApp (free but chaos)",
      "Spreadsheets",
      "Form tools",
      "Progress trackers",
    ],
    stripOld: "$400+/mo",
    stripNew: "Wazen from $49/mo",
  },
  why: {
    eyebrow: "Why Wazen",
    h2: "Built around how coaches actually work",
    description:
      "Designed around real coaching workflows — clients, plans, check-ins, progress, and communication — for coaches across the UAE, GCC, and MENA, in both Arabic and English.",
    statLabels: [
      "Active clients free, forever — with full core platform access",
      "Scattered tools replaced — WhatsApp, spreadsheets, PDFs, forms, notes, reminders",
      "A coach dashboard and a client app, working as one connected system",
    ],
    bilingualBadge: "العربية & English — full right-to-left support",
    profileCaption:
      "Coaches build a public profile clients can view — with active clients, programs delivered, compliance rate, and experience.",
    founderEyebrow: "Why we built this",
    founderQuote:
      "“We built Wazen because coaching shouldn’t mean living in WhatsApp threads and spreadsheets. Every coach deserves one calm, organized place to manage clients, deliver plans, and actually see progress — so the focus stays on coaching, not admin.”",
    founderName: "Naser Shadid · Founder, Wazen (by Binaa Lab)",
    profileAlt:
      "A coach's public profile in the Wazen client app, showing active clients, programs delivered, compliance rate, and years of experience",
  },
  faq: {
    eyebrow: "FAQ",
    h2: "Questions coaches ask before switching",
    items: [
      {
        q: "Is Wazen really free? What's the catch?",
        a: "No catch. Your first 5 active clients are free forever — full platform access, no credit card required, no trial timer. The free tier exists so you can run your practice on Wazen before deciding to grow. When you're ready to take on more clients, paid plans start at $49/month. Until then, nothing changes and nothing expires.",
      },
      {
        q: "Do my clients need to pay or create an account to use Wazen?",
        a: "Your clients pay nothing. Ever. You invite them to the Wazen client app and they join for free — no subscription, no hidden fees on their end. The client app is included in your plan. They access their plans, check-ins, and progress through their own dedicated app, completely separate from your coach dashboard.",
      },
      {
        q: "How long does it take to get set up?",
        a: "Most coaches are fully set up within a day. Create your account, invite your first client, assign their plan and check-in schedule — that's the full flow. There's no data migration required, no technical configuration, and no onboarding call needed.",
      },
      {
        q: "What happens to my clients and their data if I reach my limit and don't upgrade?",
        a: "Nothing is deleted. If you reach your active client limit, you can deactivate a current client to free up a slot — their full history and data is preserved and accessible for 15 days (Starter), 45 days (Professional), or 90 days (Premium) after deactivation. You only upgrade when you want to manage more active clients simultaneously. Your data is always yours.",
      },
      {
        q: "Does Wazen work in Arabic? Is it built for coaches in the region?",
        a: "Yes — fully. Wazen is built in both Arabic and English, with complete right-to-left support. The coach dashboard and the client app both switch languages. It's designed specifically for coaches operating in the UAE, GCC, and broader MENA region — built into the product from the ground up, not added as an afterthought.",
      },
      {
        q: "Is my clients' data safe and private?",
        a: "Yes. All data is encrypted in transit and at rest. Your clients' health, progress, and personal information is never shared with third parties. As the coach, you own and control your client data. Wazen is built by Binaa Lab — a UAE-based software studio.",
      },
      {
        q: "Can I cancel anytime? Is there a contract?",
        a: "No contracts, no lock-in. Cancel anytime from your account settings and you won't be charged again. Your access continues until the end of your current billing period, and your data remains accessible throughout. We don't believe in making it hard to leave.",
      },
      {
        q: "What's the difference between the paid plans?",
        a: "The main difference is active client capacity and a few advanced features. Starter is free for up to 5 clients. Professional ($49/mo) includes 20 active clients (up to 30 with add-ons), priority support, standard report export, and scheduled messages. Premium ($99/mo) includes 50 clients (scalable to 100+), advanced automation, suggested follow-up lists, and basic branding customization. Full plan comparison is in the pricing section above.",
      },
    ],
  },
  cta: {
    badge: "Free to start — no credit card",
    h2: "Bring your coaching into one organized place",
    body: "Create your free account and start managing up to 5 active clients with the full platform — plans, check-ins, progress, and messaging.",
    trust: [
      "Free for your first 5 clients",
      "No credit card required",
      "Full core platform",
      "Arabic & English",
    ],
    cardTitle: "Create your free account",
    cardSub: "Up to 5 active clients · Full core platform · No credit card",
    cardFeatures: [
      "Manage clients, plans & check-ins",
      "Client mobile app included",
      "Progress tracking & messaging",
    ],
    ctaLabel: "Start free — up to 5 clients",
    loginPrompt: "Already using Wazen?",
    loginLink: "Log in",
  },
  footer: {
    links: ["Terms of Service", "Privacy Policy", "Contact Support"],
    copyright: "© 2026 Wazen by Binaa Lab. All rights reserved.",
  },
};

export type Dictionary = typeof en;

const ar: Dictionary = {
  nav: {
    features: "المميزات",
    howItWorks: "كيف يعمل",
    pricing: "الأسعار",
    faq: "الأسئلة الشائعة",
    startFree: "ابدأ مجانًا",
    poweredBy: "مدعوم من Binaa Lab",
    switchToAr: "التبديل إلى العربية",
    switchToEn: "التبديل إلى الإنجليزية",
    toDark: "التبديل إلى الوضع الداكن",
    toLight: "التبديل إلى الوضع الفاتح",
    menu: "فتح القائمة",
  },
  hero: {
    badge: "مجاني لأول 5 عملاء — المنصة كاملة وبدون قيود",
    h1Line1: "أدِر عملك مع عملائك",
    h1Underlined: "من مكان واحد، منظّم وسلس",
    subheadline:
      "يجمع وازن عملاءك وخططك ومتابعاتك وتقدّمهم ورسائلك في نظام واحد — لتقضي وقتًا أقل في الملاحقة ووقتًا أكثر في التدريب.",
    ctaPrimary: "ابدأ مجانًا — حتى 5 عملاء",
    ctaSecondary: "شاهد كيف يعمل ↓",
    trust: ["بدون بطاقة ائتمان", "مجاني دائمًا لـ 5 عملاء", "العربية والإنجليزية"],
    dashboardAlt:
      "لوحة تحكم المدرب في وازن تعرض قائمة العملاء وقائمة المهام والمتابعات القادمة",
  },
  trustBar: {
    items: [
      "مصمّم للإمارات والخليج والشرق الأوسط",
      "العربية والإنجليزية — دعم كامل للكتابة من اليمين لليسار",
      "مجاني لأول 5 عملاء",
      "مدعوم من Binaa Lab",
    ],
  },
  problem: {
    eyebrow: "مشكلة الأدوات المبعثرة",
    h2: "المشكلة ليست في تدريبك — بل في أدواتك",
    description:
      "عندما يتوزّع عملاؤك وخططك ومتابعاتك بين واتساب وجداول البيانات وملفات PDF، تتحوّل إلى موظف إداري بدوام كامل. يستبدل وازن هذا التشتّت بنظام واحد منظّم.",
    oldWayHeading: "الطريقة القديمة (أدوات مبعثرة)",
    oldWay: [
      { title: "حياتك في الرسائل الخاصة", body: "متابعات العملاء ضائعة وسط محادثات واتساب لا تنتهي" },
      { title: "خطط في جداول وملفات PDF", body: "ملفات يفقدها العملاء أو ينسونها أو لا يستطيعون فتحها" },
      { title: "ملاحقة المتابعات يدويًا", body: "مراسلة كل عميل على حدة" },
      { title: "لا رؤية واضحة للتقدّم", body: "النتائج مبعثرة بين الملاحظات والجداول" },
    ],
    wazenWayHeading: "طريقة وازن (نظام واحد)",
    wazenWay: [
      { title: "كل شيء في مكان واحد", body: "العملاء والخطط والمتابعات والتقدّم والرسائل" },
      { title: "الخطط داخل تطبيق العميل", body: "يتابعها العملاء بوضوح من تطبيقهم الخاص" },
      { title: "متابعات منظّمة", body: "راجعها كلها من لوحة تحكم واحدة" },
      { title: "تقدّم تراه فعلًا", body: "رسوم بيانية وملخصات واضحة" },
    ],
  },
  features: {
    eyebrow: "كل ما تحتاجه",
    h2: "منصة واحدة. كل أداة يحتاجها عملك التدريبي.",
    description:
      "توقّف عن الجمع بين عدة تطبيقات. يجمع وازن إدارة العملاء والخطط والمتابعات وتتبّع التقدّم والمراسلة في نظام واحد منظّم.",
    tabs: [
      {
        label: "إدارة العملاء",
        headline: "كل عميل، منظّم بالكامل",
        body: "أدِر جميع عملائك من لوحة تحكم واحدة. اطّلع على التزامهم ومتابعاتهم القادمة وخططهم النشطة ونشاطهم الأخير بنظرة واحدة.",
        caption: "نظرة عامة على العميل",
        primaryAlt: "قائمة عملاء وازن تعرض درجات الالتزام لكل عميل",
        secondaryAlt: "نظرة عامة على عميل في لوحة تحكم المدرب",
      },
      {
        label: "المتابعات",
        headline: "متابعات منظّمة، بلا ملاحقة",
        body: "أنشئ جداول متابعة لكل عميل. يرسلونها من تطبيقهم، وتراجعها كلها من قائمة واحدة منظّمة — دون البحث في الرسائل.",
        caption: "تبويب إدارة المتابعات",
        primaryAlt: "قائمة مهام لوحة المدرب مع المتابعات المُرسلة",
        secondaryAlt: "تبويب إدارة المتابعات لعميل واحد",
      },
      {
        label: "التقدّم والتحليلات",
        headline: "اعرف بالضبط كيف يتقدّم عملاؤك",
        body: "تابِع الوزن وقياسات الجسم والالتزام عبر الوقت. تعرض لوحة التحليلات أداء الخطط، والأكثر تقدّمًا، والعملاء المعرّضين للتعثّر عبر قائمتك كاملة.",
        caption: "نظرة عامة على التحليلات",
        primaryAlt: "رسوم تقدّم العميل تعرض اتجاه وزن ثابتًا عبر الوقت",
        secondaryAlt: "نظرة عامة على تحليلات المدرب عبر قائمة العملاء",
      },
      {
        label: "الخطط والقوالب",
        headline: "أنشئ الخطة مرة، وعيّنها لأي عميل",
        body: "أنشئ خطط تمارين وتغذية من الصفر أو من مكتبة القوالب. عيّنها لأي عميل في ثوانٍ — تظهر فورًا في تطبيق العميل.",
        caption: "خطط التمارين المُعيّنة",
        primaryAlt: "مكتبة القوالب مع قوالب خطط التمارين والتغذية",
        secondaryAlt: "خطط تمارين مُعيّنة لعميل",
      },
    ],
    coachLabel: "لوحة المدرب",
    clientLabel: "تطبيق العميل",
    connectedCaption: "لوحة تحكم للمدرب وتطبيق للعميل — يعملان كنظام واحد متّصل",
  },
  how: {
    eyebrow: "كيف يعمل",
    h2: "من التشتّت إلى التنظيم في ثلاث خطوات",
    description:
      "بلا متاعب نقل بيانات، وبلا إعداد تقني. أضِف عملاءك، وعيّن خططهم، وتابِع تقدّمهم — كل ذلك من مكان واحد.",
    steps: [
      {
        title: "أضِف عملاءك",
        body: "ادعُ عملاءك عبر البريد الإلكتروني. ينضمّون ويجهّزون ملفّهم في تطبيق وازن خلال دقائق — دون أي إعداد تقني من جهتهم.",
        alt: "دعوة عميل عبر البريد الإلكتروني من لوحة تحكم المدرب في وازن",
      },
      {
        title: "عيّن الخطط والمتابعات",
        body: "امنح كل عميل خطط التمارين والتغذية وجدول المتابعة. يظهر كل شيء فورًا في تطبيقه.",
        alt: "الخطط المُعيّنة كما تظهر في تطبيق وازن للعميل",
      },
      {
        title: "تابِع التقدّم وابقَ على تواصل",
        body: "راجِع المتابعات من لوحتك، وتابِع رسوم تقدّم كل عميل، وراسِلهم مباشرة — كل ذلك من مكان واحد منظّم.",
        alt: "تحليلات التقدّم في لوحة تحكم المدرب في وازن",
      },
    ],
  },
  pricing: {
    eyebrow: "أسعار بسيطة",
    h2: "ابدأ مجانًا. وانمُ على راحتك.",
    description: "أول 5 عملاء مجانيون دائمًا. ارتقِ بخطتك عندما تكون جاهزًا لتنمية عملك.",
    monthly: "شهري",
    yearly: "سنوي",
    save2mo: "وفّر شهرين",
    mostPopular: "الأكثر شيوعًا",
    free: "مجاني",
    forever: "للأبد",
    perMonth: "/شهر",
    perYear: "/سنة",
    plans: [
      {
        name: "المبتدئة",
        highlight: "حتى 5 عملاء نشطين",
        features: [
          "المنصة الأساسية كاملة",
          "الوصول إلى تطبيق العميل",
          "الخطط والقوالب",
          "المتابعات والمراسلة",
          "تحليلات العملاء",
          "دعم قياسي",
        ],
        addOn: "",
        cta: "ابدأ مجانًا",
        note: "",
        savings: "",
      },
      {
        name: "الاحترافية",
        highlight: "20 عميلًا نشطًا · حتى 30 مع الإضافات",
        features: [
          "كل ما في المبتدئة",
          "20 عميلًا نشطًا (حتى 30)",
          "دعم ذو أولوية",
          "تصدير تقارير التقدّم القياسية",
          "رسائل مجدولة",
          "حِزم عملاء إضافية متاحة",
        ],
        addOn: "+5 عملاء من 12$/شهر · +10 عملاء من 20$/شهر",
        cta: "ابدأ الآن",
        note: "",
        savings: "وفّر 98$ سنويًا",
      },
      {
        name: "المتقدّمة",
        highlight: "50 عميلًا نشطًا · توسّع إلى 100+",
        features: [
          "كل ما في الاحترافية",
          "50 عميلًا نشطًا (توسّع إلى 100+)",
          "دعم بأعلى أولوية",
          "تصدير تقارير تقدّم متقدّمة",
          "أتمتة متقدّمة",
          "قائمة متابعات مقترحة",
          "تخصيص أساسي للعلامة",
        ],
        addOn: "+10 عملاء من 18$/شهر · حتى +50 عميلًا",
        cta: "ابدأ الآن",
        note: "علامة بيضاء كاملة — قريبًا",
        savings: "وفّر 198$ سنويًا",
      },
    ],
    stripHeadline:
      "يدفع معظم المدربين أكثر من 400$ شهريًا على أدوات متفرّقة. ووازن يغنيك عنها جميعًا.",
    tools: [
      "واتساب (مجاني لكنه فوضى)",
      "جداول البيانات",
      "أدوات النماذج",
      "متتبّعات التقدّم",
    ],
    stripOld: "+400$/شهر",
    stripNew: "وازن يبدأ من 49$/شهر",
  },
  why: {
    eyebrow: "لماذا وازن",
    h2: "مبنيّ على طريقة عمل المدربين الحقيقية",
    description:
      "مصمّم حول مسارات العمل التدريبية الحقيقية — العملاء والخطط والمتابعات والتقدّم والتواصل — للمدربين في الإمارات والخليج والشرق الأوسط، بالعربية والإنجليزية معًا.",
    statLabels: [
      "عملاء نشطون مجانًا للأبد — مع وصول كامل للمنصة الأساسية",
      "أدوات متفرّقة يغنيك عنها وازن — واتساب، جداول، PDF، نماذج، ملاحظات، تذكيرات",
      "لوحة للمدرب وتطبيق للعميل، يعملان كنظام واحد متّصل",
    ],
    bilingualBadge: "العربية والإنجليزية — دعم كامل للكتابة من اليمين لليسار",
    profileCaption:
      "يبني المدربون ملفًا عامًا يطّلع عليه العملاء — مع العملاء النشطين والبرامج المُقدّمة ونسبة الالتزام وسنوات الخبرة.",
    founderEyebrow: "لماذا بنينا هذا",
    founderQuote:
      "«بنينا وازن لأن التدريب لا يجب أن يعني العيش وسط محادثات واتساب وجداول البيانات. كل مدرب يستحق مكانًا واحدًا هادئًا ومنظّمًا لإدارة العملاء وتقديم الخطط ورؤية التقدّم فعلًا — ليبقى التركيز على التدريب، لا على الأعمال الإدارية.»",
    founderName: "ناصر شديد · المؤسس، وازن (من Binaa Lab)",
    profileAlt:
      "الملف العام لمدرب في تطبيق وازن، يعرض العملاء النشطين والبرامج المُقدّمة ونسبة الالتزام وسنوات الخبرة",
  },
  faq: {
    eyebrow: "الأسئلة الشائعة",
    h2: "أسئلة يطرحها المدربون قبل التحويل",
    items: [
      {
        q: "هل وازن مجاني فعلًا؟ ما الحيلة؟",
        a: "لا حيلة. أول 5 عملاء نشطين مجانيون للأبد — وصول كامل للمنصة، بدون بطاقة ائتمان، وبدون عدّاد تجربة. الباقة المجانية موجودة لتدير عملك على وازن قبل أن تقرّر التوسّع. وعندما تكون جاهزًا لاستقبال عملاء أكثر، تبدأ الباقات المدفوعة من 49$ شهريًا. وحتى ذلك الحين، لا شيء يتغيّر ولا شيء ينتهي.",
      },
      {
        q: "هل يحتاج عملائي إلى الدفع أو إنشاء حساب لاستخدام وازن؟",
        a: "عملاؤك لا يدفعون شيئًا. أبدًا. تدعوهم إلى تطبيق وازن للعميل وينضمّون مجانًا — بلا اشتراك وبلا رسوم خفية من جهتهم. تطبيق العميل مشمول في باقتك. يصلون إلى خططهم ومتابعاتهم وتقدّمهم عبر تطبيقهم الخاص، المنفصل تمامًا عن لوحة تحكم المدرب لديك.",
      },
      {
        q: "كم يستغرق الإعداد؟",
        a: "معظم المدربين يكملون الإعداد خلال يوم. أنشئ حسابك، وادعُ أول عميل، وعيّن خطته وجدول متابعته — هذا هو المسار كاملًا. لا حاجة لنقل بيانات، ولا إعداد تقني، ولا مكالمة تهيئة.",
      },
      {
        q: "ماذا يحدث لعملائي وبياناتهم إذا بلغت الحد ولم أُرقِّ الباقة؟",
        a: "لا شيء يُحذف. إذا بلغت حد العملاء النشطين، يمكنك إلغاء تنشيط عميل حالي لتفريغ مكان — يُحفظ سجلّه وبياناته بالكامل ويبقى متاحًا لمدة 15 يومًا (المبتدئة)، أو 45 يومًا (الاحترافية)، أو 90 يومًا (المتقدّمة) بعد إلغاء التنشيط. ولا تُرقّي الباقة إلا عندما تريد إدارة عملاء نشطين أكثر في الوقت نفسه. بياناتك ملكك دائمًا.",
      },
      {
        q: "هل يعمل وازن بالعربية؟ وهل صُمّم لمدربي المنطقة؟",
        a: "نعم — بالكامل. وازن مبنيّ بالعربية والإنجليزية معًا، مع دعم كامل للكتابة من اليمين لليسار. ولوحة المدرب وتطبيق العميل كلاهما يبدّل اللغة. وهو مصمّم خصيصًا للمدربين العاملين في الإمارات والخليج والشرق الأوسط — مدمج في المنتج من أساسه، لا مُضافًا لاحقًا.",
      },
      {
        q: "هل بيانات عملائي آمنة وخاصة؟",
        a: "نعم. كل البيانات مشفّرة أثناء النقل والتخزين. ولا تُشارَك معلومات عملائك الصحية وتقدّمهم وبياناتهم الشخصية مع أي طرف ثالث. وبصفتك المدرب، فأنت تملك بيانات عملائك وتتحكّم بها. وازن من تطوير Binaa Lab — استوديو برمجيات مقرّه الإمارات.",
      },
      {
        q: "هل يمكنني الإلغاء في أي وقت؟ وهل هناك عقد؟",
        a: "بلا عقود وبلا التزام. ألغِ في أي وقت من إعدادات حسابك ولن تُحاسَب مجددًا. ويستمرّ وصولك حتى نهاية دورة الفوترة الحالية، وتبقى بياناتك متاحة طوال المدة. نحن لا نؤمن بتصعيب المغادرة.",
      },
      {
        q: "ما الفرق بين الباقات المدفوعة؟",
        a: "الفرق الأساسي هو سعة العملاء النشطين وبعض المزايا المتقدّمة. المبتدئة مجانية حتى 5 عملاء. الاحترافية (49$/شهر) تشمل 20 عميلًا نشطًا (حتى 30 مع الإضافات)، ودعمًا ذا أولوية، وتصدير تقارير قياسي، ورسائل مجدولة. المتقدّمة (99$/شهر) تشمل 50 عميلًا (قابلة للتوسّع إلى 100+)، وأتمتة متقدّمة، وقوائم متابعات مقترحة، وتخصيصًا أساسيًا للعلامة. المقارنة الكاملة للباقات في قسم الأسعار أعلاه.",
      },
    ],
  },
  cta: {
    badge: "مجاني للبدء — بدون بطاقة ائتمان",
    h2: "اجمع عملك التدريبي في مكان واحد منظّم",
    body: "أنشئ حسابك المجاني وابدأ بإدارة حتى 5 عملاء نشطين بالمنصة كاملة — الخطط والمتابعات والتقدّم والمراسلة.",
    trust: [
      "مجاني لأول 5 عملاء",
      "بدون بطاقة ائتمان",
      "المنصة الأساسية كاملة",
      "العربية والإنجليزية",
    ],
    cardTitle: "أنشئ حسابك المجاني",
    cardSub: "حتى 5 عملاء نشطين · المنصة الأساسية كاملة · بدون بطاقة ائتمان",
    cardFeatures: [
      "إدارة العملاء والخطط والمتابعات",
      "تطبيق الجوال للعميل مشمول",
      "تتبّع التقدّم والمراسلة",
    ],
    ctaLabel: "ابدأ مجانًا — حتى 5 عملاء",
    loginPrompt: "تستخدم وازن بالفعل؟",
    loginLink: "تسجيل الدخول",
  },
  footer: {
    links: ["شروط الخدمة", "سياسة الخصوصية", "تواصل مع الدعم"],
    copyright: "© 2026 وازن من Binaa Lab. جميع الحقوق محفوظة.",
  },
};

export const dictionary: Record<Locale, Dictionary> = { en, ar };

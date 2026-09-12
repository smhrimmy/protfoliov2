import { PortfolioIdentity, Project, BlogPost, Experience, SkillCategory, Education, Certification, Testimonial, CustomPage, BlogComment, SiteBackup } from '@/types/portfolio';

export const initialIdentity: PortfolioIdentity = {
  name: "Prajwal DL",
  alias: "pdl",
  role: "Web Advisor & Full Stack Web Developer",
  subRole: "Frontend Development · WordPress Support · DNS & Cloud Hosting",
  location: "Mangalore, Karnataka, India",
  bio: "Dedicated and adaptable professional with a proactive attitude and the ability to learn quickly. Strong work ethic and effective communication skills. Eager to contribute to a dynamic team and support organizational goals.",
  tagline: "Specializing in Full Stack Web Development, WordPress, DNS, and Cloud Hosting Infrastructure.",
  avatarUrl: "https://avatars.githubusercontent.com/u/244284914?v=4",
  resumeUrl: "/resume",
  stats: {
    projectsShipped: "36+",
    revenueInfluenced: "100%",
    happyClients: "4+",
    yearsBuilding: "2+ yr"
  },
  socialLinks: {
    github: "https://github.com/smhrimmy",
    linkedin: "https://linkedin.com/in/prajwal-d-l-118198370/",
    twitter: "https://twitter.com/prajwaldl",
    email: "pdlkpt@gmail.com",
    website: "https://praxel.space/",
    phone: "+918105561638"
  }
};

export const initialProjects: Project[] = [
  {
    id: "proj-1",
    slug: "supportos",
    title: "SupportOS — AI-Native Customer Support OS",
    summary: "AI-native customer support operating system with automated ticket classification, live telemetry, and intelligent routing.",
    caseStudyBody: "Built SupportOS as an intelligent customer support platform engineered to streamline inbound helpdesk workflows. Features multi-channel ticket ingestion, real-time sentiment telemetry, automated macro recommendations, and high-performance customer service ergonomics.",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=400&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=400&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&auto=format&fit=crop&q=80"
    ],
    role: "Full Stack Developer",
    client: "Personal Project",
    date: "2026",
    technologies: ["React", "TypeScript", "Tailwind CSS", "REST APIs", "AI Automation"],
    liveUrl: "https://frontend-beta-five-hfzyr9ap4o.vercel.app",
    githubUrl: "https://github.com/smhrimmy/supportos",
    featured: true,
    visibility: "public",
    status: "published",
    completionPercentage: 85,
    linesOfCode: 21500,
    clientSatisfaction: 5,
    features: [
      "Personalized Recommendations",
      "Adaptive UI",
      "Performance Stats"
    ],
    objective_label: "VICE CITY PORT",
    seo: {
      metaTitle: "SupportOS — AI-Native Customer Support Platform",
      metaDescription: "Customer support workbench engineered with ticket triage and real-time response telemetry."
    }
  },
  {
    id: "proj-2",
    slug: "optitalent-hrms",
    title: "OptiTalent HRMS",
    summary: "Modern Human Resource Management System featuring employee onboarding, payroll monitoring, attendance, and department analytics.",
    caseStudyBody: "Developed OptiTalent HRMS to modernize internal workforce operations. Features comprehensive employee records management, role-based access control, leave request pipelines, performance evaluations, and clean data visualizations.",
    coverImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=400&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&auto=format&fit=crop&q=80"
    ],
    role: "Frontend & Full Stack Engineer",
    client: "Workforce Solution",
    date: "2026",
    technologies: ["TypeScript", "React", "Tailwind CSS", "Node.js", "Full Stack APIs"],
    liveUrl: "https://optitalent-hrms.vercel.app",
    githubUrl: "https://github.com/smhrimmy/optitalent-hrms",
    featured: true,
    visibility: "public",
    status: "published",
    completionPercentage: 92,
    linesOfCode: 18400,
    clientSatisfaction: 5,
    features: [
      "Automated Attendance Tracking",
      "Department Analytics",
      "Role-Based Security"
    ],
    objective_label: "DOWNTOWN MAINFRAME",
    seo: {
      metaTitle: "OptiTalent HRMS — Workforce Management Platform",
      metaDescription: "Modern Human Resource Management System for attendance, payroll, and employee onboarding."
    }
  },
  {
    id: "proj-3",
    slug: "finverse-financial-os",
    title: "Finverse — Your Financial OS",
    summary: "Personal wealth and cashflow management platform with net worth tracking, transaction ledgers, and budget analytics.",
    caseStudyBody: "Engineered Finverse to provide individuals and founders with an executive financial overview. Features automated transaction categorizations, cashflow forecasts, interactive asset distribution charts, and multi-currency tracking.",
    coverImage: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&auto=format&fit=crop&q=80"
    ],
    role: "Full Stack Developer",
    client: "Fintech Platform",
    date: "2026",
    technologies: ["TypeScript", "React", "Financial Analytics", "Tailwind CSS"],
    liveUrl: "https://finverse-your-financial-os-main.vercel.app",
    githubUrl: "https://github.com/smhrimmy/finverse-your-financial-os-main",
    featured: true,
    visibility: "public",
    status: "published",
    completionPercentage: 96,
    linesOfCode: 32000,
    clientSatisfaction: 5,
    features: [
      "Multi-Currency Ledgers",
      "Real-Time Net Worth",
      "Liquidity Forecasting"
    ],
    objective_label: "STARFISH ISLAND BANK",
    seo: {
      metaTitle: "Finverse — Financial Operating System",
      metaDescription: "Personal wealth tracking platform with liquidity insights and net worth dashboards."
    }
  },
  {
    id: "proj-4",
    slug: "cashflow-wealth-os",
    title: "Cashflow & Wealth OS",
    summary: "Dynamic cashflow planner and capital allocation tracker designed for freelancers and small businesses.",
    caseStudyBody: "Built Wealth OS / Cashflow to provide real-time visibility into income streams, monthly recurring expenditures, invoice health, and emergency reserves with zero friction.",
    coverImage: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=400&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&auto=format&fit=crop&q=80"
    ],
    role: "Web Application Developer",
    date: "2026",
    technologies: ["TypeScript", "React", "Tailwind CSS", "Vercel"],
    liveUrl: "https://wealth-os-lemon.vercel.app",
    githubUrl: "https://github.com/smhrimmy/cashflow",
    featured: true,
    visibility: "public",
    status: "published",
    completionPercentage: 100,
    linesOfCode: 14200,
    clientSatisfaction: 5,
    features: [
      "Dynamic Invoice Generation",
      "Payment Gateway Webhooks",
      "Tax Reconciliation"
    ],
    objective_label: "OCEAN BEACH DATAHUB",
    seo: {
      metaTitle: "Cashflow & Wealth OS — Prajwal DL",
      metaDescription: "Dynamic cashflow management and financial tracking application."
    }
  },
  {
    id: "proj-5",
    slug: "fictionzone-app",
    title: "FictionZone Web Platform",
    summary: "Immersive digital fiction and web novel exploration platform with bookmarking and custom reading ergonomics.",
    caseStudyBody: "Created FictionZone to offer a smooth, distraction-free reading experience for serialized literature. Features font scaling, theme toggles (dark/sepia/light), chapter progression caching, and tag-based catalog discovery.",
    coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=400&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=400&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&auto=format&fit=crop&q=80"
    ],
    role: "Frontend Developer",
    date: "2026",
    technologies: ["TypeScript", "React", "Tailwind CSS", "Local Cache"],
    liveUrl: "https://fictionzone-app-bhku.vercel.app",
    githubUrl: "https://github.com/smhrimmy/fictionzone-app",
    featured: false,
    visibility: "public",
    status: "published",
    completionPercentage: 90,
    linesOfCode: 11200,
    clientSatisfaction: 5,
    features: [
      "Distraction-Free Reading Mode",
      "Chapter Bookmark Cache",
      "Custom Font Scaling"
    ],
    objective_label: "WASHINGTON BEACH ARCHIVE",
    seo: {
      metaTitle: "FictionZone — Digital Reading Platform",
      metaDescription: "Web novel exploration app with chapter bookmarks and reading customization."
    }
  },
  {
    id: "proj-6",
    slug: "mangareader",
    title: "MangaReader Web App",
    summary: "High-performance digital manga reading interface with responsive image rendering and infinite scroll navigation.",
    caseStudyBody: "Architected a responsive, touch-first reader application optimized for rapid image loading, pre-fetching next chapter frames, and smooth horizontal/vertical reading modes across all devices.",
    coverImage: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1563089145-599997674d42?w=400&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&auto=format&fit=crop&q=80"
    ],
    role: "Frontend Engineer",
    date: "2026",
    technologies: ["TypeScript", "React", "Tailwind CSS", "Web APIs"],
    liveUrl: "https://mangareader1.vercel.app",
    githubUrl: "https://github.com/smhrimmy/mangareader1",
    featured: false,
    visibility: "public",
    status: "published",
    completionPercentage: 88,
    linesOfCode: 15600,
    clientSatisfaction: 5,
    features: [
      "Infinite Frame Pre-Caching",
      "Touch-Optimized Gestures",
      "Dynamic Dual-Page Layouts"
    ],
    objective_label: "ESCOBAR INTERNATIONAL HUB",
    seo: {
      metaTitle: "MangaReader — High-Performance Reader",
      metaDescription: "Responsive digital manga reader with pre-caching and smooth page navigation."
    }
  },
  {
    id: "proj-7",
    slug: "web-check",
    title: "Web Check & Domain Diagnostic Tool",
    summary: "Instant domain inspection, DNS record lookup, SSL certificate verification, and server response audit suite.",
    caseStudyBody: "Built Web Check to provide network administrators and webmasters with rapid insights into domain configurations, Nameservers, A/AAAA records, MX routing, SSL expiration dates, and HTTP response headers.",
    coverImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1562813733-b31f71025d54?w=400&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1510519138161-584449ad2930?w=400&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&auto=format&fit=crop&q=80"
    ],
    role: "Full Stack Engineer",
    date: "2026",
    technologies: ["TypeScript", "DNS APIs", "SSL Diagnostics", "React"],
    liveUrl: "https://web-check-lake.vercel.app",
    githubUrl: "https://github.com/smhrimmy/web-check",
    featured: false,
    visibility: "public",
    status: "published",
    completionPercentage: 94,
    linesOfCode: 19800,
    clientSatisfaction: 5,
    features: [
      "Instant Nameserver Lookup",
      "SSL Handshake Validation",
      "Header Security Auditing"
    ],
    objective_label: "VICE POINT TOWER",
    seo: {
      metaTitle: "Web Check — DNS & SSL Diagnostic Tool",
      metaDescription: "Instant domain inspection, DNS lookup, and SSL certificate verification."
    }
  },
  {
    id: "proj-8",
    slug: "webtool2",
    title: "WebTool2 — Developer Utility Suite",
    summary: "All-in-one developer toolbox for encoding/decoding, JSON formatting, regex testing, and header checking.",
    caseStudyBody: "Engineered a client-side suite of developer utilities designed for daily productivity. Includes Base64 conversion, URL encoding, JSON format and validate, color palette generators, and timestamp converters.",
    coverImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&auto=format&fit=crop&q=80"
    ],
    role: "Web Developer",
    date: "2026",
    technologies: ["TypeScript", "React", "Utility Engine", "Tailwind CSS"],
    liveUrl: "https://webtool2.vercel.app",
    githubUrl: "https://github.com/smhrimmy/webtool2",
    featured: false,
    visibility: "public",
    status: "published",
    completionPercentage: 98,
    linesOfCode: 16700,
    clientSatisfaction: 5,
    features: [
      "Client-Side JSON Parsing",
      "Multi-Format Encoders",
      "Live Regex Testing Sandbox"
    ],
    objective_label: "LEAF LINKS STATION",
    seo: {
      metaTitle: "WebTool2 — Developer Utility Suite",
      metaDescription: "Fast, client-side developer toolbox for JSON, encoding, regex, and web inspection."
    }
  }
];

export const initialBlogPosts: BlogPost[] = [
  {
    id: "post-1",
    slug: "mastering-dns-and-hosting-migrations",
    title: "A Practical Guide to DNS Management and Zero-Downtime Website Migrations",
    excerpt: "Best practices for planning DNS record transitions, managing TTL values, and installing SSL certificates without interrupting live services.",
    coverImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
    tags: ["DNS", "Hosting", "WordPress", "SSL"],
    category: "Infrastructure",
    readingTimeMinutes: 5,
    wordCount: 1200,
    status: "published",
    publishedAt: "2025-10-15",
    author: "Prajwal DL",
    linkedinShared: true,
    blocks: [
      {
        id: "b-1",
        type: "paragraph",
        content: "Migrating production websites requires careful planning around DNS propagation and SSL handshake validation. Lowering TTL thresholds 48 hours prior to nameserver changes ensures instantaneous cutover with zero downtime."
      },
      {
        id: "b-2",
        type: "heading",
        level: 2,
        content: "Pre-Migration Checklist"
      },
      {
        id: "b-3",
        type: "paragraph",
        content: "Verify all MX, SPF, DKIM, and DMARC records before initiating nameserver switches to ensure seamless email routing. Pre-provision Let's Encrypt certificates before updating A records."
      }
    ],
    seo: {
      metaTitle: "DNS Management and Website Migrations — Prajwal DL",
      metaDescription: "Step-by-step guide to managing DNS, SSL certificates, and hosting migrations."
    }
  },
  {
    id: "post-2",
    slug: "building-performant-react-applications",
    title: "Engineering User-Centric Web Applications with React.js and Modern APIs",
    excerpt: "Insights on state management, responsive UI design, API integration, and performance optimization for web applications.",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
    tags: ["React", "JavaScript", "Frontend", "UI/UX"],
    category: "Development",
    readingTimeMinutes: 4,
    wordCount: 950,
    status: "published",
    publishedAt: "2025-11-20",
    author: "Prajwal DL",
    linkedinShared: false,
    blocks: [
      {
        id: "b-21",
        type: "paragraph",
        content: "Modern frontend engineering demands clean component architecture, reliable error boundaries, and efficient rendering strategies to achieve lightning-fast user interactions."
      }
    ],
    seo: {
      metaTitle: "Performant React Web Applications — Prajwal DL",
      metaDescription: "Techniques for crafting responsive, user-centric web applications with React.js."
    }
  }
];

export const initialExperience: Experience[] = [
  {
    id: "exp-1",
    company: "Unifycx",
    role: "Web Advisor",
    location: "Mangalore, Karnataka",
    startDate: "Jun 2025",
    endDate: "Present",
    current: true,
    description: "Assisted customers with website migrations, SSL installations, email configurations, and hosting control panel issues.",
    achievements: [
      "Assisted customers with website migrations, SSL installations, email configurations, and hosting control panel issues.",
      "Provided technical support for WordPress, CMS platforms, hosting, DNS, email services, and website-related issues in shared hosting environments.",
      "Collaborated with teams, documented support interactions, and resolved customer issues through effective troubleshooting and communication."
    ],
    technologies: ["WordPress", "DNS Management", "Hosting Control Panels", "SSL", "Email Services", "Technical Troubleshooting"]
  },
  {
    id: "exp-2",
    company: "Freelancer",
    role: "Freelancer / Web Developer",
    location: "Mangalore, India",
    startDate: "Dec 2024",
    endDate: "Jun 2025",
    current: false,
    description: "Designed and developed custom websites and web applications using modern frontend and backend technologies based on client requirements.",
    achievements: [
      "Designed and developed custom websites and web applications using modern frontend and backend technologies based on client requirements.",
      "Delivered responsive, performance-focused, and user-friendly solutions while improving applications through user feedback and continuous enhancements."
    ],
    technologies: ["React.js", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "REST APIs", "UI/UX Design"]
  },
  {
    id: "exp-3",
    company: "Glowtouch Technologies",
    role: "Junior Support Engineer",
    location: "Mangalore, India",
    startDate: "Aug 2024",
    endDate: "Dec 2024",
    current: false,
    description: "Provided live chat support for hosting, domain, and website-related issues.",
    achievements: [
      "Provided live chat support for hosting, domain, and website-related issues.",
      "Troubleshot WordPress, PHP, MySQL, server, DNS, email, and website migration issues.",
      "Assisted customers with technical configurations and ensured smooth issue resolution.",
      "Documented common issues and collaborated with teams to improve support efficiency and customer satisfaction."
    ],
    technologies: ["WordPress Support", "PHP", "MySQL", "DNS", "Email Configuration", "Server Management", "Troubleshooting"]
  },
  {
    id: "exp-4",
    company: "Vitvara Technologies",
    role: "Web Developer Intern",
    location: "Mangalore, India",
    startDate: "Jan 2024",
    endDate: "May 2024",
    current: false,
    description: "Engineered and developed responsive, user-centric web applications using HTML, CSS, JavaScript, and React.js, adhering to modern development best practices and standards.",
    achievements: [
      "Engineered and developed responsive, user-centric web applications using HTML, CSS, JavaScript, and React.js, adhering to modern development best practices and standards.",
      "Designed and implemented scalable API functionalities, meticulously optimizing code for enhanced performance, maintainability, and security.",
      "Systematically debugged and tested applications, leading to a reduction in reported bugs and a significant enhancement in software reliability and user experience."
    ],
    technologies: ["HTML", "CSS", "JavaScript", "React.js", "REST APIs", "Debugging & Testing", "Frontend Development"]
  }
];

export const initialSkills: SkillCategory[] = [
  {
    id: "cat-1",
    category: "Technical & Web Development",
    skills: [
      { name: "Frontend Development", level: 95, iconName: "Layers", featured: true },
      { name: "React.js", level: 92, iconName: "Code2", featured: true },
      { name: "JavaScript & TypeScript", level: 90, iconName: "FileCode", featured: true },
      { name: "HTML5 & CSS3", level: 96, iconName: "Palette", featured: true },
      { name: "UI/UX Design", level: 88, iconName: "Layout", featured: true },
      { name: "PHP & MySQL", level: 82, iconName: "Database" },
      { name: "REST APIs", level: 88, iconName: "Zap" }
    ]
  },
  {
    id: "cat-2",
    category: "Hosting, Systems & Support",
    skills: [
      { name: "Technical Troubleshooting", level: 96, iconName: "Wrench", featured: true },
      { name: "WordPress Support", level: 95, iconName: "Globe", featured: true },
      { name: "DNS Management", level: 94, iconName: "Network", featured: true },
      { name: "SSL Installations", level: 92, iconName: "Lock", featured: true },
      { name: "Email Configurations", level: 90, iconName: "Mail" },
      { name: "Hosting Control Panels", level: 92, iconName: "Server" },
      { name: "Website Migrations", level: 94, iconName: "RefreshCw" }
    ]
  },
  {
    id: "cat-3",
    category: "Professional & Core Competencies",
    skills: [
      { name: "Problem-Solving", level: 95, iconName: "CheckCircle", featured: true },
      { name: "Communication", level: 92, iconName: "MessageSquare", featured: true },
      { name: "Multitasking", level: 90, iconName: "Activity", featured: true },
      { name: "Quick Learner", level: 96, iconName: "Sparkles", featured: true },
      { name: "Microsoft Excel", level: 88, iconName: "Table" }
    ]
  }
];

export const initialEducation: Education[] = [
  {
    id: "edu-1",
    degree: "Diploma: Full Stack Development",
    institution: "Karnataka (Govt) Polytechnic",
    location: "Mangalore, Karnataka",
    year: "May 2024",
    score: "Completed",
    details: "Specialized in Full Stack Web Development, modern frontend architectures, databases, and software methodologies."
  },
  {
    id: "edu-2",
    degree: "10th High School",
    institution: "Milagres High School",
    location: "Mangalore, Karnataka",
    year: "May 2018",
    score: "Completed",
    details: "Secondary school education with core foundation in science and mathematics."
  }
];

export const initialCertifications: Certification[] = [
  {
    id: "cert-1",
    name: "Diploma: Full Stack Development",
    issuer: "Karnataka (Govt) Polytechnic, Mangalore",
    issueDate: "May 2024",
    credentialId: "KPT-FSD-2024"
  },
  {
    id: "cert-2",
    name: "Web Development Internship Certification",
    issuer: "Vitvara Technologies",
    issueDate: "May 2024",
    credentialId: "VIT-WEB-2024"
  }
];

export const initialTestimonials: Testimonial[] = [];

export const initialCustomPages: CustomPage[] = [
  {
    id: "page-1",
    slug: "about",
    title: "About Prajwal DL",
    metaDescription: "Dedicated Web Advisor and Full Stack Developer based in Mangalore, Karnataka.",
    lastModified: "2026-09-08",
    status: "published",
    blocks: [
      {
        id: "pb-1",
        type: "paragraph",
        content: "Dedicated and adaptable professional with a proactive attitude and the ability to learn quickly. Strong work ethic and effective communication skills. Eager to contribute to a dynamic team and support organizational goals."
      }
    ]
  },
  {
    id: "page-2",
    slug: "privacy",
    title: "Privacy Policy",
    metaDescription: "Privacy policy for Prajwal DL portfolio.",
    lastModified: "2026-09-08",
    status: "published",
    blocks: [
      {
        id: "pb-2",
        type: "paragraph",
        content: "This portfolio respects your privacy. No intrusive third-party tracking pixels or personal data harvesting scripts are deployed."
      }
    ]
  },
  {
    id: "page-3",
    slug: "terms",
    title: "Terms of Service",
    metaDescription: "Terms of use and intellectual property notices for Prajwal DL.",
    lastModified: "2026-09-08",
    status: "published",
    blocks: [
      {
        id: "pb-3",
        type: "paragraph",
        content: "All project source code repositories, configurations, and documentation presented on this portfolio are the work of Prajwal DL or referenced open-source projects."
      }
    ]
  }
];

export const initialBlogComments: BlogComment[] = [];

export const initialBackups: SiteBackup[] = [
  {
    id: "backup-v2.5-resume",
    timestamp: "2026-09-08T14:30:00Z",
    version: "v2.5.0",
    sizeKb: 88,
    note: "Official resume data snapshot with verified experience, education, and GitHub projects.",
    data: null
  }
];

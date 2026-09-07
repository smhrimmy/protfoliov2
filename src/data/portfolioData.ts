import { PortfolioIdentity, Project, BlogPost, Experience, SkillCategory, Education, Certification, Testimonial, CustomPage, BlogComment, SiteBackup } from '@/types/portfolio';

export const initialIdentity: PortfolioIdentity = {
  name: "Prajwal DL",
  alias: "SILVERSTEN",
  role: "Full Stack Developer · Systems Architect · 3D Creative Engineer",
  subRole: "AI Automation & High-Converting Web Platforms",
  location: "Mangalore, India",
  bio: "Freelance developer, creative engineer, and systems architect helping ambitious brands across healthcare, e-commerce, and SaaS ship high-converting systems, AI automations, and bespoke spatial experiences that print — not just look good.",
  tagline: "Engineering systems that print — not just look good.",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
  resumeUrl: "/resume.pdf",
  stats: {
    projectsShipped: "40+",
    revenueInfluenced: "$2.4M",
    happyClients: "18",
    yearsBuilding: "5yr"
  },
  socialLinks: {
    github: "https://github.com/prajwaldl",
    linkedin: "https://linkedin.com/in/prajwaldl",
    twitter: "https://twitter.com/prajwaldl",
    email: "prajwal@silversten.dev",
    website: "https://silversten.dev"
  }
};

export const initialProjects: Project[] = [
  {
    id: "proj-1",
    slug: "nova-clinics",
    title: "Nova Clinics",
    summary: "AI-driven patient triage and high-converting healthcare booking platform with calendar synchronization.",
    caseStudyBody: "Nova Clinics needed to overhaul their patient intake pipeline. We designed and shipped an intelligent multi-step triage booking engine with automated SMS reminders and electronic medical records integration.",
    coverImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop&q=80"
    ],
    role: "Lead Architect & Full Stack Engineer",
    client: "Nova Healthcare Network",
    date: "2024",
    technologies: ["React", "TypeScript", "Tailwind CSS", "FastAPI", "PostgreSQL", "Twilio API"],
    liveUrl: "https://nova-clinics.demo.dev",
    githubUrl: "https://github.com/prajwaldl/nova-clinics",
    featured: true,
    visibility: "public",
    status: "published",
    seo: {
      metaTitle: "Nova Clinics Case Study — Prajwal DL",
      metaDescription: "How we increased patient booking conversion by 38% in 6 weeks with intelligent triage."
    }
  },
  {
    id: "proj-2",
    slug: "alto-commerce",
    title: "Alto Commerce",
    summary: "Headless e-commerce infrastructure delivering sub-second page loads and custom checkout workflows.",
    caseStudyBody: "Alto Commerce operates high-volume luxury apparel storefronts. We implemented a headless Next.js architecture with edge caching, Stripe custom checkout, and real-time inventory reconciliation.",
    coverImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=80"
    ],
    role: "Full Stack Engineer & Performance Specialist",
    client: "Alto Luxury Goods",
    date: "2024",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Shopify Storefront API", "Stripe", "Redis"],
    liveUrl: "https://alto-commerce.demo.dev",
    githubUrl: "https://github.com/prajwaldl/alto-commerce",
    featured: true,
    visibility: "public",
    status: "published",
    seo: {
      metaTitle: "Alto Commerce Case Study — Prajwal DL",
      metaDescription: "Generated $310k incremental revenue in Q1 through ultra-fast headless infrastructure."
    }
  },
  {
    id: "proj-3",
    slug: "relay-ops",
    title: "Relay Ops",
    summary: "Autonomous enterprise process orchestrator connecting CRM, billing, and communication webhooks.",
    caseStudyBody: "Replaced 42 hours per week of manual cross-database entry by deploying event-driven workflow workers with human-in-the-loop validation dashboards and automatic anomaly alerts.",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80"
    ],
    role: "Systems Architect",
    client: "Relay Logistics Group",
    date: "2023",
    technologies: ["Node.js", "Python", "Temporal", "Docker", "PostgreSQL", "Tailwind CSS"],
    liveUrl: "https://relay-ops.demo.dev",
    githubUrl: "https://github.com/prajwaldl/relay-ops",
    featured: true,
    visibility: "public",
    status: "published",
    seo: {
      metaTitle: "Relay Ops Case Study — Prajwal DL",
      metaDescription: "Autonomous operations engine reclaiming 42 engineering hours every week."
    }
  },
  {
    id: "proj-4",
    slug: "aster-ai",
    title: "Aster AI",
    summary: "Multi-agent autonomous cognitive platform with real-time vector memory and dynamic tool execution.",
    caseStudyBody: "Architected the core client and execution engine for Aster AI, enabling non-technical operators to chain multimodal LLM agents for research, synthesis, and code generation.",
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80"
    ],
    role: "Founding Engineer & UI Architect",
    client: "Aster Labs",
    date: "2024",
    technologies: ["React", "TypeScript", "WebSockets", "FastAPI", "VectorDB", "Tailwind CSS"],
    liveUrl: "https://aster-ai.demo.dev",
    githubUrl: "https://github.com/prajwaldl/aster-ai",
    featured: true,
    visibility: "public",
    status: "published",
    seo: {
      metaTitle: "Aster AI Platform — Prajwal DL",
      metaDescription: "MVP shipped in 3 weeks resulting in successful seed investment round."
    }
  },
  {
    id: "proj-5",
    slug: "screenverse-x",
    title: "ScreenVerse X",
    summary: "Spatial multi-screen canvas and 3D media workspace running entirely in the browser.",
    caseStudyBody: "Built a GPU-accelerated spatial workspace where users can organize infinite windows, 3D models, code consoles, and video streams in a unified 3D environment.",
    coverImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80"
    ],
    role: "3D Creative Engineer",
    date: "2023",
    technologies: ["Three.js", "WebGL", "Web Audio API", "React", "TypeScript"],
    liveUrl: "https://screenverse.demo.dev",
    githubUrl: "https://github.com/prajwaldl/screenverse-x",
    featured: false,
    visibility: "public",
    status: "published",
    seo: {
      metaTitle: "ScreenVerse X 3D — Prajwal DL",
      metaDescription: "GPU spatial canvas for infinite multi-screen productivity."
    }
  },
  {
    id: "proj-6",
    slug: "sitesentinel",
    title: "SiteSentinel",
    summary: "Global DNS, SSL, and network telemetry diagnostic suite with instant worldwide edge verification.",
    caseStudyBody: "Created a modern replacement for legacy webmaster diagnostics with full DNS-over-HTTPS resolution, SSL certificate inspection, WHOIS RDAP parsing, and latency heatmaps.",
    coverImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80"
    ],
    role: "Full Stack Developer",
    date: "2023",
    technologies: ["TypeScript", "Cloudflare Workers", "React", "Tailwind CSS", "DoH APIs"],
    liveUrl: "https://sitesentinel.demo.dev",
    githubUrl: "https://github.com/prajwaldl/sitesentinel",
    featured: false,
    visibility: "public",
    status: "published",
    seo: {
      metaTitle: "SiteSentinel Network Diagnostics — Prajwal DL",
      metaDescription: "Real-time edge DNS, SSL, and latency telemetry."
    }
  }
];

export const initialBlogPosts: BlogPost[] = [
  {
    id: "post-1",
    slug: "architecting-multi-theme-operating-systems",
    title: "Architecting Multi-Theme Operating Systems in Pure React",
    excerpt: "How we achieved strict component isolation across 19 radically different visual worlds without sacrificing shared infrastructure.",
    coverImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80",
    tags: ["React", "Architecture", "Design Systems", "Three.js"],
    category: "Engineering",
    readingTimeMinutes: 6,
    wordCount: 1420,
    status: "published",
    publishedAt: "2024-03-15",
    author: "Prajwal DL",
    linkedinShared: true,
    blocks: [
      {
        id: "b-1",
        type: "paragraph",
        content: "Most multi-theme platforms cheat. They swap out a few CSS variables, change a primary color from indigo to emerald, and declare that the site has a 'Cyberpunk' or 'Minimalist' theme. In reality, the navbar is the same, the card hierarchy is the same, and the interaction model is identical."
      },
      {
        id: "b-2",
        type: "heading",
        level: 2,
        content: "The Strict Isolation Principle"
      },
      {
        id: "b-3",
        type: "paragraph",
        content: "To build a true creative operating system, visible UI components must not be shared. A Brutalist site uses raw CSS borders, marquee typography, and stepped color inversions. A Terminal theme uses monospace buffers and CLI navigation. A 3D Galaxy theme uses orbital coordinates. Only invisible data and service contracts may cross the boundary."
      },
      {
        id: "b-4",
        type: "callout",
        content: {
          title: "Architecture Rule",
          text: "If two themes share the same layout architecture, navigation pattern, and grid system, fail the build."
        }
      },
      {
        id: "b-5",
        type: "code",
        language: "typescript",
        content: "export interface ThemeManifest {\n  id: string;\n  layoutArchitecture: string;\n  navigationPattern: string;\n  gridSystem: string;\n  uses3D: boolean;\n}"
      }
    ],
    seo: {
      metaTitle: "Architecting Multi-Theme Operating Systems — Prajwal DL",
      metaDescription: "Strict isolation, dynamic contract loading, and theme differentiation in React."
    }
  },
  {
    id: "post-2",
    slug: "the-zero-lag-automation-pipeline",
    title: "The Zero-Lag Agentic Automation Pipeline: From Blog to LinkedIn",
    excerpt: "Building human-in-the-loop social automation that produces verified, high-converting drafts instead of generic AI slop.",
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
    tags: ["Automation", "AI", "LinkedIn", "Content"],
    category: "AI & Growth",
    readingTimeMinutes: 5,
    wordCount: 1180,
    status: "published",
    publishedAt: "2024-03-01",
    author: "Prajwal DL",
    linkedinShared: false,
    blocks: [
      {
        id: "b-21",
        type: "paragraph",
        content: "Publishing a deep technical case study should immediately trigger a platform-native syndication pipeline. However, direct automated posting without human review often leads to low engagement and awkward formatting."
      },
      {
        id: "b-22",
        type: "heading",
        level: 2,
        content: "The Telegram-Style Approval Queue"
      },
      {
        id: "b-23",
        type: "paragraph",
        content: "By routing generated hooks, summaries, and hashtags into an instant approval card with Approve, Edit, Regenerate, and Reject controls, creators maintain 100% editorial standards in seconds."
      }
    ],
    seo: {
      metaTitle: "Zero-Lag Automation Pipeline — Prajwal DL",
      metaDescription: "Human-in-the-loop social automation for technical founders and developers."
    }
  }
];

export const initialExperience: Experience[] = [
  {
    id: "exp-1",
    company: "SILVERSTEN Studio",
    role: "Founder & Lead Systems Architect",
    location: "Mangalore, India",
    startDate: "2023",
    endDate: "Present",
    current: true,
    description: "Designing and delivering end-to-end bespoke digital operating systems, high-converting web applications, and autonomous AI pipelines for clients globally.",
    achievements: [
      "Delivered 18+ client engagements across healthcare, luxury retail, and SaaS with 100% on-time delivery.",
      "Engineered automated conversion pipelines generating over $2.4M in client revenue.",
      "Pioneered isolated multi-world 3D portfolio architectures with seamless fallback systems."
    ],
    technologies: ["React", "TypeScript", "Three.js", "Python", "FastAPI", "Tailwind CSS", "Docker"]
  },
  {
    id: "exp-2",
    company: "Apex Digital Systems",
    role: "Senior Full Stack Engineer",
    location: "Bangalore / Remote",
    startDate: "2021",
    endDate: "2023",
    current: false,
    description: "Spearheaded front-end architecture and distributed microservice integrations for enterprise logistics and cloud dashboards.",
    achievements: [
      "Refactored legacy monolith into modular Next.js applications reducing bundle size by 45%.",
      "Built real-time telemetry streaming engine utilizing WebSockets and Redis pub/sub.",
      "Mentored junior engineers and instituted automated accessibility and performance testing."
    ],
    technologies: ["Next.js", "Node.js", "TypeScript", "Redis", "PostgreSQL", "AWS"]
  },
  {
    id: "exp-3",
    company: "Freelance Creative Engineer",
    role: "Full Stack & WebGL Developer",
    location: "Remote",
    startDate: "2019",
    endDate: "2021",
    current: false,
    description: "Built interactive web experiences, e-commerce stores, and high-performance landing pages for international creative agencies.",
    achievements: [
      "Constructed 20+ responsive web applications with award-winning interaction design.",
      "Optimized Core Web Vitals to achieve 98+ PageSpeed scores on mobile and desktop."
    ],
    technologies: ["JavaScript", "React", "HTML5 Canvas", "Three.js", "CSS3", "PHP"]
  }
];

export const initialSkills: SkillCategory[] = [
  {
    id: "cat-1",
    category: "Frontend & 3D Web",
    skills: [
      { name: "React 19 & Next.js", level: 96, iconName: "Layers", featured: true },
      { name: "TypeScript", level: 95, iconName: "Code2", featured: true },
      { name: "Three.js & WebGL", level: 90, iconName: "Box", featured: true },
      { name: "Tailwind CSS", level: 98, iconName: "Palette", featured: true },
      { name: "Web Audio & Canvas 2D", level: 85, iconName: "Activity" }
    ]
  },
  {
    id: "cat-2",
    category: "Backend & Systems",
    skills: [
      { name: "Node.js & Express", level: 92, iconName: "Server", featured: true },
      { name: "Python & FastAPI", level: 88, iconName: "Cpu", featured: true },
      { name: "PostgreSQL & Supabase", level: 90, iconName: "Database", featured: true },
      { name: "Redis & WebSockets", level: 86, iconName: "Zap" },
      { name: "Docker & Edge Workers", level: 84, iconName: "Cloud" }
    ]
  },
  {
    id: "cat-3",
    category: "AI & Automation",
    skills: [
      { name: "Agentic Workflows", level: 92, iconName: "Bot", featured: true },
      { name: "LLM Orchestration (Gemini/OpenAI)", level: 94, iconName: "Sparkles", featured: true },
      { name: "Vector Databases & Embeddings", level: 88, iconName: "Compass" },
      { name: "Social & Growth Pipelines", level: 90, iconName: "Share2" }
    ]
  },
  {
    id: "cat-4",
    category: "Architecture & Optimization",
    skills: [
      { name: "Core Web Vitals & Perf", level: 98, iconName: "Gauge", featured: true },
      { name: "Strict Theme Isolation", level: 96, iconName: "ShieldCheck", featured: true },
      { name: "WCAG Accessibility (a11y)", level: 92, iconName: "Eye" },
      { name: "SEO & OpenGraph", level: 94, iconName: "Search" }
    ]
  }
];

export const initialEducation: Education[] = [
  {
    id: "edu-1",
    degree: "Bachelor of Engineering in Computer Science & Engineering",
    institution: "Sahyadri College of Engineering & Management",
    location: "Mangalore, India",
    year: "2019 - 2023",
    score: "First Class with Distinction",
    details: "Specialized in Distributed Systems, Computer Graphics, and Software Engineering Methodologies."
  }
];

export const initialCertifications: Certification[] = [
  {
    id: "cert-1",
    name: "AWS Certified Solutions Architect — Associate",
    issuer: "Amazon Web Services",
    issueDate: "2023",
    credentialId: "AWS-PSA-948210"
  },
  {
    id: "cert-2",
    name: "Generative AI Engineering & LLM Architecture",
    issuer: "DeepLearning.AI",
    issueDate: "2024",
    credentialId: "DL-GENAI-4091"
  },
  {
    id: "cert-3",
    name: "Three.js Journey & Creative WebGL Masterclass",
    issuer: "Bruno Simon Studio",
    issueDate: "2022",
    credentialId: "T3J-CERT-8812"
  }
];

export const initialTestimonials: Testimonial[] = [
  {
    id: "test-1",
    name: "Sarah Jenkins",
    role: "Chief Technology Officer",
    company: "Nova Healthcare Network",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80",
    text: "Prajwal's work on our booking engine transformed our patient acquisition funnel. We saw an immediate 38% increase in completed appointments within six weeks of launch.",
    rating: 5,
    projectRef: "Nova Clinics",
    status: "approved",
    createdAt: "2024-02-18"
  },
  {
    id: "test-2",
    name: "Marcus Vance",
    role: "Head of Product",
    company: "Alto Luxury Goods",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
    text: "A rare combination of high-octane engineering rigor and breathtaking visual polish. Our sub-second load times translated directly into $310k in additional Q1 revenue.",
    rating: 5,
    projectRef: "Alto Commerce",
    status: "approved",
    createdAt: "2024-02-24"
  },
  {
    id: "test-3",
    name: "Elena Rostova",
    role: "Co-Founder & CEO",
    company: "Aster Labs",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80",
    text: "Shipped our multi-agent MVP in just three weeks. Investors and beta users were blown away by the spatial interactive interface. Prajwal is an absolute powerhouse.",
    rating: 5,
    projectRef: "Aster AI",
    status: "approved",
    createdAt: "2024-03-05"
  },
  {
    id: "test-4",
    name: "Devon Chen",
    role: "Engineering Director",
    company: "Quantum CAD Systems",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80",
    text: "Prajwal's WebGL drafting crosshair engine solved our frame rate bottlenecks. Unbelievable eye for performance and mathematical precision.",
    rating: 5,
    projectRef: "Quantum CAD",
    status: "pending",
    createdAt: "2024-03-16"
  }
];

export const initialCustomPages: CustomPage[] = [
  {
    id: "page-1",
    slug: "about",
    title: "About Prajwal DL",
    metaDescription: "Systems architect, full stack engineer, and 3D creative developer based in Mangalore, India.",
    lastModified: "2024-03-10",
    status: "published",
    blocks: [
      {
        id: "pb-1",
        type: "paragraph",
        content: "I build high-throughput web systems, resilient cloud backends, and visceral 3D spatial experiences. Operating under the alias SILVERSTEN, my work combines architectural discipline with craft."
      }
    ]
  },
  {
    id: "page-2",
    slug: "privacy",
    title: "Privacy Policy",
    metaDescription: "Privacy policy and data collection disclosures for PDL Portfolio OS.",
    lastModified: "2024-01-01",
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
    metaDescription: "Terms of use and IP copyright notices for Prajwal DL / SILVERSTEN.",
    lastModified: "2024-01-01",
    status: "published",
    blocks: [
      {
        id: "pb-3",
        type: "paragraph",
        content: "All client case studies, code architectures, and 3D assets showcased herein are intellectual property of Prajwal DL or their respective clients."
      }
    ]
  }
];

export const initialBlogComments: BlogComment[] = [
  {
    id: "comm-1",
    postId: "post-1",
    postTitle: "Architecting Multi-Theme Operating Systems in React",
    authorName: "Alex Rivera",
    authorEmail: "alex.rivera@metaverse.dev",
    content: "The strict isolation concept is brilliant. Most people just inject CSS variables and call it a day. Having completely independent layout trees makes each theme feel like a distinct universe.",
    createdAt: "2024-02-28T14:22:00Z",
    status: "approved"
  },
  {
    id: "comm-2",
    postId: "post-2",
    postTitle: "The Zero-Lag Agentic Automation Pipeline: From Blog to LinkedIn",
    authorName: "Kavita Sharma",
    authorEmail: "kavita.sharma@techgrowth.io",
    content: "The Telegram-style human-in-the-loop review modal is essential. Pure autonomous posting always misses nuances.",
    createdAt: "2024-03-06T09:15:00Z",
    status: "approved"
  },
  {
    id: "comm-3",
    postId: "post-1",
    postTitle: "Architecting Multi-Theme Operating Systems in React",
    authorName: "CryptoBot99",
    authorEmail: "promo@cryptodrops.xyz",
    content: "Check out our free token airdrop now at this link!",
    createdAt: "2024-03-12T11:00:00Z",
    status: "spam"
  },
  {
    id: "comm-4",
    postId: "post-2",
    postTitle: "The Zero-Lag Agentic Automation Pipeline: From Blog to LinkedIn",
    authorName: "Liam Sterling",
    authorEmail: "liam@sterlingventures.co",
    content: "Would love to see how you handle image dimension focal points during automated syndication.",
    createdAt: "2024-03-17T18:40:00Z",
    status: "pending"
  }
];

export const initialBackups: SiteBackup[] = [
  {
    id: "backup-v2.0-baseline",
    timestamp: "2024-03-18T10:00:00Z",
    version: "v2.0.0",
    sizeKb: 142,
    note: "Official baseline snapshot of all 19 themes, portfolio projects, and initial automations.",
    data: null // loaded on demand
  }
];

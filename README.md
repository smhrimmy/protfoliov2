# PDL Portfolio OS (v2)

> **A production-grade, frontend-first portfolio management operating system for Prajwal DL (SILVERSTEN).**
> Features 19 structurally distinct themes, a WordPress-style theme engine, interactive CMS editor, LinkedIn/blog automation suite, modular admin dashboard, and full public experience.

---

## 🌟 Highlights & Key Features

### 1. 19 Structurally Distinct Themes
Unlike basic color-swap systems, each theme features unique typography, layouts, navigational paradigms, and interactive components:
1. **Neo-Brutalist**: High-contrast, heavy black borders, offset hard drop shadows, marquee banners, monospace accents.
2. **Minimal Stark**: Pure swiss design, ultra-clean whitespace, crisp typography, subtle dividers.
3. **Cyberpunk Terminal**: Neon greens/cyans, scanline CRT overlays, terminal boot sequence, command prompts.
4. **Editorial Serif**: Editorial publication layout, Georgia/Playfair serif headings, paper-like elegance.
5. **Glassmorphism**: Frosted glass panels, ambient blur backdrops, vibrant glowing gradients.
6. **Retro 90s OS**: Classic Windows 95 / Mac OS System 7 desktop, draggable windows, taskbar, start menu.
7. **Bento Grid**: Modern modular Bento grid layouts, pill badges, fluid cards.
8. **Art Deco Luxury**: Deep gold and obsidian dark tones, geometric borders, gilded ornamentation.
9. **ASCII Hacker**: Green phosphor on pitch black, raw ASCII headers and ascii art, monospaced data streams.
10. **Paper Document**: Warm parchment styling, typewriter fonts, stapled attachments, document margins.
11. **Liquid Gradient**: Dynamic animated mesh gradients, iridescent accents, fluid transitions.
12. **Monochrome High-Fashion**: Avant-garde typography, stark black and white contrast, editorial lookbook layout.
13. **Vaporwave Sunset**: 80s synthwave aesthetics, neon magenta & purple gradients, wireframe sun grids.
14. **Blueprint Architecture**: Cyanotype blueprint blueprints, grid measurements, technical drawing specs.
15. **Kinetic Typography**: Giant dynamic animated headline typography, scroll-reactive type sizing.
16. **3D Interactive Space**: Interactive Three.js canvas backgrounds, floating geometries, particle fields.
17. **Organic Claymorphism**: Soft pastel 3D rounded clay shapes, inner shadows, tactile cards.
18. **Nordic Aurora**: Deep Scandinavian midnight blues, soft aurora borealis color glows, minimalist serenity.
19. **Isometric City**: Isometric vector illustration motifs, angled card perspectives, technical accents.

---

### 2. Complete Admin OS Suite (`/admin`)
- **Executive Dashboard**: Real-time mock analytics, quick actions, performance charts, content status, system health.
- **Visual Block CMS Editor**: Drag-and-drop block reordering, rich text editing, live multi-device preview (desktop, tablet, mobile), instant theme toggle.
- **Projects Management**: Comprehensive project metadata, tech stack tags, live URLs, GitHub links, featured toggles.
- **Blog & Content Automation**: Markdown editor with real-time preview, scheduling, tag management, reading time estimation.
- **LinkedIn / Social Automation**: Post scheduler, AI drafting prompts, preview cards with character counts and engagement tracking.
- **Theme Engine & Customizer**: Live preview across all 19 themes, typography controls, accent color overrides, instant switching.
- **Testimonials Hub**: Client testimonial verification, status pipeline (approved/pending/rejected), direct public submission modal.
- **Resume & Experience Builder**: Interactive resume editor, timeline configuration, skill proficiency meters, PDF export ready.
- **Backup & Migration**: One-click JSON export/import of all CMS data, themes, and configuration with validation.
- **Notification Center**: Notification feeds, read/unread states, filter by priority and categories.

---

### 3. Public-Facing Experience
- **Dynamic Theme Switcher**: Floating theme picker with real-time live preview and instant switching across all 19 themes.
- **Interactive Projects Showcase**: Categorized filtering, featured highlights, detailed case study modal views.
- **Blog & Case Studies**: Full article views, reading progress bar, table of contents, and interactive comment system.
- **Contact & Inquiries**: Working contact form with state validation, direct mailto fallback, and social links.
- **Testimonial Submission**: Public-facing testimonial submission modal for clients and collaborators.
- **RSS Feed Simulation**: Formatted XML/RSS feed preview for automated content syndication.

---

## 🛠️ Technology Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 8](https://vite.dev/)
- **Language**: [TypeScript 5 / 6](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **3D Graphics**: [Three.js](https://threejs.org/)
- **Routing**: Client-side hash/history state router with deep link preservation

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or 20+
- npm, pnpm, or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/smhrimmy/pdl-portfolio-os.git

# Navigate to directory
cd pdl-portfolio-os

# Install dependencies
npm install
```

### Development
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build
```bash
npm run build
npm run preview
```

---

## 📂 Project Architecture

```
protfoliov2/
├── public/                 # Static assets & icons
├── src/
│   ├── components/        # Reusable UI widgets & layout primitives
│   │   ├── admin/         # Admin shell, sidebar, topbar, modal dialogs
│   │   ├── common/        # Shared buttons, inputs, badge components
│   │   └── public/        # Public navigation, footers, theme floating switcher
│   ├── data/              # Realistic mock databases & seed data
│   │   ├── mockProjects.ts
│   │   ├── mockPosts.ts
│   │   ├── mockTestimonials.ts
│   │   └── mockAnalytics.ts
│   ├── pages/             # Application route views
│   │   ├── admin/         # 10+ Admin OS modules (Dashboard, CMS, Resume, Backup, etc.)
│   │   └── public/        # Public views (Home, Projects, Blog, Article, Case Study, RSS, etc.)
│   ├── themes/            # 19 distinct theme engines & style definitions
│   │   └── themeDefinitions.ts
│   ├── types/             # TypeScript definitions & data models
│   ├── App.tsx            # Main router & theme provider integration
│   ├── main.tsx           # Application entrypoint
│   └── index.css          # Tailwind directives & theme style rules
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 📜 License

Created and maintained by **Prajwal DL (SILVERSTEN)**. Distributed under the MIT License.

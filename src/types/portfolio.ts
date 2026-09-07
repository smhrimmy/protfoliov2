export interface Project {
  id: string;
  slug: string;
  title: string;
  summary: string;
  caseStudyBody: string;
  coverImage: string;
  galleryImages: string[];
  role: string;
  client?: string;
  date: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  visibility: 'public' | 'private' | 'password';
  status: 'draft' | 'published';
  seo: {
    metaTitle: string;
    metaDescription: string;
    ogImage?: string;
  };
}

export type BlockType = 
  | 'paragraph' 
  | 'heading' 
  | 'image' 
  | 'gallery' 
  | 'quote' 
  | 'code' 
  | 'embed' 
  | 'divider' 
  | 'table' 
  | 'callout';

export interface ContentBlock {
  id: string;
  type: BlockType;
  content: string | Record<string, any>;
  level?: 2 | 3 | 4; // for headings
  language?: string; // for code
  caption?: string; // for images/embeds
  altText?: string;
  focalPoint?: { x: number; y: number };
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  blocks: ContentBlock[];
  coverImage: string;
  tags: string[];
  category: string;
  readingTimeMinutes: number;
  wordCount: number;
  status: 'draft' | 'published' | 'scheduled';
  publishedAt?: string;
  scheduledAt?: string;
  author: string;
  seo: {
    metaTitle: string;
    metaDescription: string;
    ogImage?: string;
  };
  linkedinShared?: boolean;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface SkillItem {
  name: string;
  level: number; // 1-100
  iconName: string;
  featured?: boolean;
}

export interface SkillCategory {
  id: string;
  category: string;
  skills: SkillItem[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  year: string;
  score?: string;
  details?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  credentialUrl?: string;
  credentialId?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  text: string;
  rating: number;
  projectRef?: string;
  status?: 'approved' | 'pending' | 'rejected';
  createdAt?: string;
}

export interface BlogComment {
  id: string;
  postId: string;
  postTitle: string;
  authorName: string;
  authorEmail: string;
  content: string;
  createdAt: string;
  status: 'approved' | 'pending' | 'spam';
}

export interface SiteBackup {
  id: string;
  timestamp: string;
  version: string;
  sizeKb: number;
  note: string;
  data: any;
}

export interface CustomPage {
  id: string;
  slug: string;
  title: string;
  blocks: ContentBlock[];
  lastModified: string;
  status: 'draft' | 'published';
  metaDescription?: string;
}

export interface PortfolioIdentity {
  name: string;
  alias: string;
  role: string;
  subRole: string;
  location: string;
  bio: string;
  tagline: string;
  avatarUrl: string;
  resumeUrl: string;
  stats: {
    projectsShipped: string;
    revenueInfluenced: string;
    happyClients: string;
    yearsBuilding: string;
  };
  socialLinks: {
    github: string;
    linkedin: string;
    twitter: string;
    email: string;
    website: string;
  };
}

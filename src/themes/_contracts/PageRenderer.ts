import React from 'react';
import { Project, BlogPost, Experience, SkillCategory, PortfolioIdentity } from '@/types/portfolio';
import { ThemeConfig } from '@/types/theme';

export interface ThemePageProps {
  identity: PortfolioIdentity;
  projects: Project[];
  blogPosts: BlogPost[];
  experience: Experience[];
  skillCategories: SkillCategory[];
  activeProject?: Project;
  activePost?: BlogPost;
  onNavigate: (route: string) => void;
  config?: ThemeConfig;
}

export interface ThemeModule {
  config: ThemeConfig;
  Home: React.ComponentType<ThemePageProps>;
  Projects?: React.ComponentType<ThemePageProps>;
  ProjectDetail?: React.ComponentType<ThemePageProps>;
  About?: React.ComponentType<ThemePageProps>;
  Contact?: React.ComponentType<ThemePageProps>;
  Blog?: React.ComponentType<ThemePageProps>;
  BlogArticle?: React.ComponentType<ThemePageProps>;
  ExperiencePage?: React.ComponentType<ThemePageProps>;
  SkillsPage?: React.ComponentType<ThemePageProps>;
  ResumePage?: React.ComponentType<ThemePageProps>;
}

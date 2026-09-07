export interface RevisionDiffLine {
  type: 'add' | 'del' | 'same';
  text: string;
}

export interface ContentRevision {
  id: string;
  entityId: string;
  entityType: 'project' | 'blog' | 'page' | 'site_content';
  timestamp: string;
  author: string;
  summary: string;
  diffLines: RevisionDiffLine[];
  snapshot: any;
}

export interface MediaAsset {
  id: string;
  name: string;
  url: string;
  sizeBytes: number;
  dimensions: { width: number; height: number };
  altText: string;
  folder: string;
  tags: string[];
  usedIn: { entityType: string; id: string; title: string }[];
  createdAt: string;
}

export interface SiteHealthCheck {
  id: string;
  category: 'seo' | 'performance' | 'accessibility' | 'content';
  title: string;
  description: string;
  severity: 'good' | 'warning' | 'critical';
  passed: boolean;
  recommendation: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
  link?: string;
}

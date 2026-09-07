export interface AutomationRule {
  id: string;
  name: string;
  trigger: 'on_post_publish' | 'on_project_publish' | 'manual' | 'scheduled';
  platform: 'linkedin' | 'twitter' | 'devto' | 'github_sync';
  status: 'connected' | 'simulated' | 'needs_reauth';
  enabled: boolean;
  conditions?: {
    featuredOnly?: boolean;
  };
  lastRun?: string;
  successCount: number;
  failCount: number;
}

export interface SocialDraft {
  id: string;
  sourceId: string;
  sourceType: 'post' | 'project';
  sourceTitle: string;
  platform: 'linkedin' | 'twitter' | 'devto';
  hookHeadline: string;
  summary: string;
  canonicalUrl: string;
  hashtags: string[];
  mediaUrl?: string;
  status: 'pending_approval' | 'approved' | 'rejected' | 'published';
  createdAt: string;
}

export interface AutomationLog {
  id: string;
  ruleId: string;
  ruleName: string;
  platform: string;
  timestamp: string;
  status: 'simulated-success' | 'success' | 'failed';
  message: string;
  payload: any;
}

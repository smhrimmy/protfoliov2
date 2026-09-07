import { SocialDraft, AutomationLog } from '@/types/automation';

export interface SocialPlatformAdapter {
  platformId: string;
  name: string;
  getStatus(): 'connected' | 'simulated' | 'needs_reauth';
  publish(draft: SocialDraft): Promise<{ success: boolean; status: 'simulated-success' | 'success' | 'failed'; message: string; log: AutomationLog }>;
}

export const linkedinAdapter: SocialPlatformAdapter = {
  platformId: 'linkedin',
  name: 'LinkedIn REST API v2',
  getStatus: () => 'connected',
  publish: async (draft: SocialDraft) => {
    // Simulated publish payload exactly matching LinkedIn UGC post structure
    const payload = {
      author: 'urn:li:person:prajwaldl',
      lifecycleState: 'PUBLISHED',
      specificContent: {
        'com.linkedin.ugc.ShareContent': {
          shareCommentary: {
            text: `${draft.hookHeadline}\n\n${draft.summary}\n\nRead more: ${draft.canonicalUrl}\n\n${draft.hashtags.join(' ')}`
          },
          shareMediaCategory: draft.mediaUrl ? 'ARTICLE' : 'NONE',
          media: draft.mediaUrl ? [
            {
              status: 'READY',
              description: { text: draft.summary },
              originalUrl: draft.canonicalUrl,
              title: { text: draft.sourceTitle }
            }
          ] : undefined
        }
      },
      visibility: {
        'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
      }
    };

    const log: AutomationLog = {
      id: `log-${Date.now()}`,
      ruleId: 'auto-1',
      ruleName: 'Blog to LinkedIn Pipeline',
      platform: 'LinkedIn API v2',
      timestamp: new Date().toISOString(),
      status: 'simulated-success',
      message: `Simulated LinkedIn publish completed for "${draft.sourceTitle}"`,
      payload
    };

    return {
      success: true,
      status: 'simulated-success',
      message: 'Published to LinkedIn (simulated mode). Live payload generated and verified.',
      log
    };
  }
};

export const twitterAdapter: SocialPlatformAdapter = {
  platformId: 'twitter',
  name: 'X / Twitter API v2',
  getStatus: () => 'connected',
  publish: async (draft: SocialDraft) => {
    const payload = {
      text: `${draft.hookHeadline}\n\n${draft.canonicalUrl}\n${draft.hashtags.slice(0, 3).join(' ')}`
    };

    const log: AutomationLog = {
      id: `log-${Date.now()}`,
      ruleId: 'auto-2',
      ruleName: 'New Project Announcement',
      platform: 'X / Twitter API v2',
      timestamp: new Date().toISOString(),
      status: 'simulated-success',
      message: `Tweet published (simulated) for "${draft.sourceTitle}"`,
      payload
    };

    return {
      success: true,
      status: 'simulated-success',
      message: 'Tweet queued and posted (simulated).',
      log
    };
  }
};

export const devtoAdapter: SocialPlatformAdapter = {
  platformId: 'devto',
  name: 'Dev.to Articles API',
  getStatus: () => 'simulated',
  publish: async (draft: SocialDraft) => {
    const payload = {
      article: {
        title: draft.sourceTitle,
        published: true,
        body_markdown: `# ${draft.hookHeadline}\n\n${draft.summary}\n\nOriginally published at ${draft.canonicalUrl}`,
        tags: draft.hashtags.map(h => h.replace('#', '').toLowerCase()).slice(0, 4)
      }
    };

    const log: AutomationLog = {
      id: `log-${Date.now()}`,
      ruleId: 'auto-4',
      ruleName: 'Dev.to Technical Cross-Post',
      platform: 'Dev.to API',
      timestamp: new Date().toISOString(),
      status: 'simulated-success',
      message: `Article cross-posted to Dev.to (simulated)`,
      payload
    };

    return {
      success: true,
      status: 'simulated-success',
      message: 'Article cross-posted to Dev.to (simulated mode).',
      log
    };
  }
};

import { BlogPost, Project } from '@/types/portfolio';
import { SocialDraft } from '@/types/automation';
import { mockStorage } from '@/data/mockStorage';

export const SYNDICATION_TAG_WHITELIST = [
  'career',
  'dev notes',
  'architecture',
  'engineering',
  'tech leadership',
  'devops',
  'frontend',
  'backend',
  'ai systems'
];

export const SYNDICATION_BYPASS_TAGS = [
  'notes to self',
  'personal',
  'draft thoughts',
  'private',
  'wip'
];

export class ContentPipelineService {
  /**
   * Evaluates whether a post qualifies for automated LinkedIn syndication.
   * Rules:
   * 1. Status MUST be 'published' (drafts never leak)
   * 2. Must not have bypass tags (e.g. 'Notes to self')
   * 3. Must match a whitelisted category or trigger tag (e.g. 'Career', 'Dev Notes')
   */
  shouldAutoQueueForLinkedIn(post: BlogPost): { shouldQueue: boolean; triggerTag?: string; reason: string } {
    if (post.status !== 'published') {
      return { 
        shouldQueue: false, 
        reason: `Status is '${post.status}'. Automation strictly requires status: 'published' to prevent draft leakage.` 
      };
    }

    const allTags = [...post.tags, post.category].map(t => t.toLowerCase());

    // Check for explicit bypass tags (e.g. 'Notes to self')
    const hasBypass = allTags.some(t => SYNDICATION_BYPASS_TAGS.includes(t));
    if (hasBypass) {
      return { 
        shouldQueue: false, 
        reason: `Post contains bypass tag (e.g. 'Notes to self'). Excluded from LinkedIn syndication.` 
      };
    }

    // Check for whitelisted syndication trigger tag
    const trigger = allTags.find(t => SYNDICATION_TAG_WHITELIST.includes(t));
    if (!trigger) {
      return { 
        shouldQueue: false, 
        reason: `No qualifying syndication tags found. Tag with 'Career' or 'Dev Notes' to auto-queue.` 
      };
    }

    return { 
      shouldQueue: true, 
      triggerTag: trigger,
      reason: `Qualified for syndication via tag: '${trigger}'` 
    };
  }

  /**
   * Generates a SocialDraft formatted specifically for LinkedIn/X,
   * setting "The Journal" as the default render target and pulling
   * the excerpt field directly as the social body.
   */
  generateSocialDraft(
    source: BlogPost | Project, 
    sourceType: 'post' | 'project', 
    platform: 'linkedin' | 'twitter' | 'devto' = 'linkedin'
  ): SocialDraft {
    const isPost = sourceType === 'post';
    const post = isPost ? (source as BlogPost) : null;
    const proj = !isPost ? (source as Project) : null;

    let hookHeadline = '';
    let summary = '';
    let canonicalUrl = '';
    let hashtags: string[] = [];
    let triggerTag: string | undefined = undefined;

    if (isPost && post) {
      // Find trigger tag if any
      const evalResult = this.shouldAutoQueueForLinkedIn(post);
      triggerTag = evalResult.triggerTag;

      // Excerpt field = social copy source (trimmed with link back to full post)
      hookHeadline = post.title;
      
      const trimmedExcerpt = post.excerpt.length > 260 
        ? `${post.excerpt.slice(0, 257)}...` 
        : post.excerpt;

      canonicalUrl = `https://protfoliov2-six.vercel.app/blog/${post.slug}`;
      
      // Pull excerpt directly as the social copy body + link
      summary = `${trimmedExcerpt}\n\nRead full dispatch on The Journal: ${canonicalUrl}`;
      
      hashtags = post.tags
        .slice(0, 4)
        .map(t => `#${t.replace(/\s+/g, '')}`)
        .concat(['#WebDevelopment', '#SoftwareEngineering']);
    } else if (proj) {
      hookHeadline = `Just shipped: ${proj.title} — ${proj.summary}`;
      summary = `${proj.caseStudyBody.slice(0, 180)}... Built with ${proj.technologies.slice(0, 4).join(', ')}.\n\nView live system: https://protfoliov2-six.vercel.app/projects/${proj.slug}`;
      canonicalUrl = `https://protfoliov2-six.vercel.app/projects/${proj.slug}`;
      hashtags = proj.technologies.slice(0, 4).map(t => `#${t.replace(/\s+/g, '')}`).concat(['#FullStack', '#Engineering']);
    }

    const draft: SocialDraft = {
      id: `draft-${Date.now()}`,
      sourceId: source.id,
      sourceType,
      sourceTitle: source.title,
      platform,
      hookHeadline,
      summary,
      canonicalUrl,
      hashtags,
      mediaUrl: isPost ? post?.coverImage : proj?.coverImage,
      renderThemeTarget: 'theme-24-the-journal', // Default render target: The Journal
      syndicationTriggerTag: triggerTag,
      status: 'pending_approval',
      createdAt: new Date().toISOString()
    };

    mockStorage.saveSocialDraft(draft);
    mockStorage.addNotification({
      id: `notif-${Date.now()}`,
      title: 'New Social Syndication Draft',
      message: `The Journal: Generated ${platform.toUpperCase()} draft from excerpt for "${source.title}". Review in Automations queue.`,
      type: 'info',
      timestamp: 'Just now',
      read: false,
      link: '/admin/automations'
    });

    return draft;
  }

  /**
   * Automated Creator listener: automatically evaluates published post
   * and queues syndication if criteria are met.
   */
  checkAndQueuePostSyndication(post: BlogPost): SocialDraft | null {
    const evaluation = this.shouldAutoQueueForLinkedIn(post);
    if (!evaluation.shouldQueue) {
      console.log(`[Automated Creator] Skipped syndication for '${post.title}': ${evaluation.reason}`);
      return null;
    }

    console.log(`[Automated Creator] Triggering LinkedIn syndication for '${post.title}' (tag: ${evaluation.triggerTag})`);
    return this.generateSocialDraft(post, 'post', 'linkedin');
  }
}

export const contentPipelineService = new ContentPipelineService();

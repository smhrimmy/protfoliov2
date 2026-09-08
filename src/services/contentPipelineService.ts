import { BlogPost, Project } from '@/types/portfolio';
import { SocialDraft } from '@/types/automation';
import { mockStorage } from '@/data/mockStorage';

export class ContentPipelineService {
  generateSocialDraft(source: BlogPost | Project, sourceType: 'post' | 'project', platform: 'linkedin' | 'twitter' | 'devto' = 'linkedin'): SocialDraft {
    const isPost = sourceType === 'post';
    const post = isPost ? (source as BlogPost) : null;
    const proj = !isPost ? (source as Project) : null;

    let hookHeadline = '';
    let summary = '';
    let canonicalUrl = '';
    let hashtags: string[] = [];

    if (isPost && post) {
      hookHeadline = `Why ${post.title.toLowerCase()} matters for high-growth tech teams:`;
      summary = `${post.excerpt} We broke down the end-to-end architecture, from technical trade-offs to production benchmarks.`;
      canonicalUrl = `https://praxel.space/blog/${post.slug}`;
      hashtags = post.tags.map(t => `#${t.replace(/\s+/g, '')}`).concat(['#TechLeadership', '#SoftwareArchitecture']);
    } else if (proj) {
      hookHeadline = `Just shipped: ${proj.title} — ${proj.summary}`;
      summary = `${proj.caseStudyBody.slice(0, 180)}... Built using ${proj.technologies.slice(0, 4).join(', ')}.`;
      canonicalUrl = `https://praxel.space/projects/${proj.slug}`;
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
      status: 'pending_approval',
      createdAt: new Date().toISOString()
    };

    mockStorage.saveSocialDraft(draft);
    mockStorage.addNotification({
      id: `notif-${Date.now()}`,
      title: 'New Social Draft Generated',
      message: `AI generated a ${platform.toUpperCase()} draft for "${source.title}". Review in Automations queue.`,
      type: 'info',
      timestamp: 'Just now',
      read: false,
      link: '/admin/automations'
    });

    return draft;
  }
}

export const contentPipelineService = new ContentPipelineService();

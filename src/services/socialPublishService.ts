import { SocialDraft } from '@/types/automation';
import { linkedinAdapter, twitterAdapter, devtoAdapter } from './adapters/adapters';
import { mockStorage } from '@/data/mockStorage';

export class SocialPublishService {
  private adapters = {
    linkedin: linkedinAdapter,
    twitter: twitterAdapter,
    devto: devtoAdapter
  };

  getAdapter(platform: 'linkedin' | 'twitter' | 'devto') {
    return this.adapters[platform];
  }

  async publish(draft: SocialDraft) {
    const adapter = this.adapters[draft.platform];
    if (!adapter) throw new Error(`Unsupported platform: ${draft.platform}`);

    const result = await adapter.publish(draft);
    if (result.success) {
      // Save log
      mockStorage.addAutomationLog(result.log);
      // Update draft status
      draft.status = 'published';
      mockStorage.saveSocialDraft(draft);

      mockStorage.addNotification({
        id: `notif-${Date.now()}`,
        title: `${adapter.name}: Publish Complete`,
        message: `Simulated live broadcast for "${draft.sourceTitle}" verified.`,
        type: 'success',
        timestamp: 'Just now',
        read: false,
        link: '/admin/automations'
      });
    }
    return result;
  }
}

export const socialPublishService = new SocialPublishService();

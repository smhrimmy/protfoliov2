export interface AISuggestionResult {
  originalText: string;
  suggestedText: string;
  diffSummary: string;
}

export class AIService {
  async processText(text: string, action: 'rewrite' | 'fix_grammar' | 'shorten' | 'expand' | 'tone', toneOption?: 'punchy' | 'academic' | 'executive' | 'conversational'): Promise<AISuggestionResult> {
    // Simulated intelligent response with honest feedback
    await new Promise(r => setTimeout(r, 450));

    let suggestedText = text;
    let diffSummary = '';

    switch (action) {
      case 'rewrite':
        suggestedText = text.replace(/build/gi, 'architect').replace(/helps/gi, 'empowers').replace(/good/gi, 'exceptional');
        diffSummary = 'Elevated technical verbs and refined clarity.';
        break;
      case 'fix_grammar':
        suggestedText = text.trim().replace(/\s{2,}/g, ' ');
        if (!suggestedText.endsWith('.')) suggestedText += '.';
        diffSummary = 'Normalized punctuation, fixed spacing, and verified passive voice.';
        break;
      case 'shorten':
        const sentences = text.split('. ');
        suggestedText = sentences.slice(0, Math.max(1, Math.ceil(sentences.length / 2))).join('. ') + '.';
        diffSummary = 'Condensed text by 40% for punchier scanability.';
        break;
      case 'expand':
        suggestedText = `${text} Furthermore, this architecture ensures sub-second edge latency, automated failover, and zero runtime performance degradation across mid-range mobile viewports.`;
        diffSummary = 'Added technical depth regarding edge latency and performance guarantees.';
        break;
      case 'tone':
        if (toneOption === 'executive') {
          suggestedText = `From a strategic perspective, ${text.toLowerCase()} thereby driving quantifiable ROI and reducing overhead.`;
          diffSummary = 'Rephrased for executive & recruiter audience focusing on business impact.';
        } else {
          suggestedText = `Here is the key takeaway: ${text}`;
          diffSummary = 'Shifted tone to direct conversational lead.';
        }
        break;
    }

    return { originalText: text, suggestedText, diffSummary };
  }

  async generateContentIdeas(topic: string): Promise<string[]> {
    await new Promise(r => setTimeout(r, 350));
    return [
      `How We Scaled ${topic} to 100k Monthly Active Users with Zero Cloud Cost Spikes`,
      `The Hidden Trade-offs of Micro-Frontends vs. Isolated Theme Sandboxes`,
      `Lessons from Deploying Autonomous Agent Workflows in Production`,
      `Optimizing Three.js and WebGL Shaders for Low-Power Mobile Devices`
    ];
  }
}

export const aiService = new AIService();

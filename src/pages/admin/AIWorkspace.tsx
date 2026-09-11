import React, { useState } from 'react';
import { Sparkles, Send, Copy, Check, RefreshCw, Wand2 } from 'lucide-react';
import { aiService, AISuggestionResult } from '@/services/aiService';

export const AIWorkspace: React.FC = () => {
  const [prompt, setPrompt] = useState('Write an executive summary of our AI agentic automation system that saved 42 hours per week for operations.');
  const [action, setAction] = useState<'rewrite' | 'fix_grammar' | 'shorten' | 'expand' | 'tone'>('expand');
  const [tone, setTone] = useState<'punchy' | 'academic' | 'executive' | 'conversational'>('executive');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AISuggestionResult | null>(null);
  const [ideas, setIdeas] = useState<string[]>([]);
  const [topic, setTopic] = useState('Three.js and Multi-Theme React Architecture');

  const handleProcess = async () => {
    setLoading(true);
    const res = await aiService.processText(prompt, action, tone);
    setResult(res);
    setLoading(false);
  };

  const handleGenerateIdeas = async () => {
    setLoading(true);
    const idList = await aiService.generateContentIdeas(topic);
    setIdeas(idList);
    setLoading(false);
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-8 text-[#222222] font-sans pb-28">
      <div className="pb-4 border-b border-black/8">
        <div className="text-[10px] font-mono tracking-widest text-[#ad314d] uppercase font-bold mb-1">
          INTELLIGENCE STUDIO · GENERATIVE ENGINE
        </div>
        <h1 className="text-2xl font-black text-[#1a1a1a] tracking-tight flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-[#ad314d]" /> AI Workspace & Editorial Assistant
        </h1>
        <p className="text-xs text-[#55555e] mt-1">Prompt playground, tone rewriting, case study summarizer, and content ideation.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Input Console */}
        <div className="bg-white/85 backdrop-blur-md border border-black/8 rounded-2xl p-6 space-y-4 shadow-xs">
          <h3 className="text-sm font-bold text-[#1a1a1a] uppercase tracking-wider">Editorial Transformation</h3>
          <textarea
            rows={6}
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            className="w-full bg-white border border-black/10 rounded-xl p-3 text-xs text-[#1a1a1a] focus:outline-none focus:border-[#ad314d] resize-none leading-relaxed"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-mono text-[#55555e] block mb-1 font-semibold">Action</label>
              <select
                value={action}
                onChange={e => setAction(e.target.value as any)}
                className="w-full bg-white border border-black/10 rounded-xl px-3 py-2 text-xs text-[#1a1a1a] focus:outline-none focus:border-[#ad314d]"
              >
                <option value="rewrite">Rewrite & Elevate Verbs</option>
                <option value="expand">Expand with Technical Details</option>
                <option value="shorten">Shorten / Make Punchy</option>
                <option value="fix_grammar">Verify Grammar & Punctuation</option>
                <option value="tone">Change Voice Tone</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-mono text-[#55555e] block mb-1 font-semibold">Target Tone</label>
              <select
                value={tone}
                onChange={e => setTone(e.target.value as any)}
                className="w-full bg-white border border-black/10 rounded-xl px-3 py-2 text-xs text-[#1a1a1a] focus:outline-none focus:border-[#ad314d]"
              >
                <option value="executive">Executive & Recruiter</option>
                <option value="punchy">Punchy Growth</option>
                <option value="technical">Deep Systems Technical</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleProcess}
            disabled={loading}
            className="w-full py-2.5 bg-[#ad314d] hover:bg-[#8e253d] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-all disabled:opacity-50"
          >
            <Wand2 className="w-4 h-4" /> {loading ? 'Processing...' : 'Run Transformation'}
          </button>
        </div>

        {/* Right: Output Result Diff */}
        <div className="bg-white/85 backdrop-blur-md border border-black/8 rounded-2xl p-6 space-y-4 flex flex-col justify-between shadow-xs">
          <div>
            <h3 className="text-sm font-bold text-[#1a1a1a] uppercase tracking-wider mb-3">Proposed AI Output</h3>
            {result ? (
              <div className="space-y-3">
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl text-xs leading-relaxed text-purple-950 font-medium">
                  {result.suggestedText}
                </div>
                <p className="text-[11px] font-mono text-[#55555e] italic">Strategy: {result.diffSummary}</p>
              </div>
            ) : (
              <div className="py-16 text-center text-xs text-[#888890] font-mono">
                Click "Run Transformation" to view AI generated proposal.
              </div>
            )}
          </div>

          {result && (
            <button
              onClick={() => navigator.clipboard?.writeText(result.suggestedText)}
              className="w-full py-2 bg-black/5 hover:bg-black/10 text-[#1a1a1a] rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
            >
              <Copy className="w-3.5 h-3.5" /> Copy Output
            </button>
          )}
        </div>
      </div>

      {/* Ideas Generator */}
      <div className="bg-white/85 backdrop-blur-md border border-black/8 rounded-2xl p-6 space-y-4 shadow-xs">
        <h3 className="text-sm font-bold text-[#1a1a1a] uppercase tracking-wider">Content & Article Topic Generator</h3>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <input
            type="text"
            value={topic}
            onChange={e => setTopic(e.target.value)}
            className="flex-1 bg-white border border-black/10 rounded-xl px-4 py-2 text-xs text-[#1a1a1a] focus:outline-none focus:border-[#ad314d]"
          />
          <button
            onClick={handleGenerateIdeas}
            className="px-4 py-2 bg-[#ad314d] hover:bg-[#8e253d] text-white rounded-xl text-xs font-semibold shrink-0 transition-all shadow-sm"
          >
            Generate Ideas
          </button>
        </div>

        {ideas.length > 0 && (
          <div className="space-y-2 pt-2">
            {ideas.map((idText, idx) => (
              <div key={idx} className="p-3 bg-black/[0.02] border border-black/6 rounded-xl text-xs text-[#1a1a1a] flex items-center justify-between">
                <span>{idText}</span>
                <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">HIGH ENGAGEMENT</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Save, Send, Sparkles, Plus, Trash2, Copy, ArrowUp, 
  ArrowDown, Heading, AlignLeft, Code2, Quote, Image as ImageIcon, 
  Table, Minus, HelpCircle, Eye, Check, X, Maximize2, Minimize2, 
  Search, Sliders, Clock
} from 'lucide-react';
import { mockStorage } from '@/data/mockStorage';
import { BlogPost, ContentBlock, BlockType } from '@/types/portfolio';
import { contentPipelineService } from '@/services/contentPipelineService';
import { aiService, AISuggestionResult } from '@/services/aiService';
import { TelegramApprovalModal } from '@/components/common/TelegramApprovalModal';
import { SocialDraft } from '@/types/automation';

interface BlogEditorProps {
  postId?: string;
  onNavigate: (route: string) => void;
}

export const BlogEditor: React.FC<BlogEditorProps> = ({ postId, onNavigate }) => {
  const isNew = !postId || postId === 'new';
  const existing = !isNew ? mockStorage.getPosts().find(p => p.id === postId) : null;

  const [title, setTitle] = useState(existing?.title || '');
  const [slug, setSlug] = useState(existing?.slug || '');
  const [excerpt, setExcerpt] = useState(existing?.excerpt || '');
  const [category, setCategory] = useState(existing?.category || 'Engineering');
  const [tags, setTags] = useState<string[]>(existing?.tags || ['React', 'Architecture']);
  const [newTag, setNewTag] = useState('');
  const [coverImage, setCoverImage] = useState(existing?.coverImage || 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80');
  const [status, setStatus] = useState<'draft' | 'published' | 'scheduled'>(existing?.status || 'draft');
  const [scheduledAt, setScheduledAt] = useState(existing?.scheduledAt || '');
  
  // Blocks
  const [blocks, setBlocks] = useState<ContentBlock[]>(existing?.blocks || [
    { id: 'b-1', type: 'paragraph', content: 'Start typing your case study or article here. Use the slash command (/) to insert headings, code blocks, callouts, and embeds.' },
    { id: 'b-2', type: 'heading', level: 2, content: 'Technical Architecture & Deep Dive' },
    { id: 'b-3', type: 'callout', content: { title: 'Core Metric', text: 'Quantifiable outcome or benchmark achieved by this system.' } }
  ]);

  // Slash menu state
  const [slashMenuIndex, setSlashMenuIndex] = useState<number | null>(null);
  const [slashQuery, setSlashQuery] = useState('');

  // AI Assist State
  const [aiSelectedBlockId, setAiSelectedBlockId] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<AISuggestionResult | null>(null);

  // Focus mode
  const [focusMode, setFocusMode] = useState(false);

  // SEO & TOC Side Panel
  const [showSidePanel, setShowSidePanel] = useState<'seo' | 'toc' | 'settings'>('seo');

  // Telegram approval modal
  const [activeDraft, setActiveDraft] = useState<SocialDraft | null>(null);
  const [savedStatus, setSavedStatus] = useState<'Saved' | 'Saving...'>('Saved');

  // Word count & Reading Time Calculation
  const totalWords = blocks.reduce((acc, b) => {
    if (typeof b.content === 'string') return acc + b.content.split(/\s+/).filter(Boolean).length;
    if (typeof b.content === 'object' && b.content.text) return acc + b.content.text.split(/\s+/).filter(Boolean).length;
    return acc;
  }, 0);
  const readingTime = Math.max(1, Math.ceil(totalWords / 200));

  // Auto TOC from Headings
  const headings = blocks.filter(b => b.type === 'heading');

  const handleSave = () => {
    setSavedStatus('Saving...');
    const post: BlogPost = {
      id: existing ? existing.id : `post-${Date.now()}`,
      slug: slug || title.toLowerCase().replace(/\s+/g, '-'),
      title,
      excerpt,
      blocks,
      coverImage,
      tags,
      category,
      readingTimeMinutes: readingTime,
      wordCount: totalWords,
      status,
      scheduledAt: status === 'scheduled' ? scheduledAt : undefined,
      publishedAt: status === 'published' ? (existing?.publishedAt || new Date().toISOString().split('T')[0]) : undefined,
      author: 'Prajwal DL',
      seo: {
        metaTitle: `${title} — Prajwal DL`,
        metaDescription: excerpt,
        ogImage: coverImage
      }
    };

    setTimeout(() => {
      mockStorage.savePost(post);
      setSavedStatus('Saved');
      if (isNew) {
        onNavigate('/admin/blog');
      }
    }, 280);
  };

  const handleShareToLinkedIn = () => {
    const post: BlogPost = {
      id: existing ? existing.id : `post-${Date.now()}`,
      slug,
      title,
      excerpt,
      blocks,
      coverImage,
      tags,
      category,
      readingTimeMinutes: readingTime,
      wordCount: totalWords,
      status: 'published',
      author: 'Prajwal DL',
      seo: { metaTitle: title, metaDescription: excerpt }
    };
    const draft = contentPipelineService.generateSocialDraft(post, 'post', 'linkedin');
    setActiveDraft(draft);
  };

  const addBlock = (type: BlockType, level: 2 | 3 | 4 = 2, afterIdx?: number) => {
    let content: any = '';
    if (type === 'callout') content = { title: 'Note', text: 'Important implementation note' };
    if (type === 'code') content = '// Enter your code snippet here\nconst server = createServer();';
    if (type === 'image') content = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80';
    if (type === 'embed') content = { url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', platform: 'youtube' };

    const newBlock: ContentBlock = {
      id: `b-${Date.now()}`,
      type,
      content,
      level: type === 'heading' ? level : undefined,
      language: type === 'code' ? 'typescript' : undefined,
      altText: type === 'image' ? 'Screenshot demonstration' : undefined,
      caption: type === 'image' ? 'System architecture preview' : undefined
    };

    const updated = [...blocks];
    if (afterIdx !== undefined) {
      updated.splice(afterIdx + 1, 0, newBlock);
    } else {
      updated.push(newBlock);
    }
    setBlocks(updated);
    setSlashMenuIndex(null);
  };

  const updateBlockContent = (idx: number, newContent: any) => {
    const updated = [...blocks];
    updated[idx].content = newContent;
    setBlocks(updated);
  };

  const moveBlock = (idx: number, dir: -1 | 1) => {
    if ((dir === -1 && idx === 0) || (dir === 1 && idx === blocks.length - 1)) return;
    const updated = [...blocks];
    const target = idx + dir;
    const temp = updated[idx];
    updated[idx] = updated[target];
    updated[target] = temp;
    setBlocks(updated);
  };

  const duplicateBlock = (idx: number) => {
    const updated = [...blocks];
    const dup = { ...updated[idx], id: `b-${Date.now()}` };
    updated.splice(idx + 1, 0, dup);
    setBlocks(updated);
  };

  const deleteBlock = (idx: number) => {
    if (blocks.length <= 1) return;
    setBlocks(blocks.filter((_, i) => i !== idx));
  };

  const triggerAI = async (block: ContentBlock, action: 'rewrite' | 'fix_grammar' | 'shorten' | 'expand' | 'tone') => {
    setAiSelectedBlockId(block.id);
    setAiLoading(true);
    const text = typeof block.content === 'string' ? block.content : (block.content.text || '');
    const res = await aiService.processText(text, action);
    setAiResult(res);
    setAiLoading(false);
  };

  const applyAISuggestion = (blockIdx: number) => {
    if (!aiResult) return;
    const block = blocks[blockIdx];
    if (typeof block.content === 'string') {
      updateBlockContent(blockIdx, aiResult.suggestedText);
    } else {
      updateBlockContent(blockIdx, { ...block.content, text: aiResult.suggestedText });
    }
    setAiResult(null);
    setAiSelectedBlockId(null);
  };

  return (
    <div className={`p-6 max-w-7xl mx-auto space-y-6 text-gray-100 font-sans pb-28 ${focusMode ? 'max-w-3xl' : ''}`}>
      {/* Top action toolbar */}
      <div className="flex items-center justify-between pb-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('/admin/blog')}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-base font-bold text-white tracking-tight">
              {isNew ? 'New Editorial Post' : title || 'Untitled Article'}
            </h1>
            <div className="flex items-center gap-3 text-[11px] font-mono text-gray-400">
              <span>{readingTime} min read</span>
              <span>·</span>
              <span>{totalWords} words</span>
              <span>·</span>
              <span className="text-emerald-400">{savedStatus}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setFocusMode(!focusMode)}
            title="Focus Mode (Distraction-free)"
            className={`p-2 rounded-xl border transition-colors ${focusMode ? 'bg-blue-600 border-blue-500 text-white' : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'}`}
          >
            {focusMode ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          <button
            onClick={handleShareToLinkedIn}
            className="px-3 py-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Send className="w-3.5 h-3.5" /> Share to LinkedIn
          </button>

          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-lg shadow-blue-600/20"
          >
            <Save className="w-4 h-4" /> Save Article
          </button>
        </div>
      </div>

      {/* Title & Excerpt header */}
      <div className="space-y-3 bg-[#0e131f] p-6 rounded-2xl border border-white/5">
        <input
          type="text"
          value={title}
          onChange={e => {
            setTitle(e.target.value);
            if (isNew) setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'));
          }}
          placeholder="Article Title..."
          className="w-full bg-transparent text-2xl sm:text-3xl font-bold text-white focus:outline-none placeholder-gray-600 tracking-tight"
        />

        <textarea
          rows={2}
          value={excerpt}
          onChange={e => setExcerpt(e.target.value)}
          placeholder="Excerpt / Deck / Sub-headline..."
          className="w-full bg-transparent text-sm text-gray-300 focus:outline-none placeholder-gray-600 leading-relaxed resize-none"
        />
      </div>

      {/* Main Grid: Blocks Editor (Left) + Side Panel (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Block Editor Area */}
        <div className={`space-y-4 ${focusMode ? 'lg:col-span-3' : 'lg:col-span-2'}`}>
          {blocks.map((block, idx) => (
            <div 
              key={block.id} 
              className="relative group bg-[#0e131f]/60 hover:bg-[#0e131f] border border-white/5 hover:border-white/10 rounded-2xl p-5 transition-all"
            >
              {/* Block Action Controls on Hover */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 flex items-center gap-1 bg-[#111827] border border-white/10 p-1 rounded-xl shadow-lg transition-opacity z-10">
                <button
                  onClick={() => triggerAI(block, 'rewrite')}
                  title="AI Assist: Rewrite"
                  className="p-1 text-purple-400 hover:text-purple-300 rounded hover:bg-white/5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => moveBlock(idx, -1)}
                  title="Move Up"
                  className="p-1 text-gray-400 hover:text-white rounded hover:bg-white/5"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => moveBlock(idx, 1)}
                  title="Move Down"
                  className="p-1 text-gray-400 hover:text-white rounded hover:bg-white/5"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => duplicateBlock(idx)}
                  title="Duplicate"
                  className="p-1 text-gray-400 hover:text-white rounded hover:bg-white/5"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => deleteBlock(idx)}
                  title="Delete"
                  className="p-1 text-red-400 hover:text-red-300 rounded hover:bg-white/5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Rendering based on Block Type */}
              {block.type === 'heading' && (
                <div>
                  <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest block mb-1">
                    Heading H{block.level || 2}
                  </span>
                  <input
                    type="text"
                    value={block.content as string}
                    onChange={e => updateBlockContent(idx, e.target.value)}
                    className="w-full bg-transparent text-xl font-bold text-white focus:outline-none"
                  />
                </div>
              )}

              {block.type === 'paragraph' && (
                <div>
                  <textarea
                    rows={3}
                    value={block.content as string}
                    onChange={e => {
                      updateBlockContent(idx, e.target.value);
                      if (e.target.value.endsWith('/')) {
                        setSlashMenuIndex(idx);
                      } else if (slashMenuIndex === idx) {
                        setSlashMenuIndex(null);
                      }
                    }}
                    className="w-full bg-transparent text-sm text-gray-200 focus:outline-none leading-relaxed resize-none"
                  />
                </div>
              )}

              {block.type === 'callout' && (
                <div className="bg-blue-600/10 border-l-4 border-blue-500 p-4 rounded-r-xl space-y-2">
                  <input
                    type="text"
                    value={(block.content as any).title}
                    onChange={e => updateBlockContent(idx, { ...(block.content as any), title: e.target.value })}
                    className="w-full bg-transparent text-xs font-bold text-blue-400 uppercase tracking-wider focus:outline-none"
                  />
                  <textarea
                    rows={2}
                    value={(block.content as any).text}
                    onChange={e => updateBlockContent(idx, { ...(block.content as any), text: e.target.value })}
                    className="w-full bg-transparent text-xs text-gray-300 focus:outline-none leading-relaxed resize-none"
                  />
                </div>
              )}

              {block.type === 'code' && (
                <div className="bg-[#080b11] rounded-xl border border-white/10 overflow-hidden font-mono text-xs">
                  <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-white/5">
                    <span className="text-gray-400 text-[11px]">{block.language || 'typescript'}</span>
                    <select
                      value={block.language || 'typescript'}
                      onChange={e => {
                        const updated = [...blocks];
                        updated[idx].language = e.target.value;
                        setBlocks(updated);
                      }}
                      className="bg-transparent text-[11px] text-gray-400 focus:outline-none"
                    >
                      <option value="typescript">TypeScript</option>
                      <option value="javascript">JavaScript</option>
                      <option value="python">Python</option>
                      <option value="glsl">GLSL / Shader</option>
                      <option value="html">HTML / JSX</option>
                    </select>
                  </div>
                  <textarea
                    rows={6}
                    value={block.content as string}
                    onChange={e => updateBlockContent(idx, e.target.value)}
                    className="w-full bg-transparent p-4 text-emerald-400 focus:outline-none leading-relaxed resize-none font-mono"
                  />
                </div>
              )}

              {block.type === 'quote' && (
                <div className="border-l-2 border-amber-400 pl-4 py-1 italic text-amber-200/90 text-sm">
                  <textarea
                    rows={2}
                    value={block.content as string}
                    onChange={e => updateBlockContent(idx, e.target.value)}
                    className="w-full bg-transparent focus:outline-none resize-none leading-relaxed"
                  />
                </div>
              )}

              {block.type === 'image' && (
                <div className="space-y-3">
                  <div className="h-56 w-full rounded-xl overflow-hidden bg-slate-900 border border-white/10">
                    <img src={block.content as string} alt={block.altText || 'Image'} className="w-full h-full object-cover" />
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <input
                      type="text"
                      placeholder="Required Alt Text..."
                      value={block.altText || ''}
                      onChange={e => {
                        const updated = [...blocks];
                        updated[idx].altText = e.target.value;
                        setBlocks(updated);
                      }}
                      className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Optional Caption..."
                      value={block.caption || ''}
                      onChange={e => {
                        const updated = [...blocks];
                        updated[idx].caption = e.target.value;
                        setBlocks(updated);
                      }}
                      className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {block.type === 'embed' && (
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-gray-400">
                    <span>EMBED TYPE: {(block.content as any).platform || 'YOUTUBE'}</span>
                    <span className="text-emerald-400 text-[10px]">VERIFIED EMBED</span>
                  </div>
                  <input
                    type="text"
                    value={(block.content as any).url}
                    onChange={e => updateBlockContent(idx, { ...(block.content as any), url: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-blue-400 font-mono focus:outline-none"
                  />
                </div>
              )}

              {block.type === 'divider' && (
                <div className="py-3 flex items-center justify-center">
                  <div className="w-full border-t border-white/10" />
                </div>
              )}

              {/* Inline Slash Command Menu */}
              {slashMenuIndex === idx && (
                <div className="mt-3 p-2 rounded-xl bg-[#111827] border border-blue-500/40 shadow-2xl space-y-1 animate-in fade-in duration-100">
                  <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest px-2 py-1">Insert Block</p>
                  <div className="grid grid-cols-2 gap-1">
                    <button
                      onClick={() => addBlock('heading', 2, idx)}
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 text-xs text-left text-white"
                    >
                      <Heading className="w-3.5 h-3.5 text-purple-400" /> Heading H2
                    </button>
                    <button
                      onClick={() => addBlock('paragraph', 2, idx)}
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 text-xs text-left text-white"
                    >
                      <AlignLeft className="w-3.5 h-3.5 text-blue-400" /> Text Block
                    </button>
                    <button
                      onClick={() => addBlock('code', 2, idx)}
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 text-xs text-left text-white"
                    >
                      <Code2 className="w-3.5 h-3.5 text-emerald-400" /> Code Block
                    </button>
                    <button
                      onClick={() => addBlock('callout', 2, idx)}
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 text-xs text-left text-white"
                    >
                      <HelpCircle className="w-3.5 h-3.5 text-amber-400" /> Callout / Note
                    </button>
                    <button
                      onClick={() => addBlock('quote', 2, idx)}
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 text-xs text-left text-white"
                    >
                      <Quote className="w-3.5 h-3.5 text-pink-400" /> Blockquote
                    </button>
                    <button
                      onClick={() => addBlock('image', 2, idx)}
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 text-xs text-left text-white"
                    >
                      <ImageIcon className="w-3.5 h-3.5 text-indigo-400" /> Image
                    </button>
                  </div>
                </div>
              )}

              {/* AI Suggestion Diff Box */}
              {aiSelectedBlockId === block.id && aiResult && (
                <div className="mt-4 p-4 rounded-xl bg-purple-950/30 border border-purple-500/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-purple-300 font-bold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> Proposed AI Revision ({aiResult.diffSummary})
                    </span>
                    <button onClick={() => setAiResult(null)} className="text-gray-400 hover:text-white">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-xs space-y-2 bg-[#080b11] p-3 rounded-lg border border-white/5 font-mono">
                    <div className="text-red-400 line-through opacity-75">- {aiResult.originalText}</div>
                    <div className="text-emerald-400">+ {aiResult.suggestedText}</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => applyAISuggestion(idx)}
                      className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1"
                    >
                      <Check className="w-3.5 h-3.5" /> Accept Changes
                    </button>
                    <button
                      onClick={() => setAiResult(null)}
                      className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-gray-400 rounded-lg text-xs"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Add Block Bar at Bottom */}
          <div className="flex items-center justify-center gap-2 py-4 border-2 border-dashed border-white/10 rounded-2xl">
            <button
              onClick={() => addBlock('paragraph')}
              className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-gray-300 rounded-xl text-xs flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" /> Text
            </button>
            <button
              onClick={() => addBlock('heading', 2)}
              className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-gray-300 rounded-xl text-xs flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" /> Heading
            </button>
            <button
              onClick={() => addBlock('code')}
              className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-gray-300 rounded-xl text-xs flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" /> Code
            </button>
            <button
              onClick={() => addBlock('callout')}
              className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-gray-300 rounded-xl text-xs flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" /> Callout
            </button>
          </div>
        </div>

        {/* Right Side Panel (SEO, TOC, Settings) */}
        {!focusMode && (
          <div className="space-y-5">
            {/* Panel Selector Tabs */}
            <div className="flex items-center bg-[#0e131f] p-1 rounded-2xl border border-white/5 text-xs">
              <button
                onClick={() => setShowSidePanel('seo')}
                className={`flex-1 py-1.5 rounded-xl font-medium transition-colors ${showSidePanel === 'seo' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
              >
                SEO & SERP
              </button>
              <button
                onClick={() => setShowSidePanel('toc')}
                className={`flex-1 py-1.5 rounded-xl font-medium transition-colors ${showSidePanel === 'toc' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
              >
                Outline ({headings.length})
              </button>
              <button
                onClick={() => setShowSidePanel('settings')}
                className={`flex-1 py-1.5 rounded-xl font-medium transition-colors ${showSidePanel === 'settings' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
              >
                Settings
              </button>
            </div>

            {/* Panel 1: Live SEO Preview */}
            {showSidePanel === 'seo' && (
              <div className="bg-[#0e131f] p-5 rounded-2xl border border-white/5 space-y-4 font-sans">
                <h3 className="text-xs font-mono text-gray-400 uppercase tracking-wider">Live Google Search Preview</h3>
                <div className="bg-white p-3.5 rounded-xl text-left font-sans space-y-1 text-xs">
                  <p className="text-gray-500 text-[11px] truncate">https://praxel.space › blog › {slug || 'article-slug'}</p>
                  <p className="text-[#1a0dab] font-medium text-sm leading-tight line-clamp-1">{title || 'Your Article Title Goes Here'}</p>
                  <p className="text-[#4d5156] text-xs leading-relaxed line-clamp-2">{excerpt || 'Your article summary and meta description will appear here in Google SERP results.'}</p>
                </div>

                <h3 className="text-xs font-mono text-gray-400 uppercase tracking-wider pt-2">Social Card Preview</h3>
                <div className="bg-[#111827] border border-white/10 rounded-xl overflow-hidden text-xs">
                  <div className="h-28 w-full bg-slate-900">
                    <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-3 space-y-1">
                    <p className="text-[10px] text-gray-400 font-mono uppercase">PRAXEL.SPACE</p>
                    <p className="text-white font-bold line-clamp-1">{title || 'Untitled Post'}</p>
                    <p className="text-gray-400 line-clamp-1 text-[11px]">{excerpt || 'Article summary description...'}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Panel 2: Table of Contents */}
            {showSidePanel === 'toc' && (
              <div className="bg-[#0e131f] p-5 rounded-2xl border border-white/5 space-y-3">
                <h3 className="text-xs font-mono text-gray-400 uppercase tracking-wider">Generated Table of Contents</h3>
                {headings.length === 0 ? (
                  <p className="text-xs text-gray-500 font-mono py-4">Add heading blocks (H2, H3) to build an automated table of contents.</p>
                ) : (
                  <div className="space-y-1.5">
                    {headings.map((h, i) => (
                      <div key={i} className="text-xs text-gray-300 flex items-center gap-2 py-1 border-b border-white/5">
                        <span className="text-blue-400 font-mono text-[10px]">H{h.level || 2}</span>
                        <span className="truncate">{h.content as string}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Panel 3: Publishing Settings */}
            {showSidePanel === 'settings' && (
              <div className="bg-[#0e131f] p-5 rounded-2xl border border-white/5 space-y-4">
                <div>
                  <label className="text-[11px] text-gray-400 block mb-1">Status</label>
                  <select
                    value={status}
                    onChange={e => setStatus(e.target.value as any)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="scheduled">Scheduled</option>
                  </select>
                </div>

                {status === 'scheduled' && (
                  <div>
                    <label className="text-[11px] text-gray-400 block mb-1">Scheduled Publish Date/Time</label>
                    <input
                      type="datetime-local"
                      value={scheduledAt}
                      onChange={e => setScheduledAt(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                )}

                <div>
                  <label className="text-[11px] text-gray-400 block mb-1">Category</label>
                  <input
                    type="text"
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Telegram Approval Modal */}
      <TelegramApprovalModal
        draft={activeDraft}
        onClose={() => setActiveDraft(null)}
      />
    </div>
  );
};

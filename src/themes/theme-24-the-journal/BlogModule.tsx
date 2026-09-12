import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, ArrowLeft, ArrowUpRight, Clock, Calendar, Tag, 
  Share2, Check, Send, Sparkles, BookOpen, ExternalLink,
  ChevronRight, X, MessageSquare
} from 'lucide-react';
import { BlogPost, PortfolioIdentity } from '@/types/portfolio';

interface BlogModuleProps {
  identity: PortfolioIdentity;
  blogPosts: BlogPost[];
  onNavigate: (route: string) => void;
  onSelectPost?: (post: BlogPost) => void;
  initialPostSlug?: string;
}

const CATEGORIES = [
  'All',
  'Frontend',
  'Backend',
  'DevOps',
  'Career',
  'Dev Notes',
  'AI Systems',
  'Architecture'
];

const LinkedInIcon: React.FC<{ className?: string }> = ({ className = 'w-3 h-3' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z"/>
  </svg>
);

export const BlogModule: React.FC<BlogModuleProps> = ({
  identity,
  blogPosts,
  onNavigate,
  onSelectPost,
  initialPostSlug
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Simulate midhunnk.in async post loading
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [selectedCategory]);

  // Open post if slug provided
  useEffect(() => {
    if (initialPostSlug) {
      const found = blogPosts.find(p => p.slug === initialPostSlug);
      if (found) setActiveArticle(found);
    }
  }, [initialPostSlug, blogPosts]);

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesSearch = 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCat = selectedCategory === 'All' || 
        post.category.toLowerCase() === selectedCategory.toLowerCase() ||
        post.tags.some(t => t.toLowerCase() === selectedCategory.toLowerCase());

      return matchesSearch && matchesCat;
    });
  }, [blogPosts, searchQuery, selectedCategory]);

  const handleArticleClick = (post: BlogPost) => {
    if (onSelectPost) {
      onSelectPost(post);
    } else {
      setActiveArticle(post);
    }
  };

  const isSyndicatedTag = (tags: string[]) => {
    const syndicationKeywords = ['career', 'dev notes', 'architecture', 'engineering', 'leadership'];
    return tags.some(t => syndicationKeywords.includes(t.toLowerCase()));
  };

  return (
    <div className="min-h-screen bg-white text-[#111111] font-sans selection:bg-black selection:text-white">
      {/* Background ambient radial grid */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: 'radial-gradient(circle, #000000 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-10 pt-24 pb-28">
        
        {/* EXACT BLOG HEADER FROM MIDHUNNK.IN SPEC */}
        <div className="mb-12 sm:mb-16">
          <span className="font-mono text-xs text-[#ad314d] uppercase tracking-widest font-bold block mb-2">
            Writing
          </span>
          <h1 className="text-6xl sm:text-8xl md:text-9xl font-black italic tracking-tighter text-[#111111] leading-none">
            Blog
          </h1>
          <p className="font-mono text-xs sm:text-sm text-gray-500 mt-4 max-w-xl leading-relaxed">
            Thoughts on development, design, and building things that matter.
          </p>
        </div>

        {/* SEARCH & CATEGORY FILTER ROW */}
        <div className="flex flex-col md:flex-row gap-4 mb-10 pb-6 border-b border-black/8">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50/80 hover:bg-gray-100/70 focus:bg-white border border-black/10 rounded-xl pl-10 pr-4 py-2.5 font-mono text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-black focus:ring-2 focus:ring-black/5 transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Filter Pills starting with 'All' */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {CATEGORIES.map(cat => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`font-mono text-xs uppercase tracking-wider px-3.5 py-2 rounded-xl border whitespace-nowrap transition-all duration-200 ${
                    isSelected
                      ? 'border-black bg-black text-white font-bold shadow-xs'
                      : 'border-black/10 bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-black'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* ASYNC LOADING STATE WITH 3-DOT BOUNCE ANIMATION */}
        {isLoading ? (
          <div className="flex items-center justify-center gap-3 py-24">
            <div className="w-2 h-2 rounded-full bg-black animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 rounded-full bg-black animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 rounded-full bg-black animate-bounce" style={{ animationDelay: '300ms' }} />
            <span className="font-mono text-xs text-gray-500 ml-2">Loading posts...</span>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="py-20 text-center space-y-3 bg-gray-50/50 rounded-2xl border border-dashed border-black/10 p-8">
            <BookOpen className="w-8 h-8 text-gray-400 mx-auto" />
            <h3 className="text-base font-bold text-gray-900">No dispatches found</h3>
            <p className="text-xs text-gray-500 font-mono max-w-sm mx-auto">
              No published articles match &quot;{searchQuery || selectedCategory}&quot;. Try resetting your filters.
            </p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="px-4 py-2 bg-black text-white text-xs font-mono rounded-xl hover:bg-gray-800 transition-colors inline-block"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          /* POSTS GRID */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map(post => {
              const isSyndicated = isSyndicatedTag(post.tags);

              return (
                <article
                  key={post.id}
                  onClick={() => handleArticleClick(post)}
                  className="p-6 rounded-2xl bg-white border border-black/10 hover:border-black/30 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between group active:scale-[0.99]"
                >
                  <div className="space-y-3">
                    {/* Meta: Category, Read time, Date */}
                    <div className="flex items-center justify-between text-[11px] font-mono text-gray-500">
                      <span className="px-2.5 py-0.5 rounded-md bg-gray-100 text-gray-800 font-bold uppercase tracking-wider text-[10px]">
                        {post.category}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <span>{post.readingTimeMinutes} min</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-[#ad314d] transition-colors leading-snug tracking-tight line-clamp-2">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-black/5 space-y-2">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {post.tags.slice(0, 3).map((tag, idx) => (
                        <span key={idx} className="text-[10px] font-mono text-gray-500 bg-gray-50 px-2 py-0.5 rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Syndication indicator pill if applicable */}
                    {isSyndicated && (
                      <div className="flex items-center gap-1 text-[10px] font-mono text-blue-700 font-semibold bg-blue-50 px-2 py-0.5 rounded-md">
                        <LinkedInIcon className="w-2.5 h-2.5" />
                        <span>LinkedIn Cross-Post Queued</span>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* FULL ARTICLE READING DRAWER / MODAL */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white border border-black/10 rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl p-6 sm:p-10 my-auto text-[#111111] space-y-6 relative">
            
            {/* Top Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-black/8 sticky top-0 bg-white/95 backdrop-blur-md z-20">
              <button
                onClick={() => setActiveArticle(null)}
                className="flex items-center gap-1.5 text-xs font-mono text-gray-600 hover:text-black px-3 py-1.5 bg-gray-100 rounded-xl transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Journal</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.origin + `/blog/${activeArticle.slug}`);
                    setCopiedLink(true);
                    setTimeout(() => setCopiedLink(false), 2000);
                  }}
                  className="p-2 text-gray-500 hover:text-black hover:bg-gray-100 rounded-xl transition-colors"
                  title="Copy link"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setActiveArticle(null)}
                  className="p-2 text-gray-500 hover:text-black hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Header info */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-gray-500">
                <span className="px-2.5 py-0.5 rounded-full bg-black text-white font-bold uppercase text-[10px]">
                  {activeArticle.category}
                </span>
                <span>·</span>
                <span>{activeArticle.readingTimeMinutes} min read</span>
                <span>·</span>
                <span>{activeArticle.publishedAt || 'Recent'}</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black italic tracking-tight text-gray-900 leading-tight">
                {activeArticle.title}
              </h1>

              <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-serif italic border-l-2 border-[#ad314d] pl-4 py-1">
                {activeArticle.excerpt}
              </p>
            </div>

            {/* Automation Cross-Posting Badge */}
            {isSyndicatedTag(activeArticle.tags) && (
              <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200/60 flex items-start gap-2.5 text-xs text-blue-950 font-mono">
                <LinkedInIcon className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-blue-900">Automated Creator Connected:</span>
                  <p className="text-[11px] text-blue-800/80 mt-0.5">
                    This post is tagged with &apos;{activeArticle.tags.find(t => isSyndicatedTag([t]))}&apos; and is synced with the Automated Creator pipeline. The excerpt serves as the social hook.
                  </p>
                </div>
              </div>
            )}

            {/* Article Content Blocks */}
            <div className="space-y-5 text-sm sm:text-base text-gray-800 leading-relaxed pt-2">
              {activeArticle.blocks && activeArticle.blocks.length > 0 ? (
                activeArticle.blocks.map((block, idx) => {
                  if (block.type === 'heading') {
                    return (
                      <h2 key={idx} className="text-xl font-bold text-gray-900 pt-4 pb-1 border-b border-black/5">
                        {typeof block.content === 'string' ? block.content : block.content?.text}
                      </h2>
                    );
                  }
                  if (block.type === 'quote') {
                    return (
                      <blockquote key={idx} className="border-l-4 border-black pl-4 my-4 italic text-gray-700 font-serif">
                        {typeof block.content === 'string' ? block.content : block.content?.text}
                      </blockquote>
                    );
                  }
                  if (block.type === 'code') {
                    return (
                      <pre key={idx} className="p-4 rounded-xl bg-gray-950 text-emerald-400 font-mono text-xs overflow-x-auto my-4">
                        <code>{typeof block.content === 'string' ? block.content : block.content?.code}</code>
                      </pre>
                    );
                  }
                  return (
                    <p key={idx} className="leading-relaxed">
                      {typeof block.content === 'string' ? block.content : block.content?.text}
                    </p>
                  );
                })
              ) : (
                <p className="leading-relaxed text-gray-700">
                  {activeArticle.excerpt}
                </p>
              )}
            </div>

            {/* Author Card */}
            <div className="pt-6 mt-8 border-t border-black/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-black text-white font-bold flex items-center justify-center font-mono text-xs">
                  PDL
                </div>
                <div>
                  <h4 className="font-bold text-xs text-gray-900">{identity.name}</h4>
                  <p className="text-[11px] font-mono text-gray-500">{identity.role}</p>
                </div>
              </div>

              <button
                onClick={() => {
                  setActiveArticle(null);
                  onNavigate('/contact');
                }}
                className="px-4 py-2 bg-black hover:bg-gray-800 text-white text-xs font-mono rounded-xl transition-colors"
              >
                Discuss Article
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

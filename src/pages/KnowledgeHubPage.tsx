import React, { useState } from 'react';
import {
  Search,
  BookOpen,
  Clock,
  Calendar,
  ChevronRight,
  ArrowLeft,
  Share2,
  Bookmark,
  CheckCircle2,
  XCircle,
  Lightbulb,
  ShieldCheck,
  Sprout,
  Filter,
} from 'lucide-react';
import { BlogPost, BlogCategory, Language, PageId } from '../types';
import { BLOG_POSTS } from '../data/blogData';
import { t } from '../i18n';

interface KnowledgeHubPageProps {
  language: Language;
  onNavigate: (page: PageId) => void;
}

export const KnowledgeHubPage: React.FC<KnowledgeHubPageProps> = ({
  language,
  onNavigate,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);

  const categories: string[] = [
    'All',
    'Crop Insurance',
    'Disease Management',
    'Pest Management',
    'Irrigation',
    'Crop Health',
    'Weather',
    'Soil',
    'Government Schemes',
    'Sustainable Farming',
  ];

  const getArticleTitle = (post: BlogPost): string => {
    return post.titles[language] || post.titles['en'] || 'Farming Guide';
  };

  const getArticleDesc = (post: BlogPost): string => {
    return post.descriptions[language] || post.descriptions['en'] || '';
  };

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const title = getArticleTitle(post).toLowerCase();
    const desc = getArticleDesc(post).toLowerCase();
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q || title.includes(q) || desc.includes(q) || post.category.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-16">
      {/* If reading an article, show Full Article View */}
      {activeArticle ? (
        <div className="space-y-6">
          <button
            onClick={() => setActiveArticle(null)}
            className="inline-flex items-center text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-4 py-2 rounded-xl transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} className="mr-1.5" />
            {t('backToHub', language)}
          </button>

          <article className="bg-white rounded-3xl p-6 lg:p-10 shadow-sm border border-gray-100 space-y-8">
            {/* Header */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-emerald-100 text-emerald-800 text-[11px] font-black uppercase px-3 py-1 rounded-full">
                  {activeArticle.category}
                </span>
                <span className="text-xs text-slate-400 font-semibold flex items-center">
                  <Clock size={13} className="mr-1" />
                  {activeArticle.readTime} {t('readTimeLabel', language)}
                </span>
                <span className="text-xs text-slate-400 font-semibold flex items-center">
                  <Calendar size={13} className="mr-1" />
                  {activeArticle.date}
                </span>
              </div>

              <h1 className="text-2xl lg:text-3xl font-black text-slate-900 leading-tight">
                {getArticleTitle(activeArticle)}
              </h1>

              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                {getArticleDesc(activeArticle)}
              </p>
            </div>

            {/* Hero Image */}
            <div className="rounded-2xl overflow-hidden h-72 lg:h-96 w-full border border-gray-100">
              <img
                src={activeArticle.imageUrl}
                alt={getArticleTitle(activeArticle)}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Sections */}
            <div className="space-y-8 text-slate-700">
              {activeArticle.sections.map((sec, idx) => {
                const heading = sec.heading[language] || sec.heading['en'] || '';
                const paragraphs = sec.paragraphs[language] || sec.paragraphs['en'] || [];
                const tips = sec.tips?.[language] || sec.tips?.['en'] || [];
                const doList = sec.doList?.[language] || sec.doList?.['en'] || [];
                const dontList = sec.dontList?.[language] || sec.dontList?.['en'] || [];

                return (
                  <div key={idx} className="space-y-5">
                    <h2 className="text-xl font-black text-slate-900 pb-2 border-b border-gray-100">
                      {heading}
                    </h2>

                    <div className="space-y-3 text-sm leading-relaxed">
                      {paragraphs.map((para, pIdx) => (
                        <p key={pIdx}>{para}</p>
                      ))}
                    </div>

                    {/* Important Tips Box */}
                    {tips.length > 0 && (
                      <div className="bg-amber-50/80 border border-amber-200/80 p-5 rounded-2xl space-y-2">
                        <div className="flex items-center space-x-2 text-amber-900 font-black text-xs uppercase tracking-wider">
                          <Lightbulb size={16} className="text-amber-600" />
                          <span>{t('importantTips', language)}</span>
                        </div>
                        <ul className="space-y-1.5 text-xs text-amber-950 font-medium">
                          {tips.map((tip, tIdx) => (
                            <li key={tIdx} className="flex items-start">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mr-2 mt-1.5 shrink-0" />
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Do & Don't Section */}
                    {(doList.length > 0 || dontList.length > 0) && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                        {doList.length > 0 && (
                          <div className="bg-emerald-50/70 border border-emerald-200/80 p-5 rounded-2xl space-y-2.5">
                            <h4 className="text-xs font-black uppercase tracking-wider text-emerald-900 flex items-center">
                              <CheckCircle2 size={16} className="text-emerald-700 mr-1.5" />
                              {t('doHeader', language)}
                            </h4>
                            <ul className="space-y-1.5 text-xs text-emerald-950 font-medium">
                              {doList.map((d, dIdx) => (
                                <li key={dIdx} className="flex items-start">
                                  <span className="text-emerald-700 font-bold mr-1.5">✓</span>
                                  <span>{d}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {dontList.length > 0 && (
                          <div className="bg-red-50/70 border border-red-200/80 p-5 rounded-2xl space-y-2.5">
                            <h4 className="text-xs font-black uppercase tracking-wider text-red-900 flex items-center">
                              <XCircle size={16} className="text-red-600 mr-1.5" />
                              {t('dontHeader', language)}
                            </h4>
                            <ul className="space-y-1.5 text-xs text-red-950 font-medium">
                              {dontList.map((d, dIdx) => (
                                <li key={dIdx} className="flex items-start">
                                  <span className="text-red-600 font-bold mr-1.5">✕</span>
                                  <span>{d}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Related Articles Footer */}
            <div className="pt-6 border-t border-gray-100 space-y-4">
              <h3 className="text-base font-black text-slate-800">
                {t('relatedGuides', language)}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {BLOG_POSTS.filter((p) => p.id !== activeArticle.id).map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => setActiveArticle(rel)}
                    className="flex items-center space-x-3 p-3 rounded-2xl border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50/40 transition-all cursor-pointer"
                  >
                    <img
                      src={rel.imageUrl}
                      alt={getArticleTitle(rel)}
                      className="w-16 h-16 rounded-xl object-cover shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0">
                      <span className="text-[10px] font-black uppercase text-emerald-700">
                        {rel.category}
                      </span>
                      <h4 className="text-xs font-black text-slate-800 truncate mt-0.5">
                        {getArticleTitle(rel)}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {rel.readTime} {t('readTimeLabel', language)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </article>
        </div>
      ) : (
        /* Blog Index View */
        <div className="space-y-8">
          {/* Top Banner */}
          <div className="bg-gradient-to-r from-emerald-800 to-green-950 rounded-3xl p-6 lg:p-8 text-white shadow-xl relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(#DCFCE7 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            />

            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-700/60 border border-emerald-500/40 text-emerald-200 text-xs font-bold uppercase tracking-wider mb-3">
                <BookOpen size={14} className="text-emerald-300" />
                <span>Agricultural Extension Knowledge</span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-black tracking-tight">
                {t('hubTitle', language)}
              </h1>
              <p className="text-emerald-100/90 text-sm mt-2 leading-relaxed">
                {t('hubSub', language)}
              </p>
            </div>
          </div>

          {/* Search Bar & Category Filters */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4">
            {/* Search Input */}
            <div className="relative">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('searchPlaceholder', language)}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                id="blog-search-input"
              />
            </div>

            {/* Category Pills */}
            <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pt-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                  }`}
                >
                  {cat === 'All' ? t('allCategories', language) : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Article Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                onClick={() => setActiveArticle(post)}
                className="bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-emerald-200 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 w-full overflow-hidden">
                    <img
                      src={post.imageUrl}
                      alt={getArticleTitle(post)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-slate-900/70 backdrop-blur-xs text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full">
                      {post.category}
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <div className="flex items-center space-x-3 text-[11px] text-slate-400 font-medium">
                      <span className="flex items-center">
                        <Clock size={12} className="mr-1" />
                        {post.readTime} {t('readTimeLabel', language)}
                      </span>
                      <span>•</span>
                      <span>{post.date}</span>
                    </div>

                    <h3 className="text-base font-black text-slate-800 group-hover:text-emerald-700 transition-colors leading-snug">
                      {getArticleTitle(post)}
                    </h3>

                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {getArticleDesc(post)}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center justify-between text-xs text-emerald-700 font-bold border-t border-gray-50 mt-2">
                  <span>{t('readArticleBtn', language)}</span>
                  <ChevronRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import { BookOpen, Search, Calendar, ChevronRight, BookOpenCheck } from "lucide-react";
import { Article } from "../types";

interface StoryViewProps {
  articles: Article[];
  isAdmin: boolean;
  onDeleteArticle?: (id: string) => void;
}

export const StoryView: React.FC<StoryViewProps> = ({
  articles,
  isAdmin,
  onDeleteArticle,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [expandedArticleId, setExpandedArticleId] = useState<string | null>(null);

  // Categories list
  const categories = ["ALL", "REFLECTIONS", "ARCHITECTURE", "LEGACY"];

  // Search & Filter Memo
  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesCategory =
        selectedCategory === "ALL" ||
        article.category.toUpperCase() === selectedCategory.toUpperCase();
      
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.content.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [articles, selectedCategory, searchQuery]);

  // Featured Essay (usually the first one, or design-specific)
  const featuredArticle = useMemo(() => {
    return articles.find(a => a.id === "art-1") || articles[0];
  }, [articles]);

  return (
    <div className="bg-[#fff8f4] dark:bg-transparent text-[#1f1b17] dark:text-[#f5ece5] py-6 md:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 md:space-y-16 transition-colors duration-300">
      
      {/* 1. SECTION INTRO HEADER */}
      <div className="border-b border-[#18241b]/10 dark:border-[#f5ece5]/10 pb-6 text-center md:text-left flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <span className="font-sans text-[10px] tracking-[0.3em] font-semibold text-[#924c0a] dark:text-[#e2a265]">
            PAPA'S STUDY / 아빠의 서재
          </span>
          <h1 className="font-serif text-3xl md:text-4xl text-[#18241b] dark:text-[#f5ece5] mt-1 font-normal">
            Reflections & Design Lore
          </h1>
          <p className="font-serif text-xs md:text-sm text-[#18241b]/60 dark:text-[#f5ece5]/60 italic mt-2">
            A designer's quiet logs on observations, materials, space, and a 20-year family journey.
          </p>
        </div>
        <div className="flex justify-center md:justify-end">
          <span className="inline-flex items-center space-x-2 text-xs font-sans font-semibold border-b border-[#924c0a] dark:border-[#e2a265] py-1 text-[#924c0a] dark:text-[#e2a265]">
            <BookOpen size={14} />
            <span>{filteredArticles.length} PIECES REGISTERED</span>
          </span>
        </div>
      </div>

      {/* 2. FEATURED ESSAY HERO */}
      {featuredArticle && !searchQuery && selectedCategory === "ALL" && (
        <section className="group overflow-hidden rounded-xl border border-[#18241b]/10 dark:border-[#f5ece5]/10 bg-[#f5ece5]/60 dark:bg-[#2a2420]/60 grid grid-cols-1 lg:grid-cols-12 shadow-sm transition">
          <div className="lg:col-span-7 h-64 sm:h-96 lg:h-full relative overflow-hidden bg-emerald-990/20">
            <img
              src={featuredArticle.image}
              alt={featuredArticle.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-102"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-[#18241b]/10 dark:bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
          </div>
          
          <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="inline-block bg-[#924c0a]/10 dark:bg-[#e2a265]/10 text-[#924c0a] dark:text-[#e2a265] px-2.5 py-1 text-[9px] font-sans font-bold tracking-widest rounded uppercase">
                FEATURED WRITING
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#18241b] dark:text-[#f5ece5] leading-tight font-normal">
                {featuredArticle.title}
              </h2>
              <div className="flex items-center space-x-2 text-xs font-sans text-[#18241b]/50 dark:text-[#f5ece5]/50">
                <span>By {featuredArticle.author}</span>
                <span>•</span>
                <span>{featuredArticle.date}</span>
              </div>
              <p className="font-serif text-sm text-[#18241b]/70 dark:text-[#f5ece5]/70 leading-relaxed italic">
                "{featuredArticle.excerpt}"
              </p>
            </div>

            <div className="pt-4 border-t border-[#18241b]/10 dark:border-[#f5ece5]/10 flex justify-between items-center">
              <button
                onClick={() => setExpandedArticleId(expandedArticleId === featuredArticle.id ? null : featuredArticle.id)}
                className="text-[#924c0a] dark:text-[#e2a265] hover:text-[#18241b] dark:hover:text-[#f5ece5] font-sans text-xs tracking-widest font-semibold flex items-center space-x-1.5 cursor-pointer"
              >
                <span>{expandedArticleId === featuredArticle.id ? "CLOSE ESSAY" : "READ FULL ESSAY"}</span>
                <ChevronRight size={14} className={`transform transition-transform ${expandedArticleId === featuredArticle.id ? "rotate-90" : ""}`} />
              </button>
              <span className="font-sans text-[9px] tracking-widest text-[#18241b]/40 dark:text-[#f5ece5]/40">
                {featuredArticle.category}
              </span>
            </div>
          </div>
        </section>
      )}

      {/* Expanded Featured Essay Display */}
      {expandedArticleId === featuredArticle?.id && (
        <article className="animate-fadeIn bg-[#eadacf]/40 dark:bg-[#2a2420]/40 border border-[#18241b]/10 dark:border-[#f5ece5]/10 p-6 sm:p-12 rounded-xl max-w-4xl mx-auto space-y-6 shadow-inner transition duration-300">
          <div className="text-center space-y-2">
            <span className="font-sans text-[10px] tracking-widest text-[#924c0a] dark:text-[#e2a265] font-bold">
              {featuredArticle.category}
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl text-[#18241b] dark:text-[#f5ece5]">
              {featuredArticle.title}
            </h3>
            <span className="font-sans text-xs text-[#18241b]/50 dark:text-[#f5ece5]/50 block">
              Logged by {featuredArticle.author} on {featuredArticle.date}
            </span>
          </div>
          <div className="w-12 h-[1px] bg-[#924c0a] dark:bg-[#e2a265] mx-auto opacity-60" />
          <div className="font-serif text-sm sm:text-base text-[#1f1b17] dark:text-[#f5ece5] leading-relaxed max-w-2xl mx-auto space-y-4 whitespace-pre-line select-text">
            {featuredArticle.content}
          </div>
          <div className="text-center pt-4">
            <button
              onClick={() => setExpandedArticleId(null)}
              className="text-xs font-sans tracking-widest text-[#18241b]/60 dark:text-[#f5ece5]/60 hover:text-[#18241b] dark:hover:text-white font-bold border border-[#18241b]/20 dark:border-[#f5ece5]/20 px-4 py-1.5 rounded cursor-pointer"
            >
              COLLAPSE LOG
            </button>
          </div>
        </article>
      )}

      {/* 3. CORE TWO-COLUMN MAIN WRITING SECTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
        
        {/* Left Side: Article Catalog and Filters */}
        <main className="lg:col-span-8 space-y-8">
          
          {/* Controls: Category Selection & Search */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-[#f5ece5]/40 dark:bg-[#2a2420]/40 border border-[#18241b]/10 dark:border-[#f5ece5]/10 p-3 rounded-lg transition">
            
            {/* Category tabs */}
            <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded text-[10px] font-sans tracking-widest font-bold cursor-pointer transition-all ${
                    selectedCategory === cat
                      ? "bg-[#924c0a] dark:bg-[#e2a265] text-white dark:text-[#1c1814]"
                      : "text-[#18241b]/70 dark:text-[#f5ece5]/70 hover:bg-[#18241b]/5 dark:hover:bg-[#f5ece5]/5"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search the study logs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs bg-[#fff8f4] dark:bg-[#1c1814] border border-[#18241b]/15 dark:border-[#f5ece5]/15 rounded py-2 pl-8 pr-4 text-[#1f1b17] dark:text-[#f5ece5] focus:outline-none focus:border-[#924c0a] dark:focus:border-[#e2a265] transition"
              />
              <Search className="absolute left-2.5 top-2.5 text-[#18241b]/40 dark:text-[#f5ece5]/40" size={12} />
            </div>

          </div>

          {/* List of custom posts */}
          <div className="space-y-6">
            {filteredArticles.length === 0 ? (
              <div className="text-center py-16 border border-dashed border-[#18241b]/15 dark:border-[#f5ece5]/15 rounded-xl bg-[#fff8f4] dark:bg-transparent">
                <BookOpenCheck className="mx-auto text-[#18241b]/30 dark:text-stone-700 mb-3" size={32} />
                <p className="font-serif text-lg text-[#18241b] dark:text-[#f5ece5]">No recordings match your selection</p>
                <p className="font-sans text-xs text-[#18241b]/50 dark:text-[#f5ece5]/50 mt-1">Try resetting the topic filter or typing a different query</p>
              </div>
            ) : (
              filteredArticles.map((article) => {
                const isExpanded = expandedArticleId === article.id;
                return (
                  <div
                    key={article.id}
                    className="p-5 sm:p-7 rounded-xl border border-[#18241b]/10 dark:border-[#f5ece5]/10 bg-[#fff8f4] dark:bg-[#2a2420] hover:bg-[#eae1da]/20 dark:hover:bg-[#f5ece5]/5 transition-all duration-200 shadow-sm flex flex-col sm:flex-row gap-6 relative"
                  >
                    {/* Small preview thumbnail */}
                    <div className="w-full sm:w-32 h-24 sm:h-32 rounded-lg overflow-hidden bg-stone-100 dark:bg-[#1c1814] flex-shrink-0">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="flex-grow flex flex-col justify-between space-y-3">
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-sans text-[9px] tracking-widest text-[#924c0a] dark:text-[#e2a265] font-normal">
                            {article.category}
                          </span>
                          <span className="font-sans text-[10px] text-[#18241b]/40 dark:text-[#f5ece5]/40 flex items-center gap-1">
                            <Calendar size={10} />
                            {article.date}
                          </span>
                        </div>
                        <h3 className="font-serif text-lg sm:text-xl text-[#18241b] dark:text-[#f5ece5] mt-1 hover:text-[#924c0a] dark:hover:text-[#e2a265] transition-colors">
                          {article.title}
                        </h3>
                        <p className="font-serif text-xs sm:text-sm text-[#18241b]/70 dark:text-[#f5ece5]/70 mt-1.5 leading-relaxed italic">
                          "{article.excerpt}"
                        </p>
                      </div>

                      {/* Expanded View for Inner Card */}
                      {isExpanded && (
                        <div className="pt-4 mt-2 border-t border-[#18241b]/10 dark:border-[#f5ece5]/10 font-serif text-sm text-[#1f1b17] dark:text-[#f5ece5] leading-relaxed space-y-3 whitespace-pre-line select-text font-normal max-w-2xl animate-fadeIn">
                          {article.content}
                        </div>
                      )}

                      <div className="pt-2 flex justify-between items-center">
                        <button
                          onClick={() => setExpandedArticleId(isExpanded ? null : article.id)}
                          className="text-xs font-sans font-bold text-[#924c0a] dark:text-[#e2a265] hover:text-[#18241b] dark:hover:text-[#f5ece5] tracking-wider flex items-center space-x-1 cursor-pointer"
                        >
                          <span>{isExpanded ? "COLLAPSE LOG" : "READ COMPLETE CHRONICLE"}</span>
                          <ChevronRight size={12} className={`transform transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                        </button>

                        {/* Admin Action Badge */}
                        {isAdmin && onDeleteArticle && (
                          <button
                            onClick={() => {
                              if (confirm("Are you sure you want to retire this article from the study?")) {
                                onDeleteArticle(article.id);
                              }
                            }}
                            className="text-[10px] font-sans tracking-wider border border-red-800/30 dark:border-red-500/30 text-red-800 dark:text-red-400 hover:bg-red-800/10 dark:hover:bg-red-800/20 px-2 py-0.5 rounded cursor-pointer"
                          >
                            RETIRE POST
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

        </main>

        {/* Right Side: Editorial Sidebar */}
        <aside className="lg:col-span-4 space-y-8">
          
          {/* Section A: Study Bio Card */}
          <div className="bg-[#f5ece5] dark:bg-[#2a2420] border border-[#18241b]/10 dark:border-[#f5ece5]/10 p-6 rounded-xl space-y-4 transition">
            <h4 className="font-serif text-md text-[#18241b] dark:text-[#f5ece5] border-b border-[#18241b]/10 dark:border-[#f5ece5]/10 pb-2">
              The Curator's Table
            </h4>
            <p className="font-serif text-xs text-[#18241b]/70 dark:text-[#f5ece5]/70 leading-relaxed">
              Every afternoon, after completing architecture blueprints, Papa sits by the mahogany window overlooking the tropical foliage of Manila. Here, he reviews family notes, old journals, and compiles these quiet digital reflections.
            </p>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-stone-300 dark:bg-stone-800">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?h=80?auto=format"
                  alt="Papa"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="font-serif text-xs text-[#18241b] dark:text-[#f5ece5] block">Papa's Study / 아빠의 서실</span>
                <span className="font-sans text-[9px] tracking-wider text-[#18241b]/50 dark:text-[#f5ece5]/50 block">CURATOR REGISTERED</span>
              </div>
            </div>
          </div>

          {/* Section B: Topic Categorization */}
          <div className="border border-[#18241b]/10 dark:border-[#f5ece5]/10 p-6 rounded-xl space-y-4">
            <h4 className="font-serif text-md text-[#18241b] dark:text-[#f5ece5] border-b border-[#18241b]/10 dark:border-[#f5ece5]/10 pb-2">
              Archive Topics
            </h4>
            <div className="space-y-2">
              {categories.map((cat) => {
                const count = articles.filter(
                  (a) => cat === "ALL" || a.category.toUpperCase() === cat.toUpperCase()
                ).length;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className="w-full flex justify-between items-center text-left py-1 text-xs font-serif hover:text-[#924c0a] dark:hover:text-[#e2a265] group cursor-pointer"
                  >
                    <span className={`${selectedCategory === cat ? "text-[#924c0a] dark:text-[#e2a265] font-normal" : "text-[#18241b]/70 dark:text-[#f5ece5]/70"}`}>
                      {cat === "ALL" ? "All Writings" : cat.charAt(0) + cat.slice(1).toLowerCase()}
                    </span>
                    <span className="font-sans text-[10px] bg-[#18241b]/5 dark:bg-[#f5ece5]/5 text-[#18241b] dark:text-[#f5ece5] px-2 py-0.5 rounded-full group-hover:bg-[#924c0a]/10 dark:group-hover:bg-[#e2a265]/25 group-hover:text-[#924c0a] dark:group-hover:text-[#e2a265]">
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section C: Editorial Quote widget */}
          <div className="relative py-8 px-6 text-center bg-[#18241b]/5 dark:bg-[#f5ece5]/5 rounded-xl overflow-hidden border border-[#18241b]/10 dark:border-[#f5ece5]/10">
            <span className="text-[#924c0a]/10 dark:text-[#e2a265]/10 font-serif text-[120px] select-none absolute -top-16 -left-0 leading-none">“</span>
            
            <p className="font-serif text-sm text-[#18241b] dark:text-[#f5ece5] italic relative z-10 leading-relaxed">
              "Writing is the silent way we keep our ancestors close and our grandchildren informed."
            </p>
            
            <p className="font-sans text-[9px] text-[#924c0a] dark:text-[#e2a265] tracking-[0.2em] font-bold mt-4 block">
              — EPIGRAPH FROM THE STUDY TABLE
            </p>
          </div>

        </aside>

      </div>

    </div>
  );
};

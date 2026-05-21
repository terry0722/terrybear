'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Article } from '@/types';

export default function StoryPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [viewingArticle, setViewingArticle] = useState<Article | null>(null);

  useEffect(() => {
    // 로컬 스토리지에서 등록된 아빠의 서재 일지 불러오기
    const stored = localStorage.getItem('custom_articles');
    if (stored) {
      try {
        setArticles(JSON.parse(stored));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  return (
    <main className="min-h-screen bg-[#fff8f4] dark:bg-[#1c1814] text-[#1f1b17] dark:text-[#f5ece5] transition-colors duration-300 pb-32">
      
      {/* 1. 상단 뒤로가기 */}
      <div className="pt-12 px-8 max-w-7xl mx-auto">
        <Link href="/" className="text-[10px] tracking-[0.3em] uppercase text-[#18241b]/50 dark:text-[#f5ece5]/50 hover:text-[#924c0a] dark:hover:text-[#e2a265] transition border-b border-transparent hover:border-[#924c0a] dark:hover:border-[#e2a265] pb-1">
          Back to Home
        </Link>
      </div>

      {/* 2. 에디토리얼 헤로(Hero) 섹션 */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-24 text-center">
        <span className="text-[10px] tracking-[0.4em] uppercase text-[#924c0a] dark:text-[#e2a265] font-semibold block mb-6">Chapter 1.</span>
        <h1 className="text-4xl md:text-5xl font-serif font-normal tracking-tight mb-8 leading-tight text-[#18241b] dark:text-[#f5ece5]">
          기억이 향기가 되기까지.
        </h1>
        <div className="w-12 h-[1px] bg-[#924c0a] dark:bg-[#e2a265] mx-auto mb-10"></div>
        <p className="font-serif text-sm text-[#18241b]/70 dark:text-[#f5ece5]/70 leading-relaxed max-w-md mx-auto">
          필리핀의 낯선 공기, 가족과 함께 나눈 웃음소리, 그리고 잊지 못할 평온한 오후. <br />
          이 모든 순간들을 영원히 간직하고 싶다는 마음에서 <br />
          우리의 이야기는 시작되었습니다.
        </p>
      </section>

      {/* 3. 매거진 인터뷰 섹션 */}
      <section className="max-w-6xl mx-auto px-6 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          
          <div className="aspect-[4/5] bg-[#f5ece5] dark:bg-[#2a2420] overflow-hidden rounded-sm relative group border border-[#18241b]/10 dark:border-[#f5ece5]/10 shadow-sm">
            <img 
              src="/family.jpeg" 
              alt="Our Story" 
              className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 transition duration-1000" 
            />
            <div className="absolute bottom-6 left-6 text-white text-[10px] tracking-widest uppercase opacity-0 group-hover:opacity-100 transition duration-1000">
              Captured in Philippines
            </div>
          </div>
          
          <div className="py-8 md:py-0">
            <h3 className="font-serif text-2xl font-normal mb-12 italic text-[#18241b] dark:text-[#f5ece5] border-l-2 border-[#924c0a] dark:border-[#e2a265] pl-6 leading-relaxed">
              "우리가 함께 보내는 <br /> 
              가장 평범하고 완벽한 순간의 향기"
            </h3>
            
            <div className="space-y-10 text-sm text-[#18241b]/70 dark:text-[#f5ece5]/70 leading-loose">
              <div>
                <strong className="text-[#924c0a] dark:text-[#e2a265] font-semibold tracking-wide block mb-2 font-serif">Q. 'ONCE, again'의 영감은 어디서 왔나요?</strong>
                <p>
                  아내의 화장대 위 수많은 향수 및 드레스 퍼퓸들을 보며 생각했습니다. '가장 나다운 향, 우리 가족의 따뜻함이 묻어나는 향은 없을까?' 
                  디자이너로서의 시각과 마케터의 감각이 만나는 교차점에 바로 우리 가족의 일상이 있었습니다.
                </p>
              </div>
              
              <div>
                <strong className="text-[#924c0a] dark:text-[#e2a265] font-semibold tracking-wide block mb-2 font-serif">Q. 필리핀에서의 생활이 미친 영향은요?</strong>
                <p>
                  이곳의 여유로운 속도는 우리에게 곁에 있는 사람을 더 깊이 바라볼 수 있는 시간을 주었습니다. 
                  딸아이의 맑은 미소, 반려견의 평온한 낮잠 시간... 이 소중한 장면들을 잊지 않고 병 안에 담아내는 작업이 바로 브랜드의 시작입니다.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. 스토리보드 하이라이트 */}
      <section className="max-w-4xl mx-auto px-6 text-center">
         <div className="border-t border-b border-[#18241b]/10 dark:border-[#f5ece5]/10 py-16 bg-[#f5ece5]/40 dark:bg-[#2a2420]/40 backdrop-blur-sm">
           <span className="text-[10px] tracking-[0.3em] uppercase text-[#924c0a] dark:text-[#e2a265] font-semibold block mb-4">Core Value</span>
           <h2 className="font-serif text-xl md:text-2xl font-normal tracking-widest text-[#18241b] dark:text-[#f5ece5]">
             "기억, 연결, 그리고 다시 찾고 싶은 순간"
           </h2>
         </div>
      </section>

      {/* 5. 아빠의 서재 일지 (Chronicles) */}
      <section className="max-w-6xl mx-auto px-6 mt-28 border-t border-[#18241b]/10 dark:border-[#f5ece5]/10 pt-20">
        <div className="text-center mb-16">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#924c0a] dark:text-[#e2a265] font-semibold block mb-2">Papa's Archive</span>
          <h2 className="text-3xl font-serif font-normal tracking-tight text-[#18241b] dark:text-[#f5ece5]">아빠의 서재 일지 (Study Chronicles)</h2>
          <p className="font-serif text-xs text-[#18241b]/50 dark:text-[#f5ece5]/50 italic mt-2">
            가족의 매일을 기록하고 성찰한 아빠의 따뜻한 생각 한 조각.
          </p>
        </div>

        {articles.length === 0 ? (
          <p className="text-center font-serif text-xs text-[#18241b]/40 dark:text-[#f5ece5]/40 italic tracking-widest">등록된 서재 일지가 아직 없습니다.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <div 
                key={article.id} 
                className="group bg-[#f5ece5]/30 dark:bg-[#2a2420]/30 border border-[#18241b]/10 dark:border-[#f5ece5]/10 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full justify-between"
              >
                <div className="aspect-[16/10] w-full overflow-hidden bg-[#f5ece5] dark:bg-[#1c1814] relative">
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-103 transition duration-550" />
                  <span className="absolute top-3 left-3 bg-[#924c0a] dark:bg-[#e2a265] text-[#fff8f4] dark:text-[#1c1814] text-[9px] tracking-widest uppercase font-semibold px-2 py-0.5 rounded shadow-sm">
                    {article.category}
                  </span>
                </div>
                
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <span className="text-[10px] text-[#18241b]/40 dark:text-[#f5ece5]/40 font-mono block">{article.date}</span>
                    <h3 className="text-base font-serif font-normal text-[#18241b] dark:text-[#f5ece5] leading-snug group-hover:text-[#924c0a] dark:group-hover:text-[#e2a265] transition-colors">{article.title}</h3>
                    <p className="text-xs text-[#18241b]/60 dark:text-[#f5ece5]/60 leading-relaxed font-serif line-clamp-3">{article.excerpt}</p>
                  </div>
                  
                  <div className="pt-4 border-t border-[#18241b]/5 dark:border-[#f5ece5]/5 mt-6 flex justify-between items-center">
                    <span className="text-[9px] tracking-widest text-[#924c0a] dark:text-[#e2a265] font-semibold uppercase">{article.author}</span>
                    
                    <button 
                      onClick={() => setViewingArticle(article)}
                      className="text-[10px] text-[#18241b]/50 dark:text-[#f5ece5]/50 hover:text-[#924c0a] dark:hover:text-[#e2a265] hover:underline font-semibold cursor-pointer"
                    >
                      READ MORE
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Modal Dialog to read full chronicle */}
      {viewingArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 animate-fadeIn overflow-y-auto">
          <div className="absolute inset-0 cursor-pointer" onClick={() => setViewingArticle(null)} />
          
          <div className="relative bg-[#fff8f4] dark:bg-[#2a2420] rounded-xl max-w-2xl w-full mx-auto overflow-hidden shadow-2xl z-10 border border-[#18241b]/10 dark:border-[#f5ece5]/10">
            <div className="h-[250px] w-full relative">
              <img src={viewingArticle.image} alt={viewingArticle.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
              <button 
                onClick={() => setViewingArticle(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/75 cursor-pointer text-lg font-normal"
              >
                &times;
              </button>
              <div className="absolute bottom-6 left-6 text-white space-y-1">
                <span className="bg-[#e2a265] text-[#1c1814] text-[9px] tracking-widest uppercase font-semibold px-2 py-0.5 rounded shadow-sm">
                  {viewingArticle.category}
                </span>
                <h3 className="text-xl md:text-2xl font-serif font-normal">{viewingArticle.title}</h3>
              </div>
            </div>
            <div className="p-6 md:p-8 space-y-6">
              <div className="flex justify-between items-center text-xs text-[#18241b]/40 dark:text-[#f5ece5]/40 border-b border-[#18241b]/10 dark:border-[#f5ece5]/10 pb-4">
                <span>DATE: {viewingArticle.date}</span>
                <span className="font-semibold text-[#924c0a] dark:text-[#e2a265]">{viewingArticle.author}</span>
              </div>
              <p className="text-sm md:text-base leading-relaxed text-[#18241b]/80 dark:text-[#f5ece5]/80 font-serif font-light whitespace-pre-wrap">
                {viewingArticle.content}
              </p>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}
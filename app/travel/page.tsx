'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function TravelPage() {
  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 유저 인증 상태 확인
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
  }, []);

  // Supabase DB에서 게시물 가져오기
  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('travel_posts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (data && !error) {
        setPosts(data);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  return (
    <main className="min-h-screen flex flex-col md:flex-row bg-[#fff8f4] dark:bg-[#1c1814] text-[#1f1b17] dark:text-[#f5ece5] transition-colors duration-300">
      
      {/* =========================================
                     1. 메인 리스트 화면 
          ========================================= */}
      
      {/* 좌측 50%: Hero 섹션 (가장 최근 여행 강조) */}
      <div className="w-full md:w-1/2 md:h-screen md:sticky md:top-0 relative group overflow-hidden bg-[#18241b] flex flex-col">
        {loading ? (
          <div className="text-[#e2a265] flex-grow flex items-center justify-center font-bold tracking-widest uppercase font-serif">
            Loading Stories...
          </div>
        ) : posts.length > 0 ? (
          <>
            <div className="absolute inset-0 bg-[#18241b]/40 z-10 transition-opacity duration-300 group-hover:bg-[#18241b]/20"></div>
            <img 
              src={posts[0].cover_image} 
              alt="Hero Trip" 
              className="w-full h-[60vh] md:h-full object-cover transition-transform duration-1000 group-hover:scale-103"
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-4/5 text-center flex flex-col items-center">
              <p className="text-[#e2a265] font-semibold tracking-[0.3em] uppercase text-xs mb-4 md:mb-6">
                LATEST STORY
              </p>
              <Link href={`/travel/${posts[0].id}`}>
                <h1 className="text-4xl md:text-5xl font-serif font-normal text-[#fff8f4] hover:text-[#e2a265] hover:italic transition-all duration-300 leading-tight md:leading-snug break-keep cursor-pointer drop-shadow-md">
                  {posts[0].title}
                </h1>
              </Link>
              <p className="text-[#f5ece5]/85 font-medium text-xs mt-6 tracking-widest">{posts[0].location}</p>
            </div>
            {/* 좌측 하단 [새 기사 작성] 에디터 버튼 (관리자용) */}
            {user && (
              <div className="absolute bottom-6 left-6 z-30">
                <Link href="/travel/write" className="bg-[#924c0a] hover:bg-[#a35e19] text-[#fff8f4] font-semibold text-[10px] px-4 py-2.5 rounded uppercase tracking-widest transition-colors shadow-md">
                  + Write Article
                </Link>
              </div>
            )}
          </>
        ) : (
          <div className="text-white flex-grow flex flex-col items-center justify-center p-6">
            <h2 className="text-xl font-serif font-normal text-[#f5ece5]/60 mb-4">No stories yet.</h2>
            {user && (
              <Link href="/travel/write" className="bg-[#924c0a] hover:bg-[#a35e19] text-[#fff8f4] px-5 py-3 text-xs tracking-widest font-semibold rounded uppercase">
                게시물 작성하기
              </Link>
            )}
          </div>
        )}
      </div>

      {/* 우측 50%: 리스트(Grid) 뷰 */}
      <div className="w-full md:w-1/2 p-6 md:p-12 lg:p-20 overflow-y-auto z-10 pt-20 md:pt-24 border-t border-t-[#18241b]/10 md:border-t-0 md:border-l border-l-[#18241b]/10 dark:border-l-[#f5ece5]/10">
        
        <div className="flex justify-between items-end mb-12 border-b border-[#18241b]/10 dark:border-[#f5ece5]/10 pb-4">
          <h2 className="text-2xl md:text-3xl font-serif font-normal text-[#18241b] dark:text-[#f5ece5] tracking-tight uppercase">
            The Archive
          </h2>
          <span className="text-[10px] font-semibold bg-[#924c0a] dark:bg-[#e2a265] text-[#fff8f4] dark:text-[#1c1814] px-3 py-1.5 font-sans uppercase tracking-widest leading-none rounded-full shadow-sm">
            {posts.length} Posts
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {posts.slice(1).map((post) => (
            <Link href={`/travel/${post.id}`} key={post.id}>
              <div className="flex flex-col cursor-pointer group">
                <div className="w-full aspect-[4/5] overflow-hidden bg-[#f5ece5] dark:bg-[#2a2420] mb-4 relative border border-[#18241b]/10 dark:border-[#f5ece5]/10 rounded-lg shadow-sm">
                   <div className="absolute top-3 left-3 bg-[#fff8f4] dark:bg-[#1c1814] text-[#924c0a] dark:text-[#e2a265] border border-[#924c0a]/30 dark:border-[#e2a265]/30 font-semibold px-2 py-1 text-[8px] uppercase tracking-widest z-10 rounded">
                     {post.location}
                   </div>
                   <img 
                     src={post.cover_image} 
                     alt={post.title} 
                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                   />
                </div>
                <h3 className="text-lg md:text-xl font-serif font-normal text-[#18241b] dark:text-[#f5ece5] leading-tight mb-1 group-hover:text-[#924c0a] dark:group-hover:text-[#e2a265] transition-colors inline-block w-fit">
                  {post.title}
                </h3>
                <p className="text-[10px] text-[#18241b]/40 dark:text-[#f5ece5]/40 font-sans tracking-widest uppercase mt-1">
                  {new Date(post.created_at).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                </p>
              </div>
            </Link>
          ))}
        </div>
        
        {!loading && posts.length <= 1 && (
           <p className="text-xs font-semibold text-[#18241b]/40 dark:text-[#f5ece5]/40 mt-12 text-center uppercase tracking-widest font-sans">More stories coming soon...</p>
        )}
      </div>
    </main>
  );
}
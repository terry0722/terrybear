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
    <main className="min-h-screen flex flex-col md:flex-row bg-[#E0FF00] dark:bg-[#1a1a1a] transition-colors duration-300">
      
      {/* =========================================
                     1. 메인 리스트 화면 
          ========================================= */}
      
      {/* 좌측 50%: Hero 섹션 (가장 최근 여행 강조) */}
      <div className="w-full md:w-1/2 md:h-screen md:sticky md:top-0 relative group overflow-hidden bg-black flex flex-col">
        {loading ? (
          <div className="text-[#E0FF00] flex-grow flex items-center justify-center font-bold tracking-widest uppercase">
            Loading Stories...
          </div>
        ) : posts.length > 0 ? (
          <>
            <div className="absolute inset-0 bg-black/40 z-10 transition-opacity duration-300 group-hover:bg-black/20"></div>
            <img 
              src={posts[0].cover_image} 
              alt="Hero Trip" 
              className="w-full h-[60vh] md:h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-4/5 text-center">
              <p className="text-[#E0FF00] font-black tracking-[0.3em] uppercase text-xs mb-4 md:mb-6">
                LATEST STORY
              </p>
              <Link href={`/travel/${posts[0].id}`}>
                <h1 className="text-4xl md:text-6xl font-black text-white hover:text-[#E0FF00] hover:italic transition-all duration-300 leading-tight md:leading-snug break-keep cursor-pointer shadow-black drop-shadow-lg">
                  {posts[0].title}
                </h1>
              </Link>
              <p className="text-white/80 font-bold text-sm mt-6 mb-1 tracking-widest">{posts[0].location}</p>
            </div>
            {/* 좌측 하단 [새 기사 작성] 에디터 버튼 (관리자용) */}
            {user && (
              <div className="absolute bottom-6 left-6 z-30">
                <Link href="/travel/write" className="bg-[#E0FF00] text-black font-black text-xs px-4 py-2 uppercase tracking-widest shadow-[4px_4px_0_0_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
                  + Write Article
                </Link>
              </div>
            )}
          </>
        ) : (
          <div className="text-white flex-grow flex flex-col items-center justify-center">
            <h2 className="text-2xl font-black text-gray-500 mb-4">No stories yet.</h2>
            {user && (
              <Link href="/travel/write" className="bg-[#E0FF00] text-black px-6 py-3 font-bold border-2 border-black">
                게시물 작성하기
              </Link>
            )}
          </div>
        )}
      </div>

      {/* 우측 50%: 리스트(Grid) 뷰 (형광톤/다크톤 배경) */}
      <div className="w-full md:w-1/2 p-6 md:p-12 lg:p-20 overflow-y-auto z-10 pt-20 md:pt-24 border-t-2 md:border-t-0 md:border-l-4 border-black dark:border-white">
        
        <div className="flex justify-between items-end mb-12 border-b-4 border-black dark:border-white pb-4">
          <h2 className="text-3xl md:text-5xl font-black text-black dark:text-[#E0FF00] tracking-tighter uppercase">
            The Archive
          </h2>
          <span className="text-sm font-bold bg-black text-[#E0FF00] px-3 py-1 font-mono uppercase tracking-widest leading-none shadow-[2px_2px_0_0_rgba(255,255,255,0.5)]">
            {posts.length} Posts
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-10">
          {posts.slice(1).map((post) => (
            <Link href={`/travel/${post.id}`} key={post.id}>
              <div className="flex flex-col cursor-pointer group">
                <div className="w-full aspect-[4/5] overflow-hidden bg-black mb-4 relative border-2 border-black dark:border-[#E0FF00]">
                   <div className="absolute top-3 left-3 bg-white text-black border border-black font-black px-2 py-1 text-[10px] uppercase tracking-widest z-10">
                     {post.location}
                   </div>
                   <img 
                     src={post.cover_image} 
                     alt={post.title} 
                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                   />
                </div>
                <h3 className="text-xl md:text-2xl font-black text-black dark:text-white leading-tight mb-2 group-hover:bg-black group-hover:text-[#E0FF00] transition-colors inline-block w-fit px-1">
                  {post.title}
                </h3>
                <p className="text-xs text-black/70 dark:text-gray-400 font-mono tracking-widest uppercase mt-2">
                  {new Date(post.created_at).toLocaleDateString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
        
        {!loading && posts.length <= 1 && (
           <p className="text-sm font-bold text-gray-500 mt-12 text-center uppercase">More stories coming soon...</p>
        )}
      </div>
    </main>
  );
}
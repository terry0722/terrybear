'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function TravelPostDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // URL에 포함된 id 로 DB에서 단일 게시물 페칭
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from('travel_posts')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error || !data) {
        alert("게시물을 찾을 수 없습니다.");
        router.push('/travel');
      } else {
        setPost(data);
      }
      setLoading(false);
    };

    if (id) fetchPost();
  }, [id, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fff8f4] dark:bg-[#1c1814] flex items-center justify-center text-[#924c0a] dark:text-[#e2a265] font-serif tracking-widest uppercase">
        Loading...
      </div>
    );
  }
  
  if (!post) return null;

  return (
    <main className="min-h-screen flex flex-col md:flex-row bg-[#fff8f4] dark:bg-[#1c1814] text-[#1f1b17] dark:text-[#f5ece5] transition-colors duration-300">
      
      {/* 모바일 최상단 X 버튼 또는 데스크탑 Sticky 좌상단 X 버튼 */}
      <Link 
        href="/travel"
        className="fixed md:absolute top-4 right-4 md:top-8 md:right-8 w-10 h-10 z-50 rounded-full bg-[#924c0a] text-[#fff8f4] dark:bg-[#e2a265] dark:text-[#1c1814] text-lg font-normal flex items-center justify-center hover:bg-[#a35e19] dark:hover:bg-[#f5ece5] transition-colors shadow-md border border-[#18241b]/10 dark:border-[#f5ece5]/10"
      >
        &times;
      </Link>

      {/* 좌측 50%: Hero Cover Image (Sticky) */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-screen md:sticky md:top-0 bg-[#f5ece5] dark:bg-[#2a2420] border-b md:border-b-0 border-[#18241b]/10 dark:border-[#f5ece5]/10 z-10 relative">
        <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute top-4 left-4 bg-[#924c0a] dark:bg-[#e2a265] text-[#fff8f4] dark:text-[#1c1814] px-3 py-1 font-semibold text-[10px] tracking-widest uppercase rounded shadow-sm">
          Cover Story
        </div>
      </div>

      {/* 우측 50%: 거대 스크롤 기사(Article) 렌더링 영역 */}
      <div className="w-full md:w-1/2 min-h-screen overflow-y-auto bg-[#fff8f4] dark:bg-[#1c1814] relative z-20 md:border-l border-l-[#18241b]/10 dark:border-l-[#f5ece5]/10">
        <div className="p-8 md:p-16 lg:p-24 max-w-2xl mx-auto">
          
          <p className="text-[10px] font-semibold tracking-[0.3em] text-[#924c0a] dark:text-[#e2a265] uppercase mb-6 border-b border-[#924c0a]/20 dark:border-[#e2a265]/20 inline-block pb-2">
            LIFE &middot; {post.location}
          </p>
          
          {/* 하이라이트 거대 타이틀 렌더링 */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-normal tracking-tight text-[#18241b] dark:text-[#f5ece5] leading-tight mb-8 break-keep">
            {post.title.split(' ').map((word: string, i: number) => (
              <span key={i} className="border-b border-[#924c0a] dark:border-[#e2a265] mt-1 inline-block pb-0.5 mr-3 hover:text-[#924c0a] dark:hover:text-[#e2a265] transition-colors duration-300">
                {word}
              </span>
            ))}
          </h1>

          <p className="text-sm md:text-base text-[#18241b]/60 dark:text-[#f5ece5]/60 font-serif font-light mb-12">
            진짜 아끼는 여행의 순간들을 공유합니다
          </p>
          
          {/* 타임스탬프 */}
          <div className="flex items-center gap-4 mb-20 pb-12 border-b border-[#18241b]/10 dark:border-[#f5ece5]/10">
             <div className="w-10 h-10 rounded-full bg-[#924c0a] dark:bg-[#e2a265] flex justify-center items-center">
                 <span className="text-[#fff8f4] dark:text-[#1c1814] font-semibold text-xs">YOO</span>
             </div>
             <div>
               <p className="text-xs font-semibold text-[#18241b] dark:text-[#f5ece5]">Editor Family</p>
               <p className="text-[10px] font-sans text-[#18241b]/40 dark:text-[#f5ece5]/40 mt-1 uppercase">
                 {new Date(post.created_at).toLocaleDateString()}
               </p>
             </div>
          </div>

          {/* 에디터가 작성한 HTML (사진, 폰트스타일 포함) 그대로 출력 */}
          <article 
            className="prose dark:prose-invert max-w-none text-base md:text-lg leading-[2.2] font-serif font-light text-[#18241b]/80 dark:text-[#f5ece5]/80 break-keep text-justify marker:text-[#924c0a] dark:marker:text-[#e2a265]"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          
          <div className="mt-32 pt-16 border-t border-[#18241b]/10 dark:border-[#f5ece5]/10">
            <h3 className="text-2xl font-serif font-normal mb-4 text-[#18241b] dark:text-[#f5ece5] uppercase tracking-tight">THE END</h3>
            <p className="text-xs text-[#18241b]/40 dark:text-[#f5ece5]/40">읽어주셔서 감사합니다.</p>
          </div>

        </div>
      </div>
    </main>
  );
}

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

  if (loading) return <div className="min-h-screen bg-[#111111] flex items-center justify-center text-white">Loading...</div>;
  if (!post) return null;

  return (
    <main className="min-h-screen flex flex-col md:flex-row bg-[#E0FF00] dark:bg-[#1a1a1a] transition-colors duration-300">
      
      {/* 모바일 최상단 X 버튼 또는 데스크탑 Sticky 좌상단 X 버튼 */}
      <Link 
        href="/travel"
        className="fixed md:absolute top-4 right-4 md:top-8 md:right-8 w-12 h-12 z-50 rounded-none bg-[#E0FF00] text-black border-2 border-black text-2xl font-black flex items-center justify-center hover:bg-black hover:text-[#E0FF00] transition-colors shadow-[4px_4px_0_0_rgba(0,0,0,1)]"
      >
        X
      </Link>

      {/* 좌측 50%: Hero Cover Image (Sticky) */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-screen md:sticky md:top-0 bg-gray-100 border-b-4 md:border-b-0 border-black z-10 relative">
        <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 font-black text-xs tracking-widest uppercase">
          Cover Story
        </div>
      </div>

      {/* 우측 50%: 거대 스크롤 기사(Article) 렌더링 영역 */}
      <div className="w-full md:w-1/2 min-h-screen overflow-y-auto bg-slate-50 dark:bg-black relative z-20 md:border-l-4 border-black">
        <div className="p-8 md:p-16 lg:p-24 max-w-2xl mx-auto">
          
          <p className="text-[11px] font-bold tracking-[0.3em] text-black dark:text-white uppercase mb-6 border-b-[3px] border-black dark:border-white inline-block pb-2">
            LIFE &middot; {post.location}
          </p>
          
          {/* 하이라이트 거대 타이틀 렌더링 */}
          <h1 className="text-4xl md:text-5xl lg:text-[4.5rem] font-black tracking-tighter text-black dark:text-white leading-[1.1] mb-8 break-keep">
            {post.title.split(' ').map((word: string, i: number) => (
              <span key={i} className="border-b-[4px] md:border-b-[6px] border-black dark:border-[#E0FF00] mt-2 inline-block pb-1 mr-3 lg:mr-4 hover:bg-black hover:text-[#E0FF00] dark:hover:bg-[#E0FF00] dark:hover:text-black transition-colors duration-300">
                {word}
              </span>
            ))}
          </h1>

          <p className="text-sm md:text-lg text-gray-800 dark:text-gray-300 font-medium mb-12">
            진짜 아끼는 여행의 순간들을 공유합니다
          </p>
          
          {/* 타임스탬프 */}
          <div className="flex items-center gap-4 mb-20 pb-12 border-b border-black/20 dark:border-white/20">
             <div className="w-10 h-10 rounded-full bg-black dark:bg-[#E0FF00] flex justify-center items-center">
                 <span className="text-[#E0FF00] dark:text-black font-black text-xs">YOO</span>
             </div>
             <div>
               <p className="text-xs font-black dark:text-white">Editor Family</p>
               <p className="text-[10px] font-mono text-gray-400 mt-1 uppercase">
                 {new Date(post.created_at).toLocaleDateString()}
               </p>
             </div>
          </div>

          {/* 에디터가 작성한 HTML (사진, 폰트스타일 포함) 그대로 출력 */}
          <article 
            className="prose dark:prose-invert max-w-none text-base md:text-lg leading-[2.2] font-light text-black dark:text-gray-100 break-keep text-justify marker:text-black dark:marker:text-[#E0FF00]"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          
          <div className="mt-32 pt-16 border-t-4 border-black dark:border-white">
            <h3 className="text-3xl font-black mb-4 dark:text-white uppercase tracking-tighter">THE END</h3>
            <p className="text-sm dark:text-gray-400">읽어주셔서 감사합니다.</p>
          </div>

        </div>
      </div>
    </main>
  );
}

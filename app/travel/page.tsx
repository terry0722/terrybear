'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { TravelView } from '@/components/TravelView';
import { TravelLog } from '@/types';
import { supabase } from '@/lib/supabase';

export default function TravelPage() {
  const [travels, setTravels] = useState<TravelLog[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Sync admin state
  useEffect(() => {
    const logged = localStorage.getItem('family_admin_logged');
    setIsAdmin(logged === 'true');
  }, []);

  // Fetch posts from Supabase database
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('travel_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (data && !error && data.length > 0) {
        const mapped: TravelLog[] = data.map((post: any) => ({
          id: String(post.id),
          title: post.title || 'Untitled',
          destination: post.location || 'SEOUL, KR',
          date: post.created_at ? new Date(post.created_at).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }) : '최근 여행',
          description: post.content || '',
          image: post.cover_image || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format'
        }));
        setTravels(mapped);
      } else {
        // Fallback to high-quality default travels if the Supabase database table is empty
        const defaultTravels: TravelLog[] = [
          {
            id: "travel-1",
            title: "세부의 푸른 물결 아래서",
            destination: "CEBU, PH",
            date: "2026.03.14",
            description: "필리핀 세부 섬의 새하얀 모래사장과 에메랄드빛 해변에서 담아온 평화로운 오후의 기억.",
            image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format"
          },
          {
            id: "travel-2",
            title: "제주도, 현무암 돌담길을 걷다",
            destination: "JEJU, KR",
            date: "2026.04.05",
            description: "유채꽃 향기 가득한 제주의 봄날, 현무암 돌담 사이로 불어오는 시원한 바닷바람과 산책길.",
            image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format"
          },
          {
            id: "travel-3",
            title: "서울의 정취를 따라서",
            destination: "SEOUL, KR",
            date: "2026.05.01",
            description: "고궁의 처마 끝에 걸린 푸른 하늘과 밤거리 불빛들이 교차하는 활기찬 도심의 흔적.",
            image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&auto=format"
          },
          {
            id: "travel-4",
            title: "마닐라 베이의 붉은 노을",
            destination: "MANILA, PH",
            date: "2026.05.10",
            description: "코코넛 야자나무 사이로 퍼져나가는 황홀한 저녁 노을과 가족들이 함께 거닐었던 마닐라 베이의 바닷가 산책로.",
            image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&auto=format"
          }
        ];
        setTravels(defaultTravels);
      }
    } catch (e) {
      console.error("Error fetching travel posts:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDeleteTravel = async (id: string) => {
    // If it is a client-side default post, remove from state directly
    if (id.startsWith('travel-')) {
      setTravels(prev => prev.filter(t => t.id !== id));
      alert('화면에서 임시 여행 기록이 제거되었습니다.');
      return;
    }

    // Otherwise delete row from Supabase database table
    try {
      const { error } = await supabase
        .from('travel_posts')
        .delete()
        .eq('id', id);

      if (!error) {
        alert('여행 기록이 서버에서 성공적으로 삭제되었습니다.');
        fetchPosts();
      } else {
        alert('삭제 실패: ' + error.message);
      }
    } catch (err: any) {
      alert('오류 발생: ' + err.message);
    }
  };

  return (
    <main className="min-h-screen bg-[#fff8f4] dark:bg-[#1c1814] transition-colors duration-300 pb-20 pt-8">
      
      {/* Navigation and Action Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center mb-6">
        <Link 
          href="/" 
          className="inline-flex items-center text-[10px] tracking-[0.3em] uppercase text-[#18241b]/50 dark:text-[#f5ece5]/50 hover:text-[#924c0a] dark:hover:text-[#e2a265] transition border-b border-transparent hover:border-[#924c0a] dark:hover:border-[#e2a265] pb-0.5"
        >
          ← Back to Home
        </Link>
        
        {isAdmin && (
          <Link 
            href="/travel/write" 
            className="bg-[#924c0a] hover:bg-[#a35e19] text-[#fff8f4] font-semibold text-[10px] px-3.5 py-1.5 rounded uppercase tracking-widest transition shadow-sm"
          >
            + Write Article
          </Link>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-32">
          <span className="font-serif text-xs italic tracking-widest text-[#18241b]/60 dark:text-[#f5ece5]/60 animate-pulse">
            Voyaging through skylines...
          </span>
        </div>
      ) : (
        <TravelView
          travels={travels}
          isAdmin={isAdmin}
          onDeleteTravel={handleDeleteTravel}
        />
      )}
    </main>
  );
}
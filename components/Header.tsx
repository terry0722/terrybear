'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function Header() {
  const [user, setUser] = useState<any>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // 사용자 세션 확인
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // 다크모드 초기화 및 적용
  useEffect(() => {
    if (document.documentElement.classList.contains('dark')) {
      setIsDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.remove('dark');
      setIsDarkMode(false);
    } else {
      root.classList.add('dark');
      setIsDarkMode(true);
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      alert('로그아웃 되었습니다.');
      router.push('/');
    }
  };

  // 현재 메뉴에 밑줄 하이라이트 표시 로직
  const getMenuClass = (path: string) => {
    return pathname === path 
      ? 'font-semibold text-black dark:text-white border-b-2 border-black dark:border-white transition' 
      : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition';
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 md:px-8 h-20 flex flex-col md:flex-row justify-center md:justify-between items-center gap-2 md:gap-0">
        
        {/* 로고 영역 */}
        <Link href="/" className="text-lg font-light tracking-[0.2em] uppercase text-black dark:text-white transition-colors duration-300">
          Our Legacy
        </Link>
        
        {/* 네비게이션 메뉴 */}
        <div className="flex gap-4 md:gap-6 text-[10px] md:text-[11px] tracking-widest uppercase font-medium overflow-x-auto w-full md:w-auto justify-center md:justify-end items-center whitespace-nowrap pb-2 md:pb-0 italic">
          <Link href="/" className={getMenuClass('/')}>Home</Link>
          <Link href="/story" className={getMenuClass('/story')}>Story</Link>
          <Link href="/gallery" className={getMenuClass('/gallery')}>Gallery</Link>
          <Link href="/artgallery" className={getMenuClass('/artgallery')}>Art Gallery</Link>
          <Link href="/travel" className={getMenuClass('/travel')}>Travel</Link>
          <Link href="/guestbook" className={getMenuClass('/guestbook')}>Guestbook</Link>
          
          {user ? (
            <div className="flex items-center gap-2 md:gap-4 ml-1 md:ml-2">
              <span className="text-black dark:text-white font-bold border-b border-yellow-400 lowercase italic px-1">
                 {user.email?.split('@')[0]}
              </span>
              <button onClick={handleLogout} className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition decoration-gray-200">Logout</button>
            </div>
          ) : (
            <Link href="/login" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition border-b border-black dark:border-white pb-0.5 ml-2">Login</Link>
          )}

          {/* 다크모드 토글 버튼 */}
          <button 
            onClick={toggleDarkMode}
            className="ml-2 w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-yellow-300 transition-colors duration-300 hover:scale-110"
            title="Toggle Dark Mode"
          >
            {isDarkMode ? '🌙' : '☀️'}
          </button>
        </div>

      </div>
    </nav>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { AdminView } from '@/components/AdminView';
import { Article, Artwork, TravelLog } from '@/types';
import { supabase } from '@/lib/supabase';

export default function AdminPage() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Persist admin login state
    const logged = localStorage.getItem('family_admin_logged');
    if (logged === 'true') {
      setIsAdmin(true);
    }
  }, []);

  const handleLogin = (passcode: string) => {
    if (passcode === '1234' || passcode === 'onceagain') {
      setIsAdmin(true);
      localStorage.setItem('family_admin_logged', 'true');
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('family_admin_logged');
  };

  const handleAddArticle = (article: Omit<Article, "id">) => {
    const newArticle: Article = {
      ...article,
      id: "custom-article-" + Date.now(),
    };
    const stored = localStorage.getItem('custom_articles');
    let current: Article[] = [];
    if (stored) {
      try {
        current = JSON.parse(stored);
      } catch (e) {
        console.error(e);
      }
    }
    const updated = [newArticle, ...current];
    localStorage.setItem('custom_articles', JSON.stringify(updated));
  };

  const handleAddArtwork = (artwork: Omit<Artwork, "id">) => {
    const newArt: Artwork = {
      ...artwork,
      id: "custom-art-" + Date.now(),
    };
    const stored = localStorage.getItem('custom_artworks');
    let current: Artwork[] = [];
    if (stored) {
      try {
        current = JSON.parse(stored);
      } catch (e) {
        console.error(e);
      }
    }
    const updated = [newArt, ...current];
    localStorage.setItem('custom_artworks', JSON.stringify(updated));
  };

  const handleAddTravel = async (travel: Omit<TravelLog, "id">) => {
    // Persist to actual database
    const { error } = await supabase.from('travel_posts').insert([
      {
        title: travel.title,
        location: travel.destination,
        cover_image: travel.image,
        content: travel.description
      }
    ]);
    if (error) {
      alert("여행 로그를 서버에 저장하지 못했습니다: " + error.message);
    } else {
      console.log("Travel post persisted to Supabase!");
    }
  };

  return (
    <main className="min-h-screen bg-[#fff8f4] dark:bg-[#1c1814] text-[#1f1b17] dark:text-[#f5ece5] transition-colors duration-300 pb-20 pt-16">
      <AdminView
        isAdmin={isAdmin}
        onLogin={handleLogin}
        onLogout={handleLogout}
        onAddArticle={handleAddArticle}
        onAddArtwork={handleAddArtwork}
        onAddTravel={handleAddTravel}
      />
    </main>
  );
}

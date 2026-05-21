'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { StoryView } from '@/components/StoryView';
import { Article } from '@/types';

export default function StoryPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check admin state from localStorage
    const logged = localStorage.getItem('family_admin_logged');
    setIsAdmin(logged === 'true');

    // Retrieve Papa's Chronicles
    const stored = localStorage.getItem('custom_articles');
    if (stored) {
      try {
        setArticles(JSON.parse(stored));
      } catch (e) {
        console.error(e);
      }
    } else {
      // Default premium articles matching the editorial curator theme
      const defaultArticles: Article[] = [
        {
          id: "art-1",
          title: "나무의 무늬를 읽는 시간",
          category: "REFLECTIONS",
          date: "2026.04.10",
          excerpt: "목공 작업실의 나무 옹이와 결에서 배우는 삶의 균형과 세월의 아름다움에 대한 기록.",
          content: `건축가로 살아가며 수많은 재료를 만나지만, 그중에서도 나무는 가장 인간적이고 온화한 소재입니다.
나무의 결을 하나하나 만지고 다듬다 보면, 그 생명이 견뎌낸 세월의 흔적이 오롯이 전해집니다.

옹이는 나무가 바람을 견뎌내며 단단해진 상처의 흔적이라고 합니다. 우리 삶 역시 다양한 일들과 바람을 마주하며, 깊고 단단한 무늬를 형성해 나가는 과정이 아닐까 조용히 자답해 봅니다.

마닐라의 오후, 서재 창밖으로 비치는 햇살 속에서 오늘도 나무의 무늬를 쓸어내리며 삶의 속도를 한 걸음 늦춰봅니다.`,
          image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&auto=format",
          author: "Papa",
          excerpt_kr: "나무 결이 지닌 삶의 온기와 성찰"
        } as any,
        {
          id: "art-2",
          title: "선과 면이 만드는 안식처",
          category: "ARCHITECTURE",
          date: "2026.04.28",
          excerpt: "인간을 품는 공간으로서의 건축이 갖는 본질적인 편안함과 조화에 대한 성찰.",
          content: `건축 설계란 단순히 시각적인 형태를 창조하는 일에 머물지 않습니다. 그것은 그 공간 안에서 숨 쉬고 살아갈 사람들의 하루와 감정을 설계하는 일입니다.

빛이 들어오는 각도, 바람이 통하는 길, 그리고 발걸음이 닿는 바닥의 감촉까지. 모든 요소들이 유기적으로 얽혀 비로소 하나의 안식처를 이룹니다.

가족의 공간인 'Once, Again'을 다듬으며 나는 선 하나, 면 하나에 우리 가족의 행복과 따스한 시선들을 듬뿍 담아내고자 애썼습니다.`,
          image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format",
          author: "Papa"
        } as any,
        {
          id: "art-3",
          title: "향기가 머무는 유산",
          category: "LEGACY",
          date: "2026.05.15",
          excerpt: "대물림되는 가족의 가치, 그리고 그 가치를 전하는 매개체로서의 기억과 향기.",
          content: `우리가 남길 수 있는 가장 고귀한 유산은 물질이 아닙니다. 그것은 언제든 꺼내어 볼 수 있는 따뜻한 기억의 도서관이자, 서로를 신뢰하고 격려하는 사랑의 가치관입니다.

이 작은 아카이브와 향기 브랜드는 우리 가족의 유산을 정성껏 정제해 담아낸 작은 씨앗입니다.

딸아이가 성장해 이 기록을 읽으며 아빠의 마음을 느끼고, 엄마의 여행을 보며 더 넓은 세상을 향해 꿈꾸기를 소망해 봅니다.`,
          image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format",
          author: "Papa"
        } as any
      ];
      setArticles(defaultArticles);
      localStorage.setItem('custom_articles', JSON.stringify(defaultArticles));
    }
  }, []);

  const handleDeleteArticle = (id: string) => {
    const updated = articles.filter(art => art.id !== id);
    setArticles(updated);
    localStorage.setItem('custom_articles', JSON.stringify(updated));
    alert('일지가 서재 서랍에서 정상적으로 정리되었습니다.');
  };

  return (
    <main className="min-h-screen bg-[#fff8f4] dark:bg-[#1c1814] transition-colors duration-300 pb-20 pt-8">
      
      {/* Back to Home Link */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <Link 
          href="/" 
          className="inline-flex items-center text-[10px] tracking-[0.3em] uppercase text-[#18241b]/50 dark:text-[#f5ece5]/50 hover:text-[#924c0a] dark:hover:text-[#e2a265] transition border-b border-transparent hover:border-[#924c0a] dark:hover:border-[#e2a265] pb-0.5"
        >
          ← Back to Home
        </Link>
      </div>

      <StoryView
        articles={articles}
        isAdmin={isAdmin}
        onDeleteArticle={handleDeleteArticle}
      />
    </main>
  );
}
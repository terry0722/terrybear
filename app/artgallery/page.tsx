'use client';
import { useState } from 'react';
import Link from 'next/link';

const artworks = [
  { id: 1, title: "Daughter's Art 01", date: "2026. 03", src: "/images/art/daughter_art_01.jpeg" },
  { id: 2, title: "Daughter's Art 02", date: "2026. 03", src: "/images/art/daughter_art_02.jpeg" },
  { id: 3, title: "Daughter's Art 03", date: "2026. 03", src: "/images/art/daughter_art_03.jpeg" },
];

export default function ArtGalleryPage() {
  // 팝업에 보여줄 선택된 이미지 상태 관리
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-white pb-20 pt-24 px-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-[10px] tracking-[0.3em] text-gray-400 hover:text-black uppercase">← Back</Link>
        <h1 className="text-3xl font-light tracking-[0.2em] mt-8 mb-16 text-gray-800">ART GALLERY</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {artworks.map((art) => (
            <div key={art.id} className="group cursor-pointer" onClick={() => setSelectedImage(art.src)}>
              <div className="aspect-[4/5] overflow-hidden bg-gray-50 border border-gray-100">
                {/* grayscale 클래스를 제거하고 hover 시 약간의 밝기 조절만 추가했습니다. */}
                <img 
                  src={art.src} 
                  alt={art.title} 
                  className="w-full h-full object-cover transition-all duration-500 hover:scale-105" 
                />
              </div>
              <p className="text-[10px] tracking-widest text-gray-400 mt-4 uppercase">{art.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 팝업 모달 (이미지가 선택되었을 때만 표시) */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 transition-opacity duration-300"
          onClick={() => setSelectedImage(null)} // 배경 클릭 시 닫기
        >
          <button 
            className="absolute top-10 right-10 text-white text-2xl font-light hover:text-gray-400 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            CLOSE
          </button>
          <div className="relative max-w-4xl max-h-[80vh] overflow-hidden">
            <img 
              src={selectedImage} 
              alt="Enlarged view" 
              className="w-full h-full object-contain shadow-2xl animate-in zoom-in-95 duration-
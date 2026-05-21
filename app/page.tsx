'use client';

import React, { useState } from "react";
import { ArrowRight, Sparkles, Heart } from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [selectedFamilyMember, setSelectedFamilyMember] = useState<string | null>(null);

  const familyMembers = [
    {
      id: "papa",
      name: "Papa 아빠",
      role: "Architect & Designer",
      koreanDesc: "기록의 건축가",
      description: "Our digital archive architect. He believes that the texture of a letter and the framing of a photograph are small containers of deep love. Constantly writing in leather journals at his study table in Manila.",
      avatar: "/papa.jpeg",
      fallbackAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?h=800&auto=format&fit=crop&q=80",
      quote: "기록하지 않으면 기억되지 않고, 기억되지 않으면 사라진다.",
      size: "md:col-span-2 aspect-[4/3] md:aspect-auto md:h-96",
    },
    {
      id: "dog",
      name: "Dog 댕댕이",
      role: "Loyal Guardian",
      koreanDesc: "우리의 보디가드",
      description: "Our brown shadow and loyal silent companion. He runs along the Manila seaside in the evening and guards each family member's study door with absolute warmth.",
      avatar: "/dog.jpeg",
      fallbackAvatar: "https://images.unsplash.com/photo-1517849845537-4d257902454a?h=600&auto=format&fit=crop&q=80",
      quote: "꼬리를 흔드는 것만으로도 온 세상을 위로한다.",
      size: "md:col-span-1 aspect-square md:h-96",
    },
    {
      id: "mama",
      name: "Mama 엄마",
      role: "Visual Marketer & Curation",
      koreanDesc: "삶의 큐레이터",
      description: "Quiet curator of our daily joy. She logs our tropical adventures, picks yellow flowers for the dining table, and finds the most magnificent coastal paths in Cebu and Jeju.",
      avatar: "/mama.jpeg",
      fallbackAvatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?h=800&auto=format&fit=crop&q=80",
      quote: "평범한 하루를 특별한 여행으로 바꾸는 힘.",
      size: "md:col-span-1 aspect-square md:h-[28rem]",
    },
    {
      id: "daughter",
      name: "Daughter 딸",
      role: "Student & Artist",
      koreanDesc: "꿈꾸는 아티스트",
      description: "Our local dreamer creating colors in Manila. She translates Philippine morning lights, underwater corals, and forest shadows into gorgeous watercolor and oil paintings.",
      avatar: "/daughter.jpeg",
      fallbackAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?h=800&auto=format&fit=crop&q=80",
      quote: "도화지 안에서 나는 어떤 바람이든 불게 할 수 있다.",
      size: "md:col-span-2 aspect-[4/3] md:aspect-auto md:h-[28rem]",
    },
  ];

  return (
    <div className="bg-[#fff8f4] dark:bg-[#1c1814] text-[#1f1b17] dark:text-[#f5ece5] py-6 md:py-12 px-4 sm:px-6 lg:px-8 space-y-16 md:space-y-24 transition-colors duration-300">
      
      {/* 1. HERO SECTION */}
      <section className="relative max-w-7xl mx-auto overflow-hidden rounded-2xl bg-[#18241b] text-white shadow-xl">
        <div className="absolute inset-0">
          <img
            src="/family.jpeg"
            alt="Family vintage moment"
            className="w-full h-full object-cover opacity-35 object-[center_35%]"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?h=1000&auto=format&fit=crop&q=80";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#18241b] via-[#18241b]/45 to-transparent" />
        </div>

        <div className="relative z-10 px-6 py-20 md:py-32 md:px-16 max-w-3xl flex flex-col items-start space-y-6">
          <span className="font-sans text-xs tracking-[0.3em] font-bold text-[#f5ece5]/80">
            FAMILY ARCHIVE PROJECT
          </span>
          
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#fff8f4] tracking-tight leading-[1.1] font-normal">
            Once, Again —
            <br />
            <span className="italic">our family moments.</span>
          </h1>

          <div className="w-16 h-[1px] bg-[#924c0a]" />

          <p className="font-serif text-sm sm:text-lg text-[#f5ece5]/90 leading-relaxed max-w-xl">
            Capturing <span className="text-[#e2a265] font-medium">다시 찾고 싶은</span> moments. 
            From our quiet, sun-drenched daily life in the Philippines to the nostalgic, cool scent of Korea.
          </p>

          <button
            onClick={() => router.push("/story")}
            className="group flex items-center space-x-2 bg-[#924c0a] hover:bg-[#a35e19] text-[#fff8f4] px-5 py-3 rounded font-sans text-xs tracking-widest font-semibold transition-all duration-300 mt-4 shadow-md cursor-pointer"
          >
            <span>ENTER THE STUDY</span>
            <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-300" />
          </button>
        </div>
      </section>

      {/* 2. THE FAMILY INTRO GRID (BENTO SYSTEM) */}
      <section className="max-w-7xl mx-auto space-y-8">
        <div className="text-center md:text-left">
          <span className="font-sans text-[10px] tracking-[0.3em] font-semibold text-[#924c0a] dark:text-[#e2a265]">
            ARCHIVE CHRONICLES
          </span>
          <h2 className="font-serif text-2xl md:text-4xl text-[#18241b] dark:text-[#f5ece5] mt-1 font-normal">
            Meet The Yoo Family <span className="font-sans text-lg text-[#18241b]/50 dark:text-[#f5ece5]/50">/ 유씨 가족</span>
          </h2>
          <p className="font-serif text-xs md:text-sm text-[#18241b]/60 dark:text-[#f5ece5]/60 italic mt-2">
            가족 구성원을 클릭하면 개인 일지와 대표 문구를 확인할 수 있습니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {familyMembers.map((member) => (
            <div
              key={member.id}
              onClick={() => setSelectedFamilyMember(selectedFamilyMember === member.id ? null : member.id)}
              className={`group relative overflow-hidden rounded-xl border border-[#18241b]/10 dark:border-[#f5ece5]/10 bg-[#f5ece5] dark:bg-[#2a2420] cursor-pointer transition-all duration-500 shadow-sm hover:shadow-md ${member.size} ${
                selectedFamilyMember === member.id ? "ring-2 ring-[#924c0a] dark:ring-[#e2a265] border-transparent" : ""
              }`}
            >
              {/* Profile Image with subtle zoom on hover */}
              <div className="absolute inset-0">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = member.fallbackAvatar;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1f1b17]/95 via-[#1f1b17]/40 to-transparent" />
              </div>

              {/* Text elements */}
              <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end text-[#fff8f4] space-y-2">
                <span className="font-serif text-xs text-[#e2a265] italic tracking-wide font-normal">
                  {member.koreanDesc} • {member.role}
                </span>
                <h3 className="font-serif text-lg sm:text-xl font-normal leading-none text-white tracking-wide">
                  {member.name}
                </h3>
                <p className="font-sans text-xs text-[#f5ece5]/85 leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                  {member.description}
                </p>

                {/* Expanded state widget */}
                {selectedFamilyMember === member.id && (
                  <div className="pt-3 border-t border-[#f5ece5]/20 mt-2 animate-fadeIn">
                    <span className="font-sans text-[9px] tracking-widest text-[#e2a265] uppercase font-bold block mb-1">
                      INSPIRED STATEMENT
                    </span>
                    <blockquote className="font-serif text-xs italic text-white bg-[#18241b]/60 px-3 py-2 rounded border-l-2 border-[#924c0a] dark:border-[#e2a265]">
                      "{member.quote}"
                    </blockquote>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. PULL QUOTE WITH GRAPHIC ELEMENTS */}
      <section className="max-w-4xl mx-auto py-12 md:py-16 text-center border-y border-[#18241b]/10 dark:border-[#f5ece5]/10 px-4">
        <Heart className="mx-auto text-[#924c0a]/65 dark:text-[#e2a265]/65 mb-6" size={24} />
        
        <p className="font-serif text-xl sm:text-3xl text-[#18241b] dark:text-[#f5ece5] leading-relaxed max-w-2xl mx-auto">
          "We believe that <span className="text-[#924c0a] dark:text-[#e2a265] italic font-medium">가장 소중한 것은 늘 가까이에</span> resides in the simplest, most everyday moments."
        </p>
        
        <p className="font-sans text-[10px] sm:text-xs tracking-[0.25em] text-[#18241b]/50 dark:text-[#f5ece5]/50 uppercase font-semibold mt-6">
          THE CONTINUOUS DOMESTIC MEMORY ARCHIVE PROJECT
        </p>
      </section>

      {/* 4. ROOTS & HEART EDITORIAL TEASER */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
        <div className="order-2 md:order-1 space-y-6">
          <span className="font-sans text-[10px] tracking-[0.3em] font-semibold text-[#924c0a] dark:text-[#e2a265]">
            CULTURAL HERITAGE
          </span>
          
          <h3 className="font-serif text-2xl md:text-4xl text-[#18241b] dark:text-[#f5ece5] leading-tight font-normal">
            Roots in Korea, 
            <br />
            <span className="italic text-[#924c0a] dark:text-[#e2a265]">Heart in Manila.</span>
          </h3>

          <p className="font-serif text-sm text-[#18241b]/75 dark:text-[#f5ece5]/75 leading-relaxed">
            The scent of ancient wood paneling from Bukchon and the deep crimson of sunsets over Manila Bay. Our family navigates the beautiful space between two vibrant shores, logging our thoughts, sketches, and travels into this digital archive.
          </p>

          <p className="font-serif text-xs text-[#18241b]/60 dark:text-[#f5ece5]/60 italic leading-relaxed">
            우리는 한국의 단단한 역사적 아름다움과 필리핀의 따뜻하고 생동감 있는 하늘을 함께 살아갑니다. 이 두 곳에서 찾은 조각들을 기록합니다.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => router.push("/story")}
              className="flex items-center space-x-2 bg-transparent hover:bg-[#18241b]/5 dark:hover:bg-[#f5ece5]/5 text-[#18241b] dark:text-[#f5ece5] font-sans text-xs tracking-widest font-bold border border-[#18241b] dark:border-[#f5ece5] hover:border-[#924c0a] dark:hover:border-[#e2a265] px-5 py-3 rounded transition-all duration-300 cursor-pointer"
            >
              <span>EXPLORE PAPA'S BLOG</span>
              <ArrowRight size={14} />
            </button>
            <button
              onClick={() => router.push("/gallery")}
              className="flex items-center space-x-2 bg-[#18241b] dark:bg-[#f5ece5] hover:bg-[#25362a] dark:hover:bg-[#f5ece5]/90 text-white dark:text-[#1c1814] font-sans text-xs tracking-widest font-bold px-5 py-3 rounded transition-all duration-300 cursor-pointer"
            >
              <span>VIEW ART GALLERY</span>
            </button>
          </div>
        </div>

        <div className="order-1 md:order-2 relative group aspect-[4/3] md:aspect-square overflow-hidden rounded-xl border border-[#18241b]/10 dark:border-[#f5ece5]/10 shadow-md">
          <img
            src="/papamama.jpeg"
            alt="Wooden aesthetic chair in shadows"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1513694203232-719a280e022f?h=810&auto=format&fit=crop&q=80";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#18241b]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
            <span className="font-serif text-xs italic text-white tracking-widest">
              "Echoes of Korea inside Manila homes."
            </span>
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="pb-20 text-center px-6 mt-20">
        <div className="w-12 h-[1px] bg-[#18241b]/10 dark:bg-[#f5ece5]/10 mx-auto mb-8"></div>
        <p className="text-[10px] tracking-[0.4em] text-[#18241b]/50 dark:text-[#f5ece5]/50 uppercase font-light">Global Family Archive Project</p>
        <p className="text-[11px] tracking-[0.2em] text-[#18241b]/40 dark:text-[#f5ece5]/40 uppercase mt-2 font-medium">
          © 2026 Once, Again | Manila, PH | Roots in Korea
        </p>
      </footer>

    </div>
  );
}
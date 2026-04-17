'use client';
import { useState, useEffect } from 'react';

// 풍성한 여행 스토리 데이터 구조
const trips = [
  { 
    id: 1, 
    location: "SINGAPORE", 
    title: "City of Lights", 
    date: "2025. 12", 
    src: "/images/travel/singapore_trip_01.jpeg",
    story: "눈부신 불빛들 사이로 걷던 싱가포르의 밤. 마리나 베이 샌즈의 야경과 식물원의 거대한 나무들이 마치 미래 도시에 온 듯한 환상을 심어주었다. 가족과 함께 걸었던 머라이언 파크의 습하고 더운 공기조차 잊을 수 없는 추억으로 남았다. 칠리 크랩의 황홀한 맛과 함께한 그해 겨울의 따뜻한 기억.",
    detailImages: [
      "/images/travel/singapore_trip_01.jpeg",
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&auto=format&fit=crop", // 임시 데모 이미지 (싱가포르)
      "https://images.unsplash.com/photo-1565967511849-76a60a516170?w=800&auto=format&fit=crop"
    ]
  },
  { 
    id: 2, 
    location: "TURKEY", 
    title: "Ancient Journey", 
    date: "2024. 08", 
    src: "/images/travel/turkey_trip_01.jpeg",
    story: "수천 년의 역사가 숨 쉬는 이스탄불부터, 동화 속 마을 같은 카파도키아의 하늘을 수놓은 열기구들까지. 동양과 서양이 만나는 튀르키예에서의 여정은 매 순간이 경이로움 그 자체였다. 새벽 공기를 가르며 떠오르던 열기구 위에서의 환호성, 그리고 따뜻한 터키식 홍차 한 잔의 여유.",
    detailImages: [
      "/images/travel/turkey_trip_01.jpeg",
      "https://images.unsplash.com/photo-1527838832700-5059252407fa?w=800&auto=format&fit=crop", // 임시 데모 이미지 (터키)
      "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&auto=format&fit=crop"
    ]
  },
];

export default function TravelPage() {
  const [selectedTrip, setSelectedTrip] = useState<typeof trips[0] | null>(null);

  // 팝업 열렸을 때 배경 스크롤 방지
  useEffect(() => {
    if (selectedTrip) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedTrip]);

  return (
    <main className="min-h-screen bg-[#fcfcfc] dark:bg-[#111111] transition-colors duration-300 pb-20">
      <div className="max-w-5xl mx-auto pt-24 px-6 mb-16 text-center">
        <h1 className="text-3xl font-light tracking-[0.2em] mb-4 text-gray-800 dark:text-white uppercase">Travel Archive</h1>
        <div className="w-8 h-[1px] bg-gray-300 dark:bg-gray-700 mx-auto mt-6"></div>
      </div>

      <div className="max-w-5xl mx-auto px-6 space-y-24">
        {trips.map((trip, index) => (
          <div 
            key={trip.id} 
            className="group flex flex-col md:flex-row gap-8 md:gap-12 items-center cursor-pointer animate-fade-in-up"
            style={{ animationDelay: `${index * 0.2}s` }}
            onClick={() => setSelectedTrip(trip)}
          >
            {/* 썸네일 영역 */}
            <div className="w-full md:w-2/3 aspect-video overflow-hidden shadow-sm dark:shadow-none bg-gray-100 dark:bg-gray-800 rounded-sm">
              <img 
                src={trip.src} 
                alt={trip.title} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                onError={(e) => { (e.target as any).src = 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&auto=format&fit=crop' }}
              />
            </div>
            
            {/* 텍스트 영역 */}
            <div className="w-full md:w-1/3 space-y-4 text-center md:text-left transition-transform duration-500 md:group-hover:translate-x-4">
              <span className="text-[10px] tracking-[0.4em] text-orange-600 dark:text-orange-400 font-medium uppercase block">
                {trip.location}
              </span>
              <h2 className="text-2xl font-light tracking-tight text-gray-800 dark:text-gray-100">
                {trip.title}
              </h2>
              <p className="text-[11px] text-gray-400 dark:text-gray-500 tracking-widest uppercase">
                {trip.date}
              </p>
              <div className="pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:block">
                <span className="text-xs border-b border-black dark:border-white pb-1 italic text-gray-800 dark:text-gray-200">
                  Read Story &rarr;
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 🚀 풀스크린 스토리 팝업 (Fullscreen Modal) */}
      <div 
        className={`fixed inset-0 z-[100] bg-white dark:bg-[#0a0a0a] transition-all duration-700 ease-in-out overflow-y-auto w-full h-full
          ${selectedTrip ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full pointer-events-none'}
        `}
      >
        {selectedTrip && (
          <div className="min-h-screen flex flex-col md:flex-row relative">
            {/* 닫기 버튼 */}
            <button 
              onClick={() => setSelectedTrip(null)}
              className="fixed top-6 right-6 md:top-8 md:right-10 z-50 w-12 h-12 flex items-center justify-center bg-black/10 dark:bg-white/10 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black rounded-full transition-all duration-300"
            >
              <span className="text-2xl font-light leading-none">&times;</span>
            </button>

            {/* 좌측: 세로로 늘어선 사진 나열 */}
            <div className="w-full md:w-1/2 bg-gray-50 dark:bg-black">
              {selectedTrip.detailImages.map((img, idx) => (
                <div key={idx} className="w-full relative border-b border-white dark:border-gray-900 border-4 md:border-0">
                  <img src={img} alt={`Trip memory ${idx+1}`} className="w-full h-auto object-cover" />
                </div>
              ))}
            </div>

            {/* 우측: 감성적인 기행문 텍스트 공간 */}
            <div className="w-full md:w-1/2 p-10 md:p-20 flex flex-col justify-center bg-white dark:bg-[#0a0a0a]">
              <div className="max-w-md mx-auto md:mx-0">
                <p className="text-[10px] tracking-[0.5em] text-orange-600 dark:text-orange-400 uppercase font-bold mb-6">
                  {selectedTrip.date} • {selectedTrip.location}
                </p>
                <h2 className="text-4xl md:text-5xl font-extralight tracking-tighter text-gray-900 dark:text-white mb-12 leading-tight">
                  {selectedTrip.title}
                </h2>
                <div className="w-12 h-[1px] bg-black dark:bg-gray-600 mb-12"></div>
                
                <p className="text-sm md:text-base leading-loose font-light text-gray-600 dark:text-gray-300 text-justify">
                  {selectedTrip.story}
                </p>

                <div className="mt-24 text-center md:text-left">
                  <span className="italic font-serif text-gray-300 dark:text-gray-700 text-lg">
                    Once, Again
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

    </main>
  );
}
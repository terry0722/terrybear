'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import PhotoUpload from '@/components/PhotoUpload';

// 풍성한 여행 스토리 데이터 구조
const trips = [
  { 
    id: 1, 
    slug: 'singapore', // 폴더명으로 사용될 고유 식별자
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
    slug: 'turkey', // 폴더명으로 사용될 고유 식별자
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
  const [user, setUser] = useState<any>(null);
  const [fetchedImages, setFetchedImages] = useState<string[]>([]); // 스토리지에서 가져온 추가 사진들

  // 1. 유저 인증 상태 확인
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
  }, []);

  // 2. 선택된 여행지가 바뀔 때마다 해당 여행지(slug) 폴더의 Storage 사진들을 Fetch
  useEffect(() => {
    const fetchTripPhotos = async () => {
      if (!selectedTrip) return;
      
      const { data, error } = await supabase.storage.from('travel').list(selectedTrip.slug);
      
      if (data && !error) {
        const urls = data
          .filter(file => file.name && file.name !== '.emptyFolderPlaceholder')
          .map(file => {
            // 폴더 내 파일이므로 경로에 slug 포함
            const path = `${selectedTrip.slug}/${file.name}`;
            return supabase.storage.from('travel').getPublicUrl(path).data.publicUrl;
          })
          .sort((a, b) => (a > b ? -1 : 1)); // 최신사진 위로
        
        setFetchedImages(urls);
      }
    };

    fetchTripPhotos();
  }, [selectedTrip]);

  // 팝업 열렸을 때 배경 스크롤 방지
  useEffect(() => {
    if (selectedTrip) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setFetchedImages([]); // 닫힐 때 초기화
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedTrip]);

  // 방금 올린 사진 즉각 반영
  const handleUploadSuccess = (newUrl: string) => {
    setFetchedImages([newUrl, ...fetchedImages]);
  };

  return (
    <main className="min-h-screen flex flex-col md:flex-row bg-[#E0FF00] dark:bg-[#1a1a1a] transition-colors duration-300">
      
      {/* =========================================
                     1. 메인 리스트 화면 
          ========================================= */}
      
      {/* 좌측 50%: Hero 섹션 (가장 최근 여행 강조) - 데스크탑 고정 사이즈 느낌 */}
      <div className="w-full md:w-1/2 md:h-screen md:sticky md:top-0 relative group overflow-hidden">
        <div className="absolute inset-0 bg-black/30 z-10 transition-opacity duration-300 group-hover:bg-black/10"></div>
        <img 
          src={trips[0].src} 
          alt="Hero Trip" 
          className="w-full h-[60vh] md:h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-4/5 text-center">
          <p className="text-white/80 font-bold tracking-[0.2em] uppercase text-xs mb-4 md:mb-6">
            Life
          </p>
          <h1 className="text-4xl md:text-6xl font-black text-white hover:italic transition-all duration-300 leading-tight md:leading-snug break-keep cursor-pointer" onClick={() => setSelectedTrip(trips[0])}>
            {trips[0].location}의 추억에<br/>입장하시겠습니까?
          </h1>
          <p className="text-white/60 font-light text-sm mt-6 mb-1">{trips[0].date}</p>
        </div>
      </div>

      {/* 우측 50%: 리스트(Grid) 뷰 (형광톤/다크톤 배경) */}
      <div className="w-full md:w-1/2 p-6 md:p-12 lg:p-20 overflow-y-auto z-10 pt-20 md:pt-24 border-t-2 md:border-t-0 md:border-l-2 border-black dark:border-white">
        <div className="flex justify-between items-end mb-12 border-b-4 border-black dark:border-white pb-4">
          <h2 className="text-3xl md:text-5xl font-black text-black dark:text-[#E0FF00] tracking-tighter uppercase">
            Travel Archive
          </h2>
          <span className="text-sm font-bold bg-black text-[#E0FF00] px-3 py-1 font-mono uppercase tracking-widest leading-none">
            {trips.length} Trips
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-10">
          {trips.map((trip) => (
            <div 
              key={trip.id} 
              className="flex flex-col cursor-pointer group"
              onClick={() => setSelectedTrip(trip)}
            >
              <div className="w-full aspect-[4/5] overflow-hidden bg-black mb-4 relative">
                 <div className="absolute top-3 left-3 bg-black text-white px-2 py-1 text-[10px] uppercase font-bold tracking-widest z-10">
                   Life
                 </div>
                 <img 
                   src={trip.src} 
                   alt={trip.title} 
                   className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
                   onError={(e) => { (e.target as any).src = 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&auto=format&fit=crop' }}
                 />
              </div>
              <h3 className="text-xl md:text-2xl font-black text-black dark:text-white leading-tight mb-2 group-hover:underline decoration-4 underline-offset-4 decoration-black dark:decoration-[#E0FF00]">
                {trip.title}
              </h3>
              <p className="text-xs text-gray-800 dark:text-gray-300 mb-3 line-clamp-2">
                {trip.story.substring(0, 50)}...
              </p>
              <div className="flex justify-between items-center mt-auto border-t border-black/20 dark:border-white/20 pt-3">
                <p className="text-[10px] text-black dark:text-[#E0FF00] font-bold tracking-widest font-mono">
                  {trip.date}
                </p>
                <div className="w-6 h-6 rounded-full bg-black flex justify-center items-center">
                  <span className="text-white text-[10px] italic">W</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* =========================================
                     2. 상세 모달 (디에디트 5:5 롤링) 
          ========================================= */}
      
      <div 
        className={`fixed inset-0 z-[100] bg-white dark:bg-[#111111] transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] w-full h-full overflow-hidden
          ${selectedTrip ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'}
        `}
      >
        {selectedTrip && (
          <div className="w-full h-full flex flex-col md:flex-row relative">
            
            {/* 공통: 닫기 버튼 */}
            <button 
              onClick={() => setSelectedTrip(null)}
              className="absolute top-4 right-4 md:top-8 md:right-8 w-12 h-12 z-50 rounded-none bg-[#E0FF00] text-black border-2 border-black text-2xl font-black flex items-center justify-center hover:bg-black hover:text-[#E0FF00] transition-colors"
            >
              X
            </button>

            {/* 상세 팝업 좌측 50%: 고정 사진 (Sticky 느낌) */}
            <div className="w-full md:w-1/2 h-[50vh] md:h-full bg-gray-100 border-b-4 md:border-b-0 md:border-r-4 border-black relative">
               <img src={selectedTrip.src} alt={selectedTrip.title} className="w-full h-full object-cover" />
            </div>

            {/* 상세 팝업 우측 50%: 거대 텍스트 및 사진 스크롤 롤링 영역 */}
            <div className="w-full md:w-1/2 h-[50vh] md:h-full overflow-y-auto bg-slate-50 dark:bg-black md:p-0">
               <div className="p-8 md:p-16 lg:p-24 relative">
                  
                  {/* Photo Upload */}
                  {user && (
                    <div className="mb-12 inline-block border-2 border-black p-2 bg-[#E0FF00] dark:bg-black dark:border-[#E0FF00]">
                       <PhotoUpload bucketName="travel" folderPath={selectedTrip.slug} onUploadSuccess={handleUploadSuccess} />
                    </div>
                  )}

                  <p className="text-[11px] font-bold tracking-widest text-black dark:text-white uppercase mb-4 border-b-2 border-black dark:border-white inline-block pb-1">
                    LIFE &middot; {selectedTrip.location}
                  </p>
                  
                  {/* The Edit 스타일 거대 볼드 타이틀 */}
                  <h2 className="text-5xl md:text-6xl lg:text-[5rem] font-black tracking-[-0.04em] text-black dark:text-white leading-[1.1] mb-8 break-keep">
                    {selectedTrip.title.split(' ').map((word, i) => (
                      <span key={i} className="border-b-[4px] md:border-b-[6px] border-black dark:border-[#E0FF00] mt-2 inline-block pb-1 mr-3">
                        {word}
                      </span>
                    ))}
                  </h2>

                  <p className="text-sm md:text-lg text-gray-800 dark:text-gray-300 font-medium mb-16 leading-relaxed">
                    진짜 아끼는 여행 기록만 골랐습니다
                  </p>
                  <p className="text-xs font-mono text-gray-500 mb-16">
                    {selectedTrip.date}
                  </p>

                  <div className="w-full h-px bg-black/20 dark:bg-white/20 mb-16"></div>

                  <p className="text-base md:text-lg leading-[2] font-light text-black dark:text-gray-100 mb-20 text-justify break-keep px-2">
                    {selectedTrip.story}
                  </p>
                  
                  {/* 스토리지 및 상세 사진 스크롤 */}
                  <h4 className="text-xl font-black border-l-8 border-[#E0FF00] pl-4 mb-8 dark:text-white">여행 갤러리</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {fetchedImages.map((img, idx) => (
                      <div key={`fetched-${idx}`} className="relative group border-2 border-transparent hover:border-[#E0FF00] transition">
                        <img src={img} alt="Uploaded" className="w-full h-auto object-cover aspect-video" />
                        <div className="absolute top-2 left-2 bg-[#E0FF00] text-black text-[9px] px-2 py-1 font-bold uppercase">New</div>
                      </div>
                    ))}

                    {selectedTrip.detailImages.map((img, idx) => (
                      <div key={`default-${idx}`} className="w-full border-2 border-transparent">
                        <img src={img} alt={`Trip memory ${idx+1}`} className="w-full h-auto object-cover aspect-square" />
                      </div>
                    ))}
                  </div>

               </div>
            </div>
          </div>
        )}
      </div>

    </main>
  );
}
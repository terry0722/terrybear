'use client'; // 🔽 1. 역동적인 기능을 위해 이 문구가 필수입니다!

import { useState } from 'react'; // 🔽 2. 상태 관리를 위한 도구를 가져옵니다.

export default function GalleryPage() {
  // --- 데이터 정의 (유지) ---
  const photos = [
    { src: "/family.jpeg", title: "우리의 주말", desc: "필리핀의 맑은 오후" },
    { src: "/daughter.jpeg", title: "작은 보물", desc: "웃음이 예쁜 우리 딸" },
    { src: "/dog.jpeg", title: "든든한 친구", desc: "낮잠 자는 댕댕이" },
    { src: "/papa.jpeg", title: "아빠의 시선", desc: "카메라 뒤의 기록" },
    { src: "/mama.jpeg", title: "엄마의 미소", desc: "행복한 순간" },
    { src: "/daughter2.jpeg", title: "성장 기록", desc: "하루하루가 소중해" }, // 스펠링 수정 완료!
  ];

  // 🔽 3. [상태 관리] 현재 선택된 사진이 무엇인지 기억하는 변수입니다.
  const [selectedPhoto, setSelectedPhoto] = useState<null | typeof photos[0]>(null);

  return (
    <main className="min-h-screen bg-[#f8f7f4] py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* 헤더 (유지) */}
        <div className="mb-16 text-center">
          <a href="/" className="text-[10px] tracking-[0.3em] uppercase text-gray-400 hover:text-black transition">Back to Home</a>
          <h1 className="text-3xl font-light mt-6 tracking-tight">가족 사진첩</h1>
          <div className="w-8 h-[1px] bg-gray-300 mx-auto mt-6"></div>
        </div>

        {/* 갤러리 그리드 */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {photos.map((photo, index) => (
            <div 
              key={index} 
              // 🔽 4. [기능 추가] 클릭하면 이 사진을 '선택된 사진'으로 지정합니다.
              onClick={() => setSelectedPhoto(photo)}
              className="break-inside-avoid group relative overflow-hidden bg-white rounded-xl shadow-sm transition-all duration-500 hover:shadow-xl cursor-pointer" // cursor-pointer 추가
            >
              <img 
                src={photo.src} 
                alt={photo.title}
                className="w-full h-auto object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 text-white">
                <p className="text-[10px] tracking-widest uppercase mb-1 opacity-80">{photo.desc}</p>
                <h4 className="text-lg font-light">{photo.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================= */}
      {/* 🔽 5. [신규 추가] 사진 확대 모달 (팝업) 부분 */}
      {/* selectedPhoto가 null이 아닐 때(사진이 선택되었을 때)만 아래 코드가 나타납니다. */}
      {selectedPhoto && (
        <div 
          // 🔽 배경을 클릭하면 팝업이 닫히도록 설정 (setSelectedPhoto(null))
          onClick={() => setSelectedPhoto(null)} 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center p-4 transition-all duration-300 ease-in-out cursor-zoom-out"
        >
          {/* 닫기 버튼 */}
          <button className="absolute top-6 right-6 text-white text-3xl hover:scale-110 transition-transform">&times;</button>
          
          {/* 확대된 이미지 (클릭해도 배경이 닫히지 않도록 e.stopPropagation() 추가) */}
          <div className="relative max-w-7xl max-h-[85vh] overflow-hidden rounded-lg shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <img 
              src={selectedPhoto.src} 
              alt={selectedPhoto.title}
              className="w-full h-full object-contain"
            />
          </div>

          {/* 사진 정보 표시 */}
          <div className="mt-6 text-center text-white" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-light tracking-tight">{selectedPhoto.title}</h3>
            <p className="text-sm text-gray-300 font-light mt-1">{selectedPhoto.desc}</p>
          </div>
        </div>
      )}
      {/* ========================================================= */}
    </main>
  );
}
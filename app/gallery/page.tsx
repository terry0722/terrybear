'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import PhotoUpload from '@/components/PhotoUpload';

export default function GalleryPage() {
  const [user, setUser] = useState<any>(null);

  const initialPhotos = [
    { src: "/family.jpeg", title: "우리의 주말", desc: "필리핀의 맑은 오후" },
    { src: "/daughter.jpeg", title: "작은 보물", desc: "웃음이 예쁜 우리 딸" },
    { src: "/dog.jpeg", title: "든든한 친구", desc: "낮잠 자는 댕댕이" },
    { src: "/papa.jpeg", title: "아빠의 시선", desc: "카메라 뒤의 기록" },
    { src: "/mama.jpeg", title: "엄마의 미소", desc: "행복한 순간" },
    { src: "/daughter2.jpeg", title: "성장 기록", desc: "하루하루가 소중해" },
  ];

  const [photos, setPhotos] = useState(initialPhotos);
  const [selectedPhoto, setSelectedPhoto] = useState<null | typeof initialPhotos[0]>(null);

  // 로그인 상태 및 Storage에 업로드된 사진 불러오기
  useEffect(() => {
    // 1. 유저 상태 확인
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));

    // 2. Storage에서 'gallery' 버킷의 모든 업로드 사진 불러오기
    const fetchStoragePhotos = async () => {
      const { data, error } = await supabase.storage.from('gallery').list();
      
      if (error) {
        console.error("스토리지 사진 로드 오류:", error);
        return;
      }

      if (data) {
        // 숨김 파일이나 빈 폴더 placeholder를 제외
        const uploadedPhotos = data
          .filter(file => file.name && file.name !== '.emptyFolderPlaceholder')
          .map(file => {
            const publicUrl = supabase.storage.from('gallery').getPublicUrl(file.name).data.publicUrl;
            return {
              src: publicUrl,
              title: "Family Memory",
              desc: "최근 업로드 됨",
            };
          })
          // 최신 사진이 위로 오도록 이름 또는 생성일 기준 정렬
          .sort((a, b) => (a.src > b.src ? -1 : 1));

        setPhotos([...uploadedPhotos, ...initialPhotos]);
      }
    };

    fetchStoragePhotos();
  }, []);

  // 업로드 성공 시 사진 목록 최상단에 하나 붙이기 (새로고침 전 즉각 반영)
  const handleUploadSuccess = (newUrl: string) => {
    const newPhoto = {
      src: newUrl,
      title: "방금 올린 사진",
      desc: "우리의 새로운 이야기",
    };
    setPhotos([newPhoto, ...photos]);
  };

  return (
    <main className="min-h-screen bg-[#fcfcfc] dark:bg-[#111111] transition-colors duration-300 py-12 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-light tracking-tight text-black dark:text-white">가족 사진첩</h1>
          <div className="w-8 h-[1px] bg-gray-300 dark:bg-gray-700 mx-auto mt-6"></div>
        </div>

        {/* 로그인한 사용자만 보이는 업로드 컴포넌트 */}
        {user && <PhotoUpload bucketName="gallery" onUploadSuccess={handleUploadSuccess} />}

        {/* 갤러리 그리드 */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {photos.map((photo, index) => (
            <div 
              key={index} 
              onClick={() => setSelectedPhoto(photo)}
              // 순차적인 애니메이션 지연(delay) 부여 및 클래스 적용
              style={{ animationDelay: `${index * 0.1}s` }}
              className="animate-fade-in-up break-inside-avoid group relative overflow-hidden bg-white dark:bg-gray-800 rounded-xl shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
            >
              <img 
                src={photo.src} 
                alt={photo.title}
                className="w-full h-auto object-cover transition duration-700 group-hover:scale-105"
                onError={(e) => { (e.target as any).src = 'https://via.placeholder.com/800x600?text=Photo' }}
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
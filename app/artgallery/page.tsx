'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import PhotoUpload from '@/components/PhotoUpload';
import { GalleryView } from '@/components/GalleryView';
import { Artwork } from '@/types';

export default function ArtGalleryPage() {
  const [user, setUser] = useState<any>(null);
  
  const initialArtworks: Artwork[] = [
    { id: "artw-1", title: "Summer by the Reef", date: "2026. 03", medium: "Watercolor on Paper", image: "/images/art/daughter_art_01.jpeg" },
    { id: "artw-2", title: "Forest Ferns & Canopy", date: "2026. 03", medium: "Watercolor on Paper", image: "/images/art/daughter_art_02.jpeg" },
    { id: "artw-3", title: "Charcoal Lagoon Shade", date: "2026. 03", medium: "Charcoal on Paper", image: "/images/art/daughter_art_03.jpeg" },
  ];

  const [artworks, setArtworks] = useState<Artwork[]>(initialArtworks);

  // Storage에서 'art_gallery' 정보 가져오기
  const fetchArtworks = useCallback(async () => {
    const { data, error } = await supabase.storage.from('art_gallery').list();
    
    if (data && !error) {
      const uploadedArts = data
        .filter(file => file.name && file.name !== '.emptyFolderPlaceholder')
        .map((file, idx) => {
          const publicUrl = supabase.storage.from('art_gallery').getPublicUrl(file.name).data.publicUrl;
          
          // 파일명에서 난수 제거하고 본래 이름 유추해 타이틀 생성
          let cleanTitle = "Family Art";
          if (file.name) {
            const baseName = file.name.split('_')[0];
            if (baseName && baseName.length > 2) {
              cleanTitle = baseName.substring(0, 20);
            }
          }

          return {
            id: "storage-" + file.name,
            title: cleanTitle,
            date: file.created_at ? new Date(file.created_at).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit' }) : "최근 작품",
            medium: "Watercolor on Paper", // 기본 매체 종류 지정
            image: publicUrl,
          };
        })
      const stored = localStorage.getItem('custom_artworks');
      let customArts: Artwork[] = [];
      if (stored) {
        try {
          customArts = JSON.parse(stored);
        } catch (e) {
          console.error(e);
        }
      }
      setArtworks([...customArts, ...uploadedArts, ...initialArtworks]);
    }
  }, [initialArtworks]);

  useEffect(() => {
    // 유저 상태
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
    fetchArtworks();
  }, [fetchArtworks]);

  const handleUploadSuccess = (newUrl: string) => {
    const fileName = newUrl.split('/').pop() || 'new_art';
    const newArt: Artwork = {
      id: "storage-" + fileName,
      title: "새로운 작품",
      date: new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit' }),
      medium: "Watercolor on Paper",
      image: newUrl,
    };
    setArtworks([newArt, ...artworks]);
  };

  const handleDeleteArtwork = async (id: string) => {
    if (id.startsWith("storage-")) {
      const fileName = id.replace("storage-", "");
      const { error } = await supabase.storage.from('art_gallery').remove([fileName]);
      if (error) {
        alert("삭제에 실패했습니다: " + error.message);
      } else {
        alert("성공적으로 작품이 삭제되었습니다.");
        fetchArtworks();
      }
    } else if (id.startsWith("custom-art-")) {
      const stored = localStorage.getItem('custom_artworks');
      if (stored) {
        try {
          const current: Artwork[] = JSON.parse(stored);
          const updated = current.filter(art => art.id !== id);
          localStorage.setItem('custom_artworks', JSON.stringify(updated));
          setArtworks(prev => prev.filter(art => art.id !== id));
          alert("성공적으로 작품이 삭제되었습니다.");
        } catch (e) {
          console.error(e);
        }
      }
    } else {
      // 로컬 초기 데이터는 상태에서만 임시 제거
      setArtworks(prev => prev.filter(art => art.id !== id));
      alert("기본 전시 작품이 목록에서 임시 제외되었습니다.");
    }
  };

  return (
    <main className="min-h-screen bg-[#fff8f4] dark:bg-[#1c1814] text-[#1f1b17] dark:text-[#f5ece5] transition-colors duration-300 pb-20 px-6 pt-16">
      
      {/* 관리자 업로드 UI */}
      {user && (
        <div className="max-w-7xl mx-auto mb-10">
          <PhotoUpload bucketName="art_gallery" onUploadSuccess={handleUploadSuccess} />
        </div>
      )}

      {/* GalleryView 컴포넌트 렌더링 */}
      <GalleryView 
        artworks={artworks} 
        isAdmin={!!user} 
        onDeleteArtwork={handleDeleteArtwork} 
      />

    </main>
  );
}
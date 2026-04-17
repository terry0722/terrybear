'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import PhotoUpload from '@/components/PhotoUpload';

export default function ArtGalleryPage() {
  const [user, setUser] = useState<any>(null);
  
  const initialArtworks = [
    { id: 1, title: "Daughter's Art 01", date: "2026. 03", src: "/images/art/daughter_art_01.jpeg" },
    { id: 2, title: "Daughter's Art 02", date: "2026. 03", src: "/images/art/daughter_art_02.jpeg" },
    { id: 3, title: "Daughter's Art 03", date: "2026. 03", src: "/images/art/daughter_art_03.jpeg" },
  ];

  const [artworks, setArtworks] = useState<any[]>(initialArtworks);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    // 유저 상태
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));

    // Storage에서 'art_gallery' 정보 가져오기
    const fetchArtworks = async () => {
      const { data, error } = await supabase.storage.from('art_gallery').list();
      
      if (data && !error) {
        const uploadedArts = data
          .filter(file => file.name && file.name !== '.emptyFolderPlaceholder')
          .map((file, idx) => {
            const publicUrl = supabase.storage.from('art_gallery').getPublicUrl(file.name).data.publicUrl;
            return {
              id: 100 + idx, // 임시 ID
              title: "Family Art",
              date: "최근 작품",
              src: publicUrl,
            };
          })
          .sort((a, b) => (a.src > b.src ? -1 : 1));

        setArtworks([...uploadedArts, ...initialArtworks]);
      }
    };

    fetchArtworks();
  }, []);

  const handleUploadSuccess = (newUrl: string) => {
    const newArt = {
      id: Date.now(),
      title: "새로운 별작",
      date: "오늘",
      src: newUrl,
    };
    setArtworks([newArt, ...artworks]);
  };

  return (
    <main className="min-h-screen bg-[#fcfcfc] dark:bg-[#111111] transition-colors duration-300 pb-20 px-6">
      <div className="max-w-5xl mx-auto pt-16">
        <h1 className="text-3xl font-light tracking-[0.2em] mb-12 text-center uppercase text-black dark:text-white">ART GALLERY</h1>
        
        {user && <PhotoUpload bucketName="art_gallery" onUploadSuccess={handleUploadSuccess} />}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12">
          {artworks.map((art, index) => (
            <div 
              key={art.id} 
              className="group cursor-pointer animate-fade-in-up" 
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedImage(art.src)}
            >
              <div className="aspect-[4/5] overflow-hidden bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-800 shadow-sm transition-all duration-300 group-hover:shadow-lg rounded-sm">
                <img 
                  src={art.src} 
                  alt={art.title} 
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" 
                  onError={(e) => { (e.target as any).src = 'https://via.placeholder.com/600x800?text=Art' }}
                />
              </div>
              <p className="text-[11px] tracking-widest text-gray-500 dark:text-gray-400 mt-4 uppercase font-medium">{art.title}</p>
              <p className="text-[9px] tracking-widest text-gray-300 dark:text-gray-600 mt-1 uppercase">{art.date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 팝업 모달 */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 cursor-zoom-out transition-opacity duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-8 right-8 text-white text-3xl font-light hover:text-yellow-400 hover:rotate-90 transition-all duration-300"
            onClick={() => setSelectedImage(null)}
          >
            &times;
          </button>
          <div className="relative max-w-5xl max-h-[85vh] overflow-hidden rounded-md shadow-2xl" onClick={e => e.stopPropagation()}>
            <img 
              src={selectedImage} 
              alt="Enlarged Art" 
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}
    </main>
  );
}
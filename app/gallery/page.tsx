'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import PhotoUpload from '@/components/PhotoUpload';
import CreateMomentModal from '@/components/CreateMomentModal';
import { Moment, Category } from '@/types';
import { Camera, MapPin, Calendar, Layers, ZoomIn, X, PlusCircle } from 'lucide-react';

export default function GalleryPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [lightboxMoment, setLightboxMoment] = useState<Moment | null>(null);

  const categories = ["ALL", "Daily Life", "Heritage", "Celebrations", "Holidays", "Travel"];

  const defaultMoments: Moment[] = [
    {
      id: "default-1",
      category: "Daily Life",
      title: "boardwalk slow steps",
      description: "A warm afternoon walk along the seaside, feeling the cool ocean breeze.",
      date: "September 1992",
      imageUrl: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&q=80&w=800",
      location: "Manila, PH",
      details: "This vintage photograph captures the slow, sun-drenched steps we took on the Antipolo boardwalk. The sunset was painting the sky in soft violet and gold. We held warm paper bags of roasted nuts and spoke about where our next designs would take us."
    },
    {
      id: "default-2",
      category: "Heritage",
      title: "cozy living corner",
      description: "Quiet hours surrounded by old books, green ferns, and family letters.",
      date: "December 1995",
      imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800",
      location: "Seoul, KR",
      details: "Winter in Bukchon, sitting near the window with steam rising from barley tea. A nostalgic space where old architectures met our daily lives, and we wrote leather journal logs to pass down the values we hold."
    },
    {
      id: "default-3",
      category: "Travel",
      title: "sunset highlands memory",
      description: "Nostalgic golden field with misty hills in the sunset.",
      date: "Summer of '85",
      imageUrl: "https://images.unsplash.com/photo-1472214222541-d510753a8707?auto=format&fit=crop&q=80&w=800",
      location: "Cebu, PH",
      details: "Misty highlands where we watched the sunset melt into the fields. The air smelled of woodpine and damp grass. We recorded this moment to remember that the most beautiful things in life are nearby."
    }
  ];

  const [moments, setMoments] = useState<Moment[]>(defaultMoments);

  // Sync admin state and fetch moments
  const fetchMoments = useCallback(async () => {
    // 1. Fetch from Supabase storage ('gallery' bucket)
    const { data: storageData, error: storageError } = await supabase.storage.from('gallery').list();
    let storageMoments: Moment[] = [];

    if (storageData && !storageError) {
      storageMoments = storageData
        .filter(file => file.name && file.name !== '.emptyFolderPlaceholder')
        .map(file => {
          const publicUrl = supabase.storage.from('gallery').getPublicUrl(file.name).data.publicUrl;
          
          let cleanTitle = "Family Moment";
          if (file.name) {
            const baseName = file.name.split('_')[0];
            if (baseName && baseName.length > 2) {
              cleanTitle = baseName.substring(0, 20);
            }
          }

          return {
            id: "storage-" + file.name,
            category: "Daily Life" as Category,
            title: cleanTitle,
            description: "최근 스토리지에 업로드된 가족의 추억 사진입니다.",
            date: file.created_at ? new Date(file.created_at).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit' }) : "최근",
            imageUrl: publicUrl,
            location: "Manila, PH",
            details: "스토리지를 통해 아카이브에 기여된 사진 기록입니다."
          };
        });
    }

    // 2. Fetch from LocalStorage
    const stored = localStorage.getItem('custom_moments');
    let customMoments: Moment[] = [];
    if (stored) {
      try {
        customMoments = JSON.parse(stored);
      } catch (e) {
        console.error(e);
      }
    }

    // Combine all
    setMoments([...customMoments, ...storageMoments, ...defaultMoments]);
  }, []);

  useEffect(() => {
    const logged = localStorage.getItem('family_admin_logged');
    setIsAdmin(logged === 'true');
    fetchMoments();
  }, [fetchMoments]);

  const handleUploadSuccess = (newUrl: string) => {
    const fileName = newUrl.split('/').pop() || 'new_moment';
    const newMoment: Moment = {
      id: "storage-" + fileName,
      category: "Daily Life",
      title: "스토리지 추억 사진",
      description: "방금 추가된 소중한 가족의 기록입니다.",
      date: new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit' }),
      imageUrl: newUrl,
      location: "Manila, PH",
      details: "방금 스토리지에 기여된 사진입니다."
    };
    setMoments(prev => [newMoment, ...prev]);
  };

  const handleSaveMoment = (newMoment: Omit<Moment, 'comments'>) => {
    const stored = localStorage.getItem('custom_moments');
    let current: Moment[] = [];
    if (stored) {
      try {
        current = JSON.parse(stored);
      } catch (e) {
        console.error(e);
      }
    }
    const updated = [newMoment as Moment, ...current];
    localStorage.setItem('custom_moments', JSON.stringify(updated));
    setMoments(prev => [newMoment as Moment, ...prev]);
    alert("새로운 가족의 순간이 아카이브에 성공적으로 기록되었습니다.");
  };

  const handleDeleteMoment = async (id: string) => {
    if (id.startsWith("storage-")) {
      const fileName = id.replace("storage-", "");
      const { error } = await supabase.storage.from('gallery').remove([fileName]);
      if (error) {
        alert("삭제 실패: " + error.message);
      } else {
        alert("스토리지에서 사진이 성공적으로 삭제되었습니다.");
        fetchMoments();
      }
    } else if (id.startsWith("moment-")) {
      const stored = localStorage.getItem('custom_moments');
      if (stored) {
        try {
          const current: Moment[] = JSON.parse(stored);
          const updated = current.filter(m => m.id !== id);
          localStorage.setItem('custom_moments', JSON.stringify(updated));
          setMoments(prev => prev.filter(m => m.id !== id));
          alert("추억 기록이 아카이브에서 안전하게 제외되었습니다.");
        } catch (e) {
          console.error(e);
        }
      }
    } else {
      setMoments(prev => prev.filter(m => m.id !== id));
      alert("기본 아카이브 리소스가 목록에서 임시 제외되었습니다.");
    }
  };

  const filteredMoments = useMemo(() => {
    if (selectedCategory === "ALL") return moments;
    return moments.filter(
      (m) => m.category.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [moments, selectedCategory]);

  return (
    <main className="min-h-screen bg-[#fff8f4] dark:bg-[#1c1814] text-[#1f1b17] dark:text-[#f5ece5] transition-colors duration-300 pb-20 pt-8 px-6">
      
      {/* Navigation Top Bar */}
      <div className="max-w-7xl mx-auto flex justify-between items-center mb-10">
        <Link 
          href="/" 
          className="inline-flex items-center text-[10px] tracking-[0.3em] uppercase text-[#18241b]/50 dark:text-[#f5ece5]/50 hover:text-[#924c0a] dark:hover:text-[#e2a265] transition border-b border-transparent hover:border-[#924c0a] dark:hover:border-[#e2a265] pb-0.5"
        >
          ← Back to Home
        </Link>
        
        {isAdmin && (
          <button 
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center space-x-1.5 bg-[#924c0a] hover:bg-[#a35e19] text-[#fff8f4] font-semibold text-[10px] px-3.5 py-1.5 rounded uppercase tracking-widest transition shadow-sm cursor-pointer"
          >
            <PlusCircle size={12} />
            <span>Document Moment</span>
          </button>
        )}
      </div>

      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="border-b border-[#18241b]/10 dark:border-[#f5ece5]/10 pb-6 text-center md:text-left flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <span className="font-sans text-[10px] tracking-[0.3em] font-semibold text-[#924c0a] dark:text-[#e2a265] uppercase">
              HEIRLOOM GALLERY / 가족 사진과 순간들
            </span>
            <h1 className="font-serif text-3xl md:text-4xl text-[#18241b] dark:text-[#f5ece5] mt-1 font-normal">
              Moments Archive
            </h1>
            <p className="font-serif text-xs md:text-sm text-[#18241b]/60 dark:text-[#f5ece5]/60 italic mt-2">
              가족이 나란히 걷던 길, 오래 머무른 거실, 바다를 바라보며 나눈 조용한 성찰의 기억들.
            </p>
          </div>
          <div className="flex justify-center md:justify-end">
            <span className="inline-flex items-center space-x-2 text-xs font-sans font-semibold border-b border-[#924c0a] dark:border-[#e2a265] py-1 text-[#924c0a] dark:text-[#e2a265]">
              <Camera size={14} />
              <span>{filteredMoments.length} MOMENTS RECORDED</span>
            </span>
          </div>
        </div>

        {/* Admin File Upload Panel */}
        {isAdmin && (
          <div className="bg-[#f5ece5]/50 dark:bg-[#2a2420]/50 border border-[#18241b]/10 dark:border-[#f5ece5]/10 rounded-xl p-5">
            <h3 className="font-serif text-xs font-bold text-[#18241b] dark:text-[#f5ece5] mb-3 uppercase tracking-wider">
              Quick Image Upload to Storage
            </h3>
            <PhotoUpload bucketName="gallery" onUploadSuccess={handleUploadSuccess} />
          </div>
        )}

        {/* Category Filters Bar */}
        <section className="flex flex-col sm:flex-row items-center justify-between border-y border-[#18241b]/10 dark:border-[#f5ece5]/10 py-5 gap-4">
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-sans tracking-widest font-bold cursor-pointer rounded transition-all ${
                  selectedCategory === cat
                    ? "bg-[#18241b] dark:bg-[#e2a265] text-[#fff8f4] dark:text-[#1c1814] shadow-sm"
                    : "text-[#18241b]/70 dark:text-[#f5ece5]/70 hover:bg-[#18241b]/5 dark:hover:bg-[#f5ece5]/5 hover:text-[#18241b] dark:hover:text-[#f5ece5]"
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
          <span className="font-sans text-[10px] text-[#18241b]/50 dark:text-[#f5ece5]/50 tracking-wider">
            FILTERED VIEW
          </span>
        </section>

        {/* Grid/Masonry Layout for Moments */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMoments.map((moment) => (
            <div
              key={moment.id}
              className="group block overflow-hidden rounded-xl bg-white dark:bg-[#2a2420] border border-[#18241b]/10 dark:border-[#f5ece5]/10 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              {/* Photo Image Card */}
              <div 
                onClick={() => setLightboxMoment(moment)}
                className="aspect-[4/3] w-full overflow-hidden bg-[#f5ece5] dark:bg-[#1c1814] relative cursor-pointer"
              >
                <img
                  src={moment.imageUrl}
                  alt={moment.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-104"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-500" />
                <div className="absolute top-3 right-3 bg-white/80 dark:bg-[#2a2420]/80 backdrop-blur-md p-1.5 rounded-full text-[#18241b] dark:text-[#f5ece5] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ZoomIn size={14} />
                </div>
              </div>

              {/* Moment Info */}
              <div className="p-5 space-y-2 flex-grow flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-[9px] tracking-widest text-[#924c0a] dark:text-[#e2a265] font-bold uppercase">
                      {moment.category}
                    </span>
                    <span className="font-sans text-[10px] text-[#18241b]/45 dark:text-[#f5ece5]/45 italic font-medium">
                      {moment.date}
                    </span>
                  </div>

                  <h3 className="font-serif text-base sm:text-lg text-[#18241b] dark:text-[#f5ece5] leading-snug group-hover:text-[#924c0a] dark:group-hover:text-[#e2a265] transition-colors font-normal">
                    {moment.title}
                  </h3>

                  <p className="font-sans text-xs text-[#18241b]/70 dark:text-[#f5ece5]/70 line-clamp-2 leading-relaxed">
                    {moment.description}
                  </p>
                </div>

                <div className="flex justify-between items-center pt-3 mt-4 text-[10px] text-[#18241b]/40 dark:text-[#f5ece5]/40 font-semibold tracking-wider font-sans border-t border-[#18241b]/5 dark:border-[#f5ece5]/5">
                  <span className="flex items-center gap-1">
                    <MapPin size={10} />
                    <span>{moment.location || "Manila, PH"}</span>
                  </span>

                  {/* Admin Dismiss Button */}
                  {isAdmin && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm(`Do you wish to remove "${moment.title}" from the archive?`)) {
                          handleDeleteMoment(moment.id);
                        }
                      }}
                      className="text-red-800 dark:text-red-400 hover:underline cursor-pointer tracking-widest text-[9px]"
                    >
                      DISMISS MOMENT
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>

      {/* Editorial Lightbox for Detail Narrative */}
      {lightboxMoment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 animate-fadeIn overflow-y-auto">
          <div className="absolute inset-0 cursor-pointer" onClick={() => setLightboxMoment(null)} />
          
          <div className="relative bg-[#fff8f4] dark:bg-[#2a2420] rounded-xl max-w-4xl w-full mx-auto overflow-hidden shadow-2xl z-10 flex flex-col md:flex-row border border-[#18241b]/10 dark:border-[#f5ece5]/10">
            {/* Image panel */}
            <div className="p-4 bg-stone-900 md:w-3/5 flex items-center justify-center min-h-[300px] max-h-[70vh]">
              <img
                src={lightboxMoment.imageUrl}
                alt={lightboxMoment.title}
                className="max-w-full max-h-[60vh] object-contain rounded"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Info panel */}
            <div className="p-6 md:p-8 md:w-2/5 flex flex-col justify-between space-y-6 text-[#1f1b17] dark:text-[#f5ece5]">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-sans text-[9px] tracking-widest text-[#924c0a] dark:text-[#e2a265] font-bold uppercase">
                    {lightboxMoment.category} RECORD
                  </span>
                  <button
                    onClick={() => setLightboxMoment(null)}
                    className="p-1 text-[#18241b]/50 dark:text-[#f5ece5]/50 hover:text-[#18241b] dark:hover:text-[#f5ece5] focus:outline-none cursor-pointer"
                  >
                    <X size={20} />
                  </button>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl text-[#18241b] dark:text-[#f5ece5] tracking-wide font-normal">
                  {lightboxMoment.title}
                </h3>
                <div className="w-12 h-[1px] bg-[#924c0a] dark:bg-[#e2a265]" />

                <div className="space-y-3 pt-2">
                  <div>
                    <span className="font-sans text-[10px] text-[#18241b]/40 dark:text-[#f5ece5]/40 block uppercase tracking-widest">GEOGRAPHIC LOCATION</span>
                    <span className="font-serif text-sm text-[#18241b] dark:text-[#f5ece5]">
                      {lightboxMoment.location || "Manila, PH"}
                    </span>
                  </div>
                  <div>
                    <span className="font-sans text-[10px] text-[#18241b]/40 dark:text-[#f5ece5]/40 block uppercase tracking-widest">RECORDED ERA</span>
                    <span className="font-serif text-sm text-[#18241b] dark:text-[#f5ece5]">{lightboxMoment.date}</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-[#18241b]/10 dark:border-[#f5ece5]/10 bg-[#f5ece5]/30 dark:bg-[#1c1814]/30 p-4 rounded-lg">
                <span className="font-sans text-[9px] tracking-widest text-[#18241b]/50 dark:text-[#f5ece5]/50 uppercase font-semibold block">BEHIND THE CAMERA</span>
                <p className="font-serif text-xs text-[#18241b]/70 dark:text-[#f5ece5]/70 leading-relaxed italic mt-1 font-normal">
                  "{lightboxMoment.details || lightboxMoment.description}"
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Creation Modal */}
      <CreateMomentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveMoment}
      />
    </main>
  );
}
'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import PhotoUpload from '@/components/PhotoUpload';
import Link from 'next/link';

export default function TravelWritePage() {
  const router = useRouter();
  const editorRef = useRef<HTMLDivElement>(null);

  const [user, setUser] = useState<any>(null);
  const [location, setLocation] = useState('');
  const [title, setTitle] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) router.push('/travel');
      setUser(user);
    });
  }, [router]);

  // 커버 이미지 업로드 콜백
  const handleCoverUpload = (url: string) => {
    setCoverImage(url);
  };

  // 본문 안 삽입용 이미지 업로드 콜백
  const handleBodyImageUpload = (url: string) => {
    if (editorRef.current) {
      editorRef.current.focus();
      // contentEditable 영역에 수동으로 img 태그 삽입
      document.execCommand('insertHTML', false, `
        <div style="margin: 2rem 0; width: 100%;">
          <img src="${url}" alt="Article Image" style="max-width: 100%; height: auto; display: block; border-radius: 8px;" />
        </div>
        <p><br/></p>
      `);
    }
  };

  // 에디터 서식 버튼들
  const execCmd = (command: string, value?: string) => {
    document.execCommand('styleWithCSS', false, 'true');
    document.execCommand(command, false, value);
    if (editorRef.current) editorRef.current.focus();
  };

  const handlePublish = async () => {
    if (!title || !location || !editorRef.current) {
      alert("제목과 여행지, 그리고 본문을 모두 작성해주세요.");
      return;
    }
    setIsPublishing(true);

    const contentHtml = editorRef.current.innerHTML;

    // Supabase DB Insert
    const { error } = await supabase
      .from('travel_posts')
      .insert([
        {
          location,
          title,
          cover_image: coverImage || 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&auto=format&fit=crop',
          content: contentHtml
        }
      ]);

    if (error) {
      console.error(error);
      alert(`오류 발생 원인: ${error.message} \n\n자세한 정보: ${error.details || ''} \n\nTable(travel_posts) 세팅에서 오타나 RLS 설정을 다시 확인해주세요.`);
    } else {
      router.push('/travel');
    }
    setIsPublishing(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#fff8f4] dark:bg-[#1c1814] flex items-center justify-center text-[#924c0a] dark:text-[#e2a265] font-serif tracking-widest uppercase">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#fff8f4] dark:bg-[#1c1814] text-[#1f1b17] dark:text-[#f5ece5] pb-32 transition-colors duration-300">
      {/* 관리자(에디터) 상단 헤더 */}
      <div className="w-full bg-[#fff8f4] dark:bg-[#1c1814] border-b border-[#18241b]/10 dark:border-[#f5ece5]/10 p-4 sticky top-0 z-50 flex justify-between items-center px-4 md:px-12">
        <Link href="/travel" className="text-xs font-semibold uppercase tracking-widest text-[#18241b]/50 dark:text-[#f5ece5]/50 hover:text-[#924c0a] dark:hover:text-[#e2a265]">
          ← Back
        </Link>
        <div className="flex gap-4">
          <button 
            onClick={handlePublish} 
            disabled={isPublishing} 
            className="bg-[#924c0a] hover:bg-[#a35e19] text-[#fff8f4] dark:bg-[#e2a265] dark:text-[#1c1814] dark:hover:bg-[#f5ece5] px-6 py-2.5 text-xs font-semibold rounded uppercase tracking-widest transition-all disabled:opacity-50 cursor-pointer shadow-sm"
          >
            {isPublishing ? 'PUBLISHING...' : '퍼블리시 ( 발행하기 )'}
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-12 px-6">
        <h1 className="text-3xl font-serif font-normal mb-8 text-[#18241b] dark:text-[#f5ece5] uppercase tracking-tight">The Edit : Article Writer</h1>

        {/* 입력 폼 */}
        <div className="bg-[#f5ece5] dark:bg-[#2a2420] p-8 border border-[#18241b]/10 dark:border-[#f5ece5]/10 rounded-xl shadow-sm mb-12 space-y-6">
          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-widest text-[#924c0a] dark:text-[#e2a265] mb-2">Location (ex. SINGAPORE)</label>
            <input 
              type="text" 
              value={location} 
              onChange={e => setLocation(e.target.value)} 
              className="w-full bg-transparent border-b border-[#18241b]/20 dark:border-[#f5ece5]/20 p-2 text-2xl font-light text-[#18241b] dark:text-[#f5ece5] focus:outline-none focus:border-[#924c0a] dark:focus:border-[#e2a265]" 
              placeholder="여행지 이름" 
            />
          </div>

          <div className="pt-6">
            <label className="block text-[10px] font-semibold uppercase tracking-widest text-[#924c0a] dark:text-[#e2a265] mb-2">Main Title</label>
            <input 
              type="text" 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
              className="w-full bg-transparent border-b border-[#18241b]/20 dark:border-[#f5ece5]/20 p-2 text-3xl font-serif font-normal text-[#18241b] dark:text-[#f5ece5] focus:outline-none focus:border-[#924c0a] dark:focus:border-[#e2a265]" 
              placeholder="기사 제목" 
            />
          </div>

          <div className="pt-6">
            <label className="block text-[10px] font-semibold uppercase tracking-widest text-[#924c0a] dark:text-[#e2a265] mb-4">Cover Image (좌측 대형 이미지)</label>
            {coverImage ? (
              <img src={coverImage} alt="Cover" className="w-full h-[300px] object-cover mb-4 border border-[#18241b]/10 rounded" />
            ) : null}
            <PhotoUpload bucketName="travel" folderPath="covers" onUploadSuccess={handleCoverUpload} />
          </div>
        </div>

        {/* 하단: 본문 웹 에디터 영역 */}
        <div className="bg-[#f5ece5] dark:bg-[#2a2420] border border-[#18241b]/10 dark:border-[#f5ece5]/10 rounded-xl shadow-sm overflow-hidden">
          {/* 위지윅 툴바 */}
          <div className="flex border-b border-[#18241b]/10 dark:border-[#f5ece5]/10 bg-[#fff8f4]/50 dark:bg-[#1c1814]/50 p-2 gap-2 flex-wrap items-center">
            <button onClick={() => execCmd('bold')} className="w-10 h-10 font-bold bg-[#fff8f4] dark:bg-[#1c1814] text-[#18241b] dark:text-[#f5ece5] border border-[#18241b]/10 dark:border-[#f5ece5]/10 hover:bg-[#924c0a] dark:hover:bg-[#e2a265] hover:text-[#fff8f4] dark:hover:text-[#1c1814] rounded transition font-sans cursor-pointer">B</button>
            <button onClick={() => execCmd('italic')} className="w-10 h-10 italic bg-[#fff8f4] dark:bg-[#1c1814] text-[#18241b] dark:text-[#f5ece5] border border-[#18241b]/10 dark:border-[#f5ece5]/10 hover:bg-[#924c0a] dark:hover:bg-[#e2a265] hover:text-[#fff8f4] dark:hover:text-[#1c1814] rounded transition font-serif cursor-pointer">I</button>
            <button onClick={() => execCmd('underline')} className="w-10 h-10 underline bg-[#fff8f4] dark:bg-[#1c1814] text-[#18241b] dark:text-[#f5ece5] border border-[#18241b]/10 dark:border-[#f5ece5]/10 hover:bg-[#924c0a] dark:hover:bg-[#e2a265] hover:text-[#fff8f4] dark:hover:text-[#1c1814] rounded transition font-sans cursor-pointer">U</button>
            <div className="w-[1px] h-6 bg-[#18241b]/10 dark:bg-[#f5ece5]/10 mx-2"></div>
            {/* 본문 사진 삽입 (PhotoUpload 재사용) */}
            <div className="flex items-center text-xs text-[#18241b]/60 dark:text-[#f5ece5]/60">
              <span className="mr-2">📸 본문에 사진 추가:</span>
              <PhotoUpload bucketName="travel" folderPath="articles" onUploadSuccess={handleBodyImageUpload} />
            </div>
          </div>

          {/* 실제 에디터 영역 */}
          <div
            ref={editorRef}
            className="min-h-[500px] p-8 md:p-12 focus:outline-none text-[#18241b] dark:text-[#f5ece5] prose dark:prose-invert max-w-none text-base md:text-lg leading-[2] font-serif font-light break-keep"
            contentEditable={true}
            suppressContentEditableWarning={true}
          >
            여기에 여행 기행문을 멋지게 작성해 보세요...<br /><br />
          </div>
        </div>
      </div>
    </main>
  );
}

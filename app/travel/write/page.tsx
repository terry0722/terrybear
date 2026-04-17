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
          <img src="${url}" alt="Article Image" style="max-width: 100%; height: auto; display: block; border-radius: 4px;" />
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

  if (!user) return <div className="min-h-screen bg-[#111111] flex items-center justify-center text-white">Loading...</div>;

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-[#111111] pb-32">
      {/* 관리자(에디터) 상단 헤더 */}
      <div className="w-full bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 p-4 sticky top-0 z-50 flex justify-between items-center px-4 md:px-12">
        <Link href="/travel" className="text-sm font-bold uppercase tracking-widest text-black dark:text-white">← Back</Link>
        <div className="flex gap-4">
          <button onClick={handlePublish} disabled={isPublishing} className="bg-[#E0FF00] text-black px-6 py-2 text-sm font-bold border-2 border-black hover:bg-black hover:text-[#E0FF00] hover:border-[#E0FF00] transition disabled:opacity-50">
            {isPublishing ? 'PUBLISHING...' : '퍼블리시 ( 발행하기 )'}
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-12 px-6">
        <h1 className="text-3xl font-black mb-8 dark:text-white uppercase tracking-tight">The Edit : Article Writer</h1>
        
        {/* 입력 폼 */}
        <div className="bg-white dark:bg-black p-8 border-2 border-black dark:border-gray-800 shadow-[8px_8px_0_0_rgba(0,0,0,1)] dark:shadow-[8px_8px_0_0_rgba(224,255,0,0.5)] mb-12 space-y-6">
          <label className="block text-sm font-bold uppercase tracking-widest dark:text-[#E0FF00]">Location (ex. SINGAPORE)</label>
          <input type="text" value={location} onChange={e=>setLocation(e.target.value)} className="w-full bg-transparent border-b-2 border-black dark:border-white p-2 text-2xl font-light dark:text-white focus:outline-none focus:border-[#E0FF00]" placeholder="여행지 이름" />
          
          <label className="block text-sm font-bold uppercase tracking-widest dark:text-[#E0FF00] pt-6">Main Title</label>
          <input type="text" value={title} onChange={e=>setTitle(e.target.value)} className="w-full bg-transparent border-b-2 border-black dark:border-white p-2 text-4xl font-black dark:text-white focus:outline-none focus:border-[#E0FF00]" placeholder="기사 제목" />

          <div className="pt-6">
            <label className="block text-sm font-bold uppercase tracking-widest dark:text-[#E0FF00] mb-4">Cover Image (좌측 대형 이미지)</label>
            {coverImage ? (
              <img src={coverImage} alt="Cover" className="w-full h-[300px] object-cover mb-4 border border-black" />
            ) : null}
            <PhotoUpload bucketName="travel" folderPath="covers" onUploadSuccess={handleCoverUpload} />
          </div>
        </div>

        {/* 하단: 본문 웹 에디터 영역 */}
        <div className="bg-white dark:bg-black border-2 border-black dark:border-gray-800 shadow-[8px_8px_0_0_rgba(0,0,0,1)] dark:shadow-[8px_8px_0_0_rgba(224,255,0,0.5)] overflow-hidden">
           {/* 위지윅 툴바 */}
           <div className="flex border-b-2 border-black dark:border-gray-800 bg-gray-100 dark:bg-gray-900 p-2 gap-2 flex-wrap items-center">
             <button onClick={() => execCmd('bold')} className="w-10 h-10 font-bold bg-white dark:bg-black dark:text-white border border-gray-300 hover:bg-black hover:text-white transition">B</button>
             <button onClick={() => execCmd('italic')} className="w-10 h-10 italic font-serif bg-white dark:bg-black dark:text-white border border-gray-300 hover:bg-black hover:text-white transition">I</button>
             <button onClick={() => execCmd('underline')} className="w-10 h-10 underline bg-white dark:bg-black dark:text-white border border-gray-300 hover:bg-black hover:text-white transition">U</button>
             <div className="w-[1px] h-6 bg-gray-300 mx-2"></div>
             {/* 본문 사진 삽입 (PhotoUpload 재사용) */}
             <div className="flex items-center text-xs dark:text-white">
                <span className="mr-2">📸 본문에 사진 추가:</span>
                <PhotoUpload bucketName="travel" folderPath="articles" onUploadSuccess={handleBodyImageUpload} />
             </div>
           </div>
           
           {/* 실제 에디터 영역 */}
           <div 
             ref={editorRef}
             className="min-h-[500px] p-8 md:p-12 focus:outline-none dark:text-white prose dark:prose-invert max-w-none text-lg leading-[2] font-light break-keep"
             contentEditable={true}
             suppressContentEditableWarning={true}
           >
             여기에 여행 기행문을 멋지게 작성해 보세요...<br/><br/>
           </div>
        </div>
      </div>
    </main>
  );
}

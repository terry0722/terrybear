'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

interface PhotoUploadProps {
  onUploadSuccess: (url: string) => void;
}

export default function PhotoUpload({ onUploadSuccess }: PhotoUploadProps) {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!event.target.files || event.target.files.length === 0) return;
      
      const file = event.target.files[0];
      setUploading(true);

      // 파일명 깨짐 방지: 시간 + 랜덤 문자열로 변환 (ext 추출)
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      // 1. Supabase Storage 에 업로드 (버킷 이름: 'gallery')
      const { error: uploadError } = await supabase.storage
        .from('gallery')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // 2. 업로드된 이미지의 Public URL 가져오기
      const { data } = supabase.storage.from('gallery').getPublicUrl(filePath);

      // 3. 부모 컴포넌트(GalleryPage)에 사진 전달
      if (data?.publicUrl) {
        onUploadSuccess(data.publicUrl);
        alert('사진이 성공적으로 업로드되었습니다! 🎉');
      }

    } catch (error) {
      console.error('업로드 실패:', error);
      alert('업로드에 실패했습니다. (gallery 버킷이 존재하는지 확인해주세요)');
    } finally {
      setUploading(false);
      // input 초기화
      event.target.value = '';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-900 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 mb-10 transition-colors">
      <div className="text-center mb-4">
        <h3 className="text-lg font-medium text-black dark:text-white">📸 가족 사진 추가하기</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">로그인한 가족만 사진을 올릴 수 있습니다.</p>
      </div>

      <label className={`relative flex items-center justify-center px-6 py-3 cursor-pointer rounded-full font-medium shadow-sm transition-all
        ${uploading ? 'bg-gray-200 text-gray-500' : 'bg-black text-white hover:scale-105 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200'}
      `}>
        {uploading ? '사진 올리는 중...' : '앨범에서 선택...'}
        <input 
          type="file" 
          accept="image/*" 
          disabled={uploading}
          className="hidden" 
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
}

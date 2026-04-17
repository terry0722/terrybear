'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

// 데이터 구조를 명확히 정의합니다 (빌드 에러 방지)
interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  created_at: string;
}

export default function GuestbookPage() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEntries = useCallback(async () => {
    const { data, error } = await supabase
      .from('guestbook')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setEntries(data as GuestbookEntry[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const { error } = await supabase
      .from('guestbook')
      .insert([{ name: name.trim(), message: message.trim() }]);

    if (!error) {
      setName('');
      setMessage('');
      fetchEntries();
    }
  };

  return (
    <main className="min-h-screen bg-[#fcfcfc] dark:bg-[#111111] text-[#333] dark:text-[#eaeaea] transition-colors duration-300 pb-20">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-light tracking-[0.2em] mb-12 text-center uppercase text-black dark:text-white">Guestbook</h1>

        {/* 입력 폼 */}
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-20 space-y-4 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-300">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-transparent border-b border-gray-200 dark:border-gray-600 py-2 text-sm focus:outline-none focus:border-black dark:focus:border-white transition-colors"
          />
          <textarea
            placeholder="남기고 싶은 이야기를 적어주세요."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-transparent border-b border-gray-200 dark:border-gray-600 py-2 text-sm focus:outline-none focus:border-black dark:focus:border-white h-24 resize-none transition-colors"
          />
          <button type="submit" className="w-full py-3 bg-black dark:bg-white text-white dark:text-black text-[11px] tracking-widest uppercase rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition">
            Leave a message
          </button>
        </form>

        {/* 방명록 리스트 (포스트잇 느낌의 카드 UI) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <p className="text-xs text-gray-400 text-center uppercase tracking-widest col-span-full">Loading...</p>
          ) : entries.length === 0 ? (
            <p className="text-xs text-gray-400 text-center uppercase tracking-widest col-span-full">아직 남겨진 메시지가 없습니다.</p>
          ) : (
            entries.map((entry, index) => (
              <div 
                key={entry.id} 
                className="group relative bg-[#fdfaf6] dark:bg-gray-800 p-6 shadow-sm hover:shadow-md transition-all duration-300 rounded-sm border-t-4 border-yellow-300 dark:border-yellow-500 hover:-translate-y-1"
                style={{ transform: `rotate(${index % 2 === 0 ? '-1deg' : '1deg'})` }}
              >
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-6 whitespace-pre-wrap">{entry.message}</p>
                <div className="flex justify-between items-end border-t border-gray-100 dark:border-gray-700 pt-4">
                  <span className="text-sm font-bold tracking-tighter text-black dark:text-white">{entry.name}</span>
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 font-mono">
                    {new Date(entry.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
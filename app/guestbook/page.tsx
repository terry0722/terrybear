'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

// 데이터 구조를 명확히 정의합니다
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
    <main className="min-h-screen bg-[#fff8f4] dark:bg-[#1c1814] text-[#1f1b17] dark:text-[#f5ece5] transition-colors duration-300 pb-20">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-serif font-normal tracking-[0.2em] mb-12 text-center uppercase text-[#18241b] dark:text-[#f5ece5]">Guestbook</h1>

        {/* 입력 폼 */}
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-20 space-y-4 bg-[#f5ece5] dark:bg-[#2a2420] p-8 rounded-xl shadow-sm border border-[#18241b]/10 dark:border-[#f5ece5]/10 transition-colors duration-300">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-transparent border-b border-[#18241b]/20 dark:border-[#f5ece5]/20 py-2 text-sm focus:outline-none focus:border-[#924c0a] dark:focus:border-[#e2a265] transition-colors"
          />
          <textarea
            placeholder="남기고 싶은 이야기를 적어주세요."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-transparent border-b border-[#18241b]/20 dark:border-[#f5ece5]/20 py-2 text-sm focus:outline-none focus:border-[#924c0a] dark:focus:border-[#e2a265] h-24 resize-none transition-colors"
          />
          <button type="submit" className="w-full py-3 bg-[#924c0a] hover:bg-[#a35e19] text-[#fff8f4] dark:bg-[#e2a265] dark:text-[#1c1814] dark:hover:bg-[#f5ece5] text-[11px] tracking-widest uppercase rounded-md shadow-md transition cursor-pointer font-semibold">
            Leave a message
          </button>
        </form>

        {/* 방명록 리스트 (포스트잇 느낌의 카드 UI) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <p className="text-xs text-[#18241b]/40 dark:text-[#f5ece5]/40 text-center uppercase tracking-widest col-span-full">Loading...</p>
          ) : entries.length === 0 ? (
            <p className="text-xs text-[#18241b]/40 dark:text-[#f5ece5]/40 text-center uppercase tracking-widest col-span-full font-serif">아직 남겨진 메시지가 없습니다.</p>
          ) : (
            entries.map((entry, index) => (
              <div 
                key={entry.id} 
                className="group relative bg-[#f5ece5] dark:bg-[#2a2420] p-6 shadow-sm hover:shadow-md transition-all duration-300 rounded border-t-4 border-[#924c0a] dark:border-[#e2a265] hover:-translate-y-1"
                style={{ transform: `rotate(${index % 2 === 0 ? '-1deg' : '1deg'})` }}
              >
                <p className="text-sm text-[#18241b]/80 dark:text-[#f5ece5]/80 leading-relaxed mb-6 whitespace-pre-wrap">{entry.message}</p>
                <div className="flex justify-between items-end border-t border-[#18241b]/10 dark:border-[#f5ece5]/10 pt-4">
                  <span className="text-sm font-semibold text-[#18241b] dark:text-[#f5ece5]">{entry.name}</span>
                  <span className="text-[10px] text-[#18241b]/40 dark:text-[#f5ece5]/40 font-mono">
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
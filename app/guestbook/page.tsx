'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

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
    <main className="min-h-screen bg-white text-[#333] pb-20">
      <div className="max-w-2xl mx-auto px-6 pt-32">
        <Link href="/" className="text-[10px] tracking-[0.3em] text-gray-400 hover:text-black uppercase">← Back</Link>
        <h1 className="text-3xl font-light tracking-[0.2em] mt-8 mb-12 uppercase text-gray-800">Guestbook</h1>

        <form onSubmit={handleSubmit} className="mb-20 space-y-4 bg-gray-50 p-8 border border-gray-100">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-transparent border-b border-gray-200 py-2 text-sm focus:outline-none focus:border-black"
          />
          <textarea
            placeholder="Your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-transparent border-b border-gray-200 py-2 text-sm focus:outline-none focus:border-black h-24 resize-none"
          />
          <button type="submit" className="w-full py-3 bg-black text-white text-[11px] tracking-widest uppercase hover:bg-gray-800 transition">
            Leave a message
          </button>
        </form>

        <div className="space-y-12">
          {loading ? (
            <p className="text-xs text-gray-400 text-center uppercase tracking-widest">Loading...</p>
          ) : entries.length === 0 ? (
            <p className="text-xs text-gray-400 text-center uppercase tracking-widest">No messages yet.</p>
          ) : (
            entries.map((entry) => (
              <div key={entry.id} className="border-l-2 border-gray-100 pl-6 py-2">
                <p className="text-sm text-gray-700 leading-relaxed mb-3">{entry.message}</p>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold tracking-tighter bg-yellow-300 px-1">{entry.name}</span>
                  <span className="text-[9px] text-gray-300 font-mono">
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
'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { GuestbookView } from '@/components/GuestbookView';
import { GuestbookMessage } from '@/types';

export default function GuestbookPage() {
  const [messages, setMessages] = useState<GuestbookMessage[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check admin state from localStorage
  useEffect(() => {
    const logged = localStorage.getItem('family_admin_logged');
    setIsAdmin(logged === 'true');
  }, []);

  const fetchEntries = useCallback(async () => {
    const { data, error } = await supabase
      .from('guestbook')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      // Parse entries and support fallback relation formats
      const parsed: GuestbookMessage[] = data.map((entry: any) => {
        let rel = entry.relation;
        let msgText = entry.message;

        if (!rel && msgText) {
          const match = msgText.match(/^\[Relation: ([^\]]+)\]\s*([\s\S]*)$/);
          if (match) {
            rel = match[1];
            msgText = match[2];
          }
        }

        return {
          id: String(entry.id),
          name: entry.name || 'Anonymous',
          relation: rel || 'Family',
          message: msgText || '',
          date: entry.created_at ? new Date(entry.created_at).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }) : '최근 메시지'
        };
      });

      setMessages(parsed);
    }
  }, []);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  const handleAddMessage = async (msg: Omit<GuestbookMessage, "id" | "date">) => {
    // Try to insert directly with relation column
    let { error } = await supabase
      .from('guestbook')
      .insert([
        {
          name: msg.name,
          relation: msg.relation,
          message: msg.message,
        }
      ]);

    // Fallback if Postgres throws undefined column error (e.g. error code 42703)
    if (error && (error.code === '42703' || (error.message && error.message.includes('relation')))) {
      const prependedMessage = `[Relation: ${msg.relation}] ${msg.message}`;
      const { error: fallbackError } = await supabase
        .from('guestbook')
        .insert([
          {
            name: msg.name,
            message: prependedMessage,
          }
        ]);
      
      if (fallbackError) {
        alert("방명록 등록에 실패했습니다: " + fallbackError.message);
      } else {
        fetchEntries();
      }
    } else if (error) {
      alert("방명록 등록에 실패했습니다: " + error.message);
    } else {
      fetchEntries();
    }
  };

  const handleDeleteMessage = async (id: string) => {
    const { error } = await supabase
      .from('guestbook')
      .delete()
      .eq('id', id);

    if (!error) {
      alert("방명록 메시지를 삭제했습니다.");
      fetchEntries();
    } else {
      alert("삭제 실패: " + error.message);
    }
  };

  return (
    <main className="min-h-screen bg-[#fff8f4] dark:bg-[#1c1814] transition-colors duration-300 pb-20 pt-16">
      <GuestbookView
        messages={messages}
        onAddMessage={handleAddMessage}
        onDeleteMessage={handleDeleteMessage}
        isAdmin={isAdmin}
      />
    </main>
  );
}
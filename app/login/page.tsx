'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert('로그인에 실패했습니다: ' + error.message);
    } else {
      alert('반갑습니다! 로그인되었습니다.');
      router.push('/'); // 로그인 성공 시 홈으로 이동
      router.refresh();
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#fff8f4] dark:bg-[#1c1814] text-[#1f1b17] dark:text-[#f5ece5] flex items-center justify-center px-6 transition-colors duration-300">
      <div className="max-w-sm w-full">
        <div className="text-center mb-12">
          <Link href="/" className="text-[10px] tracking-[0.3em] text-[#18241b]/50 dark:text-[#f5ece5]/50 hover:text-[#924c0a] dark:hover:text-[#e2a265] uppercase">
            ← Back to Home
          </Link>
          <h1 className="text-3xl font-serif font-normal tracking-[0.2em] uppercase mt-8 text-[#18241b] dark:text-[#f5ece5]">Login</h1>
          <p className="text-[10px] text-[#924c0a] dark:text-[#e2a265] tracking-widest uppercase mt-2 font-semibold">Family Members Only</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-1">
            <label className="text-[10px] tracking-widest uppercase text-[#18241b]/50 dark:text-[#f5ece5]/50 ml-1">Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-b border-[#18241b]/20 dark:border-[#f5ece5]/20 py-3 px-1 text-sm focus:outline-none focus:border-[#924c0a] dark:focus:border-[#e2a265] transition-all bg-transparent"
              placeholder="이메일을 입력하세요"
              required
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] tracking-widest uppercase text-[#18241b]/50 dark:text-[#f5ece5]/50 ml-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b border-[#18241b]/20 dark:border-[#f5ece5]/20 py-3 px-1 text-sm focus:outline-none focus:border-[#924c0a] dark:focus:border-[#e2a265] transition-all bg-transparent"
              placeholder="비밀번호를 입력하세요"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-[#924c0a] hover:bg-[#a35e19] text-[#fff8f4] dark:bg-[#e2a265] dark:text-[#1c1814] dark:hover:bg-[#f5ece5] text-[11px] tracking-[0.3em] uppercase transition-all mt-4 disabled:bg-gray-400 cursor-pointer font-semibold rounded-md shadow-md"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
      </div>
    </main>
  );
}
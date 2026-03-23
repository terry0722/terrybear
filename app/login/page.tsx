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
    <main className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-sm w-full">
        <div className="text-center mb-12">
          <Link href="/" className="text-[10px] tracking-[0.3em] text-gray-400 hover:text-black uppercase">← Back to Home</Link>
          <h1 className="text-3xl font-light tracking-[0.2em] uppercase mt-8">Login</h1>
          <p className="text-[10px] text-gray-400 tracking-widest uppercase mt-2">Family Members Only</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-1">
            <label className="text-[10px] tracking-widest uppercase text-gray-400 ml-1">Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-b border-gray-200 py-3 px-1 text-sm focus:outline-none focus:border-black transition-all bg-transparent"
              placeholder="이메일을 입력하세요"
              required
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] tracking-widest uppercase text-gray-400 ml-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b border-gray-200 py-3 px-1 text-sm focus:outline-none focus:border-black transition-all bg-transparent"
              placeholder="비밀번호를 입력하세요"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-black text-white text-[11px] tracking-[0.3em] uppercase hover:bg-gray-800 transition-all mt-4 disabled:bg-gray-400"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
      </div>
    </main>
  );
}
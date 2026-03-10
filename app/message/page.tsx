'use client';

import { useState } from 'react';

export default function MessagePage() {
  // 화면에 보여줄 초기 방명록 데이터 (임시 데이터)
  const [messages, setMessages] = useState([
    { id: 1, author: "아빠", text: "우리 가족 홈페이지의 첫 방명록입니다. 사랑해!", date: "2026. 03. 10" },
    { id: 2, author: "엄마", text: "드디어 우리만의 예쁜 공간이 생겼네요. 고생했어요!", date: "2026. 03. 10" },
  ]);

  // 입력창의 상태를 관리하는 변수
  const [newAuthor, setNewAuthor] = useState("");
  const [newText, setNewText] = useState("");

  // '남기기' 버튼을 눌렀을 때 실행되는 함수
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor || !newText) return; // 빈칸이면 무시

    const newMessage = {
      id: messages.length + 1,
      author: newAuthor,
      text: newText,
      date: new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' })
    };

    // 기존 메시지들 맨 앞에 새 메시지 추가
    setMessages([newMessage, ...messages]); 
    setNewAuthor(""); // 입력창 초기화
    setNewText("");   // 입력창 초기화
  };

  return (
    <main className="min-h-screen bg-[#fcfcfc] text-[#333] font-sans py-24 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* 헤더 */}
        <div className="mb-16 text-center">
          <a href="/" className="text-[10px] tracking-[0.3em] uppercase text-gray-400 hover:text-black transition">Back to Home</a>
          <h1 className="text-3xl font-light mt-6 tracking-tight">방명록</h1>
          <p className="text-sm text-gray-500 font-light mt-4">우리 가족에게 따뜻한 한마디를 남겨주세요.</p>
          <div className="w-8 h-[1px] bg-gray-300 mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* 왼쪽: 메시지 입력 폼 */}
          <div className="md:col-span-1">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
              <h3 className="text-sm font-medium tracking-widest uppercase text-gray-400 mb-6">Write a Message</h3>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input 
                  type="text" 
                  placeholder="이름" 
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  className="w-full pb-2 border-b border-gray-200 bg-transparent text-sm focus:outline-none focus:border-black transition"
                  maxLength={10}
                />
                <textarea 
                  placeholder="메시지를 적어주세요..." 
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  className="w-full h-32 pb-2 border-b border-gray-200 bg-transparent text-sm focus:outline-none focus:border-black transition resize-none mt-4"
                  maxLength={150}
                />
                <button 
                  type="submit" 
                  className="mt-6 w-full py-3 bg-black text-white text-xs tracking-widest uppercase rounded-full hover:bg-gray-800 transition"
                >
                  남기기
                </button>
              </form>
            </div>
          </div>

          {/* 오른쪽: 메시지 리스트 (엽서 형태) */}
          <div className="md:col-span-2 flex flex-col gap-6">
            {messages.map((msg) => (
              <div key={msg.id} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative group transition hover:shadow-md">
                <div className="absolute top-8 right-8 text-xs text-gray-300 font-light tracking-widest">{msg.date}</div>
                <p className="text-lg text-gray-700 font-light leading-relaxed mb-6 pr-20 whitespace-pre-wrap">
                  "{msg.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs">✍️</div>
                  <span className="text-sm font-medium text-gray-900">{msg.author}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </main>
  );
}
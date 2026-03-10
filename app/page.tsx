export default function Home() {
  return (
    <main className="min-h-screen bg-[#fcfcfc] text-[#333] font-sans">
      {/* 1. 글로벌 가족을 위한 내비게이션 */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-8 h-20 flex justify-between items-center">
          <h1 className="text-lg font-light tracking-[0.2em] uppercase">Our Legacy</h1>
          <div className="flex gap-8 text-[11px] tracking-widest uppercase font-medium text-gray-400">
            <a href="/" className="hover:text-black transition">Home</a>
            <a href="/story" className="hover:text-black transition">Story</a>
            <a href="/gallery" className="hover:text-black transition">Gallery</a>
            <a href="/message" className="hover:text-black transition">Message</a>
          </div>
        </div>
      </nav>

      {/* 2. 한/영 혼용 메인 헤드라인 */}
      <section className="pt-44 pb-20 px-6 text-center">
        <span className="text-[10px] tracking-[0.3em] uppercase text-gray-400 mb-6 block">Family Archive Project</span>
        <h2 className="text-4xl md:text-5xl font-extralight tracking-tight leading-tight mb-8">
          Capturing <span className="bg-yellow-100 px-2 italic font-normal">다시 찾고 싶은</span> <br />
          our family moments.
        </h2>
        <div className="w-10 h-[1px] bg-black mx-auto mb-10"></div>
        <p className="text-sm text-gray-500 font-light leading-relaxed max-w-md mx-auto">
          From our daily life in the Philippines to the scent of memories. <br />
          <span className="text-black font-medium">필리핀에서의 일상이 향기가 되는 과정</span>을 기록합니다.
        </p>
      </section>

      {/* 3. 가족 카드 섹션 (기존의 세련된 흑백 스타일 복구) */}
      <section className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { name: "Papa", krName: "아빠", role: "Designer", img: "/papa.jpeg" },
          { name: "Mama", krName: "엄마", role: "Marketer", img: "/mama.jpeg" },
          { name: "Daughter", krName: "우리딸", role: "Student", img: "/daughter.jpeg" },
          { name: "Dog", krName: "댕댕이", role: "Guardian", img: "/dog.jpeg" }
        ].map((member) => (
          <div key={member.name} className="group relative overflow-hidden bg-gray-100 aspect-[3/4] rounded-sm">
            <img 
              src={member.img} 
              className="w-full h-full object-cover grayscale transition duration-700 group-hover:grayscale-0" 
            />
            {/* 마우스 올렸을 때 나타나는 한글 하이라이트 정보 */}
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition duration-500 flex flex-col justify-end p-6 text-white text-left">
              <span className="text-[10px] tracking-widest uppercase mb-1 opacity-80">{member.role}</span>
              <h4 className="text-xl font-light tracking-tighter">
                {member.name} <span className="text-sm bg-yellow-400 text-black px-1 ml-1 font-bold">{member.krName}</span>
              </h4>
            </div>
          </div>
        ))}
      </section>

      {/* 4. 감성적인 한/영 혼용 메시지 섹션 */}
      <section className="max-w-3xl mx-auto px-6 py-40 text-center">
        <div className="inline-block border-l-2 border-black pl-8 text-left">
          <h3 className="text-2xl font-extralight text-gray-800 leading-relaxed">
            "We believe that <br /> 
            <span className="bg-black text-white px-2 not-italic">가장 소중한 것은 늘 가까이에</span> <br /> 
            resides in the simplest moments."
          </h3>
          <p className="mt-10 text-xs text-gray-400 tracking-[0.2em] uppercase">
            Once, Again — starting from our home.
          </p>
        </div>
      </section>

      <footer className="pb-20 text-center text-[10px] tracking-widest text-gray-300 uppercase">
        © 2026 Once, Again Family Archive - Taguig, Philippines
      </footer>
    </main>
  );
}
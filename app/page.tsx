export default function Home() {
  return (
    <main className="min-h-screen bg-[#fcfcfc] text-[#333] font-sans">
      {/* 1. 글로벌 가족을 위한 내비게이션 */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 md:px-8 h-20 flex flex-col md:flex-row justify-center md:justify-between items-center gap-2 md:gap-0">
          <h1 className="text-lg font-light tracking-[0.2em] uppercase">Our Legacy</h1>
          <div className="flex gap-4 md:gap-6 text-[9px] md:text-[11px] tracking-widest uppercase font-medium text-gray-400 overflow-x-auto w-full md:w-auto justify-center whitespace-nowrap pb-2 md:pb-0">
            <a href="/" className="hover:text-black transition">Home</a>
            <a href="/story" className="hover:text-black transition">Story</a>
            <a href="/gallery" className="hover:text-black transition">Gallery</a>
            <a href="/artgallery" className="hover:text-black transition">Art Gallery</a>
            <a href="/travel" className="hover:text-black transition">Travel</a>
            <a href="/guestbook" className="hover:text-black transition">Guestbook</a>
            <a href="/login" className="text-black font-bold border-b border-black pb-0.5">Login</a>
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
          { name: "Papa", krName: "아빠", role: "Designer", img: "papa.jpeg" },
          { name: "Mama", krName: "엄마", role: "Marketer", img: "mama.jpeg" },
          { name: "Daughter", krName: "딸", role: "Student", img: "daughter.jpeg" },
          { name: "Dog", krName: "댕댕이", role: "Guardian", img: "dog.jpeg" }
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
      <section className="max-w-3xl mx-auto px-6 py-24 md:py-40 text-center">
        <div className="inline-block border-l-2 border-black pl-6 md:pl-8 text-left">
          <h3 className="text-xl md:text-2xl font-extralight text-gray-800 leading-relaxed">
            "We believe that <br /> 
            <span className="bg-black text-white px-2 not-italic inline-block my-1">가장 소중한 것은 늘 가까이에</span> <br /> 
            resides in the simplest moments."
          </h3>
          <p className="mt-10 text-xs text-gray-400 tracking-[0.2em] uppercase">
            Once, Again — starting from our home.
          </p>
        </div>
      </section>

      <footer className="pb-20 text-center px-6">
        <div className="w-12 h-[1px] bg-gray-200 mx-auto mb-8"></div>
        <div className="space-y-3">
          <p className="text-[10px] tracking-[0.4em] text-gray-400 uppercase font-light">
            Global Family Archive Project
          </p>
          <p className="text-[11px] tracking-[0.2em] text-gray-300 uppercase">
            © 2026 <span className="text-gray-500 font-medium font-sans italic">Once, Again</span> 
            <span className="mx-2">|</span> 
            ROOTS IN <span className="text-gray-500 font-medium">KOREA</span>
          </p>
          <p className="text-[9px] tracking-widest text-gray-200 uppercase pt-2 font-sans">
            www.yoo-family.com
          </p>
        </div>
      </footer>
    </main>
  );
}
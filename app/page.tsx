'use client';

export default function Home() {
  // 인증 로직은 Global Header로 이동됨

  // 2. 로그아웃 함수 등은 Header.tsx로 이동 완료

  return (
    <main className="w-full font-sans">

      {/* 헤드라인 섹션 */}
      <section className="pt-44 pb-20 px-6 text-center">
        <span className="text-[10px] tracking-[0.3em] uppercase text-gray-400 mb-6 block">Family Archive Project</span>
        <h2 className="text-4xl md:text-5xl font-extralight tracking-tight leading-tight mb-8 text-black">
          Capturing <span className="bg-yellow-100 px-2 italic font-normal">다시 찾고 싶은</span> <br />
          our family moments.
        </h2>
        <div className="w-10 h-[1px] bg-black mx-auto mb-10"></div>
        <p className="text-sm text-gray-500 font-light leading-relaxed max-w-md mx-auto">
          From our daily life in the Philippines to the scent of memories. <br />
          <span className="text-black font-medium">필리핀에서의 일상이 향기가 되는 과정</span>을 기록합니다.
        </p>
      </section>

      {/* 가족 카드 섹션: 이미지 출력 로직 복구 */}
      <section className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { name: "Papa", krName: "아빠", role: "Designer", img: "/papa.jpeg" },
          { name: "Mama", krName: "엄마", role: "Marketer", img: "/mama.jpeg" },
          { name: "Daughter", krName: "딸", role: "Student", img: "/daughter.jpeg" },
          { name: "Dog", krName: "댕댕이", role: "Guardian", img: "/dog.jpeg" }
        ].map((member) => (
          <div key={member.name} className="group relative overflow-hidden bg-gray-100 aspect-[3/4] rounded-sm shadow-sm">
            {/* 사진이 다시 보이도록 img 태그를 활성화했습니다 */}
            <img 
              src={member.img} 
              alt={member.name}
              className="w-full h-full object-cover grayscale transition duration-700 group-hover:grayscale-0"
              onError={(e) => {
                // 이미지 파일이 없을 경우 회색 배경으로 대체
                (e.target as any).src = 'https://via.placeholder.com/600x800?text=Photo';
              }}
            />
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition duration-500 flex flex-col justify-end p-6 text-white text-left">
              <span className="text-[10px] tracking-widest uppercase mb-1 opacity-80">{member.role}</span>
              <h4 className="text-xl font-light tracking-tighter">
                {member.name} <span className="text-sm bg-yellow-400 text-black px-1 ml-1 font-bold">{member.krName}</span>
              </h4>
            </div>
          </div>
        ))}
      </section>

      {/* 감성 문구 섹션 */}
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

      {/* 푸터 */}
      <footer className="pb-20 text-center px-6 mt-20">
        <div className="w-12 h-[1px] bg-gray-200 mx-auto mb-8"></div>
        <p className="text-[10px] tracking-[0.4em] text-gray-400 uppercase font-light">Global Family Archive Project</p>
        <p className="text-[11px] tracking-[0.2em] text-gray-300 uppercase mt-2 font-medium">
          © 2026 Once, Again | Manila, PH | Roots in Korea
        </p>
      </footer>
    </main>
  );
}
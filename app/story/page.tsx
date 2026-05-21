'use client';

import Link from "next/link";

export default function StoryPage() {
  return (
    <main className="min-h-screen bg-[#fff8f4] dark:bg-[#1c1814] text-[#1f1b17] dark:text-[#f5ece5] transition-colors duration-300 pb-32">
      
      {/* 1. 상단 뒤로가기 */}
      <div className="pt-12 px-8 max-w-7xl mx-auto">
        <Link href="/" className="text-[10px] tracking-[0.3em] uppercase text-[#18241b]/50 dark:text-[#f5ece5]/50 hover:text-[#924c0a] dark:hover:text-[#e2a265] transition border-b border-transparent hover:border-[#924c0a] dark:hover:border-[#e2a265] pb-1">
          Back to Home
        </Link>
      </div>

      {/* 2. 에디토리얼 헤로(Hero) 섹션 */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-24 text-center">
        <span className="text-[10px] tracking-[0.4em] uppercase text-[#924c0a] dark:text-[#e2a265] font-semibold block mb-6">Chapter 1.</span>
        <h1 className="text-4xl md:text-5xl font-serif font-normal tracking-tight mb-8 leading-tight text-[#18241b] dark:text-[#f5ece5]">
          기억이 향기가 되기까지.
        </h1>
        <div className="w-12 h-[1px] bg-[#924c0a] dark:bg-[#e2a265] mx-auto mb-10"></div>
        <p className="font-serif text-sm text-[#18241b]/70 dark:text-[#f5ece5]/70 leading-relaxed max-w-md mx-auto">
          필리핀의 낯선 공기, 가족과 함께 나눈 웃음소리, 그리고 잊지 못할 평온한 오후. <br />
          이 모든 순간들을 영원히 간직하고 싶다는 마음에서 <br />
          우리의 이야기는 시작되었습니다.
        </p>
      </section>

      {/* 3. 매거진 인터뷰 섹션 */}
      <section className="max-w-6xl mx-auto px-6 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          
          <div className="aspect-[4/5] bg-[#f5ece5] dark:bg-[#2a2420] overflow-hidden rounded-sm relative group border border-[#18241b]/10 dark:border-[#f5ece5]/10 shadow-sm">
            <img 
              src="/family.jpeg" 
              alt="Our Story" 
              className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 transition duration-1000" 
            />
            <div className="absolute bottom-6 left-6 text-white text-[10px] tracking-widest uppercase opacity-0 group-hover:opacity-100 transition duration-1000">
              Captured in Philippines
            </div>
          </div>
          
          <div className="py-8 md:py-0">
            <h3 className="font-serif text-2xl font-normal mb-12 italic text-[#18241b] dark:text-[#f5ece5] border-l-2 border-[#924c0a] dark:border-[#e2a265] pl-6 leading-relaxed">
              "우리가 함께 보내는 <br /> 
              가장 평범하고 완벽한 순간의 향기"
            </h3>
            
            <div className="space-y-10 text-sm text-[#18241b]/70 dark:text-[#f5ece5]/70 leading-loose">
              <div>
                <strong className="text-[#924c0a] dark:text-[#e2a265] font-semibold tracking-wide block mb-2 font-serif">Q. 'ONCE, again'의 영감은 어디서 왔나요?</strong>
                <p>
                  아내의 화장대 위 수많은 향수 및 드레스 퍼퓸들을 보며 생각했습니다. '가장 나다운 향, 우리 가족의 따뜻함이 묻어나는 향은 없을까?' 
                  디자이너로서의 시각과 마케터의 감각이 만나는 교차점에 바로 우리 가족의 일상이 있었습니다.
                </p>
              </div>
              
              <div>
                <strong className="text-[#924c0a] dark:text-[#e2a265] font-semibold tracking-wide block mb-2 font-serif">Q. 필리핀에서의 생활이 미친 영향은요?</strong>
                <p>
                  이곳의 여유로운 속도는 우리에게 곁에 있는 사람을 더 깊이 바라볼 수 있는 시간을 주었습니다. 
                  딸아이의 맑은 미소, 반려견의 평온한 낮잠 시간... 이 소중한 장면들을 잊지 않고 병 안에 담아내는 작업이 바로 브랜드의 시작입니다.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. 스토리보드 하이라이트 */}
      <section className="max-w-4xl mx-auto px-6 text-center">
         <div className="border-t border-b border-[#18241b]/10 dark:border-[#f5ece5]/10 py-16 bg-[#f5ece5]/40 dark:bg-[#2a2420]/40 backdrop-blur-sm">
           <span className="text-[10px] tracking-[0.3em] uppercase text-[#924c0a] dark:text-[#e2a265] font-semibold block mb-4">Core Value</span>
           <h2 className="font-serif text-xl md:text-2xl font-normal tracking-widest text-[#18241b] dark:text-[#f5ece5]">
             "기억, 연결, 그리고 다시 찾고 싶은 순간"
           </h2>
         </div>
      </section>

    </main>
  );
}
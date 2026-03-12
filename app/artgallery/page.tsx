import Link from 'next/link';

const artworks = [
  { id: 1, title: "Daughter's Art 01", date: "2026. 03", src: "/images/art/daughter_art_01.jpeg" },
  { id: 2, title: "Daughter's Art 02", date: "2026. 03", src: "/images/art/daughter_art_02.jpeg" },
  { id: 3, title: "Daughter's Art 03", date: "2026. 03", src: "/images/art/daughter_art_03.jpeg" },
];

export default function ArtGalleryPage() {
  return (
    <main className="min-h-screen bg-white pb-20 pt-24 px-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-[10px] tracking-[0.3em] text-gray-400 hover:text-black uppercase">← Back</Link>
        <h1 className="text-3xl font-light tracking-[0.2em] mt-8 mb-16 text-gray-800">ART GALLERY</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {artworks.map((art) => (
            <div key={art.id} className="group">
              <div className="aspect-[4/5] overflow-hidden bg-gray-50 border border-gray-100">
                <img src={art.src} alt={art.title} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
              </div>
              <p className="text-[10px] tracking-widest text-gray-400 mt-4 uppercase">{art.title}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
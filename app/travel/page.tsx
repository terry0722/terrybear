import Link from 'next/link';

const trips = [
  { id: 1, location: "SINGAPORE", title: "City of Lights", date: "2025. 12", src: "/images/travel/singapore_trip_01.jpeg" },
  { id: 2, location: "TURKEY", title: "Ancient Journey", date: "2024. 08", src: "/images/travel/turkey_trip_01.jpeg" },
];

export default function TravelPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] pb-20">
      <div className="max-w-4xl mx-auto pt-24 px-6 mb-16">
        <Link href="/" className="text-[10px] tracking-[0.3em] text-gray-400 hover:text-black transition-colors uppercase">← Back</Link>
        <h1 className="text-3xl font-light tracking-[0.2em] mt-8 text-gray-800">TRAVEL ARCHIVE</h1>
      </div>
      <div className="max-w-5xl mx-auto px-6 space-y-24">
        {trips.map((trip) => (
          <div key={trip.id} className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-2/3 aspect-video overflow-hidden shadow-sm">
              <img src={trip.src} alt={trip.title} className="w-full h-full object-cover" />
            </div>
            <div className="w-full md:w-1/3 space-y-4">
              <span className="text-[10px] tracking-[0.4em] text-orange-600 font-medium">{trip.location}</span>
              <h2 className="text-xl font-light tracking-tight text-gray-700">{trip.title}</h2>
              <p className="text-[11px] text-gray-400 tracking-widest uppercase">{trip.date}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
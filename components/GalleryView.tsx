/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import { Palette, Layers, ZoomIn, X, PlusCircle, Sparkles } from "lucide-react";
import { Artwork } from "../types";

interface GalleryViewProps {
  artworks: Artwork[];
  isAdmin: boolean;
  onDeleteArtwork?: (id: string) => void;
}

export const GalleryView: React.FC<GalleryViewProps> = ({
  artworks,
  isAdmin,
  onDeleteArtwork,
}) => {
  const [selectedMedium, setSelectedMedium] = useState<string>("ALL");
  const [lightboxArt, setLightboxArt] = useState<Artwork | null>(null);

  // Extract medium categories
  const mediums = useMemo(() => {
    const list = ["ALL"];
    artworks.forEach((art) => {
      // e.g. "Watercolor on Paper" -> extract "watercolor", "oil", etc.
      const medLower = art.medium.toLowerCase();
      let shortMed = "Other";
      if (medLower.includes("watercolor")) shortMed = "WATERCOLOR";
      else if (medLower.includes("oil")) shortMed = "OIL / ACRYLIC";
      else if (medLower.includes("charcoal") || medLower.includes("pencil") || medLower.includes("ink")) shortMed = "SKETCH / INK";
      else if (medLower.includes("collage") || medLower.includes("mixed")) shortMed = "MIXED MEDIA";
      
      if (!list.includes(shortMed)) {
        list.push(shortMed);
      }
    });
    return list;
  }, [artworks]);

  const filteredArtworks = useMemo(() => {
    if (selectedMedium === "ALL") return artworks;
    return artworks.filter((art) => {
      const medLower = art.medium.toLowerCase();
      if (selectedMedium === "WATERCOLOR") return medLower.includes("watercolor");
      if (selectedMedium === "OIL / ACRYLIC") return medLower.includes("oil") || medLower.includes("acrylic");
      if (selectedMedium === "SKETCH / INK") return medLower.includes("charcoal") || medLower.includes("pencil") || medLower.includes("ink");
      if (selectedMedium === "MIXED MEDIA") return medLower.includes("collage") || medLower.includes("mixed");
      return !medLower.includes("watercolor") && !medLower.includes("oil") && !medLower.includes("acrylic") && !medLower.includes("charcoal") && !medLower.includes("pencil") && !medLower.includes("ink") && !medLower.includes("collage") && !medLower.includes("mixed");
    });
  }, [artworks, selectedMedium]);

  // Featured original piece is the "Summer by the Reef"
  const featuredArt = useMemo(() => {
    return artworks.find(a => a.id === "artw-1") || artworks[0];
  }, [artworks]);

  return (
    <div className="bg-[#fff8f4] dark:bg-transparent text-[#1f1b17] dark:text-[#f5ece5] py-6 md:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 md:space-y-16">
      
      {/* 1. ART GALLERY INTRO */}
      <div className="border-b border-[#18241b]/10 dark:border-[#f5ece5]/10 pb-6 text-center md:text-left flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <span className="font-sans text-[10px] tracking-[0.3em] font-semibold text-[#924c0a] dark:text-[#e2a265]">
            DAUGHTER'S GRAPHICS TAB / 딸아이의 그림 갤러리
          </span>
          <h1 className="font-serif text-3xl md:text-4xl text-[#18241b] dark:text-[#f5ece5] mt-1 font-normal">
            The Coral & Reef Collection
          </h1>
          <p className="font-serif text-xs md:text-sm text-[#18241b]/60 dark:text-[#f5ece5]/60 italic mt-2">
            A beautiful visual journal exploring seawater watercolor dynamics, charcoal shades, and tropical forest flora.
          </p>
        </div>
        <div className="flex justify-center md:justify-end">
          <span className="inline-flex items-center space-x-2 text-xs font-sans font-semibold border-b border-[#924c0a] dark:border-[#e2a265] py-1 text-[#924c0a] dark:text-[#e2a265]">
            <Palette size={14} />
            <span>{artworks.length} WORKS CATALOGUED</span>
          </span>
        </div>
      </div>

      {/* 2. MAIN GALLERY FEATURED MASTERPIECE EXHIBIT */}
      {featuredArt && selectedMedium === "ALL" && (
        <section className="bg-stone-900 dark:bg-[#2a2420] text-white rounded-2xl overflow-hidden shadow-xl grid grid-cols-1 md:grid-cols-12 max-w-7xl mx-auto border border-[#18241b]/10 dark:border-[#f5ece5]/10">
          <div className="md:col-span-8 aspect-[4/3] md:aspect-auto md:h-[30rem] relative group cursor-pointer" onClick={() => setLightboxArt(featuredArt)}>
            <img
              src={featuredArt.image}
              alt={featuredArt.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-101"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
            <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md p-2 rounded-full text-white cursor-pointer hover:bg-[#924c0a] transition-all">
              <ZoomIn size={16} />
            </div>
          </div>

          <div className="md:col-span-4 p-8 flex flex-col justify-between bg-[#18241b] dark:bg-[#1c1814] text-[#f5ece5]">
            <div className="space-y-4">
              <span className="font-sans text-[9px] tracking-[0.3em] font-semibold text-[#e2a265] uppercase">
                EXHIBIT STARPIECE
              </span>
              <h2 className="font-serif text-2xl lg:text-3xl text-white font-normal leading-tight">
                {featuredArt.title}
              </h2>
              <div className="h-[1px] bg-[#f5ece5]/15" />
              <div className="space-y-1">
                <span className="font-sans text-[10px] tracking-widest text-[#f5ece5]/50 block">MEDIUM SPECIFICATIONS</span>
                <span className="font-serif text-sm italic text-white block">{featuredArt.medium}</span>
              </div>
              <div className="space-y-1">
                <span className="font-sans text-[10px] tracking-widest text-[#f5ece5]/50 block">DATE OF COMPLETED DESIGN</span>
                <span className="font-serif text-sm text-white block">{featuredArt.date}</span>
              </div>
            </div>

            <div className="pt-6 border-t border-[#f5ece5]/15 space-y-4">
              <p className="font-serif text-xs text-[#f5ece5]/75 leading-relaxed italic">
                "Our local dreamer translating beautiful Philippine reefs, turquoise ocean lagoons, and pristine forest floors directly into paper canvases."
              </p>
              <span className="font-sans text-[8px] tracking-[0.25em] text-[#e2a265] uppercase block font-bold">
                CREATED BY YOO DAUGHTER (딸 • 15세)
              </span>
            </div>
          </div>
        </section>
      )}

      {/* 3. COLLECTION FILTERS */}
      <section className="flex flex-col sm:flex-row items-center justify-between border-y border-[#18241b]/10 dark:border-[#f5ece5]/10 py-5 gap-4">
        <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
          {mediums.map((med) => (
            <button
              key={med}
              onClick={() => setSelectedMedium(med)}
              className={`px-4 py-2 text-xs font-sans tracking-widest font-bold cursor-pointer rounded transition-all ${
                selectedMedium === med
                  ? "bg-[#18241b] dark:bg-[#e2a265] text-[#fff8f4] dark:text-[#1c1814] shadow-sm"
                  : "text-[#18241b]/70 dark:text-[#f5ece5]/70 hover:bg-[#18241b]/5 dark:hover:bg-[#f5ece5]/5 hover:text-[#18241b] dark:hover:text-[#f5ece5]"
              }`}
            >
              {med}
            </button>
          ))}
        </div>
        
        <span className="font-sans text-[10px] text-[#18241b]/50 dark:text-[#f5ece5]/50 tracking-wider">
          SHOWN: {filteredArtworks.length} DESIGNS
        </span>
      </section>

      {/* 4. MASONRY / GRID GRAPHICAL GALLEERY */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredArtworks.map((art) => (
          <div
            key={art.id}
            className="group block overflow-hidden rounded-xl bg-white dark:bg-[#2a2420] border border-[#18241b]/10 dark:border-[#f5ece5]/10 shadow-sm hover:shadow-md transition-all duration-300"
          >
            {/* Painting Container */}
            <div
              onClick={() => setLightboxArt(art)}
              className="aspect-[4/3] w-full overflow-hidden bg-[#f5ece5] dark:bg-[#1c1814] relative cursor-pointer"
            >
              <img
                src={art.image}
                alt={art.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-104"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-500" />
              
              {/* Tap to zoom indicator */}
              <div className="absolute top-3 right-3 bg-white/80 dark:bg-[#2a2420]/80 backdrop-blur-md p-1.5 rounded-full text-[#18241b] dark:text-[#f5ece5] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ZoomIn size={14} />
              </div>
            </div>

            {/* Information Label */}
            <div className="p-5 space-y-2 border-t border-[#18241b]/5 dark:border-[#f5ece5]/5">
              <div className="flex items-center justify-between">
                <span className="font-sans text-[9px] tracking-widest text-[#924c0a] dark:text-[#e2a265] font-normal uppercase">
                  {art.medium.split(" on ")[0]}
                </span>
                <span className="font-sans text-[10px] text-[#18241b]/45 dark:text-[#f5ece5]/45 italic font-medium">
                  {art.date}
                </span>
              </div>
              
              <h3 className="font-serif text-base sm:text-lg text-[#18241b] dark:text-[#f5ece5] leading-snug group-hover:text-[#924c0a] dark:group-hover:text-[#e2a265] transition-colors">
                {art.title}
              </h3>
              
              <div className="flex justify-between items-center pt-2 text-[10px] text-[#18241b]/40 dark:text-[#f5ece5]/40 font-semibold tracking-wider font-sans border-t border-[#18241b]/5 dark:border-[#f5ece5]/5">
                <span>CANVAS ARCHIVE</span>
                
                {/* Admin Delete Action */}
                {isAdmin && onDeleteArtwork && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm(`Do you wish to remove "${art.title}" from the public gallery?`)) {
                        onDeleteArtwork(art.id);
                      }
                    }}
                    className="text-red-800 dark:text-red-400 hover:underline cursor-pointer tracking-widest text-[9px]"
                  >
                    DISMISS WORK
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* 5. LIGHTBOX MODAL DIALOG */}
      {lightboxArt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 animate-fadeIn overflow-y-auto">
          <div className="absolute inset-0 cursor-pointer" onClick={() => setLightboxArt(null)} />
          
          <div className="relative bg-[#fff8f4] dark:bg-[#2a2420] rounded-xl max-w-4xl w-full mx-auto overflow-hidden shadow-2xl z-10 flex flex-col md:flex-row border border-[#18241b]/10 dark:border-[#f5ece5]/10">
            {/* Image panel */}
            <div className="p-4 bg-stone-900 md:w-3/5 flex items-center justify-center min-h-[300px] max-h-[70vh]">
              <img
                src={lightboxArt.image}
                alt={lightboxArt.title}
                className="max-w-full max-h-[60vh] object-contain rounded"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Info panel */}
            <div className="p-6 md:p-8 md:w-2/5 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-sans text-[9px] tracking-widest text-[#924c0a] dark:text-[#e2a265] font-bold">
                    CANVAS RECORD
                  </span>
                  <button
                    onClick={() => setLightboxArt(null)}
                    className="p-1 text-[#18241b]/50 dark:text-[#f5ece5]/50 hover:text-[#18241b] dark:hover:text-[#f5ece5] focus:outline-none cursor-pointer"
                  >
                    <X size={20} />
                  </button>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl text-[#18241b] dark:text-[#f5ece5] tracking-wide">
                  {lightboxArt.title}
                </h3>
                <div className="w-12 h-[1px] bg-[#924c0a] dark:bg-[#e2a265]" />

                <div className="space-y-3 pt-2">
                  <div>
                    <span className="font-sans text-[10px] text-[#18241b]/40 dark:text-[#f5ece5]/40 block uppercase tracking-widest">ARTIST PIECE MEDIUM</span>
                    <span className="font-serif text-sm text-[#18241b] dark:text-[#f5ece5]">{lightboxArt.medium}</span>
                  </div>
                  <div>
                    <span className="font-sans text-[10px] text-[#18241b]/40 dark:text-[#f5ece5]/40 block uppercase tracking-widest">RECORDED DATE</span>
                    <span className="font-serif text-sm text-[#18241b] dark:text-[#f5ece5]">{lightboxArt.date}</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-[#18241b]/10 dark:border-[#f5ece5]/10 bg-[#f5ece5]/30 dark:bg-[#1c1814]/30 p-4 rounded-lg">
                <span className="font-sans text-[9px] tracking-widest text-[#18241b]/50 dark:text-[#f5ece5]/50 uppercase font-semibold block">CURATION LOGIC</span>
                <p className="font-serif text-xs text-[#18241b]/70 dark:text-[#f5ece5]/70 leading-relaxed italic mt-1 font-normal">
                  "Watercolor and physical paints act as windows into our memories. This original painting records a specific day we spent listening to waves in the tropical archipelago."
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

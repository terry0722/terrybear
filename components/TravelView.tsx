/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import { MapPin, Calendar, ChevronRight, X, Compass } from "lucide-react";
import { TravelLog, DESTINATION_MAP } from "../types";

interface TravelViewProps {
  travels: TravelLog[];
  isAdmin: boolean;
  onDeleteTravel?: (id: string) => void;
}

export const TravelView: React.FC<TravelViewProps> = ({
  travels,
  isAdmin,
  onDeleteTravel,
}) => {
  const [selectedDestination, setSelectedDestination] = useState<string>("ALL");
  const [expandedLogId, setExpandedLogId] = useState<string | null>(null);

  // Dynamic Destinations list based on actual travel records
  const destinations = useMemo(() => {
    const list = new Set<string>();
    list.add("ALL");
    travels.forEach((t) => {
      if (t.destination) {
        list.add(t.destination.toUpperCase());
      }
    });
    return Array.from(list);
  }, [travels]);

  // Filter logs
  const filteredTravels = useMemo(() => {
    if (selectedDestination === "ALL") return travels;
    return travels.filter((t) => t.destination.toUpperCase() === selectedDestination.toUpperCase());
  }, [travels, selectedDestination]);

  // Travel generic metrics
  const uniqueLocations = useMemo(() => {
    return new Set(travels.map((t) => t.destination.toUpperCase())).size;
  }, [travels]);

  // Featured Travel log (usually the most romantic one, Cebu or Jeju)
  const featuredTravel = useMemo(() => {
    return travels.find(t => t.id === "travel-1") || travels[0];
  }, [travels]);

  return (
    <div className="bg-[#fff8f4] dark:bg-transparent text-[#1f1b17] dark:text-[#f5ece5] py-6 md:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 md:space-y-16 transition-colors duration-300">
      
      {/* 1. TRAVEL SECTION INTRO */}
      <div className="border-b border-[#18241b]/10 dark:border-[#f5ece5]/10 pb-6 text-center md:text-left flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <span className="font-sans text-[10px] tracking-[0.3em] font-semibold text-[#924c0a] dark:text-[#e2a265]">
            MAMA'S JOURNAL / 엄마의 하늘 여행기
          </span>
          <h1 className="font-serif text-3xl md:text-4xl text-[#18241b] dark:text-[#f5ece5] mt-1 font-normal">
            A Voyage of Two Skylines
          </h1>
          <p className="font-serif text-xs md:text-sm text-[#18241b]/60 dark:text-[#f5ece5]/60 italic mt-2">
            Capturing the scent of fresh ocean air and stone alleys, connecting Korea and the Philippine Archipelago.
          </p>
        </div>
        
        {/* Statistics Widgets */}
        <div className="grid grid-cols-3 gap-6 sm:gap-8 bg-[#f5ece5]/60 dark:bg-[#2a2420]/60 border border-[#18241b]/10 dark:border-[#f5ece5]/10 px-6 py-3 rounded-xl mx-auto md:mx-0 transition">
          <div className="text-center">
            <span className="block font-sans text-[9px] tracking-widest text-[#18241b]/50 dark:text-[#f5ece5]/50 uppercase font-semibold">LOCATIONS</span>
            <span className="font-serif text-lg text-[#924c0a] dark:text-[#e2a265] font-normal">{uniqueLocations}</span>
          </div>
          <div className="text-center border-x border-[#18241b]/10 dark:border-[#f5ece5]/10 px-4 sm:px-6">
            <span className="block font-sans text-[9px] tracking-widest text-[#18241b]/50 dark:text-[#f5ece5]/50 uppercase font-semibold">LOGS</span>
            <span className="font-serif text-lg text-[#924c0a] dark:text-[#e2a265] font-normal">{travels.length}</span>
          </div>
          <div className="text-center">
            <span className="block font-sans text-[9px] tracking-widest text-[#18241b]/50 dark:text-[#f5ece5]/50 uppercase font-semibold">COORDINATES</span>
            <span className="font-serif text-lg text-[#924c0a] dark:text-[#e2a265] font-normal">2</span>
          </div>
        </div>
      </div>

      {/* 2. FEATURED TRAVEL BANNER */}
      {featuredTravel && selectedDestination === "ALL" && (
        <section className="relative overflow-hidden rounded-xl h-[24rem] sm:h-[30rem] border border-[#18241b]/10 dark:border-[#f5ece5]/10 shadow-md group transition">
          <img
            src={featuredTravel.image}
            alt={featuredTravel.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-102"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
          
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 text-white flex flex-col justify-end space-y-4 max-w-3xl">
            <div className="flex items-center space-x-2">
              <span className="bg-[#924c0a] dark:bg-[#e2a265] text-white dark:text-[#1c1814] px-2.5 py-0.5 text-[9px] font-sans font-bold tracking-widest rounded uppercase">
                FEATURED EXPEDITION / 추천 여행기
              </span>
              <span className="text-xs font-sans text-stone-200 flex items-center gap-1">
                <MapPin size={12} className="text-[#e2a265]" />
                {DESTINATION_MAP[featuredTravel.destination.toUpperCase()] || featuredTravel.destination}
              </span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl text-white font-normal leading-tight">
              {featuredTravel.title}
            </h2>

            <p className="font-serif text-xs sm:text-sm text-stone-300 leading-relaxed max-w-xl line-clamp-2">
              {featuredTravel.description}
            </p>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-sans text-stone-300">
              <span className="flex items-center gap-1.5">
                <Calendar size={12} className="text-[#e2a265]" />
                {featuredTravel.date}
              </span>
              <button
                onClick={() => setExpandedLogId(expandedLogId === featuredTravel.id ? null : featuredTravel.id)}
                className="text-[#e2a265] hover:text-white font-bold flex items-center space-x-1 cursor-pointer tracking-wider"
              >
                <span>{expandedLogId === featuredTravel.id ? "CLOSE JOURNAL" : "READ THE COMPLETE LOG"}</span>
                <ChevronRight size={14} className={`transform transition-transform ${expandedLogId === featuredTravel.id ? "rotate-90" : ""}`} />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Expanded Featured Log Block */}
      {expandedLogId === featuredTravel?.id && (
        <article className="bg-[#fff] dark:bg-[#2a2420] border border-[#18241b]/10 dark:border-[#f5ece5]/10 p-6 sm:p-10 rounded-xl max-w-4xl mx-auto space-y-4 animate-fadeIn shadow-sm transition">
          <div className="flex items-center justify-between">
            <span className="font-sans text-[10px] tracking-widest text-[#924c0a] dark:text-[#e2a265] font-bold">
              JOURNAL / {DESTINATION_MAP[featuredTravel.destination.toUpperCase()] || featuredTravel.destination}
            </span>
            <button onClick={() => setExpandedLogId(null)} className="text-stone-400 dark:text-stone-500 hover:text-stone-700 dark:hover:text-white cursor-pointer">
              <X size={18} />
            </button>
          </div>
          <h3 className="font-serif text-xl sm:text-2xl text-[#18241b] dark:text-[#f5ece5]">
            {featuredTravel.title}
          </h3>
          <div className="w-12 h-[1px] bg-[#924c0a] dark:bg-[#e2a265] opacity-60" />
          <p className="font-serif text-sm sm:text-base text-[#18241b]/80 dark:text-[#f5ece5]/80 leading-relaxed max-w-2xl whitespace-pre-line select-text font-light">
            {featuredTravel.description}
            {"\n\n"}
            The physical environment shapes our internal landscape. Walking along this bay, looking at the distant fishing boats anchored against the crimson skyline, I realize that our family's choice to live here is not a detachment from Korea. It is an expansion. We are building a larger home in our hearts, one sunset at a time.
          </p>
        </article>
      )}

      {/* 3. NAVIGATION SELECTOR AND TRAVEL LISTING */}
      <section className="space-y-8">
        
        {/* Tabs selector */}
        <div className="flex flex-wrap gap-2 justify-center border-b border-[#18241b]/10 dark:border-[#f5ece5]/10 pb-5">
          {destinations.map((dest) => {
            const displayLabel = dest === "ALL" 
              ? "ALL / 전체보기" 
              : (DESTINATION_MAP[dest.toUpperCase()] || dest);
            return (
              <button
                key={dest}
                onClick={() => setSelectedDestination(dest)}
                className={`px-4 py-2 text-xs font-sans tracking-widest font-semibold rounded cursor-pointer transition-all ${
                  selectedDestination === dest
                    ? "bg-[#924c0a] dark:bg-[#e2a265] text-white dark:text-[#1c1814]"
                    : "text-[#18241b]/60 dark:text-[#f5ece5]/60 hover:text-[#18241b] dark:hover:text-[#f5ece5] hover:bg-[#18241b]/5 dark:hover:bg-[#f5ece5]/5"
                }`}
              >
                {displayLabel}
              </button>
            );
          })}
        </div>

        {/* Dynamic Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {filteredTravels.map((log) => {
            const isLogExpanded = expandedLogId === log.id;
            return (
              <div
                key={log.id}
                className="group flex flex-col bg-[#fff] dark:bg-[#2a2420] border border-[#18241b]/10 dark:border-[#f5ece5]/10 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              >
                {/* Travel Image (Landscape) */}
                <div className="aspect-[16/10] w-full overflow-hidden bg-stone-100 dark:bg-[#1c1814] relative">
                  <img
                    src={log.image}
                    alt={log.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-black/60 dark:bg-[#1c1814]/75 backdrop-blur-md px-3 py-1 rounded text-white text-[10px] font-sans tracking-wider flex items-center gap-1.5">
                    <MapPin size={10} className="text-[#e2a265]" />
                    {DESTINATION_MAP[log.destination.toUpperCase()] || log.destination}
                  </div>
                </div>

                {/* Narrative content block */}
                <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="font-sans text-[10px] text-[#18241b]/45 dark:text-[#f5ece5]/45 font-semibold flex items-center gap-1">
                      <Calendar size={12} />
                      {log.date}
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl text-[#18241b] dark:text-[#f5ece5] group-hover:text-[#924c0a] dark:group-hover:text-[#e2a265] transition-colors leading-snug">
                      {log.title}
                    </h3>
                    <p className="font-serif text-xs sm:text-sm text-[#18241b]/70 dark:text-[#f5ece5]/70 leading-relaxed italic">
                      "{log.description}"
                    </p>
                  </div>

                  {isLogExpanded && log.id !== featuredTravel.id && (
                    <div className="pt-4 border-t border-[#18241b]/10 dark:border-[#f5ece5]/10 font-serif text-sm text-[#18241b] dark:text-[#f5ece5] leading-relaxed whitespace-pre-line select-text font-normal max-w-md animate-fadeIn bg-stone-50/50 dark:bg-[#1c1814]/50 p-3 rounded-lg border-l-2 border-[#924c0a] dark:border-[#e2a265]">
                      {log.description}
                      {"\n\n"}
                      We spent our afternoon collecting wild flowers and sitting looking at the horizon. In Cebu or Jeju, the air behaves differently, carrying scents of rich dry basalt rocks or tropical banana fields. Mama writes these down to ensure we remember the climate of our happiest days.
                    </div>
                  )}

                  <div className="pt-4 border-t border-[#18241b]/5 dark:border-[#f5ece5]/5 flex justify-between items-center text-xs">
                    <button
                      onClick={() => setExpandedLogId(isLogExpanded ? null : log.id)}
                      className="font-sans font-bold text-[#924c0a] dark:text-[#e2a265] hover:text-[#18241b] dark:hover:text-[#f5ece5] tracking-wider flex items-center space-x-1 cursor-pointer"
                    >
                      <span>{isLogExpanded ? "COLLAPSE HISTORY" : "EXPAND VOYAGE LOG"}</span>
                      <ChevronRight size={12} className={`transform transition-transform ${isLogExpanded ? "rotate-90" : ""}`} />
                    </button>

                    {/* Admin Dismiss widget */}
                    {isAdmin && onDeleteTravel && (
                      <button
                        onClick={() => {
                          const destinationLabel = DESTINATION_MAP[log.destination.toUpperCase()] || log.destination;
                          if (confirm(`정말로 ${destinationLabel} 여행 기록을 삭제하시겠습니까? (Do you wish to delete?)`)) {
                            onDeleteTravel(log.id);
                          }
                        }}
                        className="text-[10px] font-sans tracking-wider border border-red-800/20 dark:border-red-500/20 text-red-800 dark:text-red-400 hover:bg-red-800/10 dark:hover:bg-red-800/20 px-2.5 py-0.5 rounded cursor-pointer"
                      >
                        기록 삭제 (RETIRE LOG)
                      </button>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </section>

    </div>
  );
};

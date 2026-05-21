/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { MessageSquare, Send, Calendar, Trash2 } from "lucide-react";
import { GuestbookMessage } from "../types";

interface GuestbookViewProps {
  messages: GuestbookMessage[];
  onAddMessage: (msg: Omit<GuestbookMessage, "id" | "date">) => void;
  onDeleteMessage?: (id: string) => void;
  isAdmin: boolean;
}

export const GuestbookView: React.FC<GuestbookViewProps> = ({
  messages,
  onAddMessage,
  onDeleteMessage,
  isAdmin,
}) => {
  const [name, setName] = useState("");
  const [relation, setRelation] = useState("Family");
  const [messageText, setMessageText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const relations = ["Family", "Relative", "Cousin", "Aunt/Uncle", "Friend", "Other"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !messageText.trim()) return;

    onAddMessage({
      name: name.trim(),
      relation,
      message: messageText.trim(),
    });

    setName("");
    setMessageText("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="bg-[#fff8f4] dark:bg-transparent text-[#1f1b17] dark:text-[#f5ece5] py-6 md:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 md:space-y-16 transition-colors duration-300">
      
      {/* 1. GUESTBOOK BOARD HEADER */}
      <div className="border-b border-[#18241b]/10 dark:border-[#f5ece5]/10 pb-6 text-center md:text-left flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <span className="font-sans text-[10px] tracking-[0.3em] font-semibold text-[#924c0a] dark:text-[#e2a265]">
            DIGITAL FRONT GUESTBOOK / 디지털 방명록
          </span>
          <h1 className="font-serif text-3xl md:text-4xl text-[#18241b] dark:text-[#f5ece5] mt-1 font-normal">
            Visitor's Board & Blessings
          </h1>
          <p className="font-serif text-xs md:text-sm text-[#18241b]/60 dark:text-[#f5ece5]/60 italic mt-2">
            Leave a warm memory, greetings, or signature for our family. All kind relative notes are highly appreciated.
          </p>
        </div>
        <div className="flex justify-center md:justify-end">
          <span className="inline-flex items-center space-x-2 text-xs font-sans font-semibold border-b border-[#924c0a] dark:border-[#e2a265] py-1 text-[#924c0a] dark:text-[#e2a265]">
            <MessageSquare size={14} />
            <span>{messages.length} GREETINGS PUBLISHED</span>
          </span>
        </div>
      </div>

      {/* 2. THE SIGNATURE WIDGET (BOARD WRITE) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
        
        {/* Form Container */}
        <section className="lg:col-span-4 bg-[#f5ece5]/60 dark:bg-[#2a2420]/60 border border-[#18241b]/10 dark:border-[#f5ece5]/10 rounded-xl p-6 sm:p-8 space-y-4 transition">
          <h3 className="font-serif text-lg text-[#18241b] dark:text-[#f5ece5] pb-2 border-b border-[#18241b]/10 dark:border-[#f5ece5]/10">
            Sign the Study Register
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Input Name */}
            <div>
              <label htmlFor="guest_name" className="block text-[10px] font-sans tracking-wider text-[#18241b]/55 dark:text-stone-400 font-semibold uppercase mb-1">
                Your Signature / 성함
              </label>
              <input
                id="guest_name"
                type="text"
                placeholder="Uncle Min-ho / 친척 최서원"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={30}
                required
                className="w-full text-xs sm:text-sm bg-[#fff8f4] dark:bg-[#1c1814] border border-[#18241b]/15 dark:border-[#f5ece5]/15 rounded p-2.5 focus:outline-none focus:border-[#914d0c] dark:focus:border-[#e2a265] text-[#1f1b17] dark:text-[#f5ece5] font-medium"
              />
            </div>

            {/* Selector Relation */}
            <div>
              <label htmlFor="guest_relation" className="block text-[10px] font-sans tracking-wider text-[#18241b]/55 dark:text-stone-400 font-semibold uppercase mb-1">
                Affiliation / 관계
              </label>
              <select
                id="guest_relation"
                value={relation}
                onChange={(e) => setRelation(e.target.value)}
                className="w-full text-xs sm:text-sm bg-[#fff8f4] dark:bg-[#1c1814] border border-[#18241b]/15 dark:border-[#f5ece5]/15 rounded p-2.5 focus:outline-none focus:border-[#914d0c] dark:focus:border-[#e2a265] text-[#1f1b17] dark:text-[#f5ece5] font-medium"
              >
                {relations.map((rel) => (
                  <option key={rel} value={rel}>
                    {rel}
                  </option>
                ))}
              </select>
            </div>

            {/* Textarea Message */}
            <div>
              <label htmlFor="guest_message" className="block text-[10px] font-sans tracking-wider text-[#18241b]/55 dark:text-stone-400 font-semibold uppercase mb-1">
                Warm Message / 방명록 남기기
              </label>
              <textarea
                id="guest_message"
                placeholder="Write your blessing or family greeting here..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                maxLength={400}
                rows={4}
                required
                className="w-full text-xs sm:text-sm bg-[#fff8f4] dark:bg-[#1c1814] border border-[#18241b]/15 dark:border-[#f5ece5]/15 rounded p-2.5 focus:outline-none focus:border-[#914d0c] dark:focus:border-[#e2a265] text-[#1f1b17] dark:text-[#f5ece5]"
              />
            </div>

            {submitted && (
              <div className="p-3 bg-emerald-600/10 text-emerald-800 dark:text-emerald-300 rounded border border-emerald-600/20 text-xs text-center font-sans tracking-wider font-semibold">
                ✓ Blessing Successfully Signed
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#18241b] dark:bg-[#e2a265] hover:bg-[#2c3d31] dark:hover:bg-[#f5ece5] text-white dark:text-[#1c1814] py-3 rounded font-sans text-xs tracking-widest font-bold flex items-center justify-center space-x-2 cursor-pointer transition-colors duration-200 shadow-md"
            >
              <Send size={12} />
              <span>SIGN REGISTRATION BOOK</span>
            </button>
          </form>

          <p className="font-serif text-[11px] text-[#18241b]/50 dark:text-[#f5ece5]/50 italic leading-relaxed text-center pt-2">
            "Every signature is a thread that strengthens our physical domestic ties."
          </p>
        </section>

        {/* Messages List */}
        <section className="lg:col-span-8 space-y-6">
          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-[#18241b]/15 dark:border-[#f5ece5]/15 rounded-xl bg-white/50 dark:bg-transparent">
                <MessageSquare className="mx-auto text-stone-300 dark:text-stone-700 mb-2" size={32} />
                <p className="font-serif text-lg text-stone-500 italic">"The guest register is currently empty. Be the first to sign."</p>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className="bg-white dark:bg-[#2a2420] border border-[#18241b]/10 dark:border-[#f5ece5]/10 rounded-xl p-6 shadow-sm hover:shadow-md transition-all relative group"
                >
                  {/* Visual Wax Seal / Signature Stamp element */}
                  <div className="absolute right-6 top-6 w-9 h-9 opacity-15 text-[#924c0a] dark:text-[#e2a265] flex items-center justify-center border-2 border-dashed border-current rounded-full rotate-12 select-none pointer-events-none">
                    <span className="font-serif text-[8.5px] font-bold tracking-widest">YOO</span>
                  </div>

                  {/* Header info */}
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#f5ece5] dark:bg-[#1c1814] flex items-center justify-center text-[#924c0a] dark:text-[#e2a265] font-serif font-bold text-sm">
                      {msg.name.substring(0, 1)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-serif text-sm font-semibold text-[#18241b] dark:text-[#f5ece5]">{msg.name}</span>
                        <span className="font-sans text-[9px] bg-[#924c0a]/10 dark:bg-[#e2a265]/20 text-[#924c0a] dark:text-[#e2a265] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                          {msg.relation}
                        </span>
                      </div>
                      <span className="font-sans text-[10px] text-[#18241b]/40 dark:text-[#f5ece5]/40 flex items-center gap-1 mt-0.5">
                        <Calendar size={10} />
                        {msg.date}
                      </span>
                    </div>
                  </div>

                  {/* Message body */}
                  <p className="font-serif text-sm text-[#18241b]/80 dark:text-[#f5ece5]/80 mt-4 leading-relaxed whitespace-pre-line italic bg-stone-50/50 dark:bg-[#1c1814]/50 p-3 rounded-lg border-l border-stone-200 dark:border-stone-800">
                    "{msg.message}"
                  </p>

                  {/* Admin Trash Action */}
                  {isAdmin && onDeleteMessage && (
                    <button
                      onClick={() => {
                        if (confirm(`Do you wish to delete blessing from ${msg.name}?`)) {
                          onDeleteMessage(msg.id);
                        }
                      }}
                      className="absolute right-4 bottom-4 text-xs font-sans tracking-wider border border-red-800/20 text-red-800 dark:text-red-400 hover:bg-red-800/10 p-1.5 rounded cursor-pointer lg:opacity-0 lg:group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={12} />
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </section>

      </div>

    </div>
  );
};

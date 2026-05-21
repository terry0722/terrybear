/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Lock, Unlock, Key, Plus, FileText, Camera, Palette, CheckCircle } from "lucide-react";
import { Article, Artwork, TravelLog } from "../types";

interface AdminViewProps {
  isAdmin: boolean;
  onLogin: (passcode: string) => boolean;
  onLogout: () => void;
  onAddArticle: (article: Omit<Article, "id">) => void;
  onAddArtwork: (artwork: Omit<Artwork, "id">) => void;
  onAddTravel: (travel: Omit<TravelLog, "id">) => void;
}

export const AdminView: React.FC<AdminViewProps> = ({
  isAdmin,
  onLogin,
  onLogout,
  onAddArticle,
  onAddArtwork,
  onAddTravel,
}) => {
  const [passcode, setPasscode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Blog states
  const [blogTitle, setBlogTitle] = useState("");
  const [blogCategory, setBlogCategory] = useState("REFLECTIONS");
  const [blogExcerpt, setBlogExcerpt] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [blogImage, setBlogImage] = useState("");

  // Art states
  const [artTitle, setArtTitle] = useState("");
  const [artMedium, setArtMedium] = useState("Watercolor on Arches Paper");
  const [artDate, setArtDate] = useState("");
  const [artImage, setArtImage] = useState("");

  // Travel states
  const [travelTitle, setTravelTitle] = useState("");
  const [travelDestination, setTravelDestination] = useState("MANILA, PH");
  const [travelDate, setTravelDate] = useState("");
  const [travelDesc, setTravelDesc] = useState("");
  const [travelImage, setTravelImage] = useState("");

  // Success signals
  const [successMsg, setSuccessMsg] = useState("");

  // Preset aesthetic Unsplash image hotlinks that look stunning in our archive!
  const presets = [
    { name: "Sunset Manila", url: "https://images.unsplash.com/photo-1496568818309-53d7c7753022?h=800&auto=format&fit=crop" },
    { name: "Seoul Alleyway", url: "https://images.unsplash.com/photo-1508004526068-1526a48cbdac?h=800&auto=format&fit=crop" },
    { name: "Jeju Coastal Path", url: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?h=800&auto=format&fit=crop" },
    { name: "Vintage Pen Ink", url: "https://images.unsplash.com/photo-1455390582262-044cdead277a?h=800&auto=format&fit=crop" },
    { name: "Study Books Desk", url: "https://images.unsplash.com/photo-1512820790803-83ca734da794?h=800&auto=format&fit=crop" },
    { name: "Aesthetic Paints", url: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?h=800&auto=format&fit=crop" },
  ];

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onLogin(passcode);
    if (success) {
      setErrorMsg("");
      setPasscode("");
    } else {
      setErrorMsg("Incorrect secret passcode. Hints: 1234 or onceagain");
    }
  };

  const triggerSuccessPopup = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  const handlePublishBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogTitle || !blogContent) return;

    onAddArticle({
      title: blogTitle,
      category: blogCategory,
      date: new Date().toLocaleDateString("en-US", { month: "long", day: "2-digit", year: "numeric" }),
      excerpt: blogExcerpt || blogContent.substring(0, 100) + "...",
      content: blogContent,
      image: blogImage || "https://images.unsplash.com/photo-1512820790803-83ca734da794?h=800&auto=format&fit=crop",
      author: "Papa 아빠",
    });

    setBlogTitle("");
    setBlogExcerpt("");
    setBlogContent("");
    setBlogImage("");
    triggerSuccessPopup("✓ New Chronicle Published to Papa's Study!");
  };

  const handlePublishArt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!artTitle) return;

    onAddArtwork({
      title: artTitle,
      medium: artMedium,
      date: artDate || new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
      image: artImage || "https://images.unsplash.com/photo-1513364776144-60967b0f800f?h=800&auto=format&fit=crop",
    });

    setArtTitle("");
    setArtImage("");
    triggerSuccessPopup("✓ New Artwork Added to Daughter's Collection!");
  };

  const handlePublishTravel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!travelTitle || !travelDesc) return;

    onAddTravel({
      title: travelTitle,
      destination: travelDestination,
      date: travelDate || new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
      description: travelDesc,
      image: travelImage || "https://images.unsplash.com/photo-1496568818309-53d7c7753022?h=800&auto=format&fit=crop",
    });

    setTravelTitle("");
    setTravelDate("");
    setTravelDesc("");
    setTravelImage("");
    triggerSuccessPopup("✓ New Travel Log Added into Mama's Journal!");
  };

  if (!isAdmin) {
    return (
      <div className="bg-[#fff8f4] dark:bg-transparent text-[#1f1b17] dark:text-[#f5ece5] py-12 px-4 sm:px-6 lg:px-8 max-w-lg mx-auto min-h-[50vh] flex flex-col justify-center">
        <div className="border border-[#18241b]/10 dark:border-[#f5ece5]/10 bg-[#f5ece5]/60 dark:bg-[#2a2420]/60 rounded-2xl p-8 space-y-6 shadow-sm text-center">
          
          <div className="w-16 h-16 bg-[#18241b] dark:bg-[#e2a265] rounded-full mx-auto flex items-center justify-center text-white dark:text-[#1c1814]">
            <Lock size={24} />
          </div>

          <div className="space-y-2">
            <h1 className="font-serif text-2xl text-[#18241b] dark:text-[#f5ece5]">Private Storage Chest</h1>
            <p className="font-serif text-xs text-[#18241b]/60 dark:text-[#f5ece5]/60 italic">
              Access is reserved exclusively for family curators (Papa, Mama, Daughter) to register documents, art, or travel logs.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="password"
                placeholder="Enter Family Passcode..."
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                required
                className="w-full text-center tracking-[0.25em] bg-white dark:bg-[#1c1814] border border-[#18241b]/15 dark:border-[#f5ece5]/15 rounded p-3 text-sm focus:outline-none focus:border-[#924c0a] dark:focus:border-[#e2a265] text-[#1f1b17] dark:text-[#f5ece5] font-bold"
              />
              <Key className="absolute left-3 top-3.5 text-stone-300 dark:text-stone-600" size={16} />
            </div>

            {errorMsg && (
              <p className="font-sans text-[11px] text-red-800 dark:text-red-300 font-bold bg-red-800/10 dark:bg-red-800/20 p-2.5 rounded border border-red-800/20 dark:border-red-800/30">
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-[#18241b] dark:bg-[#e2a265] hover:bg-[#25362a] dark:hover:bg-[#f5ece5] text-white dark:text-[#1c1814] py-3 rounded font-sans text-xs tracking-widest font-bold flex items-center justify-center space-x-2 cursor-pointer transition-colors"
            >
              <Unlock size={14} />
              <span>UNLOCK STORAGE CHEST</span>
            </button>
          </form>

          <div className="border-t border-[#18241b]/10 dark:border-[#f5ece5]/10 pt-4 text-left">
            <h4 className="font-sans text-[10px] tracking-wider text-[#924c0a] dark:text-[#e2a265] font-bold uppercase mb-1">Passcode Guidance</h4>
            <ul className="list-disc list-inside font-serif text-[11px] text-[#18241b]/60 dark:text-[#f5ece5]/60 space-y-1">
              <li>Use the key <code className="bg-stone-200 dark:bg-[#1c1814] px-1 rounded text-[#18241b] dark:text-[#f5ece5] font-mono font-bold">1234</code> or <code className="bg-stone-200 dark:bg-[#1c1814] px-1 rounded text-[#18241b] dark:text-[#f5ece5] font-mono font-bold">onceagain</code> to test mock integration edits.</li>
              <li>Once unlocked, you will gain access to complete publishing boards.</li>
            </ul>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fff8f4] dark:bg-transparent text-[#1f1b17] dark:text-[#f5ece5] py-6 md:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 transition-colors duration-300">
      
      {/* SUCCESS ALERTER */}
      {successMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-800 dark:bg-emerald-950 text-white shadow-xl px-5 py-4 rounded-xl border border-emerald-600 dark:border-emerald-800 flex items-center space-x-3 animate-slideIn">
          <CheckCircle size={20} className="text-emerald-300 flex-shrink-0" />
          <span className="font-sans text-xs md:text-sm font-semibold tracking-wide">{successMsg}</span>
        </div>
      )}

      {/* 1. ARCHIVE CONTROLS INTRO */}
      <div className="border-b border-[#18241b]/10 dark:border-[#f5ece5]/10 pb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-center sm:text-left">
          <span className="font-sans text-[10px] tracking-[0.3em] font-semibold text-[#924c0a] dark:text-[#e2a265]">
            SECURE CURATION DASHBOARD / 관리자 콘솔
          </span>
          <h1 className="font-serif text-3xl md:text-4xl text-[#18241b] dark:text-[#f5ece5] mt-1 font-normal">
            Heirloom Console
          </h1>
          <p className="font-serif text-xs md:text-sm text-[#18241b]/60 dark:text-[#f5ece5]/60 italic mt-1">
            Author and publish beautiful catalog cards live into the family memory archive state database.
          </p>
        </div>
        <button
          onClick={onLogout}
          className="px-4 py-2 bg-red-800 dark:bg-red-750 text-white hover:bg-red-900 dark:hover:bg-red-850 rounded font-sans text-xs tracking-wider font-semibold shadow-sm cursor-pointer transition-colors"
        >
          LOGOUT CONSOLE
        </button>
      </div>

      {/* Helper preset link library */}
      <section className="bg-[#f5ece5] dark:bg-[#2a2420] border border-[#18241b]/10 dark:border-[#f5ece5]/10 rounded-xl p-5 space-y-3">
        <h3 className="font-serif text-sm font-semibold text-[#18241b] dark:text-[#f5ece5] flex items-center gap-1.5">
          <Key size={14} className="text-[#924c0a] dark:text-[#e2a265]" />
          <span>Aesthetic Image Hotlink Library (Simply click any button to copy link to inputs)</span>
        </h3>
        <p className="font-serif text-xs text-[#18241b]/75 dark:text-[#f5ece5]/75">
          We support hot-linking ANY online image file in HTML form directly. Below are specific custom Unsplash images that match our elegant vintage look:
        </p>
        <div className="flex flex-wrap gap-2.5">
          {presets.map((p) => (
            <button
              key={p.name}
              onClick={() => {
                setBlogImage(p.url);
                setArtImage(p.url);
                setTravelImage(p.url);
                alert(`"${p.name}" Hotlink URL populated in image fields!`);
              }}
              className="px-2.5 py-1.5 bg-white dark:bg-[#1c1814] border border-[#18241b]/10 dark:border-[#f5ece5]/10 hover:border-[#924c0a] dark:hover:border-[#e2a265] rounded text-[10px] font-sans tracking-wide text-[#18241b] dark:text-[#f5ece5] font-medium flex items-center gap-1 cursor-pointer transition-all hover:-translate-y-0.5"
            >
              <span>{p.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* 2. THREE CORE PUBLISHING BOARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Form A: Papa's Blog Post */}
        <div className="bg-white dark:bg-[#2a2420] border border-[#18241b]/10 dark:border-[#f5ece5]/10 p-6 rounded-xl flex flex-col justify-between space-y-4 shadow-sm">
          <div className="space-y-4">
            <h3 className="font-serif text-lg text-[#18241b] dark:text-[#f5ece5] border-b border-[#18241b]/5 dark:border-[#f5ece5]/5 pb-2 flex items-center gap-2">
              <FileText className="text-[#924c0a] dark:text-[#e2a265]" size={18} />
              <span>Publish Study Chronicle</span>
            </h3>

            <form onSubmit={handlePublishBlog} className="space-y-3">
              <div>
                <label className="block text-[10px] font-sans text-stone-500 dark:text-stone-400 font-semibold uppercase tracking-wider mb-1">Chronicle Title</label>
                <input
                  type="text"
                  placeholder="e.g. The Quiet Woods of Korea"
                  value={blogTitle}
                  onChange={(e) => setBlogTitle(e.target.value)}
                  required
                  className="w-full text-xs font-serif bg-stone-50 dark:bg-[#1c1814] border border-[#18241b]/10 dark:border-[#f5ece5]/10 rounded p-2 focus:outline-none focus:border-[#924c0a] dark:focus:border-[#e2a265] text-black dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-sans text-stone-500 dark:text-stone-400 font-semibold uppercase tracking-wider mb-1">Category</label>
                  <select
                    value={blogCategory}
                    onChange={(e) => setBlogCategory(e.target.value)}
                    className="w-full text-xs bg-stone-50 dark:bg-[#1c1814] border border-[#18241b]/10 dark:border-[#f5ece5]/10 rounded p-2 focus:outline-none focus:border-[#924c0a] dark:focus:border-[#e2a265] text-black dark:text-white"
                  >
                    <option value="REFLECTIONS">REFLECTIONS</option>
                    <option value="ARCHITECTURE">ARCHITECTURE</option>
                    <option value="LEGACY">LEGACY</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-sans text-stone-500 dark:text-stone-400 font-semibold uppercase tracking-wider mb-1">Image Hotlink URL</label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={blogImage}
                    onChange={(e) => setBlogImage(e.target.value)}
                    className="w-full text-xs bg-stone-50 dark:bg-[#1c1814] border border-[#18241b]/10 dark:border-[#f5ece5]/10 rounded p-2 focus:outline-none focus:border-[#924c0a] dark:focus:border-[#e2a265] text-black dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-sans text-stone-500 dark:text-stone-400 font-semibold uppercase tracking-wider mb-1">Short Excerpt Summary</label>
                <input
                  type="text"
                  placeholder="Ex. Brief overview of direct light shadows..."
                  value={blogExcerpt}
                  onChange={(e) => setBlogExcerpt(e.target.value)}
                  className="w-full text-xs font-serif bg-stone-50 dark:bg-[#1c1814] border border-[#18241b]/10 dark:border-[#f5ece5]/10 rounded p-2 focus:outline-none focus:border-[#924c0a] dark:focus:border-[#e2a265] text-black dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-sans text-stone-500 dark:text-stone-400 font-semibold uppercase tracking-wider mb-1">Long Article Content</label>
                <textarea
                  placeholder="Type full observations or family wisdom journal..."
                  value={blogContent}
                  onChange={(e) => setBlogContent(e.target.value)}
                  rows={5}
                  required
                  className="w-full text-xs bg-stone-50 dark:bg-[#1c1814] border border-[#18241b]/10 dark:border-[#f5ece5]/10 rounded p-2 focus:outline-none focus:border-[#924c0a] dark:focus:border-[#e2a265] text-black dark:text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#924c0a] hover:bg-[#a35e19] text-[#fff8f4] dark:bg-[#e2a265] dark:text-[#1c1814] dark:hover:bg-[#f5ece5] py-2.5 rounded font-sans text-xs tracking-widest font-semibold flex items-center justify-center space-x-1.5 cursor-pointer shadow-md transition"
              >
                <Plus size={14} />
                <span>PUBLISH TO PAPA'S STUDY</span>
              </button>
            </form>
          </div>
        </div>

        {/* Form B: Daughter's Artwork */}
        <div className="bg-white dark:bg-[#2a2420] border border-[#18241b]/10 dark:border-[#f5ece5]/10 p-6 rounded-xl flex flex-col justify-between space-y-4 shadow-sm">
          <div className="space-y-4">
            <h3 className="font-serif text-lg text-[#18241b] dark:text-[#f5ece5] border-b border-[#18241b]/5 dark:border-[#f5ece5]/5 pb-2 flex items-center gap-2">
              <Palette className="text-[#924c0a] dark:text-[#e2a265]" size={18} />
              <span>Offer Artwork Masterpiece</span>
            </h3>

            <form onSubmit={handlePublishArt} className="space-y-3">
              <div>
                <label className="block text-[10px] font-sans text-stone-500 dark:text-stone-400 font-semibold uppercase tracking-wider mb-1">Painting Title</label>
                <input
                  type="text"
                  placeholder="e.g. Under the Cebu Canopy"
                  value={artTitle}
                  onChange={(e) => setArtTitle(e.target.value)}
                  required
                  className="w-full text-xs font-serif bg-stone-50 dark:bg-[#1c1814] border border-[#18241b]/10 dark:border-[#f5ece5]/10 rounded p-2 focus:outline-none focus:border-[#924c0a] dark:focus:border-[#e2a265] text-black dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-sans text-stone-500 dark:text-stone-400 font-semibold uppercase tracking-wider mb-1">Aesthetic Medium</label>
                <input
                  type="text"
                  placeholder="e.g. Watercolor on Arches Paper"
                  value={artMedium}
                  onChange={(e) => setArtMedium(e.target.value)}
                  required
                  className="w-full text-xs bg-stone-50 dark:bg-[#1c1814] border border-[#18241b]/10 dark:border-[#f5ece5]/10 rounded p-2 focus:outline-none focus:border-[#924c0a] dark:focus:border-[#e2a265] text-black dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-sans text-stone-500 dark:text-stone-400 font-semibold uppercase tracking-wider mb-1">Recorded Date</label>
                  <input
                    type="text"
                    placeholder="e.g. July 2025"
                    value={artDate}
                    onChange={(e) => setArtDate(e.target.value)}
                    className="w-full text-xs bg-stone-50 dark:bg-[#1c1814] border border-[#18241b]/10 dark:border-[#f5ece5]/10 rounded p-2 focus:outline-none focus:border-[#924c0a] dark:focus:border-[#e2a265] text-black dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-sans text-stone-500 dark:text-stone-400 font-semibold uppercase tracking-wider mb-1">Art Image Hotlink</label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={artImage}
                    onChange={(e) => setArtImage(e.target.value)}
                    className="w-full text-xs bg-stone-50 dark:bg-[#1c1814] border border-[#18241b]/10 dark:border-[#f5ece5]/10 rounded p-2 focus:outline-none focus:border-[#924c0a] dark:focus:border-[#e2a265] text-black dark:text-white"
                  />
                </div>
              </div>

              <div className="p-3.5 bg-[#f5ece5]/60 dark:bg-[#1c1814]/60 rounded border border-[#18241b]/5 dark:border-[#f5ece5]/5 text-center">
                <span className="font-sans text-[9px] tracking-widest text-[#924c0a] dark:text-[#e2a265] font-bold block">NOTE FOR ARTWORKS</span>
                <p className="font-serif text-[11px] text-[#18241b]/70 dark:text-[#f5ece5]/70 mt-1 italic leading-relaxed">
                  "Paintings are automatically registered in the watercolor gallery system under 'DAUGHTER'S GRAPHICS'."
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-[#924c0a] hover:bg-[#a35e19] text-[#fff8f4] dark:bg-[#e2a265] dark:text-[#1c1814] dark:hover:bg-[#f5ece5] py-2.5 rounded font-sans text-xs tracking-widest font-semibold flex items-center justify-center space-x-1.5 cursor-pointer shadow-md transition"
              >
                <Plus size={14} />
                <span>OFFER TO PUBLIC GALLERY</span>
              </button>
            </form>
          </div>
        </div>

        {/* Form C: Mama's Travel record */}
        <div className="bg-white dark:bg-[#2a2420] border border-[#18241b]/10 dark:border-[#f5ece5]/10 p-6 rounded-xl flex flex-col justify-between space-y-4 shadow-sm">
          <div className="space-y-4">
            <h3 className="font-serif text-lg text-[#18241b] dark:text-[#f5ece5] border-b border-[#18241b]/5 dark:border-[#f5ece5]/5 pb-2 flex items-center gap-2">
              <Camera className="text-[#924c0a] dark:text-[#e2a265]" size={18} />
              <span>Index Travel Record</span>
            </h3>

            <form onSubmit={handlePublishTravel} className="space-y-3">
              <div>
                <label className="block text-[10px] font-sans text-stone-500 dark:text-stone-400 font-semibold uppercase tracking-wider mb-1">Travel Log Title</label>
                <input
                  type="text"
                  placeholder="e.g. Walking Cebu's Basalt Shores"
                  value={travelTitle}
                  onChange={(e) => setTravelTitle(e.target.value)}
                  required
                  className="w-full text-xs font-serif bg-stone-50 dark:bg-[#1c1814] border border-[#18241b]/10 dark:border-[#f5ece5]/10 rounded p-2 focus:outline-none focus:border-[#924c0a] dark:focus:border-[#e2a265] text-black dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-sans text-stone-500 dark:text-stone-400 font-semibold uppercase tracking-wider mb-1">Destination Tag</label>
                  <select
                    value={travelDestination}
                    onChange={(e) => setTravelDestination(e.target.value)}
                    className="w-full text-xs bg-stone-50 dark:bg-[#1c1814] border border-[#18241b]/10 dark:border-[#f5ece5]/10 rounded p-2 focus:outline-none focus:border-[#924c0a] dark:focus:border-[#e2a265] text-black dark:text-white"
                  >
                    <option value="MANILA, PH">MANILA, PH</option>
                    <option value="SEOUL, KR">SEOUL, KR</option>
                    <option value="CEBU, PH">CEBU, PH</option>
                    <option value="JEJU, KR">JEJU, KR</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-sans text-stone-500 dark:text-stone-400 font-semibold uppercase tracking-wider mb-1">Recorded Date</label>
                  <input
                    type="text"
                    placeholder="e.g. October 2024"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full text-xs bg-stone-50 dark:bg-[#1c1814] border border-[#18241b]/10 dark:border-[#f5ece5]/10 rounded p-2 focus:outline-none focus:border-[#924c0a] dark:focus:border-[#e2a265] text-black dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-sans text-stone-500 dark:text-stone-400 font-semibold uppercase tracking-wider mb-1">Photo Hotlink URL</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={travelImage}
                  onChange={(e) => setTravelImage(e.target.value)}
                  className="w-full text-xs bg-stone-50 dark:bg-[#1c1814] border border-[#18241b]/10 dark:border-[#f5ece5]/10 rounded p-2 focus:outline-none focus:border-[#924c0a] dark:focus:border-[#e2a265] text-black dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-sans text-stone-500 dark:text-stone-400 font-semibold uppercase tracking-wider mb-1">Travel Story Description</label>
                <textarea
                  placeholder="Type an elegant description of scents, winds, or local people..."
                  value={travelDesc}
                  onChange={(e) => setTravelDesc(e.target.value)}
                  rows={4}
                  required
                  className="w-full text-xs bg-stone-50 dark:bg-[#1c1814] border border-[#18241b]/10 dark:border-[#f5ece5]/10 rounded p-2 focus:outline-none focus:border-[#924c0a] dark:focus:border-[#e2a265] text-black dark:text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#924c0a] hover:bg-[#a35e19] text-[#fff8f4] dark:bg-[#e2a265] dark:text-[#1c1814] dark:hover:bg-[#f5ece5] py-2.5 rounded font-sans text-xs tracking-widest font-semibold flex items-center justify-center space-x-1.5 cursor-pointer shadow-md transition"
              >
                <Plus size={14} />
                <span>INDEX VOYAGE RECORD</span>
              </button>
            </form>
          </div>
        </div>

      </div>

    </div>
  );
};

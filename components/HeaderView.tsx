/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Menu, X, Lock, Unlock } from "lucide-react";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isAdmin: boolean;
  onLogout: () => void;
  onOpenLogin: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  isAdmin,
  onLogout,
  onOpenLogin,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Sync global dark mode state
  useEffect(() => {
    if (document.documentElement.classList.contains("dark")) {
      setIsDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.remove("dark");
      setIsDarkMode(false);
    } else {
      root.classList.add("dark");
      setIsDarkMode(true);
    }
  };

  const navItems = [
    { id: "home", label: "HOME", subtitle: "시작" },
    { id: "story", label: "PAPA'S STUDY", subtitle: "아빠의 서재" },
    { id: "gallery", label: "GALLERY", subtitle: "가족 사진" },
    { id: "artgallery", label: "ART GALLERY", subtitle: "딸의 그림" },
    { id: "travel", label: "MAMA'S TRAVEL", subtitle: "엄마의 여행" },
    { id: "guestbook", label: "GUESTBOOK", subtitle: "방명록" },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#fff8f4]/90 dark:bg-[#1c1814]/90 backdrop-blur-md border-b border-[#18241b]/10 dark:border-[#f5ece5]/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 md:h-24">
          
          {/* Logo Brand */}
          <button
            onClick={() => handleNavClick("home")}
            className="flex flex-col items-start focus:outline-none group text-left cursor-pointer"
          >
            <span className="font-serif italic text-2xl md:text-3xl text-[#18241b] dark:text-[#f5ece5] tracking-wide group-hover:text-[#924c0a] dark:group-hover:text-[#e2a265] transition-colors duration-300">
              Once, Again
            </span>
            <span className="font-sans text-[9px] tracking-[0.25em] text-[#18241b]/60 dark:text-[#f5ece5]/60 font-medium">
              THE YOO FAMILY ARCHIVE
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-4 py-2 flex flex-col items-center group focus:outline-none transition-all cursor-pointer`}
                >
                  <span
                    className={`font-sans text-xs tracking-widest font-semibold ${
                      isActive ? "text-[#924c0a] dark:text-[#e2a265]" : "text-[#18241b]/75 dark:text-[#f5ece5]/75 group-hover:text-[#18241b] dark:group-hover:text-[#f5ece5]"
                    } transition-colors duration-200`}
                  >
                    {item.label}
                  </span>
                  <span
                    className={`font-serif text-[10px] italic mt-0.5 ${
                      isActive ? "text-[#924c0a]/70 dark:text-[#e2a265]/70" : "text-[#18241b]/40 dark:text-[#f5ece5]/40"
                    }`}
                  >
                    {item.subtitle}
                  </span>
                  
                  {/* Underline Indicator */}
                  {isActive && (
                    <span className="absolute bottom-0 left-4 right-4 h-[1px] bg-[#924c0a] dark:bg-[#e2a265]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Admin / Action Button & Dark Mode Toggle */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button 
              onClick={toggleDarkMode}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-[#18241b]/5 dark:bg-[#f5ece5]/5 text-[#18241b] dark:text-[#e2a265] transition-colors duration-300 hover:scale-110 cursor-pointer border border-[#18241b]/10 dark:border-[#f5ece5]/10"
              title="Toggle Dark Mode"
            >
              {isDarkMode ? "🌙" : "☀️"}
            </button>

            {isAdmin ? (
              <div className="flex items-center space-x-3">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-[#18241b]/5 dark:bg-[#f5ece5]/5 text-[#18241b] dark:text-[#f5ece5] border border-[#18241b]/10 dark:border-[#f5ece5]/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mr-1.5 animate-pulse" />
                  Papa Active
                </span>
                <button
                  onClick={onLogout}
                  className="flex items-center space-x-1 px-3 py-1.5 border border-[#18241b]/20 dark:border-[#f5ece5]/20 hover:border-[#18241b] dark:hover:border-[#f5ece5] text-[#18241b] dark:text-[#f5ece5] rounded font-sans text-xs tracking-wider transition-all duration-200 cursor-pointer"
                >
                  <Unlock size={12} />
                  <span>LOGOUT</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenLogin}
                className="flex items-center space-x-1.5 px-4 py-2 border border-[#18241b]/20 dark:border-[#f5ece5]/20 hover:border-[#18241b] dark:hover:border-[#f5ece5] hover:bg-[#18241b]/5 dark:hover:bg-[#f5ece5]/5 text-[#18241b] dark:text-[#f5ece5] font-sans text-xs tracking-wider font-semibold rounded transition-all duration-300 cursor-pointer"
              >
                <Lock size={12} className="text-[#18241b]/70 dark:text-[#f5ece5]/70" />
                <span>PRIVATE SPACE</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex lg:hidden items-center space-x-3">
            {/* Dark Mode Toggle */}
            <button 
              onClick={toggleDarkMode}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-[#18241b]/5 dark:bg-[#f5ece5]/5 text-[#18241b] dark:text-[#e2a265] transition-colors duration-300 hover:scale-110 cursor-pointer border border-[#18241b]/10 dark:border-[#f5ece5]/10"
              title="Toggle Dark Mode"
            >
              {isDarkMode ? "🌙" : "☀️"}
            </button>

            {isAdmin && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#18241b]/5 dark:bg-[#f5ece5]/5 text-[#18241b] dark:text-[#f5ece5]">
                PAPA
              </span>
            )}
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-[#18241b] dark:text-[#f5ece5] hover:text-[#924c0a] dark:hover:text-[#e2a265] focus:outline-none cursor-pointer"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden border-t border-[#18241b]/10 dark:border-[#f5ece5]/10 bg-[#fff8f4] dark:bg-[#1c1814] px-4 pt-4 pb-6 space-y-3 shadow-lg transition-colors duration-300">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-3 py-3 rounded-md flex justify-between items-center cursor-pointer ${
                    isActive ? "bg-[#f5ece5] dark:bg-[#2a2420] text-[#924c0a] dark:text-[#e2a265]" : "hover:bg-[#f5ece5]/50 dark:hover:bg-[#2a2420]/50 text-[#18241b] dark:text-[#f5ece5]"
                  }`}
                >
                  <span className="font-sans text-sm tracking-wider font-semibold">
                    {item.label}
                  </span>
                  <span className="font-serif text-xs italic opacity-70">
                    {item.subtitle}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-[#18241b]/10 dark:border-[#f5ece5]/10 flex flex-col space-y-2">
            {isAdmin ? (
              <div className="space-y-3">
                <div className="px-3 py-2 text-xs text-[#18241b]/70 dark:text-[#f5ece5]/70 bg-[#18241b]/5 dark:bg-[#f5ece5]/5 rounded text-center">
                  Signed in as <strong>Papa (Admin)</strong>
                </div>
                <button
                  onClick={() => {
                    onLogout();
                    setIsOpen(false);
                  }}
                  className="w-full py-2.5 bg-red-800 dark:bg-red-700 text-white font-sans text-xs tracking-widest font-semibold rounded text-center cursor-pointer"
                >
                  LOG OUT
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  onOpenLogin();
                  setIsOpen(false);
                }}
                className="w-full py-2.5 border border-[#18241b] dark:border-[#f5ece5] text-[#18241b] dark:text-[#f5ece5] hover:bg-[#18241b]/5 dark:hover:bg-[#f5ece5]/5 font-sans text-xs tracking-widest font-semibold rounded text-center flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Lock size={12} />
                <span>PRIVATE SPACE</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

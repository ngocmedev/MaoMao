"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Menu,
  Volume2,
  Clock,
} from "lucide-react";
import { speakChinese } from "@/lib/utils";

interface AppHeaderProps {
  onToggleSidebar?: () => void;
  onOpenMobileMenu?: () => void;
  title?: string;
  subtitle?: string;
}

export function AppHeader({
  onToggleSidebar,
  onOpenMobileMenu,
  title,
  subtitle,
}: AppHeaderProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/vocabulary?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleQuickSpeak = () => {
    speakChinese("你好！欢迎来到 MaoMao 学习空间。");
  };

  return (
    <header className="sticky top-0 z-20 h-16 w-full bg-white/70 backdrop-blur-xl border-b border-[#E3EAF4] px-4 md:px-6 flex items-center justify-between gap-4">
      {/* Left section: Menu buttons & titles */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="md:hidden p-2 rounded-xl text-[#778198] hover:text-[#202A3B] hover:bg-[#F5F9FF] transition-colors"
          aria-label="Mở menu di động"
        >
          <Menu className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={onToggleSidebar}
          className="hidden md:flex p-2 rounded-xl text-[#778198] hover:text-[#202A3B] hover:bg-[#F5F9FF] transition-colors"
          aria-label="Thu gọn hoặc mở rộng thanh điều hướng"
        >
          <Menu className="w-5 h-5" />
        </button>

        {title && (
          <div className="flex flex-col min-w-0">
            <h1 className="text-base md:text-lg font-bold text-[#202A3B] truncate leading-tight">
              {title}
            </h1>
            {subtitle && (
              <span className="text-xs text-[#778198] truncate hidden sm:block">
                {subtitle}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Middle section: Global search */}
      <div className="flex-1 max-w-md hidden lg:block">
        <form onSubmit={handleSearchSubmit} className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#778198]" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tra cứu chữ Hán, pinyin hoặc nghĩa tiếng Việt..."
            className="w-full pl-10 pr-4 py-2 bg-[#F5F9FF]/90 border border-[#E3EAF4] rounded-xl text-xs md:text-sm text-[#202A3B] placeholder-[#9BA6BA] focus:outline-none focus:ring-2 focus:ring-[#4F83F1]/30 focus:border-[#4F83F1] transition-all"
          />
        </form>
      </div>

      {/* Right section: Daily goal pill, Audio tester, Profile chip */}
      <div className="flex items-center gap-2.5 shrink-0">
        {/* Chinese Speech Audio Quick Tester */}
        <button
          type="button"
          onClick={handleQuickSpeak}
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#4F83F1] bg-[#EAF4FF] hover:bg-[#DEEEFF] border border-[#D0E4FF] transition-colors"
          title="Nghe phát âm tiếng Trung mẫu"
        >
          <Volume2 className="w-3.5 h-3.5" />
          <span className="font-chinese">你好 (Phát âm)</span>
        </button>

        {/* Daily Study Goal Indicator */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#E3EAF4] shadow-xs text-xs">
          <Clock className="w-3.5 h-3.5 text-[#3DAA80]" />
          <span className="text-[#778198] hidden sm:inline">Mục tiêu:</span>
          <span className="font-semibold text-[#202A3B]">15/20m</span>
        </div>
      </div>
    </header>
  );
}

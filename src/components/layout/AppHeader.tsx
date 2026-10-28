"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  Menu,
  Volume2,
  Clock,
  LogOut,
  Settings,
  Flame,
  ChevronDown,
  LogIn,
  UserPlus,
} from "lucide-react";
import { speakChinese } from "@/lib/utils";
import { useAuth } from "@/components/auth/AuthContext";
import { useToast } from "@/components/ui/ToastContext";

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
  const { user, isAuthenticated, logout } = useAuth();
  const { showToast } = useToast();

  const [searchQuery, setSearchQuery] = useState("");
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/vocabulary?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleQuickSpeak = () => {
    speakChinese("你好！欢迎来到 MaoMao 学习空间。");
  };

  const handleLogout = async () => {
    setUserDropdownOpen(false);
    await logout();
    showToast({
      type: "info",
      title: "Đã đăng xuất",
      message: "Hẹn gặp lại bạn trong buổi học tiếp theo!",
    });
    router.push("/login");
  };

  const getInitials = (name?: string) => {
    if (!name) return "MM";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
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

      {/* Right section: Audio tester, Daily goal pill, Profile dropdown */}
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
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#E3EAF4] shadow-xs text-xs">
          <Clock className="w-3.5 h-3.5 text-[#3DAA80]" />
          <span className="text-[#778198]">Mục tiêu:</span>
          <span className="font-semibold text-[#202A3B]">15/20m</span>
        </div>

        {/* User Profile / Auth Area */}
        {isAuthenticated && user ? (
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="flex items-center gap-2 p-1 sm:pl-2 sm:pr-2.5 sm:py-1 rounded-xl bg-white hover:bg-[#F5F9FF] border border-[#E3EAF4] hover:border-[#D0E4FF] shadow-xs transition-all"
              aria-label="Menu tài khoản"
              aria-expanded={userDropdownOpen}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#B8A6F6] to-[#4F83F1] flex items-center justify-center text-white text-xs font-bold shadow-xs">
                {getInitials(user.name)}
              </div>
              <div className="hidden md:flex flex-col text-left leading-tight">
                <span className="text-xs font-bold text-[#202A3B] truncate max-w-[100px]">
                  {user.name}
                </span>
                <span className="text-[10px] text-[#4F83F1] font-semibold">
                  {user.targetHsk}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-[#778198] hidden sm:block" />
            </button>

            {/* Dropdown Menu */}
            {userDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white border border-[#E3EAF4] shadow-xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                {/* Header info */}
                <div className="p-2 pb-3 border-b border-[#E3EAF4] mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#B8A6F6] to-[#4F83F1] flex items-center justify-center text-white text-xs font-bold shadow-xs">
                      {getInitials(user.name)}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-bold text-[#202A3B] truncate">
                        {user.name}
                      </div>
                      <div className="text-xs text-[#778198] truncate">
                        {user.email}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-3 pt-2 border-t border-[#F0F4FA]">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#EAF4FF] text-[#315FC7] border border-[#D0E4FF]">
                      {user.targetHsk}
                    </span>
                    <span className="text-[11px] text-[#E6A34A] font-semibold flex items-center gap-1">
                      <Flame className="w-3 h-3 fill-[#E6A34A]" />
                      {user.streakDays} ngày chuỗi
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-1">
                  <Link
                    href="/settings"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#202A3B] hover:bg-[#F5F9FF] hover:text-[#4F83F1] transition-colors"
                  >
                    <Settings className="w-4 h-4 text-[#778198]" />
                    <span>Cài đặt & Hồ sơ học</span>
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#D95D67] hover:bg-[#FDEEF0] transition-colors text-left"
                  >
                    <LogOut className="w-4 h-4 text-[#D95D67]" />
                    <span>Đăng xuất</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-[#202A3B] hover:text-[#4F83F1] hover:bg-[#F5F9FF] border border-[#E3EAF4] transition-all"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Đăng nhập</span>
            </Link>

            <Link
              href="/register"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-[#4F83F1] hover:bg-[#3D72E3] text-white shadow-xs transition-all"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Đăng ký</span>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

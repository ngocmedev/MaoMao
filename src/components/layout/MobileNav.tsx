"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  Sparkles,
  Repeat,
  UploadCloud,
  TrendingUp,
  Settings,
  X,
} from "lucide-react";
import { MaoMaoLogo } from "@/components/ui/MaoMaoLogo";

interface MobileNavProps {
  drawerOpen: boolean;
  onCloseDrawer: () => void;
}

export function MobileNav({ drawerOpen, onCloseDrawer }: MobileNavProps) {
  const pathname = usePathname();

  const mainTabs = [
    { label: "Tổng quan", href: "/dashboard", icon: LayoutDashboard },
    { label: "Từ vựng", href: "/vocabulary", icon: BookOpen },
    { label: "Bài học", href: "/lessons", icon: GraduationCap },
    { label: "Luyện tập", href: "/practice", icon: Sparkles },
    { label: "Ôn tập", href: "/review", icon: Repeat },
  ];

  return (
    <>
      {/* Bottom Bar for Mobile */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/90 backdrop-blur-xl border-t border-[#E3EAF4] px-2 py-1 flex items-center justify-around shadow-lg"
        aria-label="Thanh điều hướng di động"
      >
        {mainTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive =
            pathname === tab.href ||
            (tab.href !== "/dashboard" && pathname.startsWith(tab.href));

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-xl text-[10px] font-medium transition-colors ${
                isActive
                  ? "text-[#4F83F1] font-bold"
                  : "text-[#778198] hover:text-[#202A3B]"
              }`}
            >
              <div
                className={`p-1 rounded-lg ${
                  isActive ? "bg-[#EAF4FF] text-[#4F83F1]" : ""
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className="mt-0.5 leading-none">{tab.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Slide-over Drawer for all pages on mobile */}
      {drawerOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-72 bg-white h-full shadow-2xl flex flex-col p-4 animate-in slide-in-from-left duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-[#E3EAF4]">
              <MaoMaoLogo />
              <button
                type="button"
                onClick={onCloseDrawer}
                className="p-1.5 rounded-lg text-[#778198] hover:bg-[#F5F9FF]"
                aria-label="Đóng menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="my-3">
              <Link
                href="/lessons/import"
                onClick={onCloseDrawer}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium bg-gradient-to-r from-[#EAF4FF] to-[#EEE9FF] text-[#315FC7] border border-[#D0E4FF]"
              >
                <UploadCloud className="w-4 h-4 text-[#4F83F1]" />
                <span>Nhập bài học từ Gemini</span>
              </Link>
            </div>

            <div className="flex-1 overflow-y-auto space-y-1 py-2">
              <Link
                href="/dashboard"
                onClick={onCloseDrawer}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium ${
                  pathname === "/dashboard"
                    ? "bg-[#4F83F1] text-white"
                    : "text-[#202A3B] hover:bg-[#F5F9FF]"
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Tổng quan</span>
              </Link>

              <Link
                href="/vocabulary"
                onClick={onCloseDrawer}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium ${
                  pathname.startsWith("/vocabulary")
                    ? "bg-[#4F83F1] text-white"
                    : "text-[#202A3B] hover:bg-[#F5F9FF]"
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Từ vựng</span>
              </Link>

              <Link
                href="/lessons"
                onClick={onCloseDrawer}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium ${
                  pathname === "/lessons"
                    ? "bg-[#4F83F1] text-white"
                    : "text-[#202A3B] hover:bg-[#F5F9FF]"
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>Bài học</span>
              </Link>

              <div className="pt-2 pb-1 text-[11px] font-semibold text-[#778198] uppercase tracking-wider px-3">
                Kỹ năng luyện tập
              </div>

              <Link
                href="/practice/listening"
                onClick={onCloseDrawer}
                className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-[#202A3B] hover:bg-[#F5F9FF]"
              >
                <span>🎧 Nghe (听力)</span>
              </Link>
              <Link
                href="/practice/speaking"
                onClick={onCloseDrawer}
                className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-[#202A3B] hover:bg-[#F5F9FF]"
              >
                <span>🎙️ Nói (口语)</span>
              </Link>
              <Link
                href="/practice/reading"
                onClick={onCloseDrawer}
                className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-[#202A3B] hover:bg-[#F5F9FF]"
              >
                <span>📖 Đọc (阅读)</span>
              </Link>
              <Link
                href="/practice/writing"
                onClick={onCloseDrawer}
                className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-[#202A3B] hover:bg-[#F5F9FF]"
              >
                <span>✍️ Viết (写作)</span>
              </Link>

              <div className="pt-3 pb-1 text-[11px] font-semibold text-[#778198] uppercase tracking-wider px-3">
                Học tập & Cài đặt
              </div>

              <Link
                href="/review"
                onClick={onCloseDrawer}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium ${
                  pathname.startsWith("/review")
                    ? "bg-[#4F83F1] text-white"
                    : "text-[#202A3B] hover:bg-[#F5F9FF]"
                }`}
              >
                <Repeat className="w-4 h-4" />
                <span>Ôn tập</span>
              </Link>

              <Link
                href="/progress"
                onClick={onCloseDrawer}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium ${
                  pathname.startsWith("/progress")
                    ? "bg-[#4F83F1] text-white"
                    : "text-[#202A3B] hover:bg-[#F5F9FF]"
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                <span>Tiến độ</span>
              </Link>

              <Link
                href="/settings"
                onClick={onCloseDrawer}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium ${
                  pathname.startsWith("/settings")
                    ? "bg-[#4F83F1] text-white"
                    : "text-[#202A3B] hover:bg-[#F5F9FF]"
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Cài đặt</span>
              </Link>
            </div>
          </div>
          <div className="flex-1" onClick={onCloseDrawer} />
        </div>
      )}
    </>
  );
}

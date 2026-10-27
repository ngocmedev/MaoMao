"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  Sparkles,
  Repeat,
  TrendingUp,
  Settings,
  Headphones,
  Mic,
  FileText,
  PenTool,
  UploadCloud,
  ChevronDown,
  ChevronRight,
  Flame,
  User,
} from "lucide-react";
import { MaoMaoLogo } from "@/components/ui/MaoMaoLogo";

interface SidebarProps {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

export function Sidebar({ collapsed = false }: SidebarProps) {
  const pathname = usePathname();
  const [practiceOpen, setPracticeOpen] = useState(
    pathname.startsWith("/practice")
  );

  const navItems = [
    {
      title: "Tổng quan",
      href: "/dashboard",
      icon: LayoutDashboard,
      active: pathname === "/dashboard",
    },
    {
      title: "Từ vựng",
      href: "/vocabulary",
      icon: BookOpen,
      active: pathname.startsWith("/vocabulary"),
    },
    {
      title: "Bài học",
      href: "/lessons",
      icon: GraduationCap,
      active: pathname === "/lessons" || (pathname.startsWith("/lessons") && pathname !== "/lessons/import"),
    },
    {
      title: "Luyện tập",
      href: "/practice",
      icon: Sparkles,
      active: pathname.startsWith("/practice"),
      hasSubmenu: true,
      subItems: [
        { title: "Nghe", href: "/practice/listening", icon: Headphones },
        { title: "Nói", href: "/practice/speaking", icon: Mic },
        { title: "Đọc", href: "/practice/reading", icon: FileText },
        { title: "Viết", href: "/practice/writing", icon: PenTool },
      ],
    },
    {
      title: "Ôn tập",
      href: "/review",
      icon: Repeat,
      active: pathname.startsWith("/review"),
    },
    {
      title: "Tiến độ",
      href: "/progress",
      icon: TrendingUp,
      active: pathname.startsWith("/progress"),
    },
    {
      title: "Cài đặt",
      href: "/settings",
      icon: Settings,
      active: pathname.startsWith("/settings"),
    },
  ];

  return (
    <aside
      className={`relative flex flex-col h-full bg-white/80 backdrop-blur-xl border-r border-[#E3EAF4] transition-all duration-300 z-30 ${
        collapsed ? "w-20" : "w-64"
      }`}
      aria-label="Thanh điều hướng chính"
    >
      {/* Brand Header */}
      <div className="h-20 flex items-center px-4 border-b border-[#E3EAF4]/60">
        <MaoMaoLogo collapsed={collapsed} />
      </div>

      {/* Quick Action Button: Import Material */}
      <div className="px-3 py-3">
        <Link
          href="/lessons/import"
          className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-medium text-sm transition-all shadow-sm ${
            pathname === "/lessons/import"
              ? "bg-[#315FC7] text-white shadow-[#315FC7]/20"
              : "bg-gradient-to-r from-[#EAF4FF] to-[#EEE9FF] text-[#315FC7] hover:from-[#DFEEFF] hover:to-[#E5DDFF] border border-[#D0E4FF]"
          } ${collapsed ? "justify-center px-2" : ""}`}
          title="Nhập tài liệu học từ Gemini"
        >
          <UploadCloud className="w-4 h-4 shrink-0 text-[#4F83F1]" />
          {!collapsed && (
            <span className="truncate">Nhập từ Gemini</span>
          )}
        </Link>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          if (item.hasSubmenu && item.subItems) {
            return (
              <div key={item.title} className="space-y-1">
                <div className="flex items-center">
                  <Link
                    href={item.href}
                    className={`flex-1 flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      item.active
                        ? "bg-[#4F83F1] text-white shadow-sm shadow-[#4F83F1]/20 font-semibold"
                        : "text-[#202A3B] hover:bg-[#F5F9FF] hover:text-[#315FC7]"
                    } ${collapsed ? "justify-center px-2" : ""}`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    {!collapsed && <span className="truncate">{item.title}</span>}
                  </Link>

                  {!collapsed && (
                    <button
                      type="button"
                      onClick={() => setPracticeOpen(!practiceOpen)}
                      className={`p-1.5 ml-1 rounded-lg text-[#778198] hover:bg-[#EAF4FF] hover:text-[#315FC7] transition-colors`}
                      aria-label="Mở rộng mục Luyện tập"
                    >
                      {practiceOpen ? (
                        <ChevronDown className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5" />
                      )}
                    </button>
                  )}
                </div>

                {/* Submenu items */}
                {!collapsed && practiceOpen && (
                  <div className="pl-6 pr-1 py-1 space-y-0.5 border-l-2 border-[#E3EAF4] ml-4">
                    {item.subItems.map((sub) => {
                      const SubIcon = sub.icon;
                      const isSubActive = pathname === sub.href;
                      return (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                            isSubActive
                              ? "bg-[#EAF4FF] text-[#315FC7] font-semibold"
                              : "text-[#778198] hover:text-[#202A3B] hover:bg-[#F5F9FF]"
                          }`}
                        >
                          <SubIcon className="w-3.5 h-3.5 shrink-0" />
                          <span>{sub.title}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                item.active
                  ? "bg-[#4F83F1] text-white shadow-sm shadow-[#4F83F1]/20 font-semibold"
                  : "text-[#202A3B] hover:bg-[#F5F9FF] hover:text-[#315FC7]"
              } ${collapsed ? "justify-center px-2" : ""}`}
              title={collapsed ? item.title : undefined}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {!collapsed && <span className="truncate">{item.title}</span>}
            </Link>
          );
        })}
      </div>

      {/* User profile & streak footer */}
      <div className="p-3 border-t border-[#E3EAF4]/80 bg-white/40">
        {!collapsed ? (
          <div className="flex items-center gap-3 p-2 rounded-xl bg-[#F5F9FF] border border-[#E3EAF4]">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#B8A6F6] to-[#4F83F1] flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-inner">
              MA
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#202A3B] truncate">
                  Minh Anh
                </span>
                <span className="text-[10px] font-bold text-[#315FC7] px-1.5 py-0.2 rounded bg-white border border-[#D0E4FF]">
                  HSK 2
                </span>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-[#E6A34A] font-medium mt-0.5">
                <Flame className="w-3 h-3 fill-[#E6A34A] shrink-0" />
                <span>5 ngày chuỗi</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center" title="Minh Anh (HSK 2) - 5 ngày chuỗi">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#B8A6F6] to-[#4F83F1] flex items-center justify-center text-white text-xs font-bold">
              <User className="w-4 h-4" />
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

import React from "react";
import Link from "next/link";

interface MaoMaoLogoProps {
  collapsed?: boolean;
  className?: string;
}

export function MaoMaoLogo({ collapsed = false, className = "" }: MaoMaoLogoProps) {
  return (
    <Link
      href="/dashboard"
      className={`flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#4F83F1]/40 rounded-xl p-1.5 transition-all ${className}`}
      aria-label="MaoMao - Về trang tổng quan"
    >
      {/* Cat-inspired minimalist logo icon */}
      <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#4F83F1] via-[#6597F8] to-[#B8A6F6] p-0.5 shadow-md shadow-[#4F83F1]/20 group-hover:scale-105 transition-transform shrink-0">
        <div className="w-full h-full bg-white/20 backdrop-blur-sm rounded-[14px] flex items-center justify-center">
          <svg
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-white drop-shadow-sm"
          >
            {/* Minimal Cat Silhouette */}
            {/* Left ear */}
            <path
              d="M7 16L9.5 8C9.8 7 11 6.5 11.8 7.3L15 10.5"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Right ear */}
            <path
              d="M25 16L22.5 8C22.2 7 21 6.5 20.2 7.3L17 10.5"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Head curve */}
            <path
              d="M6 18C6 23.5 10.5 27 16 27C21.5 27 26 23.5 26 18C26 13 21.5 11.5 16 11.5C10.5 11.5 6 13 6 18Z"
              fill="currentColor"
              fillOpacity="0.25"
              stroke="currentColor"
              strokeWidth="2.2"
            />
            {/* Eyes */}
            <circle cx="12" cy="18" r="1.5" fill="currentColor" />
            <circle cx="20" cy="18" r="1.5" fill="currentColor" />
            {/* Subtle cute nose/mouth */}
            <path
              d="M14.5 21.2C15 21.8 15.5 22 16 22C16.5 22 17 21.8 17.5 21.2"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {!collapsed && (
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-[#202A3B] via-[#315FC7] to-[#4F83F1] bg-clip-text text-transparent">
              MaoMao
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-[#EAF4FF] text-[#315FC7] border border-[#D0E4FF]">
              中文
            </span>
          </div>
          <span className="text-[11px] text-[#778198] truncate font-medium">
            Học tiếng Trung nhẹ nhàng
          </span>
        </div>
      )}
    </Link>
  );
}

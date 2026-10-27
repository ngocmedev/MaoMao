import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  BookOpen,
  Headphones,
  Mic,
  PenTool,
  UploadCloud,
} from "lucide-react";
import { MaoMaoLogo } from "@/components/ui/MaoMaoLogo";

export default function RootPage() {
  return (
    <div className="min-h-screen bg-[#F7F9FD] flex flex-col justify-between selection:bg-[#4F83F1]/20">
      {/* Top Navbar */}
      <header className="h-20 max-w-7xl mx-auto w-full px-6 flex items-center justify-between">
        <MaoMaoLogo />
        <Link
          href="/dashboard"
          className="px-5 py-2.5 rounded-2xl bg-[#4F83F1] hover:bg-[#3D72E3] text-white text-xs md:text-sm font-bold shadow-md shadow-[#4F83F1]/20 flex items-center gap-2 transition-all"
        >
          <span>Vào không gian học</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </header>

      {/* Hero Section */}
      <main className="max-w-5xl mx-auto w-full px-6 py-12 md:py-20 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EAF4FF] border border-[#D0E4FF] text-[#315FC7] text-xs font-semibold shadow-xs animate-in fade-in">
          <Sparkles className="w-3.5 h-3.5 text-[#B8A6F6]" />
          <span>Học tiếng Trung theo cách hiện đại & nhẹ nhàng</span>
        </div>

        <div className="space-y-4 max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#202A3B] tracking-tight leading-tight">
            Học tiếng Trung,{" "}
            <span className="bg-gradient-to-r from-[#4F83F1] via-[#315FC7] to-[#B8A6F6] bg-clip-text text-transparent">
              nhẹ nhàng mỗi ngày.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-[#778198] max-w-2xl mx-auto leading-relaxed">
            Không gian học tập tinh gọn dành riêng cho người Việt. Xem video học ở bất kỳ đâu, trích xuất cấu trúc với Gemini, nhập vào MaoMao và rèn luyện 4 kỹ năng Nghe - Nói - Đọc - Viết.
          </p>
        </div>

        {/* Primary CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#4F83F1] to-[#315FC7] hover:from-[#3D72E3] hover:to-[#264FA8] text-white text-sm md:text-base font-bold shadow-xl shadow-[#4F83F1]/25 flex items-center justify-center gap-2 transition-all"
          >
            <span>Bắt đầu học ngay</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/lessons/import"
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white hover:bg-[#F5F9FF] border border-[#E3EAF4] hover:border-[#4F83F1] text-xs md:text-sm font-semibold text-[#202A3B] shadow-xs flex items-center justify-center gap-2 transition-all"
          >
            <UploadCloud className="w-4 h-4 text-[#4F83F1]" />
            <span>Thử tính năng nhập từ Gemini</span>
          </Link>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-12 text-left">
          <div className="glass-card p-5 space-y-2">
            <div className="p-3 rounded-xl bg-[#EAF4FF] text-[#4F83F1] w-fit">
              <Headphones className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-[#202A3B]">Luyện Nghe (听力)</h3>
            <p className="text-xs text-[#778198] leading-relaxed">
              Phát âm chuẩn giọng Bắc Kinh, tùy chỉnh tốc độ và bài tập nghe hiểu tức thì.
            </p>
          </div>

          <div className="glass-card p-5 space-y-2">
            <div className="p-3 rounded-xl bg-[#EEE9FF] text-[#6B46C1] w-fit">
              <Mic className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-[#202A3B]">Luyện Nói (口语)</h3>
            <p className="text-xs text-[#778198] leading-relaxed">
              Ghi âm luyện khẩu ngữ, biến điệu thanh điệu và checklist tự đánh giá phát âm.
            </p>
          </div>

          <div className="glass-card p-5 space-y-2">
            <div className="p-3 rounded-xl bg-[#EAF8F2] text-[#3DAA80] w-fit">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-[#202A3B]">Luyện Đọc (阅读)</h3>
            <p className="text-xs text-[#778198] leading-relaxed">
              Bài đọc tương tác: nhấp vào bất kỳ chữ Hán nào để tra cứu Pinyin và nghĩa tiếng Việt.
            </p>
          </div>

          <div className="glass-card p-5 space-y-2">
            <div className="p-3 rounded-xl bg-[#FDF5E9] text-[#E6A34A] w-fit">
              <PenTool className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-[#202A3B]">Luyện Viết (写作)</h3>
            <p className="text-xs text-[#778198] leading-relaxed">
              Tập viết trên ô điền tự (田字格) cảm ứng và ghép câu củng cố ngữ pháp tiếng Hán.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E3EAF4] py-6 px-6 bg-white/50 text-center text-xs text-[#778198]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>© 2026 MaoMao. Không gian học tiếng Trung hiện đại cho người Việt.</span>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="hover:text-[#4F83F1]">
              Tổng quan
            </Link>
            <Link href="/vocabulary" className="hover:text-[#4F83F1]">
              Từ vựng
            </Link>
            <Link href="/lessons" className="hover:text-[#4F83F1]">
              Bài học
            </Link>
            <Link href="/settings" className="hover:text-[#4F83F1]">
              Cài đặt
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

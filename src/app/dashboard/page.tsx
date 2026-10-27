"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  GraduationCap,
  Repeat,
  Sparkles,
  ArrowRight,
  Flame,
  Clock,
  Headphones,
  Mic,
  FileText,
  PenTool,
  UploadCloud,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { StatCard } from "@/components/ui/StatCard";
import { LessonCard } from "@/components/lessons/LessonCard";
import { Lesson } from "@/types";
import { learningService } from "@/services/learning-service";

type StudyStats = Awaited<ReturnType<typeof learningService.getStudyStats>>;

export default function DashboardPage() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [stats, setStats] = useState<StudyStats | null>(null);

  useEffect(() => {
    async function loadData() {
      const [l, s] = await Promise.all([
        learningService.getLessons(),
        learningService.getStudyStats(),
      ]);
      setLessons(l);
      setStats(s);
    }
    loadData();
  }, []);

  const continueLesson = lessons[0];

  return (
    <AppShell title="Tổng quan" subtitle="Chào mừng bạn quay trở lại với MaoMao">
      <div className="space-y-8 animate-in fade-in duration-300">
        {/* Welcome Greeting Banner with Liquid Glass */}
        <div className="glass-panel p-6 md:p-8 bg-gradient-to-r from-[#EAF4FF] via-white to-[#EEE9FF] border border-[#D0E4FF] relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-[#D0E4FF] text-[#315FC7] text-xs font-bold">
                <Flame className="w-3.5 h-3.5 fill-[#E6A34A] text-[#E6A34A]" />
                <span>Chuỗi học 5 ngày liên tiếp</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#202A3B] tracking-tight">
                Hôm nay mình học gì nhỉ?
              </h2>
              <p className="text-xs md:text-sm text-[#778198] max-w-xl leading-relaxed">
                Bạn đã hoàn thành 15/20 phút mục tiêu hôm nay. Hãy tiếp tục ôn tập từ vựng hoặc bắt đầu bài học mới trích xuất từ Gemini!
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-3 shrink-0 flex-wrap">
              <Link
                href="/review"
                className="px-5 py-2.5 rounded-2xl bg-[#4F83F1] hover:bg-[#3D72E3] text-white text-xs md:text-sm font-bold shadow-md shadow-[#4F83F1]/20 flex items-center gap-2 transition-all cursor-pointer"
              >
                <Repeat className="w-4 h-4" />
                <span>Ôn tập ngay ({stats?.wordsReview || 0})</span>
              </Link>

              <Link
                href="/lessons/import"
                className="px-4 py-2.5 rounded-2xl bg-white border border-[#D0E4FF] hover:bg-[#F5F9FF] text-[#315FC7] text-xs md:text-sm font-semibold shadow-xs flex items-center gap-2 transition-all cursor-pointer"
              >
                <UploadCloud className="w-4 h-4 text-[#4F83F1]" />
                <span>Nhập JSON</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 4 Primary Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Từ cần ôn tập"
            value={stats?.wordsReview ?? 4}
            subtitle="Từ vựng đến hạn hôm nay"
            icon={Repeat}
            iconColor="text-[#E6A34A]"
            iconBg="bg-[#FDF5E9]"
            badge="Cần ôn"
          />
          <StatCard
            title="Đã nắm vững"
            value={stats?.wordsMastered ?? 3}
            subtitle={`Trên tổng số ${stats?.wordsTotal ?? 10} từ vựng`}
            icon={BookOpen}
            iconColor="text-[#3DAA80]"
            iconBg="bg-[#EAF8F2]"
            badge="HSK 1-3"
          />
          <StatCard
            title="Bài học đã học"
            value={stats?.lessonsCompleted ?? 3}
            subtitle={`Đã mở khóa ${lessons.length} bài học`}
            icon={GraduationCap}
            iconColor="text-[#4F83F1]"
            iconBg="bg-[#EAF4FF]"
          />
          <StatCard
            title="Mục tiêu tuần"
            value="85%"
            subtitle="Đạt 5/7 ngày hoạt động"
            icon={Sparkles}
            iconColor="text-[#6B46C1]"
            iconBg="bg-[#EEE9FF]"
            badge="Xuất sắc"
          />
        </div>

        {/* Continue Learning Highlight & Weekly Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Continue Learning Card */}
          {continueLesson && (
            <div className="lg:col-span-7 glass-panel p-6 md:p-7 space-y-4 border border-[#D0E4FF] flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#315FC7]">
                    Tiếp tục bài học dở dang
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#EAF4FF] text-[#315FC7]">
                    {continueLesson.level}
                  </span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-[#202A3B]">
                  {continueLesson.title}
                </h3>
                <p className="text-xs md:text-sm text-[#778198] line-clamp-2">
                  {continueLesson.description}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F5F9FF] border border-[#E3EAF4] flex items-center justify-between gap-4 text-xs">
                <span className="text-[#778198] flex items-center gap-1.5 font-medium">
                  <Clock className="w-3.5 h-3.5 text-[#4F83F1]" />
                  Thời lượng: {continueLesson.durationMinutes} phút
                </span>
                <span className="text-[#778198] flex items-center gap-1.5 font-medium">
                  <BookOpen className="w-3.5 h-3.5 text-[#3DAA80]" />
                  {continueLesson.vocabulary.length} từ vựng
                </span>
                <Link
                  href={`/lessons/${continueLesson.id}`}
                  className="px-4 py-1.5 rounded-xl bg-[#4F83F1] hover:bg-[#3D72E3] text-white font-bold text-xs shadow-xs transition-colors"
                >
                  Vào học ngay
                </Link>
              </div>
            </div>
          )}

          {/* Weekly Activity Chart (Lightweight HTML/SVG) */}
          <div className="lg:col-span-5 glass-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#202A3B]">Hoạt động học tập tuần này</h3>
              <span className="text-[11px] text-[#778198]">7 ngày gần nhất</span>
            </div>

            {/* Weekly Bars */}
            <div className="flex items-end justify-between gap-2 h-36 pt-4 px-2">
              {stats?.weeklyActivity?.map((act, idx: number) => {
                const maxCount = 45;
                const heightPercent = Math.round((act.count / maxCount) * 100);
                const isToday = idx === 6;

                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                    <span className="text-[10px] text-[#778198] opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                      {act.count}m
                    </span>
                    <div className="w-full bg-[#EAF4FF] rounded-lg h-24 flex items-end p-0.5">
                      <div
                        className={`w-full rounded-md transition-all duration-500 ${
                          isToday
                            ? "bg-gradient-to-t from-[#315FC7] to-[#4F83F1] shadow-xs"
                            : "bg-[#B8A6F6] hover:bg-[#4F83F1]"
                        }`}
                        style={{ height: `${heightPercent}%` }}
                      />
                    </div>
                    <span
                      className={`text-[11px] font-medium ${
                        isToday ? "text-[#315FC7] font-bold" : "text-[#778198]"
                      }`}
                    >
                      {act.day}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 4 Skill Practice Shortcuts */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#202A3B]">
              Luyện tập 4 kỹ năng
            </h3>
            <Link
              href="/practice"
              className="text-xs font-semibold text-[#4F83F1] hover:underline flex items-center gap-1"
            >
              <span>Xem tất cả bài luyện</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href="/practice/listening"
              className="glass-card p-4 hover:border-[#4F83F1]/40 flex flex-col gap-3 group transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-[#EAF4FF] text-[#4F83F1] flex items-center justify-center group-hover:scale-105 transition-transform">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#202A3B] group-hover:text-[#4F83F1] transition-colors block">
                  Nghe (听力)
                </span>
                <span className="text-[11px] text-[#778198]">Hội thoại & bài tập</span>
              </div>
            </Link>

            <Link
              href="/practice/speaking"
              className="glass-card p-4 hover:border-[#6B46C1]/40 flex flex-col gap-3 group transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-[#EEE9FF] text-[#6B46C1] flex items-center justify-center group-hover:scale-105 transition-transform">
                <Mic className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#202A3B] group-hover:text-[#6B46C1] transition-colors block">
                  Nói (口语)
                </span>
                <span className="text-[11px] text-[#778198]">Ghi âm & biến điệu</span>
              </div>
            </Link>

            <Link
              href="/practice/reading"
              className="glass-card p-4 hover:border-[#3DAA80]/40 flex flex-col gap-3 group transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-[#EAF8F2] text-[#3DAA80] flex items-center justify-center group-hover:scale-105 transition-transform">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#202A3B] group-hover:text-[#3DAA80] transition-colors block">
                  Đọc (阅读)
                </span>
                <span className="text-[11px] text-[#778198]">Tra từ tương tác</span>
              </div>
            </Link>

            <Link
              href="/practice/writing"
              className="glass-card p-4 hover:border-[#E6A34A]/40 flex flex-col gap-3 group transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-[#FDF5E9] text-[#E6A34A] flex items-center justify-center group-hover:scale-105 transition-transform">
                <PenTool className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#202A3B] group-hover:text-[#E6A34A] transition-colors block">
                  Viết (写作)
                </span>
                <span className="text-[11px] text-[#778198]">Ô điền tự & ghép câu</span>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Lessons */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#202A3B]">
              Bài học gần đây
            </h3>
            <Link
              href="/lessons"
              className="text-xs font-semibold text-[#4F83F1] hover:underline flex items-center gap-1"
            >
              <span>Xem tất cả</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {lessons.slice(0, 3).map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} />
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}

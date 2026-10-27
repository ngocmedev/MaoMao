"use client";

import React, { useEffect, useState } from "react";
import {
  TrendingUp,
  Clock,
  BookOpen,
  GraduationCap,
  Sparkles,
  Calendar,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { StatCard } from "@/components/ui/StatCard";
import { learningService } from "@/services/learning-service";
import { LoadingState } from "@/components/ui/EmptyState";

type StudyStats = Awaited<ReturnType<typeof learningService.getStudyStats>>;

export default function ProgressPage() {
  const [stats, setStats] = useState<StudyStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      const s = await learningService.getStudyStats();
      setStats(s);
      setLoading(false);
    }
    loadStats();
  }, []);

  if (loading || !stats) {
    return (
      <AppShell title="Tiến độ học tập">
        <LoadingState message="Đang tổng hợp báo cáo tiến độ..." />
      </AppShell>
    );
  }

  const recentSessions = [
    {
      date: "Hôm nay, 16:30",
      activity: "Ôn tập Flashcard (12 từ)",
      skill: "Ôn tập",
      duration: "15 phút",
      accuracy: "92%",
    },
    {
      date: "Hôm qua, 20:15",
      activity: "Bài học: Đi siêu thị mua sắm",
      skill: "Đọc & Nghe",
      duration: "20 phút",
      accuracy: "100%",
    },
    {
      date: "25/10/2026, 09:40",
      activity: "Luyện khẩu ngữ: Hội thoại sân bay",
      skill: "Nói (口语)",
      duration: "10 phút",
      accuracy: "85%",
    },
    {
      date: "24/10/2026, 21:00",
      activity: "Luyện viết chữ Hán trên ô điền tự",
      skill: "Viết (写作)",
      duration: "18 phút",
      accuracy: "95%",
    },
  ];

  return (
    <AppShell
      title="Tiến độ học tập"
      subtitle="Theo dõi chi tiết số giờ học, độ tích lũy từ vựng và cân bằng 4 kỹ năng"
    >
      <div className="space-y-8 animate-in fade-in duration-300">
        {/* Demo Disclaimer notice */}
        <div className="p-4 rounded-2xl bg-[#EAF4FF] border border-[#D0E4FF] flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-[#4F83F1] shrink-0 mt-0.5" />
          <div className="text-xs text-[#315FC7] leading-relaxed">
            <strong>Lưu ý: </strong>
            Các chỉ số phân tích dưới đây được tính toán dựa trên dữ liệu học tập thực tế trên thiết bị của bạn kết hợp với số liệu mẫu demo. Khi kết nối Supabase, toàn bộ lịch sử học tập sẽ được đồng bộ vĩnh viễn trên đám mây.
          </div>
        </div>

        {/* Top 4 Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Tổng từ vựng tích lũy"
            value={stats.wordsTotal}
            subtitle={`${stats.wordsMastered} từ đã thuộc vững`}
            icon={BookOpen}
            iconColor="text-[#4F83F1]"
            iconBg="bg-[#EAF4FF]"
          />
          <StatCard
            title="Bài học hoàn thành"
            value={`${stats.lessonsCompleted} / ${stats.lessonsTotal}`}
            subtitle="Tỷ lệ hoàn thành 75%"
            icon={GraduationCap}
            iconColor="text-[#3DAA80]"
            iconBg="bg-[#EAF8F2]"
          />
          <StatCard
            title="Thời gian học tuần này"
            value="169 phút"
            subtitle="Đạt 112% mục tiêu tuần"
            icon={Clock}
            iconColor="text-[#6B46C1]"
            iconBg="bg-[#EEE9FF]"
            badge="Vượt chỉ tiêu"
          />
          <StatCard
            title="Chuỗi ngày học liên tục"
            value={`${stats.streakDays} ngày`}
            subtitle="Kỷ lục cao nhất: 12 ngày"
            icon={TrendingUp}
            iconColor="text-[#E6A34A]"
            iconBg="bg-[#FDF5E9]"
            badge="Đang duy trì"
          />
        </div>

        {/* Middle Section: Weekly Activity Bar Chart & 4 Skills Balance */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Weekly activity */}
          <div className="lg:col-span-7 glass-panel p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#202A3B]">
                  Hoạt động học tập 7 ngày qua
                </h3>
                <p className="text-xs text-[#778198]">
                  Số phút dành cho tiếng Trung mỗi ngày
                </p>
              </div>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#EAF8F2] text-[#3DAA80]">
                +18% so với tuần trước
              </span>
            </div>

            <div className="flex items-end justify-between gap-3 h-48 pt-6 px-2">
              {stats.weeklyActivity.map((act, idx: number) => {
                const max = 45;
                const h = Math.round((act.count / max) * 100);
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                    <span className="text-[11px] font-bold text-[#315FC7]">
                      {act.count}p
                    </span>
                    <div className="w-full bg-[#F5F9FF] border border-[#E3EAF4] rounded-xl h-32 flex items-end p-1">
                      <div
                        className="w-full bg-gradient-to-t from-[#315FC7] to-[#4F83F1] rounded-lg transition-all duration-500 shadow-xs"
                        style={{ height: `${h}%` }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-[#202A3B]">
                      {act.day}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4 Skills Distribution */}
          <div className="lg:col-span-5 glass-card p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-[#202A3B]">
                Cân bằng 4 kỹ năng
              </h3>
              <p className="text-xs text-[#778198]">
                Thời lượng phân bổ cho từng giác quan học tập
              </p>
            </div>

            <div className="space-y-3">
              {stats.skillSummary.map((item) => {
                const colors: Record<string, { bg: string; bar: string }> = {
                  "Nghe (听力)": { bg: "bg-[#EAF4FF]", bar: "bg-[#4F83F1]" },
                  "Nói (口语)": { bg: "bg-[#EEE9FF]", bar: "bg-[#8B5CF6]" },
                  "Đọc (阅读)": { bg: "bg-[#EAF8F2]", bar: "bg-[#3DAA80]" },
                  "Viết (写作)": { bg: "bg-[#FDF5E9]", bar: "bg-[#E6A34A]" },
                };
                const color = colors[item.skill] || { bg: "bg-[#EAF4FF]", bar: "bg-[#4F83F1]" };
                const percent = Math.min(100, Math.round((item.minutes / 60) * 100));

                return (
                  <div key={item.skill} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#202A3B]">{item.skill}</span>
                      <span className="text-[#778198] font-medium">
                        {item.minutes} phút ({percent}%)
                      </span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-[#E3EAF4] overflow-hidden">
                      <div
                        className={`h-full ${color.bar} rounded-full transition-all duration-500`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-3 rounded-xl bg-[#F5F9FF] border border-[#E3EAF4] text-xs text-[#778198]">
              💡 <strong>Gợi ý: </strong>Kỹ năng Viết (写作) đang có thời lượng thấp nhất. Hãy thử làm 1 bài ghép câu hôm nay!
            </div>
          </div>
        </div>

        {/* Study History Session Log */}
        <div className="glass-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#202A3B]">
              Lịch sử các phiên học gần nhất
            </h3>
            <span className="text-xs text-[#778198]">Tự động ghi nhận</span>
          </div>

          <div className="divide-y divide-[#E3EAF4]">
            {recentSessions.map((session, idx) => (
              <div
                key={idx}
                className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-[#F5F9FF]/60 px-2 rounded-xl transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#EAF4FF] text-[#4F83F1] flex items-center justify-center font-bold text-xs shrink-0">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="text-xs md:text-sm font-bold text-[#202A3B]">
                      {session.activity}
                    </h4>
                    <span className="text-[11px] text-[#778198] flex items-center gap-2">
                      <Calendar className="w-3 h-3" />
                      {session.date}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:justify-end text-xs">
                  <span className="px-2 py-0.5 rounded-md bg-[#F5F9FF] border border-[#E3EAF4] text-[#778198] font-medium">
                    {session.skill}
                  </span>
                  <span className="font-semibold text-[#202A3B]">
                    {session.duration}
                  </span>
                  <span className="font-bold text-[#3DAA80] bg-[#EAF8F2] px-2 py-0.5 rounded-full">
                    {session.accuracy}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}

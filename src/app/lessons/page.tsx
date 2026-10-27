"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, UploadCloud, Filter } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { LessonCard } from "@/components/lessons/LessonCard";
import { EmptyState, LoadingState } from "@/components/ui/EmptyState";
import { Lesson } from "@/types";
import { learningService } from "@/services/learning-service";

export default function LessonsPage() {
  const router = useRouter();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("ALL");

  useEffect(() => {
    async function fetchLessons() {
      const data = await learningService.getLessons();
      setLessons(data);
      setLoading(false);
    }
    fetchLessons();
  }, []);

  const filteredLessons = useMemo(() => {
    return lessons.filter((lesson) => {
      const q = searchTerm.toLowerCase().trim();
      const matchSearch =
        !q ||
        lesson.title.toLowerCase().includes(q) ||
        lesson.description.toLowerCase().includes(q);

      const matchLevel = selectedLevel === "ALL" || lesson.level === selectedLevel;

      return matchSearch && matchLevel;
    });
  }, [lessons, searchTerm, selectedLevel]);

  return (
    <AppShell
      title="Kho bài học"
      subtitle="Các bài học tiếng Trung có cấu trúc kèm từ vựng và bài đọc"
    >
      <div className="space-y-6">
        {/* Header Controls */}
        <div className="glass-panel p-5 space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#778198]" />
              <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm kiếm bài học theo tiêu đề hoặc nội dung..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E3EAF4] rounded-xl text-xs md:text-sm text-[#202A3B] focus:outline-none focus:ring-2 focus:ring-[#4F83F1]/30"
              />
            </div>

            <Link
              href="/lessons/import"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#4F83F1] to-[#315FC7] hover:from-[#3D72E3] hover:to-[#264FA8] text-white text-xs md:text-sm font-bold shadow-md shadow-[#4F83F1]/20 flex items-center justify-center gap-2 transition-all shrink-0 cursor-pointer"
            >
              <UploadCloud className="w-4 h-4" />
              <span>Nhập bài học từ Gemini</span>
            </Link>
          </div>

          {/* Level Filter Tabs */}
          <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-[#E3EAF4]/80 text-xs">
            <span className="text-[#778198] font-medium flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Phân loại cấp độ:
            </span>
            {["ALL", "HSK 1", "HSK 2", "HSK 3", "HSK 4"].map((lvl) => (
              <button
                key={lvl}
                type="button"
                onClick={() => setSelectedLevel(lvl)}
                className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                  selectedLevel === lvl
                    ? "bg-[#315FC7] text-white font-bold"
                    : "bg-white text-[#778198] hover:text-[#202A3B] border border-[#E3EAF4]"
                }`}
              >
                {lvl === "ALL" ? "Tất cả bài học" : lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Lessons Grid */}
        {loading ? (
          <LoadingState message="Đang tải danh sách bài học..." />
        ) : filteredLessons.length === 0 ? (
          <EmptyState
            title="Không tìm thấy bài học nào"
            description="Hãy thử nhập một bài học mới từ Gemini hoặc thay đổi từ khóa lọc."
            action={{
              label: "Nhập bài học mới",
              onClick: () => {
                router.push("/lessons/import");
              },
            }}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLessons.map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} />
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}

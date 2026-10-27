import React from "react";
import Link from "next/link";
import { Clock, BookOpen, FileText, HelpCircle, ArrowRight, Sparkles } from "lucide-react";
import { Lesson } from "@/types";
import { formatDateVi } from "@/lib/utils";

interface LessonCardProps {
  lesson: Lesson;
}

export function LessonCard({ lesson }: LessonCardProps) {
  return (
    <div className="glass-card p-6 flex flex-col justify-between gap-5 group hover:border-[#4F83F1]/40 transition-all">
      <div className="space-y-3">
        {/* Top meta row */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#EAF4FF] text-[#315FC7] border border-[#D0E4FF]">
              {lesson.level}
            </span>
            {lesson.isCustomImport && (
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#EEE9FF] text-[#6B46C1] border border-[#DCD3FF] flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#B8A6F6]" />
                Nhập từ Gemini
              </span>
            )}
          </div>
          <span className="text-xs text-[#778198] flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#9BA6BA]" />
            {lesson.durationMinutes} phút
          </span>
        </div>

        {/* Title & Description */}
        <div>
          <h3 className="text-base md:text-lg font-bold text-[#202A3B] group-hover:text-[#4F83F1] transition-colors leading-snug">
            {lesson.title}
          </h3>
          <p className="text-xs md:text-sm text-[#778198] line-clamp-2 mt-1 leading-relaxed">
            {lesson.description}
          </p>
        </div>

        {/* Features badges */}
        <div className="flex items-center gap-4 text-xs text-[#778198] pt-1">
          <span className="flex items-center gap-1.5 font-medium">
            <BookOpen className="w-3.5 h-3.5 text-[#4F83F1]" />
            {lesson.vocabulary.length} từ vựng
          </span>
          {lesson.reading && (
            <span className="flex items-center gap-1.5 font-medium">
              <FileText className="w-3.5 h-3.5 text-[#3DAA80]" />
              Bài đọc
            </span>
          )}
          {lesson.questions && lesson.questions.length > 0 && (
            <span className="flex items-center gap-1.5 font-medium">
              <HelpCircle className="w-3.5 h-3.5 text-[#E6A34A]" />
              {lesson.questions.length} câu hỏi
            </span>
          )}
        </div>
      </div>

      {/* Footer Link */}
      <div className="pt-3 border-t border-[#E3EAF4] flex items-center justify-between">
        <span className="text-[11px] text-[#9BA6BA]">
          Cập nhật: {formatDateVi(lesson.updatedAt)}
        </span>

        <Link
          href={`/lessons/${lesson.id}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4F83F1] group-hover:translate-x-0.5 transition-transform"
        >
          <span>Vào bài học</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

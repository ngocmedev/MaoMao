"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  Volume2,
  FileText,
  Repeat,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Lesson, VocabularyItem } from "@/types";
import { learningService } from "@/services/learning-service";
import { speakChinese, formatDateVi } from "@/lib/utils";
import { LoadingState } from "@/components/ui/EmptyState";
import { VocabularyCard } from "@/components/vocabulary/VocabularyCard";
import { VocabularyDetailModal } from "@/components/vocabulary/VocabularyDetailModal";

function LessonDetailContent() {
  const params = useParams();
  const lessonId = params?.lessonId as string;

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedWord, setSelectedWord] = useState<VocabularyItem | null>(null);
  const [activeTab, setActiveTab] = useState<"reading" | "vocab" | "questions">("reading");

  // Interactive Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});

  useEffect(() => {
    async function loadLesson() {
      if (lessonId) {
        const found = await learningService.getLessonById(lessonId);
        setLesson(found);
      }
      setLoading(false);
    }
    loadLesson();
  }, [lessonId]);

  if (loading) {
    return (
      <AppShell title="Chi tiết bài học">
        <LoadingState message="Đang tải nội dung bài học..." />
      </AppShell>
    );
  }

  if (!lesson) {
    return (
      <AppShell title="Không tìm thấy bài học">
        <div className="glass-panel p-8 text-center max-w-md mx-auto space-y-4">
          <p className="text-sm text-[#778198]">
            Không tìm thấy bài học tương ứng với mã &quot;{lessonId}&quot;.
          </p>
          <Link
            href="/lessons"
            className="px-4 py-2 rounded-xl bg-[#4F83F1] text-white text-xs font-semibold inline-block"
          >
            Quay lại kho bài học
          </Link>
        </div>
      </AppShell>
    );
  }

  const handleSelectQuiz = (qIdx: number, optIdx: number) => {
    setQuizAnswers((prev) => ({
      ...prev,
      [qIdx]: optIdx,
    }));
  };

  return (
    <AppShell title={lesson.title} subtitle={`Cấp độ ${lesson.level}`}>
      <div className="space-y-6">
        {/* Back navigation */}
        <div className="flex items-center justify-between">
          <Link
            href="/lessons"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#778198] hover:text-[#202A3B] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kho bài học</span>
          </Link>

          <span className="text-xs text-[#9BA6BA]">
            Cập nhật ngày: {formatDateVi(lesson.updatedAt)}
          </span>
        </div>

        {/* Hero Header Card */}
        <div className="glass-panel p-6 md:p-8 bg-gradient-to-r from-[#EAF4FF] via-white to-[#EEE9FF] border border-[#D0E4FF] space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold px-3 py-0.5 rounded-full bg-[#315FC7] text-white">
                  {lesson.level}
                </span>
                <span className="text-xs text-[#778198] flex items-center gap-1 font-medium">
                  <Clock className="w-3.5 h-3.5 text-[#4F83F1]" />
                  {lesson.durationMinutes} phút học
                </span>
                {lesson.isCustomImport && (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#EEE9FF] text-[#6B46C1] flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#B8A6F6]" />
                    Nhập từ Gemini
                  </span>
                )}
              </div>

              <h2 className="text-2xl md:text-3xl font-extrabold text-[#202A3B]">
                {lesson.title}
              </h2>
              <p className="text-xs md:text-sm text-[#778198] max-w-2xl leading-relaxed">
                {lesson.description}
              </p>
            </div>

            {/* Shortcut Practice buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0">
              <Link
                href="/practice/reading"
                className="px-4 py-2.5 rounded-xl bg-[#3DAA80] hover:bg-[#34956f] text-white text-xs font-bold shadow-xs flex items-center justify-center gap-2 transition-all"
              >
                <FileText className="w-4 h-4" />
                <span>Luyện đọc bài này</span>
              </Link>
              <Link
                href="/review"
                className="px-4 py-2.5 rounded-xl bg-[#4F83F1] hover:bg-[#3D72E3] text-white text-xs font-bold shadow-xs flex items-center justify-center gap-2 transition-all"
              >
                <Repeat className="w-4 h-4" />
                <span>Ôn từ vựng ({lesson.vocabulary.length})</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Tab Navigator */}
        <div className="flex items-center gap-2 border-b border-[#E3EAF4] pb-2 text-sm font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab("reading")}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === "reading"
                ? "bg-[#4F83F1] text-white shadow-sm font-bold"
                : "text-[#778198] hover:text-[#202A3B] hover:bg-[#F5F9FF]"
            }`}
          >
            Đoạn văn bài đọc (课文)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("vocab")}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === "vocab"
                ? "bg-[#4F83F1] text-white shadow-sm font-bold"
                : "text-[#778198] hover:text-[#202A3B] hover:bg-[#F5F9FF]"
            }`}
          >
            Từ vựng trọng tâm ({lesson.vocabulary.length})
          </button>
          {lesson.questions && lesson.questions.length > 0 && (
            <button
              type="button"
              onClick={() => setActiveTab("questions")}
              className={`px-4 py-2 rounded-xl transition-all ${
                activeTab === "questions"
                  ? "bg-[#4F83F1] text-white shadow-sm font-bold"
                  : "text-[#778198] hover:text-[#202A3B] hover:bg-[#F5F9FF]"
              }`}
            >
              Câu hỏi luyện tập ({lesson.questions.length})
            </button>
          )}
        </div>

        {/* TAB CONTENT: READING */}
        {activeTab === "reading" && lesson.reading && (
          <div className="space-y-6 animate-in fade-in">
            <div className="glass-panel p-6 md:p-8 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#E3EAF4]">
                <h3 className="text-base font-bold text-[#202A3B]">
                  {lesson.reading.title || "Bài đọc ngữ cảnh"}
                </h3>
                <button
                  type="button"
                  onClick={() => speakChinese(lesson.reading?.hanzi || "")}
                  className="px-3 py-1.5 rounded-xl bg-white border border-[#D0E4FF] text-xs font-semibold text-[#4F83F1] hover:bg-[#EAF4FF] shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Nghe bài đọc chuẩn zh-CN</span>
                </button>
              </div>

              {/* Chinese text display */}
              <div className="font-chinese text-xl md:text-2xl leading-loose text-[#202A3B] tracking-wide">
                {lesson.reading.hanzi}
              </div>

              {/* Pinyin display */}
              {lesson.reading.pinyin && (
                <div className="p-4 rounded-2xl bg-[#F5F9FF] border border-[#E3EAF4] font-pinyin text-xs md:text-sm text-[#4F83F1] leading-relaxed">
                  {lesson.reading.pinyin}
                </div>
              )}

              {/* Vietnamese translation */}
              <div className="p-5 rounded-2xl bg-white border border-[#E3EAF4] space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#778198]">
                  Bản dịch tiếng Việt
                </span>
                <p className="text-xs md:text-sm text-[#202A3B] leading-relaxed">
                  {lesson.reading.translation}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB CONTENT: VOCABULARY */}
        {activeTab === "vocab" && (
          <div className="space-y-4 animate-in fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {lesson.vocabulary.map((v) => (
                <VocabularyCard
                  key={v.id}
                  item={v}
                  onClick={(item) => setSelectedWord(item)}
                />
              ))}
            </div>
          </div>
        )}

        {/* TAB CONTENT: PRACTICE QUESTIONS */}
        {activeTab === "questions" && lesson.questions && (
          <div className="space-y-4 animate-in fade-in">
            {lesson.questions.map((q, qIdx) => {
              const selectedOpt = quizAnswers[qIdx];
              return (
                <div
                  key={q.id || qIdx}
                  className="glass-card p-6 space-y-4"
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#EAF4FF] text-[#315FC7] text-xs font-bold flex items-center justify-center shrink-0">
                      {qIdx + 1}
                    </span>
                    <h4 className="text-sm md:text-base font-bold text-[#202A3B]">
                      {q.prompt}
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-9">
                    {q.options.map((opt, optIdx) => {
                      let style = "bg-white border-[#E3EAF4] hover:border-[#4F83F1] text-[#202A3B]";
                      if (selectedOpt !== undefined) {
                        if (optIdx === q.correctIndex) {
                          style = "bg-[#EAF8F2] border-[#3DAA80] text-[#20694E] font-bold";
                        } else if (optIdx === selectedOpt) {
                          style = "bg-[#FDEEF0] border-[#D95D67] text-[#D95D67] font-bold";
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => handleSelectQuiz(qIdx, optIdx)}
                          className={`p-3.5 rounded-2xl border text-left text-xs md:text-sm transition-all cursor-pointer flex items-center justify-between ${style}`}
                        >
                          <span>
                            <strong className="mr-2">
                              {String.fromCharCode(65 + optIdx)}.
                            </strong>
                            {opt}
                          </span>
                          {selectedOpt !== undefined && optIdx === q.correctIndex && (
                            <CheckCircle2 className="w-4 h-4 text-[#3DAA80]" />
                          )}
                          {selectedOpt !== undefined &&
                            optIdx === selectedOpt &&
                            optIdx !== q.correctIndex && (
                              <AlertCircle className="w-4 h-4 text-[#D95D67]" />
                            )}
                        </button>
                      );
                    })}
                  </div>

                  {selectedOpt !== undefined && (
                    <div className="pl-9 text-xs text-[#778198] bg-[#F5F9FF] p-3.5 rounded-2xl border border-[#E3EAF4] leading-relaxed">
                      <strong className="text-[#202A3B]">Giải thích: </strong>
                      {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Vocabulary Detail Modal for quick inspection */}
      <VocabularyDetailModal
        item={selectedWord}
        onClose={() => setSelectedWord(null)}
      />
    </AppShell>
  );
}

export default function LessonDetailPage() {
  return (
    <Suspense
      fallback={
        <AppShell title="Đang tải bài học...">
          <LoadingState message="Đang nạp dữ liệu bài học..." />
        </AppShell>
      }
    >
      <LessonDetailContent />
    </Suspense>
  );
}

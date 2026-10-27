"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Volume2,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { VocabularyItem } from "@/types";
import { learningService } from "@/services/learning-service";
import { speakChinese, formatDateVi } from "@/lib/utils";
import { LoadingState } from "@/components/ui/EmptyState";

function VocabularyDetailContent() {
  const params = useParams();
  const wordId = params?.wordId as string;

  const [item, setItem] = useState<VocabularyItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWord() {
      if (wordId) {
        const found = await learningService.getVocabularyById(wordId);
        setItem(found);
      }
      setLoading(false);
    }
    loadWord();
  }, [wordId]);

  if (loading) {
    return (
      <AppShell title="Chi tiết từ vựng">
        <LoadingState message="Đang tải thông tin từ vựng..." />
      </AppShell>
    );
  }

  if (!item) {
    return (
      <AppShell title="Không tìm thấy">
        <div className="glass-panel p-8 text-center max-w-md mx-auto space-y-4">
          <p className="text-sm text-[#778198]">
            Không tìm thấy từ vựng với mã &quot;{wordId}&quot;.
          </p>
          <Link
            href="/vocabulary"
            className="px-4 py-2 rounded-xl bg-[#4F83F1] text-white text-xs font-semibold inline-block"
          >
            Về sổ từ vựng
          </Link>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell title={`Từ vựng: ${item.hanzi}`}>
      <div className="max-w-2xl mx-auto space-y-6">
        <Link
          href="/vocabulary"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#778198] hover:text-[#202A3B] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại sổ từ vựng</span>
        </Link>

        {/* Word Card Hero */}
        <div className="glass-panel p-8 space-y-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#EAF4FF] text-[#315FC7] border border-[#D0E4FF]">
                {item.hskLevel || "HSK"}
              </span>
              {item.partOfSpeech && (
                <span className="text-xs text-[#778198] px-2 py-0.5 rounded bg-[#F5F9FF] border border-[#E3EAF4]">
                  {item.partOfSpeech}
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={() => speakChinese(item.hanzi)}
              className="p-2.5 rounded-full bg-[#EAF4FF] text-[#4F83F1] hover:bg-[#DEEEFF] shadow-xs transition-colors"
              title="Nghe phát âm chuẩn"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-1">
            <div className="font-chinese text-6xl font-extrabold text-[#202A3B]">
              {item.hanzi}
            </div>
            <div className="font-pinyin text-2xl font-bold text-[#4F83F1]">
              {item.pinyin}
            </div>
          </div>

          {/* Meanings */}
          <div className="pt-4 border-t border-[#E3EAF4] space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#778198]">
              Nghĩa tiếng Việt
            </span>
            <div className="flex flex-wrap gap-2">
              {item.meanings.map((m, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 rounded-xl bg-[#F5F9FF] border border-[#E3EAF4] text-sm font-bold text-[#202A3B]"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>

          {/* Example Context */}
          {item.example && (
            <div className="pt-2 space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#778198]">
                Ví dụ câu thực tế
              </span>
              <div className="p-4 rounded-2xl bg-[#F7F9FD] border border-[#E3EAF4] space-y-2">
                <div className="flex items-center justify-between">
                  <p className="font-chinese text-base font-bold text-[#202A3B]">
                    {item.example.hanzi}
                  </p>
                  <button
                    type="button"
                    onClick={() => speakChinese(item.example?.hanzi || "")}
                    className="p-1 rounded text-[#4F83F1] hover:bg-white"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="font-pinyin text-xs text-[#4F83F1]">
                  {item.example.pinyin}
                </p>
                <p className="text-xs text-[#778198] pt-1 border-t border-[#E3EAF4]">
                  {item.example.vietnamese}
                </p>
              </div>
            </div>
          )}

          {/* Study Metrics */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#E3EAF4]">
            <div className="p-3 rounded-xl bg-[#F5F9FF] border border-[#E3EAF4] flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-[#778198]" />
              <div>
                <span className="text-[10px] text-[#778198] block">Lần ôn tập gần nhất</span>
                <span className="text-xs font-bold text-[#202A3B]">
                  {item.lastReviewed ? formatDateVi(item.lastReviewed) : "Chưa ôn"}
                </span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-[#F5F9FF] border border-[#E3EAF4] flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#3DAA80]" />
              <div>
                <span className="text-[10px] text-[#778198] block">Số lần ôn tập</span>
                <span className="text-xs font-bold text-[#202A3B]">
                  {item.reviewCount || 0} lần
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

export default function VocabularyDetailPage() {
  return (
    <Suspense
      fallback={
        <AppShell title="Đang tải từ vựng...">
          <LoadingState message="Đang nạp dữ liệu từ vựng..." />
        </AppShell>
      }
    >
      <VocabularyDetailContent />
    </Suspense>
  );
}

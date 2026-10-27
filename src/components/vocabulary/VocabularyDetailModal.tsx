"use client";

import { X, Volume2, Calendar, CheckCircle2 } from "lucide-react";
import { VocabularyItem } from "@/types";
import { speakChinese, formatDateVi } from "@/lib/utils";

interface VocabularyDetailModalProps {
  item: VocabularyItem | null;
  onClose: () => void;
  onEdit?: (item: VocabularyItem) => void;
}

export function VocabularyDetailModal({
  item,
  onClose,
  onEdit,
}: VocabularyDetailModalProps) {
  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#E3EAF4] animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-[#F5F9FF] to-[#EEE9FF] border-b border-[#E3EAF4] flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#EAF4FF] text-[#315FC7] border border-[#D0E4FF]">
                {item.hskLevel || "Từ vựng"}
              </span>
              {item.partOfSpeech && (
                <span className="text-xs text-[#778198] px-2 py-0.5 rounded bg-white/70 border border-[#E3EAF4]">
                  {item.partOfSpeech}
                </span>
              )}
            </div>
            <div className="flex items-center gap-3 pt-2">
              <h2 className="font-chinese text-4xl font-extrabold text-[#202A3B]">
                {item.hanzi}
              </h2>
              <button
                type="button"
                onClick={() => speakChinese(item.hanzi)}
                className="p-2 rounded-full bg-white text-[#4F83F1] hover:bg-[#EAF4FF] shadow-sm transition-all"
                title="Phát âm chuẩn"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>
            <p className="font-pinyin text-lg font-semibold text-[#4F83F1]">
              {item.pinyin}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-[#778198] hover:text-[#202A3B] hover:bg-white/80 transition-colors"
            aria-label="Đóng cửa sổ"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body content */}
        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          {/* Meanings */}
          <div>
            <h4 className="text-xs font-semibold text-[#778198] uppercase tracking-wider mb-2">
              Nghĩa tiếng Việt
            </h4>
            <div className="flex flex-wrap gap-2">
              {item.meanings.map((m, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-[#F5F9FF] border border-[#E3EAF4] text-sm font-semibold text-[#202A3B]"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>

          {/* Example Sentence */}
          {item.example && (
            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-[#778198] uppercase tracking-wider">
                Câu ví dụ ngữ cảnh
              </h4>
              <div className="p-4 rounded-2xl bg-[#F7F9FD] border border-[#E3EAF4] space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-chinese text-base font-semibold text-[#202A3B]">
                    {item.example.hanzi}
                  </p>
                  <button
                    type="button"
                    onClick={() => speakChinese(item.example?.hanzi || "")}
                    className="p-1 rounded text-[#4F83F1] hover:bg-white transition-colors shrink-0"
                    title="Nghe câu ví dụ"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="font-pinyin text-xs text-[#4F83F1]">
                  {item.example.pinyin}
                </p>
                <p className="text-xs font-medium text-[#778198] pt-1 border-t border-[#E3EAF4]">
                  {item.example.vietnamese}
                </p>
              </div>
            </div>
          )}

          {/* Study metadata */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-[#F5F9FF] border border-[#E3EAF4] flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-[#778198]" />
              <div>
                <p className="text-[10px] text-[#778198]">Lần ôn gần nhất</p>
                <p className="text-xs font-semibold text-[#202A3B]">
                  {item.lastReviewed ? formatDateVi(item.lastReviewed) : "Chưa ôn"}
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#F5F9FF] border border-[#E3EAF4] flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#3DAA80]" />
              <div>
                <p className="text-[10px] text-[#778198]">Số lượt ôn tập</p>
                <p className="text-xs font-semibold text-[#202A3B]">
                  {item.reviewCount || 0} lần
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 px-6 bg-[#F5F9FF] border-t border-[#E3EAF4] flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-[#778198] hover:text-[#202A3B] transition-colors"
          >
            Đóng
          </button>

          {onEdit && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onEdit(item);
              }}
              className="px-4 py-2 rounded-xl bg-[#4F83F1] hover:bg-[#3D72E3] text-white text-xs font-semibold shadow-md shadow-[#4F83F1]/20 transition-all"
            >
              Chỉnh sửa thông tin
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

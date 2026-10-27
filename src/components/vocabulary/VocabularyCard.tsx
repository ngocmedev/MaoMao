"use client";

import React from "react";
import { Volume2, Edit3, Trash2, Tag } from "lucide-react";
import { VocabularyItem } from "@/types";
import { speakChinese } from "@/lib/utils";

interface VocabularyCardProps {
  item: VocabularyItem;
  onEdit?: (item: VocabularyItem) => void;
  onDelete?: (id: string) => void;
  onClick?: (item: VocabularyItem) => void;
}

export function VocabularyCard({
  item,
  onEdit,
  onDelete,
  onClick,
}: VocabularyCardProps) {
  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    speakChinese(item.hanzi);
  };

  const statusBadge = {
    new: { label: "Mới", bg: "bg-[#EAF4FF]", text: "text-[#315FC7]" },
    learning: { label: "Đang học", bg: "bg-[#EEE9FF]", text: "text-[#6B46C1]" },
    mastered: { label: "Đã thuộc", bg: "bg-[#EAF8F2]", text: "text-[#3DAA80]" },
    review: { label: "Cần ôn", bg: "bg-[#FDF5E9]", text: "text-[#E6A34A]" },
  }[item.status || "new"];

  return (
    <div
      onClick={() => onClick && onClick(item)}
      className="glass-card p-5 flex flex-col justify-between gap-4 cursor-pointer group hover:border-[#4F83F1]/40 relative"
    >
      {/* Top row: Badges and Action buttons */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          {item.hskLevel && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EAF4FF] text-[#315FC7] border border-[#D0E4FF]">
              {item.hskLevel}
            </span>
          )}
          <span
            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusBadge.bg} ${statusBadge.text}`}
          >
            {statusBadge.label}
          </span>
          {item.partOfSpeech && (
            <span className="text-[10px] text-[#778198] px-1.5 py-0.5 rounded bg-[#F5F9FF] border border-[#E3EAF4]">
              {item.partOfSpeech}
            </span>
          )}
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
          {onEdit && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(item);
              }}
              className="p-1 rounded text-[#778198] hover:text-[#4F83F1] hover:bg-[#EAF4FF] transition-colors"
              title="Chỉnh sửa từ vựng"
              aria-label="Chỉnh sửa từ vựng"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
          )}
          {onDelete && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(item.id);
              }}
              className="p-1 rounded text-[#778198] hover:text-[#D95D67] hover:bg-[#FDEEF0] transition-colors"
              title="Xóa từ vựng"
              aria-label="Xóa từ vựng"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Hanzi & Pinyin display */}
      <div className="space-y-1">
        <div className="flex items-baseline gap-3">
          <span className="font-chinese text-3xl font-bold text-[#202A3B] group-hover:text-[#4F83F1] transition-colors">
            {item.hanzi}
          </span>
          <button
            type="button"
            onClick={handleSpeak}
            className="p-1.5 rounded-full text-[#4F83F1] hover:bg-[#EAF4FF] transition-colors shrink-0"
            title="Nghe phát âm chuẩn"
            aria-label={`Phát âm ${item.hanzi}`}
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>
        <div className="font-pinyin text-sm text-[#4F83F1] font-medium tracking-wide">
          {item.pinyin}
        </div>
      </div>

      {/* Vietnamese meanings */}
      <div className="border-t border-[#E3EAF4]/80 pt-2.5">
        <p className="text-xs md:text-sm font-semibold text-[#202A3B] line-clamp-2">
          {item.meanings.join(", ")}
        </p>
      </div>

      {/* Example sentence preview */}
      {item.example && (
        <div className="p-2.5 rounded-xl bg-[#F5F9FF] border border-[#E3EAF4] text-xs space-y-1">
          <p className="font-chinese text-[#202A3B] font-medium">
            {item.example.hanzi}
          </p>
          <p className="text-[11px] text-[#778198]">{item.example.vietnamese}</p>
        </div>
      )}

      {/* Footer tags */}
      {item.tags && item.tags.length > 0 && (
        <div className="flex items-center gap-1.5 flex-wrap pt-1 text-[10px] text-[#778198]">
          <Tag className="w-3 h-3 text-[#9BA6BA]" />
          {item.tags.map((tag) => (
            <span key={tag} className="hover:text-[#202A3B]">
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

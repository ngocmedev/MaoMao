"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Volume2,
  RotateCw,
  Sparkles,
  CheckCircle2,
  ThumbsUp,
  ThumbsDown,
  Repeat,
  Smile,
} from "lucide-react";
import confetti from "canvas-confetti";
import { VocabularyItem } from "@/types";
import { learningService } from "@/services/learning-service";
import { speakChinese } from "@/lib/utils";

export function FlashcardReview() {
  const [items, setItems] = useState<VocabularyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [sessionStats, setSessionStats] = useState({
    hard: 0,
    good: 0,
    easy: 0,
  });

  const loadReviewItems = useCallback(async () => {
    setLoading(true);
    const reviewWords = await learningService.getReviewItems();
    setItems(reviewWords);
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsFinished(false);
    setSessionStats({ hard: 0, good: 0, easy: 0 });
    setLoading(false);
  }, []);

  useEffect(() => {
    let active = true;
    async function init() {
      const reviewWords = await learningService.getReviewItems();
      if (active) {
        setItems(reviewWords);
        setLoading(false);
      }
    }
    init();
    return () => {
      active = false;
    };
  }, []);

  const currentWord = items[currentIndex];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentWord) {
      speakChinese(currentWord.hanzi);
    }
  };

  const handleRate = async (quality: "hard" | "good" | "easy") => {
    if (!currentWord) return;

    // Record review result in service
    await learningService.recordReviewResult(currentWord.id, quality);

    setSessionStats((prev) => ({
      ...prev,
      [quality]: prev[quality] + 1,
    }));

    if (currentIndex + 1 < items.length) {
      setIsFlipped(false);
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsFinished(true);
      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#4F83F1", "#B8A6F6", "#3DAA80", "#EAF4FF"],
        });
      } catch {
        // Safe fallback if canvas not available
      }
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3">
        <div className="w-10 h-10 border-3 border-[#E3EAF4] border-t-[#4F83F1] rounded-full animate-spin" />
        <span className="text-xs font-semibold text-[#778198]">
          Đang chuẩn bị bộ thẻ ôn tập...
        </span>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="glass-panel p-12 text-center max-w-lg mx-auto space-y-4">
        <div className="w-16 h-16 rounded-3xl bg-[#EAF8F2] flex items-center justify-center text-[#3DAA80] mx-auto shadow-sm">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-[#202A3B]">Tuyệt vời!</h3>
        <p className="text-sm text-[#778198]">
          Hiện tại bạn không có từ vựng nào đến hạn ôn tập. Tất cả các từ đều đã được nắm vững!
        </p>
        <button
          type="button"
          onClick={loadReviewItems}
          className="px-5 py-2.5 rounded-xl bg-[#4F83F1] text-white text-xs font-semibold shadow-md shadow-[#4F83F1]/20 hover:bg-[#3D72E3] transition-all cursor-pointer"
        >
          Làm mới danh sách
        </button>
      </div>
    );
  }

  if (isFinished) {
    const total = sessionStats.hard + sessionStats.good + sessionStats.easy;
    return (
      <div className="glass-panel p-8 md:p-12 text-center max-w-lg mx-auto space-y-6 animate-in zoom-in-95">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-[#4F83F1] to-[#B8A6F6] text-white flex items-center justify-center mx-auto shadow-lg shadow-[#4F83F1]/25">
          <Sparkles className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-[#202A3B]">
            Hoàn thành phiên ôn tập!
          </h2>
          <p className="text-xs md:text-sm text-[#778198]">
            Bạn đã ôn lại {total} từ vựng tiếng Trung hôm nay. Tiến độ của bạn đã được ghi nhận.
          </p>
        </div>

        {/* Stats breakdown */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 rounded-2xl bg-[#FDF5E9] border border-[#E6A34A]/30 text-center">
            <span className="text-[11px] font-semibold text-[#E6A34A]">Cần ôn lại</span>
            <p className="text-2xl font-black text-[#B86E0E]">{sessionStats.hard}</p>
          </div>
          <div className="p-3 rounded-2xl bg-[#EAF4FF] border border-[#D0E4FF] text-center">
            <span className="text-[11px] font-semibold text-[#315FC7]">Tạm ổn</span>
            <p className="text-2xl font-black text-[#315FC7]">{sessionStats.good}</p>
          </div>
          <div className="p-3 rounded-2xl bg-[#EAF8F2] border border-[#3DAA80]/30 text-center">
            <span className="text-[11px] font-semibold text-[#3DAA80]">Đã thuộc</span>
            <p className="text-2xl font-black text-[#20694E]">{sessionStats.easy}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={loadReviewItems}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#4F83F1] to-[#315FC7] text-white text-sm font-bold shadow-lg shadow-[#4F83F1]/25 hover:from-[#3D72E3] hover:to-[#264FA8] transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <Repeat className="w-4 h-4" />
          <span>Bắt đầu phiên ôn mới</span>
        </button>
      </div>
    );
  }

  const progressPercent = Math.round(((currentIndex + 1) / items.length) * 100);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Session Progress Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-[#778198]">
          <span className="font-semibold text-[#202A3B]">
            Thẻ {currentIndex + 1} / {items.length}
          </span>
          <span className="font-medium">{progressPercent}% hoàn thành</span>
        </div>
        {/* Progress bar */}
        <div className="w-full h-2 rounded-full bg-[#E3EAF4] overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#4F83F1] to-[#B8A6F6] rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Interactive 3D/Card Container */}
      <div
        onClick={handleFlip}
        className="w-full min-h-[380px] rounded-3xl bg-white border border-[#E3EAF4] shadow-xl p-8 flex flex-col justify-between cursor-pointer hover:border-[#4F83F1]/40 transition-all select-none relative group"
      >
        {/* Card Top Meta */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#EAF4FF] text-[#315FC7] border border-[#D0E4FF]">
            {currentWord.hskLevel || "HSK"}
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSpeak}
              className="p-2 rounded-full bg-[#F5F9FF] text-[#4F83F1] hover:bg-[#EAF4FF] transition-colors"
              title="Nghe phát âm chuẩn"
            >
              <Volume2 className="w-5 h-5" />
            </button>
            <span className="text-xs text-[#778198] flex items-center gap-1 group-hover:text-[#4F83F1]">
              <RotateCw className="w-3.5 h-3.5" />
              {isFlipped ? "Nhấp để ẩn" : "Nhấp để lật thẻ"}
            </span>
          </div>
        </div>

        {/* Card Center: Front (Hanzi) vs Back (Pinyin + Meanings + Example) */}
        <div className="my-auto py-8 text-center space-y-4">
          <div className="font-chinese text-6xl md:text-7xl font-bold text-[#202A3B] tracking-tight">
            {currentWord.hanzi}
          </div>

          {/* Answer Area (Revealed on flip or click) */}
          {isFlipped ? (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
              <div className="font-pinyin text-2xl font-bold text-[#4F83F1]">
                {currentWord.pinyin}
              </div>

              <div className="text-lg md:text-xl font-bold text-[#202A3B]">
                {currentWord.meanings.join(", ")}
              </div>

              {currentWord.example && (
                <div className="max-w-md mx-auto p-4 rounded-2xl bg-[#F5F9FF] border border-[#E3EAF4] space-y-1 text-left">
                  <p className="font-chinese text-sm font-semibold text-[#202A3B]">
                    {currentWord.example.hanzi}
                  </p>
                  <p className="font-pinyin text-xs text-[#4F83F1]">
                    {currentWord.example.pinyin}
                  </p>
                  <p className="text-xs text-[#778198]">
                    {currentWord.example.vietnamese}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-xs font-semibold text-[#9BA6BA] tracking-wide uppercase">
              Chạm vào thẻ để xem phiên âm và nghĩa tiếng Việt
            </div>
          )}
        </div>

        {/* Card Bottom status hint */}
        <div className="text-center text-[11px] text-[#9BA6BA]">
          Lượt ôn tập: {currentWord.reviewCount || 0} lần
        </div>
      </div>

      {/* Review Response Action Controls */}
      {isFlipped ? (
        <div className="grid grid-cols-3 gap-3 animate-in fade-in">
          <button
            type="button"
            onClick={() => handleRate("hard")}
            className="p-3.5 rounded-2xl bg-white border border-[#E6A34A]/50 hover:bg-[#FDF5E9] text-[#E6A34A] font-bold text-xs md:text-sm shadow-xs flex flex-col items-center gap-1 transition-all cursor-pointer"
          >
            <ThumbsDown className="w-4 h-4 text-[#E6A34A]" />
            <span>Khó (Ôn lại)</span>
          </button>

          <button
            type="button"
            onClick={() => handleRate("good")}
            className="p-3.5 rounded-2xl bg-white border border-[#4F83F1]/40 hover:bg-[#EAF4FF] text-[#315FC7] font-bold text-xs md:text-sm shadow-xs flex flex-col items-center gap-1 transition-all cursor-pointer"
          >
            <Smile className="w-4 h-4 text-[#4F83F1]" />
            <span>Tạm ổn</span>
          </button>

          <button
            type="button"
            onClick={() => handleRate("easy")}
            className="p-3.5 rounded-2xl bg-white border border-[#3DAA80]/50 hover:bg-[#EAF8F2] text-[#3DAA80] font-bold text-xs md:text-sm shadow-xs flex flex-col items-center gap-1 transition-all cursor-pointer"
          >
            <ThumbsUp className="w-4 h-4 text-[#3DAA80]" />
            <span>Dễ (Đã thuộc)</span>
          </button>
        </div>
      ) : (
        <div className="text-center">
          <button
            type="button"
            onClick={handleFlip}
            className="px-6 py-3 rounded-2xl bg-white border border-[#E3EAF4] hover:border-[#4F83F1] text-xs md:text-sm font-bold text-[#202A3B] shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            Hiển thị đáp án (Phím Cách)
          </button>
        </div>
      )}
    </div>
  );
}

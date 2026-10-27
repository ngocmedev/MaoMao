"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  PenTool,
  RotateCcw,
  Volume2,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Eye,
  EyeOff,
} from "lucide-react";
import { speakChinese } from "@/lib/utils";
import confetti from "canvas-confetti";

interface WritingChar {
  hanzi: string;
  pinyin: string;
  meaning: string;
  strokes: number;
  radicals: string;
}

const charactersList: WritingChar[] = [
  { hanzi: "学", pinyin: "xué", meaning: "học", strokes: 8, radicals: "子 (tử)" },
  { hanzi: "好", pinyin: "hǎo", meaning: "tốt, đẹp", strokes: 6, radicals: "女 (nữ)" },
  { hanzi: "买", pinyin: "mǎi", meaning: "mua", strokes: 6, radicals: "乙 (ất)" },
  { hanzi: "水", pinyin: "shuǐ", meaning: "nước", strokes: 4, radicals: "水 (thủy)" },
];

export function WritingPracticeView() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [showGuide, setShowGuide] = useState(true);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [unscrambledWords, setUnscrambledWords] = useState<string[]>([]);
  const [unscrambleCorrect, setUnscrambleCorrect] = useState<boolean | null>(null);

  const char = charactersList[currentCharIndex];

  // Sentence unscramble puzzle
  const targetSentence = ["我", "在", "超市", "买", "苹果"];
  const [shuffledTokens, setShuffledTokens] = useState<string[]>([
    "买",
    "苹果",
    "我",
    "超市",
    "在",
  ]);

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  }, []);

  useEffect(() => {
    clearCanvas();
  }, [clearCanvas, currentCharIndex]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    setHasDrawn(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx?.beginPath();
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing && e.type !== "mousedown" && e.type !== "touchstart") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let clientX = 0;
    let clientY = 0;

    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.lineWidth = 14;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#202A3B";

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const handleNextChar = () => {
    setCurrentCharIndex((prev) => (prev + 1) % charactersList.length);
  };

  const handleAddToken = (token: string, idx: number) => {
    setUnscrambledWords([...unscrambledWords, token]);
    const updated = shuffledTokens.filter((_, i) => i !== idx);
    setShuffledTokens(updated);
  };

  const handleRemoveToken = (token: string, idx: number) => {
    setShuffledTokens([...shuffledTokens, token]);
    const updated = unscrambledWords.filter((_, i) => i !== idx);
    setUnscrambledWords(updated);
    setUnscrambleCorrect(null);
  };

  const handleCheckUnscramble = () => {
    const isMatch =
      unscrambledWords.length === targetSentence.length &&
      unscrambledWords.every((w, i) => w === targetSentence[i]);

    setUnscrambleCorrect(isMatch);
    if (isMatch) {
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      } catch {}
    }
  };

  return (
    <div className="space-y-8">
      {/* SECTION 1: Character Stroke Canvas (Tian Zi Ge Grid) */}
      <div className="glass-panel p-6 md:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E3EAF4] pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#EAF4FF] text-[#4F83F1]">
              <PenTool className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base md:text-lg font-bold text-[#202A3B]">
                Luyện viết chữ Hán trên ô điền tự (田字格)
              </h2>
              <p className="text-xs text-[#778198]">
                Dùng chuột hoặc ngón tay để nắn nót từng nét theo đúng thứ tự.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowGuide(!showGuide)}
              className="px-3 py-1.5 rounded-xl bg-white border border-[#E3EAF4] text-xs font-semibold text-[#778198] hover:text-[#202A3B] flex items-center gap-1.5 shadow-xs transition-colors"
            >
              {showGuide ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{showGuide ? "Ẩn nét mờ" : "Hiện nét mờ"}</span>
            </button>

            <button
              type="button"
              onClick={clearCanvas}
              className="px-3 py-1.5 rounded-xl bg-white border border-[#E3EAF4] text-xs font-semibold text-[#778198] hover:text-[#D95D67] flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Xóa bảng</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center justify-center">
          {/* Left info */}
          <div className="md:col-span-5 space-y-4">
            <div className="p-5 rounded-2xl bg-[#F5F9FF] border border-[#E3EAF4] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#EAF4FF] text-[#315FC7]">
                  Chữ {currentCharIndex + 1} / {charactersList.length}
                </span>
                <button
                  type="button"
                  onClick={() => speakChinese(char.hanzi)}
                  className="p-1.5 rounded-lg bg-white text-[#4F83F1] hover:bg-[#EAF4FF] border border-[#D0E4FF]"
                  title="Nghe phát âm"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-baseline gap-3">
                <span className="font-chinese text-5xl font-bold text-[#202A3B]">
                  {char.hanzi}
                </span>
                <span className="font-pinyin text-xl font-bold text-[#4F83F1]">
                  {char.pinyin}
                </span>
              </div>

              <p className="text-sm font-semibold text-[#202A3B]">
                Nghĩa: {char.meaning}
              </p>

              <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-[#E3EAF4]">
                <div>
                  <span className="text-[#778198]">Số nét: </span>
                  <span className="font-semibold text-[#202A3B]">{char.strokes} nét</span>
                </div>
                <div>
                  <span className="text-[#778198]">Bộ thủ: </span>
                  <span className="font-semibold text-[#202A3B]">{char.radicals}</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleNextChar}
              className="w-full py-2.5 rounded-xl bg-white border border-[#E3EAF4] hover:bg-[#F5F9FF] text-xs font-bold text-[#315FC7] shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <span>Chuyển sang chữ tiếp theo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right: Interactive Canvas in Tian Zi Ge */}
          <div className="md:col-span-7 flex flex-col items-center justify-center">
            <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] tian-zi-ge overflow-hidden shadow-lg">
              {/* Faint watermark guide behind canvas */}
              {showGuide && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
                  <span className="font-chinese text-[180px] sm:text-[210px] text-[#202A3B]/10 leading-none">
                    {char.hanzi}
                  </span>
                </div>
              )}

              {/* Drawing Canvas */}
              <canvas
                ref={canvasRef}
                width={320}
                height={320}
                onMouseDown={startDrawing}
                onMouseUp={stopDrawing}
                onMouseMove={draw}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchEnd={stopDrawing}
                onTouchMove={draw}
                className="w-full h-full relative z-10 cursor-crosshair touch-none"
              />
            </div>

            <span className="text-[11px] text-[#778198] mt-3">
              {hasDrawn ? "Đang viết nét..." : "Di chuột hoặc chạm ngón tay để vẽ chữ"}
            </span>
          </div>
        </div>
      </div>

      {/* SECTION 2: Sentence Structure & Grammar Writing Puzzle */}
      <div className="glass-card p-6 md:p-8 space-y-5">
        <div className="space-y-1">
          <h3 className="text-base font-bold text-[#202A3B] flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#4F83F1]" />
            Luyện sắp xếp ngữ pháp câu: &quot;Tôi mua táo ở siêu thị&quot;
          </h3>
          <p className="text-xs text-[#778198]">
            Chọn các thẻ từ tiếng Trung bên dưới và ghép lại thành một câu hoàn chỉnh theo đúng cấu trúc ngữ pháp.
          </p>
        </div>

        {/* Selected Tokens Dropping Box */}
        <div className="min-h-[64px] p-4 rounded-2xl bg-[#F5F9FF] border-2 border-dashed border-[#CBD6E4] flex items-center gap-2 flex-wrap">
          {unscrambledWords.length === 0 ? (
            <span className="text-xs text-[#9BA6BA]">
              Bấm vào các từ bên dưới để ghép vào đây...
            </span>
          ) : (
            unscrambledWords.map((token, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleRemoveToken(token, idx)}
                className="px-3.5 py-2 rounded-xl bg-[#4F83F1] text-white font-chinese text-base font-semibold shadow-xs hover:bg-[#3D72E3] transition-all cursor-pointer"
                title="Nhấp để trả lại từ"
              >
                {token}
              </button>
            ))
          )}
        </div>

        {/* Shuffled Available Tokens */}
        <div className="space-y-2">
          <span className="text-xs font-semibold text-[#778198]">
            Từ vựng khả dụng:
          </span>
          <div className="flex items-center gap-2 flex-wrap">
            {shuffledTokens.map((token, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleAddToken(token, idx)}
                className="px-4 py-2 rounded-xl bg-white border border-[#E3EAF4] hover:border-[#4F83F1] hover:bg-[#F5F9FF] font-chinese text-base font-semibold text-[#202A3B] shadow-xs transition-all cursor-pointer"
              >
                {token}
              </button>
            ))}
          </div>
        </div>

        {/* Actions & Result check */}
        <div className="pt-2 flex items-center justify-between">
          <button
            type="button"
            onClick={handleCheckUnscramble}
            disabled={unscrambledWords.length === 0}
            className="px-5 py-2.5 rounded-xl bg-[#4F83F1] hover:bg-[#3D72E3] text-white text-xs md:text-sm font-bold shadow-md shadow-[#4F83F1]/20 transition-all cursor-pointer disabled:opacity-40"
          >
            Kiểm tra ngữ pháp
          </button>

          {unscrambleCorrect !== null && (
            <div className="flex items-center gap-2 text-xs font-semibold animate-in fade-in">
              {unscrambleCorrect ? (
                <span className="text-[#3DAA80] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  Chính xác! Câu đúng là: 我在超市买苹果 (Wǒ zài chāoshì mǎi píngguǒ).
                </span>
              ) : (
                <span className="text-[#D95D67]">
                  Chưa chính xác. Lưu ý cấu trúc ngữ pháp: [Chủ ngữ] + 在 [Địa điểm] + [Hành động]!
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

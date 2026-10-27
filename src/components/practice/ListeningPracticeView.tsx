"use client";

import React, { useState } from "react";
import {
  Volume2,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Headphones,
} from "lucide-react";
import { speakChinese } from "@/lib/utils";

interface ListeningQuestion {
  id: string;
  audioText: string;
  pinyin: string;
  translation: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const listeningData: ListeningQuestion[] = [
  {
    id: "l-1",
    audioText: "我想去超市买两斤新鲜的苹果。",
    pinyin: "Wǒ xiǎng qù chāoshì mǎi liǎng jīn xīnxiān de píngguǒ.",
    translation: "Tôi muốn đi siêu thị mua hai cân táo tươi.",
    prompt: "Người nói muốn mua món đồ gì?",
    options: ["Quần áo", "Táo tươi", "Sữa bò", "Bánh mì"],
    correctIndex: 1,
    explanation: "Trong đoạn phát âm người nói nói '买两斤新鲜的苹果' (mua hai cân táo tươi).",
  },
  {
    id: "l-2",
    audioText: "昨天下午我和朋友去公园散步了。",
    pinyin: "Zuótiān xiàwǔ wǒ hé péngyou qù gōngyuán sànbù le.",
    translation: "Chiều hôm qua tôi cùng bạn đi công viên dạo bộ.",
    prompt: "Họ đã đi đâu vào chiều hôm qua?",
    options: ["Đi xem phim", "Đi công viên", "Đi ăn cơm", "Đi mua sắm"],
    correctIndex: 1,
    explanation: "Đoạn phát âm nêu '去公园散步' (đi công viên dạo bộ).",
  },
  {
    id: "l-3",
    audioText: "这件衣服不仅好看，而且价格很便宜。",
    pinyin: "Zhè jiàn yīfu bùjǐn hǎokàn, érqiě jiàgé hěn piányi.",
    translation: "Bộ quần áo này không chỉ đẹp mà giá cả còn rất rẻ.",
    prompt: "Bộ quần áo được đánh giá như thế nào?",
    options: ["Rất đắt tiền", "Vừa đẹp vừa rẻ", "Màu sắc xấu", "Quá rộng"],
    correctIndex: 1,
    explanation: "Người nói sử dụng cấu trúc '不仅好看，而且很便宜' (không chỉ đẹp mà còn rẻ).",
  },
];

export function ListeningPracticeView() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [speed, setSpeed] = useState<number>(0.9);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showTranscript, setShowTranscript] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const current = listeningData[currentIndex];

  const handlePlayAudio = () => {
    speakChinese(current.audioText, speed);
  };

  const handleSelectAnswer = (idx: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(idx);
    if (idx === current.correctIndex) {
      setScore((prev) => prev + 1);
    }
    setShowTranscript(true);
  };

  const handleNext = () => {
    if (currentIndex + 1 < listeningData.length) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setShowTranscript(false);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowTranscript(false);
    setScore(0);
    setIsCompleted(false);
  };

  if (isCompleted) {
    return (
      <div className="glass-panel p-8 text-center max-w-lg mx-auto space-y-5 animate-in zoom-in-95">
        <div className="w-16 h-16 rounded-3xl bg-[#EAF8F2] text-[#3DAA80] flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-[#202A3B]">
          Hoàn thành bài luyện Nghe!
        </h2>
        <p className="text-sm text-[#778198]">
          Bạn đã trả lời đúng {score} / {listeningData.length} câu hỏi nghe hiểu.
        </p>
        <button
          type="button"
          onClick={handleRestart}
          className="px-6 py-2.5 rounded-xl bg-[#4F83F1] hover:bg-[#3D72E3] text-white text-xs md:text-sm font-bold shadow-md shadow-[#4F83F1]/20 transition-all cursor-pointer"
        >
          Luyện tập lại
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header info */}
      <div className="flex items-center justify-between text-xs text-[#778198]">
        <span className="font-semibold text-[#202A3B]">
          Câu {currentIndex + 1} / {listeningData.length}
        </span>
        <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-xl border border-[#E3EAF4]">
          <span className="text-[11px]">Tốc độ đọc:</span>
          {[0.75, 0.9, 1.0].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSpeed(s)}
              className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                speed === s
                  ? "bg-[#4F83F1] text-white"
                  : "text-[#778198] hover:text-[#202A3B]"
              }`}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>

      {/* Audio listening player card */}
      <div className="glass-panel p-8 text-center space-y-5 border border-[#D0E4FF]">
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#4F83F1] to-[#6597F8] text-white flex items-center justify-center mx-auto shadow-lg shadow-[#4F83F1]/25 hover:scale-105 transition-transform cursor-pointer"
          onClick={handlePlayAudio}
          role="button"
          tabIndex={0}
          aria-label="Phát âm thanh câu hỏi"
        >
          <Volume2 className="w-10 h-10 animate-pulse" />
        </div>

        <div>
          <button
            type="button"
            onClick={handlePlayAudio}
            className="px-5 py-2 rounded-xl bg-white text-[#4F83F1] border border-[#D0E4FF] hover:bg-[#F5F9FF] text-xs font-semibold shadow-xs inline-flex items-center gap-2 cursor-pointer transition-all"
          >
            <Headphones className="w-4 h-4" />
            <span>Bấm để nghe đoạn hội thoại (Phát âm chuẩn zh-CN)</span>
          </button>
        </div>

        {/* Transcript reveal toggle */}
        {showTranscript && (
          <div className="p-4 rounded-2xl bg-[#F5F9FF] border border-[#E3EAF4] space-y-2 text-left animate-in fade-in">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#315FC7]">
              Lời thoại & Dịch nghĩa
            </span>
            <p className="font-chinese text-base font-bold text-[#202A3B]">
              {current.audioText}
            </p>
            <p className="font-pinyin text-xs text-[#4F83F1]">{current.pinyin}</p>
            <p className="text-xs text-[#778198]">{current.translation}</p>
          </div>
        )}
      </div>

      {/* Question prompt & options */}
      <div className="glass-card p-6 space-y-4">
        <h3 className="text-sm md:text-base font-bold text-[#202A3B]">
          {current.prompt}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {current.options.map((opt, idx) => {
            let style = "bg-white border-[#E3EAF4] hover:border-[#4F83F1] text-[#202A3B]";
            if (selectedAnswer !== null) {
              if (idx === current.correctIndex) {
                style = "bg-[#EAF8F2] border-[#3DAA80] text-[#20694E] font-bold";
              } else if (idx === selectedAnswer) {
                style = "bg-[#FDEEF0] border-[#D95D67] text-[#D95D67] font-bold";
              }
            }

            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectAnswer(idx)}
                disabled={selectedAnswer !== null}
                className={`p-3.5 rounded-2xl border text-left text-xs md:text-sm transition-all cursor-pointer flex items-center justify-between ${style}`}
              >
                <span>
                  <strong className="mr-2">{String.fromCharCode(65 + idx)}.</strong>
                  {opt}
                </span>
                {selectedAnswer !== null && idx === current.correctIndex && (
                  <CheckCircle2 className="w-4 h-4 text-[#3DAA80] shrink-0" />
                )}
                {selectedAnswer !== null &&
                  idx === selectedAnswer &&
                  idx !== current.correctIndex && (
                    <AlertCircle className="w-4 h-4 text-[#D95D67] shrink-0" />
                  )}
              </button>
            );
          })}
        </div>

        {/* Explanation & Next action */}
        {selectedAnswer !== null && (
          <div className="pt-4 border-t border-[#E3EAF4] flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in">
            <p className="text-xs text-[#778198] leading-relaxed">
              <strong className="text-[#202A3B]">Giải thích: </strong>
              {current.explanation}
            </p>

            <button
              type="button"
              onClick={handleNext}
              className="px-5 py-2.5 rounded-xl bg-[#4F83F1] hover:bg-[#3D72E3] text-white text-xs font-bold shadow-md shadow-[#4F83F1]/20 flex items-center justify-center gap-1.5 shrink-0 cursor-pointer transition-all"
            >
              <span>{currentIndex + 1 < listeningData.length ? "Câu tiếp theo" : "Xem kết quả"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import {
  Mic,
  MicOff,
  Volume2,
  ArrowRight,
  Star,
} from "lucide-react";
import { speakChinese } from "@/lib/utils";

interface SpeakingPrompt {
  id: string;
  hanzi: string;
  pinyin: string;
  vietnamese: string;
  difficulty: string;
  keyPhonemes: string[]; // e.g. ["zh", "ch", "thanh 4"]
}

const speakingData: SpeakingPrompt[] = [
  {
    id: "sp-1",
    hanzi: "你好，很高兴认识你！",
    pinyin: "Nǐ hǎo, hěn gāoxìng rènshi nǐ!",
    vietnamese: "Xin chào, rất vui được quen biết bạn!",
    difficulty: "HSK 1",
    keyPhonemes: ["Biến điệu thanh 3 (Nǐ hǎo)", "Thanh 4 (gāoxìng)"],
  },
  {
    id: "sp-2",
    hanzi: "请问飞往北京的航班几点起飞？",
    pinyin: "Qǐngwèn fēi wǎng Běijīng de hángbān jǐ diǎn qǐfēi?",
    vietnamese: "Xin hỏi chuyến bay đi Bắc Kinh mấy giờ cất cánh?",
    difficulty: "HSK 3",
    keyPhonemes: ["Âm bật hơi (Qǐng, qǐ)", "Thanh nhẹ (de)"],
  },
  {
    id: "sp-3",
    hanzi: "我觉得学习汉语很有意思。",
    pinyin: "Wǒ juéde xuéxí hànyǔ hěn yǒu yìsi.",
    vietnamese: "Tôi cảm thấy học tiếng Trung rất thú vị.",
    difficulty: "HSK 2",
    keyPhonemes: ["Âm mặt lưỡi (xuéxí)", "Biến điệu thanh 3"],
  },
];

export function SpeakingPracticeView() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(0);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [selfRating, setSelfRating] = useState<number | null>(null);

  const current = speakingData[currentIndex];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRecording) {
      timer = setInterval(() => {
        setRecordSeconds((s) => s + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRecording]);

  const handleToggleRecord = () => {
    if (isRecording) {
      setIsRecording(false);
      setHasRecorded(true);
    } else {
      setIsRecording(true);
      setRecordSeconds(0);
      setHasRecorded(false);
      setSelfRating(null);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < speakingData.length) {
      setCurrentIndex(currentIndex + 1);
      setIsRecording(false);
      setHasRecorded(false);
      setRecordSeconds(0);
      setSelfRating(null);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setIsRecording(false);
    setHasRecorded(false);
    setRecordSeconds(0);
    setSelfRating(null);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Top indicator */}
      <div className="flex items-center justify-between text-xs text-[#778198]">
        <span className="font-semibold text-[#202A3B]">
          Mẫu câu {currentIndex + 1} / {speakingData.length}
        </span>
        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#EAF4FF] text-[#315FC7]">
          {current.difficulty}
        </span>
      </div>

      {/* Target Speaking Sentence Card */}
      <div className="glass-panel p-8 text-center space-y-6">
        <div className="space-y-2">
          <div className="font-chinese text-3xl md:text-4xl font-bold text-[#202A3B] leading-relaxed">
            {current.hanzi}
          </div>
          <div className="font-pinyin text-lg font-semibold text-[#4F83F1]">
            {current.pinyin}
          </div>
          <p className="text-sm text-[#778198]">{current.vietnamese}</p>
        </div>

        {/* Listen native pronunciation */}
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => speakChinese(current.hanzi, 0.85)}
            className="px-4 py-2 rounded-xl bg-white border border-[#D0E4FF] text-[#315FC7] hover:bg-[#F5F9FF] text-xs font-semibold shadow-xs flex items-center gap-2 cursor-pointer transition-all"
          >
            <Volume2 className="w-4 h-4 text-[#4F83F1]" />
            <span>Nghe mẫu phát âm chuẩn</span>
          </button>
        </div>

        {/* Phoneme focus notes */}
        <div className="p-3 rounded-2xl bg-[#F5F9FF] border border-[#E3EAF4] text-xs flex items-center justify-center gap-2 flex-wrap text-[#315FC7]">
          <span className="font-bold text-[#202A3B]">Điểm cần chú ý:</span>
          {current.keyPhonemes.map((p, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 rounded-md bg-white border border-[#D0E4FF] text-[11px] font-medium"
            >
              {p}
            </span>
          ))}
        </div>
      </div>

      {/* Recording simulator and waveform */}
      <div className="glass-card p-6 text-center space-y-5">
        <div className="flex flex-col items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleToggleRecord}
            className={`w-20 h-20 rounded-full flex items-center justify-center text-white shadow-xl transition-all cursor-pointer ${
              isRecording
                ? "bg-[#D95D67] scale-110 shadow-[#D95D67]/30 animate-pulse"
                : "bg-gradient-to-tr from-[#4F83F1] to-[#315FC7] hover:scale-105 shadow-[#4F83F1]/30"
            }`}
            aria-label={isRecording ? "Dừng ghi âm" : "Bắt đầu ghi âm"}
          >
            {isRecording ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
          </button>

          <span className="text-xs font-semibold text-[#202A3B]">
            {isRecording
              ? `Đang lắng nghe... (${recordSeconds}s)`
              : hasRecorded
              ? "Đã hoàn thành lượt đọc thử"
              : "Bấm vào mic để bắt đầu luyện nói"}
          </span>

          {/* Simulated Waveform Animation */}
          {isRecording && (
            <div className="flex items-center gap-1.5 h-8">
              {[40, 70, 95, 60, 85, 45, 90, 75, 55, 30].map((h, i) => (
                <div
                  key={i}
                  className="w-1.5 bg-[#4F83F1] rounded-full animate-pulse"
                  style={{
                    height: `${h}%`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Self-evaluation rubric after recording */}
        {hasRecorded && (
          <div className="pt-4 border-t border-[#E3EAF4] space-y-4 animate-in fade-in">
            <span className="text-xs font-bold text-[#202A3B]">
              Tự đánh giá phần phát âm của bạn:
            </span>

            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setSelfRating(star)}
                  className={`p-2 rounded-xl transition-colors cursor-pointer ${
                    selfRating && star <= selfRating
                      ? "text-[#E6A34A] bg-[#FDF5E9]"
                      : "text-[#CBD6E4] hover:text-[#E6A34A]"
                  }`}
                  aria-label={`${star} sao`}
                >
                  <Star className="w-6 h-6 fill-current" />
                </button>
              ))}
            </div>

            {selfRating && (
              <p className="text-xs text-[#3DAA80] font-semibold">
                Đã ghi nhận đánh giá {selfRating}/5 sao! Tiếp tục giữ vững phong độ nhé.
              </p>
            )}

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleToggleRecord}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#778198] hover:text-[#202A3B] border border-[#E3EAF4] hover:bg-[#F5F9FF]"
              >
                Ghi âm lại
              </button>

              <button
                type="button"
                onClick={
                  currentIndex + 1 < speakingData.length ? handleNext : handleRestart
                }
                className="px-5 py-2.5 rounded-xl bg-[#4F83F1] hover:bg-[#3D72E3] text-white text-xs font-bold shadow-md shadow-[#4F83F1]/20 flex items-center gap-1.5 cursor-pointer"
              >
                <span>
                  {currentIndex + 1 < speakingData.length ? "Câu tiếp theo" : "Luyện lại từ đầu"}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

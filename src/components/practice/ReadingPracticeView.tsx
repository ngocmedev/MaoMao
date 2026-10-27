"use client";

import React, { useState } from "react";
import {
  Volume2,
  BookOpen,
  Sparkles,
  HelpCircle,
} from "lucide-react";
import { speakChinese } from "@/lib/utils";

interface WordLookup {
  hanzi: string;
  pinyin: string;
  meaning: string;
}

const sampleWords: Record<string, WordLookup> = {
  星期天: { hanzi: "星期天", pinyin: "xīngqītiān", meaning: "Chủ nhật" },
  超市: { hanzi: "超市", pinyin: "chāoshì", meaning: "siêu thị" },
  买: { hanzi: "买", pinyin: "mǎi", meaning: "mua" },
  东西: { hanzi: "东西", pinyin: "dōngxi", meaning: "đồ đạc, sắm sửa" },
  新鲜: { hanzi: "新鲜", pinyin: "xīnxiān", meaning: "tươi mới" },
  水果: { hanzi: "水果", pinyin: "shuǐguǒ", meaning: "hoa quả, trái cây" },
  服务员: { hanzi: "服务员", pinyin: "fúwùyuán", meaning: "nhân viên phục vụ" },
  热情: { hanzi: "热情", pinyin: "rèqíng", meaning: "nhiệt tình" },
  一共: { hanzi: "一共", pinyin: "yígòng", meaning: "tổng cộng" },
  方便: { hanzi: "方便", pinyin: "fāngbiàn", meaning: "tiện lợi" },
  开心: { hanzi: "开心", pinyin: "kāixīn", meaning: "vui vẻ" },
};

export function ReadingPracticeView() {
  const [pinyinMode, setPinyinMode] = useState<"always" | "hover" | "hidden">("hover");
  const [selectedWord, setSelectedWord] = useState<WordLookup | null>(sampleWords["超市"]);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);

  const passageHanzi =
    "今天星期天，我和妈妈一起去家附近的超市买东西。超市里的人很多，商品也很全。我们买了新鲜的水果、蔬菜和牛奶。付款的时候，服务员很热情，一共花了一百二十块钱。我觉得在超市购物既方便又开心。";
  const passagePinyin =
    "Jīntiān xīngqītiān, wǒ hé māma yīqǐ qù jiā fùjìn de chāoshì mǎi dōngxi. Chāoshì lǐ de rén hěn duō, shāngpǐn yě hěn quán. Wǒmen mǎi le xīnxiān de shuǐguǒ, shūcài hé niúnǎi. Fùkuǎn de shíhou, fúwùyuán hěn rèqíng, yígòng huā le yībǎi èrshí kuài qián. Wǒ juéde zài chāoshì gòuwù jì fāngbiàn yòu kāixīn.";
  const passageTranslation =
    "Hôm nay là Chủ nhật, tôi cùng mẹ đi siêu thị gần nhà mua sắm. Trong siêu thị người rất đông, hàng hóa cũng rất đầy đủ. Chúng tôi đã mua hoa quả tươi, rau củ và sữa bò. Khi thanh toán, bạn nhân viên rất nhiệt tình, tổng cộng hết 120 tệ. Tôi cảm thấy mua sắm tại siêu thị vừa tiện lợi vừa vui vẻ.";

  const handleWordClick = (w: string) => {
    if (sampleWords[w]) {
      setSelectedWord(sampleWords[w]);
      speakChinese(w);
    }
  };

  return (
    <div className="space-y-6">
      {/* Control bar */}
      <div className="glass-panel p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-[#4F83F1]" />
          <h2 className="text-base font-bold text-[#202A3B]">
            Chuyến đi siêu thị cuối tuần (周末去超市)
          </h2>
          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#EAF4FF] text-[#315FC7]">
            HSK 2
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Audio listen */}
          <button
            type="button"
            onClick={() => speakChinese(passageHanzi, 0.85)}
            className="px-3 py-1.5 rounded-xl bg-white border border-[#D0E4FF] text-xs font-semibold text-[#315FC7] hover:bg-[#F5F9FF] shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Volume2 className="w-4 h-4 text-[#4F83F1]" />
            <span>Nghe toàn bài đọc</span>
          </button>

          {/* Pinyin display switcher */}
          <div className="flex items-center gap-1 bg-[#F5F9FF] p-1 rounded-xl border border-[#E3EAF4] text-xs">
            <button
              type="button"
              onClick={() => setPinyinMode("always")}
              className={`px-2 py-1 rounded-lg font-medium transition-colors ${
                pinyinMode === "always"
                  ? "bg-white text-[#315FC7] shadow-xs font-semibold"
                  : "text-[#778198]"
              }`}
            >
              Hiện Pinyin
            </button>
            <button
              type="button"
              onClick={() => setPinyinMode("hover")}
              className={`px-2 py-1 rounded-lg font-medium transition-colors ${
                pinyinMode === "hover"
                  ? "bg-white text-[#315FC7] shadow-xs font-semibold"
                  : "text-[#778198]"
              }`}
            >
              Rê chuột
            </button>
            <button
              type="button"
              onClick={() => setPinyinMode("hidden")}
              className={`px-2 py-1 rounded-lg font-medium transition-colors ${
                pinyinMode === "hidden"
                  ? "bg-white text-[#315FC7] shadow-xs font-semibold"
                  : "text-[#778198]"
              }`}
            >
              Ẩn
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Main Reading Passage Text */}
        <div className="lg:col-span-8 space-y-4">
          <div className="glass-panel p-6 md:p-8 space-y-5">
            <div className="flex items-center justify-between pb-2 border-b border-[#E3EAF4]">
              <span className="text-xs font-semibold text-[#778198]">
                💡 Mẹo: Nhấp vào bất kỳ từ vựng được gạch chân để tra nghĩa và phát âm tức thì.
              </span>
            </div>

            {/* Interactive paragraph tokens */}
            <div className="font-chinese text-xl md:text-2xl leading-loose text-[#202A3B] tracking-wide select-text">
              <span>今天</span>
              <span
                onClick={() => handleWordClick("星期天")}
                className="underline decoration-[#4F83F1] decoration-2 underline-offset-4 cursor-pointer hover:text-[#4F83F1] transition-colors"
                title="xīngqītiān (Chủ nhật)"
              >
                星期天
              </span>
              <span>，我和妈妈一起去家附近的</span>
              <span
                onClick={() => handleWordClick("超市")}
                className="underline decoration-[#4F83F1] decoration-2 underline-offset-4 cursor-pointer hover:text-[#4F83F1] font-semibold text-[#315FC7] transition-colors"
                title="chāoshì (siêu thị)"
              >
                超市
              </span>
              <span
                onClick={() => handleWordClick("买")}
                className="underline decoration-[#4F83F1] decoration-2 underline-offset-4 cursor-pointer hover:text-[#4F83F1] transition-colors"
              >
                买
              </span>
              <span
                onClick={() => handleWordClick("东西")}
                className="underline decoration-[#4F83F1] decoration-2 underline-offset-4 cursor-pointer hover:text-[#4F83F1] transition-colors"
              >
                东西
              </span>
              <span>。超市里的人很多，商品也很全。我们买了</span>
              <span
                onClick={() => handleWordClick("新鲜")}
                className="underline decoration-[#3DAA80] decoration-2 underline-offset-4 cursor-pointer hover:text-[#3DAA80] transition-colors"
              >
                新鲜
              </span>
              <span>的</span>
              <span
                onClick={() => handleWordClick("水果")}
                className="underline decoration-[#4F83F1] decoration-2 underline-offset-4 cursor-pointer hover:text-[#4F83F1] transition-colors"
              >
                水果
              </span>
              <span>、蔬菜和牛奶。付款的时候，</span>
              <span
                onClick={() => handleWordClick("服务员")}
                className="underline decoration-[#4F83F1] decoration-2 underline-offset-4 cursor-pointer hover:text-[#4F83F1] transition-colors"
              >
                服务员
              </span>
              <span>很</span>
              <span
                onClick={() => handleWordClick("热情")}
                className="underline decoration-[#E6A34A] decoration-2 underline-offset-4 cursor-pointer hover:text-[#E6A34A] transition-colors"
              >
                热情
              </span>
              <span>，</span>
              <span
                onClick={() => handleWordClick("一共")}
                className="underline decoration-[#4F83F1] decoration-2 underline-offset-4 cursor-pointer hover:text-[#4F83F1] transition-colors"
              >
                一共
              </span>
              <span>花了一百二十块钱。我觉得在超市购物既</span>
              <span
                onClick={() => handleWordClick("方便")}
                className="underline decoration-[#4F83F1] decoration-2 underline-offset-4 cursor-pointer hover:text-[#4F83F1] transition-colors"
              >
                方便
              </span>
              <span>又</span>
              <span
                onClick={() => handleWordClick("开心")}
                className="underline decoration-[#3DAA80] decoration-2 underline-offset-4 cursor-pointer hover:text-[#3DAA80] transition-colors"
              >
                开心
              </span>
              <span>。</span>
            </div>

            {/* Pinyin layer if always shown */}
            {pinyinMode === "always" && (
              <div className="p-4 rounded-2xl bg-[#F5F9FF] border border-[#E3EAF4] font-pinyin text-xs md:text-sm text-[#4F83F1] leading-relaxed">
                {passagePinyin}
              </div>
            )}

            {/* Translation block */}
            <div className="pt-4 border-t border-[#E3EAF4] space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#778198]">
                Bản dịch tiếng Việt
              </span>
              <p className="text-xs md:text-sm text-[#202A3B] leading-relaxed">
                {passageTranslation}
              </p>
            </div>
          </div>

          {/* Quick reading comprehension question */}
          <div className="glass-card p-6 space-y-3">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#4F83F1]" />
              <h4 className="text-xs md:text-sm font-bold text-[#202A3B]">
                Câu hỏi đọc hiểu: Họ đã mua những mặt hàng gì tại siêu thị?
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {[
                "Quần áo và giày dép",
                "Hoa quả tươi, rau củ và sữa bò",
                "Sách vở và bút viết",
                "Điện thoại và máy tính",
              ].map((opt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setQuizAnswer(idx)}
                  className={`p-3 rounded-xl border text-left font-medium transition-colors cursor-pointer ${
                    quizAnswer === idx
                      ? idx === 1
                        ? "bg-[#EAF8F2] border-[#3DAA80] text-[#20694E] font-bold"
                        : "bg-[#FDEEF0] border-[#D95D67] text-[#D95D67]"
                      : "bg-white border-[#E3EAF4] text-[#202A3B] hover:border-[#4F83F1]"
                  }`}
                >
                  <strong className="mr-1.5">{String.fromCharCode(65 + idx)}.</strong>
                  {opt}
                </button>
              ))}
            </div>

            {quizAnswer !== null && (
              <div className="p-3 rounded-xl bg-[#F5F9FF] border border-[#E3EAF4] text-xs text-[#778198]">
                {quizAnswer === 1 ? (
                  <span className="text-[#3DAA80] font-bold">
                    Chính xác! Trong bài viết có câu: &quot;我们买了新鲜的水果、蔬菜和牛奶&quot;.
                  </span>
                ) : (
                  <span className="text-[#D95D67] font-medium">
                    Chưa chính xác. Bạn hãy xem lại đoạn giữa của bài đọc nhé.
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar: Instant Word Lookup Inspector */}
        <div className="lg:col-span-4 space-y-4">
          <div className="glass-card p-5 space-y-4 sticky top-20">
            <div className="flex items-center justify-between pb-2 border-b border-[#E3EAF4]">
              <span className="text-xs font-bold text-[#202A3B]">
                Tra cứu từ trong bài đọc
              </span>
              <Sparkles className="w-4 h-4 text-[#B8A6F6]" />
            </div>

            {selectedWord ? (
              <div className="space-y-4 animate-in fade-in">
                <div className="p-4 rounded-2xl bg-[#F5F9FF] border border-[#E3EAF4] space-y-2 text-center">
                  <div className="font-chinese text-4xl font-bold text-[#202A3B]">
                    {selectedWord.hanzi}
                  </div>
                  <div className="font-pinyin text-base font-semibold text-[#4F83F1]">
                    {selectedWord.pinyin}
                  </div>

                  <button
                    type="button"
                    onClick={() => speakChinese(selectedWord.hanzi)}
                    className="px-3 py-1.5 rounded-xl bg-white border border-[#D0E4FF] text-xs font-semibold text-[#4F83F1] hover:bg-[#EAF4FF] shadow-xs inline-flex items-center gap-1.5 mx-auto cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Phát âm</span>
                  </button>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-[#778198] uppercase">
                    Ý nghĩa tiếng Việt:
                  </span>
                  <p className="text-sm font-bold text-[#202A3B] p-2.5 rounded-xl bg-white border border-[#E3EAF4]">
                    {selectedWord.meaning}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-xs text-[#778198] text-center py-8">
                Nhấp vào từ bất kỳ trong bài đọc để xem phân tích.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

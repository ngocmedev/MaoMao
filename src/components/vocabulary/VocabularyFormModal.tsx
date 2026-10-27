"use client";

import React, { useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import { VocabularyItem, HskLevel, WordStatus } from "@/types";

interface VocabularyFormModalProps {
  isOpen: boolean;
  initialData?: VocabularyItem | null;
  onClose: () => void;
  onSave: (data: Omit<VocabularyItem, "id">) => void;
}

function VocabularyFormContent({
  initialData,
  onClose,
  onSave,
}: {
  initialData?: VocabularyItem | null;
  onClose: () => void;
  onSave: (data: Omit<VocabularyItem, "id">) => void;
}) {
  const [hanzi, setHanzi] = useState(initialData?.hanzi || "");
  const [pinyin, setPinyin] = useState(initialData?.pinyin || "");
  const [meanings, setMeanings] = useState<string[]>(
    initialData?.meanings.length ? initialData.meanings : [""]
  );
  const [partOfSpeech, setPartOfSpeech] = useState(
    initialData?.partOfSpeech || "danh từ"
  );
  const [hskLevel, setHskLevel] = useState<HskLevel>(
    initialData?.hskLevel || "HSK 1"
  );
  const [status, setStatus] = useState<WordStatus>(initialData?.status || "new");
  const [exampleHanzi, setExampleHanzi] = useState(
    initialData?.example?.hanzi || ""
  );
  const [examplePinyin, setExamplePinyin] = useState(
    initialData?.example?.pinyin || ""
  );
  const [exampleVi, setExampleVi] = useState(
    initialData?.example?.vietnamese || ""
  );
  const [error, setError] = useState<string | null>(null);

  const handleAddMeaning = () => {
    setMeanings([...meanings, ""]);
  };

  const handleMeaningChange = (index: number, val: string) => {
    const updated = [...meanings];
    updated[index] = val;
    setMeanings(updated);
  };

  const handleRemoveMeaning = (index: number) => {
    if (meanings.length === 1) return;
    setMeanings(meanings.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hanzi.trim()) {
      setError("Vui lòng nhập chữ Hán");
      return;
    }
    if (!pinyin.trim()) {
      setError("Vui lòng nhập pinyin");
      return;
    }
    const cleanMeanings = meanings.map((m) => m.trim()).filter(Boolean);
    if (cleanMeanings.length === 0) {
      setError("Vui lòng nhập ít nhất một nghĩa tiếng Việt");
      return;
    }

    onSave({
      hanzi: hanzi.trim(),
      pinyin: pinyin.trim(),
      meanings: cleanMeanings,
      partOfSpeech,
      hskLevel,
      status,
      example:
        exampleHanzi.trim() && exampleVi.trim()
          ? {
              hanzi: exampleHanzi.trim(),
              pinyin: examplePinyin.trim(),
              vietnamese: exampleVi.trim(),
            }
          : undefined,
    });
    onClose();
  };

  return (
    <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#E3EAF4]">
      <div className="p-5 border-b border-[#E3EAF4] flex items-center justify-between bg-[#F5F9FF]">
        <h3 className="text-base font-bold text-[#202A3B]">
          {initialData ? "Chỉnh sửa từ vựng" : "Thêm từ vựng mới"}
        </h3>
        <button
          type="button"
          onClick={onClose}
          className="p-1.5 rounded-lg text-[#778198] hover:text-[#202A3B] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
        {error && (
          <div className="p-3 rounded-xl bg-[#FDEEF0] border border-[#D95D67]/30 text-xs text-[#D95D67] font-medium">
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-[#202A3B] mb-1">
              Chữ Hán (汉字) *
            </label>
            <input
              type="text"
              value={hanzi}
              onChange={(e) => setHanzi(e.target.value)}
              placeholder="Ví dụ: 学习"
              className="w-full px-3 py-2 rounded-xl border border-[#E3EAF4] font-chinese text-base focus:outline-none focus:ring-2 focus:ring-[#4F83F1]/30 focus:border-[#4F83F1]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#202A3B] mb-1">
              Phiên âm Pinyin *
            </label>
            <input
              type="text"
              value={pinyin}
              onChange={(e) => setPinyin(e.target.value)}
              placeholder="Ví dụ: xuéxí"
              className="w-full px-3 py-2 rounded-xl border border-[#E3EAF4] font-pinyin text-sm focus:outline-none focus:ring-2 focus:ring-[#4F83F1]/30 focus:border-[#4F83F1]"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-[#202A3B] mb-1">
              Cấp độ HSK
            </label>
            <select
              value={hskLevel}
              onChange={(e) => setHskLevel(e.target.value as HskLevel)}
              className="w-full px-3 py-2 rounded-xl border border-[#E3EAF4] text-xs focus:outline-none focus:ring-2 focus:ring-[#4F83F1]/30"
            >
              {["HSK 1", "HSK 2", "HSK 3", "HSK 4", "HSK 5", "HSK 6"].map((lvl) => (
                <option key={lvl} value={lvl}>
                  {lvl}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#202A3B] mb-1">
              Từ loại
            </label>
            <select
              value={partOfSpeech}
              onChange={(e) => setPartOfSpeech(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[#E3EAF4] text-xs focus:outline-none focus:ring-2 focus:ring-[#4F83F1]/30"
            >
              <option value="danh từ">Danh từ (名词)</option>
              <option value="động từ">Động từ (动词)</option>
              <option value="tính từ">Tính từ (形容词)</option>
              <option value="phó từ">Phó từ (副词)</option>
              <option value="lượng từ">Lượng từ (量词)</option>
              <option value="đại từ">Đại từ (代词)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#202A3B] mb-1">
            Trạng thái ghi nhớ
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as WordStatus)}
            className="w-full px-3 py-2 rounded-xl border border-[#E3EAF4] text-xs focus:outline-none focus:ring-2 focus:ring-[#4F83F1]/30"
          >
            <option value="new">Từ mới (Mới thêm)</option>
            <option value="learning">Đang học</option>
            <option value="mastered">Đã thuộc vững</option>
            <option value="review">Cần ôn tập</option>
          </select>
        </div>

        {/* Meanings array */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-semibold text-[#202A3B]">
              Nghĩa tiếng Việt *
            </label>
            <button
              type="button"
              onClick={handleAddMeaning}
              className="text-xs text-[#4F83F1] hover:underline flex items-center gap-1 font-medium"
            >
              <Plus className="w-3 h-3" /> Thêm nghĩa
            </button>
          </div>
          <div className="space-y-2">
            {meanings.map((m, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  value={m}
                  onChange={(e) => handleMeaningChange(idx, e.target.value)}
                  placeholder={`Nghĩa ${idx + 1}...`}
                  className="flex-1 px-3 py-2 rounded-xl border border-[#E3EAF4] text-xs focus:outline-none focus:ring-2 focus:ring-[#4F83F1]/30 focus:border-[#4F83F1]"
                />
                {meanings.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveMeaning(idx)}
                    className="p-2 text-[#778198] hover:text-[#D95D67]"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Example Sentence */}
        <div className="pt-2 border-t border-[#E3EAF4] space-y-2">
          <label className="block text-xs font-semibold text-[#778198]">
            Câu ví dụ (tùy chọn)
          </label>
          <input
            type="text"
            value={exampleHanzi}
            onChange={(e) => setExampleHanzi(e.target.value)}
            placeholder="Câu chữ Hán..."
            className="w-full px-3 py-2 rounded-xl border border-[#E3EAF4] font-chinese text-xs"
          />
          <input
            type="text"
            value={examplePinyin}
            onChange={(e) => setExamplePinyin(e.target.value)}
            placeholder="Pinyin câu ví dụ..."
            className="w-full px-3 py-2 rounded-xl border border-[#E3EAF4] font-pinyin text-xs"
          />
          <input
            type="text"
            value={exampleVi}
            onChange={(e) => setExampleVi(e.target.value)}
            placeholder="Dịch nghĩa tiếng Việt..."
            className="w-full px-3 py-2 rounded-xl border border-[#E3EAF4] text-xs"
          />
        </div>

        <div className="pt-4 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-[#778198] hover:text-[#202A3B]"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-[#4F83F1] hover:bg-[#3D72E3] text-white text-xs font-semibold shadow-md shadow-[#4F83F1]/20 transition-all cursor-pointer"
          >
            {initialData ? "Lưu thay đổi" : "Thêm vào từ vựng"}
          </button>
        </div>
      </form>
    </div>
  );
}

export function VocabularyFormModal({
  isOpen,
  initialData,
  onClose,
  onSave,
}: VocabularyFormModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in"
      role="dialog"
      aria-modal="true"
    >
      <VocabularyFormContent
        key={initialData?.id || "new"}
        initialData={initialData}
        onClose={onClose}
        onSave={onSave}
      />
    </div>
  );
}

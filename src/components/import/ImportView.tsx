"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  UploadCloud,
  FileCode,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Volume2,
  ArrowRight,
} from "lucide-react";
import { validateImportJson, ValidatedImportPayload, ValidationErrorDetail } from "@/lib/validations/import-schema";
import { sampleGeminiImportJson } from "@/lib/mock-data/sample-import";
import { learningService } from "@/services/learning-service";
import { useToast } from "@/components/ui/ToastContext";
import { speakChinese } from "@/lib/utils";

export function ImportView() {
  const router = useRouter();
  const { showToast } = useToast();

  const [jsonText, setJsonText] = useState("");
  const [parseError, setParseError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationErrorDetail[]>([]);
  const [parsedData, setParsedData] = useState<ValidatedImportPayload | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "vocab" | "reading" | "questions">("overview");
  const [isImporting, setIsImporting] = useState(false);

  // Validate JSON string
  const handleValidate = (rawText: string) => {
    setJsonText(rawText);
    setParseError(null);
    setValidationErrors([]);
    setParsedData(null);

    if (!rawText.trim()) return;

    try {
      const obj = JSON.parse(rawText);
      const res = validateImportJson(obj);

      if (res.success && res.data) {
        setParsedData(res.data);
      } else if (res.errors) {
        setValidationErrors(res.errors);
      }
    } catch (e) {
      const err = e as Error;
      setParseError(`Lỗi định dạng JSON: ${err.message || "Cú pháp không hợp lệ"}`);
    }
  };

  // Load sample JSON
  const handleLoadSample = () => {
    const formatted = JSON.stringify(sampleGeminiImportJson, null, 2);
    handleValidate(formatted);
    showToast({
      type: "info",
      title: "Đã nạp mẫu JSON trích xuất từ Gemini",
      message: "Dữ liệu mẫu bài học Sân bay & Du lịch (HSK 3) đã sẵn sàng xem trước.",
    });
  };

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith(".json")) {
      showToast({
        type: "error",
        title: "Tệp không hợp lệ",
        message: "Vui lòng chọn tệp định dạng .json",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      handleValidate(content);
      showToast({
        type: "info",
        title: "Đã tải tệp JSON",
        message: file.name,
      });
    };
    reader.readAsText(file);
  };

  // Confirm Import
  const handleConfirmImport = async () => {
    if (!parsedData) return;
    setIsImporting(true);

    try {
      const newLesson = await learningService.importLessonDemo(parsedData);
      showToast({
        type: "success",
        title: "Nhập bài học thành công!",
        message: `Đã thêm "${newLesson.title}" cùng ${newLesson.vocabulary.length} từ vựng mới vào kho lưu trữ.`,
      });

      // Redirect to newly created lesson detail
      setTimeout(() => {
        router.push(`/lessons/${newLesson.id}`);
      }, 600);
    } catch (e) {
      const err = e as Error;
      showToast({
        type: "error",
        title: "Lỗi nhập dữ liệu",
        message: err.message || "Không thể lưu bài học vào bộ nhớ.",
      });
      setIsImporting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Banner introduction */}
      <div className="glass-panel p-6 bg-gradient-to-r from-[#EAF4FF] via-white to-[#EEE9FF] border border-[#D0E4FF]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#315FC7] text-white">
                Gemini Workflow
              </span>
              <span className="text-xs text-[#778198]">Version 1.0 / 1.1</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-[#202A3B]">
              Nhập tài liệu trích xuất từ Gemini
            </h2>
            <p className="text-xs md:text-sm text-[#778198] max-w-2xl leading-relaxed">
              Dán đoạn mã JSON hoặc tải tệp .json được tạo bởi AI Gemini sau khi xem video tự học.
              MaoMao sẽ tự động kiểm tra cấu trúc, phân loại từ vựng và tạo bài học hoàn chỉnh.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleLoadSample}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#F5F9FF] text-[#315FC7] border border-[#D0E4FF] text-xs font-semibold shadow-xs flex items-center gap-2 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#B8A6F6]" />
              <span>Nạp mẫu JSON</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Input area */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-card p-5 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#202A3B] flex items-center gap-1.5">
                <FileCode className="w-4 h-4 text-[#4F83F1]" />
                Dán mã JSON hoặc Tải tệp
              </label>

              {jsonText && (
                <button
                  type="button"
                  onClick={() => handleValidate("")}
                  className="text-xs text-[#778198] hover:text-[#D95D67] flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" /> Xóa trắng
                </button>
              )}
            </div>

            {/* File dropzone / upload */}
            <div className="relative border-2 border-dashed border-[#CBD6E4] hover:border-[#4F83F1] rounded-2xl p-4 text-center bg-[#F7F9FD] transition-colors">
              <input
                type="file"
                accept=".json,application/json"
                onChange={handleFileUpload}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                title="Tải lên tệp JSON"
              />
              <UploadCloud className="w-6 h-6 text-[#4F83F1] mx-auto mb-1" />
              <p className="text-xs font-semibold text-[#202A3B]">
                Nhấp để chọn tệp .json hoặc kéo thả vào đây
              </p>
              <p className="text-[11px] text-[#778198] mt-0.5">
                Hỗ trợ tệp JSON chuẩn sinh bởi Gemini
              </p>
            </div>

            {/* JSON Textarea */}
            <div className="space-y-1">
              <span className="text-[11px] text-[#778198]">
                Hoặc dán trực tiếp nội dung JSON:
              </span>
              <textarea
                value={jsonText}
                onChange={(e) => handleValidate(e.target.value)}
                placeholder='{\n  "schemaVersion": "1.0",\n  "title": "Tiêu đề bài học...",\n  "level": "HSK 2",\n  "vocabulary": [...]\n}'
                rows={12}
                className="w-full p-3 font-mono text-xs rounded-xl border border-[#E3EAF4] bg-[#F5F9FF] text-[#202A3B] focus:outline-none focus:ring-2 focus:ring-[#4F83F1]/30 focus:border-[#4F83F1] leading-relaxed resize-y"
              />
            </div>

            {/* Validation Feedback Status */}
            {parseError && (
              <div className="p-3 rounded-xl bg-[#FDEEF0] border border-[#D95D67]/30 text-xs text-[#D95D67] space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  Cú pháp JSON không hợp lệ
                </div>
                <p className="font-mono text-[11px]">{parseError}</p>
              </div>
            )}

            {validationErrors.length > 0 && (
              <div className="p-3 rounded-xl bg-[#FDF5E9] border border-[#E6A34A]/40 text-xs text-[#995E15] space-y-2">
                <div className="font-bold flex items-center gap-1.5 text-[#B86E0E]">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  Phát hiện {validationErrors.length} lỗi trong dữ liệu:
                </div>
                <ul className="space-y-1 pl-4 list-disc text-[11px]">
                  {validationErrors.map((err, idx) => (
                    <li key={idx}>
                      <span className="font-mono font-semibold bg-white/70 px-1 py-0.2 rounded text-[#202A3B]">
                        {err.path}
                      </span>
                      : {err.message}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {parsedData && (
              <div className="p-3 rounded-xl bg-[#EAF8F2] border border-[#3DAA80]/30 text-xs text-[#20694E] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#3DAA80] shrink-0" />
                <span className="font-semibold">
                  Dữ liệu hợp lệ! Sẵn sàng nhập vào kho bài học.
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Parsed Preview and Confirmation */}
        <div className="lg:col-span-7 space-y-4">
          <div className="glass-panel p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E3EAF4] pb-4">
              <h3 className="text-base font-bold text-[#202A3B]">
                Xem trước bài học trích xuất
              </h3>

              {/* Navigation Tabs */}
              <div className="flex items-center gap-1 bg-[#F5F9FF] p-1 rounded-xl border border-[#E3EAF4] text-xs">
                <button
                  type="button"
                  onClick={() => setActiveTab("overview")}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                    activeTab === "overview"
                      ? "bg-white text-[#315FC7] shadow-xs font-semibold"
                      : "text-[#778198] hover:text-[#202A3B]"
                  }`}
                >
                  Tổng quan
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("vocab")}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                    activeTab === "vocab"
                      ? "bg-white text-[#315FC7] shadow-xs font-semibold"
                      : "text-[#778198] hover:text-[#202A3B]"
                  }`}
                >
                  Từ vựng ({parsedData?.vocabulary.length || 0})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("reading")}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                    activeTab === "reading"
                      ? "bg-white text-[#315FC7] shadow-xs font-semibold"
                      : "text-[#778198] hover:text-[#202A3B]"
                  }`}
                >
                  Bài đọc
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("questions")}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                    activeTab === "questions"
                      ? "bg-white text-[#315FC7] shadow-xs font-semibold"
                      : "text-[#778198] hover:text-[#202A3B]"
                  }`}
                >
                  Bài tập ({parsedData?.questions?.length || 0})
                </button>
              </div>
            </div>

            {/* Empty preview placeholder */}
            {!parsedData && (
              <div className="py-16 text-center text-[#778198] space-y-2">
                <FileCode className="w-10 h-10 mx-auto text-[#CBD6E4]" />
                <p className="text-sm font-medium">Chưa có dữ liệu để xem trước</p>
                <p className="text-xs max-w-sm mx-auto">
                  Vui lòng dán mã JSON hợp lệ hoặc nhấp &quot;Nạp mẫu JSON&quot; ở trên để trải nghiệm.
                </p>
              </div>
            )}

            {/* TAB 1: OVERVIEW */}
            {parsedData && activeTab === "overview" && (
              <div className="space-y-4 animate-in fade-in">
                <div className="p-4 rounded-2xl bg-[#F5F9FF] border border-[#E3EAF4] space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#EAF4FF] text-[#315FC7] border border-[#D0E4FF]">
                      {parsedData.level}
                    </span>
                    <span className="text-xs text-[#778198]">
                      Ước tính: {parsedData.durationMinutes || 15} phút
                    </span>
                  </div>
                  <h4 className="text-xl font-bold text-[#202A3B]">
                    {parsedData.title}
                  </h4>
                  {parsedData.description && (
                    <p className="text-xs md:text-sm text-[#778198]">
                      {parsedData.description}
                    </p>
                  )}
                  {parsedData.source && (
                    <p className="text-xs text-[#315FC7] font-medium bg-white px-3 py-1.5 rounded-lg border border-[#D0E4FF] inline-block">
                      Nguồn: {parsedData.source}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 rounded-xl bg-white border border-[#E3EAF4]">
                    <span className="text-xs text-[#778198]">Số từ vựng</span>
                    <p className="text-lg font-bold text-[#4F83F1]">
                      {parsedData.vocabulary.length}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-[#E3EAF4]">
                    <span className="text-xs text-[#778198]">Bài đọc</span>
                    <p className="text-lg font-bold text-[#3DAA80]">
                      {parsedData.reading ? "Có" : "Không"}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-[#E3EAF4]">
                    <span className="text-xs text-[#778198]">Câu hỏi luyện</span>
                    <p className="text-lg font-bold text-[#E6A34A]">
                      {parsedData.questions?.length || 0}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: VOCABULARY */}
            {parsedData && activeTab === "vocab" && (
              <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1 animate-in fade-in">
                {parsedData.vocabulary.map((v, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-[#F7F9FD] border border-[#E3EAF4] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-chinese text-2xl font-bold text-[#202A3B]">
                          {v.hanzi}
                        </span>
                        <span className="font-pinyin text-xs font-semibold text-[#4F83F1]">
                          {v.pinyin}
                        </span>
                        {v.partOfSpeech && (
                          <span className="text-[10px] text-[#778198] px-1.5 py-0.2 rounded bg-white border border-[#E3EAF4]">
                            {v.partOfSpeech}
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => speakChinese(v.hanzi)}
                          className="p-1 rounded text-[#4F83F1] hover:bg-[#EAF4FF]"
                          title="Phát âm"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-xs text-[#202A3B] font-medium">
                        {v.meanings.join(", ")}
                      </p>
                      {v.example && (
                        <p className="text-[11px] text-[#778198]">
                          Ví dụ: <span className="font-chinese">{v.example.hanzi}</span> ({v.example.vietnamese})
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB 3: READING */}
            {parsedData && activeTab === "reading" && (
              <div className="space-y-4 max-h-[460px] overflow-y-auto pr-1 animate-in fade-in">
                {parsedData.reading ? (
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-[#F5F9FF] border border-[#E3EAF4] space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-[#202A3B]">
                          {parsedData.reading.title || "Bài đọc"}
                        </h4>
                        <button
                          type="button"
                          onClick={() => speakChinese(parsedData.reading?.hanzi || "")}
                          className="px-2.5 py-1 rounded-lg text-xs font-medium text-[#4F83F1] bg-white border border-[#D0E4FF] flex items-center gap-1.5 shadow-xs"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>Nghe bài đọc</span>
                        </button>
                      </div>

                      <div className="font-chinese text-base text-[#202A3B] leading-relaxed tracking-wide pt-1">
                        {parsedData.reading.hanzi}
                      </div>

                      {parsedData.reading.pinyin && (
                        <div className="font-pinyin text-xs text-[#4F83F1] leading-relaxed">
                          {parsedData.reading.pinyin}
                        </div>
                      )}
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-[#E3EAF4] space-y-1">
                      <span className="text-[11px] font-semibold text-[#778198] uppercase tracking-wider">
                        Bản dịch tiếng Việt đối chiếu
                      </span>
                      <p className="text-xs md:text-sm text-[#202A3B] leading-relaxed">
                        {parsedData.reading.translation}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-[#778198] text-center py-8">
                    Bài học này không có đoạn văn bài đọc đính kèm.
                  </p>
                )}
              </div>
            )}

            {/* TAB 4: QUESTIONS */}
            {parsedData && activeTab === "questions" && (
              <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1 animate-in fade-in">
                {parsedData.questions && parsedData.questions.length > 0 ? (
                  parsedData.questions.map((q, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-[#F7F9FD] border border-[#E3EAF4] space-y-2.5"
                    >
                      <div className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-[#EAF4FF] text-[#315FC7] text-xs font-bold flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <div className="flex-1">
                          <p className="text-xs md:text-sm font-bold text-[#202A3B]">
                            {q.prompt}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pl-7">
                        {q.options.map((opt, oIdx) => (
                          <div
                            key={oIdx}
                            className={`p-2 rounded-xl text-xs border ${
                              oIdx === q.correctIndex
                                ? "bg-[#EAF8F2] border-[#3DAA80] text-[#20694E] font-semibold"
                                : "bg-white border-[#E3EAF4] text-[#202A3B]"
                            }`}
                          >
                            <span className="font-bold mr-1.5">{String.fromCharCode(65 + oIdx)}.</span>
                            {opt}
                          </div>
                        ))}
                      </div>

                      <div className="pl-7 text-[11px] text-[#778198] bg-white p-2.5 rounded-xl border border-[#E3EAF4]">
                        <span className="font-semibold text-[#202A3B]">Giải thích: </span>
                        {q.explanation}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-[#778198] text-center py-8">
                    Không có câu hỏi luyện tập nào trong dữ liệu nhập.
                  </p>
                )}
              </div>
            )}

            {/* Confirmation CTA */}
            {parsedData && (
              <div className="pt-4 border-t border-[#E3EAF4] flex items-center justify-between">
                <span className="text-xs text-[#778198]">
                  Sẵn sàng nhập {parsedData.vocabulary.length} từ vựng vào kho bài học
                </span>

                <button
                  type="button"
                  onClick={handleConfirmImport}
                  disabled={isImporting}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#4F83F1] to-[#315FC7] hover:from-[#3D72E3] hover:to-[#264FA8] text-white text-xs md:text-sm font-bold shadow-lg shadow-[#4F83F1]/25 flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                >
                  <span>{isImporting ? "Đang xử lý..." : "Xác nhận nhập vào MaoMao"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import { describe, it, expect } from "vitest";
import { validateImportJson } from "../src/lib/validations/import-schema";

describe("Import Lesson Payload Validation", () => {
  it("successfully validates a valid payload", () => {
    const validData = {
      schemaVersion: "1.0",
      title: "Đi siêu thị mua đồ (去超市买东西)",
      source: "Trích xuất từ video tự học Gemini",
      level: "HSK 2",
      durationMinutes: 15,
      vocabulary: [
        {
          hanzi: "超市",
          pinyin: "chāoshì",
          meanings: ["siêu thị"],
          partOfSpeech: "danh từ",
          example: {
            hanzi: "我们去超市买水果吧。",
            pinyin: "Wǒmen qù chāoshì mǎi shuǐguǒ ba.",
            vietnamese: "Chúng ta đi siêu thị mua hoa quả nhé.",
          },
        },
      ],
      reading: {
        title: "Một ngày mua sắm",
        hanzi: "今天天气很好，我和朋友一起去超市买东西。",
        pinyin: "Jīntiān tiānqì hěn hǎo, wǒ hé péngyou yīqǐ qù chāoshì mǎi dōngxi.",
        translation: "Hôm nay thời tiết rất đẹp, tôi cùng bạn đi siêu thị mua sắm.",
      },
      questions: [
        {
          type: "multiple_choice",
          prompt: "Họ đi siêu thị để làm gì?",
          options: ["Mua đồ", "Xem phim", "Học bài", "Đi ngủ"],
          correctIndex: 0,
          explanation: "Trong bài đọc có câu '去超市买东西' nghĩa là đi siêu thị mua đồ.",
        },
      ],
    };

    const result = validateImportJson(validData);
    expect(result.success).toBe(true);
    expect(result.data?.title).toBe("Đi siêu thị mua đồ (去超市买东西)");
    expect(result.data?.vocabulary.length).toBe(1);
  });

  it("fails when schemaVersion is invalid", () => {
    const invalidVersion = {
      schemaVersion: "99.0",
      title: "Test",
      level: "HSK 1",
      vocabulary: [{ hanzi: "你", pinyin: "nǐ", meanings: ["bạn"] }],
    };
    const result = validateImportJson(invalidVersion);
    expect(result.success).toBe(false);
    expect(result.errors?.some((e) => e.path === "schemaVersion")).toBe(true);
  });

  it("fails when correctIndex is out of bounds", () => {
    const invalidIndex = {
      schemaVersion: "1.0",
      title: "Test Question Bounds",
      level: "HSK 1",
      vocabulary: [{ hanzi: "好", pinyin: "hǎo", meanings: ["tốt"] }],
      questions: [
        {
          type: "multiple_choice",
          prompt: "Câu hỏi mẫu?",
          options: ["A", "B"],
          correctIndex: 5, // out of bounds
          explanation: "Giải thích",
        },
      ],
    };
    const result = validateImportJson(invalidIndex);
    expect(result.success).toBe(false);
    expect(result.errors?.some((e) => e.path.includes("correctIndex"))).toBe(true);
  });

  it("fails when vocabulary list is empty", () => {
    const emptyVocab = {
      schemaVersion: "1.0",
      title: "Empty Vocab Lesson",
      level: "HSK 3",
      vocabulary: [],
    };
    const result = validateImportJson(emptyVocab);
    expect(result.success).toBe(false);
    expect(result.errors?.some((e) => e.path === "vocabulary")).toBe(true);
  });
});

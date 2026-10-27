import { z } from "zod";

const hskLevels = ["HSK 1", "HSK 2", "HSK 3", "HSK 4", "HSK 5", "HSK 6"] as const;

export const exampleSentenceSchema = z.object({
  hanzi: z.string().min(1, "Câu ví dụ chữ Hán không được để trống"),
  pinyin: z.string().min(1, "Pinyin của câu ví dụ không được để trống"),
  vietnamese: z.string().min(1, "Nghĩa tiếng Việt của câu ví dụ không được để trống"),
});

export const importVocabularyItemSchema = z.object({
  hanzi: z.string().min(1, "Chữ Hán (hanzi) không được để trống"),
  pinyin: z.string().min(1, "Phiên âm pinyin không được để trống"),
  meanings: z
    .array(z.string().min(1, "Nghĩa không được rỗng"))
    .min(1, "Cần ít nhất một nghĩa tiếng Việt"),
  partOfSpeech: z.string().optional(),
  example: exampleSentenceSchema.optional(),
  tags: z.array(z.string()).optional(),
});

export const importParagraphSchema = z.object({
  hanzi: z.string().min(1, "Đoạn văn chữ Hán không được để trống"),
  pinyin: z.string().optional(),
  translation: z.string().min(1, "Bản dịch tiếng Việt không được để trống"),
});

export const importReadingSchema = z.object({
  title: z.string().optional(),
  hanzi: z.string().min(1, "Bài đọc chữ Hán không được để trống"),
  pinyin: z.string().optional(),
  translation: z.string().min(1, "Bản dịch bài đọc không được để trống"),
  paragraphs: z.array(importParagraphSchema).optional(),
});

export const questionTypeEnum = z.enum([
  "multiple_choice",
  "fill_in_blank",
  "tone_match",
  "listening",
]);

export const importQuestionSchema = z
  .object({
    type: questionTypeEnum.default("multiple_choice"),
    prompt: z.string().min(1, "Câu hỏi không được để trống"),
    pinyinPrompt: z.string().optional(),
    options: z.array(z.string().min(1)).min(2, "Cần ít nhất 2 đáp án lựa chọn"),
    correctIndex: z.number().int().min(0, "Chỉ số đáp án đúng phải >= 0"),
    explanation: z.string().min(1, "Giải thích đáp án không được để trống"),
  })
  .refine((data) => data.correctIndex < data.options.length, {
    message: "Chỉ số đáp án đúng (correctIndex) vượt quá số lượng lựa chọn",
    path: ["correctIndex"],
  });

export const importLessonPayloadSchema = z.object({
  schemaVersion: z
    .string()
    .refine((v) => ["1.0", "1.1"].includes(v), {
      message: "Phiên bản schema chưa được hỗ trợ (chỉ hỗ trợ '1.0' hoặc '1.1')",
    }),
  title: z.string().min(2, "Tiêu đề bài học phải có ít nhất 2 ký tự"),
  description: z.string().optional(),
  source: z.string().optional(),
  level: z.enum(hskLevels, {
    message: "Cấp độ phải thuộc từ 'HSK 1' đến 'HSK 6'",
  }),
  durationMinutes: z.number().positive().optional().default(15),
  vocabulary: z
    .array(importVocabularyItemSchema)
    .min(1, "Bài học phải chứa ít nhất một từ vựng"),
  reading: importReadingSchema.optional(),
  questions: z.array(importQuestionSchema).optional(),
});

export type ValidatedImportPayload = z.infer<typeof importLessonPayloadSchema>;

export interface ValidationErrorDetail {
  path: string;
  message: string;
}

export function validateImportJson(raw: unknown): {
  success: boolean;
  data?: ValidatedImportPayload;
  errors?: ValidationErrorDetail[];
} {
  const result = importLessonPayloadSchema.safeParse(raw);
  if (result.success) {
    return { success: true, data: result.data };
  }

  const issues = result.error.issues;
  const errors: ValidationErrorDetail[] = issues.map((err) => ({
    path: err.path.length > 0 ? err.path.join(".") : "root",
    message: err.message,
  }));

  return { success: false, errors };
}

export type HskLevel = "HSK 1" | "HSK 2" | "HSK 3" | "HSK 4" | "HSK 5" | "HSK 6";

export type WordStatus = "new" | "learning" | "mastered" | "review";

export interface VocabularyItem {
  id: string;
  hanzi: string;
  pinyin: string;
  meanings: string[]; // Vietnamese meanings
  partOfSpeech?: string; // e.g. "động từ", "danh từ", "tính từ"
  example?: {
    hanzi: string;
    pinyin: string;
    vietnamese: string;
  };
  hskLevel?: HskLevel;
  tags?: string[];
  status?: WordStatus;
  lastReviewed?: string;
  reviewCount?: number;
  difficultyScore?: number; // 0 to 5
}

export interface ReadingPassage {
  id?: string;
  title?: string;
  hanzi: string;
  pinyin?: string;
  translation: string; // Vietnamese translation
  paragraphs?: {
    hanzi: string;
    pinyin?: string;
    translation: string;
  }[];
}

export type QuestionType = "multiple_choice" | "fill_in_blank" | "tone_match" | "listening";

export interface PracticeQuestion {
  id: string;
  type: QuestionType;
  prompt: string;
  pinyinPrompt?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  level: HskLevel;
  source?: string; // e.g. "YouTube: Khẩu ngữ HSK 3 bài 12"
  durationMinutes: number;
  vocabulary: VocabularyItem[];
  reading?: ReadingPassage;
  questions?: PracticeQuestion[];
  createdAt: string;
  updatedAt: string;
  isCustomImport?: boolean;
}

export interface ImportLessonPayload {
  schemaVersion: string; // e.g. "1.0"
  title: string;
  description?: string;
  source?: string;
  level: HskLevel;
  durationMinutes?: number;
  vocabulary: {
    hanzi: string;
    pinyin: string;
    meanings: string[];
    partOfSpeech?: string;
    example?: {
      hanzi: string;
      pinyin: string;
      vietnamese: string;
    };
    tags?: string[];
  }[];
  reading?: {
    title?: string;
    hanzi: string;
    pinyin?: string;
    translation: string;
    paragraphs?: {
      hanzi: string;
      pinyin?: string;
      translation: string;
    }[];
  };
  questions?: {
    type?: QuestionType;
    prompt: string;
    pinyinPrompt?: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

export interface UserPreferences {
  preferredLevel: HskLevel;
  characterType: "simplified" | "traditional";
  pinyinVisibility: "always" | "hover" | "hidden";
  audioSpeed: number; // 0.75, 1.0, 1.25
  dailyGoalMinutes: number;
  soundEnabled: boolean;
  reducedMotion: boolean;
}

export interface StudySessionLog {
  id: string;
  date: string;
  skill: "listening" | "speaking" | "reading" | "writing" | "vocabulary" | "review";
  durationMinutes: number;
  itemsCompleted: number;
  accuracyRate?: number;
}

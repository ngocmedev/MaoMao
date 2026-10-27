import {
  VocabularyItem,
  Lesson,
  ImportLessonPayload,
  UserPreferences,
} from "@/types";
import { initialVocabulary } from "@/lib/mock-data/vocabulary";
import { initialLessons } from "@/lib/mock-data/lessons";

const VOCAB_STORAGE_KEY = "maomao_vocab_v1";
const LESSONS_STORAGE_KEY = "maomao_lessons_v1";
const PREFS_STORAGE_KEY = "maomao_prefs_v1";
const REVIEWS_STORAGE_KEY = "maomao_reviews_v1";

const defaultPreferences: UserPreferences = {
  preferredLevel: "HSK 2",
  characterType: "simplified",
  pinyinVisibility: "always",
  audioSpeed: 0.9,
  dailyGoalMinutes: 20,
  soundEnabled: true,
  reducedMotion: false,
};

function getStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.warn(`Could not read localStorage key: ${key}`, e);
    return fallback;
  }
}

function setStorage<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn(`Could not write localStorage key: ${key}`, e);
  }
}

/**
 * MaoMao Learning Service
 * Designed with service contracts that map 1:1 to future Supabase RPC & Table calls.
 */
export const learningService = {
  // --- VOCABULARY ---
  async getVocabulary(): Promise<VocabularyItem[]> {
    return getStorage<VocabularyItem[]>(VOCAB_STORAGE_KEY, initialVocabulary);
  },

  async getVocabularyById(id: string): Promise<VocabularyItem | null> {
    const list = await this.getVocabulary();
    return list.find((item) => item.id === id) || null;
  },

  async addVocabulary(item: Omit<VocabularyItem, "id">): Promise<VocabularyItem> {
    const list = await this.getVocabulary();
    const newItem: VocabularyItem = {
      ...item,
      id: `vocab-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      status: item.status || "new",
      reviewCount: 0,
      lastReviewed: new Date().toISOString(),
    };
    const updated = [newItem, ...list];
    setStorage(VOCAB_STORAGE_KEY, updated);
    return newItem;
  },

  async updateVocabulary(
    id: string,
    updates: Partial<VocabularyItem>
  ): Promise<VocabularyItem> {
    const list = await this.getVocabulary();
    const index = list.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error(`Không tìm thấy từ vựng với id: ${id}`);
    }
    const updatedItem = { ...list[index], ...updates };
    list[index] = updatedItem;
    setStorage(VOCAB_STORAGE_KEY, list);
    return updatedItem;
  },

  async deleteVocabulary(id: string): Promise<boolean> {
    const list = await this.getVocabulary();
    const filtered = list.filter((item) => item.id !== id);
    setStorage(VOCAB_STORAGE_KEY, filtered);
    return true;
  },

  // --- LESSONS ---
  async getLessons(): Promise<Lesson[]> {
    return getStorage<Lesson[]>(LESSONS_STORAGE_KEY, initialLessons);
  },

  async getLessonById(id: string): Promise<Lesson | null> {
    const list = await this.getLessons();
    return list.find((l) => l.id === id) || null;
  },

  async importLessonDemo(payload: ImportLessonPayload): Promise<Lesson> {
    const lessons = await this.getLessons();
    const currentVocab = await this.getVocabulary();

    const lessonId = `lesson-${Date.now()}`;
    const timestamp = new Date().toISOString();

    const mappedVocab: VocabularyItem[] = payload.vocabulary.map((v, idx) => ({
      id: `vocab-${lessonId}-${idx}`,
      hanzi: v.hanzi,
      pinyin: v.pinyin,
      meanings: v.meanings,
      partOfSpeech: v.partOfSpeech,
      example: v.example,
      hskLevel: payload.level,
      tags: v.tags || ["bài học mới"],
      status: "new",
      reviewCount: 0,
    }));

    const newLesson: Lesson = {
      id: lessonId,
      title: payload.title,
      description: payload.description || "Bài học nhập từ JSON Gemini",
      level: payload.level,
      source: payload.source || "Nhập từ dữ liệu JSON",
      durationMinutes: payload.durationMinutes || 15,
      createdAt: timestamp,
      updatedAt: timestamp,
      isCustomImport: true,
      vocabulary: mappedVocab,
      reading: payload.reading
        ? {
            id: `read-${lessonId}`,
            title: payload.reading.title || payload.title,
            hanzi: payload.reading.hanzi,
            pinyin: payload.reading.pinyin,
            translation: payload.reading.translation,
            paragraphs: payload.reading.paragraphs,
          }
        : undefined,
      questions: payload.questions?.map((q, idx) => ({
        id: `q-${lessonId}-${idx}`,
        type: q.type || "multiple_choice",
        prompt: q.prompt,
        pinyinPrompt: q.pinyinPrompt,
        options: q.options,
        correctIndex: q.correctIndex,
        explanation: q.explanation,
      })),
    };

    // Save lesson and append newly imported vocabulary items
    const updatedLessons = [newLesson, ...lessons];
    setStorage(LESSONS_STORAGE_KEY, updatedLessons);

    const mergedVocab = [...mappedVocab, ...currentVocab];
    setStorage(VOCAB_STORAGE_KEY, mergedVocab);

    return newLesson;
  },

  // --- REVIEW ---
  async getReviewItems(): Promise<VocabularyItem[]> {
    const vocab = await this.getVocabulary();
    // Prioritize words that are 'review', 'learning', or 'new'
    return vocab.filter(
      (item) => item.status === "review" || item.status === "learning" || item.status === "new"
    );
  },

  async recordReviewResult(
    wordId: string,
    quality: "hard" | "good" | "easy"
  ): Promise<void> {
    const vocab = await this.getVocabulary();
    const index = vocab.findIndex((w) => w.id === wordId);
    if (index === -1) return;

    const word = vocab[index];
    const currentReviews = word.reviewCount || 0;
    let nextStatus = word.status;

    if (quality === "easy") {
      nextStatus = currentReviews >= 3 ? "mastered" : "learning";
    } else if (quality === "good") {
      nextStatus = "learning";
    } else {
      nextStatus = "review";
    }

    vocab[index] = {
      ...word,
      status: nextStatus,
      reviewCount: currentReviews + 1,
      lastReviewed: new Date().toISOString(),
      difficultyScore: quality === "hard" ? 4 : quality === "good" ? 2 : 1,
    };

    setStorage(VOCAB_STORAGE_KEY, vocab);

    // Record review session item
    const pastReviews = getStorage<Record<string, unknown>[]>(REVIEWS_STORAGE_KEY, []);
    pastReviews.push({
      wordId,
      date: new Date().toISOString(),
      quality,
    });
    setStorage(REVIEWS_STORAGE_KEY, pastReviews);
  },

  // --- PROGRESS & STATS ---
  async getStudyStats() {
    const vocab = await this.getVocabulary();
    const lessons = await this.getLessons();

    const wordsTotal = vocab.length;
    const wordsMastered = vocab.filter((w) => w.status === "mastered").length;
    const wordsLearning = vocab.filter((w) => w.status === "learning").length;
    const wordsReview = vocab.filter((w) => w.status === "review" || w.status === "new").length;

    return {
      wordsTotal,
      wordsMastered,
      wordsLearning,
      wordsReview,
      lessonsCompleted: Math.min(lessons.length, 3), // demo completed
      lessonsTotal: lessons.length,
      streakDays: 5,
      weeklyActivity: [
        { day: "Th 2", count: 18 },
        { day: "Th 3", count: 24 },
        { day: "Th 4", count: 15 },
        { day: "Th 5", count: 32 },
        { day: "Th 6", count: 28 },
        { day: "Th 7", count: 40 },
        { day: "CN", count: 22 },
      ],
      skillSummary: [
        { skill: "Nghe (听力)", minutes: 45, level: "HSK 2" },
        { skill: "Nói (口语)", minutes: 30, level: "HSK 2" },
        { skill: "Đọc (阅读)", minutes: 60, level: "HSK 3" },
        { skill: "Viết (写作)", minutes: 25, level: "HSK 1" },
      ],
    };
  },

  // --- PREFERENCES ---
  async getUserPreferences(): Promise<UserPreferences> {
    return getStorage<UserPreferences>(PREFS_STORAGE_KEY, defaultPreferences);
  },

  async updateUserPreferences(
    prefs: Partial<UserPreferences>
  ): Promise<UserPreferences> {
    const current = await this.getUserPreferences();
    const updated = { ...current, ...prefs };
    setStorage(PREFS_STORAGE_KEY, updated);
    return updated;
  },

  // --- RESET DEMO ---
  async resetDemoData(): Promise<void> {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(VOCAB_STORAGE_KEY);
    window.localStorage.removeItem(LESSONS_STORAGE_KEY);
    window.localStorage.removeItem(PREFS_STORAGE_KEY);
    window.localStorage.removeItem(REVIEWS_STORAGE_KEY);
  },
};

"use client";

import React from "react";
import { AppShell } from "@/components/layout/AppShell";
import { FlashcardReview } from "@/components/review/FlashcardReview";

export default function ReviewPage() {
  return (
    <AppShell
      title="Ôn tập từ vựng"
      subtitle="Phương pháp Flashcard lặp lại ngắt quãng củng cố trí nhớ dài hạn"
    >
      <FlashcardReview />
    </AppShell>
  );
}

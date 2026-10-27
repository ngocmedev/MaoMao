"use client";

import React from "react";
import { Headphones, Mic, FileText, PenTool, Sparkles } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { SkillCard } from "@/components/practice/SkillCard";

export default function PracticeHubPage() {
  const skills = [
    {
      skill: "Luyện Nghe",
      hanzi: "听力",
      description:
        "Rèn luyện kỹ năng nghe hiểu tiếng Trung qua các mẫu câu hội thoại, phát âm chuẩn Bắc Kinh với tốc độ linh hoạt.",
      activity: "Nghe đoạn hội thoại và trả lời câu hỏi trắc nghiệm",
      countLabel: "3 bài luyện",
      href: "/practice/listening",
      icon: Headphones,
      gradient: "from-[#4F83F1] to-[#315FC7]",
      badgeBg: "bg-[#EAF4FF]",
      badgeText: "text-[#315FC7]",
    },
    {
      skill: "Luyện Nói",
      hanzi: "口语",
      description:
        "Tập nói lưu loát, chuẩn thanh điệu tiếng Hán với trình mô phỏng ghi âm và checklist tự đánh giá phát âm chi tiết.",
      activity: "Ghi âm phát âm câu mẫu và tự đánh giá thang điểm",
      countLabel: "3 mẫu câu",
      href: "/practice/speaking",
      icon: Mic,
      gradient: "from-[#8B5CF6] to-[#6B46C1]",
      badgeBg: "bg-[#EEE9FF]",
      badgeText: "text-[#6B46C1]",
    },
    {
      skill: "Luyện Đọc",
      hanzi: "阅读",
      description:
        "Đọc hiểu văn bản tiếng Trung với công nghệ tra cứu từ vựng tức thì: chạm vào bất kỳ từ nào để tra nghĩa và phiên âm.",
      activity: "Đọc đoạn văn tương tác và giải câu hỏi đọc hiểu",
      countLabel: "1 bài đọc tương tác",
      href: "/practice/reading",
      icon: FileText,
      gradient: "from-[#3DAA80] to-[#2B7A5B]",
      badgeBg: "bg-[#EAF8F2]",
      badgeText: "text-[#3DAA80]",
    },
    {
      skill: "Luyện Viết",
      hanzi: "写作",
      description:
        "Tập viết chữ Hán trên ô điền tự cảm ứng (田字格) và củng cố cấu trúc câu qua bài tập ghép từ ngữ pháp trực quan.",
      activity: "Viết nét trên bảng cảm ứng & ghép trật tự câu",
      countLabel: "4 chữ Hán + Câu đố",
      href: "/practice/writing",
      icon: PenTool,
      gradient: "from-[#E6A34A] to-[#B86E0E]",
      badgeBg: "bg-[#FDF5E9]",
      badgeText: "text-[#B86E0E]",
    },
  ];

  return (
    <AppShell
      title="Trung tâm luyện tập 4 kỹ năng"
      subtitle="Chọn kỹ năng bạn muốn trau dồi hôm nay để nâng cao phản xạ tiếng Trung"
    >
      <div className="space-y-6">
        <div className="glass-panel p-6 bg-gradient-to-r from-[#EAF4FF] via-white to-[#EEE9FF] border border-[#D0E4FF]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-white shadow-xs text-[#4F83F1]">
              <Sparkles className="w-6 h-6 text-[#B8A6F6]" />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-bold text-[#202A3B]">
                Phương pháp rèn luyện toàn diện
              </h2>
              <p className="text-xs md:text-sm text-[#778198]">
                Kết hợp đầy đủ 4 giác quan Nghe - Nói - Đọc - Viết để ghi nhớ chữ Hán và ngữ pháp sâu sắc hơn.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((skill) => (
            <SkillCard key={skill.skill} {...skill} />
          ))}
        </div>
      </div>
    </AppShell>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Sliders,
  RotateCcw,
  Save,
  Layers,
  LogOut,
  User as UserIcon,
  Check,
  Edit2,
  Flame,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { UserPreferences, HskLevel } from "@/types";
import { learningService } from "@/services/learning-service";
import { useAuth } from "@/components/auth/AuthContext";
import { useToast } from "@/components/ui/ToastContext";
import { LoadingState } from "@/components/ui/EmptyState";

export default function SettingsPage() {
  const router = useRouter();
  const { user, isAuthenticated, logout, updateUser } = useAuth();
  const { showToast } = useToast();
  const [prefs, setPrefs] = useState<UserPreferences | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    async function load() {
      const p = await learningService.getUserPreferences();
      setPrefs(p);
      setLoading(false);
    }
    load();
  }, []);

  const handleSaveName = async () => {
    if (!newName.trim()) return;
    await updateUser({ name: newName.trim() });
    setIsEditingName(false);
    showToast({
      type: "success",
      title: "Đã cập nhật tên!",
      message: `Tên hiển thị đã đổi thành "${newName.trim()}".`,
    });
  };

  const handleLogout = async () => {
    await logout();
    showToast({
      type: "info",
      title: "Đã đăng xuất",
      message: "Hẹn gặp lại bạn trong lần học tới!",
    });
    router.push("/login");
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prefs) return;
    setIsSaving(true);
    await learningService.updateUserPreferences(prefs);
    if (user && user.targetHsk !== prefs.preferredLevel) {
      await updateUser({ targetHsk: prefs.preferredLevel });
    }
    setIsSaving(false);
    showToast({
      type: "success",
      title: "Đã lưu cài đặt!",
      message: "Các tùy chọn học tập của bạn đã được cập nhật thành công.",
    });
  };

  const handleResetData = async () => {
    if (
      confirm(
        "Bạn có chắc muốn khôi phục dữ liệu demo ban đầu? Toàn bộ các bài học đã nhập và từ vựng mới sẽ được thiết lập lại mặc định."
      )
    ) {
      await learningService.resetDemoData();
      showToast({
        type: "info",
        title: "Đã đặt lại dữ liệu",
        message: "Ứng dụng sẽ tải lại với bộ dữ liệu chuẩn.",
      });
      setTimeout(() => {
        window.location.reload();
      }, 800);
    }
  };

  if (loading || !prefs) {
    return (
      <AppShell title="Cài đặt">
        <LoadingState message="Đang tải thiết lập..." />
      </AppShell>
    );
  }

  const getInitials = (name?: string) => {
    if (!name) return "MM";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <AppShell
      title="Cài đặt không gian học"
      subtitle="Tùy biến hiển thị chữ Hán, phiên âm Pinyin, âm thanh và hồ sơ cá nhân"
    >
      <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-300">
        {/* Dynamic User Profile Card */}
        {isAuthenticated && user ? (
          <div className="glass-panel p-6 border border-[#D0E4FF] flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#B8A6F6] to-[#4F83F1] flex items-center justify-center text-white text-lg font-bold shadow-md shadow-[#4F83F1]/20 shrink-0">
                {getInitials(user.name)}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  {isEditingName ? (
                    <div className="flex items-center gap-1.5">
                      <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="px-2.5 py-1 text-xs font-bold border border-[#4F83F1] rounded-lg bg-white focus:outline-none ring-2 ring-[#4F83F1]/20"
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={handleSaveName}
                        className="p-1.5 bg-[#4F83F1] text-white rounded-lg hover:bg-[#3D72E3]"
                        title="Lưu tên"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-base font-bold text-[#202A3B]">
                        {user.name}
                      </h3>
                      <button
                        type="button"
                        onClick={() => {
                          setNewName(user.name);
                          setIsEditingName(true);
                        }}
                        className="p-1 text-[#778198] hover:text-[#4F83F1] transition-colors"
                        title="Đổi tên hiển thị"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    </>
                  )}

                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EAF4FF] text-[#315FC7] border border-[#D0E4FF]">
                    {user.targetHsk}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs text-[#778198]">
                  <span>{user.email}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-[#E6A34A] font-semibold">
                    <Flame className="w-3.5 h-3.5 fill-[#E6A34A]" />
                    {user.streakDays} ngày chuỗi
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-[#E3EAF4]">
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#D95D67] hover:bg-[#FDEEF0] border border-[#F9C3C8]/50 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Đăng xuất</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="glass-panel p-6 border border-[#E3EAF4] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#EAF4FF] flex items-center justify-center text-[#4F83F1]">
                <UserIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#202A3B]">
                  Chưa đăng nhập tài khoản
                </h3>
                <p className="text-xs text-[#778198]">
                  Đăng nhập để đồng bộ tiến độ học và lưu trữ kết quả của riêng bạn.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-[#4F83F1] hover:bg-[#3D72E3] transition-colors"
              >
                Đăng nhập
              </Link>
              <Link
                href="/register"
                className="px-3.5 py-2 rounded-xl text-xs font-bold text-[#202A3B] bg-white border border-[#E3EAF4] hover:bg-[#F5F9FF] transition-colors"
              >
                Đăng ký
              </Link>
            </div>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          {/* SECTION 1: Cài đặt hiển thị tiếng Trung */}
          <div className="glass-card p-6 space-y-5">
            <h3 className="text-sm font-bold text-[#202A3B] flex items-center gap-2 pb-2 border-b border-[#E3EAF4]">
              <Layers className="w-4 h-4 text-[#4F83F1]" />
              Hiển thị văn bản tiếng Trung & Phiên âm
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Preferred Level */}
              <div>
                <label className="block text-xs font-semibold text-[#202A3B] mb-1.5">
                  Cấp độ HSK ưu tiên
                </label>
                <select
                  value={prefs.preferredLevel}
                  onChange={(e) =>
                    setPrefs({ ...prefs, preferredLevel: e.target.value as HskLevel })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-[#E3EAF4] bg-white text-xs text-[#202A3B] focus:outline-none focus:ring-2 focus:ring-[#4F83F1]/30"
                >
                  {["HSK 1", "HSK 2", "HSK 3", "HSK 4", "HSK 5", "HSK 6"].map(
                    (lvl) => (
                      <option key={lvl} value={lvl}>
                        {lvl}
                      </option>
                    )
                  )}
                </select>
                <span className="text-[11px] text-[#778198] mt-1 block">
                  Định hướng độ khó bài đọc và từ vựng gợi ý trên trang chủ.
                </span>
              </div>

              {/* Character Type: Simplified vs Traditional */}
              <div>
                <label className="block text-xs font-semibold text-[#202A3B] mb-1.5">
                  Bộ chữ Hán
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPrefs({ ...prefs, characterType: "simplified" })}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                      prefs.characterType === "simplified"
                        ? "bg-[#315FC7] text-white border-[#315FC7] shadow-xs"
                        : "bg-white text-[#778198] border-[#E3EAF4] hover:text-[#202A3B]"
                    }`}
                  >
                    Chữ Giản thể (简体)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPrefs({ ...prefs, characterType: "traditional" })}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                      prefs.characterType === "traditional"
                        ? "bg-[#315FC7] text-white border-[#315FC7] shadow-xs"
                        : "bg-white text-[#778198] border-[#E3EAF4] hover:text-[#202A3B]"
                    }`}
                  >
                    Chữ Phồn thể (繁體)
                  </button>
                </div>
              </div>
            </div>

            {/* Pinyin visibility mode */}
            <div className="pt-2">
              <label className="block text-xs font-semibold text-[#202A3B] mb-1.5">
                Chế độ hiển thị Pinyin
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "always", label: "Luôn hiển thị" },
                  { id: "hover", label: "Chỉ khi rê chuột" },
                  { id: "hidden", label: "Ẩn hoàn toàn" },
                ].map((mode) => (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() =>
                      setPrefs({
                        ...prefs,
                        pinyinVisibility: mode.id as "always" | "hover" | "hidden",
                      })
                    }
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                      prefs.pinyinVisibility === mode.id
                        ? "bg-[#4F83F1] text-white border-[#4F83F1] shadow-xs"
                        : "bg-white text-[#778198] border-[#E3EAF4] hover:text-[#202A3B]"
                    }`}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION 2: Âm thanh & Mục tiêu hàng ngày */}
          <div className="glass-card p-6 space-y-5">
            <h3 className="text-sm font-bold text-[#202A3B] flex items-center gap-2 pb-2 border-b border-[#E3EAF4]">
              <Sliders className="w-4 h-4 text-[#4F83F1]" />
              Âm thanh & Mục tiêu học tập
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Daily Goal Target */}
              <div>
                <label className="block text-xs font-semibold text-[#202A3B] mb-1.5">
                  Mục tiêu thời gian mỗi ngày (phút)
                </label>
                <div className="flex items-center gap-2">
                  {[10, 15, 20, 30].map((mins) => (
                    <button
                      key={mins}
                      type="button"
                      onClick={() => setPrefs({ ...prefs, dailyGoalMinutes: mins })}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                        prefs.dailyGoalMinutes === mins
                          ? "bg-[#3DAA80] text-white border-[#3DAA80] shadow-xs"
                          : "bg-white text-[#778198] border-[#E3EAF4] hover:text-[#202A3B]"
                      }`}
                    >
                      {mins}m
                    </button>
                  ))}
                </div>
              </div>

              {/* Audio Speed */}
              <div>
                <label className="block text-xs font-semibold text-[#202A3B] mb-1.5">
                  Tốc độ phát âm tiếng Trung
                </label>
                <div className="flex items-center gap-2">
                  {[0.75, 0.9, 1.0, 1.25].map((spd) => (
                    <button
                      key={spd}
                      type="button"
                      onClick={() => setPrefs({ ...prefs, audioSpeed: spd })}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                        prefs.audioSpeed === spd
                          ? "bg-[#4F83F1] text-white border-[#4F83F1] shadow-xs"
                          : "bg-white text-[#778198] border-[#E3EAF4] hover:text-[#202A3B]"
                      }`}
                    >
                      {spd}x
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Sound effects toggle */}
            <div className="flex items-center justify-between pt-2">
              <div>
                <span className="text-xs font-semibold text-[#202A3B] block">
                  Hiệu ứng âm thanh & chúc mừng
                </span>
                <span className="text-[11px] text-[#778198]">
                  Bật pháo hoa hoa giấy và âm thanh phản hồi khi hoàn thành phiên học.
                </span>
              </div>
              <input
                type="checkbox"
                checked={prefs.soundEnabled}
                onChange={(e) =>
                  setPrefs({ ...prefs, soundEnabled: e.target.checked })
                }
                className="w-4 h-4 text-[#4F83F1] rounded cursor-pointer"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={handleResetData}
              className="px-4 py-2.5 rounded-xl border border-[#D95D67]/40 text-[#D95D67] hover:bg-[#FDEEF0] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Khôi phục dữ liệu mẫu ban đầu</span>
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2.5 rounded-xl bg-[#4F83F1] hover:bg-[#3D72E3] text-white text-xs md:text-sm font-bold shadow-md shadow-[#4F83F1]/20 flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? "Đang lưu..." : "Lưu cài đặt"}</span>
            </button>
          </div>
        </form>
      </div>
    </AppShell>
  );
}

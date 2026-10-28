"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  Loader2,
  ArrowLeft,
  GraduationCap,
  Check,
} from "lucide-react";
import { MaoMaoLogo } from "@/components/ui/MaoMaoLogo";
import { useAuth } from "@/components/auth/AuthContext";
import { useToast } from "@/components/ui/ToastContext";
import { HskLevel } from "@/types";

const HSK_LEVELS: { level: HskLevel; label: string; desc: string }[] = [
  { level: "HSK 1", label: "HSK 1", desc: "Mới bắt đầu (150 từ)" },
  { level: "HSK 2", label: "HSK 2", desc: "Sơ cấp căn bản (300 từ)" },
  { level: "HSK 3", label: "HSK 3", desc: "Giao tiếp hằng ngày (600 từ)" },
  { level: "HSK 4", label: "HSK 4", desc: "Trung cấp đàm thoại (1200 từ)" },
  { level: "HSK 5", label: "HSK 5", desc: "Đọc báo & tin tức (2500 từ)" },
  { level: "HSK 6", label: "HSK 6", desc: "Thành thạo tự nhiên" },
];

export default function RegisterPage() {
  const router = useRouter();
  const { register, isLoading } = useAuth();
  const { showToast } = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedHsk, setSelectedHsk] = useState<HskLevel>("HSK 1");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!name.trim()) {
      setErrorMessage("Vui lòng nhập họ và tên của bạn.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setErrorMessage("Vui lòng nhập địa chỉ email hợp lệ.");
      return;
    }
    if (password.length < 6) {
      setErrorMessage("Mật khẩu phải có độ dài ít nhất 6 ký tự.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Mật khẩu xác nhận không trùng khớp.");
      return;
    }

    setIsSubmitting(true);
    const result = await register({
      name: name.trim(),
      email: email.trim(),
      password,
      targetHsk: selectedHsk,
    });
    setIsSubmitting(false);

    if (result.success) {
      // Trigger joyful celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // Safe fallback
      }

      showToast({
        type: "success",
        title: `Chào mừng ${name.trim()}! 🎉`,
        message: `Tài khoản đã tạo thành công với mục tiêu ${selectedHsk}. Chúc bạn học tốt mỗi ngày!`,
      });

      router.push("/dashboard");
    } else {
      setErrorMessage(result.error || "Đăng ký không thành công. Vui lòng thử lại.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F9FD] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background ambient orbs */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 rounded-full bg-[#EAF4FF] blur-3xl pointer-events-none opacity-80" />
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 rounded-full bg-[#EEE9FF] blur-3xl pointer-events-none opacity-80" />

      {/* Watermarks */}
      <div className="absolute top-12 right-12 text-8xl font-chinese font-black text-[#EAF4FF] select-none pointer-events-none hidden lg:block">
        进
      </div>
      <div className="absolute bottom-12 left-12 text-8xl font-chinese font-black text-[#EEE9FF] select-none pointer-events-none hidden lg:block">
        步
      </div>

      <div className="w-full max-w-lg my-8">
        {/* Top back link */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#778198] hover:text-[#315FC7] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Quay lại trang chủ</span>
          </Link>
        </div>

        {/* Main Card */}
        <div className="glass-panel p-8 shadow-xl border border-white/90 bg-white/85">
          {/* Header */}
          <div className="text-center space-y-2 mb-6">
            <div className="inline-flex items-center justify-center mb-1">
              <MaoMaoLogo />
            </div>
            <h1 className="text-2xl font-black text-[#202A3B] tracking-tight">
              Tạo tài khoản học mới
            </h1>
            <p className="text-xs sm:text-sm text-[#778198]">
              Bắt đầu lộ trình rèn luyện tiếng Trung chuẩn hoá và nhẹ nhàng
            </p>
          </div>

          {/* Error notification */}
          {errorMessage && (
            <div className="mb-5 p-3 rounded-xl bg-[#FDEEF0] border border-[#F9C3C8] text-[#D95D67] text-xs flex items-start gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-[#202A3B] mb-1.5">
                Họ và tên
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#778198]" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ví dụ: Nguyễn Văn An"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E3EAF4] rounded-xl text-xs md:text-sm text-[#202A3B] placeholder-[#9BA6BA] focus:outline-none focus:ring-2 focus:ring-[#4F83F1]/30 focus:border-[#4F83F1] transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-[#202A3B] mb-1.5">
                Địa chỉ Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#778198]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="vidu: ban@gmail.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E3EAF4] rounded-xl text-xs md:text-sm text-[#202A3B] placeholder-[#9BA6BA] focus:outline-none focus:ring-2 focus:ring-[#4F83F1]/30 focus:border-[#4F83F1] transition-all"
                />
              </div>
            </div>

            {/* Password & Confirm */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#202A3B] mb-1.5">
                  Mật khẩu
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#778198]" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Tối thiểu 6 ký tự"
                    className="w-full pl-10 pr-9 py-2.5 bg-white border border-[#E3EAF4] rounded-xl text-xs md:text-sm text-[#202A3B] placeholder-[#9BA6BA] focus:outline-none focus:ring-2 focus:ring-[#4F83F1]/30 focus:border-[#4F83F1] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#778198] hover:text-[#202A3B] p-1"
                  >
                    {showPassword ? (
                      <EyeOff className="w-3.5 h-3.5" />
                    ) : (
                      <Eye className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#202A3B] mb-1.5">
                  Xác nhận mật khẩu
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#778198]" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Nhập lại mật khẩu"
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E3EAF4] rounded-xl text-xs md:text-sm text-[#202A3B] placeholder-[#9BA6BA] focus:outline-none focus:ring-2 focus:ring-[#4F83F1]/30 focus:border-[#4F83F1] transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Target HSK level selector */}
            <div className="pt-2">
              <label className="block text-xs font-semibold text-[#202A3B] mb-1.5 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-[#4F83F1]" />
                  Mục tiêu cấp độ HSK ban đầu
                </span>
                <span className="text-[11px] text-[#778198]">
                  (Có thể đổi trong Cài đặt)
                </span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {HSK_LEVELS.map((item) => {
                  const isSelected = selectedHsk === item.level;
                  return (
                    <button
                      key={item.level}
                      type="button"
                      onClick={() => setSelectedHsk(item.level)}
                      className={`p-2.5 rounded-xl border text-left transition-all relative ${
                        isSelected
                          ? "bg-[#EAF4FF] border-[#4F83F1] text-[#315FC7] shadow-xs ring-1 ring-[#4F83F1]"
                          : "bg-white border-[#E3EAF4] text-[#202A3B] hover:bg-[#F5F9FF]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold">{item.label}</span>
                        {isSelected && (
                          <Check className="w-3.5 h-3.5 text-[#4F83F1]" />
                        )}
                      </div>
                      <p className="text-[10px] text-[#778198] mt-0.5 leading-tight">
                        {item.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Terms note */}
            <p className="text-[11px] text-[#9BA6BA] pt-1">
              Bằng cách đăng ký, bạn đồng ý với tiêu chí học tập tự chủ và bảo mật dữ liệu lưu trữ trên thiết bị cá nhân.
            </p>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting || isLoading}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#4F83F1] to-[#315FC7] hover:from-[#3D72E3] hover:to-[#264FA8] text-white text-xs md:text-sm font-bold shadow-md shadow-[#4F83F1]/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Đang khởi tạo tài khoản...</span>
                  </>
                ) : (
                  <>
                    <span>Tạo tài khoản & Bắt đầu học</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Footer switch to login */}
          <div className="mt-6 pt-5 border-t border-[#E3EAF4] text-center text-xs text-[#778198]">
            Bạn đã có tài khoản?{" "}
            <Link
              href="/login"
              className="font-bold text-[#4F83F1] hover:underline"
            >
              Đăng nhập ngay
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

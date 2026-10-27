# MaoMao (猫猫) — Học tiếng Trung, nhẹ nhàng mỗi ngày

> "Your little space for Chinese." Không gian học tiếng Trung hiện đại, tinh tế cho người học Việt Nam.

---

## 1. Giới thiệu tổng quan

**MaoMao** là ứng dụng web học tiếng Trung hiện đại, được thiết kế theo phong cách **Liquid Glass** (Apple-inspired) với các sắc thái xanh dịu (`#EAF4FF`, `#4F83F1`, `#315FC7`), ánh tím lavender (`#B8A6F6`) và bề mặt kính mờ trong suốt.

### Quy trình học cốt lõi (Workflow)
1. **Xem video học bên ngoài** (ví dụ: YouTube, Douyin, Bilibili).
2. **Sử dụng AI Gemini** để trích xuất cấu trúc bài học: từ vựng trọng tâm, phiên âm pinyin, nghĩa tiếng Việt, câu ví dụ, đoạn văn bài đọc và câu hỏi ôn tập.
3. **Nhập JSON vào MaoMao**: MaoMao tự động kiểm tra cú pháp và cấu trúc dữ liệu bằng Zod schema, hiển thị bản xem trước trực quan và lưu trữ vào kho bài học.
4. **Luyện tập 4 kỹ năng & Ôn tập Flashcard**: Rèn luyện Nghe (听力), Nói (口语), Đọc (阅读), Viết (写作) và ôn từ vựng theo phương pháp lặp lại ngắt quãng.

---

## 2. Công nghệ sử dụng

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Turbopack, Partial Prerendering)
- **UI & State**: React 19, TypeScript (Strict Mode)
- **Styling**: Tailwind CSS v4, Liquid Glass design tokens, font chữ tiếng Trung chuẩn (`PingFang SC`, `Microsoft YaHei`, `Noto Sans SC`)
- **Icon**: [Lucide React](https://lucide.dev/)
- **Xác thực dữ liệu**: [Zod](https://zod.dev/) cho import schema versioned (1.0 / 1.1)
- **Hiệu ứng & Âm thanh**: Web Speech API (`zh-CN`), `canvas-confetti`
- **Kiểm thử**: [Vitest](https://vitest.dev/) cho unit tests, ESLint 9

---

## 3. Cấu trúc thư mục dự án

```text
e:/Tirky/
├── src/
│   ├── app/
│   │   ├── (learning routes)/
│   │   ├── dashboard/page.tsx         # Trang tổng quan học tập
│   │   ├── vocabulary/
│   │   │   ├── page.tsx               # Sổ từ vựng (Tìm kiếm, lọc HSK, Grid/Table)
│   │   │   └── [wordId]/page.tsx      # Chi tiết từ vựng
│   │   ├── lessons/
│   │   │   ├── page.tsx               # Thư viện bài học
│   │   │   ├── import/page.tsx        # Nhập JSON từ Gemini & Xem trước
│   │   │   └── [lessonId]/page.tsx    # Chi tiết bài học (Bài đọc, từ vựng, bài tập)
│   │   ├── practice/
│   │   │   ├── page.tsx               # Trung tâm 4 kỹ năng
│   │   │   ├── listening/page.tsx     # Luyện Nghe (Audio player, câu hỏi nghe hiểu)
│   │   │   ├── speaking/page.tsx      # Luyện Nói (Ghi âm mô phỏng, checklist thanh điệu)
│   │   │   ├── reading/page.tsx       # Luyện Đọc (Chạm từ tra nghĩa tức thì)
│   │   │   └── writing/page.tsx       # Luyện Viết (Ô điền tự 田字格, ghép câu ngữ pháp)
│   │   ├── review/page.tsx            # Ôn tập Flashcard lật thẻ
│   │   ├── progress/page.tsx          # Báo cáo tiến độ & Biểu đồ hoạt động
│   │   ├── settings/page.tsx          # Cài đặt hiển thị Pinyin, cấp độ, bộ chữ
│   │   ├── globals.css                # Design system & CSS Variables Liquid Glass
│   │   ├── layout.tsx                 # Root layout & ToastProvider
│   │   └── page.tsx                   # Trang chào đón & Giới thiệu
│   ├── components/
│   │   ├── layout/                    # AppShell, Sidebar, AppHeader, MobileNav
│   │   ├── ui/                        # MaoMaoLogo, StatCard, EmptyState, Toast
│   │   ├── glass/                     # GlassPanel, Liquid Glass tokens
│   │   ├── vocabulary/                # VocabularyCard, DetailModal, FormModal
│   │   ├── lessons/                   # LessonCard
│   │   ├── import/                    # ImportView
│   │   ├── review/                    # FlashcardReview
│   │   └── practice/                  # Listening, Speaking, Reading, Writing views
│   ├── lib/
│   │   ├── mock-data/                 # Dữ liệu mẫu (Từ vựng, Bài học, Mẫu JSON Gemini)
│   │   ├── validations/               # Zod import schema & helper
│   │   └── utils.ts                   # cn(), speakChinese(), formatDateVi()
│   ├── services/
│   │   └── learning-service.ts        # Service interface chuẩn bị kết nối Supabase
│   └── types/
│       └── index.ts                   # Định nghĩa TypeScript Domain
├── tests/
│   └── import-validation.test.ts      # Automated unit tests cho schema validation
├── package.json
└── tsconfig.json
```

---

## 4. Hướng dẫn cài đặt và khởi chạy

### Cài đặt dependencies
```bash
npm install
```

### Chạy ứng dụng trong môi trường phát triển (Development)
```bash
npm run dev
```
Mở trình duyệt tại: **`http://localhost:3000`**

### Chạy kiểm thử tự động (Unit Tests)
```bash
npm test
```

### Kiểm tra cú pháp (Lint)
```bash
npm run lint
```

### Build bản đóng gói production
```bash
npm run build
```

---

## 5. Các tính năng nổi bật đã hoàn thành

1. **Brand Identity & Liquid Glass**:
   - Logo biểu tượng chú mèo tối giản kết hợp gradient xanh dương - tím hoa cà.
   - Thẻ và thanh điều hướng bán trong suốt với hiệu ứng `backdrop-blur` tinh tế.
2. **Quy trình nhập dữ liệu Gemini (`/lessons/import`)**:
   - Hỗ trợ dán trực tiếp mã JSON hoặc kéo thả tệp `.json`.
   - Nút **"Nạp mẫu JSON"** 1-click để trải nghiệm ngay mẫu bài học HSK 3.
   - Báo cáo lỗi chi tiết từng trường dữ liệu với đường dẫn rõ ràng (ví dụ: `questions.0.correctIndex`).
   - Xem trước theo 4 tab: Tổng quan, Từ vựng, Bài đọc kèm dịch đối chiếu, Câu hỏi trắc nghiệm.
3. **Ôn tập Flashcard thông minh (`/review`)**:
   - Lật thẻ 3D: Chữ Hán -> Pinyin, nghĩa tiếng Việt, câu ví dụ và âm thanh mẫu.
   - Đánh giá 3 mức: Khó (Cần ôn lại), Tạm ổn, Dễ (Đã thuộc).
   - Hiệu ứng pháo hoa hoa giấy ăn mừng (`canvas-confetti`) khi hoàn thành phiên học.
4. **Rèn luyện 4 kỹ năng (`/practice`)**:
   - **Nghe (`/practice/listening`)**: Nghe phát âm chuẩn Web Speech API, điều chỉnh tốc độ đọc (0.75x, 0.9x, 1x).
   - **Nói (`/practice/speaking`)**: Luyện khẩu ngữ với máy ghi âm mô phỏng, trực quan hóa sóng âm, checklist thanh điệu và thang đánh giá 5 sao.
   - **Đọc (`/practice/reading`)**: Bài đọc tương tác thông minh, chạm vào bất kỳ từ nào để tra nghĩa và pinyin tức thời; chuyển đổi chế độ Pinyin (Hiện / Ẩn / Rê chuột).
   - **Viết (`/practice/writing`)**: Bảng vẽ cảm ứng trên ô điền tự (田字格) có nét mờ hướng dẫn, bài tập ghép các thẻ từ theo đúng cấu trúc ngữ pháp câu.
5. **Tiến độ & Cài đặt (`/progress` & `/settings`)**:
   - Biểu đồ thời lượng học 7 ngày, thống kê mức độ cân bằng 4 kỹ năng.
   - Lưu trữ tùy chọn cá nhân hóa: Giản thể / Phồn thể, chế độ pinyin, mục tiêu học hàng ngày.

---

## 6. Lộ trình tích hợp Backend & Supabase tiếp theo

Kiến trúc tầng dịch vụ (`src/services/learning-service.ts`) được xây dựng theo mô hình Adapter pattern với các hàm `async/await` sẵn sàng chuyển đổi sang Supabase:

1. **Cấu hình Supabase Client**:
   - Thêm `NEXT_PUBLIC_SUPABASE_URL` và `NEXT_PUBLIC_SUPABASE_ANON_KEY` vào file `.env.local`.
2. **Bảng cơ sở dữ liệu tương ứng**:
   - `profiles`: Lưu thông tin học viên và `user_preferences`.
   - `lessons`: Lưu tiêu đề bài học, cấp độ HSK, thời lượng, bài đọc và câu hỏi.
   - `vocabulary`: Lưu `hanzi`, `pinyin`, `meanings[]`, `example`, `status`, `review_count`.
   - `reviews`: Ghi nhận lịch sử ôn tập (Spaced Repetition Algorithm / SM-2).
3. **Authentication**:
   - Kết nối Supabase Auth (Email / Google OAuth) thay thế cho Demo Profile hiện tại.

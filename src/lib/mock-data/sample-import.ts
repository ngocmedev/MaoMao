import { ImportLessonPayload } from "@/types";

export const sampleGeminiImportJson: ImportLessonPayload = {
  schemaVersion: "1.0",
  title: "Giao tiếp tại sân bay & du lịch (在机场与旅游)",
  description: "Trích xuất từ video hội thoại tiếng Trung thực tế: check-in vé máy bay, hỏi đường và hành lý.",
  source: "Gemini Prompt: Trích xuất từ vựng & bài đọc video tự học",
  level: "HSK 3",
  durationMinutes: 20,
  vocabulary: [
    {
      hanzi: "航班",
      pinyin: "hángbān",
      meanings: ["chuyến bay"],
      partOfSpeech: "danh từ",
      example: {
        hanzi: "请问飞往北京的航班几点起飞？",
        pinyin: "Qǐngwèn fēi wǎng Běijīng de hángbān jǐ diǎn qǐfēi?",
        vietnamese: "Xin hỏi chuyến bay đến Bắc Kinh cất cánh lúc mấy giờ?",
      },
      tags: ["sân bay", "du lịch"],
    },
    {
      hanzi: "护照",
      pinyin: "hùzhào",
      meanings: ["hộ chiếu"],
      partOfSpeech: "danh từ",
      example: {
        hanzi: "办理登机手续时请出示护照。",
        pinyin: "Bànlǐ dēngjī shǒuxù shí qǐng chūshì hùzhào.",
        vietnamese: "Khi làm thủ tục lên máy bay vui lòng xuất trình hộ chiếu.",
      },
      tags: ["giấy tờ", "sân bay"],
    },
    {
      hanzi: "行李",
      pinyin: "xíngli",
      meanings: ["hành lý"],
      partOfSpeech: "danh từ",
      example: {
        hanzi: "我的行李箱好像超重了。",
        pinyin: "Wǒ de xínglixiāng hǎoxiàng chāozhòng le.",
        vietnamese: "Va li hành lý của tôi hình như bị quá cân rồi.",
      },
      tags: ["du lịch"],
    },
    {
      hanzi: "准时",
      pinyin: "zhǔnshí",
      meanings: ["đúng giờ", "chuẩn giờ"],
      partOfSpeech: "tính từ",
      example: {
        hanzi: "飞机准时起飞了。",
        pinyin: "Fēijī zhǔnshí qǐfēi le.",
        vietnamese: "Máy bay đã cất cánh đúng giờ.",
      },
      tags: ["thời gian"],
    },
  ],
  reading: {
    title: "Trải nghiệm lần đầu đi máy bay một mình (第一次独自乘机)",
    hanzi: "今天是我第一次一个人去中国旅行。早上八点我就来到了首都国际机场。机场非常大，指示牌都很清楚。我拿着护照顺利办理了登机牌和行李托运。登机口的工作人员很热情，提醒我们准时登机。坐在靠窗的座位上，看着蓝天白云，我的心情特别激动。",
    pinyin: "Jīntiān shì wǒ dì-yī cì yí gè rén qù Zhōngguó lǚxíng. Zǎoshang bā diǎn wǒ jiù lái dào le shǒudū guójì jīchǎng. Jīchǎng fēicháng dà, zhǐshìpái dōu hěn qīngchu. Wǒ názhe hùzhào shùnlì bànlǐ le dēngjīpái hé xíngli tuōyùn. Dēngjīkǒu de gōngzuò rényuán hěn rèqíng, tíxǐng wǒmen zhǔnshí dēngjī. Zuò zài kào chuāng de zuòwèi shang, kànzhe lántiān báiyún, wǒ de xīnqíng tèbié jīdòng.",
    translation: "Hôm nay là lần đầu tiên tôi đi du lịch Trung Quốc một mình. Tám giờ sáng tôi đã đến sân bay quốc tế thủ đô. Sân bay rất rộng lớn, các biển chỉ dẫn đều rất rõ ràng. Tôi cầm hộ chiếu làm thủ tục thẻ lên máy bay và gửi hành lý một cách thuận lợi. Nhân viên tại cửa ra máy bay rất nhiệt tình, nhắc nhở chúng tôi lên máy bay đúng giờ. Ngồi ở vị trí cạnh cửa sổ, ngắm nhìn mây trắng trời xanh, tâm trạng tôi vô cùng xúc động.",
    paragraphs: [
      {
        hanzi: "今天是我第一次一个人去中国旅行。早上八点我就来到了首都国际机场。机场非常大，指示牌都很清楚。",
        pinyin: "Jīntiān shì wǒ dì-yī cì yí gè rén qù Zhōngguó lǚxíng. Zǎoshang bā diǎn wǒ jiù lái dào le shǒudū guójì jīchǎng. Jīchǎng fēicháng dà, zhǐshìpái dōu hěn qīngchu.",
        translation: "Hôm nay là lần đầu tiên tôi đi du lịch Trung Quốc một mình. Tám giờ sáng tôi đã đến sân bay quốc tế thủ đô. Sân bay rất rộng lớn, các biển chỉ dẫn đều rất rõ ràng.",
      },
      {
        hanzi: "我拿着护照顺利办理了登机牌和行李托运。登机口的工作人员很热情，提醒我们准时登机。",
        pinyin: "Wǒ názhe hùzhào shùnlì bànlǐ le dēngjīpái hé xíngli tuōyùn. Dēngjīkǒu de gōngzuò rényuán hěn rèqíng, tíxǐng wǒmen zhǔnshí dēngjī.",
        translation: "Tôi cầm hộ chiếu làm thủ tục thẻ lên máy bay và gửi hành lý một cách thuận lợi. Nhân viên tại cửa ra máy bay rất nhiệt tình, nhắc nhở chúng tôi lên máy bay đúng giờ.",
      },
      {
        hanzi: "坐在靠窗的座位上，看着蓝天白云，我的心情特别激动。",
        pinyin: "Zuò zài kào chuāng de zuòwèi shang, kànzhe lántiān báiyún, wǒ de xīnqíng tèbié jīdòng.",
        translation: "Ngồi ở vị trí cạnh cửa sổ, ngắm nhìn mây trắng trời xanh, tâm trạng tôi vô cùng xúc động.",
      },
    ],
  },
  questions: [
    {
      type: "multiple_choice",
      prompt: "Tác giả đến sân bay lúc mấy giờ?",
      options: ["7 giờ sáng", "8 giờ sáng", "9 giờ sáng", "10 giờ sáng"],
      correctIndex: 1,
      explanation: "Trong bài đọc có đoạn: '早上八点我就来到了首都国际机场' (Tám giờ sáng tôi đã đến sân bay).",
    },
    {
      type: "multiple_choice",
      prompt: "Khi làm thủ tục (办理登机牌), tác giả cần xuất trình giấy tờ gì?",
      options: ["Thẻ học sinh", "Bằng lái xe", "Hộ chiếu (护照)", "Sổ hộ khẩu"],
      correctIndex: 2,
      explanation: "Bài đọc nêu: '我拿着护照顺利办理了登机牌' (Tôi cầm hộ chiếu thuận lợi làm thẻ lên máy bay).",
    },
  ],
};

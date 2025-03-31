export interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
  multipleAnswers?: boolean;
  otherCorrectAnswer?: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    question: "Who said \"I love you\" first?",
    options: ["Dany", "Dian"],
    answer: "Dany"
  },
  {
    question: "When did we officially become a couple?",
    options: ["I don't know", "21 Maret 2018", "21 Maret 2017"],
    answer: "21 Maret 2017"
  },
  {
    question: "Where did I say \"I love you\" for the first time?",
    options: ["High School SMA N 1 Randublatung", "Bakso Eni 1", "Mie ayam dekat SPBU wulung"],
    answer: "Mie ayam dekat SPBU wulung"
  },
  {
    question: "How many times has Dany broken your heart?",
    options: ["1 time", "4 times", "A lot, but I love him so much"],
    answer: "A lot, but I love him so much"
  },
  {
    question: "How many times have you broken Dany's heart?",
    options: ["Gapernah wlee", "1 kali", "BANYAK BANGETT MAAF YA DANY *emot nangis"],
    answer: "BANYAK BANGETT MAAF YA DANY *emot nangis"
  },
  {
    question: "Dany lebih suka?",
    options: ["Boncengan", "Gandengan", "Melihat mata Dian", "Berpelukan"],
    answer: "Berpelukan"
  },
  {
    question: "Dian lebih suka?",
    options: ["Nonton Telegram", "Makan streetfood", "Beli Sepatu", "Jalan jalan"],
    answer: "Jalan jalan"
  },
  {
    question: "Apa yang pertama kali Dian kasih Dany?",
    options: ["Minyak Kayu Putih", "Contekan", "Wafer tango", "ASI"],
    answer: "Wafer tango"
  },
  {
    question: "Dany Favorite Part about Dian?",
    options: ["Nen", "Mata", "Apa aja", "Pipi"],
    answer: "Nen"
  },
  {
    question: "Dian favorite Dany body?",
    options: ["Tangan yang kemana mana", "Paha", "Mata", "Dada", "Isi sendiri"],
    answer: "Tangan yang kemana mana",
    multipleAnswers: true,
    otherCorrectAnswer: "Isi sendiri"
  }
];

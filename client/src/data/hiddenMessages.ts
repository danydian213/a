export interface HiddenMessage {
  title: string;
  message: string;
  icon: string;
  prompt: string;
}

export const hiddenMessages: HiddenMessage[] = [
  {
    title: "My Secret Message",
    message: "I fall in love with you more every day. Your smile is my favorite sight in the world.",
    icon: "fas fa-gift",
    prompt: "Click to reveal a sweet message"
  },
  {
    title: "A Special Memory",
    message: "Remember our first trip together? I knew then that I wanted to travel through life with you forever.",
    icon: "fas fa-star",
    prompt: "Click to reveal a special memory"
  },
  {
    title: "My Promise",
    message: "I promise to always be there for you, to love you unconditionally, and to build a beautiful life together.",
    icon: "fas fa-heart",
    prompt: "Click to reveal a loving thought"
  }
];

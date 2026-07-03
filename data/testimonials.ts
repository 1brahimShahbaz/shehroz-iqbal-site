export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  grade: string;
  avatar: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "Sir Shehroz completely changed my perspective on Accounting. What seemed like a jumble of theories suddenly clicked. His focus on exam technique was the reason I secured my A*.",
    name: "Sarah A.",
    grade: "A2 Level Accounting · A*",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "t2",
    quote:
      "The patience he shows when you're stuck on a concept is unmatched. He doesn't just give you the answer — he guides you to figure it out yourself. Highly recommended.",
    name: "Omar K.",
    grade: "AS Level Accounting · A",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "t3",
    quote:
      "The structured notes and constant testing prepared me perfectly. I went into the exam hall feeling confident, knowing I had practised every possible question type with Sir Shehroz.",
    name: "Ayesha M.",
    grade: "O Level Accounting · A*",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "t4",
    quote:
      "I joined two months before my A2 mocks and went from a C to an A. His past-paper drills are unmatched, and the WhatsApp doubt support is genuinely 24/7.",
    name: "Hassan R.",
    grade: "A2 Level Accounting · A",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
  },
];

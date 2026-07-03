export type Lecture = {
  id: string;
  level: "AS" | "A2" | "O";
  title: string;
  chapter: string;
  duration: string;
  thumbnail: string;
  videoUrl: string;
};

export const sampleLectures: Lecture[] = [
  {
    id: "as-elasticity",
    level: "AS",
    title: "Elasticity of Demand — Intuition First",
    chapter: "Chapter 4 · Microaccounting",
    duration: "12:34",
    thumbnail:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "a2-macro",
    level: "A2",
    title: "Macroeconomic Policy — A Real-World Walkthrough",
    chapter: "Chapter 6 · Macroaccounting",
    duration: "18:02",
    thumbnail:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "o-market-failure",
    level: "O",
    title: "Market Failure & Externalities",
    chapter: "Chapter 5 · The Economic Problem",
    duration: "09:48",
    thumbnail:
      "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
  },
];

export const lecturesByLevel: Record<"AS" | "A2" | "O", Lecture[]> = {
  AS: [
    {
      id: "as-1",
      level: "AS",
      title: "Elasticity Deep Dive",
      chapter: "Microaccounting · 14 min",
      duration: "14:10",
      thumbnail:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80",
      videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    },
    {
      id: "as-2",
      level: "AS",
      title: "Market Failure with Real Examples",
      chapter: "Microaccounting · 16 min",
      duration: "16:22",
      thumbnail:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
      videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    },
    {
      id: "as-3",
      level: "AS",
      title: "Macro Indicators Explained",
      chapter: "Macroaccounting · 11 min",
      duration: "11:30",
      thumbnail:
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80",
      videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    },
    {
      id: "as-4",
      level: "AS",
      title: "Exchange Rates — Past Paper Walkthrough",
      chapter: "Macroaccounting · 19 min",
      duration: "19:05",
      thumbnail:
        "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1200&q=80",
      videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    },
  ],
  A2: [
    {
      id: "a2-1",
      level: "A2",
      title: "Government Intervention — Welfare Effects",
      chapter: "Microaccounting · 18 min",
      duration: "18:30",
      thumbnail:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
      videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    },
    {
      id: "a2-2",
      level: "A2",
      title: "Monetary Policy — A2 Essay Approach",
      chapter: "Macroaccounting · 22 min",
      duration: "22:10",
      thumbnail:
        "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?auto=format&fit=crop&w=1200&q=80",
      videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    },
    {
      id: "a2-3",
      level: "A2",
      title: "International Trade & Balance of Payments",
      chapter: "Macroaccounting · 17 min",
      duration: "17:48",
      thumbnail:
        "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1200&q=80",
      videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    },
    {
      id: "a2-4",
      level: "A2",
      title: "Game Theory in Oligopoly Markets",
      chapter: "Microaccounting · 13 min",
      duration: "13:18",
      thumbnail:
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80",
      videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    },
  ],
  O: [
    {
      id: "o-1",
      level: "O",
      title: "Basic Economic Problem",
      chapter: "Chapter 1 · 10 min",
      duration: "10:00",
      thumbnail:
        "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&w=1200&q=80",
      videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    },
    {
      id: "o-2",
      level: "O",
      title: "Demand & Supply — Beginner's Guide",
      chapter: "Chapter 2 · 14 min",
      duration: "14:50",
      thumbnail:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
      videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    },
    {
      id: "o-3",
      level: "O",
      title: "Money, Banking & Trade",
      chapter: "Chapter 6 · 12 min",
      duration: "12:30",
      thumbnail:
        "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1200&q=80",
      videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    },
    {
      id: "o-4",
      level: "O",
      title: "Inflation & Unemployment",
      chapter: "Chapter 7 · 11 min",
      duration: "11:12",
      thumbnail:
        "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?auto=format&fit=crop&w=1200&q=80",
      videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    },
  ],
};

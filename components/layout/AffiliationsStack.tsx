"use client";

import Image from "next/image";
import Stack from "@/components/shared/Stack";
import { affiliations } from "@/data/affiliations";

export function AffiliationsStack() {
  const cards = affiliations.map((a) => (
    <div
      key={a.name}
      className="flex h-full w-full items-center justify-center bg-gradient-to-b from-white to-cream-50 px-5 py-6 ring-1 ring-navy-900/10 sm:px-6 sm:py-7"
    >
      <div className="relative h-full w-full min-h-[132px] max-h-[188px]">
        <Image
          src={a.logoSrc}
          alt={a.name}
          fill
          sizes="340px"
          className="object-contain object-center"
          style={{ transform: `scale(${a.scale ?? 1})` }}
        />
      </div>
    </div>
  ));

  return (
    <div className="relative h-[210px] w-[300px] shrink-0 select-none sm:h-[240px] sm:w-[340px]">
      <Stack
        cards={cards}
        randomRotation
        sensitivity={150}
        sendToBackOnClick
        autoplay
        autoplayDelay={2800}
        pauseOnHover
        animationConfig={{ stiffness: 260, damping: 22 }}
      />

    </div>
  );
}

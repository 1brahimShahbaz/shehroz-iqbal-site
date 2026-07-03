"use client";

import { BookOpen, GraduationCap } from "lucide-react";
import SpotlightCard from "@/components/shared/SpotlightCard";

const SPOTLIGHT_LIGHT = "rgba(220, 38, 38, 0.1)";

type PanelProps = {
  icon: typeof GraduationCap;
  title: string;
  items: string[];
};

function InfoPanel({ icon: Icon, title, items }: PanelProps) {
  return (
    <SpotlightCard
      spotlightColor={SPOTLIGHT_LIGHT}
      className="rounded-2xl border border-gray-200 bg-cream-50 p-6 sm:p-8"
    >
      <div className="flex items-center gap-3">
        <Icon className="h-6 w-6 text-navy-900" strokeWidth={1.75} />
        <h3 className="font-fraunces text-[20px] font-semibold text-navy-900">
          {title}
        </h3>
      </div>
      <ul className="mt-5 space-y-2.5">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-2.5 font-inter text-[14px] leading-relaxed text-gray-600"
          >
            <span
              aria-hidden
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500"
            />
            {item}
          </li>
        ))}
      </ul>
    </SpotlightCard>
  );
}

type Props = {
  qualifications: string[];
  offerings: string[];
};

export function AboutInfoPanels({ qualifications, offerings }: Props) {
  return (
    <div className="space-y-8">
      <InfoPanel
        icon={GraduationCap}
        title="Syllabi & topics"
        items={qualifications}
      />
      <InfoPanel
        icon={BookOpen}
        title="What you get as a student"
        items={offerings}
      />
    </div>
  );
}

"use client";

import { startTransition, useRef, useState } from "react";
import VariableProximity from "@/components/shared/VariableProximity";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimateSection } from "@/components/shared/AnimateSection";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { SyllabusGrid } from "@/components/courses/SyllabusGrid";
import { syllabusByLevel } from "@/data/syllabi";
import { cn } from "@/lib/utils";
import type { CourseLevel } from "@/data/courses";

const TABS: { id: CourseLevel; label: string; href: string }[] = [
  { id: "AS", label: "AS Level", href: "/courses/as-level-accounting-course" },
  { id: "A2", label: "A2 Level", href: "/courses/a2-level-accounting-course" },
  { id: "O", label: "O Level", href: "/courses/o-level-accounting-course" },
];

export function SampleLectures() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<CourseLevel>("AS");
  const activeTab = TABS.find((t) => t.id === active)!;

  return (
    <AnimateSection
      id="sample-lectures"
      index={1}
      className="bg-cream-50 py-20 lg:py-24"
    >
      <div ref={sectionRef} className="container-x relative">
        <SectionHeader
          eyebrow="Sample Lectures"
          title={
            <>
              Try a lecture{" "}
              <VariableProximity
                label="before you register."
                containerRef={sectionRef}
                radius={150}
                falloff="gaussian"
                fromFontVariationSettings="'wght' 500, 'opsz' 40"
                toFontVariationSettings="'wght' 800, 'opsz' 72"
                className="italic"
              />
            </>
          }
        />

        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => startTransition(() => setActive(tab.id))}
              className={cn(
                "rounded-full px-5 py-2 font-inter text-sm font-semibold transition-all duration-300 ease-smooth",
                active === tab.id
                  ? "bg-navy-900 text-white shadow-card-rest"
                  : "bg-white text-navy-900 ring-1 ring-gray-200 hover:bg-navy-900 hover:text-white"
              )}
              aria-pressed={active === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-4xl">
          <SyllabusGrid sections={syllabusByLevel[active]} />
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href={activeTab.href}
            className="inline-flex items-center gap-2 font-inter text-sm font-semibold text-navy-900 hover:text-navy-500"
          >
            View the full {activeTab.label} course
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </Link>
        </div>
      </div>
    </AnimateSection>
  );
}

"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { motion, AnimatePresence, useReducedMotion, type Transition } from "framer-motion";
import { cn } from "@/lib/utils";
import "./RotatingText.css";

export type RotatingTextHandle = {
  next: () => void;
  previous: () => void;
  jumpTo: (index: number) => void;
  reset: () => void;
};

type StaggerFrom = "first" | "last" | "center" | "random" | number;

type RotatingTextProps = {
  texts: string[];
  rotationInterval?: number;
  initial?: { y?: string | number; opacity?: number };
  animate?: { y?: string | number; opacity?: number };
  exit?: { y?: string | number; opacity?: number };
  animatePresenceMode?: "sync" | "wait" | "popLayout";
  animatePresenceInitial?: boolean;
  staggerDuration?: number;
  staggerFrom?: StaggerFrom;
  transition?: Transition;
  loop?: boolean;
  auto?: boolean;
  splitBy?: "characters" | "words" | "lines" | string;
  onNext?: (index: number) => void;
  mainClassName?: string;
  splitLevelClassName?: string;
  elementLevelClassName?: string;
  className?: string;
  /** Reserve height/width of the longest phrase to prevent layout shift. */
  stableLayout?: boolean;
  /** Override measured text when `stableLayout` is true (defaults to longest entry). */
  measureText?: string;
};

function splitIntoCharacters(text: string): string[] {
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
    return Array.from(segmenter.segment(text), (segment) => segment.segment);
  }
  return Array.from(text);
}

const RotatingText = forwardRef<RotatingTextHandle, RotatingTextProps>(
  function RotatingText(props, ref) {
    const {
      texts,
      transition = { type: "spring", damping: 30, stiffness: 400 },
      initial = { y: "100%", opacity: 0 },
      animate = { y: 0, opacity: 1 },
      exit = { y: "-120%", opacity: 0 },
      animatePresenceMode = "wait",
      animatePresenceInitial = false,
      rotationInterval = 2000,
      staggerDuration = 0.025,
      staggerFrom = "last",
      loop = true,
      auto = true,
      splitBy = "characters",
      onNext,
      mainClassName,
      splitLevelClassName,
      elementLevelClassName,
      className,
      stableLayout = false,
      measureText,
    } = props;

    const reduceMotion = useReducedMotion();
    const [currentTextIndex, setCurrentTextIndex] = useState(0);

    const elements = useMemo(() => {
      const currentText = texts[currentTextIndex] ?? "";
      if (splitBy === "characters") {
        const words = currentText.split(" ");
        return words.map((word, i) => ({
          characters: splitIntoCharacters(word),
          needsSpace: i !== words.length - 1,
        }));
      }
      if (splitBy === "words") {
        return currentText.split(" ").map((word, i, arr) => ({
          characters: [word],
          needsSpace: i !== arr.length - 1,
        }));
      }
      if (splitBy === "lines") {
        return currentText.split("\n").map((line, i, arr) => ({
          characters: [line],
          needsSpace: i !== arr.length - 1,
        }));
      }
      return currentText.split(splitBy).map((part, i, arr) => ({
        characters: [part],
        needsSpace: i !== arr.length - 1,
      }));
    }, [texts, currentTextIndex, splitBy]);

    const getStaggerDelay = useCallback(
      (index: number, totalChars: number) => {
        if (staggerFrom === "first") return index * staggerDuration;
        if (staggerFrom === "last") return (totalChars - 1 - index) * staggerDuration;
        if (staggerFrom === "center") {
          const center = Math.floor(totalChars / 2);
          return Math.abs(center - index) * staggerDuration;
        }
        if (staggerFrom === "random") {
          const randomIndex = Math.floor(Math.random() * totalChars);
          return Math.abs(randomIndex - index) * staggerDuration;
        }
        return Math.abs(staggerFrom - index) * staggerDuration;
      },
      [staggerFrom, staggerDuration]
    );

    const handleIndexChange = useCallback(
      (newIndex: number) => {
        setCurrentTextIndex(newIndex);
        onNext?.(newIndex);
      },
      [onNext]
    );

    const next = useCallback(() => {
      const nextIndex =
        currentTextIndex === texts.length - 1
          ? loop
            ? 0
            : currentTextIndex
          : currentTextIndex + 1;
      if (nextIndex !== currentTextIndex) handleIndexChange(nextIndex);
    }, [currentTextIndex, texts.length, loop, handleIndexChange]);

    const previous = useCallback(() => {
      const prevIndex =
        currentTextIndex === 0
          ? loop
            ? texts.length - 1
            : currentTextIndex
          : currentTextIndex - 1;
      if (prevIndex !== currentTextIndex) handleIndexChange(prevIndex);
    }, [currentTextIndex, texts.length, loop, handleIndexChange]);

    const jumpTo = useCallback(
      (index: number) => {
        const validIndex = Math.max(0, Math.min(index, texts.length - 1));
        if (validIndex !== currentTextIndex) handleIndexChange(validIndex);
      },
      [texts.length, currentTextIndex, handleIndexChange]
    );

    const reset = useCallback(() => {
      if (currentTextIndex !== 0) handleIndexChange(0);
    }, [currentTextIndex, handleIndexChange]);

    useImperativeHandle(ref, () => ({ next, previous, jumpTo, reset }), [
      next,
      previous,
      jumpTo,
      reset,
    ]);

    useEffect(() => {
      if (!auto || reduceMotion || texts.length <= 1) return;
      const intervalId = setInterval(next, rotationInterval);
      return () => clearInterval(intervalId);
    }, [next, rotationInterval, auto, reduceMotion, texts.length]);

    if (reduceMotion || texts.length <= 1) {
      return (
        <span className={cn("text-rotate", mainClassName, className)}>
          {texts[0]}
        </span>
      );
    }

    const totalChars = elements.reduce(
      (sum, word) => sum + word.characters.length,
      0
    );

    const layoutMeasureText = useMemo(
      () =>
        measureText ??
        texts.reduce(
          (longest, text) => (text.length > longest.length ? text : longest),
          ""
        ),
      [measureText, texts]
    );

    const animatedContent = (
      <>
        <span className="text-rotate-sr-only">{texts[currentTextIndex]}</span>
        <AnimatePresence mode={animatePresenceMode} initial={animatePresenceInitial}>
          <motion.span
            key={currentTextIndex}
            className={cn(
              splitBy === "lines" ? "text-rotate-lines" : "text-rotate"
            )}
            aria-hidden
          >
            {elements.map((wordObj, wordIndex, array) => {
              const previousCharsCount = array
                .slice(0, wordIndex)
                .reduce((sum, word) => sum + word.characters.length, 0);
              return (
                <span
                  key={wordIndex}
                  className={cn("text-rotate-word", splitLevelClassName)}
                >
                  {wordObj.characters.map((char, charIndex) => (
                    <motion.span
                      key={charIndex}
                      initial={initial}
                      animate={animate}
                      exit={exit}
                      transition={{
                        ...transition,
                        delay: getStaggerDelay(
                          previousCharsCount + charIndex,
                          totalChars
                        ),
                      }}
                      className={cn("text-rotate-element", elementLevelClassName)}
                    >
                      {char}
                    </motion.span>
                  ))}
                  {wordObj.needsSpace ? (
                    <span className="text-rotate-space"> </span>
                  ) : null}
                </span>
              );
            })}
          </motion.span>
        </AnimatePresence>
      </>
    );

    if (stableLayout) {
      return (
        <span
          className={cn(
            "text-rotate text-rotate-stable inline-grid align-top",
            mainClassName,
            className
          )}
        >
          <span
            className={cn(
              "text-rotate-measure invisible col-start-1 row-start-1",
              splitLevelClassName
            )}
            aria-hidden
          >
            {layoutMeasureText}
          </span>
          <span className="col-start-1 row-start-1">{animatedContent}</span>
        </span>
      );
    }

    return (
      <motion.span
        className={cn("text-rotate", mainClassName, className)}
      >
        {animatedContent}
      </motion.span>
    );
  }
);

export default RotatingText;

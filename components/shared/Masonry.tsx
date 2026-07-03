"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";
import "./Masonry.css";

export type MasonryItem = {
  id: string;
  img: string;
  url?: string;
  height: number;
  alt?: string;
};

type AnimateFrom =
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "center"
  | "random";

type Props = {
  items: MasonryItem[];
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: AnimateFrom;
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
  colorShiftOnHover?: boolean;
  className?: string;
  onItemClick?: (item: MasonryItem) => void;
};

function useMedia(queries: string[], values: number[], defaultValue: number) {
  const get = useCallback(
    () => values[queries.findIndex((q) => matchMedia(q).matches)] ?? defaultValue,
    [queries, values, defaultValue]
  );

  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(get());
    const handler = () => setValue(get());
    queries.forEach((q) => matchMedia(q).addEventListener("change", handler));
    return () =>
      queries.forEach((q) =>
        matchMedia(q).removeEventListener("change", handler)
      );
  }, [get, queries]);

  return value;
}

function useMeasure() {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return [ref, size] as const;
}

async function preloadImages(urls: string[]) {
  await Promise.all(
    urls.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = () => resolve();
          img.onerror = () => resolve();
        })
    )
  );
}

export default function Masonry({
  items,
  ease = "power3.out",
  duration = 0.6,
  stagger = 0.05,
  animateFrom = "bottom",
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false,
  className,
  onItemClick,
}: Props) {
  const reduceMotion = useReducedMotion();
  const columns = useMedia(
    [
      "(min-width:1500px)",
      "(min-width:1000px)",
      "(min-width:600px)",
      "(min-width:400px)",
    ],
    [5, 4, 3, 2],
    1
  );

  const [containerRef, { width }] = useMeasure();
  const [imagesReady, setImagesReady] = useState(false);
  const hasMounted = useRef(false);

  useEffect(() => {
    preloadImages(items.map((i) => i.img)).then(() => setImagesReady(true));
  }, [items]);

  const { grid, containerHeight } = useMemo(() => {
    if (!width) return { grid: [], containerHeight: 0 };

    const colHeights = new Array(columns).fill(0);
    const columnWidth = width / columns;

    const grid = items.map((child) => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = columnWidth * col;
      const height = child.height / 2;
      const y = colHeights[col];

      colHeights[col] += height;

      return { ...child, x, y, w: columnWidth, h: height };
    });

    return {
      grid,
      containerHeight: Math.max(...colHeights, 0),
    };
  }, [columns, items, width]);

  const getInitialPosition = useCallback(
    (item: { x: number; y: number; w: number; h: number }) => {
      const containerRect = containerRef.current?.getBoundingClientRect();
      if (!containerRect) return { x: item.x, y: item.y };

      let direction: AnimateFrom = animateFrom;
      if (animateFrom === "random") {
        const directions: AnimateFrom[] = ["top", "bottom", "left", "right"];
        direction =
          directions[Math.floor(Math.random() * directions.length)] ?? "bottom";
      }

      switch (direction) {
        case "top":
          return { x: item.x, y: -200 };
        case "bottom":
          return { x: item.x, y: window.innerHeight + 200 };
        case "left":
          return { x: -200, y: item.y };
        case "right":
          return { x: window.innerWidth + 200, y: item.y };
        case "center":
          return {
            x: containerRect.width / 2 - item.w / 2,
            y: containerRect.height / 2 - item.h / 2,
          };
        default:
          return { x: item.x, y: item.y + 100 };
      }
    },
    [animateFrom, containerRef]
  );

  useLayoutEffect(() => {
    if (!imagesReady || grid.length === 0) return;

    grid.forEach((item, index) => {
      const selector = `[data-masonry-key="${item.id}"]`;
      const animationProps = {
        x: item.x,
        y: item.y,
        width: item.w,
        height: item.h,
      };

      if (reduceMotion) {
        gsap.set(selector, { opacity: 1, ...animationProps, scale: 1, filter: "none" });
        return;
      }

      if (!hasMounted.current) {
        const initialPos = getInitialPosition(item);
        const initialState: gsap.TweenVars = {
          opacity: 0,
          x: initialPos.x,
          y: initialPos.y,
          width: item.w,
          height: item.h,
          ...(blurToFocus && { filter: "blur(10px)" }),
        };

        gsap.fromTo(
          selector,
          initialState,
          {
            opacity: 1,
            ...animationProps,
            ...(blurToFocus && { filter: "blur(0px)" }),
            duration: 0.8,
            ease: "power3.out",
            delay: index * stagger,
          }
        );
      } else {
        gsap.to(selector, {
          ...animationProps,
          duration,
          ease,
          overwrite: "auto",
        });
      }
    });

    hasMounted.current = true;
  }, [
    blurToFocus,
    duration,
    ease,
    getInitialPosition,
    grid,
    imagesReady,
    reduceMotion,
    stagger,
  ]);

  const handleMouseEnter = (item: MasonryItem) => {
    if (reduceMotion) return;
    const selector = `[data-masonry-key="${item.id}"]`;

    if (scaleOnHover) {
      gsap.to(selector, {
        scale: hoverScale,
        duration: 0.3,
        ease: "power2.out",
      });
    }

    if (colorShiftOnHover) {
      gsap.to(`${selector} .masonry-color-overlay`, {
        opacity: 0.3,
        duration: 0.3,
      });
    }
  };

  const handleMouseLeave = (item: MasonryItem) => {
    if (reduceMotion) return;
    const selector = `[data-masonry-key="${item.id}"]`;

    if (scaleOnHover) {
      gsap.to(selector, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }

    if (colorShiftOnHover) {
      gsap.to(`${selector} .masonry-color-overlay`, {
        opacity: 0,
        duration: 0.3,
      });
    }
  };

  const handleClick = (item: MasonryItem) => {
    if (onItemClick) {
      onItemClick(item);
      return;
    }
    if (item.url) {
      window.open(item.url, "_blank", "noopener,noreferrer");
    }
  };

  if (items.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className={cn("masonry-list", className)}
      style={{ height: containerHeight } as CSSProperties}
    >
      {grid.map((item) => (
        <div
          key={item.id}
          data-masonry-key={item.id}
          role="button"
          tabIndex={0}
          className="masonry-item-wrapper"
          onClick={() => handleClick(item)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleClick(item);
            }
          }}
          onMouseEnter={() => handleMouseEnter(item)}
          onMouseLeave={() => handleMouseLeave(item)}
          aria-label={item.alt ?? "Gallery photo"}
        >
          <div
            className="masonry-item-img"
            style={{ backgroundImage: `url(${item.img})` }}
          >
            {colorShiftOnHover ? (
              <div className="masonry-color-overlay" aria-hidden />
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}

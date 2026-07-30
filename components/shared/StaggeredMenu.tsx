"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";
import "./StaggeredMenu.css";

export type StaggeredMenuItem = {
  label: string;
  ariaLabel: string;
  link: string;
};

export type StaggeredMenuSocialItem = {
  label: string;
  link: string;
};

type Props = {
  position?: "left" | "right";
  colors?: string[];
  items?: StaggeredMenuItem[];
  socialItems?: StaggeredMenuSocialItem[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  className?: string;
  logoUrl?: string;
  hideLogo?: boolean;
  /** Use a clear hamburger / close icon instead of animated CSS lines */
  simpleToggleIcon?: boolean;
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  accentColor?: string;
  changeMenuColorOnOpen?: boolean;
  isFixed?: boolean;
  closeOnClickAway?: boolean;
  routePath?: string;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
};

function isInternalLink(link: string) {
  return link.startsWith("/") && !link.startsWith("//");
}

function MenuLink({
  item,
  className,
  dataIndex,
}: {
  item: StaggeredMenuItem;
  className: string;
  dataIndex: number;
}) {
  if (isInternalLink(item.link)) {
    return (
      <Link
        href={item.link}
        className={className}
        aria-label={item.ariaLabel}
        data-index={dataIndex}
      >
        <span className="sm-panel-itemLabel">{item.label}</span>
      </Link>
    );
  }

  return (
    <a
      href={item.link}
      className={className}
      aria-label={item.ariaLabel}
      data-index={dataIndex}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="sm-panel-itemLabel">{item.label}</span>
    </a>
  );
}

export default function StaggeredMenu({
  position = "right",
  colors = ["#12466E", "#DC2626"],
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  className,
  logoUrl = "/images/logo.webp",
  hideLogo = false,
  simpleToggleIcon = false,
  menuButtonColor = "#0A2740",
  openMenuButtonColor = "#fff",
  accentColor = "#DC2626",
  changeMenuColorOnOpen = true,
  isFixed = false,
  closeOnClickAway = true,
  routePath,
  onMenuOpen,
  onMenuClose,
}: Props) {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const panelRef = useRef<HTMLElement>(null);
  const preLayersRef = useRef<HTMLDivElement>(null);
  const preLayerElsRef = useRef<HTMLElement[]>([]);
  const plusHRef = useRef<HTMLSpanElement>(null);
  const plusVRef = useRef<HTMLSpanElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);
  const textInnerRef = useRef<HTMLSpanElement>(null);
  const [textLines, setTextLines] = useState(["Menu", "Close"]);

  const openTlRef = useRef<gsap.core.Timeline | null>(null);
  const closeTweenRef = useRef<gsap.core.Tween | null>(null);
  const spinTweenRef = useRef<gsap.core.Tween | null>(null);
  const textCycleAnimRef = useRef<gsap.core.Tween | null>(null);
  const colorTweenRef = useRef<gsap.core.Tween | null>(null);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);
  const busyRef = useRef(false);

  useLayoutEffect(() => {
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;
      const plusH = plusHRef.current;
      const plusV = plusVRef.current;
      const icon = iconRef.current;
      const textInner = textInnerRef.current;
      if (!panel || !textInner) return;
      if (!simpleToggleIcon && (!plusH || !plusV || !icon)) return;

      let preLayers: HTMLElement[] = [];
      if (preContainer) {
        preLayers = Array.from(
          preContainer.querySelectorAll<HTMLElement>(".sm-prelayer")
        );
      }
      preLayerElsRef.current = preLayers;

      const offscreen = position === "left" ? -100 : 100;
      gsap.set([panel, ...preLayers], { xPercent: offscreen, opacity: 1 });
      if (preContainer) {
        gsap.set(preContainer, { xPercent: 0, opacity: 1 });
      }
      if (!simpleToggleIcon && plusH && plusV && icon) {
        gsap.set(plusH, { transformOrigin: "50% 50%", rotate: 0 });
        gsap.set(plusV, { transformOrigin: "50% 50%", rotate: 90 });
        gsap.set(icon, { rotate: 0, transformOrigin: "50% 50%" });
      }
      gsap.set(textInner, { yPercent: 0 });
      if (toggleBtnRef.current && !simpleToggleIcon) {
        gsap.set(toggleBtnRef.current, { color: menuButtonColor });
      }
    });

    return () => ctx.revert();
  }, [menuButtonColor, position, reduceMotion, simpleToggleIcon]);

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    if (closeTweenRef.current) {
      closeTweenRef.current.kill();
      closeTweenRef.current = null;
    }

    const itemEls = Array.from(
      panel.querySelectorAll<HTMLElement>(".sm-panel-itemLabel")
    );
    const numberEls = Array.from(
      panel.querySelectorAll<HTMLElement>(
        ".sm-panel-list[data-numbering] .sm-panel-item"
      )
    );
    const socialTitle = panel.querySelector<HTMLElement>(".sm-socials-title");
    const socialLinks = Array.from(
      panel.querySelectorAll<HTMLElement>(".sm-socials-link")
    );

    const offscreen = position === "left" ? -100 : 100;
    const layerStates = layers.map((el) => ({ el, start: offscreen }));
    const panelStart = offscreen;

    if (itemEls.length) {
      gsap.set(itemEls, { yPercent: 140, rotate: 10 });
    }
    if (numberEls.length) {
      gsap.set(numberEls, { "--sm-num-opacity": 0 });
    }
    if (socialTitle) {
      gsap.set(socialTitle, { opacity: 0 });
    }
    if (socialLinks.length) {
      gsap.set(socialLinks, { y: 25, opacity: 0 });
    }

    const tl = gsap.timeline({ paused: true });

    layerStates.forEach((ls, i) => {
      tl.fromTo(
        ls.el,
        { xPercent: ls.start },
        { xPercent: 0, duration: 0.5, ease: "power4.out" },
        i * 0.07
      );
    });

    const lastTime = layerStates.length ? (layerStates.length - 1) * 0.07 : 0;
    const panelInsertTime = lastTime + (layerStates.length ? 0.08 : 0);
    const panelDuration = 0.65;

    tl.fromTo(
      panel,
      { xPercent: panelStart },
      { xPercent: 0, duration: panelDuration, ease: "power4.out" },
      panelInsertTime
    );

    if (itemEls.length) {
      const itemsStart = panelInsertTime + panelDuration * 0.15;
      tl.to(
        itemEls,
        {
          yPercent: 0,
          rotate: 0,
          duration: 1,
          ease: "power4.out",
          stagger: { each: 0.1, from: "start" },
        },
        itemsStart
      );
      if (numberEls.length) {
        tl.to(
          numberEls,
          {
            duration: 0.6,
            ease: "power2.out",
            "--sm-num-opacity": 1,
            stagger: { each: 0.08, from: "start" },
          },
          itemsStart + 0.1
        );
      }
    }

    if (socialTitle || socialLinks.length) {
      const socialsStart = panelInsertTime + panelDuration * 0.4;
      if (socialTitle) {
        tl.to(
          socialTitle,
          { opacity: 1, duration: 0.5, ease: "power2.out" },
          socialsStart
        );
      }
      if (socialLinks.length) {
        tl.to(
          socialLinks,
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: "power3.out",
            stagger: { each: 0.08, from: "start" },
            onComplete: () => {
              gsap.set(socialLinks, { clearProps: "opacity" });
            },
          },
          socialsStart + 0.04
        );
      }
    }

    openTlRef.current = tl;
    return tl;
  }, [position]);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;

    if (reduceMotion) {
      const panel = panelRef.current;
      const layers = preLayerElsRef.current;
      if (panel) {
        gsap.set([...layers, panel], { xPercent: 0, opacity: 1 });
        const itemEls = panel.querySelectorAll<HTMLElement>(".sm-panel-itemLabel");
        const numberEls = panel.querySelectorAll<HTMLElement>(
          ".sm-panel-list[data-numbering] .sm-panel-item"
        );
        gsap.set(itemEls, { yPercent: 0, rotate: 0 });
        gsap.set(numberEls, { "--sm-num-opacity": 1 });
        gsap.set(panel.querySelectorAll(".sm-socials-title, .sm-socials-link"), {
          opacity: 1,
          y: 0,
        });
      }
      busyRef.current = false;
      return;
    }

    const tl = buildOpenTimeline();
    if (tl) {
      tl.eventCallback("onComplete", () => {
        busyRef.current = false;
      });
      tl.play(0);
    } else {
      busyRef.current = false;
    }
  }, [buildOpenTimeline, reduceMotion]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    openTlRef.current = null;

    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return;

    const all = [...layers, panel];
    closeTweenRef.current?.kill();
    const offscreen = position === "left" ? -100 : 100;

    if (reduceMotion) {
      gsap.set(all, { xPercent: offscreen });
      busyRef.current = false;
      return;
    }

    closeTweenRef.current = gsap.to(all, {
      xPercent: offscreen,
      duration: 0.32,
      ease: "power3.in",
      overwrite: "auto",
      onComplete: () => {
        const itemEls = Array.from(
          panel.querySelectorAll<HTMLElement>(".sm-panel-itemLabel")
        );
        if (itemEls.length) {
          gsap.set(itemEls, { yPercent: 140, rotate: 10 });
        }
        const numberEls = Array.from(
          panel.querySelectorAll<HTMLElement>(
            ".sm-panel-list[data-numbering] .sm-panel-item"
          )
        );
        if (numberEls.length) {
          gsap.set(numberEls, { "--sm-num-opacity": 0 });
        }
        const socialTitle = panel.querySelector<HTMLElement>(".sm-socials-title");
        const socialLinks = Array.from(
          panel.querySelectorAll<HTMLElement>(".sm-socials-link")
        );
        if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
        if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });
        busyRef.current = false;
      },
    });
  }, [position, reduceMotion]);

  const animateIcon = useCallback(
    (opening: boolean) => {
      if (simpleToggleIcon) return;
      const icon = iconRef.current;
      if (!icon || reduceMotion) return;
      spinTweenRef.current?.kill();
      if (opening) {
        spinTweenRef.current = gsap.to(icon, {
          rotate: 225,
          duration: 0.8,
          ease: "power4.out",
          overwrite: "auto",
        });
      } else {
        spinTweenRef.current = gsap.to(icon, {
          rotate: 0,
          duration: 0.35,
          ease: "power3.inOut",
          overwrite: "auto",
        });
      }
    },
    [reduceMotion, simpleToggleIcon]
  );

  const animateColor = useCallback(
    (opening: boolean) => {
      if (simpleToggleIcon) return;
      const btn = toggleBtnRef.current;
      if (!btn || reduceMotion) return;
      colorTweenRef.current?.kill();
      if (changeMenuColorOnOpen) {
        const targetColor = opening ? openMenuButtonColor : menuButtonColor;
        colorTweenRef.current = gsap.to(btn, {
          color: targetColor,
          delay: 0.18,
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        gsap.set(btn, { color: menuButtonColor });
      }
    },
    [
      changeMenuColorOnOpen,
      menuButtonColor,
      openMenuButtonColor,
      reduceMotion,
      simpleToggleIcon,
    ]
  );

  const animateText = useCallback(
    (opening: boolean) => {
      if (simpleToggleIcon) return;
      const inner = textInnerRef.current;
      if (!inner || reduceMotion) return;
      textCycleAnimRef.current?.kill();

      const currentLabel = opening ? "Menu" : "Close";
      const targetLabel = opening ? "Close" : "Menu";
      const cycles = 3;
      const seq = [currentLabel];
      let last = currentLabel;
      for (let i = 0; i < cycles; i++) {
        last = last === "Menu" ? "Close" : "Menu";
        seq.push(last);
      }
      if (last !== targetLabel) seq.push(targetLabel);
      seq.push(targetLabel);
      setTextLines(seq);

      gsap.set(inner, { yPercent: 0 });
      const lineCount = seq.length;
      const finalShift = ((lineCount - 1) / lineCount) * 100;
      textCycleAnimRef.current = gsap.to(inner, {
        yPercent: -finalShift,
        duration: 0.5 + lineCount * 0.07,
        ease: "power4.out",
      });
    },
    [reduceMotion, simpleToggleIcon]
  );

  const closeMenu = useCallback(() => {
    if (openRef.current) {
      openRef.current = false;
      setOpen(false);
      onMenuClose?.();
      playClose();
      animateIcon(false);
      animateColor(false);
      animateText(false);
    }
  }, [animateColor, animateIcon, animateText, onMenuClose, playClose]);

  const toggleMenu = useCallback(() => {
    const target = !openRef.current;
    openRef.current = target;
    setOpen(target);
    if (target) {
      onMenuOpen?.();
      playOpen();
    } else {
      onMenuClose?.();
      playClose();
    }
    animateIcon(target);
    animateColor(target);
    animateText(target);
  }, [
    animateColor,
    animateIcon,
    animateText,
    onMenuClose,
    onMenuOpen,
    playClose,
    playOpen,
  ]);

  useEffect(() => {
    if (!toggleBtnRef.current || reduceMotion) return;
    if (changeMenuColorOnOpen) {
      const targetColor = openRef.current
        ? openMenuButtonColor
        : menuButtonColor;
      gsap.set(toggleBtnRef.current, { color: targetColor });
    } else {
      gsap.set(toggleBtnRef.current, { color: menuButtonColor });
    }
  }, [changeMenuColorOnOpen, menuButtonColor, openMenuButtonColor, reduceMotion]);

  useEffect(() => {
    if (routePath === undefined) return;
    closeMenu();
  }, [routePath, closeMenu]);

  useEffect(() => {
    if (!closeOnClickAway || !open) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        panelRef.current &&
        !panelRef.current.contains(target) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(target)
      ) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeOnClickAway, closeMenu, open]);

  const wrapperStyle = accentColor
    ? ({ ["--sm-accent" as string]: accentColor } as CSSProperties)
    : undefined;

  const prelayerColors = (() => {
    const raw = colors?.length ? colors.slice(0, 4) : ["#0A2740", "#12466E"];
    const arr = [...raw];
    if (arr.length >= 3) {
      const mid = Math.floor(arr.length / 2);
      arr.splice(mid, 1);
    }
    return arr;
  })();

  return (
    <div
      className={cn(
        "staggered-menu-wrapper",
        isFixed && "fixed-wrapper",
        className
      )}
      style={wrapperStyle}
      data-position={position}
      data-open={open || undefined}
    >
      <div ref={preLayersRef} className="sm-prelayers" aria-hidden="true">
        {prelayerColors.map((c, i) => (
          <div key={i} className="sm-prelayer" style={{ background: c }} />
        ))}
      </div>

      <header className="staggered-menu-header" aria-label="Mobile navigation">
        {!hideLogo ? (
          <div className="sm-logo" aria-label="Logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logoUrl}
              alt="Shehroz Iqbal"
              className="sm-logo-img"
              draggable={false}
              width={110}
              height={32}
            />
          </div>
        ) : (
          <span aria-hidden className="sm-logo" />
        )}
        <button
          ref={toggleBtnRef}
          className="sm-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="staggered-menu-panel"
          onClick={toggleMenu}
          type="button"
        >
          <span className="sm-toggle-textWrap" aria-hidden="true">
            <span ref={textInnerRef} className="sm-toggle-textInner">
              {textLines.map((l, i) => (
                <span className="sm-toggle-line" key={i}>
                  {l}
                </span>
              ))}
            </span>
          </span>
          <span ref={iconRef} className="sm-icon" aria-hidden="true">
            {simpleToggleIcon ? (
              open ? (
                <X className="h-5 w-5" strokeWidth={2} />
              ) : (
                <Menu className="h-5 w-5" strokeWidth={2} />
              )
            ) : (
              <>
                <span ref={plusHRef} className="sm-icon-line" />
                <span
                  ref={plusVRef}
                  className="sm-icon-line sm-icon-line-v"
                />
              </>
            )}
          </span>
        </button>
      </header>

      <aside
        id="staggered-menu-panel"
        ref={panelRef}
        className="staggered-menu-panel"
        aria-hidden={!open}
      >
        <div className="sm-panel-inner">
          <ul
            className="sm-panel-list"
            role="list"
            data-numbering={displayItemNumbering || undefined}
          >
            {items.length ? (
              items.map((it, idx) => (
                <li className="sm-panel-itemWrap" key={`${it.label}-${idx}`}>
                  <MenuLink
                    item={it}
                    className="sm-panel-item"
                    dataIndex={idx + 1}
                  />
                </li>
              ))
            ) : (
              <li className="sm-panel-itemWrap" aria-hidden="true">
                <span className="sm-panel-item">
                  <span className="sm-panel-itemLabel">No items</span>
                </span>
              </li>
            )}
          </ul>

          {displaySocials && socialItems.length > 0 ? (
            <div className="sm-socials" aria-label="Social links">
              <p className="sm-socials-title">Connect</p>
              <ul className="sm-socials-list" role="list">
                {socialItems.map((s, i) => (
                  <li key={`${s.label}-${i}`} className="sm-socials-item">
                    <a
                      href={s.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sm-socials-link"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </aside>
    </div>
  );
}

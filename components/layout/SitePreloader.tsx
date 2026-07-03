"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const MANIFEST_SCRIPT_ID = "zm-preload-manifest";

/** Keep the loader on screen at least this long so it never flashes. */
const MIN_VISIBLE_MS = 900;
/** Safety cap — only used if an asset hangs. */
const MAX_VISIBLE_MS = 20000;

function readManifest(): { images: string[]; videos: string[] } {
  if (typeof document === "undefined") {
    return { images: [], videos: [] };
  }
  const el = document.getElementById(MANIFEST_SCRIPT_ID);
  if (!el?.textContent) return { images: [], videos: [] };
  try {
    const parsed = JSON.parse(el.textContent) as {
      images?: string[];
      videos?: string[];
    };
    return {
      images: parsed.images ?? [],
      videos: parsed.videos ?? [],
    };
  } catch {
    return { images: [], videos: [] };
  }
}

function preloadImage(src: string) {
  return new Promise<void>((resolve) => {
    const img = new Image();
    const finish = () => resolve();
    img.onload = finish;
    img.onerror = finish;
    img.src = src;
    if (img.complete) finish();
  });
}

function preloadVideo(src: string, timeoutMs = 12000) {
  return new Promise<void>((resolve) => {
    const video = document.createElement("video");
    video.preload = "auto";
    video.muted = true;
    video.playsInline = true;

    const finish = () => {
      window.clearTimeout(timer);
      video.removeAttribute("src");
      video.load();
      resolve();
    };

    const timer = window.setTimeout(finish, timeoutMs);
    video.onloadeddata = finish;
    video.onerror = finish;
    video.src = src;
  });
}

function waitForFonts() {
  if (typeof document === "undefined" || !document.fonts?.ready) {
    return Promise.resolve();
  }
  return document.fonts.ready.catch(() => undefined);
}

export function SitePreloader() {
  const [hidden, setHidden] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const start =
      typeof performance !== "undefined" ? performance.now() : Date.now();
    let done = false;

    const manifest = readManifest();
    const domSrcs = Array.from(document.images)
      .map((img) => img.currentSrc || img.src)
      .filter(Boolean);
    const imageSources = Array.from(
      new Set([...manifest.images, ...domSrcs])
    );

    const imagesReady = Promise.allSettled(imageSources.map(preloadImage));
    const videosReady = Promise.allSettled(
      manifest.videos.map((src) => preloadVideo(src))
    );
    const fontsReady = waitForFonts();

    const windowLoaded = new Promise<void>((resolve) => {
      if (document.readyState === "complete") resolve();
      else window.addEventListener("load", () => resolve(), { once: true });
    });

    const finish = () => {
      if (done) return;
      done = true;
      const elapsed =
        (typeof performance !== "undefined" ? performance.now() : Date.now()) -
        start;
      const wait = Math.max(0, MIN_VISIBLE_MS - elapsed);
      window.setTimeout(() => {
        setHidden(true);
        window.setTimeout(() => setRemoved(true), 600);
      }, wait);
    };

    Promise.all([imagesReady, videosReady, fontsReady, windowLoaded]).then(
      finish
    );
    const maxTimer = window.setTimeout(finish, MAX_VISIBLE_MS);

    return () => window.clearTimeout(maxTimer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (hidden) document.body.style.overflow = "";
  }, [hidden]);

  if (removed) return null;

  return (
    <div
      className={cn("zm-preloader", hidden && "zm-preloader--hidden")}
      role="status"
      aria-live="polite"
      aria-label="Loading"
      aria-hidden={hidden}
    >
      <div className="zm-preloader__stage">
        <div className="zm-preloader__logo-wrap">
          <span aria-hidden className="zm-preloader__halo" />
          <div className="zm-preloader__logo">
            <span className="zm-preloader__base" />
            <span className="zm-preloader__fill" />
          </div>
        </div>
        <span className="zm-preloader__bar">
          <i />
        </span>
        <span className="zm-preloader__label">Shehroz Iqbal · Accounting</span>
      </div>
    </div>
  );
}

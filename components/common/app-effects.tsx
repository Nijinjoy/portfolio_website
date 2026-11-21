"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ScrollToTop } from "@/components/common/scroll-to-top";
import { siteConfig } from "@/constants/site";
import { useLenis } from "@/hooks/use-lenis";

export function AppEffects() {
  const [progress, setProgress] = useState(0);

  useLenis();

  useEffect(() => {
    const onScroll = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? (window.scrollY / height) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <Preloader />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[80] h-px bg-white"
        style={{ width: `${progress}%` }}
      />
      <ScrollToTop />
    </>
  );
}

/** Full-screen 0–100% counter shown on first load, then slid away. */
function Preloader() {
  const [percent, setPercent] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true);
      return;
    }
    let frame = 0;
    let timeout = 0;
    const start = performance.now();
    const duration = 1100;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setPercent(Math.round((1 - Math.pow(1 - t, 2)) * 100));
      if (t < 1) frame = requestAnimationFrame(tick);
      else timeout = window.setTimeout(() => setDone(true), 200);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {!done ? (
        <motion.div
          id="preloader"
          key="preloader"
          aria-hidden="true"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-black px-[5%] py-8 text-white"
        >
          <div className="mono-label flex justify-between">
            <span>{siteConfig.name}</span>
            <span>Portfolio</span>
          </div>
          <div>
            <div className="flex items-end justify-between gap-4">
              <span className="mono-label pb-3">Loading</span>
              <span className="font-display text-[30vw] leading-[0.8] tabular-nums sm:text-[20vw]">{percent}%</span>
            </div>
            <div className="mt-6 h-px w-full bg-white/10">
              <div className="h-full bg-white" style={{ width: `${percent}%` }} />
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

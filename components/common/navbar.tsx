"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navItems, siteConfig } from "@/constants/site";
import { cn, pad } from "@/lib/utils";

const firstName = siteConfig.name.split(" ")[0];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      // The active link is the last section whose top has passed 45% of the viewport.
      let current = "#home";
      for (const item of navItems) {
        const section = document.querySelector(item.href);
        if (section && section.getBoundingClientRect().top <= window.innerHeight * 0.45) current = item.href;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav
        aria-label="Main navigation"
        className={cn(
          "flex w-full max-w-5xl items-center justify-between rounded-full border px-3 py-2 transition-all duration-500 md:px-4",
          scrolled ? "border-white/15 bg-black/60 backdrop-blur-md" : "border-white/10 bg-black/20 backdrop-blur-sm",
        )}
      >
        <a href="#home" className="focus-ring rounded-full px-3 font-display text-xl tracking-wide">
          {firstName}
          <span className="text-white/30">.</span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const isActive = active === item.href;
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "focus-ring relative isolate block rounded-full px-4 py-2 text-sm transition-colors duration-300",
                    isActive ? "text-white" : "text-white/55 hover:text-white",
                  )}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full border border-white/10 bg-white/[0.06]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  ) : null}
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="focus-ring hidden rounded-full bg-white px-5 py-2 text-sm font-medium text-black transition-shadow duration-300 hover:shadow-[0_0_25px_rgba(255,255,255,0.25)] lg:inline-flex"
          >
            Let&apos;s talk
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="focus-ring grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 transition-colors hover:bg-white/10 lg:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-x-4 top-[4.25rem] rounded-3xl border border-white/10 bg-black/90 p-3 backdrop-blur-xl lg:hidden"
          >
            <ul>
              {navItems.map((item, index) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 rounded-2xl px-4 py-3 transition-colors hover:bg-white/5"
                  >
                    <span className="font-mono text-xs text-white/35">{pad(index + 1)}</span>
                    <span className="font-display text-2xl uppercase">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 flex justify-center rounded-full bg-white px-5 py-3 text-sm font-medium text-black"
            >
              Let&apos;s talk
            </a>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/constants/site";
import { typingRoles } from "@/data/portfolio";
import { useTyping } from "@/hooks/use-typing";

const ease = [0.22, 1, 0.36, 1] as const;
// Hero animations start as the preloader finishes.
const intro = 1.1;

export function HeroSection() {
  const typed = useTyping(typingRoles);
  const [first, ...rest] = siteConfig.name.toUpperCase().split(" ");
  const lines = [first, rest.join(" ")].filter(Boolean);

  return (
    <section id="home" className="relative isolate flex min-h-svh flex-col overflow-hidden bg-black text-white">
      <div
        aria-hidden="true"
        className="absolute right-[2%] top-[8%] hidden size-[560px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.10),rgba(255,255,255,0.03)_45%,transparent_70%)] blur-3xl lg:block"
      />
      <div className="relative z-30 flex justify-center px-5 pt-28 sm:pt-32 lg:absolute lg:right-[7%] lg:top-[15%] lg:p-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: "blur(12px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: intro + 0.3, ease }}
          className="relative"
        >
          <span aria-hidden="true" className="absolute -inset-3 rounded-full border border-white/15" />
          <Image
            src="/images/nijin-joy.jpeg"
            alt={`Portrait of ${siteConfig.name}`}
            width={1254}
            height={1254}
            priority
            sizes="(max-width: 640px) 224px, (max-width: 1024px) 288px, 352px"
            className="aspect-square w-56 rounded-full object-cover sm:w-72 lg:w-[22rem]"
          />
        </motion.div>
      </div>

      <div className="relative mt-auto px-[3.5%] pb-8 pt-10 sm:pb-10">
        <div className="relative z-10 isolate">
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: intro, ease }}
            className="font-display text-lg uppercase tracking-wide sm:text-2xl lg:text-3xl"
          >
            Welcome to my portfolio
          </motion.p>
          <h1 aria-label={siteConfig.name} className="font-display uppercase leading-[0.88] tracking-[-0.015em]">
            {lines.map((line, index) => (
              <span key={line} aria-hidden="true" className="block overflow-hidden">
                <motion.span
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1, delay: intro + 0.1 + index * 0.12, ease }}
                  className="block text-[26vw] sm:text-[21vw] lg:text-[16vw]"
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
          <HeroStripes />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: intro + 0.5, ease }}
          className="relative z-30 mt-8 flex flex-col gap-6 border-t border-white/15 pt-6 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-xl">
            <p className="mono-label">Now building as</p>
            <p className="mt-2 min-h-6 font-mono text-sm text-white sm:text-base">&gt; {typed}</p>
            <p className="mt-4 text-sm leading-7 text-white/60 sm:text-base">{siteConfig.summary}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button asChild>
              <a href="#contact">
                Let&apos;s talk
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="secondary">
              <a href={siteConfig.resumeUrl} download>
                <Download className="h-4 w-4" />
                Download resume
              </a>
            </Button>
            <a href="#about" className="mono-label ml-2 hidden items-center gap-2 transition-colors hover:text-white lg:inline-flex">
              Scroll
              <ArrowDownRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/** Thin drifting bands that invert the name wherever they cross it. */
function HeroStripes() {
  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, delay: intro + 0.9 }}
      className="pointer-events-none absolute inset-0 mix-blend-difference"
    >
      <div className="absolute inset-x-[-10%] top-[52%] -rotate-[5deg]">
        <div className="hero-drift">
          <div className="h-[clamp(10px,2.2vw,34px)] bg-white" />
          <div className="mt-[clamp(6px,1vw,14px)] h-[clamp(3px,0.5vw,8px)] bg-white" />
          <div className="mt-[clamp(4px,0.6vw,10px)] h-px bg-white" />
        </div>
      </div>
    </motion.div>
  );
}

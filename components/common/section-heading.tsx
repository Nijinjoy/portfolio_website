import type { ReactNode } from "react";
import { Reveal } from "@/components/common/reveal";

type SectionHeadingProps = {
  index: string;
  label: string;
  title: string;
  subtitle?: string;
  description?: string;
  aside?: ReactNode;
};

export function SectionHeading({ index, label, title, subtitle, description, aside }: SectionHeadingProps) {
  return (
    <div className="mb-14 grid gap-8 lg:mb-20 lg:grid-cols-[1fr_auto] lg:items-end">
      <div>
        <p className="mono-label mb-6">
          <span className="text-white">{index}</span>
          <span className="mx-2 text-white/25">/</span>
          {label}
        </p>
        <Reveal>
          <h2 className="display-title text-[15vw] sm:text-7xl lg:text-8xl xl:text-9xl">
            {title}
            <span className="text-white/25">.</span>
            {subtitle ? <span className="block text-white/25">{subtitle}.</span> : null}
          </h2>
        </Reveal>
        {description ? (
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-xl text-base leading-8 text-white/60 sm:text-lg">{description}</p>
          </Reveal>
        ) : null}
      </div>
      {aside ? (
        <Reveal delay={0.15} className="lg:text-right">
          {aside}
        </Reveal>
      ) : null}
    </div>
  );
}

export function SectionStat({ value, label }: { value: string; label: string }) {
  return (
    <>
      <p className="font-display text-6xl leading-none sm:text-7xl">{value}</p>
      <p className="mono-label mt-3">{label}</p>
    </>
  );
}

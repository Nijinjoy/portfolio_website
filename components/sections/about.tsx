import Image from "next/image";
import { Download } from "lucide-react";
import { Counter } from "@/components/common/counter";
import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/constants/site";
import { stats } from "@/data/portfolio";
import { pad } from "@/lib/utils";

const strengths = [
  "React Native expertise",
  "Flutter expertise",
  "React.js expertise",
  "Clean architecture",
  "Mobile performance optimization",
  "Reusable components",
  "API integration",
  "Firebase",
  "Redux Toolkit",
  "TypeScript",
  "Team collaboration",
  "Agile development",
  "ERP solutions",
  "HRMS applications",
];

export function AboutSection() {
  return (
    <section id="about" className="relative border-t border-white/10 bg-[#080808] py-24 md:py-32">
      <div className="container-premium">
        <SectionHeading index="02" label="About" title="Who I am" />

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="text-lg leading-[1.9] text-white/75 md:text-xl">
              I&apos;m {siteConfig.name}, a developer with 4+ years of experience in React Native, React.js,
              Next.js, and Flutter. I build fast, scalable mobile apps and web solutions with clean, maintainable
              code.
            </p>
            <p className="mt-6 text-base leading-[1.9] text-white/55 md:text-lg">
              From startup MVPs to enterprise-scale platforms, I turn ideas into polished, production-ready apps
              that people actually enjoy using.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Button asChild>
                <a href={siteConfig.resumeUrl} download>
                  <Download className="h-4 w-4" />
                  Download resume
                </a>
              </Button>
              <p className="mono-label leading-5">
                Curriculum vitae
                <br />
                <span className="text-white/30">PDF document</span>
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <article className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] p-7 sm:p-10">
              <div className="mono-label flex items-center justify-between">
                <span>Profile / 001</span>
                <span>02 / 07</span>
              </div>
              <div className="mt-10 flex items-center gap-5">
                <Image
                  src="/images/nijin-joy.jpeg"
                  alt=""
                  width={160}
                  height={160}
                  className="h-20 w-20 shrink-0 rounded-full object-cover"
                />
                <div>
                  <p className="mono-label">The developer</p>
                  <p className="mt-1 font-display text-4xl uppercase leading-none sm:text-5xl">{siteConfig.name}</p>
                </div>
              </div>
              <p className="mt-6 font-mono text-xs uppercase tracking-[0.18em] text-white/55">
                React Native · Flutter · React.js · {siteConfig.location}
              </p>
              <div className="mt-10 border-t border-white/10 pt-8">
                <p className="font-display text-3xl uppercase leading-[0.95] sm:text-4xl">
                  Building apps
                  <br />
                  <span className="text-white/30">that feel effortless.</span>
                </p>
              </div>
            </article>
          </Reveal>
        </div>

        <div className="mt-20">
          <p className="mono-label mb-6">Experience in numbers</p>
          <div className="grid border-y border-white/10 sm:grid-cols-3">
            {stats.map((stat, index) => (
              <Reveal
                key={stat.label}
                delay={index * 0.1}
                className="border-white/10 py-8 sm:px-8 sm:first:pl-0 [&:not(:first-child)]:border-t sm:[&:not(:first-child)]:border-l sm:[&:not(:first-child)]:border-t-0"
              >
                <Counter value={stat.value} className="font-display text-7xl leading-none md:text-8xl" />
                <p className="mono-label mt-3">{stat.label}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-20 grid gap-10 lg:grid-cols-[0.6fr_1.4fr]">
          <div>
            <p className="mono-label">What I bring</p>
            <p className="mt-4 font-display text-5xl uppercase leading-[0.95]">
              Strengths<span className="text-white/25">.</span>
            </p>
          </div>
          <ul className="grid gap-x-10 sm:grid-cols-2">
            {strengths.map((item, index) => (
              <li key={item} className="flex items-baseline gap-4 border-b border-white/10 py-4">
                <span className="font-mono text-xs text-white/35">{pad(index + 1)}</span>
                <span className="text-white/80">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

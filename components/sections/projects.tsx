"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import { FaApple, FaGooglePlay } from "react-icons/fa6";
import { SectionHeading, SectionStat } from "@/components/common/section-heading";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { projectCategories, projects } from "@/data/portfolio";
import type { Project } from "@/types/portfolio";
import { cn, pad } from "@/lib/utils";

const matches = (project: Project, category: string) =>
  category === "All" || project.category === category || project.techStack.includes(category);

// Only offer filters that actually have projects behind them.
const categories = projectCategories
  .map((label) => ({ label, count: projects.filter((project) => matches(project, label)).length }))
  .filter((category) => category.count > 0);

function StoreLinks({ project }: { project: Project }) {
  return (
    <>
      {project.links.github ? (
        <Button asChild size="sm" variant="secondary">
          <a href={project.links.github} target="_blank" rel="noreferrer">
            <Github className="h-3.5 w-3.5" />
            GitHub
          </a>
        </Button>
      ) : null}
      {project.links.demo ? (
        <Button asChild size="sm" variant="secondary">
          <a href={project.links.demo} target="_blank" rel="noreferrer">
            <ExternalLink className="h-3.5 w-3.5" />
            Website
          </a>
        </Button>
      ) : null}
      {project.links.playStore ? (
        <Button asChild size="sm" variant="secondary">
          <a href={project.links.playStore} target="_blank" rel="noreferrer">
            <FaGooglePlay className="h-3.5 w-3.5" />
            Play Store
          </a>
        </Button>
      ) : null}
      {project.links.appStore ? (
        <Button asChild size="sm" variant="secondary">
          <a href={project.links.appStore} target="_blank" rel="noreferrer">
            <FaApple className="h-3.5 w-3.5" />
            App Store
          </a>
        </Button>
      ) : null}
    </>
  );
}

export function ProjectsSection() {
  const [category, setCategory] = useState("All");
  const filtered = useMemo(() => projects.filter((project) => matches(project, category)), [category]);

  return (
    <section id="projects" className="border-t border-white/10 bg-black py-24 md:py-32">
      <div className="container-premium">
        <SectionHeading
          index="05"
          label="Work"
          title="Selected work"
          description="Mobile and web products built for real workflows. Open any project for architecture, challenges, and my contributions."
          aside={<SectionStat value={pad(projects.length)} label="Projects / Featured" />}
        />

        <div role="tablist" aria-label="Project categories" className="mb-10 flex gap-2 overflow-x-auto pb-2">
          {categories.map((item, index) => {
            const selected = category === item.label;
            return (
              <button
                key={item.label}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setCategory(item.label)}
                className={cn(
                  "focus-ring flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors",
                  selected
                    ? "border-white bg-white text-black"
                    : "border-white/10 text-white/60 hover:border-white/30 hover:text-white",
                )}
              >
                <span className="font-mono text-[11px] opacity-60">{pad(index + 1)}</span>
                {item.label}
                <span className="font-mono text-[11px] opacity-60">({item.count})</span>
              </button>
            );
          })}
        </div>

        <motion.div layout className="grid gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => {
              const number = pad(projects.indexOf(project) + 1);
              const fit = project.imageFit === "contain" ? "object-contain p-8" : "object-cover";
              return (
                <Dialog key={project.title}>
                  <motion.article
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.4 }}
                    className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] transition-colors hover:border-white/25"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden border-b border-white/10 bg-[#0d0d0d]">
                      <Image
                        src={project.image}
                        alt={`${project.title} app preview`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className={cn("transition-transform duration-700 group-hover:scale-[1.03]", fit)}
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6 sm:p-8">
                      <div className="flex items-center justify-between gap-4">
                        <span className="mono-label">Project / {number}</span>
                        <span className="chip">{project.category}</span>
                      </div>
                      <h3 className="mt-5 font-display text-4xl uppercase leading-none sm:text-5xl">{project.title}</h3>
                      <p className="mt-4 flex-1 text-sm leading-7 text-white/60 sm:text-base">{project.description}</p>
                      <div className="mt-6 flex flex-wrap gap-2">
                        {project.techStack.map((tech) => (
                          <span key={tech} className="chip">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="mt-6 flex flex-wrap gap-2 border-t border-white/10 pt-6">
                        <DialogTrigger asChild>
                          <Button size="sm">
                            Case study
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </Button>
                        </DialogTrigger>
                        <StoreLinks project={project} />
                      </div>
                    </div>
                  </motion.article>

                  <DialogContent>
                    <p className="mono-label">Project / {number} · {project.category}</p>
                    <div className="mt-4 pr-12">
                      <DialogTitle className="font-display text-5xl uppercase leading-none sm:text-6xl">
                        {project.title}
                        <span className="text-white/25">.</span>
                      </DialogTitle>
                      <DialogDescription className="mt-4 max-w-2xl text-white/60">{project.description}</DialogDescription>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-2">
                      <StoreLinks project={project} />
                    </div>
                    <div className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
                      <div className="relative aspect-[16/11] overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d0d]">
                        <Image
                          src={project.image}
                          alt={`${project.title} preview`}
                          fill
                          sizes="(max-width: 1024px) 92vw, 480px"
                          className={fit}
                        />
                      </div>
                      <div className="grid gap-3">
                        {[
                          ["Architecture", project.details.architecture],
                          ["Challenges", project.details.challenges],
                          ["Solutions", project.details.solutions],
                          ["Performance", project.details.performance],
                        ].map(([label, text], index) => (
                          <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                            <h4 className="mono-label">
                              {pad(index + 1)} / {label}
                            </h4>
                            <p className="mt-3 text-sm leading-7 text-white/65">{text}</p>
                          </div>
                        ))}
                        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                          <h4 className="mono-label">05 / My contributions</h4>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {project.details.contributions.map((item) => (
                              <span key={item} className="chip">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

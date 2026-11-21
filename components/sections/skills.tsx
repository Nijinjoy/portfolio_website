"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionHeading, SectionStat } from "@/components/common/section-heading";
import { skillGroups } from "@/data/portfolio";
import { cn, pad } from "@/lib/utils";

const allSkills = skillGroups.flatMap((group) => group.skills.map((skill) => ({ ...skill, category: group.title })));
const tabs = [
  { label: "All", count: allSkills.length },
  ...skillGroups.map((group) => ({ label: group.title, count: group.skills.length })),
];

export function SkillsSection() {
  const [active, setActive] = useState("All");
  const visible = active === "All" ? allSkills : allSkills.filter((skill) => skill.category === active);

  return (
    <section id="skills" className="border-t border-white/10 bg-black py-24 md:py-32">
      <div className="container-premium">
        <SectionHeading
          index="03"
          label="Skills"
          title="My toolkit"
          subtitle="Built to ship"
          description="Hands-on experience across cross-platform mobile, frontend engineering, state management, API integration, databases, and delivery tools."
          aside={<SectionStat value={String(allSkills.length)} label="Technologies" />}
        />

        <div role="tablist" aria-label="Skill categories" className="mb-10 flex gap-2 overflow-x-auto pb-2">
          {tabs.map((tab, index) => {
            const selected = active === tab.label;
            return (
              <button
                key={tab.label}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActive(tab.label)}
                className={cn(
                  "focus-ring flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors",
                  selected
                    ? "border-white bg-white text-black"
                    : "border-white/10 text-white/60 hover:border-white/30 hover:text-white",
                )}
              >
                <span className="font-mono text-[11px] opacity-60">{pad(index + 1)}</span>
                {tab.label}
                <span className="font-mono text-[11px] opacity-60">({tab.count})</span>
              </button>
            );
          })}
        </div>

        <motion.ul layout className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          <AnimatePresence mode="popLayout">
            {visible.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <motion.li
                  layout
                  key={`${skill.category}-${skill.name}`}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                  className="group rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-white/25 hover:bg-white/[0.05]"
                >
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-[11px] text-white/35">{pad(index + 1)}</span>
                    <Icon className="h-5 w-5 text-white/40 transition-colors group-hover:text-white" />
                  </div>
                  <p className="mt-8 font-medium text-white">{skill.name}</p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
                    {skill.category}
                    {skill.experience ? ` · ${skill.experience}` : null}
                  </p>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </motion.ul>
      </div>
    </section>
  );
}

import { Reveal } from "@/components/common/reveal";
import { SectionHeading, SectionStat } from "@/components/common/section-heading";
import { experiences } from "@/data/portfolio";
import { pad } from "@/lib/utils";

/** "Impetors Pvt Ltd, Bengaluru" -> ["Impetors Pvt Ltd", "Bengaluru"] */
function splitCompany(value: string) {
  const index = value.lastIndexOf(", ");
  return index === -1 ? [value, ""] : [value.slice(0, index), value.slice(index + 2)];
}

function PointList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((point) => (
        <li key={point} className="flex gap-3 text-sm leading-7 text-white/65">
          <span aria-hidden="true" className="mt-[0.85rem] h-px w-3 shrink-0 bg-white/40" />
          {point}
        </li>
      ))}
    </ul>
  );
}

export function ExperienceSection() {
  return (
    <section id="experience" className="border-t border-white/10 bg-[#080808] py-24 md:py-32">
      <div className="container-premium">
        <SectionHeading
          index="04"
          label="Experience"
          title="The road so far"
          description="Shipping production apps for real businesses, from enterprise HR platforms to commerce and POS."
          aside={<SectionStat value="04+" label="Years / Development" />}
        />

        <ol className="relative ml-4 border-l border-white/10 sm:ml-5">
          {experiences.map((item, index) => {
            const [company, location] = splitCompany(item.company);
            return (
              <li key={item.company} className="relative pb-16 pl-10 last:pb-0 sm:pl-14">
                <span className="absolute -left-4 top-0 grid h-8 w-8 place-items-center rounded-full border border-white/20 bg-black font-mono text-xs sm:-left-5 sm:h-10 sm:w-10">
                  {index + 1}
                </span>
                <Reveal className="grid gap-8 lg:grid-cols-[240px_1fr] lg:gap-14">
                  <div className="lg:pt-1">
                    <p className="mono-label">Experience / {pad(index + 1)}</p>
                    <p className="mt-4 font-mono text-sm text-white">{item.duration}</p>
                    {location ? <p className="mt-1 text-sm text-white/45">{location}</p> : null}
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
                    <h3 className="font-display text-3xl uppercase leading-[0.95] sm:text-4xl">{item.position}</h3>
                    <p className="mt-2 text-white/60">{company}</p>
                    <div className="mt-8 grid gap-8 xl:grid-cols-2">
                      <div>
                        <p className="mono-label mb-4">Role & contributions</p>
                        <PointList items={item.responsibilities} />
                      </div>
                      <div>
                        <p className="mono-label mb-4">Key wins</p>
                        <PointList items={item.achievements} />
                      </div>
                    </div>
                    <div className="mt-8 flex flex-wrap gap-2 border-t border-white/10 pt-6">
                      {item.technologies.map((tech) => (
                        <span key={tech} className="chip">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

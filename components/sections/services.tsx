import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { services } from "@/data/portfolio";
import { pad } from "@/lib/utils";

export function ServicesSection() {
  return (
    <section id="services" className="border-t border-white/10 bg-[#080808] py-24 md:py-32">
      <div className="container-premium">
        <SectionHeading
          index="06"
          label="Services"
          title="What I do"
          description="End-to-end support for mobile products, from first build to optimization, maintenance, and release."
        />
        <ul className="border-t border-white/10">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <li key={service.title}>
                <Reveal delay={index * 0.05} y={24}>
                  <div className="group grid gap-4 border-b border-white/10 py-8 transition-colors hover:bg-white/[0.02] md:grid-cols-[80px_1.1fr_1fr_auto] md:items-center md:gap-8 md:px-4">
                    <span className="font-mono text-sm text-white/35">{pad(index + 1)}</span>
                    <h3 className="font-display text-3xl uppercase leading-none transition-transform duration-500 group-hover:translate-x-2 sm:text-4xl">
                      {service.title}
                    </h3>
                    <p className="text-sm leading-7 text-white/55 sm:text-base">{service.text}</p>
                    <Icon className="hidden h-6 w-6 text-white/30 transition-colors group-hover:text-white md:block" />
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

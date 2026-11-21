import { SectionHeading } from "@/components/common/section-heading";
import { certifications } from "@/data/portfolio";

export function CertificationsSection() {
  return (
    <section id="certifications" className="py-24">
      <div className="container-premium">
        <SectionHeading
          index="09"
          label="Certifications"
          title="Always learning"
          description="Continuous learning across mobile, web, and cloud."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {certifications.map((cert) => {
            const Icon = cert.icon;
            return (
              <article key={cert.title} className="glass-panel rounded-3xl p-5">
                <Icon className="h-7 w-7 text-white/60" />
                <h3 className="mt-4 font-display text-2xl uppercase">{cert.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{cert.issuer}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

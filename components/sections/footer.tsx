import { ArrowUp, Github, Linkedin, Mail, MessageCircle } from "lucide-react";
import { navItems, siteConfig } from "@/constants/site";
import { pad } from "@/lib/utils";

const socials = [
  { icon: Linkedin, href: siteConfig.linkedin, label: "LinkedIn" },
  { icon: Github, href: siteConfig.github, label: "GitHub" },
  { icon: MessageCircle, href: siteConfig.whatsapp, label: "WhatsApp" },
  { icon: Mail, href: `mailto:${siteConfig.email}`, label: "Email" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black pt-20">
      <div className="container-premium">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="mono-label">Connect with me</p>
            <p className="mt-4 font-display text-5xl uppercase leading-none sm:text-6xl">
              Find me online<span className="text-white/25">.</span>
            </p>
            <div className="mt-8 flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="focus-ring grid h-12 w-12 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:bg-white hover:text-black"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <p className="mono-label">Explore / Navigation</p>
            <ul className="mt-6 grid grid-cols-2 gap-x-8">
              {navItems.map((item, index) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="flex items-baseline gap-3 border-b border-white/10 py-3 text-lg text-white/70 transition-colors hover:text-white"
                  >
                    <span className="font-mono text-xs text-white/35">{pad(index + 1)}</span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p
          aria-hidden="true"
          className="mt-20 select-none whitespace-nowrap font-display text-[min(25vw,22rem)] uppercase leading-[0.8] tracking-[-0.02em] text-white"
        >
          {siteConfig.name}
        </p>

        <div className="mono-label mt-10 flex flex-col gap-4 border-t border-white/10 py-6 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </span>
          <span>{siteConfig.location}</span>
          <a href="#home" className="inline-flex items-center gap-2 transition-colors hover:text-white">
            Back to top
            <ArrowUp className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}

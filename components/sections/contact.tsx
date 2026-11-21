"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import emailjs from "@emailjs/browser";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpRight, Github, Linkedin, Mail, MessageCircle, Phone, Send, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/constants/site";
import { pad } from "@/lib/utils";

const contactSchema = z.object({
  name: z.string().min(2, "Enter your name."),
  email: z.string().email("Enter a valid email."),
  phone: z.string().min(7, "Enter a valid phone number."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

type ContactForm = z.infer<typeof contactSchema>;

const channels = [
  { icon: Mail, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { icon: Phone, label: "Phone", value: siteConfig.phone, href: `tel:${siteConfig.phone.replace(/\s/g, "")}` },
  { icon: MessageCircle, label: "WhatsApp", value: "Chat with me", href: siteConfig.whatsapp },
  { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/nijinjoy", href: siteConfig.linkedin },
  { icon: Github, label: "GitHub", value: "github.com/Nijinjoy", href: siteConfig.github },
];

export function ContactSection() {
  const [toast, setToast] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactForm>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (values: ContactForm) => {
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (serviceId && templateId && publicKey) {
      await emailjs.send(serviceId, templateId, values, { publicKey });
      setToast("Message sent successfully.");
    } else {
      setToast("Form validated. Add EmailJS environment variables to enable sending.");
    }
    reset();
  };

  return (
    <section id="contact" className="border-t border-white/10 bg-black py-24 md:py-32">
      <div className="container-premium">
        <SectionHeading
          index="07"
          label="Contact"
          title="Let's connect"
          description="Have a project or an opportunity in mind? Send me the context, timeline, and platforms, and let's build something meaningful together."
          aside={
            <>
              <p className="mono-label">Location</p>
              <p className="mt-3 font-display text-3xl uppercase sm:text-4xl">{siteConfig.location}</p>
            </>
          }
        />

        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <Reveal>
            <p className="mono-label mb-5">Find me here</p>
            <ul className="grid gap-3">
              {channels.map(({ icon: Icon, label, value, href }, index) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="focus-ring group flex items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-white/25 hover:bg-white/[0.05]"
                  >
                    <span className="font-mono text-xs text-white/35">{pad(index + 1)}</span>
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/10">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="mono-label block">{label}</span>
                      <span className="mt-1 block truncate text-white">{value}</span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-white/35 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.15}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-10"
            >
              <p className="mono-label">Send an enquiry / 001</p>
              <h3 className="mt-4 font-display text-4xl uppercase leading-none sm:text-5xl">
                Tell me about your project<span className="text-white/25">.</span>
              </h3>
              <div className="mt-10 grid gap-8 sm:grid-cols-2">
                <Field label="Your name" error={errors.name?.message}>
                  <input {...register("name")} autoComplete="name" className="input" placeholder="Jane Doe" />
                </Field>
                <Field label="Email address" error={errors.email?.message}>
                  <input
                    {...register("email")}
                    type="email"
                    autoComplete="email"
                    className="input"
                    placeholder="you@example.com"
                  />
                </Field>
                <Field label="Phone" error={errors.phone?.message} className="sm:col-span-2">
                  <input {...register("phone")} type="tel" autoComplete="tel" className="input" placeholder="+971 50 000 0000" />
                </Field>
                <Field label="Your message" error={errors.message?.message} className="sm:col-span-2">
                  <textarea
                    {...register("message")}
                    rows={4}
                    className="input resize-y"
                    placeholder="Project goals, timeline, target platforms, integrations..."
                  />
                </Field>
              </div>
              <Button className="mt-10 w-full sm:w-auto" disabled={isSubmitting}>
                <Send className="h-4 w-4" />
                {isSubmitting ? "Sending..." : "Send message"}
              </Button>
            </form>
          </Reveal>
        </div>
      </div>

      {toast ? (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 z-50 flex w-[min(92vw,420px)] -translate-x-1/2 items-center justify-between gap-4 rounded-2xl border border-white/15 bg-black/90 p-4 shadow-2xl backdrop-blur-xl"
        >
          <p className="text-sm">{toast}</p>
          <button type="button" aria-label="Dismiss notification" onClick={() => setToast(null)}>
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : null}
    </section>
  );
}

function Field({
  label,
  error,
  className,
  children,
}: {
  label: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <label className={className}>
      <span className="mono-label block">{label}</span>
      {children}
      {error ? <span className="mt-2 block text-sm text-red-400">{error}</span> : null}
    </label>
  );
}

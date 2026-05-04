"use client";

import { ArrowUpRight } from "@phosphor-icons/react";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import { AnimatedItem, AnimatedSection } from "@/components/ui/AnimatedSection";

const CONTACT_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/SAMAR106",
    handle: "@SAMAR106",
    icon: "⌨️",
    desc: "Code, models, and repositories",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/samarjith-m-404b42299",
    handle: "/in/samarjith-m",
    icon: "💼",
    desc: "Professional network and experience",
  },
  {
    label: "Email",
    href: "mailto:samarjith2007@gmail.com",
    handle: "samarjith2007@gmail.com",
    icon: "📧",
    desc: "For direct inquiries and collaboration",
  },
];

export function Contact() {
  return (
    <section
      id="contact"
      className="relative border-t border-white/5 bg-transparent px-6 py-24 md:px-10 md:py-32"
    >
      {/* Background */}
      <div className="orb-1 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20" />
      <div className="orb-2 bottom-0 right-0 opacity-25" />

      <div className="relative z-10 mx-auto max-w-[1400px]">
        <AnimatedSection className="flex flex-col items-center text-center gap-6 mb-16">
          <AnimatedItem>
            <EyebrowBadge>CONTACT // LET&apos;S CONNECT</EyebrowBadge>
          </AnimatedItem>
          <AnimatedItem>
            <h2 className="max-w-[20ch] font-sans text-4xl font-bold leading-[0.98] tracking-tighter text-foreground md:text-6xl">
              Get in{" "}
              <span className="gradient-text">Touch</span>
            </h2>
          </AnimatedItem>
          <AnimatedItem>
            <p className="max-w-[50ch] font-sans text-base leading-relaxed text-zinc-400 md:text-lg">
              Interested in working together? Have a project idea? I&apos;m always open
              to discussing new opportunities and building something great.
            </p>
          </AnimatedItem>
        </AnimatedSection>

        <AnimatedSection className="mx-auto grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
          {CONTACT_LINKS.map((link) => (
            <AnimatedItem key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="card-surface project-glow group flex h-full flex-col items-center gap-4 rounded-2xl p-7 text-center transition-all duration-300 hover:border-accent/15"
              >
                <span className="text-3xl">{link.icon}</span>
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                    {link.label}
                  </span>
                  <span className="font-sans text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                    {link.handle}
                  </span>
                </div>
                <p className="font-sans text-xs text-zinc-500 leading-relaxed">
                  {link.desc}
                </p>
                <ArrowUpRight
                  size={14}
                  weight="bold"
                  className="text-zinc-600 transition-all duration-200 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </AnimatedItem>
          ))}
        </AnimatedSection>

        {/* CTA */}
        <AnimatedSection className="mt-16 flex justify-center">
          <AnimatedItem>
            <a
              href="mailto:samarjith2007@gmail.com"
              className="group inline-flex items-center gap-3 rounded-full bg-accent/90 px-8 py-4 font-mono text-[12px] font-semibold uppercase tracking-[0.2em] text-background transition-all duration-200 hover:bg-accent hover:shadow-[0_0_36px_-6px_rgba(34,211,238,0.5)] active:translate-y-[1px]"
            >
              Send me a message
              <ArrowUpRight
                size={16}
                weight="bold"
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </AnimatedItem>
        </AnimatedSection>
      </div>
    </section>
  );
}

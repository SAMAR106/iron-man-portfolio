"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";

const STATUS_ITEMS = [
  { label: "Status", value: "Available for hire" },
  { label: "Focus", value: "AI & Data Science" },
  { label: "Location", value: "India" },
];

// ✅ SAFE SPRING CONFIG (fixes TS + Vercel issues)
const spring = {
  type: "spring" as const,
  stiffness: 100,
  damping: 20,
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: spring,
  },
};

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] items-center overflow-hidden bg-transparent px-6 pt-24 pb-20 md:px-12"
    >
      {/* Mobile-visible background gradient (sits behind orbs) */}
      <div
        className="absolute inset-0 md:opacity-0 opacity-100 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 100% 80% at 30% 20%, rgba(34,211,238,0.10) 0%, transparent 50%),
            radial-gradient(ellipse 80% 60% at 70% 80%, rgba(167,139,250,0.08) 0%, transparent 50%),
            linear-gradient(180deg, rgba(6,8,13,0.2) 0%, rgba(10,14,24,0.4) 100%)
          `,
        }}
      />

      {/* Background orbs */}
      <div className="orb-1 -top-40 -right-40 opacity-60" />
      <div className="orb-2 -bottom-20 -left-40 opacity-50" />
      <div className="grid-pattern absolute inset-0 opacity-40" />

      {/* Radial fade */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, transparent 20%, var(--background) 80%)",
        }}
      />

      <motion.div
        className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col gap-10 lg:flex-row lg:items-center lg:justify-between"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left content */}
        <div className="flex max-w-2xl flex-col gap-7">
          <motion.div variants={itemVariants}>
            <EyebrowBadge>
              ARTIFICIAL INTELLIGENCE // DATA SCIENCE
            </EyebrowBadge>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="font-sans text-[clamp(2.5rem,8vw,5.5rem)] font-bold leading-[1.1] md:leading-[0.95] tracking-tighter text-foreground"
          >
            Hi, I&apos;m
            <br />
            <span className="gradient-text">M. Samarjith.</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="max-w-[48ch] font-sans text-base leading-relaxed text-zinc-400 md:text-lg"
          >
            I engineer{" "}
            <span className="text-foreground font-medium">
              intelligent systems
            </span>
            , extract insights through{" "}
            <span className="text-foreground font-medium">
              data science
            </span>
            , and build{" "}
            <span className="text-foreground font-medium">
              machine learning models
            </span>{" "}
            that solve complex, real-world problems.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-accent/90 px-6 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-background transition-all duration-200 hover:bg-accent hover:shadow-[0_0_28px_-4px_rgba(34,211,238,0.45)] active:translate-y-[1px]"
            >
              View Projects
              <ArrowUpRight
                size={14}
                weight="bold"
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>

            <a
              href="https://github.com/SAMAR106"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-foreground backdrop-blur-md transition-all duration-200 hover:border-accent/25 hover:bg-white/[0.08] active:translate-y-[1px]"
            >
              GitHub
              <ArrowUpRight
                size={14}
                weight="bold"
                className="opacity-40 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
              />
            </a>
          </motion.div>
        </div>

        {/* Right: Status Card */}
        <motion.div variants={itemVariants} className="w-full max-w-sm lg:max-w-xs">
          <div className="card-surface rounded-2xl p-6">
            <div className="mb-5 flex items-center gap-2.5">
              <span className="glow-dot animate-pulse-glow" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                System Status
              </span>
            </div>

            <div className="flex flex-col divide-y divide-white/[0.06]">
              {STATUS_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className="flex items-baseline justify-between py-3"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500">
                    {item.label}
                  </span>
                  <span className="font-sans text-sm font-medium text-foreground">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500 text-center">
              Last updated — 2026
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute inset-x-0 bottom-6 z-10 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.5 }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-500">
            Scroll to explore
          </span>

          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{
              repeat: Infinity,
              duration: 1.8,
              ease: "easeInOut",
            }}
            className="h-6 w-[1px] bg-gradient-to-b from-accent/60 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}

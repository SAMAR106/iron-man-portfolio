"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, List, X } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-[background-color,backdrop-filter,border-color] duration-300 ${
          scrolled || mobileMenuOpen
            ? "border-b border-white/10 bg-black/60 backdrop-blur-2xl backdrop-saturate-150"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-8 md:py-5">
          <Link
            href="/"
            className="flex items-center gap-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.32em] text-foreground"
          >
            <span aria-hidden className="glow-dot animate-pulse-glow" />
            Samarjith.ai
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="link-underline font-mono text-[11px] uppercase tracking-[0.24em] text-zinc-400 transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="#contact"
              className="group hidden sm:inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.05] px-4 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-foreground backdrop-blur-md transition-all duration-200 hover:border-accent/30 hover:bg-accent/10 hover:text-accent active:translate-y-[1px]"
            >
              Let&apos;s Talk
              <ArrowUpRight
                size={14}
                weight="bold"
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 md:hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <List size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-30 pt-24 px-6 bg-black/95 backdrop-blur-xl md:hidden"
          >
            <nav className="flex flex-col gap-6">
              {NAV_LINKS.map((link, idx) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="font-mono text-xl uppercase tracking-[0.2em] text-zinc-400 hover:text-accent"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-4 flex items-center justify-between rounded-2xl bg-accent px-6 py-4 font-mono text-[12px] font-bold uppercase tracking-[0.2em] text-black"
              >
                Let&apos;s Talk
                <ArrowUpRight size={18} weight="bold" />
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

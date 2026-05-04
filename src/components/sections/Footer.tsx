import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

export function Footer() {
  return (
    <footer
      id="footer"
      className="relative z-10 border-t border-white/5 bg-transparent px-6 py-12 md:px-10 md:py-14"
    >
      <div className="mx-auto flex max-w-[1400px] flex-col gap-8">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-start">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.32em] text-foreground">
              <span
                aria-hidden
                className="glow-dot animate-pulse-glow"
              />
              Samarjith.ai
            </div>
            <p className="max-w-[38ch] font-sans text-sm leading-relaxed text-zinc-400">
              Artificial Intelligence &amp; Data Science specialist engineering intelligent, data-driven solutions for real-world problems.
            </p>
          </div>

          {/* Quick Links */}
          <nav className="grid grid-cols-2 gap-x-10 gap-y-3 md:grid-cols-3">
            {[
              ["Home", "#hero"],
              ["Skills", "#skills"],
              ["Projects", "#projects"],
              ["Contact", "#contact"],
              ["GitHub", "https://github.com/SAMAR106"],
              ["LinkedIn", "https://www.linkedin.com/in/samarjith-m-404b42299"],
            ].map(([name, href]) => (
              <a
                key={name}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex items-center gap-1"
              >
                <span className="font-sans text-[13px] font-medium text-zinc-400 transition-colors group-hover:text-accent">
                  {name}
                  {href.startsWith("http") && (
                    <ArrowUpRight
                      size={11}
                      weight="bold"
                      className="ml-1 inline-block align-baseline opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  )}
                </span>
              </a>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-2 border-t border-white/5 pt-6 font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500 md:flex-row md:items-center md:justify-between">
          <span>&copy; 2026 M. Samarjith &nbsp;&middot;&nbsp; Engineered with AI</span>
          <span>Designed &amp; developed with &hearts;</span>
        </div>
      </div>
    </footer>
  );
}

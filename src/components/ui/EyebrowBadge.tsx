type Props = { children: React.ReactNode; className?: string };

export function EyebrowBadge({ children, className = "" }: Props) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-accent backdrop-blur-md ${className}`}
      style={{
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.04), 0 0 24px -8px rgba(34,211,238,0.2)",
      }}
    >
      <span className="glow-dot" style={{ width: 5, height: 5 }} />
      {children}
    </span>
  );
}

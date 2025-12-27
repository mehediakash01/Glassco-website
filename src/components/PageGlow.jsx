"use client";

export default function PageGlow({ children }) {
  return (
    <div className="relative overflow-hidden">
      {/* Page ambient glow */}
      <div className="pointer-events-none absolute top-32 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-amber-500/20 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-32 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-amber-600/20 blur-[140px]" />

      <div className="relative z-10">{children}</div>
    </div>
  );
}

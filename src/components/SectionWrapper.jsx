"use client";

export default function SectionWrapper({
  children,
  id,
  className = "",
  glow = true,
}) {
  return (
    <section
      id={id}
      className={`relative w-full overflow-hidden ${className}`}
    >
      {/* Glow effects - behind content (z-0 default) */}
      {glow && (
        <>
          <div className="pointer-events-none absolute -top-40 -left-40 w-[500px] h-[500px] bg-amber-500/30 blur-[140px] rounded-full -z-10" />
          <div className="pointer-events-none absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-yellow-400/20 blur-[160px] rounded-full -z-10" />
        </>
      )}

      {/* Content - always on top */}
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
}
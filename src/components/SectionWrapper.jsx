"use client";

export default function SectionWrapper({ children, id, className = "" }) {
  return (
    <section
      id={id}
      className={`relative bg-black text-white overflow-hidden ${className}`}
    >
      {/* Golden Animated Background Orbs */}
      <div className="absolute top-[-150px] left-[-150px] w-96 h-96 bg-amber-600/40 blur-3xl rounded-full animate-float"></div>
      <div className="absolute bottom-[-150px] right-[-150px] w-96 h-96 bg-amber-500/40 blur-3xl rounded-full animate-float-delayed"></div>

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>

      {/* Content - with proper z-index */}
      <div className="relative z-10">{children}</div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(40px, -40px);
          }
        }
        @keyframes float-delayed {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-40px, 40px);
          }
        }
        .animate-float {
          animation: float 25s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 22s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}

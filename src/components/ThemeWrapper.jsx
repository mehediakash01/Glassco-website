"use client";

export default function ThemeWrapper({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-r from-black to-amber-500/75 text-white">
      {children}
    </div>
  );
}

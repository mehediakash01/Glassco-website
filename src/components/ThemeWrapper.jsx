"use client";

export default function ThemeWrapper({ children }) {
  return (
    <div className="min-h-screen bg-black text-white">
      {children}
    </div>
  );
}

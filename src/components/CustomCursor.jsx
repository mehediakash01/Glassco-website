"use client";
import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [ringPos, setRingPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      setRingPos((prev) => ({
        x: prev.x + (e.clientX - prev.x) * 0.12,
        y: prev.y + (e.clientY - prev.y) * 0.12,
      }));
    };

    const hoverOn = () => setHovering(true);
    const hoverOff = () => setHovering(false);

    window.addEventListener("mousemove", move);
    document.querySelectorAll("a, button").forEach(el => {
      el.addEventListener("mouseenter", hoverOn);
      el.addEventListener("mouseleave", hoverOff);
    });

    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          transform: `translate(${pos.x - 4}px, ${pos.y - 4}px)`,
        }}
      >
        <div className="w-2 h-2 rounded-full bg-amber-400" />
      </div>

      {/* Ring */}
      <div
        className={`fixed top-0 left-0 z-[9998] pointer-events-none transition-all duration-200
          ${hovering ? "scale-150" : "scale-100"}`}
        style={{
          transform: `translate(${ringPos.x - 16}px, ${ringPos.y - 16}px)`,
        }}
      >
        <div className="w-8 h-8 rounded-full border border-amber-400/60 blur-[0.5px]" />
      </div>
    </>
  );
}

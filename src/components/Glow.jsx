export default function Glow({ position = "top-right", size = "w-32 h-32", opacity = "opacity-20" }) {
  const positions = {
    "top-right": "top-0 right-0",
    "top-left": "top-0 left-0",
    "bottom-right": "bottom-0 right-0",
    "bottom-left": "bottom-0 left-0",
  };

  return (
    <div
      className={`absolute ${positions[position]} ${size} rounded-full bg-yellow-500 ${opacity} blur-3xl pointer-events-none`}
    />
  );
}

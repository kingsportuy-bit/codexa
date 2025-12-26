"use client";

export function BackgroundScene() {
  return (
    <div className="fixed inset-0 -z-10 bg-black">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-zinc-950" />

      {/* Optional: Subtle particle effect */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-accent/40 rounded-full animate-pulse" />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-accent/30 rounded-full animate-pulse delay-100" />
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-accent/20 rounded-full animate-pulse delay-200" />
        <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-accent/40 rounded-full animate-pulse delay-300" />
      </div>
    </div>
  );
}
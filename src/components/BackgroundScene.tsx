"use client";

export function BackgroundScene() {
  return (
    <div className="fixed inset-0 -z-10 bg-black">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-zinc-950" />

      {/* Ambient gradient orbs */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-accent/[0.06] rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/[0.05] rounded-full blur-[150px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-500/[0.04] rounded-full blur-[120px]" />
    </div>
  );
}
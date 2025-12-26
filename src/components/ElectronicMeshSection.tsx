"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NODES = [
  { x: 10, y: 20 },
  { x: 30, y: 10 },
  { x: 55, y: 28 },
  { x: 75, y: 18 },
  { x: 20, y: 55 },
  { x: 45, y: 60 },
  { x: 70, y: 52 },
  { x: 85, y: 70 },
];

const CONNECTIONS = [
  [0, 1],
  [1, 2],
  [2, 3],
  [0, 4],
  [4, 5],
  [5, 6],
  [6, 7],
  [2, 6],
];

export function ElectronicMeshSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const lines = containerRef.current!.querySelectorAll<SVGLineElement>(
        "line"
      );
      const nodes = containerRef.current!.querySelectorAll<SVGCircleElement>(
        "circle"
      );

      gsap.set(lines, { strokeDasharray: 100, strokeDashoffset: 100 });
      gsap.set(nodes, { scale: 0, transformOrigin: "center center" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "top 20%",
          scrub: 1.2,
        },
      });

      tl.to(lines, {
        strokeDashoffset: 0,
        duration: 1.8,
        stagger: 0.1,
        ease: "power2.out",
      }).to(
        nodes,
        {
          scale: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: "back.out(1.7)",
        },
        "<0.4"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      data-bg-section
      className="relative py-32 border-y border-white/5"
    >
      <div className="max-w-5xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 space-y-5">
          <p className="text-sm uppercase tracking-[0.4em] text-white/60">
            Arquitectura & conexiones
          </p>
          <h2 className="text-3xl md:text-4xl font-space-grotesk">
            Cada sistema que construimos{" "}
            <span className="text-accent">se conecta</span> con el resto de tu
            negocio.
          </h2>
          <p className="text-sm md:text-base text-white/70">
            Pensamos tus productos como parte de una red: APIs, servicios,
            eventos y agentes de IA conectados en una arquitectura clara.
          </p>
        </div>

        <div className="flex-1">
          <div
            ref={containerRef}
            className="relative aspect-[4/3] w-full rounded-[2rem] bg-black/80 border border-white/10 overflow-hidden backdrop-blur-xl"
          >
            <svg
              viewBox="0 0 100 75"
              className="h-full w-full text-accent/80"
            >
              {CONNECTIONS.map(([from, to], i) => (
                <line
                  key={i}
                  x1={NODES[from].x}
                  y1={NODES[from].y}
                  x2={NODES[to].x}
                  y2={NODES[to].y}
                  stroke="currentColor"
                  strokeWidth="0.6"
                  strokeLinecap="round"
                  opacity={0.8}
                />
              ))}
              {NODES.map((node, i) => (
                <circle
                  key={i}
                  cx={node.x}
                  cy={node.y}
                  r={1.4}
                  fill="currentColor"
                />
              ))}
            </svg>
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(0,0,0,0)_0,rgba(0,0,0,0.9)_65%),radial-gradient(circle_at_100%_100%,rgba(0,0,0,0)_0,rgba(0,0,0,0.9)_60%)]" />
          </div>
        </div>
      </div>
    </section>
  );
}
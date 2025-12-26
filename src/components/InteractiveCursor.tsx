"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function InteractiveCursor() {
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ringRef.current) return;

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: pos.x, y: pos.y };
    const prev = { x: pos.x, y: pos.y };

    const ring = ringRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const render = () => {
      prev.x = pos.x;
      prev.y = pos.y;

      pos.x += (mouse.x - pos.x) * 0.25;
      pos.y += (mouse.y - pos.y) * 0.25;

      const vx = mouse.x - prev.x;
      const vy = mouse.y - prev.y;

      const tiltX = gsap.utils.clamp(-15, 15, vy * 0.2);
      const tiltY = gsap.utils.clamp(-15, 15, -vx * 0.2);

      gsap.set(ring, {
        x: pos.x,
        y: pos.y,
        rotateX: tiltX,
        rotateY: tiltY,
        transformPerspective: 600,
        transformOrigin: "center center",
      });

      requestAnimationFrame(render);
    };

    render();

    // hover para elementos "interactivos"
    const handleMouseEnter = (e: Event) => {
      // Verificar si el elemento o alguno de sus padres tiene data-cursor="none"
      const target = e.target as HTMLElement;
      if (target.closest('[data-cursor="none"]')) {
        return; // No aplicar efecto si está marcado como "none"
      }
      gsap.to(ring, { scale: 1.6, opacity: 1, duration: 0.2 });
    };
    const handleMouseLeave = () => {
      gsap.to(ring, { scale: 1, opacity: 0.6, duration: 0.2 });
    };

    const interactive = document.querySelectorAll(
      "a, button, [data-cursor='interactive']"
    );
    interactive.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    // Cambiar estilo según la sección visible
    const sections = document.querySelectorAll<HTMLElement>("[data-cursor-theme]");

    sections.forEach((section) => {
      const theme = section.dataset.cursorTheme || "default";

      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => applyTheme(theme),
        onEnterBack: () => applyTheme(theme),
      });
    });

    function applyTheme(theme: string) {
      if (theme === "hero") {
        gsap.to(ring, {
          width: 40,
          height: 40,
          borderRadius: "50%",
          backgroundColor: "rgba(0,204,194,0.15)",
          borderColor: "rgba(0,204,194,0.8)",
          boxShadow: "0 0 30px rgba(0,204,194,0.7)",
          duration: 0.3,
        });
      } else if (theme === "showreel") {
        gsap.to(ring, {
          width: 48,
          height: 48,
          borderRadius: "50%",
          backgroundColor: "rgba(56,189,248,0.15)",
          borderColor: "rgba(59,130,246,0.9)",
          boxShadow: "0 0 30px rgba(56,189,248,0.7)",
          duration: 0.3,
        });
      } else if (theme === "barberox") {
        gsap.to(ring, {
          width: 48,
          height: 28,
          borderRadius: 12,
          backgroundColor: "rgba(249,115,22,0.15)",
          borderColor: "rgba(249,115,22,0.9)",
          boxShadow:
            "0 0 24px rgba(249,115,22,0.9), 0 0 80px rgba(248,113,113,0.75)",
          duration: 0.3,
        });
      } else {
        gsap.to(ring, {
          width: 32,
          height: 32,
          borderRadius: "50%",
          backgroundColor: "rgba(148,163,184,0.1)",
          borderColor: "rgba(148,163,184,0.6)",
          boxShadow: "0 0 20px rgba(148,163,184,0.5)",
          duration: 0.3,
        });
      }
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      interactive.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[80] h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/80 bg-cyan-300/10 backdrop-blur-sm shadow-[0_0_30px_rgba(34,211,238,0.7)]"
      />
    </>
  );
}
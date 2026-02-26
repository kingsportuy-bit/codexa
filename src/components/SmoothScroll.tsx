"use client";

import React, { useEffect, useRef, createContext, useContext } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import gsap from "gsap";

// Expose Lenis instance via context so other components can stop/start it
const LenisContext = createContext<{ stop: () => void; start: () => void }>({
  stop: () => { },
  start: () => { },
});

export const useLenis = () => useContext(LenisContext);

function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      lerp: 0.08,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, []);

  return (
    <LenisContext.Provider value={{
      stop: () => lenisRef.current?.stop(),
      start: () => lenisRef.current?.start(),
    }}>
      {children}
    </LenisContext.Provider>
  );
}

export default SmoothScroll;
"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import gsap from "gsap";

function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Registrar el plugin ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Crear la instancia de Lenis
    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
      infinite: false,
    });

    // Configurar ScrollTrigger para que funcione con Lenis
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length && value !== undefined) {
          lenis.scrollTo(value);
          return value;
        }
        return window.scrollY;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: document.body.style.transform ? "transform" : "fixed",
    });

    // Función de animación
    function raf(time: number) {
      lenis.raf(time);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    }

    // Iniciar el loop de animación
    requestAnimationFrame(raf);

    // Limpiar al desmontar
    return () => {
      lenis.destroy();
      ScrollTrigger.removeEventListener("refresh", () => { });
    };
  }, []);

  return <>{children}</>;
}

export default SmoothScroll;
"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

// Registrar plugins de GSAP
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Valores predefinidos para las partículas flotantes
const particleData = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  width: 2 + (i * 7.3) % 10,
  height: 2 + (i * 11.7) % 10,
  top: (i * 17.3) % 100,
  left: (i * 23.9) % 100,
}));

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación de entrada del contenido
      gsap.fromTo('.hero-content', 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          stagger: 0.2,
          ease: "power2.out"
        }
      );

      // Animación de parallax del fondo
      if (backgroundRef.current) {
        gsap.to(backgroundRef.current, {
          y: -50,
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          }
        });
      }

      // Animación de partículas flotantes
      gsap.utils.toArray('.floating-particle').forEach((particle: any, i) => {
        gsap.to(particle, {
          y: gsap.utils.random(-20, 20),
          x: gsap.utils.random(-20, 20),
          rotation: gsap.utils.random(-10, 10),
          duration: gsap.utils.random(3, 6),
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: i * 0.2
        });
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Fondo con partículas animadas */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 bg-gradient-to-br from-black via-black/90 to-black"
      >
        {/* Partículas flotantes */}
        {particleData.map((particle) => (
          <div
            key={particle.id}
            className="floating-particle absolute rounded-full bg-accent/20"
            style={{
              width: `${particle.width}px`,
              height: `${particle.height}px`,
              top: `${particle.top}%`,
              left: `${particle.left}%`,
            }}
          />
        ))}
      </div>

      {/* Contenido */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <h1 className="hero-content text-4xl md:text-6xl lg:text-7xl font-bold font-space-grotesk mb-6">
          Software a medida para empresas que quieren ir más rápido
        </h1>
        
        <p className="hero-content text-xl md:text-2xl text-white/80 mb-10 max-w-3xl mx-auto">
          Desarrollo de software a medida, productos SaaS, e integración de inteligencia artificial 
          con agentes que atienden por WhatsApp.
        </p>
        
        <div className="hero-content flex flex-col sm:flex-row gap-4 justify-center">
          <button className="btn-primary flex items-center justify-center group">
            Ver productos
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
          
          <button className="btn-secondary flex items-center justify-center group">
            Hablar por WhatsApp
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Indicador de scroll */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
}
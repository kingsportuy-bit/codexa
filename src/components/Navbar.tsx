"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Animación de entrada inicial
    if (navRef.current) {
      gsap.from(navRef.current, {
        yPercent: -100,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    }

    const ctx = gsap.context(() => {
      // Smart Navbar: Ocultar al bajar, mostrar al subir
      const showAnim = gsap.from(navRef.current, {
        yPercent: -100,
        paused: true,
        duration: 0.3,
        ease: "power2.inOut"
      }).progress(1);

      ScrollTrigger.create({
        start: "top top",
        end: 99999,
        onUpdate: (self) => {
          if (self.direction === -1) {
            showAnim.play();
          } else if (self.direction === 1 && self.progress > 0.01 && !isMenuOpen) {
            showAnim.reverse();
          }
        }
      });

      // Barra de progreso
      if (progressBarRef.current) {
        gsap.to(progressBarRef.current, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 0,
          },
        });
      }

      // Fondo dinámico al hacer scroll
      ScrollTrigger.create({
        start: "top -10",
        onUpdate: (self) => {
          const isScrolled = self.progress > 0;
          gsap.to(navRef.current, {
            backgroundColor: isScrolled ? "rgba(0,0,0,0.8)" : "transparent",
            backdropFilter: isScrolled ? "blur(12px)" : "blur(0px)",
            duration: 0.3,
          });
        }
      });

    }, navRef);

    return () => ctx.revert();
  }, [isMenuOpen]);

  const toggleMenu = () => {
    const nextState = !isMenuOpen;
    setIsMenuOpen(nextState);

    if (!nextState) return;

    // Animación del menú móvil
    if (mobileMenuRef.current) {
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
      );

      gsap.fromTo(
        mobileMenuRef.current.querySelectorAll("a"),
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.25, stagger: 0.05, ease: "power2.out" }
      );
    }
  };

  return (
    <nav
      ref={navRef}
      className="fixed w-full z-50 py-4 top-0 left-0"
    >
      <div
        ref={progressBarRef}
        className="absolute bottom-0 left-0 h-[1px] w-full bg-accent origin-left scale-x-0"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-accent font-space-grotesk tracking-tight">
              codexa
            </h1>
          </div>

          {/* Menú de escritorio */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {[
                { href: "/", label: "Inicio" },
                { href: "/productos", label: "Productos" },
                { href: "/barberox", label: "BarberoX" },
                { href: "/servicios", label: "Servicios" },
                { href: "/empresa", label: "Empresa" },
                { href: "/contacto", label: "Contacto" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="relative text-sm uppercase tracking-[0.18em] text-white/80 hover:text-white transition-colors group"
                >
                  <span>{item.label}</span>
                  <span className="pointer-events-none absolute left-0 -bottom-1 h-[1px] w-0 bg-accent transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>
          </div>

          {/* Botón del menú móvil */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-accent transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div
            ref={mobileMenuRef}
            className="mobile-menu px-4 pt-3 pb-6 space-y-1 bg-black/90 backdrop-blur-lg border-b border-white/10"
          >
            <a
              href="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-accent"
            >
              Inicio
            </a>
            <a
              href="/productos"
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-accent"
            >
              Productos
            </a>
            <a
              href="/barberox"
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-accent"
            >
              BarberoX
            </a>
            <a
              href="/servicios"
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-accent"
            >
              Servicios
            </a>
            <a
              href="/empresa"
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-accent"
            >
              Empresa
            </a>
            <a
              href="/contacto"
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-accent"
            >
              Contacto
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
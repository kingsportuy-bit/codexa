"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { useChatWidget } from "./ChatWidget";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const { open: openChat } = useChatWidget();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 100) {
        setIsVisible(true);
        setIsScrolled(false);
        lastScrollY.current = currentScrollY;
        return;
      }

      setIsScrolled(true);

      if (currentScrollY < lastScrollY.current) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current + 10) {
        setIsVisible(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav
      className={`fixed w-full z-50 top-0 left-0 transition-all duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"
        } ${isScrolled
          ? "bg-black/80 backdrop-blur-xl py-3"
          : "bg-transparent py-5"
        }`}
    >
      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 h-[1px] w-full">
        <div
          className="h-full bg-accent/50 transition-none origin-left"
          style={{ transform: "scaleX(0)" }}
          ref={(el) => {
            if (!el) return;
            const updateProgress = () => {
              const scrollTop = window.scrollY;
              const docHeight = document.documentElement.scrollHeight - window.innerHeight;
              const progress = docHeight > 0 ? scrollTop / docHeight : 0;
              el.style.transform = `scaleX(${progress})`;
            };
            window.addEventListener("scroll", updateProgress, { passive: true });
            updateProgress();
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo-codexa.png"
                alt="Codexa"
                className="h-7 md:h-8 w-auto drop-shadow-[0_0_12px_rgba(0,229,209,0.4)]"
              />
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <a href="/" className="relative text-sm uppercase tracking-[0.18em] text-white/80 hover:text-white transition-colors group">
                <span>Inicio</span>
                <span className="pointer-events-none absolute left-0 -bottom-1 h-[1px] w-0 bg-accent transition-all duration-300 group-hover:w-full" />
              </a>
              <a href="/barberox" className="relative text-sm uppercase tracking-[0.18em] text-white/80 hover:text-white transition-colors group">
                <span>BarberoX</span>
                <span className="pointer-events-none absolute left-0 -bottom-1 h-[1px] w-0 bg-accent transition-all duration-300 group-hover:w-full" />
              </a>
              <button
                onClick={openChat}
                className="relative text-sm uppercase tracking-[0.18em] text-white/80 hover:text-white transition-colors group cursor-pointer bg-transparent border-none"
              >
                <span>Contacto</span>
                <span className="pointer-events-none absolute left-0 -bottom-1 h-[1px] w-0 bg-accent transition-all duration-300 group-hover:w-full" />
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
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

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-4 pt-3 pb-6 space-y-1 bg-black/90 backdrop-blur-lg border-b border-white/10">
            <a href="/" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-accent" onClick={() => setIsMenuOpen(false)}>
              Inicio
            </a>
            <a href="/barberox" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-accent" onClick={() => setIsMenuOpen(false)}>
              BarberoX
            </a>
            <button
              onClick={() => { setIsMenuOpen(false); openChat(); }}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:text-accent bg-transparent border-none cursor-pointer"
            >
              Contacto
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
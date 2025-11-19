"use client";

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { gsap } from 'gsap';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    
    // Animación del menú móvil
    if (!isMenuOpen) {
      gsap.fromTo('.mobile-menu li', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.3, stagger: 0.1 }
      );
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md py-2' : 'py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-accent">codexa</h1>
          </div>

          {/* Menú de escritorio */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <a href="/" className="text-white hover:text-accent transition-colors">Inicio</a>
              <a href="/productos" className="text-white hover:text-accent transition-colors">Productos</a>
              <a href="/barberox" className="text-white hover:text-accent transition-colors">BarberoX</a>
              <a href="/servicios" className="text-white hover:text-accent transition-colors">Servicios</a>
              <a href="/empresa" className="text-white hover:text-accent transition-colors">Empresa</a>
              <a href="/contacto" className="text-white hover:text-accent transition-colors">Contacto</a>
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
        <div className="md:hidden mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/90 backdrop-blur-lg">
            <a href="/" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-accent">Inicio</a>
            <a href="/productos" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-accent">Productos</a>
            <a href="/barberox" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-accent">BarberoX</a>
            <a href="/servicios" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-accent">Servicios</a>
            <a href="/empresa" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-accent">Empresa</a>
            <a href="/contacto" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-accent">Contacto</a>
          </div>
        </div>
      )}
    </nav>
  );
}
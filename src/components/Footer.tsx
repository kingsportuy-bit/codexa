"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Footer({ theme = 'default' }: { theme?: 'default' | 'barberox' }) {
    const containerRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
            gsap.from(containerRef.current, {
                opacity: 0,
                y: 40,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 95%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        return () => ctx.revert();
    }, []);

    const isBarberoX = theme === 'barberox';

    return (
        <footer
            ref={containerRef}
            className={`py-8 border-t relative z-20 text-center text-sm ${isBarberoX
                    ? "border-orange-500/20 bg-gradient-to-t from-orange-600/10 to-transparent backdrop-blur-md text-white/50"
                    : "border-white/5 bg-zinc-950/80 backdrop-blur-sm text-white/30"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6">
                Todos los derechos reservados | &copy; 2026{" "}
                <a
                    href="https://codexa.uy"
                    className="transition-colors no-underline text-white/40 hover:text-white"
                >
                    Code<span className={isBarberoX ? "text-[#00CCC2]" : "text-accent"}>x</span>a.uy
                </a>
            </div>
        </footer>
    );
}

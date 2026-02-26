"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ProductsHeader() {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
            // Left line expands from left
            gsap.from(".products-line-left", {
                scaleX: 0,
                transformOrigin: "right center",
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".products-line-left",
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            });

            // Right line expands from right
            gsap.from(".products-line-right", {
                scaleX: 0,
                transformOrigin: "left center",
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".products-line-right",
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            });

            // Badge pops in with rotation
            gsap.from(".products-badge", {
                opacity: 0,
                scale: 0,
                rotation: -10,
                duration: 0.8,
                ease: "back.out(2)",
                scrollTrigger: {
                    trigger: ".products-badge",
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            });

            // Desc slides from right
            gsap.from(".products-desc", {
                opacity: 0,
                x: 80,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".products-desc",
                    start: "top 88%",
                    toggleActions: "play none none reverse"
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative py-20 px-4">
            <div className="max-w-7xl mx-auto">

                {/* Divider Lines */}
                <div className="mb-12 flex items-center gap-4">
                    <div className="products-line-left flex-1 h-px bg-gradient-to-r from-transparent via-accent/30 to-accent/50" />
                    <div className="products-badge px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
                        <span className="text-sm font-bold text-accent uppercase tracking-wider">
                            Nuestros Productos
                        </span>
                    </div>
                    <div className="products-line-right flex-1 h-px bg-gradient-to-l from-transparent via-accent/30 to-accent/50" />
                </div>

                {/* Description */}
                <div className="products-desc text-center max-w-3xl mx-auto">
                    <p className="text-lg text-zinc-400">
                        Además de desarrollo a medida, creamos productos propios que resuelven problemas reales de negocios.
                    </p>
                </div>

            </div>
        </section>
    );
}

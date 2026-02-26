"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Star, Users, Rocket, TrendingUp, Quote } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
    {
        quote: "Codexa transformó nuestra idea en una app funcional en 10 semanas. El equipo es increíblemente profesional y siempre disponible.",
        author: "María González",
        role: "CEO, TechStart UY",
        rating: 5
    },
    {
        quote: "La IA que implementaron nos ahorra más de 25 horas semanales en atención al cliente. ROI positivo en el primer mes.",
        author: "Carlos Rodríguez",
        role: "Founder, AutoServ",
        rating: 5
    }
];

const metrics = [
    { icon: Users, value: "50+", label: "Proyectos entregados" },
    { icon: Star, value: "4.9/5", label: "Satisfacción promedio" },
    { icon: Rocket, value: "100%", label: "Entregas a tiempo" },
    { icon: TrendingUp, value: "3x", label: "ROI promedio" }
];

export function SocialProofSection() {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
            // Metrics: cascade from right with stagger
            const metricCards = gsap.utils.toArray<HTMLElement>(".metric-card");
            metricCards.forEach((card, i) => {
                gsap.from(card, {
                    opacity: 0,
                    x: 80 + (i * 20),
                    rotateY: -10,
                    scale: 0.85,
                    duration: 0.9,
                    ease: "back.out(1.2)",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 88%",
                        toggleActions: "play none none reverse"
                    }
                });
            });

            // Label from right
            gsap.from(".testimonials-label", {
                opacity: 0,
                x: 60,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".testimonials-label",
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            });

            // Section title: clip-path + slide from left
            gsap.from(".testimonials-title", {
                opacity: 0,
                x: -120,
                clipPath: "inset(0% 0% 0% 100%)",
                duration: 1.4,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".testimonials-title",
                    start: "top 82%",
                    toggleActions: "play none none reverse"
                }
            });

            // Subtitle from right
            gsap.from(".testimonials-subtitle", {
                opacity: 0,
                x: 80,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".testimonials-subtitle",
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });

            // Testimonials: slide in from opposite sides with rotation
            const testimonialCards = gsap.utils.toArray<HTMLElement>(".testimonial-card");
            testimonialCards.forEach((card, i) => {
                const fromLeft = i % 2 === 0;
                gsap.from(card, {
                    opacity: 0,
                    x: fromLeft ? -120 : 120,
                    rotateY: fromLeft ? 8 : -8,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                });
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative py-32 px-4 overflow-hidden">
            {/* Subtle divider */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="max-w-7xl mx-auto">

                {/* Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
                    {metrics.map((metric, i) => {
                        const Icon = metric.icon;
                        return (
                            <div key={i} className="metric-card relative text-center p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm overflow-hidden group hover:border-accent/30 transition-all duration-300" style={{ perspective: '800px' }}>
                                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 mb-4">
                                    <Icon className="w-6 h-6 text-accent" />
                                </div>
                                <div className="text-4xl font-black text-white mb-2" style={{ fontFamily: 'var(--font-outfit), sans-serif' }}>{metric.value}</div>
                                <div className="text-sm text-zinc-400">{metric.label}</div>
                            </div>
                        );
                    })}
                </div>

                {/* Section Header */}
                <div className="text-center mb-16">
                    <p className="testimonials-label text-accent text-sm uppercase tracking-[0.3em] font-bold mb-4">Testimonios</p>
                    <h2
                        className="testimonials-title text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tight"
                        style={{ fontFamily: 'var(--font-outfit), sans-serif' }}
                    >
                        NUESTROS CLIENTES HABLAN
                    </h2>
                    <p className="testimonials-subtitle text-xl text-zinc-400 max-w-2xl mx-auto">
                        Resultados reales de empresas que confiaron en nosotros
                    </p>
                </div>

                {/* Testimonials */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {testimonials.map((testimonial, i) => (
                        <div
                            key={i}
                            className="testimonial-card relative p-8 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm overflow-hidden"
                            style={{ perspective: '1000px' }}
                        >
                            {/* Decorative quote */}
                            <Quote className="absolute top-6 right-6 w-8 h-8 text-accent/10" />

                            {/* Stars */}
                            <div className="flex gap-1 mb-5">
                                {[...Array(testimonial.rating)].map((_, j) => (
                                    <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                                ))}
                            </div>

                            {/* Quote */}
                            <p className="text-lg text-white/90 mb-6 leading-relaxed italic">
                                &ldquo;{testimonial.quote}&rdquo;
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center border border-accent/20">
                                    <span className="text-accent font-bold text-lg">
                                        {testimonial.author.charAt(0)}
                                    </span>
                                </div>
                                <div>
                                    <div className="font-semibold text-white">{testimonial.author}</div>
                                    <div className="text-sm text-zinc-400">{testimonial.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}

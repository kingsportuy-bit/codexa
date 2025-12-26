"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Star, Users, Rocket, TrendingUp } from "lucide-react";

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
            // Animate metrics
            const metricCards = gsap.utils.toArray<HTMLElement>(".metric-card");
            metricCards.forEach((card, i) => {
                gsap.from(card, {
                    opacity: 0,
                    y: 40,
                    scale: 0.95,
                    duration: 0.8,
                    ease: "power3.out",
                    delay: i * 0.1,
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                });
            });

            // Animate testimonials
            const testimonialCards = gsap.utils.toArray<HTMLElement>(".testimonial-card");
            testimonialCards.forEach((card, i) => {
                gsap.from(card, {
                    opacity: 0,
                    y: 50,
                    duration: 0.8,
                    ease: "power3.out",
                    delay: i * 0.15,
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
        <section ref={containerRef} className="relative py-32 px-4 bg-gradient-to-b from-black via-zinc-950 to-black">
            <div className="max-w-7xl mx-auto">

                {/* Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
                    {metrics.map((metric, i) => {
                        const Icon = metric.icon;
                        return (
                            <div key={i} className="metric-card text-center p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent/20 mb-4">
                                    <Icon className="w-6 h-6 text-accent" />
                                </div>
                                <div className="text-4xl font-bold text-white mb-2">{metric.value}</div>
                                <div className="text-sm text-zinc-400">{metric.label}</div>
                            </div>
                        );
                    })}
                </div>

                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
                        Nuestros clientes hablan
                    </h2>
                    <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                        Resultados reales de empresas que confiaron en nosotros
                    </p>
                </div>

                {/* Testimonials */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {testimonials.map((testimonial, i) => (
                        <div
                            key={i}
                            className="testimonial-card p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm"
                        >
                            {/* Stars */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, j) => (
                                    <Star key={j} className="w-5 h-5 fill-accent text-accent" />
                                ))}
                            </div>

                            {/* Quote */}
                            <p className="text-lg text-white mb-6 leading-relaxed">
                                "{testimonial.quote}"
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
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

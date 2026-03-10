"use client";

import './landing.css';
import { useEffect, useState, useRef, useCallback } from 'react';
import {
    Ban, UserX, Clock, X as XIcon,
    Moon, Smartphone, Bell, Calendar,
    LayoutDashboard, Users, MessageSquare,
    Zap, ArrowRight, ChevronDown, CheckCircle2,
    TrendingUp, ShieldCheck, Star
} from 'lucide-react';
import BarberoxContact from '../barberox11/contacto-popup';

/* ── CountUp hook ── */
function useCountUp(target: number, duration = 2000, start = false) {
    const [value, setValue] = useState(0);
    useEffect(() => {
        if (!start) return;
        let raf: number;
        const t0 = performance.now();
        const tick = (now: number) => {
            const progress = Math.min((now - t0) / duration, 1);
            setValue(Math.floor(progress * target));
            if (progress < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [target, duration, start]);
    return value;
}

/* ── IntersectionObserver hook ── */
function useInView(threshold = 0.3) {
    const ref = useRef<HTMLDivElement>(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
        obs.observe(el);
        return () => obs.disconnect();
    }, [threshold]);
    return [ref, inView] as const;
}

export default function Barberox13Page() {
    const [showContact, setShowContact] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 300);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const reveals = document.querySelectorAll('.b12-reveal');
        const obs = new IntersectionObserver(
            (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
            { threshold: 0.15 }
        );
        reveals.forEach(el => obs.observe(el));
        return () => obs.disconnect();
    }, []);

    const [dashRef, dashInView] = useInView(0.4);
    const atendidos = useCountUp(187, 2200, dashInView);
    const porAtender = useCountUp(43, 2200, dashInView);
    const extraRevenue = useCountUp(25, 2200, dashInView);

    const openContact = useCallback(() => setShowContact(true), []);

    return (
        <div className="relative min-h-screen bg-black text-[#F5F0EB] selection:bg-[#C5A059]/30">

            {/* ═══════ Nav ═══════ */}
            <nav className="fixed top-0 left-0 w-full z-40 px-6 py-5 flex items-center justify-between pointer-events-none"
                style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 100%)' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo-barberox.png" alt="Barberox" className="h-6 object-contain opacity-90 pointer-events-auto" />
                <button
                    onClick={openContact}
                    className={`b12-btn-sm pointer-events-auto transition-all ${scrolled ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
                >
                    Activar ahora
                </button>
            </nav>

            <main className="pt-24 md:pt-32 pb-20 overflow-hidden">

                {/* ═══════════════ 1. HERO ═══════════════ */}
                <section className="b12-section min-h-[85vh] flex items-center">
                    <div className="b12-container">
                        <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">

                            <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left z-10">
                                <p className="text-sm tracking-[0.25em] uppercase text-[#C5A059] mb-6 b12-reveal" style={{ fontWeight: 400 }}>
                                    BARBEROX
                                </p>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl leading-[1.1] uppercase text-[#F5F0EB] mb-6 b12-reveal" style={{ fontFamily: "'Rasputin', serif" }}>
                                    Basta de regalar turnos y tirar plata todos los meses
                                </h1>
                                <p className="text-xl md:text-2xl text-[#C5A059] mb-8 b12-reveal" style={{ fontWeight: 400, fontFamily: "'Rasputin', serif" }}>
                                    La IA que llena tu agenda sola y te hace facturar 20-30% más mientras vos cortás pelo
                                </p>

                                <div className="space-y-4 mb-10 b12-reveal">
                                    <h2 className="text-lg md:text-xl text-[#F5F0EB]" style={{ fontWeight: 400 }}>Tu socio invisible 24/7 por WhatsApp.</h2>
                                    <p className="text-base text-[#8A8A8A]" style={{ fontWeight: 300, lineHeight: 1.6 }}>
                                        Detecta huecos, recupera clientes que se fueron, rankea quién te deja guita de verdad y te avisa TODO.
                                        Sin apps complicadas. Sin perder tiempo en mensajes. Solo más ingresos y menos quilombo.
                                    </p>
                                </div>

                                <div className="b12-reveal flex flex-col sm:flex-row gap-4 items-center lg:items-start">
                                    <button className="b12-btn-cta w-full sm:w-auto justify-center" onClick={openContact}>
                                        Activar ahora (14 días GRATIS)
                                    </button>
                                </div>
                                <p className="mt-5 text-xs tracking-wide text-[#666]" style={{ fontWeight: 300 }}>
                                    Sin tarjeta. Escaneá QR o mandá "QUIERO" por WhatsApp para demo en 2 min.
                                </p>
                            </div>

                            {/* Phone */}
                            <div className="flex justify-center lg:justify-end z-10 b12-reveal">
                                <div className="relative animate-logo-float">
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[500px] bg-[#C5A059]/10 rounded-full blur-[80px] pointer-events-none" />
                                    <div className="b12-phone">
                                        <div className="b12-phone-notch bg-black" />
                                        <div className="b12-phone-header">
                                            <div className="b12-phone-avatar">B</div>
                                            <div>
                                                <div className="b12-phone-name">Barberox IA</div>
                                                <div className="b12-phone-status">en línea</div>
                                            </div>
                                        </div>
                                        <div className="b12-phone-chat">
                                            <div className="b12-bubble b12-bubble-in" style={{ animationDelay: '0.5s', opacity: 0, animationFillMode: 'forwards' }}>
                                                Che Marcos, mañana tenés 9 confirmados, 2 huecos a las 16 y 18.
                                            </div>
                                            <div className="b12-bubble b12-bubble-in" style={{ animationDelay: '2s', opacity: 0, animationFillMode: 'forwards' }}>
                                                Hay 3 clientes grosos que no vienen hace 12 días. ¿Les tiro el horario ahora?
                                            </div>
                                            <div className="b12-bubble b12-bubble-in" style={{ animationDelay: '3.5s', opacity: 0, animationFillMode: 'forwards' }}>
                                                Lucas canceló 17:30 → ya le ofrecí a 2 en lista de espera.
                                            </div>
                                            <div className="b12-bubble b12-bubble-in" style={{ animationDelay: '5s', opacity: 0, animationFillMode: 'forwards' }}>
                                                Marcos tomó el hueco → +$700 cubiertos.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                {/* ═══════════════ TESTIMONIALS (TOP) ═══════════════ */}
                <section className="b12-section-tight bg-[#050505]">
                    <div className="b12-container">
                        <div className="grid md:grid-cols-3 gap-6">
                            {[
                                { name: "Martín", loc: "Montevideo", text: "Casi no pierdo mensajes, la barbería está llena toda la semana. Más plata y menos estrés." },
                                { name: "Lucas", loc: "Buenos Aires", text: "Reduje los faltazos un montón, ahora sé la facturación diaria sin sorpresas." },
                                { name: "Diego", loc: "Córdoba", text: "Todo guardado, ranking de clientes real. No pierdo datos ni guita." }
                            ].map((t, i) => (
                                <div key={i} className="b13-testimonial b12-reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                                    <div className="b13-testimonial-stars">★★★★★</div>
                                    <p className="b13-testimonial-text">"{t.text}"</p>
                                    <div className="b13-testimonial-author">{t.name}</div>
                                    <div className="b13-testimonial-location">{t.loc}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ═══════════════ 2. EL COSTO REAL DEL DESCONTROL ═══════════════ */}
                <section className="b12-section">
                    <div className="b12-container max-w-4xl">
                        <p className="text-center text-sm tracking-[0.2em] uppercase text-[#C5A059] mb-4 b12-reveal">
                            El costo real del descontrol
                        </p>
                        <h2 className="text-center text-3xl md:text-5xl uppercase mb-12 b12-reveal" style={{ fontFamily: "'Rasputin', serif" }}>
                            No es "desorden".<br />Es plata que se te va por la alcantarilla.
                        </h2>

                        <div className="grid md:grid-cols-3 gap-8 mb-16">
                            {[
                                { title: "+$15.000", desc: "Perdidos al mes por solo 1 hueco por día (promedio $500-700)." },
                                { title: "Turno Muerto", desc: "Cancelan y no te enterás. Esa silla queda vacía y vos no facturás." },
                                { title: "$3.000 Fácil", desc: "Lo que perdés cuando un cliente fiel no viene hace 2 semanas." },
                            ].map((item, i) => (
                                <div key={i} className="b12-dashboard text-center b12-reveal" style={{ transitionDelay: `${i * 0.1}s`, padding: '2rem' }}>
                                    <div className="text-2xl text-[#C5A059] mb-3" style={{ fontFamily: "'Rasputin', serif" }}>{item.title}</div>
                                    <p className="text-sm text-[#8A8A8A]" style={{ fontWeight: 300 }}>{item.desc}</p>
                                </div>
                            ))}
                        </div>

                        <p className="text-center text-lg text-[#F5F0EB] mb-10 b12-reveal" style={{ fontWeight: 300 }}>
                            Si seguís dependiendo de tu memoria o de contestar WhatsApp todo el día, tu barbería depende de tu cansancio.
                        </p>

                        <div className="text-center b12-reveal">
                            <button className="b12-btn-cta shadow-[0_0_40px_rgba(232,93,4,0.15)]" onClick={openContact}>
                                Quiero que Barberox empiece a facturarme más YA
                            </button>
                        </div>
                    </div>
                </section>

                <div className="b12-container"><div className="b12-divider" /></div>

                {/* ═══════════════ 3. FEATURES ═══════════════ */}
                <section className="b12-section">
                    <div className="b12-container">
                        <div className="grid md:grid-cols-2 gap-16 items-start">
                            <div className="space-y-2">
                                <p className="text-sm tracking-[0.2em] uppercase text-[#C5A059] mb-4 b12-reveal">
                                    Lo que Barberox hace por vos
                                </p>
                                <h2 className="text-3xl md:text-5xl uppercase leading-[1.05] mb-10 b12-reveal" style={{ fontFamily: "'Rasputin', serif" }}>
                                    Tu asistente personal<br />e inteligente.
                                </h2>

                                <div className="space-y-2 b12-reveal">
                                    {[
                                        { e: "📅", t: "Llena huecos sola", d: "Detecta los horarios que más se caen y los ofrece primero a los que sí vienen." },
                                        { e: "🔄", t: "Recupera clientes perdidos", d: "Le escribe automático a los que faltan hace semanas con el horario ideal." },
                                        { e: "📊", t: "Ranking de clientes + caja clara", d: "Sabés quién te deja plata gorda, quién ocupa silla gratis y cómo vas vs tu meta." },
                                        { e: "💬", t: "Asistente 24/7 en tu WhatsApp", d: "Agenda nocturna, alertas en vivo y control por voz o texto sin abrir nada más." },
                                        { e: "⏰", t: "Horarios pro sin quilombo", d: "Bloqueos y descansos por barbero fácil, sin romper el calendario global." },
                                        { e: "🚀", t: "Onboarding ridículamente fácil", d: "5 minutos: registrás → cargás horarios → escaneás QR → listo." },
                                    ].map((f, i) => (
                                        <div key={i} className="b13-feature-item">
                                            <div className="b13-feature-emoji">{f.e}</div>
                                            <div>
                                                <h3 className="b13-feature-title">{f.t}</h3>
                                                <p className="b13-feature-desc">{f.d}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="sticky top-32 b12-reveal">
                                <div className="b12-dashboard">
                                    <div className="text-center mb-10">
                                        <div className="b13-results-badge mb-6">Resultados típicos en 30 días</div>
                                        <div className="grid grid-cols-2 gap-8">
                                            <div>
                                                <div className="text-4xl text-[#C5A059]" style={{ fontFamily: "'Rasputin', serif" }}>+15</div>
                                                <div className="text-[10px] uppercase tracking-widest text-[#666] mt-2">Turnos extra</div>
                                            </div>
                                            <div>
                                                <div className="text-4xl text-[#C5A059]" style={{ fontFamily: "'Rasputin', serif" }}>-80%</div>
                                                <div className="text-[10px] uppercase tracking-widest text-[#666] mt-2">Ausencias</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6 bg-[#111] rounded-2xl border border-[#1A1A1A]">
                                        <div className="flex items-center gap-3 mb-4">
                                            <TrendingUp className="w-5 h-5 text-[#C5A059]" />
                                            <span className="text-sm font-medium">Meta Mensual</span>
                                        </div>
                                        <div className="h-2 w-full bg-[#222] rounded-full overflow-hidden mb-3">
                                            <div className="h-full bg-[#C5A059] w-[78%]" />
                                        </div>
                                        <div className="flex justify-between text-xs text-[#666]">
                                            <span>Vas al 78%</span>
                                            <span>Faltan $4.200</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ═══════════════ 4. PRECIO ═══════════════ */}
                <section className="b12-section bg-[#050505]">
                    <div className="b12-container">
                        <p className="text-center text-sm tracking-[0.2em] uppercase text-[#C5A059] mb-4 b12-reveal">
                            Inversión
                        </p>
                        <h2 className="text-center text-3xl md:text-5xl uppercase mb-16 b12-reveal" style={{ fontFamily: "'Rasputin', serif" }}>
                            Plan Único de Lanzamiento
                        </h2>

                        <div className="b13-pricing-card b12-reveal">
                            <div className="text-center">
                                <div className="b13-pricing-badge">Solo primeros 50 cupos</div>
                                <div className="b13-pricing-price">$69 <span className="text-xl">USD/mes</span></div>
                                <p className="text-[#8A8A8A] text-sm mb-8">Todo lo que un barbero serio necesita para facturar más en 2026</p>
                            </div>

                            <div className="b13-pricing-includes">
                                <div className="b13-pricing-free-tag">Incluye GRATIS (valor $30/mes extra)</div>
                                <ul className="space-y-4">
                                    {[
                                        "Panel web completo (agenda, clientes, caja)",
                                        "Asistente IA personal ilimitado",
                                        "Resúmenes nocturnos y alertas en vivo",
                                        "Control por audio y voz"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-sm text-[#F5F0EB]">
                                            <CheckCircle2 className="w-4 h-4 text-[#C5A059]" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <button className="b12-btn-cta w-full justify-center mb-6" onClick={openContact}>
                                Activar ahora (14 días GRATIS)
                            </button>

                            <div className="b13-guarantee flex gap-4 items-start">
                                <ShieldCheck className="w-6 h-6 text-[#4ADE80] shrink-0" />
                                <div>
                                    <div className="text-sm font-bold text-[#F5F0EB] mb-1">Garantía anti-riesgo 30 días</div>
                                    <p className="text-xs text-[#8A8A8A] leading-relaxed">
                                        Si en el primer mes NO recuperás al menos 8-10 turnos extra, te devuelvo TODO. Sin vueltas.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ═══════════════ FINAL CTA ═══════════════ */}
                <section className="b12-section">
                    <div className="b12-container text-center max-w-3xl mx-auto">
                        <p className="text-sm tracking-[0.25em] uppercase text-[#C5A059] mb-8 b12-reveal" style={{ fontWeight: 400 }}>
                            BARBEROX
                        </p>
                        <h2 className="text-3xl md:text-5xl uppercase leading-[1.2] mb-10 b12-reveal" style={{ fontFamily: "'Rasputin', serif" }}>
                            Quiero que Barberox empiece a facturarme más YA
                        </h2>
                        <div className="b12-reveal space-y-8">
                            <button className="b12-btn-cta text-xl px-12 py-6" onClick={openContact}>
                                Activar ahora
                            </button>
                            <div className="flex flex-col items-center">
                                <div className="p-4 bg-white rounded-2xl mb-4 w-48 h-48 flex items-center justify-center">
                                    {/* Mock QR Placeholder */}
                                    <div className="grid grid-cols-7 grid-rows-7 gap-1 w-full h-full">
                                        {Array.from({ length: 49 }).map((_, i) => (
                                            <div key={i} className={`rounded-sm ${(i * 7 + (i % 3)) % 2 === 0 ? 'bg-black' : 'bg-gray-50'}`} />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-sm text-[#666]">Escaneá el QR o mandame "QUIERO" por WhatsApp</p>
                            </div>
                        </div>
                    </div>
                </section>


                {/* Footer */}
                <footer className="border-t border-[#1A1A1A] py-8">
                    <div className="b12-container flex justify-between items-center text-sm text-[#666]">
                        <span>Barberox — IA para Barberías</span>
                        <span className="flex items-center gap-1">
                            © 2026{' '}
                            <a href="https://codexa.uy" target="_blank" rel="noopener noreferrer"
                                className="group transition-colors no-underline text-[#666] hover:text-[#F5F0EB]">
                                Code<span className="group-hover:text-[#00CCC2] transition-colors">x</span>a.uy
                            </a>
                        </span>
                    </div>
                </footer>

            </main>

            {/* Sticky Mobile CTA */}
            <div className={`b12-sticky-cta transition-all duration-500 ${scrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <button className="b12-btn-cta w-full justify-center" onClick={openContact}>Activar 14 días GRATIS</button>
            </div>

            {showContact && <BarberoxContact onClose={() => setShowContact(false)} />}
        </div>
    );
}

'use client';
import './landing.css';
import { useEffect, useRef, useCallback, useState } from 'react';

// ── Steps (same as Codexa) ──
const CONTACT_STEPS = [
    { key: "project", prompt: "Contanos sobre tu barbería", placeholder: "¿Cuántos barberos tenés? ¿Dónde estás?" },
    { key: "whatsapp", prompt: "¿Cuál es tu WhatsApp?", placeholder: "+598 99 123 456" },
    { key: "email", prompt: "¿Y tu email?", placeholder: "tu@email.com" },
    { key: "nombre", prompt: "Por último, ¿cuál es tu nombre?", placeholder: "Juan Pérez" },
] as const;

// ── Fullscreen Contact Popup (replica of Codexa ChatWidget) ──
function BarberoxContact({ onClose }: { onClose: () => void }) {
    const [stepIndex, setStepIndex] = useState(0);
    const [input, setInput] = useState("");
    const [phase, setPhase] = useState<"enter" | "visible" | "exit" | "done">("enter");
    const [closing, setClosing] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const formData = useRef<{ mensaje: string; telefono: string; email: string; nombre: string }>({ mensaje: "", telefono: "", email: "", nombre: "" });

    const isDone = stepIndex >= CONTACT_STEPS.length;
    const currentStep = isDone ? null : CONTACT_STEPS[stepIndex];

    useEffect(() => {
        if (phase === "visible" && !isDone) {
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [phase, isDone, stepIndex]);

    useEffect(() => {
        const t = setTimeout(() => setPhase("visible"), 100);
        return () => clearTimeout(t);
    }, []);

    // Block scroll
    useEffect(() => {
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";

        const blockWheel = (e: WheelEvent) => { e.preventDefault(); e.stopPropagation(); };
        const blockTouch = (e: TouchEvent) => { e.preventDefault(); e.stopPropagation(); };
        const blockKey = (e: KeyboardEvent) => {
            const tag = (e.target as HTMLElement)?.tagName;
            if (tag === "INPUT" || tag === "TEXTAREA") return;
            if (["ArrowDown", "ArrowUp", "Space", "PageDown", "PageUp", "Home", "End"].includes(e.code)) {
                e.preventDefault();
            }
        };

        document.addEventListener("wheel", blockWheel, { passive: false, capture: true });
        document.addEventListener("touchmove", blockTouch, { passive: false, capture: true });
        document.addEventListener("keydown", blockKey, { passive: false });

        return () => {
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
            document.removeEventListener("wheel", blockWheel, { capture: true });
            document.removeEventListener("touchmove", blockTouch, { capture: true });
            document.removeEventListener("keydown", blockKey);
        };
    }, []);

    const handleClose = useCallback(() => {
        setClosing(true);
        setTimeout(onClose, 500);
    }, [onClose]);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isDone) return;
        const value = input.trim();
        setInput("");

        if (currentStep?.key === "project") formData.current.mensaje = value;
        if (currentStep?.key === "whatsapp") formData.current.telefono = value;
        if (currentStep?.key === "email") formData.current.email = value;
        if (currentStep?.key === "nombre") formData.current.nombre = value;

        setPhase("exit");
        setTimeout(() => {
            const next = stepIndex + 1;
            setStepIndex(next);
            if (next >= CONTACT_STEPS.length) {
                setPhase("done");
                fetch("/api/contacto", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ...formData.current, nombre_empresa: "Barberox" }),
                }).catch(console.error);
            } else {
                setPhase("enter");
                setTimeout(() => setPhase("visible"), 50);
            }
        }, 400);
    };

    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [handleClose]);

    return (
        <div
            className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-500 backdrop-blur-xl ${closing ? "opacity-0" : "opacity-100"}`}
            style={{ backgroundColor: "rgba(0, 0, 0, 0.95)" }}
        >
            {/* Accent glow behind logo */}
            <div className="absolute top-[18%] left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-[#C5A059]/[0.06] rounded-full blur-[100px] pointer-events-none" />

            {/* Close button */}
            <button
                onClick={handleClose}
                className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 transition-all"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            {/* Center content */}
            <div className={`relative flex flex-col items-center gap-12 px-4 w-full max-w-3xl transition-all duration-500 ${closing ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}>

                {/* Logo */}
                <div className="relative animate-logo-float">
                    {/* Normal Logo */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/logo-barberox.png"
                        alt="Barberox"
                        className="w-[220px] md:w-[320px] h-auto object-contain drop-shadow-[0_0_50px_rgba(197,160,89,0.25)]"
                    />
                    {/* Shine Layer */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/logo-barberox.png"
                        alt=""
                        className="absolute inset-0 w-full h-full object-contain pointer-events-none animate-logo-shine select-none mix-blend-screen opacity-[0.9] drop-shadow-[0_0_15px_rgba(197,160,89,0.5)]"
                        style={{ filter: "brightness(0) invert(1) sepia(1) saturate(5) hue-rotate(5deg) brightness(1.5)" }}
                    />
                </div>

                {/* Prompt text — fades in/out */}
                <div className="min-h-[70px] flex items-center justify-center">
                    {!isDone && currentStep && (
                        <h2
                            className={`text-3xl md:text-5xl text-white/85 text-center tracking-tight transition-all duration-400 ${phase === "enter" ? "opacity-0 translate-y-4" :
                                phase === "visible" ? "opacity-100 translate-y-0" :
                                    phase === "exit" ? "opacity-0 -translate-y-4" : "opacity-0"
                                }`}
                            style={{ fontFamily: "'Rasputin', serif", fontWeight: 300 }}
                        >
                            {currentStep.prompt}
                        </h2>
                    )}

                    {isDone && (
                        <div className={`text-center transition-all duration-700 ${phase === "done" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                            <h2
                                className="text-3xl md:text-5xl text-white/85 mb-3"
                                style={{ fontFamily: "'Rasputin', serif", fontWeight: 300 }}
                            >
                                ¡Gracias! <span className="text-[#C5A059]">Te contactamos pronto</span>
                            </h2>
                            <p className="text-zinc-500 text-sm mt-4">Respuesta en menos de 24 horas</p>
                            <button
                                onClick={handleClose}
                                className="mt-8 px-8 py-3 border border-white/10 text-sm text-white/60 hover:text-white hover:border-white/30 transition-all"
                            >
                                Volver al sitio
                            </button>
                        </div>
                    )}
                </div>

                {/* Input — pill style, no send button */}
                {!isDone && (
                    <div className="w-full max-w-xl">
                        <form onSubmit={submit}>
                            <div className="relative flex items-center bg-white/[0.06] border border-white/[0.12] rounded-full backdrop-blur-sm hover:border-white/20 focus-within:border-[#C5A059]/40 transition-all">
                                <input
                                    ref={inputRef}
                                    type={currentStep?.key === "email" ? "email" : "text"}
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder={currentStep?.placeholder}
                                    className="w-full bg-transparent px-10 py-6 text-white text-lg md:text-xl placeholder:text-white/20 focus:outline-none"
                                    style={{ fontFamily: "'Rasputin', serif" }}
                                    autoComplete={currentStep?.key === "email" ? "email" : "off"}
                                />
                            </div>
                        </form>
                    </div>
                )}

            </div>
        </div>
    );
}

const BarberoxPage = () => {
    const [showContact, setShowContact] = useState(false);

    // ── Analytics ──
    const trackEvent = useCallback((eventName: string, data?: Record<string, unknown>) => {
        try {
            fetch('/api/barberox-analytics', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    event: eventName, ...data,
                    timestamp: new Date().toISOString(),
                    page: '/barberox11'
                })
            });
        } catch { /* silent */ }
    }, []);

    useEffect(() => { trackEvent('page_view'); }, [trackEvent]);

    // ── Reveal on scroll ──
    const observerRef = useRef<IntersectionObserver | null>(null);
    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
            { threshold: 0.1 }
        );
        document.querySelectorAll('.b11-reveal, .b11-phone').forEach(el => observerRef.current?.observe(el));
        return () => observerRef.current?.disconnect();
    }, []);

    return (
        <div>

            {/* ═══════════════ NAV ═══════════════ */}
            <nav className="fixed top-0 w-full z-50 bg-[#0E0E0E]/90 backdrop-blur-sm border-b border-[#2A2A2A]">
                <div className="b11-container flex justify-between items-center h-16">
                    <a href="/barberox11" className="flex items-center">
                        <img src="/logo-barberox.png" alt="Barberox" className="h-6 md:h-8 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity" />
                    </a>
                    <a href="#pricing" className="text-sm tracking-[0.15em] uppercase text-[#8A8A8A] hover:text-[#F5F0EB] transition-colors">
                        Precios
                    </a>
                </div>
            </nav>


            {/* ═══════════════ HERO ═══════════════ */}
            <section className="min-h-screen flex items-center justify-center pt-16">
                <div className="b11-container text-center max-w-4xl mx-auto">
                    <p className="text-[#8A8A8A] text-sm tracking-[0.3em] uppercase mb-12 b11-reveal">
                        Sistema de turnos para barberías
                    </p>
                    <h1 className="text-4xl md:text-7xl lg:text-8xl leading-[1] mb-10 b11-reveal uppercase">
                        No es lo mismo<br />
                        cortar bien que<br />
                        <span className="text-[#C5A059]">manejar bien</span><br />
                        la barbería.
                    </h1>
                    <p className="text-[#8A8A8A] text-lg md:text-xl max-w-xl mx-auto mb-14 leading-relaxed b11-reveal" style={{ fontWeight: 300 }}>
                        Tu WhatsApp agenda clientes solo mientras vos cortás pelo. Más turnos. Menos mensajes. Sin apps.
                    </p>
                    <div className="b11-reveal">
                        <a href="#pricing" className="b11-btn" onClick={() => trackEvent('cta_click', { source: 'hero' })}>
                            Activar mi agenda
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        </a>
                    </div>
                </div>
            </section>


            {/* ═══════════════ DIVIDER ═══════════════ */}
            <div className="b11-container"><div className="b11-divider" /></div>


            {/* ═══════════════ PROBLEM ═══════════════ */}
            <section className="b11-section">
                <div className="b11-container">
                    <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
                        <div className="b11-reveal">
                            <p className="text-[#C5A059] text-sm tracking-[0.2em] uppercase mb-6">El problema</p>
                            <h2 className="text-3xl md:text-5xl leading-[1.05] uppercase">
                                1 turno perdido al día son <span className="text-[#C5A059]">$15.000 al mes</span> tirados.
                            </h2>
                        </div>
                        <div className="b11-reveal pt-2 md:pt-8">
                            <p className="text-[#8A8A8A] text-lg leading-relaxed mb-8" style={{ fontWeight: 300 }}>
                                Cada mensaje sin responder es un cliente que se fue a otra barbería. Si no tenés un sistema que trabaje por vos 24/7, entonces vos sos el sistema. Y los sistemas humanos tienen un límite.
                            </p>
                            <div className="flex gap-12">
                                <div>
                                    <div className="text-3xl text-[#F5F0EB] mb-1">40%</div>
                                    <div className="text-sm text-[#8A8A8A] tracking-wide">abandona el proceso de reserva con apps o links</div>
                                </div>
                                <div>
                                    <div className="text-3xl text-[#F5F0EB] mb-1">2s</div>
                                    <div className="text-sm text-[#8A8A8A] tracking-wide">tiempo de respuesta de Barberox por WhatsApp</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* ═══════════════ DIVIDER ═══════════════ */}
            <div className="b11-container"><div className="b11-divider" /></div>


            {/* ═══════════════ WHAT IT DOES ═══════════════ */}
            <section className="b11-section">
                <div className="b11-container">
                    <p className="text-[#C5A059] text-sm tracking-[0.2em] uppercase mb-6 b11-reveal">La solución</p>
                    <h2 className="text-3xl md:text-5xl leading-[1.05] uppercase mb-20 max-w-3xl b11-reveal">
                        Inteligencia que se siente.
                    </h2>

                    <div className="flex flex-col md:flex-row gap-16 md:gap-20 items-center">
                        {/* Phone mockup — booking flow */}
                        <div className="b11-phone b11-reveal">
                            <div className="b11-phone-notch" />
                            <div className="b11-phone-header">
                                <div className="b11-phone-avatar">B</div>
                                <div>
                                    <div className="b11-phone-name">Barberox</div>
                                    <div className="b11-phone-status">en línea</div>
                                </div>
                            </div>
                            <div className="b11-phone-chat">
                                <div className="b11-bubble b11-bubble-out">
                                    Hola! Quiero cortarme hoy 🙌
                                    <div className="b11-bubble-time">10:00 ✓✓</div>
                                </div>
                                <div className="b11-bubble b11-bubble-in">
                                    ¡Hola crack! 👋 Tengo estos lugares hoy:
                                </div>
                                <div className="b11-bubble b11-bubble-in">
                                    🕐 11:00 — Matías<br />
                                    🕐 14:30 — Franco<br />
                                    🕐 16:00 — Matías
                                </div>
                                <div className="b11-bubble b11-bubble-out">
                                    Dale, 14:30 con Franco
                                    <div className="b11-bubble-time">10:01 ✓✓</div>
                                </div>
                                <div className="b11-bubble b11-bubble-in">
                                    ✅ Listo! Turno confirmado:<br />
                                    📅 Hoy 14:30 con Franco<br />
                                    📍 Barbería Central
                                </div>
                                <div className="b11-bubble b11-bubble-in" style={{ fontSize: '11px', color: '#8A8A8A' }}>
                                    Te notifico 1 hora antes 🔔
                                </div>
                            </div>
                        </div>

                        {/* Features list */}
                        <div className="flex-1">
                            <div className="space-y-12">
                                {[
                                    {
                                        title: 'Agenda automática',
                                        desc: 'Los clientes escriben por WhatsApp como siempre. La IA responde, muestra horarios y confirma el turno. Sin apps, sin links, sin fricción.'
                                    },
                                    {
                                        title: 'Recordatorios inteligentes',
                                        desc: 'Confirmación automática de asistencia por chat. Los clientes responden con un mensaje y el sistema actualiza el turno. Cero faltazos.'
                                    },
                                    {
                                        title: 'Panel de control',
                                        desc: 'Turnos, caja, clientes y ranking de barberos. Todo en un solo lugar, accesible desde cualquier dispositivo.'
                                    }
                                ].map((item, i) => (
                                    <div key={i} className={`b11-reveal ${i > 0 ? 'pt-12 border-t border-[#2A2A2A]' : ''}`}>
                                        <h3 className="text-xl uppercase tracking-wide mb-4 text-[#F5F0EB]">{item.title}</h3>
                                        <p className="text-[#8A8A8A] leading-relaxed" style={{ fontWeight: 300 }}>{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* ═══════════════ DIVIDER ═══════════════ */}
            <div className="b11-container"><div className="b11-divider" /></div>


            {/* ═══════════════ HOW IT WORKS ═══════════════ */}
            <section className="b11-section">
                <div className="b11-container">
                    <div className="flex flex-col md:flex-row gap-16 md:gap-20 items-center">
                        {/* Steps */}
                        <div className="flex-1 max-w-lg">
                            <p className="text-[#C5A059] text-sm tracking-[0.2em] uppercase mb-6 b11-reveal">Cómo funciona</p>
                            <h2 className="text-3xl md:text-5xl leading-[1.05] uppercase mb-20 b11-reveal">
                                Tres pasos. Diez minutos.
                            </h2>

                            <div className="space-y-16">
                                {[
                                    { num: '01', title: 'Escaneás el QR', desc: 'Conectás tu WhatsApp de la barbería en segundos.' },
                                    { num: '02', title: 'Cargamos tus horarios', desc: 'Definimos turnos, servicios, barberos y días de trabajo.' },
                                    { num: '03', title: 'Empieza a agendar solo', desc: 'Los clientes reservan aunque estés cortando. Vos solo cortás.' }
                                ].map((step, i) => (
                                    <div key={i} className="b11-reveal flex gap-8 items-start">
                                        <span className="text-5xl text-[#2A2A2A] leading-none shrink-0" style={{ fontWeight: 300 }}>{step.num}</span>
                                        <div>
                                            <h3 className="text-xl uppercase tracking-wide mb-2">{step.title}</h3>
                                            <p className="text-[#8A8A8A]" style={{ fontWeight: 300 }}>{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Phone mockup — reminder flow */}
                        <div className="b11-phone b11-reveal" style={{ animationDelay: '3s' }}>
                            <div className="b11-phone-notch" />
                            <div className="b11-phone-header">
                                <div className="b11-phone-avatar">B</div>
                                <div>
                                    <div className="b11-phone-name">Barberox</div>
                                    <div className="b11-phone-status">en línea</div>
                                </div>
                            </div>
                            <div className="b11-phone-chat">
                                <div className="b11-bubble b11-bubble-in">
                                    🔔 Recordatorio: Mañana tenés turno a las 14:30 con Franco.
                                </div>
                                <div className="b11-bubble b11-bubble-in">
                                    ¿Confirmás asistencia? Respondé:<br />
                                    ✅ <strong>Sí</strong> &nbsp; ❌ <strong>No</strong>
                                </div>
                                <div className="b11-bubble b11-bubble-out">
                                    Sí
                                    <div className="b11-bubble-time">21:15 ✓✓</div>
                                </div>
                                <div className="b11-bubble b11-bubble-in">
                                    ✅ Perfecto, quedás confirmado.<br />
                                    Te esperamos mañana a las 14:30 💈
                                </div>
                                <div className="b11-bubble b11-bubble-in" style={{ fontSize: '11px', color: '#8A8A8A' }}>
                                    Si necesitás cancelar, avisame por acá.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* ═══════════════ FULL-WIDTH CTA ═══════════════ */}
            <section className="bg-[#161616] b11-section-tight">
                <div className="b11-container text-center">
                    <h2 className="text-2xl md:text-4xl uppercase mb-8 b11-reveal">
                        Tu barbería merece un sistema que <span className="text-[#C5A059]">trabaje solo.</span>
                    </h2>
                    <div className="b11-reveal">
                        <a href="#pricing" className="b11-btn" onClick={() => trackEvent('cta_click', { source: 'mid' })}>
                            Ver plan de lanzamiento
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        </a>
                    </div>
                </div>
            </section>


            {/* ═══════════════ BONUSES ═══════════════ */}
            <section className="b11-section">
                <div className="b11-container">
                    <p className="text-[#C5A059] text-sm tracking-[0.2em] uppercase mb-6 b11-reveal">Incluido en el lanzamiento</p>
                    <h2 className="text-3xl md:text-5xl leading-[1.05] uppercase mb-20 max-w-3xl b11-reveal">
                        Dos herramientas que otros cobran aparte.
                    </h2>

                    <div className="grid md:grid-cols-2 gap-px bg-[#2A2A2A]">
                        <div className="bg-[#0E0E0E] p-10 md:p-14 b11-reveal">
                            <div className="text-sm text-[#C5A059] tracking-[0.2em] uppercase mb-6">Regalo #1 — Valor: 20 USD/mes</div>
                            <h3 className="text-2xl uppercase tracking-wide mb-4">Panel Web</h3>
                            <p className="text-[#8A8A8A] leading-relaxed mb-8" style={{ fontWeight: 300 }}>
                                Base de datos profesional, sistema de puntajes, ranking de barberos y acceso multi-dispositivo. Controlá tu barbería desde cualquier lugar.
                            </p>
                            <span className="text-sm text-[#C5A059] tracking-[0.15em] uppercase">Gratis con tu plan</span>
                        </div>
                        <div className="bg-[#0E0E0E] p-10 md:p-14 b11-reveal">
                            <div className="text-sm text-[#C5A059] tracking-[0.2em] uppercase mb-6">Regalo #2 — Valor: 10 USD/mes</div>
                            <h3 className="text-2xl uppercase tracking-wide mb-4">Asistente IA</h3>
                            <p className="text-[#8A8A8A] leading-relaxed mb-8" style={{ fontWeight: 300 }}>
                                Bloqueos por audio, resumen nocturno, notificaciones en vivo y control de ausentismo. Tu mano derecha digital.
                            </p>
                            <span className="text-sm text-[#C5A059] tracking-[0.15em] uppercase">Gratis con tu plan</span>
                        </div>
                    </div>
                </div>
            </section>


            {/* ═══════════════ DIVIDER ═══════════════ */}
            <div className="b11-container"><div className="b11-divider" /></div>


            {/* ═══════════════ TESTIMONIALS ═══════════════ */}
            <section className="b11-section">
                <div className="b11-container max-w-3xl">
                    <p className="text-[#C5A059] text-sm tracking-[0.2em] uppercase mb-16 b11-reveal">Lo que dicen</p>

                    <div className="space-y-20">
                        {[
                            {
                                text: 'Antes vivía con el WhatsApp explotado y anotando turnos en una libreta. Desde que activé la agenda automática casi no pierdo mensajes y tengo la barbería llena toda la semana.',
                                name: 'Martín',
                                loc: 'Montevideo'
                            },
                            {
                                text: 'Lo que más me sorprendió es que los clientes contestan solos a los recordatorios. Bajaron muchísimo los faltazos y sé exactamente cuánto facturé cada día.',
                                name: 'Lucas',
                                loc: 'Buenos Aires'
                            },
                            {
                                text: 'Yo no soy de andar con computadoras, pero acá todo pasa por WhatsApp. Cambio de celular y no pierdo nada: clientes, citas ni caja.',
                                name: 'Diego',
                                loc: 'Córdoba'
                            }
                        ].map((t, i) => (
                            <blockquote key={i} className="b11-reveal">
                                <p className="text-xl md:text-2xl leading-relaxed text-[#F5F0EB] mb-6" style={{ fontWeight: 300 }}>
                                    &ldquo;{t.text}&rdquo;
                                </p>
                                <footer className="text-sm text-[#8A8A8A] tracking-wide">
                                    {t.name} — {t.loc}
                                </footer>
                            </blockquote>
                        ))}
                    </div>
                </div>
            </section>


            {/* ═══════════════ DIVIDER ═══════════════ */}
            <div className="b11-container"><div className="b11-divider" /></div>


            {/* ═══════════════ FOR WHOM ═══════════════ */}
            <section className="b11-section">
                <div className="b11-container">
                    <h2 className="text-3xl md:text-5xl leading-[1.05] uppercase mb-20 b11-reveal">
                        Esto no es para<br />todo el mundo.
                    </h2>

                    <div className="grid md:grid-cols-2 gap-16 md:gap-24">
                        <div className="b11-reveal">
                            <h3 className="text-sm tracking-[0.2em] uppercase text-[#8A8A8A] mb-8">Para quién es</h3>
                            <ul className="space-y-5">
                                <li className="flex items-start gap-4">
                                    <span className="text-[#C5A059] mt-1">—</span>
                                    <span className="text-[#F5F0EB]" style={{ fontWeight: 300 }}>Barberías que quieren escalar y dejar de ser esclavos del negocio.</span>
                                </li>
                                <li className="flex items-start gap-4">
                                    <span className="text-[#C5A059] mt-1">—</span>
                                    <span className="text-[#F5F0EB]" style={{ fontWeight: 300 }}>Dueños que valoran su tiempo y buscan profesionalismo real.</span>
                                </li>
                            </ul>
                        </div>
                        <div className="b11-reveal">
                            <h3 className="text-sm tracking-[0.2em] uppercase text-[#8A8A8A] mb-8">Para quién no es</h3>
                            <ul className="space-y-5">
                                <li className="flex items-start gap-4">
                                    <span className="text-[#8A8A8A] mt-1">—</span>
                                    <span className="text-[#8A8A8A]" style={{ fontWeight: 300 }}>Barberos que prefieren la libreta y el desorden.</span>
                                </li>
                                <li className="flex items-start gap-4">
                                    <span className="text-[#8A8A8A] mt-1">—</span>
                                    <span className="text-[#8A8A8A]" style={{ fontWeight: 300 }}>Negocios sin ambición que se conforman con lo que hay.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>


            {/* ═══════════════ DIVIDER ═══════════════ */}
            <div className="b11-container"><div className="b11-divider" /></div>


            {/* ═══════════════ FAQ ═══════════════ */}
            <section className="b11-section">
                <div className="b11-container max-w-2xl">
                    <h2 className="text-3xl md:text-4xl uppercase mb-16 b11-reveal">Preguntas frecuentes</h2>

                    <div className="space-y-0">
                        {[
                            { q: '¿Qué pasa si ya tengo un sistema para barbería?', a: 'Podés seguir usándolo. Barberox se encarga de la agenda automática por WhatsApp y la recepción con IA.' },
                            { q: '¿Pierdo mis datos si cambio de celular?', a: 'No. Todo queda en la base de datos de tu barbería, no en tu WhatsApp.' },
                            { q: '¿Es difícil de activarlo?', a: 'No. Te ayudamos a activarlo y dejarlo andando en menos de 24 horas.' }
                        ].map((faq, i) => (
                            <details key={i} className="group border-b border-[#2A2A2A] b11-reveal">
                                <summary className="flex justify-between items-center py-6 cursor-pointer text-lg">
                                    <span>{faq.q}</span>
                                    <span className="text-[#8A8A8A] transition group-open:rotate-45 text-2xl leading-none">+</span>
                                </summary>
                                <div className="pb-6 text-[#8A8A8A]" style={{ fontWeight: 300 }}>{faq.a}</div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>


            {/* ═══════════════ PRICING ═══════════════ */}
            <section id="pricing" className="b11-section bg-[#161616]">
                <div className="b11-container max-w-xl text-center">
                    <p className="text-[#C5A059] text-sm tracking-[0.2em] uppercase mb-6 b11-reveal">Plan de lanzamiento</p>
                    <h2 className="text-3xl md:text-5xl uppercase mb-4 b11-reveal">Únete a la élite.</h2>
                    <p className="text-[#8A8A8A] mb-12 b11-reveal" style={{ fontWeight: 300 }}>
                        50 cupos de lanzamiento con regalos incluidos.
                    </p>

                    <div className="bg-[#0E0E0E] border border-[#2A2A2A] p-10 md:p-14 b11-reveal">
                        <div className="text-6xl md:text-7xl text-[#F5F0EB] mb-2">69 <span className="text-xl text-[#8A8A8A]">USD/mes</span></div>

                        <div className="b11-divider my-8" />

                        <ul className="text-left space-y-4 mb-10">
                            {[
                                'Agenda Smart 24/7',
                                'Asistente IA Personal — Gratis',
                                'Panel Web + Base de Datos — Gratis'
                            ].map((f, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <span className="text-[#C5A059]">—</span>
                                    <span style={{ fontWeight: 300 }}>{f}</span>
                                </li>
                            ))}
                        </ul>

                        <button
                            className="b11-btn w-full justify-center"
                            onClick={() => {
                                trackEvent('cta_click', { source: 'pricing' });
                                if (typeof window.fbq === 'function') {
                                    window.fbq('track', 'Purchase', { currency: 'USD', value: 69 });
                                }
                                setShowContact(true);
                            }}
                        >
                            Activar mi agenda automática
                        </button>

                        <p className="text-sm text-[#8A8A8A] mt-6" style={{ fontWeight: 300 }}>Garantía de 30 días. Sin riesgo.</p>
                    </div>
                </div>
            </section>


            {/* ═══════════════ FINAL CTA ═══════════════ */}
            <section className="b11-section">
                <div className="b11-container text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-6xl uppercase mb-8 b11-reveal">
                        Dejá de ser la secretaria<br />de tu barbería.
                    </h2>
                    <p className="text-[#8A8A8A] text-lg mb-12 b11-reveal" style={{ fontWeight: 300 }}>
                        Activá hoy y en 10 minutos tu WhatsApp agenda solo.
                    </p>
                    <div className="b11-reveal">
                        <button
                            className="b11-btn"
                            onClick={() => { trackEvent('cta_click', { source: 'final' }); setShowContact(true); }}
                        >
                            Quiero activar mi agenda
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        </button>
                    </div>
                </div>
            </section>


            {/* ═══════════════ FOOTER ═══════════════ */}
            <footer className="border-t border-[#2A2A2A] py-8">
                <div className="b11-container flex justify-between items-center text-sm text-[#8A8A8A]">
                    <span>Barberox</span>
                    <span className="flex items-center gap-1">
                        © 2026
                        <a
                            href="https://codexa.uy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group transition-colors no-underline text-[#8A8A8A] hover:text-[#F5F0EB]"
                        >
                            Code<span className="group-hover:text-[#00CCC2] transition-colors">x</span>a.uy
                        </a>
                    </span>
                </div>
            </footer>

            {/* ═══════════════ CONTACT POPUP ═══════════════ */}
            {showContact && <BarberoxContact onClose={() => setShowContact(false)} />}

        </div>
    );
};

export default BarberoxPage;

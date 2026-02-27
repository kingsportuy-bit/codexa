"use client";

import './landing.css';
import { useEffect, useState, useRef, useCallback } from 'react';
import {
    Ban, UserX, Clock, CalendarCheck, X as XIcon, RefreshCw,
    Moon, Smartphone, Bell, CalendarDays, AlarmClock, Calendar,
    LayoutDashboard, Lock, Users, DollarSign, MessageSquare, Hand,
    ScanLine, ClipboardList, Zap, ArrowRight, ChevronDown
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

export default function Barberox12Page() {
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
    const plataReal = useCountUp(2400, 2200, dashInView);
    const plataEst = useCountUp(3200, 2200, dashInView);

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
                    Activar IA
                </button>
            </nav>

            <main className="pt-24 md:pt-32 pb-20 overflow-hidden">

                {/* ═══════════════ 1. HERO ═══════════════ */}
                <section className="b12-section min-h-[85vh] flex items-center">
                    <div className="b12-container">
                        <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">

                            <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left z-10">
                                <p className="text-sm tracking-[0.25em] uppercase text-[#C5A059] mb-6 b12-reveal" style={{ fontWeight: 400 }}>
                                    BARBEROX
                                </p>
                                <h1 className="text-4xl md:text-6xl leading-[1.1] uppercase text-[#F5F0EB] mb-6 b12-reveal" style={{ fontFamily: "'Rasputin', serif" }}>
                                    IA para barberías<br />por WhatsApp.
                                </h1>
                                <p className="text-base md:text-lg text-[#8A8A8A] mb-4 b12-reveal" style={{ fontWeight: 300, lineHeight: 1.6 }}>
                                    Te cancelan. No vienen. Te queda el hueco.
                                </p>
                                <p className="text-base md:text-lg text-[#8A8A8A] mb-10 b12-reveal" style={{ fontWeight: 300, lineHeight: 1.6 }}>
                                    Barberox te avisa todo, te ordena el día y te muestra la plata del mes. Se hace solo.
                                </p>

                                <div className="b12-reveal flex flex-col sm:flex-row gap-4 items-center lg:items-start">
                                    <button className="b12-btn w-full sm:w-auto justify-center shadow-[0_0_40px_rgba(197,160,89,0.15)]" onClick={openContact}>
                                        Activar Barberox en mi WhatsApp
                                    </button>
                                    <button className="b12-btn-outline w-full sm:w-auto justify-center" onClick={openContact}>
                                        Ver demo por WhatsApp
                                    </button>
                                </div>
                                <p className="mt-5 text-xs tracking-wide text-[#666]" style={{ fontWeight: 300 }}>
                                    Activación en 5 minutos. Panel web incluido. Cancelás cuando quieras.
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
                                                <div className="b12-phone-name">Barberox</div>
                                                <div className="b12-phone-status">en línea</div>
                                            </div>
                                        </div>
                                        <div className="b12-phone-chat">
                                            <div className="b12-bubble b12-bubble-in" style={{ animationDelay: '0.5s', opacity: 0, animationFillMode: 'forwards' }}>
                                                Lucas canceló el turno de las 17:30.
                                                <br />Ya le ofrecí el hueco a 2 clientes en espera.
                                            </div>
                                            <div className="b12-bubble b12-bubble-in" style={{ animationDelay: '2s', opacity: 0, animationFillMode: 'forwards' }}>
                                                Marcos tomó las 17:30.
                                                <br />Hueco cubierto.
                                            </div>
                                            <div className="b12-bubble b12-bubble-in" style={{ animationDelay: '3.5s', opacity: 0, animationFillMode: 'forwards' }}>
                                                Agenda de mañana:
                                                <br />8 turnos confirmados
                                                <br />1 pendiente de confirmar
                                                <br />0 huecos
                                            </div>
                                            <div className="b12-bubble b12-bubble-in" style={{ animationDelay: '5.5s', opacity: 0, animationFillMode: 'forwards' }}>
                                                Mes: USD 2.400 facturado
                                                <br />Meta: USD 3.500 — vas al 69%
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>


                {/* ═══════════════ 2. EL COSTO DEL CAOS ═══════════════ */}
                <section className="b12-section-tight">
                    <div className="b12-container max-w-4xl">
                        <p className="text-center text-sm tracking-[0.2em] uppercase text-[#C5A059] mb-4 b12-reveal">
                            El costo del caos
                        </p>
                        <h2 className="text-center text-3xl md:text-5xl uppercase mb-20 b12-reveal" style={{ fontFamily: "'Rasputin', serif" }}>
                            No es desorden.<br />Es plata que se te va.
                        </h2>

                        {/* Minimal list — no cards */}
                        <div className="space-y-10 mb-16">
                            {[
                                { Icon: Ban, text: 'Cancelan y el turno muere ahí.' },
                                { Icon: UserX, text: 'No vienen y vos igual perdiste la hora.' },
                                { Icon: Clock, text: 'Te enterás tarde y ya no lo recuperás.' },
                            ].map(({ Icon, text }, i) => (
                                <div key={i} className="b12-reveal flex items-center gap-6 py-6 border-b border-[#1A1A1A]" style={{ transitionDelay: `${i * 0.1}s` }}>
                                    <Icon className="w-5 h-5 text-[#C5A059] shrink-0" strokeWidth={1.5} />
                                    <p className="text-[#F5F0EB] text-lg" style={{ fontWeight: 300 }}>{text}</p>
                                </div>
                            ))}
                        </div>

                        <p className="text-center text-[#8A8A8A] text-sm b12-reveal" style={{ fontWeight: 300 }}>
                            Si tu barbería depende de tu memoria, depende de tu desgaste.
                        </p>
                        <div className="text-center mt-10 b12-reveal">
                            <button className="b12-btn-outline" onClick={openContact}>Quiero control</button>
                        </div>
                    </div>
                </section>


                <div className="b12-container"><div className="b12-divider" /></div>


                {/* ═══════════════ 3. BARBEROX EN TU DÍA ═══════════════ */}
                <section className="b12-section">
                    <div className="b12-container max-w-3xl">
                        <p className="text-center text-sm tracking-[0.2em] uppercase text-[#C5A059] mb-4 b12-reveal">
                            Barberox en tu día
                        </p>
                        <h2 className="text-center text-3xl md:text-5xl uppercase mb-20 b12-reveal" style={{ fontFamily: "'Rasputin', serif" }}>
                            Te llega al WhatsApp<br />cuando importa.
                        </h2>

                        {/* Notification-style list, no boxed cards */}
                        <div className="space-y-0">
                            {[
                                { Icon: CalendarCheck, label: 'Turno agendado', desc: 'te avisa.' },
                                { Icon: XIcon, label: 'Turno cancelado', desc: 'te avisa.' },
                                { Icon: RefreshCw, label: 'Turno re-agendado', desc: 'te confirma.' },
                                { Icon: Moon, label: 'Noche', desc: 'te manda la agenda de mañana.' },
                                { Icon: Smartphone, label: 'Durante el día', desc: 'te avisa si cambió algo.' },
                                { Icon: Bell, label: 'Antes del turno', desc: '"sigue este cliente".' },
                            ].map(({ Icon, label, desc }, i) => (
                                <div key={i} className="b12-reveal flex items-center gap-5 py-5 border-b border-[#1A1A1A]" style={{ transitionDelay: `${i * 0.06}s` }}>
                                    <Icon className="w-4 h-4 text-[#C5A059] shrink-0" strokeWidth={1.5} />
                                    <span className="text-[#F5F0EB] text-sm">{label}</span>
                                    <span className="text-[#666] text-sm">→</span>
                                    <span className="text-[#8A8A8A] text-sm" style={{ fontWeight: 300 }}>{desc}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>


                <div className="b12-container"><div className="b12-divider" /></div>


                {/* ═══════════════ 4. MENOS AUSENTISMOS ═══════════════ */}
                <section className="b12-section">
                    <div className="b12-container max-w-3xl">
                        <p className="text-center text-sm tracking-[0.2em] uppercase text-[#C5A059] mb-4 b12-reveal">
                            Menos ausentismos
                        </p>
                        <h2 className="text-center text-3xl md:text-5xl uppercase mb-20 b12-reveal" style={{ fontFamily: "'Rasputin', serif" }}>
                            El cliente se olvida.<br />Vos no.
                        </h2>

                        <div className="grid md:grid-cols-2 gap-16 mb-12">
                            <div className="b12-reveal text-center md:text-left">
                                <CalendarDays className="w-6 h-6 text-[#C5A059] mx-auto md:mx-0 mb-4" strokeWidth={1.5} />
                                <h3 className="text-lg uppercase tracking-wide text-[#F5F0EB] mb-3" style={{ fontFamily: "'Rasputin', serif" }}>
                                    1 día antes
                                </h3>
                                <p className="text-sm text-[#8A8A8A]" style={{ fontWeight: 300 }}>Confirmación de asistencia.</p>
                            </div>
                            <div className="b12-reveal text-center md:text-left" style={{ transitionDelay: '0.1s' }}>
                                <AlarmClock className="w-6 h-6 text-[#C5A059] mx-auto md:mx-0 mb-4" strokeWidth={1.5} />
                                <h3 className="text-lg uppercase tracking-wide text-[#F5F0EB] mb-3" style={{ fontFamily: "'Rasputin', serif" }}>
                                    2 horas antes
                                </h3>
                                <p className="text-sm text-[#8A8A8A]" style={{ fontWeight: 300 }}>Recordatorio final.</p>
                            </div>
                        </div>

                        <p className="text-center text-[#8A8A8A] text-sm b12-reveal" style={{ fontWeight: 300 }}>
                            Menos ausencias. Menos huecos. Menos vueltas.
                        </p>
                    </div>
                </section>


                {/* CTA */}
                <section className="b12-section-tight">
                    <div className="b12-container text-center b12-reveal">
                        <button className="b12-btn shadow-[0_0_40px_rgba(197,160,89,0.15)]" onClick={openContact}>
                            Activar Barberox en mi WhatsApp
                        </button>
                    </div>
                </section>


                <div className="b12-container"><div className="b12-divider" /></div>


                {/* ═══════════════ 5. AGENDA QUE SE ACOMODA SOLA ═══════════════ */}
                <section className="b12-section">
                    <div className="b12-container">
                        <div className="grid md:grid-cols-2 gap-16 items-center">
                            <div>
                                <p className="text-sm tracking-[0.2em] uppercase text-[#C5A059] mb-4 b12-reveal">
                                    Agenda inteligente
                                </p>
                                <h2 className="text-3xl md:text-5xl uppercase leading-[1.05] mb-10 b12-reveal" style={{ fontFamily: "'Rasputin', serif" }}>
                                    Primero rellena<br />lo difícil.
                                </h2>
                                <p className="text-[#8A8A8A] mb-4 b12-reveal" style={{ fontWeight: 300, lineHeight: 1.7 }}>
                                    Barberox sugiere primero los horarios que más se caen.
                                </p>
                                <p className="text-[#8A8A8A] b12-reveal" style={{ fontWeight: 300, lineHeight: 1.7 }}>
                                    Y si un cliente fiel hace días no agenda, le escribe y le ofrece horarios tranquilos.
                                </p>
                            </div>

                            {/* Calendar visual */}
                            <div className="b12-reveal flex justify-center">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-[#C5A059]/5 rounded-3xl blur-[50px] pointer-events-none" />
                                    <div className="relative bg-[#0A0A0A] border border-[#1A1A1A] rounded-2xl p-6 w-[280px]">
                                        <div className="text-xs uppercase tracking-widest text-[#666] mb-4">Febrero 2026</div>
                                        <div className="grid grid-cols-7 gap-2 text-center text-xs mb-5">
                                            {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((d, i) => (
                                                <span key={i} className="text-[#555]">{d}</span>
                                            ))}
                                            {Array.from({ length: 28 }, (_, i) => i + 1).map(d => (
                                                <span key={d}
                                                    className={`py-1 rounded-md text-[#666] ${d === 14 || d === 21 ? 'bg-[#C5A059]/20 text-[#C5A059]' : ''} ${d === 15 || d === 22 ? 'bg-[#C5A059]/10 text-[#C5A059]/70' : ''}`}
                                                >
                                                    {d}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="bg-[#111] rounded-xl p-3 text-xs text-[#8A8A8A]" style={{ fontFamily: '-apple-system, system-ui, sans-serif' }}>
                                            <span className="text-[#C5A059]">Barberox:</span> Marcos, te propongo 16:00 o 18:30?
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                <div className="b12-container"><div className="b12-divider" /></div>


                {/* ═══════════════ 6. CAJA Y MES CLARO ═══════════════ */}
                <section className="b12-section">
                    <div className="b12-container">
                        <p className="text-center text-sm tracking-[0.2em] uppercase text-[#C5A059] mb-4 b12-reveal">
                            Caja y mes claro
                        </p>
                        <h2 className="text-center text-3xl md:text-5xl uppercase mb-20 b12-reveal" style={{ fontFamily: "'Rasputin', serif" }}>
                            El mes deja de ser<br />una sorpresa.
                        </h2>

                        <div ref={dashRef} className="b12-dashboard b12-reveal">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
                                <div>
                                    <div className="b12-metric-value">{atendidos}</div>
                                    <div className="b12-metric-label">Atendidos</div>
                                </div>
                                <div>
                                    <div className="b12-metric-value">{porAtender}</div>
                                    <div className="b12-metric-label">Por atender</div>
                                </div>
                                <div>
                                    <div className="b12-metric-value">USD {plataReal.toLocaleString()}</div>
                                    <div className="b12-metric-label">Plata real</div>
                                </div>
                                <div>
                                    <div className="b12-metric-value text-[#C5A059]">USD {plataEst.toLocaleString()}</div>
                                    <div className="b12-metric-label">Plata estimada</div>
                                </div>
                            </div>
                        </div>

                        <p className="text-center text-[#8A8A8A] text-sm mt-10 b12-reveal" style={{ fontWeight: 300 }}>
                            A principio de mes te pregunta la meta. Después le preguntás &quot;¿cómo vamos?&quot; y te contesta.
                        </p>
                        <div className="text-center mt-10 b12-reveal">
                            <button className="b12-btn-outline" onClick={openContact}>Ver demo</button>
                        </div>
                    </div>
                </section>


                <div className="b12-container"><div className="b12-divider" /></div>


                {/* ═══════════════ 7. PANEL WEB ═══════════════ */}
                <section className="b12-section">
                    <div className="b12-container">
                        <div className="grid md:grid-cols-2 gap-16 items-center">
                            <div>
                                <p className="text-sm tracking-[0.2em] uppercase text-[#C5A059] mb-4 b12-reveal">
                                    Panel web
                                </p>
                                <h2 className="text-3xl md:text-5xl uppercase leading-[1.05] mb-10 b12-reveal" style={{ fontFamily: "'Rasputin', serif" }}>
                                    WhatsApp manda.<br />El panel ordena.
                                </h2>

                                <ul className="space-y-5 b12-reveal">
                                    {[
                                        { Icon: Calendar, text: 'Ver agenda y calendario.' },
                                        { Icon: Lock, text: 'Bloquear horas y días.' },
                                        { Icon: Users, text: 'Ver clientes y caja.' },
                                        { Icon: MessageSquare, text: 'Revisar charlas.' },
                                        { Icon: Hand, text: 'Modo manual cuando quieras.' },
                                    ].map(({ Icon, text }, i) => (
                                        <li key={i} className="flex items-center gap-4 text-[#8A8A8A]" style={{ fontWeight: 300 }}>
                                            <Icon className="w-4 h-4 text-[#C5A059] shrink-0" strokeWidth={1.5} />
                                            {text}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Panel mockup */}
                            <div className="b12-reveal flex justify-center">
                                <div className="relative bg-[#0A0A0A] border border-[#1A1A1A] rounded-2xl p-6 w-full max-w-[380px]">
                                    <div className="flex items-center gap-2 mb-5">
                                        <div className="w-2 h-2 rounded-full bg-[#ff5f57]" />
                                        <div className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
                                        <div className="w-2 h-2 rounded-full bg-[#28ca42]" />
                                        <span className="text-[10px] text-[#555] ml-3 tracking-wide">panel.barberox.com</span>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-12 flex flex-col gap-3 py-2">
                                            {[ClipboardList, Calendar, Users, DollarSign, MessageSquare].map((Icon, i) => (
                                                <div key={i} className={`flex justify-center py-1.5 rounded-lg ${i === 0 ? 'bg-[#C5A059]/10' : ''}`}>
                                                    <Icon className={`w-3.5 h-3.5 ${i === 0 ? 'text-[#C5A059]' : 'text-[#555]'}`} strokeWidth={1.5} />
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex-1 bg-[#111] rounded-xl p-4">
                                            <div className="text-[10px] text-[#555] uppercase tracking-wider mb-3">Agenda — Hoy</div>
                                            {[
                                                { time: '10:00', name: 'Marcos', done: true },
                                                { time: '11:00', name: 'Juan', done: true },
                                                { time: '12:00', name: 'Diego', done: false },
                                                { time: '14:00', name: '— libre —', done: false },
                                            ].map((slot, i) => (
                                                <div key={i} className="flex items-center justify-between py-1.5 border-b border-[#1A1A1A] last:border-0 text-[11px]">
                                                    <span className="text-[#555] w-10">{slot.time}</span>
                                                    <span className={`flex-1 ${slot.name === '— libre —' ? 'text-[#555]' : 'text-[#8A8A8A]'}`}>{slot.name}</span>
                                                    {slot.done && <span className="text-[#C5A059] text-[10px]">✓</span>}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                <div className="b12-container"><div className="b12-divider" /></div>


                {/* ═══════════════ 8. ACTIVACIÓN ═══════════════ */}
                <section className="b12-section">
                    <div className="b12-container">
                        <p className="text-center text-sm tracking-[0.2em] uppercase text-[#C5A059] mb-4 b12-reveal">
                            Activación
                        </p>
                        <h2 className="text-center text-3xl md:text-5xl uppercase mb-20 b12-reveal" style={{ fontFamily: "'Rasputin', serif" }}>
                            Se activa rápido.<br />Se nota el mismo día.
                        </h2>

                        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
                            <div className="space-y-10">
                                {[
                                    { num: '01', title: 'Registrás tu barbería', desc: 'Nombre, sucursales, barberos.' },
                                    { num: '02', title: 'Cargás lo básico', desc: 'Horarios, servicios, días libres.' },
                                    { num: '03', title: 'Escaneás el QR y listo', desc: 'Barberox queda en tu WhatsApp y empieza a trabajar.' },
                                ].map((step, i) => (
                                    <div key={i} className={`b12-reveal flex gap-8 items-start ${i > 0 ? 'pt-10 border-t border-[#1A1A1A]' : ''}`}>
                                        <span className="text-5xl text-[#1A1A1A] leading-none shrink-0" style={{ fontWeight: 300 }}>{step.num}</span>
                                        <div>
                                            <h3 className="text-xl uppercase tracking-wide mb-2" style={{ fontFamily: "'Rasputin', serif" }}>{step.title}</h3>
                                            <p className="text-[#8A8A8A] text-sm" style={{ fontWeight: 300 }}>{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* QR */}
                            <div className="flex flex-col items-center b12-reveal">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-[#C5A059]/5 rounded-3xl blur-[60px] pointer-events-none" />
                                    <div className="relative bg-white rounded-3xl p-10 w-[260px] h-[260px] flex items-center justify-center">
                                        <div className="grid grid-cols-7 grid-rows-7 gap-[3px] w-[180px] h-[180px]">
                                            {Array.from({ length: 49 }).map((_, i) => {
                                                const row = Math.floor(i / 7);
                                                const col = i % 7;
                                                const isCorner = (row < 3 && col < 3) || (row < 3 && col > 3) || (row > 3 && col < 3);
                                                const isFilled = isCorner || [10, 17, 24, 31, 38, 23, 25, 30, 32].includes(i);
                                                return <div key={i} className={`rounded-[2px] ${isFilled ? 'bg-black' : 'bg-gray-200'}`} />;
                                            })}
                                        </div>
                                    </div>
                                </div>
                                <p className="mt-6 text-sm text-[#666] text-center" style={{ fontWeight: 300 }}>
                                    Escaneá con tu WhatsApp Business
                                </p>
                            </div>
                        </div>

                        <div className="text-center mt-16 b12-reveal">
                            <button className="b12-btn shadow-[0_0_40px_rgba(197,160,89,0.15)]" onClick={openContact}>
                                Activar Barberox en mi WhatsApp
                            </button>
                        </div>
                    </div>
                </section>


                <div className="b12-container"><div className="b12-divider" /></div>


                {/* ═══════════════ 9. FAQ ═══════════════ */}
                <section className="b12-section">
                    <div className="b12-container max-w-2xl">
                        <h2 className="text-3xl md:text-4xl uppercase mb-16 b12-reveal" style={{ fontFamily: "'Rasputin', serif" }}>
                            Preguntas frecuentes
                        </h2>

                        <div className="space-y-0">
                            {[
                                { q: '¿Necesito bajar una app?', a: 'No. Todo vive en WhatsApp.' },
                                { q: '¿Esto es solo agenda?', a: 'No. Te avisa, te ordena, registra caja y te muestra el mes.' },
                                { q: '¿Puedo bloquear horarios?', a: 'Sí.' },
                                { q: '¿Puedo hacerlo manual?', a: 'Sí, desde el panel.' },
                                { q: '¿Cuánto tarda?', a: '5 minutos.' },
                            ].map((faq, i) => (
                                <details key={i} className="group border-b border-[#1A1A1A] b12-reveal">
                                    <summary className="flex justify-between items-center py-6 cursor-pointer text-lg">
                                        <span>{faq.q}</span>
                                        <ChevronDown className="w-4 h-4 text-[#666] transition-transform group-open:rotate-180" strokeWidth={1.5} />
                                    </summary>
                                    <div className="pb-6 text-[#8A8A8A]" style={{ fontWeight: 300 }}>{faq.a}</div>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>


                <div className="b12-container"><div className="b12-divider" /></div>


                {/* ═══════════════ 10. CIERRE ═══════════════ */}
                <section className="b12-section">
                    <div className="b12-container text-center max-w-3xl mx-auto">
                        <p className="text-sm tracking-[0.25em] uppercase text-[#C5A059] mb-8 b12-reveal" style={{ fontWeight: 400 }}>
                            BARBEROX
                        </p>
                        <h2 className="text-2xl md:text-4xl uppercase leading-[1.2] mb-6 b12-reveal" style={{ fontFamily: "'Rasputin', serif" }}>
                            IA para barberías por WhatsApp.
                        </h2>
                        <p className="text-[#8A8A8A] text-lg mb-12 b12-reveal" style={{ fontWeight: 300 }}>
                            Si hoy se te caen turnos y no sabés cómo viene el mes, necesitás control.
                        </p>
                        <div className="b12-reveal">
                            <button className="b12-btn shadow-[0_0_40px_rgba(197,160,89,0.15)]" onClick={openContact}>
                                Activar ahora
                                <ArrowRight className="w-4 h-4" strokeWidth={2} />
                            </button>
                            <p className="mt-5 text-xs tracking-wide text-[#666]" style={{ fontWeight: 300 }}>
                                Sin tarjeta. Cancelás cuando quieras.
                            </p>
                        </div>
                    </div>
                </section>


                {/* Footer */}
                <footer className="border-t border-[#1A1A1A] py-8">
                    <div className="b12-container flex justify-between items-center text-sm text-[#666]">
                        <span>Barberox</span>
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
                <button className="b12-btn w-full justify-center" onClick={openContact}>Activar Barberox</button>
            </div>

            {showContact && <BarberoxContact onClose={() => setShowContact(false)} />}
        </div>
    );
}

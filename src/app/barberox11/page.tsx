'use client';
import './landing.css';
import { useEffect, useRef, useCallback } from 'react';

const BarberoxPage = () => {

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
        document.querySelectorAll('.b11-reveal').forEach(el => observerRef.current?.observe(el));
        return () => observerRef.current?.disconnect();
    }, []);

    return (
        <div>

            {/* ═══════════════ NAV ═══════════════ */}
            <nav className="fixed top-0 w-full z-50 bg-[#0E0E0E]/90 backdrop-blur-sm border-b border-[#2A2A2A]">
                <div className="b11-container flex justify-between items-center h-16">
                    <span className="text-xl tracking-[0.15em] uppercase" style={{ fontFamily: "'Old English Text MT', 'Rasputin', serif" }}>Barberox</span>
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

                    <div className="grid md:grid-cols-3 gap-0">
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
                            <div key={i} className={`b11-reveal py-8 md:py-0 md:px-10 ${i > 0 ? 'border-t md:border-t-0 md:border-l border-[#2A2A2A]' : ''}`}>
                                <h3 className="text-xl uppercase tracking-wide mb-4 text-[#F5F0EB]">{item.title}</h3>
                                <p className="text-[#8A8A8A] leading-relaxed" style={{ fontWeight: 300 }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* ═══════════════ DIVIDER ═══════════════ */}
            <div className="b11-container"><div className="b11-divider" /></div>


            {/* ═══════════════ HOW IT WORKS ═══════════════ */}
            <section className="b11-section">
                <div className="b11-container max-w-2xl">
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

                        <a
                            href="https://wa.me/message/TJKNS7LTAVVGN1"
                            className="b11-btn w-full justify-center"
                            onClick={() => {
                                trackEvent('cta_click', { source: 'pricing' });
                                if (typeof window.fbq === 'function') {
                                    window.fbq('track', 'Purchase', { currency: 'USD', value: 69 });
                                }
                            }}
                        >
                            Activar mi agenda automática
                        </a>

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
                        <a
                            href="https://wa.me/message/TJKNS7LTAVVGN1"
                            className="b11-btn"
                            onClick={() => trackEvent('cta_click', { source: 'final' })}
                        >
                            Quiero activar mi agenda
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        </a>
                    </div>
                </div>
            </section>


            {/* ═══════════════ FOOTER ═══════════════ */}
            <footer className="border-t border-[#2A2A2A] py-8">
                <div className="b11-container flex justify-between items-center text-sm text-[#8A8A8A]">
                    <span>Barberox</span>
                    <span>© 2026 Codexa.uy</span>
                </div>
            </footer>

        </div>
    );
};

export default BarberoxPage;

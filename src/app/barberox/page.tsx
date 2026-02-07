'use client';

import React, { useEffect, useState } from 'react';
import './landing.css';

// Declare fbq for Meta Pixel
declare global {
    interface Window {
        fbq: (action: string, eventName: string, params?: Record<string, any>) => void;
    }
}

const BarberoxPage = () => {
    const [scrolled, setScrolled] = useState(false);

    // Analytics tracking function
    const trackEvent = async (type: 'page_view' | 'cta_click' | 'pricing_navigation' | 'section_view', metadata?: { source?: string }) => {
        try {
            await fetch('/api/barberox-analytics', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type, metadata })
            });
        } catch (error) {
            console.error('Analytics tracking error:', error);
        }
    };

    useEffect(() => {
        // Track page view
        trackEvent('page_view');

        // Meta Pixel: Track AddToCart when URL contains #pricing
        if (window.location.hash === '#pricing') {
            if (typeof window.fbq === 'function') {
                window.fbq('track', 'AddToCart');
            }
            // Track pricing navigation from direct URL
            trackEvent('pricing_navigation', { source: 'direct-url' });
        }

        // Meta Pixel: Listen for hash changes to track AddToCart
        const handleHashChange = () => {
            if (window.location.hash === '#pricing') {
                if (typeof window.fbq === 'function') {
                    window.fbq('track', 'AddToCart');
                }
            }
        };
        window.addEventListener('hashchange', handleHashChange);

        // Core Scroll Logic
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.animate-reveal, .animate-fade-up').forEach(el => revealObserver.observe(el));

        // Carousel Script (from V2/V3)
        const slides = document.querySelectorAll('.screenshot-slide');
        const urlBar = document.getElementById('browser-url');
        const urls = [
            'app.barberox.com/agenda',
            'app.barberox.com/calendario',
            'app.barberox.com/clientes',
            'app.barberox.com/mensajes',
            'app.barberox.com/finanzas'
        ];
        let currentSlide = 0;
        let carouselInterval: NodeJS.Timeout;

        if (slides.length > 0) {
            slides[0].classList.add('active');
            carouselInterval = setInterval(() => {
                slides[currentSlide].classList.remove('active');
                currentSlide = (currentSlide + 1) % slides.length;
                slides[currentSlide].classList.add('active');
                if (urlBar) urlBar.textContent = urls[currentSlide];
            }, 4000);
        }

        // Assistant Messages Script (from V1)
        const cards = document.querySelectorAll('.message-card-persistent');
        const assistantSection = document.getElementById('assistant-section');
        let current = 0;
        let assistantAnimated = false;
        let assistantTimeout: NodeJS.Timeout;

        const showNext = () => {
            if (current < cards.length) {
                cards[current].classList.remove('opacity-0', 'translate-y-4');
                current++;
                assistantTimeout = setTimeout(showNext, 3000);
            } else {
                assistantTimeout = setTimeout(() => {
                    cards.forEach(c => c.classList.add('opacity-0', 'translate-y-4'));
                    current = 0;
                    setTimeout(showNext, 1000);
                }, 5000);
            }
        };

        const assistantObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !assistantAnimated) {
                assistantAnimated = true;
                setTimeout(showNext, 500);
            }
        }, { threshold: 0.2 });

        if (assistantSection) assistantObserver.observe(assistantSection);

        // WhatsApp Chat Animation (from V1)
        const bubbles = document.querySelectorAll('.chat-bubble-reveal');
        const phoneSection = document.getElementById('features');
        let index = 0;
        let chatAnimated = false;

        const showBubbles = () => {
            if (index < bubbles.length) {
                bubbles[index].classList.remove('opacity-0', 'translate-y-4');
                bubbles[index].classList.add('opacity-100', 'translate-y-0');
                index++;
                setTimeout(showBubbles, 2000);
            } else {
                setTimeout(() => {
                    bubbles.forEach(b => {
                        b.classList.remove('opacity-100', 'translate-y-0');
                        b.classList.add('opacity-0', 'translate-y-4');
                    });
                    index = 0;
                    setTimeout(showBubbles, 1000);
                }, 4000);
            }
        };

        const chatObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !chatAnimated) {
                chatAnimated = true;
                setTimeout(showBubbles, 500);
            }
        }, { threshold: 0.2 });

        if (phoneSection) chatObserver.observe(phoneSection);

        // Smart Reminder Animation (from V1)
        const notification = document.querySelector('.reminder-notification-reveal');
        const reminderSection = document.getElementById('reminders-section');
        let reminderAnimated = false;

        const reminderObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !reminderAnimated) {
                reminderAnimated = true;
                setTimeout(() => {
                    if (notification) {
                        notification.classList.remove('opacity-0', 'translate-y-8');
                        notification.classList.add('opacity-100', 'translate-y-0');
                    }
                }, 1000);
            }
        }, { threshold: 0.5 });

        if (reminderSection) reminderObserver.observe(reminderSection);

        // Section Scroll Tracking (Drop-off analysis)
        const trackedSections = new Set<string>();
        const sectionScrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    if (!trackedSections.has(sectionId)) {
                        trackedSections.add(sectionId);
                        trackEvent('section_view', { source: sectionId });
                    }
                }
            });
        }, { threshold: 0.1 });

        const sectionsToTrack = ['hero', 'hard-truth', 'anti-app', 'features', 'reminders-section', 'bonus-panel-section', 'assistant-section', 'pricing'];
        sectionsToTrack.forEach(id => {
            const el = document.getElementById(id);
            if (el) sectionScrollObserver.observe(el);
        });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('hashchange', handleHashChange);
            revealObserver.disconnect();
            if (carouselInterval) clearInterval(carouselInterval);
            if (assistantTimeout) clearTimeout(assistantTimeout);
            assistantObserver.disconnect();
            chatObserver.disconnect();
            reminderObserver.disconnect();
            sectionScrollObserver.disconnect();
        };
    }, []);

    return (
        <div className="barberox4-root font-outfit selection:bg-primary/30 selection:text-white">
            {/* Minimalist Navbar (Source: /barberox) */}
            <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/10 py-4' : 'bg-transparent py-8'}`}>
                <div className="container mx-auto px-6 flex justify-between items-center gap-4">
                    <div className="flex items-center gap-2 md:gap-3 shrink-0">
                        <img src="/barberox/img/logo.png" alt="Barberox" className="h-6 md:h-8 w-auto brightness-200" />
                        <span className="Founders-badge text-[10px] md:text-xs hidden md:inline-flex">Premium Edition</span>
                    </div>
                    <a
                        href="#pricing"
                        className="relative group text-white font-bold text-[10px] md:text-sm tracking-[0.1em] md:tracking-widest hover:text-primary transition-colors text-right leading-tight"
                        onClick={() => trackEvent('pricing_navigation', { source: 'navigation' })}
                    >
                        <span className="relative z-10">ACCESO EXCLUSIVO</span>
                        <span className="absolute -inset-x-4 -inset-y-2 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        <span className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></span>
                    </a>
                </div>
            </nav>

            {/* 1. Aggressive Hero Section (Source: /barberox + mod) */}
            <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-hero-gradient">
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <div className="mb-8 animate-reveal">
                        <span className="text-primary font-black tracking-[0.3em] uppercase text-sm">El mercado ha cambiado</span>
                    </div>

                    <h1 className="text-6xl md:text-[100px] font-black leading-[0.9] tracking-tighter mb-8 animate-reveal">
                        DEJA DE SER <span className="text-gradient-orange">ESCLAVO</span> <br />
                        DE TU WHATSAPP.
                    </h1>

                    <p className="text-2xl md:text-3xl text-text-muted max-w-3xl mx-auto mb-12 font-light animate-reveal">
                        Tu negocio debe producir dinero mientras <b className="text-white">cortas el pelo</b>, no mientras pierdes tiempo <br /> contestando "tenes hora hoy?".
                        <br />
                        <span className="text-white/40 text-lg mt-4 block">Tu recepcionista IA atiende clientes, responde dudas y llena tu calendario 24/7.</span>
                    </p>

                    <div className="animate-reveal">
                        <a href="#pricing" className="btn-primary-v2" onClick={() => trackEvent('pricing_navigation', { source: 'hero' })}>
                            Quiero automatizar mi barbería ahora
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                            </svg>
                        </a>
                        <div className="mt-6 flex flex-col items-center gap-2">
                            <p className="text-red-500 font-bold text-xs uppercase tracking-[0.2em] blink-text">¡ATENCIÓN! QUEDAN SOLO 5 CUPOS DISPONIBLES</p>
                            <p className="text-white/30 text-[10px] uppercase tracking-widest">A este precio promocional para Uruguay</p>
                        </div>
                    </div>
                </div>

                <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-full max-w-2xl opacity-40 blur-sm pointer-events-none">
                    <div className="relative aspect-[16/9] w-full bg-primary/20 rounded-full blur-[120px]"></div>
                </div>
            </section>

            {/* 2. The Hard Truth Section (Source: /barberox) */}
            <section id="hard-truth" className="py-32 bg-black">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-20 items-center">
                        <div className="animate-reveal">
                            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
                                LA MATEMÁTICA <br />
                                <span className="text-primary">ES SIMPLE.</span>
                            </h2>
                            <div className="space-y-8">
                                <div className="p-6 rounded-3xl bg-white/5 border-l-4 border-red-500">
                                    <p className="text-white/60 mb-2 uppercase text-xs font-bold tracking-widest">El Duelo Actual</p>
                                    <p className="text-2xl font-bold">1 turno perdido al día = <span className="text-red-500">$15.000 / mes</span> tirados a la basura.</p>
                                </div>
                                <div className="p-6 rounded-3xl bg-white/5 border-l-4 border-green-500">
                                    <p className="text-white/60 mb-2 uppercase text-xs font-bold tracking-widest">Con Barberox</p>
                                    <p className="text-2xl font-bold">Respuesta en 2 segundos = <span className="text-green-500">30% más</span> de volumen mensual.</p>
                                </div>
                            </div>
                            <p className="text-text-muted mt-12 text-lg">
                                Si no tienes un sistema que trabaje por ti 24/7, entonces <b className="text-white">tú eres el sistema</b>. Y los sistemas humanos tienen un límite de escala.
                            </p>

                            <div className="mt-20 text-center animate-reveal md:text-left">
                                <a href="#pricing" className="btn-primary-v2" onClick={() => trackEvent('pricing_navigation', { source: 'hard-truth' })}>
                                    Mátame esa libreta ahora
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 animate-reveal">
                            <div className="card-v2 flex flex-col items-center justify-center text-center">
                                <div className="text-5xl font-black text-primary mb-2">24/7</div>
                                <div className="text-xs uppercase tracking-widest font-bold">Atención</div>
                            </div>
                            <div className="card-v2 flex flex-col items-center justify-center text-center mt-8">
                                <div className="text-5xl font-black text-primary mb-2">0</div>
                                <div className="text-xs uppercase tracking-widest font-bold">Fricción</div>
                            </div>
                            <div className="card-v2 flex flex-col items-center justify-center text-center">
                                <div className="text-5xl font-black text-primary mb-2">100%</div>
                                <div className="text-xs uppercase tracking-widest font-bold">Control</div>
                            </div>
                            <div className="card-v2 flex flex-col items-center justify-center text-center mt-8">
                                <div className="text-5xl font-black text-primary mb-2">+15h</div>
                                <div className="text-xs uppercase tracking-widest font-bold">Libres/Mes</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. The "Anti-App" Section (Source: /barberox - chat box) */}
            <section id="anti-app" className="py-32 border-t border-white/5 relative overflow-hidden">
                <div className="container mx-auto px-6 text-center relative z-10">
                    <span className="text-primary font-black tracking-[0.3em] uppercase text-sm mb-6 block animate-reveal">Basta de apps lentas</span>
                    <h2 className="text-5xl md:text-7xl font-black mb-12 animate-reveal">TU CLIENTE NO QUIERE <br /> BAJAR OTRAS APPS NI LINKS.</h2>
                    <p className="text-xl md:text-2xl text-text-muted max-w-3xl mx-auto mb-20 animate-reveal">
                        Obligar a un cliente a salir de WhatsApp para registrarse en un Link externo es el <b className="text-white">asesino #1 de conversiones</b>.
                    </p>

                    {/* PAS Comparison Table */}
                    <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 animate-reveal">
                        <div className="p-8 rounded-3xl bg-red-500/5 border border-red-500/20 text-left">
                            <h3 className="text-red-500 font-bold mb-4 flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                MÉTODO TRADICIONAL (APPS / LINKS)
                            </h3>
                            <ul className="space-y-3 text-sm text-white/60">
                                <li>• Obligar al cliente a entrar a un Link o bajar App.</li>
                                <li>• Crear usuario y recordar contraseña.</li>
                                <li>• Salir de la charla para ver horarios.</li>
                                <li className="text-red-400 font-bold">• Resultado: 40% abandona el proceso.</li>
                            </ul>
                        </div>
                        <div className="p-8 rounded-3xl bg-green-500/5 border border-green-500/20 text-left">
                            <h3 className="text-green-500 font-bold mb-4 flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                MÉTODO BARBEROX (IA)
                            </h3>
                            <ul className="space-y-3 text-sm text-white/60">
                                <li>• Todo sucede dentro de WhatsApp.</li>
                                <li>• Sin registros ni descargas.</li>
                                <li>• Habla como con un amigo.</li>
                                <li className="text-green-400 font-bold">• Resultado: 98% de citas concretadas.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. The Solution (Source: /barberox2 Solucion Inteligencia) */}
            <section id="features" className="py-32 relative bg-black">
                <div className="container mx-auto px-6">
                    <div className="mb-20">
                        <span className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-4 block">La Solución</span>
                        <h2 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-up"><span className="text-[#ff7700]">INTELIGENCIA</span> <br /><span className="text-[#ff7700] text-3xl md:text-5xl">QUE SE SIENTE.</span></h2>
                        <p className="text-white/40 text-sm font-bold uppercase tracking-widest animate-fade-up">Todo pasa en WhatsApp, como siempre, pero ahora responde solo.</p>
                    </div>

                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="lg:w-1/2 space-y-8">
                            <div>
                                <h3 className="text-3xl font-bold mb-4">Es como tener una secretaria 24/7.</h3>
                                <p className="text-white/60 text-lg">Tu asistente IA <b className="text-primary">nunca duerme</b>, nunca se enferma y nunca contesta mal. Atiende a <b className="text-primary">100 clientes a la vez</b> en <b className="text-primary">menos de 2 segundos</b>.</p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                                        <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold">Respuesta Instantánea</h4>
                                        <p className="text-white/50 text-sm">Respuestas instantáneas a tus clientes. La velocidad cierra turnos.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                                        <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold">Sincronización Real</h4>
                                        <p className="text-white/50 text-sm">Sincronización real con tu agenda. Cada conversación genera datos en tu base de datos de barbería.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:w-1/2 relative flex justify-center">
                            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full"></div>
                            <div className="relative w-[300px] h-[600px] bg-[#010101] border-[8px] border-[#1a1a1a] rounded-[3.5rem] shadow-[0_0_50px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.1)] overflow-hidden z-10">
                                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-30 flex items-center justify-end px-3 gap-1">
                                    <div className="w-1 h-1 rounded-full bg-blue-900/40"></div>
                                    <div className="w-2 h-2 rounded-full bg-blue-900/60"></div>
                                </div>

                                <div className="w-full h-full bg-[#0b141a] flex flex-col font-sans relative">
                                    <div className="bg-[#202c33] p-4 pt-10 flex items-center gap-3 shadow-md z-10">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden border border-white/5">
                                            <img src="/barberox/img/logo.png" className="w-6 h-auto brightness-200" alt="Logo" />
                                        </div>
                                        <div>
                                            <div className="text-white text-sm font-bold tracking-wider">Barberox</div>
                                            <div className="text-white/60 text-[10px]">en línea</div>
                                        </div>
                                    </div>
                                    <div className="flex-1 p-4 space-y-4 overflow-hidden relative text-left">
                                        <div className="absolute inset-0 opacity-5 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat"></div>

                                        <div className="flex justify-end opacity-0 translate-y-4 transition-all duration-500 relative z-10 chat-bubble-reveal">
                                            <div className="bg-[#005c4b] text-white p-2 px-3 rounded-lg rounded-tr-none text-xs max-w-[80%] shadow-sm">
                                                Hola! Quiero cortarme hoy.
                                                <div className="text-[9px] text-white/50 text-right mt-1">10:00 ✓✓</div>
                                            </div>
                                        </div>

                                        <div className="flex justify-start opacity-0 translate-y-4 transition-all duration-500 relative z-10 chat-bubble-reveal">
                                            <div className="bg-[#202c33] text-white p-2 px-3 rounded-lg rounded-tl-none text-xs max-w-[80%] shadow-sm">
                                                Hola crack! 👋 Tengo estos lugares hoy:
                                                <br />• 17:00
                                                <br />• 18:30
                                                <div className="text-[9px] text-white/50 text-right mt-1">10:00</div>
                                            </div>
                                        </div>

                                        <div className="flex justify-end opacity-0 translate-y-4 transition-all duration-500 relative z-10 chat-bubble-reveal">
                                            <div className="bg-[#005c4b] text-white p-2 px-3 rounded-lg rounded-tr-none text-xs max-w-[80%] shadow-sm">
                                                A las 18:30 me va perfecto!
                                                <div className="text-[9px] text-white/50 text-right mt-1">10:01 ✓✓</div>
                                            </div>
                                        </div>

                                        <div className="flex justify-start opacity-0 translate-y-4 transition-all duration-500 relative z-10 chat-bubble-reveal">
                                            <div className="bg-[#202c33] text-white p-2 px-3 rounded-lg rounded-tl-none text-xs max-w-[80%] shadow-sm">
                                                ¡Listo! ✂️ Agendado hoy 18:30hs. ¡Te esperamos!
                                                <div className="text-[9px] text-white/50 text-right mt-1">10:01</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-24 pt-16 border-t border-white/5">
                        {[
                            {
                                title: 'Multi-Sucursal',
                                desc: 'Coordina locales y barberos automáticamente. La IA conoce la disponibilidad de cada sede y rutea al cliente sin errores.',
                                icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
                            },
                            {
                                title: 'Entiende Contexto',
                                desc: '"Llego 10 min tarde", "Quiero cancelar", "Cambiame el horario". La IA interpreta intenciones humanas reales 24/7.',
                                icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
                            },
                            {
                                title: 'Cálculo Inteligente',
                                desc: 'Optimiza tu tiempo. Si un corte dura 45 min y otro 30, la IA encastra los turnos para que no tengas huecos muertos.',
                                icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                            },
                            {
                                title: 'Notificaciones VIP',
                                desc: 'Alertas críticas directo a tu celular. Si alguien cancela o agenda, lo sabes al segundo sin tocar el calendario.',
                                icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
                            }
                        ].map((f, i) => (
                            <div key={i} className="feature-card-premium group animate-reveal text-left">
                                <div className="feature-icon-container">
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={f.icon} />
                                    </svg>
                                </div>
                                <h4 className="text-xl font-black mb-4 uppercase tracking-tight">{f.title}</h4>
                                <p className="text-text-muted text-sm leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-20 text-center animate-reveal">
                        <a href="#pricing" className="btn-primary-v2" onClick={() => trackEvent('pricing_navigation', { source: 'solution' })}>
                            Quiero mi secretaria IA
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                            </svg>
                        </a>
                    </div>
                </div>
            </section>

            {/* 5. Zero Inasistencias (Source: /barberox2) */}
            <section id="reminders-section" className="py-24 relative overflow-hidden bg-black border-t border-white/5">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col md:flex-row items-center gap-16">
                        <div className="md:w-1/2 order-2 md:order-1">
                            <div className="relative w-[280px] h-[580px] mx-auto bg-black rounded-[3rem] border-[8px] border-[#1a1a1a] shadow-2xl overflow-hidden group">
                                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1614850523296-e8c041de4398?auto=format&fit=crop&q=80')] bg-cover bg-center brightness-50"></div>
                                <div className="relative h-full flex flex-col items-center pt-20 px-4">
                                    <div className="text-6xl font-light text-white mb-2">16:30</div>
                                    <div className="text-sm text-white/70 mb-20 text-center">jueves, 3 de enero</div>
                                    <div className="w-full space-y-3 reminder-notification-reveal opacity-0 translate-y-8 transition-all duration-700 text-left">
                                        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-lg">
                                            <div className="flex justify-between items-center mb-1">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-5 h-5 bg-primary rounded-md flex items-center justify-center">
                                                        <img src="/barberox/img/logo.png" className="w-3 h-auto brightness-200" alt="B" />
                                                    </div>
                                                    <span className="text-[10px] font-semibold text-white/50 uppercase tracking-wider">Barberox</span>
                                                </div>
                                                <span className="text-[10px] text-white/40">ahora</span>
                                            </div>
                                            <div className="text-xs font-bold text-white mb-0.5">Hola Román 👋</div>
                                            <p className="text-[11px] text-white/80 leading-snug">
                                                Te recordamos tu cita de <span className="text-primary font-bold">Corte y Barba</span> hoy a las <span className="text-primary font-bold">18:30hs</span>. ¡Nos vemos!
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-2xl z-30"></div>
                            </div>
                        </div>

                        <div className="md:w-1/2 order-1 md:order-2 text-left">
                            <span className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-4 block animate-fade-up">Zero Inasistencias</span>
                            <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-up">Recordatorios que<br /><span className="text-[#ff7700]">SÍ FUNCIONAN.</span></h2>
                            <p className="text-white/60 text-lg mb-8 animate-fade-up">
                                La IA envía una notificación automática <b className="text-primary">2 horas antes</b>. Los clientes pueden confirmar o avisar si se retrasan con un solo mensaje.
                                <br /><br />
                                Reduce el ausentismo en un <b className="text-primary">95%</b> y asegura que cada hora de tu tiempo esté paga.
                            </p>

                            <div className="space-y-4 animate-fade-up">
                                {[
                                    'Recordatorios automáticos antes del turno (2hs antes).',
                                    'Reducción de faltazos y cancelaciones de último minuto.',
                                    'Confirmaciones automáticas: el sistema sabe quién viene y quién no.'
                                ].map((text, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                                            <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                        </div>
                                        <span className="text-white/70 text-sm">{text}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-12 animate-fade-up">
                                <a href="#pricing" className="btn-primary-v2" onClick={() => trackEvent('pricing_navigation', { source: 'reminders' })}>
                                    Eliminar inasistencias hoy
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. Bonuses (Source: /barberox3) */}
            <section className="py-20 bonus-header overflow-hidden">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl md:text-7xl font-black mb-8 animate-reveal uppercase">
                        Te regalamos <span className="text-primary italic">2 HERRAMIENTAS</span> <br /> que otros te cobrarían aparte.
                    </h2>
                    <p className="text-xl text-text-muted max-w-2xl mx-auto animate-reveal">
                        Al activar tu agenda hoy, te llevas estos <b className="text-white">2 Bonus exclusivos</b> valorados en mas de $2.500/mes totalmente GRATIS.
                    </p>
                </div>
            </section>

            {/* Bonus 1: Web OS */}
            <section id="bonus-panel-section" className="py-24 bg-black border-t border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-500/5 blur-[100px]"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col md:flex-row items-center gap-16">
                        <div className="md:w-1/2 relative text-left">
                            <div className="inline-flex items-center gap-2 mb-6 animate-fade-up">
                                <span className="bonus-badge bg-blue-600">REGALO #1</span>
                                <span className="text-blue-500 text-xs font-bold tracking-[0.2em] uppercase">VALOR: $1.500/mes — GRATIS</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 animate-fade-up">Detrás de la agenda,<br /><span className="text-[#ff7700]">TU PANEL WEB.</span></h2>
                            <div className="bg-blue-500/10 border-l-2 border-blue-500 p-4 mb-8 rounded-r-xl animate-pulse">
                                <p className="text-white/80 text-sm font-medium">Controla turnos, caja y clientes desde un solo lugar. <br /><span className="text-primary font-bold blink-text">TAMBIÉN ACCESIBLE DESDE TU CELULAR</span></p>
                            </div>
                            <ul className="space-y-3">
                                {[
                                    { bold: 'Base de Datos Profesional:', text: 'Tus clientes, citas e historial de caja profesional.', icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4' },
                                    { bold: 'Sistema de Puntajes:', text: 'Ranking mensual e histórico de clientes para fidelización.', icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z' },
                                    { bold: 'Ranking de Barberos:', text: 'Ranking mensual e histórico de rendimiento por barbero.', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
                                    { bold: 'Acceso Multi-dispositivo:', text: 'Gestiona tu barbería desde PC, Tablet o Móvil.', icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z' }
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                                            <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                                            </svg>
                                        </div>
                                        <span className="text-white/80 text-sm"><b className="text-primary">{item.bold}</b> {item.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="md:w-1/2 w-full">
                            <div className="relative group perspective-1000">
                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                                <div className="relative bg-[#0f1115] border border-white/10 rounded-xl shadow-2xl overflow-hidden transform group-hover:rotate-x-2 transition-transform duration-500 h-[300px] md:h-[350px] flex items-center justify-center p-8 text-center">
                                    <div className="space-y-4">
                                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-primary/20 animate-pulse">
                                            <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                        </div>
                                        <h4 className="text-xl font-bold text-white uppercase tracking-tight">Acceso Restringido</h4>
                                        <p className="text-sm text-white/50 leading-relaxed max-w-[250px] mx-auto">
                                            <b className="text-primary italic">Activa ahora</b> para desbloquear tu acceso exclusivo y ver el sistema por dentro.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-20 text-center animate-reveal">
                        <a href="#pricing" className="btn-primary-v2" onClick={() => trackEvent('pricing_navigation', { source: 'bonus-panel' })}>
                            Conseguir mi panel GRATIS
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                            </svg>
                        </a>
                    </div>
                </div>
            </section>


            {/* Bonus 2: AI Assistant */}
            <section id="assistant-section" className="py-24 bg-[#050505] border-t border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-yellow-500/5 blur-[100px]"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col md:flex-row-reverse items-center gap-16">
                        <div className="md:w-1/2 text-left relative">
                            <div className="inline-flex items-center gap-2 mb-6 animate-fade-up">
                                <span className="bonus-badge bg-yellow-600">REGALO #2</span>
                                <span className="text-yellow-500 text-xs font-bold tracking-[0.2em] uppercase">VALOR: $1.000/mes — GRATIS</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-up">Tu mano derecha,<br /><span className="text-[#ff7700]">EL ASISTENTE IA.</span></h2>
                            <div className="bg-yellow-500/10 border-l-2 border-yellow-500 p-4 mb-8 rounded-r-xl animate-pulse">
                                <p className="text-white/80 text-sm font-medium">IA que te asiste en la gestión de turnos y clientes. <span className="text-primary font-bold ml-2 blink-text">EXCLUSIVO PARA TI</span></p>
                            </div>
                            <ul className="space-y-4">
                                {[
                                    { bold: 'Bloqueos por Audio:', text: '"Bloqueame el martes a la tarde".', icon: 'M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z' },
                                    { bold: 'Resumen Nocturno:', text: 'Recibe tu agenda de mañana cada noche.', icon: 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z' },
                                    { bold: 'Notificaciones en Vivo:', text: 'Te avisa cada vez que alguien reserva.', icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' },
                                    { bold: 'Control de Ausentismo:', text: 'Confirmación automática de asistencia por chat.', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' }
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center shrink-0">
                                            <svg className="w-4 h-4 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                                            </svg>
                                        </div>
                                        <span className="text-white/80"><b className="text-primary">{item.bold}</b> {item.text}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-20 text-left animate-reveal">
                                <a href="#pricing" className="btn-primary-v2" onClick={() => trackEvent('pricing_navigation', { source: 'bonus-assistant' })}>
                                    Activar Asistente IA
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                                    </svg>
                                </a>
                            </div>
                        </div>

                        <div className="md:w-1/2 w-full flex justify-center perspective-1000">
                            <div className="relative w-[300px] h-[600px] bg-[#010101] border-[8px] border-[#1a1a1a] rounded-[3.5rem] shadow-[0_0_50px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.1)] overflow-hidden z-10">
                                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-30 flex items-center justify-end px-3 gap-1">
                                    <div className="w-1 h-1 rounded-full bg-blue-900/40"></div>
                                    <div className="w-2 h-2 rounded-full bg-blue-900/60"></div>
                                </div>
                                <div className="absolute top-0 left-0 right-0 h-24 bg-[#202c33]/90 backdrop-blur-md flex items-center px-4 pt-10 gap-3 z-20 border-b border-white/5 text-left">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden border border-white/5">
                                        <img src="/barberox/img/logo.png" className="w-8 h-auto brightness-200" alt="Logo" />
                                    </div>
                                    <div>
                                        <div className="text-white font-bold text-sm tracking-tight">Barberox Asistente</div>
                                        <div className="text-primary text-xs font-medium">En línea</div>
                                    </div>
                                </div>
                                <div id="asistente-messages" className="absolute inset-x-0 bottom-0 top-24 p-4 space-y-4 overflow-hidden flex flex-col justify-end bg-[#0b141a] text-left">
                                    <div className="message-card-persistent bg-[#202c33] p-3 rounded-lg rounded-tl-none border border-white/5 shadow-md transform opacity-0 translate-y-4 transition-all duration-500">
                                        <p className="text-[11px] text-primary font-bold mb-1">Resumen de Mañana 🌙</p>
                                        <p className="text-[10px] text-white/90 whitespace-pre-line leading-relaxed">¡Buenas noches Jose!<br />Mañana tienes las siguientes citas agendadas:<br />- 09:00 - Diego Ferreira - Corte - 60m<br />- 10:00 - Fernando Rodriguez - Corte - 60m<br />- 11:00 - Santiago Gonzalez - Corte - 60m<br />- 12:00 - Gabriel Silvera - Corte - 60m<br />- 13:00 - Cristian Blanco - Corte - 60m<br />- ... y 6 turnos más por la tarde.</p>
                                        <div className="text-[9px] text-white/30 text-right mt-1">21:00</div>
                                    </div>
                                    <div className="message-card-persistent bg-[#202c33] p-3 rounded-lg rounded-tl-none border border-white/5 shadow-md transform opacity-0 translate-y-4 transition-all duration-500">
                                        <p className="text-[11px] text-green-400 font-bold mb-1">Nuevo Turno 💈</p>
                                        <p className="text-white/90 text-xs">Juan Román agendó <b className="text-primary">Corte</b> a las 18:00hs.</p>
                                        <div className="text-[9px] text-white/30 text-right mt-1">10:15</div>
                                    </div>
                                    <div className="message-card-persistent bg-[#202c33] p-3 rounded-lg rounded-tl-none border border-white/5 shadow-md transform opacity-0 translate-y-4 transition-all duration-500">
                                        <p className="text-[11px] text-green-400 font-bold mb-1">Nuevo Turno 💈</p>
                                        <p className="text-white/90 text-xs">Gustavo Gomez agendó <b className="text-primary">Corte y Barba</b> a las 16:00hs.</p>
                                        <div className="text-[9px] text-white/30 text-right mt-1">11:30</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* NEW: Limited Time Urgency Section */}
            <section className="py-24 bg-gradient-to-b from-black to-[#110800] relative overflow-hidden">
                <div className="container mx-auto px-6 text-center">
                    <div className="inline-block p-8 md:p-12 rounded-[3rem] bg-black border-2 border-primary/20 backdrop-blur-xl animate-reveal relative urgency-card-fixed">
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black text-white font-black px-6 py-2 rounded-full text-sm tracking-widest animate-glow-pulse flex items-center justify-center min-w-[200px] border border-primary/50">
                            <span className="gold-shimmer-text">¡ÚLTIMA OPORTUNIDAD!</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black mb-6 text-white uppercase italic tracking-tighter">
                            REGALOS INCLUIDOS <br />
                            <span className="text-primary tracking-normal not-italic">POR TIEMPO LIMITADO.</span>
                        </h2>
                        <p className="text-xl text-white/60 max-w-2xl mx-auto font-medium leading-relaxed mb-6">
                            Una vez completados los 25 cupos de lanzamiento, el <b className="text-white">Panel Web</b> y el <b className="text-white">Asistente IA</b> pasarán a ser módulos de pago mensual adicional.
                        </p>
                        <div className="animate-pulse">
                            <span className="gold-shimmer-text font-black text-2xl uppercase tracking-tighter italic">
                                ¡NO DEJES PASAR ESTA OPORTUNIDAD!
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. Testimonios (Source: /barberox2) */}
            <section className="py-24 bg-black border-t border-white/5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <span className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-4 block">Barberos Reales</span>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">Lo que dicen <span className="text-primary">nuestros clientes.</span></h2>
                        <p className="text-white/50 max-w-2xl mx-auto">Barberías en Uruguay que ya automatizaron su agenda y multiplicaron sus ingresos.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {[
                            {
                                text: "Antes vivía con el WhatsApp explotado y anotando turnos en una libreta. Desde que activé la agenda automática casi no pierdo mensajes y tengo la barbería llena toda la semana.",
                                name: "Martín",
                                location: "Barbería Centro (Montevideo)",
                                highlight: "casi no pierdo mensajes"
                            },
                            {
                                text: "Lo que más me sorprendió es que los clientes contestan solos a los recordatorios y el sistema ya sabe quién viene y quién no. Bajaron muchísimo los faltazos y sé exactamente cuánto facturé cada día en el panel.",
                                name: "Lucas",
                                location: "Barbería del Parque (Canelones)",
                                highlight: "Bajaron muchísimo los faltazos"
                            },
                            {
                                text: "Yo no soy de andar con computadoras, pero acá todo pasa por WhatsApp y queda guardado en la base de datos de mi barbería. Cambio de celular y no pierdo nada: clientes, citas ni caja.",
                                name: "Diego",
                                location: "Barbería Barrio Sur (Montevideo)",
                                highlight: "no pierdo nada"
                            }
                        ].map((testimonial, i) => (
                            <div key={i} className="relative group animate-reveal">
                                {/* Decorative quote icon */}
                                <div className="absolute -top-6 -left-6 w-16 h-16 bg-[#ff7700]/10 rounded-full flex items-center justify-center z-20">
                                    <svg className="w-8 h-8 text-[#ff7700] opacity-50" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                    </svg>
                                </div>

                                <div className="p-8 pt-10 rounded-2xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-[#ff7700]/40 transition-all duration-300 backdrop-blur-sm relative z-10 h-full flex flex-col">
                                    {/* Highlight badge */}
                                    <div className="inline-flex items-center gap-2 mb-4 self-start">
                                        <div className="w-2 h-2 rounded-full bg-[#ff7700] animate-pulse"></div>
                                        <span className="text-[#ff7700] font-bold text-xs uppercase tracking-wider">{testimonial.highlight}</span>
                                    </div>

                                    {/* Text content - reduced */}
                                    <p className="text-white/70 text-base leading-relaxed mb-6 flex-grow italic">"{testimonial.text}"</p>

                                    {/* Author info with enhanced design */}
                                    <div className="flex items-center gap-4 pt-6 mt-auto border-t border-white/10">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ff7700] to-[#ff8800] flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                            {testimonial.name[0]}
                                        </div>
                                        <div>
                                            <div className="text-white font-bold text-sm">– {testimonial.name}</div>
                                            <div className="text-white/40 text-xs mt-0.5">{testimonial.location}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 8. FAQ (Source: /barberox3) */}
            <section className="py-24 bg-[#0a0a0a]">
                <div className="container mx-auto px-6 max-w-4xl text-left">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Preguntas Frecuentes</h2>
                    </div>
                    <div className="space-y-4">
                        {[
                            { q: '¿Qué pasa si ya tengo un sistema para barbería?', a: 'Podés seguir usándolo. Barberox se encarga de la agenda automática por WhatsApp y la recepción con IA.' },
                            { q: '¿Pierdo mis datos si cambio de celular?', a: 'No. Todo queda en la base de datos de tu barbería, no en tu WhatsApp.' },
                            { q: '¿Es difícil de activarlo?', a: 'No. Te ayudamos a activarlo y dejarlo andando en menos de 24 horas.' }
                        ].map((faq, i) => (
                            <details key={i} className="group bg-black border border-white/5 rounded-2xl open:border-primary/30 transition-all">
                                <summary className="flex justify-between items-center p-6 cursor-pointer list-none font-medium text-lg">
                                    <span>{faq.q}</span>
                                    <span className="transition group-open:rotate-180">
                                        <svg className="w-6 h-6 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </span>
                                </summary>
                                <div className="px-6 pb-6 text-white/50">{faq.a}</div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* NEW: Esto no es para todo el mundo (Source: /barberox) */}
            <section className="py-32 bg-black relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] pointer-events-none"></div>
                <div className="container mx-auto px-6 text-center relative z-10">
                    <h2 className="text-3xl md:text-5xl font-black mb-16 animate-reveal uppercase italic tracking-tighter">
                        ESTO <span className="text-primary not-italic">NO ES</span> PARA TODO EL MUNDO.
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {/* PARA QUIÉN ES */}
                        <div className="group p-10 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-green-500/30 transition-all duration-500 animate-reveal text-left relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <svg className="w-24 h-24 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-black mb-6 uppercase tracking-wider flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center text-green-500 text-sm">✓</span>
                                PARA QUIÉN ES
                            </h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <div className="mt-1.5 w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                                    <span className="text-white/70 text-sm font-medium">Barberías que quieren escalar y dejar de ser esclavos del negocio.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="mt-1.5 w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                                    <span className="text-white/70 text-sm font-medium">Dueños que valoran su tiempo y buscan profesionalismo real.</span>
                                </li>
                            </ul>
                        </div>

                        {/* EL RESULTADO */}
                        <div className="group p-10 rounded-[2.5rem] bg-gradient-to-b from-primary/20 to-transparent border-2 border-primary/30 animate-reveal relative overflow-hidden shadow-[0_0_50px_rgba(255,119,0,0.1)]">
                            <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/40 transition-all duration-700"></div>
                            <h3 className="text-xl font-black mb-6 uppercase text-primary tracking-widest">EL RESULTADO</h3>
                            <div className="text-5xl font-black text-white mb-6 uppercase italic tracking-tighter gold-shimmer-text">Libertad</div>
                            <p className="text-white/60 text-sm leading-relaxed max-w-[200px] mx-auto font-medium">
                                No más domingos contestando mensajes. <b className="text-white">El sistema corre solo mientras vos descansás.</b>
                            </p>
                        </div>

                        {/* PARA QUIÉN NO ES */}
                        <div className="group p-10 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-red-500/30 transition-all duration-500 animate-reveal text-left relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <svg className="w-24 h-24 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-black mb-6 uppercase tracking-wider flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center text-red-500 text-sm">✕</span>
                                PARA QUIÉN NO ES
                            </h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <div className="mt-1.5 w-1.5 h-1.5 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.6)]"></div>
                                    <span className="text-white/70 text-sm font-medium">Barberos que prefieren la libreta y el desorden.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="mt-1.5 w-1.5 h-1.5 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.6)]"></div>
                                    <span className="text-white/70 text-sm font-medium">Negocios sin ambición que se conforman con lo que hay.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section id="pricing" className="py-40 bg-black text-center relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] opacity-20"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <h2 className="text-5xl md:text-8xl font-black mb-12 tracking-tighter animate-reveal">ÚNETE A LA ÉLITE.</h2>
                    <div className="max-w-2xl mx-auto p-12 card-v2 border-primary/30 animate-reveal">
                        <span className="Founders-badge mb-6 inline-block">Plan Único de Lanzamiento</span>
                        <div className="text-7xl font-black mb-4">$5.000 <span className="text-lg text-text-muted font-normal">/mes</span></div>
                        <p className="text-text-muted mb-10">No dejes pasar tus regalos de lanzamiento incluidos para los primeros 25 barberos de Uruguay.</p>
                        <ul className="text-left space-y-4 mb-12 max-w-sm mx-auto font-medium">
                            <li className="flex items-center gap-4"><svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg> Agenda Smart 24/7</li>
                            <li className="flex items-center gap-4 justify-between">
                                <div className="flex items-center gap-4">
                                    <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                    <span>Asistente IA Personal</span>
                                </div>
                                <span className="badge-free-shimmer">Incluido Gratis</span>
                            </li>
                            <li className="flex items-center gap-4 justify-between">
                                <div className="flex items-center gap-4">
                                    <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                    <span>Panel Web + Base de Datos</span>
                                </div>
                                <span className="badge-free-shimmer">Incluido Gratis</span>
                            </li>
                        </ul>
                        <a
                            href="https://wa.me/message/TJKNS7LTAVVGN1"
                            className="btn-primary-v2 w-full justify-center"
                            onClick={() => {
                                // Track CTA click
                                trackEvent('cta_click', { source: 'pricing' });

                                // Meta Pixel tracking
                                if (typeof window.fbq === 'function') {
                                    window.fbq('track', 'Purchase', {
                                        currency: 'UYU',
                                        value: 5000
                                    });
                                }
                            }}
                        >
                            QUIERO ACTIVAR MI AGENDA AUTOMÁTICA
                        </a>
                    </div>

                    <div className="mt-16 text-center">
                        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/5 bg-white/5 backdrop-blur-sm animate-reveal">
                            <svg className="w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                            </svg>
                            <span className="text-sm text-white/50">Garantía de 30 días. Sin riesgo.</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer (Source: /barberox2) */}
            <footer className="py-8 border-t border-white/5 bg-black text-center text-sm text-white/30">
                <div className="container mx-auto px-6">
                    Todos los derechos reservados | &copy; 2026 <a href="https://codexa.uy" className="text-white/40 hover:text-white transition-colors no-underline">Code<span className="text-[#00CCC2]">x</span>a.uy</a>
                </div>
            </footer>
        </div>
    );
};

export default BarberoxPage;

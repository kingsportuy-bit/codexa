'use client';

import React, { useEffect } from 'react';

import './landing.css';
const BarberoxLandingPage = () => {
    useEffect(() => {
        // Carousel Script
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

        if (slides.length > 0) {
            slides[0].classList.add('active');
            const interval = setInterval(() => {
                slides[currentSlide].classList.remove('active');
                currentSlide = (currentSlide + 1) % slides.length;
                slides[currentSlide].classList.add('active');
                if (urlBar) urlBar.textContent = urls[currentSlide];
            }, 4000);
            return () => clearInterval(interval);
        }
    }, []);

    useEffect(() => {
        // Assistant Messages Script
        const cards = document.querySelectorAll('.message-card-persistent');
        const assistantSection = document.getElementById('assistant-section');
        let current = 0;
        let animated = false;

        const showNext = () => {
            if (current < cards.length) {
                cards[current].classList.remove('opacity-0', 'translate-y-4');
                current++;
                setTimeout(showNext, 3000);
            } else {
                setTimeout(() => {
                    cards.forEach(c => c.classList.add('opacity-0', 'translate-y-4'));
                    current = 0;
                    setTimeout(showNext, 1000);
                }, 5000);
            }
        };

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !animated) {
                animated = true;
                setTimeout(showNext, 500);
            }
        }, { threshold: 0.2 });

        if (assistantSection) observer.observe(assistantSection);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.animate-fade-up').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        // WhatsApp Chat Animation (First Phone)
        const bubbles = document.querySelectorAll('.chat-bubble-reveal');
        const phoneSection = document.getElementById('features');
        let index = 0;
        let animated = false;

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

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !animated) {
                animated = true;
                setTimeout(showBubbles, 500);
            }
        }, { threshold: 0.2 });

        if (phoneSection) observer.observe(phoneSection);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        // Smart Reminder Notification Animation
        const notification = document.querySelector('.reminder-notification-reveal');
        const reminderSection = document.getElementById('reminders-section');
        let animated = false;

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !animated) {
                animated = true;
                setTimeout(() => {
                    if (notification) {
                        notification.classList.remove('opacity-0', 'translate-y-8');
                        notification.classList.add('opacity-100', 'translate-y-0');
                    }
                }, 1000);
            }
        }, { threshold: 0.5 });

        if (reminderSection) observer.observe(reminderSection);
        return () => observer.disconnect();
    }, []);

    return (
        <div className="barberox-landing bg-[#050505] text-white min-h-screen font-outfit antialiased selection:bg-primary/30 selection:text-white">
            {/* Fixed Glass Navbar */}
            <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/50 backdrop-blur-xl">
                <div className="container mx-auto px-6 h-20 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <img src="/barberox/img/logo.png" alt="Barberox" className="h-8 w-auto object-contain" />
                        <span className="text-xs font-bold tracking-[0.2em] text-white/40 uppercase ml-2 border-l border-white/10 pl-2">Premium</span>
                    </div>
                    <a href="#pricing" className="bg-white/5 hover:bg-primary/20 text-white text-sm font-medium px-6 py-2.5 rounded-full border border-white/10 hover:border-primary/50 transition-all duration-300 flex items-center gap-2 group">
                        Obtener Acceso
                        <svg className="w-4 h-4 text-white/50 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                        </svg>
                    </a>
                </div>
            </nav>

            {/* 1. Cinematic Hero Section */}
            <section className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/10 rounded-full blur-[150px] opacity-40 pointer-events-none"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay pointer-events-none"></div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 animate-fade-up">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                        <span className="text-xs font-medium tracking-widest uppercase text-white/70">La Nueva Era de la Barbería</span>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8 leading-none animate-fade-up delay-100">
                        <span className="block text-white">AGENDA AUTOMÁTICA</span>
                        <span className="block text-gradient-orange uppercase">por WhatsApp.</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-white/50 max-w-2xl mx-auto mb-12 font-light animate-fade-up delay-200">
                        Tu <b className="text-primary font-medium">recepcionista IA</b> atiende clientes, responde dudas y llena tu calendario 24/7. Cada mensaje que no respondés es un turno perdido.
                        <br /><br />
                        <span className="text-white/40 text-sm">Todo queda guardado en la <b className="text-white/60">base de datos de tu barbería:</b> clientes, citas y caja.</span>
                    </p>

                    <div className="flex flex-col items-center justify-center gap-4 animate-fade-up delay-300">
                        <a href="#pricing" className="group relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden w-full md:w-auto hover:scale-105 transition-transform duration-300">
                            <div className="absolute inset-0 bg-primary/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                Quiero activar la agenda automática
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                </svg>
                            </span>
                        </a>
                        <p className="text-xs text-white/40 mt-2">¿Estás listo para el futuro?</p>
                    </div>

                    <div className="absolute w-full max-w-lg left-1/2 -translate-x-1/2 bottom-10 opacity-50 animate-bounce delay-1000">
                        <svg className="w-6 h-6 mx-auto text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                        </svg>
                    </div>
                </div>
            </section>

            {/* 2. The Great Divide (Comparison) */}
            <section className="py-24 bg-black relative border-t border-white/5">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">La Gran <span className="text-primary">División</span></h2>
                        <p className="text-white/50 mb-4">¿Links aburridos o Conversación Real?</p>
                        <p className="text-red-900/60 text-xs font-bold uppercase tracking-widest">Antes: mensajes perdidos, turnos mal anotados y clientes enojados.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
                        <div className="p-8 rounded-3xl border border-white/10 bg-[#0a0a0a] opacity-60 hover:opacity-100 transition-opacity relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-full h-1 bg-red-800"></div>
                            <h3 className="text-lg font-bold text-white/60 mb-6 uppercase tracking-widest border-b border-white/5 pb-4">1. El Pasado (Manual)</h3>
                            <ul className="space-y-4 text-white/70 text-sm">
                                <li className="flex items-start gap-3">
                                    <svg className="w-4 h-4 text-red-800 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                    <span>WhatsApp colapsado. Perdés horas contestando &apos;precios?&apos;.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <svg className="w-4 h-4 text-red-800 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                    <span>Interrumpir cortes = Cliente enojado + Corte mediocre.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <svg className="w-4 h-4 text-red-800 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                    <span>Si te escriben a las 2 AM, perdés el cliente.</span>
                                </li>
                            </ul>
                        </div>

                        <div className="p-8 rounded-3xl border border-white/10 bg-[#0a0a0a] opacity-60 hover:opacity-100 transition-opacity relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-full h-1 bg-yellow-700/50"></div>
                            <h3 className="text-lg font-bold text-white/60 mb-6 uppercase tracking-widest border-b border-white/5 pb-4">2. La Trampa (Apps)</h3>
                            <ul className="space-y-4 text-white/70 text-sm">
                                <li className="flex items-start gap-3">
                                    <svg className="w-4 h-4 text-yellow-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                                    </svg>
                                    <span>Tu cliente debe <b className="text-primary">salir de WhatsApp</b> (Alta Fricción).</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <svg className="w-4 h-4 text-yellow-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                                    </svg>
                                    <span>Requiere registrarse o bajar apps. El cliente lo odia.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <svg className="w-4 h-4 text-yellow-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                                    </svg>
                                    <span>Es frío. Si tienen dudas del corte, no pueden preguntar.</span>
                                </li>
                            </ul>
                        </div>

                        <div className="p-8 rounded-3xl gold-surface-premium relative overflow-hidden transform md:-translate-y-6 md:scale-105 z-20">
                            <div className="absolute top-0 right-0 px-4 py-1 bg-primary text-white text-[10px] font-bold uppercase rounded-bl-xl z-30 shadow-lg">El Ganador</div>
                            <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
                            <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-widest border-b border-white/10 pb-4">3. Barberox (IA)</h3>
                            <ul className="space-y-4 text-white">
                                <li className="flex items-start gap-3">
                                    <div className="p-1 bg-green-500/20 rounded-full"><svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                                    <span className="text-sm font-medium">Agenda automática 24/7 por WhatsApp <br /><span className="text-white/40 text-xs font-normal">(sin apps raras, solo WhatsApp).</span></span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="p-1 bg-green-500/20 rounded-full"><svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                                    <span className="text-sm font-medium">Asistente IA que responde preguntas frecuentes y toma turnos solo.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="p-1 bg-green-500/20 rounded-full"><svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                                    <span className="text-sm font-medium">Cada turno queda guardado en la <b className="text-primary">base de datos de tu barbería.</b></span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="p-1 bg-green-500/20 rounded-full"><svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                                    <span className="text-sm font-medium">Menos mensajes sin responder, más turnos ocupados.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. AI Revolution */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/5"></div>
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
                        LA IA NO VA A <span className="text-[#ff7700]">REEMPLAZARTE.</span><br />
                        <span className="text-[#ff7700]">VA A REEMPLAZAR A QUIEN NO LA USE.</span>
                    </h2>
                    <p className="text-2xl md:text-3xl font-light text-white/50 max-w-3xl mx-auto mb-12">
                        El futuro de tu barbería es <b className="text-primary">ahora.</b>
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto border-t border-b border-white/10 py-12">
                        <div>
                            <div className="text-4xl font-bold text-white mb-2">80%</div>
                            <div className="text-sm text-white/40 uppercase tracking-widest">Efectividad</div>
                            <p className="text-xs text-white/30 mt-2">Menos mensajes sin responder.</p>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-white mb-2">+15hs</div>
                            <div className="text-sm text-white/40 uppercase tracking-widest">Tiempo Libre</div>
                            <p className="text-xs text-white/30 mt-2">Al mes que dejás de gastar contestando WhatsApp.</p>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-white mb-2">24/7</div>
                            <div className="text-sm text-white/40 uppercase tracking-widest">Atención</div>
                            <p className="text-xs text-white/30 mt-2">Atendiendo incluso cuando estás cortando o dormido.</p>
                        </div>
                    </div>
                    <p className="mt-12 text-white/50 italic">&quot;Adaptarse o desaparecer. El mercado no espera.&quot;</p>
                </div>
            </section>

            {/* 4. The Solution */}
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
                                        <p className="text-white/50 text-sm">Respuestas instantáneas a tus clientes. La velocidad cierra ventas.</p>
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
                                    <div className="flex-1 p-4 space-y-4 overflow-hidden relative">
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
                                        {/* Simplified chat for React conversion, the rest is in the original html flow but here we only need visual representation */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-4 gap-6 mt-24 pt-16 border-t border-white/5">
                        {[
                            { title: 'Multi-Sucursal', desc: 'Gestiona múltiples locales y barberos desde un solo número de WhatsApp. La IA rutea cada turno al calendario correcto.', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
                            { title: 'Entiende Contexto', desc: 'Detecta intenciones reales: "Quiero cancelar", "Cambíame el turno", o "Llego tarde". No es un menú fijo, es inteligencia.', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
                            { title: 'Cálculo Real', desc: 'Analiza duración de servicios y huecos libres en tiempo real. Nunca ofrece horarios imposibles.', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
                            { title: 'Notificaciones', desc: 'Te avisa al instante si alguien reserva o cancela. Mantienes el control total sin mirar la pantalla.', icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' }
                        ].map((f, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/30 transition-colors animate-fade-up">
                                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center mb-4 text-primary">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={f.icon} />
                                    </svg>
                                </div>
                                <h4 className="text-lg font-bold text-white mb-2">{f.title}</h4>
                                <p className="text-white/50 text-sm">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4.5. Zero Inasistencias (Smart Reminders) */}
            <section id="reminders-section" className="py-24 relative overflow-hidden bg-black border-t border-white/5">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col md:flex-row items-center gap-16">
                        <div className="md:w-1/2 order-2 md:order-1">
                            <div className="relative w-[280px] h-[580px] mx-auto bg-black rounded-[3rem] border-[8px] border-[#1a1a1a] shadow-2xl overflow-hidden group">
                                {/* Wallpaper Background */}
                                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1614850523296-e8c041de4398?auto=format&fit=crop&q=80')] bg-cover bg-center brightness-50"></div>

                                {/* Lock Screen Content */}
                                <div className="relative h-full flex flex-col items-center pt-20 px-4">
                                    <div className="text-6xl font-light text-white mb-2">16:30</div>
                                    <div className="text-sm text-white/70 mb-20">jueves, 3 de enero</div>

                                    {/* Notification Mockup */}
                                    <div className="w-full space-y-3 reminder-notification-reveal opacity-0 translate-y-8 transition-all duration-700">
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

                                {/* Dynamic Island / Notch */}
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
                        </div>
                    </div>
                </div>
            </section>

            {/* Bonus Pack Header */}
            <section className="py-20 bonus-header overflow-hidden">
                <div className="container mx-auto px-6 text-center">
                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-md mb-6 animate-fade-up">
                        <span className="bonus-badge">BARBEROX PREMIUM</span>
                        <span className="text-sm font-bold text-white tracking-widest uppercase">Pack de Regalos Incluidos</span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter animate-fade-up">
                        VALOR AGREGADO <br /> <span className="text-primary italic">SIN COSTO EXTRA.</span>
                    </h2>
                    <p className="text-white/40 max-w-2xl mx-auto text-lg animate-fade-up">
                        Diseñamos estos complementos para que no necesites ninguna otra herramienta. Todo lo que tu barbería necesita para escalar, hoy es un <b className="text-white">regalo por lanzamiento.</b>
                    </p>
                </div>
            </section>

            {/* 5. Bonus 1: Web OS */}
            <section className="py-24 bg-black border-t border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-500/5 blur-[100px]"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col md:flex-row items-center gap-16">
                        <div className="md:w-1/2 relative">
                            <div className="inline-flex items-center gap-2 mb-6 animate-fade-up">
                                <span className="bonus-badge">REGALO #1</span>
                                <span className="text-blue-500 text-xs font-bold tracking-[0.2em] uppercase">BONUS: Barberox Web OS</span>
                            </div>
                            <div className="absolute -left-4 top-10 w-24 h-24 bg-blue-500/20 rounded-full blur-3xl"></div>
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 animate-fade-up">Detrás de la agenda,<br /><span className="text-[#ff7700]">TU PANEL WEB.</span></h2>
                            <div className="bg-blue-500/10 border-l-2 border-blue-500 p-4 mb-8 rounded-r-xl">
                                <p className="text-white/80 text-sm font-medium">Controla turnos, caja y clientes desde un solo lugar. <span className="text-primary font-bold ml-2">INCLUIDO</span></p>
                            </div>
                            <p className="text-white/60 text-lg mb-8">Gestión profesional multidispositivo. Centraliza agenda, caja y clientes en una sola plataforma diseñada para escalar.</p>

                            <ul className="space-y-3">
                                {[
                                    { bold: 'Base de Datos Profesional:', text: 'Tus clientes, citas e historial de caja profesional.', icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4' },
                                    { bold: 'Sistema de Puntajes:', text: 'Ranking mensual e histórico de clientes para fidelización.', icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z' },
                                    { bold: 'Ranking de Barberos:', text: 'Ranking mensual e histórico de rendimiento por barbero.', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
                                    { bold: 'Gestión de Horarios:', text: 'Configura almuerzos, bloquea horas y días fácilmente.', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
                                    { bold: 'Reportes Claros:', text: 'Métricas para ver qué días y barberos generan más ingresos.', icon: 'M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z' },
                                    { bold: 'Multi-Sucursal:', text: 'Todo tu negocio y locales en un solo panel centralizado.', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' }
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
                                <div className="relative bg-[#0f1115] border border-white/10 rounded-xl shadow-2xl overflow-hidden transform group-hover:rotate-x-2 transition-transform duration-500 h-[300px] md:h-[350px]">
                                    <div className="h-8 bg-[#1a1d24] border-b border-white/5 flex items-center px-4 gap-2 z-20 relative">
                                        <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                                        <div className="ml-4 h-4 w-64 bg-white/5 rounded-full text-[10px] text-white/20 flex items-center px-2 font-mono" id="browser-url">app.barberox.com/dashboard</div>
                                    </div>

                                    <div className="relative w-full bg-[#0f1115]" style={{ height: 'calc(100% - 32px)' }}>
                                        {['dashboard_citas', 'calendario_mensual', 'lista_clientes', 'whatsapp_web', 'dashboard_financiero'].map((img, i) => (
                                            <img key={i} src={`/barberox/img/screenshots/${img}.png`} className="screenshot-slide absolute inset-0 w-full h-full object-contain object-top opacity-0 transition-opacity duration-1000" alt={img} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5b. Bonus 2: AI Assistant */}
            <section id="assistant-section" className="py-24 bg-[#050505] border-t border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-yellow-500/5 blur-[100px]"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col md:flex-row-reverse items-center gap-16">
                        <div className="md:w-1/2 text-left relative">
                            <div className="inline-flex items-center gap-2 mb-6 animate-fade-up">
                                <span className="bonus-badge">BONUS DE LANZAMIENTO</span>
                                <span className="text-yellow-500 text-xs font-bold tracking-[0.2em] uppercase">Gratis con Barberox AI</span>
                            </div>
                            <div className="absolute -right-4 top-10 w-24 h-24 bg-yellow-500/20 rounded-full blur-3xl"></div>
                            <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-up">Asistente Personal<br /><span className="text-[#ff7700]">POR WHATSAPP.</span></h2>
                            <div className="bg-yellow-500/10 border-l-2 border-yellow-500 p-4 mb-8 rounded-r-xl">
                                <p className="text-white/80 text-sm font-medium">IA que responde precios, horarios y dudas frecuentes. <span className="text-primary font-bold ml-2">INCLUIDO</span></p>
                            </div>
                            <p className="text-white/60 text-lg mb-8">Un asistente IA que responde todas las dudas de tus clientes por WhatsApp sin que tengas que levantar el celular.</p>

                            <ul className="space-y-4">
                                {[
                                    { bold: 'Bloqueos por Audio:', text: '"Bloqueame el martes a la tarde".', icon: 'M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z' },
                                    { bold: 'Resumen Nocturno:', text: 'Recibe tu agenda de mañana cada noche.', icon: 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z' },
                                    { bold: 'Notificaciones en Vivo:', text: 'Te avisa cada vez que alguien reserva.', icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' }
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center">
                                            <svg className="w-4 h-4 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                                            </svg>
                                        </div>
                                        <span className="text-white/80"><b className="text-primary">{item.bold}</b> {item.text}</span>
                                    </li>
                                ))}
                            </ul>
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

                                <div id="asistente-messages" className="absolute inset-x-0 bottom-0 top-24 p-4 space-y-4 overflow-hidden flex flex-col justify-end bg-[#0b141a]">
                                    <div className="message-card-persistent bg-[#202c33] p-3 rounded-lg rounded-tl-none border border-white/5 shadow-md transform opacity-0 translate-y-4 transition-all duration-500 text-left">
                                        <p className="text-[11px] text-primary font-bold mb-1">Resumen de Mañana 🌙</p>
                                        <p className="text-[10px] text-white/90 whitespace-pre-line leading-relaxed">
                                            ¡Buenas noches Jose!<br />
                                            Mañana tienes las siguientes citas agendadas:<br />
                                            - 09:00 - Diego Ferreira - Corte - 60m<br />
                                            - 10:00 - Fernando Rodriguez - Corte - 60m<br />
                                            - 11:00 - Santiago Gonzalez - Corte - 60m<br />
                                            - 12:00 - Gabriel Silvera - Corte - 60m<br />
                                            - 13:00 - Cristian Blanco - Corte - 60m<br />
                                            - ... y 6 turnos más por la tarde.
                                        </p>
                                        <div className="text-[9px] text-white/30 text-right mt-1">21:00</div>
                                    </div>
                                    <div className="message-card-persistent bg-[#202c33] p-3 rounded-lg rounded-tl-none border border-white/5 shadow-md transform opacity-0 translate-y-4 transition-all duration-500 text-left">
                                        <p className="text-[11px] text-green-400 font-bold mb-1">Nuevo Turno 💈</p>
                                        <p className="text-white/90 text-xs">Juan Román agendó <b className="text-primary">Corte</b> a las 18:00hs.</p>
                                        <div className="text-[9px] text-white/30 text-right mt-1">10:15</div>
                                    </div>
                                    <div className="message-card-persistent bg-[#202c33] p-3 rounded-lg rounded-tl-none border border-white/5 shadow-md transform opacity-0 translate-y-4 transition-all duration-500 text-left">
                                        <p className="text-[11px] text-red-400 font-bold mb-1">Turno Cancelado ❌</p>
                                        <p className="text-white/90 text-xs">Gustavo Gomez canceló su turno de las 16:00hs.</p>
                                        <div className="text-[9px] text-white/30 text-right mt-1">11:30</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. Testimonials */}
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
                            <div key={i} className="relative group">
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
                                    <p className="text-white/70 text-base leading-relaxed mb-6 flex-grow line-clamp-4">"{testimonial.text}"</p>

                                    {/* Author info with enhanced design */}
                                    <div className="flex items-center gap-4 pt-6 border-t border-white/10">
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

            {/* 7. Trust & FAQ */}
            <section className="py-24 bg-[#0a0a0a]">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Preguntas Frecuentes</h2>
                        <p className="text-white/50">Elimina tus dudas y empieza a crecer.</p>
                    </div>

                    <div className="space-y-4">
                        {[
                            { q: '¿Qué pasa si ya tengo un sistema para barbería?', a: 'Podés seguir usándolo. Barberox se encarga de la agenda automática por WhatsApp y la recepción con IA. Todo lo que pase en el chat queda guardado en tu base de datos.' },
                            { q: '¿Pierdo mis datos si cambio de celular?', a: 'No. Todo queda en la base de datos de tu barbería, no en tu WhatsApp. Podés cambiar de teléfono sin perder clientes ni citas.' },
                            { q: '¿Es difícil de configurar?', a: 'No. Te ayudamos a conectarlo y dejarlo andando. En menos de 24 horas podés tener tu agenda automática activa.' }
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

            {/* 7. Pricing */}
            <section id="pricing" className="pt-32 pb-20 relative bg-black flex flex-col items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-black to-black opacity-50 pointer-events-none"></div>

                <div className="container mx-auto px-6 relative z-10 w-full">
                    <div className="max-w-xl mx-auto">
                        <div className="text-center mb-10">
                            <span className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-4 block">Oferta Limitada</span>
                            <h2 className="text-4xl font-bold">¿Estás listo para el futuro?</h2>
                        </div>

                        <div className="group relative perspective-1000">
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-white/20 to-primary rounded-[24px] blur opacity-20 group-hover:opacity-40 transition duration-1000 animate-pulse"></div>
                            <div className="relative bg-[#0a0a0a] border border-white/10 rounded-[20px] p-8 md:p-12 overflow-hidden shadow-2xl transition-transform duration-500 hover:rotate-x-2 animate-fade-up">
                                <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                                <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/5 rounded-full blur-[80px]"></div>

                                <div className="relative z-10 flex justify-between items-start mb-12">
                                    <div>
                                        <img src="/barberox/img/logo.png" alt="Barberox" className="h-6 opacity-80 mb-2 grayscale brightness-200" />
                                        <div className="text-[10px] text-white/40 uppercase tracking-[0.3em]">Founders Edition</div>
                                    </div>
                                </div>

                                <div className="relative z-10 text-center py-8">
                                    <span className="text-6xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 tracking-tight">$5.000</span>
                                    <div className="text-sm text-white/30 uppercase tracking-widest mt-2">Mensuales</div>
                                </div>

                                <div className="relative z-10 space-y-3 my-8 border-t border-white/5 pt-8">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-white/60">Agenda automática 24/7 por WhatsApp</span>
                                        <span className="text-white font-medium">Incluido</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-white/60">Asistente IA (Bonus Lanzamiento)</span>
                                        <span className="text-white font-medium">Incluido</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-white/60">Panel Web Completo + Base de Datos</span>
                                        <span className="text-white font-medium">Incluido</span>
                                    </div>
                                </div>

                                <div className="relative z-10 flex flex-col items-center">
                                    <a href="https://wa.me/message/TJKNS7LTAVVGN1" className="inline-flex items-center gap-3 bg-[#ff7700] hover:bg-[#ff8800] text-white px-8 py-5 rounded-full font-bold transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(255,119,0,0.3)]">
                                        Quiero activar Barberox en mi barbería
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16 text-center">
                        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/5 bg-white/5 backdrop-blur-sm">
                            <svg className="w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                            </svg>
                            <span className="text-sm text-white/50">Garantía de 30 días. Sin riesgo.</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Minimal Footer */}
            <footer className="py-5 border-t border-white/5 bg-black text-center text-sm text-[gray]">
                <div className="container mx-auto px-6">
                    Todos los derechos reservados | &copy; 2025 <a href="https://codexa.uy" className="text-[gray] hover:text-white transition-colors no-underline">Code<span className="text-[#00CCC2]">x</span>a.uy</a>
                </div>
            </footer>
        </div>
    );
};

export default BarberoxLandingPage;

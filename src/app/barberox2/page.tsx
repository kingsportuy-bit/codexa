'use client';

import React, { useEffect, useState } from 'react';
import './landing_v2.css';

const Barberox2Page = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.animate-reveal').forEach(el => observer.observe(el));

        return () => {
            window.removeEventListener('scroll', handleScroll);
            observer.disconnect();
        };
    }, []);

    return (
        <div className="font-outfit">
            {/* Minimalist Navbar */}
            <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/10 py-4' : 'bg-transparent py-8'}`}>
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <img src="/barberox/img/logo.png" alt="Barberox" className="h-8 w-auto brightness-200" />
                        <span className="Founders-badge">Founders Edition</span>
                    </div>
                    <a href="#pricing" className="text-white font-bold text-sm tracking-widest hover:text-primary transition-colors">
                        ACCESO EXCLUSIVO
                    </a>
                </div>
            </nav>

            {/* 1. Aggressive Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-hero-gradient">
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <div className="mb-8 animate-reveal">
                        <span className="text-primary font-black tracking-[0.3em] uppercase text-sm">El mercado ha cambiado</span>
                    </div>

                    <h1 className="text-6xl md:text-[100px] font-black leading-[0.9] tracking-tighter mb-8 animate-reveal">
                        DEJA DE SER <span className="text-gradient-orange">ESCLAVO</span> <br />
                        DE TU WHATSAPP.
                    </h1>

                    <p className="text-2xl md:text-3xl text-text-muted max-w-3xl mx-auto mb-12 font-light animate-reveal">
                        Tu negocio debe producir dinero mientras <b className="text-white">cortas el pelo</b>, no mientras pierdes tiempo contestando "precios?".
                        <br />
                        <span className="text-white/40 text-lg mt-4 block">Barberox es el sistema que Alex Hormozi usaría para escalar su barbería.</span>
                    </p>

                    <div className="animate-reveal">
                        <a href="#pricing" className="btn-primary-v2">
                            Quiero automatizar mi barbería ahora
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                            </svg>
                        </a>
                        <p className="text-xs text-white/30 mt-6 uppercase tracking-widest">Solo 5 cupos disponibles este mes</p>
                    </div>
                </div>

                {/* iPhone Mockup Floating */}
                <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-full max-w-2xl opacity-40 blur-sm pointer-events-none">
                    <div className="relative aspect-[16/9] w-full bg-primary/20 rounded-full blur-[120px]"></div>
                </div>
            </section>

            {/* 2. The Hard Truth Section (ROI focus) */}
            <section className="py-32 bg-black">
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

            {/* 3. The "Anti-App" Section */}
            <section className="py-32 border-t border-white/5 relative overflow-hidden">
                <div className="container mx-auto px-6 text-center relative z-10">
                    <span className="text-primary font-black tracking-[0.3em] uppercase text-sm mb-6 block animate-reveal">Basta de apps lentas</span>
                    <h2 className="text-5xl md:text-7xl font-black mb-12 animate-reveal">TU CLIENTE NO QUIERE <br /> BAJAR OTRA APP.</h2>
                    <p className="text-xl md:text-2xl text-text-muted max-w-3xl mx-auto mb-20 animate-reveal">
                        Obligar a un cliente a salir de WhatsApp para registrarse en un link es el <b className="text-white">asesino #1 de conversiones</b>.
                        Barberox ocurre donde tus clientes ya están.
                    </p>

                    <div className="max-w-4xl mx-auto animate-reveal">
                        <div className="bg-[#0b141a] rounded-[3rem] p-8 border border-white/10 shadow-2xl">
                            <div className="flex flex-col gap-4">
                                {/* Simulating WhatsApp interaction */}
                                <div className="flex justify-start">
                                    <div className="bg-[#202c33] p-4 rounded-2xl rounded-tl-none text-left max-w-sm">
                                        <p className="text-sm">Hola! Tenes lugar para hoy 18hs?</p>
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <div className="bg-[#005c4b] p-4 rounded-2xl rounded-tr-none text-left max-w-sm border border-primary/30">
                                        <p className="text-sm font-bold text-primary mb-1">Barberox AI Assistant</p>
                                        <p className="text-sm text-white">Hola crack! Sí, Jose tiene libre a esa hora. Te agendo? ✂️</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Filter Section (Tate Style) */}
            <section className="py-32 bg-primary/5">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-5xl font-black mb-16 animate-reveal">ESTO NO ES PARA TODO EL MUNDO.</h2>
                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <div className="p-10 card-v2 animate-reveal">
                            <h3 className="text-xl font-black mb-4 uppercase">PARA QUIÉN ES</h3>
                            <ul className="text-sm space-y-4 text-text-muted text-left">
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div> Barberías que quieren escalar.</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div> Dueños que valoran su tiempo.</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div> Profesionales del sector.</li>
                            </ul>
                        </div>
                        <div className="p-10 card-v2 border-primary animate-reveal">
                            <h3 className="text-xl font-black mb-4 uppercase text-primary">EL RESULTADO</h3>
                            <div className="text-4xl font-black text-white mb-4">LIBERTAD</div>
                            <p className="text-sm text-text-muted">No más domingos contestando mensajes. El sistema corre solo.</p>
                        </div>
                        <div className="p-10 card-v2 animate-reveal">
                            <h3 className="text-xl font-black mb-4 uppercase">PARA QUIÉN NO ES</h3>
                            <ul className="text-sm space-y-4 text-text-muted text-left">
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div> Barberos que prefieren la libreta.</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div> Negocios sin ambición.</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div> Gente que le tiene miedo a la IA.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Pricing / Closing CTA */}
            <section id="pricing" className="py-40 bg-black text-center relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] opacity-20"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <h2 className="text-5xl md:text-8xl font-black mb-12 tracking-tighter animate-reveal">ÚNETE A LA ÉLITE.</h2>
                    <div className="max-w-2xl mx-auto p-12 card-v2 border-primary/30 animate-reveal">
                        <span className="Founders-badge mb-6 inline-block">Plan Único de Lanzamiento</span>
                        <div className="text-7xl font-black mb-4">$5.000 <span className="text-lg text-text-muted font-normal">/mes</span></div>
                        <p className="text-text-muted mb-10">Precio congelado de por vida para los primeros 25 barberos de Uruguay.</p>
                        <ul className="text-left space-y-4 mb-12 max-w-sm mx-auto font-medium">
                            <li className="flex items-center gap-4"><svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg> Agenda Smart 24/7</li>
                            <li className="flex items-center gap-4"><svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg> Asistente IA Personal</li>
                            <li className="flex items-center gap-4"><svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg> Multi-Sucursal Ilimitada</li>
                        </ul>
                        <button className="btn-primary-v2 w-full justify-center">
                            ASEGURAR MI CUPO
                        </button>
                    </div>
                    <p className="text-text-muted mt-12 text-sm italic animate-reveal">"La mejor inversión es la que te devuelve tu tiempo."</p>
                </div>
            </section>

            <footer className="py-12 border-t border-white/5 bg-black text-center">
                <p className="text-white/20 text-xs tracking-widest uppercase">© 2026 BARBEROX - THE FUTURE OF GROOMING ECONOMICS</p>
            </footer>
        </div>
    );
};

export default Barberox2Page;

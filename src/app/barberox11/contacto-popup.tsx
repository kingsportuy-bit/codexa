"use client";
import { useEffect, useRef, useCallback, useState } from 'react';

const CONTACT_STEPS = [
    { key: "project", prompt: "Contanos sobre tu barbería", placeholder: "¿Cuántos barberos tenés? ¿Dónde estás?" },
    { key: "whatsapp", prompt: "¿Cuál es tu WhatsApp?", placeholder: "+598 99 123 456" },
    { key: "email", prompt: "¿Y tu email?", placeholder: "tu@email.com" },
    { key: "nombre", prompt: "Por último, ¿cuál es tu nombre?", placeholder: "Juan Pérez" },
] as const;

export default function BarberoxContact({ onClose }: { onClose: () => void }) {
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
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/logo-barberox.png"
                        alt="Barberox"
                        className="w-[220px] md:w-[320px] h-auto object-contain"
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

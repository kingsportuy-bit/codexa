'use client';

import { Download, Share2 } from 'lucide-react';
import Image from 'next/image';

interface ImagePreviewProps {
    content: string | null;
    isLoading: boolean;
}

export default function ImagePreview({ content, isLoading }: ImagePreviewProps) {
    const handleDownload = () => {
        if (!content) return;

        const link = document.createElement('a');
        link.href = content;
        link.download = `contenido-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleShare = async () => {
        if (!content) return;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Contenido generado con IA',
                    text: 'Mira este contenido que creé con Codexa',
                    url: content,
                });
            } catch (err) {
                console.log('Error sharing:', err);
            }
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(content);
            alert('Link copiado al portapapeles');
        }
    };

    return (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Vista Previa</h3>
                {content && (
                    <div className="flex gap-2">
                        <button
                            onClick={handleShare}
                            className="p-2 rounded-lg border border-white/10 hover:border-accent hover:bg-accent/10 transition-all"
                            title="Compartir"
                        >
                            <Share2 className="w-5 h-5" />
                        </button>
                        <button
                            onClick={handleDownload}
                            className="p-2 rounded-lg border border-white/10 hover:border-accent hover:bg-accent/10 transition-all"
                            title="Descargar"
                        >
                            <Download className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </div>

            <div className="aspect-square rounded-xl bg-black/50 border border-white/10 overflow-hidden relative">
                {isLoading ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="w-16 h-16 border-4 border-accent/30 border-t-accent rounded-full animate-spin mb-4"></div>
                        <p className="text-sm text-white/60">Generando tu contenido...</p>
                        <p className="text-xs text-white/40 mt-2">Esto puede tomar unos segundos</p>
                    </div>
                ) : content ? (
                    <div className="relative w-full h-full">
                        <Image
                            src={content}
                            alt="Contenido generado"
                            fill
                            className="object-contain"
                        />
                    </div>
                ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                        <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-4">
                            <svg className="w-12 h-12 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <p className="text-white/60 text-sm mb-2">Tu contenido aparecerá aquí</p>
                        <p className="text-white/40 text-xs">Completa el formulario y haz click en "Generar"</p>
                    </div>
                )}
            </div>

            {content && (
                <div className="mt-6 p-4 rounded-xl bg-accent/5 border border-accent/20">
                    <p className="text-sm text-white/80">
                        <span className="font-semibold text-accent">✓ Contenido generado</span><br />
                        <span className="text-xs text-white/60">Listo para descargar y compartir en Instagram</span>
                    </p>
                </div>
            )}
        </div>
    );
}

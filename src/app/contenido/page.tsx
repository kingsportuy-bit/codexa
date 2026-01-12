'use client';

import { useState } from 'react';
import ContentCreatorForm from '@/components/contenido/ContentCreatorForm';
import ImagePreview from '@/components/contenido/ImagePreview';

export default function ContenidoPage() {
    const [generatedContent, setGeneratedContent] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerate = async (formData: any) => {
        setIsGenerating(true);
        try {
            const response = await fetch('/api/contenido/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            setGeneratedContent(data.url);
        } catch (error) {
            console.error('Error generating content:', error);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden border-b border-white/10">
                <div className="absolute inset-0 bg-gradient-to-b from-accent/10 via-black to-black pointer-events-none"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/5 mb-6">
                            <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
                            <span className="text-xs font-bold tracking-widest uppercase text-accent">Creador de Contenido IA</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                            Crea contenido para <span className="text-accent">Instagram</span>
                        </h1>
                        <p className="text-xl text-white/60 max-w-2xl mx-auto">
                            Genera imágenes y animaciones profesionales con inteligencia artificial.
                            Personaliza ofertas, ángulos estratégicos y dale vida a tu marca.
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
                        {/* Form */}
                        <div>
                            <ContentCreatorForm onGenerate={handleGenerate} isGenerating={isGenerating} />
                        </div>

                        {/* Preview */}
                        <div className="lg:sticky lg:top-24 h-fit">
                            <ImagePreview content={generatedContent} isLoading={isGenerating} />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

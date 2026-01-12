'use client';

import { useState } from 'react';
import FileUploader from './FileUploader';
import { Sparkles, Image as ImageIcon, Mic, Target, Zap } from 'lucide-react';

interface ContentCreatorFormProps {
    onGenerate: (data: any) => void;
    isGenerating: boolean;
}

const OFERTAS = [
    { id: 'lanzamiento', nombre: 'Lanzamiento de Producto', descripcion: 'Nuevo producto o servicio' },
    { id: 'descuento', nombre: 'Descuento/Oferta', descripcion: 'Promoción especial limitada' },
    { id: 'evento', nombre: 'Evento', descripcion: 'Evento, workshop o webinar' },
    { id: 'servicio', nombre: 'Servicio Nuevo', descripcion: 'Nuevo servicio disponible' },
    { id: 'educativo', nombre: 'Contenido Educativo', descripcion: 'Tips, guías o tutoriales' },
];

const ANGULOS = [
    { id: 'problema-solucion', nombre: 'Problema-Solución', descripcion: 'Identifica un dolor y ofrece la solución' },
    { id: 'antes-despues', nombre: 'Antes-Después', descripcion: 'Muestra la transformación' },
    { id: 'prueba-social', nombre: 'Prueba Social', descripcion: 'Testimonios y resultados reales' },
    { id: 'urgencia', nombre: 'Urgencia/FOMO', descripcion: 'Tiempo o cantidad limitada' },
    { id: 'tutorial', nombre: 'Tutorial/Educativo', descripcion: 'Enseña algo valioso' },
    { id: 'detras-camaras', nombre: 'Detrás de Cámaras', descripcion: 'Muestra el proceso' },
];

const ESTILOS = [
    { id: 'minimalista', nombre: 'Minimalista' },
    { id: 'colorido', nombre: 'Colorido y Vibrante' },
    { id: 'profesional', nombre: 'Profesional' },
    { id: 'moderno', nombre: 'Moderno y Tech' },
    { id: 'vintage', nombre: 'Vintage/Retro' },
    { id: 'elegante', nombre: 'Elegante y Sofisticado' },
];

export default function ContentCreatorForm({ onGenerate, isGenerating }: ContentCreatorFormProps) {
    const [inputMethod, setInputMethod] = useState<'prompt' | 'upload'>('prompt');
    const [prompt, setPrompt] = useState('');
    const [photoFile, setPhotoFile] = useState<File | null>(null);
    const [audioFile, setAudioFile] = useState<File | null>(null);
    const [selectedOferta, setSelectedOferta] = useState('');
    const [selectedAngulo, setSelectedAngulo] = useState('');
    const [selectedEstilo, setSelectedEstilo] = useState('minimalista');
    const [animationType, setAnimationType] = useState<'estatico' | 'slideshow' | 'video'>('estatico');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = {
            inputMethod,
            prompt: inputMethod === 'prompt' ? prompt : undefined,
            photoFile: inputMethod === 'upload' ? photoFile : undefined,
            audioFile,
            oferta: selectedOferta,
            angulo: selectedAngulo,
            estilo: selectedEstilo,
            animationType,
        };

        onGenerate(formData);
    };

    const isFormValid =
        (inputMethod === 'prompt' ? prompt.trim() : photoFile) &&
        selectedOferta &&
        selectedAngulo;

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {/* Header */}
            <div>
                <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-accent" />
                    Configuración de Contenido
                </h2>
                <p className="text-white/60 text-sm">Completa los campos para generar tu contenido</p>
            </div>

            {/* Input Method Toggle */}
            <div>
                <label className="block text-sm font-semibold mb-3">Método de Entrada</label>
                <div className="grid grid-cols-2 gap-3">
                    <button
                        type="button"
                        onClick={() => setInputMethod('prompt')}
                        className={`p-4 rounded-xl border-2 transition-all ${inputMethod === 'prompt'
                                ? 'border-accent bg-accent/10'
                                : 'border-white/10 hover:border-white/30'
                            }`}
                    >
                        <Zap className={`w-6 h-6 mx-auto mb-2 ${inputMethod === 'prompt' ? 'text-accent' : 'text-white/50'}`} />
                        <p className="text-sm font-medium">Texto/Prompt</p>
                    </button>
                    <button
                        type="button"
                        onClick={() => setInputMethod('upload')}
                        className={`p-4 rounded-xl border-2 transition-all ${inputMethod === 'upload'
                                ? 'border-accent bg-accent/10'
                                : 'border-white/10 hover:border-white/30'
                            }`}
                    >
                        <ImageIcon className={`w-6 h-6 mx-auto mb-2 ${inputMethod === 'upload' ? 'text-accent' : 'text-white/50'}`} />
                        <p className="text-sm font-medium">Subir Foto</p>
                    </button>
                </div>
            </div>

            {/* Conditional Input */}
            {inputMethod === 'prompt' ? (
                <div>
                    <label className="block text-sm font-semibold mb-2">Describe tu contenido</label>
                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Ej: Una imagen minimalista de un café con vista al mar, colores cálidos, estilo profesional..."
                        className="w-full h-32 px-4 py-3 rounded-xl border border-white/20 bg-white/5 focus:border-accent focus:outline-none resize-none"
                        required={inputMethod === 'prompt'}
                    />
                </div>
            ) : (
                <FileUploader
                    accept="image/*"
                    maxSize={10}
                    onFileSelect={setPhotoFile}
                    label="Sube tu foto de referencia"
                    description="La IA usará esta imagen como base o inspiración"
                    currentFile={photoFile}
                />
            )}

            {/* Oferta Selector */}
            <div>
                <label className="block text-sm font-semibold mb-3 flex items-center gap-2">
                    <Target className="w-4 h-4 text-accent" />
                    ¿Qué estás promocionando?
                </label>
                <select
                    value={selectedOferta}
                    onChange={(e) => setSelectedOferta(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/5 focus:border-accent focus:outline-none"
                    required
                >
                    <option value="">Selecciona una opción</option>
                    {OFERTAS.map((oferta) => (
                        <option className='bg-black' key={oferta.id} value={oferta.id}>
                            {oferta.nombre} - {oferta.descripcion}
                        </option>
                    ))}
                </select>
            </div>

            {/* Ángulo Selector */}
            <div>
                <label className="block text-sm font-semibold mb-3">Ángulo Estratégico</label>
                <select
                    value={selectedAngulo}
                    onChange={(e) => setSelectedAngulo(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/5 focus:border-accent focus:outline-none"
                    required
                >
                    <option value="">Selecciona el enfoque</option>
                    {ANGULOS.map((angulo) => (
                        <option className='bg-black' key={angulo.id} value={angulo.id}>
                            {angulo.nombre} - {angulo.descripcion}
                        </option>
                    ))}
                </select>
            </div>

            {/* Estilo Selector */}
            <div>
                <label className="block text-sm font-semibold mb-3">Estilo Visual</label>
                <select
                    value={selectedEstilo}
                    onChange={(e) => setSelectedEstilo(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/5 focus:border-accent focus:outline-none"
                >
                    {ESTILOS.map((estilo) => (
                        <option className='bg-black' key={estilo.id} value={estilo.id}>
                            {estilo.nombre}
                        </option>
                    ))}
                </select>
            </div>

            {/* Animation Type */}
            <div>
                <label className="block text-sm font-semibold mb-3">Tipo de Contenido</label>
                <div className="grid grid-cols-3 gap-3">
                    {[
                        { value: 'estatico', label: 'Estático' },
                        { value: 'slideshow', label: 'Slideshow' },
                        { value: 'video', label: 'Video' }
                    ].map((type) => (
                        <button
                            key={type.value}
                            type="button"
                            onClick={() => setAnimationType(type.value as any)}
                            className={`p-3 rounded-lg border transition-all ${animationType === type.value
                                    ? 'border-accent bg-accent/10 text-accent'
                                    : 'border-white/10 hover:border-white/30'
                                }`}
                        >
                            <p className="text-sm font-medium">{type.label}</p>
                        </button>
                    ))}
                </div>
            </div>

            {/* Audio Upload (Optional) */}
            <div className="pt-4 border-t border-white/10">
                <FileUploader
                    accept="audio/*"
                    maxSize={5}
                    onFileSelect={setAudioFile}
                    label="Audio/Voz (Opcional)"
                    description="Sube un audio para agregar narración o música de fondo"
                    currentFile={audioFile}
                />
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={!isFormValid || isGenerating}
                className="w-full py-4 rounded-xl bg-accent hover:bg-accent/90 disabled:bg-white/10 disabled:cursor-not-allowed font-bold transition-all transform hover:scale-[1.02] disabled:scale-100 flex items-center justify-center gap-2"
            >
                {isGenerating ? (
                    <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Generando...
                    </>
                ) : (
                    <>
                        <Sparkles className="w-5 h-5" />
                        Generar Contenido
                    </>
                )}
            </button>
        </form>
    );
}

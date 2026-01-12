import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Creador de Contenido - Codexa',
    description: 'Crea contenido visual para Instagram usando IA. Genera imágenes y animaciones con parámetros personalizados, fotos y audio.',
};

export default function ContenidoLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}

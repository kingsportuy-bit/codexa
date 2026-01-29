import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Barberox | El Futuro de tu Barbería',
    description: 'Automatiza tu agenda por WhatsApp con IA y escala tu negocio.',
};

export default function Barberox4Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="min-h-screen bg-black text-white">
            {children}
        </main>
    );
}

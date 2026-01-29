import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Barberox - La Barbería con IA",
    description: "De WhatsApp caótico a agenda llena en 7 días. Barberox conecta tu barbería, tus clientes y tu equipo con IA.",
};

export default function BarberoxLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="barberox2-root">
            {children}
        </div>
    );
}

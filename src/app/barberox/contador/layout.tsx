import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Analytics Dashboard - Barberox",
    description: "Panel de analytics para el landing page de Barberox",
};

export default function ContadorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}

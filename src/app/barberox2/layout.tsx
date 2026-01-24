import './landing_v2.css';

export default function Barberox2Layout({
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

import './landing_v3.css';

export default function Barberox3Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="barberox3-root">
            {children}
        </div>
    );
}

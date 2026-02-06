import { Metadata } from 'next';
import Script from 'next/script';

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
        <>
            {/* Meta Pixel Code */}
            <Script
                id="meta-pixel"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                        !function(f,b,e,v,n,t,s)
                        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                        n.queue=[];t=b.createElement(e);t.async=!0;
                        t.src=v;s=b.getElementsByTagName(e)[0];
                        s.parentNode.insertBefore(t,s)}(window, document,'script',
                        'https://connect.facebook.net/en_US/fbevents.js');
                        fbq('init', '2449346852172904');
                        fbq('track', 'PageView');
                    `,
                }}
            />
            <noscript>
                <img
                    height="1"
                    width="1"
                    style={{ display: 'none' }}
                    src="https://www.facebook.com/tr?id=2449346852172904&ev=PageView&noscript=1"
                    alt=""
                />
            </noscript>
            {/* End Meta Pixel Code */}

            <div className="barberox2-root">
                {children}
            </div>
        </>
    );
}

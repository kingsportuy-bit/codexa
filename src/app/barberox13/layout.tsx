import { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
    title: "Barberox — IA para que tu barbería facture más y tenga menos huecos",
    description: "Tu socio invisible 24/7 por WhatsApp. Detecta huecos, recupera clientes y te hace facturar 20-30% más mientras vos cortás pelo.",
    icons: {
        icon: "/logo-barberox.png",
    },
};

export default function Barberox13Layout({
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
                        fbq('init', '5464847157073197');
                        fbq('track', 'PageView');
                    `,
                }}
            />
            <noscript>
                <img
                    height="1"
                    width="1"
                    style={{ display: 'none' }}
                    src="https://www.facebook.com/tr?id=5464847157073197&ev=PageView&noscript=1"
                    alt=""
                />
            </noscript>

            <div className="barberox12-root">
                {children}
            </div>
        </>
    );
}

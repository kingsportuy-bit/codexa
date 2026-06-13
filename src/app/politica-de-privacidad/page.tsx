import React from 'react';

export const metadata = {
  title: 'Política de Privacidad | Codexa',
  description: 'Política de Privacidad de Codexa',
};

export default function PoliticaDePrivacidad() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-24 md:py-32">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Política de Privacidad</h1>
        
        <div className="space-y-6 text-zinc-300">
          <p>Última actualización: {new Date().toLocaleDateString('es-UY')}</p>
          
          <section>
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">1. Información que recopilamos</h2>
            <p>
              Recopilamos información que usted nos proporciona directamente cuando utiliza nuestros servicios, se registra en una cuenta, o se comunica con nosotros. Esta información puede incluir su nombre, dirección de correo electrónico, número de teléfono y cualquier otra información que decida proporcionar.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">2. Uso de la información</h2>
            <p>
              Utilizamos la información recopilada para:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Proporcionar, mantener y mejorar nuestros servicios.</li>
              <li>Procesar transacciones y enviar avisos relacionados.</li>
              <li>Responder a sus comentarios, preguntas y solicitudes de servicio al cliente.</li>
              <li>Comunicarnos con usted sobre productos, servicios, ofertas y eventos.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">3. Compartir de la información</h2>
            <p>
              No compartimos su información personal con terceros, excepto en los siguientes casos:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Con su consentimiento.</li>
              <li>Para cumplir con las leyes aplicables o responder a procesos legales válidos.</li>
              <li>Para proteger los derechos, propiedad o seguridad de Codexa, nuestros usuarios o el público.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">4. Seguridad de los datos</h2>
            <p>
              Tomamos medidas razonables para ayudar a proteger la información sobre usted contra pérdida, robo, uso indebido, acceso no autorizado, divulgación, alteración y destrucción.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">5. Contacto</h2>
            <p>
              Si tiene alguna pregunta sobre esta Política de Privacidad, por favor contáctenos.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

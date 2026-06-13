import React from 'react';

export const metadata = {
  title: 'Eliminación de Datos | Codexa',
  description: 'Instrucciones para la eliminación de datos de usuario en Codexa',
};

export default function EliminacionDeDatos() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-24 md:py-32">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Eliminación de Datos de Usuario</h1>
        
        <div className="space-y-6 text-zinc-300">
          <p>Última actualización: {new Date().toLocaleDateString('es-UY')}</p>
          
          <section>
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Derecho a la eliminación de datos</h2>
            <p>
              En Codexa, respetamos su privacidad y su derecho a controlar sus datos personales. De acuerdo con las regulaciones de privacidad vigentes, usted tiene el derecho de solicitar la eliminación de todos los datos personales que hemos recopilado sobre usted.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Cómo solicitar la eliminación</h2>
            <p>
              Para ejercer su derecho a la eliminación de datos, por favor siga estos pasos:
            </p>
            <ol className="list-decimal pl-6 mt-2 space-y-4">
              <li>
                <strong>Póngase en contacto con nosotros:</strong> Envíe un correo electrónico solicitando la eliminación de sus datos. Asegúrese de enviar el correo electrónico desde la dirección asociada a su cuenta para que podamos verificar su identidad.
              </li>
              <li>
                <strong>Proporcione detalles (opcional):</strong> Si hay datos específicos que desea que eliminemos, por favor menciónelos en el correo. De lo contrario, procederemos a eliminar todos los datos asociados a su cuenta.
              </li>
              <li>
                <strong>Confirmación:</strong> Una vez recibida su solicitud, le enviaremos una confirmación de que hemos comenzado el proceso de eliminación.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Plazo de procesamiento</h2>
            <p>
              Nos comprometemos a procesar su solicitud de eliminación de datos de manera oportuna, típicamente dentro de un plazo de 30 días a partir de la recepción de su solicitud verificable.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Excepciones</h2>
            <p>
              Tenga en cuenta que podemos retener cierta información según lo requiera la ley o para fines comerciales legítimos (como la prevención de fraude o para cumplir con obligaciones legales).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Contacto</h2>
            <p>
              Si tiene alguna pregunta sobre este proceso o desea iniciar una solicitud, puede contactarnos.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

import React from 'react';

export const metadata = {
  title: 'Términos y Condiciones | Codexa',
  description: 'Condiciones del servicio de Codexa',
};

export default function TerminosYCondiciones() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-24 md:py-32">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Términos y Condiciones</h1>
        
        <div className="space-y-6 text-zinc-300">
          <p>Última actualización: {new Date().toLocaleDateString('es-UY')}</p>
          
          <section>
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">1. Aceptación de los términos</h2>
            <p>
              Al acceder y utilizar nuestros servicios, usted acepta estar sujeto a estos Términos y Condiciones. Si no está de acuerdo con alguna parte de los términos, no podrá acceder al servicio.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">2. Uso del Servicio</h2>
            <p>
              Usted se compromete a utilizar nuestros servicios solo para fines lícitos y de acuerdo con estos Términos. Usted acepta no utilizar el servicio:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>De cualquier manera que viole cualquier ley o regulación local, nacional o internacional aplicable.</li>
              <li>Para transmitir, o procurar el envío de, cualquier material publicitario o promocional no solicitado o no autorizado.</li>
              <li>Para hacerse pasar o intentar hacerse pasar por la Compañía, un empleado de la Compañía, otro usuario o cualquier otra persona o entidad.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">3. Propiedad Intelectual</h2>
            <p>
              El servicio y su contenido original, características y funcionalidad son y seguirán siendo propiedad exclusiva de Codexa y sus licenciantes. El servicio está protegido por derechos de autor, marcas registradas y otras leyes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">4. Enlaces a otros sitios web</h2>
            <p>
              Nuestro Servicio puede contener enlaces a sitios web de terceros o servicios que no son propiedad ni están controlados por Codexa. No tenemos control ni asumimos ninguna responsabilidad por el contenido, las políticas de privacidad o las prácticas de los sitios web o servicios de terceros.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">5. Limitación de responsabilidad</h2>
            <p>
              En ningún caso Codexa, ni sus directores, empleados, socios, agentes, proveedores o afiliados, serán responsables de ningún daño indirecto, incidental, especial, consecuente o punitivo.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">6. Cambios en los términos</h2>
            <p>
              Nos reservamos el derecho, a nuestra sola discreción, de modificar o reemplazar estos Términos en cualquier momento. Al continuar accediendo o utilizando nuestro Servicio después de que esas revisiones entren en vigencia, usted acepta estar sujeto a los términos revisados.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

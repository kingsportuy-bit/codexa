'use client';

import React from 'react';
import styles from './barberox.module.css';

const BarberoxPage = () => {
  return (
    <div className={`${styles.page} ${styles.container}`}>
      <main>
        {/* HERO SECTION */}
        <section className={`${styles.section} ${styles.hero}`}>
          <div className={styles.heroLeft}>
            <div className={styles.heroKicker}>
              Solución especializada para barberos
            </div>
            <h1>
              de <span>Whatsapp caótico</span> a agenda siempre llena
            </h1>
            <p className={styles.heroSub}>
              Barberox es el sistema completo que conecta tu barbería, tus clientes y tu equipo: web de gestión integral + recepcionista IA 24/7 en WhatsApp + asistente inteligente para el barbero, para que tengas agenda llena, caja clara y más tiempo para cortar.
            </p>

            <div className={styles.heroBadges}>
              <div className={styles.badge}>
                <div className={styles.badgeDot}></div>
                Agenda 95% más organizada
              </div>
              <div className={styles.badge}>
                <div className={styles.badgeDot}></div>
                Recordatorios automáticos
              </div>
            </div>

            <div className={styles.heroCtas}>
              <button className={`${styles.btn} ${styles.btnPrimary}`}>Agendar demo gratuita</button>
              <button className={`${styles.btn} ${styles.btnGhost}`}>Ver funcionalidades</button>
            </div>

            <p className={styles.heroNote}>
              Sin tarjetas de crédito · Cancela cuando quieras
            </p>
          </div>

          <div className={styles.heroRight}>
            {/* Contenedor de métricas y chat para desktop - visible solo en desktop */}
            <div className={styles.heroMetricsDesktop}>
              <div className={styles.heroCard}>
                <div className={styles.heroCardHeader}>
                  <div>Últimos 30 días</div>
                  <div>▼</div>
                </div>
                
                <div className={styles.heroCardTitle}>Rendimiento de la barbería</div>
                
                <div className={styles.heroCardMetrics}>
                  <div className={styles.metric}>
                    <div className={styles.metricLabel}>Citas completadas</div>
                    <div className={`${styles.metricValue} ${styles.green}`}>+92%</div>
                  </div>
                  <div className={styles.metric}>
                    <div className={styles.metricLabel}>Clientes nuevos</div>
                    <div className={`${styles.metricValue} ${styles.orange}`}>+53%</div>
                  </div>
                  <div className={styles.metric}>
                    <div className={styles.metricLabel}>Cancelaciones</div>
                    <div className={`${styles.metricValue} ${styles.red}`}>-67%</div>
                  </div>
                </div>
                
                <div className={styles.heroCardFooter}>
                  <div>Promedio diario: 23 citas</div>
                  <div>↗ Mejor que el mes anterior</div>
                </div>
              </div>

              <div className={styles.heroChat}>
                <div className={styles.chatLabel}>Conversación simulada</div>
                <div className={`${styles.chatBubble} ${styles.chatClient}`}>
                  Hola, quiero agendar un corte para mañana
                </div>
                <div className={`${styles.chatBubble} ${styles.chatBot}`}>
                  ¡Claro! ¿Qué día y hora prefieres?
                </div>
                <div className={`${styles.chatBubble} ${styles.chatClient}`}>
                  Mañana a las 5pm
                </div>
                <div className={`${styles.chatBubble} ${styles.chatBot}`}>
                  Listo, agendado. Te envío recordatorio 1h antes ✅
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TARJETA DE MÉTRICAS Y CHAT - Visible en móvil después del contenido principal */}
        <div className={styles.heroMetricsMobile}>
          <div className={styles.heroCard}>
            <div className={styles.heroCardHeader}>
              <div>Últimos 30 días</div>
              <div>▼</div>
            </div>
            
            <div className={styles.heroCardTitle}>Rendimiento de la barbería</div>
            
            <div className={styles.heroCardMetrics}>
              <div className={styles.metric}>
                <div className={styles.metricLabel}>Citas completadas</div>
                <div className={`${styles.metricValue} ${styles.green}`}>+92%</div>
              </div>
              <div className={styles.metric}>
                <div className={styles.metricLabel}>Clientes nuevos</div>
                <div className={`${styles.metricValue} ${styles.orange}`}>+53%</div>
              </div>
              <div className={styles.metric}>
                <div className={styles.metricLabel}>Cancelaciones</div>
                <div className={`${styles.metricValue} ${styles.red}`}>-67%</div>
              </div>
            </div>
            
            <div className={styles.heroCardFooter}>
              <div>Promedio diario: 23 citas</div>
              <div>↗ Mejor que el mes anterior</div>
            </div>
          </div>
          
          <div className={styles.heroChat}>
            <div className={styles.chatLabel}>Conversación simulada</div>
            <div className={`${styles.chatBubble} ${styles.chatClient}`}>
              Hola, quiero agendar un corte para mañana
            </div>
            <div className={`${styles.chatBubble} ${styles.chatBot}`}>
              ¡Claro! ¿Qué día y hora prefieres?
            </div>
            <div className={`${styles.chatBubble} ${styles.chatClient}`}>
              Mañana a las 5pm
            </div>
            <div className={`${styles.chatBubble} ${styles.chatBot}`}>
              Listo, agendado. Te envío recordatorio 1h antes ✅
            </div>
          </div>
        </div>

        {/* BENEFICIOS */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Beneficios exclusivos para barberos</h2>
          <p className={styles.sectionSub}>
            Herramientas diseñadas específicamente para las necesidades de tu barbería
          </p>

          <div className={styles.benefits}>
            <div className={styles.benefit}>
              <h3>Gestión de citas simple</h3>
              <p>Organiza tu agenda sin perder citas ni confundir horarios</p>
              <ul>
                <li><span className={styles.check}>✓</span> Agenda visual por horas</li>
                <li><span className={styles.check}>✓</span> Bloqueo de horarios</li>
                <li><span className={styles.check}>✓</span> Duración flexible por servicio</li>
              </ul>
            </div>

            <div className={styles.benefit}>
              <h3>Clientes fieles</h3>
              <p>Fideliza a tus clientes con recordatorios y promociones</p>
              <ul>
                <li><span className={styles.check}>✓</span> Recordatorios automáticos</li>
                <li><span className={styles.check}>✓</span> Historial de servicios</li>
                <li><span className={styles.check}>✓</span> Programa de recompensas</li>
              </ul>
            </div>

            <div className={styles.benefit}>
              <h3>Sin complicaciones técnicas</h3>
              <p>Interfaz intuitiva que cualquier barbero puede usar</p>
              <ul>
                <li><span className={styles.check}>✓</span> Diseño minimalista</li>
                <li><span className={styles.check}>✓</span> Sincronización automática</li>
                <li><span className={styles.check}>✓</span> Soporte en español 24/7</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ELEGÍ TU CAMINO (segmentación por ICP) */}
        <section className={`${styles.section} ${styles.icpSection}`}>
          <h2 className={styles.sectionTitle}>Elegí tu camino con Barberox</h2>
          <p className={styles.sectionSub}>
            Dos tipos de barberías usan Barberox: las que están en pleno crecimiento y necesitan orden para pasar el punto de equilibrio, y las que quieren ser la primera barbería con IA de su ciudad. Elegí el camino que mejor te representa.
          </p>

          <div className={styles.icpGrid}>
            {/* ICP 1: Ordenar y crecer */}
            <article className={styles.icpCard}>
              <div className={styles.icpLabel}>Para barberías en crecimiento</div>
              <h3>Quiero ordenar y pasar el punto de equilibrio</h3>
              <p>
                Si tu barbería está justo en el punto de equilibrio, Barberox pone orden en agenda, caja y WhatsApp para que dejes de improvisar y puedas crecer con números claros. La web de gestión te muestra cuántos turnos tenés y cuánto facturás, el recepcionista IA llena los huecos de agenda 24/7 y el asistente del barbero te permite manejar todo desde WhatsApp mientras seguís cortando.
              </p>
              <ul className={styles.icpFeatures}>
                <li className={styles.icpFeature}>
                  <span className={styles.icpCheck}>✔</span>
                  Web de gestión integral: agenda, caja, clientes y reportes en un solo lugar.
                </li>
                <li className={styles.icpFeature}>
                  <span className={styles.icpCheck}>✔</span>
                  Recepcionista IA 24/7 que llena huecos de agenda respondiendo por WhatsApp.
                </li>
                <li className={styles.icpFeature}>
                  <span className={styles.icpCheck}>✔</span>
                  Asistente del barbero por WhatsApp para manejar turnos y bloqueos sin dejar la silla.
                </li>
                <li className={styles.icpFeature}>
                  <span className={styles.icpCheck}>✔</span>
                  Acompañamiento 1 a 1 los primeros 30 días para que recuperes la inversión en el mismo mes.
                </li>
              </ul>
              <div className={styles.offerBox}>
                <h4>Oferta irresistible:</h4>
                <p>
                  Plan Crecimiento: activamos el sistema completo (web + recepcionista IA + asistente del barbero) y te acompañamos 30 días para que recuperes al menos 10 veces el valor de la suscripción en facturación extra o no pagás el segundo mes.
                </p>
              </div>
              <div className={styles.bonusBox}>
                <h4>Bonuses:</h4>
                <ul className={styles.icpFeatures}>
                  <li className={styles.icpFeature}>
                    <span className={styles.icpCheck}>+</span>
                    Setup 1:1 de WhatsApp + configuración de servicios y caja.
                  </li>
                  <li className={styles.icpFeature}>
                    <span className={styles.icpCheck}>+</span>
                    Plantilla de "números mínimos del mes" para saber cuándo pasan el punto de equilibrio.
                  </li>
                </ul>
              </div>
              <button className={`${styles.btn} ${styles.btnPrimary} ${styles.icpButton}`}>
                Quiero ordenar y crecer
              </button>
              <p className={styles.icpInfo}>
                Plan Crecimiento · Ideal para barberías de 1 a 3 sillones que ya tienen flujo de clientes.
              </p>
            </article>

            {/* ICP 2: Ser la barbería con IA */}
            <article className={styles.icpCard}>
              <div className={styles.icpLabel}>Para barberías que quieren diferenciarse</div>
              <h3>Quiero ser la barbería con IA de mi ciudad</h3>
              <p>
                Si tu barbería ya funciona pero querés ser la referencia moderna de tu ciudad, Barberox te convierte en "la barbería con IA": tus clientes reservan por WhatsApp con un recepcionista 24/7, vos y tu equipo manejan todo desde el mismo chat y la web de gestión te da métricas de cadena grande (ingresos, ocupación, top barberos) sin contratar más personal.
              </p>
              <ul className={styles.icpFeatures}>
                <li className={styles.icpFeature}>
                  <span className={styles.icpCheck}>✔</span>
                  Recepcionista IA 24/7 que atiende a tus clientes como si fuera parte del equipo.
                </li>
                <li className={styles.icpFeature}>
                  <span className={styles.icpCheck}>✔</span>
                  Asistente inteligente para el barbero: crea y cambia turnos solo con mensajes de voz o texto.
                </li>
                <li className={styles.icpFeature}>
                  <span className={styles.icpCheck}>✔</span>
                  Web con métricas de nivel cadena: ocupación, ingresos por servicio y ranking de barberos.
                </li>
                <li className={styles.icpFeature}>
                  <span className={styles.icpCheck}>✔</span>
                  Cupos limitados por ciudad + kit de campañas para anunciar "somos la barbería con IA".
                </li>
              </ul>
              <div className={styles.offerBox}>
                <h4>Oferta irresistible (con FOMO):</h4>
                <p>
                  Programa Barbería con IA: solo X barberías por ciudad acceden al paquete completo (web + recepcionista IA + asistente del barbero) con acompañamiento para lanzar campaña "reservá por WhatsApp, nuestra IA se encarga del resto".
                </p>
              </div>
              <div className={styles.bonusBox}>
                <h4>Bonuses alineados con tu branding:</h4>
                <ul className={styles.icpFeatures}>
                  <li className={styles.icpFeature}>
                    <span className={styles.icpCheck}>+</span>
                    Kit de posts y stories para anunciar "somos la primera barbería con IA de la ciudad".
                  </li>
                  <li className={styles.icpFeature}>
                    <span className={styles.icpCheck}>+</span>
                    Revisión de mensajes de WhatsApp y guion de bienvenida personalizados.
                  </li>
                </ul>
              </div>
              <button className={`${styles.btn} ${styles.btnPrimary} ${styles.icpButton}`}>
                Quiero ser la barbería con IA
              </button>
              <p className={styles.icpInfo}>
                Programa Barbería con IA · Plazas limitadas por ciudad durante la fase inicial.
              </p>
            </article>
          </div>
        </section>

        {/* COMO FUNCIONA */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Así funciona Barberox</h2>
          <p className={styles.sectionSub}>
            Implementación en minutos, resultados desde el primer día
          </p>

          <div className={styles.howGrid}>
            <div className={styles.steps}>
              <div className={styles.step}>
                <div className={styles.stepLabel}>Paso 1</div>
                <h3>Configura tu agenda</h3>
                <p>Define tus horarios, servicios y precios en minutos</p>
              </div>
              
              <div className={styles.step}>
                <div className={styles.stepLabel}>Paso 2</div>
                <h3>Comparte tu link</h3>
                <p>Tus clientes reservan citas directamente desde tu link personalizado</p>
              </div>
              
              <div className={styles.step}>
                <div className={styles.stepLabel}>Paso 3</div>
                <h3>Olvida los mensajes</h3>
                <p>Nos encargamos de recordatorios, confirmaciones y seguimiento</p>
              </div>
              
              <div className={styles.step}>
                <div className={styles.stepLabel}>Paso 4</div>
                <h3>Enfócate en cortar</h3>
                <p>Dedica el 100% de tu tiempo a lo que mejor haces</p>
              </div>
            </div>

            <div className={styles.mockupCard}>
              <div className={styles.mockupPlaceholder}>
                Vista previa de la interfaz de Barberox
                <br />
                (Calendario interactivo y panel de control)
              </div>
              <div className={styles.mockupCaption}>
                Interfaz diseñada específicamente para barberos
              </div>
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className={`${styles.section} ${styles.ctaSection}`}>
          <div className={styles.ctaInner}>
            <div className={styles.ctaText}>
              <h2>Prueba Barberox gratis por 14 días</h2>
              <p>
                Sin tarjetas de crédito. Cancela cuando quieras. 
                Descubre cómo puedes aumentar tus ingresos organizando mejor tu tiempo.
              </p>
              <div className={styles.ctaBadges}>
                <div className={styles.ctaBadge}>Sin instalación</div>
                <div className={styles.ctaBadge}>Soporte en español</div>
                <div className={styles.ctaBadge}>Cancela cuando quieras</div>
              </div>
            </div>
            <button className={`${styles.btn} ${styles.btnPrimary}`}>Comenzar prueba gratuita</button>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div>© {new Date().getFullYear()} Barberox. Todos los derechos reservados.</div>
        <div>Hecho con ❤️ para barberos apasionados</div>
      </footer>
    </div>
  );
};

export default BarberoxPage;
"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ArrowRight, Code, Smartphone, Zap, Palette, Cpu, MessageCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';

// Registrar plugins de GSAP
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Valores predefinidos para las partículas flotantes
const particleData = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  width: 2 + (i * 7.3) % 10,
  height: 2 + (i * 11.7) % 10,
  top: (i * 17.3) % 100,
  left: (i * 23.9) % 100,
}));

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Registrar ScrollTrigger si no está registrado
    if (typeof window !== 'undefined' && !ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
    }

    const ctx = gsap.context(() => {
      // Animación de entrada del contenido
      gsap.fromTo('.hero-content', 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          stagger: 0.2,
          ease: "power2.out"
        }
      );

      // Animación de parallax del fondo
      if (backgroundRef.current) {
        gsap.to(backgroundRef.current, {
          y: -50,
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          }
        });
      }

      // Animación de partículas flotantes
      gsap.utils.toArray('.floating-particle').forEach((particle: any, i) => {
        gsap.to(particle, {
          y: gsap.utils.random(-20, 20),
          x: gsap.utils.random(-20, 20),
          rotation: gsap.utils.random(-10, 10),
          duration: gsap.utils.random(3, 6),
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: i * 0.2
        });
      });

      // Animaciones de scroll para las secciones
      gsap.utils.toArray('.scroll-section').forEach((section: any) => {
        gsap.fromTo(section.querySelectorAll('.scroll-fade'),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Sección Hero */}
        <section 
          ref={heroRef}
          className="relative h-screen flex items-center justify-center overflow-hidden"
        >
          {/* Fondo con partículas animadas */}
          <div 
            ref={backgroundRef}
            className="absolute inset-0 bg-gradient-to-br from-black via-black/90 to-black"
          >
            {/* Partículas flotantes */}
            {particleData.map((particle) => (
              <div
                key={particle.id}
                className="floating-particle absolute rounded-full bg-accent/20"
                style={{
                  width: `${particle.width}px`,
                  height: `${particle.height}px`,
                  top: `${particle.top}%`,
                  left: `${particle.left}%`,
                }}
              />
            ))}
          </div>

          {/* Contenido */}
          <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
            <h1 className="hero-content text-4xl md:text-6xl lg:text-7xl font-bold font-space-grotesk mb-6">
              Software a medida para empresas que quieren ir más rápido
            </h1>
            
            <p className="hero-content text-xl md:text-2xl text-white/80 mb-10 max-w-3xl mx-auto">
              Desarrollo de software a medida, productos SaaS, e integración de inteligencia artificial 
              con agentes que atienden por WhatsApp.
            </p>
            
            <div className="hero-content flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary flex items-center justify-center group">
                Ver productos
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
              
              <button className="btn-secondary flex items-center justify-center group">
                Hablar por WhatsApp
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Indicador de scroll */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
            </div>
          </div>
        </section>

        {/* Sección What We Do */}
        <section className="scroll-section py-20 px-4 bg-black">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 scroll-fade">
              <h2 className="text-3xl md:text-4xl font-bold font-space-grotesk mb-4">Lo que hacemos</h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Transformamos ideas en soluciones digitales poderosas que impulsan el crecimiento de tu negocio
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: Code, title: "Desarrollo a medida", description: "Software personalizado que se adapta exactamente a las necesidades de tu empresa" },
                { icon: Smartphone, title: "Productos SaaS", description: "Soluciones escalables en la nube para potenciar tu negocio" },
                { icon: Zap, title: "Inteligencia Artificial", description: "Agentes inteligentes que automatizan procesos y mejoran la atención al cliente" }
              ].map((item, index) => (
                <div key={index} className="scroll-fade bg-black/50 border border-white/10 rounded-2xl p-8 hover:border-accent/50 transition-all duration-300">
                  <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                    <item.icon className="text-accent" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold font-space-grotesk mb-4">{item.title}</h3>
                  <p className="text-white/80">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sección Featured Products */}
        <section className="scroll-section py-20 px-4 bg-black/90">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 scroll-fade">
              <h2 className="text-3xl md:text-4xl font-bold font-space-grotesk mb-4">Nuestros productos</h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Soluciones innovadoras que ya están transformando negocios
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="scroll-fade">
                <div className="bg-gradient-to-br from-accent/20 to-accent/5 p-8 rounded-3xl border border-accent/30">
                  <div className="flex items-center mb-6">
                    <div className="bg-accent w-12 h-12 rounded-full flex items-center justify-center mr-4">
                      <Palette className="text-black" size={24} />
                    </div>
                    <h3 className="text-3xl font-bold font-space-grotesk">BarberoX</h3>
                  </div>
                  <p className="text-xl text-white/90 mb-6">
                    La plataforma todo-en-uno para barberías modernas
                  </p>
                  <ul className="space-y-3 mb-8">
                    {[
                      "Gestión de turnos inteligente",
                      "App para clientes y barberos",
                      "Sistema de fidelización",
                      "Análisis de datos en tiempo real"
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <div className="bg-accent w-5 h-5 rounded-full flex items-center justify-center mr-3">
                          <div className="bg-black w-2 h-2 rounded-full"></div>
                        </div>
                        <span className="text-white/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="btn-primary">
                    Conocer más
                  </button>
                </div>
              </div>
              
              <div className="scroll-fade">
                <div className="relative">
                  <div className="absolute inset-0 bg-accent rounded-3xl blur-2xl opacity-20"></div>
                  <div className="relative bg-black/50 border border-white/10 rounded-3xl p-8">
                    <h3 className="text-2xl font-bold font-space-grotesk mb-4">Próximamente</h3>
                    <p className="text-white/80 mb-6">
                      Estamos trabajando en nuevas soluciones SaaS para diferentes industrias. 
                      Suscríbete para ser el primero en conocerlas.
                    </p>
                    <div className="flex">
                      <input 
                        type="email" 
                        placeholder="Tu email" 
                        className="flex-1 bg-black/50 border border-white/10 rounded-l-2xl px-6 py-4 focus:outline-none focus:border-accent"
                      />
                      <button className="bg-accent text-black font-bold px-6 py-4 rounded-r-2xl">
                        Enviar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sección How We Work */}
        <section className="scroll-section py-20 px-4 bg-black">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 scroll-fade">
              <h2 className="text-3xl md:text-4xl font-bold font-space-grotesk mb-4">Cómo trabajamos</h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Un proceso ágil y transparente que garantiza resultados excepcionales
              </p>
            </div>
            
            <div className="space-y-12">
              {[
                { number: "01", title: "Descubrimiento", description: "Analizamos tus necesidades y definimos objetivos claros" },
                { number: "02", title: "Diseño", description: "Creamos soluciones intuitivas y visualmente impactantes" },
                { number: "03", title: "Desarrollo", description: "Construimos con las tecnologías más avanzadas y prácticas ágiles" },
                { number: "04", title: "Lanzamiento", description: "Desplegamos y optimizamos para resultados máximos" }
              ].map((step, index) => (
                <div key={index} className="scroll-fade flex flex-col md:flex-row items-center">
                  <div className="md:w-2/12 mb-6 md:mb-0">
                    <div className="text-5xl font-bold text-accent/20 font-space-grotesk">{step.number}</div>
                  </div>
                  <div className="md:w-4/12 mb-6 md:mb-0">
                    <h3 className="text-2xl font-bold font-space-grotesk">{step.title}</h3>
                  </div>
                  <div className="md:w-6/12">
                    <p className="text-white/80 text-lg">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sección Technologies */}
        <section className="scroll-section py-20 px-4 bg-black/90">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 scroll-fade">
              <h2 className="text-3xl md:text-4xl font-bold font-space-grotesk mb-4">Tecnologías que usamos</h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Stack moderno para soluciones escalables y de alto rendimiento
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { name: "Next.js", description: "React Framework" },
                { name: "TypeScript", description: "Tipado seguro" },
                { name: "Node.js", description: "Runtime JavaScript" },
                { name: "Python", description: "IA y backend" },
                { name: "React Native", description: "Apps móviles" },
                { name: "AWS", description: "Cloud computing" },
                { name: "Docker", description: "Contenedores" },
                { name: "Tailwind CSS", description: "Estilos modernos" }
              ].map((tech, index) => (
                <div key={index} className="scroll-fade bg-black/50 border border-white/10 rounded-2xl p-6 hover:border-accent/50 transition-all duration-300">
                  <h3 className="text-xl font-bold font-space-grotesk mb-2">{tech.name}</h3>
                  <p className="text-white/60">{tech.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sección CTA */}
        <section className="scroll-section py-20 px-4 bg-gradient-to-br from-black via-black/90 to-accent/10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="scroll-fade">
              <h2 className="text-3xl md:text-5xl font-bold font-space-grotesk mb-6">
                Listo para transformar tu negocio?
              </h2>
              <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
                Habla con nuestro equipo y descubre cómo podemos ayudarte a ir más rápido
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn-primary flex items-center justify-center group">
                  <MessageCircle className="mr-2" size={20} />
                  Hablar por WhatsApp
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
                <button className="btn-secondary flex items-center justify-center group">
                  <Cpu className="mr-2" size={20} />
                  Ver casos de estudio
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
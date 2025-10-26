import Head from 'next/head';
import { useEffect } from 'react';
import Footer from './Footer'; // Importar el componente Footer

export default function Home() {
  useEffect(() => {
    // Crear estrellas para el fondo (más estrellas, más pequeñas y más separadas)
    function createStars() {
      const starfield = document.getElementById('starfield');
      if (!starfield) return;
      
      const starCount = 300; // Aumentamos a 300 estrellas como se solicitó
      
      for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Posición aleatoria (más separadas)
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        
        // Tamaño más pequeño (más pequeñas)
        const size = Math.random() * 1.5 + 0.5;
        
        // Duración aleatoria
        const duration = Math.random() * 10 + 8; // Volvemos a la duración anterior
        
        // Opacidad aleatoria
        const opacity = Math.random() * 0.5 + 0.1; // Volvemos a la opacidad anterior
        
        // Retardo aleatorio reducido para que comiencen antes
        const delay = Math.random() * 10; // Reducido de 20 a 10
        
        // Tipo de estrella aleatorio
        const starType = Math.random();
        if (starType < 0.3) {
          star.classList.add('star-diamond');
        } else if (starType < 0.6) {
          star.classList.add('star-plus');
        }
        
        // Tipo de animación aleatorio
        const animationType = Math.random();
        if (animationType < 0.25) {
          // Estrellas con destello rápido (25%)
          star.classList.add('fast-twinkle');
          // Duración más corta para destellos rápidos
          const fastDuration = Math.random() * 3 + 1;
          star.style.setProperty('--duration', `${fastDuration}s`);
        } else if (animationType < 0.5) {
          // Estrellas con efecto de tintineo (25%)
          star.classList.add('sparkle');
          // Duración para tintineo
          const sparkleDuration = Math.random() * 4 + 2;
          star.style.setProperty('--duration', `${sparkleDuration}s`);
        } else if (animationType < 0.6) {
          // Estrellas con destello mucho más fuerte (10%)
          star.classList.add('strong-twinkle');
          // Duración para destellos fuertes
          const strongDuration = Math.random() * 6 + 4;
          star.style.setProperty('--duration', `${strongDuration}s`);
          // Opacidad más alta para destellos fuertes
          star.style.setProperty('--opacity', '1');
        }
        // El 40% restante usa la animación normal de destello
        
        star.style.left = `${left}%`;
        star.style.top = `${top}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        if (animationType >= 0.6) {
          // Solo establecer opacidad para estrellas normales
          star.style.setProperty('--opacity', opacity);
        }
        star.style.animationDelay = `${delay}s`;
        
        starfield.appendChild(star);
      }
    }
    

    
    // Crear estrellas fugaces cada 5 segundos
    function createShootingStars() {
      const starfield = document.getElementById('starfield');
      if (!starfield) return;
      
      // Crear una nueva estrella fugaz
      function createSingleStar() {
        const star = document.createElement('div');
        star.classList.add('star', 'shooting-star');
        
        // Posición inicial aleatoria en un borde de la pantalla
        const side = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
        let startX, startY;
        
        switch(side) {
          case 0: // top
            startX = Math.random() * 100;
            startY = -5;
            break;
          case 1: // right
            startX = 105;
            startY = Math.random() * 100;
            break;
          case 2: // bottom
            startX = Math.random() * 100;
            startY = 105;
            break;
          case 3: // left
            startX = -5;
            startY = Math.random() * 100;
            break;
        }
        
        // Posición final aleatoria
        const endX = Math.random() * 100;
        const endY = Math.random() * 100;
        
        // Calcular la distancia a recorrer
        const distanceX = (endX - startX) * window.innerWidth / 100;
        const distanceY = (endY - startY) * window.innerHeight / 100;
        
        // Tamaño más visible para estrellas fugaces
        const size = Math.random() * 3 + 2; // Entre 2 y 5 píxeles (más grande que antes)
        
        star.style.left = `${startX}%`;
        star.style.top = `${startY}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.setProperty('--distance-x', `${distanceX}px`);
        star.style.setProperty('--distance-y', `${distanceY}px`);
        
        starfield.appendChild(star);
        
        // Eliminar la estrella después de que termine su animación
        setTimeout(() => {
          if (star.parentNode) {
            star.parentNode.removeChild(star);
          }
        }, 1000); // 1 segundo, que es la duración de la animación
      }
      
      // Crear una nueva estrella cada 3-8 segundos (más frecuente que antes)
      const interval = Math.random() * 5000 + 3000; // Entre 3 y 8 segundos
      setInterval(createSingleStar, interval);
      
      // Crear una primera estrella inmediatamente
      setTimeout(createSingleStar, 1000);
    }
    
    // Función para mostrar la pantalla de costrucción
    function showConstructionScreen() {
      const presentationScreen = document.getElementById('presentationScreen');
      const constructionScreen = document.getElementById('constructionScreen');
      const footer = document.getElementById('mainFooter');
      const logo = document.querySelector('.logo');
      const starfield = document.getElementById('starfield');
      
      // Agregar efecto visual inmediato al hacer clic o presionar espacio
      if (presentationScreen) {
        presentationScreen.classList.add('screen-click-effect');
      }
      
      if (logo && starfield) {
        // Aplicar animación de alejamiento más rápida al logo
        logo.classList.add('logo-recede-fast');
        // Aplicar efecto de velocidad de la luz a las estrellas
        starfield.classList.add('warp-speed');
        
        // Esperar a que terminen las animaciones antes de mostrar la pantalla de construcción
        setTimeout(() => {
          if (presentationScreen) presentationScreen.classList.add('hidden');
          if (constructionScreen) constructionScreen.classList.add('visible');
          
          // Mostrar el footer cuando aparece la pantalla de construcción
          if (footer) {
            footer.style.display = 'block';
          }
        }, 1000); // Duración más corta para animaciones más rápidas
      } else {
        // Fallback al comportamiento original si no se encuentran los elementos
        if (presentationScreen) presentationScreen.classList.add('hidden');
        if (constructionScreen) constructionScreen.classList.add('visible');
        
        // Mostrar el footer cuando aparece la pantalla de construcción
        if (footer) {
          footer.style.display = 'block';
        }
      }
    }
    
    // Función para manejar el evento de teclado
    function handleKeyDown(event) {
      if (event.code === 'Space') {
        event.preventDefault();
        showConstructionScreen();
      }
    }
    
    // Inicializar los eventos
    function initEvents() {
      const presentationScreen = document.getElementById('presentationScreen');
      
      if (presentationScreen) {
        // Mostrar pantalla de construcción al hacer clic
        presentationScreen.addEventListener('click', showConstructionScreen);
      }
      
      // Mostrar pantalla de construcción al presionar barra espaciadora
      document.addEventListener('keydown', handleKeyDown);
    }
    
    // Inicializar las estrellas y eventos cuando la página cargue
    createStars(); // Activar estrellas normales
    // createIntenseFlashStars(); // Desactivar estrellas con destellos intensos
    createShootingStars(); // Solo activar estrellas fugaces
    initEvents();
    
    // Limpiar eventos cuando el componente se desmonte
    return () => {
      const presentationScreen = document.getElementById('presentationScreen');
      if (presentationScreen) {
        presentationScreen.removeEventListener('click', showConstructionScreen);
      }
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div>
      <Head>
        <title>Codexa</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
      </Head>
      
      <div>
        {/* Fondo con animación de estrellas y rotación más lenta */}
        <div className="starfield" id="starfield"></div>
        
        {/* Footer (oculto por defecto, solo visible en pantalla de construcción) */}
        <div id="mainFooter" style={{display: 'none'}}>
          <Footer />
        </div>
        
        {/* Pantalla de presentación */}
        <div className="presentation-screen" id="presentationScreen">
          <div className="logo-container">
            <img src="https://i.postimg.cc/LXRDM3Hj/LOGO-CODEXA-sin-fondo-blanco2-resplandor.png" 
                 alt="Codexa Logo" 
                 className="logo" />
          </div>
        </div>
        
        {/* Pantalla de construcción */}
        <div className="construction-screen" id="constructionScreen">
          <div className="construction-content">
            <p className="construction-text">
              <span className="emoji">🚧</span> Sitio web en costrucción
            </p>
            <div className="divider"></div>
            <p className="contact-info">
              Para consultas comerciales, contáctenos en 
              <a href="mailto:info@codexa.uy" className="email-link">info@codexa.uy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

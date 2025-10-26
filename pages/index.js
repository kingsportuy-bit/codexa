import Head from 'next/head';
import { useEffect } from 'react';
import Footer from './Footer'; // Importar el componente Footer

export default function Home() {
  useEffect(() => {
    // Crear estrellas de 4 puntas para el fondo (más estrellas, más pequeñas y más separadas)
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
        
        // Tamaño variable para las estrellas de 4 puntas
        let size = Math.random() * 3 + 1; // Entre 1 y 4 píxeles
        
        // Duración aleatoria
        const duration = Math.random() * 10 + 8; // Volvemos a la duración anterior
        
        // Opacidad aleatoria
        const opacity = Math.random() * 0.5 + 0.1; // Volvemos a la opacidad anterior
        
        // Retardo aleatorio reducido para que comiencen antes
        const delay = Math.random() * 10; // Reducido de 20 a 10
        
        // Ángulo de rotación aleatorio para la forma de estrella
        const rotation = Math.random() * 360;
        
        // Tipo de animación aleatorio
        const animationType = Math.random();
        if (animationType < 0.2) {
          // Estrellas con destello rápido (20%)
          star.classList.add('fast-twinkle');
          // Duración más corta para destellos rápidos
          const fastDuration = Math.random() * 3 + 1;
          star.style.setProperty('--duration', `${fastDuration}s`);
        } else if (animationType < 0.4) {
          // Estrellas con efecto de tintineo (20%)
          star.classList.add('sparkle');
          // Duración para tintineo
          const sparkleDuration = Math.random() * 4 + 2;
          star.style.setProperty('--duration', `${sparkleDuration}s`);
        } else if (animationType < 0.5) {
          // Estrellas con efecto de tintineo suave (10%)
          star.classList.add('soft-sparkle');
          // Duración para tintineo suave
          const softSparkleDuration = Math.random() * 4 + 4;
          star.style.setProperty('--duration', `${softSparkleDuration}s`);
          // Opacidad para tintineo suave
          star.style.setProperty('--opacity', '0.9');
        } else if (animationType < 0.6) {
          // Estrellas con destello extremadamente fuerte (10%)
          star.classList.add('extreme-twinkle');
          // Duración para destellos extremadamente fuertes
          const extremeDuration = Math.random() * 6 + 4;
          star.style.setProperty('--duration', `${extremeDuration}s`);
          // Opacidad 100% para destellos extremadamente fuertes
          star.style.setProperty('--opacity', '1');
          // Reducir tamaño a 1/4 para estrellas con destello extremadamente fuerte
          size = size * 0.25;
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
        // El 40% restante usa la animación normal de destello
        star.style.animationDelay = `${delay}s`;
        
        // Aplicar rotación aleatoria
        star.style.transform = `rotate(${rotation}deg)`;
        
        // Agregar animación continua de zoom
        star.classList.add('continuous-zoom');
        
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
        
        // Posición final aleatoria en el centro de la pantalla
        const endX = 30 + Math.random() * 40; // Entre 30% y 70%
        const endY = 30 + Math.random() * 40; // Entre 30% y 70%
        
        // Calcular la distancia a recorrer
        const distanceX = (endX - startX) * window.innerWidth / 100;
        const distanceY = (endY - startY) * window.innerHeight / 100;
        
        // Tamaño inicial más pequeño para estrellas fugaces
        const size = Math.random() * 2 + 1; // Entre 1 y 3 píxeles (más pequeño que antes)
        
        // Efecto de profundidad: zoom aleatorio sutil
        const zoomEffect = Math.random() > 0.5 ? 'zoom-in' : 'zoom-out';
        const zoomFactor = 1 + (Math.random() * 1); // Entre 1 y 2
        
        star.style.left = `${startX}%`;
        star.style.top = `${startY}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.setProperty('--distance-x', `${distanceX}px`);
        star.style.setProperty('--distance-y', `${distanceY}px`);
        star.style.setProperty('--zoom-factor', zoomFactor);
        star.classList.add(zoomEffect);
        
        starfield.appendChild(star);
        
        // Eliminar la estrella después de que termine su animación
        setTimeout(() => {
          if (star.parentNode) {
            star.parentNode.removeChild(star);
          }
        }, 3000); // Aumentamos a 3 segundos para dar más tiempo a la animación
      }
      
      // Crear una nueva estrella cada 5-15 segundos para mejor visibilidad
      const interval = Math.random() * 10000 + 5000; // Entre 5 y 15 segundos
      setInterval(createSingleStar, interval);
      
      // Crear una primera estrella inmediatamente
      setTimeout(createSingleStar, 2000); // Crear primera estrella después de 2 segundos
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
        starfield.classList.add('warp-speed-continuous');
        
        // Esperar a que terminen las animaciones antes de mostrar la pantalla de construcción
        setTimeout(() => {
          if (presentationScreen) presentationScreen.classList.add('hidden');
          if (constructionScreen) constructionScreen.classList.add('visible');
          
          // Mostrar el footer cuando aparece la pantalla de construcción
          if (footer) {
            footer.style.display = 'block';
          }
        }, 2000); // Aumentamos a 2 segundos para dar tiempo a que las estrellas desaparezcan
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
        <div className="construction-screen hidden" id="constructionScreen">
          <div className="construction-content">
            <p className="construction-text">
              <span className="emoji">🚧</span> Sitio web en costrucción
            </p>
            <div className="divider"></div>
            <p className="contact-info">
              Para consultas comerciales, contáctenos en  
              <a href="mailto:info@codexa.uy" className="email-link"> info@codexa.uy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

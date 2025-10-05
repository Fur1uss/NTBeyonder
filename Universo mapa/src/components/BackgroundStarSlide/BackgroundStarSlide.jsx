import React from 'react';
import './BackgroundStarSlide.css';

const BackgroundStars = () => {
  // Estrellas estáticas que siempre aparecerán en las mismas posiciones
  const staticStars = [
    {
      id: 'static-1',
      size: 6,
      x: 15, // 15% desde la izquierda
      y: 20, // 20% desde arriba
      isStatic: true
    },
    {
      id: 'static-2',
      size: 6,
      x: 85, // 85% desde la izquierda
      y: 75, // 75% desde arriba
      isStatic: true
    }
  ];

  // Generar estrellas aleatorias (solo blancas)
  const generateStars = (count) => {
    const stars = [];
    for (let i = 0; i < count; i++) {
      const starType = Math.random();
      let size;
      
      if (starType < 0.8) { // 80% estrellas pequeñas
        size = Math.random() * 2 + 2; // Tamaño entre 2 y 4px
      } else { // 20% estrellas más grandes y brillantes
        size = Math.random() * 3 + 4; // Tamaño entre 4 y 7px
      }
      
      stars.push({
        id: `star-${i}`,
        size: size,
        x: Math.random() * 100, // Posición X en porcentaje
        y: Math.random() * 100, // Posición Y en porcentaje
        delay: Math.random() * 5, // Delay de animación entre 0-5s
        duration: Math.random() * 3 + 2, // Duración entre 2-5s
        isBright: starType >= 0.8,
        isStatic: false
      });
    }
    return stars;
  };

  const randomStars = generateStars(500); // Reducido para mejor visibilidad
  const allStars = [...staticStars, ...randomStars];

  return (
    <div className="background-stars">
      {allStars.map(star => (
        <div
          key={star.id}
          className={`star ${star.isStatic ? 'star-static' : star.isBright ? 'star-bright' : ''}`}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: star.isStatic ? '0s' : `${star.delay}s`,
            animationDuration: star.isStatic ? '0s' : `${star.duration}s`
          }}
        />
      ))}
    </div>
  );
};

export default BackgroundStars;
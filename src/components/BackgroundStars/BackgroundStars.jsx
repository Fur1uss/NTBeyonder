import React from 'react';
import './BackgroundStars.css';

const BackgroundStars = () => {
  // Generar estrellas aleatorias
  const generateStars = (count) => {
    const stars = [];
    for (let i = 0; i < count; i++) {
      stars.push({
        id: i,
        size: Math.random() * 2 + 0.5, // Tamaño entre 0.5px y 2.5px
        x: Math.random() * 100, // Posición X en porcentaje
        y: Math.random() * 100, // Posición Y en porcentaje
        delay: Math.random() * 3, // Delay de animación entre 0-3s
        duration: Math.random() * 2 + 2 // Duración entre 2-4s
      });
    }
    return stars;
  };

  const stars = generateStars(150); // 150 estrellas sutiles

  return (
    <div className="background-stars">
      {stars.map(star => (
        <div
          key={star.id}
          className="star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`
          }}
        />
      ))}
    </div>
  );
};

export default BackgroundStars;

import React from 'react';
import './OrbitalPlanets.css';

const OrbitalPlanets = () => {
  // 17 objetos: 16 planetas + 1 asteroide
  const planets = [
    { name: 'Planet1', size: 0.4, color: '#ffffff' },
    { name: 'Planet2', size: 0.6, color: '#ffffff' },
    { name: 'Planet3', size: 0.7, color: '#ffffff' },
    { name: 'Planet4', size: 0.5, color: '#ffffff' },
    { name: 'Planet5', size: 1.2, color: '#ffffff' },
    { name: 'Planet6', size: 1.0, color: '#ffffff' },
    { name: 'Planet7', size: 0.8, color: '#ffffff' },
    { name: 'Planet8', size: 0.8, color: '#ffffff' },
    { name: 'Planet9', size: 0.6, color: '#ffffff' },
    { name: 'Planet10', size: 0.9, color: '#ffffff' },
    { name: 'Planet11', size: 0.7, color: '#ffffff' },
    { name: 'Planet12', size: 0.5, color: '#ffffff' },
    { name: 'Planet13', size: 1.1, color: '#ffffff' },
    { name: 'Planet14', size: 0.8, color: '#ffffff' },
    { name: 'Planet15', size: 0.6, color: '#ffffff' },
    { name: 'Planet16', size: 0.9, color: '#ffffff' },
    { name: 'Asteroid1', size: 0.3, color: '#a00e0eff' } // Asteroide color marrón/gris
  ];

  console.log('Total objects:', planets.length);
  console.log('Anillo 1:', planets.slice(0, 4).length);
  console.log('Anillo 2:', planets.slice(4, 8).length);
  console.log('Anillo 3:', planets.slice(8, 12).length);
  console.log('Anillo 4:', planets.slice(12, 16).length);
  console.log('Órbita asteroide:', planets.slice(16, 17).length);

  return (
    <div className="orbital-container">
      {/* Anillo 1 - Sentido horario - MÁS RÁPIDO */}
      <div className="orbit orbit-1">
        {planets.slice(0, 4).map((planet, index) => (
          <div
            key={planet.name}
            className="planet"
            style={{
              '--planet-size': `${planet.size}rem`,
              '--planet-color': planet.color,
              '--orbit-delay': `${index * 1.5}s`,
              '--orbit-duration': '12s'
            }}
          >
            <div className="planet-core" style={{ backgroundColor: planet.color }}></div>
          </div>
        ))}
      </div>

      {/* Anillo 2 - Sentido antihorario */}
      <div className="orbit orbit-2">
        {planets.slice(4, 8).map((planet, index) => (
          <div
            key={planet.name}
            className="planet"
            style={{
              '--planet-size': `${planet.size}rem`,
              '--planet-color': planet.color,
              '--orbit-delay': `${index * 1.2}s`,
              '--orbit-duration': '18s'
            }}
          >
            <div className="planet-core" style={{ backgroundColor: planet.color }}></div>
          </div>
        ))}
      </div>

      {/* Anillo 3 - Sentido horario */}
      <div className="orbit orbit-3">
        {planets.slice(8, 12).map((planet, index) => (
          <div
            key={planet.name}
            className="planet"
            style={{
              '--planet-size': `${planet.size}rem`,
              '--planet-color': planet.color,
              '--orbit-delay': `${index * 2}s`,
              '--orbit-duration': '24s'
            }}
          >
            <div className="planet-core" style={{ backgroundColor: planet.color }}></div>
          </div>
        ))}
      </div>

      {/* Anillo 4 - Sentido horario */}
      <div className="orbit orbit-4">
        {planets.slice(12, 16).map((planet, index) => (
          <div
            key={planet.name}
            className="planet"
            style={{
              '--planet-size': `${planet.size}rem`,
              '--planet-color': planet.color,
              '--orbit-delay': `${index * 3}s`,
              '--orbit-duration': '30s'
            }}
          >
            <div className="planet-core" style={{ backgroundColor: planet.color }}></div>
          </div>
        ))}
      </div>

      {/* Órbita elíptica para asteroide */}
      <div className="orbit orbit-asteroid">
        {planets.slice(16, 17).map((asteroid, index) => (
          <div
            key={asteroid.name}
            className="asteroid"
            style={{
              '--planet-size': `${asteroid.size}rem`,
              '--planet-color': asteroid.color,
              '--orbit-delay': '0s',
              '--orbit-duration': '35s'
            }}
          >
            <div className="planet-core" style={{ backgroundColor: asteroid.color }}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrbitalPlanets;
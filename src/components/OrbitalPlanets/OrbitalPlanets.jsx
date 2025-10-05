import React from 'react';
import './OrbitalPlanets.css';

const OrbitalPlanets = () => {
  // 13 planetas en total (8 originales + 5 nuevos), todos blancos
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
    { name: 'Planet13', size: 1.1, color: '#ffffff' }
  ];

  console.log('Total planets:', planets.length);
  console.log('Anillo 1:', planets.slice(0, 4).length);
  console.log('Anillo 2:', planets.slice(4, 9).length);
  console.log('Anillo 3:', planets.slice(9, 13).length);

  return (
    <div className="orbital-container">
      {/* Anillo 1 - Sentido horario */}
      <div className="orbit orbit-1">
        {planets.slice(0, 4).map((planet, index) => (
          <div
            key={planet.name}
            className="planet"
            style={{
              '--planet-size': `${planet.size}rem`,
              '--planet-color': planet.color,
              '--orbit-delay': `${index * 1.5}s`,
              '--orbit-duration': '18s'
            }}
          >
            <div className="planet-core" style={{ backgroundColor: planet.color }}></div>
          </div>
        ))}
      </div>

      {/* Anillo 2 - Sentido antihorario */}
      <div className="orbit orbit-2">
        {planets.slice(4, 9).map((planet, index) => (
          <div
            key={planet.name}
            className="planet"
            style={{
              '--planet-size': `${planet.size}rem`,
              '--planet-color': planet.color,
              '--orbit-delay': `${index * 1.2}s`,
              '--orbit-duration': '22s'
            }}
          >
            <div className="planet-core" style={{ backgroundColor: planet.color }}></div>
          </div>
        ))}
      </div>

      {/* Anillo 3 - Sentido horario */}
      <div className="orbit orbit-3">
        {planets.slice(9, 13).map((planet, index) => (
          <div
            key={planet.name}
            className="planet"
            style={{
              '--planet-size': `${planet.size}rem`,
              '--planet-color': planet.color,
              '--orbit-delay': `${index * 2}s`,
              '--orbit-duration': '26s'
            }}
          >
            <div className="planet-core" style={{ backgroundColor: planet.color }}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrbitalPlanets;

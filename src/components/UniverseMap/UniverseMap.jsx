import React from 'react'
import { useNavigate } from 'react-router-dom'
import Galaxy from '../Galaxy/Galaxy'
import BackgroundStars from '../BackgroundStar/BackgroundStar'
import './UniverseMap.css'

const UniverseMap = ({ onGalaxyClick }) => {
  const navigate = useNavigate()

  const handleAndromedaClick = () => {
    navigate('/andromeda')
  }

  const handleViaLacteaClick = () => {
    navigate('/vialactea')
  }

  return (
    <div className="universe-map">
      <BackgroundStars />
      
      {/* Estrella estática 1 separada de Vía Láctea */}
      <div style={{
        position: 'absolute',
        top: '45%',
        left: '35%',
        width: '10px',
        height: '10px',
        background: 'white',
        borderRadius: '50%',
        boxShadow: '0 0 10px white',
        zIndex: 20,
        transform: 'translate(-50%, -50%)'
      }}></div>
      
      {/* Línea guía desde la estrella 1 hacia la Vía Láctea */}
      <div style={{
        position: 'absolute',
        top: '45%',
        left: '36%',
        width: '80px',
        height: '2px',
        background: 'white',
        zIndex: 20,
        transform: 'translateY(-50%)',
        boxShadow: '0 0 5px rgba(255, 255, 255, 0.8)',
        
      }}></div>
      
      {/* Imagen de la Vía Láctea - Botón clickeable */}
      <div 
        style={{
          position: 'absolute',
          top: '45%',
          left: '45%',
          zIndex: 15,
          transform: 'translate(-50%, -50%)',
          cursor: 'pointer',
          transition: 'transform 0.3s ease'
        }}
        onClick={handleViaLacteaClick}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.05)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)'}
      >
        <img 
          src="/ViaLactea.jpg" 
          alt="Vía Láctea" 
          style={{
            width: '150px',
            height: 'auto',
            borderRadius: '10px',
            boxShadow: '0 0 20px rgba(255, 255, 255, 0.5)',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            transition: 'all 0.3s ease'
          }}
        />
        <div style={{
          color: 'white',
          textAlign: 'center',
          marginTop: '10px',
          fontSize: '14px',
          fontWeight: 'bold',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)'
        }}>
          Vía Láctea
        </div>
      </div>

      {/* Estrella estática 2 separada de Andrómeda */}
      <div style={{
        position: 'absolute',
        top: '75%',
        left: '65%',
        width: '10px',
        height: '10px',
        background: 'white',
        borderRadius: '50%',
        boxShadow: '0 0 10px white',
        zIndex: 20,
        transform: 'translate(-50%, -50%)'
      }}></div>
      
      {/* Línea guía desde la estrella 2 hacia Andrómeda */}
      <div style={{
        position: 'absolute',
        top: '75%',
        left: '66%',
        width: '70px',
        height: '2px',
        background: 'white',
        zIndex: 20,
        transform: 'translateY(-50%)',
        boxShadow: '0 0 5px rgba(255, 255, 255, 0.8)',
        
      }}></div>

      {/* Imagen de Andrómeda - Botón clickeable */}
      <div 
        style={{
          position: 'absolute',
          top: '75%',
          left: '75%',
          zIndex: 15,
          transform: 'translate(-50%, -50%)',
          cursor: 'pointer',
          transition: 'transform 0.3s ease'
        }}
        onClick={handleAndromedaClick}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.05)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)'}
      >
        <img 
          src="/andromeda.jpg" 
          alt="Andrómeda" 
          style={{
            width: '150px',
            height: 'auto',
            borderRadius: '10px',
            boxShadow: '0 0 20px rgba(255, 255, 255, 0.5)',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            transition: 'all 0.3s ease'
          }}
        />
        <div style={{
          color: 'white',
          textAlign: 'center',
          marginTop: '10px',
          fontSize: '14px',
          fontWeight: 'bold',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)'
        }}>
          Andrómeda
        </div>
      </div>
    </div>
  )
}


export default UniverseMap

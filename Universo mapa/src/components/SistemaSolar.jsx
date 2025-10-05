import React from 'react'
import { useNavigate } from 'react-router-dom'
import './SistemaSolar.css'
import BackgroundStarSlide from './BackgroundStarSlide/BackgroundStarSlide'
import OrbitalPlanets from './OrbitalPlanets/OrbitalPlanets'

const SistemaSolarPage = () => {
  const navigate = useNavigate()

  const handleBack = () => {
    console.log('Botón clickeado - navegando a /vialactea') // Debug
    try {
      navigate('/vialactea')
    } catch (error) {
      console.error('Error con navigate:', error)
      // Alternativa usando window.history
      window.history.back()
    }
  }

  return (
    <div className="sistemasolar-page">
      <BackgroundStarSlide />
      <div className="sistemaSolar-background">
        {/* Botón de volver */}
        <button 
          onClick={handleBack} 
          className="back-button"
        >
          ← Volver a Vía Láctea
        </button>

        <div className="sistemaSolar-content">
          {/* Componente de planetas orbitales en el centro */}
          <div className="orbital-container-wrapper">
            <OrbitalPlanets />
            {/* Sol en el centro */}
            <div className="sol-center">
              <img 
                src="/sol.png" 
                alt="Sol" 
                className="sol-image"
              />
            </div>
          </div>
          
          <div className="sistemaSolar-main-content">
            <div className="sistemaSolar-description">
              
            </div>
          </div>

          
        </div>
      </div>
    </div>
  )
}

export default SistemaSolarPage
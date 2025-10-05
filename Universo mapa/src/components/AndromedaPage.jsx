import React from 'react'
import { useNavigate } from 'react-router-dom'
import './AndromedaPage.css'
import BackgroundStarSlide from './BackgroundStarSlide/BackgroundStarSlide'

const AndromedaPage = () => {
  const navigate = useNavigate()

  const handleBack = () => {
    console.log('Botón clickeado - navegando a /') // Debug
    try {
      navigate('/')
    } catch (error) {
      console.error('Error con navigate:', error)
      // Alternativa usando window.history
      window.history.back()
    }
  }

  return (
    <div className="andromeda-page">
        <BackgroundStarSlide />
      <div className="andromeda-background">
        {/* Botón de volver */}
        <button 
          onClick={handleBack} 
          className="back-button"
         
        >
          ← Volver al Universo
        </button>

        <div className="andromeda-content">
          <div className="andromeda-main-content">
            <img 
              src="/Andro1.png" 
              alt="Galaxia de Andrómeda" 
              className="andromeda-image"
            />
            
            <div className="andromeda-description">
                <h>Andrómeda (M31)</h>
              <p>
                Es una galaxia espiral que se encuentra a unos 2.5 millones de años luz de la Tierra. 
                Siendo el objeto visible a simple vista más lejano que se puede observar. Es la galaxia 
                de gran tamaño más cercana a la Vía Láctea y se acerca hacia nosotros a 301 km/s.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AndromedaPage

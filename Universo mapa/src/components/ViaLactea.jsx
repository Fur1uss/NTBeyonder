import React from 'react'
import { useNavigate } from 'react-router-dom'
import './ViaLactea.css'
import BackgroundStarSlide from './BackgroundStarSlide/BackgroundStarSlide'

const ViaLacteaPage = () => {
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

  const handleExplore = () => {
    console.log('Botón explorar clickeado - navegando a /sistemasolar') // Debug
    try {
      navigate('/sistemasolar')
    } catch (error) {
      console.error('Error con navigate:', error)
    }
  }

  return (
    <div className="vialactea-page">
      <BackgroundStarSlide />
      <div className="viaLactea-background">
        {/* Botón de volver */}
        <button 
          onClick={handleBack} 
          className="back-button"
        >
          ← Volver al Universo
        </button>

        <div className="viaLactea-content">
          <div className="viaLactea-main-content">
            <img 
              src="/ViaLactea.jpg" 
              alt="Galaxia Vía Láctea" 
              className="viaLactea-image"
            />

            <div className="viaLactea-description">
              <h3>Vía Láctea</h3>
              <p>
                Nuestra galaxia hogar, una galaxia espiral barrada que contiene entre 200 y 400 mil millones de estrellas. 
                El Sistema Solar se encuentra en uno de los brazos espirales, conocido como el Brazo de Orión. 
                En su centro se encuentra un agujero negro supermasivo llamado Sagitario A*.
              </p>
              <button 
                onClick={handleExplore} 
                className="explorar-button"
              >
                Explorar!
              </button>
            </div>
          </div>

          
        </div>
      </div>
    </div>
  )
}

export default ViaLacteaPage

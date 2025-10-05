import React from 'react'
import { useNavigate } from 'react-router-dom'
import './ViaLacteaPage.css'
import BackgroundStarSlide from '../BackgroundStarSlide/BackgroundStarSlide'
import { useLanguage } from '../../hooks/useLanguage'

const ViaLacteaPage = () => {
  const navigate = useNavigate()
  const { t } = useLanguage()

  const handleBack = () => {
    console.log('Botón clickeado - navegando a /universe-map') // Debug
    try {
      navigate('/universe-map')
    } catch (error) {
      console.error('Error con navigate:', error)
      // Alternativa usando window.history
      window.history.back()
    }
  }

  const handleExplore = () => {
    console.log('Botón explorar clickeado - navegando a /web-navigation') // Debug
    try {
      navigate('/web-navigation')
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
          {t('backToUniverse')}
        </button>

        <div className="viaLactea-content">
          <div className="viaLactea-main-content">
            <img 
              src="/ViaLactea.jpg"
              alt="Vía Láctea" 
              className="viaLactea-image"
            />
            
            <div className="viaLactea-description">
              <h3>{t('viaLacteaTitle')}</h3>
              <p>
                {t('viaLacteaDesc')}
              </p>
              <button 
                onClick={handleExplore} 
                className="explorar-button"
              >
                {t('explore')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViaLacteaPage

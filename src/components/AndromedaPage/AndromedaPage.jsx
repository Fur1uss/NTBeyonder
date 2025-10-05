import React from 'react'
import { useNavigate } from 'react-router-dom'
import './AndromedaPage.css'
import BackgroundStarSlide from '../BackgroundStarSlide/BackgroundStarSlide'
import { useLanguage } from '../../hooks/useLanguage'

const AndromedaPage = () => {
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

  return (
    <div className="andromeda-page">
        <BackgroundStarSlide />
      <div className="andromeda-background">
        {/* Botón de volver */}
        <button 
          onClick={handleBack} 
          className="back-button"
         
        >
          {t('backToUniverse')}
        </button>

        <div className="andromeda-content">
          <div className="andromeda-main-content">
            <img 
              src="/Andro1.png" 
              alt="Galaxia de Andrómeda" 
              className="andromeda-image"
            />
            
            <div className="andromeda-description">
                <h3>{t('andromedaTitle')}</h3>
              <p>
                {t('andromedaDesc')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AndromedaPage
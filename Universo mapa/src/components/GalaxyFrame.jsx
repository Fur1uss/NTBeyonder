import React from 'react'
import './GalaxyFrame.css'

const GalaxyFrame = ({ galaxy, onClose }) => {
  return (
    <div className="galaxy-frame-overlay" onClick={onClose}>
      <div className="galaxy-frame" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        
        <div className="galaxy-frame-header">
          <h2>{galaxy.name}</h2>
          <div className="galaxy-type-badge">{galaxy.type === 'spiral' ? 'Galaxia Espiral' : 'Galaxia'}</div>
        </div>

        <div className="galaxy-frame-content">
          <div className="galaxy-visual">
            <div 
              className={`galaxy-preview ${galaxy.type}`}
              style={{ '--galaxy-color': galaxy.color }}
            >
              <div className="galaxy-core"></div>
              <div className="galaxy-arms">
                <div className="arm arm-1"></div>
                <div className="arm arm-2"></div>
                <div className="arm arm-3"></div>
                <div className="arm arm-4"></div>
              </div>
              <div className="galaxy-glow"></div>
            </div>
          </div>

          <div className="galaxy-info">
            <p className="galaxy-description">{galaxy.description}</p>
            
            <div className="galaxy-stats">
              <div className="stat">
                <strong>Distancia:</strong>
                <span>{galaxy.distance}</span>
              </div>
              <div className="stat">
                <strong>Número de estrellas:</strong>
                <span>{galaxy.stars}</span>
              </div>
              <div className="stat">
                <strong>Diámetro:</strong>
                <span>{galaxy.diameter}</span>
              </div>
            </div>

            <div className="galaxy-facts">
              <h3>Datos Curiosos:</h3>
              {galaxy.id === 'milky-way' ? (
                <ul>
                  <li>Nuestro sistema solar se encuentra en el brazo de Orión</li>
                  <li>Contiene un agujero negro supermasivo llamado Sagitario A*</li>
                  <li>Se mueve a través del espacio a 600 km/s</li>
                  <li>Colisionará con Andrómeda en ~4.5 mil millones de años</li>
                </ul>
              ) : (
                <ul>
                  <li>Es la galaxia más grande del Grupo Local</li>
                  <li>Se acerca a nosotros a 250,000 mph</li>
                  <li>Es visible a simple vista desde la Tierra</li>
                  <li>Tiene dos galaxias satélite principales</li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GalaxyFrame

import React from 'react'
import './Galaxy.css'

const Galaxy = ({ galaxy, onClick }) => {
  return (
    <div
      className={`galaxy ${galaxy.type}`}
      style={{
        left: `${galaxy.position.x}%`,
        top: `${galaxy.position.y}%`,
        width: `${galaxy.size}px`,
        height: `${galaxy.size}px`,
        '--galaxy-color': galaxy.color
      }}
      onClick={onClick}
      title={galaxy.name}
    >
      <div className="galaxy-core"></div>
      <div className="galaxy-arms">
        <div className="arm arm-1"></div>
        <div className="arm arm-2"></div>
        <div className="arm arm-3"></div>
        <div className="arm arm-4"></div>
      </div>
      <div className="galaxy-glow"></div>
      <div className="galaxy-label">
        <span>{galaxy.name}</span>
      </div>
    </div>
  )
}

export default Galaxy

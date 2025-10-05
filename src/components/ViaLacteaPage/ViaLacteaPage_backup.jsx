import React, { Suspense } from 'react'
import { useNavigate } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls } from '@react-three/drei'
import './ViaLacteaPage.css'
import BackgroundStarSlide from '../BackgroundStarSlide/BackgroundStarSlide'

// Componente para cargar el modelo 3D de la VÃ­a LÃ¡ctea
function MilkyWayModel() {
  const gltf = useGLTF('/models/milky_way.glb')
  
  if (!gltf || !gltf.scene) {
    return null
  }
  
  const { scene } = gltf
  
  // Mejorar los materiales del modelo
  scene.traverse((child) => {
    if (child.isMesh) {
      if (child.material) {
        child.material.transparent = false
        child.material.opacity = 1.0
        child.material.roughness = 0.8
        child.material.metalness = 0.1
        child.material.emissive = { r: 0.1, g: 0.1, b: 0.05 }
        
        if (child.material.map) {
          child.material.map.flipY = false
        }
      }
    }
  })
  
  return <primitive object={scene} scale={[1.5, 1.5, 1.5]} position={[0, 0, 0]} />
}

const ViaLacteaPage = () => {
  const navigate = useNavigate()

  const handleBack = () => {
    console.log('BotÃ³n clickeado - navegando a /universe-map') // Debug
    try {
      navigate('/universe-map')
    } catch (error) {
      console.error('Error con navigate:', error)
      // Alternativa usando window.history
      window.history.back()
    }
  }

  const handleExplore = () => {
    console.log('BotÃ³n explorar clickeado - navegando a /web-navigation') // Debug
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
        {/* BotÃ³n de volver */}
        <button 
          onClick={handleBack} 
          className="back-button"
        >
          â† Volver al Universo
        </button>

        <div className="viaLactea-content">
          <div className="viaLactea-main-content">
            <div className="viaLactea-canvas-container">
              <Canvas
                camera={{ position: [0, 0, 8], fov: 60 }}
                style={{ width: '100%', height: '100%' }}
              >
                {/* IluminaciÃ³n equilibrada */}
                <ambientLight intensity={1.0} />
                <directionalLight 
                  position={[5, 5, 5]} 
                  intensity={1.0}
                  castShadow={false}
                />
                <directionalLight 
                  position={[-5, -5, -5]} 
                  intensity={1.5}
                  castShadow={true}
                />
                <pointLight position={[0, 0, 10]} intensity={1.0} />
                
                {/* Modelo 3D de la VÃ­a LÃ¡ctea */}
                <Suspense fallback={
                  <mesh position={[0, 0, 0]}>
                    <sphereGeometry args={[1, 32, 32]} />
                    <meshStandardMaterial color="#333333" />
                  </mesh>
                }>
                  <MilkyWayModel />
                </Suspense>
                
                {/* Controles */}
                <OrbitControls 
                  enableZoom={false} 
                  enablePan={true} 
                  enableRotate={true}
                  autoRotate={true}
                  autoRotateSpeed={0.3}
                  target={[0, 0, 0]}
                />
              </Canvas>
            </div>

            <div className="viaLactea-description">
              <h3>VÃ­a LÃ¡ctea</h3>
              <p>
                Nuestra galaxia hogar, una galaxia espiral barrada que contiene entre 200 y 400 mil millones de estrellas. 
                El Sistema Solar se encuentra en uno de los brazos espirales, conocido como el Brazo de OriÃ³n. 
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

import React, { useState, useEffect, Suspense } from 'react'
import { useNavigate } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls } from '@react-three/drei'
import './WebNavigation.css'
import BackgroundStars from '../../components/BackgroundStars/BackgroundStars'
import { useLanguage } from '../../hooks/useLanguage'

// Error Boundary para manejar errores de carga de modelos
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback;
        }

        return this.props.children;
    }
}

// Componente para cargar el modelo 3D con mejor manejo de errores
function ModelLoader({ modelPath, planetName, planetInfo }) {
    console.log(`Intentando cargar modelo: ${modelPath} para ${planetName}`);
    
    // Siempre llamar useGLTF al inicio
    const gltf = useGLTF(modelPath);
    
    try {
        console.log(`GLTF cargado:`, gltf);
        
        if (!gltf || !gltf.scene) {
            console.error(`GLTF o scene es null para ${planetName}`, gltf);
            return null;
        }
        
        const { scene } = gltf;
        console.log(`Modelo cargado exitosamente: ${planetName}`, scene);
        
        // Mejorar los materiales del modelo cargado
        scene.traverse((child) => {
            if (child.isMesh) {
                console.log('Processing mesh:', child.name, child.material)
                
                // Hacer el material equilibrado y visible
                if (child.material) {
                    child.material.transparent = false
                    child.material.opacity = 1.0
                    child.material.roughness = planetInfo.roughness
                    child.material.metalness = planetInfo.metalness
                    child.material.emissive = planetInfo.emissive
                    
                    // Si tiene textura, asegurar que sea visible
                    if (child.material.map) {
                        child.material.map.flipY = false
                    }
                }
            }
        })
        
        return <primitive object={scene} scale={[0.01, 0.01, 0.01]} position={[0, 0, 0]} />;
    } catch (error) {
        console.error(`Error loading ${planetName} model:`, error);
        return null;
    }
}

// Componente para el modelo del planeta
function Earth({ modelPath = '/models/Earth_1_12756.glb', planetName = 'Tierra' }) {
        // Colores y propiedades para cada planeta
        const planetData = {
            'Tierra': { 
                color: '#4A90E2', 
                roughness: 0.4, 
                metalness: -4.0,
                emissive: { r: 0.05, g: 0.05, b: 0.05 }
            },
            'Marte': { 
                color: '#CD5C5C', 
                roughness: 0.8, 
                metalness: 0.1,
                emissive: { r: 0.1, g: 0.05, b: 0.05 }
            },
            'Luna': { 
                color: '#C0C0C0', 
                roughness: 0.9, 
                metalness: 0.0,
                emissive: { r: 0.02, g: 0.02, b: 0.02 }
            }
        };
    
    const planetInfo = planetData[planetName] || { 
        color: '#666666', 
        roughness: 0.5, 
        metalness: 0.1,
        emissive: { r: 0.05, g: 0.05, b: 0.05 }
    };
    
    // Usar esferas como fallback debido a problemas con archivos GLB grandes en Vercel
    console.log(`Usando esfera para ${planetName} (fallback por tamaño de archivo GLB)`);
    return (
        <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[1, 64, 64]} />
            <meshStandardMaterial 
                color={planetInfo.color}
                roughness={planetInfo.roughness}
                metalness={planetInfo.metalness}
                emissive={planetInfo.emissive}
            />
        </mesh>
    );
}

const WebNavigation = () => {
    const [currentPlanet, setCurrentPlanet] = useState(0);
    const navigate = useNavigate();
    const { t } = useLanguage();

    // Los modelos GLB son demasiado grandes para Vercel, usando esferas como fallback

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const planetIndex = Math.round(scrollTop / window.innerHeight);
            setCurrentPlanet(planetIndex);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const planets = [
        {
            name: t('earthName'),
            description: t('earthDesc'),
            details: {
                diameter: '12,742 km',
                distance: '149.6 millones km',
                period: '365.25 días',
                satellites: '1 (Luna)'
            },
            model: '/models/Earth_1_12756.glb'
        },
        {
            name: t('marsName'),
            description: t('marsDesc'),
            details: {
                diameter: '6,779 km',
                distance: '227.9 millones km',
                period: '687 días',
                satellites: '2 (Fobos, Deimos)'
            },
            model: '/models/Mars.glb'
        },
        {
            name: t('moonName'),
            description: t('moonDesc'),
            details: {
                diameter: '3,474 km',
                distance: '384,400 km',
                period: '27.3 días',
                satellites: '0'
            },
            model: '/models/Moon.glb'
        }
    ];


    return (
        <div className="web-navigation">
            <BackgroundStars />
            
            {planets.map((planet, index) => (
                <div key={planet.name} className="planet-container" id={`planet-${index}`}>
                    {/* Sección del planeta (40%) */}
                    <div className="planet-section">
                        <div className="canvas-container">
                            <Canvas
                                camera={{ position: [0, 0, 10], fov: 75 }}
                                style={{ width: '100%', height: '100%' }}
                            >
                                {/* Iluminación equilibrada */}
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
                                
                                {/* Modelo del planeta */}
                                <Earth modelPath={planet.model} planetName={planet.name} />
                                
                                {/* Controles */}
                                <OrbitControls 
                                    enableZoom={false} 
                                    enablePan={true} 
                                    enableRotate={true}
                                    autoRotate={true}
                                    autoRotateSpeed={0.5}
                                    target={[0, 0, 0]}
                                />
                            </Canvas>
                        </div>
                    </div>

                    {/* Sección de texto (60%) */}
                    <div className="text-section">
                        <h1>{planet.name}</h1>
                        <p>{planet.description}</p>
                        <div className="planet-details">
                            <strong>{t('diameter')}</strong> {planet.details.diameter}<br/>
                            <strong>{t('distanceToSun')}</strong> {planet.details.distance}<br/>
                            <strong>{t('orbitalPeriod')}</strong> {planet.details.period}<br/>
                            <strong>{t('satellites')}</strong> {planet.details.satellites}
                        </div>
                        <button 
                            className="explore-button"
                            onClick={() => {
                                if (planet.name === t('earthName')) {
                                    // Navegar al visor de la Tierra
                                    navigate('/earth-viewer');
                                } else if (planet.name === t('marsName')) {
                                    // Navegar al visor de Marte
                                    navigate('/mars-viewer');
                                } else if (planet.name === t('moonName')) {
                                    // Navegar al visor de la Luna
                                    navigate('/moon-viewer');
                                } else {
                                    // TODO: Implementar visores para otros planetas
                                }
                            }}
                        >
                            {t('exploreDetails')}
                        </button>
                    </div>
                </div>
            ))}
            
            {/* Indicador de navegación */}
            <div className="navigation-indicator">
                {planets.map((_, index) => (
                    <div
                        key={index}
                        className={`nav-dot ${currentPlanet === index ? 'active' : ''}`}
                        onClick={() => {
                            const element = document.getElementById(`planet-${index}`);
                            element?.scrollIntoView({ behavior: 'smooth' });
                        }}
                    />
                ))}
            </div>

        </div>
    )
}

export default WebNavigation
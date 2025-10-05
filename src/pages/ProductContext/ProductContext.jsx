import React from 'react'
import { useNavigate } from 'react-router-dom'
import './ProductContext.css'
import OrbitalPlanets from '../../components/OrbitalPlanets/OrbitalPlanets'
import BackgroundStars from '../../components/BackgroundStars/BackgroundStars'
import BlurText from '../../components/BlurText/BlurText'

const ProductContext = () => {
    const navigate = useNavigate();

    const handleStart = () => {
        navigate('/web-navigation');

    };

    return (
        <div className="product-context">
            <BackgroundStars />
            <OrbitalPlanets />
            <div className="product-context-content">
                <h2>
                    <BlurText 
                        blurAmount={8} 
                        duration={2500} 
                        delay={500}
                        className="blur-text--slide-up-scale"
                    >
                        <b>NTB</b>eyonder
                    </BlurText>
                </h2>
                <BlurText 
                    blurAmount={5} 
                    duration={2000} 
                    delay={1500}
                    className="blur-text--slide-up"
                >
                    <p>
                        NTBeyonder es una plataforma innovadora que trasciende los límites tradicionales 
                        de la tecnología. Nuestra misión es explorar nuevas fronteras digitales, 
                        conectando ideas revolucionarias con soluciones prácticas que transforman 
                        la manera en que interactuamos con el mundo digital.
                    </p>
                </BlurText>
                <BlurText 
                    blurAmount={4} 
                    duration={1800} 
                    delay={2500}
                    className="blur-text--slide-up"
                >
                    <button 
                        className="start-button"
                        onClick={handleStart}
                    >
                        COMENZAR
                    </button>
                </BlurText>
            </div>
        </div>
    )
}

export default ProductContext
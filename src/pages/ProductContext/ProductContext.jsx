import React from 'react'
import { useNavigate } from 'react-router-dom'
import './ProductContext.css'
import OrbitalPlanetsOriginal from '../../components/OrbitalPlanetsOriginal/OrbitalPlanetsOriginal'
import BackgroundStars from '../../components/BackgroundStars/BackgroundStars'
import BlurText from '../../components/BlurText/BlurText'
import { useLanguage } from '../../hooks/useLanguage'

const ProductContext = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();

    const handleStart = () => {
        navigate('/universe-map');
    };

    return (
        <div className="product-context">
            <BackgroundStars />
            <OrbitalPlanetsOriginal />
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
                        {t('description')}
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
                        {t('start')}
                    </button>
                </BlurText>
            </div>
        </div>
    )
}

export default ProductContext
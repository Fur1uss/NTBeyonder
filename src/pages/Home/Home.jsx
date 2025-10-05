import React from 'react'
import './Home.css'
import Particles from "../../components/Particles/Particles";
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';

const Home = () =>{
    const navigate = useNavigate();
    const { language, changeLanguage, t } = useLanguage();

    const handleContinue = () => {
        navigate('/product-context');
    }

    return (


        <div className='home-site'>
        <Particles
            particleColors={['ffffff', '#ffffff']}
            particleCount={200}
            particleSpread={10}
            speed={0.1}
            particleBaseSize={100}
            moveParticlesOnHover={true}
            alphaParticles={false}
            disableRotation={false}
        />
        <div className='home-site-content'>
            {/* Botones de idioma */}
            <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 1000 }}>
                <button 
                    onClick={() => changeLanguage('es')}
                    style={{
                        background: language === 'es' ? '#fff' : 'transparent',
                        color: language === 'es' ? '#000' : '#fff',
                        border: '2px solid #fff',
                        padding: '8px 16px',
                        margin: '0 5px',
                        borderRadius: '20px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: 'bold'
                    }}
                >
                    ES
                </button>
                <button 
                    onClick={() => changeLanguage('en')}
                    style={{
                        background: language === 'en' ? '#fff' : 'transparent',
                        color: language === 'en' ? '#000' : '#fff',
                        border: '2px solid #fff',
                        padding: '8px 16px',
                        margin: '0 5px',
                        borderRadius: '20px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: 'bold'
                    }}
                >
                    EN
                </button>
            </div>
            
            <h1><b>{t('startJourney')}</b></h1>
            <div className='home-site-content-buttons'>
                <a href="" onClick={handleContinue}>{t('continue')}</a>
                <p>{t('madeBy')}</p>
            </div>
        </div>
        </div>
    )
}

export default Home
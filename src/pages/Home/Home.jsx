import React from 'react'
import './Home.css'
import Particles from "../../components/Particles/Particles";
import { useNavigate } from 'react-router-dom';

const Home = () =>{
    const navigate = useNavigate();

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
            <h1><b>START YOUR</b> JOURNEY</h1>
            <div className='home-site-content-buttons'>
                <a href="" onClick={handleContinue}>CONTINUE</a>
                <p>NTBeyonder made by NTB Team</p>
            </div>
        </div>
        </div>
    )
}

export default Home
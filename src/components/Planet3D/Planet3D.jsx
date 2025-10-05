import React, { useState } from 'react';
import './Planet3D.css';

const Planet3D = ({ name, size, color, texture, position, delay = 0 }) => {
    const [isHovered, setIsHovered] = useState(false);

    const getTexturePattern = (texture) => {
        switch (texture) {
            case 'earth':
                return {
                    background: `
                        radial-gradient(circle at 30% 30%, #4A90E2 0%, #2E5BBA 20%, #1E3A8A 40%, #0F1B3D 100%),
                        radial-gradient(circle at 70% 20%, #228B22 0%, #006400 30%, transparent 60%),
                        radial-gradient(circle at 20% 70%, #8B4513 0%, #654321 40%, transparent 70%),
                        radial-gradient(circle at 80% 80%, #F4A460 0%, #CD853F 30%, transparent 60%)
                    `,
                    boxShadow: '0 0 20px rgba(74, 144, 226, 0.3), inset -10px -10px 20px rgba(0, 0, 0, 0.3)'
                };
            case 'moon':
                return {
                    background: `
                        radial-gradient(circle at 20% 20%, #E6E6FA 0%, #C0C0C0 30%, #A9A9A9 60%, #696969 100%),
                        radial-gradient(circle at 60% 40%, #D3D3D3 0%, #A9A9A9 50%, transparent 80%),
                        radial-gradient(circle at 80% 20%, #F5F5F5 0%, #D3D3D3 40%, transparent 70%)
                    `,
                    boxShadow: '0 0 15px rgba(192, 192, 192, 0.4), inset -8px -8px 15px rgba(0, 0, 0, 0.4)'
                };
            case 'mars':
                return {
                    background: `
                        radial-gradient(circle at 30% 30%, #FF6B6B 0%, #CD5C5C 20%, #8B0000 40%, #4B0000 100%),
                        radial-gradient(circle at 70% 20%, #FF8C00 0%, #FF4500 30%, transparent 60%),
                        radial-gradient(circle at 20% 70%, #8B4513 0%, #654321 40%, transparent 70%),
                        radial-gradient(circle at 80% 80%, #D2691E 0%, #A0522D 30%, transparent 60%)
                    `,
                    boxShadow: '0 0 18px rgba(205, 92, 92, 0.4), inset -10px -10px 18px rgba(0, 0, 0, 0.4)'
                };
            case 'venus':
                return {
                    background: `
                        radial-gradient(circle at 30% 30%, #FFD700 0%, #FFA500 20%, #FF8C00 40%, #FF4500 100%),
                        radial-gradient(circle at 70% 20%, #FFFFE0 0%, #FFFACD 30%, transparent 60%),
                        radial-gradient(circle at 20% 70%, #F0E68C 0%, #DAA520 40%, transparent 70%),
                        radial-gradient(circle at 80% 80%, #FFE4B5 0%, #DEB887 30%, transparent 60%)
                    `,
                    boxShadow: '0 0 22px rgba(255, 215, 0, 0.5), inset -12px -12px 22px rgba(0, 0, 0, 0.3)'
                };
            default:
                return {
                    background: color,
                    boxShadow: '0 0 15px rgba(255, 255, 255, 0.3), inset -8px -8px 15px rgba(0, 0, 0, 0.3)'
                };
        }
    };

    const textureStyle = getTexturePattern(texture);

    return (
        <div 
            className={`planet-3d ${isHovered ? 'planet-3d--hovered' : ''}`}
            style={{
                '--planet-size': `${size}px`,
                '--planet-color': color,
                '--animation-delay': `${delay}s`
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div 
                className="planet-3d__sphere"
                style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    background: textureStyle.background,
                    boxShadow: textureStyle.boxShadow
                }}
            >
                <div className="planet-3d__atmosphere"></div>
                <div className="planet-3d__glow"></div>
            </div>
            <div className="planet-3d__name">{name}</div>
        </div>
    );
};

export default Planet3D;

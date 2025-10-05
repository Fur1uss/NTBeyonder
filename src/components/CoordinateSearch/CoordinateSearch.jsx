import React, { useState } from 'react';
import './CoordinateSearch.css';

const CoordinateSearch = ({ onNavigate, planet = 'earth' }) => {
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [error, setError] = useState('');

    // Validar coordenadas
    const validateCoordinates = (lat, lng) => {
        const latNum = parseFloat(lat);
        const lngNum = parseFloat(lng);

        if (isNaN(latNum) || isNaN(lngNum)) {
            return 'Las coordenadas deben ser números válidos';
        }

        if (latNum < -90 || latNum > 90) {
            return 'La latitud debe estar entre -90 y 90 grados';
        }

        if (lngNum < -180 || lngNum > 180) {
            return 'La longitud debe estar entre -180 y 180 grados';
        }

        return null;
    };

    // Manejar búsqueda
    const handleSearch = () => {
        setError('');
        
        const validationError = validateCoordinates(latitude, longitude);
        if (validationError) {
            setError(validationError);
            return;
        }

        const lat = parseFloat(latitude);
        const lng = parseFloat(longitude);

        // Llamar a la función de navegación
        if (onNavigate) {
            onNavigate(lat, lng);
        }
    };

    // Manejar Enter
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    // Obtener icono según el planeta
    const getPlanetIcon = () => {
        switch (planet.toLowerCase()) {
            case 'earth':
                return '🌍';
            case 'mars':
                return '🔴';
            case 'moon':
                return '🌙';
            case 'galaxy':
                return '🌌';
            default:
                return '🌍';
        }
    };

    return (
        <div className="coordinate-search">
            <div className="coordinate-search-header">
                <span className="planet-icon">{getPlanetIcon()}</span>
                <h3>{planet.toLowerCase() === 'galaxy' ? 'Coordenadas Celestes' : 'Buscar por Coordenadas'}</h3>
            </div>
            
            <div className="coordinate-inputs">
                <div className="input-group">
                    <label htmlFor="latitude">
                        {planet.toLowerCase() === 'galaxy' ? 'Declinación (°):' : 'Latitud:'}
                    </label>
                    <input
                        id="latitude"
                        type="number"
                        step="any"
                        placeholder={planet.toLowerCase() === 'galaxy' ? 'Ej: 41.2692' : 'Ej: 40.7128'}
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                        onKeyPress={handleKeyPress}
                        min="-90"
                        max="90"
                    />
                </div>
                
                <div className="input-group">
                    <label htmlFor="longitude">
                        {planet.toLowerCase() === 'galaxy' ? 'Ascensión Recta (h):' : 'Longitud:'}
                    </label>
                    <input
                        id="longitude"
                        type="number"
                        step="any"
                        placeholder={planet.toLowerCase() === 'galaxy' ? 'Ej: 12.5133' : 'Ej: -74.0060'}
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                        onKeyPress={handleKeyPress}
                        min="-180"
                        max="180"
                    />
                </div>
            </div>

            {error && (
                <div className="error-message">
                    <i className="fas fa-exclamation-triangle"></i>
                    <span>{error}</span>
                </div>
            )}

            <button 
                className="search-button"
                onClick={handleSearch}
                disabled={!latitude || !longitude}
            >
                <i className="fas fa-search"></i>
                Navegar
            </button>

        </div>
    );
};

export default CoordinateSearch;

import React, { useState, useEffect, useRef } from 'react';
import { NASA_CONFIG, getPlanetLayers, getPlanetDates, buildTileUrl } from '../../config/nasaConfig';
import './NASAViewer.css';

const NASAViewer = ({ planetName, onClose }) => {
    const [selectedLayer, setSelectedLayer] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [availableDates, setAvailableDates] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);

    // Obtener capas disponibles para el planeta
    const planetLayers = getPlanetLayers(planetName);

    useEffect(() => {
        // Si no hay capas para este planeta, mostrar error
        if (Object.keys(planetLayers).length === 0) {
            setError(`No hay capas de imágenes disponibles para ${planetName}`);
            return;
        }

        // Seleccionar la primera capa por defecto
        const firstLayer = Object.keys(planetLayers)[0];
        setSelectedLayer(firstLayer);
    }, [planetName, planetLayers]);

    useEffect(() => {
        if (selectedLayer) {
            const dates = getPlanetDates(planetName, selectedLayer);
            if (dates) {
                setAvailableDates([dates.default]);
                setSelectedDate(dates.default);
            }
        }
    }, [selectedLayer, planetName]);

    useEffect(() => {
        if (selectedLayer && selectedDate && mapRef.current) {
            initializeMap();
        }
    }, [selectedLayer, selectedDate]);

    const initializeMap = () => {
        if (mapInstanceRef.current) {
            mapInstanceRef.current.remove();
        }

        // Crear mapa Leaflet
        const L = window.L;
        if (!L) {
            setError('Leaflet no está cargado');
            return;
        }

        const map = L.map(mapRef.current, {
            zoomControl: true,
            attributionControl: true
        }).setView([0, 0], NASA_CONFIG.VIEWER_CONFIG.DEFAULT_ZOOM);

        // Agregar capa base de OpenStreetMap como fallback
        const baseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19
        });
        baseLayer.addTo(map);

        // Crear capa personalizada de NASA GIBS
        const layer = planetLayers[selectedLayer];
        const tileUrl = buildTileUrl(planetName, selectedLayer, selectedDate, '{z}', '{x}', '{y}');
        
        if (!tileUrl) {
            console.error('No se pudo construir la URL del tile');
            return;
        }
        
        const tileLayer = L.tileLayer(tileUrl, {
            attribution: layer.attribution,
            maxZoom: layer.maxZoom,
            opacity: NASA_CONFIG.VIEWER_CONFIG.LAYER_OPACITY,
            crossOrigin: true, // Permitir CORS
            errorTileUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='
        });

        // Manejar errores de carga de tiles (reducir ruido en consola)
        tileLayer.on('tileerror', (e) => {
            // Solo mostrar errores importantes, no todos los tiles faltantes
            if (e.coords.z <= 3) {
                console.warn('Error cargando tile NASA GIBS para zoom bajo:', e.coords);
            }
        });
        
        tileLayer.on('tileload', () => {
            // Solo mostrar algunos logs de éxito para no saturar la consola
            if (Math.random() < 0.1) {
                console.log('Tile NASA GIBS cargado exitosamente');
            }
        });
        
        tileLayer.addTo(map);
        mapInstanceRef.current = map;
        
        // Mostrar mensaje de estado
        console.log(`Capa ${layer.title} cargada para ${planetName}`);

        // Agregar control de escala
        L.control.scale().addTo(map);
    };

    const handleLayerChange = (layerName) => {
        setSelectedLayer(layerName);
        setError(null);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setError(null);
    };

    const handleClose = () => {
        if (mapInstanceRef.current) {
            mapInstanceRef.current.remove();
            mapInstanceRef.current = null;
        }
        onClose();
    };

    if (Object.keys(planetLayers).length === 0) {
        return (
            <div className="nasa-viewer">
                <div className="nasa-viewer-header">
                    <h2>Explorador de {planetName}</h2>
                    <button className="close-btn" onClick={handleClose}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>
                <div className="nasa-viewer-content">
                    <div className="error-message">
                        <i className="fas fa-exclamation-triangle"></i>
                        <p>No hay imágenes de alta resolución disponibles para {planetName}</p>
                        <button className="back-btn" onClick={handleClose}>
                            Volver
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="nasa-viewer">
            <div className="nasa-viewer-header">
                <h2>Explorador de {planetName}</h2>
                <button className="close-btn" onClick={handleClose}>
                    <i className="fas fa-times"></i>
                </button>
            </div>
            
            <div className="nasa-viewer-controls">
                <div className="control-group">
                    <label htmlFor="layer-select">Capa:</label>
                    <select 
                        id="layer-select"
                        value={selectedLayer} 
                        onChange={(e) => handleLayerChange(e.target.value)}
                    >
                        {Object.entries(planetLayers).map(([key, layer]) => (
                            <option key={key} value={key}>
                                {layer.title}
                            </option>
                        ))}
                    </select>
                </div>
                
                <div className="control-group">
                    <label htmlFor="date-select">Fecha:</label>
                    <select 
                        id="date-select"
                        value={selectedDate} 
                        onChange={(e) => handleDateChange(e.target.value)}
                    >
                        {availableDates.map(date => (
                            <option key={date} value={date}>
                                {new Date(date).toLocaleDateString('es-ES')}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="nasa-viewer-content">
                {error && (
                    <div className="error-message">
                        <i className="fas fa-exclamation-triangle"></i>
                        <p>{error}</p>
                    </div>
                )}
                
                <div className="map-container">
                    <div ref={mapRef} className="map"></div>
                </div>
            </div>
        </div>
    );
};

export default NASAViewer;

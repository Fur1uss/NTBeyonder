import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { NASA_CONFIG, buildGIBSUrl, getEarthLayers, getEarthDates, buildNASAUrl } from '../../config/nasaConfig';
import './EarthViewer.css';
import BackgroundStars from '../BackgroundStars/BackgroundStars';
import CoordinateSearch from '../CoordinateSearch/CoordinateSearch';
import PlanetChatbot from '../PlanetChatbot/PlanetChatbot';

const EarthViewer = ({ onClose }) => {
    const [selectedLayer, setSelectedLayer] = useState('visual');
    const [selectedDate, setSelectedDate] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [tileStats, setTileStats] = useState({ loaded: 0, errors: 0 });
    const [currentImage, setCurrentImage] = useState(null);
    const [showImageModal, setShowImageModal] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const currentLayerRef = useRef(null);
    
    // Obtener capas y fechas disponibles
    const earthLayers = getEarthLayers();
    const earthDates = getEarthDates();

    useEffect(() => {
        // Establecer fecha por defecto
        setSelectedDate(earthDates.default);
        
        // Inicializar el mapa
        initializeMap();
        
        // Cargar imagen inicial de NASA
        loadNASAImage();
        
        return () => {
            // Limpiar el mapa al desmontar
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
            }
        };
    }, []);

    useEffect(() => {
        // Cambiar capa cuando cambie la selección
        if (mapInstanceRef.current && selectedDate) {
            loadLayer(selectedLayer, selectedDate);
        }
    }, [selectedLayer, selectedDate]);

    const initializeMap = () => {
        // Crear mapa centrado en la Tierra
        const map = L.map(mapRef.current, {
            center: [20, 0], // Centro en la Tierra
            zoom: 2,
            minZoom: 1,
            maxZoom: 18,
            zoomControl: false, // Deshabilitar control de zoom por defecto de Leaflet
            attributionControl: false, // Deshabilitar atribución por defecto de Leaflet
            worldCopyJump: true
        });

        // Establecer fondo negro directamente en el contenedor del mapa
        const mapContainer = mapRef.current;
        mapContainer.style.backgroundColor = 'black';
        
        // Capa base transparente (solo para mantener la funcionalidad de Leaflet)
        const spaceLayer = L.tileLayer('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==', {
            attribution: '',
            opacity: 0 // Completamente transparente
        });
        
        spaceLayer.addTo(map);
        mapInstanceRef.current = map;
        
        // Eventos del mapa
        map.on('zoomend', handleMapZoom);
        map.on('zoomstart', handleZoomStart);
        
        console.log('Mapa de la Tierra inicializado');
    };

    const loadLayer = (layerType, date) => {
        if (!mapInstanceRef.current) return;
        
        const map = mapInstanceRef.current;
        const layerConfig = earthLayers[layerType];
        
        if (!layerConfig) {
            console.error('Capa no encontrada:', layerType);
            return;
        }

        // Remover capa anterior
        if (currentLayerRef.current) {
            map.removeLayer(currentLayerRef.current);
        }

        setIsLoading(true);
        setError(null);
        setTileStats({ loaded: 0, errors: 0 });

        // Crear nueva capa GIBS
        const tileUrl = buildGIBSUrl(layerConfig.name, date, '{z}', '{x}', '{y}', layerConfig.format);
        
        const newLayer = L.tileLayer(tileUrl, {
            attribution: `${layerConfig.attribution} - ${date}`,
            maxZoom: layerConfig.maxZoom,
            opacity: NASA_CONFIG.VIEWER_CONFIG.LAYER_OPACITY,
            tileSize: NASA_CONFIG.VIEWER_CONFIG.TILE_SIZE,
            noWrap: true,
            bounds: [[-85.0511, -180], [85.0511, 180]],
            crossOrigin: true,
            errorTileUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='
        });

        // Manejar eventos de tiles
        newLayer.on('tileerror', (e) => {
            setTileStats(prev => ({ ...prev, errors: prev.errors + 1 }));
            
            // Solo mostrar errores críticos
            if (e.coords.z <= 1) {
                console.warn('Error cargando tile GIBS crítico:', e.coords);
            }
        });
        
        newLayer.on('tileload', () => {
            setTileStats(prev => ({ ...prev, loaded: prev.loaded + 1 }));
        });
        
        newLayer.on('loading', () => {
            setIsLoading(true);
        });
        
        newLayer.on('load', () => {
            setIsLoading(false);
            console.log(`Capa ${layerConfig.title} cargada para ${date}`);
        });

        newLayer.addTo(map);
        currentLayerRef.current = newLayer;
        
        // Ajustar zoom máximo según la capa (reducir en 1 para evitar capa azul)
        const effectiveMaxZoom = layerConfig.maxZoom - 1;
        map.setMaxZoom(effectiveMaxZoom);
        
        // Verificar si el zoom actual excede el máximo efectivo de la capa
        const currentZoom = map.getZoom();
        if (currentZoom > effectiveMaxZoom) {
            map.setZoom(effectiveMaxZoom);
        }
    };

    const handleZoomStart = (e) => {
        if (!mapInstanceRef.current) return;
        
        const map = mapInstanceRef.current;
        const layerConfig = earthLayers[selectedLayer];
        
        if (layerConfig) {
            const currentZoom = map.getZoom();
            const targetZoom = e.zoom || currentZoom;
            const effectiveMaxZoom = layerConfig.maxZoom - 1;
            
            // Prevenir zoom si excede el máximo efectivo de la capa
            if (targetZoom > effectiveMaxZoom) {
                e.preventDefault();
                map.setZoom(effectiveMaxZoom);
                showZoomInfo(`🔒 Zoom máximo alcanzado para ${layerConfig.title}`, 'warning');
                return false;
            }
        }
    };

    const handleMapZoom = () => {
        if (!mapInstanceRef.current) return;
        
        const map = mapInstanceRef.current;
        const zoom = map.getZoom();
        const layerConfig = earthLayers[selectedLayer];
        
        if (layerConfig) {
            const effectiveMaxZoom = layerConfig.maxZoom - 1;
            
            // Verificar si se alcanzó el zoom máximo efectivo de la capa
            if (zoom >= effectiveMaxZoom) {
                // Prevenir zoom adicional
                map.setZoom(effectiveMaxZoom);
                showZoomInfo(`🔒 Zoom máximo alcanzado para ${layerConfig.title}`, 'warning');
                return;
            }
            
            let message = '';
            if (zoom >= 6) {
                message = '🌍 Alta resolución - Detalles regionales de la Tierra';
            } else if (zoom >= 4) {
                message = '🌍 Resolución media - Vista continental';
            } else if (zoom >= 2) {
                message = '🌍 Resolución global - Vista mundial';
            }
            
            if (message) {
                showZoomInfo(message);
            }
            
            // Advertencia cuando se está cerca del zoom máximo efectivo
            if (zoom >= effectiveMaxZoom - 1) {
                showZoomInfo(`⚠️ Zoom máximo para ${layerConfig.title}: ${effectiveMaxZoom}`, 'warning');
            }
        }
    };

    const showZoomInfo = (message, type = 'info') => {
        // Remover notificación anterior
        const existingInfo = document.getElementById('zoom-info');
        if (existingInfo) {
            existingInfo.remove();
        }
        
        const infoDiv = document.createElement('div');
        infoDiv.id = 'zoom-info';
        infoDiv.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: ${type === 'warning' ? '#ffaa00' : 'rgba(0, 0, 0, 0.8)'};
            color: ${type === 'warning' ? '#000' : '#fff'};
            padding: 0.75rem 1rem;
            border-radius: 6px;
            z-index: 1000;
            font-size: 0.85rem;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
            animation: fadeInUp 0.3s ease;
            max-width: 300px;
        `;
        infoDiv.textContent = message;
        
        document.body.appendChild(infoDiv);
        
        setTimeout(() => {
            if (infoDiv.parentNode) {
                infoDiv.remove();
            }
        }, 3000);
    };

    const loadNASAImage = async () => {
        try {
            // Intentar obtener imagen EPIC primero
            const epicResponse = await fetch(buildNASAUrl(NASA_CONFIG.API_CONFIG.ENDPOINTS.EPIC));
            
            if (epicResponse.ok) {
                const epicData = await epicResponse.json();
                if (epicData && epicData.length > 0) {
                    const latestImage = epicData[0];
                    const date = latestImage.date.split(' ')[0].replace(/-/g, '/');
                    const imageUrl = `https://epic.gsfc.nasa.gov/archive/natural/${date.replace(/\//g, '/')}/png/${latestImage.image}.png`;
                    
                    setCurrentImage({
                        title: 'Imagen EPIC de la Tierra',
                        url: imageUrl,
                        description: `Imagen de la Tierra tomada el ${latestImage.date} desde el satélite DSCOVR. ${latestImage.caption || ''}`
                    });
                    return;
                }
            }
        } catch (error) {
            console.warn('Error al obtener imagen EPIC:', error);
        }
        
        // Fallback a APOD
        try {
            const apodResponse = await fetch(buildNASAUrl(NASA_CONFIG.API_CONFIG.ENDPOINTS.APOD));
            if (apodResponse.ok) {
                const apodData = await apodResponse.json();
                if (apodData && apodData.url) {
                    setCurrentImage({
                        title: apodData.title || 'Imagen Astronómica del Día',
                        url: apodData.url,
                        description: apodData.explanation || 'Imagen proporcionada por NASA APOD'
                    });
                }
            }
        } catch (error) {
            console.error('Error al obtener APOD:', error);
        }
    };

    const handleLayerChange = (e) => {
        setSelectedLayer(e.target.value);
    };

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    const handleClose = () => {
        if (onClose) {
            onClose();
        } else {
            window.history.back();
        }
    };


    const openImageModal = () => {
        if (currentImage) {
            setShowImageModal(true);
        }
    };

    const closeImageModal = () => {
        setShowImageModal(false);
    };

    // Función para navegar a coordenadas específicas
    const handleCoordinateNavigation = (lat, lng) => {
        if (!mapInstanceRef.current) return;
        
        const map = mapInstanceRef.current;
        
        // Centrar el mapa en las coordenadas
        map.setView([lat, lng], 8);
        
        // Agregar marcador
        const marker = L.marker([lat, lng]).addTo(map);
        
        // Agregar popup con información de coordenadas
        marker.bindPopup(`
            <div style="color: black; font-family: Arial, sans-serif;">
                <h3 style="margin: 0 0 8px 0; color: #2c3e50;">📍 Coordenadas</h3>
                <p style="margin: 0 0 8px 0; color: #7f8c8d;">
                    <strong>Latitud:</strong> ${lat.toFixed(6)}°<br/>
                    <strong>Longitud:</strong> ${lng.toFixed(6)}°
                </p>
                <small style="color: #95a5a6;">Navegación exitosa</small>
            </div>
        `).openPopup();
        
        // Remover marcador anterior si existe
        if (window.currentCoordinateMarker) {
            map.removeLayer(window.currentCoordinateMarker);
        }
        window.currentCoordinateMarker = marker;
        
        // Mostrar mensaje de éxito
        showSuccessMessage(`🌍 Navegando a: ${lat.toFixed(4)}, ${lng.toFixed(4)}`);
    };

    // Función para mostrar mensajes de éxito
    const showSuccessMessage = (message) => {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'success-message';
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(46, 204, 113, 0.9);
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 1001;
            font-size: 14px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 3000);
    };

        return (
            <div className="earth-viewer">
                <BackgroundStars />
                
                {/* Botón de cerrar */}
                <button className="close-btn" onClick={handleClose}>
                    <i className="fas fa-times"></i>
                </button>

            {/* Layout principal: Mapa a la izquierda, controles a la derecha */}
            <div className="earth-viewer-layout">
                {/* Mapa */}
                <div className="map-container">
                    {isLoading && (
                        <div className="loader-overlay">
                            <div className="planet-loader"></div>
                            <p>Cargando imágenes de la Tierra...</p>
                        </div>
                    )}
                    {error && (
                        <div className="error-message">
                            <i className="fas fa-exclamation-triangle"></i>
                            <p>{error}</p>
                        </div>
                    )}
                    <div ref={mapRef} className="map"></div>
                </div>

                {/* Panel de controles a la derecha */}
                <div className="controls-panel">
                    <div className="panel-header">
                        <h2><i className="fas fa-globe"></i> Tierra</h2>
                        <div className="header-buttons">
                            <button className="chat-btn" onClick={() => setIsChatOpen(!isChatOpen)} title="Hablar con la Tierra">
                                <i className="fas fa-comments"></i>
                            </button>
                            <button className="image-btn" onClick={openImageModal} disabled={!currentImage}>
                                <i className="fas fa-image"></i>
                            </button>
                        </div>
                    </div>

                    <div className="controls-content">
                        {/* Selector de capa */}
                        <div className="control-group">
                            <label htmlFor="layer-select">Capa:</label>
                            <select 
                                id="layer-select" 
                                value={selectedLayer} 
                                onChange={handleLayerChange}
                            >
                                {Object.entries(earthLayers).map(([key, layer]) => (
                                    <option key={key} value={key}>
                                        {layer.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                        
                        {/* Selector de fecha */}
                        <div className="control-group">
                            <label htmlFor="date-select">Fecha:</label>
                            <input
                                type="date"
                                id="date-select"
                                value={selectedDate}
                                onChange={handleDateChange}
                                min={earthDates.start}
                                max={earthDates.end}
                            />
                        </div>

                            {/* Información de la capa */}
                            <div className="layer-info">
                                <h3>{earthLayers[selectedLayer]?.title}</h3>
                                <p>{earthLayers[selectedLayer]?.description}</p>
                                <small>Zoom máximo: {(earthLayers[selectedLayer]?.maxZoom || 9) - 1}</small>
                            </div>

                            {/* Búsqueda por coordenadas */}
                            <div className="coordinate-search-section">
                                <CoordinateSearch 
                                    onNavigate={handleCoordinateNavigation}
                                    planet="earth"
                                />
                            </div>

                        </div>
                </div>
            </div>

            {/* Modal de imagen */}
            {showImageModal && currentImage && (
                <div className="image-modal" onClick={closeImageModal}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>{currentImage.title}</h3>
                            <button className="modal-close" onClick={closeImageModal}>
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        <div className="modal-body">
                            <img src={currentImage.url} alt={currentImage.title} />
                            <div className="modal-description">
                                {currentImage.description}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Chatbot de Planetas */}
            <PlanetChatbot
                currentPlanet="Tierra"
                isVisible={isChatOpen}
                onClose={() => setIsChatOpen(false)}
            />
        </div>
    );
};

export default EarthViewer;

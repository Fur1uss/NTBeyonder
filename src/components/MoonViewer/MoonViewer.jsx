import React, { useState, useEffect, useRef, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { NASA_CONFIG, buildPlanetaryTileUrl, buildNASAUrl } from '../../config/nasaConfig';
import './MoonViewer.css';
import BackgroundStars from '../BackgroundStars/BackgroundStars';
import CoordinateSearch from '../CoordinateSearch/CoordinateSearch';
import PlanetChatbot from '../PlanetChatbot/PlanetChatbot';
import { useLanguage } from '../../hooks/useLanguage';

const MoonViewer = ({ onClose }) => {
    const [selectedLayer, setSelectedLayer] = useState('visual');
    const [selectedDate, setSelectedDate] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const currentLayerRef = useRef(null);
    const { t } = useLanguage();

    const moonLayers = NASA_CONFIG.GIBS_CONFIG.MOON_LAYERS;
    const moonDates = {
        start: NASA_CONFIG.GIBS_CONFIG.MOON_DATES.start,
        end: NASA_CONFIG.GIBS_CONFIG.MOON_DATES.end,
        default: NASA_CONFIG.GIBS_CONFIG.MOON_DATES.default
    };

    // Inicializar fecha por defecto
    useEffect(() => {
        setSelectedDate(moonDates.default);
    }, [moonDates.default]);

    // Inicializar mapa
    useEffect(() => {
        if (!mapRef.current) return;

        initializeMap();

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, []);

    // Cargar capa cuando cambie la capa o la fecha
    useEffect(() => {
        if (mapInstanceRef.current && selectedDate) {
            loadLayer(selectedLayer, selectedDate);
        }
    }, [selectedLayer, selectedDate]);

    const initializeMap = () => {
        // Crear mapa centrado en la Luna
        const map = L.map(mapRef.current, {
            center: [0, 0], // Centro en la Luna
            zoom: 2,
            minZoom: 1,
            maxZoom: 18,
            zoomControl: false,
            attributionControl: false,
            worldCopyJump: true
        });

        // Establecer fondo negro directamente en el contenedor del mapa
        const mapContainer = mapRef.current;
        mapContainer.style.backgroundColor = 'black';
        
        // Capa base transparente
        const spaceLayer = L.tileLayer('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==', {
            attribution: '',
            opacity: 0
        });
        
        spaceLayer.addTo(map);
        mapInstanceRef.current = map;
        
        // Eventos del mapa
        map.on('zoomend', handleMapZoom);
        map.on('zoomstart', handleZoomStart);
        
        console.log('Mapa de la Luna inicializado');
    };

    const loadLayer = (layerType, date) => {
        if (!mapInstanceRef.current) return;
        
        const map = mapInstanceRef.current;
        const layerConfig = moonLayers[layerType];
        
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

        // Crear nueva capa planetaria (Luna) - Solo Mosaico Global
        // Usar proxy local para evitar CORS
        const tileUrl = '/opm-moon/api/v1/map/named/opm-moon-basemap-v0-1/all/{z}/{x}/{y}.png';
        
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
            if (e.coords.z <= 1) {
                console.warn('Error cargando tile de la Luna crítico:', e.coords);
            }
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
        
        const effectiveMaxZoom = layerConfig.maxZoom;
        map.setMaxZoom(effectiveMaxZoom);
        
        const currentZoom = map.getZoom();
        if (currentZoom > effectiveMaxZoom) {
            map.setZoom(effectiveMaxZoom);
        }
    };

    const handleZoomStart = (e) => {
        if (!mapInstanceRef.current) return;
        
        const map = mapInstanceRef.current;
        const layerConfig = moonLayers[selectedLayer];
        
        if (layerConfig) {
            const currentZoom = map.getZoom();
            const targetZoom = e.zoom || currentZoom;
            const effectiveMaxZoom = layerConfig.maxZoom;
            
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
        const layerConfig = moonLayers[selectedLayer];
        
        if (layerConfig) {
            const effectiveMaxZoom = layerConfig.maxZoom;
            
            if (zoom >= effectiveMaxZoom) {
                map.setZoom(effectiveMaxZoom);
                showZoomInfo(`🔒 Zoom máximo alcanzado para ${layerConfig.title}`, 'warning');
                return;
            }
            
            let message = '';
            if (zoom >= 4) {
                message = `🌙 ${t('moonHighRes')}`;
            } else if (zoom >= 2) {
                message = `🌙 ${t('moonMediumRes')}`;
            } else if (zoom >= 1) {
                message = `🌙 ${t('moonGlobalRes')}`;
            }
            
            if (message) {
                showZoomInfo(message);
            }
            
            if (zoom >= effectiveMaxZoom - 1) {
                showZoomInfo(`⚠️ Zoom máximo para ${layerConfig.title}: ${effectiveMaxZoom}`, 'warning');
            }
        }
    };

    const showZoomInfo = (message, type = 'info') => {
        const existingInfo = document.getElementById('zoom-info');
        if (existingInfo) {
            existingInfo.remove();
        }
        
        const zoomInfoDiv = document.createElement('div');
        zoomInfoDiv.id = 'zoom-info';
        zoomInfoDiv.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: ${type === 'warning' ? 'rgba(255, 170, 0, 0.9)' : 'rgba(0, 0, 0, 0.8)'};
            color: ${type === 'warning' ? 'white' : 'rgba(255, 255, 255, 0.9)'};
            padding: 0.75rem 1rem;
            border-radius: 6px;
            z-index: 1000;
            font-size: 0.85rem;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
            animation: fadeInUp 0.3s ease;
            max-width: 300px;
            backdrop-filter: blur(10px);
            border: 1px solid ${type === 'warning' ? 'rgba(255, 170, 0, 0.5)' : 'rgba(255, 255, 255, 0.1)'};
        `;
        zoomInfoDiv.textContent = message;
        
        document.body.appendChild(zoomInfoDiv);
        
        setTimeout(() => {
            if (zoomInfoDiv.parentNode) {
                zoomInfoDiv.remove();
            }
        }, 3000);
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


    const [showImageModal, setShowImageModal] = useState(false);
    const [currentImage, setCurrentImage] = useState(null);
    const [isChatOpen, setIsChatOpen] = useState(false);

    const fetchMoonImage = useCallback(async () => {
        setIsLoading(true);
        try {
            // Usar proxy para evitar CORS
            const response = await fetch(buildNASAUrl(NASA_CONFIG.API_CONFIG.ENDPOINTS.APOD));
            if (!response.ok) throw new Error('Error fetching APOD image');
            const data = await response.json();
            setCurrentImage({
                title: data.title || 'Imagen Astronómica del Día',
                url: data.url,
                description: data.explanation || 'Imagen proporcionada por NASA APOD'
            });
        } catch (err) {
            console.error('Error loading NASA image:', err);
            // Usar imagen de fallback para la Luna
            setCurrentImage({
                title: 'Luna - Nuestro Satélite Natural',
                url: 'https://moon.nasa.gov/system/resources/detail_files/7808_global-color-views-moon-PIA00407-full2.jpg',
                description: 'Vista global de la Luna desde el espacio. Nuestro satélite natural que ha sido testigo de la evolución de la vida en la Tierra.'
            });
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMoonImage();
    }, [fetchMoonImage]);

    const openImageModal = () => {
        setShowImageModal(true);
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
        showSuccessMessage(`🌙 ${t('moonNavigatingTo')} ${lat.toFixed(4)}, ${lng.toFixed(4)}`);
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
            <div className="moon-viewer">
                <BackgroundStars />
                
                {/* Botón de cerrar */}
                <button className="close-btn" onClick={handleClose}>
                    <i className="fas fa-times"></i>
                </button>

            {/* Layout principal: Mapa a la izquierda, controles a la derecha */}
            <div className="moon-viewer-layout">
                {/* Mapa */}
                <div className="map-container">
                    {isLoading && (
                        <div className="loader-overlay">
                            <div className="planet-loader"></div>
                            <p>{t('loadingMoon')}</p>
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
                        <h2><i className="fas fa-moon"></i> {t('moonTitle')}</h2>
                        <div className="header-buttons">
                            <button className="chat-btn" onClick={() => setIsChatOpen(!isChatOpen)} title={t('talkToMoon')}>
                                <i className="fas fa-comments"></i>
                            </button>
                            <button className="image-btn" onClick={openImageModal} disabled={!currentImage}>
                                <i className="fas fa-image"></i>
                            </button>
                        </div>
                    </div>

                    <div className="controls-content">
                        {/* Información de la capa activa */}
                        <div className="control-group">
                            <label>Capa activa:</label>
                            <div className="active-layer">
                                <strong>LRO WAC - Mosaico Global</strong>
                            </div>
                        </div>
                        
                        {/* Selector de fecha */}
                        <div className="control-group">
                            <label htmlFor="date-select">Fecha:</label>
                            <input
                                type="date"
                                id="date-select"
                                value={selectedDate}
                                onChange={handleDateChange}
                                min={moonDates.start}
                                max={moonDates.end}
                            />
                        </div>

                        {/* Información de la capa */}
                        <div className="layer-info">
                            <h3>LRO WAC - Mosaico Global</h3>
                            <p>Mosaico global de la Luna basado en datos del Lunar Reconnaissance Orbiter Camera (LROC). Muestra la superficie lunar con alta resolución y detalles de cráteres, mares y formaciones geológicas.</p>
                            <small>Zoom máximo: 10</small>
                        </div>

                        {/* Búsqueda por coordenadas */}
                        <div className="coordinate-search-section">
                            <CoordinateSearch 
                                onNavigate={handleCoordinateNavigation}
                                planet="moon"
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
                currentPlanet="Luna"
                isVisible={isChatOpen}
                onClose={() => setIsChatOpen(false)}
            />
        </div>
    );
};

export default MoonViewer;

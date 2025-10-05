import React, { useState, useEffect, useRef, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { NASA_CONFIG, buildPlanetaryTileUrl } from '../../config/nasaConfig';
import './MoonViewer.css';
import BackgroundStars from '../BackgroundStars/BackgroundStars';

const MoonViewer = ({ onClose }) => {
    const [selectedLayer, setSelectedLayer] = useState('visual');
    const [selectedDate, setSelectedDate] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const currentLayerRef = useRef(null);

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
        const tileUrl = '/opm-moon/opmbuilder/api/v1/map/named/opm-moon-basemap-v0-1/all/{z}/{x}/{y}.png';
        
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
                message = '🌙 Alta resolución - Detalles de la superficie lunar';
            } else if (zoom >= 2) {
                message = '🌙 Resolución media - Vista de la Luna';
            } else if (zoom >= 1) {
                message = '🌙 Resolución global - Vista completa de la Luna';
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

    const fetchMoonImage = useCallback(async () => {
        setIsLoading(true);
        try {
            // Usar APOD para imágenes de la Luna
            const response = await fetch(
                `${NASA_CONFIG.ENDPOINTS.BASE}/planetary/apod?api_key=${NASA_CONFIG.API_CONFIG.API_KEY}`
            );
            if (!response.ok) throw new Error('Error fetching APOD image');
            const data = await response.json();
            setCurrentImage({
                title: data.title || 'Imagen Astronómica del Día',
                url: data.url,
                description: data.explanation || 'Imagen proporcionada por NASA APOD'
            });
        } catch (err) {
            console.error('Error loading NASA image:', err);
            setError('Error al cargar la imagen de NASA.');
            setCurrentImage(null);
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
                            <p>Cargando imágenes de la Luna...</p>
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
                        <h2><i className="fas fa-moon"></i> Luna</h2>
                        <button className="image-btn" onClick={openImageModal} disabled={!currentImage}>
                            <i className="fas fa-image"></i>
                        </button>
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
        </div>
    );
};

export default MoonViewer;

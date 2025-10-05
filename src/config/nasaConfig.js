// Configuración avanzada de APIs de NASA para React
export const NASA_CONFIG = {
    // URLs base para diferentes servicios
    ENDPOINTS: {
        BASE: 'https://api.nasa.gov',
        GIBS: 'https://gibs.earthdata.nasa.gov',
        EPIC: 'https://epic.gsfc.nasa.gov',
        JPL: 'https://ssd-api.jpl.nasa.gov'
    },
    
    // Configuración específica para GIBS
    GIBS_CONFIG: {
        // Capas disponibles para la Tierra
        EARTH_LAYERS: {
            visual: {
                name: 'MODIS_Terra_CorrectedReflectance_TrueColor',
                title: 'MODIS Terra - Color Verdadero',
                format: 'jpg',
                maxZoom: 9,
                attribution: 'NASA GIBS'
            },
            infrared: {
                name: 'MODIS_Aqua_CorrectedReflectance_Bands721',
                title: 'MODIS Aqua - Infrarrojo (7-2-1)',
                format: 'jpg',
                maxZoom: 9,
                attribution: 'NASA GIBS'
            },
            radar: {
                name: 'VIIRS_SNPP_DayNightBand_ENCC',
                title: 'VIIRS - Día/Noche',
                format: 'png',
                maxZoom: 8,
                attribution: 'NASA GIBS'
            },
            earthatnight: {
                name: 'VIIRS_Black_Marble',
                title: 'Earth at Night - Black Marble',
                format: 'jpg',
                maxZoom: 8,
                attribution: 'NASA GIBS / VIIRS'
            },
            landsat: {
                name: 'Landsat_WELD_CorrectedReflectance_TrueColor_Global_Annual',
                title: 'Landsat - Compuesto Anual',
                format: 'jpg',
                maxZoom: 7,
                attribution: 'NASA GIBS / USGS'
            }
        },
        
        // Capas disponibles para Marte
        MARS_LAYERS: {
            visual: {
                name: 'MARS_MOLA_Shaded_Relief',
                title: 'MOLA - Relieve Sombreado',
                format: 'jpg',
                maxZoom: 8,
                attribution: 'NASA MOLA'
            },
            thermal: {
                name: 'MARS_THEMIS_IR_Day',
                title: 'THEMIS - Infrarrojo Diurno',
                format: 'jpg',
                maxZoom: 7,
                attribution: 'NASA THEMIS'
            },
            mineral: {
                name: 'MARS_CRISM_Mineral_Map',
                title: 'CRISM - Mapa Mineral',
                format: 'jpg',
                maxZoom: 6,
                attribution: 'NASA CRISM'
            }
        },
        
        // Capas disponibles para Venus
        VENUS_LAYERS: {
            radar: {
                name: 'VENUS_Magellan_Radar',
                title: 'Magellan - Radar',
                format: 'jpg',
                maxZoom: 7,
                attribution: 'NASA Magellan'
            },
            elevation: {
                name: 'VENUS_Magellan_Elevation',
                title: 'Magellan - Elevación',
                format: 'jpg',
                maxZoom: 7,
                attribution: 'NASA Magellan'
            }
        },
        
        // Capas disponibles para Saturno
        SATURN_LAYERS: {
            rings: {
                name: 'SATURN_Cassini_Rings',
                title: 'Cassini - Anillos',
                format: 'jpg',
                maxZoom: 6,
                attribution: 'NASA Cassini'
            },
            atmosphere: {
                name: 'SATURN_Cassini_Atmosphere',
                title: 'Cassini - Atmósfera',
                format: 'jpg',
                maxZoom: 6,
                attribution: 'NASA Cassini'
            }
        }
    },
    
    // Configuración de fechas
    DATE_CONFIG: {
        // Fechas disponibles para diferentes capas
        EARTH_DATES: {
            visual: {
                start: '2020-01-01',
                end: '2024-12-31',
                default: '2024-10-01'
            },
            infrared: {
                start: '2020-01-01',
                end: '2024-12-31',
                default: '2024-10-01'
            },
            radar: {
                start: '2020-01-01',
                end: '2024-12-31',
                default: '2024-10-01'
            },
            earthatnight: {
                start: '2020-01-01',
                end: '2024-12-31',
                default: '2024-10-01'
            },
            landsat: {
                start: '2020-01-01',
                end: '2024-12-31',
                default: '2024-01-15'
            }
        },
        
        MARS_DATES: {
            visual: {
                start: '2018-01-01',
                end: '2024-12-31',
                default: '2024-01-15'
            },
            thermal: {
                start: '2018-01-01',
                end: '2024-12-31',
                default: '2024-01-15'
            },
            mineral: {
                start: '2018-01-01',
                end: '2024-12-31',
                default: '2024-01-15'
            }
        },
        
        VENUS_DATES: {
            radar: {
                start: '1990-01-01',
                end: '1994-12-31',
                default: '1992-06-15'
            },
            elevation: {
                start: '1990-01-01',
                end: '1994-12-31',
                default: '1992-06-15'
            }
        },
        
        SATURN_DATES: {
            rings: {
                start: '2004-01-01',
                end: '2017-12-31',
                default: '2010-06-15'
            },
            atmosphere: {
                start: '2004-01-01',
                end: '2017-12-31',
                default: '2010-06-15'
            }
        }
    },
    
    // Configuración de visualización
    VIEWER_CONFIG: {
        // Configuración por defecto del mapa
        DEFAULT_ZOOM: 2,
        MIN_ZOOM: 1,
        MAX_ZOOM: 9,
        
        // Configuración de controles
        CONTROLS: {
            zoom: true,
            attribution: true,
            scale: true,
            coordinates: true
        },
        
        // Configuración de capas
        LAYER_OPACITY: 0.8,
        LAYER_TRANSITION: 300
    }
};

// Función para obtener capas por planeta
export const getPlanetLayers = (planetName) => {
    const layers = NASA_CONFIG.GIBS_CONFIG[`${planetName.toUpperCase()}_LAYERS`];
    return layers || {};
};

// Función para obtener fechas por planeta y capa
export const getPlanetDates = (planetName, layerName) => {
    const dates = NASA_CONFIG.DATE_CONFIG[`${planetName.toUpperCase()}_DATES`];
    return dates?.[layerName] || null;
};

// Función para construir URL de tile
export const buildTileUrl = (planetName, layerName, date, z, x, y) => {
    const layer = getPlanetLayers(planetName)[layerName];
    if (!layer) return null;
    
    const baseUrl = NASA_CONFIG.ENDPOINTS.GIBS;
    const format = layer.format;
    
    // Usar proxy local para evitar problemas de CORS
    const proxyUrl = '/api/nasa';
    
    // Usar la misma configuración que el backend (epsg4326)
    return `${proxyUrl}/wmts/epsg4326/best/${layer.name}/default/${date}/250m/${z}/${y}/${x}.${format}`;
};

export default NASA_CONFIG;

// Configuración avanzada de APIs de NASA - Basado en nasaproyect
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
        WMTS_BASE: 'https://gibs.earthdata.nasa.gov/wmts/epsg4326/best',
        TILE_SIZE: 256,
        
        // Función para obtener fecha actual en formato GIBS
        getCurrentDate() {
            const today = new Date();
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);
            return yesterday.toISOString().split('T')[0];
        },
        
        // Capas disponibles para la Tierra
        EARTH_LAYERS: {
            visual: {
                name: 'MODIS_Aqua_CorrectedReflectance_TrueColor',
                title: 'Color Verdadero',
                format: 'jpg',
                maxZoom: 9,
                attribution: 'NASA GIBS',
                description: 'Imágenes como las vería el ojo humano'
            },
            infrared: {
                name: 'MODIS_Aqua_CorrectedReflectance_Bands721',
                title: 'Infrarrojo',
                format: 'jpg',
                maxZoom: 9,
                attribution: 'NASA GIBS',
                description: 'Composición que resalta vegetación y agua'
            }
        },

        // Capas para Marte (solo MOLA - Topografía en Color)
        MARS_LAYERS: {
            visual: {
                name: 'opm-mars-basemap-v0-2',
                title: 'MOLA - Topografía en Color',
                format: 'png',
                maxZoom: 8,
                attribution: 'NASA/JPL/MOLA',
                baseUrl: 'https://cartocdn-gusc.global.ssl.fastly.net/opmbuilder/api/v1/map/named/opm-mars-basemap-v0-2/all',
                useOpenPlanetaryMap: true
            }
        },

        // Capas para la Luna (solo Mosaico Global)
        MOON_LAYERS: {
            visual: {
                name: 'opm-moon-basemap-v0-1',
                title: 'LRO WAC - Mosaico Global',
                format: 'png',
                maxZoom: 10,
                attribution: 'NASA/LRO/LROC',
                baseUrl: 'https://cartocdn-gusc.global.ssl.fastly.net/opmbuilder/api/v1/map/named/opm-moon-basemap-v0-1/all',
                useOpenPlanetaryMap: true
            }
        },
        
        // URLs base para GIBS
        WMTS_BASE: 'https://gibs.earthdata.nasa.gov/wmts/epsg4326/best',
        WMS_BASE: 'https://gibs.earthdata.nasa.gov/wms/epsg4326/best',
        
        // Configuración de fechas para la Tierra
        EARTH_DATES: {
            start: '2000-02-24', // Fecha de inicio de MODIS Aqua
            end: new Date().toISOString().split('T')[0],
            default: (() => {
                const today = new Date();
                const yesterday = new Date(today);
                yesterday.setDate(yesterday.getDate() - 1);
                return yesterday.toISOString().split('T')[0];
            })()
        },

        // Configuración de fechas para Marte (usando fechas de la Tierra como fallback)
        MARS_DATES: {
            start: '2000-02-24', // Fecha de inicio de MODIS Aqua
            end: new Date().toISOString().split('T')[0], // Hoy
            default: '2024-12-01' // Fecha fija válida para MODIS
        },

        // Configuración de fechas para la Luna (usando fechas de la Tierra como fallback)
        MOON_DATES: {
            start: '2000-02-24', // Fecha de inicio de MODIS Aqua
            end: new Date().toISOString().split('T')[0], // Hoy
            default: '2024-12-01' // Fecha fija válida para MODIS
        }
    },
    
    // Configuración de la API de NASA
    API_CONFIG: {
        // API key personal de NASA
        API_KEY: 'NKsiusVGXnMbpMPd7XcRlofw6ifaLauqSTAhP5bu',
        ENDPOINTS: {
            APOD: '/planetary/apod',
            EPIC: '/EPIC/api/natural/images',
            EARTH_IMAGERY: '/planetary/earth/imagery',
            MARS_PHOTOS: '/mars-photos/api/v1/rovers'
        }
    },
    
    // Configuración del visor
    VIEWER_CONFIG: {
        DEFAULT_ZOOM: 2,
        MAX_ZOOM: 18,
        MIN_ZOOM: 1,
        LAYER_OPACITY: 0.8,
        TILE_SIZE: 256
    }
};

// Función para construir URL de tile GIBS (solo para la Tierra)
export const buildGIBSUrl = (layerName, date, z, x, y, format = 'jpg') => {
    return `${NASA_CONFIG.GIBS_CONFIG.WMTS_BASE}/${layerName}/default/${date}/250m/${z}/${y}/${x}.${format}`;
};

// Función para construir URL de tiles planetarios
export const buildPlanetaryTileUrl = (planet, layerType, z, x, y) => {
    const planetLayers = NASA_CONFIG.GIBS_CONFIG[`${planet.toUpperCase()}_LAYERS`];
    if (!planetLayers || !planetLayers[layerType]) {
        console.error(`Capa no encontrada: ${planet} - ${layerType}`);
        return null;
    }
    
    const layerConfig = planetLayers[layerType];
    
    // Para planetas con OpenPlanetaryMap (Marte) - usar URL directa que funciona
    if (layerConfig.useOpenPlanetaryMap) {
        // Usar URL directa de OpenPlanetaryMap que funciona mejor en producción
        const url = `https://cartocdn-gusc.global.ssl.fastly.net/opmbuilder/api/v1/map/named/opm-mars-basemap-v0-2/all/${z}/${x}/${y}.${layerConfig.format}`;
        
        return url;
    }
    
    // Para planetas con datos de Trek (otros planetas) - usar estructura WMTS
    if (layerConfig.baseUrl && layerConfig.baseUrl.includes('trek.nasa.gov')) {
        let url;
        
        if (layerConfig.useSimpleStructure) {
            // Estructura simplificada para debug - usar la estructura exacta de la documentación
            // Según la documentación: /1.0.0/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.{format}
            url = `/mars-trek/tiles/Mars/EQ/${layerConfig.name}/1.0.0/default/default028mm/default028mm/${y}/${x}.${layerConfig.format}`;
        } else {
            // Estructura WMTS completa: /1.0.0/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.{format}
            const style = layerConfig.style || 'default';
            const tileMatrixSet = layerConfig.tileMatrixSet || 'default028mm';
            // Corregir el formato del TileMatrix - debe ser 3 dígitos con ceros a la izquierda
            const tileMatrix = `default${String(z).padStart(3, '0')}mm`;
            
            url = `/mars-trek/tiles/Mars/EQ/${layerConfig.name}/1.0.0/${style}/${tileMatrixSet}/${tileMatrix}/${y}/${x}.${layerConfig.format}`;
        }
        
        // Debug removido - funcionando correctamente
        
        return url;
    }
    
        // Para la Luna con OpenPlanetaryMap - usar URL directa que funciona
        if (layerConfig.useOpenPlanetaryMap && planet.toLowerCase() === 'moon') {
            // Usar URL directa de OpenPlanetaryMap que funciona mejor en producción
            const url = `https://cartocdn-gusc.global.ssl.fastly.net/opmbuilder/api/v1/map/named/opm-moon-basemap-v0-1/all/${z}/${x}/${y}.${layerConfig.format}`;
            
            return url;
        }
        
        // Para otros planetas con estructura diferente - usar proxy local
        if (layerConfig.baseUrl && layerConfig.baseUrl.includes('solarsystem.nasa.gov')) {
            return `/nasa-solar/system/resources/detail_files/${layerConfig.name}_${z}_${x}_${y}.${layerConfig.format}`;
        }
    
    // Fallback a GIBS si no hay baseUrl específico
    return buildGIBSUrl(layerConfig.name, 'default', z, x, y, layerConfig.format);
};

// Función para obtener capas de la Tierra
export const getEarthLayers = () => {
    return NASA_CONFIG.GIBS_CONFIG.EARTH_LAYERS;
};

// Función para obtener configuración de fechas de la Tierra
export const getEarthDates = () => {
    return NASA_CONFIG.GIBS_CONFIG.EARTH_DATES;
};

// Función para obtener capas de Marte
export const getMarsLayers = () => {
    return NASA_CONFIG.GIBS_CONFIG.MARS_LAYERS;
};

// Función para obtener configuración de fechas de Marte
export const getMarsDates = () => {
    return NASA_CONFIG.GIBS_CONFIG.MARS_DATES;
};

// Función para obtener capas de la Luna
export const getMoonLayers = () => {
    return NASA_CONFIG.GIBS_CONFIG.MOON_LAYERS;
};

// Función para obtener configuración de fechas de la Luna
export const getMoonDates = () => {
    return NASA_CONFIG.GIBS_CONFIG.MOON_DATES;
};

// Función para construir URL de API de NASA (usando proxy en producción)
export const buildNASAUrl = (endpoint, params = {}) => {
    // En producción, usar proxy local para evitar CORS
    const isProduction = process.env.NODE_ENV === 'production' || window.location.hostname !== 'localhost';
    
    if (isProduction) {
        // Usar proxy local
        const queryParams = new URLSearchParams(params);
        return `/api/nasa${endpoint}${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    } else {
        // En desarrollo, usar API directa
        const baseUrl = NASA_CONFIG.ENDPOINTS.BASE;
        const apiKey = NASA_CONFIG.API_CONFIG.API_KEY;
        const queryParams = new URLSearchParams({ ...params, api_key: apiKey });
        return `${baseUrl}${endpoint}?${queryParams}`;
    }
};

export default NASA_CONFIG;

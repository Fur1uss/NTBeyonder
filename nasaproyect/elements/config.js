// Configuración avanzada de APIs de NASA
const NASA_CONFIG = {
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
                name: 'MODIS_Aqua_CorrectedReflectance_TrueColor',
                title: 'MODIS Aqua - Color Verdadero',
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

        // Capas especiales para Tierra Especial (análisis avanzado)
        EARTH_SPECIAL_LAYERS: {
            geology: {
                name: 'earth_geology_map',
                title: 'Mapa Geológico Global',
                format: 'jpg',
                maxZoom: 8,
                attribution: 'NASA / Análisis Geológico',
                static: true
            },
            craters: {
                name: 'earth_craters_database',
                title: 'Base de Datos de Cráteres',
                format: 'png',
                maxZoom: 10,
                attribution: 'NASA / Base de Datos de Impactos',
                static: true
            },
            thermal: {
                name: 'earth_thermal_emission',
                title: 'Emisión Térmica',
                format: 'jpg',
                maxZoom: 8,
                attribution: 'NASA / Análisis Térmico',
                static: true
            },
            slopes: {
                name: 'earth_slopes_map',
                title: 'Mapa de Pendientes',
                format: 'jpg',
                maxZoom: 9,
                attribution: 'NASA / Análisis Topográfico',
                static: true
            },
            elevation: {
                name: 'earth_elevation_model',
                title: 'Modelo de Elevación Global',
                format: 'jpg',
                maxZoom: 10,
                attribution: 'NASA / SRTM',
                static: true
            }
        },

        // Capas para Marte (usando datos de Mars Global Surveyor y rovers)
        MARS_LAYERS: {
            visual: {
                name: 'mars_mola_color',
                title: 'MOLA - Topografía en Color',
                format: 'jpg',
                maxZoom: 10,
                attribution: 'NASA/JPL/MOLA',
                baseUrl: 'https://trek.nasa.gov/tiles/Mars/EQ'
            },
            themis_day: {
                name: 'mars_themis_day_ir',
                title: 'THEMIS - Infrarrojo Día',
                format: 'jpg',
                maxZoom: 9,
                attribution: 'NASA/JPL/ASU/THEMIS',
                        // Capas para Urano
                        URANUS_LAYERS: {
                            global: {
                                name: 'uranus_global_map',
                                title: 'Mapa Global de Urano',
                                format: 'jpg',
                                maxZoom: 4,
                                attribution: 'NASA / Voyager 2',
                                static: true,
                                url: 'https://planetarymaps.usgs.gov/mosaic/uranus_voyager2_global.jpg'
                            }
                        },
                baseUrl: 'https://trek.nasa.gov/tiles/Mars/EQ'
            },
            themis_night: {
                name: 'mars_themis_night_ir',
                title: 'THEMIS - Infrarrojo Noche',
                format: 'jpg',
                maxZoom: 9,
                attribution: 'NASA/JPL/ASU/THEMIS',
                baseUrl: 'https://trek.nasa.gov/tiles/Mars/EQ'
            },
            elevation: {
                name: 'mars_mola_elevation',
                title: 'MOLA - Modelo de Elevación',
                format: 'jpg',
                maxZoom: 10,
                attribution: 'NASA/JPL/MOLA',
                baseUrl: 'https://trek.nasa.gov/tiles/Mars/EQ'
            },
            geology: {
                name: 'mars_geology',
                title: 'Mapa Geológico Global',
                format: 'jpg',
                maxZoom: 8,
                attribution: 'NASA/JPL/USGS',
                baseUrl: 'https://trek.nasa.gov/tiles/Mars/EQ'
            },
            rovers: {
                name: 'mars_rover_sites',
                title: 'Sitios de Aterrizaje de Rovers',
                format: 'png',
                maxZoom: 12,
                attribution: 'NASA/JPL/Mars Exploration Program',
                baseUrl: 'https://trek.nasa.gov/tiles/Mars/EQ'
            },
            viking: {
                name: 'mars_viking_color',
                title: 'Viking - Mosaico en Color',
                format: 'jpg',
                maxZoom: 8,
                attribution: 'NASA/JPL/Viking Orbiter',
                baseUrl: 'https://trek.nasa.gov/tiles/Mars/EQ'
            }
        },

        // Capas para la Luna
        MOON_LAYERS: {
            visual: {
                name: 'moon_lro_lroc_color_morphology',
                title: 'LRO WAC - Mosaico Global',
                format: 'jpg',
                maxZoom: 10,
                attribution: 'NASA/LRO/LROC',
                baseUrl: 'https://cartocdn-gusc.global.ssl.fastly.net/opmbuilder/api/v1/map/named/opm-moon-basemap-v0-1/all'
            },
            elevation: {
                name: 'moon_lro_lola_color_elevation',
                title: 'LOLA - Elevación Coloreada',
                format: 'jpg',
                maxZoom: 9,
                attribution: 'NASA/LRO/LOLA',
                baseUrl: 'https://cartocdn-gusc.global.ssl.fastly.net/opmbuilder/api/v1/map/named/opm-moon-basemap-v0-1/all'
            },
            geology: {
                name: 'moon_unified_geology',
                title: 'Mapa Geológico Unificado',
                format: 'png',
                maxZoom: 8,
                attribution: 'NASA/USGS',
                baseUrl: 'https://planetarymaps.usgs.gov/cgi-bin/mapserv'
            },
            apollo: {
                name: 'moon_apollo_sites',
                title: 'Sitios de Aterrizaje Apollo',
                format: 'png',
                maxZoom: 12,
                attribution: 'NASA/Apollo Mission Data',
                baseUrl: 'https://cartocdn-gusc.global.ssl.fastly.net/opmbuilder/api/v1/map/named/opm-moon-basemap-v0-1/all'
            }
        },

        // Capas para Venus (usando datos de Magellan)
        VENUS_LAYERS: {
            radar: {
                name: 'venus_magellan_radar',
                title: 'Magellan - Radar SAR',
                format: 'jpg',
                maxZoom: 6,
                attribution: 'NASA/JPL/Magellan',
                baseUrl: 'https://trek.nasa.gov/tiles/Venus/EQ'
            },
            elevation: {
                name: 'venus_elevation',
                title: 'Modelo de Elevación',
                format: 'jpg',
                maxZoom: 6,
                attribution: 'NASA/JPL/Magellan',
                baseUrl: 'https://trek.nasa.gov/tiles/Venus/EQ'
            },
            geology: {
                name: 'venus_geology',
                title: 'Mapa Geológico',
                format: 'jpg',
                maxZoom: 5,
                attribution: 'NASA/JPL/USGS',
                baseUrl: 'https://trek.nasa.gov/tiles/Venus/EQ'
            },
            temperature: {
                name: 'venus_temperature',
                title: 'Mapa de Temperatura',
                format: 'jpg',
                maxZoom: 5,
                attribution: 'NASA/JPL',
                baseUrl: 'https://trek.nasa.gov/tiles/Venus/EQ'
            }
        },

        // Capas para Mercurio (usando datos de MESSENGER)
        MERCURY_LAYERS: {
            visual: {
                name: 'mercury_messenger_color',
                title: 'MESSENGER - Color Mejorado',
                format: 'jpg',
                maxZoom: 10,
                attribution: 'NASA/JHU APL/CIW/MESSENGER',
                baseUrl: 'https://trek.nasa.gov/tiles/Mercury/EQ'
            },
            mdis_monochrome: {
                name: 'mercury_mdis_monochrome',
                title: 'MDIS - Mosaico Monocromático',
                format: 'jpg',
                maxZoom: 12,
                attribution: 'NASA/JHU APL/CIW/MESSENGER',
                baseUrl: 'https://trek.nasa.gov/tiles/Mercury/EQ'
            },
            elevation: {
                name: 'mercury_elevation',
                title: 'MLA - Modelo de Elevación',
                format: 'jpg',
                maxZoom: 9,
                attribution: 'NASA/JHU APL/CIW/MESSENGER',
                baseUrl: 'https://trek.nasa.gov/tiles/Mercury/EQ'
            }
        },

        // Capas para Júpiter (usando datos de Juno y Hubble)
        JUPITER_LAYERS: {
            visual: {
                name: 'jupiter_hubble_color',
                title: 'Hubble - Color Verdadero',
                format: 'jpg',
                maxZoom: 4,
                attribution: 'NASA/ESA/Hubble',
                baseUrl: 'https://solarsystem.nasa.gov/system/resources/detail_files'
            },
            infrared: {
                name: 'jupiter_juno_infrared',
                title: 'Juno - Infrarrojo',
                format: 'jpg',
                maxZoom: 4,
                attribution: 'NASA/JPL/Juno',
                baseUrl: 'https://solarsystem.nasa.gov/system/resources/detail_files'
            },
            magnetic: {
                name: 'jupiter_magnetic',
                title: 'Campo Magnético',
                format: 'jpg',
                maxZoom: 3,
                attribution: 'NASA/JPL/Juno',
                baseUrl: 'https://solarsystem.nasa.gov/system/resources/detail_files'
            }
        },

        // Capas similares para otros planetas exteriores
        SATURN_LAYERS: {
            visual: {
                name: 'saturn_cassini_color',
                title: 'Cassini - Color Natural',
                format: 'jpg',
                maxZoom: 4,
                attribution: 'NASA/JPL/Cassini',
                baseUrl: 'https://solarsystem.nasa.gov/system/resources/detail_files'
            },
            infrared: {
                name: 'saturn_cassini_infrared',
                title: 'Cassini - Infrarrojo',
                format: 'jpg',
                maxZoom: 4,
                attribution: 'NASA/JPL/Cassini',
                baseUrl: 'https://solarsystem.nasa.gov/system/resources/detail_files'
            },
            rings: {
                name: 'saturn_rings_detailed',
                title: 'Anillos Detallados',
                format: 'jpg',
                maxZoom: 5,
                attribution: 'NASA/JPL/Cassini',
                baseUrl: 'https://solarsystem.nasa.gov/system/resources/detail_files'
            }
        },
        
        // URLs base para GIBS
        WMTS_BASE: 'https://gibs.earthdata.nasa.gov/wmts/epsg4326/best',
        WMS_BASE: 'https://gibs.earthdata.nasa.gov/wms/epsg4326/best',
        
        // Configuración de tiles
        TILE_SIZE: 256,
        COORDINATE_SYSTEM: 'EPSG:4326',
        
        // Función para construir URL de tiles GIBS
        buildTileURL: function(layer, z, x, y, time = 'default') {
            const layerConfig = this.EARTH_LAYERS[layer] || this.EARTH_LAYERS.visual;
            return `${this.WMTS_BASE}/${layerConfig.name}/default/${time}/250m/${z}/${y}/${x}.${layerConfig.format}`;
        },

        // Función para construir URL de tiles planetarios
        buildPlanetaryTileURL: function(planet, layer, z, x, y) {
            const planetLayers = this[`${planet.toUpperCase()}_LAYERS`];
            if (!planetLayers || !planetLayers[layer]) return null;
            
            const layerConfig = planetLayers[layer];
            
            // Para planetas con datos de Trek
            if (layerConfig.baseUrl.includes('trek.nasa.gov')) {
                return `${layerConfig.baseUrl}/${layerConfig.name}/${z}/${y}/${x}.${layerConfig.format}`;
            }
            
            // Para otros planetas con estructura diferente
            return `${layerConfig.baseUrl}/${layerConfig.name}_${z}_${x}_${y}.${layerConfig.format}`;
        },
        
        // Obtener fecha actual en formato GIBS
        getCurrentDate: function() {
            const date = new Date();
            date.setDate(date.getDate() - 1); // Usar día anterior para asegurar disponibilidad
            return date.toISOString().split('T')[0];
        }
    },
    
    // Rate limiting y cache
    RATE_LIMITING: {
        DEMO_KEY_LIMIT: 30, // requests per hour
        PERSONAL_KEY_LIMIT: 1000, // requests per hour
        CACHE_DURATION: 5 * 60 * 1000 // 5 minutos en milisegundos
    },
    
    // Configuración de respaldo cuando las APIs fallan
    FALLBACK_DATA: {
        apod: {
            title: 'Nebulosa del Cangrejo',
            url: 'https://images.nasa.gov/details-PIA00003',
            explanation: 'Una impresionante vista de la Nebulosa del Cangrejo, remanente de una supernova observada por astrónomos chinos en 1054.'
        }
    }
};

// Cache simple para almacenar respuestas de API
class APICache {
    constructor() {
        this.cache = new Map();
        this.timestamps = new Map();
    }
    
    set(key, data) {
        this.cache.set(key, data);
        this.timestamps.set(key, Date.now());
    }
    
    get(key) {
        const timestamp = this.timestamps.get(key);
        if (!timestamp) return null;
        
        // Verificar si el cache ha expirado
        if (Date.now() - timestamp > NASA_CONFIG.RATE_LIMITING.CACHE_DURATION) {
            this.cache.delete(key);
            this.timestamps.delete(key);
            return null;
        }
        
        return this.cache.get(key);
    }
    
    clear() {
        this.cache.clear();
        this.timestamps.clear();
    }
}

// Instancia global del cache
const apiCache = new APICache();

// Utilidades para manejo de APIs
const APIUtils = {
    
    // Validar API key
    validateAPIKey(apiKey) {
        return apiKey && apiKey !== 'DEMO_KEY' && apiKey.length > 10;
    },
    
    // Construir URL con parámetros
    buildURL(baseURL, endpoint, params = {}) {
        const url = new URL(endpoint, baseURL);
        Object.entries(params).forEach(([key, value]) => {
            url.searchParams.append(key, value);
        });
        return url.toString();
    },
    
    // Hacer request con cache y retry
    async fetchWithCache(url, options = {}) {
        // Verificar cache primero
        const cachedData = apiCache.get(url);
        if (cachedData) {
            console.log('Datos obtenidos del cache:', url);
            return cachedData;
        }
        
        try {
            const response = await fetch(url, {
                ...options,
                headers: {
                    'Accept': 'application/json',
                    ...options.headers
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            
            // Guardar en cache
            apiCache.set(url, data);
            
            return data;
            
        } catch (error) {
            console.error('Error en fetch:', error);
            throw error;
        }
    },
    
    // Formatear fecha para APIs de NASA
    formatNASADate(date = new Date()) {
        return date.toISOString().split('T')[0];
    },
    
    // Generar URL para imágenes EPIC
    buildEPICImageURL(imageName, date) {
        const formattedDate = date.replace(/-/g, '/');
        return `https://epic.gsfc.nasa.gov/archive/natural/${formattedDate}/png/${imageName}.png`;
    },
    
    // Generar URL para tiles GIBS
    buildGIBSTileURL(layer, z, x, y, date = null) {
        const layerConfig = NASA_CONFIG.GIBS_CONFIG.EARTH_LAYERS;
        const layerName = layerConfig[layer] || layerConfig.visual;
        const time = date || this.formatNASADate();
        
        return `https://gibs.earthdata.nasa.gov/wmts/epsg4326/best/${layerName}/default/${time}/250m/${z}/${y}/${x}.jpg`;
    },
    
    // Manejar errores de API específicos
    handleAPIError(error, context = '') {
        console.error(`Error en ${context}:`, error);
        
        if (error.message.includes('429')) {
            return 'Rate limit excedido. Intenta más tarde o usa tu propia API key.';
        } else if (error.message.includes('403')) {
            return 'API key inválida. Verifica tu configuración.';
        } else if (error.message.includes('404')) {
            return 'Datos no encontrados para esta fecha/ubicación.';
        } else if (error.message.includes('500')) {
            return 'Error en el servidor de NASA. Intenta más tarde.';
        } else {
            return 'Error de conexión. Verifica tu internet.';
        }
    },
    
    // Throttle para controlar requests
    throttle(func, delay) {
        let timeoutId;
        let lastExecTime = 0;
        return function (...args) {
            const currentTime = Date.now();
            
            if (currentTime - lastExecTime > delay) {
                func.apply(this, args);
                lastExecTime = currentTime;
            } else {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    func.apply(this, args);
                    lastExecTime = Date.now();
                }, delay - (currentTime - lastExecTime));
            }
        };
    }
};

// Exportar para uso en otros archivos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { NASA_CONFIG, APICache, APIUtils };
} else {
    // Para uso en el navegador
    window.NASA_CONFIG = NASA_CONFIG;
    window.APICache = APICache;
    window.APIUtils = APIUtils;
    window.apiCache = apiCache;
}
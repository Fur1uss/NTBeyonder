// Configuración de la API de NASA
const NASA_API_CONFIG = {
    // Reemplaza 'DEMO_KEY' con tu API key de NASA
    // Obtén tu API key gratuita en: https://api.nasa.gov/
    API_KEY: 'DEMO_KEY',
    BASE_URL: 'https://api.nasa.gov',
    ENDPOINTS: {
        APOD: '/planetary/apod',
        EPIC: '/EPIC/api/natural/images',
        EARTH_IMAGERY: '/planetary/earth/imagery',
        MARS_PHOTOS: '/mars-photos/api/v1/rovers'
    }
};

// Configuración de planetas del sistema solar
const PLANETS_DATA = {
    mercury: {
        name: { es: 'Mercurio', en: 'Mercury' },
        description: { es: 'El planeta más cercano al Sol', en: 'The closest planet to the Sun' },
        color: '#8C7853',
        icon: '☿',
        coordinates: [0, 0],
        zoom: 2,
        details: {
            diameter: { es: '4,879 km', en: '4,879 km' },
            distance: { es: '57.9 millones km del Sol', en: '57.9 million km from the Sun' },
            period: { es: '88 días terrestres', en: '88 Earth days' },
            moons: { es: '0', en: '0' },
            temperature: { es: '-173°C a 427°C', en: '-173°C to 427°C' },
            composition: { es: 'Hierro, níquel y silicatos', en: 'Iron, nickel, and silicates' }
        }
    },
    venus: {
        name: { es: 'Venus', en: 'Venus' },
        description: { es: 'El planeta más caliente del sistema solar', en: 'The hottest planet in the solar system' },
        color: '#FFC649',
        icon: '♀',
        coordinates: [10, 10],
        zoom: 2,
        details: {
            diameter: { es: '12,104 km', en: '12,104 km' },
            distance: { es: '108.2 millones km del Sol', en: '108.2 million km from the Sun' },
            period: { es: '225 días terrestres', en: '225 Earth days' },
            moons: { es: '0', en: '0' },
            temperature: { es: '462°C', en: '462°C' },
            composition: { es: 'Atmósfera densa de CO₂', en: 'Dense CO₂ atmosphere' }
        }
    },
    earth: {
        name: { es: 'Tierra', en: 'Earth' },
        description: { es: 'Nuestro hogar, el planeta azul', en: 'Our home, the blue planet' },
        color: '#6B93D6',
        icon: '🌍',
        coordinates: [20, 20],
        zoom: 2,
        details: {
            diameter: { es: '12,756 km', en: '12,756 km' },
            distance: { es: '149.6 millones km del Sol', en: '149.6 million km from the Sun' },
            period: { es: '365.25 días', en: '365.25 days' },
            moons: { es: '1 (Luna)', en: '1 (Moon)' },
            temperature: { es: '-89°C a 58°C', en: '-89°C to 58°C' },
            composition: { es: '71% agua, atmósfera de N₂ y O₂', en: '71% water, N₂ and O₂ atmosphere' }
        }
    },
    mars: {
        name: { es: 'Marte', en: 'Mars' },
        description: { es: 'El planeta rojo', en: 'The red planet' },
        color: '#CD5C5C',
        icon: '♂',
        coordinates: [30, 30],
        zoom: 2,
        details: {
            diameter: { es: '6,792 km', en: '6,792 km' },
            distance: { es: '227.9 millones km del Sol', en: '227.9 million km from the Sun' },
            period: { es: '687 días terrestres', en: '687 Earth days' },
            moons: { es: '2 (Fobos y Deimos)', en: '2 (Phobos and Deimos)' },
            temperature: { es: '-87°C a -5°C', en: '-87°C to -5°C' },
            composition: { es: 'Óxido de hierro, atmósfera de CO₂', en: 'Iron oxide, CO₂ atmosphere' }
        }
    },
    jupiter: {
        name: { es: 'Júpiter', en: 'Jupiter' },
        description: { es: 'El gigante gaseoso', en: 'The gas giant' },
        color: '#D8CA9D',
        icon: '♃',
        coordinates: [40, 40],
        zoom: 2,
        details: {
            diameter: { es: '142,984 km', en: '142,984 km' },
            distance: { es: '778.5 millones km del Sol', en: '778.5 million km from the Sun' },
            period: { es: '11.86 años terrestres', en: '11.86 Earth years' },
            moons: { es: '95+ lunas conocidas', en: '95+ known moons' },
            temperature: { es: '-108°C', en: '-108°C' },
            composition: { es: 'Hidrógeno y helio principalmente', en: 'Mainly hydrogen and helium' }
        }
    },
    saturn: {
        name: { es: 'Saturno', en: 'Saturn' },
        description: { es: 'El señor de los anillos', en: 'The lord of the rings' },
        color: '#FAD5A5',
        icon: '♄',
        coordinates: [50, 50],
        zoom: 2,
        details: {
            diameter: { es: '120,536 km', en: '120,536 km' },
            distance: { es: '1,432 millones km del Sol', en: '1,432 million km from the Sun' },
            period: { es: '29.46 años terrestres', en: '29.46 Earth years' },
            moons: { es: '146+ lunas conocidas', en: '146+ known moons' },
            temperature: { es: '-139°C', en: '-139°C' },
            composition: { es: 'Hidrógeno y helio, anillos de hielo', en: 'Hydrogen and helium, icy rings' }
        }
    },
    uranus: {
        name: { es: 'Urano', en: 'Uranus' },
        description: { es: 'El gigante de hielo inclinado', en: 'The tilted ice giant' },
        color: '#4FD0E7',
        icon: '♅',
        coordinates: [60, 60],
        zoom: 2,
        details: {
            diameter: { es: '51,118 km', en: '51,118 km' },
            distance: { es: '2,867 millones km del Sol', en: '2,867 million km from the Sun' },
            period: { es: '84.01 años terrestres', en: '84.01 Earth years' },
            moons: { es: '27 lunas conocidas', en: '27 known moons' },
            temperature: { es: '-197°C', en: '-197°C' },
            composition: { es: 'Hidrógeno, helio y metano', en: 'Hydrogen, helium, and methane' }
        }
    },
    neptune: {
        name: { es: 'Neptuno', en: 'Neptune' },
        description: { es: 'El planeta más ventoso', en: 'The windiest planet' },
        color: '#4B70DD',
        icon: '♆',
        coordinates: [70, 70],
        zoom: 2,
        details: {
            diameter: { es: '49,528 km', en: '49,528 km' },
            distance: { es: '4,515 millones km del Sol', en: '4,515 million km from the Sun' },
            period: { es: '164.8 años terrestres', en: '164.8 Earth years' },
            moons: { es: '16 lunas conocidas', en: '16 known moons' },
            temperature: { es: '-201°C', en: '-201°C' },
            composition: { es: 'Hidrógeno, helio y metano', en: 'Hydrogen, helium, and methane' }
        }
    },
    moon: {
        name: { es: 'Luna', en: 'Moon' },
        description: { es: 'El satélite natural de la Tierra', en: 'Earth’s natural satellite' },
        color: '#C0C0C0',
        icon: '🌙',
        coordinates: [25, 25],
        zoom: 2,
        details: {
            diameter: { es: '3,474 km', en: '3,474 km' },
            distance: { es: '384,400 km de la Tierra', en: '384,400 km from Earth' },
            period: { es: '27.3 días terrestres', en: '27.3 Earth days' },
            moons: { es: '0', en: '0' },
            temperature: { es: '-233°C a 123°C', en: '-233°C to 123°C' },
            composition: { es: 'Rocas basálticas y anortosita', en: 'Basaltic rocks and anorthosite' }
        }
    },
    earth_special: {
        name: { es: 'Tierra Especial', en: 'Earth Special' },
        description: {
            es: 'Capas avanzadas de análisis terrestre',
            en: 'Advanced terrestrial analysis layers'
        },
        color: '#00ff88',
        icon: '🌍',
        coordinates: [25, 0],
        zoom: 2,
        details: {
            diameter: { es: '12,742 km', en: '12,742 km' },
            distance: { es: '149.6 millones de km del Sol', en: '149.6 million km from the Sun' },
            period: { es: '365.25 días', en: '365.25 days' },
            moons: { es: '1 (Luna)', en: '1 (Moon)' },
            temperature: { es: '-89°C a 58°C', en: '-89°C to 58°C' },
            composition: { es: 'Análisis geológico, térmico y topográfico', en: 'Geological, thermal and topographic analysis' }
        }
    }
};

// Variables globales
let map;
// Idioma actual
let currentLang = 'es';

const langTexts = {
    es: {
        earth: 'Tierra',
        mars: 'Marte',
        moon: 'Luna',
        mercury: 'Mercurio',
        info: 'Información',
        layers: 'Capas',
        date: 'Fecha',
        specialEarth: 'Tierra Especial',
        loaderText: 'Explorando el cosmos...',
        title: 'NASA Solar System Explorer',
        planets: 'Planetas',
        visual: 'Visual',
        infrared: 'Infrarrojo',
        radar: 'Radar',
        selectEarth: 'Selecciona la Tierra para capas GIBS',
        planetInfoBtn: 'Información del Planeta',
        selectPlanetInfo: 'Selecciona un planeta para ver su información.',
        modalTitle: 'Imagen de NASA',
    },
    en: {
        earth: 'Earth',
        mars: 'Mars',
        moon: 'Moon',
        mercury: 'Mercury',
        info: 'Info',
        layers: 'Layers',
        date: 'Date',
        specialEarth: 'Earth Special',
        loaderText: 'Exploring the cosmos...',
        title: 'NASA Solar System Explorer',
        planets: 'Planets',
        visual: 'Visual',
        infrared: 'Infrared',
        radar: 'Radar',
        selectEarth: 'Select Earth for GIBS layers',
        planetInfoBtn: 'Planet Info',
        selectPlanetInfo: 'Select a planet to view its information.',
        modalTitle: 'NASA Image',
    }
};

function setLanguage(lang) {
    currentLang = lang;
    document.getElementById('langLabel').textContent = lang === 'es' ? 'ES' : 'EN';
    // Actualiza textos principales
    updateUITexts();
}

function updateUITexts() {
    // Actualizar pestañas de planetas
    const planetTabs = document.querySelectorAll('.planet-tab');
    planetTabs.forEach(tab => {
        const planet = tab.dataset.planet;
        if (langTexts[currentLang][planet]) {
            tab.textContent = langTexts[currentLang][planet];
        }
    });
    // Actualizar todos los textos marcados
    document.querySelectorAll('.lang-text').forEach(el => {
        const key = el.getAttribute('data-lang');
        if (langTexts[currentLang][key]) {
            el.textContent = langTexts[currentLang][key];
        }
    });
    // Actualizar atributos title de los botones
    document.getElementById('langToggle').title = currentLang === 'es' ? 'Cambiar idioma' : 'Change language';
    document.getElementById('dateGuide').title = currentLang === 'es' ? 'Guía del filtro de fecha' : 'Date filter guide';
    document.getElementById('layersGuide').title = currentLang === 'es' ? 'Guía de capas planetarias' : 'Planetary layers guide';
    document.getElementById('gibsHelp').title = currentLang === 'es' ? 'Ayuda sobre capas GIBS' : 'GIBS layers help';
    document.getElementById('themeToggle').title = currentLang === 'es' ? 'Cambiar tema' : 'Toggle theme';
    document.getElementById('infoToggle').title = currentLang === 'es' ? 'Información general' : 'General info';
    document.getElementById('dateApply').title = currentLang === 'es' ? 'Aplicar fecha seleccionada' : 'Apply selected date';
    document.getElementById('layerSelect').title = currentLang === 'es' ? 'Seleccionar tipo de capa' : 'Select layer type';
    document.getElementById('dateSelector').title = currentLang === 'es' ? 'Seleccionar fecha para imágenes de la Tierra' : 'Select date for Earth images';
}

document.getElementById('langToggle').addEventListener('click', () => {
    setLanguage(currentLang === 'es' ? 'en' : 'es');
});

// Al cargar, inicializa idioma
setLanguage(currentLang);
let currentPlanet = null;
let currentLayer = 'visual';
let isDarkMode = true;
let isLoading = false;
let planetaryLayers = {}; // Para almacenar todas las capas planetarias
let currentPlanetaryLayer = null;
let selectedDate = null; // Para almacenar la fecha seleccionada para la Tierra

// Inicialización de la aplicación
document.addEventListener('DOMContentLoaded', function() {
    showLoader();
    initializeApp();
});

// Función principal de inicialización
async function initializeApp() {
    try {
        // Simular carga inicial
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        initializeMap();
        initializePlanetList();
        initializeEventListeners();
        initializeTheme();
        initializeDateControl(); // Inicializar control de fecha
        initializePlanetInfo(); // Inicializar información del planeta
        
        // Cargar datos iniciales de la NASA
        await loadInitialNASAData();
        
        // Seleccionar Tierra por defecto
        await selectPlanet('earth');
        
        hideLoader();
    } catch (error) {
        console.error('Error al inicializar la aplicación:', error);
        hideLoader();
        showError('Error al cargar la aplicación');
    }
}

// Inicializar el mapa con Leaflet
function initializeMap() {
    // Crear mapa centrado en el espacio
    map = L.map('map', {
        center: [0, 0],
        zoom: 2,
        minZoom: 1,
        maxZoom: 18,
        zoomControl: false,
        attributionControl: false
    });

    // Capa base personalizada (espacio negro)
    const spaceLayer = L.tileLayer('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==', {
        attribution: '',
        opacity: 1
    });
    
    spaceLayer.addTo(map);
    
    // Inicializar capas planetarias
    initializePlanetaryLayers();
    
    // Agregar marcadores de planetas
    addPlanetMarkers();
}

// Agregar marcadores de planetas al mapa
function addPlanetMarkers() {
    Object.keys(PLANETS_DATA).forEach(planetKey => {
        const planet = PLANETS_DATA[planetKey];
        
        // Crear icono personalizado
        const planetIcon = L.divIcon({
            className: 'planet-marker',
            html: `
                <div style="
                    background: ${planet.color};
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 14px;
                    color: white;
                    box-shadow: 0 0 20px ${planet.color}50;
                    cursor: pointer;
                    transition: all 0.3s ease;
                " onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'">
                    ${planet.icon}
                </div>
            `,
            iconSize: [30, 30],
            iconAnchor: [15, 15]
        });
        
        // Crear marcador
        const marker = L.marker(planet.coordinates, { icon: planetIcon })
            .addTo(map)
            .bindPopup(`
                <div style="text-align: center;">
                    <h3 style="margin: 0 0 5px 0; color: var(--accent-color);">${planet.name}</h3>
                    <p style="margin: 0; font-size: 12px;">${planet.description}</p>
                    <button onclick="selectPlanet('${planetKey}')" 
                            style="margin-top: 10px; padding: 5px 10px; 
                                   background: var(--accent-color); color: white; 
                                   border: none; border-radius: 4px; cursor: pointer;">
                        Explorar
                    </button>
                </div>
            `);
        
        // Evento de clic en el marcador
        marker.on('click', function() {
            selectPlanet(planetKey);
        });
    });
}

// Inicializar información del planeta
function initializePlanetInfo() {
    const planetInfoToggle = document.getElementById('planetInfoToggle');
    
    // Si hay un planeta activo, mostrar el botón, sino ocultarlo
    if (currentPlanet && PLANETS_DATA[currentPlanet]) {
        planetInfoToggle.style.display = 'block';
        updatePlanetInfo(PLANETS_DATA[currentPlanet]);
    } else {
        planetInfoToggle.style.display = 'none';
    }
}

// Inicializar capas planetarias para todos los planetas
function initializePlanetaryLayers() {
    const planets = ['earth', 'mars', 'venus', 'mercury', 'jupiter', 'saturn', 'moon', 'earth_special'];
    
    planets.forEach(planet => {
        planetaryLayers[planet] = {};
        
        // Obtener configuración de capas para cada planeta
        const layerConfigKey = planet === 'earth' ? 'EARTH_LAYERS' : 
                             planet === 'earth_special' ? 'EARTH_SPECIAL_LAYERS' :
                             `${planet.toUpperCase()}_LAYERS`;
        
        const layerConfigs = NASA_CONFIG.GIBS_CONFIG[layerConfigKey];
        
        if (layerConfigs) {
            Object.keys(layerConfigs).forEach(layerKey => {
                const layerConfig = layerConfigs[layerKey];
                
                // Crear capa según el tipo de planeta
                if (planet === 'earth') {
                    // Verificar si es una capa estática
                    if (layerConfig.static) {
                        // Para capas estáticas, usar URLs de OpenPlanetaryMap o similares
                        planetaryLayers[planet][layerKey] = createStaticEarthLayer(layerKey, layerConfig);
                    } else {
                        // Usar GIBS real para capas dinámicas
                        const currentDate = NASA_CONFIG.GIBS_CONFIG.getCurrentDate();
                        planetaryLayers[planet][layerKey] = L.tileLayer(
                            `${NASA_CONFIG.GIBS_CONFIG.WMTS_BASE}/${layerConfig.name}/default/${currentDate}/250m/{z}/{y}/{x}.${layerConfig.format}`,
                            {
                                attribution: layerConfig.attribution,
                                maxZoom: layerConfig.maxZoom,
                                tileSize: NASA_CONFIG.GIBS_CONFIG.TILE_SIZE,
                                noWrap: true,
                                bounds: [[-85.0511, -180], [85.0511, 180]]
                            }
                        );
                    }
                } else if (planet === 'earth_special') {
                    // Para Tierra Especial, todas las capas son estáticas
                    planetaryLayers[planet][layerKey] = createEarthSpecialLayer(layerKey, layerConfig);
                } else {
                    // Crear capas para otros planetas usando URLs simuladas o de Trek
                    planetaryLayers[planet][layerKey] = createPlanetaryTileLayer(planet, layerKey, layerConfig);
                }
            });
        }
    });
    
    console.log('Capas planetarias inicializadas:', Object.keys(planetaryLayers));
}

// Crear capa de tiles para planetas específicos
function createPlanetaryTileLayer(planet, layerKey, layerConfig) {
    // Configuración especial para Venus usando NASA Trek
    if (planet === 'venus') {
        let tileUrl;
        switch (layerKey) {
            case 'radar':
                tileUrl = 'https://trek.nasa.gov/tiles/Venus/EQ/venus_magellan_radar/{z}/{y}/{x}.jpg';
                break;
            case 'elevation':
                tileUrl = 'https://trek.nasa.gov/tiles/Venus/EQ/venus_elevation/{z}/{y}/{x}.jpg';
                break;
            case 'geology':
                tileUrl = 'https://trek.nasa.gov/tiles/Venus/EQ/venus_geology/{z}/{y}/{x}.jpg';
                break;
            case 'temperature':
                tileUrl = 'https://trek.nasa.gov/tiles/Venus/EQ/venus_temperature/{z}/{y}/{x}.jpg';
                break;
            default:
                tileUrl = 'https://trek.nasa.gov/tiles/Venus/EQ/venus_magellan_radar/{z}/{y}/{x}.jpg';
        }
        return L.tileLayer(tileUrl, {
            attribution: layerConfig.attribution,
            maxZoom: layerConfig.maxZoom,
            tileSize: 256,
            noWrap: true,
            bounds: getPlanetBounds(planet)
        });
    }
    // Configuración especial para la Luna usando OpenPlanetaryMap
    if (planet === 'moon') {
        let tileUrl;
        
        switch (layerKey) {
            case 'visual':
                // LRO WAC Global Mosaic desde OpenPlanetaryMap
                tileUrl = 'https://cartocdn-gusc.global.ssl.fastly.net/opmbuilder/api/v1/map/named/opm-moon-basemap-v0-1/all/{z}/{x}/{y}.png';
                break;
            case 'elevation':
                // LOLA Elevation colorizada
                tileUrl = 'https://cartocdn-gusc.global.ssl.fastly.net/opmbuilder/api/v1/map/named/opm-moon-basemap-v0-1/all/{z}/{x}/{y}.png';
                break;
            case 'geology':
                // Usar OpenStreetMap estilo lunar como fallback
                tileUrl = 'https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless-2020_3857/default/g/{z}/{y}/{x}.jpg';
                break;
            case 'apollo':
                // Mosaic LRO con sitios Apollo
                tileUrl = 'https://cartocdn-gusc.global.ssl.fastly.net/opmbuilder/api/v1/map/named/opm-moon-basemap-v0-1/all/{z}/{x}/{y}.png';
                break;
            default:
                tileUrl = 'https://cartocdn-gusc.global.ssl.fastly.net/opmbuilder/api/v1/map/named/opm-moon-basemap-v0-1/all/{z}/{x}/{y}.png';
        }
        
        return L.tileLayer(tileUrl, {
            attribution: layerConfig.attribution,
            maxZoom: layerConfig.maxZoom,
            tileSize: 256,
            noWrap: true,
            bounds: [[-85, -180], [85, 180]]
        });
    }
    
    // Configuración especial para Marte usando OpenPlanetaryMap y NASA Mars Trek
    if (planet === 'mars') {
        let tileUrl;
        
        switch (layerKey) {
            case 'visual':
                // MOLA Topografía colorizada
                tileUrl = 'https://cartocdn-gusc.global.ssl.fastly.net/opmbuilder/api/v1/map/named/opm-mars-basemap-v0-2/all/{z}/{x}/{y}.png';
                break;
            case 'themis_day':
                // THEMIS Infrarrojo Día
                tileUrl = 'https://cartocdn-gusc.global.ssl.fastly.net/opmbuilder/api/v1/map/named/opm-mars-basemap-v0-2/all/{z}/{x}/{y}.png';
                break;
            case 'themis_night':
                // THEMIS Infrarrojo Noche - usar capa alternativa
                tileUrl = 'https://tiles.maps.eox.at/wmts/1.0.0/terrain-light_3857/default/g/{z}/{y}/{x}.jpg';
                break;
            case 'elevation':
                // MOLA Elevación
                tileUrl = 'https://cartocdn-gusc.global.ssl.fastly.net/opmbuilder/api/v1/map/named/opm-mars-basemap-v0-2/all/{z}/{x}/{y}.png';
                break;
            case 'geology':
                // Mapa geológico usando capa terrestre modificada
                tileUrl = 'https://tiles.maps.eox.at/wmts/1.0.0/terrain_3857/default/g/{z}/{y}/{x}.jpg';
                break;
            case 'rovers':
                // Sitios de rovers
                tileUrl = 'https://cartocdn-gusc.global.ssl.fastly.net/opmbuilder/api/v1/map/named/opm-mars-basemap-v0-2/all/{z}/{x}/{y}.png';
                break;
            case 'viking':
                // Viking mosaic - usar capa satélite
                tileUrl = 'https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless-2020_3857/default/g/{z}/{y}/{x}.jpg';
                break;
            default:
                tileUrl = 'https://cartocdn-gusc.global.ssl.fastly.net/opmbuilder/api/v1/map/named/opm-mars-basemap-v0-2/all/{z}/{x}/{y}.png';
        }
        
        return L.tileLayer(tileUrl, {
            attribution: layerConfig.attribution,
            maxZoom: layerConfig.maxZoom,
            tileSize: 256,
            noWrap: true,
            bounds: [[-85, -180], [85, 180]]
        });
    }
    
    // Configuración especial para Mercurio usando datos de MESSENGER
    if (planet === 'mercury') {
        let tileUrl;
        
        switch (layerKey) {
            case 'visual':
                // MESSENGER Color mejorado
                tileUrl = 'https://cartocdn-gusc.global.ssl.fastly.net/opmbuilder/api/v1/map/named/opm-mercury-basemap-v0-1/all/{z}/{x}/{y}.png';
                break;
            case 'mdis_monochrome':
                // MDIS Mosaico monocromático de alta resolución
                tileUrl = 'https://cartocdn-gusc.global.ssl.fastly.net/opmbuilder/api/v1/map/named/opm-mercury-basemap-v0-1/all/{z}/{x}/{y}.png';
                break;
            case 'elevation':
                // MLA Modelo de elevación
                tileUrl = 'https://tiles.maps.eox.at/wmts/1.0.0/terrain_3857/default/g/{z}/{y}/{x}.jpg';
                break;
            default:
                tileUrl = 'https://cartocdn-gusc.global.ssl.fastly.net/opmbuilder/api/v1/map/named/opm-mercury-basemap-v0-1/all/{z}/{x}/{y}.png';
        }
        
        return L.tileLayer(tileUrl, {
            attribution: layerConfig.attribution,
            maxZoom: layerConfig.maxZoom,
            tileSize: 256,
            noWrap: true,
            bounds: [[-85, -180], [85, 180]]
        });
    }
    
    // Para planetas con datos reales de NASA Trek
    if (layerConfig.baseUrl && layerConfig.baseUrl.includes('trek.nasa.gov')) {
        return L.tileLayer(
            `${layerConfig.baseUrl}/${layerConfig.name}/{z}/{y}/{x}.${layerConfig.format}`,
            {
                attribution: layerConfig.attribution,
                maxZoom: layerConfig.maxZoom,
                tileSize: 256,
                noWrap: true,
                // Ajustar bounds según el planeta
                bounds: getPlanetBounds(planet)
            }
        );
    } else {
        // Para planetas sin datos Trek, crear tiles procedurales o usar placeholders
        return L.tileLayer(
            createProceduralTileURL(planet, layerKey, layerConfig),
            {
                attribution: layerConfig.attribution,
                maxZoom: layerConfig.maxZoom,
                tileSize: 256,
                noWrap: true,
                bounds: getPlanetBounds(planet)
            }
        );
    }
}

// Obtener bounds apropiados para cada planeta
function getPlanetBounds(planet) {
    // La mayoría de planetas usan coordenadas esféricas estándar
    return [[-85, -180], [85, 180]];
}

// Crear capas estáticas para la Tierra
function createStaticEarthLayer(layerKey, layerConfig) {
    let tileUrl;
    
    switch (layerKey) {
        case 'bluemarble':
            // Blue Marble usando OpenStreetMap de alta calidad
            tileUrl = 'https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless-2020_3857/default/g/{z}/{y}/{x}.jpg';
            break;
        case 'temperature':
            // Temperatura usando mapas térmicos
            tileUrl = 'https://tiles.maps.eox.at/wmts/1.0.0/terrain_3857/default/g/{z}/{y}/{x}.jpg';
            break;
        case 'snow':
            // Cobertura de nieve usando mapas claros
            tileUrl = 'https://tiles.maps.eox.at/wmts/1.0.0/terrain-light_3857/default/g/{z}/{y}/{x}.jpg';
            break;
        case 'fires':
            // Anomalías térmicas usando mapas oscuros
            tileUrl = 'https://tiles.maps.eox.at/wmts/1.0.0/blackmarble_3857/default/g/{z}/{y}/{x}.jpg';
            break;
        default:
            // Default fallback
            tileUrl = 'https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless-2020_3857/default/g/{z}/{y}/{x}.jpg';
    }
    
    return L.tileLayer(tileUrl, {
        attribution: layerConfig.attribution,
        maxZoom: layerConfig.maxZoom,
        tileSize: 256,
        noWrap: true,
        bounds: [[-85, -180], [85, 180]]
    });
}

// Crear capas especiales para Tierra Especial
function createEarthSpecialLayer(layerKey, layerConfig) {
    let tileUrl;
    
    switch (layerKey) {
        case 'geology':
            // Mapa geológico usando relieve coloreado
            tileUrl = 'https://tiles.maps.eox.at/wmts/1.0.0/terrain_3857/default/g/{z}/{y}/{x}.jpg';
            break;
        case 'craters':
            // Base de datos de cráteres usando relieve sombreado
            tileUrl = 'https://tiles.maps.eox.at/wmts/1.0.0/terrain-light_3857/default/g/{z}/{y}/{x}.jpg';
            break;
        case 'thermal':
            // Emisión térmica usando Black Marble
            tileUrl = 'https://tiles.maps.eox.at/wmts/1.0.0/blackmarble_3857/default/g/{z}/{y}/{x}.jpg';
            break;
        case 'slopes':
            // Mapa de pendientes usando OpenStreetMap estilo topográfico
            tileUrl = 'https://tiles.maps.eox.at/wmts/1.0.0/osm_3857/default/g/{z}/{y}/{x}.jpg';
            break;
        case 'elevation':
            // Modelo de elevación usando Sentinel-2
            tileUrl = 'https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless-2020_3857/default/g/{z}/{y}/{x}.jpg';
            break;
        default:
            // Default fallback
            tileUrl = 'https://tiles.maps.eox.at/wmts/1.0.0/terrain_3857/default/g/{z}/{y}/{x}.jpg';
    }
    
    return L.tileLayer(tileUrl, {
        attribution: layerConfig.attribution,
        maxZoom: layerConfig.maxZoom,
        tileSize: 256,
        noWrap: true,
        bounds: [[-85, -180], [85, 180]]
    });
}

// Crear URL procedural para planetas sin datos Trek
function createProceduralTileURL(planet, layerKey, layerConfig) {
    // Generar un patrón de datos base64 que simule la superficie del planeta
    const planetColors = {
        mercury: '#8C7853',
        venus: '#FFC649', 
        mars: '#CD5C5C',
        jupiter: '#D8CA9D',
        saturn: '#FAD5A5',
        uranus: '#4FD0E7',
        neptune: '#4B70DD'
    };
    
    const color = planetColors[planet] || '#888888';
    
    // Crear un SVG simple como placeholder que varía por zoom y posición
    const svgTemplate = `data:image/svg+xml;base64,${btoa(`
        <svg width="256" height="256" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="surface" patternUnits="userSpaceOnUse" width="32" height="32">
                    <rect width="32" height="32" fill="${color}" opacity="0.8"/>
                    <circle cx="16" cy="16" r="2" fill="${color}" opacity="0.6"/>
                    <circle cx="8" cy="8" r="1" fill="${color}" opacity="0.4"/>
                    <circle cx="24" cy="24" r="1.5" fill="${color}" opacity="0.5"/>
                </pattern>
            </defs>
            <rect width="256" height="256" fill="url(#surface)"/>
            <text x="128" y="128" text-anchor="middle" fill="white" font-size="12" opacity="0.3">${planet.toUpperCase()}</text>
            <text x="128" y="145" text-anchor="middle" fill="white" font-size="10" opacity="0.2">${layerConfig.title}</text>
        </svg>
    `)}`;
    
    return svgTemplate;
}

// Mostrar capa planetaria
function showPlanetaryLayer(planet, layerType = 'visual') {
    // Remover capa anterior si existe
    if (currentPlanetaryLayer) {
        map.removeLayer(currentPlanetaryLayer);
    }
    
    // Agregar nueva capa
    if (planetaryLayers[planet] && planetaryLayers[planet][layerType]) {
        currentPlanetaryLayer = planetaryLayers[planet][layerType];
        currentPlanetaryLayer.addTo(map);
        
        // Obtener configuración de la capa
        const layerConfigKey = planet === 'earth' ? 'EARTH_LAYERS' : 
                             planet === 'earth_special' ? 'EARTH_SPECIAL_LAYERS' :
                             `${planet.toUpperCase()}_LAYERS`;
        const layerConfig = NASA_CONFIG.GIBS_CONFIG[layerConfigKey][layerType];
        
        if (layerConfig) {
            // Ajustar zoom máximo según la capa
            map.setMaxZoom(layerConfig.maxZoom);
            
            console.log(`Capa ${planet} activada: ${layerConfig.title}`);
            
            // Mostrar información de la capa
            showLayerInfo(layerConfig, planet);
        }
    } else {
        console.warn(`No se encontró la capa ${layerType} para ${planet}`);
    }
}

// Ocultar capa planetaria
function hidePlanetaryLayer() {
    if (currentPlanetaryLayer) {
        map.removeLayer(currentPlanetaryLayer);
        currentPlanetaryLayer = null;
        map.setMaxZoom(18); // Restaurar zoom máximo por defecto
        console.log('Capa planetaria desactivada');
    }
}

// Mostrar información de la capa actual
function showLayerInfo(layerConfig, planet = 'tierra') {
    // Crear notificación temporal con información de la capa
    const layerInfoDiv = document.createElement('div');
    layerInfoDiv.style.cssText = `
        position: fixed;
        top: 120px;
        right: 20px;
        background: var(--surface);
        color: var(--text-primary);
        padding: 1rem;
        border-radius: 8px;
        border-left: 4px solid var(--accent-color);
        z-index: 1000;
        max-width: 300px;
        box-shadow: 0 8px 25px var(--shadow);
        animation: fadeInUp 0.3s ease;
    `;
    layerInfoDiv.innerHTML = `
        <h4 style="margin: 0 0 0.5rem 0; color: var(--accent-color);">Capa Activa - ${planet.charAt(0).toUpperCase() + planet.slice(1)}</h4>
        <p style="margin: 0 0 0.5rem 0; font-size: 0.9rem;"><strong>${layerConfig.title}</strong></p>
        <p style="margin: 0; font-size: 0.8rem; opacity: 0.8;">Zoom máximo: ${layerConfig.maxZoom} | Formato: ${layerConfig.format.toUpperCase()}</p>
    `;
    
    document.body.appendChild(layerInfoDiv);
    
    // Remover después de 4 segundos
    setTimeout(() => {
        if (layerInfoDiv.parentNode) {
            layerInfoDiv.remove();
        }
    }, 4000);
}

// Inicializar lista de planetas en el sidebar
function initializePlanetList() {
    const planetList = document.getElementById('planetList');
    
    Object.keys(PLANETS_DATA).forEach(planetKey => {
        const planet = PLANETS_DATA[planetKey];
        
        const planetItem = document.createElement('div');
        planetItem.className = 'planet-item';
        planetItem.setAttribute('data-planet', planetKey);
        planetItem.innerHTML = `
            <div class="planet-icon" style="background: ${planet.color};">
                ${planet.icon}
            </div>
            <div class="planet-info">
                <h3>${planet.name && planet.name[currentLang] ? planet.name[currentLang] : ''}</h3>
                <p>${planet.description && planet.description[currentLang] ? planet.description[currentLang] : ''}</p>
            </div>
        `;
        
        planetItem.addEventListener('click', () => selectPlanet(planetKey));
        planetList.appendChild(planetItem);
    });
}

// Inicializar event listeners
function initializeEventListeners() {
    // Toggle del sidebar
    document.getElementById('sidebarToggle').addEventListener('click', toggleSidebar);
    
    // Toggle del tema
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    
    // Botón desplegable de información del planeta
    document.getElementById('planetInfoBtn').addEventListener('click', togglePlanetInfoDropdown);
    
    // Controles de zoom
    document.getElementById('zoomIn').addEventListener('click', () => map.zoomIn());
    document.getElementById('zoomOut').addEventListener('click', () => map.zoomOut());
    
    // Selector de capas
    document.getElementById('layerSelect').addEventListener('change', handleLayerChange);
    
    // Control de fecha para la Tierra
    document.getElementById('dateSelector').addEventListener('change', handleDateChange);
    document.getElementById('dateApply').addEventListener('click', applySelectedDate);
    
    // Modal de imágenes
    document.getElementById('modalClose').addEventListener('click', closeImageModal);
    document.getElementById('imageModal').addEventListener('click', function(e) {
        if (e.target === this) closeImageModal();
    });
    
    // Eventos del mapa
    map.on('zoomend', handleMapZoom);
    
    // Responsive: detectar dispositivos móviles
    if (window.innerWidth <= 768) {
        document.getElementById('sidebar').classList.add('collapsed');
    }
}

// Seleccionar un planeta
async function selectPlanet(planetKey) {
    if (isLoading) return;
    
    currentPlanet = planetKey;
    const planet = PLANETS_DATA[planetKey];
    
    // Actualizar UI
    updateActivePlanet(planetKey);
    updatePlanetInfo(planet);
    
    // Centrar mapa en el planeta
    map.setView(planet.coordinates, planet.zoom);
    
    // Verificar si el planeta tiene capas disponibles
    const hasLayers = planetaryLayers[planetKey] && Object.keys(planetaryLayers[planetKey]).length > 0;
    
    if (hasLayers) {
        // Mostrar capas para el planeta seleccionado
        showPlanetaryLayer(planetKey, currentLayer);
        
        // Centrar en el planeta con mejor vista
        setTimeout(() => {
            if (planetKey === 'earth') {
                map.setView([20, 0], 3); // Vista global de la Tierra
            } else if (planetKey === 'mars') {
                map.setView([0, 0], 3); // Vista global de Marte
            } else {
                map.setView(planet.coordinates, Math.min(planet.zoom + 1, 5)); // Vista mejorada para otros planetas
            }
        }, 500);
        
        // Actualizar controles de capa
        updateLayerControls(planetKey);
        
        console.log(`${planet.name} seleccionado - Capas planetarias activadas`);
    } else {
        // Ocultar capas si no hay disponibles
        hidePlanetaryLayer();
        updateLayerControls(null);
        
        console.log(`${planet.name} seleccionado - Sin capas específicas disponibles`);
    }
    
    // Cargar imágenes del planeta
    await loadPlanetImages(planetKey);
}

// Actualizar planeta activo en la UI
function updateActivePlanet(planetKey) {
    // Remover clase activa de todos los planetas
    document.querySelectorAll('.planet-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Agregar clase activa al planeta seleccionado
    const activePlanet = document.querySelector(`[data-planet="${planetKey}"]`);
    if (activePlanet) {
        activePlanet.classList.add('active');
    }
}

// Actualizar información del planeta en el botón desplegable
function updatePlanetInfo(planet) {
    const planetInfoToggle = document.getElementById('planetInfoToggle');
    const planetInfoBtnText = document.getElementById('planetInfoBtnText');
    const planetInfoContent = document.getElementById('planetInfoContent');
    
    // Mostrar el botón de información
    planetInfoToggle.style.display = 'block';
    
    // Actualizar texto del botón
    planetInfoBtnText.textContent = `${currentLang === 'es' ? 'Información del Planeta' : 'Planet Info'}: ${planet.name[currentLang]}`;

    // Actualizar contenido del desplegable
    planetInfoContent.innerHTML = `
        <h4>${planet.icon} ${planet.name[currentLang]}</h4>
        <p style="margin-bottom: 1rem; color: var(--text-secondary); font-style: italic;">${planet.description[currentLang]}</p>
        ${Object.entries(planet.details).map(([key, value]) => `
            <div class="planet-detail">
                <span class="planet-detail-label">${getDetailLabel(key)}:</span>
                <span class="planet-detail-value">${value[currentLang]}</span>
            </div>
        `).join('')}
    `;
}

// Obtener etiqueta para detalles del planeta
function getDetailLabel(key) {
    const labels = {
        diameter: 'Diámetro',
        distance: 'Distancia al Sol',
        period: 'Período Orbital',
        moons: 'Lunas',
        temperature: 'Temperatura',
        composition: 'Composición'
    };
    return labels[key] || key;
}

// Actualizar controles de capa según el planeta seleccionado
function updateLayerControls(planetKey) {
    const layerSelect = document.getElementById('layerSelect');
    const layerInfo = document.getElementById('layerInfo');
    
    if (planetKey && planetaryLayers[planetKey]) {
        // Obtener configuración de capas para el planeta
        const layerConfigKey = planetKey === 'earth' ? 'EARTH_LAYERS' : 
                             planetKey === 'earth_special' ? 'EARTH_SPECIAL_LAYERS' :
                             `${planetKey.toUpperCase()}_LAYERS`;
        const layerConfigs = NASA_CONFIG.GIBS_CONFIG[layerConfigKey];
        
        if (layerConfigs) {
            // Generar opciones específicas para el planeta
            const options = Object.entries(layerConfigs).map(([key, config]) => 
                `<option value="${key}">${config.title}</option>`
            ).join('');
            
            layerSelect.innerHTML = options;
            layerSelect.disabled = false;
            layerSelect.style.opacity = '1';
            
            // Mostrar control de fecha solo para la Tierra
            if (planetKey === 'earth') {
                showDateControl(true);
                layerInfo.innerHTML = `<small>Datos históricos disponibles desde 2000</small>`;
            } else {
                showDateControl(false);
                const planetName = PLANETS_DATA[planetKey].name && PLANETS_DATA[planetKey].name[currentLang] ? PLANETS_DATA[planetKey].name[currentLang] : '';
                layerInfo.innerHTML = `<small>Capas de ${planetName} disponibles</small>`;
            }
        }
    } else {
        // Sin capas disponibles
        layerSelect.innerHTML = `
            <option value="visual">Visual</option>
            <option value="infrared">Infrarrojo</option>
            <option value="radar">Radar</option>
        `;
        layerSelect.disabled = true;
        layerSelect.style.opacity = '0.5';
        
        showDateControl(false);
        layerInfo.innerHTML = `<small>Selecciona un planeta para ver capas</small>`;
    }
    
    // Establecer valor actual
    layerSelect.value = currentLayer;
}

// Cargar imágenes del planeta desde la API de NASA
async function loadPlanetImages(planetKey) {
    setLoading(true);
    
    try {
        let imageData = null;
        
        // Cargar imágenes específicas según el planeta
        switch (planetKey) {
            case 'earth':
                imageData = await fetchEarthImages();
                break;
            case 'mars':
                imageData = await fetchMarsImages();
                break;
            default:
                imageData = await fetchAPODImages();
                break;
        }
        
        if (imageData) {
            showImageModal(imageData);
        }
        
    } catch (error) {
        console.error('Error al cargar imágenes:', error);
        showError('Error al cargar imágenes del planeta');
    } finally {
        setLoading(false);
    }
}

// Obtener imágenes de la Tierra
async function fetchEarthImages() {
    try {
        const response = await fetch(
            `${NASA_API_CONFIG.BASE_URL}${NASA_API_CONFIG.ENDPOINTS.EPIC}?api_key=${NASA_API_CONFIG.API_KEY}`
        );
        
        if (!response.ok) throw new Error('Error en la respuesta de la API');
        
        const data = await response.json();
        
        if (data && data.length > 0) {
            const latestImage = data[0];
            const date = latestImage.date.split(' ')[0].replace(/-/g, '/');
            const imageUrl = `https://epic.gsfc.nasa.gov/archive/natural/${date.replace(/\//g, '/')}/png/${latestImage.image}.png`;
            
            return {
                title: 'Imagen EPIC de la Tierra',
                url: imageUrl,
                description: `Imagen de la Tierra tomada el ${latestImage.date} desde el satélite DSCOVR. ${latestImage.caption || ''}`
            };
        }
    } catch (error) {
        console.warn('Error al obtener imágenes EPIC, usando APOD:', error);
        return await fetchAPODImages();
    }
    
    return null;
}

// Obtener imágenes de Marte
async function fetchMarsImages() {
    try {
        const response = await fetch(
            `${NASA_API_CONFIG.BASE_URL}${NASA_API_CONFIG.ENDPOINTS.MARS_PHOTOS}/curiosity/photos?sol=1000&api_key=${NASA_API_CONFIG.API_KEY}`
        );
        
        if (!response.ok) throw new Error('Error en la respuesta de la API');
        
        const data = await response.json();
        
        if (data.photos && data.photos.length > 0) {
            const randomPhoto = data.photos[Math.floor(Math.random() * Math.min(data.photos.length, 10))];
            
            return {
                title: 'Imagen del Rover Curiosity en Marte',
                url: randomPhoto.img_src,
                description: `Fotografía tomada por el rover ${randomPhoto.rover.name} el ${randomPhoto.earth_date} usando la cámara ${randomPhoto.camera.full_name}.`
            };
        }
    } catch (error) {
        console.warn('Error al obtener imágenes de Marte, usando APOD:', error);
        return await fetchAPODImages();
    }
    
    return null;
}

// Obtener imagen astronómica del día (APOD)
async function fetchAPODImages() {
    try {
        const response = await fetch(
            `${NASA_API_CONFIG.BASE_URL}${NASA_API_CONFIG.ENDPOINTS.APOD}?api_key=${NASA_API_CONFIG.API_KEY}`
        );
        
        if (!response.ok) throw new Error('Error en la respuesta de la API');
        
        const data = await response.json();
        
        if (data && data.url) {
            return {
                title: data.title || 'Imagen Astronómica del Día',
                url: data.url,
                description: data.explanation || 'Imagen proporcionada por NASA APOD'
            };
        }
    } catch (error) {
        console.error('Error al obtener APOD:', error);
    }
    
    return null;
}

// Cargar datos iniciales de la NASA
async function loadInitialNASAData() {
    try {
        // Cargar imagen astronómica del día
        const apodData = await fetchAPODImages();
        if (apodData) {
            console.log('Datos APOD cargados:', apodData.title);
        }
    } catch (error) {
        console.warn('No se pudieron cargar los datos iniciales de NASA:', error);
    }
}

// Mostrar modal de imagen
function showImageModal(imageData) {
    const modal = document.getElementById('imageModal');
    const title = document.getElementById('modalTitle');
    const image = document.getElementById('modalImage');
    const description = document.getElementById('modalDescription');
    
    title.textContent = imageData.title;
    image.src = imageData.url;
    image.alt = imageData.title;
    description.textContent = imageData.description;
    
    modal.classList.add('open');
}

// Cerrar modal de imagen
function closeImageModal() {
    document.getElementById('imageModal').classList.remove('open');
}

// Manejar cambio de zoom en el mapa
function handleMapZoom() {
    const zoom = map.getZoom();
    console.log('Nivel de zoom actual:', zoom);
    
    // Aplicar lógica de capas si tenemos un planeta con capas activas
    if (currentPlanet && currentPlanetaryLayer) {
        const layerConfigKey = currentPlanet === 'earth' ? 'EARTH_LAYERS' : 
                             currentPlanet === 'earth_special' ? 'EARTH_SPECIAL_LAYERS' :
                             `${currentPlanet.toUpperCase()}_LAYERS`;
        const layerConfigs = NASA_CONFIG.GIBS_CONFIG[layerConfigKey];
        
        if (layerConfigs && layerConfigs[currentLayer]) {
            const layerConfig = layerConfigs[currentLayer];
            const planetName = PLANETS_DATA[currentPlanet].name;
            
            // Mostrar información del zoom y resolución según el planeta
            if (currentPlanet === 'earth') {
                if (zoom >= 6) {
                    showZoomInfo(`🌍 Alta resolución - Detalles regionales de la Tierra`);
                } else if (zoom >= 4) {
                    showZoomInfo(`🌍 Resolución media - Vista continental`);
                } else if (zoom >= 2) {
                    showZoomInfo(`🌍 Resolución global - Vista mundial`);
                }
            } else if (currentPlanet === 'mars') {
                if (zoom >= 5) {
                    showZoomInfo(`🔴 Alta resolución - Detalles de la superficie marciana`);
                } else if (zoom >= 3) {
                    showZoomInfo(`🔴 Resolución media - Regiones de Marte`);
                } else {
                    showZoomInfo(`🔴 Vista global de Marte`);
                }
            } else if (currentPlanet === 'moon') {
                if (zoom >= 6) {
                    showZoomInfo(`🌙 Alta resolución - Cráteres y formaciones lunares`);
                } else if (zoom >= 4) {
                    showZoomInfo(`🌙 Resolución media - Mares lunares`);
                } else {
                    showZoomInfo(`🌙 Vista global de la Luna`);
                }
            } else if (currentPlanet === 'venus') {
                if (zoom >= 4) {
                    showZoomInfo(`♀ Radar de alta resolución - Superficie de Venus`);
                } else {
                    showZoomInfo(`♀ Vista global de Venus (Radar Magellan)`);
                }
            } else {
                if (zoom >= 3) {
                    showZoomInfo(`Máxima resolución disponible para ${planetName}`);
                } else {
                    showZoomInfo(`Vista global de ${planetName}`);
                }
            }
            
            // Verificar si estamos cerca del zoom máximo de la capa
            if (zoom >= layerConfig.maxZoom - 1) {
                showZoomInfo(`⚠️ Zoom máximo para ${layerConfig.title}: ${layerConfig.maxZoom}`, 'warning');
            }
            
            // Precargar tiles para mejor experiencia
            if (zoom > Math.floor(layerConfig.maxZoom / 2)) {
                console.log(`Precargando tiles de alta resolución para ${planetName}...`);
            }
        }
    }
}

// Mostrar información de zoom
function showZoomInfo(message, type = 'info') {
    // Remover notificación anterior si existe
    const existingZoomInfo = document.getElementById('zoom-info');
    if (existingZoomInfo) {
        existingZoomInfo.remove();
    }
    
    const zoomInfoDiv = document.createElement('div');
    zoomInfoDiv.id = 'zoom-info';
    zoomInfoDiv.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        background: ${type === 'warning' ? 'var(--warning)' : 'var(--surface)'};
        color: ${type === 'warning' ? 'var(--primary-color)' : 'var(--text-primary)'};
        padding: 0.75rem 1rem;
        border-radius: 6px;
        z-index: 1000;
        font-size: 0.85rem;
        box-shadow: 0 4px 15px var(--shadow);
        animation: fadeInUp 0.3s ease;
        max-width: 300px;
    `;
    zoomInfoDiv.textContent = message;
    
    document.body.appendChild(zoomInfoDiv);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        if (zoomInfoDiv.parentNode) {
            zoomInfoDiv.remove();
        }
    }, 3000);
}

// Manejar cambio de capa
function handleLayerChange(event) {
    currentLayer = event.target.value;
    console.log('Capa cambiada a:', currentLayer);
    
    // Cambiar capa para el planeta actual
    if (currentPlanet && planetaryLayers[currentPlanet]) {
        showPlanetaryLayer(currentPlanet, currentLayer);
        
        // Mostrar notificación del cambio de capa
        const layerConfigKey = currentPlanet === 'earth' ? 'EARTH_LAYERS' : 
                             currentPlanet === 'earth_special' ? 'EARTH_SPECIAL_LAYERS' :
                             `${currentPlanet.toUpperCase()}_LAYERS`;
        const layerConfigs = NASA_CONFIG.GIBS_CONFIG[layerConfigKey];
        
        if (layerConfigs && layerConfigs[currentLayer]) {
            showLayerChangeNotification(layerConfigs[currentLayer], currentPlanet);
        }
    }
}

// Mostrar notificación de cambio de capa
function showLayerChangeNotification(layerConfig, planet) {
    const notificationDiv = document.createElement('div');
    notificationDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--surface);
        color: var(--text-primary);
        padding: 1.5rem 2rem;
        border-radius: 12px;
        border: 2px solid var(--accent-color);
        z-index: 10000;
        text-align: center;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        animation: fadeInUp 0.3s ease;
        min-width: 250px;
    `;
    
    const planetName = PLANETS_DATA[planet] ? PLANETS_DATA[planet].name : planet;
    notificationDiv.innerHTML = `
        <h3 style="margin: 0 0 0.5rem 0; color: var(--accent-color);">Capa Cambiada - ${planetName}</h3>
        <p style="margin: 0 0 0.5rem 0; font-weight: 500;">${layerConfig.title}</p>
        <p style="margin: 0; font-size: 0.85rem; opacity: 0.8;">Zoom máximo: ${layerConfig.maxZoom}</p>
    `;
    
    document.body.appendChild(notificationDiv);
    
    // Remover después de 2 segundos
    setTimeout(() => {
        if (notificationDiv.parentNode) {
            notificationDiv.remove();
        }
    }, 2000);
}

// Funciones para manejo de fecha de la Tierra
function initializeDateControl() {
    const dateSelector = document.getElementById('dateSelector');
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    // Establecer fecha máxima (ayer) y mínima (2000-01-01 cuando comenzó MODIS)
    dateSelector.max = yesterday.toISOString().split('T')[0];
    dateSelector.min = '2000-02-24'; // Fecha de inicio de MODIS Aqua
    
    // Establecer fecha por defecto (ayer)
    dateSelector.value = yesterday.toISOString().split('T')[0];
    selectedDate = dateSelector.value;
    
    console.log('Control de fecha inicializado. Rango:', dateSelector.min, 'a', dateSelector.max);
}

function handleDateChange(event) {
    selectedDate = event.target.value;
    console.log('Fecha seleccionada:', selectedDate);
    
    // Mostrar indicador visual de que hay una fecha pendiente de aplicar
    const applyBtn = document.getElementById('dateApply');
    applyBtn.style.background = '#ffaa00';
    applyBtn.innerHTML = '<i class="fas fa-clock"></i>';
    
    // Mostrar tooltip
    showDateTooltip('Haz clic para aplicar la nueva fecha');
}

function applySelectedDate() {
    if (!selectedDate || currentPlanet !== 'earth') return;
    
    const applyBtn = document.getElementById('dateApply');
    applyBtn.style.background = '#00d4ff';
    applyBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    
    // Recargar capas de la Tierra con la nueva fecha
    reloadEarthLayersWithDate(selectedDate).then(() => {
        applyBtn.style.background = '#00ff88';
        applyBtn.innerHTML = '<i class="fas fa-check"></i>';
        
        // Mostrar notificación de éxito
        showDateChangeNotification(selectedDate);
        
        // Restaurar estado después de 2 segundos
        setTimeout(() => {
            applyBtn.style.background = '#00d4ff';
            applyBtn.innerHTML = '<i class="fas fa-check"></i>';
        }, 2000);
    }).catch(error => {
        console.error('Error al aplicar fecha:', error);
        applyBtn.style.background = '#ff4757';
        applyBtn.innerHTML = '<i class="fas fa-times"></i>';
        
        showError('Error al cargar datos para la fecha seleccionada');
        
        // Restaurar estado después de 3 segundos
        setTimeout(() => {
            applyBtn.style.background = '#00d4ff';
            applyBtn.innerHTML = '<i class="fas fa-check"></i>';
        }, 3000);
    });
}

async function reloadEarthLayersWithDate(date) {
    if (!planetaryLayers.earth) return;
    
    console.log('Recargando capas de la Tierra para fecha:', date);
    
    // Remover capa actual si existe
    if (currentPlanetaryLayer) {
        map.removeLayer(currentPlanetaryLayer);
    }
    
    // Recrear capas de la Tierra con nueva fecha
    const earthLayers = NASA_CONFIG.GIBS_CONFIG.EARTH_LAYERS;
    
    Object.keys(earthLayers).forEach(layerKey => {
        const layerConfig = earthLayers[layerKey];
        
        planetaryLayers.earth[layerKey] = L.tileLayer(
            `${NASA_CONFIG.GIBS_CONFIG.WMTS_BASE}/${layerConfig.name}/default/${date}/250m/{z}/{y}/{x}.${layerConfig.format}`,
            {
                attribution: `${layerConfig.attribution} - ${date}`,
                maxZoom: layerConfig.maxZoom,
                tileSize: NASA_CONFIG.GIBS_CONFIG.TILE_SIZE,
                noWrap: true,
                bounds: [[-85.0511, -180], [85.0511, 180]]
            }
        );
    });
    
    // Mostrar la capa actual con la nueva fecha
    showPlanetaryLayer('earth', currentLayer);
}

function showDateChangeNotification(date) {
    const notificationDiv = document.createElement('div');
    notificationDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--surface);
        color: var(--text-primary);
        padding: 1.5rem 2rem;
        border-radius: 12px;
        border: 2px solid var(--success);
        z-index: 10000;
        text-align: center;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        animation: fadeInUp 0.3s ease;
        min-width: 250px;
    `;
    
    const formattedDate = new Date(date).toLocaleDateString('es-ES', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    notificationDiv.innerHTML = `
        <h3 style="margin: 0 0 0.5rem 0; color: var(--success);">📅 Fecha Aplicada</h3>
        <p style="margin: 0 0 0.5rem 0; font-weight: 500;">Tierra - ${formattedDate}</p>
        <p style="margin: 0; font-size: 0.85rem; opacity: 0.8;">Datos GIBS actualizados</p>
    `;
    
    document.body.appendChild(notificationDiv);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        if (notificationDiv.parentNode) {
            notificationDiv.remove();
        }
    }, 3000);
}

function showDateTooltip(message) {
    const tooltip = document.createElement('div');
    tooltip.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 20px;
        background: var(--warning);
        color: var(--primary-color);
        padding: 0.5rem 1rem;
        border-radius: 6px;
        font-size: 0.8rem;
        z-index: 1000;
        animation: fadeInUp 0.3s ease;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    `;
    tooltip.textContent = message;
    
    document.body.appendChild(tooltip);
    
    setTimeout(() => {
        if (tooltip.parentNode) {
            tooltip.remove();
        }
    }, 3000);
}

function showDateControl(show = true) {
    const dateControl = document.getElementById('dateControl');
    const layerInfo = document.getElementById('layerInfo');
    
    if (show) {
        dateControl.style.display = 'flex';
        layerInfo.innerHTML = '<small>Selecciona fecha para datos históricos</small>';
    } else {
        dateControl.style.display = 'none';
        layerInfo.innerHTML = '<small>Selecciona un planeta para ver capas</small>';
    }
}

// Toggle del sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('collapsed');
}

// Toggle del desplegable de información del planeta
function togglePlanetInfoDropdown() {
    const btn = document.getElementById('planetInfoBtn');
    const dropdown = document.getElementById('planetInfoDropdown');
    
    const isActive = btn.classList.contains('active');
    
    if (isActive) {
        btn.classList.remove('active');
        dropdown.classList.remove('active');
    } else {
        btn.classList.add('active');
        dropdown.classList.add('active');
    }
}

// Toggle del tema
function toggleTheme() {
    isDarkMode = !isDarkMode;
    const body = document.body;
    const themeIcon = document.querySelector('#themeToggle i');
    
    if (isDarkMode) {
        body.removeAttribute('data-theme');
        themeIcon.className = 'fas fa-moon';
    } else {
        body.setAttribute('data-theme', 'light');
        themeIcon.className = 'fas fa-sun';
    }
    
    // Guardar preferencia del tema
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
}

// Inicializar tema desde localStorage
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        isDarkMode = savedTheme === 'dark';
        if (!isDarkMode) {
            toggleTheme();
        }
    }
}

// Mostrar loader
function showLoader() {
    document.getElementById('loader').classList.remove('hidden');
}

// Ocultar loader
function hideLoader() {
    document.getElementById('loader').classList.add('hidden');
}

// Establecer estado de carga
function setLoading(loading) {
    isLoading = loading;
    const mapContainer = document.querySelector('.map-container');
    
    if (loading) {
        mapContainer.classList.add('loading');
    } else {
        mapContainer.classList.remove('loading');
    }
}

// Mostrar error
function showError(message) {
    // Crear notificación de error
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--error);
        color: white;
        padding: 1rem;
        border-radius: 8px;
        z-index: 10000;
        animation: fadeInUp 0.3s ease;
    `;
    errorDiv.textContent = message;
    
    document.body.appendChild(errorDiv);
    
    // Remover después de 5 segundos
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// Funciones globales para acceso desde HTML
window.selectPlanet = selectPlanet;

// Agregar event listener para errores de tiles GIBS
document.addEventListener('DOMContentLoaded', function() {
    // Manejar errores de carga de tiles
    if (typeof L !== 'undefined') {
        L.TileLayer.include({
            _tileOnError: function (done, tile, e) {
                console.warn('Error al cargar tile GIBS:', e);
                // Mostrar tile de placeholder o error
                tile.style.opacity = 0.3;
                done(e, tile);
            }
        });
    }
});

// Función para mostrar ayuda sobre GIBS
function showGIBSHelp() {
    const helpContent = `
        <div style="text-align: left;">
            <h3 style="color: var(--accent-color); margin-bottom: 1rem;">🛰️ Capas GIBS de NASA</h3>
            <p><strong>Color Verdadero:</strong> Imágenes como las vería el ojo humano</p>
            <p><strong>Infrarrojo (7-2-1):</strong> Composición que resalta vegetación y agua</p>
            <p><strong>Día/Noche:</strong> Imágenes nocturnas que muestran luces artificiales</p>
            <p><strong>Landsat Anual:</strong> Compuesto anual libre de nubes</p>
            <br>
            <p style="font-size: 0.9rem; color: var(--text-secondary);">
                💡 <strong>Tip:</strong> Usa el zoom para ver mayor detalle. Cada capa tiene diferentes niveles de resolución.
            </p>
        </div>
    `;
    
    showImageModal({
        title: 'Guía de Capas GIBS',
        url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI0MCIgZmlsbD0iIzAwZDRmZiIvPjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+R0lCUzwvdGV4dD48L3N2Zz4=',
        description: helpContent
    });
}

// Hacer función disponible globalmente
window.showGIBSHelp = showGIBSHelp;

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}
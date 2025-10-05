# NASA Solar System Explorer 🚀

Una aplicación web interactiva que utiliza las APIs de NASA para explorar el sistema solar con imágenes satelitales y datos astronómicos en tiempo real.

## 🌟 Características

- **Mapa Interactivo**: Navega por el sistema solar con zoom progresivo
- **APIs de NASA**: Integración con APOD, EPIC, y Mars Rover Photos
- **Capas de Imágenes**: Sistema de capas simulando GIBS Tile Layers
- **Información Detallada**: Datos científicos de cada planeta
- **Diseño Responsivo**: Interfaz moderna que funciona en todos los dispositivos
- **Modo Oscuro/Claro**: Tema personalizable
- **Animaciones Suaves**: Transiciones y efectos visuales

## 🛠 Tecnologías Utilizadas

- **HTML5**: Estructura semántica moderna
- **CSS3**: Variables CSS, Grid, Flexbox, animaciones
- **JavaScript ES6+**: Módulos, async/await, fetch API
- **Leaflet.js**: Biblioteca de mapas interactivos
- **Font Awesome**: Iconografía
- **Google Fonts**: Tipografía Poppins

## 🔑 Configuración de API Key

### Obtener API Key de NASA (GRATUITA)

1. Visita [https://api.nasa.gov/](https://api.nasa.gov/)
2. Haz clic en "Get Started"
3. Completa el formulario con:
   - First Name (Nombre)
   - Last Name (Apellido)
   - Email (Correo electrónico)
4. Recibirás tu API key por email inmediatamente

### Configurar la API Key

Abre el archivo `src/script.js` y modifica la línea 3:

```javascript
// Reemplaza 'DEMO_KEY' con tu API key personal
API_KEY: 'TU_API_KEY_AQUI',
```

**Ejemplo:**
```javascript
API_KEY: 'abc123xyz789-TU-API-KEY-REAL',
```

> **Nota**: La aplicación funciona con `DEMO_KEY` pero tiene limitaciones de rate limiting. Se recomienda usar una API key personal para mejor rendimiento.

## 🚀 Instalación y Uso

### Opción 1: Servidor Local Simple

```bash
# Navegar al directorio del proyecto
cd src

# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (si tienes npm instalado)
npx serve .

# PHP
php -S localhost:8000
```

Luego abre `http://localhost:8000` en tu navegador.

### Opción 2: Live Server (VS Code)

1. Instala la extensión "Live Server" en VS Code
2. Haz clic derecho en `index.html`
3. Selecciona "Open with Live Server"

### Opción 3: Abrir Directamente

Abre el archivo `src/index.html` directamente en tu navegador (algunas funciones pueden estar limitadas por CORS).

## 📁 Estructura del Proyecto

```
nasaproyect/
├── src/
│   ├── index.html          # Página principal
│   ├── style.css           # Estilos y diseño
│   ├── script.js           # Lógica y APIs
│   └── README.md           # Este archivo
└── prueba.html             # Archivo de prueba
```

## 🌍 APIs Utilizadas

### 1. NASA APOD (Astronomy Picture of the Day)
- **Endpoint**: `/planetary/apod`
- **Uso**: Imágenes astronómicas diarias
- **Documentación**: [https://api.nasa.gov/](https://api.nasa.gov/)

### 2. NASA EPIC (Earth Polychromatic Imaging Camera)
- **Endpoint**: `/EPIC/api/natural/images`
- **Uso**: Imágenes de la Tierra desde el espacio
- **Documentación**: [https://epic.gsfc.nasa.gov/about/api](https://epic.gsfc.nasa.gov/about/api)

### 3. Mars Rover Photos
- **Endpoint**: `/mars-photos/api/v1/rovers`
- **Uso**: Fotografías de los rovers en Marte
- **Documentación**: [https://api.nasa.gov/](https://api.nasa.gov/)

### 4. GIBS (Global Imagery Browse Services)
- **URL**: `https://gibs.earthdata.nasa.gov`
- **Uso**: Sistema de capas para imágenes satelitales
- **Documentación**: [https://wiki.earthdata.nasa.gov/display/GIBS](https://wiki.earthdata.nasa.gov/display/GIBS)

## 🎮 Funcionalidades

### Navegación del Mapa
- **Zoom**: Usa los controles + / - o la rueda del mouse
- **Pan**: Arrastra el mapa para desplazarte
- **Planetas**: Haz clic en los marcadores de planetas

### Panel Lateral
- **Lista de Planetas**: Haz clic en cualquier planeta para explorarlo
- **Colapsar**: Usa el botón de hamburguesa para ocultar/mostrar

### Panel de Información
- **Abrir**: Haz clic en el icono de información (ⓘ)
- **Datos**: Muestra información científica detallada
- **Cerrar**: Usa la X para cerrar el panel

### Controles Adicionales
- **Tema**: Alterna entre modo oscuro y claro
- **Capas**: Cambia entre diferentes tipos de visualización
- **Imágenes**: Las imágenes de NASA se abren en modal

## 🎨 Personalización

### Cambiar Colores

Modifica las variables CSS en `style.css`:

```css
:root {
    --primary-color: #0B1426;
    --accent-color: #00d4ff;
    /* ... más variables */
}
```

### Añadir Nuevos Planetas

Agrega datos en `script.js`:

```javascript
const PLANETS_DATA = {
    pluto: {
        name: 'Plutón',
        description: 'El planeta enano',
        color: '#8C7853',
        icon: '♇',
        coordinates: [80, 80],
        zoom: 2,
        details: { /* ... */ }
    }
};
```

### Modificar Animaciones

Ajusta las transiciones en `style.css`:

```css
:root {
    --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

## 📱 Responsividad

La aplicación es completamente responsiva:

- **Desktop**: Experiencia completa con sidebar y panel de información
- **Tablet**: Adaptación automática del layout
- **Mobile**: Sidebar colapsible y modal fullscreen

## 🔧 Solución de Problemas

### Problemas Comunes

1. **Imágenes no cargan**:
   - Verifica tu API key de NASA
   - Revisa la conexión a internet
   - Comprueba la consola del navegador

2. **CORS Errors**:
   - Usa un servidor local (no abras el archivo directamente)
   - Algunas APIs pueden tener restricciones CORS

3. **Rate Limiting**:
   - Con `DEMO_KEY` hay límites de solicitudes
   - Usa tu API key personal para más solicitudes

4. **Mapa no aparece**:
   - Verifica que Leaflet.js se cargue correctamente
   - Revisa la consola para errores de JavaScript

### Debug

Abre las Herramientas de Desarrollador (F12) y revisa:
- **Console**: Para errores de JavaScript
- **Network**: Para problemas de API
- **Elements**: Para problemas de CSS

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Algunas ideas para mejoras:

- Integrar más APIs de NASA
- Añadir más planetas y lunas
- Implementar sistema de favoritos
- Añadir información histórica de misiones
- Mejorar la simulación de capas GIBS

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Puedes usarlo libremente para proyectos personales y comerciales.

## 🙏 Agradecimientos

- **NASA**: Por proporcionar APIs públicas gratuitas
- **Leaflet**: Por la excelente biblioteca de mapas
- **Font Awesome**: Por los iconos
- **Google Fonts**: Por la tipografía

## 📞 Soporte

Si tienes problemas o preguntas:

1. Revisa este README
2. Consulta la [documentación de NASA API](https://api.nasa.gov/)
3. Revisa la [documentación de Leaflet](https://leafletjs.com/)

---

**¡Explora el cosmos con NASA! 🌌**
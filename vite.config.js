import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy para GIBS (Tierra)
      '/wmts': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/wmts/, '/wmts')
      },
      // Proxy para Mars Trek (Marte)
      '/mars-trek': {
        target: 'https://trek.nasa.gov',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/mars-trek/, ''),
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            // Agregar headers CORS
            proxyReq.setHeader('Access-Control-Allow-Origin', '*');
            proxyReq.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
            proxyReq.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Authorization');
          });
        }
      },
      // Proxy para OpenPlanetaryMap (Marte - funciona correctamente)
      '/opm-mars': {
        target: 'https://cartocdn-gusc.global.ssl.fastly.net',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/opm-mars/, ''),
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            // Agregar headers CORS
            proxyReq.setHeader('Access-Control-Allow-Origin', '*');
            proxyReq.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
            proxyReq.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Authorization');
          });
        }
      },
      // Proxy para OpenPlanetaryMap Luna (funciona correctamente)
      '/opm-moon': {
        target: 'https://cartocdn-gusc.global.ssl.fastly.net',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/opm-moon/, ''),
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            // Agregar headers CORS
            proxyReq.setHeader('Access-Control-Allow-Origin', '*');
            proxyReq.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
            proxyReq.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Authorization');
          });
        }
      }
    }
  }
})

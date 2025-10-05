import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Servir archivos estáticos del backend
app.use('/static', express.static(path.join(__dirname, 'nasaproyect/elements')));

// Proxy para NASA GIBS
app.use('/wmts', createProxyMiddleware({
    target: 'https://gibs.earthdata.nasa.gov',
    changeOrigin: true,
    pathRewrite: {
        '^/wmts': '/wmts'
    },
    onProxyReq: (proxyReq, req, res) => {
        console.log(`[PROXY] ${req.method} ${req.url}`);
    },
    onProxyRes: (proxyRes, req, res) => {
        console.log(`[PROXY] ${proxyRes.statusCode} ${req.url}`);
    },
    onError: (err, req, res) => {
        console.error(`[PROXY ERROR] ${err.message} - ${req.url}`);
        res.status(500).json({ error: 'Proxy error' });
    }
}));

// Proxy para NASA API
app.use('/api', createProxyMiddleware({
    target: 'https://api.nasa.gov',
    changeOrigin: true,
    pathRewrite: {
        '^/api': ''
    },
    onProxyReq: (proxyReq, req, res) => {
        console.log(`[NASA API] ${req.method} ${req.url}`);
    },
    onProxyRes: (proxyRes, req, res) => {
        console.log(`[NASA API] ${proxyRes.statusCode} ${req.url}`);
    }
}));

// Ruta de salud
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'NASA GIBS Proxy Server running',
        timestamp: new Date().toISOString()
    });
});

// Ruta raíz
app.get('/', (req, res) => {
    res.json({
        message: 'NASA GIBS Proxy Server',
        endpoints: {
            health: '/health',
            gibs: '/wmts/*',
            nasa_api: '/api/*'
        }
    });
});

app.listen(PORT, () => {
    console.log(`🚀 NASA GIBS Proxy Server running on http://localhost:${PORT}`);
    console.log(`📡 Proxying NASA GIBS requests to: https://gibs.earthdata.nasa.gov`);
    console.log(`🌍 Proxying NASA API requests to: https://api.nasa.gov`);
});

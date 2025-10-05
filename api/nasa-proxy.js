export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const { url } = req.query;
    
    if (!url) {
      return res.status(400).json({ error: 'URL parameter is required' });
    }

    // Construir URL completa de NASA
    const nasaUrl = `https://api.nasa.gov/${url}`;
    
    // Agregar API key si no está presente
    const apiKey = process.env.NASA_API_KEY || 'NKsiusVGXnMbpMPd7XcRlofw6ifaLauqSTAhP5bu';
    const separator = nasaUrl.includes('?') ? '&' : '?';
    const fullUrl = `${nasaUrl}${separator}api_key=${apiKey}`;

    console.log('Proxying request to:', fullUrl);

    const response = await fetch(fullUrl, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
      },
      // Timeout de 25 segundos
      signal: AbortSignal.timeout(25000)
    });

    if (!response.ok) {
      console.error('NASA API error:', response.status, response.statusText);
      return res.status(response.status).json({ 
        error: 'NASA API error', 
        status: response.status,
        message: response.statusText 
      });
    }

    const data = await response.json();
    res.status(200).json(data);

  } catch (error) {
    console.error('Proxy error:', error);
    
    if (error.name === 'AbortError') {
      return res.status(408).json({ error: 'Request timeout' });
    }
    
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}

# Configuración de Azure OpenAI

Este documento explica cómo configurar Azure OpenAI para el chatbot de NTBeyonder.

## Requisitos Previos

1. **Cuenta de Azure**: Necesitas una cuenta activa en Microsoft Azure
2. **Azure OpenAI Service**: Acceso al servicio Azure OpenAI (requiere solicitud de acceso)
3. **Deployment creado**: Un deployment de un modelo GPT (gpt-35-turbo, gpt-4, etc.)

## Pasos de Configuración

### 1. Obtener las Credenciales de Azure OpenAI

1. Ve a [Azure Portal](https://portal.azure.com)
2. Navega a tu recurso de Azure OpenAI
3. En la sección "Keys and Endpoint", encontrarás:
   - **Endpoint**: URL base de tu servicio (ej: `https://tu-recurso.openai.azure.com`)
   - **API Key**: Una de las dos claves disponibles (Key 1 o Key 2)
4. En la sección "Model deployments", anota el **nombre del deployment** que creaste

### 2. Configurar Variables de Entorno

Actualiza el archivo `.env` en la raíz del proyecto con tus credenciales:

```env
VITE_NASA_API_KEY=your_nasa_api_key_here
VITE_AZURE_OPENAI_API_KEY=tu_api_key_aqui
VITE_AZURE_OPENAI_ENDPOINT=https://tu-recurso.openai.azure.com
VITE_AZURE_OPENAI_DEPLOYMENT=nombre_de_tu_deployment
```

**Importante**: Nunca subas el archivo `.env` con credenciales reales a Git. El archivo `.gitignore` ya está configurado para excluirlo.

### 3. Configuración en Producción (Vercel)

Si estás desplegando en Vercel, configura las variables de entorno en el dashboard:

1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Agrega las siguientes variables:
   - `VITE_AZURE_OPENAI_API_KEY`
   - `VITE_AZURE_OPENAI_ENDPOINT`
   - `VITE_AZURE_OPENAI_DEPLOYMENT`

## Configuración de la API

El archivo `/src/config/azureOpenAIConfig.js` contiene la configuración:

```javascript
export const AZURE_OPENAI_CONFIG = {
    API_KEY: import.meta.env.VITE_AZURE_OPENAI_API_KEY,
    ENDPOINT: import.meta.env.VITE_AZURE_OPENAI_ENDPOINT,
    DEPLOYMENT: import.meta.env.VITE_AZURE_OPENAI_DEPLOYMENT,
    API_VERSION: '2024-02-15-preview'
};
```

**API_VERSION**: Se utiliza la versión `2024-02-15-preview`. Si Azure OpenAI actualiza su API, puedes cambiar esta versión.

## Formato de la Solicitud

El chatbot envía solicitudes con el siguiente formato:

```javascript
{
    messages: [
        {
            role: 'system',
            content: 'Eres un asistente útil que responde como un planeta del sistema solar.'
        },
        {
            role: 'user',
            content: 'prompt generado con contexto del planeta'
        }
    ],
    max_tokens: 150,
    temperature: 0.8
}
```

## Modelos Recomendados

- **gpt-35-turbo**: Rápido y económico para conversaciones
- **gpt-4**: Mayor calidad de respuestas, más costoso
- **gpt-4-turbo**: Balance entre calidad y velocidad

## Solución de Problemas

### Error: "API key not found"
- Verifica que las variables de entorno estén correctamente configuradas
- Reinicia el servidor de desarrollo después de modificar `.env`

### Error: "Invalid endpoint"
- Asegúrate de que el endpoint tenga el formato correcto: `https://tu-recurso.openai.azure.com`
- No incluyas barras diagonales al final del endpoint

### Error: "Deployment not found"
- Verifica que el nombre del deployment coincida exactamente con el configurado en Azure
- Los nombres son sensibles a mayúsculas/minúsculas

### Error 429: "Rate limit exceeded"
- Has excedido el límite de tokens por minuto de tu deployment
- Aumenta la cuota en Azure Portal o reduce la frecuencia de solicitudes

### Error 401: "Unauthorized"
- Verifica que la API key sea correcta
- Asegúrate de estar usando la API key correcta para el recurso

## Costos

Azure OpenAI cobra por tokens utilizados:
- **Tokens de entrada**: Lo que el usuario envía + el contexto del sistema
- **Tokens de salida**: La respuesta generada

Con `max_tokens: 150`, cada respuesta del chatbot costará aproximadamente:
- **gpt-35-turbo**: ~$0.0003 USD por respuesta
- **gpt-4**: ~$0.003 USD por respuesta

Monitorea tu uso en Azure Portal para evitar sorpresas.

## Recursos Adicionales

- [Documentación de Azure OpenAI](https://learn.microsoft.com/azure/ai-services/openai/)
- [Guía de inicio rápido](https://learn.microsoft.com/azure/ai-services/openai/quickstart)
- [Chat Completions API Reference](https://learn.microsoft.com/azure/ai-services/openai/reference)

## Soporte

Si tienes problemas con la configuración, verifica:
1. Que tu cuenta de Azure tenga acceso a Azure OpenAI
2. Que el recurso esté correctamente aprovisionado
3. Que el deployment esté activo y tenga cuota disponible

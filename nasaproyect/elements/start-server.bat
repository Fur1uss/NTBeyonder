@echo off
echo Iniciando servidor de desarrollo para NASA Solar System Explorer...
echo.
echo Selecciona una opcion:
echo 1. Python 3
echo 2. Python 2  
echo 3. Node.js (http-server)
echo 4. PHP
echo.
set /p choice="Ingresa tu opcion (1-4): "

if "%choice%"=="1" (
    echo Iniciando servidor con Python 3...
    python -m http.server 8000
) else if "%choice%"=="2" (
    echo Iniciando servidor con Python 2...
    python -m SimpleHTTPServer 8000
) else if "%choice%"=="3" (
    echo Iniciando servidor con Node.js...
    npx http-server -p 8000
) else if "%choice%"=="4" (
    echo Iniciando servidor con PHP...
    php -S localhost:8000
) else (
    echo Opcion invalida. Usando Python 3 por defecto...
    python -m http.server 8000
)

echo.
echo Servidor iniciado en: http://localhost:8000
echo Presiona Ctrl+C para detener el servidor
pause
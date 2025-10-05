import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Home from './pages/Home/Home.jsx'
import ProductContext from './pages/ProductContext/ProductContext.jsx'
import WebNavigation from './pages/webNavigation/WebNavigation.jsx'
import EarthViewerPage from './pages/EarthViewerPage/EarthViewerPage.jsx'
import MarsViewerPage from './pages/MarsViewerPage/MarsViewerPage.jsx'
import MoonViewerPage from './pages/MoonViewerPage/MoonViewerPage.jsx'
import UniverseMapPage from './pages/UniverseMapPage/UniverseMapPage.jsx'
import AndromedaPage from './pages/AndromedaPage/AndromedaPage.jsx'
import ViaLacteaPage from './pages/ViaLacteaPage/ViaLacteaPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product-context' element={<ProductContext />} />
        <Route path='/web-navigation' element={<WebNavigation />} />
        <Route path='/earth-viewer' element={<EarthViewerPage />} />
        <Route path='/mars-viewer' element={<MarsViewerPage />} />
        <Route path='/moon-viewer' element={<MoonViewerPage />} />
        <Route path='/universe-map' element={<UniverseMapPage />} />
        <Route path='/andromeda' element={<AndromedaPage />} />
        <Route path='/vialactea' element={<ViaLacteaPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

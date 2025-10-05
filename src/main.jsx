import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Home from './pages/Home/Home.jsx'
import ProductContext from './pages/ProductContext/ProductContext.jsx'
import WebNavigation from './pages/webNavigation/WebNavigation.jsx'
import EarthViewer from './pages/PlanetViewer/EarthViewer.jsx'
import MarsViewer from './pages/PlanetViewer/MarsViewer.jsx'
import VenusViewer from './pages/PlanetViewer/VenusViewer.jsx'
import SaturnViewer from './pages/PlanetViewer/SaturnViewer.jsx'




createRoot(document.getElementById('root')).render(
  <StrictMode>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/product-context' element={<ProductContext />} />
            <Route path='/web-navigation' element={<WebNavigation />} />
            <Route path='/earth-viewer' element={<EarthViewer />} />
            <Route path='/mars-viewer' element={<MarsViewer />} />
            <Route path='/venus-viewer' element={<VenusViewer />} />
            <Route path='/saturn-viewer' element={<SaturnViewer />} />
          </Routes>
        </BrowserRouter>
  </StrictMode>,
)

import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UniverseMap from './components/UniverseMap'
import GalaxyFrame from './components/GalaxyFrame'
import AndromedaPage from './components/AndromedaPage'
import ViaLacteaPage from './components/ViaLactea'
import SistemaSolarPage from './components/SistemaSolar'
import './App.css'

function App() {
  const [selectedGalaxy, setSelectedGalaxy] = useState(null)

  const handleGalaxyClick = (galaxy) => {
    setSelectedGalaxy(galaxy)
  }

  const closeFrame = () => {
    setSelectedGalaxy(null)
  }

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route 
            path="/" 
            element={
              <>
                <UniverseMap onGalaxyClick={handleGalaxyClick} />
                {selectedGalaxy && (
                  <GalaxyFrame 
                    galaxy={selectedGalaxy} 
                    onClose={closeFrame}
                  />
                )}
              </>
            } 
          />
          <Route path="/andromeda" element={<AndromedaPage />} />
          <Route path="/vialactea" element={<ViaLacteaPage />} />
          <Route path="/sistemasolar" element={<SistemaSolarPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

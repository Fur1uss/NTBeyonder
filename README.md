# 🌌 NTBeyonder - NASA Space Apps Challenge 2025

> **"Embiggen Your Eyes!" - Exploring Massive NASA Image Datasets**

[![NASA Space Apps Challenge](https://img.shields.io/badge/NASA-Space%20Apps%202025-blue.svg)](https://www.spaceappschallenge.org/)
[![React](https://img.shields.io/badge/React-19.1.1-61DAFB.svg)](https://reactjs.org/)
[![Three.js](https://img.shields.io/badge/Three.js-0.180.0-000000.svg)](https://threejs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF.svg)](https://vitejs.dev/)

## 🚀 Overview

**NTBeyonder** is an innovative web platform designed to explore NASA's massive image datasets through an immersive, interactive experience. Built for the NASA Space Apps Challenge 2025 "Embiggen Your Eyes!" challenge, our platform allows users to navigate through high-resolution images of Earth, Mars, the Moon, and distant galaxies with seamless zoom capabilities and intelligent exploration tools.

### 🎯 Challenge Context

NASA's space missions capture images with billions or even trillions of pixels - far exceeding what our eyes can process. From 2.5-gigapixel images of the Andromeda galaxy to daily gigapixel-level global maps of Mars, these datasets contain unprecedented visual information. NTBeyonder addresses the challenge of making these massive datasets accessible and explorable for both public inspiration and scientific research.

## ✨ Key Features

### 🌍 **Multi-Planetary Exploration**
- **Earth Viewer**: High-resolution satellite imagery with multiple layer options (True Color, Infrared)
- **Mars Viewer**: Detailed surface mapping with MOLA topography data
- **Moon Viewer**: Lunar Reconnaissance Orbiter (LRO) global mosaics
- **Galaxy Exploration**: Interactive 3D models of Andromeda and Milky Way galaxies

### 🔍 **Advanced Image Navigation**
- **Seamless Zoom**: Smooth zoom in/out capabilities for massive datasets
- **Layer Switching**: Multiple visualization modes for each celestial body
- **Coordinate Search**: Direct navigation using lat/long coordinates
- **Real-time Tile Loading**: Optimized streaming of high-resolution imagery

### 🤖 **AI-Powered Exploration**
- **Intelligent Chatbot**: Context-aware AI assistant for each planet
- **Gemini 2.0 Integration**: Advanced AI for answering space-related questions
- **Interactive Learning**: Personalized exploration guidance

### 🎨 **Immersive User Experience**
- **3D Visualization**: Three.js-powered 3D models and environments
- **Particle Systems**: Dynamic star fields and cosmic backgrounds
- **Smooth Animations**: Framer Motion for fluid transitions
- **Responsive Design**: Optimized for desktop, tablet, and mobile

## 🛠️ Technology Stack

### **Frontend Framework**
- **React 19.1.1** - Modern component-based architecture
- **Vite 7.1.7** - Lightning-fast build tool and dev server
- **React Router DOM 7.9.3** - Client-side routing

### **3D Graphics & Visualization**
- **Three.js 0.180.0** - 3D graphics library
- **@react-three/fiber 9.3.0** - React renderer for Three.js
- **@react-three/drei 10.7.6** - Useful helpers for R3F

### **Animation & UI**
- **Framer Motion 12.23.22** - Production-ready motion library
- **Leaflet 1.9.4** - Interactive maps for planetary data
- **FontAwesome 7.1.0** - Comprehensive icon library

### **Data & APIs**
- **NASA GIBS API** - Global Imagery Browse Services
- **NASA Open APIs** - Planetary data and imagery
- **Google Gemini 2.0** - AI-powered assistance
- **OpenPlanetaryMap** - Planetary mapping services

### **Development Tools**
- **ESLint 9.36.0** - Code linting and quality
- **TypeScript Support** - Type safety and development experience

## 🏗️ Architecture

### **Component Structure**
```
src/
├── components/           # Reusable UI components
│   ├── EarthViewer/     # Earth visualization system
│   ├── MarsViewer/      # Mars exploration interface
│   ├── MoonViewer/      # Lunar surface viewer
│   ├── PlanetChatbot/   # AI assistant integration
│   └── UniverseMap/     # Galaxy navigation system
├── pages/               # Main application pages
│   ├── Home/           # Landing page
│   ├── ProductContext/ # Project introduction
│   └── WebNavigation/  # Planetary exploration hub
├── config/             # Configuration files
│   ├── nasaConfig.js   # NASA API configuration
│   └── geminiConfig.js # AI service configuration
└── services/           # API service layers
```

### **Data Flow**
1. **User Interaction** → Component State Management
2. **API Requests** → NASA GIBS/OpenPlanetaryMap Services
3. **Image Processing** → Tile-based streaming system
4. **3D Rendering** → Three.js WebGL pipeline
5. **AI Integration** → Gemini 2.0 API responses

## 🚀 Getting Started

### **Prerequisites**
- Node.js 18+ 
- pnpm (recommended) or npm
- Modern web browser with WebGL support

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ntbeyonder.git
   cd ntbeyonder
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   VITE_NASA_API_KEY=your_nasa_api_key_here
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

### **Build for Production**
```bash
pnpm build
# or
npm run build
```

## 🌟 Key Implementations

### **1. Massive Image Dataset Handling**
- **Tile-based Architecture**: Efficient loading of gigapixel images
- **Progressive Enhancement**: Multiple zoom levels with automatic quality adjustment
- **Memory Optimization**: Intelligent caching and cleanup strategies

### **2. Multi-Planetary Data Integration**
- **Earth**: MODIS satellite imagery with real-time updates
- **Mars**: MOLA topography and surface feature mapping
- **Moon**: LRO high-resolution global mosaics
- **Galaxies**: 3D models with scientific accuracy

### **3. AI-Enhanced Exploration**
- **Contextual Assistance**: Planet-specific AI knowledge
- **Natural Language Processing**: Intuitive query understanding
- **Educational Integration**: Learning-focused responses

### **4. Performance Optimization**
- **Lazy Loading**: Components loaded on demand
- **Image Compression**: Optimized asset delivery
- **WebGL Acceleration**: Hardware-accelerated 3D rendering

## 🎮 User Experience

### **Exploration Journey**
1. **Landing** → Immersive cosmic introduction
2. **Universe Map** → Galaxy selection interface
3. **Planetary Navigation** → 3D model exploration
4. **Data Visualization** → High-resolution imagery
5. **AI Interaction** → Intelligent assistance

### **Accessibility Features**
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Compatible**: ARIA labels and semantic HTML
- **Responsive Design**: Mobile-first approach
- **High Contrast Mode**: Enhanced visibility options

## 🔬 Scientific Accuracy

### **Data Sources**
- **NASA GIBS**: Official Earth observation data
- **USGS**: Planetary nomenclature and coordinates
- **LRO Mission**: Lunar Reconnaissance Orbiter data
- **MRO Mission**: Mars Reconnaissance Orbiter imagery

### **Coordinate Systems**
- **WGS84**: Standard Earth coordinate system
- **Planetary Coordinates**: Mars and Moon specific systems
- **Celestial Coordinates**: Galaxy positioning data

## 🌐 Deployment

### **Vercel Deployment**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### **Environment Variables**
Configure the following in your deployment platform:
- `VITE_NASA_API_KEY`: NASA API key for data access
- `VITE_GEMINI_API_KEY`: Google Gemini API key for AI features

## 🤝 Contributing

We welcome contributions to NTBeyonder! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### **Development Workflow**
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **NASA** for providing open access to space data and imagery
- **Google** for Gemini AI capabilities
- **Three.js Community** for 3D web graphics tools
- **React Team** for the amazing framework
- **NASA Space Apps Challenge** for inspiring this project

## 📞 Contact

- **Project Lead**: [Your Name]
- **Email**: [your.email@example.com]
- **GitHub**: [@yourusername](https://github.com/yourusername)
- **NASA Space Apps**: [Team Profile](https://www.spaceappschallenge.org/)

---

**Built with ❤️ for the NASA Space Apps Challenge 2025**

*"Exploring the cosmos, one pixel at a time."*
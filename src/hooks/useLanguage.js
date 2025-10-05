import { useState, useEffect } from 'react'
import { translations } from '../translations.js'

export const useLanguage = () => {
  const [language, setLanguage] = useState('es')
  
  useEffect(() => {
    // Guardar en localStorage para persistir
    const savedLang = localStorage.getItem('language')
    if (savedLang) {
      setLanguage(savedLang)
    }
  }, [])
  
  const changeLanguage = (newLang) => {
    setLanguage(newLang)
    localStorage.setItem('language', newLang)
  }
  
  const t = (key) => {
    return translations[language][key] || key
  }
  
  return { language, changeLanguage, t }
}

import { useEffect, useState } from 'react'
import styles from './styles.module.css'

export function AcessibilityBar() {
  const [theme, setTheme] = useState('default')

  useEffect(() => {
    const theme = localStorage.getItem('@node-bounty:theme')
    if (!theme) {
      localStorage.setItem('@node-bounty:theme', 'default')
    }
    setTheme(theme)
  }, [])

  useEffect(() => {
    if (theme === 'default') {
      document.documentElement.style.setProperty('--blue-100', '#cad8dd')
      document.documentElement.style.setProperty('--blue-200', '#9fb7bf')
      document.documentElement.style.setProperty('--blue-300', '#07b0f2')
      document.documentElement.style.setProperty('--blue-400', '#034159')
      document.documentElement.style.setProperty('--blue-500', '#223840')
      document.documentElement.style.setProperty('--blue-600', '#213238')
    } else if (theme === 'contrast') {
      document.documentElement.style.setProperty('--blue-100', '#ededed')
      document.documentElement.style.setProperty('--blue-200', '#dedede')
      document.documentElement.style.setProperty('--blue-300', '#cff207')
      document.documentElement.style.setProperty('--blue-400', '#2e2e2e')
      document.documentElement.style.setProperty('--blue-500', '#000')
      document.documentElement.style.setProperty('--blue-600', '#252525')
    }
  }, [theme])

  function handleAumentarFonte() {
    const currentFontSize = +window
      .getComputedStyle(document.documentElement)
      .fontSize.split('px')[0]
    if (currentFontSize < 24) {
      document.documentElement.style.fontSize = `${currentFontSize + 4}px`
    }
  }

  function handleDiminuirFonte() {
    const currentFontSize = +window
      .getComputedStyle(document.documentElement)
      .fontSize.split('px')[0]
    if (currentFontSize > 16) {
      document.documentElement.style.fontSize = `${currentFontSize - 4}px`
    }
  }

  function handleAltoContraste() {
    if (theme === 'default') {
      setTheme('contrast')
      localStorage.setItem('@node-bounty:theme', 'contrast')
    } else if (theme === 'contrast') {
      setTheme('default')
      localStorage.setItem('@node-bounty:theme', 'default')
    }
  }

  return (
    <div className={styles.acessibilityBarContainer}>
      <div>
        <button onClick={handleAltoContraste} aria-label="Alto Contraste">
          Alto Contraste
        </button>
        <button onClick={handleAumentarFonte} aria-label="Aumentar fonte">
          A+
        </button>
        <button onClick={handleDiminuirFonte} aria-label="Aumentar fonte">
          A-
        </button>
      </div>
    </div>
  )
}

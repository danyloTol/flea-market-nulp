import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Footer from './components/layout/Footer.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1 flex-col">
        <App />
      </div>
      <Footer />
    </div>
  </StrictMode>,
)

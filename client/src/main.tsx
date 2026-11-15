import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import Footer from './components/layout/Footer.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <div className="flex min-h-dvh flex-col">
        <div className="flex flex-1 flex-col">
          <App />
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  </StrictMode>,
)

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/layout/Footer'
import ProductDetailPage from './pages/ProductDetailPage'

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col bg-gray-50 text-gray-900">
        <main className="flex-1">
          <Routes>
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route
              path="*"
              element={
                <div className="p-6 text-center">
                  <h1 className="text-2xl font-bold">FleaMarket NULP</h1>
                  <p className="text-gray-500 mt-2">Каталог у розробці...</p>
                </div>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App

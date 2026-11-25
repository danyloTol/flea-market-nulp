import { BrowserRouter, Route, Routes, useSearchParams } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ProductDetailPage from './pages/ProductDetailPage'
import ProfilePage, { type StudentListing, type StudentProfile } from './pages/ProfilePage'

// Демо-дані для перевірки сторінки через /profile?demo=1
const demoStudent: StudentProfile = {
  name: 'Студент Демонстраційний',
  email: 'student@example.com',
  telegram: '@demo_student',
  institute: 'ІКНІ (демо)',
}

const demoListings: readonly StudentListing[] = [
  { id: 'demo-1', title: 'Підручники для першого курсу', price: 350, status: 'active', location: 'ГУК', createdAt: '2026-11-20' },
  { id: 'demo-2', title: 'Настільна лампа для гуртожитку', price: 280, status: 'pending', location: 'Студмістечко', createdAt: '2026-11-21' },
  { id: 'demo-3', title: 'Навушники бездротові', price: 850, status: 'sold', location: 'Корпус 1', createdAt: '2026-11-18' },
]

function ProfileRoute() {
  const [searchParams] = useSearchParams()
  const showDemo = import.meta.env.DEV && searchParams.get('demo') === '1'

  return (
    <ProfilePage
      student={showDemo ? demoStudent : null}
      listings={showDemo ? demoListings : []}
      isDemo={showDemo}
    />
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="flex min-h-screen flex-col bg-gray-50 text-gray-900">
          <Navbar />
          <h1>Hello world!</h1>
          <main className="w-full flex-1">
            <Routes>
              {/* Головна сторінка-заглушка */}
              <Route
                path="/"
                element={
                  <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 py-16 text-center">
                    <h1 className="text-2xl font-bold text-gray-900">FleaMarket NULP</h1>
                    <p className="mt-2 text-gray-500">Каталог у розробці...</p>
                  </div>
                }
              />
              {/* Деталі товару */}
              <Route path="/product/:id" element={<ProductDetailPage />} />
              {/* Профіль користувача */}
              <Route path="/profile" element={<ProfileRoute />} />
              {/* Всі інші неіснуючі адреси */}
              <Route
                path="*"
                element={
                  <div className="p-6 text-center">
                    <h1 className="text-2xl font-bold">404 - Сторінку не знайдено</h1>
                  </div>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
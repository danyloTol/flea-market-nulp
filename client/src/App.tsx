import { BrowserRouter, Route, Routes, useSearchParams } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ProfilePage, { type StudentListing, type StudentProfile } from './pages/ProfilePage'

// Test fixtures are only exposed with /profile?demo=1 during local development.
// Real user data and own listings will be passed here after FMN-28 and the API are integrated.
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

function HomePlaceholder() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 py-16 text-center">
      <h1 className="text-2xl font-bold text-gray-900">FleaMarket NULP</h1>
      <p className="mt-2 text-gray-500">Каталог у розробці...</p>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col bg-gray-50 text-gray-900">
        <Navbar />
        <main className="w-full flex-1">
          <Routes>
            <Route path="/" element={<HomePlaceholder />} />
            <Route path="/profile" element={<ProfileRoute />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App

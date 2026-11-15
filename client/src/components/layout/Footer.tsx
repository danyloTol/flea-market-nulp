import { GraduationCap, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'

type FooterLink = {
  label: string
  to: string
}

type CampusLink = {
  label: string
  location: string
}

const usefulLinks: readonly FooterLink[] = [
  { label: 'Головна', to: '/' },
  { label: 'Каталог оголошень', to: '/catalog' },
  { label: 'Подати оголошення', to: '/create' },
  { label: 'Увійти', to: '/login' },
]

const campusLinks: readonly CampusLink[] = [
  { label: 'Головний корпус (ГУК)', location: 'ГУК' },
  { label: 'Навчальний корпус №1', location: 'Корпус 1' },
  { label: 'Навчальний корпус №2', location: 'Корпус 2' },
  { label: 'Студмістечко', location: 'Студмістечко' },
]

const linkClasses =
  'inline-flex min-h-8 items-center rounded-md text-sm leading-6 text-slate-600 transition-colors hover:text-[#244393] hover:underline hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#244393]'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      aria-label="Підвал сайту"
      className="mt-auto w-full shrink-0 border-t border-slate-200 bg-white text-slate-800"
    >
      <div className="mx-auto w-full max-w-7xl px-4 pb-7 pt-10 sm:px-6 sm:pt-12 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.25fr_1fr_1.25fr] lg:gap-12">
          <div className="max-w-sm space-y-4 sm:col-span-2 lg:col-span-1">
            <Link
              to="/"
              aria-label="FleaMarket NULP — на головну"
              className="inline-flex items-center gap-3 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#244393]"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#244393] text-white">
                <GraduationCap aria-hidden="true" className="size-6" strokeWidth={1.8} />
              </span>
              <span className="text-lg font-bold tracking-tight text-slate-900">
                FleaMarket <span className="text-[#244393]">NULP</span>
              </span>
            </Link>
            <p className="text-sm leading-6 text-slate-600">
              Маленькі знахідки. Велика студентська спільнота.
              Купуй, продавай та обмінюй речі серед студентів Політехніки.
            </p>
          </div>

          <nav aria-label="Корисні посилання">
            <h2 className="mb-3 text-sm font-semibold text-slate-900">
              Корисні посилання
            </h2>
            <ul className="space-y-1.5">
              {usefulLinks.map(({ label, to }) => (
                <li key={to}>
                  <Link to={to} className={linkClasses}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Популярні корпуси та локації">
            <h2 className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-slate-900">
              <MapPin aria-hidden="true" className="size-4 text-[#244393]" />
              Популярні корпуси
            </h2>
            <ul className="space-y-1.5">
              {campusLinks.map(({ label, location }) => (
                <li key={location}>
                  <Link
                    to={`/catalog?location=${encodeURIComponent(location)}`}
                    className={linkClasses}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6 sm:mt-12">
          <p className="max-w-4xl text-xs leading-5 text-slate-500">
            FleaMarket NULP — неофіційний студентський сервіс. Цей сайт не є
            офіційним ресурсом Національного університету «Львівська політехніка»
            та не представляє університет.
          </p>
          <p className="mt-3 text-xs text-slate-500">
            © {year} FleaMarket NULP. Створено студентами для студентів.
          </p>
        </div>
      </div>
    </footer>
  )
}

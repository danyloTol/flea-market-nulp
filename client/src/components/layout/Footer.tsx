/**
 * FMN-19 — global footer for FleaMarket NULP.
 * The parent application shell uses flex-col / min-h-screen;
 * mt-auto keeps the footer at the bottom on short pages.
 */
const usefulLinks = [
  { label: 'Головна', href: '/' },
  { label: 'Каталог оголошень', href: '/catalog' },
  { label: 'Подати оголошення', href: '/create' },
  { label: 'Увійти', href: '/login' },
]

const campusLinks = [
  { label: 'Головний корпус (ГУК)', location: 'ГУК' },
  { label: 'Навчальний корпус №1', location: 'Корпус 1' },
  { label: 'Навчальний корпус №2', location: 'Корпус 2' },
  { label: 'Студмістечко', location: 'Студмістечко' },
]

const linkStyle =
  'inline-block rounded-sm text-sm text-slate-600 underline-offset-4 transition-colors hover:text-[#244393] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#244393]'

function CapIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
    >
      <path d="m2 9 10-5 10 5-10 5L2 9Z" />
      <path d="M6 11v5c4 3 8 3 12 0v-5" />
      <path d="M22 9v7" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer
      className="mt-auto w-full shrink-0 border-t border-slate-200 bg-white text-slate-800"
      aria-label="Підвал сайту"
    >
      <div className="mx-auto w-full max-w-7xl px-4 pt-10 pb-7 sm:px-6 sm:pt-12 lg:px-8">
        <div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1.25fr] lg:gap-12">
          <div className="max-w-sm space-y-4">
            <a
              href="/"
              aria-label="FleaMarket NULP — головна сторінка"
              className="inline-flex items-center gap-2.5 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#244393]"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#244393] text-white">
                <CapIcon />
              </span>
              <span className="text-lg font-bold tracking-tight text-slate-900">
                FleaMarket <span className="text-[#244393]">NULP</span>
              </span>
            </a>
            <p className="text-sm leading-6 text-slate-600">
              Маленькі знахідки. Велика студентська спільнота.
              Купуй, продавай та обмінюй речі серед студентів Політехніки.
            </p>
          </div>

          <nav aria-label="Корисні посилання">
            <h2 className="mb-4 text-sm font-bold tracking-wide text-slate-900">
              Корисні посилання
            </h2>
            <ul className="space-y-3">
              {usefulLinks.map(({ label, href }) => (
                <li key={href}>
                  <a className={linkStyle} href={href}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Популярні корпуси та локації">
            <h2 className="mb-4 text-sm font-bold tracking-wide text-slate-900">
              Популярні корпуси та локації
            </h2>
            <ul className="space-y-3">
              {campusLinks.map(({ label, location }) => (
                <li key={location}>
                  <a
                    className={linkStyle}
                    href={`/catalog?location=${encodeURIComponent(location)}`}
                  >
                    {label}
                  </a>
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
            © {new Date().getFullYear()} FleaMarket NULP. Створено студентами для студентів.
          </p>
        </div>
      </div>
    </footer>
  )
}

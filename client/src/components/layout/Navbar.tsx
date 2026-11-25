import { useEffect, useId, useState, type FormEvent } from 'react'
import { GraduationCap, LogOut, Menu, Plus, Search, UserRound, X } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth, type AuthUser } from '../../context/AuthContext'

export type NavbarUser = AuthUser

type SearchFormProps = {
  onNavigate?: () => void
  className?: string
}

const navigation = [
  { label: 'Головна', to: '/' },
  { label: 'Каталог', to: '/catalog' },
] as const

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#244393] focus-visible:ring-offset-2'

function SearchForm({ onNavigate, className = '' }: SearchFormProps) {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const value = query.trim()
    navigate(value ? `/catalog?q=${encodeURIComponent(value)}` : '/catalog')
    onNavigate?.()
  }

  return (
    <form
      role="search"
      aria-label="Пошук оголошень"
      onSubmit={handleSubmit}
      className={`flex min-w-0 items-center gap-2 rounded-lg bg-slate-50 px-3 py-2.5 ring-1 ring-inset ring-slate-100 transition-colors focus-within:bg-white focus-within:ring-[#244393] ${className}`}
    >
      <Search aria-hidden="true" className="size-[18px] shrink-0 text-slate-400" />
      <input
        aria-label="Пошук оголошень"
        name="q"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Пошук оголошень..."
        className="min-w-0 flex-1 bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
      />
      <button
        type="submit"
        className={`shrink-0 rounded-md text-xs font-medium text-[#244393] hover:underline ${focusRing}`}
        aria-label="Знайти оголошення"
      >
        Знайти
      </button>
    </form>
  )
}

function AccountLink({
  user,
  onNavigate,
  className = '',
}: {
  user: AuthUser | null
  onNavigate?: () => void
  className?: string
}) {
  return (
    <Link
      to={user ? '/profile' : '/login'}
      onClick={onNavigate}
      className={`inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-800 transition-colors hover:bg-slate-50 ${focusRing} ${className}`}
    >
      {user?.avatarUrl ? (
        <img
          src={user.avatarUrl}
          alt=""
          className="size-6 shrink-0 rounded-full object-cover"
        />
      ) : user ? (
        <span
          aria-hidden="true"
          className="flex size-6 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-semibold text-[#244393]"
        >
          {user.name.trim().charAt(0).toUpperCase() || '?'}
        </span>
      ) : (
        <UserRound aria-hidden="true" className="size-4" />
      )}
      <span className="max-w-24 truncate">{user ? user.name : 'Увійти'}</span>
    </Link>
  )
}

function LogoutButton({
  onClick,
  className = '',
}: {
  onClick: () => void
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-700 ${focusRing} ${className}`}
    >
      <LogOut aria-hidden="true" className="size-4" />
      Вийти
    </button>
  )
}

/** FMN-28 — Navbar reads the shared session; no separate BrowserRouter. */
export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuId = useId()

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  const closeMenu = () => setMenuOpen(false)
  const handleLogout = () => {
    logout()
    closeMenu()
    navigate('/', { replace: true })
  }

  return (
    <header className="sticky top-0 z-50 w-full shrink-0 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex min-h-16 w-full max-w-7xl items-center gap-3 px-4 sm:px-6 lg:gap-5 lg:px-8">
        <Link
          to="/"
          onClick={closeMenu}
          aria-label="FleaMarket NULP — на головну"
          className={`inline-flex shrink-0 items-center gap-2 rounded-lg ${focusRing}`}
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#244393] text-white">
            <GraduationCap aria-hidden="true" className="size-5" strokeWidth={1.8} />
          </span>
          <span className="whitespace-nowrap text-sm font-bold tracking-tight text-slate-900 sm:text-base">
            FleaMarket <span className="text-[#244393]">NULP</span>
          </span>
        </Link>

        <nav aria-label="Основна навігація" className="ml-2 hidden items-center gap-1 xl:flex">
          {navigation.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className={`rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-[#244393] ${focusRing}`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <SearchForm className="ml-auto hidden max-w-xl flex-1 md:flex" />

        <div className="ml-auto flex shrink-0 items-center gap-2 md:ml-0">
          <Link
            to="/create"
            onClick={closeMenu}
            className={`hidden min-h-10 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg bg-[#244393] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#1c3474] sm:inline-flex ${focusRing}`}
          >
            <Plus aria-hidden="true" className="size-4" />
            Подати оголошення
          </Link>
          <AccountLink user={user} className="hidden lg:inline-flex" />
          {user && <LogoutButton onClick={handleLogout} className="hidden lg:inline-flex" />}
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? 'Закрити меню' : 'Відкрити меню'}
            onClick={() => setMenuOpen((open) => !open)}
            className={`inline-flex size-10 items-center justify-center rounded-lg border border-slate-200 text-slate-800 hover:bg-slate-50 xl:hidden ${focusRing}`}
          >
            {menuOpen ? (
              <X aria-hidden="true" className="size-5" />
            ) : (
              <Menu aria-hidden="true" className="size-5" />
            )}
          </button>
        </div>
      </div>

      <nav
        id={menuId}
        aria-label="Мобільна навігація"
        className={`${menuOpen ? 'block' : 'hidden'} border-t border-slate-100 bg-white px-4 py-4 shadow-sm sm:px-6 xl:hidden`}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-2">
          <SearchForm className="mb-2 md:hidden" onNavigate={closeMenu} />
          {navigation.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              onClick={closeMenu}
              className={`rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[#244393] ${focusRing}`}
            >
              {label}
            </Link>
          ))}
          <Link
            to="/create"
            onClick={closeMenu}
            className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-[#244393] px-4 text-sm font-semibold text-white hover:bg-[#1c3474] sm:hidden ${focusRing}`}
          >
            <Plus aria-hidden="true" className="size-4" />
            Подати оголошення
          </Link>
          <AccountLink user={user} onNavigate={closeMenu} className="mt-1 w-full justify-start lg:hidden" />
          {user && <LogoutButton onClick={handleLogout} className="w-full lg:hidden" />}
        </div>
      </nav>
    </header>
  )
}

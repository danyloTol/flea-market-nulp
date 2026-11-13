import { useEffect, useId, useState } from 'react'
import './Navbar.css'

export type NavbarUser = {
  name: string
  avatarUrl?: string
}

type NavbarProps = {
  user?: NavbarUser | null
}

const navigation = [
  { label: 'Головна', href: '/' },
  { label: 'Каталог', href: '/catalog' },
]

function GraduationCapIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m2 9 10-5 10 5-10 5L2 9Z" />
      <path d="M6 11v5c4 3 8 3 12 0v-5" />
      <path d="M22 9v7" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <circle cx="10.8" cy="10.8" r="6.3" />
      <path d="m15.5 15.5 4 4" />
    </svg>
  )
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5.5 20v-1.4a6.5 6.5 0 0 1 13 0V20" />
    </svg>
  )
}

function SearchForm({ mobile = false }: { mobile?: boolean }) {
  return (
    <form className={mobile ? 'fmn-search fmn-search-mobile' : 'fmn-search'} role="search" action="/catalog" method="get">
      <SearchIcon />
      <input type="search" name="q" placeholder="Пошук оголошень..." aria-label="Пошук оголошень" />
    </form>
  )
}

function AccountLink({ user, onClick }: { user: NavbarUser | null; onClick?: () => void }) {
  return user ? (
    <a className="fmn-account" href="/profile" onClick={onClick}>
      {user.avatarUrl ? (
        <img src={user.avatarUrl} alt="" className="fmn-avatar" />
      ) : (
        <span className="fmn-avatar fmn-avatar-letter" aria-hidden="true">{user.name.trim().charAt(0).toUpperCase() || '?'}</span>
      )}
      <span>{user.name}</span>
    </a>
  ) : (
    <a className="fmn-account" href="/login" onClick={onClick}>
      <UserIcon />
      <span>Увійти</span>
    </a>
  )
}

/** FMN-18: responsive, sticky marketplace header. Auth can be wired in later via the user prop. */
export default function Navbar({ user = null }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuId = useId()

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="fmn-header">
      <div className="fmn-header-inner">
        <a className="fmn-brand" href="/" aria-label="FleaMarket NULP — на головну" onClick={closeMenu}>
          <span className="fmn-brand-icon"><GraduationCapIcon /></span>
          <span className="fmn-brand-name">FleaMarket <strong>NULP</strong></span>
        </a>

        <nav className="fmn-desktop-nav" aria-label="Основна навігація">
          {navigation.map((item) => (
            <a href={item.href} key={item.href}>{item.label}</a>
          ))}
        </nav>

        <SearchForm />

        <div className="fmn-desktop-actions">
          <a className="fmn-create" href="/create"><span aria-hidden="true">+</span> Подати оголошення</a>
          <AccountLink user={user} />
        </div>

        <button
          type="button"
          className="fmn-menu-toggle"
          aria-expanded={menuOpen}
          aria-controls={menuId}
          aria-label={menuOpen ? 'Закрити меню' : 'Відкрити меню'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span aria-hidden="true">{menuOpen ? '✕' : '☰'}</span>
        </button>
      </div>

      {menuOpen && (
        <nav className="fmn-mobile-menu" id={menuId} aria-label="Мобільна навігація">
          <SearchForm mobile />
          {navigation.map((item) => (
            <a href={item.href} key={item.href} onClick={closeMenu}>{item.label}</a>
          ))}
          <a className="fmn-create fmn-mobile-create" href="/create" onClick={closeMenu}>
            <span aria-hidden="true">+</span> Подати оголошення
          </a>
          <div className="fmn-mobile-account"><AccountLink user={user} onClick={closeMenu} /></div>
        </nav>
      )}
    </header>
  )
}

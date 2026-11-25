import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

/** Key shared with the future login implementation. */
export const AUTH_TOKEN_KEY = 'token'
const AUTH_USER_KEY = 'fmn:auth-user'

export type AuthUser = {
  name: string
  avatarUrl?: string
}

type AuthSession = {
  token: string
  user: AuthUser
}

type AuthContextValue = {
  user: AuthUser | null
  isAuthenticated: boolean
  signIn: (token: string, user: AuthUser) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

function readStoredSession(): AuthSession | null {
  if (typeof window === 'undefined') return null

  try {
    const token = localStorage.getItem(AUTH_TOKEN_KEY)
    const storedUser = localStorage.getItem(AUTH_USER_KEY)
    if (!token || !storedUser) return null

    const parsed: unknown = JSON.parse(storedUser)
    if (!parsed || typeof parsed !== 'object') return null

    const record = parsed as Record<string, unknown>
    if (typeof record.name !== 'string' || !record.name.trim()) return null

    return {
      token,
      user: {
        name: record.name.trim(),
        ...(typeof record.avatarUrl === 'string' && record.avatarUrl.trim()
          ? { avatarUrl: record.avatarUrl }
          : {}),
      },
    }
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(readStoredSession)

  const signIn = useCallback((token: string, user: AuthUser) => {
    const name = user.name.trim()
    if (!token.trim() || !name) {
      throw new Error('Для входу потрібні токен та ім’я користувача')
    }

    const nextSession: AuthSession = {
      token,
      user: { name, ...(user.avatarUrl ? { avatarUrl: user.avatarUrl } : {}) },
    }

    localStorage.setItem(AUTH_TOKEN_KEY, token)
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(nextSession.user))
    setSession(nextSession)
  }, [])

  const logout = useCallback(() => {
    try {
      localStorage.removeItem(AUTH_TOKEN_KEY)
      localStorage.removeItem(AUTH_USER_KEY)
    } finally {
      setSession(null)
    }
  }, [])

  useEffect(() => {
    const syncSession = (event: StorageEvent) => {
      if (
        event.key === null ||
        event.key === AUTH_TOKEN_KEY ||
        event.key === AUTH_USER_KEY
      ) {
        setSession(readStoredSession())
      }
    }

    window.addEventListener('storage', syncSession)
    return () => window.removeEventListener('storage', syncSession)
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user: session?.user ?? null,
      isAuthenticated: session !== null,
      signIn,
      logout,
    }),
    [session, signIn, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth має використовуватися всередині AuthProvider')
  }
  return context
}

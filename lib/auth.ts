import { jwtDecode } from 'jwt-decode'
import type { User, AuthSession, LoginRequest } from './types'

const STORAGE_KEY = 'soymax_auth_session'
const RESET_TOKEN_KEY = 'soymax_reset_token'

// Mock użytkownicy dla POC
const MOCK_USERS = [
  {
    id: 'dist-1',
    email: 'dist@soymax.pl',
    password: 'password123',
    firstName: 'Krzysztof',
    lastName: 'Malinowski',
    role: 'distributor' as const,
    companyName: 'AgroPartner Sp. z o.o.',
    companyId: 'dist-1',
    createdAt: '2024-03-15',
  },
  {
    id: 'admin-1',
    email: 'admin@soymax.pl',
    password: 'admin123',
    firstName: 'Jan',
    lastName: 'Admin',
    role: 'admin' as const,
    createdAt: '2024-01-01',
  },
  {
    id: 'sales-1',
    email: 'sales@soymax.pl',
    password: 'sales123',
    firstName: 'Anna',
    lastName: 'Kowalska',
    role: 'salesperson' as const,
    createdAt: '2024-02-15',
  },
]

// Generuj JWT token (mock)
function generateMockJWT(user: Omit<User, 'createdAt'> & { createdAt: string }): string {
  const payload = {
    sub: user.id,
    email: user.email,
    role: user.role,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // 24h
  }
  
  // Mock JWT - w produkcji byłby podpisany na backendzie
  return btoa(JSON.stringify(payload))
}

// Logowanie
export function login(request: LoginRequest): { session: AuthSession; error?: string } {
  const user = MOCK_USERS.find(u => u.email === request.email && u.password === request.password)
  
  if (!user) {
    return { session: null as any, error: 'Nieprawidłowe dane logowania' }
  }

  const { password, ...userWithoutPassword } = user
  const token = generateMockJWT(userWithoutPassword)
  
  const session: AuthSession = {
    token,
    expiresAt: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
    user: userWithoutPassword,
  }

  if (request.rememberMe) {
    saveSession(session)
  }

  return { session }
}

// Wylogowanie
export function logout(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(RESET_TOKEN_KEY)
  }
}

// Zapisz sesję
export function saveSession(session: AuthSession): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
  }
}

// Pobierz sesję
export function getSession(): AuthSession | null {
  if (typeof window === 'undefined') return null
  
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) return null

  const session = JSON.parse(stored) as AuthSession
  
  // Sprawdź czy token nie wygasł
  if (session.expiresAt < Math.floor(Date.now() / 1000)) {
    logout()
    return null
  }

  return session
}

// Czy zalogowany
export function isLoggedIn(): boolean {
  return !!getSession()
}

// Forgot password - generuj reset token
export function generateResetToken(email: string): { resetToken: string; error?: string } {
  const user = MOCK_USERS.find(u => u.email === email)
  
  if (!user) {
    return { resetToken: '', error: 'Email nie znaleziony' }
  }

  // Mock reset token
  const resetToken = btoa(JSON.stringify({
    email: user.email,
    timestamp: Date.now(),
    random: Math.random(),
  }))

  if (typeof window !== 'undefined') {
    localStorage.setItem(RESET_TOKEN_KEY, JSON.stringify({
      token: resetToken,
      email: user.email,
      expiresAt: Date.now() + 60 * 60 * 1000, // 1h
    }))
  }

  return { resetToken }
}

// Zweryfikuj reset token
export function verifyResetToken(token: string): { email: string; error?: string } {
  if (typeof window === 'undefined') return { email: '', error: 'Client-side only' }
  
  const stored = localStorage.getItem(RESET_TOKEN_KEY)
  if (!stored) return { email: '', error: 'Token wygasł' }

  const resetData = JSON.parse(stored)
  
  if (resetData.token !== token || resetData.expiresAt < Date.now()) {
    return { email: '', error: 'Token wygasł lub nieprawidłowy' }
  }

  return { email: resetData.email }
}

// Reset hasła
export function resetPassword(token: string, newPassword: string): { success: boolean; error?: string } {
  const { email, error } = verifyResetToken(token)
  
  if (error) return { success: false, error }

  // W POC tylko czyszczę token - w produkcji by to trafiło do bazy
  const user = MOCK_USERS.find(u => u.email === email)
  if (user) {
    user.password = newPassword
  }

  if (typeof window !== 'undefined') {
    localStorage.removeItem(RESET_TOKEN_KEY)
  }

  return { success: true }
}

// Pobierz bieżącego użytkownika
export function getCurrentUser(): User | null {
  const session = getSession()
  return session?.user || null
}

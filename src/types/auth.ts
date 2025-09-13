export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  avatar?: string
  createdAt: Date
  updatedAt: Date
}

export interface LoginCredentials {
  email: string
  password: string
  rememberMe?: boolean
}

export interface RegisterData {
  email: string
  password: string
  confirmPassword: string
  firstName: string
  lastName: string
  agreeToTerms: boolean
}

export interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  error: string | null
}

export interface AuthActions {
  login: (credentials: LoginCredentials) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  clearError: () => void
}

export interface OAuthProvider {
  id: 'google' | 'github' | 'linkedin'
  name: string
  icon: React.ComponentType<any>
  bgColor: string
  textColor: string
  hoverBg: string
}

export type AuthModalView = 'login' | 'register' | 'forgot-password' | 'social-auth'
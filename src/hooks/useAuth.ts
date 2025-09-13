import { create } from 'zustand'
import { AuthState, AuthActions, User, LoginCredentials, RegisterData } from '../types/auth'

interface AuthStore extends AuthState, AuthActions {}

// Mock authentication service (replace with real API calls)
const authService = {
  async login(credentials: LoginCredentials): Promise<User> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock validation
    if (credentials.email === 'test@example.com' && credentials.password === 'password123') {
      return {
        id: '1',
        email: credentials.email,
        firstName: 'John',
        lastName: 'Doe',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    }
    throw new Error('Invalid email or password')
  },
  
  async register(data: RegisterData): Promise<User> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    return {
      id: Math.random().toString(36).substr(2, 9),
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  },
  
  async logout(): Promise<void> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
  },
  
  async resetPassword(email: string): Promise<void> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
  }
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  isLoading: false,
  isAuthenticated: false,
  error: null,
  
  login: async (credentials: LoginCredentials) => {
    set({ isLoading: true, error: null })
    try {
      const user = await authService.login(credentials)
      set({ user, isAuthenticated: true, isLoading: false })
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Login failed', 
        isLoading: false 
      })
    }
  },
  
  register: async (data: RegisterData) => {
    set({ isLoading: true, error: null })
    try {
      const user = await authService.register(data)
      set({ user, isAuthenticated: true, isLoading: false })
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Registration failed', 
        isLoading: false 
      })
    }
  },
  
  logout: async () => {
    set({ isLoading: true })
    try {
      await authService.logout()
      set({ user: null, isAuthenticated: false, isLoading: false })
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Logout failed', 
        isLoading: false 
      })
    }
  },
  
  resetPassword: async (email: string) => {
    set({ isLoading: true, error: null })
    try {
      await authService.resetPassword(email)
      set({ isLoading: false })
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Password reset failed', 
        isLoading: false 
      })
    }
  },
  
  clearError: () => set({ error: null })
}))

// Custom hook for easier usage
export const useAuth = () => {
  const store = useAuthStore()
  return store
}
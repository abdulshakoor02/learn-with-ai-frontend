'use client'

import { createContext, useContext, useEffect } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { type AuthState, type AuthActions } from '../../types/auth'

interface AuthContextValue extends AuthState, AuthActions {
  // Additional context-specific methods can be added here
}

const AuthContext = createContext<AuthContextValue | null>(null)

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const auth = useAuth()

  // Initialize auth state on mount
  useEffect(() => {
    console.log('AuthProvider: Checking for existing auth token...')
    // Check for stored auth token or session
    const checkAuthState = async () => {
      try {
        // Only access localStorage on client side
        if (typeof window !== 'undefined') {
          const token = localStorage.getItem('auth_token')
          console.log('AuthProvider: Found token:', token)
          if (token) {
            // Restore user session from token
            console.log('AuthProvider: Restoring auth session from token...')
            // Extract user ID from token (mock implementation)
            const userId = token.replace('mock_token_', '')
            // Set authenticated state
            auth.setAuthenticated(true)
            // Create mock user data
            auth.setUser({
              id: userId,
              email: 'test@example.com',
              firstName: 'John',
              lastName: 'Doe',
              createdAt: new Date(),
              updatedAt: new Date()
            })
            console.log('AuthProvider: Auth state restored successfully')
          } else {
            console.log('AuthProvider: No token found')
          }
        } else {
          console.log('AuthProvider: localStorage not available (server-side)')
        }
      } catch (error) {
        console.error('Auth initialization error:', error)
        // Only try to clear token on client side
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth_token')
        }
      }
    }

    checkAuthState()
  }, [auth])

  // Store auth token when user logs in
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (auth.isAuthenticated && auth.user) {
        // In a real app, you'd store the actual token from the login response
        localStorage.setItem('auth_token', 'mock_token_' + auth.user.id)
        console.log('AuthProvider: Token stored in localStorage')
      } else {
        localStorage.removeItem('auth_token')
        console.log('AuthProvider: Token removed from localStorage')
      }
    }
  }, [auth.isAuthenticated, auth.user])

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
}
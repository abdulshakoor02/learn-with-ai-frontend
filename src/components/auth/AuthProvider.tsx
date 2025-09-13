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
    // Check for stored auth token or session
    const checkAuthState = async () => {
      try {
        const token = localStorage.getItem('auth_token')
        if (token) {
          // Validate token and restore user session
          // This would typically involve an API call
          console.log('Checking stored auth token...')
        }
      } catch (error) {
        console.error('Auth initialization error:', error)
        // Clear invalid token
        localStorage.removeItem('auth_token')
      }
    }

    checkAuthState()
  }, [])

  // Store auth token when user logs in
  useEffect(() => {
    if (auth.isAuthenticated && auth.user) {
      // In a real app, you'd store the actual token from the login response
      localStorage.setItem('auth_token', 'mock_token_' + auth.user.id)
    } else {
      localStorage.removeItem('auth_token')
    }
  }, [auth.isAuthenticated, auth.user])

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
}
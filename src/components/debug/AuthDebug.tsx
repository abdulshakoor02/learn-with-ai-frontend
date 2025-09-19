'use client'

import { useAuthContext } from '../auth/AuthProvider'
import { useEffect, useState } from 'react'

export const AuthDebug = () => {
  const { isAuthenticated, user, isLoading, error } = useAuthContext()
  const [token, setToken] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    setToken(localStorage.getItem('auth_token'))
  }, [])

  useEffect(() => {
    console.log('AuthDebug: Auth state changed:', {
      isAuthenticated,
      user,
      isLoading,
      error,
      token
    })
  }, [isAuthenticated, user, isLoading, error, token])

  const handleManualLogin = () => {
    console.log('Manual login test')
    localStorage.setItem('auth_token', 'mock_token_1')
    window.location.reload()
  }

  const handleManualLogout = () => {
    console.log('Manual logout test')
    localStorage.removeItem('auth_token')
    window.location.reload()
  }

  if (!isClient) {
    return null // Don't render on server
  }

  return (
    <div className="fixed top-20 right-4 z-50 glass-neutral p-4 rounded-lg text-xs text-white max-w-xs">
      <h3 className="font-bold mb-2">Auth Debug</h3>
      <div className="space-y-1">
        <div>Authenticated: {isAuthenticated ? '✅' : '❌'}</div>
        <div>Loading: {isLoading ? '⏳' : '✅'}</div>
        <div>Error: {error || 'None'}</div>
        <div>User: {user ? `${user.firstName} ${user.lastName}` : 'None'}</div>
        <div>Token: {token?.substring(0, 20) || 'None'}</div>
      </div>
      <div className="mt-2 space-x-2">
        <button 
          onClick={handleManualLogin}
          className="px-2 py-1 bg-green-500 text-white rounded text-xs"
        >
          Force Login
        </button>
        <button 
          onClick={handleManualLogout}
          className="px-2 py-1 bg-red-500 text-white rounded text-xs"
        >
          Force Logout
        </button>
      </div>
    </div>
  )
}
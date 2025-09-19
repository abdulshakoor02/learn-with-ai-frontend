import { getSession } from "next-auth/react"

// Extend NextAuth types
declare module "next-auth" {
  interface User {
    id?: string
    email?: string
    name?: string
    mobile?: string
    accessToken?: string
  }

  interface Session {
    user: {
      id: string
      email: string
      name: string
      mobile?: string
    }
    accessToken: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    email: string
    name: string
    mobile?: string
    accessToken: string
  }
}

// Note: Server-side auth should be handled through NextAuth's getServerSession
// This file provides client-side utilities

// Client-side auth helper
export { getSession }

// API request helper with auth
export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const session = await getSession()
  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  if (!apiUrl) {
    throw new Error('API URL not configured')
  }

  const url = endpoint.startsWith('http') ? endpoint : `${apiUrl}${endpoint}`

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  }

  // Add authorization header if session exists
  if (session?.accessToken) {
    (headers as Record<string, string>).Authorization = `Bearer ${session.accessToken}`
  }

  const response = await fetch(url, {
    ...options,
    headers,
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`API Error: ${response.status} - ${error}`)
  }

  return response.json()
}

// Helper to get authenticated API headers
export function getAuthHeaders(accessToken?: string): HeadersInit {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  }

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`
  }

  return headers
}

// Type definitions for backend API responses
export interface BackendUser {
  _id: string
  name: string
  email: string
  mobile: string
  createdAt: string
  updatedAt: string
}

export interface LoginResponse {
  access_token: string
}

// Custom hook types (for compatibility with existing code)
export interface AuthState {
  isAuthenticated: boolean
  user: {
    id: string
    email: string
    name: string
    mobile?: string
  } | null
  isLoading: boolean
}

// Error types
export class AuthError extends Error {
  constructor(message: string, public status?: number) {
    super(message)
    this.name = 'AuthError'
  }
}

export class UnauthorizedError extends AuthError {
  constructor(message = 'Unauthorized') {
    super(message, 401)
    this.name = 'UnauthorizedError'
  }
}
import { getSession } from 'next-auth/react'
import { UserData } from './authTypes'

export class AuthUtils {
  static getAccessToken(): string | null {
    if (typeof window === 'undefined') return null
    try {
      return localStorage.getItem('accessToken')
    } catch {
      return null
    }
  }

  static getUserData(): UserData | null {
    if (typeof window === 'undefined') return null
    const userData = localStorage.getItem('user')
    if (!userData) return null

    try {
      const parsed = JSON.parse(userData)
      // Ensure it has the required fields
      if (parsed?._id && parsed?.name && parsed?.email) {
        return parsed as UserData
      }
      return null
    } catch {
      return null
    }
  }

  static async getUserDataAsync(): Promise<UserData | null> {
    // Try localStorage first
    const localData = this.getUserData()
    if (localData) return localData

    // Try NextAuth session
    try {
      const session = await getSession()
      if (session?.user) {
        return {
          _id: session.user.id,
          name: session.user.name!,
          email: session.user.email!,
          mobile: session.user.mobile
        }
      }
    } catch (error) {
      console.warn('Failed to get NextAuth session:', error)
    }

    return null
  }

  static isAuthenticated(): boolean {
    return !!this.getAccessToken() || !!this.getUserData()
  }

  static async getCurrentUserId(): Promise<string | null> {
    const userData = await this.getUserDataAsync()
    return userData?._id || null
  }

  static getDemoUserData(): UserData {
    return {
      _id: 'demo-user-id',
      name: 'Demo User',
      email: 'demo@example.com',
      mobile: '+1234567890',
      createdAt: new Date().toISOString()
    }
  }
}
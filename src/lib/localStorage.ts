// Utility functions for managing localStorage operations

const ACCESS_TOKEN_KEY = 'accessToken';
const USER_KEY = 'user';

export interface StoredUser {
  id: string;
  email: string;
  name: string;
  mobile?: string;
}

/**
 * Store access token in localStorage
 */
export function storeAccessToken(token: string): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(ACCESS_TOKEN_KEY, token);
    } catch (error) {
      console.error('Failed to store access token:', error);
    }
  }
}

/**
 * Get access token from localStorage
 */
export function getAccessToken(): string | null {
  if (typeof window !== 'undefined') {
    try {
      return localStorage.getItem(ACCESS_TOKEN_KEY);
    } catch (error) {
      console.error('Failed to get access token:', error);
      return null;
    }
  }
  return null;
}

/**
 * Remove access token from localStorage
 */
export function removeAccessToken(): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
    } catch (error) {
      console.error('Failed to remove access token:', error);
    }
  }
}

/**
 * Store user data in localStorage
 */
export function storeUser(user: StoredUser): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (error) {
      console.error('Failed to store user data:', error);
    }
  }
}

/**
 * Get user data from localStorage
 */
export function getUser(): StoredUser | null {
  if (typeof window !== 'undefined') {
    try {
      const userData = localStorage.getItem(USER_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Failed to get user data:', error);
      return null;
    }
  }
  return null;
}

/**
 * Remove user data from localStorage
 */
export function removeUser(): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(USER_KEY);
    } catch (error) {
      console.error('Failed to remove user data:', error);
    }
  }
}

/**
 * Clear all authentication data from localStorage
 */
export function clearAuthData(): void {
  removeAccessToken();
  removeUser();
}

/**
 * Store complete authentication data (token + user)
 */
export function storeAuthData(token: string, user: StoredUser): void {
  storeAccessToken(token);
  storeUser(user);
}

/**
 * Get complete authentication data
 */
export function getAuthData(): { token: string | null; user: StoredUser | null } {
  return {
    token: getAccessToken(),
    user: getUser(),
  };
}

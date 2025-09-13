import { create } from 'zustand'
import { type AuthModalView } from '../types/auth'

interface UIState {
  // Modal states
  authModalOpen: boolean
  authModalView: AuthModalView
  
  // Navigation states
  mobileMenuOpen: boolean
  
  // Scroll states
  scrollY: number
  isScrolled: boolean
  
  // Theme states
  isDarkMode: boolean
  
  // Loading states
  isPageLoading: boolean
  isContentLoading: boolean
  
  // Notification states
  notifications: Notification[]
}

interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  duration?: number
  actions?: NotificationAction[]
}

interface NotificationAction {
  label: string
  action: () => void
  variant?: 'primary' | 'secondary'
}

interface UIActions {
  // Modal actions
  openAuthModal: (view?: AuthModalView) => void
  closeAuthModal: () => void
  setAuthModalView: (view: AuthModalView) => void
  
  // Navigation actions
  toggleMobileMenu: () => void
  closeMobileMenu: () => void
  
  // Scroll actions
  setScrollY: (y: number) => void
  setIsScrolled: (scrolled: boolean) => void
  
  // Theme actions
  toggleDarkMode: () => void
  setDarkMode: (isDark: boolean) => void
  
  // Loading actions
  setPageLoading: (loading: boolean) => void
  setContentLoading: (loading: boolean) => void
  
  // Notification actions
  addNotification: (notification: Omit<Notification, 'id'>) => void
  removeNotification: (id: string) => void
  clearNotifications: () => void
}

interface UIStore extends UIState, UIActions {}

export const useUIStore = create<UIStore>((set, get) => ({
  // Initial state
  authModalOpen: false,
  authModalView: 'login',
  mobileMenuOpen: false,
  scrollY: 0,
  isScrolled: false,
  isDarkMode: true, // Default to dark mode
  isPageLoading: false,
  isContentLoading: false,
  notifications: [],

  // Modal actions
  openAuthModal: (view = 'login') => {
    set({ 
      authModalOpen: true, 
      authModalView: view,
      mobileMenuOpen: false // Close mobile menu when opening auth modal
    })
  },
  
  closeAuthModal: () => {
    set({ authModalOpen: false })
  },
  
  setAuthModalView: (view) => {
    set({ authModalView: view })
  },

  // Navigation actions
  toggleMobileMenu: () => {
    set((state) => ({ 
      mobileMenuOpen: !state.mobileMenuOpen,
      authModalOpen: false // Close auth modal when opening mobile menu
    }))
  },
  
  closeMobileMenu: () => {
    set({ mobileMenuOpen: false })
  },

  // Scroll actions
  setScrollY: (y) => {
    set({ scrollY: y })
  },
  
  setIsScrolled: (scrolled) => {
    set({ isScrolled: scrolled })
  },

  // Theme actions
  toggleDarkMode: () => {
    set((state) => {
      const newMode = !state.isDarkMode
      // Persist theme preference
      if (typeof window !== 'undefined') {
        localStorage.setItem('darkMode', JSON.stringify(newMode))
        document.documentElement.classList.toggle('dark', newMode)
      }
      return { isDarkMode: newMode }
    })
  },
  
  setDarkMode: (isDark) => {
    set({ isDarkMode: isDark })
    if (typeof window !== 'undefined') {
      localStorage.setItem('darkMode', JSON.stringify(isDark))
      document.documentElement.classList.toggle('dark', isDark)
    }
  },

  // Loading actions
  setPageLoading: (loading) => {
    set({ isPageLoading: loading })
  },
  
  setContentLoading: (loading) => {
    set({ isContentLoading: loading })
  },

  // Notification actions
  addNotification: (notification) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newNotification = { ...notification, id }
    
    set((state) => ({
      notifications: [...state.notifications, newNotification]
    }))

    // Auto-remove notification after duration
    const duration = notification.duration || 5000
    setTimeout(() => {
      get().removeNotification(id)
    }, duration)
  },
  
  removeNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter(n => n.id !== id)
    }))
  },
  
  clearNotifications: () => {
    set({ notifications: [] })
  }
}))

// Custom hooks for easier usage
export const useAuthModal = () => {
  const store = useUIStore()
  return {
    isOpen: store.authModalOpen,
    view: store.authModalView,
    open: store.openAuthModal,
    close: store.closeAuthModal,
    setView: store.setAuthModalView
  }
}

export const useMobileMenu = () => {
  const store = useUIStore()
  return {
    isOpen: store.mobileMenuOpen,
    toggle: store.toggleMobileMenu,
    close: store.closeMobileMenu
  }
}

export const useScroll = () => {
  const store = useUIStore()
  return {
    scrollY: store.scrollY,
    isScrolled: store.isScrolled,
    setScrollY: store.setScrollY,
    setIsScrolled: store.setIsScrolled
  }
}

export const useTheme = () => {
  const store = useUIStore()
  return {
    isDarkMode: store.isDarkMode,
    toggle: store.toggleDarkMode,
    setDarkMode: store.setDarkMode
  }
}

export const useLoading = () => {
  const store = useUIStore()
  return {
    isPageLoading: store.isPageLoading,
    isContentLoading: store.isContentLoading,
    setPageLoading: store.setPageLoading,
    setContentLoading: store.setContentLoading
  }
}

export const useNotifications = () => {
  const store = useUIStore()
  return {
    notifications: store.notifications,
    add: store.addNotification,
    remove: store.removeNotification,
    clear: store.clearNotifications
  }
}
'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { ToastContainer, ToastProps, ToastType } from '../components/ui/Toast'

interface ToastWithId extends ToastProps {
  id: string
}

interface ToastContextType {
  showToast: (toast: Omit<ToastProps, 'id'>) => void
  showSuccess: (title: string, message?: string) => void
  showError: (title: string, message?: string) => void
  showWarning: (title: string, message?: string) => void
  showInfo: (title: string, message?: string) => void
  removeToast: (id: string) => void
  removeAllToasts: () => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

interface ToastProviderProps {
  children: ReactNode
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'
  maxToasts?: number
}

export const ToastProvider = ({ 
  children, 
  position = 'top-right', 
  maxToasts = 5 
}: ToastProviderProps) => {
  const [toasts, setToasts] = useState<ToastWithId[]>([])

  const generateId = useCallback(() => {
    return Math.random().toString(36).substr(2, 9) + Date.now().toString(36)
  }, [])

  const showToast = useCallback((toast: Omit<ToastProps, 'id'>) => {
    const id = generateId()
    const newToast: ToastWithId = { ...toast, id }
    
    setToasts(prevToasts => {
      const updatedToasts = [...prevToasts, newToast]
      // Limit the number of toasts
      if (updatedToasts.length > maxToasts) {
        return updatedToasts.slice(-maxToasts)
      }
      return updatedToasts
    })
  }, [generateId, maxToasts])

  const showSuccess = useCallback((title: string, message?: string) => {
    showToast({ type: 'success', title, message })
  }, [showToast])

  const showError = useCallback((title: string, message?: string) => {
    showToast({ type: 'error', title, message, duration: 7000 }) // Longer duration for errors
  }, [showToast])

  const showWarning = useCallback((title: string, message?: string) => {
    showToast({ type: 'warning', title, message })
  }, [showToast])

  const showInfo = useCallback((title: string, message?: string) => {
    showToast({ type: 'info', title, message })
  }, [showToast])

  const removeToast = useCallback((id: string) => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id))
  }, [])

  const removeAllToasts = useCallback(() => {
    setToasts([])
  }, [])

  const contextValue: ToastContextType = {
    showToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    removeToast,
    removeAllToasts,
  }

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastContainer 
        toasts={toasts} 
        onRemoveToast={removeToast} 
        position={position}
      />
    </ToastContext.Provider>
  )
}
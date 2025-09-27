'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  CheckCircleIcon, 
  XCircleIcon, 
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { cn } from '../../utils/cn'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface ToastProps {
  id?: string
  type: ToastType
  title: string
  message?: string
  duration?: number
  onClose?: () => void
}

export const Toast = ({ 
  id,
  type, 
  title, 
  message, 
  duration = 5000, 
  onClose 
}: ToastProps) => {
  const [isVisible, setIsVisible] = useState(true)
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose()
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [duration])

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsVisible(false)
      onClose?.()
    }, 300)
  }

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircleIcon className="w-5 h-5 text-green-400" />
      case 'error':
        return <XCircleIcon className="w-5 h-5 text-red-400" />
      case 'warning':
        return <ExclamationTriangleIcon className="w-5 h-5 text-yellow-400" />
      case 'info':
        return <InformationCircleIcon className="w-5 h-5 text-blue-400" />
    }
  }

  const getStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500/20 border-green-500/30 text-green-400'
      case 'error':
        return 'bg-red-500/20 border-red-500/30 text-red-400'
      case 'warning':
        return 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400'
      case 'info':
        return 'bg-blue-500/20 border-blue-500/30 text-blue-400'
    }
  }

  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 50 }}
      animate={{ 
        opacity: isClosing ? 0 : 1, 
        scale: isClosing ? 0.9 : 1,
        y: isClosing ? 20 : 0
      }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={cn(
        'glass-primary border rounded-xl p-4 max-w-md shadow-2xl backdrop-blur-xl',
        getStyles()
      )}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 mt-0.5">
          {getIcon()}
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-white text-sm">
            {title}
          </p>
          {message && (
            <p className="mt-1 text-sm text-white/80 leading-relaxed">
              {message}
            </p>
          )}
        </div>

        <button
          onClick={handleClose}
          className="flex-shrink-0 ml-2 p-1 rounded-md text-white/60 hover:text-white hover:bg-white/10 transition-colors duration-200"
        >
          <XMarkIcon className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  )
}

// Toast Container Component
export interface ToastContainerProps {
  toasts: (ToastProps & { id: string })[]
  onRemoveToast: (id: string) => void
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'
}

export const ToastContainer = ({ 
  toasts, 
  onRemoveToast, 
  position = 'top-right' 
}: ToastContainerProps) => {
  const getPositionStyles = () => {
    switch (position) {
      case 'top-right':
        return 'top-4 right-4'
      case 'top-left':
        return 'top-4 left-4'
      case 'bottom-right':
        return 'bottom-4 right-4'
      case 'bottom-left':
        return 'bottom-4 left-4'
      case 'top-center':
        return 'top-4 left-1/2 -translate-x-1/2'
      case 'bottom-center':
        return 'bottom-4 left-1/2 -translate-x-1/2'
    }
  }

  return (
    <div className={cn(
      'fixed z-[9999] pointer-events-none',
      getPositionStyles()
    )}>
      <div className="space-y-3 pointer-events-auto">
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              {...toast}
              onClose={() => onRemoveToast(toast.id)}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
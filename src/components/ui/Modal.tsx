'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { cn } from '../../utils/cn'
import { type ModalProps } from '../../types/components'
import { slideInModal } from '../../utils/animations'

export const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  className,
  closeOnOverlayClick = true,
  ...props 
}: ModalProps) => {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      onClose()
    }
  }

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <div className="fixed inset-0 z-90 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleOverlayClick}
          />
          
          {/* Modal Content */}
          <motion.div
            className={cn(
              'relative w-full max-w-md max-h-[90vh] overflow-y-auto',
              'glass-neutral p-6 rounded-2xl',
              'border border-white/20 shadow-2xl',
              className
            )}
            variants={slideInModal}
            initial="initial"
            animate="animate"
            exit="exit"
            {...props}
          >
            {/* Header */}
            {(title || onClose) && (
              <div className="flex items-center justify-between mb-6">
                {title && (
                  <h2 className="text-xl font-semibold text-white">
                    {title}
                  </h2>
                )}
                <button
                  onClick={onClose}
                  className="ml-auto p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors duration-200"
                  aria-label="Close modal"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
            )}
            
            {/* Content */}
            <div className="text-white/90">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

// Different modal sizes
export const SmallModal = (props: ModalProps) => (
  <Modal {...props} className={cn('max-w-sm', props.className)} />
)

export const MediumModal = (props: ModalProps) => (
  <Modal {...props} className={cn('max-w-md', props.className)} />
)

export const LargeModal = (props: ModalProps) => (
  <Modal {...props} className={cn('max-w-2xl', props.className)} />
)

export const FullScreenModal = (props: ModalProps) => (
  <Modal {...props} className={cn('max-w-6xl h-[90vh]', props.className)} />
)
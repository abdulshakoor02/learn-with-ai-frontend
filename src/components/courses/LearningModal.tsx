'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  XMarkIcon, 
  ArrowPathIcon,
  BookOpenIcon,
  VideoCameraIcon,
  AcademicCapIcon,
  ClipboardDocumentCheckIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline'

interface Module {
  id: string
  title: string
  duration: string
  type: 'video' | 'reading' | 'quiz' | 'assignment'
  completed: boolean
  locked: boolean
}

interface LearningModalProps {
  isOpen: boolean
  onClose: () => void
  module: Module | null
  content: string | null
  isLoading: boolean
  error: string | null
}

export const LearningModal = ({ 
  isOpen, 
  onClose, 
  module, 
  content, 
  isLoading, 
  error 
}: LearningModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null)

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  // Handle click outside modal
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  const getModuleIcon = (type: string) => {
    switch (type) {
      case 'video':
        return VideoCameraIcon
      case 'reading':
        return DocumentTextIcon
      case 'quiz':
        return AcademicCapIcon
      case 'assignment':
        return ClipboardDocumentCheckIcon
      default:
        return BookOpenIcon
    }
  }

  const getModuleColor = (type: string) => {
    switch (type) {
      case 'video':
        return 'text-purple-400 bg-purple-500/20 border-purple-500/30'
      case 'reading':
        return 'text-blue-400 bg-blue-500/20 border-blue-500/30'
      case 'quiz':
        return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30'
      case 'assignment':
        return 'text-green-400 bg-green-500/20 border-green-500/30'
      default:
        return 'text-gray-400 bg-gray-500/20 border-gray-500/30'
    }
  }

  const getModuleTypeLabel = (type: string) => {
    switch (type) {
      case 'video':
        return 'Video Lesson'
      case 'reading':
        return 'Reading Material'
      case 'quiz':
        return 'Quiz'
      case 'assignment':
        return 'Assignment'
      default:
        return 'Learning Material'
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="relative w-full max-w-4xl max-h-[90vh] glass-primary rounded-2xl overflow-hidden border border-white/20"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/20">
            <div className="flex items-center space-x-4">
              {module && (
                <>
                  <div className={`p-3 rounded-xl border ${getModuleColor(module.type)}`}>
                    {(() => {
                      const Icon = getModuleIcon(module.type)
                      return <Icon className="w-6 h-6" />
                    })()}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white line-clamp-1">
                      {module.title}
                    </h2>
                    <div className="flex items-center space-x-3 mt-1">
                      <span className="text-white/70 text-sm">
                        {getModuleTypeLabel(module.type)}
                      </span>
                      <span className="text-white/50">•</span>
                      <span className="text-white/70 text-sm">
                        {module.duration}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-xl transition-colors duration-200"
              aria-label="Close modal"
            >
              <XMarkIcon className="w-6 h-6 text-white/70 hover:text-white" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 max-h-[70vh] overflow-y-auto">
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-12 space-y-4"
              >
                <ArrowPathIcon className="w-12 h-12 text-purple-400 animate-spin" />
                <h3 className="text-xl font-semibold text-white">
                  Generating Learning Content
                </h3>
                <p className="text-white/70 text-center max-w-md">
                  Our AI is creating personalized learning material for "{module?.title}". This may take a few moments...
                </p>
              </motion.div>
            )}

            {error && !isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-12 space-y-4"
              >
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
                  <XMarkIcon className="w-8 h-8 text-red-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">
                  Unable to Generate Content
                </h3>
                <p className="text-red-400 text-center max-w-md">
                  {error}
                </p>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors duration-200"
                >
                  Close
                </button>
              </motion.div>
            )}

            {content && !isLoading && !error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="prose prose-invert max-w-none"
              >
                <div className="space-y-6">
                  {/* Format the content with proper styling */}
                  <div className="text-white/90 leading-relaxed whitespace-pre-wrap">
                    {content}
                  </div>
                </div>
              </motion.div>
            )}

            {!content && !isLoading && !error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-12 space-y-4"
              >
                <BookOpenIcon className="w-16 h-16 text-white/40" />
                <h3 className="text-xl font-semibold text-white">
                  Ready to Learn
                </h3>
                <p className="text-white/70 text-center max-w-md">
                  Click the start button to generate AI-powered learning content for this module.
                </p>
              </motion.div>
            )}
          </div>

          {/* Footer */}
          {content && !isLoading && !error && (
            <div className="flex items-center justify-between p-6 border-t border-white/20 bg-white/5">
              <div className="flex items-center space-x-2 text-sm text-white/70">
                <div className="w-2 h-2 bg-green-400 rounded-full" />
                <span>Content generated by AI</span>
              </div>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200 font-medium"
              >
                Continue Learning
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
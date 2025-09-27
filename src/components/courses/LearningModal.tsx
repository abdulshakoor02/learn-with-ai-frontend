'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  XMarkIcon, 
  ArrowPathIcon,
  BookOpenIcon,
  VideoCameraIcon,
  AcademicCapIcon,
  ClipboardDocumentCheckIcon,
  DocumentTextIcon,
  CheckIcon
} from '@heroicons/react/24/outline'
import { LearningPlansService } from '@/services/api'

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
  learningPlanId?: string
  topicTitle?: string
  phaseName?: string
  onTopicComplete?: (learningPlanId: string, topicTitle: string) => Promise<void>
  onPhaseComplete?: (learningPlanId: string, phaseName: string) => Promise<void>
}

export const LearningModal = ({ 
  isOpen, 
  onClose, 
  module, 
  content, 
  isLoading, 
  error,
  learningPlanId,
  topicTitle,
  phaseName,
  onTopicComplete,
  onPhaseComplete
}: LearningModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const [isCompleting, setIsCompleting] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [phaseCompleted, setPhaseCompleted] = useState(false)

  // Reset completion state when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsCompleted(false)
      setIsCompleting(false)
      setPhaseCompleted(false)
    }
  }, [isOpen])

  // Handle topic completion
  const handleComplete = async () => {
    if (!learningPlanId || !topicTitle) {
      console.error('Missing learningPlanId or topicTitle for completion')
      return
    }

    try {
      setIsCompleting(true)
      
      // Always make the API call to update the backend
      console.log('Making API call to update topic status...')
      console.log('Learning Plan ID:', learningPlanId)
      console.log('Topic Title:', topicTitle)
      
      const response = await LearningPlansService.updateTopicStatus(learningPlanId, topicTitle, true)
      console.log('Topic Update API Response:', response)
      
      setIsCompleted(true)
      
      // Check if we should also update phase status
      if (phaseName && response) {
        console.log('Checking if phase should be completed...')
        await checkAndUpdatePhaseCompletion(response)
      }
      
      // If there's a callback, use it for additional UI updates (like optimistic updates)
      if (onTopicComplete) {
        try {
          await onTopicComplete(learningPlanId, topicTitle)
        } catch (callbackError) {
          console.warn('Callback failed, but API call succeeded:', callbackError)
        }
      }
      
      // Auto-close modal after a short delay (longer if phase was also completed)
      setTimeout(() => {
        onClose()
      }, phaseCompleted ? 2500 : 1500)
    } catch (error) {
      console.error('Failed to complete topic:', error)
      // You might want to show an error toast here
    } finally {
      setIsCompleting(false)
    }
  }

  // Check if all topics in the phase are complete, and if so, mark phase as complete
  const checkAndUpdatePhaseCompletion = async (updatedLearningPlan: any) => {
    if (!phaseName || !learningPlanId) return
    
    try {
      // Find the current phase in the updated learning plan
      const currentPhase = updatedLearningPlan.phases?.find((phase: any) => phase.focus === phaseName)
      
      if (currentPhase && currentPhase.topics) {
        // Check if all topics in this phase are completed
        const allTopicsCompleted = currentPhase.topics.every((topic: any) => 
          topic.status === true || topic.status === 'true'
        )
        
        console.log(`Phase "${phaseName}" - All topics completed:`, allTopicsCompleted)
        
        if (allTopicsCompleted && !currentPhase.status) {
          console.log(`Updating phase "${phaseName}" status to complete...`)
          
          // Update phase status
          const phaseResponse = await LearningPlansService.updatePhaseStatus(
            learningPlanId, 
            phaseName, 
            true
          )
          
          console.log('Phase Update API Response:', phaseResponse)
          setPhaseCompleted(true)
          
          // Call phase completion callback if provided
          if (onPhaseComplete) {
            try {
              await onPhaseComplete(learningPlanId, phaseName)
            } catch (callbackError) {
              console.warn('Phase completion callback failed:', callbackError)
            }
          }
        }
      }
    } catch (error) {
      console.error('Failed to check/update phase completion:', error)
    }
  }

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
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
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
          className="relative w-full max-w-4xl max-h-[90vh] sm:max-h-[85vh] glass-primary rounded-2xl border border-white/20 flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/20 flex-shrink-0">
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
          <div className="p-4 sm:p-6 flex-1 overflow-y-auto min-h-0">
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
            <div className="flex items-center justify-between p-4 sm:p-6 border-t border-white/20 bg-white/5 flex-shrink-0">
              <div className="flex items-center space-x-2 text-sm text-white/70">
                <div className={`w-2 h-2 rounded-full ${
                  phaseCompleted ? 'bg-yellow-400' : isCompleted ? 'bg-green-400' : 'bg-blue-400'
                }`} />
                <span>
                  {phaseCompleted 
                    ? `Phase "${phaseName}" completed! 🎉` 
                    : isCompleted 
                    ? 'Topic completed!' 
                    : 'Content generated by AI'
                  }
                </span>
              </div>
              {learningPlanId && topicTitle ? (
                <button
                  onClick={handleComplete}
                  disabled={isCompleting || isCompleted}
                  className={`px-4 py-2 rounded-lg transition-all duration-200 font-medium flex items-center space-x-2 ${
                    isCompleted
                      ? 'bg-green-500 text-white'
                      : isCompleting
                      ? 'bg-gray-500 text-white cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600'
                  }`}
                >
                  {isCompleting ? (
                    <>
                      <ArrowPathIcon className="w-4 h-4 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : isCompleted ? (
                    <>
                      <CheckIcon className="w-4 h-4" />
                      <span>Completed</span>
                    </>
                  ) : (
                    <span>Save & Continue</span>
                  )}
                </button>
              ) : (
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200 font-medium"
                >
                  Continue Learning
                </button>
              )}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

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
import '@/styles/ios-modal-fixes.css'

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
  const [isIOS, setIsIOS] = useState(false)
  
  // iOS-specific touch handler that works around Safari touch issues
  const createIOSTouchHandler = (callback: () => void) => {
    return (e: TouchEvent | React.TouchEvent) => {
      e.preventDefault()
      e.stopPropagation()
      
      // Add a small delay to ensure touch event is properly registered
      setTimeout(() => {
        callback()
      }, 50)
    }
  }

  // Detect iOS device
  useEffect(() => {
    const checkIOS = () => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
      return /iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream;
    }
    const isIOSDevice = checkIOS()
    setIsIOS(isIOSDevice)
    
    // Debug logging for iOS
    if (isIOSDevice) {
      console.log('iOS device detected, applying iOS-specific fixes')
      console.log('Viewport dimensions:', window.innerWidth, 'x', window.innerHeight)
      console.log('Orientation:', window.innerHeight > window.innerWidth ? 'Portrait' : 'Landscape')
      console.log('Device pixel ratio:', window.devicePixelRatio)
      
      // Add viewport meta tag fix for iOS if not present
      let viewportMeta = document.querySelector('meta[name="viewport"]') as HTMLMetaElement
      if (!viewportMeta) {
        viewportMeta = document.createElement('meta')
        viewportMeta.name = 'viewport'
        document.head.appendChild(viewportMeta)
      }
      viewportMeta.content = 'width=device-width, initial-scale=1.0, user-scalable=no, viewport-fit=cover'
    }
  }, [])

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
      // Only close on backdrop click, not when clicking outside modal container
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        // Check if the click was on the backdrop area specifically
        const target = e.target as Element
        if (target.classList.contains('modal-backdrop-mobile') || 
            target.closest('.modal-container-mobile') === e.currentTarget) {
          onClose()
        }
      }
    }
    
    const handleTouchOutside = (e: TouchEvent) => {
      // Handle touch events for iOS
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        const target = e.target as Element
        if (target.classList.contains('modal-backdrop-mobile')) {
          onClose()
        }
      }
    }

    if (isOpen) {
      // Use different event listeners for different platforms
      if (isIOS) {
        document.addEventListener('touchend', handleTouchOutside)
      } else {
        document.addEventListener('mousedown', handleClickOutside)
      }
      
      // Different approach for mobile vs desktop
      const isMobile = window.innerWidth < 768
      
      if (isMobile) {
        // On mobile: Only prevent horizontal overflow and elastic bouncing
        document.body.style.overflowX = 'hidden'
        document.body.style.position = 'relative'
        // Allow vertical scrolling on mobile so users can reposition the modal
      } else {
        // On desktop: Use the fixed position approach to prevent background scrolling
        const scrollY = window.scrollY
        document.body.style.position = 'fixed'
        document.body.style.top = `-${scrollY}px`
        document.body.style.width = '100%'
        document.body.style.overflow = 'hidden'
        document.body.setAttribute('data-scroll-y', scrollY.toString())
      }
    }

    return () => {
      if (isIOS) {
        document.removeEventListener('touchend', handleTouchOutside)
      } else {
        document.removeEventListener('mousedown', handleClickOutside)
      }
      
      // Restore body styles
      const isMobile = window.innerWidth < 768
      const scrollY = document.body.getAttribute('data-scroll-y')
      
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
      document.body.style.overflowX = ''
      
      if (!isMobile && scrollY) {
        window.scrollTo(0, parseInt(scrollY))
        document.body.removeAttribute('data-scroll-y')
      }
    }
  }, [isOpen, onClose, isIOS])

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
        className="fixed inset-0 z-50 flex justify-center p-4 sm:p-6 modal-container-mobile"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 modal-backdrop-mobile"
          style={{
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)', // iOS Safari specific
            transform: 'translateZ(0)', // Force hardware layer
            WebkitTransform: 'translateZ(0)',
            pointerEvents: 'auto', // Ensure backdrop can receive events
            touchAction: 'none' // Prevent iOS scroll during backdrop interaction
          }}
          onClick={(e) => {
            // Only close if clicking directly on backdrop, not on modal content
            if (e.target === e.currentTarget) {
              onClose()
            }
          }}
          onTouchStart={(e) => {
            // Prevent iOS touch issues with backdrop
            if (e.target === e.currentTarget) {
              e.stopPropagation()
            }
          }}
        />

        {/* Modal */}
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={`relative w-full max-w-4xl glass-primary rounded-2xl border border-white/20 flex flex-col overflow-hidden modal-mobile modal-content-mobile ${isIOS ? 'ios-modal-fix ios-portrait-fix' : ''}`}
          style={{
            height: isIOS && window.innerHeight > window.innerWidth ? '80vh' : '70vh',
            maxHeight: isIOS && window.innerHeight > window.innerWidth ? '80vh' : '70vh',
            margin: isIOS ? '10vh auto' : '4vh auto 0',
            transform: 'translate3d(0, 0, 0)', // Force 3D transform for iOS
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            WebkitTransform: 'translate3d(0, 0, 0)',
            isolation: 'isolate',
            willChange: 'transform',
            pointerEvents: 'auto',
            touchAction: 'pan-y',
            contain: 'layout style paint'
          }}
          onTouchStart={(e) => {
            e.stopPropagation()
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-3 sm:p-4 md:p-6 border-b border-white/20 flex-shrink-0 modal-header-mobile">
            <div className="flex items-center space-x-2 sm:space-x-4 flex-1 min-w-0">
              {module && (
                <>
                  <div className={`p-2 sm:p-3 rounded-xl border ${getModuleColor(module.type)} flex-shrink-0`}>
                    {(() => {
                      const Icon = getModuleIcon(module.type)
                      return <Icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                    })()}
                  </div>
                  <div className="min-w-0 flex-1 pr-2">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white line-clamp-1">
                      {module.title}
                    </h2>
                    <div className="flex items-center space-x-2 sm:space-x-3 mt-1">
                      <span className="text-white/70 text-xs sm:text-sm">
                        {getModuleTypeLabel(module.type)}
                      </span>
                      <span className="text-white/50">•</span>
                      <span className="text-white/70 text-xs sm:text-sm">
                        {module.duration}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                console.log('Close button clicked')
                onClose()
              }}
              onTouchEnd={isIOS ? createIOSTouchHandler(() => {
                console.log('Close button touch end (iOS)')
                onClose()
              }) : (e) => {
                e.preventDefault()
                e.stopPropagation()
                console.log('Close button touch end')
                onClose()
              }}
              onTouchStart={(e) => {
                e.preventDefault()
                e.stopPropagation()
                console.log('Close button touch start')
              }}
              className={`p-2 hover:bg-white/10 rounded-xl transition-colors duration-200 flex-shrink-0 touch-target mobile-close-fix ${isIOS ? 'ios-button-fix' : ''}`}
              aria-label="Close modal"
              style={{
                minWidth: isIOS ? '54px' : '48px',
                minHeight: isIOS ? '54px' : '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 99999,
                position: 'relative',
                backgroundColor: isIOS ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0.4)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '12px',
                transform: 'translate3d(0, 0, 0)',
                WebkitTransform: 'translate3d(0, 0, 0)',
                isolation: 'isolate',
                willChange: 'transform',
                pointerEvents: 'auto',
                touchAction: 'manipulation',
                WebkitTouchCallout: 'none',
                WebkitUserSelect: 'none',
                userSelect: 'none',
                WebkitAppearance: 'none',
                cursor: 'pointer',
                opacity: 1,
                visibility: 'visible'
              }}
            >
              <XMarkIcon 
                className="w-5 h-5 sm:w-6 sm:h-6 text-white hover:text-white" 
                style={{
                  filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.5))',
                  transform: 'translateZ(0)',
                  WebkitTransform: 'translateZ(0)'
                }}
              />
            </button>
          </div>

          {/* Content */}
          <div className="p-3 sm:p-4 md:p-6 flex-1 overflow-y-auto min-h-0 modal-scroll-fix">
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-8 sm:py-12 space-y-4"
              >
                <ArrowPathIcon className="w-10 h-10 sm:w-12 sm:h-12 text-purple-400 animate-spin" />
                <h3 className="text-lg sm:text-xl font-semibold text-white">
                  Generating Learning Content
                </h3>
                <p className="text-white/70 text-center max-w-md text-sm sm:text-base px-4">
                  Our AI is creating personalized learning material for "{module?.title}". This may take a few moments...
                </p>
              </motion.div>
            )}

            {error && !isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-8 sm:py-12 space-y-4"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-500/20 rounded-full flex items-center justify-center">
                  <XMarkIcon className="w-6 h-6 sm:w-8 sm:h-8 text-red-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white">
                  Unable to Generate Content
                </h3>
                <p className="text-red-400 text-center max-w-md text-sm sm:text-base px-4">
                  {error}
                </p>
                <button
                  onClick={onClose}
                  className="touch-target px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors duration-200 text-sm sm:text-base"
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
                <div className="space-y-4 sm:space-y-6">
                  {/* Format the content with proper styling */}
                  <div className="text-white/90 leading-relaxed whitespace-pre-wrap text-sm sm:text-base">
                    {content}
                  </div>
                </div>
              </motion.div>
            )}

            {!content && !isLoading && !error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-8 sm:py-12 space-y-4"
              >
                <BookOpenIcon className="w-12 h-12 sm:w-16 sm:h-16 text-white/40" />
                <h3 className="text-lg sm:text-xl font-semibold text-white">
                  Ready to Learn
                </h3>
                <p className="text-white/70 text-center max-w-md text-sm sm:text-base px-4">
                  Click the start button to generate AI-powered learning content for this module.
                </p>
              </motion.div>
            )}
          </div>

          {/* Footer */}
          {content && !isLoading && !error && (
            <div 
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 p-3 sm:p-4 md:p-6 border-t border-white/20 flex-shrink-0 mobile-button-fix"
              style={{
                position: 'sticky',
                bottom: 0,
                zIndex: 999,
                minHeight: '60px',
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                transform: 'translateZ(0)',
                WebkitTransform: 'translateZ(0)',
                isolation: 'isolate',
                willChange: 'transform'
              }}
            >
              <div className="flex items-center space-x-2 text-xs sm:text-sm text-white/90">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                  phaseCompleted ? 'bg-yellow-400' : isCompleted ? 'bg-green-400' : 'bg-blue-400'
                }`} />
                <span className="line-clamp-1">
                  {phaseCompleted 
                    ? `Phase completed! 🎉` 
                    : isCompleted 
                    ? 'Topic completed!' 
                    : 'AI generated'
                  }
                </span>
              </div>
              {learningPlanId && topicTitle ? (
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    if (!isCompleting && !isCompleted) {
                      console.log('Save button clicked')
                      handleComplete()
                    }
                  }}
                  onTouchEnd={isIOS ? createIOSTouchHandler(() => {
                    console.log('Save button touch end (iOS)')
                    if (!isCompleting && !isCompleted) {
                      handleComplete()
                    }
                  }) : (e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    console.log('Save button touch end')
                    if (!isCompleting && !isCompleted) {
                      handleComplete()
                    }
                  }}
                  onTouchStart={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    console.log('Save button touch start')
                  }}
                  disabled={isCompleting || isCompleted}
                  className={`touch-target px-4 py-3 rounded-lg transition-all duration-200 font-medium flex items-center justify-center space-x-2 text-sm sm:text-base w-full sm:w-auto shadow-lg ${isIOS ? 'ios-button-fix' : ''} ${
                    isCompleted
                      ? 'bg-green-600 text-white border border-green-400'
                      : isCompleting
                      ? 'bg-gray-600 text-white cursor-not-allowed border border-gray-400'
                      : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 border border-purple-400'
                  }`}
                  style={{
                    minHeight: isIOS ? '54px' : '48px',
                    zIndex: 99999,
                    position: 'relative',
                    transform: 'translate3d(0, 0, 0)',
                    WebkitTransform: 'translate3d(0, 0, 0)',
                    isolation: 'isolate',
                    willChange: 'transform',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2)',
                    pointerEvents: isCompleting || isCompleted ? 'none' : 'auto',
                    touchAction: 'manipulation',
                    WebkitTouchCallout: 'none',
                    WebkitUserSelect: 'none',
                    userSelect: 'none',
                    WebkitAppearance: 'none',
                    cursor: isCompleting || isCompleted ? 'default' : 'pointer',
                    opacity: 1,
                    visibility: 'visible'
                  }}
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
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    console.log('Continue button clicked')
                    onClose()
                  }}
                  onTouchEnd={isIOS ? createIOSTouchHandler(() => {
                    console.log('Continue button touch end (iOS)')
                    onClose()
                  }) : (e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    console.log('Continue button touch end')
                    onClose()
                  }}
                  onTouchStart={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    console.log('Continue button touch start')
                  }}
                  className={`touch-target px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-medium text-sm sm:text-base w-full sm:w-auto shadow-lg border border-purple-400 ${isIOS ? 'ios-button-fix' : ''}`}
                  style={{
                    minHeight: isIOS ? '54px' : '48px',
                    zIndex: 99999,
                    position: 'relative',
                    transform: 'translate3d(0, 0, 0)',
                    WebkitTransform: 'translate3d(0, 0, 0)',
                    isolation: 'isolate',
                    willChange: 'transform',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2)',
                    pointerEvents: 'auto',
                    touchAction: 'manipulation',
                    WebkitTouchCallout: 'none',
                    WebkitUserSelect: 'none',
                    userSelect: 'none',
                    WebkitAppearance: 'none',
                    cursor: 'pointer',
                    opacity: 1,
                    visibility: 'visible'
                  }}
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

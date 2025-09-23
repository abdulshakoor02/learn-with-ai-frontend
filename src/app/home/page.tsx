'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { EnhancedChatInterface } from '@/components/chat/EnhancedChatInterface'
import { SparklesIcon, StarIcon } from '@heroicons/react/24/outline'
import { LearningPlanData } from '@/lib/hooks'
import { AuthUtils } from '@/services/authUtils'
import { useRouter } from 'next/navigation'
import { LearningPlansService } from '@/services/api'

export default function HomePage() {
  const [learningGoals, setLearningGoals] = useState<string[]>([])
  const [selectedPlan, setSelectedPlan] = useState<LearningPlanData | null>(null)
  const [createdPlan, setCreatedPlan] = useState<LearningPlanData | null>(null)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isCreating, setIsCreating] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated on mount
    const checkAuth = async () => {
      const userData = await AuthUtils.getUserDataAsync()
      if (!userData) {
        // Redirect to login if not authenticated
        router.push('/home/login')
        return
      }
      setCurrentUser(userData)
      setIsLoading(false)
    }

    checkAuth()
  }, [router])

  const handleChatComplete = (goals: string[]) => {
    setLearningGoals(goals)
  }

  const handleLearningPlanGenerated = async (plan: LearningPlanData) => {
    setCreatedPlan(plan)
    setIsCreating(true)
    
    try {
      // Save the learning plan to the backend
      const savedPlan = await LearningPlansService.createLearningPlan(plan)
      console.log('Learning plan created successfully:', savedPlan)
      
      // Show success message briefly then redirect to courses
      setTimeout(() => {
        router.push('/home/courses')
      }, 2000)
      
    } catch (error) {
      console.error('Failed to create learning plan:', error)
      setIsCreating(false)
      // Still redirect to courses even if save failed - user can see the plan there
      setTimeout(() => {
        router.push('/home/courses')
      }, 2000)
    }
  }

  const handleLearningPlanSelected = (plan: LearningPlanData) => {
    setSelectedPlan(plan)
    console.log('Learning plan selected:', plan)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-white/70">Loading...</p>
        </div>
      </div>
    )
  }

  if (!currentUser) {
    return null // Will be redirected
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold gradient-text mb-4">
            Welcome to Your Learning Journey
          </h1>
          <p className="text-xl text-white/80">
            Let's start by understanding your learning goals
          </p>
          {currentUser && (
            <div className="mt-2 text-sm text-white/70">
              Welcome back, {currentUser.name}!
            </div>
          )}
          {createdPlan && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 p-4 glass-secondary rounded-xl border border-white/20 inline-block"
            >
              <div className="flex items-center space-x-2 text-sm text-white/70">
                <StarIcon className="w-4 h-4 text-yellow-400" />
                <span>Plan Generated: <strong className="text-white">{createdPlan.title || 'Learning Plan'}</strong></span>
              </div>
            </motion.div>
          )}
          {isCreating && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 p-4 glass-accent rounded-xl border border-green-500/30"
            >
              <div className="flex items-center space-x-2 text-green-400 text-sm">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-400"></div>
                <span>Saving your learning plan and redirecting to courses...</span>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Content Area - Always show chat interface */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center"
        >
          <div className="w-full max-w-3xl space-y-6">
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-4"
              >
                <SparklesIcon className="w-8 h-8 text-white" />
              </motion.div>
              <h2 className="text-2xl font-semibold text-white mb-2">
                What would you like to learn today?
              </h2>
              <p className="text-white/70">
                Our AI assistant will create a personalized learning path just for you.
              </p>
            </div>
            <EnhancedChatInterface
              onComplete={handleChatComplete}
              onLearningPlanGenerated={handleLearningPlanGenerated}
              onLearningPlanSelected={handleLearningPlanSelected}
            />
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => router.push('/home/courses')}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:from-purple-600 hover:to-blue-600 transition-all duration-200 flex items-center space-x-2"
            >
              <StarIcon className="w-5 h-5" />
              <span>View My Learning Plans</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { EnhancedChatInterface } from '@/components/chat/EnhancedChatInterface'
import { LearningTimeline } from '@/components/timeline/LearningTimeline'
import { SparklesIcon, StarIcon } from '@heroicons/react/24/outline'
import { LearningPlanData } from '@/lib/hooks'
import { AuthUtils } from '@/services/authUtils'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const [showTimeline, setShowTimeline] = useState(false)
  const [learningGoals, setLearningGoals] = useState<string[]>([])
  const [selectedPlan, setSelectedPlan] = useState<LearningPlanData | null>(null)
  const [createdPlan, setCreatedPlan] = useState<LearningPlanData | null>(null)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
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
    setShowTimeline(true)
  }

  const handleLearningPlanGenerated = (plan: LearningPlanData) => {
    setCreatedPlan(plan)
    console.log('Learning plan generated:', plan)
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
            {showTimeline
              ? "Here's your personalized learning timeline"
              : "Let's start by understanding your learning goals"
            }
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
                <span>Plan Generated: <strong className="text-white">{createdPlan.title}</strong></span>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          {!showTimeline ? (
            <motion.div
              key="chat"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
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
          ) : (
            <motion.div
              key="timeline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <LearningTimeline
                goals={learningGoals}
                selectedLearningPlan={selectedPlan}
                onPlanUpdate={(plan) => {
                  setSelectedPlan(plan)
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
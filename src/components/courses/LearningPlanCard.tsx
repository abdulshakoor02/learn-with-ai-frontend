'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { StarIcon, ClockIcon, UsersIcon, PlayIcon, CheckCircleIcon, BookOpenIcon, TrophyIcon, SparklesIcon } from '@heroicons/react/24/outline'
import { StarIcon as StarSolidIcon, PlayIcon as PlaySolidIcon } from '@heroicons/react/24/solid'
import { LearningPlanData, LearningPhase } from '@/lib/hooks'

interface LearningPlanCardProps {
  plan: LearningPlanData & {
    id: string
    progress?: number
    enrolled?: number
    rating?: number
  }
  onClick?: () => void
}

export const LearningPlanCard = ({ plan, onClick }: LearningPlanCardProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const [showPhases, setShowPhases] = useState(false)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'intermediate':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'advanced':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      default:
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <div key={index} className="relative">
        <StarIcon className="w-4 h-4 text-white/30" />
        {index < Math.floor(rating) && (
          <StarSolidIcon className="absolute top-0 left-0 w-4 h-4 text-yellow-400" />
        )}
        {index === Math.floor(rating) && rating % 1 !== 0 && (
          <div className="absolute top-0 left-0 overflow-hidden" style={{ width: `${(rating % 1) * 100}%` }}>
            <StarSolidIcon className="w-4 h-4 text-yellow-400" />
          </div>
        )}
      </div>
    ))
  }

  const totalTopics = plan.phases?.reduce((sum, phase) => sum + phase.topics.length, 0) || 0
  const difficultyMap = {
    'beginner': 'bg-green-500/20 text-green-400',
    'intermediate': 'bg-yellow-500/20 text-yellow-400',
    'advanced': 'bg-red-500/20 text-red-400'
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      className="h-full cursor-pointer"
    >
      <div className="h-full glass-secondary rounded-2xl overflow-hidden group hover:glass-accent transition-all duration-300">
          {/* Header Section - No Course Image */}
          <div className="relative h-24 sm:h-32 bg-gradient-to-br from-purple-600/30 to-blue-600/30">
            {/* AI Generated Badge */}
            <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
              <span className="px-2 py-1 sm:px-3 sm:py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs sm:text-sm rounded-full border border-white/30 flex items-center space-x-1 sm:space-x-2">
                <SparklesIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden xs:inline">AI Generated</span>
                <span className="xs:hidden">AI</span>
              </span>
            </div>

            {/* Difficulty Badge */}
            <div className="absolute top-2 sm:top-4 right-2 sm:right-4">
              <span className={`px-2 py-1 sm:px-3 sm:py-1 backdrop-blur-md text-xs sm:text-sm rounded-full border bg-white/20 ${getDifficultyColor(plan.phases?.length > 4 ? 'advanced' : plan.phases?.length > 2 ? 'intermediate' : 'beginner')}`}>
                <span className="hidden xs:inline">{plan.phases?.length > 4 ? 'Advanced' : plan.phases?.length > 2 ? 'Intermediate' : 'Beginner'}</span>
                <span className="xs:hidden">{plan.phases?.length > 4 ? 'Adv' : plan.phases?.length > 2 ? 'Int' : 'Beg'}</span>
              </span>
            </div>

            {/* Progress Indicator */}
            {plan.progress && plan.progress > 0 && (
              <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4">
                <div className="bg-black/50 backdrop-blur-md rounded-full p-1.5 sm:p-2">
                  <div className="flex items-center justify-between text-white text-xs mb-1">
                    <span>Progress</span>
                    <span>{plan.progress}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-1">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-blue-500 h-1 rounded-full transition-all duration-500"
                      style={{ width: `${plan.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Learning Path Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-4xl opacity-30">📚</div>
            </div>
          </div>

          {/* Course Content */}
          <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
            {/* Title and Duration */}
            <div className="flex items-start justify-between">
              <div className="flex-1 pr-2">
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-1.5 sm:mb-2 group-hover:gradient-text-primary transition-all duration-300 line-clamp-2">
                  {plan.title}
                </h3>
                <div className="flex items-center space-x-1.5 sm:space-x-2 text-white/70 text-xs sm:text-sm">
                  <ClockIcon className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span>{plan.duration}</span>
                  <span className="text-white/40">•</span>
                  <span>{plan.phases?.length || 0} phases</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-white/70 text-xs sm:text-sm line-clamp-2 sm:line-clamp-3">
              {plan.phases
                ? `A comprehensive ${plan.duration} learning plan with ${plan.phases.length} phases covering ${plan.prerequisites?.length || 0} prerequisites. Focus areas include: ${plan.phases.map(p => p.focus).join(', ')}.`
                : `A comprehensive learning plan with structured phases and practical topics.`
              }
            </p>

            {/* Phases Preview */}
            {plan.phases && plan.phases.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs sm:text-sm font-medium text-white/80">Learning Phases:</h4>
                  <button
                    onClick={(e) => {
                      e.preventDefault() // Prevent navigation
                      setShowPhases(!showPhases)
                    }}
                    className="text-xs text-purple-400 hover:text-purple-300 transition-colors touch-target"
                  >
                    {showPhases ? 'Show Less' : `Show ${plan.phases.length} Phases`}
                  </button>
                </div>

                <div className={`space-y-2 transition-all duration-300 ${showPhases ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                  {plan.phases.map((phase, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 bg-white/5 rounded-lg border border-white/10">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-white text-xs sm:text-sm font-medium truncate pr-2">{phase.focus}</span>
                          <span className="text-white/60 text-xs flex-shrink-0">{phase.duration}</span>
                        </div>
                        <div className="text-white/50 text-xs line-clamp-1">
                          {phase.topics.join(', ')}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Prerequisites */}
            {plan.prerequisites && plan.prerequisites.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs sm:text-sm font-medium text-white/80">Prerequisites:</h4>
                <div className="flex flex-wrap gap-1">
                  {plan.prerequisites.slice(0, 3).map((prereq, index) => (
                    <span
                      key={index}
                      className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-blue-500/20 text-blue-300 text-xs rounded-lg border border-blue-500/30"
                    >
                      {prereq.length > 15 ? `${prereq.substring(0, 12)}...` : prereq}
                    </span>
                  ))}
                  {plan.prerequisites.length > 3 && (
                    <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-white/10 text-white/60 text-xs rounded-lg border border-white/30">
                      +{plan.prerequisites.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Learning Statistics */}
            <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-white/20">
              <div className="flex items-center space-x-2 sm:space-x-4">
                {/* Learning Path Indicator */}
                <div className="flex items-center space-x-1">
                  <BookOpenIcon className="w-3 h-3 sm:w-4 sm:h-4 text-white/60 flex-shrink-0" />
                  <span className="text-white/70 text-xs sm:text-sm">{totalTopics} topics</span>
                </div>

                {/* Duration */}
                <div className="flex items-center space-x-1">
                  <ClockIcon className="w-4 h-4 text-white/60" />
                  <span className="text-white/70 text-sm">{plan.duration}</span>
                </div>

                {/* Learning Stages */}
                <div className="flex items-center space-x-1">
                  <TrophyIcon className="w-4 h-4 text-white/60" />
                  <span className="text-white/70 text-sm">{plan.phases?.length || 0} stages</span>
                </div>
              </div>

              {/* Action Icon */}
              <div className={`p-2 rounded-full transition-all duration-300 ${
                isHovered
                  ? 'bg-gradient-to-br from-purple-500 to-blue-500 text-white scale-110'
                  : 'bg-white/10 text-white/60'
              }`}>
                {plan.progress && plan.progress > 0 ? (
                  <CheckCircleIcon className="w-5 h-5" />
                ) : (
                  <PlayIcon className="w-5 h-5" />
                )}
              </div>
            </div>
          </div>
        </div>
    </motion.div>
  )
}
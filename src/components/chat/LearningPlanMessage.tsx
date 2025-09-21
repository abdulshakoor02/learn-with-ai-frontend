'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { CheckIcon, XMarkIcon, ChartBarIcon, ClockIcon, BookOpenIcon } from '@heroicons/react/24/outline'
import { LearningPlanData } from '@/lib/hooks'

interface LearningPlanMessageProps {
  plan: LearningPlanData
  onApprove: () => void
  onReject: () => void
  onEdit: (plan: LearningPlanData) => void
  isLoading?: boolean
}

export const LearningPlanMessage = ({
  plan,
  onApprove,
  onReject,
  onEdit,
  isLoading = false
}: LearningPlanMessageProps) => {
  const totalTopics = plan.phases.reduce((acc, phase) => acc + phase.topics.length, 0)
  const totalPhases = plan.phases.length

  const StatCard = ({ icon: Icon, label, value, color }: { icon: any, label: string, value: string, color: string }) => (
    <div className={`glass-secondary rounded-xl p-4 border border-white/20 ${color}`}>
      <div className="flex items-center space-x-3 mb-2">
        <Icon className="w-5 h-5 opacity-70" />
        <span className="text-sm font-medium">{label}</span>
      </div>
      <div className="text-lg font-bold">{value}</div>
    </div>
  )

  const PhaseCard = ({ phase, index }: { phase: any, index: number }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="glass-secondary rounded-xl p-4 border border-white/20"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
            {index + 1}
          </div>
          <h4 className="font-semibold">{phase.focus}</h4>
        </div>
        <div className="flex items-center space-x-2 text-sm text-white/70">
          <ClockIcon className="w-4 h-4" />
          <span>{phase.duration}</span>
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium">Topics covered:</p>
        <div className="flex flex-wrap gap-2">
          {phase.topics.map((topic: string, topicIndex: number) => (
            <span
              key={topicIndex}
              className="px-3 py-1 bg-white/10 rounded-full text-xs border border-white/20"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-secondary rounded-xl p-6 border border-white/20 backdrop-blur-md"
    >
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            {plan.title}
          </h3>
          <div className="flex items-center space-x-2">
            <CheckIcon className="w-5 h-5 text-green-400" />
            <span className="text-sm text-white/70">Generated Plan</span>
          </div>
        </div>
        <p className="text-white/80 leading-relaxed">{plan.duration} comprehensive learning path</p>
      </div>

      {/* Interactive Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard
          icon={BookOpenIcon}
          label="Total Topics"
          value={`${totalTopics}`}
          color="from-blue-500/20 to-cyan-500/20"
        />
        <StatCard
          icon={ChartBarIcon}
          label="Learning Phases"
          value={`${totalPhases} phases`}
          color="from-purple-500/20 to-pink-500/20"
        />
        <StatCard
          icon={ClockIcon}
          label="Total Duration"
          value={plan.duration}
          color="from-orange-500/20 to-red-500/20"
        />
      </div>

      {/* Prerequisites */}
      {plan.prerequisites.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-secondary rounded-xl p-4 mb-6 border border-white/20"
        >
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-2 h-2 bg-yellow-400 rounded-full" />
            <h4 className="font-semibold">Prerequisites</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {plan.prerequisites.map((prereq, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-xs border border-yellow-500/30"
              >
                {prereq}
              </span>
            ))}
          </div>
        </motion.div>
      )}

      {/* Projected Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
          <h4 className="font-semibold">Learning Path</h4>
        </div>
        <div className="space-y-4">
          {plan.phases.map((phase, index) => (
            <PhaseCard key={index} phase={phase} index={index} />
          ))}
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="border-t border-white/20 pt-4"
      >
        {isLoading ? (
          <div className="flex items-center justify-center py-3">
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
            </div>
            <span className="text-purple-400 ml-3">Processing...</span>
          </div>
        ) : (
          <div className="flex flex-wrap gap-3">
            <button
              onClick={onApprove}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <CheckIcon className="w-4 h-4" />
              <span>Start This Plan</span>
            </button>
            <button
              onClick={onEdit}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 transform hover:scale-105"
            >
              <ChartBarIcon className="w-4 h-4" />
              <span>Customize</span>
            </button>
            <button
              onClick={onReject}
              className="flex items-center space-x-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all duration-200 border border-white/20"
            >
              <XMarkIcon className="w-4 h-4" />
              <span>Try Again</span>
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

// Compact preview component for chat bubbles
export const LearningPlanPreview = ({ plan }: { plan: LearningPlanData }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="glass-secondary rounded-xl p-4 border border-white/20 backdrop-blur-md max-w-md"
  >
    <div className="flex items-center space-x-3 mb-3">
      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
        <CheckIcon className="w-4 h-4 text-white" />
      </div>
      <div>
        <h4 className="font-semibold text-white">{plan.title}</h4>
        <p className="text-sm text-white/70">{plan.duration} plan</p>
      </div>
    </div>
    <div className="flex items-center justify-between text-sm text-white/70 mb-3">
      <span>{plan.phases.length} phases</span>
      <span>•</span>
      <span>{plan.phases.reduce((acc, phase) => acc + phase.topics.length, 0)} topics</span>
      <span>•</span>
      <span>{plan.prerequisites.length} prereqs</span>
    </div>
    <div className="text-xs text-white/50">
      View below for full details and customization options
    </div>
  </motion.div>
)
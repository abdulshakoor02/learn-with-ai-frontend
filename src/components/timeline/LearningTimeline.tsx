'use client'

import { motion } from 'framer-motion'
import { CheckCircleIcon, ClockIcon, PlayCircleIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import { CheckCircleIcon as CheckCircleSolid } from '@heroicons/react/24/solid'

interface LearningGoal {
  id: string
  title: string
  description: string
  status: 'completed' | 'in-progress' | 'upcoming' | 'locked'
  estimatedHours: number
  completedHours?: number
  modules: LearningModule[]
}

interface LearningModule {
  id: string
  title: string
  duration: string
  status: 'completed' | 'in-progress' | 'upcoming'
}

interface LearningTimelineProps {
  goals: string[]
}

export const LearningTimeline = ({ goals }: LearningTimelineProps) => {
  // Mock data for demonstration
  const learningPath: LearningGoal[] = [
    {
      id: '1',
      title: 'Foundation Concepts',
      description: 'Master the fundamental principles and core concepts',
      status: 'completed',
      estimatedHours: 20,
      completedHours: 20,
      modules: [
        { id: '1-1', title: 'Introduction to Core Concepts', duration: '2 hours', status: 'completed' },
        { id: '1-2', title: 'Basic Principles', duration: '3 hours', status: 'completed' },
        { id: '1-3', title: 'Fundamental Theories', duration: '4 hours', status: 'completed' },
      ]
    },
    {
      id: '2',
      title: 'Intermediate Skills',
      description: 'Develop practical skills and apply concepts',
      status: 'in-progress',
      estimatedHours: 35,
      completedHours: 15,
      modules: [
        { id: '2-1', title: 'Practical Applications', duration: '5 hours', status: 'completed' },
        { id: '2-2', title: 'Skill Building Workshop', duration: '6 hours', status: 'in-progress' },
        { id: '2-3', title: 'Advanced Techniques', duration: '8 hours', status: 'upcoming' },
        { id: '2-4', title: 'Problem Solving', duration: '4 hours', status: 'upcoming' },
      ]
    },
    {
      id: '3',
      title: 'Advanced Mastery',
      description: 'Achieve expertise through complex projects',
      status: 'upcoming',
      estimatedHours: 45,
      modules: [
        { id: '3-1', title: 'Complex Problem Solving', duration: '10 hours', status: 'upcoming' },
        { id: '3-2', title: 'Project-Based Learning', duration: '15 hours', status: 'upcoming' },
        { id: '3-3', title: 'Advanced Applications', duration: '12 hours', status: 'upcoming' },
        { id: '3-4', title: 'Mastery Assessment', duration: '8 hours', status: 'upcoming' },
      ]
    },
    {
      id: '4',
      title: 'Professional Certification',
      description: 'Complete certification and demonstrate mastery',
      status: 'locked',
      estimatedHours: 25,
      modules: [
        { id: '4-1', title: 'Certification Prep', duration: '10 hours', status: 'upcoming' },
        { id: '4-2', title: 'Final Assessment', duration: '8 hours', status: 'upcoming' },
        { id: '4-3', title: 'Portfolio Review', duration: '4 hours', status: 'upcoming' },
        { id: '4-4', title: 'Professional Certification', duration: '3 hours', status: 'upcoming' },
      ]
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleSolid className="w-6 h-6 text-green-400" />
      case 'in-progress':
        return <PlayCircleIcon className="w-6 h-6 text-blue-400" />
      case 'upcoming':
        return <ClockIcon className="w-6 h-6 text-yellow-400" />
      case 'locked':
        return <LockClosedIcon className="w-6 h-6 text-gray-400" />
      default:
        return <ClockIcon className="w-6 h-6 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'border-green-500 bg-green-500/10'
      case 'in-progress':
        return 'border-blue-500 bg-blue-500/10'
      case 'upcoming':
        return 'border-yellow-500 bg-yellow-500/10'
      case 'locked':
        return 'border-gray-500 bg-gray-500/10'
      default:
        return 'border-gray-500 bg-gray-500/10'
    }
  }

  return (
    <div className="space-y-8">
      {/* Progress Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-primary p-6 rounded-2xl"
      >
        <h2 className="text-2xl font-bold text-white mb-4">Your Learning Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text">25%</div>
            <div className="text-white/70">Complete</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text">35</div>
            <div className="text-white/70">Hours Completed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text">125</div>
            <div className="text-white/70">Total Hours</div>
          </div>
        </div>
      </motion.div>

      {/* Learning Timeline */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white">Your Learning Path</h2>
        
        {learningPath.map((goal, index) => (
          <motion.div
            key={goal.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`glass-secondary p-6 rounded-2xl border-l-4 ${getStatusColor(goal.status)}`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                {getStatusIcon(goal.status)}
                <div>
                  <h3 className="text-xl font-semibold text-white">{goal.title}</h3>
                  <p className="text-white/70">{goal.description}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold gradient-text">
                  {goal.completedHours || 0}/{goal.estimatedHours}h
                </div>
                <div className="text-sm text-white/60">Estimated</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-sm text-white/70 mb-2">
                <span>Progress</span>
                <span>{Math.round(((goal.completedHours || 0) / goal.estimatedHours) * 100)}%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${
                    goal.status === 'completed' ? 'bg-green-500' :
                    goal.status === 'in-progress' ? 'bg-blue-500' :
                    'bg-gray-500'
                  }`}
                  style={{ width: `${Math.round(((goal.completedHours || 0) / goal.estimatedHours) * 100)}%` }}
                />
              </div>
            </div>

            {/* Modules */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-white/80">Modules:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {goal.modules.map((module) => (
                  <div
                    key={module.id}
                    className="flex items-center justify-between p-2 bg-white/5 rounded-lg"
                  >
                    <div className="flex items-center space-x-2">
                      {module.status === 'completed' && <CheckCircleSolid className="w-4 h-4 text-green-400" />}
                      {module.status === 'in-progress' && <div className="w-4 h-4 border-2 border-blue-400 rounded-full border-t-transparent animate-spin" />}
                      {module.status === 'upcoming' && <ClockIcon className="w-4 h-4 text-yellow-400" />}
                      <span className="text-sm text-white">{module.title}</span>
                    </div>
                    <span className="text-xs text-white/60">{module.duration}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Button */}
            {goal.status === 'in-progress' && (
              <button className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200">
                Continue Learning
              </button>
            )}
            {goal.status === 'upcoming' && (
              <button className="mt-4 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all duration-200">
                Start Goal
              </button>
            )}
            {goal.status === 'locked' && (
              <div className="mt-4 text-sm text-gray-400 flex items-center space-x-2">
                <LockClosedIcon className="w-4 h-4" />
                <span>Complete previous goals to unlock</span>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-accent p-6 rounded-2xl"
      >
        <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 bg-white/10 hover:bg-white/20 rounded-xl text-white text-center transition-all duration-200">
            <div className="text-2xl mb-2">📚</div>
            <div className="font-medium">Browse Courses</div>
            <div className="text-sm text-white/70">Find new topics</div>
          </button>
          <button className="p-4 bg-white/10 hover:bg-white/20 rounded-xl text-white text-center transition-all duration-200">
            <div className="text-2xl mb-2">🎯</div>
            <div className="font-medium">Set New Goals</div>
            <div className="text-sm text-white/70">Update learning path</div>
          </button>
          <button className="p-4 bg-white/10 hover:bg-white/20 rounded-xl text-white text-center transition-all duration-200">
            <div className="text-2xl mb-2">📊</div>
            <div className="font-medium">View Analytics</div>
            <div className="text-sm text-white/70">Track progress</div>
          </button>
        </div>
      </motion.div>
    </div>
  )
}

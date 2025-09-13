'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChatBubbleLeftRightIcon,
  ChartBarIcon,
  BookOpenIcon,
  AcademicCapIcon,
  ClockIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'
import { GlassCard } from '../ui'

const demoData = {
  currentLesson: {
    title: "Introduction to Machine Learning",
    progress: 75,
    timeRemaining: "8 minutes left",
    difficulty: "Intermediate"
  },
  aiInsights: [
    "You're performing 20% better than average",
    "Consider reviewing linear algebra concepts",
    "Great progress on data visualization!",
    "Ready for advanced topics"
  ],
  recentActivity: [
    { subject: "Python Basics", score: 95, time: "2h ago" },
    { subject: "Data Structures", score: 88, time: "1d ago" },
    { subject: "Algorithms", score: 92, time: "2d ago" }
  ],
  achievements: [
    { name: "Quick Learner", icon: "⚡", unlocked: true },
    { name: "Problem Solver", icon: "🧩", unlocked: true },
    { name: "Data Expert", icon: "📊", unlocked: false },
    { name: "AI Pioneer", icon: "🤖", unlocked: false }
  ]
}

export const HeroDemo = () => {
  const [activeTab, setActiveTab] = useState(0)
  const [currentInsight, setCurrentInsight] = useState(0)
  const [animatedProgress, setAnimatedProgress] = useState(0)

  const tabs = [
    { name: 'Dashboard', icon: ChartBarIcon },
    { name: 'Learning', icon: BookOpenIcon },
    { name: 'Progress', icon: AcademicCapIcon },
    { name: 'AI Chat', icon: ChatBubbleLeftRightIcon }
  ]

  // Cycle through AI insights
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentInsight((prev) => (prev + 1) % demoData.aiInsights.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Animate progress bar
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(demoData.currentLesson.progress)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
    >
      {/* Main Demo Window */}
      <GlassCard
        variant="neutral"
        blur="lg"
        opacity={0.95}
        className="p-1 rounded-3xl border border-white/20 shadow-2xl shadow-primary-500/10"
      >
        {/* Window Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
          <div className="text-white/60 text-sm font-medium">LearnAI Dashboard</div>
          <div className="w-12"></div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-white/10">
          {tabs.map((tab, index) => (
            <motion.button
              key={tab.name}
              onClick={() => setActiveTab(index)}
              className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 text-sm font-medium transition-all duration-300 ${
                activeTab === index
                  ? 'text-primary-400 border-b-2 border-primary-400 bg-primary-500 bg-opacity-10'
                  : 'text-white/60 hover:text-white/80'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <tab.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.name}</span>
            </motion.button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6 h-96 overflow-hidden">
          <AnimatePresence mode="wait">
            {/* Dashboard Tab */}
            {activeTab === 0 && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {/* Current Lesson Card */}
                <GlassCard variant="primary" blur="md" opacity={0.8} className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-white font-semibold">
                        {demoData.currentLesson.title}
                      </h3>
                      <p className="text-white/60 text-sm">
                        {demoData.currentLesson.difficulty}
                      </p>
                    </div>
                    <ClockIcon className="w-5 h-5 text-accent-400" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/80">Progress</span>
                      <span className="text-primary-400 font-medium">
                        {animatedProgress}%
                      </span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-primary-400 to-blue-400 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${animatedProgress}%` }}
                        transition={{ duration: 1.5, ease: 'easeOut' }}
                      />
                    </div>
                    <p className="text-white/60 text-sm">
                      {demoData.currentLesson.timeRemaining}
                    </p>
                  </div>
                </GlassCard>

                {/* Recent Activity */}
                <div className="space-y-3">
                  <h4 className="text-white font-medium">Recent Activity</h4>
                  {demoData.recentActivity.map((activity, index) => (
                    <motion.div
                      key={activity.subject}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 glass-neutral rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <CheckCircleIcon className="w-5 h-5 text-green-400" />
                        <div>
                          <p className="text-white text-sm font-medium">
                            {activity.subject}
                          </p>
                          <p className="text-white/60 text-xs">{activity.time}</p>
                        </div>
                      </div>
                      <div className="text-green-400 font-semibold">
                        {activity.score}%
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Learning Tab */}
            {activeTab === 1 && (
              <motion.div
                key="learning"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="text-center space-y-4">
                  <motion.div
                    className="w-24 h-24 mx-auto glass-primary rounded-2xl flex items-center justify-center"
                    animate={{ 
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  >
                    <BookOpenIcon className="w-12 h-12 text-primary-400" />
                  </motion.div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Interactive Learning
                    </h3>
                    <p className="text-white/70">
                      Experience hands-on tutorials, code challenges, and real-world projects.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-6">
                    {['Video Lessons', 'Code Practice', 'Quizzes', 'Projects'].map((item, index) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-3 glass-secondary rounded-lg text-center"
                      >
                        <div className="text-blue-400 text-sm font-medium">
                          {item}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Progress Tab */}
            {activeTab === 2 && (
              <motion.div
                key="progress"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Your Achievements
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {demoData.achievements.map((achievement, index) => (
                      <motion.div
                        key={achievement.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-4 rounded-xl text-center ${
                          achievement.unlocked 
                            ? 'glass-accent' 
                            : 'glass-neutral opacity-50'
                        }`}
                      >
                        <div className="text-2xl mb-2">{achievement.icon}</div>
                        <div className={`text-sm font-medium ${
                          achievement.unlocked ? 'text-accent-400' : 'text-white/40'
                        }`}>
                          {achievement.name}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* AI Chat Tab */}
            {activeTab === 3 && (
              <motion.div
                key="ai-chat"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="text-center space-y-4">
                  <motion.div
                    className="w-16 h-16 mx-auto glass-primary rounded-xl flex items-center justify-center"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  >
                    🤖
                  </motion.div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      AI Learning Assistant
                    </h3>
                    
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentInsight}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.5 }}
                        className="glass-primary p-4 rounded-xl"
                      >
                        <p className="text-primary-400 font-medium">
                          "{demoData.aiInsights[currentInsight]}"
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <div className="flex justify-center space-x-1 mt-4">
                    {demoData.aiInsights.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                          index === currentInsight ? 'bg-primary-400' : 'bg-white/30'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </GlassCard>
    </motion.div>
  )
}
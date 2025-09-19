'use client'

import { motion } from 'framer-motion'
import { 
  ChartBarIcon, 
  ClockIcon, 
  AcademicCapIcon, 
  TrophyIcon,
  CheckCircleIcon,
  PlayCircleIcon
} from '@heroicons/react/24/outline'

interface CourseStatsProps {
  course: {
    duration: string
    rating: number
    enrolled: number
    progress?: number
  }
}

export const CourseStats = ({ course }: CourseStatsProps) => {
  const stats = [
    {
      icon: ChartBarIcon,
      label: 'Progress',
      value: `${course.progress || 0}%`,
      color: 'from-purple-500 to-blue-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30'
    },
    {
      icon: ClockIcon,
      label: 'Estimated Time',
      value: course.duration,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30'
    },
    {
      icon: AcademicCapIcon,
      label: 'Rating',
      value: course.rating.toString(),
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/30'
    },
    {
      icon: TrophyIcon,
      label: 'Students',
      value: course.enrolled.toLocaleString(),
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30'
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass-accent p-6 rounded-2xl"
    >
      <h3 className="text-xl font-bold text-white mb-6">Course Statistics</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`${stat.bgColor} border ${stat.borderColor} rounded-xl p-4 text-center`}
          >
            <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-white/70 text-sm">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Additional Metrics */}
      <div className="mt-6 pt-6 border-t border-white/20">
        <h4 className="text-lg font-semibold text-white mb-4">Learning Metrics</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
            <PlayCircleIcon className="w-5 h-5 text-purple-400" />
            <div>
              <div className="text-white font-medium">Video Content</div>
              <div className="text-white/70 text-sm">12 hours of video</div>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
            <CheckCircleIcon className="w-5 h-5 text-green-400" />
            <div>
              <div className="text-white font-medium">Hands-on Projects</div>
              <div className="text-white/70 text-sm">8 practical assignments</div>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
            <AcademicCapIcon className="w-5 h-5 text-blue-400" />
            <div>
              <div className="text-white font-medium">Certificate</div>
              <div className="text-white/70 text-sm">Upon completion</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

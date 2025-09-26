'use client'

import { motion } from 'framer-motion'
import { StarIcon, ClockIcon, UsersIcon, BookOpenIcon, AcademicCapIcon, CodeBracketIcon, ChartBarIcon } from '@heroicons/react/24/outline'

interface Instructor {
  name: string
  avatar: string
  bio: string
  title: string
}

interface CourseHeaderProps {
  course: {
    title: string
    description: string
    longDescription: string
    image?: string
    category: string
    difficulty: string
    duration: string
    rating: number
    reviews: number
    enrolled: number
    progress?: number
    tags: string[]
    instructor: Instructor
  }
}

export const CourseHeader = ({ course }: CourseHeaderProps) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <div key={index} className="relative">
        <StarIcon className="w-5 h-5 text-white/30" />
        {index < Math.floor(rating) && (
          <div className="absolute inset-0 overflow-hidden" style={{ width: '100%' }}>
            <div className="text-yellow-400">★</div>
          </div>
        )}
        {index === Math.floor(rating) && rating % 1 !== 0 && (
          <div className="absolute inset-0 overflow-hidden" style={{ width: `${(rating % 1) * 100}%` }}>
            <div className="text-yellow-400">★</div>
          </div>
        )}
      </div>
    ))
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'intermediate':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'advanced':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  // Generate generic gradient based on course title for consistent visual identity
  const getGenericImage = () => {
    const gradients = [
      'bg-gradient-to-br from-purple-600 to-blue-600',
      'bg-gradient-to-br from-pink-600 to-purple-600',
      'bg-gradient-to-br from-blue-600 to-cyan-600',
      'bg-gradient-to-br from-green-600 to-blue-600',
      'bg-gradient-to-br from-orange-600 to-red-600',
      'bg-gradient-to-br from-indigo-600 to-purple-600',
    ]
    
    // Simple hash function to consistently select a gradient based on course title
    const hash = course.title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return gradients[hash % gradients.length]
  }

  // Generic icons for different course categories
  const getCategoryIcon = () => {
    const icons = {
      'Learning Path': AcademicCapIcon,
      'Data Science': ChartBarIcon,
      'Programming': CodeBracketIcon,
      'Machine Learning': ChartBarIcon,
      'Web Development': CodeBracketIcon,
      'default': AcademicCapIcon
    }
    
    return icons[course.category as keyof typeof icons] || icons.default
  }

  const IconComponent = getCategoryIcon()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-primary rounded-2xl overflow-hidden"
    >
      <div className="flex flex-col lg:flex-row">
        {/* Course Image/Placeholder */}
        <div className={`lg:w-1/3 h-64 lg:h-auto relative overflow-hidden ${getGenericImage()}`}>
          {/* Generic Icon in Center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <IconComponent className="w-24 h-24 text-white/40" />
          </div>
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          
          {/* Progress Overlay */}
          {course.progress && course.progress > 0 && (
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-black/50 backdrop-blur-md rounded-xl p-4">
                <div className="flex items-center justify-between text-white mb-2">
                  <span className="font-medium">Your Progress</span>
                  <span className="font-bold">{course.progress}%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Course Info */}
        <div className="lg:w-2/3 p-8 space-y-6">
          {/* Title and Category */}
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-sm rounded-full border border-white/30">
                {course.category}
              </span>
              <span className={`px-3 py-1 text-sm rounded-full border ${getDifficultyColor(course.difficulty)}`}>
                {course.difficulty}
              </span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold gradient-text mb-3">
              {course.title}
            </h1>
            <p className="text-white/80 text-lg">
              {course.description}
            </p>
          </div>

          {/* Instructor */}
          <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl border border-white/10">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <span className="text-white font-bold text-lg">
                {course.instructor.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </span>
            </div>
            <div>
              <h3 className="text-white font-semibold">{course.instructor.name}</h3>
              <p className="text-white/70 text-sm">{course.instructor.title}</p>
            </div>
          </div>

          {/* Course Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Rating */}
            <div className="glass-neutral p-4 rounded-xl text-center">
              <div className="flex justify-center mb-2">
                {renderStars(course.rating)}
              </div>
              <div className="text-2xl font-bold text-white">{course.rating}</div>
              <div className="text-white/70 text-sm">({course.reviews} reviews)</div>
            </div>

            {/* Duration */}
            <div className="glass-neutral p-4 rounded-xl text-center">
              <ClockIcon className="w-8 h-8 text-white/60 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{course.duration}</div>
              <div className="text-white/70 text-sm">Duration</div>
            </div>

            {/* Enrolled */}
            <div className="glass-neutral p-4 rounded-xl text-center">
              <UsersIcon className="w-8 h-8 text-white/60 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{course.enrolled.toLocaleString()}</div>
              <div className="text-white/70 text-sm">Enrolled</div>
            </div>

            {/* Modules */}
            <div className="glass-neutral p-4 rounded-xl text-center">
              <BookOpenIcon className="w-8 h-8 text-white/60 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">
                {course.sections?.reduce((total, section) => total + section.modules.length, 0) || course.phases?.reduce((total, phase) => total + (phase.topics?.length || 0), 0) || 0}
              </div>
              <div className="text-white/70 text-sm">Modules</div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {course.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-white/10 text-white/80 text-sm rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-200"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

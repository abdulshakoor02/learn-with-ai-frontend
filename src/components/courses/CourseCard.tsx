'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { StarIcon, ClockIcon, UsersIcon, PlayIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid'

interface Course {
  id: string
  title: string
  description: string
  image: string
  category: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  duration: string
  rating: number
  enrolled: number
  progress?: number
  tags: string[]
  instructor: {
    name: string
    avatar: string
  }
}

interface CourseCardProps {
  course: Course
}

export const CourseCard = ({ course }: CourseCardProps) => {
  const [isHovered, setIsHovered] = useState(false)

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

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="h-full"
    >
      <Link href={`/home/courses/${course.id}`}>
        <div className="h-full glass-secondary rounded-2xl overflow-hidden group hover:glass-accent transition-all duration-300">
          {/* Course Image */}
          <div className="relative h-48 overflow-hidden">
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            
            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-sm rounded-full border border-white/30">
                {course.category}
              </span>
            </div>

            {/* Difficulty Badge */}
            <div className="absolute top-4 right-4">
              <span className={`px-3 py-1 backdrop-blur-md text-sm rounded-full border ${getDifficultyColor(course.difficulty)}`}>
                {course.difficulty}
              </span>
            </div>

            {/* Progress Indicator */}
            {course.progress && course.progress > 0 && (
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-black/50 backdrop-blur-md rounded-full p-2">
                  <div className="flex items-center justify-between text-white text-xs mb-1">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-1">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-blue-500 h-1 rounded-full transition-all duration-500"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Course Content */}
          <div className="p-6 space-y-4">
            {/* Title and Description */}
            <div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:gradient-text-primary transition-all duration-300">
                {course.title}
              </h3>
              <p className="text-white/70 text-sm line-clamp-2">
                {course.description}
              </p>
            </div>

            {/* Instructor */}
            <div className="flex items-center space-x-3">
              <img
                src={course.instructor.avatar}
                alt={course.instructor.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="text-white/80 text-sm font-medium">
                {course.instructor.name}
              </span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {course.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-white/10 text-white/70 text-xs rounded-lg border border-white/20"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Course Stats */}
            <div className="flex items-center justify-between pt-4 border-t border-white/20">
              <div className="flex items-center space-x-4">
                {/* Rating */}
                <div className="flex items-center space-x-1">
                  {renderStars(course.rating)}
                  <span className="text-white/70 text-sm ml-1">{course.rating}</span>
                </div>

                {/* Duration */}
                <div className="flex items-center space-x-1">
                  <ClockIcon className="w-4 h-4 text-white/60" />
                  <span className="text-white/70 text-sm">{course.duration}</span>
                </div>

                {/* Enrolled */}
                <div className="flex items-center space-x-1">
                  <UsersIcon className="w-4 h-4 text-white/60" />
                  <span className="text-white/70 text-sm">{course.enrolled.toLocaleString()}</span>
                </div>
              </div>

              {/* Action Icon */}
              <div className={`p-2 rounded-full transition-all duration-300 ${
                isHovered 
                  ? 'bg-gradient-to-br from-purple-500 to-blue-500 text-white scale-110' 
                  : 'bg-white/10 text-white/60'
              }`}>
                {course.progress && course.progress > 0 ? (
                  <CheckCircleIcon className="w-5 h-5" />
                ) : (
                  <PlayIcon className="w-5 h-5" />
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

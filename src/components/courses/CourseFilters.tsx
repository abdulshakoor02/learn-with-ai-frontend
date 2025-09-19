'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline'

interface CourseFiltersProps {
  categories: string[]
  difficulties: string[]
  selectedCategory: string
  selectedDifficulty: string
  sortBy: string
  onCategoryChange: (category: string) => void
  onDifficultyChange: (difficulty: string) => void
  onSortChange: (sort: string) => void
}

export const CourseFilters = ({
  categories,
  difficulties,
  selectedCategory,
  selectedDifficulty,
  sortBy,
  onCategoryChange,
  onDifficultyChange,
  onSortChange,
}: CourseFiltersProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const sortOptions = [
    { value: 'rating', label: 'Highest Rated' },
    { value: 'enrolled', label: 'Most Popular' },
    { value: 'duration', label: 'Shortest Duration' },
  ]

  const formatLabel = (value: string) => {
    return value
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  return (
    <div className="space-y-4">
      {/* Mobile Filter Toggle */}
      <div className="md:hidden">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between w-full p-3 bg-white/10 rounded-xl text-white hover:bg-white/20 transition-all duration-200"
        >
          <div className="flex items-center space-x-2">
            <FunnelIcon className="w-5 h-5" />
            <span>Filters</span>
          </div>
          <XMarkIcon className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Filters Content */}
      <AnimatePresence>
        {(isExpanded || window.innerWidth >= 768) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Category Filter */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-white/80">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all duration-200"
              >
                {categories.map((category) => (
                  <option key={category} value={category} className="bg-gray-900">
                    {formatLabel(category)}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty Filter */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-white/80">
                Difficulty
              </label>
              <select
                value={selectedDifficulty}
                onChange={(e) => onDifficultyChange(e.target.value)}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all duration-200"
              >
                {difficulties.map((difficulty) => (
                  <option key={difficulty} value={difficulty} className="bg-gray-900">
                    {formatLabel(difficulty)}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Options */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-white/80">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all duration-200"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value} className="bg-gray-900">
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Filters Display */}
      <div className="flex flex-wrap gap-2">
        {selectedCategory !== 'all' && (
          <span className="inline-flex items-center space-x-2 px-3 py-1 bg-purple-500/20 text-purple-400 rounded-lg border border-purple-500/30">
            <span>{formatLabel(selectedCategory)}</span>
            <button
              onClick={() => onCategoryChange('all')}
              className="hover:text-purple-300 transition-colors"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          </span>
        )}
        {selectedDifficulty !== 'all' && (
          <span className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-500/20 text-blue-400 rounded-lg border border-blue-500/30">
            <span>{formatLabel(selectedDifficulty)}</span>
            <button
              onClick={() => onDifficultyChange('all')}
              className="hover:text-blue-300 transition-colors"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          </span>
        )}
      </div>
    </div>
  )
}

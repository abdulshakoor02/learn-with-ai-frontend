'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronDownIcon,
  PlayCircleIcon,
  CheckCircleIcon,
  LockClosedIcon,
  DocumentTextIcon,
  VideoCameraIcon,
  AcademicCapIcon,
  ClipboardDocumentCheckIcon
} from '@heroicons/react/24/outline'
import { LearningModal } from './LearningModal'
import { OpenAIService } from '@/services/api'

interface Module {
  id: string
  title: string
  duration: string
  type: 'video' | 'reading' | 'quiz' | 'assignment'
  completed: boolean
  locked: boolean
}

interface Section {
  id: string
  title: string
  modules: Module[]
}

interface CourseTimelineProps {
  sections: Section[]
}

export const CourseTimeline = ({ sections }: CourseTimelineProps) => {
  const [expandedSections, setExpandedSections] = useState<string[]>(['1'])
  const [modalState, setModalState] = useState({
    isOpen: false,
    selectedModule: null as Module | null,
    sectionTitle: '',
    content: null as string | null,
    isLoading: false,
    error: null as string | null
  })

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    )
  }

  const handleStartModule = async (module: Module, sectionTitle: string) => {
    // Open modal and start loading
    setModalState({
      isOpen: true,
      selectedModule: module,
      sectionTitle,
      content: null,
      isLoading: true,
      error: null
    })

    try {
      // Generate learning content using OpenAI
      const content = await OpenAIService.generateLearningContent(
        module.title,
        module.type,
        sectionTitle
      )

      // Update modal with content
      setModalState(prev => ({
        ...prev,
        content,
        isLoading: false,
        error: null
      }))
    } catch (error) {
      console.error('Failed to generate learning content:', error)

      // Update modal with error
      setModalState(prev => ({
        ...prev,
        content: null,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to generate learning content'
      }))
    }
  }

  const handleCloseModal = () => {
    setModalState({
      isOpen: false,
      selectedModule: null,
      sectionTitle: '',
      content: null,
      isLoading: false,
      error: null
    })
  }

  const getModuleIcon = (type: string) => {
    switch (type) {
      case 'video':
        return VideoCameraIcon
      case 'reading':
        return DocumentTextIcon
      case 'quiz':
        return AcademicCapIcon
      case 'assignment':
        return ClipboardDocumentCheckIcon
      default:
        return DocumentTextIcon
    }
  }

  const getModuleColor = (type: string) => {
    switch (type) {
      case 'video':
        return 'text-purple-400'
      case 'reading':
        return 'text-blue-400'
      case 'quiz':
        return 'text-yellow-400'
      case 'assignment':
        return 'text-green-400'
      default:
        return 'text-gray-400'
    }
  }

  const getSectionProgress = (section: Section) => {
    const completed = section.modules.filter(module => module.completed).length
    return { completed, total: section.modules.length, percentage: (completed / section.modules.length) * 100 }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-white">Course Curriculum</h3>
        <div className="text-white/70">
          {sections.reduce((total, section) => total + getSectionProgress(section).completed, 0)} /
          {sections.reduce((total, section) => total + section.modules.length, 0)} modules completed
        </div>
      </div>

      {/* Overall Progress */}
      <div className="glass-neutral p-4 rounded-xl">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white font-medium">Overall Progress</span>
          <span className="text-white/70">
            {Math.round(
              (sections.reduce((total, section) => total + getSectionProgress(section).completed, 0) /
                sections.reduce((total, section) => total + section.modules.length, 0)) * 100
            )}%
          </span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500"
            style={{
              width: `${(sections.reduce((total, section) => total + getSectionProgress(section).completed, 0) /
                sections.reduce((total, section) => total + section.modules.length, 0)) * 100}%`
            }}
          />
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-6">
        {sections.map((section, sectionIndex) => {
          const progress = getSectionProgress(section)
          const isExpanded = expandedSections.includes(section.id)

          return (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: sectionIndex * 0.1 }}
              className="glass-secondary rounded-2xl overflow-hidden"
            >
              {/* Section Header */}
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full p-6 flex items-center justify-between hover:bg-white/5 transition-all duration-200"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                    {sectionIndex + 1}
                  </div>
                  <div className="text-left">
                    <h4 className="text-xl font-bold text-white">{section.title}</h4>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-white/70 text-sm">
                        {progress.completed}/{progress.total} modules
                      </span>
                      <div className="w-24 bg-white/10 rounded-full h-1">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-blue-500 h-1 rounded-full"
                          style={{ width: `${progress.percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <ChevronDownIcon
                  className={`w-6 h-6 text-white/70 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''
                    }`}
                />
              </button>

              {/* Section Modules */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-white/20"
                  >
                    <div className="p-6 space-y-3">
                      {section.modules.map((module, moduleIndex) => {
                        const Icon = getModuleIcon(module.type)
                        const isLocked = module.locked

                        return (
                          <motion.div
                            key={module.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: moduleIndex * 0.05 }}
                            className={`flex items-center justify-between p-4 rounded-xl transition-all duration-200 ${isLocked
                                ? 'bg-white/5 cursor-not-allowed'
                                : module.completed
                                  ? 'bg-green-500/10 border border-green-500/30'
                                  : 'bg-white/10 hover:bg-white/20 cursor-pointer'
                              }`}
                          >
                            <div className="flex items-center space-x-4">
                              {/* Module Status */}
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isLocked
                                  ? 'bg-gray-500/20'
                                  : module.completed
                                    ? 'bg-green-500/20'
                                    : 'bg-white/10'
                                }`}>
                                {isLocked ? (
                                  <LockClosedIcon className="w-4 h-4 text-gray-400" />
                                ) : module.completed ? (
                                  <CheckCircleIcon className="w-4 h-4 text-green-400" />
                                ) : (
                                  <PlayCircleIcon className="w-4 h-4 text-white" />
                                )}
                              </div>

                              {/* Module Info */}
                              <div className="flex-1">
                                <div className="flex items-center space-x-3">
                                  <Icon className={`w-5 h-5 ${getModuleColor(module.type)}`} />
                                  <h5 className={`font-medium ${isLocked ? 'text-gray-400' : 'text-white'
                                    }`}>
                                    {module.title}
                                  </h5>
                                </div>
                                <div className="flex items-center space-x-4 mt-1 ml-8">
                                  <span className="text-white/60 text-sm">
                                    {module.duration}
                                  </span>
                                  <span className={`text-xs px-2 py-1 rounded-full border ${module.type === 'video' ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' :
                                      module.type === 'reading' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                                        module.type === 'quiz' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                                          'bg-green-500/20 text-green-400 border-green-500/30'
                                    }`}>
                                    {module.type}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Action Button */}
                            {!isLocked && (
                              <button
                                onClick={() => handleStartModule(module, section.title)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${module.completed
                                    ? 'bg-white/10 text-white hover:bg-white/20'
                                    : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600'
                                  }`}
                              >
                                {module.completed ? 'Review' : 'Start'}
                              </button>
                            )}
                          </motion.div>
                        )
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>

      {/* Learning Modal */}
      <LearningModal
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        module={modalState.selectedModule}
        content={modalState.content}
        isLoading={modalState.isLoading}
        error={modalState.error}
      />
    </div>
  )
}

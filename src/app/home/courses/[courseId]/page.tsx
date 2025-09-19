'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useParams } from 'next/navigation'
import { CourseTimeline } from '@/components/courses/CourseTimeline'
import { CourseHeader } from '@/components/courses/CourseHeader'
import { CourseStats } from '@/components/courses/CourseStats'
import { CourseReviews } from '@/components/courses/CourseReviews'
import { PlayCircleIcon, ClockIcon, StarIcon, UsersIcon } from '@heroicons/react/24/outline'

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

interface CourseData {
  id: string
  title: string
  description: string
  longDescription: string
  image: string
  category: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  duration: string
  rating: number
  reviews: number
  enrolled: number
  progress: number
  tags: string[]
  instructor: {
    name: string
    avatar: string
    bio: string
    title: string
  }
  sections: Section[]
  whatYouWillLearn: string[]
  prerequisites: string[]
}

const mockCourseData: CourseData = {
  id: '1',
  title: 'Introduction to Machine Learning',
  description: 'Master the fundamentals of machine learning with hands-on projects and real-world applications.',
  longDescription: 'This comprehensive course will take you from zero to hero in machine learning. You\'ll learn the fundamental concepts, algorithms, and practical applications of ML. Through hands-on projects and real-world datasets, you\'ll gain the skills needed to build and deploy machine learning models.',
  image: '/courses/ml-intro.jpg',
  category: 'Data Science',
  difficulty: 'beginner',
  duration: '8 weeks',
  rating: 4.8,
  reviews: 342,
  enrolled: 1250,
  progress: 35,
  tags: ['Python', 'Scikit-learn', 'Data Analysis', 'Neural Networks', 'Deep Learning'],
  instructor: {
    name: 'Dr. Sarah Chen',
    avatar: '/instructors/sarah-chen.jpg',
    bio: 'Senior Data Scientist with 10+ years of experience in machine learning and AI. PhD in Computer Science from MIT.',
    title: 'Senior Data Scientist'
  },
  sections: [
    {
      id: '1',
      title: 'Introduction and Setup',
      modules: [
        {
          id: '1-1',
          title: 'Course Overview and Prerequisites',
          duration: '15 min',
          type: 'video',
          completed: true,
          locked: false
        },
        {
          id: '1-2',
          title: 'Setting Up Your Development Environment',
          duration: '30 min',
          type: 'video',
          completed: true,
          locked: false
        },
        {
          id: '1-3',
          title: 'Introduction to Python for ML',
          duration: '45 min',
          type: 'reading',
          completed: false,
          locked: false
        }
      ]
    },
    {
      id: '2',
      title: 'Machine Learning Fundamentals',
      modules: [
        {
          id: '2-1',
          title: 'What is Machine Learning?',
          duration: '25 min',
          type: 'video',
          completed: false,
          locked: false
        },
        {
          id: '2-2',
          title: 'Types of Machine Learning',
          duration: '35 min',
          type: 'video',
          completed: false,
          locked: false
        },
        {
          id: '2-3',
          title: 'Supervised vs Unsupervised Learning',
          duration: '40 min',
          type: 'reading',
          completed: false,
          locked: false
        },
        {
          id: '2-4',
          title: 'Quiz: ML Fundamentals',
          duration: '20 min',
          type: 'quiz',
          completed: false,
          locked: false
        }
      ]
    },
    {
      id: '3',
      title: 'Data Preprocessing',
      modules: [
        {
          id: '3-1',
          title: 'Data Cleaning Techniques',
          duration: '50 min',
          type: 'video',
          completed: false,
          locked: false
        },
        {
          id: '3-2',
          title: 'Feature Engineering',
          duration: '45 min',
          type: 'video',
          completed: false,
          locked: false
        },
        {
          id: '3-3',
          title: 'Data Visualization',
          duration: '35 min',
          type: 'reading',
          completed: false,
          locked: false
        },
        {
          id: '3-4',
          title: 'Assignment: Data Preprocessing',
          duration: '2 hours',
          type: 'assignment',
          completed: false,
          locked: false
        }
      ]
    },
    {
      id: '4',
      title: 'Supervised Learning',
      modules: [
        {
          id: '4-1',
          title: 'Linear Regression',
          duration: '60 min',
          type: 'video',
          completed: false,
          locked: true
        },
        {
          id: '4-2',
          title: 'Logistic Regression',
          duration: '55 min',
          type: 'video',
          completed: false,
          locked: true
        },
        {
          id: '4-3',
          title: 'Decision Trees',
          duration: '50 min',
          type: 'video',
          completed: false,
          locked: true
        }
      ]
    }
  ],
  whatYouWillLearn: [
    'Understand the fundamentals of machine learning and AI',
    'Build and train various ML models using Python',
    'Preprocess and clean data for machine learning',
    'Implement classification and regression algorithms',
    'Evaluate model performance and optimize hyperparameters',
    'Deploy machine learning models to production',
    'Work with real-world datasets and solve practical problems'
  ],
  prerequisites: [
    'Basic programming knowledge (Python preferred)',
    'High school level mathematics',
    'Familiarity with data analysis concepts helpful but not required'
  ]
}

export default function CourseDetailPage() {
  const params = useParams()
  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum' | 'reviews'>('overview')
  
  const course = mockCourseData // In real app, fetch based on params.courseId

  const tabs = [
    { id: 'overview', label: 'Overview', icon: StarIcon },
    { id: 'curriculum', label: 'Curriculum', icon: ClockIcon },
    { id: 'reviews', label: 'Reviews', icon: UsersIcon },
  ]

  return (
    <div className="space-y-8">
      {/* Course Header */}
      <CourseHeader course={course} />

      {/* Navigation Tabs */}
      <div className="glass-secondary rounded-2xl overflow-hidden">
        <div className="flex border-b border-white/20">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-6 py-4 font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-white/10 text-white border-b-2 border-purple-500'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-8">
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* What You'll Learn */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">What You'll Learn</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {course.whatYouWillLearn.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircleIcon className="w-4 h-4 text-white" />
                      </div>
                      <p className="text-white/80">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prerequisites */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Prerequisites</h3>
                <ul className="space-y-2">
                  {course.prerequisites.map((item, index) => (
                    <li key={index} className="flex items-center space-x-3 text-white/80">
                      <div className="w-2 h-2 bg-white/60 rounded-full" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Course Stats */}
              <CourseStats course={course} />
            </motion.div>
          )}

          {activeTab === 'curriculum' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <CourseTimeline sections={course.sections} />
            </motion.div>
          )}

          {activeTab === 'reviews' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <CourseReviews courseId={course.id} />
            </motion.div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {course.progress && course.progress > 0 ? (
          <>
            <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2">
              <PlayCircleIcon className="w-5 h-5" />
              <span>Continue Learning ({course.progress}%)</span>
            </button>
            <button className="px-8 py-4 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-200">
              Restart Course
            </button>
          </>
        ) : (
          <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2">
            <PlayCircleIcon className="w-5 h-5" />
            <span>Start Course</span>
          </button>
        )}
      </div>
    </div>
  )
}

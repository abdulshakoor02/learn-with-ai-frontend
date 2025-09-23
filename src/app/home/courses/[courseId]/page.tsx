'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useParams, useRouter } from 'next/navigation'
import { CourseTimeline } from '@/components/courses/CourseTimeline'
import { CourseHeader } from '@/components/courses/CourseHeader'
import { CourseStats } from '@/components/courses/CourseStats'
import { CourseReviews } from '@/components/courses/CourseReviews'
import { LearningTimeline } from '@/components/timeline/LearningTimeline'
import { PlayCircleIcon, ClockIcon, StarIcon, UsersIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import { LearningPlansService } from '@/services/api'
import { AuthUtils } from '@/services/authUtils'

interface CourseData {
  id: string
  title: string
  description: string
  longDescription: string
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
    bio: string
    title: string
  }
  phases: Array<{
    focus: string
    duration: string
    topics: string[]
  }>
  whatYouWillLearn: string[]
  prerequisites: string[]
  userId?: string
  createdAt?: string
  updatedAt?: string
}

// Mock data for fallback
const mockCourseData: CourseData = {
  id: '1',
  title: 'Introduction to Machine Learning',
  description: 'Master the fundamentals of machine learning with hands-on projects and real-world applications.',
  longDescription: 'This comprehensive course will take you from zero to hero in machine learning. You\'ll learn the fundamental concepts, algorithms, and practical applications of ML. Through hands-on projects and real-world datasets, you\'ll gain the skills needed to build and deploy machine learning models.',
  category: 'Data Science',
  difficulty: 'beginner',
  duration: '8 weeks',
  rating: 4.8,
  reviews: 342,
  enrolled: 1250,
  progress: 35,
  tags: ['Python', 'Scikit-learn', 'Data Analysis', 'Neural Networks', 'Deep Learning'],
  instructor: {
    name: 'AI Learning Assistant',
    bio: 'Your personalized AI learning companion that creates custom learning paths based on your goals and preferences.',
    title: 'AI Learning Assistant'
  },
  phases: [
    {
      focus: 'Mathematical Foundations',
      duration: '2 weeks',
      topics: ['Linear Algebra', 'Statistics', 'Probability']
    },
    {
      focus: 'Supervised Learning',
      duration: '2 weeks',
      topics: ['Linear Regression', 'Classification', 'Decision Trees']
    },
    {
      focus: 'Unsupervised Learning',
      duration: '2 weeks',
      topics: ['Clustering', 'Dimensionality Reduction', 'PCA']
    },
    {
      focus: 'Deep Learning Basics',
      duration: '2 weeks',
      topics: ['Neural Networks', 'Backpropagation', 'TensorFlow']
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
  const router = useRouter()
  const courseId = params?.courseId as string
  
  const [course, setCourse] = useState<CourseData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum' | 'timeline'>('overview')
  const [currentUser, setCurrentUser] = useState<any>(null)

  // Fetch course data
  const fetchCourse = async () => {
    try {
      setLoading(true)
      setError(null)

      // Get current user
      const user = await AuthUtils.getUserDataAsync()
      if (!user) {
        router.push('/home/login')
        return
      }
      setCurrentUser(user)

      // Fetch the specific learning plan
      const learningPlan = await LearningPlansService.getLearningPlanById(courseId)

      if (!learningPlan) {
        setError('Learning plan not found')
        setCourse(mockCourseData) // Fallback to mock data
        return
      }

      // Transform learning plan to course format
      const transformedCourse: CourseData = {
        id: learningPlan._id || learningPlan.id,
        title: learningPlan.title,
        description: `A comprehensive ${learningPlan.duration} week learning plan with ${learningPlan.phases?.length || 0} phases covering ${learningPlan.prerequisites?.length || 0} prerequisites.`,
        longDescription: `This personalized learning plan was created by our AI assistant based on your goals. The plan covers ${learningPlan.phases?.length || 0} focused phases over ${learningPlan.duration} weeks, helping you master the skills you need.`,
        category: 'Learning Path',
        difficulty: 'intermediate', // Default difficulty
        duration: `${learningPlan.duration} weeks`,
        rating: 4.8, // Default rating
        reviews: 1, // Personal plan
        enrolled: 1, // Personal plan
        progress: Math.floor(Math.random() * 30), // Mock progress for now
        tags: learningPlan.prerequisites || [],
        instructor: {
          name: 'AI Learning Assistant',
          bio: 'Your personalized AI learning companion that creates custom learning paths based on your goals and preferences.',
          title: 'AI Learning Assistant'
        },
        phases: learningPlan.phases,
        prerequisites: learningPlan.prerequisites,
        whatYouWillLearn: learningPlan.phases?.flatMap((phase: any) => 
          phase.topics?.map((topic: any) => topic.title || topic) || []
        ) || [],
        userId: learningPlan.userId || user._id,
        createdAt: learningPlan.createdAt,
        updatedAt: learningPlan.updatedAt
      }

      setCourse(transformedCourse)

    } catch (err) {
      console.error('Error fetching course:', err)
      setError('Failed to load learning plan. Showing fallback data.')
      setCourse(mockCourseData) // Fallback to mock data
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (courseId) {
      fetchCourse()
    }
  }, [courseId])

  const tabs = [
    { id: 'overview', label: 'Overview', icon: StarIcon },
    { id: 'curriculum', label: 'Curriculum', icon: ClockIcon },
    { id: 'timeline', label: 'Timeline', icon: PlayCircleIcon },
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-white/70">Loading learning plan...</p>
        </div>
      </div>
    )
  }

  if (error && !course) {
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold gradient-text mb-4">Error Loading Course</h1>
          <p className="text-xl text-red-400 mb-8">{error}</p>
          <button
            onClick={() => router.push('/home/courses')}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:from-purple-600 hover:to-blue-600 transition-all duration-200"
          >
            Back to Courses
          </button>
        </div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold gradient-text mb-4">Course Not Found</h1>
          <p className="text-xl text-white/70 mb-8">The learning plan you're looking for doesn't exist.</p>
          <button
            onClick={() => router.push('/home/courses')}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:from-purple-600 hover:to-blue-600 transition-all duration-200"
          >
            Back to Courses
          </button>
        </div>
      </div>
    )
  }

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
              <CourseTimeline sections={course.phases.map((phase, index) => ({
                id: `phase-${index}`,
                title: phase.focus,
                modules: phase.topics?.map((topic: any, topicIndex: number) => ({
                  id: `phase-${index}-topic-${topicIndex}`,
                  title: topic.title || topic,
                  duration: '2-4 hours', // Mock duration
                  type: 'reading' as const,
                  completed: topic.status || false,
                  locked: index > 0 // Lock future phases
                })) || []
              }))} />
            </motion.div>
          )}

          {activeTab === 'timeline' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <LearningTimeline
                goals={course.prerequisites}
                selectedLearningPlan={{
                  title: course.title,
                  duration: course.duration,
                  prerequisites: course.prerequisites,
                  phases: course.phases?.map((phase: any) => ({
                    focus: phase.focus,
                    duration: phase.duration,
                    topics: phase.topics?.map((topic: any) => topic.title || topic) || []
                  })) || []
                }}
              />
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

'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { LearningPlanCard } from '@/components/courses/LearningPlanCard'
import { CourseFilters } from '@/components/courses/CourseFilters'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { LearningPlansService } from '@/services/api'
import { AuthUtils } from '@/services/authUtils'
import { LearningPlanBackend } from '@/services/api'
import { useRouter } from 'next/navigation'

// Updated Course interface to match LearningPlan data
interface Course {
  id: string
  title: string
  description: string
  image?: string // Make optional since we'll remove images
  category: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  duration: string
  rating: number
  enrolled: number
  progress?: number
  tags: string[]
  instructor?: {
    name: string
    avatar?: string // Make optional since we'll remove images
  }
  // Learning plan specific fields
  phases?: Array<{
    focus: string
    duration: string
    topics: string[]
  }>
  prerequisites?: string[]
  userId?: string
  createdAt?: string
  updatedAt?: string
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [sortBy, setSortBy] = useState('rating')
  const [currentUser, setCurrentUser] = useState<any>(null)
  const router = useRouter()

  // Fetch real learning plans from backend
  const fetchCourses = async () => {
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

      // Fetch learning plans for this user
      const learningPlans = await LearningPlansService.getLearningPlans(user._id)

      // Transform learning plans to course format
      const transformedCourses = learningPlans.map((plan: any) => ({
        id: plan._id || plan.id,
        title: plan.title,
        description: `A comprehensive ${plan.duration} week learning plan with ${plan.phases?.length || 0} phases covering ${plan.prerequisites?.length || 0} prerequisites. Focus areas include: ${plan.phases?.map((p: any) => p.focus).join(', ') || 'TBD'}.`,
        category: 'Learning Path',
        difficulty: 'intermediate', // Default difficulty
        duration: `${plan.duration} weeks`,
        rating: 4.8, // Default rating
        enrolled: 1, // Personal plan
        progress: Math.floor(Math.random() * 30), // Mock progress
        tags: plan.prerequisites || [],
        instructor: {
          name: 'AI Learning Assistant'
        },
        phases: plan.phases,
        prerequisites: plan.prerequisites,
        userId: plan.userId || user._id,
        createdAt: plan.createdAt,
        updatedAt: plan.updatedAt
      }))

      setCourses(transformedCourses)

    } catch (err) {
      console.error('Error fetching courses:', err)
      setError('Failed to load your learning plans. Please try again.')

      // Fallback to mock courses for now
      setCourses(getFallbackCourses())
    } finally {
      setLoading(false)
    }
  }

  // Fallback courses if API fails
  const getFallbackCourses = (): Course[] => [
    {
      id: 'fallback-1',
      title: 'Full Stack Web Development',
      description: 'A comprehensive 6-month learning plan covering frontend, backend, and full stack integration.',
      category: 'Learning Path',
      difficulty: 'intermediate',
      duration: '6 months',
      rating: 4.8,
      enrolled: 1,
      progress: 25,
      tags: ['HTML/CSS', 'JavaScript', 'React'],
      instructor: {
        name: 'AI Learning Assistant'
      },
      phases: [
        {
          focus: 'Frontend Development',
          duration: '2 months',
          topics: ['React', 'TypeScript', 'CSS Frameworks']
        },
        {
          focus: 'Backend Development',
          duration: '2 months',
          topics: ['Node.js', 'Express', 'Database Design']
        },
        {
          focus: 'Full Stack Integration',
          duration: '2 months',
          topics: ['API Development', 'Deployment', 'Testing']
        }
      ],
      prerequisites: ['Basic HTML/CSS', 'JavaScript fundamentals']
    },
    {
      id: 'fallback-2',
      title: 'Machine Learning Fundamentals',
      description: 'Learn machine learning from scratch with hands-on projects and real-world applications.',
      category: 'Learning Path',
      difficulty: 'intermediate',
      duration: '4 months',
      rating: 4.7,
      enrolled: 1,
      progress: 15,
      tags: ['Python', 'Statistics', 'Data Analysis'],
      instructor: {
        name: 'AI Learning Assistant'
      },
      phases: [
        {
          focus: 'Mathematical Foundations',
          duration: '1 month',
          topics: ['Linear Algebra', 'Statistics', 'Probability']
        },
        {
          focus: 'Supervised Learning',
          duration: '1 month',
          topics: ['Linear Regression', 'Classification', 'Decision Trees']
        },
        {
          focus: 'Unsupervised Learning',
          duration: '1 month',
          topics: ['Clustering', 'Dimensionality Reduction', 'PCA']
        },
        {
          focus: 'Deep Learning Basics',
          duration: '1 month',
          topics: ['Neural Networks', 'Backpropagation', 'TensorFlow']
        }
      ],
      prerequisites: ['Python Programming', 'Basic Math Skills']
    }
  ]

  // Fetch courses on component mount
  useEffect(() => {
    fetchCourses()
  }, [])

  // Handle course click - navigate to course detail page
  const handleCourseClick = (courseId: string) => {
    router.push(`/home/courses/${courseId}`)
  }

  // Get categories from real data
  const categories = ['all', 'Learning Path']
  const difficulties = ['all', 'beginner', 'intermediate', 'advanced']

  // Filtering logic for real data
  const filteredCourses = courses
    .filter(course => {
      const matchesSearch = !searchTerm ||
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        course.prerequisites?.some(prereq => prereq.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory
      const matchesDifficulty = selectedDifficulty === 'all' || course.difficulty === selectedDifficulty

      return matchesSearch && matchesCategory && matchesDifficulty
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating
        case 'enrolled':
          return b.enrolled - a.enrolled
        case 'duration':
          // Simple duration sorting
          return a.duration.localeCompare(b.duration)
        default:
          return 0
      }
    })

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
            <h1 className="text-4xl font-bold gradient-text mb-4">Loading Your Learning Plans...</h1>
            <p className="text-xl text-white/70">Fetching your personalized learning paths</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="glass-secondary rounded-2xl p-6 animate-pulse">
                <div className="bg-white/20 h-48 rounded-lg mb-4"></div>
                <div className="bg-white/20 h-6 rounded mb-2"></div>
                <div className="bg-white/20 h-4 rounded mb-6"></div>
                <div className="flex justify-between">
                  <div className="bg-white/20 h-4 w-20 rounded"></div>
                  <div className="bg-white/20 h-4 w-16 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error && courses.length === 0) {
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl font-bold gradient-text mb-4">Error Loading Courses</h1>
            <p className="text-xl text-red-400 mb-8">{error}</p>
            <button
              onClick={fetchCourses}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:from-purple-600 hover:to-blue-600 transition-all duration-200"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Empty state
  if (courses.length === 0) {
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl font-bold gradient-text mb-4">My Learning Plans</h1>
            <p className="text-xl text-white/80 mb-8">No learning plans found</p>
            <div className="text-6xl mb-4">🎯</div>
            <p className="text-white/70 mb-8">
              Create your first learning plan by chatting with our AI assistant and let us build a personalized path for you!
            </p>
            <button
              onClick={() => window.location.href = '/home'}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
            >
              Create Learning Plan
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold gradient-text mb-4">
            My Learning Plans
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            {error
              ? "Showing suggested learning paths while we resolve connection issues"
              : "Your personalized learning paths created by our AI assistant"
            }
          </p>
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass-accent mt-4 p-4 rounded-xl border border-yellow-500/30"
            >
              <p className="text-yellow-400 text-sm">
                ⚠️ Connection issues detected. Showing fallback plans.
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-secondary p-6 rounded-2xl mb-8"
        >
          {/* Search Bar */}
          <div className="relative mb-6">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
            <input
              type="text"
              placeholder="Search learning plans, topics, or prerequisites..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all duration-200"
            />
          </div>

          {/* Filters */}
          <CourseFilters
            categories={categories}
            difficulties={difficulties}
            selectedCategory={selectedCategory}
            selectedDifficulty={selectedDifficulty}
            sortBy={sortBy}
            onCategoryChange={setSelectedCategory}
            onDifficultyChange={setSelectedDifficulty}
            onSortChange={setSortBy}
          />
        </motion.div>

        {/* Learning Plans Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          style={{
            gridAutoRows: '1fr',
            alignItems: 'start'
          }}
        >
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="h-full"
            >
              <LearningPlanCard plan={course} onClick={() => handleCourseClick(course.id)} />
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredCourses.length === 0 && courses.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-white mb-2">No learning plans match your criteria</h3>
            <p className="text-white/70">
              Try adjusting your search terms or filters to find more learning paths.
            </p>
          </motion.div>
        )}

        {/* Stats */}
        {courses.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-accent p-6 rounded-2xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold gradient-text">{filteredCourses.length}</div>
                <div className="text-white/70">Learning Plans</div>
              </div>
              <div>
                <div className="text-3xl font-bold gradient-text">
                  {filteredCourses.reduce((sum, course) => sum + (course.duration.includes('month') ? parseInt(course.duration) : Math.ceil(parseInt(course.duration) / 24)), 0)}
                </div>
                <div className="text-white/70">Total Months</div>
              </div>
              <div>
                <div className="text-3xl font-bold gradient-text">
                  {(filteredCourses.reduce((sum, course) => sum + course.rating, 0) / filteredCourses.length).toFixed(1)}
                </div>
                <div className="text-white/70">Average Rating</div>
              </div>
              <div>
                <div className="text-3xl font-bold gradient-text">
                  {filteredCourses.reduce((sum, course) => sum + (course.phases?.length || 0), 0)}
                </div>
                <div className="text-white/70">Learning Phases</div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
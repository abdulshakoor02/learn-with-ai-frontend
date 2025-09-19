'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CourseCard } from '@/components/courses/CourseCard'
import { CourseFilters } from '@/components/courses/CourseFilters'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

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

const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Introduction to Machine Learning',
    description: 'Learn the fundamentals of machine learning with hands-on projects and real-world applications.',
    image: '/courses/ml-intro.jpg',
    category: 'Data Science',
    difficulty: 'beginner',
    duration: '8 weeks',
    rating: 4.8,
    enrolled: 1250,
    progress: 35,
    tags: ['Python', 'Scikit-learn', 'Data Analysis'],
    instructor: {
      name: 'Dr. Sarah Chen',
      avatar: '/instructors/sarah-chen.jpg'
    }
  },
  {
    id: '2',
    title: 'Advanced React Development',
    description: 'Master advanced React patterns, performance optimization, and modern development practices.',
    image: '/courses/react-advanced.jpg',
    category: 'Web Development',
    difficulty: 'advanced',
    duration: '12 weeks',
    rating: 4.9,
    enrolled: 890,
    tags: ['React', 'TypeScript', 'Performance'],
    instructor: {
      name: 'Mike Johnson',
      avatar: '/instructors/mike-johnson.jpg'
    }
  },
  {
    id: '3',
    title: 'UI/UX Design Fundamentals',
    description: 'Comprehensive course covering design principles, user research, and prototyping techniques.',
    image: '/courses/ux-design.jpg',
    category: 'Design',
    difficulty: 'beginner',
    duration: '6 weeks',
    rating: 4.7,
    enrolled: 2100,
    progress: 80,
    tags: ['Figma', 'User Research', 'Prototyping'],
    instructor: {
      name: 'Emma Rodriguez',
      avatar: '/instructors/emma-rodriguez.jpg'
    }
  },
  {
    id: '4',
    title: 'Cloud Architecture with AWS',
    description: 'Design and implement scalable cloud solutions using AWS services and best practices.',
    image: '/courses/aws-cloud.jpg',
    category: 'Cloud Computing',
    difficulty: 'intermediate',
    duration: '10 weeks',
    rating: 4.6,
    enrolled: 650,
    tags: ['AWS', 'DevOps', 'Architecture'],
    instructor: {
      name: 'David Kim',
      avatar: '/instructors/david-kim.jpg'
    }
  },
  {
    id: '5',
    title: 'Mobile App Development with Flutter',
    description: 'Build cross-platform mobile applications using Flutter and Dart programming language.',
    image: '/courses/flutter-mobile.jpg',
    category: 'Mobile Development',
    difficulty: 'intermediate',
    duration: '9 weeks',
    rating: 4.5,
    enrolled: 780,
    tags: ['Flutter', 'Dart', 'Mobile'],
    instructor: {
      name: 'Lisa Wang',
      avatar: '/instructors/lisa-wang.jpg'
    }
  },
  {
    id: '6',
    title: 'Blockchain Development',
    description: 'Learn blockchain fundamentals, smart contracts, and decentralized application development.',
    image: '/courses/blockchain.jpg',
    category: 'Blockchain',
    difficulty: 'advanced',
    duration: '14 weeks',
    rating: 4.4,
    enrolled: 320,
    tags: ['Ethereum', 'Solidity', 'Smart Contracts'],
    instructor: {
      name: 'Alex Thompson',
      avatar: '/instructors/alex-thompson.jpg'
    }
  }
]

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>(mockCourses)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [sortBy, setSortBy] = useState('rating')
  const [isClient, setIsClient] = useState(false)

  // Ensure client-side only rendering for SSR compatibility
  useEffect(() => {
    setIsClient(true)
  }, [])

  const categories = ['all', ...Array.from(new Set(courses.map(course => course.category)))]
  const difficulties = ['all', 'beginner', 'intermediate', 'advanced']

  const filteredCourses = courses
    .filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
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
          return parseInt(a.duration) - parseInt(b.duration)
        default:
          return 0
      }
    })

  // Don't render on server to avoid SSR issues
  if (!isClient) {
    return (
      <div className="space-y-8 p-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold gradient-text mb-4">Explore Courses</h1>
          <p className="text-xl text-white/80">Loading courses...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold gradient-text mb-4">
          Explore Courses
        </h1>
        <p className="text-xl text-white/80 max-w-2xl mx-auto">
          Discover courses tailored to your learning goals. From beginner to advanced levels, 
          find the perfect course to advance your skills.
        </p>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-secondary p-6 rounded-2xl"
      >
        {/* Search Bar */}
        <div className="relative mb-6">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
          <input
            type="text"
            placeholder="Search courses, topics, or skills..."
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

      {/* Course Grid */}
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
            <CourseCard course={course} />
          </motion.div>
        ))}
      </motion.div>

      {/* No Results */}
      {filteredCourses.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-white mb-2">No courses found</h3>
          <p className="text-white/70">
            Try adjusting your search terms or filters to find more courses.
          </p>
        </motion.div>
      )}

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-accent p-6 rounded-2xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold gradient-text">{filteredCourses.length}</div>
            <div className="text-white/70">Available Courses</div>
          </div>
          <div>
            <div className="text-3xl font-bold gradient-text">
              {filteredCourses.reduce((sum, course) => sum + course.enrolled, 0)}
            </div>
            <div className="text-white/70">Total Enrollments</div>
          </div>
          <div>
            <div className="text-3xl font-bold gradient-text">
              {(filteredCourses.reduce((sum, course) => sum + course.rating, 0) / filteredCourses.length).toFixed(1)}
            </div>
            <div className="text-white/70">Average Rating</div>
          </div>
          <div>
            <div className="text-3xl font-bold gradient-text">
              {categories.length - 1}
            </div>
            <div className="text-white/70">Categories</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

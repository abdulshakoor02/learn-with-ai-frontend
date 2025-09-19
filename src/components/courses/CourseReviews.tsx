'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { StarIcon, UserCircleIcon, HandThumbUpIcon } from '@heroicons/react/24/outline'
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid'

interface Review {
  id: string
  author: string
  avatar?: string
  rating: number
  date: string
  comment: string
  helpful: number
  isHelpful?: boolean
}

interface CourseReviewsProps {
  courseId: string
}

export const CourseReviews = ({ courseId }: CourseReviewsProps) => {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: '1',
      author: 'Alex Johnson',
      rating: 5,
      date: '2024-01-15',
      comment: 'Excellent course! The instructor explains complex concepts in a very clear and understandable way. The hands-on projects really help solidify the learning.',
      helpful: 24,
      isHelpful: false
    },
    {
      id: '2',
      author: 'Maria Garcia',
      avatar: '/users/maria-garcia.jpg',
      rating: 4,
      date: '2024-01-10',
      comment: 'Very comprehensive course with great practical examples. The pace is perfect for beginners, and the projects are challenging but manageable.',
      helpful: 18,
      isHelpful: true
    },
    {
      id: '3',
      author: 'David Kim',
      rating: 5,
      date: '2024-01-08',
      comment: 'This course exceeded my expectations! The content is well-structured, and the instructor is very knowledgeable. Highly recommended!',
      helpful: 31,
      isHelpful: false
    },
    {
      id: '4',
      author: 'Sarah Williams',
      avatar: '/users/sarah-williams.jpg',
      rating: 4,
      date: '2024-01-05',
      comment: 'Great introduction to machine learning. The practical projects helped me understand the concepts better. Would love to see more advanced topics covered.',
      helpful: 15,
      isHelpful: false
    }
  ])

  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: '',
    isSubmitting: false
  })

  const renderStars = (rating: number, interactive = false, onRate?: (rating: number) => void) => {
    return Array.from({ length: 5 }, (_, index) => {
      const isFilled = index < rating
      const Icon = isFilled ? StarSolidIcon : StarIcon
      
      return (
        <button
          key={index}
          onClick={() => interactive && onRate && onRate(index + 1)}
          className={`${
            interactive ? 'hover:scale-110 transition-transform' : ''
          }`}
          disabled={!interactive}
        >
          <Icon className={`w-5 h-5 ${
            isFilled ? 'text-yellow-400' : 'text-white/30'
          }`} />
        </button>
      )
    })
  }

  const handleHelpfulClick = (reviewId: string) => {
    setReviews(prev => prev.map(review => 
      review.id === reviewId
        ? {
            ...review,
            helpful: review.isHelpful ? review.helpful - 1 : review.helpful + 1,
            isHelpful: !review.isHelpful
          }
        : review
    ))
  }

  const handleSubmitReview = async () => {
    if (!newReview.comment.trim()) return

    setNewReview(prev => ({ ...prev, isSubmitting: true }))

    // Simulate API call
    setTimeout(() => {
      const review: Review = {
        id: Date.now().toString(),
        author: 'You',
        rating: newReview.rating,
        date: new Date().toISOString().split('T')[0],
        comment: newReview.comment,
        helpful: 0,
        isHelpful: false
      }

      setReviews(prev => [review, ...prev])
      setNewReview({ rating: 5, comment: '', isSubmitting: false })
    }, 1000)
  }

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length

  return (
    <div className="space-y-8">
      {/* Rating Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-primary p-6 rounded-2xl"
      >
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
          {/* Average Rating */}
          <div className="text-center">
            <div className="text-5xl font-bold gradient-text">{averageRating.toFixed(1)}</div>
            <div className="flex justify-center my-2">
              {renderStars(Math.round(averageRating))}
            </div>
            <div className="text-white/70">Based on {reviews.length} reviews</div>
          </div>

          {/* Rating Breakdown */}
          <div className="flex-1 space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = reviews.filter(review => review.rating === rating).length
              const percentage = (count / reviews.length) * 100
              
              return (
                <div key={rating} className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1 w-16">
                    <span className="text-white text-sm">{rating}</span>
                    <StarIcon className="w-4 h-4 text-yellow-400" />
                  </div>
                  <div className="flex-1 bg-white/10 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-white/70 text-sm w-12 text-right">{count}</span>
                </div>
              )
            })}
          </div>
        </div>
      </motion.div>

      {/* Write Review */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-secondary p-6 rounded-2xl"
      >
        <h3 className="text-xl font-bold text-white mb-4">Write a Review</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-white/80 mb-2">Your Rating</label>
            <div className="flex space-x-1">
              {renderStars(newReview.rating, true, (rating) => 
                setNewReview(prev => ({ ...prev, rating }))
              )}
            </div>
          </div>
          <div>
            <label className="block text-white/80 mb-2">Your Review</label>
            <textarea
              value={newReview.comment}
              onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
              placeholder="Share your experience with this course..."
              rows={4}
              className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all duration-200"
            />
          </div>
          <button
            onClick={handleSubmitReview}
            disabled={!newReview.comment.trim() || newReview.isSubmitting}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed transition-all duration-200"
          >
            {newReview.isSubmitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </div>
      </motion.div>

      {/* Reviews List */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white">Student Reviews</h3>
        {reviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-neutral p-6 rounded-xl"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                {review.avatar ? (
                  <img
                    src={review.avatar}
                    alt={review.author}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <UserCircleIcon className="w-6 h-6 text-white" />
                  </div>
                )}
                <div>
                  <h4 className="text-white font-semibold">{review.author}</h4>
                  <div className="flex items-center space-x-2">
                    <div className="flex">
                      {renderStars(review.rating)}
                    </div>
                    <span className="text-white/60 text-sm">{review.date}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-white/80 mb-4">{review.comment}</p>
            
            <button
              onClick={() => handleHelpfulClick(review.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                review.isHelpful
                  ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              <HandThumbUpIcon className="w-4 h-4" />
              <span className="text-sm">Helpful ({review.helpful})</span>
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from '@heroicons/react/24/solid'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { type TestimonialProps } from '../../types/components'
import { GlassCard, GradientText } from '../ui'

const testimonials: TestimonialProps[] = [
  {
    name: 'Sarah Chen',
    role: 'Data Scientist',
    company: 'Google',
    avatar: '/api/placeholder/64/64',
    rating: 5,
    content: 'LearnAI transformed my career trajectory. The personalized learning paths and AI-driven insights helped me master machine learning concepts faster than I ever imagined possible.'
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Software Engineer',
    company: 'Microsoft',
    avatar: '/api/placeholder/64/64',
    rating: 5,
    content: 'The interactive coding challenges and real-world projects on LearnAI gave me the practical skills employers actually want. I landed my dream job in just 6 months!'
  },
  {
    name: 'Emily Watson',
    role: 'Product Manager',
    company: 'Stripe',
    avatar: '/api/placeholder/64/64',
    rating: 5,
    content: 'What sets LearnAI apart is how it adapts to my busy schedule. The bite-sized lessons and intelligent reminders kept me on track even during hectic work periods.'
  },
  {
    name: 'David Kim',
    role: 'AI Researcher',
    company: 'OpenAI',
    avatar: '/api/placeholder/64/64',
    rating: 5,
    content: 'The depth and quality of AI courses on LearnAI is exceptional. The hands-on labs and expert mentorship accelerated my research capabilities significantly.'
  },
  {
    name: 'Lisa Thompson',
    role: 'UX Designer',
    company: 'Apple',
    avatar: '/api/placeholder/64/64',
    rating: 5,
    content: 'LearnAI\'s design thinking courses and collaborative projects helped me transition from graphic design to UX. The community support was incredible throughout my journey.'
  },
  {
    name: 'Alex Zhang',
    role: 'DevOps Engineer',
    company: 'Amazon',
    avatar: '/api/placeholder/64/64',
    rating: 5,
    content: 'The cloud computing certification track on LearnAI was comprehensive and practical. I went from zero to AWS certified in just 3 months with their structured approach.'
  }
]

export const TestimonialSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const { ref, isInView } = useScrollAnimation(0.1)

  // Auto-play testimonials
  useEffect(() => {
    if (!isAutoPlaying || !isInView) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, isInView])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  return (
    <section 
      ref={ref}
      className="py-20 lg:py-32 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-900/10 via-transparent to-blue-900/10" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white block mb-2">What Our</span>
            <GradientText 
              variant="primary" 
              size="xxl"
              weight="bold"
              className="text-4xl md:text-5xl"
            >
              Learners Say
            </GradientText>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Join thousands of professionals who have transformed their careers with LearnAI
          </p>
        </motion.div>

        {/* Main Testimonial Display */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <GlassCard
                variant="primary"
                blur="lg"
                opacity={0.9}
                className="max-w-4xl mx-auto p-8 md:p-12 text-center relative"
              >
                {/* Quote Icon */}
                <div className="absolute top-4 left-4 text-6xl text-primary-400/20 font-serif">
                  "
                </div>

                {/* Rating Stars */}
                <div className="flex justify-center mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon 
                      key={i} 
                      className="w-6 h-6 text-yellow-400" 
                    />
                  ))}
                </div>

                {/* Testimonial Content */}
                <blockquote className="text-xl md:text-2xl text-white leading-relaxed mb-8 italic">
                  {testimonials[currentIndex].content}
                </blockquote>

                {/* Author Info */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary-500 to-blue-500 flex items-center justify-center text-white font-bold text-xl">
                    {testimonials[currentIndex].name.charAt(0)}
                  </div>
                  <div className="text-center md:text-left">
                    <div className="text-white font-semibold text-lg">
                      {testimonials[currentIndex].name}
                    </div>
                    <div className="text-primary-400 font-medium">
                      {testimonials[currentIndex].role}
                    </div>
                    <div className="text-white/60">
                      {testimonials[currentIndex].company}
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 glass-neutral rounded-full flex items-center justify-center text-white hover:glass-primary transition-all duration-300 group"
          >
            <ChevronLeftIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 glass-neutral rounded-full flex items-center justify-center text-white hover:glass-primary transition-all duration-300 group"
          >
            <ChevronRightIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </button>
        </div>

        {/* Testimonial Grid Preview */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              onClick={() => goToSlide(index)}
              className="cursor-pointer group"
            >
              <GlassCard
                variant="neutral"
                blur="md"
                opacity={0.7}
                hover={true}
                className="p-6 h-full"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-500 to-blue-500 flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-white font-semibold">
                      {testimonial.name}
                    </div>
                    <div className="text-white/60 text-sm">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>
                
                <div className="flex mb-3">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <StarIcon key={i} className="w-4 h-4 text-yellow-400" />
                  ))}
                </div>
                
                <p className="text-white/70 text-sm leading-relaxed line-clamp-3 group-hover:text-white/90 transition-colors">
                  {testimonial.content}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-primary-400 scale-110' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
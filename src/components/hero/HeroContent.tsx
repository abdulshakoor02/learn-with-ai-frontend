'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { PlayIcon, StarIcon } from '@heroicons/react/24/solid'
import { SparklesIcon, AcademicCapIcon, ChartBarIcon } from '@heroicons/react/24/outline'
import { GradientText, Button } from '../ui'
import { AuthModal } from '../auth'
import { staggerChildren } from '../../utils/animations'

const stats = [
  { icon: AcademicCapIcon, value: '100K+', label: 'Students' },
  { icon: ChartBarIcon, value: '95%', label: 'Success Rate' },
  { icon: StarIcon, value: '4.9', label: 'Rating' },
]

const highlights = [
  'AI-Powered Personalization',
  'Real-time Progress Tracking',
  'Interactive Learning Modules',
  'Expert-Curated Content'
]

export const HeroContent = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [showVideo, setShowVideo] = useState(false)

  const handleGetStarted = () => {
    setAuthModalOpen(true)
  }

  const handleWatchDemo = () => {
    setShowVideo(true)
  }

  return (
    <>
      <motion.div
        className="space-y-8"
        variants={staggerChildren}
        initial="initial"
        animate="animate"
      >
        {/* Badge */}
        <motion.div
          className="inline-flex items-center space-x-2 glass-primary px-4 py-2 rounded-full"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <SparklesIcon className="w-4 h-4 text-accent-400" />
          <span className="text-accent-400 font-medium text-sm">
            🎉 New: AI Study Assistant Now Available!
          </span>
        </motion.div>

        {/* Main Heading */}
        <div className="space-y-4">
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
            <span className="text-white block">Transform Your</span>
            <GradientText 
              variant="primary" 
              size="xxl"
              weight="bold"
              className="block text-5xl md:text-6xl lg:text-7xl"
            >
              Learning Journey
            </GradientText>
            <span className="text-white block">with AI</span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-white/80 leading-relaxed max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          >
            Experience personalized education powered by artificial intelligence. 
            Adapt, learn, and excel with content tailored specifically to your pace and style.
          </motion.p>
        </div>

        {/* Highlights */}
        <motion.div
          className="grid grid-cols-2 gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
        >
          {highlights.map((highlight, index) => (
            <motion.div
              key={highlight}
              className="flex items-center space-x-2 text-white/70"
              whileHover={{ scale: 1.02, x: 4 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-2 h-2 bg-primary-400 rounded-full" />
              <span className="text-sm font-medium">{highlight}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
        >
          <Button
            variant="primary"
            size="xl"
            onClick={handleGetStarted}
            className="group relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center space-x-2">
              <span>Get Started Free</span>
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                →
              </motion.div>
            </span>
          </Button>

          <Button
            variant="secondary"
            size="xl"
            onClick={handleWatchDemo}
            className="group"
          >
            <PlayIcon className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
            Watch Demo
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 pt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease: 'easeOut' }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-10 h-10 glass-primary rounded-xl flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-primary-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-white/60">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Social Proof */}
        <motion.div
          className="pt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: 'easeOut' }}
        >
          <div className="flex items-center space-x-4">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-500 to-blue-500 border-2 border-white/20 flex items-center justify-center text-white text-xs font-semibold"
                >
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <div className="text-white/70 text-sm">
              <span className="font-semibold text-white">10,000+</span> learners already started their journey
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultView="register"
      />

      {/* Video Modal */}
      {showVideo && (
        <motion.div
          className="fixed inset-0 z-90 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowVideo(false)}
        >
          <motion.div
            className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full h-full flex items-center justify-center text-white">
              <div className="text-center space-y-4">
                <PlayIcon className="w-16 h-16 mx-auto text-primary-400" />
                <p className="text-xl">Demo video would load here</p>
                <button
                  onClick={() => setShowVideo(false)}
                  className="px-6 py-3 glass-primary rounded-xl text-white font-medium hover:scale-105 transition-transform"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}
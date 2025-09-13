'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { SparklesIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { GlassCard, GradientText, Button } from '../ui'
import { AuthModal } from '../auth'

export const CTASection = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const { ref, isInView } = useScrollAnimation(0.1)

  const handleGetStarted = () => {
    setAuthModalOpen(true)
  }

  const benefits = [
    '14-day free trial',
    'No setup fees',
    'Cancel anytime',
    'Money-back guarantee'
  ]

  return (
    <>
      <motion.div
        ref={ref}
        className="mt-20"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <GlassCard
          variant="primary"
          blur="xl"
          opacity={0.95}
          className="relative overflow-hidden"
        >
          {/* Background Animation */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 via-blue-500/20 to-purple-500/20" />
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
            animate={{
              x: ['-100%', '100%']
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear'
            }}
          />

          <div className="relative z-10 text-center p-12 md:p-16">
            {/* Icon */}
            <motion.div
              className="w-16 h-16 mx-auto mb-6 glass-accent rounded-2xl flex items-center justify-center"
              initial={{ scale: 0, rotate: -45 }}
              animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -45 }}
              transition={{ duration: 0.6, delay: 0.2, type: 'spring', stiffness: 100 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <SparklesIcon className="w-8 h-8 text-accent-400" />
            </motion.div>

            {/* Heading */}
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <span className="text-white block mb-2">Ready to Start Your</span>
              <GradientText 
                variant="primary" 
                size="xxl"
                weight="bold"
                className="text-4xl md:text-5xl"
              >
                AI Learning Journey?
              </GradientText>
            </motion.h2>

            {/* Description */}
            <motion.p
              className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Join over 100,000 learners who are advancing their careers with AI-powered education. 
              Start your free trial today and experience the future of learning.
            </motion.p>

            {/* Benefits */}
            <motion.div
              className="flex flex-wrap justify-center gap-6 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  className="flex items-center space-x-2 text-white/90"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                  <span className="font-medium">{benefit}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <Button
                variant="primary"
                size="xl"
                onClick={handleGetStarted}
                className="group relative overflow-hidden min-w-[200px]"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <span>Start Free Trial</span>
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <ArrowRightIcon className="w-5 h-5" />
                  </motion.div>
                </span>
              </Button>

              <div className="text-center">
                <p className="text-white/70 text-sm">
                  No credit card required • Start learning immediately
                </p>
              </div>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              className="mt-12 pt-8 border-t border-white/20"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { metric: '100K+', label: 'Active Learners' },
                  { metric: '4.9★', label: 'User Rating' },
                  { metric: '95%', label: 'Success Rate' },
                  { metric: '24/7', label: 'Support' }
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.6, delay: 1.0 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-2xl font-bold text-white mb-1">
                      {item.metric}
                    </div>
                    <div className="text-white/70 text-sm">
                      {item.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Floating Elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white/30 rounded-full"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${10 + i * 20}%`
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 1, 0.3],
                  scale: [0.8, 1.2, 0.8]
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
            ))}
          </div>
        </GlassCard>
      </motion.div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultView="register"
      />
    </>
  )
}
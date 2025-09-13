'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { type StatisticProps } from '../../types/components'
import { GlassCard } from '../ui'

const statistics: StatisticProps[] = [
  {
    value: '100000',
    label: 'Active Learners',
    prefix: '',
    suffix: '+'
  },
  {
    value: '95',
    label: 'Success Rate',
    prefix: '',
    suffix: '%'
  },
  {
    value: '500',
    label: 'Expert Instructors',
    prefix: '',
    suffix: '+'
  },
  {
    value: '1000',
    label: 'Courses Available',
    prefix: '',
    suffix: '+'
  },
  {
    value: '50',
    label: 'Countries Served',
    prefix: '',
    suffix: '+'
  },
  {
    value: '4.9',
    label: 'Average Rating',
    prefix: '',
    suffix: '/5'
  }
]

const CountingNumber = ({ 
  value, 
  prefix = '', 
  suffix = '', 
  duration = 2000,
  isInView = false 
}: {
  value: string
  prefix?: string
  suffix?: string
  duration?: number
  isInView?: boolean
}) => {
  const [displayValue, setDisplayValue] = useState('0')
  
  useEffect(() => {
    if (!isInView) return

    const numericValue = parseFloat(value.replace(/,/g, ''))
    const isDecimal = value.includes('.')
    
    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentValue = numericValue * easeOutQuart
      
      if (isDecimal) {
        setDisplayValue(currentValue.toFixed(1))
      } else if (numericValue >= 1000) {
        setDisplayValue(Math.floor(currentValue).toLocaleString())
      } else {
        setDisplayValue(Math.floor(currentValue).toString())
      }
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }
    
    animationFrame = requestAnimationFrame(animate)
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [value, duration, isInView])

  return (
    <span className="tabular-nums">
      {prefix}{displayValue}{suffix}
    </span>
  )
}

export const StatisticsPanel = () => {
  const { ref, isInView } = useScrollAnimation(0.1)

  return (
    <section 
      ref={ref}
      className="py-20 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/5 via-transparent to-blue-900/5" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Trusted by Learners Worldwide
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Join a global community of ambitious professionals accelerating their careers
          </p>
        </motion.div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {statistics.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.9 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: 'easeOut' 
              }}
            >
              <GlassCard
                variant="neutral"
                blur="md"
                opacity={0.8}
                hover={true}
                className="p-6 text-center group"
              >
                {/* Animated Number */}
                <motion.div
                  className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:text-primary-300 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <CountingNumber
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    isInView={isInView}
                    duration={2000 + index * 200}
                  />
                </motion.div>

                {/* Label */}
                <p className="text-white/70 text-sm font-medium group-hover:text-white/90 transition-colors duration-300">
                  {stat.label}
                </p>

                {/* Hover Effect Line */}
                <motion.div
                  className="h-1 bg-gradient-to-r from-primary-500 to-blue-500 rounded-full mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                />
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Additional Context */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
        >
          <GlassCard
            variant="primary"
            blur="lg"
            opacity={0.8}
            className="max-w-4xl mx-auto p-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-2xl font-bold text-white mb-2">
                  <CountingNumber
                    value="24"
                    suffix="/7"
                    isInView={isInView}
                    duration={1500}
                  />
                </div>
                <p className="text-white/80">Support Available</p>
              </div>
              
              <div>
                <div className="text-2xl font-bold text-white mb-2">
                  <CountingNumber
                    value="99.9"
                    suffix="%"
                    isInView={isInView}
                    duration={1800}
                  />
                </div>
                <p className="text-white/80">Uptime Guarantee</p>
              </div>
              
              <div>
                <div className="text-2xl font-bold text-white mb-2">
                  <CountingNumber
                    value="30"
                    suffix=" Days"
                    isInView={isInView}
                    duration={1600}
                  />
                </div>
                <p className="text-white/80">Money-back Guarantee</p>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  )
}
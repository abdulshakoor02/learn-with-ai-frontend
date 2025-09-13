'use client'

import { motion } from 'framer-motion'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { type FeatureCardProps } from '../../types/components'
import { GlassCard } from '../ui'

export const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  delay = 0 
}: FeatureCardProps) => {
  const { ref, isInView } = useScrollAnimation(0.1)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ 
        duration: 0.6, 
        delay: delay,
        ease: 'easeOut' 
      }}
    >
      <GlassCard
        variant="neutral"
        blur="md"
        opacity={0.8}
        hover={true}
        className="h-full p-6 group cursor-pointer"
      >
        {/* Icon Container */}
        <motion.div
          className="mb-6"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {icon}
        </motion.div>

        {/* Content */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white group-hover:text-primary-300 transition-colors duration-300">
            {title}
          </h3>
          
          <p className="text-white/70 group-hover:text-white/90 transition-colors duration-300 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Hover Effect Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-blue-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          initial={{ scale: 0.8 }}
          whileHover={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        />

        {/* Bottom Accent Line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-blue-500 rounded-b-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </GlassCard>
    </motion.div>
  )
}

// Alternative feature card layouts
export const LargeFeatureCard = ({ 
  icon, 
  title, 
  description, 
  delay = 0 
}: FeatureCardProps) => {
  const { ref, isInView } = useScrollAnimation(0.1)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ 
        duration: 0.6, 
        delay: delay,
        ease: 'easeOut' 
      }}
      className="col-span-1 md:col-span-2"
    >
      <GlassCard
        variant="primary"
        blur="lg"
        opacity={0.9}
        hover={true}
        className="h-full p-8 group cursor-pointer"
      >
        <div className="flex flex-col md:flex-row items-start gap-6">
          {/* Icon Container */}
          <motion.div
            className="flex-shrink-0"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {icon}
          </motion.div>

          {/* Content */}
          <div className="space-y-4 flex-1">
            <h3 className="text-2xl font-bold text-white group-hover:text-primary-300 transition-colors duration-300">
              {title}
            </h3>
            
            <p className="text-white/80 group-hover:text-white/95 transition-colors duration-300 leading-relaxed text-lg">
              {description}
            </p>

            {/* Additional Features List */}
            <div className="pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {['Advanced Analytics', 'Real-time Feedback', 'Progress Tracking', 'Expert Support'].map((feature, index) => (
                  <motion.div
                    key={feature}
                    className="flex items-center space-x-2 text-white/70 group-hover:text-white/90 transition-colors duration-300"
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                    transition={{ delay: delay + 0.1 + index * 0.05 }}
                  >
                    <div className="w-1.5 h-1.5 bg-primary-400 rounded-full" />
                    <span className="text-sm">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  )
}

// Compact feature card for dense layouts
export const CompactFeatureCard = ({ 
  icon, 
  title, 
  description, 
  delay = 0 
}: FeatureCardProps) => {
  const { ref, isInView } = useScrollAnimation(0.1)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ 
        duration: 0.5, 
        delay: delay,
        ease: 'easeOut' 
      }}
    >
      <GlassCard
        variant="secondary"
        blur="sm"
        opacity={0.7}
        hover={true}
        className="p-4 group cursor-pointer text-center"
      >
        {/* Icon */}
        <motion.div
          className="mb-3 flex justify-center"
          whileHover={{ scale: 1.2, rotate: 10 }}
          transition={{ duration: 0.2 }}
        >
          {icon}
        </motion.div>

        {/* Title */}
        <h4 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors duration-300 mb-2">
          {title}
        </h4>

        {/* Description */}
        <p className="text-white/60 group-hover:text-white/80 transition-colors duration-300 text-sm leading-relaxed">
          {description}
        </p>
      </GlassCard>
    </motion.div>
  )
}
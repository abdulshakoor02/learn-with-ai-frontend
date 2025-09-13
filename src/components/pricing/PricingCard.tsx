'use client'

import { motion } from 'framer-motion'
import { CheckIcon, StarIcon } from '@heroicons/react/24/solid'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { type PricingTierProps } from '../../types/components'
import { GlassCard, Button } from '../ui'

export const PricingCard = ({ 
  name, 
  price, 
  period, 
  description, 
  features, 
  highlighted = false,
  buttonText,
  onSelectPlan,
  delay = 0
}: PricingTierProps) => {
  const { ref, isInView } = useScrollAnimation(0.1)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
      transition={{ 
        duration: 0.6, 
        delay: delay,
        ease: 'easeOut' 
      }}
      className={`relative ${highlighted ? 'transform lg:scale-105' : ''}`}
    >
      {/* Popular Badge */}
      {highlighted && (
        <motion.div
          className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10"
          initial={{ opacity: 0, y: -10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
          transition={{ duration: 0.6, delay: delay + 0.2 }}
        >
          <div className="bg-gradient-to-r from-primary-500 to-blue-500 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center space-x-1 shadow-lg">
            <StarIcon className="w-4 h-4" />
            <span>Most Popular</span>
          </div>
        </motion.div>
      )}

      <GlassCard
        variant={highlighted ? "primary" : "neutral"}
        blur="lg"
        opacity={highlighted ? 0.95 : 0.8}
        hover={true}
        className="h-full p-8 group relative overflow-hidden"
      >
        {/* Background Glow for Highlighted Card */}
        {highlighted && (
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        )}

        <div className="relative z-10">
          {/* Plan Header */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">
              {name}
            </h3>
            <p className="text-white/70 mb-6">
              {description}
            </p>
            
            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline justify-center">
                <span className="text-5xl font-bold text-white">
                  {price}
                </span>
                {price !== '$0' && (
                  <span className="text-white/70 ml-2">
                    /{period}
                  </span>
                )}
              </div>
              {name === 'Pro' && (
                <p className="text-primary-400 text-sm mt-2">
                  14-day free trial
                </p>
              )}
            </div>
          </div>

          {/* Features List */}
          <div className="space-y-4 mb-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature}
                className="flex items-start space-x-3"
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                transition={{ 
                  duration: 0.4, 
                  delay: delay + 0.1 + index * 0.05 
                }}
              >
                <div className="flex-shrink-0 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
                  <CheckIcon className="w-3 h-3 text-white" />
                </div>
                <span className="text-white/80 group-hover:text-white transition-colors duration-300">
                  {feature}
                </span>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <Button
            variant={highlighted ? "primary" : "secondary"}
            size="lg"
            onClick={onSelectPlan}
            className="w-full group-hover:scale-105 transition-transform duration-300"
          >
            {buttonText}
          </Button>

          {/* Additional Info */}
          <div className="mt-6 text-center">
            <p className="text-white/60 text-sm">
              {name === 'Free' && 'No credit card required'}
              {name === 'Pro' && 'Cancel anytime'}
              {name === 'Enterprise' && 'Custom pricing available'}
            </p>
          </div>
        </div>

        {/* Animated Border for Highlighted Card */}
        {highlighted && (
          <motion.div
            className="absolute inset-0 rounded-xl"
            style={{
              background: 'linear-gradient(45deg, transparent, rgba(124, 58, 237, 0.3), transparent, rgba(59, 130, 246, 0.3), transparent)',
              backgroundSize: '400% 400%'
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        )}
      </GlassCard>
    </motion.div>
  )
}
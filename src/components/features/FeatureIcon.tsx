'use client'

import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

interface FeatureIconProps {
  Icon: React.ComponentType<any>
  gradient?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  animated?: boolean
  delay?: number
  className?: string
}

export const FeatureIcon = ({ 
  Icon, 
  gradient = 'from-primary-500 to-blue-500',
  size = 'md',
  animated = true,
  delay = 0,
  className 
}: FeatureIconProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8 p-2',
    md: 'w-12 h-12 p-3',
    lg: 'w-16 h-16 p-4',
    xl: 'w-20 h-20 p-5'
  }

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-10 h-10'
  }

  return (
    <motion.div
      className={cn(
        'relative rounded-xl flex items-center justify-center',
        `bg-gradient-to-r ${gradient}`,
        sizeClasses[size],
        className
      )}
      initial={animated ? { 
        opacity: 0, 
        scale: 0.5,
        rotate: -45 
      } : undefined}
      animate={animated ? { 
        opacity: 1, 
        scale: 1,
        rotate: 0 
      } : undefined}
      transition={animated ? { 
        duration: 0.6, 
        delay: delay,
        ease: 'easeOut',
        type: 'spring',
        stiffness: 100
      } : undefined}
      whileHover={animated ? { 
        scale: 1.1,
        rotate: 5,
        transition: { duration: 0.2 }
      } : undefined}
    >
      {/* Background Glow Effect */}
      <motion.div
        className={cn(
          'absolute inset-0 rounded-xl blur-lg opacity-50',
          `bg-gradient-to-r ${gradient}`
        )}
        animate={animated ? {
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5]
        } : undefined}
        transition={animated ? {
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut'
        } : undefined}
      />

      {/* Icon */}
      <Icon className={cn('text-white relative z-10', iconSizes[size])} />

      {/* Floating Particles */}
      {animated && (
        <div className="absolute inset-0 pointer-events-none">
          {[1, 2, 3].map((particle) => (
            <motion.div
              key={particle}
              className="absolute w-1 h-1 bg-white/60 rounded-full"
              style={{
                top: `${20 + particle * 15}%`,
                left: `${30 + particle * 10}%`
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.6, 1, 0.6],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 2 + particle * 0.5,
                delay: delay + particle * 0.2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  )
}

// Preset icon components
export const PrimaryFeatureIcon = (props: Omit<FeatureIconProps, 'gradient'>) => (
  <FeatureIcon {...props} gradient="from-primary-500 to-blue-500" />
)

export const SecondaryFeatureIcon = (props: Omit<FeatureIconProps, 'gradient'>) => (
  <FeatureIcon {...props} gradient="from-blue-500 to-purple-500" />
)

export const AccentFeatureIcon = (props: Omit<FeatureIconProps, 'gradient'>) => (
  <FeatureIcon {...props} gradient="from-accent-500 to-orange-500" />
)

export const SuccessFeatureIcon = (props: Omit<FeatureIconProps, 'gradient'>) => (
  <FeatureIcon {...props} gradient="from-green-500 to-teal-500" />
)

// Animated icon with pulse effect
export const PulseFeatureIcon = ({ 
  Icon, 
  gradient = 'from-primary-500 to-blue-500',
  size = 'md',
  delay = 0,
  className 
}: FeatureIconProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8 p-2',
    md: 'w-12 h-12 p-3',
    lg: 'w-16 h-16 p-4',
    xl: 'w-20 h-20 p-5'
  }

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-10 h-10'
  }

  return (
    <div className="relative">
      {/* Pulse Rings */}
      {[1, 2, 3].map((ring) => (
        <motion.div
          key={ring}
          className={cn(
            'absolute rounded-xl border-2 border-white/30',
            sizeClasses[size]
          )}
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
          animate={{
            scale: [1, 2, 3],
            opacity: [0.7, 0.3, 0]
          }}
          transition={{
            duration: 2,
            delay: delay + ring * 0.3,
            repeat: Infinity,
            ease: 'easeOut'
          }}
        />
      ))}

      {/* Main Icon */}
      <FeatureIcon
        Icon={Icon}
        gradient={gradient}
        size={size}
        animated={true}
        delay={delay}
        className={className}
      />
    </div>
  )
}

// Floating icon with orbit effect
export const OrbitFeatureIcon = ({ 
  Icon, 
  gradient = 'from-primary-500 to-blue-500',
  size = 'md',
  delay = 0,
  className 
}: FeatureIconProps) => {
  return (
    <div className="relative">
      {/* Orbiting Elements */}
      {[1, 2, 3].map((orbit) => (
        <motion.div
          key={orbit}
          className="absolute w-2 h-2 bg-white/40 rounded-full"
          style={{
            top: '50%',
            left: '50%'
          }}
          animate={{
            rotate: 360
          }}
          transition={{
            duration: 4 + orbit,
            delay: delay + orbit * 0.5,
            repeat: Infinity,
            ease: 'linear'
          }}
        >
          <div 
            className="w-2 h-2 bg-primary-400 rounded-full"
            style={{
              transform: `translateX(${20 + orbit * 5}px) translateY(-50%)`
            }}
          />
        </motion.div>
      ))}

      {/* Central Icon */}
      <FeatureIcon
        Icon={Icon}
        gradient={gradient}
        size={size}
        animated={true}
        delay={delay}
        className={className}
      />
    </div>
  )
}
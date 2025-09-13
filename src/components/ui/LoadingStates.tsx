'use client'

import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: 'primary' | 'secondary' | 'accent' | 'white'
  className?: string
}

interface LoadingDotsProps {
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'secondary' | 'accent' | 'white'
  className?: string
}

interface LoadingPulseProps {
  className?: string
}

interface LoadingSkeletonProps {
  className?: string
  lines?: number
  animated?: boolean
}

// Loading Spinner Component
export const LoadingSpinner = ({ 
  size = 'md', 
  color = 'primary', 
  className 
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
    lg: 'w-8 h-8 border-3',
    xl: 'w-12 h-12 border-4'
  }
  
  const colorClasses = {
    primary: 'border-primary-500 border-t-transparent',
    secondary: 'border-blue-500 border-t-transparent',
    accent: 'border-accent-500 border-t-transparent',
    white: 'border-white border-t-transparent'
  }

  return (
    <motion.div
      className={cn(
        'rounded-full',
        sizeClasses[size],
        colorClasses[color],
        className
      )}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: 'linear'
      }}
    />
  )
}

// Loading Dots Component
export const LoadingDots = ({ 
  size = 'md', 
  color = 'primary', 
  className 
}: LoadingDotsProps) => {
  const sizeClasses = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-3 h-3'
  }
  
  const colorClasses = {
    primary: 'bg-primary-500',
    secondary: 'bg-blue-500',
    accent: 'bg-accent-500',
    white: 'bg-white'
  }

  return (
    <div className={cn('flex space-x-1', className)}>
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className={cn(
            'rounded-full',
            sizeClasses[size],
            colorClasses[color]
          )}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: index * 0.2,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  )
}

// Loading Pulse Component
export const LoadingPulse = ({ className }: LoadingPulseProps) => {
  return (
    <motion.div
      className={cn(
        'w-16 h-16 rounded-full',
        'bg-gradient-to-r from-primary-500 to-blue-500',
        'opacity-75',
        className
      )}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.7, 1, 0.7]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    />
  )
}

// Loading Wave Component
export const LoadingWave = ({ className }: { className?: string }) => {
  return (
    <div className={cn('flex items-center space-x-1', className)}>
      {[0, 1, 2, 3, 4].map((index) => (
        <motion.div
          key={index}
          className="w-1 bg-gradient-to-t from-primary-500 to-blue-500 rounded-full"
          animate={{
            height: ['10px', '20px', '10px'],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: index * 0.1,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  )
}

// Loading Skeleton Component
export const LoadingSkeleton = ({ 
  className, 
  lines = 3, 
  animated = true 
}: LoadingSkeletonProps) => {
  return (
    <div className={cn('space-y-3', className)}>
      {Array.from({ length: lines }).map((_, index) => (
        <motion.div
          key={index}
          className="h-4 bg-white/10 rounded-lg backdrop-blur-sm"
          style={{
            width: index === lines - 1 ? '60%' : '100%'
          }}
          animate={animated ? {
            opacity: [0.5, 1, 0.5]
          } : undefined}
          transition={animated ? {
            duration: 1.5,
            repeat: Infinity,
            delay: index * 0.2,
            ease: 'easeInOut'
          } : undefined}
        />
      ))}
    </div>
  )
}

// Loading Card Skeleton
export const LoadingCardSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className={cn('glass-neutral p-6 rounded-2xl space-y-4', className)}>
      <motion.div
        className="h-6 bg-white/10 rounded-lg w-3/4"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <LoadingSkeleton lines={3} />
      <motion.div
        className="h-10 bg-white/10 rounded-lg w-1/3"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.5, ease: 'easeInOut' }}
      />
    </div>
  )
}

// Full Screen Loading Component
export const FullScreenLoading = ({ 
  message = 'Loading...',
  showLogo = true 
}: { 
  message?: string
  showLogo?: boolean 
}) => {
  return (
    <motion.div
      className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="glass-primary p-8 rounded-3xl text-center space-y-6">
        {showLogo && (
          <motion.div
            className="w-16 h-16 mx-auto"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            <div className="w-full h-full rounded-full bg-gradient-to-r from-primary-500 to-blue-500" />
          </motion.div>
        )}
        
        <LoadingDots size="lg" color="white" />
        
        {message && (
          <motion.p
            className="text-white text-lg font-medium"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            {message}
          </motion.p>
        )}
      </div>
    </motion.div>
  )
}

// Loading Button Content
export const LoadingButtonContent = ({ 
  loading, 
  children, 
  loadingText = 'Loading...' 
}: {
  loading: boolean
  children: React.ReactNode
  loadingText?: string
}) => {
  return (
    <>
      {loading && (
        <LoadingSpinner size="sm" color="white" className="mr-2" />
      )}
      {loading ? loadingText : children}
    </>
  )
}
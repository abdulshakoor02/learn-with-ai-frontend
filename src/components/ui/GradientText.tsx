'use client'

import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

interface GradientTextProps {
  children: React.ReactNode
  className?: string
  variant?: 'primary' | 'secondary' | 'accent' | 'rainbow'
  animated?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  weight?: 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold'
}

export const GradientText = forwardRef<HTMLSpanElement, GradientTextProps>(
  ({ 
    children, 
    className, 
    variant = 'primary',
    animated = true,
    size = 'md',
    weight = 'semibold',
    ...props 
  }, ref) => {
    const baseClasses = 'bg-clip-text text-transparent bg-gradient-to-r'
    
    const variantClasses = {
      primary: 'from-primary-400 via-blue-400 to-primary-600',
      secondary: 'from-blue-400 via-purple-400 to-blue-600',
      accent: 'from-accent-400 via-orange-400 to-accent-600',
      rainbow: 'from-primary-400 via-blue-400 via-green-400 via-accent-400 to-red-400'
    }
    
    const sizeClasses = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      xxl: 'text-2xl'
    }
    
    const weightClasses = {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
      extrabold: 'font-extrabold'
    }

    return (
      <motion.span
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          weightClasses[weight],
          animated && 'bg-300% animate-gradient-shift',
          className
        )}
        initial={animated ? { backgroundPosition: '0% 50%' } : undefined}
        animate={animated ? { backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] } : undefined}
        transition={animated ? {
          duration: 8,
          ease: 'easeInOut',
          repeat: Infinity,
        } : undefined}
        {...props}
      >
        {children}
      </motion.span>
    )
  }
)

GradientText.displayName = 'GradientText'

// Preset gradient text components
export const PrimaryGradientText = forwardRef<HTMLSpanElement, Omit<GradientTextProps, 'variant'>>(
  (props, ref) => (
    <GradientText ref={ref} variant="primary" {...props} />
  )
)

export const SecondaryGradientText = forwardRef<HTMLSpanElement, Omit<GradientTextProps, 'variant'>>(
  (props, ref) => (
    <GradientText ref={ref} variant="secondary" {...props} />
  )
)

export const AccentGradientText = forwardRef<HTMLSpanElement, Omit<GradientTextProps, 'variant'>>(
  (props, ref) => (
    <GradientText ref={ref} variant="accent" {...props} />
  )
)

export const RainbowGradientText = forwardRef<HTMLSpanElement, Omit<GradientTextProps, 'variant'>>(
  (props, ref) => (
    <GradientText ref={ref} variant="rainbow" {...props} />
  )
)

// Animated heading component with gradient text
export const GradientHeading = forwardRef<HTMLHeadingElement, GradientTextProps & {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}>(({ as: Component = 'h1', ...props }, ref) => (
  <Component ref={ref}>
    <GradientText {...props} />
  </Component>
))

GradientHeading.displayName = 'GradientHeading'

PrimaryGradientText.displayName = 'PrimaryGradientText'
SecondaryGradientText.displayName = 'SecondaryGradientText'
AccentGradientText.displayName = 'AccentGradientText'
RainbowGradientText.displayName = 'RainbowGradientText'
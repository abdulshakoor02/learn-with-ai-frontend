'use client'

import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'
import { type GlassCardProps } from '../../types/components'
import { generateGlassClasses } from '../../utils/glassmorphism'

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ 
    variant = 'neutral', 
    blur = 'md', 
    opacity = 0.8, 
    children, 
    className, 
    hover = false,
    ...props 
  }, ref) => {
    const glassClasses = generateGlassClasses(variant, blur, hover)
    
    return (
      <motion.div
        ref={ref}
        className={cn(
          glassClasses,
          'relative overflow-hidden',
          className
        )}
        style={{ 
          opacity,
          '--glass-opacity': opacity 
        } as React.CSSProperties}
        whileHover={hover ? { 
          scale: 1.02,
          y: -4 
        } : undefined}
        transition={{ 
          duration: 0.3, 
          ease: 'easeOut' 
        }}
        {...props}
      >
        {/* Glass effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
        
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </motion.div>
    )
  }
)

GlassCard.displayName = 'GlassCard'

// Preset variants for common use cases
export const PrimaryGlassCard = forwardRef<HTMLDivElement, Omit<GlassCardProps, 'variant'>>(
  (props, ref) => (
    <GlassCard ref={ref} variant="primary" {...props} />
  )
)

export const SecondaryGlassCard = forwardRef<HTMLDivElement, Omit<GlassCardProps, 'variant'>>(
  (props, ref) => (
    <GlassCard ref={ref} variant="secondary" {...props} />
  )
)

export const AccentGlassCard = forwardRef<HTMLDivElement, Omit<GlassCardProps, 'variant'>>(
  (props, ref) => (
    <GlassCard ref={ref} variant="accent" {...props} />
  )
)

export const NeutralGlassCard = forwardRef<HTMLDivElement, Omit<GlassCardProps, 'variant'>>(
  (props, ref) => (
    <GlassCard ref={ref} variant="neutral" {...props} />
  )
)

PrimaryGlassCard.displayName = 'PrimaryGlassCard'
SecondaryGlassCard.displayName = 'SecondaryGlassCard'
AccentGlassCard.displayName = 'AccentGlassCard'
NeutralGlassCard.displayName = 'NeutralGlassCard'
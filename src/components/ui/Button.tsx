'use client'

import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'
import { type ButtonProps } from '../../types/components'
import { buttonHover } from '../../utils/animations'

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = 'primary', 
    size = 'md', 
    children, 
    className, 
    disabled = false,
    loading = false,
    onClick,
    type = 'button',
    ...props 
  }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center font-semibold transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary-500/50 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden'
    
    const variantClasses = {
      primary: 'glass-button-primary text-white',
      secondary: 'glass-button-secondary',
      outline: 'border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white bg-transparent backdrop-blur-sm',
      ghost: 'text-primary-500 hover:bg-primary-500 hover:bg-opacity-10 bg-transparent'
    }
    
    const sizeClasses = {
      sm: 'px-4 py-2 text-sm rounded-lg h-9',
      md: 'px-6 py-3 text-base rounded-xl h-12',
      lg: 'px-8 py-4 text-lg rounded-xl h-14',
      xl: 'px-10 py-5 text-xl rounded-2xl h-16'
    }

    const handleClick = () => {
      if (!disabled && !loading && onClick) {
        onClick()
      }
    }

    return (
      <motion.button
        ref={ref}
        type={type}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        disabled={disabled || loading}
        onClick={handleClick}
        variants={buttonHover}
        whileHover={!disabled && !loading ? 'hover' : undefined}
        whileTap={!disabled && !loading ? 'tap' : undefined}
        {...props}
      >
        {/* Loading spinner */}
        {loading && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
          </motion.div>
        )}
        
        {/* Button content */}
        <motion.span
          className={cn(
            'flex items-center gap-2',
            loading && 'invisible'
          )}
          initial={{ opacity: 1 }}
          animate={{ opacity: loading ? 0 : 1 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.span>
        
        {/* Shine effect for primary variant */}
        {variant === 'primary' && !disabled && (
          <div className="absolute inset-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-x-12 transition-transform duration-700 group-hover:left-full" />
        )}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'

// Preset button variants
export const PrimaryButton = forwardRef<HTMLButtonElement, Omit<ButtonProps, 'variant'>>(
  (props, ref) => (
    <Button ref={ref} variant="primary" {...props} />
  )
)

export const SecondaryButton = forwardRef<HTMLButtonElement, Omit<ButtonProps, 'variant'>>(
  (props, ref) => (
    <Button ref={ref} variant="secondary" {...props} />
  )
)

export const OutlineButton = forwardRef<HTMLButtonElement, Omit<ButtonProps, 'variant'>>(
  (props, ref) => (
    <Button ref={ref} variant="outline" {...props} />
  )
)

export const GhostButton = forwardRef<HTMLButtonElement, Omit<ButtonProps, 'variant'>>(
  (props, ref) => (
    <Button ref={ref} variant="ghost" {...props} />
  )
)

PrimaryButton.displayName = 'PrimaryButton'
SecondaryButton.displayName = 'SecondaryButton'
OutlineButton.displayName = 'OutlineButton'
GhostButton.displayName = 'GhostButton'
'use client'

import { forwardRef, useState } from 'react'
import { motion } from 'framer-motion'
import { EyeIcon, EyeSlashIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline'
import { cn } from '../../utils/cn'
import { type InputProps } from '../../types/components'

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    type, 
    placeholder, 
    value, 
    onChange, 
    error, 
    disabled = false, 
    className, 
    label,
    required = false,
    ...props 
  }, ref) => {
    const [showPassword, setShowPassword] = useState(false)
    const [isFocused, setIsFocused] = useState(false)
    
    const isPassword = type === 'password'
    const inputType = isPassword && showPassword ? 'text' : type

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e.target.value)
      }
    }

    return (
      <div className="space-y-2">
        {/* Label */}
        {label && (
          <label className="block text-sm font-medium text-white/80">
            {label}
            {required && <span className="text-red-400 ml-1">*</span>}
          </label>
        )}
        
        {/* Input Container */}
        <div className="relative">
          <motion.input
            ref={ref}
            type={inputType}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            disabled={disabled}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={cn(
              // Base styles
              'w-full px-4 py-3 text-white placeholder:text-white/50',
              'glass-input',
              'transition-all duration-300',
              // Focus styles
              isFocused && 'ring-4 ring-primary-500/20 border-primary-500',
              // Error styles
              error && 'border-red-500 ring-4 ring-red-500/20',
              // Disabled styles
              disabled && 'opacity-50 cursor-not-allowed',
              // Password field padding
              isPassword && 'pr-12',
              className
            )}
            animate={{
              scale: isFocused ? 1.02 : 1,
            }}
            transition={{
              duration: 0.2,
              ease: 'easeOut'
            }}
            {...props}
          />
          
          {/* Password toggle button */}
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={disabled}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-white/60 hover:text-white transition-colors duration-200 disabled:opacity-50"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <EyeSlashIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </button>
          )}
          
          {/* Error icon */}
          {error && !isPassword && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <ExclamationCircleIcon className="w-5 h-5 text-red-400" />
            </div>
          )}
        </div>
        
        {/* Error message */}
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-sm text-red-400 flex items-center gap-1"
          >
            <ExclamationCircleIcon className="w-4 h-4 flex-shrink-0" />
            {error}
          </motion.p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

// Specialized input components
export const EmailInput = forwardRef<HTMLInputElement, Omit<InputProps, 'type'>>(
  (props, ref) => (
    <Input ref={ref} type="email" {...props} />
  )
)

export const PasswordInput = forwardRef<HTMLInputElement, Omit<InputProps, 'type'>>(
  (props, ref) => (
    <Input ref={ref} type="password" {...props} />
  )
)

export const TextInput = forwardRef<HTMLInputElement, Omit<InputProps, 'type'>>(
  (props, ref) => (
    <Input ref={ref} type="text" {...props} />
  )
)

export const TelInput = forwardRef<HTMLInputElement, Omit<InputProps, 'type'>>(
  (props, ref) => (
    <Input ref={ref} type="tel" {...props} />
  )
)

export const UrlInput = forwardRef<HTMLInputElement, Omit<InputProps, 'type'>>(
  (props, ref) => (
    <Input ref={ref} type="url" {...props} />
  )
)

EmailInput.displayName = 'EmailInput'
PasswordInput.displayName = 'PasswordInput'
TextInput.displayName = 'TextInput'
TelInput.displayName = 'TelInput'
UrlInput.displayName = 'UrlInput'
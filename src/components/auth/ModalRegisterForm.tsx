'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { EyeIcon, EyeSlashIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import { registerSchema, type RegisterFormData } from '../../utils/validation'
import { UsersService } from '@/services/api'
import { Button, LoadingSpinner } from '../ui'
import { cn } from '../../utils/cn'

interface ModalRegisterFormProps {
  onSwitchToLogin: () => void
  onClose: () => void
}

export const ModalRegisterForm = ({
  onSwitchToLogin,
  onClose
}: ModalRegisterFormProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange'
  })

  const watchedPassword = watch('password')
  const watchedConfirmPassword = watch('confirmPassword')

  const passwordRequirements = [
    { label: 'At least 8 characters', met: watchedPassword?.length >= 8 },
    { label: 'One uppercase letter', met: /[A-Z]/.test(watchedPassword || '') },
    { label: 'One lowercase letter', met: /[a-z]/.test(watchedPassword || '') },
    { label: 'One number', met: /[0-9]/.test(watchedPassword || '') },
    { label: 'One special character', met: /[^A-Za-z0-9]/.test(watchedPassword || '') },
  ]

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsLoading(true)
      setError(null)

      // Prepare data for API (combine first and last name)
      const userData = {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        mobile: data.mobile,
        password: data.password
      }

      console.log('Registering user with data:', userData)
      
      // Call API to create user
      const response = await UsersService.createUser(userData)
      
      console.log('Registration successful:', response)
      setSuccess(true)
      
      // Auto-close modal after showing success message
      setTimeout(() => {
        onClose()
        // Optionally switch to login form
        // onSwitchToLogin()
      }, 2000)
      
    } catch (err: any) {
      console.error('Registration error:', err)
      
      // Extract error message from API response
      let errorMessage = 'Registration failed. Please try again.'
      
      if (err?.message) {
        if (typeof err.message === 'string') {
          errorMessage = err.message
        } else if (Array.isArray(err.message)) {
          errorMessage = err.message[0] || errorMessage
        }
      }
      
      // Handle specific error cases
      if (errorMessage.toLowerCase().includes('email') && errorMessage.toLowerCase().includes('already')) {
        errorMessage = 'An account with this email already exists. Please use a different email or try signing in.'
      } else if (errorMessage.toLowerCase().includes('mobile') && errorMessage.toLowerCase().includes('already')) {
        errorMessage = 'An account with this mobile number already exists. Please use a different number or try signing in.'
      }
      
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  // Show success message
  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="space-y-6 text-center p-8"
      >
        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
          <CheckCircleIcon className="w-10 h-10 text-white" />
        </div>
        
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-white">Account Created Successfully!</h2>
          <p className="text-white/70 max-w-sm mx-auto">
            Welcome to LearnAI! Your account has been created and you can now start your learning journey.
          </p>
        </div>

        <Button
          variant="primary"
          size="lg"
          onClick={onSwitchToLogin}
          className="w-full"
        >
          Sign In Now
        </Button>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-white">Create Account</h2>
        <p className="text-white/70">Join us and start your learning journey</p>
      </div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 rounded-xl bg-red-500 bg-opacity-10 border border-red-500 border-opacity-20 text-red-400 text-sm"
        >
          {error}
        </motion.div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Name Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/80">
              First Name
            </label>
            <input
              {...register('firstName')}
              type="text"
              placeholder="First name"
              className={cn(
                'w-full px-4 py-3 glass-input',
                errors.firstName && 'border-red-500 ring-4 ring-red-500/20'
              )}
            />
            {errors.firstName && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm"
              >
                {errors.firstName.message}
              </motion.p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/80">
              Last Name
            </label>
            <input
              {...register('lastName')}
              type="text"
              placeholder="Last name"
              className={cn(
                'w-full px-4 py-3 glass-input',
                errors.lastName && 'border-red-500 ring-4 ring-red-500/20'
              )}
            />
            {errors.lastName && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm"
              >
                {errors.lastName.message}
              </motion.p>
            )}
          </div>
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white/80">
            Email Address
          </label>
          <input
            {...register('email')}
            type="email"
            placeholder="Enter your email"
            className={cn(
              'w-full px-4 py-3 glass-input',
              errors.email && 'border-red-500 ring-4 ring-red-500/20'
            )}
          />
          {errors.email && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-sm"
            >
              {errors.email.message}
            </motion.p>
          )}
        </div>

        {/* Mobile Field */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white/80">
            Mobile Number
          </label>
          <input
            {...register('mobile')}
            type="tel"
            placeholder="Enter your mobile number (e.g., +1234567890)"
            className={cn(
              'w-full px-4 py-3 glass-input',
              errors.mobile && 'border-red-500 ring-4 ring-red-500/20'
            )}
          />
          {errors.mobile && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-sm"
            >
              {errors.mobile.message}
            </motion.p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white/80">
            Password
          </label>
          <div className="relative">
            <input
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a password"
              className={cn(
                'w-full px-4 py-3 pr-12 glass-input',
                errors.password && 'border-red-500 ring-4 ring-red-500/20'
              )}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-white/60 hover:text-white transition-colors"
            >
              {showPassword ? (
                <EyeSlashIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </button>
          </div>
          
          {/* Password Requirements */}
          {watchedPassword && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-2 p-3 glass-neutral rounded-lg"
            >
              <p className="text-sm font-medium text-white/80">Password requirements:</p>
              <div className="space-y-1">
                {passwordRequirements.map((req, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm">
                    <CheckCircleIcon 
                      className={cn(
                        'w-4 h-4',
                        req.met ? 'text-green-400' : 'text-white/40'
                      )}
                    />
                    <span className={cn(
                      req.met ? 'text-green-400' : 'text-white/60'
                    )}>
                      {req.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
          
          {errors.password && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-sm"
            >
              {errors.password.message}
            </motion.p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white/80">
            Confirm Password
          </label>
          <div className="relative">
            <input
              {...register('confirmPassword')}
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm your password"
              className={cn(
                'w-full px-4 py-3 pr-12 glass-input',
                errors.confirmPassword && 'border-red-500 ring-4 ring-red-500/20',
                !errors.confirmPassword && watchedConfirmPassword && watchedPassword === watchedConfirmPassword && 'border-green-500 ring-4 ring-green-500/20'
              )}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-white/60 hover:text-white transition-colors"
            >
              {showConfirmPassword ? (
                <EyeSlashIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-sm"
            >
              {errors.confirmPassword.message}
            </motion.p>
          )}
        </div>

        {/* Terms and Conditions */}
        <div className="space-y-2">
          <label className="flex items-start space-x-3 text-sm text-white/80">
            <input
              {...register('agreeToTerms')}
              type="checkbox"
              className="w-4 h-4 mt-0.5 rounded border-white/20 bg-white/10 text-primary-500 focus:ring-primary-500/20"
            />
            <span>
              I agree to the{' '}
              <a href="/terms" className="text-primary-400 hover:text-primary-300">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" className="text-primary-400 hover:text-primary-300">
                Privacy Policy
              </a>
            </span>
          </label>
          {errors.agreeToTerms && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-sm"
            >
              {errors.agreeToTerms.message}
            </motion.p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={!isValid || isLoading}
          loading={isLoading}
          className="w-full"
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <LoadingSpinner size="sm" color="white" />
              <span>Creating Account...</span>
            </div>
          ) : (
            'Create Account'
          )}
        </Button>
      </form>

      {/* Switch to Login */}
      <div className="text-center text-white/80">
        Already have an account?{' '}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-primary-400 hover:text-primary-300 font-medium transition-colors"
        >
          Sign in
        </button>
      </div>
    </motion.div>
  )
}

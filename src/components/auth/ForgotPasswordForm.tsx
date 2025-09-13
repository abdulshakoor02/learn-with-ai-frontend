'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircleIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'
import { forgotPasswordSchema, type ForgotPasswordFormData } from '../../utils/validation'
import { useAuthContext } from './AuthProvider'
import { Button, LoadingSpinner } from '../ui'
import { cn } from '../../utils/cn'

interface ForgotPasswordFormProps {
  onSwitchToLogin: () => void
  onClose: () => void
}

export const ForgotPasswordForm = ({ onSwitchToLogin, onClose }: ForgotPasswordFormProps) => {
  const { resetPassword, isLoading, error, clearError } = useAuthContext()
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onChange'
  })

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      clearError()
      await resetPassword(data.email)
      setIsSuccess(true)
    } catch (err) {
      console.error('Password reset error:', err)
    }
  }

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="text-center space-y-6"
      >
        <div className="w-16 h-16 mx-auto glass-primary rounded-full flex items-center justify-center">
          <CheckCircleIcon className="w-8 h-8 text-green-400" />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">Check Your Email</h2>
          <p className="text-white/70">
            We've sent a password reset link to{' '}
            <span className="text-primary-400 font-medium">
              {getValues('email')}
            </span>
          </p>
        </div>

        <div className="space-y-4 p-4 glass-neutral rounded-xl">
          <p className="text-sm text-white/80">
            Didn't receive the email? Check your spam folder or try again.
          </p>
          <Button
            variant="secondary"
            size="md"
            onClick={() => setIsSuccess(false)}
            className="w-full"
          >
            Try Different Email
          </Button>
        </div>

        <button
          onClick={onSwitchToLogin}
          className="flex items-center justify-center space-x-2 text-primary-400 hover:text-primary-300 transition-colors"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span>Back to Sign In</span>
        </button>
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
        <h2 className="text-2xl font-bold text-white">Reset Password</h2>
        <p className="text-white/70">
          Enter your email address and we'll send you a link to reset your password
        </p>
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
        {/* Email Field */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white/80">
            Email Address
          </label>
          <input
            {...register('email')}
            type="email"
            placeholder="Enter your email address"
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
              <span>Sending Reset Link...</span>
            </div>
          ) : (
            'Send Reset Link'
          )}
        </Button>
      </form>

      {/* Additional Information */}
      <div className="p-4 glass-neutral rounded-xl">
        <h4 className="text-sm font-medium text-white/80 mb-2">
          What happens next?
        </h4>
        <ul className="text-sm text-white/60 space-y-1">
          <li>• We'll send a secure link to your email</li>
          <li>• Click the link to create a new password</li>
          <li>• The link will expire in 24 hours</li>
        </ul>
      </div>

      {/* Back to Login */}
      <div className="text-center">
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="inline-flex items-center space-x-2 text-primary-400 hover:text-primary-300 transition-colors"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span>Back to Sign In</span>
        </button>
      </div>
    </motion.div>
  )
}
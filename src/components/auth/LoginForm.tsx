'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { loginSchema, type LoginFormData } from '../../utils/validation'
import { useAuthContext } from './AuthProvider'
import { Button, Input, LoadingSpinner } from '../ui'
import { cn } from '../../utils/cn'
import { useRouter } from 'next/navigation'

interface LoginFormProps {
  onSwitchToRegister: () => void
  onForgotPassword: () => void
  onClose: () => void
}

export const LoginForm = ({
  onSwitchToRegister,
  onForgotPassword,
  onClose
}: LoginFormProps) => {
  const { login, isLoading, error, clearError } = useAuthContext()
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange'
  })

  const watchedFields = watch()
  const hasData = watchedFields.email || watchedFields.password

  const onSubmit = async (data: LoginFormData) => {
    try {
      console.log('Login form submitted with:', data)
      clearError()
      await login(data)
      console.log('Login successful')
      onClose()
      // Navigate to home after successful login
      console.log('Navigating to /home')
      router.push('/home')
    } catch (err) {
      // Error is handled by the auth store
      console.error('Login error:', err)
    }
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
        <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
        <p className="text-white/70">Sign in to your account to continue</p>
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
          <div className="relative">
            <input
              {...register('email')}
              type="email"
              placeholder="Enter your email"
              className={cn(
                'w-full px-4 py-3 glass-input',
                errors.email && 'border-red-500 ring-4 ring-red-500/20'
              )}
            />
          </div>
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

        {/* Password Field */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white/80">
            Password
          </label>
          <div className="relative">
            <input
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
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

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <label className="flex items-center space-x-2 text-sm text-white/80">
            <input
              {...register('rememberMe')}
              type="checkbox"
              className="w-4 h-4 rounded border-white/20 bg-white/10 text-primary-500 focus:ring-primary-500/20"
            />
            <span>Remember me</span>
          </label>
          <button
            type="button"
            onClick={onForgotPassword}
            className="text-sm text-primary-400 hover:text-primary-300 transition-colors"
          >
            Forgot password?
          </button>
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
              <span>Signing In...</span>
            </div>
          ) : (
            'Sign In'
          )}
        </Button>
      </form>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/20" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-black/50 text-white/60">or</span>
        </div>
      </div>

      {/* Social Login Buttons */}
      <div className="space-y-3">
        <button
          type="button"
          className="w-full flex items-center justify-center space-x-3 px-4 py-3 glass-neutral hover:glass-primary transition-all duration-300 rounded-xl text-white"
        >
          <div className="w-5 h-5 bg-white rounded" />
          <span>Continue with Google</span>
        </button>
        <button
          type="button"
          className="w-full flex items-center justify-center space-x-3 px-4 py-3 glass-neutral hover:glass-primary transition-all duration-300 rounded-xl text-white"
        >
          <div className="w-5 h-5 bg-gray-900 rounded" />
          <span>Continue with GitHub</span>
        </button>
      </div>

      {/* Switch to Register */}
      <div className="text-center text-white/80">
        Don't have an account?{' '}
        <button
          type="button"
          onClick={onSwitchToRegister}
          className="text-primary-400 hover:text-primary-300 font-medium transition-colors"
        >
          Sign up
        </button>
      </div>
    </motion.div>
  )
}
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn, getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { EyeIcon, EyeSlashIcon, SparklesIcon } from '@heroicons/react/24/outline'
import { loginSchema, type LoginFormData } from '../../../utils/validation'
import { Button } from '../../../components/ui/Button'
import { LoadingSpinner } from '../../../components/ui/LoadingStates'
import { cn } from '../../../utils/cn'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // Check if user is already authenticated
  useEffect(() => {
    const checkAuth = async () => {
      const session = await getSession()
      if (session) {
        router.push('/home')
      }
    }
    checkAuth()
  }, [router])

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    clearErrors
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange'
  })

  const watchedFields = watch()

  const onSubmit = async (data: LoginFormData) => {
    if (isLoading) return

    setIsLoading(true)
    setError(null)
    clearErrors()

    try {
      console.log('Attempting login with:', { email: data.email })
      
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      console.log('SignIn result:', result)

      if (result?.error) {
        console.error('Login error:', result.error)
        setError(result.error === 'CredentialsSignin' 
          ? 'Invalid email or password' 
          : result.error)
      } else if (result?.ok) {
        console.log('Login successful, redirecting to /home')
        // Wait a moment for the session to be established before redirecting
        setTimeout(() => {
          router.push('/home')
        }, 500)
      } else {
        setError('An unexpected error occurred')
      }
    } catch (err) {
      console.error('Login exception:', err)
      setError('Failed to sign in. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const clearError = () => {
    setError(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo/Brand Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-4"
          >
            <SparklesIcon className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold gradient-text mb-2">
            Welcome Back
          </h1>
          <p className="text-white/70">
            Sign in to your LearnAI account
          </p>
        </motion.div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-primary p-8 rounded-3xl"
        >
          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 p-4 rounded-xl bg-red-500 bg-opacity-10 border border-red-500 border-opacity-20 text-red-400 text-sm flex items-center justify-between"
            >
              <span>{error}</span>
              <button
                onClick={clearError}
                className="text-red-400 hover:text-red-300 ml-2"
              >
                ×
              </button>
            </motion.div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                    'w-full px-4 py-3 glass-input transition-all duration-300',
                    errors.email && 'border-red-500 ring-4 ring-red-500/20',
                    watchedFields.email && !errors.email && 'border-green-500/50 ring-4 ring-green-500/10'
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
                    'w-full px-4 py-3 pr-12 glass-input transition-all duration-300',
                    errors.password && 'border-red-500 ring-4 ring-red-500/20',
                    watchedFields.password && !errors.password && 'border-green-500/50 ring-4 ring-green-500/10'
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

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 text-sm text-white/80 cursor-pointer">
                <input
                  {...register('rememberMe')}
                  type="checkbox"
                  className="w-4 h-4 rounded border-white/20 bg-white/10 text-purple-500 focus:ring-purple-500/20 focus:ring-2"
                />
                <span>Remember me</span>
              </label>
              <button
                type="button"
                className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                onClick={() => {
                  // TODO: Implement forgot password functionality
                  alert('Forgot password functionality coming soon!')
                }}
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
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-transparent text-white/60">or continue with</span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3">
            <button
              type="button"
              disabled
              className="w-full flex items-center justify-center space-x-3 px-4 py-3 glass-neutral opacity-50 cursor-not-allowed rounded-xl text-white"
            >
              <div className="w-5 h-5 bg-white rounded" />
              <span>Google (Coming Soon)</span>
            </button>
            <button
              type="button"
              disabled
              className="w-full flex items-center justify-center space-x-3 px-4 py-3 glass-neutral opacity-50 cursor-not-allowed rounded-xl text-white"
            >
              <div className="w-5 h-5 bg-gray-900 rounded" />
              <span>GitHub (Coming Soon)</span>
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="text-center mt-8 text-white/80">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => {
                // TODO: Implement registration functionality
                alert('Registration functionality coming soon!')
              }}
              className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
            >
              Sign up
            </button>
          </div>
        </motion.div>

        {/* Back to Home Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-6"
        >
          <button
            onClick={() => router.push('/')}
            className="text-white/60 hover:text-white/80 transition-colors text-sm"
          >
            ← Back to Homepage
          </button>
        </motion.div>
      </div>
    </div>
  )
}
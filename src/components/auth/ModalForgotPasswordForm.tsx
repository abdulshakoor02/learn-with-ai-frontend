'use client'

import { motion } from 'framer-motion'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { Button } from '../ui/Button'

interface ModalForgotPasswordFormProps {
  onSwitchToLogin: () => void
  onClose: () => void
}

export const ModalForgotPasswordForm = ({
  onSwitchToLogin,
  onClose
}: ModalForgotPasswordFormProps) => {
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
        <p className="text-white/70">Password reset coming soon!</p>
      </div>

      <div className="text-center space-y-4 p-8">
        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
          <span className="text-2xl">🔐</span>
        </div>
        
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-white">Password Reset Feature Coming Soon</h3>
          <p className="text-white/70 max-w-sm mx-auto">
            We're working on implementing a secure password reset system. 
            For now, please contact support for assistance.
          </p>
        </div>

        <div className="space-y-3 pt-4">
          <Button
            variant="primary"
            size="lg"
            onClick={onSwitchToLogin}
            className="w-full"
          >
            Back to Sign In
          </Button>
          
          <Button
            variant="ghost"
            size="lg"
            onClick={onClose}
            className="w-full text-white/80 hover:text-white"
          >
            Close
          </Button>
        </div>
      </div>

      {/* Back to Login */}
      <div className="text-center">
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="inline-flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span>Back to Sign In</span>
        </button>
      </div>
    </motion.div>
  )
}
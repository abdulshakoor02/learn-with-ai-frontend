'use client'

import { motion } from 'framer-motion'
import { Button } from '../ui/Button'

interface ModalRegisterFormProps {
  onSwitchToLogin: () => void
  onClose: () => void
}

export const ModalRegisterForm = ({
  onSwitchToLogin,
  onClose
}: ModalRegisterFormProps) => {
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
        <p className="text-white/70">Registration coming soon!</p>
      </div>

      <div className="text-center space-y-4 p-8">
        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
          <span className="text-2xl">🚀</span>
        </div>
        
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-white">Registration Feature Coming Soon</h3>
          <p className="text-white/70 max-w-sm mx-auto">
            We're working hard to bring you a seamless registration experience. 
            For now, please contact us to get started.
          </p>
        </div>

        <div className="space-y-3 pt-4">
          <Button
            variant="primary"
            size="lg"
            onClick={onSwitchToLogin}
            className="w-full"
          >
            Sign In Instead
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

      {/* Switch to Login */}
      <div className="text-center text-white/80">
        Already have an account?{' '}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
        >
          Sign in
        </button>
      </div>
    </motion.div>
  )
}
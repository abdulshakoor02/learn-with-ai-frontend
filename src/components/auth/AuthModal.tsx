'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Modal } from '../ui'
import { LoginForm } from './LoginForm'
import { RegisterForm } from './RegisterForm'
import { ForgotPasswordForm } from './ForgotPasswordForm'
import { type AuthModalView } from '../../types/auth'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  defaultView?: AuthModalView
}

export const AuthModal = ({ 
  isOpen, 
  onClose, 
  defaultView = 'login' 
}: AuthModalProps) => {
  const [currentView, setCurrentView] = useState<AuthModalView>(defaultView)

  // Reset to default view when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentView(defaultView)
    }
  }, [isOpen, defaultView])

  const handleSwitchToLogin = () => setCurrentView('login')
  const handleSwitchToRegister = () => setCurrentView('register')
  const handleSwitchToForgotPassword = () => setCurrentView('forgot-password')

  const getModalTitle = () => {
    switch (currentView) {
      case 'login':
        return 'Sign In'
      case 'register':
        return 'Create Account'
      case 'forgot-password':
        return 'Reset Password'
      default:
        return 'Authentication'
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-lg w-full"
      closeOnOverlayClick={true}
    >
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          {currentView === 'login' && (
            <LoginForm
              key="login"
              onSwitchToRegister={handleSwitchToRegister}
              onForgotPassword={handleSwitchToForgotPassword}
              onClose={onClose}
            />
          )}
          
          {currentView === 'register' && (
            <RegisterForm
              key="register"
              onSwitchToLogin={handleSwitchToLogin}
              onClose={onClose}
            />
          )}
          
          {currentView === 'forgot-password' && (
            <ForgotPasswordForm
              key="forgot-password"
              onSwitchToLogin={handleSwitchToLogin}
              onClose={onClose}
            />
          )}
        </AnimatePresence>
      </div>
    </Modal>
  )
}
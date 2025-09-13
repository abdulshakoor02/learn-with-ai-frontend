'use client'

import { motion } from 'framer-motion'
import { UserIcon } from '@heroicons/react/24/outline'
import { useAuthContext } from './AuthProvider'
import { Button } from '../ui'
import { cn } from '../../utils/cn'

interface AuthButtonsProps {
  onOpenLogin: () => void
  onOpenRegister: () => void
  className?: string
}

export const AuthButtons = ({ 
  onOpenLogin, 
  onOpenRegister, 
  className 
}: AuthButtonsProps) => {
  const { isAuthenticated, user, logout } = useAuthContext()

  if (isAuthenticated && user) {
    return (
      <div className={cn('flex items-center space-x-4', className)}>
        {/* User Profile Button */}
        <div className="relative group">
          <button className="flex items-center space-x-2 p-2 rounded-xl glass-neutral hover:glass-primary transition-all duration-300">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-500 to-blue-500 flex items-center justify-center">
              {user.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={`${user.firstName} ${user.lastName}`}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <UserIcon className="w-4 h-4 text-white" />
              )}
            </div>
            <span className="text-white font-medium hidden sm:block">
              {user.firstName}
            </span>
          </button>
          
          {/* Dropdown Menu */}
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 top-full mt-2 w-48 glass-neutral rounded-xl border border-white/20 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50"
          >
            <div className="p-2 space-y-1">
              <div className="px-3 py-2 border-b border-white/10">
                <p className="text-sm font-medium text-white">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs text-white/60">{user.email}</p>
              </div>
              
              <button className="w-full text-left px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                Profile Settings
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                Dashboard
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                Billing
              </button>
              
              <div className="border-t border-white/10 pt-1">
                <button 
                  onClick={logout}
                  className="w-full text-left px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500 hover:bg-opacity-10 rounded-lg transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('flex items-center space-x-3', className)}>
      {/* Login Button */}
      <Button
        variant="ghost"
        size="md"
        onClick={onOpenLogin}
        className="text-white/80 hover:text-white"
      >
        Sign In
      </Button>
      
      {/* Register Button */}
      <Button
        variant="primary"
        size="md"
        onClick={onOpenRegister}
      >
        Get Started
      </Button>
    </div>
  )
}

// Compact version for mobile
export const CompactAuthButtons = ({ 
  onOpenLogin, 
  onOpenRegister, 
  className 
}: AuthButtonsProps) => {
  const { isAuthenticated, user, logout } = useAuthContext()

  if (isAuthenticated && user) {
    return (
      <div className={cn('flex items-center', className)}>
        <button className="flex items-center space-x-2 p-3 rounded-xl glass-neutral hover:glass-primary transition-all duration-300">
          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary-500 to-blue-500 flex items-center justify-center">
            {user.avatar ? (
              <img 
                src={user.avatar} 
                alt={`${user.firstName} ${user.lastName}`}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <UserIcon className="w-3 h-3 text-white" />
            )}
          </div>
          <span className="text-white text-sm font-medium">
            {user.firstName}
          </span>
        </button>
      </div>
    )
  }

  return (
    <div className={cn('flex flex-col space-y-3 w-full', className)}>
      <Button
        variant="ghost"
        size="lg"
        onClick={onOpenLogin}
        className="w-full justify-center text-white/80 hover:text-white"
      >
        Sign In
      </Button>
      <Button
        variant="primary"
        size="lg"
        onClick={onOpenRegister}
        className="w-full justify-center"
      >
        Get Started
      </Button>
    </div>
  )
}
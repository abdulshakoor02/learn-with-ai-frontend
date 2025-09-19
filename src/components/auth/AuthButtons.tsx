'use client'

import { motion } from 'framer-motion'
import { UserIcon } from '@heroicons/react/24/outline'
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
  // Authentication disabled - show login/register buttons always
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
  // Authentication disabled - show login/register buttons always
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
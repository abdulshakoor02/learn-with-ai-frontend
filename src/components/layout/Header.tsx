'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useScrollTrigger } from '../../hooks/useScrollAnimation'
import { AuthButtons } from '../auth'
import { AuthModal } from '../auth'
import { GradientText, Button } from '../ui'
import { cn } from '../../utils/cn'

interface HeaderProps {
  className?: string
}

const navigation = [
  { name: 'Features', href: '#features' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
]

export const Header = ({ className }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authModalView, setAuthModalView] = useState<'login' | 'register'>('login')
  
  const scrolled = useScrollTrigger(20)

  useEffect(() => {
    setIsScrolled(scrolled)
  }, [scrolled])

  const handleOpenLogin = () => {
    setAuthModalView('login')
    setAuthModalOpen(true)
    setIsMobileMenuOpen(false)
  }

  const handleOpenRegister = () => {
    setAuthModalView('register')
    setAuthModalOpen(true)
    setIsMobileMenuOpen(false)
  }

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false)
    
    // Smooth scroll to section
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled ? 'glass-neutral border-b border-white/10' : 'bg-transparent',
          className
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-r from-primary-500 to-blue-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg md:text-xl">L</span>
              </div>
              <GradientText 
                variant="primary" 
                size="xl" 
                weight="bold"
                className="text-xl md:text-2xl"
              >
                LearnAI
              </GradientText>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <motion.button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className="text-white/80 hover:text-white transition-colors duration-200 font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                </motion.button>
              ))}
            </nav>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex">
              <AuthButtons
                onOpenLogin={handleOpenLogin}
                onOpenRegister={handleOpenRegister}
              />
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 rounded-lg glass-neutral hover:glass-primary transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="w-6 h-6 text-white" />
              ) : (
                <Bars3Icon className="w-6 h-6 text-white" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden absolute top-full left-0 right-0 glass-neutral border-t border-white/10"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <div className="px-4 py-6 space-y-4">
                {/* Mobile Navigation */}
                <nav className="space-y-3">
                  {navigation.map((item) => (
                    <motion.button
                      key={item.name}
                      onClick={() => handleNavClick(item.href)}
                      className="block w-full text-left px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 font-medium"
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {item.name}
                    </motion.button>
                  ))}
                </nav>

                {/* Mobile Auth Buttons */}
                <div className="pt-4 border-t border-white/20">
                  <div className="space-y-3">
                    <Button
                      variant="ghost"
                      size="lg"
                      onClick={handleOpenLogin}
                      className="w-full justify-center text-white/80 hover:text-white"
                    >
                      Sign In
                    </Button>
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={handleOpenRegister}
                      className="w-full justify-center"
                    >
                      Get Started
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultView={authModalView}
      />

      {/* Spacer to prevent content from going under fixed header */}
      <div className="h-16 md:h-20" />
    </>
  )
}
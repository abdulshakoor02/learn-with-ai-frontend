'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { signOut, useSession } from 'next-auth/react'
import { HomeIcon, BookOpenIcon, UserCircleIcon, ArrowRightOnRectangleIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { clearAuthData } from '@/lib/localStorage'

const navigationItems = [
  { name: 'Home', href: '/home', icon: HomeIcon },
  { name: 'Courses', href: '/home/courses', icon: BookOpenIcon },
]

interface LearningNavProps {
  isMobileMenuOpen?: boolean
  onToggleMobileMenu?: () => void
}

export const LearningNav = ({ isMobileMenuOpen = false, onToggleMobileMenu }: LearningNavProps = {}) => {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session } = useSession()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [internalMobileMenuOpen, setInternalMobileMenuOpen] = useState(false)

  // Use external state if provided, otherwise use internal state
  const mobileMenuOpen = onToggleMobileMenu ? isMobileMenuOpen : internalMobileMenuOpen
  const toggleMobileMenu = onToggleMobileMenu || (() => setInternalMobileMenuOpen(!internalMobileMenuOpen))

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    if (mobileMenuOpen) {
      if (onToggleMobileMenu) {
        onToggleMobileMenu()
      } else {
        setInternalMobileMenuOpen(false)
      }
    }
  }, [pathname])

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      // Clear localStorage data first
      clearAuthData()
      
      // Then sign out from NextAuth
      await signOut({ redirect: false })
      router.push('/')
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <>
      {/* Mobile Header with Hamburger Menu */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-slate-900/95 via-purple-900/95 to-slate-900/95 backdrop-blur-lg border-b border-white/20">
        <div className="flex items-center justify-between p-4">
          <Link href="/home" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <BookOpenIcon className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-lg font-bold text-white">LearnAI</h1>
          </Link>
          <button
            onClick={toggleMobileMenu}
            className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 z-30 bg-black/50 backdrop-blur-sm"
            onClick={toggleMobileMenu}
          />
        )}
      </AnimatePresence>

      {/* Sidebar Navigation */}
      <motion.nav
        initial={{ x: isMobile ? -280 : 0 }}
        animate={{ 
          x: isMobile ? (mobileMenuOpen ? 0 : -280) : 0 
        }}
        transition={{ 
          type: "spring", 
          damping: 25, 
          stiffness: 200 
        }}
        className={`
          ${isMobile ? 'fixed top-0 left-0 z-40 h-full' : 'relative h-full'}
          w-64 bg-white/10 backdrop-blur-lg border-r border-white/20 shadow-2xl
        `}
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        <div className="flex flex-col h-full">
          {/* Desktop Logo Section */}
          <div className="hidden md:block p-6 border-b border-white/20">
            <Link href="/home" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <BookOpenIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">LearnAI</h1>
                <p className="text-sm text-white/70">Your Learning Journey</p>
              </div>
            </Link>
          </div>

          {/* Mobile Header Inside Sidebar */}
          <div className="md:hidden p-6 border-b border-white/20">
            <div className="flex items-center justify-between">
              <Link href="/home" className="flex items-center space-x-3" onClick={toggleMobileMenu}>
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <BookOpenIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">LearnAI</h1>
                  <p className="text-sm text-white/70">Your Learning Journey</p>
                </div>
              </Link>
              <button
                onClick={toggleMobileMenu}
                className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 py-6">
            <ul className="space-y-2 px-4">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      onClick={() => isMobile && toggleMobileMenu()}
                      className={`
                        group flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200
                        ${isActive 
                          ? 'bg-white/20 text-white shadow-lg' 
                          : 'text-white/70 hover:bg-white/10 hover:text-white'
                        }
                      `}
                    >
                      <item.icon className={`
                        w-5 h-5 transition-colors duration-200
                        ${isActive ? 'text-white' : 'text-white/60 group-hover:text-white'}
                      `} />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* User Profile Section */}
          <div className="p-4 border-t border-white/20">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <UserCircleIcon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {session?.user?.name || 'User'}
                </p>
                <p className="text-xs text-white/70 truncate">
                  {session?.user?.email}
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 disabled:bg-white/5 text-white rounded-lg transition-all duration-200 touch-target"
            >
              {isLoggingOut ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span className="text-sm">Logging out...</span>
                </>
              ) : (
                <>
                  <ArrowRightOnRectangleIcon className="w-4 h-4" />
                  <span className="text-sm">Logout</span>
                </>
              )}
            </button>
          </div>
        </div>
      </motion.nav>
    </>
  )
}

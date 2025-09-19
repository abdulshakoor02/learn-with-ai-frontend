'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { signOut, useSession } from 'next-auth/react'
import { HomeIcon, BookOpenIcon, UserCircleIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'

const navigationItems = [
  { name: 'Home', href: '/home', icon: HomeIcon },
  { name: 'Courses', href: '/home/courses', icon: BookOpenIcon },
]

export const LearningNav = () => {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session } = useSession()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await signOut({ redirect: false })
      router.push('/')
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <motion.nav
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      className="w-64 h-full bg-white/10 backdrop-blur-lg border-r border-white/20 shadow-2xl"
      style={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      <div className="flex flex-col h-full">
        {/* Logo Section */}
        <div className="p-6 border-b border-white/20">
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

        {/* Navigation Links */}
        <div className="flex-1 py-6">
          <ul className="space-y-2 px-4">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
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
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 disabled:bg-white/5 text-white rounded-lg transition-all duration-200"
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
  )
}

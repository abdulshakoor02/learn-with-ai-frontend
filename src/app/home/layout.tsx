'use client'

import { SessionProvider, useSession } from 'next-auth/react'
import { LearningNav } from '@/components/layout/LearningNav'
import { FullScreenLoading } from '@/components/ui/LoadingStates'
import AuthSync from '@/components/auth/AuthSync'

function AuthenticatedHomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()

  // Show loading spinner while checking authentication
  if (status === 'loading') {
    return <FullScreenLoading message="Loading your dashboard..." />
  }

  // Session should exist due to middleware protection
  // but handle edge cases gracefully
  if (status === 'unauthenticated') {
    return <FullScreenLoading message="Redirecting to login..." />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <AuthSync />
      
      {/* Desktop Layout */}
      <div className="hidden md:flex h-screen">
        {/* Left Navigation - Desktop */}
        <LearningNav />
        
        {/* Main Content Area - Desktop */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden min-h-screen">
        {/* Mobile Navigation */}
        <LearningNav />
        
        {/* Main Content Area - Mobile */}
        <main className="pt-20 min-h-screen">
          <div className="p-4 sm:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SessionProvider>
      <AuthenticatedHomeLayout>
        {children}
      </AuthenticatedHomeLayout>
    </SessionProvider>
  )
}

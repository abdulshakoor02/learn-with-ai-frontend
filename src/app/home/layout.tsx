'use client'

import { LearningNav } from '@/components/layout/LearningNav'
import { FullScreenLoading } from '@/components/ui'

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Authentication disabled - allow direct access to all routes
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="flex h-screen">
        {/* Left Navigation */}
        <LearningNav />
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

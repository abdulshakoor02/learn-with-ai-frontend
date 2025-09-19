'use client'

import { AuthProvider } from '../components/auth'
import { Header, Footer } from '../components/layout'
import { HeroSection } from '../components/hero'
import { FeaturesGrid } from '../components/features'
import { TestimonialSection, StatisticsPanel, ClientLogos, ReviewBadges } from '../components/social-proof'
import { PricingSection } from '../components/pricing'
import { FullScreenLoading } from '../components/ui'
import { useLoading, useScroll } from '../hooks/useUI'
import { motion } from 'framer-motion'

export default function LandingPage() {
  const { isPageLoading } = useLoading()

  // Authentication disabled - remove redirect logic and debug panel
  if (isPageLoading) {
    return <FullScreenLoading message="Welcome to LearnAI" />
  }

  return (
    <AuthProvider>
      <div className="min-h-screen bg-black text-white page-transition">
        {/* Fixed Header */}
        <Header />
        
        {/* Main Content */}
        <main className="relative">
          {/* Hero Section */}
          <HeroSection />
          
          {/* Features Section */}
          <FeaturesGrid />
          
          {/* Social Proof Sections */}
          <div className="bg-gradient-to-b from-transparent via-primary-900/5 to-transparent">
            <StatisticsPanel />
            <ClientLogos />
            <TestimonialSection />
            <ReviewBadges />
          </div>
          
          {/* Pricing Section */}
          <PricingSection />
        </main>
        
        {/* Footer */}
        <Footer />
        
        {/* Scroll to Top Button */}
        <ScrollToTopButton />
      </div>
    </AuthProvider>
  )
}

// Scroll to Top Button Component
function ScrollToTopButton() {
  const { scrollY } = useScroll() // Using scroll from UI store
  const isVisible = scrollY > 300

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  if (!isVisible) return null

  return (
    <motion.button
      className="fixed bottom-8 right-8 w-12 h-12 glass-primary rounded-full flex items-center justify-center text-white z-50 group"
      onClick={scrollToTop}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <svg 
        className="w-6 h-6 group-hover:scale-110 transition-transform" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M5 10l7-7m0 0l7 7m-7-7v18" 
        />
      </svg>
    </motion.button>
  )
}

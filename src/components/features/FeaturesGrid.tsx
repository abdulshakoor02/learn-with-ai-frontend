'use client'

import { motion } from 'framer-motion'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { FeatureCard } from './FeatureCard'
import { FeatureIcon } from './FeatureIcon'
import { GradientText } from '../ui'
import { staggerChildren } from '../../utils/animations'
import {
  CpuChipIcon as BrainIcon,
  ChartBarIcon,
  ClockIcon,
  UserGroupIcon,
  DevicePhoneMobileIcon,
  ShieldCheckIcon,
  SparklesIcon,
  AcademicCapIcon,
  CodeBracketIcon,
  LightBulbIcon,
  RocketLaunchIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline'

const features = [
  {
    icon: BrainIcon,
    title: 'AI-Powered Learning',
    description: 'Personalized curriculum that adapts to your learning style, pace, and preferences using advanced machine learning algorithms.',
    gradient: 'from-primary-500 to-blue-500',
    delay: 0
  },
  {
    icon: ChartBarIcon,
    title: 'Progress Analytics',
    description: 'Real-time insights into your learning journey with detailed analytics, performance metrics, and improvement suggestions.',
    gradient: 'from-blue-500 to-purple-500',
    delay: 0.1
  },
  {
    icon: ClockIcon,
    title: 'Flexible Scheduling',
    description: 'Learn at your own pace with intelligent scheduling that fits your lifestyle and maximizes retention.',
    gradient: 'from-purple-500 to-pink-500',
    delay: 0.2
  },
  {
    icon: UserGroupIcon,
    title: 'Collaborative Learning',
    description: 'Connect with peers, join study groups, and participate in collaborative projects to enhance your learning experience.',
    gradient: 'from-pink-500 to-red-500',
    delay: 0.3
  },
  {
    icon: DevicePhoneMobileIcon,
    title: 'Multi-Platform Access',
    description: 'Seamless learning across all devices with synchronized progress and offline capability for uninterrupted learning.',
    gradient: 'from-red-500 to-orange-500',
    delay: 0.4
  },
  {
    icon: ShieldCheckIcon,
    title: 'Verified Certificates',
    description: 'Earn industry-recognized certificates and credentials that validate your skills and boost your career prospects.',
    gradient: 'from-orange-500 to-yellow-500',
    delay: 0.5
  },
  {
    icon: SparklesIcon,
    title: 'Interactive Content',
    description: 'Engage with immersive content including simulations, virtual labs, and interactive exercises for hands-on learning.',
    gradient: 'from-yellow-500 to-green-500',
    delay: 0.6
  },
  {
    icon: AcademicCapIcon,
    title: 'Expert Instructors',
    description: 'Learn from industry experts and thought leaders with years of experience in their respective fields.',
    gradient: 'from-green-500 to-teal-500',
    delay: 0.7
  },
  {
    icon: CodeBracketIcon,
    title: 'Practical Projects',
    description: 'Apply your knowledge through real-world projects and build a portfolio that showcases your skills to employers.',
    gradient: 'from-teal-500 to-cyan-500',
    delay: 0.8
  },
  {
    icon: LightBulbIcon,
    title: 'Adaptive Learning',
    description: 'Smart content recommendations and difficulty adjustments based on your performance and learning preferences.',
    gradient: 'from-cyan-500 to-blue-500',
    delay: 0.9
  },
  {
    icon: RocketLaunchIcon,
    title: 'Career Acceleration',
    description: 'Fast-track your career with job placement assistance, resume building, and interview preparation resources.',
    gradient: 'from-blue-500 to-indigo-500',
    delay: 1.0
  },
  {
    icon: GlobeAltIcon,
    title: 'Global Community',
    description: 'Join a worldwide community of learners, share knowledge, and participate in global challenges and competitions.',
    gradient: 'from-indigo-500 to-purple-500',
    delay: 1.1
  }
]

interface FeaturesGridProps {
  className?: string
}

export const FeaturesGrid = ({ className }: FeaturesGridProps) => {
  const { ref, isInView } = useScrollAnimation(0.1)

  return (
    <section 
      ref={ref}
      id="features"
      className={`py-20 lg:py-32 relative overflow-hidden ${className}`}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/10 via-transparent to-blue-900/10" />
      
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary-500 bg-opacity-5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-blue-500 bg-opacity-5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 lg:mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.div
            className="inline-flex items-center space-x-2 glass-primary px-4 py-2 rounded-full mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <SparklesIcon className="w-4 h-4 text-accent-400" />
            <span className="text-accent-400 font-medium text-sm">
              Powerful Features
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white block mb-2">Everything You Need</span>
            <GradientText 
              variant="primary" 
              size="xxl"
              weight="bold"
              className="text-4xl md:text-5xl lg:text-6xl"
            >
              to Excel in Learning
            </GradientText>
          </h2>

          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Discover our comprehensive suite of features designed to revolutionize 
            your learning experience and accelerate your professional growth.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
          variants={staggerChildren}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={
                <FeatureIcon 
                  Icon={feature.icon} 
                  gradient={feature.gradient}
                  animated={isInView}
                  delay={feature.delay}
                />
              }
              title={feature.title}
              description={feature.description}
              delay={feature.delay}
            />
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16 lg:mt-24"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
        >
          <div className="glass-primary p-8 rounded-3xl max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Transform Your Learning?
            </h3>
            <p className="text-white/80 mb-6">
              Join thousands of learners who have already accelerated their careers with our AI-powered platform.
            </p>
            <motion.button
              className="glass-button-primary px-8 py-4 rounded-xl font-semibold text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Journey Today
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
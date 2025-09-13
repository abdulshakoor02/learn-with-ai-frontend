'use client'

import { motion } from 'framer-motion'
import { StarIcon } from '@heroicons/react/24/solid'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { GlassCard } from '../ui'

const reviewPlatforms = [
  {
    name: 'Trustpilot',
    rating: 4.8,
    reviewCount: 12453,
    badge: 'Excellent',
    color: 'from-green-500 to-emerald-500',
    logo: '🌟'
  },
  {
    name: 'G2',
    rating: 4.9,
    reviewCount: 8921,
    badge: 'Leader',
    color: 'from-blue-500 to-cyan-500',
    logo: '🏆'
  },
  {
    name: 'Capterra',
    rating: 4.7,
    reviewCount: 6847,
    badge: 'Best Value',
    color: 'from-orange-500 to-amber-500',
    logo: '⭐'
  },
  {
    name: 'Product Hunt',
    rating: 4.9,
    reviewCount: 3452,
    badge: '#1 Product',
    color: 'from-purple-500 to-pink-500',
    logo: '🚀'
  }
]

const achievements = [
  {
    title: 'EdTech Innovation Award',
    year: '2024',
    organization: 'Learning Tech Awards',
    icon: '🏅'
  },
  {
    title: 'Best AI Learning Platform',
    year: '2024',
    organization: 'TechCrunch Awards',
    icon: '🤖'
  },
  {
    title: 'Top 50 EdTech Companies',
    year: '2023',
    organization: 'Forbes',
    icon: '📰'
  },
  {
    title: 'Innovation in Education',
    year: '2023',
    organization: 'UNESCO',
    icon: '🎓'
  }
]

export const ReviewBadges = () => {
  const { ref, isInView } = useScrollAnimation(0.1)

  return (
    <section 
      ref={ref}
      className="py-20 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-900/5 via-blue-900/5 to-purple-900/5" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Recognized Excellence
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Consistently rated as the top AI learning platform by users and industry experts
          </p>
        </motion.div>

        {/* Review Platform Badges */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {reviewPlatforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.9 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: 'easeOut' 
              }}
            >
              <GlassCard
                variant="neutral"
                blur="md"
                opacity={0.8}
                hover={true}
                className="p-6 text-center group h-full"
              >
                {/* Platform Logo */}
                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {platform.logo}
                </div>

                {/* Platform Name */}
                <h3 className="text-white font-bold text-lg mb-2">
                  {platform.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center justify-center mb-2">
                  <span className="text-2xl font-bold text-white mr-2">
                    {platform.rating}
                  </span>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon 
                        key={i} 
                        className={`w-5 h-5 ${
                          i < Math.floor(platform.rating) 
                            ? 'text-yellow-400' 
                            : 'text-gray-400'
                        }`} 
                      />
                    ))}
                  </div>
                </div>

                {/* Review Count */}
                <p className="text-white/70 text-sm mb-3">
                  {platform.reviewCount.toLocaleString()} reviews
                </p>

                {/* Badge */}
                <motion.div
                  className={`inline-block px-3 py-1 rounded-full text-white text-sm font-medium bg-gradient-to-r ${platform.color}`}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  {platform.badge}
                </motion.div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Awards and Recognition */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
        >
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Awards & Recognition
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.6 + index * 0.1,
                  ease: 'easeOut' 
                }}
              >
                <GlassCard
                  variant="primary"
                  blur="md"
                  opacity={0.7}
                  hover={true}
                  className="p-6 text-center group h-full"
                >
                  {/* Achievement Icon */}
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {achievement.icon}
                  </div>

                  {/* Year Badge */}
                  <div className="inline-block px-3 py-1 bg-primary-500 bg-opacity-20 rounded-full text-primary-400 text-sm font-medium mb-3">
                    {achievement.year}
                  </div>

                  {/* Achievement Title */}
                  <h4 className="text-white font-semibold text-lg mb-2 leading-tight">
                    {achievement.title}
                  </h4>

                  {/* Organization */}
                  <p className="text-white/70 text-sm">
                    {achievement.organization}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Security and Compliance Badges */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
        >
          <GlassCard
            variant="secondary"
            blur="lg"
            opacity={0.8}
            className="max-w-4xl mx-auto p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6">
              Security & Compliance
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {['SOC 2 Certified', 'GDPR Compliant', 'ISO 27001', 'COPPA Safe'].map((badge, index) => (
                <motion.div
                  key={badge}
                  className="glass-neutral p-4 rounded-xl group hover:glass-primary transition-all duration-300"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ delay: 1.0 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-2xl mb-2">🔒</div>
                  <div className="text-white/80 group-hover:text-white text-sm font-medium">
                    {badge}
                  </div>
                </motion.div>
              ))}
            </div>

            <p className="text-white/70 mt-6">
              Your data is protected with enterprise-grade security standards
            </p>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  )
}
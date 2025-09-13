'use client'

import { motion } from 'framer-motion'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { type ClientLogoProps } from '../../types/components'
import { GlassCard } from '../ui'

const clientLogos: ClientLogoProps[] = [
  { name: 'Google', logo: '/api/placeholder/120/60', width: 120, height: 60 },
  { name: 'Microsoft', logo: '/api/placeholder/120/60', width: 120, height: 60 },
  { name: 'Apple', logo: '/api/placeholder/120/60', width: 120, height: 60 },
  { name: 'Amazon', logo: '/api/placeholder/120/60', width: 120, height: 60 },
  { name: 'Meta', logo: '/api/placeholder/120/60', width: 120, height: 60 },
  { name: 'Netflix', logo: '/api/placeholder/120/60', width: 120, height: 60 },
  { name: 'Tesla', logo: '/api/placeholder/120/60', width: 120, height: 60 },
  { name: 'OpenAI', logo: '/api/placeholder/120/60', width: 120, height: 60 },
  { name: 'Stripe', logo: '/api/placeholder/120/60', width: 120, height: 60 },
  { name: 'Airbnb', logo: '/api/placeholder/120/60', width: 120, height: 60 },
  { name: 'Uber', logo: '/api/placeholder/120/60', width: 120, height: 60 },
  { name: 'Spotify', logo: '/api/placeholder/120/60', width: 120, height: 60 }
]

export const ClientLogos = () => {
  const { ref, isInView } = useScrollAnimation(0.1)

  return (
    <section 
      ref={ref}
      className="py-16 relative overflow-hidden"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <p className="text-white/60 text-lg mb-4">
            Trusted by professionals at leading companies
          </p>
        </motion.div>

        {/* Logos Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {clientLogos.map((client, index) => (
            <motion.div
              key={client.name}
              className="flex items-center justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.1 + index * 0.05,
                ease: 'easeOut' 
              }}
              whileHover={{ scale: 1.1 }}
            >
              <div className="w-full h-16 glass-neutral rounded-xl p-4 flex items-center justify-center group hover:glass-primary transition-all duration-300">
                {/* Placeholder for actual logo - using company name for now */}
                <div className="text-white/60 group-hover:text-white/90 font-semibold text-sm transition-colors duration-300 text-center">
                  {client.name}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Animated Logo Marquee */}
        <div className="mt-12 relative overflow-hidden">
          <motion.div
            className="flex space-x-8 items-center"
            animate={{
              x: [0, -1920]
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: 'linear'
            }}
          >
            {/* First set of logos */}
            {clientLogos.slice(0, 6).map((client, index) => (
              <div
                key={`marquee-1-${client.name}`}
                className="flex-shrink-0 w-32 h-16 glass-neutral rounded-xl p-4 flex items-center justify-center opacity-60"
              >
                <div className="text-white/50 font-medium text-sm text-center">
                  {client.name}
                </div>
              </div>
            ))}
            
            {/* Second set of logos */}
            {clientLogos.slice(6).map((client, index) => (
              <div
                key={`marquee-2-${client.name}`}
                className="flex-shrink-0 w-32 h-16 glass-neutral rounded-xl p-4 flex items-center justify-center opacity-60"
              >
                <div className="text-white/50 font-medium text-sm text-center">
                  {client.name}
                </div>
              </div>
            ))}
            
            {/* Duplicate for seamless loop */}
            {clientLogos.slice(0, 6).map((client, index) => (
              <div
                key={`marquee-duplicate-${client.name}`}
                className="flex-shrink-0 w-32 h-16 glass-neutral rounded-xl p-4 flex items-center justify-center opacity-60"
              >
                <div className="text-white/50 font-medium text-sm text-center">
                  {client.name}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Additional Social Proof */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
        >
          <GlassCard
            variant="primary"
            blur="md"
            opacity={0.8}
            className="max-w-4xl mx-auto p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              Join the Elite Network
            </h3>
            <p className="text-white/80 text-lg mb-6">
              Our alumni work at the world's most innovative companies and startups
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {['Fortune 500', 'Unicorn Startups', 'Top Tech Giants', 'Leading AI Companies'].map((tag, index) => (
                <motion.span
                  key={tag}
                  className="glass-secondary px-4 py-2 rounded-full text-blue-400 text-sm font-medium"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  )
}
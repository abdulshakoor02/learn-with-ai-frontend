'use client'

import { motion } from 'framer-motion'
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { GlassCard } from '../ui'

const comparisonFeatures = [
  {
    category: 'Core Features',
    features: [
      {
        name: 'Course Access',
        free: '5 courses',
        pro: 'Unlimited',
        enterprise: 'Unlimited'
      },
      {
        name: 'AI Tutor',
        free: 'Basic',
        pro: 'Advanced',
        enterprise: 'Advanced + Custom'
      },
      {
        name: 'Mobile App',
        free: true,
        pro: true,
        enterprise: true
      },
      {
        name: 'Progress Tracking',
        free: true,
        pro: true,
        enterprise: true
      },
      {
        name: 'Certificates',
        free: false,
        pro: true,
        enterprise: true
      }
    ]
  },
  {
    category: 'Learning Features',
    features: [
      {
        name: 'Offline Downloads',
        free: false,
        pro: true,
        enterprise: true
      },
      {
        name: 'Live Workshops',
        free: false,
        pro: true,
        enterprise: true
      },
      {
        name: 'Group Projects',
        free: false,
        pro: true,
        enterprise: true
      },
      {
        name: 'Custom Learning Paths',
        free: false,
        pro: false,
        enterprise: true
      },
      {
        name: 'Advanced Analytics',
        free: false,
        pro: 'Basic',
        enterprise: 'Advanced'
      }
    ]
  },
  {
    category: 'Support & Services',
    features: [
      {
        name: 'Community Support',
        free: true,
        pro: true,
        enterprise: true
      },
      {
        name: 'Priority Support',
        free: false,
        pro: true,
        enterprise: true
      },
      {
        name: 'Dedicated Support',
        free: false,
        pro: false,
        enterprise: true
      },
      {
        name: 'Custom Integrations',
        free: false,
        pro: false,
        enterprise: true
      },
      {
        name: 'API Access',
        free: false,
        pro: 'Limited',
        enterprise: 'Full'
      }
    ]
  },
  {
    category: 'Enterprise Features',
    features: [
      {
        name: 'Team Management',
        free: false,
        pro: false,
        enterprise: true
      },
      {
        name: 'White-label Options',
        free: false,
        pro: false,
        enterprise: true
      },
      {
        name: 'SSO Integration',
        free: false,
        pro: false,
        enterprise: true
      },
      {
        name: 'Advanced Security',
        free: false,
        pro: false,
        enterprise: true
      },
      {
        name: 'Custom Branding',
        free: false,
        pro: false,
        enterprise: true
      }
    ]
  }
]

const renderFeatureValue = (value: any) => {
  if (typeof value === 'boolean') {
    return value ? (
      <CheckIcon className="w-5 h-5 text-green-400 mx-auto" />
    ) : (
      <XMarkIcon className="w-5 h-5 text-red-400 mx-auto" />
    )
  }
  
  if (typeof value === 'string') {
    return (
      <span className="text-white/80 text-sm font-medium">
        {value}
      </span>
    )
  }
  
  return null
}

export const ComparisonTable = () => {
  const { ref, isInView } = useScrollAnimation(0.1)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="mt-16"
    >
      <GlassCard
        variant="neutral"
        blur="lg"
        opacity={0.9}
        className="overflow-hidden"
      >
        {/* Table Header */}
        <div className="grid grid-cols-4 gap-4 p-6 border-b border-white/10">
          <div className="text-white font-semibold text-lg">
            Features
          </div>
          <div className="text-center">
            <div className="text-white font-semibold">Free</div>
            <div className="text-white/60 text-sm">$0/month</div>
          </div>
          <div className="text-center">
            <div className="text-white font-semibold">Pro</div>
            <div className="text-white/60 text-sm">$29/month</div>
          </div>
          <div className="text-center">
            <div className="text-white font-semibold">Enterprise</div>
            <div className="text-white/60 text-sm">$99/month</div>
          </div>
        </div>

        {/* Feature Categories */}
        <div className="divide-y divide-white/10">
          {comparisonFeatures.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ 
                duration: 0.6, 
                delay: categoryIndex * 0.1,
                ease: 'easeOut' 
              }}
              className="p-6"
            >
              {/* Category Header */}
              <h4 className="text-primary-400 font-semibold text-lg mb-4">
                {category.category}
              </h4>

              {/* Features in Category */}
              <div className="space-y-4">
                {category.features.map((feature, featureIndex) => (
                  <motion.div
                    key={feature.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: categoryIndex * 0.1 + featureIndex * 0.05 
                    }}
                    className="grid grid-cols-4 gap-4 items-center py-3 hover:bg-white/5 rounded-lg px-4 transition-colors duration-200"
                  >
                    <div className="text-white/80">
                      {feature.name}
                    </div>
                    <div className="text-center">
                      {renderFeatureValue(feature.free)}
                    </div>
                    <div className="text-center">
                      {renderFeatureValue(feature.pro)}
                    </div>
                    <div className="text-center">
                      {renderFeatureValue(feature.enterprise)}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Table Footer */}
        <motion.div
          className="p-6 bg-gradient-to-r from-primary-500/10 to-blue-500/10 border-t border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="grid grid-cols-4 gap-4 items-center">
            <div className="text-white font-medium">
              Need help choosing?
            </div>
            <div className="text-center">
              <button className="glass-button-secondary px-4 py-2 text-sm rounded-lg">
                Start Free
              </button>
            </div>
            <div className="text-center">
              <button className="glass-button-primary px-4 py-2 text-sm rounded-lg">
                Try Pro
              </button>
            </div>
            <div className="text-center">
              <button className="glass-button-secondary px-4 py-2 text-sm rounded-lg">
                Contact Sales
              </button>
            </div>
          </div>
        </motion.div>
      </GlassCard>

      {/* Mobile-Friendly Alternative */}
      <div className="lg:hidden mt-8 space-y-6">
        {['Free', 'Pro', 'Enterprise'].map((plan, planIndex) => (
          <motion.div
            key={plan}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: planIndex * 0.1 }}
          >
            <GlassCard
              variant={plan === 'Pro' ? 'primary' : 'neutral'}
              blur="md"
              opacity={0.8}
              className="p-6"
            >
              <h3 className="text-xl font-bold text-white mb-4 text-center">
                {plan} Plan Features
              </h3>
              
              <div className="space-y-3">
                {comparisonFeatures.map((category) => (
                  <div key={category.category}>
                    <h4 className="text-primary-400 font-medium text-sm mb-2">
                      {category.category}
                    </h4>
                    {category.features.map((feature) => {
                      const value = plan === 'Free' ? feature.free : 
                                   plan === 'Pro' ? feature.pro : feature.enterprise
                      
                      return (
                        <div key={feature.name} className="flex justify-between items-center py-1">
                          <span className="text-white/80 text-sm">{feature.name}</span>
                          <div className="text-sm">
                            {renderFeatureValue(value)}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
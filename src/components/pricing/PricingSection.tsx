'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { PricingCard } from './PricingCard'
import { ComparisonTable } from './ComparisonTable'
import { CTASection } from './CTASection'
import { GradientText, Button } from '../ui'
import { type PricingTierProps } from '../../types/components'

const pricingTiers: PricingTierProps[] = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for getting started with AI learning',
    features: [
      '5 courses access',
      'Basic AI tutor',
      'Community support',
      'Mobile app access',
      'Progress tracking'
    ],
    highlighted: false,
    buttonText: 'Start Free',
    onSelectPlan: () => console.log('Selected Free plan')
  },
  {
    name: 'Pro',
    price: '$29',
    period: 'month',
    description: 'Everything you need to accelerate your learning',
    features: [
      'Unlimited course access',
      'Advanced AI tutor',
      'Priority support',
      'Offline downloads',
      'Certificates',
      'Progress analytics',
      'Group projects',
      'Live workshops'
    ],
    highlighted: true,
    buttonText: 'Start Pro Trial',
    onSelectPlan: () => console.log('Selected Pro plan')
  },
  {
    name: 'Enterprise',
    price: '$99',
    period: 'month',
    description: 'For teams and organizations',
    features: [
      'Everything in Pro',
      'Team management',
      'Custom learning paths',
      'Advanced analytics',
      'API access',
      'White-label options',
      'Dedicated support',
      'Custom integrations'
    ],
    highlighted: false,
    buttonText: 'Contact Sales',
    onSelectPlan: () => console.log('Selected Enterprise plan')
  }
]

const faqs = [
  {
    question: 'Can I change my plan anytime?',
    answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately and are prorated.'
  },
  {
    question: 'Is there a free trial for Pro plans?',
    answer: 'Yes, we offer a 14-day free trial for all Pro plans. No credit card required to start.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, PayPal, and offer annual billing discounts.'
  },
  {
    question: 'Can I cancel anytime?',
    answer: 'Absolutely! You can cancel your subscription at any time. Your access continues until the end of your billing period.'
  }
]

export const PricingSection = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')
  const [showComparison, setShowComparison] = useState(false)
  const { ref, isInView } = useScrollAnimation(0.1)

  const getDiscountedPrice = (price: string) => {
    if (price === '$0') return price
    const numPrice = parseInt(price.replace('$', ''))
    const yearlyPrice = Math.floor(numPrice * 12 * 0.8) // 20% discount
    return `$${yearlyPrice}`
  }

  return (
    <section 
      ref={ref}
      id="pricing"
      className="py-20 lg:py-32 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/10 via-transparent to-blue-900/10" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white block mb-2">Choose Your</span>
            <GradientText 
              variant="primary" 
              size="xxl"
              weight="bold"
              className="text-4xl md:text-5xl lg:text-6xl"
            >
              Learning Journey
            </GradientText>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
            Start free and scale as you grow. All plans include our core AI-powered learning features.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center glass-neutral rounded-xl p-1">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                billingCycle === 'monthly'
                  ? 'bg-primary-500 text-white shadow-lg'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 relative ${
                billingCycle === 'yearly'
                  ? 'bg-primary-500 text-white shadow-lg'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Yearly
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                20% OFF
              </span>
            </button>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {pricingTiers.map((tier, index) => (
            <PricingCard
              key={tier.name}
              {...tier}
              price={billingCycle === 'yearly' ? getDiscountedPrice(tier.price) : tier.price}
              period={billingCycle === 'yearly' ? 'year' : tier.period}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Feature Comparison Toggle */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button
            variant="secondary"
            size="lg"
            onClick={() => setShowComparison(!showComparison)}
            className="group"
          >
            <span>{showComparison ? 'Hide' : 'Show'} Detailed Comparison</span>
            <motion.div
              animate={{ rotate: showComparison ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="ml-2"
            >
              ↓
            </motion.div>
          </Button>
        </motion.div>

        {/* Comparison Table */}
        {showComparison && <ComparisonTable />}

        {/* FAQ Section */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Frequently Asked Questions
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                className="glass-neutral p-6 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <h4 className="text-white font-semibold mb-3">
                  {faq.question}
                </h4>
                <p className="text-white/70 leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <CTASection />
      </div>
    </section>
  )
}
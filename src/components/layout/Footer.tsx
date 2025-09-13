'use client'

import { motion } from 'framer-motion'
import { 
  EnvelopeIcon, 
  MapPinIcon, 
  PhoneIcon,
  HeartIcon 
} from '@heroicons/react/24/outline'
import { GradientText, GlassCard } from '../ui'
import { cn } from '../../utils/cn'

// Custom social media icons
const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
)

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const GitHubIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
)

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447c0-1.297.49-2.447 1.418-3.323.928-.875 2.026-1.296 3.323-1.296 1.297 0 2.447.421 3.323 1.296.875.876 1.296 2.026 1.296 3.323 0 1.297-.421 2.448-1.296 3.323-.876.807-2.026 1.297-3.323 1.297zm7.83-9.156h-1.79V6.156h1.79v1.676zm-2.465 8.844c-.875.807-1.917 1.296-3.117 1.296s-2.242-.489-3.117-1.296c-.875-.807-1.296-1.917-1.296-3.117s.421-2.31 1.296-3.117c.875-.807 1.917-1.296 3.117-1.296s2.242.489 3.117 1.296c.875.807 1.296 1.917 1.296 3.117s-.421 2.31-1.296 3.117z"/>
  </svg>
)

interface FooterProps {
  className?: string
}

const footerSections = [
  {
    title: 'Product',
    links: [
      { name: 'Features', href: '#features' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'Use Cases', href: '#use-cases' },
      { name: 'Integrations', href: '#integrations' },
      { name: 'API', href: '#api' },
    ]
  },
  {
    title: 'Company',
    links: [
      { name: 'About Us', href: '#about' },
      { name: 'Careers', href: '#careers' },
      { name: 'Blog', href: '#blog' },
      { name: 'Press', href: '#press' },
      { name: 'Partners', href: '#partners' },
    ]
  },
  {
    title: 'Resources',
    links: [
      { name: 'Documentation', href: '#docs' },
      { name: 'Help Center', href: '#help' },
      { name: 'Community', href: '#community' },
      { name: 'Tutorials', href: '#tutorials' },
      { name: 'Webinars', href: '#webinars' },
    ]
  },
  {
    title: 'Legal',
    links: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'GDPR', href: '/gdpr' },
      { name: 'Security', href: '/security' },
    ]
  }
]

const socialLinks = [
  { name: 'Twitter', icon: TwitterIcon, href: '#twitter', color: 'text-blue-400' },
  { name: 'Facebook', icon: FacebookIcon, href: '#facebook', color: 'text-blue-600' },
  { name: 'LinkedIn', icon: LinkedInIcon, href: '#linkedin', color: 'text-blue-500' },
  { name: 'GitHub', icon: GitHubIcon, href: '#github', color: 'text-gray-400' },
  { name: 'Instagram', icon: InstagramIcon, href: '#instagram', color: 'text-pink-400' },
]

const contactInfo = [
  { icon: EnvelopeIcon, text: 'hello@learnai.com', href: 'mailto:hello@learnai.com' },
  { icon: PhoneIcon, text: '+1 (555) 123-4567', href: 'tel:+15551234567' },
  { icon: MapPinIcon, text: 'San Francisco, CA', href: '#location' },
]

export const Footer = ({ className }: FooterProps) => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={cn('relative py-20 mt-20', className)}>
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-blue-500/5" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Company Info */}
          <div className="lg:col-span-4 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* Logo */}
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-primary-500 to-blue-500 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">L</span>
                </div>
                <GradientText 
                  variant="primary" 
                  size="xl" 
                  weight="bold"
                  className="text-2xl"
                >
                  LearnAI
                </GradientText>
              </div>

              {/* Description */}
              <p className="text-white/70 text-lg leading-relaxed">
                Empowering learners worldwide with AI-driven educational experiences. 
                Transform your learning journey with personalized, adaptive content.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                {contactInfo.map((contact, index) => (
                  <motion.a
                    key={index}
                    href={contact.href}
                    className="flex items-center space-x-3 text-white/70 hover:text-white transition-colors duration-200 group"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <contact.icon className="w-5 h-5 text-primary-400 group-hover:text-primary-300" />
                    <span>{contact.text}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-6 grid grid-cols-2 md:grid-cols-4 gap-8">
            {footerSections.map((section, sectionIndex) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <h3 className="text-white font-semibold text-lg">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <motion.li key={link.name}>
                      <motion.a
                        href={link.href}
                        className="text-white/60 hover:text-white transition-colors duration-200"
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                      >
                        {link.name}
                      </motion.a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Newsletter Signup */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <GlassCard 
                variant="primary" 
                blur="md" 
                opacity={0.8}
                className="p-6 space-y-4"
              >
                <h3 className="text-white font-semibold text-lg">
                  Stay Updated
                </h3>
                <p className="text-white/70 text-sm">
                  Get the latest updates on new features and educational content.
                </p>
                
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 glass-input text-sm"
                  />
                  <motion.button
                    className="w-full px-4 py-3 bg-gradient-to-r from-primary-500 to-blue-500 text-white font-medium rounded-xl hover:scale-105 transition-transform duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Subscribe
                  </motion.button>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-white/20"
        >
          <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
            {/* Copyright */}
            <div className="flex items-center space-x-2 text-white/60">
              <span>© {currentYear} LearnAI. Made with</span>
              <HeartIcon className="w-4 h-4 text-red-400" />
              <span>in San Francisco</span>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  className={cn(
                    'p-2 rounded-lg glass-neutral hover:glass-primary transition-all duration-300',
                    social.color
                  )}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
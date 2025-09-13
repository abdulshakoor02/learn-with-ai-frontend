import { ReactNode } from 'react'

export interface GlassCardProps {
  variant: 'primary' | 'secondary' | 'neutral' | 'accent'
  blur: 'sm' | 'md' | 'lg' | 'xl'
  opacity: number
  children: ReactNode
  className?: string
  hover?: boolean
}

export interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline' | 'ghost'
  size: 'sm' | 'md' | 'lg' | 'xl'
  children: ReactNode
  className?: string
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
}

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  className?: string
  closeOnOverlayClick?: boolean
}

export interface InputProps {
  type: 'text' | 'email' | 'password' | 'tel' | 'url'
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  error?: string
  disabled?: boolean
  className?: string
  label?: string
  required?: boolean
}

export interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
  delay?: number
}

export interface TestimonialProps {
  name: string
  role: string
  company: string
  avatar: string
  rating: number
  content: string
}

export interface PricingTierProps {
  name: string
  price: string
  period: string
  description: string
  features: string[]
  highlighted?: boolean
  buttonText: string
  onSelectPlan: () => void
}

export interface StatisticProps {
  value: string
  label: string
  prefix?: string
  suffix?: string
}

export interface ClientLogoProps {
  name: string
  logo: string
  width?: number
  height?: number
}
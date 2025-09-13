import { type GlassCardProps } from '../types/components'

export interface GlassConfig {
  background: string
  border: string
  shadow: string
  backdropBlur: string
}

export const glassVariants: Record<GlassCardProps['variant'], GlassConfig> = {
  primary: {
    background: 'rgba(124, 58, 237, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    shadow: '0 8px 32px rgba(124, 58, 237, 0.1)',
    backdropBlur: 'blur(16px)'
  },
  secondary: {
    background: 'rgba(59, 130, 246, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    shadow: '0 4px 24px rgba(59, 130, 246, 0.1)',
    backdropBlur: 'blur(12px)'
  },
  neutral: {
    background: 'rgba(248, 250, 252, 0.05)',
    border: '1px solid rgba(226, 232, 240, 0.2)',
    shadow: '0 2px 16px rgba(0, 0, 0, 0.05)',
    backdropBlur: 'blur(8px)'
  },
  accent: {
    background: 'rgba(245, 158, 11, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.25)',
    shadow: '0 6px 28px rgba(245, 158, 11, 0.15)',
    backdropBlur: 'blur(14px)'
  }
}

export const blurLevels: Record<GlassCardProps['blur'], string> = {
  sm: 'blur(4px)',
  md: 'blur(8px)',
  lg: 'blur(16px)',
  xl: 'blur(24px)'
}

export function getGlassStyles(
  variant: GlassCardProps['variant'],
  blur: GlassCardProps['blur'],
  opacity: number,
  hover: boolean = false
): React.CSSProperties {
  const config = glassVariants[variant]
  const blurValue = blurLevels[blur]
  
  return {
    background: config.background,
    border: config.border,
    boxShadow: hover ? config.shadow.replace('rgba', 'rgba').replace('0.1)', '0.2)') : config.shadow,
    backdropFilter: blurValue,
    WebkitBackdropFilter: blurValue,
    opacity,
    transition: 'all 0.3s ease'
  }
}

export function generateGlassClasses(
  variant: GlassCardProps['variant'],
  blur: GlassCardProps['blur'],
  hover: boolean = false
): string {
  const baseClasses = 'backdrop-blur border rounded-xl transition-all duration-300'
  
  const variantClasses = {
    primary: 'bg-primary-500 bg-opacity-10 border-white border-opacity-20 shadow-lg shadow-primary-500',
    secondary: 'bg-blue-500 bg-opacity-10 border-white border-opacity-15 shadow-lg shadow-blue-500',
    neutral: 'bg-slate-50 bg-opacity-5 border-slate-200 border-opacity-20 shadow-md shadow-black shadow-opacity-5',
    accent: 'bg-amber-500 bg-opacity-10 border-white border-opacity-25 shadow-lg shadow-amber-500'
  }
  
  const blurClasses = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
    xl: 'backdrop-blur-xl'
  }
  
  const hoverClasses = hover ? 'hover:scale-105 hover:shadow-xl' : ''
  
  return `${baseClasses} ${variantClasses[variant]} ${blurClasses[blur]} ${hoverClasses}`.trim()
}
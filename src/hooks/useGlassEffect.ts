import { useState, useEffect, useCallback } from 'react'
import { getGlassStyles } from '../utils/glassmorphism'
import { type GlassCardProps } from '../types/components'

interface UseGlassEffectProps {
  variant: GlassCardProps['variant']
  blur: GlassCardProps['blur']
  opacity: number
  hover?: boolean
}

export const useGlassEffect = ({ 
  variant, 
  blur, 
  opacity, 
  hover = false 
}: UseGlassEffectProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const [currentStyles, setCurrentStyles] = useState<React.CSSProperties>({})

  const updateStyles = useCallback(() => {
    const shouldApplyHover = hover && isHovered
    const styles = getGlassStyles(variant, blur, opacity, shouldApplyHover)
    setCurrentStyles(styles)
  }, [variant, blur, opacity, hover, isHovered])

  useEffect(() => {
    updateStyles()
  }, [updateStyles])

  const handleMouseEnter = useCallback(() => {
    if (hover) {
      setIsHovered(true)
    }
  }, [hover])

  const handleMouseLeave = useCallback(() => {
    if (hover) {
      setIsHovered(false)
    }
  }, [hover])

  return {
    styles: currentStyles,
    isHovered,
    handlers: {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave
    }
  }
}

export const useGlassAnimation = (
  initialOpacity: number = 0.8,
  animatedOpacity: number = 1,
  duration: number = 3000
) => {
  const [opacity, setOpacity] = useState(initialOpacity)

  useEffect(() => {
    const interval = setInterval(() => {
      setOpacity(prev => prev === initialOpacity ? animatedOpacity : initialOpacity)
    }, duration)

    return () => clearInterval(interval)
  }, [initialOpacity, animatedOpacity, duration])

  return opacity
}
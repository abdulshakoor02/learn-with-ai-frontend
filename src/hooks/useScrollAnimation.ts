import { useState, useEffect, useRef, useCallback } from 'react'
import { useInView } from 'framer-motion'

export const useScrollAnimation = (threshold: number = 0.1) => {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { 
    once: true, 
    margin: '-10%',
    amount: threshold 
  })

  return { ref, isInView }
}

export const useScrollTrigger = (offset: number = 100) => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsScrolled(scrollY > offset)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Check initial state

    return () => window.removeEventListener('scroll', handleScroll)
  }, [offset])

  return isScrolled
}

export const useParallax = (speed: number = 0.5) => {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * speed)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])

  return offset
}

export const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setScrollDirection('down')
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection('up')
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return scrollDirection
}

export const useInViewAnimation = (
  threshold: number = 0.1,
  rootMargin: string = '-10%'
) => {
  const ref = useRef<HTMLElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  const isInView = useInView(ref, {
    once: true,
    margin: rootMargin,
    amount: threshold
  })

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true)
    }
  }, [isInView, hasAnimated])

  return {
    ref,
    isInView,
    hasAnimated,
    shouldAnimate: isInView && !hasAnimated
  }
}
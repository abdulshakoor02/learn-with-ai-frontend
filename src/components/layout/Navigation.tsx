'use client'

import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

interface NavigationItem {
  name: string
  href: string
  description?: string
  icon?: React.ComponentType<any>
}

interface NavigationProps {
  items: NavigationItem[]
  orientation?: 'horizontal' | 'vertical'
  variant?: 'primary' | 'secondary' | 'minimal'
  className?: string
  onItemClick?: (item: NavigationItem) => void
}

export const Navigation = ({
  items,
  orientation = 'horizontal',
  variant = 'primary',
  className,
  onItemClick
}: NavigationProps) => {
  const handleItemClick = (item: NavigationItem, e: React.MouseEvent) => {
    e.preventDefault()
    
    if (onItemClick) {
      onItemClick(item)
    } else {
      // Default scroll behavior for anchor links
      if (item.href.startsWith('#')) {
        const element = document.querySelector(item.href)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      } else {
        window.location.href = item.href
      }
    }
  }

  const baseClasses = {
    horizontal: 'flex items-center space-x-1',
    vertical: 'flex flex-col space-y-1'
  }

  const variantClasses = {
    primary: 'glass-neutral',
    secondary: 'glass-primary',
    minimal: 'bg-transparent'
  }

  return (
    <nav 
      className={cn(
        baseClasses[orientation],
        variantClasses[variant],
        orientation === 'horizontal' ? 'rounded-2xl p-2' : 'rounded-xl p-1',
        className
      )}
    >
      {items.map((item, index) => (
        <motion.button
          key={item.name}
          onClick={(e) => handleItemClick(item, e)}
          className={cn(
            'relative px-4 py-2 rounded-xl text-white/80 hover:text-white transition-all duration-300 font-medium',
            'hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-primary-500/50',
            orientation === 'vertical' && 'w-full text-left'
          )}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.3, 
            delay: index * 0.1,
            ease: 'easeOut'
          }}
        >
          <div className="flex items-center space-x-2">
            {item.icon && (
              <item.icon className="w-4 h-4" />
            )}
            <span>{item.name}</span>
          </div>
          
          {item.description && orientation === 'vertical' && (
            <p className="text-xs text-white/60 mt-1">
              {item.description}
            </p>
          )}
        </motion.button>
      ))}
    </nav>
  )
}

// Specialized navigation components
export const HorizontalNavigation = (props: Omit<NavigationProps, 'orientation'>) => (
  <Navigation {...props} orientation="horizontal" />
)

export const VerticalNavigation = (props: Omit<NavigationProps, 'orientation'>) => (
  <Navigation {...props} orientation="vertical" />
)

// Navigation with active state
interface ActiveNavigationProps extends NavigationProps {
  activeItem?: string
}

export const ActiveNavigation = ({
  items,
  activeItem,
  ...props
}: ActiveNavigationProps) => {
  return (
    <Navigation
      {...props}
      items={items.map(item => ({
        ...item,
        isActive: item.name === activeItem || item.href === activeItem
      }))}
    />
  )
}

// Breadcrumb navigation
interface BreadcrumbProps {
  items: { name: string; href?: string }[]
  separator?: React.ReactNode
  className?: string
}

export const Breadcrumb = ({ 
  items, 
  separator = '/', 
  className 
}: BreadcrumbProps) => {
  return (
    <nav className={cn('flex items-center space-x-2 text-sm', className)}>
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          {index > 0 && (
            <span className="text-white/40">{separator}</span>
          )}
          {item.href ? (
            <motion.a
              href={item.href}
              className="text-white/70 hover:text-white transition-colors duration-200"
              whileHover={{ scale: 1.02 }}
            >
              {item.name}
            </motion.a>
          ) : (
            <span className="text-white font-medium">{item.name}</span>
          )}
        </div>
      ))}
    </nav>
  )
}

// Tab navigation
interface TabNavigationProps {
  tabs: { id: string; name: string; content?: React.ReactNode }[]
  activeTab: string
  onTabChange: (tabId: string) => void
  className?: string
}

export const TabNavigation = ({
  tabs,
  activeTab,
  onTabChange,
  className
}: TabNavigationProps) => {
  return (
    <div className={cn('space-y-4', className)}>
      {/* Tab Headers */}
      <div className="flex space-x-1 glass-neutral rounded-xl p-1">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              'flex-1 px-4 py-2 rounded-lg font-medium transition-all duration-300',
              activeTab === tab.id
                ? 'bg-primary-500 text-white shadow-lg'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {tab.name}
          </motion.button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[200px]">
        {tabs.map((tab) => (
          <motion.div
            key={tab.id}
            className={cn(
              'space-y-4',
              activeTab === tab.id ? 'block' : 'hidden'
            )}
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: activeTab === tab.id ? 1 : 0,
              y: activeTab === tab.id ? 0 : 10
            }}
            transition={{ duration: 0.3 }}
          >
            {tab.content}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
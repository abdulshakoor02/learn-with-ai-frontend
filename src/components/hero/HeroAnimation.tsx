'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { 
  CpuChipIcon,
  BoltIcon,
  SparklesIcon,
  CpuChipIcon as BrainIcon,
  ChartBarIcon,
  CodeBracketIcon
} from '@heroicons/react/24/outline'
import { floatingAnimation } from '../../utils/animations'

const floatingElements = [
  {
    icon: CpuChipIcon,
    color: 'text-primary-400',
    size: 'w-8 h-8',
    position: { top: '10%', left: '15%' },
    delay: 0,
    duration: 6
  },
  {
    icon: BoltIcon,
    color: 'text-accent-400',
    size: 'w-6 h-6',
    position: { top: '25%', right: '20%' },
    delay: 1,
    duration: 7
  },
  {
    icon: SparklesIcon,
    color: 'text-blue-400',
    size: 'w-7 h-7',
    position: { top: '45%', left: '10%' },
    delay: 0.5,
    duration: 8
  },
  {
    icon: BrainIcon,
    color: 'text-purple-400',
    size: 'w-9 h-9',
    position: { top: '65%', right: '15%' },
    delay: 1.5,
    duration: 6.5
  },
  {
    icon: ChartBarIcon,
    color: 'text-green-400',
    size: 'w-6 h-6',
    position: { top: '80%', left: '20%' },
    delay: 2,
    duration: 7.5
  },
  {
    icon: CodeBracketIcon,
    color: 'text-orange-400',
    size: 'w-8 h-8',
    position: { top: '35%', right: '10%' },
    delay: 0.8,
    duration: 6.8
  }
]

// Helper function to generate particles
const generateParticles = () => Array.from({ length: 12 }, (_, i) => ({
  id: i,
  size: Math.random() * 4 + 2,
  x: Math.random() * 100,
  y: Math.random() * 100,
  delay: Math.random() * 3,
  duration: Math.random() * 4 + 6
}))

// Helper function to generate SVG paths
const generateSVGPaths = () => [1, 2, 3, 4, 5].map((line) => ({
  id: line,
  path: `M${Math.random() * 400},${Math.random() * 400} Q${Math.random() * 400},${Math.random() * 400} ${Math.random() * 400},${Math.random() * 400}`,
  delay: line * 0.5,
  duration: 6 + line
}))

export const HeroAnimation = () => {
  const [aiParticles, setAiParticles] = useState<Array<{
    id: number;
    size: number;
    x: number;
    y: number;
    delay: number;
    duration: number;
  }>>([]);
  
  const [svgPaths, setSvgPaths] = useState<Array<{
    id: number;
    path: string;
    delay: number;
    duration: number;
  }>>([]);
  
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    // Generate random values only on client side
    setAiParticles(generateParticles());
    setSvgPaths(generateSVGPaths());
    setIsClient(true);
  }, []);
  
  // Don't render dynamic content until client-side hydration is complete
  if (!isClient) {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Only render static content during SSR */}
        {floatingElements.map((element, index) => (
          <motion.div
            key={index}
            className="absolute"
            style={element.position}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 1, 0],
              scale: [0, 1.2, 1, 0],
              y: [-20, 20, -20]
            }}
            transition={{
              duration: element.duration,
              delay: element.delay,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            <div className="glass-primary p-3 rounded-xl backdrop-blur-sm">
              <element.icon className={`${element.size} ${element.color}`} />
            </div>
          </motion.div>
        ))}
      </div>
    );
  }
  
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Floating AI Icons */}
      {floatingElements.map((element, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={element.position}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 1, 1, 0],
            scale: [0, 1.2, 1, 0],
            y: [-20, 20, -20]
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          <div className="glass-primary p-3 rounded-xl backdrop-blur-sm">
            <element.icon className={`${element.size} ${element.color}`} />
          </div>
        </motion.div>
      ))}

      {/* AI Particles */}
      {aiParticles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary-400 bg-opacity-30"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            opacity: [0.3, 1, 0.3],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      ))}

      {/* Neural Network Lines */}
      <svg 
        className="absolute inset-0 w-full h-full" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(124, 58, 237, 0.4)" />
            <stop offset="50%" stopColor="rgba(59, 130, 246, 0.4)" />
            <stop offset="100%" stopColor="rgba(245, 158, 11, 0.4)" />
          </linearGradient>
        </defs>
        
        {/* Animated connecting lines */}
        {svgPaths.map((pathData) => (
          <motion.path
            key={pathData.id}
            d={pathData.path}
            stroke="url(#lineGradient)"
            strokeWidth="2"
            fill="none"
            strokeDasharray="5,5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: [0, 1, 0], 
              opacity: [0, 0.6, 0] 
            }}
            transition={{
              duration: pathData.duration,
              delay: pathData.delay,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        ))}
      </svg>

      {/* Floating Data Streams */}
      <div className="absolute inset-0">
        {[1, 2, 3].map((stream) => (
          <motion.div
            key={stream}
            className="absolute"
            style={{
              left: `${20 + stream * 25}%`,
              top: '20%'
            }}
          >
            {/* Data Blocks */}
            {[1, 2, 3, 4, 5].map((block) => (
              <motion.div
                key={block}
                className="w-2 h-8 bg-gradient-to-t from-primary-500 to-blue-500 opacity-40 rounded-sm mb-2"
                animate={{
                  height: [8, 32, 8],
                  opacity: [0.4, 1, 0.4]
                }}
                transition={{
                  duration: 2,
                  delay: block * 0.2 + stream * 0.5,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
            ))}
          </motion.div>
        ))}
      </div>

      {/* Pulsing Nodes */}
      {[1, 2, 3, 4].map((node) => (
        <motion.div
          key={node}
          className="absolute w-4 h-4 rounded-full bg-primary-400 bg-opacity-60"
          style={{
            left: `${15 + node * 20}%`,
            top: `${30 + node * 15}%`
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{
            duration: 3,
            delay: node * 0.3,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      ))}

      {/* Energy Waves */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[1, 2, 3].map((wave) => (
          <motion.div
            key={wave}
            className="absolute rounded-full border border-primary-400 border-opacity-20"
            animate={{
              scale: [0, 3],
              opacity: [0.8, 0]
            }}
            transition={{
              duration: 4,
              delay: wave * 1.2,
              repeat: Infinity,
              ease: 'easeOut'
            }}
            style={{
              width: '100px',
              height: '100px'
            }}
          />
        ))}
      </div>

      {/* AI Code Snippets */}
      <motion.div
        className="absolute top-1/4 right-1/4 glass-primary p-3 rounded-lg opacity-30"
        animate={{
          y: [0, -10, 0],
          opacity: [0.3, 0.7, 0.3]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        <div className="text-primary-400 text-xs font-mono space-y-1">
          <div>if (learning) {`{`}</div>
          <div className="ml-2">adapt();</div>
          <div className="ml-2">improve();</div>
          <div>{`}`}</div>
        </div>
      </motion.div>

      {/* Floating Algorithm */}
      <motion.div
        className="absolute bottom-1/3 left-1/4 glass-secondary p-2 rounded-lg opacity-40"
        animate={{
          x: [0, 15, 0],
          rotate: [0, 5, 0]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        <div className="text-blue-400 text-xs">
          Σ(ai × wi + b)
        </div>
      </motion.div>
    </div>
  )
}
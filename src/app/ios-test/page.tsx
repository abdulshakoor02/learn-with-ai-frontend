'use client'

import { useState, useEffect } from 'react'
import { XMarkIcon, CheckIcon } from '@heroicons/react/24/outline'
import '@/styles/ios-modal-fixes.css'

export default function IOSTestPage() {
  const [isIOS, setIsIOS] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const checkIOS = () => {
      if (typeof window === 'undefined') return false
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
      return /iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream;
    }
    setIsIOS(checkIOS())
  }, [])

  const handleClick = () => {
    console.log('Button clicked!')
    setClickCount(prev => prev + 1)
    alert(`Button clicked ${clickCount + 1} times!`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 p-4 flex flex-col items-center justify-center">
      <div className="max-w-md w-full glass-primary rounded-2xl p-8 border border-white/20">
        <h1 className="text-2xl font-bold text-white text-center mb-6">
          iOS Button Test
        </h1>
        
        <div className="space-y-4 text-white/80 text-sm mb-8">
          <p><strong>Device:</strong> {mounted ? (isIOS ? 'iOS' : 'Non-iOS') : 'Loading...'}</p>
          <p><strong>User Agent:</strong> {mounted ? navigator.userAgent : 'Loading...'}</p>
          <p><strong>Viewport:</strong> {mounted ? `${window.innerWidth} x ${window.innerHeight}` : 'Loading...'}</p>
          <p><strong>Clicks:</strong> {clickCount}</p>
        </div>

        <div className="space-y-4">
          {/* Standard button */}
          <button
            onClick={handleClick}
            className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg border border-purple-400 font-medium"
            style={{ minHeight: '60px' }}
          >
            Standard Button
          </button>

          {/* iOS-specific button */}
          {isIOS && (
            <div className="ios-button-container">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  console.log('iOS button clicked!')
                  handleClick()
                }}
                onTouchStart={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  console.log('iOS button touch start')
                }}
                onTouchEnd={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  console.log('iOS button touch end')
                  handleClick()
                }}
                className="ios-clickable-button ios-portrait-button ios-touch-fix w-full px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg border border-green-400 font-medium"
                style={{
                  minHeight: '60px',
                  cursor: 'pointer'
                }}
              >
                <span style={{ pointerEvents: 'none' }}>iOS-Specific Button</span>
              </button>
            </div>
          )}

          {/* Close button simulation */}
          <div className="flex justify-center">
            {isIOS ? (
              <div className="ios-button-container">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    console.log('iOS close button clicked!')
                    handleClick()
                  }}
                  onTouchStart={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    console.log('iOS close button touch start')
                  }}
                  onTouchEnd={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    console.log('iOS close button touch end')
                    handleClick()
                  }}
                  className="ios-clickable-button ios-portrait-button ios-touch-fix"
                  style={{
                    padding: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    borderRadius: '16px',
                    border: '3px solid rgba(255, 255, 255, 0.5)',
                    cursor: 'pointer',
                    minWidth: '60px',
                    minHeight: '60px'
                  }}
                >
                  <XMarkIcon className="w-6 h-6 text-white" style={{ pointerEvents: 'none' }} />
                </button>
              </div>
            ) : (
              <button
                onClick={handleClick}
                className="p-3 bg-red-600 text-white rounded-lg"
                style={{ minHeight: '60px', minWidth: '60px' }}
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>

        <div className="mt-8 p-4 bg-white/10 rounded-lg">
          <h3 className="text-white font-medium mb-2">Test Instructions:</h3>
          <ul className="text-white/70 text-sm space-y-1">
            <li>1. Try tapping each button</li>
            <li>2. Check browser console for logs</li>
            <li>3. Verify click count increases</li>
            <li>4. Test in both portrait and landscape</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
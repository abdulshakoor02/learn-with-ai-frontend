'use client'

import { useState, useEffect } from 'react'

export default function IOSButtonTest() {
  const [logs, setLogs] = useState<string[]>([])
  const [clickCount, setClickCount] = useState(0)
  const [isIOS, setIsIOS] = useState(false)

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString()
    setLogs(prev => [...prev, `[${timestamp}] ${message}`])
    console.log(message)
  }

  useEffect(() => {
    const checkIOS = () => {
      if (typeof window === 'undefined') return false
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera
      return /iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream
    }
    const isIOSDevice = checkIOS()
    setIsIOS(isIOSDevice)
    addLog(`Device detected: ${isIOSDevice ? 'iOS' : 'Non-iOS'}`)
    addLog(`User Agent: ${navigator.userAgent}`)
    addLog(`Viewport: ${window.innerWidth}x${window.innerHeight}`)
    addLog(`Orientation: ${window.innerHeight > window.innerWidth ? 'Portrait' : 'Landscape'}`)

    // Global touch event listener for debugging
    const handleGlobalTouch = (e: TouchEvent) => {
      const target = e.target as HTMLElement
      const button = target.closest('[data-ios-action]')
      if (button) {
        e.preventDefault()
        const action = button.getAttribute('data-ios-action')
        addLog(`Touch detected on button: ${action}`)
        
        // Trigger click event
        const clickEvent = new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window
        })
        button.dispatchEvent(clickEvent)
      }
    }

    document.addEventListener('touchstart', (e) => {
      const target = e.target as HTMLElement
      if (target.closest('button')) {
        addLog(`Touch start on button`)
      }
    })

    document.addEventListener('touchend', handleGlobalTouch, { passive: false })

    return () => {
      document.removeEventListener('touchend', handleGlobalTouch)
    }
  }, [])

  const handleClick = () => {
    setClickCount(prev => prev + 1)
    addLog(`Button clicked! Count: ${clickCount + 1}`)
  }

  const handleButtonClick = (callback: () => void) => {
    requestAnimationFrame(() => {
      callback()
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          <h1 className="text-3xl font-bold text-white mb-2">iOS Button Test Page</h1>
          <p className="text-white/70">
            Testing button clicks on {isIOS ? 'iOS' : 'non-iOS'} device in{' '}
            {typeof window !== 'undefined' && window.innerHeight > window.innerWidth ? 'portrait' : 'landscape'} mode
          </p>
          <p className="text-white/70 mt-2">
            Click count: <span className="text-green-400 font-bold text-2xl">{clickCount}</span>
          </p>
        </div>

        {/* Test Buttons */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 space-y-4">
          <h2 className="text-xl font-bold text-white mb-4">Test Buttons</h2>
          
          {/* Standard Button */}
          <div className="space-y-2">
            <p className="text-white/70 text-sm">Standard Button (no special handling):</p>
            <button
              onClick={handleClick}
              className="w-full px-6 py-4 bg-blue-600 text-white rounded-lg font-medium text-lg"
              style={{
                minHeight: '48px',
                cursor: 'pointer'
              }}
            >
              Click Me (Standard)
            </button>
          </div>

          {/* iOS Button with data attribute */}
          <div className="space-y-2">
            <p className="text-white/70 text-sm">iOS Button (with data-ios-action):</p>
            <button
              type="button"
              data-ios-action="test"
              onClick={() => handleButtonClick(handleClick)}
              className="w-full px-6 py-4 bg-purple-600 text-white rounded-lg font-medium text-lg"
              style={{
                WebkitAppearance: 'none',
                appearance: 'none',
                WebkitTapHighlightColor: 'rgba(255, 255, 255, 0.2)',
                touchAction: 'manipulation',
                minHeight: '48px',
                cursor: 'pointer'
              }}
            >
              Click Me (iOS Special)
            </button>
          </div>

          {/* iOS Button with inline touch handler */}
          <div className="space-y-2">
            <p className="text-white/70 text-sm">iOS Button (with inline touch handler):</p>
            <button
              type="button"
              onClick={handleClick}
              onTouchEnd={(e) => {
                e.preventDefault()
                addLog('Inline touch handler triggered')
                handleClick()
              }}
              className="w-full px-6 py-4 bg-green-600 text-white rounded-lg font-medium text-lg"
              style={{
                WebkitAppearance: 'none',
                appearance: 'none',
                WebkitTapHighlightColor: 'rgba(255, 255, 255, 0.2)',
                touchAction: 'manipulation',
                minHeight: '48px',
                cursor: 'pointer'
              }}
            >
              Click Me (Touch Handler)
            </button>
          </div>

          {/* Large iOS Button */}
          <div className="space-y-2">
            <p className="text-white/70 text-sm">Large iOS Button (easier to tap):</p>
            <button
              type="button"
              data-ios-action="large"
              onClick={() => handleButtonClick(handleClick)}
              className="w-full px-8 py-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-bold text-2xl"
              style={{
                WebkitAppearance: 'none',
                appearance: 'none',
                WebkitTapHighlightColor: 'rgba(255, 255, 255, 0.3)',
                touchAction: 'manipulation',
                minHeight: '80px',
                cursor: 'pointer',
                position: 'relative',
                zIndex: 10
              }}
            >
              Click Me (Large)
            </button>
          </div>

          {/* Div button */}
          <div className="space-y-2">
            <p className="text-white/70 text-sm">Div as Button (for comparison):</p>
            <div
              onClick={handleClick}
              onTouchEnd={(e) => {
                e.preventDefault()
                handleClick()
              }}
              className="w-full px-6 py-4 bg-red-600 text-white rounded-lg font-medium text-lg text-center cursor-pointer"
              style={{
                minHeight: '48px',
                touchAction: 'manipulation'
              }}
            >
              Click Me (Div)
            </div>
          </div>
        </div>

        {/* Event Log */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Event Log</h2>
            <button
              onClick={() => setLogs([])}
              className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium"
            >
              Clear Log
            </button>
          </div>
          <div className="bg-black/40 rounded-lg p-4 max-h-96 overflow-y-auto">
            {logs.length === 0 ? (
              <p className="text-white/50 text-sm">No events logged yet...</p>
            ) : (
              <div className="space-y-1">
                {logs.map((log, index) => (
                  <p key={index} className="text-green-400 text-xs font-mono">
                    {log}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          <h2 className="text-xl font-bold text-white mb-4">Testing Instructions</h2>
          <ol className="text-white/80 space-y-2 list-decimal list-inside">
            <li>Open this page on your iPhone in portrait mode</li>
            <li>Try clicking each button type</li>
            <li>Watch the click count increase</li>
            <li>Check the event log for debugging info</li>
            <li>Note which button types work and which don't</li>
          </ol>
        </div>
      </div>
    </div>
  )
}

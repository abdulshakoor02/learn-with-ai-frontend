'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PaperAirplaneIcon } from '@heroicons/react/24/outline'

interface Message {
  id: string
  text: string
  sender: 'user' | 'ai'
  timestamp: Date
}

interface ChatInterfaceProps {
  onComplete: (learningGoals: string[]) => void
}

export const ChatInterface = ({ onComplete }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI learning assistant. What topics are you interested in learning about?",
      sender: 'ai',
      timestamp: new Date()
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [conversationStage, setConversationStage] = useState<'initial' | 'learning' | 'complete'>('initial')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()
    
    if (conversationStage === 'initial') {
      setConversationStage('learning')
      return `Great! I'm excited to help you learn about ${userMessage}. What specific aspects of this topic interest you the most? Are you looking for beginner, intermediate, or advanced content?`
    }
    
    if (conversationStage === 'learning') {
      setConversationStage('complete')
      setTimeout(() => {
        onComplete([userMessage, 'Choose learning path', 'Set timeline', 'Start learning'])
      }, 1000)
      return `Perfect! Based on your interests, I'll create a personalized learning timeline for you. This will include structured modules, practical exercises, and progress tracking. Let me set that up now!`
    }
    
    return "I'm here to help you with your learning journey. What would you like to explore next?"
  }

  const handleSendMessage = async () => {
    if (!inputText.trim() || isTyping) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsTyping(true)

    // Simulate AI thinking
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputText)
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiMessage])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex flex-col h-[500px] glass-primary rounded-2xl overflow-hidden">
      {/* Chat Header */}
      <div className="p-4 border-b border-white/20">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          </div>
          <div>
            <h3 className="text-white font-medium">AI Learning Assistant</h3>
            <p className="text-white/70 text-sm">
              {isTyping ? 'typing...' : 'online'}
            </p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`
                  max-w-[80%] p-3 rounded-2xl
                  ${message.sender === 'user'
                    ? 'bg-gradient-to-br from-purple-500 to-blue-500 text-white'
                    : 'bg-white/10 backdrop-blur-md text-white border border-white/20'
                  }
                `}
              >
                <p className="text-sm">{message.text}</p>
                <p className={`text-xs mt-1 ${
                  message.sender === 'user' ? 'text-white/70' : 'text-white/50'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-white/10 backdrop-blur-md text-white border border-white/20 p-3 rounded-2xl">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-white/20">
        <div className="flex space-x-3">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            rows={1}
            className="flex-1 p-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 resize-none focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all duration-200"
            disabled={isTyping}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isTyping}
            className="px-4 py-3 bg-gradient-to-br from-purple-500 to-blue-500 text-white rounded-xl hover:from-purple-600 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
          >
            <PaperAirplaneIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

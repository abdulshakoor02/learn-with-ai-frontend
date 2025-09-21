'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PaperAirplaneIcon, ArrowPathIcon } from '@heroicons/react/24/outline'
import { LearningPlanMessage, LearningPlanPreview } from './LearningPlanMessage'
import { LearningPlanData, Message as BaseMessage } from '@/lib/hooks'
import { OpenAIService, LearningPlansService } from '@/services/api'

interface Message extends BaseMessage {
  type?: 'text' | 'learning-plan-preview' | 'learning-plan'
  planData?: LearningPlanData
}

interface EnhancedChatInterfaceProps {
  onComplete: (learningGoals: string[]) => void
  onLearningPlanGenerated?: (plan: LearningPlanData) => void
  onLearningPlanSelected?: (plan: LearningPlanData) => void
}

export const EnhancedChatInterface = ({
  onComplete,
  onLearningPlanGenerated,
  onLearningPlanSelected
}: EnhancedChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI learning assistant. What topics are you interested in learning about?",
      sender: 'ai',
      type: 'text',
      timestamp: new Date()
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [conversationStage, setConversationStage] = useState<'initial' | 'learning' | 'generating' | 'plan-generated' | 'complete'>('initial')
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false)
  const [currentPlan, setCurrentPlan] = useState<LearningPlanData | null>(null)
  const [learningGoals, setLearningGoals] = useState<string[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateAIResponse = async (userMessage: string) => {
    if (conversationStage === 'initial') {
      const goals = [userMessage, 'Choose learning path', 'Set timeline', 'Start learning']
      setLearningGoals(goals)
      setCurrentPlan(null)

      const aiResponse = `Great! I'm excited to help you learn about ${userMessage}. Let me create a personalized learning plan with structured phases and specific topics. This will take a moment...`

      setConversationStage('generating')
      setIsGeneratingPlan(true)

      // Start generating the learning plan
      generateLearningPlan(userMessage)

      return aiResponse
    }

    if (conversationStage === 'generating') {
      return "I'm still creating your personalized learning plan. Please wait a moment..."
    }

    return "I'm here to help you with your learning journey. What would you like to explore next?"
  }

  const generateLearningPlan = async (userGoal: string) => {
    try {
      // Add generating message
      const generatingMessage: Message = {
        id: Date.now().toString(),
        text: "Generating your personalized learning plan with structured phases and specific topics...",
        sender: 'ai',
        type: 'text',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, generatingMessage])

      // Generate learning plan using OpenAI
      const plan = await OpenAIService.generateLearningPlan(userGoal)

      setCurrentPlan(plan)
      onLearningPlanGenerated?.(plan)

      // Add preview message first
      const previewMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I've created a personalized learning plan for you!",
        sender: 'ai',
        type: 'learning-plan-preview',
        planData: plan,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, previewMessage])

      // Add full plan message
      const planMessage: Message = {
        id: (Date.now() + 2).toString(),
        text: 'Here is your complete learning plan with detailed phases and topics. Review it below and let me know if you want to proceed:',
        sender: 'ai',
        type: 'learning-plan',
        planData: plan,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, planMessage])

      setConversationStage('plan-generated')
      setIsGeneratingPlan(false)

    } catch (error) {
      console.error('Failed to generate learning plan:', error)

      const errorMessage: Message = {
        id: Date.now().toString(),
        text: "I apologize, but I encountered an issue generating your learning plan. Please try again or let me know if you'd like to describe your learning goals differently.",
        sender: 'ai',
        type: 'text',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])

      setConversationStage('initial')
      setIsGeneratingPlan(false)
    }
  }

  const handleApprovePlan = async () => {
    if (!currentPlan) return

    setIsGeneratingPlan(true)

    try {
      // Save plan to backend
      const savedPlan = await LearningPlansService.createLearningPlan(currentPlan)

      const approvedMessage: Message = {
        id: Date.now().toString(),
        text: "Excellent! Your learning plan has been saved to your profile. I'll set up your timeline and get you started with the first phase.",
        sender: 'ai',
        type: 'text',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, approvedMessage])

      onLearningPlanSelected?.(currentPlan)

      // Update learning goals
      const updatedGoals = [
        ...learningGoals.slice(0, -1),
        `Start learning ${currentPlan.title}`,
        'Track progress',
        'Complete phases'
      ]

      setConversationStage('complete')
      setTimeout(() => {
        onComplete(updatedGoals)
      }, 1500)

    } catch (error) {
      console.error('Failed to save learning plan:', error)

      const errorMessage: Message = {
        id: Date.now().toString(),
        text: "Your learning plan is ready! However, I encountered an issue saving it to your profile. You can still view your timeline below to get started.",
        sender: 'ai',
        type: 'text',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])

      onLearningPlanSelected?.(currentPlan)

      setConversationStage('complete')
      setTimeout(() => {
        onComplete(learningGoals)
      }, 1500)

    } finally {
      setIsGeneratingPlan(false)
    }
  }

  const handleRejectPlan = () => {
    const rejectionMessage: Message = {
      id: Date.now().toString(),
      text: "No problem! Let me know what you'd like to change or describe your learning goals differently, and I'll create a new plan for you.",
      sender: 'ai',
      type: 'text',
      timestamp: new Date()
    }
    setMessages(prev => [...prev, rejectionMessage])

    setConversationStage('initial')
    setCurrentPlan(null)
  }

  const handleEditPlan = () => {
    const editMessage: Message = {
      id: Date.now().toString(),
      text: "Tell me what you'd like to customize! I can adjust the timeline, add or remove topics, or focus on specific areas that interest you more.",
      sender: 'ai',
      type: 'text',
      timestamp: new Date()
    }
    setMessages(prev => [...prev, editMessage])

    setConversationStage('initial')
  }

  const handleSendMessage = async () => {
    if (!inputText.trim() || isTyping || isGeneratingPlan) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      type: 'text',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsTyping(true)

    // Simulate AI thinking
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputText)
      aiResponse.then(response => {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: response,
          sender: 'ai',
          type: 'text',
          timestamp: new Date()
        }
        setMessages(prev => [...prev, aiMessage])
        setIsTyping(false)
      })
    }, 1200 + Math.random() * 800)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const renderMessage = (message: Message, index: number) => {
    if (message.type === 'learning-plan-preview') {
      return (
        <motion.div
          key={message.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="flex justify-start"
        >
          <LearningPlanPreview plan={message.planData!} />
        </motion.div>
      )
    }

    if (message.type === 'learning-plan') {
      return (
        <motion.div
          key={message.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="flex justify-start"
        >
          <div className="max-w-4xl">
            <LearningPlanMessage
              plan={message.planData!}
              onApprove={handleApprovePlan}
              onReject={handleRejectPlan}
              onEdit={handleEditPlan}
              isLoading={isGeneratingPlan}
            />
          </div>
        </motion.div>
      )
    }

    // Regular text messages
    return (
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
    )
  }

  return (
    <div className="flex flex-col h-[500px] glass-primary rounded-2xl overflow-hidden">
      {/* Chat Header */}
      <div className="p-4 border-b border-white/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            </div>
            <div>
              <h3 className="text-white font-medium">AI Learning Assistant</h3>
              <p className="text-white/70 text-sm">
                {isGeneratingPlan ? (
                  <>
                    <ArrowPathIcon className="w-4 h-4 inline-block animate-spin mr-1" />
                    generating plan...
                  </>
                ) : isTyping ? (
                  'typing...'
                ) : (
                  'online'
                )}
              </p>
            </div>
          </div>
          {currentPlan && (
            <div className="text-xs text-white/70">
              ✨ Plan Ready
            </div>
          )}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message, index) => renderMessage(message, index))}
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

        {/* Generating Plan Indicator */}
        {isGeneratingPlan && conversationStage === 'generating' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center"
          >
            <div className="glass-secondary rounded-xl p-4 border border-white/20 backdrop-blur-md">
              <div className="flex items-center space-x-3">
                <ArrowPathIcon className="w-6 h-6 text-purple-400 animate-spin" />
                <div>
                  <h4 className="font-semibold text-white">Creating Your Learning Plan</h4>
                  <p className="text-sm text-white/70">Analyzing your goals and building a personalized path...</p>
                </div>
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
            placeholder={conversationStage === 'generating'
              ? 'AI is creating your plan...'
              : 'Describe your learning goals...'
            }
            rows={1}
            className="flex-1 p-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 resize-none focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all duration-200"
            disabled={isTyping || isGeneratingPlan}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isTyping || isGeneratingPlan}
            className="px-4 py-3 bg-gradient-to-br from-purple-500 to-blue-500 text-white rounded-xl hover:from-purple-600 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
          >
            <PaperAirplaneIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
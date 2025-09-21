'use client'

import { useState } from 'react'

// Learning Plan Interfaces based on backend API documentation
export interface LearningPhase {
  focus: string
  duration: string
  topics: string[]
}

export interface LearningPlanData {
  title: string
  duration: string
  prerequisites: string[]
  phases: LearningPhase[]
  userId?: string
}

export interface LearningPlanBackend extends LearningPlanData {
  _id: string
  userId: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface OpenAIJsonResponse {
  data: any
}

// OpenAI request interface for /openai/json endpoint
export interface OpenAIJsonRequest {
  messages: Array<{
    role: 'user' | 'assistant' | 'system'
    content: string
  }>
  schema?: {
    type: 'object'
    properties: Record<string, any>
    required?: string[]
  }
}

// Custom hook for loading states
export function useLoading() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const startLoading = () => {
    setIsLoading(true)
    setError(null)
  }

  const stopLoading = (errorMessage?: string) => {
    setIsLoading(false)
    if (errorMessage) setError(errorMessage)
  }

  return { isLoading, error, startLoading, stopLoading }
}

// Custom hook for async operations
export function useAsyncOperation<T>() {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const execute = async (operation: () => Promise<T>) => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await operation()
      setData(result)
      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return { data, isLoading, error, execute }
}
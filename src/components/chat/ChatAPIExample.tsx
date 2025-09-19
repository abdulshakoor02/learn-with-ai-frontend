// Example of how to integrate authenticated API calls with ChatInterface
// This file serves as documentation for future API integration

import { useSession } from 'next-auth/react'
import { apiRequest } from '@/lib/auth'

// Example of how to make authenticated API calls in components
export const ChatAPIExample = () => {
  const { data: session } = useSession()

  // Example 1: Direct API call with session token
  const sendMessageToAPI = async (message: string) => {
    if (!session?.accessToken) {
      throw new Error('User not authenticated')
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/openai/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.accessToken}`
        },
        body: JSON.stringify({
          messages: [
            { role: 'user', content: message }
          ]
        })
      })

      if (!response.ok) {
        throw new Error('API request failed')
      }

      return await response.json()
    } catch (error) {
      console.error('Chat API error:', error)
      throw error
    }
  }

  // Example 2: Using the apiRequest helper (recommended)
  const sendMessageUsingHelper = async (message: string) => {
    try {
      const response = await apiRequest('/openai/chat', {
        method: 'POST',
        body: JSON.stringify({
          messages: [
            { role: 'user', content: message }
          ]
        })
      })

      return response
    } catch (error) {
      console.error('Chat API error:', error)
      throw error
    }
  }

  // Example 3: Getting user data
  const getUserData = async () => {
    try {
      if (!session?.user?.id) return null
      
      const userData = await apiRequest(`/users/${session.user.id}`)
      return userData
    } catch (error) {
      console.error('Failed to fetch user data:', error)
      return null
    }
  }

  return null // This is just a documentation/example file
}

// Usage patterns for different API endpoints:

// 1. OpenAI Chat Completion
// const chatResponse = await apiRequest('/openai/chat', {
//   method: 'POST',
//   body: JSON.stringify({ messages: [...] })
// })

// 2. OpenAI Text Generation  
// const textResponse = await apiRequest('/openai/text', {
//   method: 'POST',
//   body: JSON.stringify({ prompt: 'Generate...' })
// })

// 3. OpenAI Embeddings
// const embeddings = await apiRequest('/openai/embedding', {
//   method: 'POST', 
//   body: JSON.stringify({ text: 'Text to embed' })
// })

// 4. User Management
// const user = await apiRequest(`/users/${userId}`)
// const users = await apiRequest('/users')
// const updateUser = await apiRequest(`/users/${userId}`, {
//   method: 'PUT',
//   body: JSON.stringify({ name: 'New Name' })
// })
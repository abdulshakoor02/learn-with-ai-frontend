import { apiRequest, OpenAIJsonResponse } from '@/lib/auth'
import { OpenAIJsonRequest, LearningPlanData } from '@/lib/hooks'
import { getSession } from 'next-auth/react'
import { AuthUtils } from './authUtils'
import { UserData, SessionData } from './authTypes'

// OpenAI JSON endpoint service
export class OpenAIService {
  static async generateJson(request: OpenAIJsonRequest): Promise<any> {
    try {
      const response = await apiRequest<OpenAIJsonResponse>(`/openai/json`, {
        method: 'POST',
        body: JSON.stringify(request)
      })
      return response.data
    } catch (error) {
      console.error('OpenAI JSON generation error:', error)
      throw new Error('Failed to generate response from OpenAI')
    }
  }

  static async generateLearningPlan(userGoals: string): Promise<LearningPlanData> {
    const planRequest: OpenAIJsonRequest = {
      messages: [
        {
          role: 'system',
          content: 'You are an AI learning assistant that creates personalized learning plans. Generate a structured learning plan based on the user\'s goals.'
        },
        {
          role: 'user',
          content: `Create a comprehensive learning plan for: ${userGoals}. Include title, duration, prerequisites, and 3-4 phases with specific focus areas and topics.`
        }
      ],
      schema: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
            description: 'The learning plan title'
          },
          duration: {
            type: 'string',
            description: 'Total duration (e.g., "3 months" or "12 weeks")'
          },
          prerequisites: {
            type: 'array',
            items: {
              type: 'string'
            },
            description: 'Required prerequisites for the learning plan'
          },
          phases: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                focus: {
                  type: 'string',
                  description: 'Phase focus area'
                },
                duration: {
                  type: 'string',
                  description: 'Phase duration'
                },
                topics: {
                  type: 'array',
                  items: {
                    type: 'string'
                  },
                  description: 'Topics covered in this phase'
                }
              },
              required: ['focus', 'duration', 'topics']
            }
          }
        },
        required: ['title', 'duration', 'prerequisites', 'phases']
      }
    }

    try {
      const response = await this.generateJson(planRequest)
      return response as LearningPlanData
    } catch (error) {
      console.error('Learning plan generation failed:', error)
      throw error
    }
  }
}

// Learning Plans API service
export class LearningPlansService {
  static async createLearningPlan(planData: LearningPlanData): Promise<any> {
    try {
      // Try multiple approaches to get user data
      let userData: UserData | null = null

      // Approach 1: Check localStorage (client-side)
      if (typeof window !== 'undefined') {
        const localUserData = localStorage.getItem('user')
        if (localUserData) {
          try {
            const parsedUser = JSON.parse(localUserData)
            if (parsedUser?._id) {
              userData = parsedUser
              console.log('User found in localStorage:', userData._id)
            }
          } catch (parseError) {
            console.error('Error parsing user from localStorage:', parseError)
          }
        }
      }

      // Approach 2: Check for session data (if NextAuth is available)
      if (!userData) {
        try {
          const session = await getSession()
          if (session?.user) {
            userData = {
              _id: session.user.id,
              name: session.user.name!,
              email: session.user.email!,
              mobile: session.user.mobile
            }
            console.log('User found from session:', userData._id)
          }
        } catch (sessionError) {
          console.warn('Session not available or error getting session:', sessionError)
        }
      }

      // Approach 3: Check our auth utilities
      if (!userData) {
        userData = await AuthUtils.getUserDataAsync()
        if (userData) {
          console.log('User found from auth utilities:', userData._id)
        }
      }

      // Fallback: Create a demo user ID for testing
      if (!userData?._id) {
        console.warn('No authenticated user found. Using demo user for testing.')
        // This should only happen in development
        userData = AuthUtils.getDemoUserData()
      }

      const response = await apiRequest('/learning-plans', {
        method: 'POST',
        body: JSON.stringify({
          ...planData,
          userId: userData._id
        })
      })
      return response
    } catch (error) {
      console.error('Create learning plan error:', error)
      throw new Error('Failed to create learning plan')
    }
  }

  static async getLearningPlans(userId?: string): Promise<any[]> {
    try {
      let targetUserId = userId

      // If no userId provided, try to get current user
      if (!targetUserId) {
        const userData = await AuthUtils.getUserDataAsync()
        targetUserId = userData?._id
      }

      const queryParam = targetUserId ? `?userId=${targetUserId}` : ''
      const response = await apiRequest(`/learning-plans${queryParam}`)
      return response as any[]
    } catch (error) {
      console.error('Get learning plans error:', error)
      throw new Error('Failed to fetch learning plans')
    }
  }

  static async getLearningPlanById(planId: string): Promise<any> {
    try {
      const response = await apiRequest(`/learning-plans/${planId}`)
      return response
    } catch (error) {
      console.error('Get learning plan error:', error)
      throw new Error('Failed to fetch learning plan')
    }
  }

  static async updateLearningPlan(planId: string, updates: Partial<LearningPlanData>): Promise<any> {
    try {
      const response = await apiRequest(`/learning-plans/${planId}`, {
        method: 'PUT',
        body: JSON.stringify(updates)
      })
      return response
    } catch (error) {
      console.error('Update learning plan error:', error)
      throw new Error('Failed to update learning plan')
    }
  }

  static async deleteLearningPlan(planId: string): Promise<boolean> {
    try {
      const response = await apiRequest(`/learning-plans/${planId}`, {
        method: 'DELETE'
      })
      return response === true
    } catch (error) {
      console.error('Delete learning plan error:', error)
      throw new Error('Failed to delete learning plan')
    }
  }
}
import { apiRequest, OpenAIJsonResponse } from '@/lib/auth'
import { OpenAIJsonRequest, LearningPlanData } from '@/lib/hooks'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

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
      const userData = typeof window !== 'undefined' ? localStorage.getItem('user') : null
      const user = userData ? JSON.parse(userData) : null

      if (!user?._id) {
        throw new Error('User not found')
      }

      const response = await apiRequest('/learning-plans', {
        method: 'POST',
        body: JSON.stringify({
          ...planData,
          userId: user._id
        })
      })
      return response
    } catch (error) {
      console.error('Create learning plan error:', error)
      throw new Error('Failed to create learning plan')
    }
  }

  static async getLearningPlans(userId?: string) {
    try {
      const queryParam = userId ? `?userId=${userId}` : ''
      const response = await apiRequest(`/learning-plans${queryParam}`)
      return response
    } catch (error) {
      console.error('Get learning plans error:', error)
      throw new Error('Failed to fetch learning plans')
    }
  }

  static async getLearningPlanById(planId: string) {
    try {
      const response = await apiRequest(`/learning-plans/${planId}`)
      return response
    } catch (error) {
      console.error('Get learning plan error:', error)
      throw new Error('Failed to fetch learning plan')
    }
  }

  static async updateLearningPlan(planId: string, updates: Partial<LearningPlanData>) {
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

  static async deleteLearningPlan(planId: string) {
    try {
      const response = await apiRequest(`/learning-plans/${planId}`, {
        method: 'DELETE'
      })
      return response
    } catch (error) {
      console.error('Delete learning plan error:', error)
      throw new Error('Failed to delete learning plan')
    }
  }
}

// Authentication helper functions
export const AuthUtils = {
  getAccessToken: (): string | null => {
    if (typeof window === 'undefined') return null
    const userData = localStorage.getItem('user')
    if (!userData) return null

    try {
      const user = JSON.parse(userData)
      return localStorage.getItem('accessToken')
    } catch {
      return null
    }
  },

  getUserData: () => {
    if (typeof window === 'undefined') return null
    const userData = localStorage.getItem('user')
    if (!userData) return null

    try {
      return JSON.parse(userData)
    } catch {
      return null
    }
  },

  isAuthenticated: (): boolean => {
    return !!AuthUtils.getAccessToken()
  }
}
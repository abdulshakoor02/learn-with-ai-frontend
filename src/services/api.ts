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

  static async generateLearningContent(moduleTitle: string, moduleType: string, sectionTitle?: string): Promise<string> {
    try {
      const prompt = this.createLearningPrompt(moduleTitle, moduleType, sectionTitle)
      
      const response = await apiRequest(`/openai/chat`, {
        method: 'POST',
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: 'You are an expert educational content creator and tutor. Create comprehensive, engaging, and structured learning content that is educational and easy to understand. Always provide practical examples and clear explanations.'
            },
            {
              role: 'user',
              content: prompt
            }
          ]
        })
      })

      // Extract the content from OpenAI's response format
      // if (response?.choices?.[0]?.message?.content) {
      //   return response.choices[0].message.content
      // } else {
      //   throw new Error('No content received from OpenAI')
      // }
      if (response?.data) {
        return response.data
      } else {
        throw new Error('No content received from OpenAI')
      }
    } catch (error) {
      console.error('Learning content generation error:', error)
      throw new Error('Failed to generate learning content. Please try again.')
    }
  }

  private static createLearningPrompt(moduleTitle: string, moduleType: string, sectionTitle?: string): string {
    // const baseContext = sectionTitle ? `This is part of the "${sectionTitle}" section.` : ''
    
    switch (moduleType) {
      case 'video':
        return `Create a comprehensive video lesson script for "${moduleTitle}"

Please structure the content as follows:
1. **Introduction** - Brief overview and learning objectives
2. **Main Content** - Detailed explanation with practical examples
3. **Key Concepts** - Important points to remember
4. **Practical Examples** - Real-world applications
5. **Summary** - Quick recap of main points
6. **Next Steps** - What to focus on after this lesson

Make it engaging, educational, and easy to follow. Include code examples if relevant to the topic.`

      case 'reading':
        return `Create detailed reading material for "${moduleTitle}"

Please provide:
1. **Overview** - Introduction to the topic
2. **Core Concepts** - Fundamental principles and definitions
3. **Detailed Explanation** - In-depth coverage of the subject
4. **Examples and Applications** - Practical use cases
5. **Best Practices** - Industry standards and recommendations
6. **Common Pitfalls** - What to avoid
7. **Further Reading** - Suggested resources for deeper learning

Make it comprehensive yet accessible, with clear headings and well-structured content.`

      case 'quiz':
        return `Create an interactive quiz for "${moduleTitle}"

Please provide:
1. **Quiz Instructions** - How to approach the quiz
2. **10 Multiple Choice Questions** - With 4 options each
3. **Correct Answers** - Clearly marked
4. **Explanations** - Detailed reasoning for each correct answer
5. **Key Concepts Review** - Summary of topics covered
6. **Performance Tips** - How to improve understanding

Make the questions progressively challenging and educational.`

      case 'assignment':
        return `Create a practical assignment for "${moduleTitle}"

Please provide:
1. **Assignment Brief** - Clear description and objectives
2. **Requirements** - Specific deliverables and criteria
3. **Step-by-Step Guide** - Detailed instructions
4. **Resources Needed** - Tools, libraries, or materials required
5. **Evaluation Rubric** - How the work will be assessed
6. **Tips for Success** - Best practices and common mistakes to avoid
7. **Extension Activities** - Optional advanced challenges

Make it practical, achievable, and directly related to the learning objectives.`

      default:
        return `Create comprehensive learning material for "${moduleTitle}"

Please provide well-structured educational content that includes:
1. Clear explanations of key concepts
2. Practical examples and applications
3. Step-by-step guidance where appropriate
4. Important tips and best practices
5. Summary of key takeaways

Make it engaging, informative, and suitable for learners at various levels.`
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

// User Registration API service
export class UsersService {
  static async createUser(userData: {
    name: string
    email: string
    mobile: string
    password: string
  }): Promise<any> {
    try {
      const response = await apiRequest('/users', {
        method: 'POST',
        body: JSON.stringify(userData)
      })
      return response
    } catch (error) {
      console.error('Create user error:', error)
      throw error
    }
  }

  static async loginUser(credentials: {
    email: string
    password: string
  }): Promise<{ access_token: string }> {
    try {
      const response = await apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials)
      })
      return response
    } catch (error) {
      console.error('Login user error:', error)
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

  static async updateTopicStatus(learningPlanId: string, topicTitle: string, status: boolean): Promise<any> {
    try {
      console.log(learningPlanId,topicTitle,status)
      const response = await apiRequest('/learning-plans/topics/status', {
        method: 'POST',
        body: JSON.stringify({
          learningPlanId,
          topicTitle,
          status
        })
      })
      return response
    } catch (error) {
      console.error('Update topic status error:', error)
      throw new Error('Failed to update topic status')
    }
  }

  static async updatePhaseStatus(learningPlanId: string, phaseName: string, status: boolean): Promise<any> {
    try {
      const response = await apiRequest('/learning-plans/phases/status', {
        method: 'POST',
        body: JSON.stringify({
          learningPlanId,
          phaseName,
          status
        })
      })
      return response
    } catch (error) {
      console.error('Update phase status error:', error)
      throw new Error('Failed to update phase status')
    }
  }
}

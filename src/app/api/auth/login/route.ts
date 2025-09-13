import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  rememberMe: z.boolean().optional()
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate request body
    const validationResult = loginSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Validation failed', 
          details: validationResult.error.errors 
        },
        { status: 400 }
      )
    }

    const { email, password, rememberMe } = validationResult.data

    // Mock authentication logic
    // In a real application, you would:
    // 1. Hash the password and compare with stored hash
    // 2. Verify user exists in database
    // 3. Generate JWT tokens
    // 4. Set secure HTTP-only cookies
    
    if (email === 'demo@learnai.com' && password === 'demo123456') {
      // Mock successful authentication
      const user = {
        id: '1',
        email: email,
        firstName: 'Demo',
        lastName: 'User',
        avatar: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      // In production, generate actual JWT tokens
      const mockToken = `mock_jwt_token_${Date.now()}`
      const mockRefreshToken = `mock_refresh_token_${Date.now()}`

      // Set secure cookies
      const response = NextResponse.json(
        {
          success: true,
          data: {
            user,
            token: mockToken
          },
          message: 'Login successful'
        },
        { status: 200 }
      )

      // Set HTTP-only cookies for tokens
      response.cookies.set('auth_token', mockToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24 // 30 days or 1 day
      })

      response.cookies.set('refresh_token', mockRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 30 // 30 days
      })

      return response
    } else {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid email or password' 
        },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error' 
      },
      { status: 500 }
    )
  }
}

// Handle preflight requests
export async function OPTIONS() {
  return new NextResponse(null, { status: 200 })
}
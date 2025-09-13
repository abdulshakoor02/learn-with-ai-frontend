import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  confirmPassword: z.string(),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  agreeToTerms: z.boolean().refine(val => val === true, 'You must agree to the terms')
}).refine(
  data => data.password === data.confirmPassword,
  {
    message: "Passwords don't match",
    path: ["confirmPassword"]
  }
)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate request body
    const validationResult = registerSchema.safeParse(body)
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

    const { email, password, firstName, lastName } = validationResult.data

    // Mock registration logic
    // In a real application, you would:
    // 1. Check if user already exists
    // 2. Hash the password
    // 3. Store user in database
    // 4. Send verification email
    // 5. Generate JWT tokens
    
    // Check if user already exists (mock)
    if (email === 'existing@learnai.com') {
      return NextResponse.json(
        { 
          success: false, 
          error: 'User with this email already exists' 
        },
        { status: 409 }
      )
    }

    // Mock successful registration
    const user = {
      id: Math.random().toString(36).substr(2, 9),
      email: email,
      firstName: firstName,
      lastName: lastName,
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
        message: 'Registration successful! Welcome to LearnAI!'
      },
      { status: 201 }
    )

    // Set HTTP-only cookies for tokens
    response.cookies.set('auth_token', mockToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 // 1 day
    })

    response.cookies.set('refresh_token', mockRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 30 // 30 days
    })

    return response
  } catch (error) {
    console.error('Registration error:', error)
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
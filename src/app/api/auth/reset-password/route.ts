import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const resetPasswordSchema = z.object({
  email: z.string().email('Invalid email address')
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate request body
    const validationResult = resetPasswordSchema.safeParse(body)
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

    const { email } = validationResult.data

    // Mock password reset logic
    // In a real application, you would:
    // 1. Check if user exists in database
    // 2. Generate secure reset token
    // 3. Store token with expiration time
    // 4. Send reset email with token link
    // 5. Return success response (don't reveal if user exists)
    
    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Always return success for security (don't reveal if email exists)
    return NextResponse.json(
      {
        success: true,
        message: 'If an account with this email exists, you will receive a password reset link shortly.'
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Password reset error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error' 
      },
      { status: 500 }
    )
  }
}

// Handle token validation and password reset
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { token, password, confirmPassword } = body

    if (!token || !password || !confirmPassword) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields' 
        },
        { status: 400 }
      )
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Passwords do not match' 
        },
        { status: 400 }
      )
    }

    // Mock token validation
    // In a real application, you would:
    // 1. Validate reset token
    // 2. Check if token is expired
    // 3. Find user associated with token
    // 4. Hash new password
    // 5. Update user password in database
    // 6. Invalidate reset token
    
    // For demo purposes, accept any token that starts with 'reset_'
    if (!token.startsWith('reset_')) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid or expired reset token' 
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Password has been reset successfully. You can now log in with your new password.'
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Password update error:', error)
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
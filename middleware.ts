import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { withAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl
    const token = req.nextauth.token

    // Allow access to login page when not authenticated
    if (pathname === '/home/login') {
      // If authenticated, redirect to home page
      if (token) {
        return NextResponse.redirect(new URL('/home', req.url))
      }
      // Allow unauthenticated access to login page
      return NextResponse.next()
    }

    // Protect all /home/* routes except /home/login
    if (pathname.startsWith('/home')) {
      if (!token) {
        // Redirect to login if not authenticated
        return NextResponse.redirect(new URL('/home/login', req.url))
      }
    }

    // Allow all other requests
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl

        // Allow unauthenticated access to root and login page
        if (pathname === '/' || pathname === '/home/login') {
          return true
        }

        // Require authentication for /home/* routes (except /home/login)
        if (pathname.startsWith('/home')) {
          return !!token
        }

        // Allow all other routes
        return true
      },
    },
    pages: {
      signIn: '/home/login',
    },
  }
)

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
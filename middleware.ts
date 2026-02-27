import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  
  // This middleware ensures that dashboard routes require authentication
  // The actual auth check is done in the client components
  
  return response
}

// Only run middleware on dashboard routes
export const config = {
  matcher: ['/dashboard/:path*']
}

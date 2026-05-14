import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip middleware for static files and auth routes
  if (pathname.startsWith('/_next') || pathname.startsWith('/api/auth') || pathname === '/login') {
    return NextResponse.next();
  }

  const token = request.cookies.get('next-auth.session-token')?.value ||
                request.cookies.get('__Secure-next-auth.session-token')?.value;

  if (!token && pathname !== '/') {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api/auth).*)'],
};
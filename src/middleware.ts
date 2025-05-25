
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import type { User } from '@/types';

const AUTH_PAGES = ['/login', '/register'];
const ADMIN_PAGES_PREFIX = '/admin';

const isAuthPage = (pathname: string) => AUTH_PAGES.includes(pathname);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userCookie = request.cookies.get('taskzenith-user');
  let currentUser: User | null = null;

  if (userCookie && userCookie.value) {
    try {
      currentUser = JSON.parse(userCookie.value);
    } catch (error) {
      // Invalid cookie, treat as unauthenticated
      console.error("Failed to parse user cookie:", error);
      currentUser = null; // Ensure currentUser is null on error
    }
  }

  const isAuthenticated = !!currentUser;
  const isAdmin = isAuthenticated && currentUser?.role === 'admin';

  // If trying to access auth pages while logged in, redirect to dashboard
  if (isAuthenticated && isAuthPage(pathname)) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // If trying to access protected pages (not auth pages, not root) while not logged in, redirect to login
  if (!isAuthenticated && !isAuthPage(pathname) && pathname !== '/') {
    // This block handles cases like /dashboard, /admin/*, etc., when not authenticated.
    // The root path '/' is handled separately.
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // If trying to access admin pages without admin role, redirect to dashboard (or an unauthorized page)
  if (pathname.startsWith(ADMIN_PAGES_PREFIX) && isAuthenticated && !isAdmin) {
    return NextResponse.redirect(new URL('/dashboard', request.url)); 
  }
  
  // Special handling for root page
  if (pathname === '/') {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    } else {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - assets (public assets)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|assets).*)',
  ],
};

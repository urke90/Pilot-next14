import { auth } from '@/auth';
import { NextResponse } from 'next/server';

// ----------------------------------------------------------------

export default auth(async (req) => {
  const isAuthenticated = !!req.auth?.user;
  const currentRoute = req.nextUrl.pathname;

  if (!isAuthenticated) {
    if (currentRoute !== '/login' && currentRoute !== '/sign-up') {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  } else {
    if (currentRoute === '/login' || currentRoute === '/sign-up') {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }
});

/**
 * Match all request paths except for the ones starting with:
 * - api (API routes)
 * - _next/static (static files)
 * - _next/image (image optimization files)
 * - favicon.ico (favicon file)
 */
export const config = {
  matcher: ['/', '/login', '/sign-up', '/onboarding'],
};

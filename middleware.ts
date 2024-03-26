import NextAuth from 'next-auth';
import AUTH_CONFIG from '@/auth.config';

import {
  AUTH_ROUTES,
  HOME_ROUTE,
  ONBOARDING_ROUTE,
  LOGIN_ROUTE,
} from '@/routes';
import { NextResponse } from 'next/server';
import { EOnboardingStep } from '@/types/onboarding-step';

// ----------------------------------------------------------------

const { FINISHED_ONBOARDING } = EOnboardingStep;

export const { auth } = NextAuth(AUTH_CONFIG);

export default auth(async (req) => {
  const currentRoute = req.nextUrl.pathname;

  const isAuthenticated = !!req.auth?.user;

  // routes
  const isAuthRoute = AUTH_ROUTES.includes(currentRoute);
  const isOnboardingRoute = currentRoute.startsWith(ONBOARDING_ROUTE);

  // if the user IS authenticated
  if (isAuthenticated) {
    const result = await fetch('http://localhost:3000/api/user', {
      headers: {
        Cookie: req.cookies.toString(),
      },
    });
    const resultJson = await result.json();

    const isOnboardingFinished =
      resultJson.user?.onboardingStep === FINISHED_ONBOARDING;

    if (!isOnboardingFinished && !isOnboardingRoute) {
      return NextResponse.redirect(new URL(ONBOARDING_ROUTE, req.nextUrl));
    }
    if (isOnboardingFinished && isOnboardingRoute) {
      return NextResponse.redirect(new URL(HOME_ROUTE, req.nextUrl));
    }
    if (isAuthRoute) {
      return NextResponse.redirect(new URL(HOME_ROUTE, req.nextUrl));
    }
  }

  // if the user IS NOT authenticated
  if (!isAuthenticated) {
    if (!isAuthRoute) {
      return NextResponse.redirect(new URL(LOGIN_ROUTE, req.nextUrl));
    }
  }

  return NextResponse.next();
});

/**
 * Match all request paths except for the ones starting with:
 * - api (API routes)
 * - _next/static (static files)
 * - _next/image (image optimization files)
 * - favicon.ico (favicon file)
 */
export const config = {
  // next.js docs
  // matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico).*)'],
  // clerc docs mathcer
  // ? This is matcher from Clerc, maybe this regex is better structured!?!?
  // matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico).*)'],
};

/**
 * Array of routes a user can access without being logged in/authenticated.
 * No authentication required.
 * @type {string[]}
 */
export const PUBLIC_ROUTES = ['/', '/onboarding'];

/**
 * Routes to authenticate the user
 * @type {string[]}
 */
export const AUTH_ROUTES = ['/login', '/register'];

/**
 * After user is authenticated, redirect to home
 * @type {string}
 */
export const HOME_ROUTE = '/';

/**
 * Route used to redirect the user after login/register to onboarding process
 * Used only if onboarding process is not completed
 * @type {string}
 */
export const ONBOARDING_ROUTE = '/onboarding';

/**
 * Route for user to log in
 * Used only if user is not logged in
 * @type {string}
 */
export const LOGIN_ROUTE = '/login';

/**
 * When middleware meets this route it shouldn't block it
 * @type {string}
 */
export const API_AUTH_PREFIX = '/api/auth';

/**
 * * NOTE:
 * 1. Created constants in case we need to change some routes throughout the app later
 * 2. PUBLIC_ROUTES are all routes used in the app.
 */

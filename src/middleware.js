import { NextResponse } from 'next/server';

// Middleware function
export function middleware(request) {
  // Retrieve the user's session or registration status from cookies
  const registered = request.cookies.get('isRegistered');

  // Define paths requiring registration
  const protectedPaths = ['/payment-checkout'];

  // Check if the current path is protected and if the user is registered
  if (protectedPaths.some(path => request.nextUrl.pathname.startsWith(path)) && !registered) {
    // Redirect to the registration page if the user isn't registered
    return NextResponse.redirect(new URL('/register', request.url));
  }

  return NextResponse.next();
}

// Config to apply middleware on specific paths
export const config = {
  matcher: ['/payment-checkout', '/another-protected-path*'],  // add more paths as needed
};

import { NextRequest, NextResponse } from 'next/server';

const PROTECTED_ROUTES = ['/cart', '/checkout', '/home', '/products'];
const PROTECTED_API_ROUTES = ['/api/cart', '/api/orders'];

function getTokenFromRequest(request: NextRequest): string | null {
  // Check Authorization header (for API requests with Bearer token)
  const authHeader = request.headers.get('authorization');
  if (authHeader) {
    const parts = authHeader.split(' ');
    if (parts.length === 2 && parts[0].toLowerCase() === 'bearer') {
      return parts[1];
    }
  }

  // Check authToken cookie (for page requests)
  const token = request.cookies.get('authToken')?.value;
  return token || null;
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if the route is protected
  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );
  const isProtectedApiRoute = PROTECTED_API_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute || isProtectedApiRoute) {
    const token = getTokenFromRequest(request);

    if (!token) {
      // For API routes, return 401
      if (isProtectedApiRoute) {
        return NextResponse.json(
          { error: 'Unauthorized. Please provide a valid token.' },
          { status: 401 }
        );
      }

      // For pages, redirect to onboarding
      return NextResponse.redirect(new URL('/onboarding', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/home/:path*',
    '/products/:path*',
    '/cart/:path*',
    '/checkout/:path*',
    '/api/cart/:path*',
    '/api/orders/:path*',
  ],
};

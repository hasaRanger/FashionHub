import { NextRequest, NextResponse } from 'next/server';
import { MOCK_USER } from './store';

// Mock auth token for the seeded test user
const MOCK_AUTH_TOKEN = 'mock-token-test-user-001';

export interface AuthPayload {
  userId: string;
  name: string;
  email: string;
}

/**
 * Validates an auth token and returns the user payload if valid
 */
export function validateToken(token: string): AuthPayload | null {
  if (token === MOCK_AUTH_TOKEN) {
    return {
      userId: MOCK_USER.id,
      name: MOCK_USER.name,
      email: MOCK_USER.email,
    };
  }
  return null;
}

/**
 * Extracts the Bearer token from the Authorization header
 */
export function extractToken(authHeader: string | null): string | null {
  if (!authHeader) return null;
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0].toLowerCase() !== 'bearer') {
    return null;
  }
  return parts[1];
}

/**
 * Authenticates a request and returns the user payload
 * Returns null if the request is not authenticated
 */
export function getAuthUser(req: NextRequest): AuthPayload | null {
  const authHeader = req.headers.get('authorization');
  const token = extractToken(authHeader);
  if (!token) return null;
  return validateToken(token);
}

/**
 * Middleware helper to protect routes
 * Returns an error response if not authenticated
 */
export function requireAuth(req: NextRequest): NextResponse | null {
  const user = getAuthUser(req);
  if (!user) {
    return NextResponse.json(
      { error: 'Unauthorized. Please provide a valid Bearer token.' },
      { status: 401 }
    );
  }
  return null;
}

/**
 * Returns the mock auth token for the test user
 * Used by the login endpoint
 */
export function getMockAuthToken(): string {
  return MOCK_AUTH_TOKEN;
}

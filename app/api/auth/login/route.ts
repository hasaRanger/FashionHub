import { NextRequest, NextResponse } from 'next/server';
import { getMockAuthToken } from '@/lib/session';
import { MOCK_USER, TEST_USERS } from '@/lib/store';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body;

    // For now, accept both credentials or empty body (dummy login)
    if (!username || !password) {
      // Dummy login - just return the test user
      const token = getMockAuthToken();
      return NextResponse.json(
        {
          token,
          user: {
            id: MOCK_USER.id,
            name: MOCK_USER.name,
            email: MOCK_USER.email,
          },
        },
        { status: 200 }
      );
    }

    // Validate credentials against test users
    const user = TEST_USERS.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      );
    }

    const token = getMockAuthToken();
    return NextResponse.json(
      {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 400 }
    );
  }
}

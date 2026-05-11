import { NextRequest, NextResponse } from 'next/server';
import { createOrderFromCart } from '@/lib/store';
import { getAuthUser, requireAuth } from '@/lib/session';

export async function POST(req: NextRequest) {
  const authError = requireAuth(req);
  if (authError) return authError;

  const user = getAuthUser(req)!;

  try {
    const order = createOrderFromCart(user.userId);
    return NextResponse.json(order, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to create order';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
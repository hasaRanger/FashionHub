import { NextResponse } from 'next/server';
import { createOrderFromCart, MOCK_USER_ID } from '@/lib/store';

export async function POST() {
  try {
    const order = createOrderFromCart(MOCK_USER_ID);
    return NextResponse.json(order, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to create order';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
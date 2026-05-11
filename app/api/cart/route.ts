import { NextRequest, NextResponse } from 'next/server';
import { getCart, addToCart, removeFromCart, computeSummary } from '@/lib/store';
import { CartItem } from '@/types';
import { getAuthUser, requireAuth } from '@/lib/session';

export async function GET(req: NextRequest) {
  const authError = requireAuth(req);
  if (authError) return authError;

  const user = getAuthUser(req)!;
  const cart = getCart(user.userId);
  return NextResponse.json({ ...cart, summary: computeSummary(cart.items) });
}

export async function POST(req: NextRequest) {
  const authError = requireAuth(req);
  if (authError) return authError;

  const user = getAuthUser(req)!;
  const body: CartItem = await req.json();

  if (!body.productId || !body.size || !body.color) {
    return NextResponse.json(
      { error: 'productId, size, and color are required' },
      { status: 400 }
    );
  }

  const cart = addToCart(user.userId, body);
  return NextResponse.json(
    { ...cart, summary: computeSummary(cart.items) },
    { status: 201 }
  );
}

export async function DELETE(req: NextRequest) {
  const authError = requireAuth(req);
  if (authError) return authError;

  const user = getAuthUser(req)!;
  const { productId, size, colorHex } = await req.json();

  if (!productId || !size || !colorHex) {
    return NextResponse.json(
      { error: 'productId, size, and colorHex are required' },
      { status: 400 }
    );
  }

  const cart = removeFromCart(user.userId, productId, size, colorHex);
  return NextResponse.json({ ...cart, summary: computeSummary(cart.items) });
}
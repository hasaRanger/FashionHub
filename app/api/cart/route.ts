import { NextRequest, NextResponse } from 'next/server';
import { getCart, addToCart, removeFromCart, computeSummary, MOCK_USER_ID } from '@/lib/store';
import { CartItem } from '@/types';

export async function GET() {
  const cart = getCart(MOCK_USER_ID);
  return NextResponse.json({ ...cart, summary: computeSummary(cart.items) });
}

export async function POST(req: NextRequest) {
  const body: CartItem = await req.json();

  if (!body.productId || !body.size || !body.color) {
    return NextResponse.json(
      { error: 'productId, size, and color are required' },
      { status: 400 }
    );
  }

  const cart = addToCart(MOCK_USER_ID, body);
  return NextResponse.json(
    { ...cart, summary: computeSummary(cart.items) },
    { status: 201 }
  );
}

export async function DELETE(req: NextRequest) {
  const { productId, size, colorHex } = await req.json();

  if (!productId || !size || !colorHex) {
    return NextResponse.json(
      { error: 'productId, size, and colorHex are required' },
      { status: 400 }
    );
  }

  const cart = removeFromCart(MOCK_USER_ID, productId, size, colorHex);
  return NextResponse.json({ ...cart, summary: computeSummary(cart.items) });
}
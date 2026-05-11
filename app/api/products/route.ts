import { NextResponse } from 'next/server';
import { products } from '@/lib/seed';

export async function GET() {
  return NextResponse.json(products);
}
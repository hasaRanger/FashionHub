'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { CartItem as CartItemType, CartSummary } from '@/types';
import CartItem from '@/components/CartItem';
import BottomNav from '@/components/BottomNav';

export default function CartPage() {
  const router = useRouter();
  const [items, setItems] = useState<CartItemType[]>([]);
  const [summary, setSummary] = useState<CartSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      router.push('/onboarding');
      return;
    }
    setAuthToken(token);
  }, [router]);

  const fetchCart = useCallback(async (token: string) => {
    const res = await fetch('/api/cart', {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.status === 401) {
      localStorage.removeItem('authToken');
      router.push('/onboarding');
      return;
    }

    const data = await res.json();
    setItems(data.items ?? []);
    setSummary(data.summary ?? null);
    setLoading(false);
  }, [router]);

  useEffect(() => {
    if (authToken) {
      fetchCart(authToken);
    }
  }, [authToken, fetchCart]);

  const handleRemove = async (productId: string, size: string, colorHex: string) => {
    if (!authToken) return;

    await fetch('/api/cart', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ productId, size, colorHex }),
    });
    await fetchCart(authToken);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-8 h-8 rounded-full border-2 border-brand border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex items-center justify-between px-5 pt-6 pb-4">
        <button
          onClick={() => router.back()}
          className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center"
        >
          <ChevronLeft size={20} className="text-gray-800" />
        </button>
        <span className="text-base font-semibold text-gray-900">Cart</span>
        <div className="w-9" />
      </div>

      <div className="px-5 pb-4">
        <h1 className="text-3xl font-extrabold text-gray-900">My Orders</h1>
      </div>

      <div className="flex-1 px-5 overflow-y-auto">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <p className="text-gray-400 text-sm">Your cart is empty</p>
            <button
              onClick={() => router.push('/home')}
              className="text-brand font-semibold text-sm"
            >
              Start shopping
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-6 pb-6">
            {items.map((item) => (
              <CartItem
                key={`${item.productId}-${item.size}-${item.color.hex}`}
                item={item}
                onRemove={handleRemove}
              />
            ))}
          </div>
        )}
      </div>

      {summary && items.length > 0 && (
        <div className="px-5 pb-8 pt-4 border-t border-gray-100">
          <div className="flex flex-col gap-2 mb-6">
            <div className="flex justify-between text-sm text-gray-400">
              <span>Total Items ({summary.totalItems})</span>
              <span className="text-gray-900 font-semibold">
                ${summary.subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm text-gray-400">
              <span>Standard Delivery</span>
              <span className="text-gray-900 font-semibold">
                ${summary.deliveryFee.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm font-bold text-gray-900 mt-1">
              <span>Total Payment</span>
              <span>${summary.totalPayment.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={() => router.push('/checkout')}
            className="w-full py-4 rounded-full bg-brand text-white font-semibold text-sm hover:bg-orange-500 transition-colors"
          >
            Checkout Now
          </button>
        </div>
      )}
    </div>
  );
}
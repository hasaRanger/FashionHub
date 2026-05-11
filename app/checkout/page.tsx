'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Clock } from 'lucide-react';
import { CartSummary, Order } from '@/types';

type Status = 'idle' | 'loading' | 'success' | 'error';

const PAYMENT_METHODS = [
  { label: 'Visa',    bg: '#1A1F71', text: '#FFFFFF', short: 'VISA' },
  { label: 'Amex',   bg: '#007BC1', text: '#FFFFFF', short: 'AMEX' },
  { label: 'Master', bg: '#EB001B', text: '#FFFFFF', short: 'MC'   },
  { label: 'PayPal', bg: '#003087', text: '#009CDE', short: 'PP'   },
  { label: 'Apple',  bg: '#000000', text: '#FFFFFF', short: '🍎'   },
];

export default function CheckoutPage() {
  const router = useRouter();
  const [summary, setSummary] = useState<CartSummary | null>(null);
  const [selectedPayment, setSelectedPayment] = useState('Visa');
  const [voucher, setVoucher] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    fetch('/api/cart')
      .then((r) => r.json())
      .then((data) => setSummary(data.summary ?? null));
  }, []);

  async function handlePayNow() {
    setStatus('loading');

    const res = await fetch('/api/orders', { method: 'POST' });

    if (res.ok) {
      const data: Order = await res.json();
      setOrder(data);
      setStatus('success');
    } else {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 2500);
    }
  }

  if (status === 'success' && order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-8 text-center gap-5">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
          <span className="text-2xl">✓</span>
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-gray-900">Order Confirmed!</h2>
          <p className="text-sm text-gray-400 mt-1">Your order has been placed successfully.</p>
        </div>
        <div className="bg-brand-light rounded-2xl px-6 py-4 w-full">
          <p className="text-xs text-gray-500">Order ID</p>
          <p className="text-lg font-bold text-brand mt-0.5">{order.id}</p>
          <p className="text-xs text-gray-400 mt-2">
            Use this ID at payment. Total paid: ${order.summary.totalPayment.toFixed(2)}
          </p>
        </div>
        <button
          onClick={() => router.push('/home')}
          className="w-full py-4 rounded-full bg-brand text-white font-semibold text-sm"
        >
          Back to Home
        </button>
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
        <span className="text-base font-semibold text-gray-900">Checkout</span>
        <div className="w-9" />
      </div>

      <div className="flex-1 px-5 overflow-y-auto pb-32">
        <div className="mb-6">
          <p className="text-xs text-gray-400 font-medium mb-3">Delivery Address</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 shrink-0 flex items-center justify-center text-xl">
                🗺️
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900 leading-snug">
                  25/3 Housing Estate,
                </p>
                <p className="text-sm font-bold text-gray-900">Sylhet</p>
              </div>
            </div>
            <button className="text-xs text-gray-400 font-medium hover:text-gray-700">
              Change
            </button>
          </div>

          <div className="flex items-center gap-2 mt-3">
            <Clock size={14} className="text-gray-400" strokeWidth={1.8} />
            <p className="text-sm text-gray-500">Delivered in next 7 days</p>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-xs text-gray-400 font-medium mb-3">Payment Method</p>
          <div className="flex gap-2 flex-wrap">
            {PAYMENT_METHODS.map((method) => (
              <button
                key={method.label}
                onClick={() => setSelectedPayment(method.label)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                  selectedPayment === method.label
                    ? 'border-brand ring-1 ring-brand'
                    : 'border-gray-200'
                }`}
                style={{
                  backgroundColor: method.bg,
                  color: method.text,
                }}
              >
                {method.short}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Add Voucher"
            value={voucher}
            onChange={(e) => setVoucher(e.target.value)}
            className="w-full px-4 py-3.5 rounded-2xl bg-gray-50 text-sm text-gray-700 placeholder:text-gray-400 outline-none focus:ring-1 focus:ring-brand"
          />
        </div>

        {summary && (
          <>
            <div className="bg-brand-light rounded-2xl px-4 py-3 mb-5">
              <p className="text-xs text-gray-500 leading-relaxed">
                <span className="text-brand font-semibold">Note : </span>
                Use your order id at the payment. Your Id will be shown after confirming.
                If you forget to put your order id we can&apos;t confirm the payment.
              </p>
            </div>

            <div className="flex flex-col gap-2">
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
          </>
        )}
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-white px-5 py-4 border-t border-gray-100">
        <button
          onClick={handlePayNow}
          disabled={status === 'loading'}
          className="w-full py-4 rounded-full bg-brand text-white font-semibold text-sm hover:bg-orange-500 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {status === 'loading' ? (
            <>
              <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
              Processing...
            </>
          ) : status === 'error' ? (
            'Something went wrong — retry'
          ) : (
            'Pay Now'
          )}
        </button>
      </div>
    </div>
  );
}
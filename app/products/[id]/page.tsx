'use client';

import { useState, useEffect, use } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Bookmark, ShoppingCart } from 'lucide-react';
import { Product, Size, ColorOption } from '@/types';
import SizeSelector from '@/components/SizeSelector';
import ColorSwatch from '@/components/ColorSwatch';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<Size>('L');
  const [selectedColor, setSelectedColor] = useState<ColorOption | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [status, setStatus] = useState<Status>('idle');

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((r) => r.json())
      .then((data: Product) => {
        setProduct(data);
        setSelectedColor(data.colors[0]);
      });
  }, [id]);

  async function handleAddToCart() {
    if (!product || !selectedColor) return;
    setStatus('loading');

    const token = localStorage.getItem('authToken');
    if (!token) {
      setStatus('error');
      return;
    }

    const res = await fetch('/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        productId: product.id,
        name: product.name,
        image: product.images[0],
        price: product.price,
        size: selectedSize,
        color: selectedColor,
        quantity: 1,
      }),
    });

    if (res.ok) {
      setStatus('success');
      setTimeout(() => setStatus('idle'), 2000);
    } else {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 2000);
    }
  }

  if (!product || !selectedColor) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-8 h-8 rounded-full border-2 border-brand border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="px-5 pt-5">
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm"
          >
            <ChevronLeft size={20} className="text-gray-800" />
          </button>
          <span className="text-base font-semibold text-gray-900">Details</span>
          <button className="w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm">
            <Bookmark size={18} className="text-gray-800" strokeWidth={1.8} />
          </button>
        </div>
      </div>

      <div className="px-5 py-4">
        <div className="relative w-full aspect-[4/5] rounded-4xl overflow-hidden bg-gray-100">
          <Image
            src={product.images[activeImage] ?? product.images[0]}
            alt={product.name}
            fill
            className="object-cover object-top"
            priority
          />

          {product.images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
              {product.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`rounded-full transition-all ${
                    i === activeImage
                      ? 'w-4 h-1.5 bg-gray-800'
                      : 'w-1.5 h-1.5 bg-gray-300'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 px-5 pt-5 pb-28">
        <div className="flex items-start justify-between">
          <h1 className="text-2xl font-bold text-gray-900 leading-snug max-w-[60%]">
            {product.name}
          </h1>
          <ColorSwatch
            colors={product.colors}
            selected={selectedColor}
            onChange={setSelectedColor}
          />
        </div>

        {product.description && (
          <p className="text-sm text-gray-400 mt-3 leading-relaxed">
            {product.description}
          </p>
        )}

        <div className="mt-5">
          <p className="text-sm font-semibold text-gray-900 mb-3">Size</p>
          <SizeSelector
            sizes={product.sizes}
            selected={selectedSize}
            onChange={setSelectedSize}
          />
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-white px-5 py-4 flex items-center justify-between border-t border-gray-100">
        <p className="text-2xl font-bold text-gray-900">
          ${product.price.toFixed(2)}
        </p>
        <button
          onClick={handleAddToCart}
          disabled={status === 'loading'}
          className={`flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm transition-all ${
            status === 'success'
              ? 'bg-green-500 text-white'
              : status === 'error'
              ? 'bg-red-500 text-white'
              : 'bg-brand text-white hover:bg-orange-500'
          }`}
        >
          {status === 'loading' && (
            <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
          )}
          {status === 'success' && <ShoppingCart size={16} />}
          {status === 'idle' && 'Add To Cart'}
          {status === 'loading' && 'Adding...'}
          {status === 'success' && 'Added!'}
          {status === 'error' && 'Try Again'}
        </button>
      </div>
    </div>
  );
}
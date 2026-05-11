'use client';

import { useState, useEffect } from 'react';
import { LayoutGrid, Bell } from 'lucide-react';
import { Product, Category } from '@/types';
import ProductCard from '@/components/ProductCard';
import BottomNav from '@/components/BottomNav';

const categories: ('All' | Category)[] = ['All', 'Men', 'Women', 'Kids', 'Other'];

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [active, setActive] = useState<'All' | Category>('All');
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    fetch('/api/products')
      .then((r) => r.json())
      .then(setProducts);

    fetch('/api/cart')
      .then((r) => r.json())
      .then((data) => setCartCount(data.summary?.totalItems ?? 0));
  }, []);

  const filtered =
    active === 'All' ? products : products.filter((p) => p.category === active);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex items-center justify-between px-5 pt-6 pb-2">
        <LayoutGrid size={26} className="text-gray-800" strokeWidth={1.8} />
        <Bell size={24} className="text-gray-800" strokeWidth={1.8} />
      </div>

      <div className="px-5 pt-2 pb-4">
        <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">Explore</h1>
        <p className="text-sm text-gray-400 mt-1">Best trendy collection!</p>
      </div>

      <div className="flex gap-2 px-5 pb-5 overflow-x-auto scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
              active === cat
                ? 'bg-brand text-white'
                : 'bg-white text-gray-700 border border-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 px-5 pb-28">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <BottomNav cartCount={cartCount} />
    </div>
  );
}
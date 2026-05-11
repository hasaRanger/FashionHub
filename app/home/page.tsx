'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LayoutGrid, Bell, LogOut } from 'lucide-react';
import { Product, Category } from '@/types';
import ProductCard from '@/components/ProductCard';
import BottomNav from '@/components/BottomNav';

interface User {
  id: string;
  name: string;
  email: string;
}

const categories: ('All' | Category)[] = ['All', 'Men', 'Women', 'Kids', 'Other'];

const ROW_HEIGHT = 500;
const GAP = 16;

export default function HomePage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [active, setActive] = useState<'All' | Category>('All');
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState<User | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    // Get user from localStorage
    const userStr = localStorage.getItem('user');
    if (userStr) {
      setUser(JSON.parse(userStr));
    }

    fetch('/api/products')
      .then((r) => r.json())
      .then(setProducts);

    const token = localStorage.getItem('authToken');
    if (token) {
      fetch('/api/cart', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((r) => r.json())
        .then((data) => setCartCount(data.summary?.totalItems ?? 0));
    }
  }, []);

  const filtered =
    active === 'All' ? products : products.filter((p) => p.category === active);

  const rows: { p0: Product; p1: Product; p2: Product; p3: Product }[] = [];
  for (let i = 0; i + 3 < filtered.length; i += 4) {
    rows.push({
      p0: filtered[i],
      p1: filtered[i + 1],
      p2: filtered[i + 2],
      p3: filtered[i + 3],
    });
  }

  const remainder = filtered.slice(rows.length * 4);

  async function handleSignOut() {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (err) {
      console.error('Logout error:', err);
    }

    // Clear localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');

    // Redirect to onboarding
    router.push('/onboarding');
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex items-center justify-between px-5 pt-6 pb-2">
        <LayoutGrid size={26} className="text-gray-800" strokeWidth={1.8} />
        <div className="flex items-center gap-4 relative">
          <Bell size={24} className="text-gray-800" strokeWidth={1.8} />
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="w-9 h-9 rounded-full bg-brand text-white flex items-center justify-center font-semibold text-sm hover:bg-orange-500 transition-colors"
          >
            {user?.name.charAt(0).toUpperCase() || 'U'}
          </button>

          {/* User Menu Popup */}
          {showUserMenu && (
            <div className="absolute top-12 right-0 bg-white rounded-lg shadow-lg border border-gray-200 w-56 p-4 z-50">
              <div className="mb-4">
                <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-400">{user?.email}</p>
              </div>
              <hr className="mb-4" />
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </div>
          )}
        </div>
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
                : 'bg-white text-gray-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex flex-col px-5 pb-28" style={{ gap: GAP }}>
        {rows.map(({ p0, p1, p2, p3 }, rowIndex) => (
          <div
            key={rowIndex}
            className="flex"
            style={{ gap: GAP, height: ROW_HEIGHT }}
          >
            {/* Left column: tall (flex 3) on top, short (flex 2) on bottom */}
            <div className="flex flex-col flex-1" style={{ gap: GAP }}>
              <div style={{ flex: 3, minHeight: 0 }}>
                <ProductCard product={p0} fill />
              </div>
              <div style={{ flex: 2, minHeight: 0 }}>
                <ProductCard product={p1} fill />
              </div>
            </div>

            {/* Right column: short (flex 2) on top, tall (flex 3) on bottom */}
            <div className="flex flex-col flex-1" style={{ gap: GAP }}>
              <div style={{ flex: 2, minHeight: 0 }}>
                <ProductCard product={p2} fill />
              </div>
              <div style={{ flex: 3, minHeight: 0 }}>
                <ProductCard product={p3} fill />
              </div>
            </div>
          </div>
        ))}

        {/* Trailing products that don't fill a complete 2x2 block */}
        {remainder.length > 0 && (
          <div className="flex" style={{ gap: GAP }}>
            {remainder.map((product) => (
              <div key={product.id} className="flex-1">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNav cartCount={cartCount} />
    </div>
  );
}
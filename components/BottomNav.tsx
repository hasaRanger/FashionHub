'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { Home, Search, ShoppingBag, Settings, LogOut } from 'lucide-react';

const tabs = [
  { label: 'Home',     href: '/home',     Icon: Home },
  { label: 'Search',   href: '/search',   Icon: Search },
  { label: 'Cart',     href: '/cart',     Icon: ShoppingBag },
  { label: 'Settings', href: null,     Icon: Settings }, // No href, opens popup
];

export default function BottomNav({ cartCount = 0 }: { cartCount?: number }) {
  const pathname = usePathname();
  const router = useRouter();
  const [showSettingsPopup, setShowSettingsPopup] = useState(false);

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
    <>
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-white border-t border-gray-100 flex items-center justify-around px-4 py-3 z-50">
        {tabs.map(({ label, href, Icon }) => {
          const active = href && pathname === href;
          const isCart = label === 'Cart';
          const isSettings = label === 'Settings';

          if (isSettings) {
            return (
              <button
                key={label}
                onClick={() => setShowSettingsPopup(!showSettingsPopup)}
                className="flex flex-col items-center gap-1 relative"
              >
                <Icon
                  size={22}
                  className={showSettingsPopup ? 'text-brand' : 'text-gray-400'}
                  strokeWidth={showSettingsPopup ? 2.5 : 1.8}
                />
                <span className={`text-[10px] font-medium ${showSettingsPopup ? 'text-brand' : 'text-gray-400'}`}>
                  {label}
                </span>
              </button>
            );
          }

          return (
            <Link
              key={href}
              href={href!}
              className="flex flex-col items-center gap-1 relative"
            >
              <div className="relative">
                <Icon
                  size={22}
                  className={active ? 'text-brand' : 'text-gray-400'}
                  strokeWidth={active ? 2.5 : 1.8}
                />
                {isCart && cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-brand text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </div>
              <span className={`text-[10px] font-medium ${active ? 'text-brand' : 'text-gray-400'}`}>
                {label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Settings Popup */}
      {showSettingsPopup && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-xl border border-gray-200 w-48 p-4 z-50">
          <button
            onClick={() => {
              setShowSettingsPopup(false);
              handleSignOut();
            }}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      )}
    </>
  );
}
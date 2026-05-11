'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, ShoppingBag, Settings } from 'lucide-react';

const tabs = [
  { label: 'Home',     href: '/home',     Icon: Home },
  { label: 'Search',   href: '/search',   Icon: Search },
  { label: 'Cart',     href: '/cart',     Icon: ShoppingBag },
  { label: 'Settings', href: '/settings', Icon: Settings },
];

export default function BottomNav({ cartCount = 0 }: { cartCount?: number }) {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-white border-t border-gray-100 flex items-center justify-around px-4 py-3 z-50">
      {tabs.map(({ label, href, Icon }) => {
        const active = pathname === href;
        const isCart = label === 'Cart';

        return (
          <Link
            key={href}
            href={href}
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
  );
}
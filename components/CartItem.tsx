'use client';

import Image from 'next/image';
import { Heart, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '@/types';

interface Props {
  item: CartItemType;
  onRemove: (productId: string, size: string, colorHex: string) => void;
}

export default function CartItem({ item, onRemove }: Props) {
  return (
    <div className="flex gap-4 items-center">
      <div className="relative w-24 h-28 rounded-2xl overflow-hidden bg-gray-100 shrink-0">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover object-top"
          sizes="96px"
        />
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-bold text-gray-900 text-sm leading-snug">{item.name}</p>
        <p className="text-xs text-gray-400 mt-1">{item.color.label}</p>
        <p className="text-xs text-gray-400">Size {item.size}</p>
        <p className="text-base font-bold text-gray-900 mt-2">
          ${item.price.toFixed(2)}
        </p>
      </div>

      <div className="flex flex-col items-center gap-2 shrink-0">
        <div className="flex flex-col gap-1 bg-brand rounded-2xl p-2">
          <button
            aria-label="Save for later"
            className="w-8 h-8 flex items-center justify-center"
          >
            <Heart size={16} className="text-white hover:text-black" strokeWidth={1.8} />
          </button>
          <button
            aria-label="Remove item"
            onClick={() => onRemove(item.productId, item.size, item.color.hex)}
            className="w-8 h-8 flex items-center justify-center"
          >
            <Trash2 size={16} className="text-white hover:text-black" strokeWidth={1.8} />
          </button>
        </div>
        <span className="text-sm font-semibold text-gray-700">{item.quantity}x</span>
      </div>
    </div>
  );
}
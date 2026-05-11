'use client';

import { Size } from '@/types';

interface Props {
  sizes: Size[];
  selected: Size;
  onChange: (size: Size) => void;
}

export default function SizeSelector({ sizes, selected, onChange }: Props) {
  return (
    <div className="flex gap-3">
      {sizes.map((size) => (
        <button
          key={size}
          onClick={() => onChange(size)}
          className={`w-10 h-10 rounded-full text-sm font-semibold transition-colors ${
            selected === size
              ? 'bg-gray-900 text-white'
              : 'text-gray-400 hover:text-gray-700'
          }`}
        >
          {size}
        </button>
      ))}
    </div>
  );
}
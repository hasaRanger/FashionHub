'use client';

import { ColorOption } from '@/types';

interface Props {
  colors: ColorOption[];
  selected: ColorOption;
  onChange: (color: ColorOption) => void;
}

export default function ColorSwatch({ colors, selected, onChange }: Props) {
  return (
    <div className="flex gap-2">
      {colors.map((color) => (
        <button
          key={color.hex}
          onClick={() => onChange(color)}
          aria-label={color.label}
          className={`w-7 h-7 rounded-full transition-all ${
            selected.hex === color.hex
              ? 'ring-2 ring-offset-2 ring-gray-400'
              : ''
          }`}
          style={{ backgroundColor: color.hex }}
        />
      ))}
    </div>
  );
}
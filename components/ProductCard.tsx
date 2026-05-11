import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { Product } from '@/types';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.id}`} className="block">
      <div className="relative rounded-2xl overflow-hidden bg-gray-50 aspect-[3/4]">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover object-top"
          sizes="(max-width: 390px) 45vw"
        />
        <button
          onClick={(e) => {
            e.preventDefault();
          }}
          className="absolute bottom-2 right-2 w-9 h-9 rounded-full bg-gray-900 flex items-center justify-center shadow-md"
          aria-label="Add to cart"
        >
          <ShoppingBag size={16} className="text-white" strokeWidth={1.8} />
        </button>
      </div>
      <div className="mt-2 px-0.5">
        <p className="text-sm font-bold text-gray-900">
          ${product.price.toFixed(2)}
        </p>
        <p className="text-xs text-gray-500 mt-0.5">{product.name}</p>
      </div>
    </Link>
  );
}
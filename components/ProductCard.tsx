import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { Product } from '@/types';

export default function ProductCard({
  product,
  fill = false,
}: {
  product: Product;
  fill?: boolean;
}) {
  return (
    <Link href={`/products/${product.id}`} className={`flex flex-col ${fill ? 'h-full' : ''}`}>
      <div className={`relative rounded-2xl bg-gray-50 ${fill ? 'flex-1 min-h-0' : 'aspect-3/4'}`}>
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover object-top"
            sizes="(max-width: 390px) 45vw"
          />
        </div>
        <button
          onClick={(e) => e.preventDefault()}
          className="absolute -bottom-4 right-3 w-9 h-9 rounded-full bg-white flex items-center justify-center"
          aria-label="Add to cart"
        >
            <div className='rounded-full bg-gray-900 p-1'>
                <ShoppingBag size={16} className="text-white" strokeWidth={1.8} />
            </div>
        </button>
      </div>
      <div className="mt-2 px-0.5 shrink-0">
        <p className="text-sm font-bold text-gray-900">${product.price.toFixed(2)}</p>
        <p className="text-xs text-gray-500 mt-0.5">{product.name}</p>
      </div>
    </Link>
  );
}
import { Product } from '@/types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Tagerine Shirt',
    price: 240.32,
    images: ['/images/shirt1.jpg'],
    category: 'Men',
    colors: [
      { label: 'Yellow',  hex: '#D4A853' },
      { label: 'Navy',    hex: '#4A6FA5' },
      { label: 'Sage',    hex: '#6B8F71' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description:
      'A lightweight, breathable tagerine shirt perfect for warm days. ' +
      'Crafted from 100% premium cotton with a relaxed fit.',
  },
  {
    id: '2',
    name: 'Leather Coat',
    price: 325.36,
    images: ['/images/coat1.jpg'],
    category: 'Men',
    colors: [
      { label: 'Camel', hex: '#C19A6B' },
      { label: 'Tan',   hex: '#8B7355' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description:
      'A structured leather coat that transitions effortlessly from day to night. ' +
      'Features a notched lapel and two side pockets.',
  },
  {
    id: '3',
    name: 'Tagerine Shirt',
    price: 126.47,
    images: ['/images/shirt2.jpg'],
    category: 'Women',
    colors: [
      { label: 'Rust',   hex: '#E07B5A' },
      { label: 'Yellow', hex: '#D4A853' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description:
      'An everyday essential in a warm rust tone. ' +
      'Relaxed silhouette with a slightly cropped hem.',
  },
  {
    id: '4',
    name: 'Premium Tagerine Shirt',
    price: 257.85,
    images: [
      '/images/shirt3.jpg',
      '/images/shirt3-alt1.jpg',
      '/images/shirt3-alt2.jpg',
    ],
    category: 'Men',
    colors: [
      { label: 'Yellow', hex: '#D4A853' },
      { label: 'Navy',   hex: '#4A6FA5' },
      { label: 'Sage',   hex: '#6B8F71' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description:
      'Our flagship tagerine shirt in a premium floral print. ' +
      'Camp collar, short sleeves, and a straight hem for a modern resort feel.',
  },
  {
    id: '5',
    name: 'Leather Tagerine Coat',
    price: 257.85,
    images: ['/images/coat2.jpg'],
    category: 'Men',
    colors: [
      { label: 'Beige', hex: '#C9B89A' },
      { label: 'Brown', hex: '#7B5E3A' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description:
      'A refined tailored coat in supple leather. ' +
      'Clean lines and a slim silhouette make it the perfect layering piece.',
  },
];

export const productsById = new Map<string, Product>(
  products.map((p) => [p.id, p])
);
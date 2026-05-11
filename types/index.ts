export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: 'Men' | 'Women' | 'Kids' | 'Other';
  colors: string[];   
  sizes: string[]; 
  description?: string;
}

export interface CartItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
}

export interface Cart {
  userId: string;
  items: CartItem[];
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  deliveryFee: number;
  totalPayment: number;
  status: 'confirmed' | 'pending';
  createdAt: string;
}
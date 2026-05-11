export type Category = 'Men' | 'Women' | 'Kids' | 'Other';
export type Size = 'S' | 'M' | 'L' | 'XL' | 'XXL';
export type OrderStatus = 'confirmed' | 'pending' | 'cancelled';

// Product 

export interface Product {
  id: string;
  name: string;
  price: number;              
  images: string[];            
  category: Category;
  colors: ColorOption[];       
  sizes: Size[];               
  description?: string;
}

export interface ColorOption {
  label: string;              
  hex: string;                
}

//  Cart 

export interface CartItem {
  productId: string;
  name: string;
  image: string;              
  price: number;
  size: Size;
  color: ColorOption;
  quantity: number;
}

export interface Cart {
  userId: string;
  items: CartItem[];
}

export interface CartSummary {
  totalItems: number;
  subtotal: number;
  deliveryFee: number;
  totalPayment: number;
}

//  Order 

export interface Order {
  id: string;            
  userId: string;
  items: CartItem[];
  summary: CartSummary;
  deliveryAddress: DeliveryAddress;
  status: OrderStatus;
  createdAt: string;          
}

export interface DeliveryAddress {
  line1: string;
  city: string;
  country?: string;
}

//  API response shapes 

export interface ApiSuccess<T> {
  data: T;
  message?: string;
}

export interface ApiError {
  error: string;
  status: number;
}
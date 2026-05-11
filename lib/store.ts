import { Cart, CartItem, CartSummary, Order } from '@/types';

// Mock auth 
export const MOCK_USER_ID = 'user_test_001';

export const MOCK_USER = {
  id: MOCK_USER_ID,
  name: 'Test User',
  email: 'test@fashionhub.dev',
  username: 'testuser',
  password: 'password123',
};

// Test user credentials for login
export const TEST_USERS = [
  {
    id: MOCK_USER_ID,
    name: 'Test User',
    email: 'test@fashionhub.dev',
    username: 'testuser',
    password: 'password123',
  },
];

// Delivery constants 

export const DELIVERY_FEE = 12; 

export const DEFAULT_ADDRESS = {
  line1: '25/3 Housing Estate',
  city: 'Sylhet',
  country: 'BD',
};

// Internal maps (module-level singletons) 

const carts = new Map<string, Cart>();
const orders = new Map<string, Order>();

// Cart helpers 

export function getCart(userId: string): Cart {
  if (!carts.has(userId)) {
    carts.set(userId, { userId, items: [] });
  }
  return carts.get(userId)!;
}


export function addToCart(userId: string, incoming: CartItem): Cart {
  const cart = getCart(userId);

  const existing = cart.items.find(
    (i) =>
      i.productId === incoming.productId &&
      i.size === incoming.size &&
      i.color.hex === incoming.color.hex
  );

  if (existing) {
    existing.quantity += incoming.quantity;
  } else {
    cart.items.push({ ...incoming });
  }

  carts.set(userId, cart);
  return cart;
}


export function removeFromCart(
  userId: string,
  productId: string,
  size: string,
  colorHex: string
): Cart {
  const cart = getCart(userId);
  cart.items = cart.items.filter(
    (i) =>
      !(
        i.productId === productId &&
        i.size === size &&
        i.color.hex === colorHex
      )
  );
  carts.set(userId, cart);
  return cart;
}


export function clearCart(userId: string): void {
  carts.set(userId, { userId, items: [] });
}

// Summary helper 

export function computeSummary(items: CartItem[]): CartSummary {
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const deliveryFee = totalItems > 0 ? DELIVERY_FEE : 0;
  return {
    totalItems,
    subtotal,
    deliveryFee,
    totalPayment: subtotal + deliveryFee,
  };
}

// Order helpers 


function generateOrderId(): string {
  const num = Math.floor(100000 + Math.random() * 900000);
  return `#${num}`;
}


export function createOrderFromCart(userId: string): Order {
  const cart = getCart(userId);

  if (cart.items.length === 0) {
    throw new Error('Cart is empty');
  }

  const order: Order = {
    id: generateOrderId(),
    userId,
    items: [...cart.items],           
    summary: computeSummary(cart.items),
    deliveryAddress: DEFAULT_ADDRESS,
    status: 'confirmed',              
    createdAt: new Date().toISOString(),
  };

  orders.set(order.id, order);
  clearCart(userId);                  

  return order;
}


export function getOrder(orderId: string): Order | undefined {
  return orders.get(orderId);
}

export function getOrdersByUser(userId: string): Order[] {
  return [...orders.values()]
    .filter((o) => o.userId === userId)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
}
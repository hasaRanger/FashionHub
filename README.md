# FashionHub

A mobile-first e-commerce app built with Next.js, TypeScript, and Tailwind CSS v4.

## Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **lucide-react** for icons

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Visit `http://localhost:3000` — it redirects to `/onboarding` automatically.

### Build for production

```bash
npm run build
npm start
```

## Authentication

The app uses **Bearer token authentication** with a seeded test user. No OAuth or database required.

### Test Credentials
- **Username:** `testuser`
- **Password:** `password123`

### How It Works
1. User navigates to `/auth/signin` (or clicks Sign In on `/onboarding`)
2. Credentials are validated against the seeded user in `lib/store.ts`
3. Server returns a Bearer token: `mock-token-test-user-001`
4. Token is stored in:
   - **localStorage** (for client-side React state)
   - **HTTP-only cookie** (for middleware validation)
5. All protected requests include the token in the `Authorization: Bearer <token>` header
6. User can sign out, which clears the token from both storage locations

### Protected Routes
The following pages require authentication. Unauthenticated users are redirected to `/onboarding`:
- `/home` — Product listing
- `/products/[id]` — Product details
- `/cart` — Shopping cart
- `/checkout` — Order confirmation

### Protected API Endpoints
- `POST /api/cart` — Add item to cart
- `GET /api/cart` — Fetch cart
- `DELETE /api/cart` — Remove item from cart
- `POST /api/orders` — Create order

All other endpoints (`/api/products`, `/api/auth/login`, `/api/auth/logout`) are public.

## Seeding

No database setup required. Products are hardcoded in `lib/seed.ts`. The in-memory cart and order store lives in `lib/store.ts` and resets on server restart — this is intentional per the project spec.

## API Routes

| Method | Route | Description |
|---|---|---|
| GET | `/api/products` | List all products |
| GET | `/api/products/:id` | Single product |
| GET | `/api/cart` | Get cart with summary |
| POST | `/api/cart` | Add item to cart |
| DELETE | `/api/cart` | Remove item from cart |
| POST | `/api/orders` | Create order from cart |

## Screens

| Route | Screen |
|---|---|
| `/onboarding` | Landing with Sign In / Sign Up |
| `/home` | Product grid with category filters |
| `/products/[id]` | Product detail, size + color picker, add to cart |
| `/cart` | Cart items, order summary |
| `/checkout` | Address, payment method, place order |

## Future Improvements

Due to project timeline constraints, the following features remain unimplemented but would enhance the system:

- **Persistent Database** — Replace in-memory store with PostgreSQL/MongoDB for permanent data retention
- **Real Authentication** — Implement OAuth 2.0, JWT with refresh tokens, password reset, and email verification
- **Payment Integration** — Add Stripe or PayPal for actual transactions instead of mock checkout
- **User Profiles** — Full account management, order history, saved addresses, and payment methods
- **Product Reviews & Ratings** — User-generated content with star ratings and comments
- **Search & Filtering** — Advanced product discovery with full-text search and category filters
- **Inventory Management** — Real stock tracking and availability notifications
- **Email Notifications** — Order confirmations, shipping updates, and promotional emails
- **Admin Dashboard** — Tools for managing products, inventory, and orders
- **Analytics & Metrics** — User behavior tracking and sales reporting
- **Security Hardening** — Rate limiting, CSRF protection, input validation, and proper error handling
- **PWA Support** — Offline functionality and installable app experience

## Decisions & Shortcuts

- **In-memory store** — used instead of a database as permitted by the spec. Data resets on server restart.
- **Mock auth** — a seeded test user with Bearer tokens. No session or OAuth needed per spec.
- **Imprima font** — single-weight Google Font matching the mockup's clean aesthetic.
- **Staggered grid** — the home screen uses two independent flex columns with a top offset on the right column to match the asymmetric mockup layout rather than a standard CSS grid.
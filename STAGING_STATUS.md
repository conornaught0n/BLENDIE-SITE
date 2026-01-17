# STAGING STATUS

## 1. Automated Data Pipeline
- [x] **Google Sheets Connect**: Implemented `lib/google-sheets.ts`.
- [x] **API Route**: `app/api/data/route.ts` serves Sheet data.
- [x] **Marketing Headers**: Cookie tracking logic in `Header.tsx` (simulated).
- [x] **Stock Levels**: "Low Stock" badge in `app/shop/page.tsx`.

## 2. Sales & Upsell Logic
- [x] **Cart Component**: Created `components/Cart.tsx`.
- [x] **Upsell Engine**: Suggests "Rosa Té" when items are in cart.
- [x] **Tracking**: Reads/Sets `marketing_variant` cookie.

## 3. Security & Launch
- [x] **SSL Force**: `middleware.ts` redirects HTTP -> HTTPS.
- [x] **WWW Redirect**: `middleware.ts` redirects www -> non-www.
- [x] **UI Standardization**: Verified `app/page.tsx` containers.

## 4. Mobile Stabilization (HOTFIX)
- [x] **Radix UI Dialog**: Replaced custom overlay with `@radix-ui/react-dialog`.
- [x] **Touch Events**: Eliminated `setTimeout` hacks; relying on robust pointer events.
- [x] **Z-Index**: Header (`z-50`), Overlay (`z-[60]`), Menu (`z-[70]`).
- [x] **Type Safety**: Fixed `origin` property missing in `BlendItem` / `Coffee` type.

## 5. Verification Protocol

### Verify Mobile Menu
1. Open site on Mobile viewport (< 768px).
2. Tap Hamburger icon.
3. Verify Menu opens immediately with animation.
4. Tap any link (e.g., "Shop Coffees").
5. Verify Menu closes immediately and navigation occurs.

### Verify Data API
```bash
curl http://localhost:3000/api/data
```
Expected: JSON response with `marketing`, `stock`, and `batches`.

### Verify Cart Upsell
1. Navigate to `/shop`.
2. Add a coffee to "Portfolio" (acts as cart for blend).
3. Click "Cart".
4. See "Rosa Té" recommendation.

### Verify SSL/Redirect (Local Simulation)
Note: SSL force only active in `NODE_ENV=production`.
Check `middleware.ts` logic.

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

## 4. Verification Protocol

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

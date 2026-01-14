# BLENDIE 2026 PRODUCTION OS

## Project Overview
A high-performance Next.js application for automated roastery management, serving as the "Operating System" for Blendie's physical production. It bridges the gap between e-commerce orders, roasting data (Firescope), and shipping logistics.

## Architecture
-   **Framework**: Next.js 14+ (App Router)
-   **Styling**: Tailwind CSS (Glassmorphism Design System)
-   **Database**: PostgreSQL (via Prisma)
-   **Auth**: Internal Authentication (NextAuth.js)

## Core Modules

### 1. Data Infrastructure (Integration Layer)
-   **Firescope Scraper**: Backend service to normalize roast data (Profile, Time, Weight Loss %).
-   **Commerce Sync**: Polls shopping plugin API for pending orders.
-   **Shipping Automation**: Auto-generates tracking and shipping labels.

### 2. Roastery Operator Interface (Mobile-First)
-   **QR/Barcode Engine**: Scans Order QRs to access processing flow.
-   **Workflow**:
    -   Update Status (In Production -> Shipped).
    -   QC Input (Final Weight, Batch ID Link).
    -   **Blending Logic**: Scans component bean barcodes to verify recipes against the digital order.

### 3. Production Logic & Analytics
-   **Workday Dashboard**: Collates total daily roasting requirements.
-   **Inventory Bridge**: Auto-deducts green bean inventory upon roast confirmation.

## Visual Design
-   **Style**: **Glassmorphism**. Frosted glass panels, translucent backgrounds, high-contrast text for utility.
-   **Focus**: Utility-first. No marketing "hero" sections. Dense, actionable data.

## Roadmap (Linear Mirror)
-   [ ] **Scraper_Engine**: Ingest roast profiles.
-   [ ] **Print_Automation**: Sync orders & print labels.
-   [ ] **QR_Scan_Logic**: The operator's handheld scanner interface.
-   [ ] **Inventory_Bridge**: Stock management logic.

## Deployment
-   **Production**: `blend.ie` (Consumer facing)
-   **Internal OS**: Protected routes (e.g., `/production`, `/admin`).

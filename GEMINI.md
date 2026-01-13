# BLENDIE - Custom Blend Platform

## Core Concept
A boutique coffee platform allowing users to:
1.  **Discover**: Browse single origin coffees.
2.  **Portfolio (Ledger)**: View favorited/hearted coffees, saved blends, and recommendations.
3.  **Blend**: Create custom blends by combining up to 10 distinct coffees.
4.  **Visualize**: Understand flavor profiles via multi-mode visualizations (Petal, Graph, 3D, Bar).

## Functional Requirements

### 1. The Portfolio (Ledger View)
-   **Structure**: A dashboard/ledger view.
-   **Content**:
    -   "Liked" coffees (Hearted from store).
    -   Saved Blends.
    -   Recommended Blends.
-   **Filtering**: By Country, Coffee Type (Process, Roast Level, etc.).

### 2. The Blend Builder (The Core Tool)
-   **Selection**: User selects up to 10 coffees from their Portfolio or the Store.
-   **Composition**:
    -   Sliders OR Percentage Input Boxes (User preference saved).
    -   Real-time validation (Must total 100%).
-   **Pricing Logic**:
    -   Dynamic calculation based on % composition.
    -   Tiered pricing (250g vs 1kg base rates).

### 3. Visualizations (The "Petal" & More)
-   **Data Model**: Each coffee has 5 traits scored 1-10 (e.g., Aroma, Body, Acidity, Sweetness, Aftertaste).
-   **Modes**:
    -   **Petal/Radar Chart**: 5-axis chart showing the aggregate profile.
    -   **Bar Chart**: Shows constitution (e.g., 40% Brazil, 60% Ethiopia) and color-coded contributions.
    -   **3D/Graph**: Alternative view for accessibility/preference.
-   **Interactivity**: Hover states to reveal detailed info per element.

## Development Phases

### Phase 1: Portfolio & Discovery
-   Implement the "Ledger" view.
-   Mock Database of Single Origin Coffees.
-   "Heart" functionality (Local State for now).

### Phase 2: The Blender
-   Interface to drag/add coffees to a blending stage.
-   Percentage sliders + Input fields (Synced).
-   Price Calculation Engine.

### Phase 3: Visualization & Polish
-   Implement dynamic Recharts/D3 visualizations.
-   Switching logic (Sliders vs Inputs, Graph vs Bar).

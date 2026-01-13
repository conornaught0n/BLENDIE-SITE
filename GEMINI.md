# BLENDIE - Custom Blend Platform

## Core Concept
A boutique coffee platform allowing users to:
1.  **Discover**: Browse single origin coffees.
2.  **Portfolio (Ledger)**: View favorited/hearted coffees, saved blends, and recommendations.
3.  **Blend**: Create custom blends by combining up to 10 distinct coffees.
4.  **Visualize**: Understand flavor profiles via multi-mode visualizations (Petal, Graph, 3D, Bar).
5.  **Configure**: Design the physical product (Bag, Label, Grind) in 3D.
6.  **Consult**: Interact with "The Legend" - an AI coffee expert.

## Functional Requirements

### 1. The Portfolio (Ledger View)
-   **Structure**: A dashboard/ledger view.
-   **Content**:
    -   "Liked" coffees (Hearted from store).
    -   Saved Blends.
    -   Recommended Blends.
-   **Filtering**: By Country, Coffee Type (Process, Roast Level, etc.).

### 2. The Blend Builder (Step 1)
-   **Selection**: User selects up to 10 coffees from their Portfolio or the Store.
-   **Composition**:
    -   Sliders OR Percentage Input Boxes (User preference saved).
    -   Real-time validation (Must total 100%).
-   **Pricing Logic**:
    -   Dynamic calculation based on % composition.
    -   Tiered pricing (250g vs 1kg base rates).

### 3. The Bag Configurator (Step 2)
-   **3D Visualizer**: Real-time rendering of the bag.
-   **Customization**:
    -   **Bag**: Style, Color, Finish (Matte/Gloss).
    -   **Label**: Upload Front/Back images. Adjust Size & Position.
    -   **Context**: Switch backgrounds (Kitchen with Espresso Machine, Retail Shelf, Coffee Table).
-   **Extras**: Grind option (Whole Bean vs Ground).

### 4. "The Legend" (AI Advisor)
-   **Persona**: Knowledgeable, helpful, non-intrusive expert.
-   **Capabilities**:
    -   **Optimization**: "This blend is great, but swap X for Y to save 15%."
    -   **Compatibility**: "Warning: Mixing a light roast Ethiopia with a dark roast Sumatra might taste unbalanced."
    -   **Context**: "I see you liked your last Brazil blend, this is similar."
    -   **Support**: Brewing advice, encyclopedia questions.

## UX Flow
-   **Vertical Scroll**: Auto-scroll progression from Blending (Step 1) -> Configuration (Step 2) -> Review/Order (Step 3).

## Development Phases

### Phase 1: Portfolio & Discovery
-   Implement the "Ledger" view.
-   Mock Database of Single Origin Coffees.

### Phase 2: The Blender
-   Interface to drag/add coffees to a blending stage.
-   Percentage sliders + Input fields (Synced).

### Phase 3: The 3D Configurator
-   Three.js / React-Three-Fiber implementation for Bag Visualization.
-   Label upload and texture mapping.

### Phase 4: The Legend (AI)
-   Chat interface overlay.
-   Logic engine for "Compatibility Checks".

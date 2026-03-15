# IMPLEMENTATION PLAN - Milpa NiME PWA - SuperCook Missing Features

## Overview
Five interconnected features that enhance the recipe discovery and management system. Implementation sequenced for minimum dependencies and maximum MVP value.

---

## FEATURE 1: Allergens System

**Objective:** Enable users to exclude recipes containing specific allergens.

**Estimated Effort:** 3 points | **Priority:** HIGH | **Dependencies:** None

### Data Changes

**New file: `/home/user/recetas/data/allergens.js`**
```javascript
export const ALLERGENS = [
    { id: "gluten", name: "Gluten" },
    { id: "dairy", name: "Lácteos" },
    { id: "eggs", name: "Huevos" },
    { id: "nuts", name: "Frutos secos" },
    { id: "shellfish", name: "Mariscos" },
    { id: "soy", name: "Soya" },
    { id: "sesame", name: "Ajonjolí" },
    { id: "fish", name: "Pescado" }
];

export const INGREDIENT_ALLERGENS = {
    "queso_fresco": ["dairy"],
    "huevo": ["eggs"],
    "tofu": ["soy"],
    "atun": ["fish"],
    // ... complete mapping for all 295 ingredients
};
```

**Modify: `/home/user/recetas/data/recipes.js`**
- Add `allergens: []` field to each recipe (auto-calculated from ingredients)

### Implementation Steps
1. Create `data/allergens.js` with allergen definitions
2. Add `allergens: []` to all recipes in `data/recipes.js`
3. Add allergen UI to `index.html` Step 2 panel (chips + modal)
4. Add allergen state in `app.js`
5. Implement filtering in `scoreRecipe()` - reject recipes with excluded allergens
6. Wire toggle and persistence

### Files
- **Create:** `data/allergens.js`
- **Modify:** `data/recipes.js`, `app.js`, `index.html`

---

## FEATURE 2: Advanced Filters

**Objective:** Allow fine-tuning recipe suggestions with dietary and preparation preferences.

**Estimated Effort:** 4 points | **Priority:** HIGH | **Dependencies:** Feature 1 (partially)

### UI Components

Expandable panel in Step 2 (Context) with:
- **Fiber minimum slider** → baja/media/alta
- **Protein minimum slider** → baja/media/alta
- **Low saturated fat checkbox**
- **High vegetable volume checkbox**
- **Max effort dropdown** → bajo/medio/alto
- **Family filter dropdown** → all families

### Filter Logic
New `applyAdvancedFilters()` function that:
- Applies filters as hard constraints (recipes below threshold removed)
- Applied BEFORE scoring (unlike allergens which are applied during scoring)
- Can be combined with all other filters

### Implementation Steps
1. Add advanced filter UI to `index.html` Step 2
2. Create filter state in `app.js`
3. Implement `applyAdvancedFilters()` function
4. Modify `rankRecipes()` to call filter function before scoring
5. Wire sliders and dropdowns with change handlers
6. Add "Reset filters" functionality
7. Show active filter count in button

### Files
- **Modify:** `app.js`, `index.html`, `styles.css`

---

## FEATURE 3: Sort by Missing Ingredients

**Objective:** Add "por completar" sorting to show recipes needing fewest additional ingredients.

**Estimated Effort:** 2 points | **Priority:** MEDIUM | **Dependencies:** None

### Logic
- Calculate missing required ingredients for each recipe
- Primary sort: fewest missing required ingredients
- Secondary sort: fewest missing total ingredients

### Implementation Steps
1. Create `calculateMissingIngredients(recipe, inventory)` function
2. Add "Por completar" sort chip to results UI in `index.html`
3. Modify `applySortAndFilter()` to handle "missing" sort type
4. Wire sort chip click handlers
5. Optional: Show missing count badge on recipe cards in this view

### Files
- **Modify:** `app.js`, `index.html`

---

## FEATURE 4: Recipe Import from URLs

**Objective:** Parse recipes from external URLs using JSON-LD with Open Graph fallback.

**Estimated Effort:** 4 points | **Priority:** MEDIUM | **Dependencies:** None

### Implementation
- **JSON-LD parser:** Extract Recipe schema from page
- **Open Graph fallback:** Basic recipe info if no JSON-LD
- **Import modal UI:** URL input, preview, edit, confirm
- **Storage:** Save imported recipes to localStorage, merge with RECIPES on init
- **Normalization:** Convert imported format to app's recipe schema

### Parser Features
- Handle ISO 8601 durations (PT15M30S → minutes)
- Extract ingredients list and instructions
- Grab nutrition data if available
- Store source URL and import timestamp

### Implementation Steps
1. Create `modules/recipe_importer.js` with:
   - `parseJsonLD(html)` - Extract JSON-LD Recipe
   - `parseOpenGraph(html)` - Fallback parser
   - `validateImportedRecipe()` - Validate required fields
   - `normalizeImportedRecipe()` - Convert to app schema
2. Add import modal UI to `index.html`
3. Add "Importar receta" button to header
4. Implement async URL fetch and parsing
5. Show preview with editable fields
6. Implement confirm handler to save and merge
7. Add imported recipes to filtering/scoring pipeline

### Files
- **Create:** `modules/recipe_importer.js`
- **Modify:** `app.js`, `index.html`

---

## FEATURE 5: Recipe Favorites

**Objective:** Let users mark/save favorite recipes with persistent storage.

**Estimated Effort:** 2 points | **Priority:** MEDIUM | **Dependencies:** None

### Implementation
- **Storage:** Array of favorite recipe IDs in localStorage
- **UI:** Heart icon button on recipe cards + favorites view
- **Toggle:** Click heart to add/remove favorite
- **Visual feedback:** Filled heart when favorited

### Favorites View
New section showing:
- All favorited recipes in grid
- Empty state message if none
- Same card interactions as other views

### Implementation Steps
1. Add favorites state to `app.js`: `state.favorites = loadFavorites()`
2. Create helper functions: `toggleFavorite()`, `isFavorite()`, `persistFavorites()`
3. Modify recipe card template in `index.html` to include heart button
4. Add click handler to toggle favorite on click
5. Update heart icon styling (outline/filled)
6. Create `renderFavoritesList()` function
7. Add favorites button to navigation
8. Add favorites view section to `index.html`

### Files
- **Modify:** `app.js`, `index.html`, `styles.css`

---

## IMPLEMENTATION SEQUENCE

**Recommended order (by priority and dependencies):**

1. **Feature 1: Allergens System** - Foundation for exclusion pattern
2. **Feature 5: Recipe Favorites** - Simplest, highest ROI
3. **Feature 3: Sort by Missing** - Simple, useful
4. **Feature 2: Advanced Filters** - Complex, depends on allergens pattern
5. **Feature 4: Recipe Import** - Most complex, independent

---

## TESTING CHECKLIST

- [ ] Allergens: Select/deselect, multi-select, persist across reload
- [ ] Advanced filters: Each filter individually, combinations, reset
- [ ] Sort by missing: Correct ordering, secondary sort by score
- [ ] Recipe import: JSON-LD parsing, Open Graph fallback, validation, persistence
- [ ] Favorites: Toggle, visual feedback, favorites view, persist across reload

---

## CRITICAL FILES FOR IMPLEMENTATION

1. **`/home/user/recetas/app.js`** - Central hub for all state, logic, and event handlers
2. **`/home/user/recetas/index.html`** - UI structure for all features
3. **`/home/user/recetas/data/recipes.js`** - Add allergens field
4. **`/home/user/recetas/data/allergens.js`** (NEW)
5. **`/home/user/recetas/modules/recipe_importer.js`** (NEW)

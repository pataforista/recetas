import { RECIPES } from "../data/recipes.js";
import { INGREDIENTS, INGREDIENT_SHELF_LIFE } from "../data/ingredients.js";

const missingIngredients = new Set();
const inconsistentCategories = new Set();

const ingredientIds = new Set(INGREDIENTS.map(i => i.id));
const ingredientCategories = new Set(INGREDIENTS.map(i => i.category));

RECIPES.forEach(recipe => {
    const allIngs = new Set([
        ...(recipe.ingredientsRequired || []),
        ...(recipe.ingredientsOptional || [])
    ]);
    
    if (recipe.ingredientsDetailed) {
        if (Array.isArray(recipe.ingredientsDetailed)) {
            recipe.ingredientsDetailed.forEach(item => {
                if (typeof item === 'string') allIngs.add(item);
                else if (item.id) allIngs.add(item.id);
            });
        } else {
            // If it's an object (though expected to be an array)
            Object.keys(recipe.ingredientsDetailed).forEach(id => allIngs.add(id));
        }
    }
    
    allIngs.forEach(id => {
        if (!ingredientIds.has(id)) {
            missingIngredients.add(id);
        }
    });
});

const shelfLifeCategories = Object.keys(INGREDIENT_SHELF_LIFE);
INGREDIENTS.forEach(ing => {
    if (!INGREDIENT_SHELF_LIFE[ing.category]) {
        inconsistentCategories.add(ing.category);
    }
});

console.log("Missing Ingredients:", Array.from(missingIngredients));
console.log("Inconsistent Categories (in INGREDIENTS but not in SHELF_LIFE):", Array.from(inconsistentCategories));

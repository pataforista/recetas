import { RECIPES } from "../data/recipes.js";
import { INGREDIENTS } from "../data/ingredients.js";

/**
 * Módulo de Recetas - Gestiona consultas y filtrado de recetas
 */

/**
 * Obtiene todas las recetas
 * @returns {Array} Array de todas las recetas
 */
export function getAllRecipes() {
    return [...RECIPES];
}

/**
 * Obtiene una receta por ID
 * @param {string} recipeId - ID de la receta
 * @returns {Object|null} La receta o null si no existe
 */
export function getRecipeById(recipeId) {
    return RECIPES.find((r) => r.id === recipeId) || null;
}

/**
 * Busca recetas por nombre (búsqueda parcial, case-insensitive)
 * @param {string} query - Texto de búsqueda
 * @returns {Array} Array de recetas que coinciden
 */
export function searchRecipesByName(query) {
    if (!query || typeof query !== "string") return [];
    const lowerQuery = query.toLowerCase();
    return RECIPES.filter((r) =>
        r.name.toLowerCase().includes(lowerQuery) ||
        (r.description && r.description.toLowerCase().includes(lowerQuery))
    );
}

/**
 * Filtra recetas por familia (tipo de plato)
 * @param {string} family - Familia de receta (ej: "frijol", "nopal", "sopa")
 * @returns {Array} Array de recetas de esa familia
 */
export function filterRecipesByFamily(family) {
    return RECIPES.filter((r) => r.family === family);
}

/**
 * Filtra recetas por tipo de comida
 * @param {string} mealType - Tipo de comida ("desayuno", "comida", "cena", "snack")
 * @returns {Array} Array de recetas de ese tipo
 */
export function filterRecipesByMealType(mealType) {
    return RECIPES.filter((r) => r.mealType === mealType);
}

/**
 * Filtra recetas por tiempo máximo de preparación
 * @param {number} maxTime - Tiempo máximo en minutos
 * @returns {Array} Array de recetas que se preparan en ese tiempo o menos
 */
export function filterRecipesByTime(maxTime) {
    return RECIPES.filter((r) => r.timeMin <= maxTime);
}

/**
 * Filtra recetas por nivel de esfuerzo
 * @param {string} effort - Nivel de esfuerzo ("bajo", "medio", "alto")
 * @returns {Array} Array de recetas con ese nivel de esfuerzo
 */
export function filterRecipesByEffort(effort) {
    return RECIPES.filter((r) => r.effort === effort);
}

/**
 * Filtra recetas que contienen un craving específico
 * @param {string} craving - Tipo de craving (ej: "rapido", "casero", "saludable")
 * @returns {Array} Array de recetas que coinciden con el craving
 */
export function filterRecipesByCraving(craving) {
    return RECIPES.filter((r) => r.cravings && r.cravings.includes(craving));
}

/**
 * Filtra recetas que requieren un ingrediente específico
 * @param {string} ingredientId - ID del ingrediente
 * @returns {Array} Array de recetas que requieren ese ingrediente
 */
export function filterRecipesByIngredient(ingredientId) {
    return RECIPES.filter((r) =>
        r.ingredientsRequired.includes(ingredientId) ||
        (r.ingredientsOptional && r.ingredientsOptional.includes(ingredientId))
    );
}

/**
 * Filtra recetas que pueden prepararse con ingredientes disponibles
 * @param {Array} ownedIngredientIds - Array de IDs de ingredientes disponibles
 * @returns {Array} Array de recetas que se pueden hacer
 */
export function filterRecipesByAvailableIngredients(ownedIngredientIds) {
    return RECIPES.filter((r) => {
        const allRequired = r.ingredientsRequired.every((id) =>
            ownedIngredientIds.includes(id)
        );
        return allRequired;
    });
}

/**
 * Obtiene todas las familias únicas de recetas
 * @returns {Array} Array de nombres de familias
 */
export function getAllFamilies() {
    const families = new Set(RECIPES.map((r) => r.family).filter(Boolean));
    return Array.from(families).sort();
}

/**
 * Obtiene todos los cravings únicos de todas las recetas
 * @returns {Array} Array de cravings
 */
export function getAllCravings() {
    const cravings = new Set();
    RECIPES.forEach((r) => {
        if (r.cravings && Array.isArray(r.cravings)) {
            r.cravings.forEach((c) => cravings.add(c));
        }
    });
    return Array.from(cravings).sort();
}

/**
 * Obtiene todos los tipos de comida únicos
 * @returns {Array} Array de tipos de comida
 */
export function getAllMealTypes() {
    const mealTypes = new Set(RECIPES.map((r) => r.mealType).filter(Boolean));
    return Array.from(mealTypes).sort();
}

/**
 * Filtra recetas por múltiples criterios (filtrado combinado)
 * @param {Object} filters - Objeto con filtros
 * @param {string} filters.family - Familia de receta (opcional)
 * @param {string} filters.mealType - Tipo de comida (opcional)
 * @param {number} filters.maxTime - Tiempo máximo (opcional)
 * @param {string} filters.effort - Nivel de esfuerzo (opcional)
 * @param {string} filters.craving - Craving específico (opcional)
 * @param {Array} filters.ingredientIds - Array de ingredientes disponibles (opcional)
 * @returns {Array} Array de recetas que coinciden con todos los filtros
 */
export function filterRecipes(filters = {}) {
    let results = [...RECIPES];

    if (filters.family) {
        results = results.filter((r) => r.family === filters.family);
    }

    if (filters.mealType) {
        results = results.filter((r) => r.mealType === filters.mealType);
    }

    if (filters.maxTime) {
        results = results.filter((r) => r.timeMin <= filters.maxTime);
    }

    if (filters.effort) {
        results = results.filter((r) => r.effort === filters.effort);
    }

    if (filters.craving) {
        results = results.filter((r) =>
            r.cravings && r.cravings.includes(filters.craving)
        );
    }

    if (filters.ingredientIds && Array.isArray(filters.ingredientIds)) {
        results = results.filter((r) =>
            r.ingredientsRequired.every((id) =>
                filters.ingredientIds.includes(id)
            )
        );
    }

    return results;
}

/**
 * Ordena recetas por campo específico
 * @param {Array} recipes - Array de recetas
 * @param {string} sortBy - Campo para ordenar ("name", "timeMin", "effort")
 * @param {string} order - Orden ascendente ("asc") o descendente ("desc")
 * @returns {Array} Array de recetas ordenado
 */
export function sortRecipes(recipes, sortBy = "name", order = "asc") {
    const sorted = [...recipes];
    const multiplier = order === "desc" ? -1 : 1;

    sorted.sort((a, b) => {
        let valueA = a[sortBy];
        let valueB = b[sortBy];

        if (typeof valueA === "string") {
            return valueA.localeCompare(valueB) * multiplier;
        }

        return (valueA - valueB) * multiplier;
    });

    return sorted;
}

/**
 * Obtiene estadísticas de recetas
 * @returns {Object} Objeto con estadísticas
 */
export function getRecipeStats() {
    const stats = {
        total: RECIPES.length,
        byFamily: {},
        byMealType: {},
        byEffort: { bajo: 0, medio: 0, alto: 0 },
        avgTime: 0,
        totalTime: 0,
        withLowFriction: 0
    };

    RECIPES.forEach((recipe) => {
        // Contar por familia
        stats.byFamily[recipe.family] = (stats.byFamily[recipe.family] || 0) + 1;

        // Contar por tipo de comida
        stats.byMealType[recipe.mealType] = (stats.byMealType[recipe.mealType] || 0) + 1;

        // Contar por esfuerzo
        stats.byEffort[recipe.effort] = (stats.byEffort[recipe.effort] || 0) + 1;

        // Calcular tiempo promedio
        stats.totalTime += recipe.timeMin;

        // Contar bajo fricción
        if (recipe.lowFriction) stats.withLowFriction += 1;
    });

    stats.avgTime = Math.round(stats.totalTime / RECIPES.length);

    return stats;
}

/**
 * Obtiene el nombre de un ingrediente por su ID
 * @param {string} ingredientId - ID del ingrediente
 * @returns {string} Nombre del ingrediente
 */
export function getIngredientName(ingredientId) {
    const ingredient = INGREDIENTS.find((i) => i.id === ingredientId);
    return ingredient ? ingredient.name : ingredientId;
}

/**
 * Obtiene información detallada de una receta con nombres de ingredientes
 * @param {string} recipeId - ID de la receta
 * @returns {Object|null} Receta con información expandida o null
 */
export function getRecipeDetails(recipeId) {
    const recipe = getRecipeById(recipeId);
    if (!recipe) return null;

    return {
        ...recipe,
        ingredientsRequiredNames: recipe.ingredientsRequired.map((id) =>
            getIngredientName(id)
        ),
        ingredientsOptionalNames: (recipe.ingredientsOptional || []).map((id) =>
            getIngredientName(id)
        )
    };
}

/**
 * Exporta todas las recetas en formato JSON para descarga
 * @returns {string} String JSON de todas las recetas
 */
export function exportRecipesAsJSON() {
    return JSON.stringify(RECIPES, null, 2);
}

/**
 * Cuenta cuántas recetas pueden hacerse con ingredientes disponibles
 * @param {Array} ownedIngredientIds - Array de IDs de ingredientes
 * @returns {number} Cantidad de recetas que pueden prepararse
 */
export function countMakableRecipes(ownedIngredientIds) {
    return filterRecipesByAvailableIngredients(ownedIngredientIds).length;
}

// One-off migration script: merges `servings` + `steps` (authored to follow
// data/RECIPE_FORMAT.md) into every recipe in data/recipes.js, and reorders
// fields to match the canonical order documented there.
// Usage: node scripts/merge_recipe_steps.mjs <path-to-steps_all.json>

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const recipesPath = path.join(__dirname, "..", "data", "recipes.js");

const suppPath = process.argv[2];
if (!suppPath) {
    console.error("Uso: node scripts/merge_recipe_steps.mjs <steps_all.json>");
    process.exit(1);
}

const supplement = JSON.parse(readFileSync(suppPath, "utf8"));
const suppById = new Map(supplement.map((s) => [s.id, s]));

const { RECIPES } = await import(path.join(__dirname, "..", "data", "recipes.js"));

const FIELD_ORDER = [
    "id", "name", "family", "format", "description", "servings", "timeMin",
    "effort", "mealType", "lowFriction", "ingredientsRequired", "ingredientsOptional",
    "ingredientsDetailed", "steps", "cravings", "seasonalBoostIngredients",
    "profile", "mealPrep", "pro_tip"
];

let merged = 0;
const missing = [];

const output = RECIPES.map((recipe) => {
    const supp = suppById.get(recipe.id);
    if (!supp) {
        missing.push(recipe.id);
        return recipe;
    }
    merged++;
    const combined = { ...recipe, servings: supp.servings, steps: supp.steps };
    const ordered = {};
    FIELD_ORDER.forEach((key) => {
        if (combined[key] !== undefined) ordered[key] = combined[key];
    });
    // Cualquier campo no contemplado en FIELD_ORDER se agrega al final (no debería pasar)
    Object.keys(combined).forEach((key) => {
        if (!(key in ordered)) ordered[key] = combined[key];
    });
    return ordered;
});

if (missing.length) {
    console.error("Recetas sin steps/servings (no se tocaron):", missing);
}

const header = `/**
 * RECIPES – Milpa NiME
 *
 * Base de datos de recetas optimizada para cocina mexicana cotidiana,
 * enfocada en accesibilidad, nutrición (NiME) y productos de temporada.
 *
 * Formato estándar documentado en data/RECIPE_FORMAT.md — sigue ese
 * formato al agregar o editar recetas.
 */

export const RECIPES = `;

const body = JSON.stringify(output, null, 4);
writeFileSync(recipesPath, header + body + ";\n", "utf8");

console.log(`Fusionadas ${merged}/${RECIPES.length} recetas.`);

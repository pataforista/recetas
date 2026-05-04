import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const INGREDIENTS_PATH = 'data/ingredients.js';
const RECIPES_PATH = 'data/recipes.js';

function getData(filePath, varName) {
    const content = fs.readFileSync(filePath, 'utf8');
    const start = content.indexOf(`export const ${varName} = `);
    if (start === -1) throw new Error(`Could not find ${varName} in ${filePath}`);
    const dataPart = content.substring(start + `export const ${varName} = `.length);
    let end = dataPart.lastIndexOf('];');
    if (end === -1) end = dataPart.lastIndexOf(']');
    const arrayStr = dataPart.substring(0, end + 1);
    try {
        // Simple eval-like approach for the array string
        // Since it's valid JS array literal, it should work with a little trick
        return new Function(`return ${arrayStr}`)();
    } catch (e) {
        console.error(`Error parsing ${varName} in ${filePath}:`, e);
        return [];
    }
}

const INGREDIENTS = getData(INGREDIENTS_PATH, 'INGREDIENTS');
const RECIPES = getData(RECIPES_PATH, 'RECIPES');

const ingredientMap = {};
INGREDIENTS.forEach(ing => {
    ingredientMap[ing.id] = ing;
});

const blacklist = new Set([
    'miso', 'dashi', 'yuzu', 'mirin', 'sake', 'garam_masala', 'curry_powder', 
    'tahini', 'gofio', 'okra', 'collard_greens', 'daikon', 'konjac', 'shichimi', 
    'pomegranate_molasses', 'wakame', 'kombu', 'alga_nori', 'burdock_root', 
    'tempeh', 'bonito_flakes', 'biber_sivri', 'aji_cacho_de_cabra', 'cvarci',
    'yuzu_juice', 'black_eyed_peas'
]);

console.log(`Original recipes: ${RECIPES.length}`);

const filteredRecipes = RECIPES.filter(recipe => {
    const allIngs = [
        ...(recipe.ingredientsRequired || []),
        ...(recipe.ingredientsOptional || [])
    ];
    
    const hasBlacklisted = allIngs.some(id => blacklist.has(id));
    if (hasBlacklisted) return false;
    
    const bajaCount = (recipe.ingredientsRequired || []).filter(id => {
        const ing = ingredientMap[id];
        return ing && ing.frequency === 'baja';
    }).length;
    
    if (bajaCount > 1) return false;
    
    const isSweet = recipe.cravings && recipe.cravings.includes('dulce');
    if (!isSweet) {
        const hasVegOrLegume = allIngs.some(id => {
            const ing = ingredientMap[id];
            return ing && (ing.category === 'verduras' || ing.category === 'milpa' || ing.category === 'leguminosas');
        });
        if (!hasVegOrLegume) return false;
    }

    return true;
});

console.log(`Filtered recipes: ${filteredRecipes.length}`);

filteredRecipes.forEach(recipe => {
    const allIngs = [
        ...(recipe.ingredientsRequired || []),
        ...(recipe.ingredientsOptional || [])
    ];
    
    const ingredients = allIngs.map(id => ingredientMap[id]).filter(Boolean);
    const isSweet = recipe.cravings && recipe.cravings.includes('dulce');

    const fiberIngs = ingredients.filter(ing => 
        ing.category === 'leguminosas' || 
        ['nopal', 'chayote', 'calabacita', 'espinaca', 'acelga', 'quelites', 'verdolaga'].includes(ing.id)
    );
    if (fiberIngs.length >= 2) recipe.profile.fiber = "muy alta";
    else if (fiberIngs.length === 1) recipe.profile.fiber = "alta";
    else recipe.profile.fiber = "media";
    
    const fatIngs = ingredients.filter(ing => 
        ['crema', 'manteca', 'chorizo', 'tocino', 'manteca_cerdo', 'queso_oaxaca', 'queso_chihuahua'].includes(ing.id)
    );
    if (fatIngs.length >= 2) recipe.profile.satFat = "alta";
    else if (fatIngs.length === 1) recipe.profile.satFat = "media";
    else recipe.profile.satFat = "baja";
    
    const proteinIngs = ingredients.filter(ing => 
        ing.category === 'proteinas' || ing.id === 'huevo'
    );
    const hasCereal = ingredients.some(ing => ing.category === 'cereales' || ing.category === 'milpa');
    const hasLegume = ingredients.some(ing => ing.category === 'leguminosas');
    
    if (proteinIngs.length > 0 || (hasCereal && hasLegume)) {
        recipe.profile.protein = "alta";
    } else {
        recipe.profile.protein = "media";
    }
    
    const vegCount = ingredients.filter(ing => ing.category === 'verduras' || ing.category === 'milpa').length;
    if (vegCount >= 3) recipe.profile.vegetableVolume = "muy alto";
    else if (vegCount >= 2) recipe.profile.vegetableVolume = "alto";
    else if (vegCount === 1) recipe.profile.vegetableVolume = "medio";
    else recipe.profile.vegetableVolume = "bajo";

    if (recipe.profile.satFat === 'alta' || (isSweet && recipe.profile.fiber !== 'alta')) {
        recipe.profile.energyDensity = "alta";
    } else if (recipe.profile.vegetableVolume === 'alto' || recipe.profile.vegetableVolume === 'muy alto') {
        recipe.profile.energyDensity = "baja";
    } else {
        recipe.profile.energyDensity = "media";
    }
});

const newContent = `/**
 * RECIPES – Milpa NiME
 * 
 * Base de datos de recetas optimizada para cocina mexicana cotidiana, 
 * enfocada en accesibilidad, nutrición (NiME) y productos de temporada.
 */

export const RECIPES = ${JSON.stringify(filteredRecipes, null, 4)};
`;
fs.writeFileSync(RECIPES_PATH, newContent);
console.log("Recipes cleaned and profiles recalculated.");

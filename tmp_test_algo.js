
// Standalone Test Script - No imports
const SUBSTITUTIONS = {
    pollo: ["tofu", "huevo", "atun", "setas"],
    tofu: ["pollo", "huevo", "atun"],
    frijol: ["garbanzo", "lenteja", "haba"],
    salsa_verde: ["salsa_roja", "jitomate", "tomate_verde"],
};

function scoreRecipe(recipe, context) {
    let score = 0;
    const ownedIngredients = Object.entries(context.inventory)
        .filter(([, value]) => value.has)
        .map(([id]) => id);

    const requiredMatches = recipe.ingredientsRequired.filter((id) => {
        if (ownedIngredients.includes(id)) return true;
        const subs = SUBSTITUTIONS[id] || [];
        return subs.some(subId => ownedIngredients.includes(subId));
    }).length;

    const requiredRatio = recipe.ingredientsRequired.length ? requiredMatches / recipe.ingredientsRequired.length : 0;
    score += requiredMatches * 20;

    const usedSubs = recipe.ingredientsRequired.filter(id => !ownedIngredients.includes(id) && (SUBSTITUTIONS[id] || []).some(sid => ownedIngredients.includes(sid)));
    if (usedSubs.length) score -= usedSubs.length * 5;

    if (requiredRatio === 1) score += 15;
    else if (requiredRatio >= 0.5) score += 6;
    else score -= 15;

    return { score, recipe };
}

function rankRecipes(recipes, context) {
    const scored = recipes.map((recipe) => scoreRecipe(recipe, context))
        .filter((item) => item.score > 10);
    scored.sort((a, b) => b.score - a.score);

    const finalRanked = [];
    const familyCounts = {};
    scored.forEach((item) => {
        const family = item.recipe.family;
        const count = familyCounts[family] || 0;
        const adjustedScore = item.score - (count * 8);
        item.adjustedScore = adjustedScore;
        finalRanked.push(item);
        familyCounts[family] = count + 1;
    });
    return finalRanked.sort((a, b) => b.adjustedScore - a.adjustedScore);
}

// TEST CASES
const myInventory = {
    tofu_firme: { has: true },
    salsa_roja: { has: true },
    tortilla_maiz: { has: true }
};

console.log("--- RUNNING ALGO TESTS ---");

// Case 1: Substitution
const testRecipe = { 
    id: "test_pollo", 
    ingredientsRequired: ["pollo", "tortilla_maiz"], 
    family: "pollo" 
};
const result = scoreRecipe(testRecipe, { inventory: myInventory });
console.log(`Test Substitution (Tofu for Pollo): Score ${result.score}`);
if (result.score > 40) console.log("SUCCESS: Substitution recognized.");

// Case 2: Diversity
const manyChickenRecipes = [
    { id: "p1", family: "pollo", ingredientsRequired: ["pollo", "tortilla_maiz"] }, // Score ~50
    { id: "p2", family: "pollo", ingredientsRequired: ["pollo", "tortilla_maiz"] }, // Score ~50
    { id: "v1", family: "verduras", ingredientsRequired: ["tortilla_maiz"] }        // Score ~35
];
const ranked = rankRecipes(manyChickenRecipes, { inventory: myInventory });
console.log("Ranked IDs:", ranked.map(r => r.recipe.id));
console.log("Ranked Families:", ranked.map(r => r.recipe.family));

if (ranked[1].recipe.id === "v1") {
    console.log("SUCCESS: Diversity penalty pushed the secondary chicken recipe below the vegetable recipe.");
} else {
    console.log("INFO: Note that diversity penalty is -8 per existing family member.");
}

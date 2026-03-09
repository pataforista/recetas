/**
 * Reprocess Text Utility
 * Este script automatiza la conversión del texto estructurado del recetario
 * a los objetos JavaScript requeridos por el PWA.
 */

const fs = require('fs');

function processText(inputText) {
    const lines = inputText.split('\n');
    const recipes = [];
    let currentCategory = '';

    lines.forEach(line => {
        // Detectar categorías (ej. 1. PLATOS CON NOPALES)
        if (/^\d+\. PLATOS CON/.test(line)) {
            currentCategory = line.match(/CON\s+(.*)\s+\(/)?.[1]?.toLowerCase() || 'general';
        }

        // Detectar recetas (ej. 1. Nopales a la vinagreta...)
        const recipeMatch = line.match(/^(\d+)\.\s+(.*)/);
        if (recipeMatch && !line.includes('PLATOS CON')) {
            const name = recipeMatch[2];
            const id = name.toLowerCase()
                .replace(/[^a-z0-9 ]/g, '')
                .replace(/\s+/g, '_');

            recipes.push({
                id,
                name,
                family: currentCategory,
                format: "plato", // Valor por defecto, ajustar manualmente
                description: "Receta nutricional basada en el enfoque NiME y Milpa.",
                ingredientsRequired: [currentCategory], // Asunción inicial
                ingredientsOptional: [],
                cravings: ["saludable", "casero"],
                timeMin: 25,
                effort: "bajo",
                mealType: "comida",
                lowFriction: true,
                profile: {
                    fiber: "alta",
                    protein: "media",
                    satFat: "baja",
                    glyLoad: "baja",
                    vegetableVolume: "alto",
                    energyDensity: "media"
                },
                mealPrep: { usesBases: [], leavesBases: [], derivatives: [] }
            });
        }
    });

    return recipes;
}

// Para usarlo: leer un archivo txt con el recetario y procesar.
// const text = fs.readFileSync('recetario.txt', 'utf8');
// console.log(JSON.stringify(processText(text), null, 2));

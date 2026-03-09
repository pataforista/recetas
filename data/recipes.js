export const RECIPES = [
    {
        id: "enfrijoladas_verdes_nopales",
        name: "Enfrijoladas verdes con nopales",
        family: "frijol",
        format: "tortilla",
        description: "Plato casero y reconfortante con base de frijol, tortilla de maíz y nopales.",
        ingredientsRequired: ["frijol", "tortilla_maiz"],
        ingredientsOptional: ["salsa_verde", "nopal", "queso_fresco", "cebolla", "cilantro"],
        cravings: ["casero", "calientito", "reconfortante", "antojo_mexicano"],
        timeMin: 20,
        effort: "bajo",
        mealType: "comida",
        lowFriction: true,
        seasonalBoostIngredients: ["nopal", "tomate_verde", "cilantro"],
        profile: {
            fiber: "alta",
            protein: "media",
            satFat: "baja",
            glyLoad: "media",
            vegetableVolume: "medio",
            energyDensity: "media"
        },
        mealPrep: {
            usesBases: ["frijoles_olla", "salsa_verde", "nopales_cocidos"],
            leavesBases: [],
            derivatives: ["tacos_frijol_nopal", "ensalada_tibia_frijol_nopal"]
        }
    },
    {
        id: "tacos_frijol_nopal",
        name: "Tacos de frijol con nopal",
        family: "frijol",
        format: "taco",
        description: "Muy rápidos, baratos y con excelente perfil de fibra.",
        ingredientsRequired: ["frijol", "tortilla_maiz"],
        ingredientsOptional: ["nopal", "queso_fresco", "cebolla", "cilantro", "limon"],
        cravings: ["rapido", "casero", "antojo_mexicano", "ligero"],
        timeMin: 15,
        effort: "bajo",
        mealType: "comida",
        lowFriction: true,
        seasonalBoostIngredients: ["nopal", "cilantro", "limon"],
        profile: {
            fiber: "alta",
            protein: "media",
            satFat: "baja",
            glyLoad: "media",
            vegetableVolume: "medio",
            energyDensity: "baja"
        },
        mealPrep: {
            usesBases: ["frijoles_olla", "nopales_cocidos"],
            leavesBases: [],
            derivatives: ["ensalada_tibia_frijol_nopal"]
        }
    },
    {
        id: "ensalada_tibia_frijol_nopal",
        name: "Ensalada tibia de frijol y nopal",
        family: "ensalada",
        format: "plato",
        description: "Útil cuando quieres algo más ligero sin perder saciedad.",
        ingredientsRequired: ["frijol", "nopal"],
        ingredientsOptional: ["cebolla", "cilantro", "limon", "aguacate", "jitomate"],
        cravings: ["ligero", "fresco", "saludable"],
        timeMin: 15,
        effort: "bajo",
        mealType: "comida",
        lowFriction: true,
        seasonalBoostIngredients: ["nopal", "jitomate", "cilantro"],
        profile: {
            fiber: "alta",
            protein: "media",
            satFat: "baja",
            glyLoad: "baja",
            vegetableVolume: "alto",
            energyDensity: "baja"
        },
        mealPrep: {
            usesBases: ["frijoles_olla", "nopales_cocidos"],
            leavesBases: [],
            derivatives: []
        }
    },
    {
        id: "pollo_salsa_verde_calabacita",
        name: "Pollo en salsa verde con calabacita",
        family: "pollo",
        format: "plato",
        description: "Buena mezcla de proteína magra, verdura y sabor mexicano.",
        ingredientsRequired: ["pollo"],
        ingredientsOptional: ["tomate_verde", "cebolla", "ajo", "cilantro", "chile_serrano", "calabacita"],
        cravings: ["casero", "calientito", "antojo_mexicano"],
        timeMin: 30,
        effort: "medio",
        mealType: "comida",
        lowFriction: false,
        seasonalBoostIngredients: ["tomate_verde", "cilantro", "calabacita"],
        profile: {
            fiber: "media",
            protein: "alta",
            satFat: "baja",
            glyLoad: "baja",
            vegetableVolume: "alto",
            energyDensity: "media"
        },
        mealPrep: {
            usesBases: ["salsa_verde", "pollo_deshebrado"],
            leavesBases: ["pollo_deshebrado"],
            derivatives: ["tacos_pollo_salsa_verde", "bowl_pollo_arroz_milpa"]
        }
    },
    {
        id: "tacos_pollo_salsa_verde",
        name: "Tacos de pollo en salsa verde",
        family: "pollo",
        format: "taco",
        description: "Una salida práctica para reutilizar pollo y salsa.",
        ingredientsRequired: ["pollo", "tortilla_maiz"],
        ingredientsOptional: ["tomate_verde", "cebolla", "cilantro", "limon"],
        cravings: ["rapido", "antojo_mexicano", "casero"],
        timeMin: 15,
        effort: "bajo",
        mealType: "comida",
        lowFriction: true,
        seasonalBoostIngredients: ["tomate_verde", "cilantro", "limon"],
        profile: {
            fiber: "media",
            protein: "alta",
            satFat: "baja",
            glyLoad: "media",
            vegetableVolume: "medio",
            energyDensity: "media"
        },
        mealPrep: {
            usesBases: ["pollo_deshebrado", "salsa_verde"],
            leavesBases: [],
            derivatives: []
        }
    },
    {
        id: "bowl_pollo_arroz_milpa",
        name: "Bowl de pollo, arroz integral y milpa",
        family: "pollo",
        format: "bowl",
        description: "Muy útil para comida corrida y meal prep de varios días.",
        ingredientsRequired: ["pollo", "arroz_integral"],
        ingredientsOptional: ["calabacita", "chayote", "elote", "cebolla", "chile_poblano"],
        cravings: ["llenador", "mealprep", "casero"],
        timeMin: 35,
        effort: "medio",
        mealType: "comida",
        lowFriction: false,
        seasonalBoostIngredients: ["calabacita", "chayote", "elote", "chile_poblano"],
        profile: {
            fiber: "media",
            protein: "alta",
            satFat: "baja",
            glyLoad: "media",
            vegetableVolume: "alto",
            energyDensity: "media"
        },
        mealPrep: {
            usesBases: ["pollo_deshebrado", "verduras_milpa_asadas"],
            leavesBases: ["arroz_integral"],
            derivatives: []
        }
    },
    {
        id: "pasta_integral_milpa_atun",
        name: "Pasta integral con verduras de la milpa y atún",
        family: "atun",
        format: "pasta",
        description: "Solución práctica y con mejor perfil que una pasta convencional pesada.",
        ingredientsRequired: ["atun"],
        ingredientsOptional: ["pasta_integral", "pasta_garbanzo", "calabacita", "jitomate", "cebolla", "ajo"],
        cravings: ["rapido", "llenador", "casero"],
        timeMin: 25,
        effort: "bajo",
        mealType: "comida",
        lowFriction: true,
        seasonalBoostIngredients: ["calabacita", "jitomate"],
        profile: {
            fiber: "media",
            protein: "alta",
            satFat: "baja",
            glyLoad: "media",
            vegetableVolume: "medio",
            energyDensity: "media"
        },
        mealPrep: {
            usesBases: ["verduras_milpa_asadas"],
            leavesBases: [],
            derivatives: []
        }
    },
    {
        id: "salmon_nopal_calabacita",
        name: "Salmón con nopal y calabacita",
        family: "salmon",
        format: "plato",
        description: "Más favorable cuando quieres priorizar perfil lipídico y saciedad limpia.",
        ingredientsRequired: ["salmon"],
        ingredientsOptional: ["nopal", "calabacita", "cebolla", "ajo", "limon"],
        cravings: ["ligero", "saludable", "calientito"],
        timeMin: 25,
        effort: "medio",
        mealType: "comida",
        lowFriction: false,
        seasonalBoostIngredients: ["nopal", "calabacita", "limon"],
        profile: {
            fiber: "media",
            protein: "alta",
            satFat: "baja",
            glyLoad: "baja",
            vegetableVolume: "alto",
            energyDensity: "media"
        },
        mealPrep: {
            usesBases: ["verduras_milpa_asadas"],
            leavesBases: [],
            derivatives: []
        }
    },
    {
        id: "sopa_frijol_verduras",
        name: "Sopa de frijol con verduras",
        family: "frijol",
        format: "sopa",
        description: "Muy buena para saciedad, control de porción y aprovechamiento.",
        ingredientsRequired: ["frijol"],
        ingredientsOptional: ["zanahoria", "chayote", "cebolla", "ajo", "epazote"],
        cravings: ["calientito", "reconfortante", "ligero"],
        timeMin: 30,
        effort: "bajo",
        mealType: "comida",
        lowFriction: true,
        seasonalBoostIngredients: ["chayote", "zanahoria"],
        profile: {
            fiber: "alta",
            protein: "media",
            satFat: "baja",
            glyLoad: "baja",
            vegetableVolume: "alto",
            energyDensity: "baja"
        },
        mealPrep: {
            usesBases: ["frijoles_olla"],
            leavesBases: [],
            derivatives: []
        }
    },
    {
        id: "quesadillas_nopal_panela",
        name: "Quesadillas de nopal y panela",
        family: "queso",
        format: "tortilla",
        description: "Antojo práctico que conviene mantener en porción moderada.",
        ingredientsRequired: ["tortilla_maiz"],
        ingredientsOptional: ["nopal", "panela", "cebolla", "salsa_verde"],
        cravings: ["antojo_mexicano", "rapido", "reconfortante"],
        timeMin: 15,
        effort: "bajo",
        mealType: "cena",
        lowFriction: true,
        seasonalBoostIngredients: ["nopal"],
        profile: {
            fiber: "media",
            protein: "media",
            satFat: "media",
            glyLoad: "media",
            vegetableVolume: "medio",
            energyDensity: "media"
        },
        mealPrep: {
            usesBases: ["nopales_cocidos", "salsa_verde"],
            leavesBases: [],
            derivatives: []
        }
    }
];

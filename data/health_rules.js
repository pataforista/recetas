export const HEALTH_RULES = {
    goals: {
        weight: "Favorecer platos con alta saciedad, volumen vegetal y energía moderada.",
        triglycerides: "Penalizar azúcares añadidos y exceso de refinados; favorecer fibra y leguminosas.",
        cholesterol: "Favorecer proteína magra y pescado; penalizar exceso de crema/queso/grasa saturada.",
        glucose: "Favorecer fibra, leguminosas y mejor balance de carbohidratos."
    },
    scoringBonuses: {
        highFiber: 12,
        lowSatFat: 10,
        highVegetableVolume: 10,
        goodProtein: 8,
        seasonal: 5,
        mealPrepValue: 6
    },
    scoringPenalties: {
        highSatFat: -10,
        lowFiber: -8,
        highGlyLoad: -8,
        highEnergyDensity: -6
    },
    labels: {
        fibra: {
            alta: "Alta fibra",
            media: "Fibra media",
            baja: "Fibra baja"
        },
        grasaSaturada: {
            baja: "Baja en grasa saturada",
            media: "Grasa saturada moderada",
            alta: "Alta en grasa saturada"
        },
        cargaGlucemica: {
            baja: "Carga glucémica baja",
            media: "Carga glucémica media",
            alta: "Carga glucémica alta"
        }
    }
};

export const MEALPREP_BASES = [
    {
        id: "frijoles_olla",
        name: "Frijoles de olla",
        ingredients: ["frijol", "cebolla", "ajo", "epazote"],
        derivatives: [
            "enfrijoladas_verdes_nopales",
            "tacos_frijol_nopal",
            "ensalada_tibia_frijol_nopal",
            "sopa_frijol_verduras"
        ]
    },
    {
        id: "nopales_cocidos",
        name: "Nopales cocidos",
        ingredients: ["nopal", "cebolla"],
        derivatives: [
            "tacos_frijol_nopal",
            "enfrijoladas_verdes_nopales",
            "ensalada_tibia_frijol_nopal"
        ]
    },
    {
        id: "salsa_verde",
        name: "Salsa verde",
        ingredients: ["tomate_verde", "cebolla", "ajo", "cilantro", "chile_serrano"],
        derivatives: [
            "enfrijoladas_verdes_nopales",
            "pollo_salsa_verde_calabacita",
            "tacos_pollo_salsa_verde"
        ]
    },
    {
        id: "pollo_deshebrado",
        name: "Pollo deshebrado",
        ingredients: ["pollo"],
        derivatives: [
            "pollo_salsa_verde_calabacita",
            "tacos_pollo_salsa_verde",
            "bowl_pollo_arroz_milpa"
        ]
    },
    {
        id: "verduras_milpa_asadas",
        name: "Verduras de la milpa asadas",
        ingredients: ["calabacita", "chayote", "cebolla", "chile_poblano"],
        derivatives: [
            "bowl_pollo_arroz_milpa",
            "pasta_integral_milpa_atun",
            "salmon_nopal_calabacita"
        ]
    }
];

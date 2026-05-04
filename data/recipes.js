/**
 * RECIPES – Milpa NiME
 * 
 * Base de datos de recetas optimizada para cocina mexicana cotidiana, 
 * enfocada en accesibilidad, nutrición (NiME) y productos de temporada.
 */

export const RECIPES = [
    {
        "id": "enfrijoladas_verdes_nopales",
        "name": "Enfrijoladas verdes con nopales",
        "family": "frijol",
        "format": "tortilla",
        "description": "Plato casero y reconfortante con base de frijol, tortilla de maíz y nopales.",
        "ingredientsRequired": [
            "frijol",
            "tortilla_maiz"
        ],
        "ingredientsOptional": [
            "salsa_verde",
            "nopal",
            "queso_fresco",
            "cebolla",
            "cilantro"
        ],
        "cravings": [
            "casero",
            "calientito",
            "reconfortante",
            "antojo_mexicano",
            "picante"
        ],
        "timeMin": 20,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
        "seasonalBoostIngredients": [
            "nopal",
            "tomate_verde",
            "cilantro"
        ],
        "profile": {
            "fiber": "alta",
            "protein": "media",
            "satFat": "baja",
            "glyLoad": "media",
            "vegetableVolume": "muy alto",
            "energyDensity": "baja"
        },
        "mealPrep": {
            "usesBases": [
                "frijoles_olla",
                "salsa_verde",
                "nopales_cocidos"
            ],
            "leavesBases": [],
            "derivatives": [
                "tacos_frijol_nopal",
                "ensalada_tibia_frijol_nopal"
            ]
        }
    },
    {
        "id": "nopales_vinagreta_atun",
        "name": "Nopales a la vinagreta con atún fresco cocido",
        "family": "nopal",
        "format": "plato",
        "description": "Nopales asados, vinagre casero y atún desmenuzado. Alto en fibra y proteína magra.",
        "ingredientsRequired": [
            "nopal",
            "atun_fresco"
        ],
        "ingredientsOptional": [
            "cebolla",
            "cilantro",
            "limon"
        ],
        "cravings": [
            "ligero",
            "saludable",
            "fresco",
            "fria"
        ],
        "timeMin": 20,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
        "seasonalBoostIngredients": [
            "nopal",
            "cilantro",
            "limon"
        ],
        "profile": {
            "fiber": "alta",
            "protein": "alta",
            "satFat": "baja",
            "glyLoad": "baja",
            "vegetableVolume": "alto",
            "energyDensity": "baja"
        },
        "mealPrep": {
            "usesBases": [
                "nopales_cocidos"
            ],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "ensalada_tibia_nopales_frijol_queso",
        "name": "Ensalada tibia de nopales, frijol negro y queso fresco",
        "family": "frijol",
        "format": "lechuga",
        "description": "Nopales cocidos, frijol de olla y queso freso. Equilibrio NiME perfecto.",
        "ingredientsRequired": [
            "nopal",
            "frijol",
            "queso_fresco"
        ],
        "ingredientsOptional": [
            "cebolla",
            "cilantro",
            "limon"
        ],
        "cravings": [
            "ligero",
            "fresco",
            "saludable"
        ],
        "timeMin": 15,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
        "profile": {
            "fiber": "alta",
            "protein": "media",
            "satFat": "baja",
            "glyLoad": "baja",
            "vegetableVolume": "muy alto",
            "energyDensity": "baja"
        },
        "mealPrep": {
            "usesBases": [
                "frijoles_olla",
                "nopales_cocidos"
            ],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "sopa_nopales_pollo_maiz",
        "name": "Sopa de nopales con pollo y maíz",
        "family": "pollo",
        "format": "sopa",
        "description": "Caldo casero nutritivo con elote desgranado y pechuga de pollo.",
        "ingredientsRequired": [
            "pollo",
            "nopal",
            "elote"
        ],
        "ingredientsOptional": [
            "ajo",
            "cebolla",
            "cilantro"
        ],
        "cravings": [
            "calientito",
            "reconfortante",
            "casero",
            "caldosa"
        ],
        "timeMin": 30,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
        "profile": {
            "fiber": "alta",
            "protein": "alta",
            "satFat": "baja",
            "glyLoad": "media",
            "vegetableVolume": "muy alto",
            "energyDensity": "baja"
        },
        "mealPrep": {
            "usesBases": [
                "pollo_deshebrado",
                "nopales_cocidos"
            ],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "caldo_res_nopales_verduras",
        "name": "Caldo de res con nopales y verduras",
        "family": "res",
        "format": "plato",
        "description": "Carne de res magra, caldo lento, chayote, calabaza y abundantes nopales.",
        "ingredientsRequired": [
            "res_magra",
            "nopal"
        ],
        "ingredientsOptional": [
            "chayote",
            "calabacita",
            "jitomate",
            "cilantro"
        ],
        "cravings": [
            "casero",
            "llenador",
            "calientito",
            "caldosa"
        ],
        "timeMin": 60,
        "effort": "medio",
        "mealType": "comida",
        "lowFriction": false,
        "profile": {
            "fiber": "muy alta",
            "protein": "alta",
            "satFat": "baja",
            "glyLoad": "baja",
            "vegetableVolume": "muy alto",
            "energyDensity": "baja"
        },
        "mealPrep": {
            "usesBases": [
                "nopales_cocidos"
            ],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "spaghetti_nopales_jengibre_tomate",
        "name": "Spaghetti de nopales con salsa de jengibre-tomate",
        "family": "nopal",
        "format": "pasta",
        "description": "Nopales en tiras finas como pasta, salsa de tomate fresco y jengibre rallado.",
        "ingredientsRequired": [
            "nopal",
            "jitomate",
            "jengibre"
        ],
        "ingredientsOptional": [
            "ajo",
            "cilantro"
        ],
        "cravings": [
            "ligero",
            "saludable",
            "fresco"
        ],
        "timeMin": 20,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
        "profile": {
            "fiber": "alta",
            "protein": "media",
            "satFat": "baja",
            "glyLoad": "baja",
            "vegetableVolume": "alto",
            "energyDensity": "baja"
        },
        "mealPrep": {
            "usesBases": [
                "nopales_cocidos"
            ],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "frijoles_charros_atun",
        "name": "Frijoles charros con atún",
        "family": "frijol",
        "format": "plato",
        "description": "Frijol pinto, jalapeño y atún fresco para una proteína completa y fibra.",
        "ingredientsRequired": [
            "frijol",
            "atun_fresco"
        ],
        "ingredientsOptional": [
            "cebolla",
            "chile_serrano",
            "jitomate",
            "cilantro"
        ],
        "cravings": [
            "llenador",
            "casero",
            "antojo_mexicano"
        ],
        "timeMin": 30,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
        "profile": {
            "fiber": "media",
            "protein": "alta",
            "satFat": "baja",
            "glyLoad": "media",
            "vegetableVolume": "muy alto",
            "energyDensity": "baja"
        },
        "mealPrep": {
            "usesBases": [
                "frijoles_olla"
            ],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "pan_frances_nime",
        "name": "Pan Francés NiME",
        "family": "desayuno",
        "format": "plato",
        "description": "Clásico desayuno con pan de caja integral, huevo y canela. Endulzado naturalmente.",
        "ingredientsRequired": [
            "pan_caja",
            "huevo",
            "leche",
            "canela_molida"
        ],
        "ingredientsOptional": [
            "vainilla",
            "platano_dulce",
            "miel_maple"
        ],
        "cravings": [
            "dulce",
            "casero",
            "reconfortante"
        ],
        "timeMin": 15,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
        "profile": {
            "fiber": "media",
            "protein": "alta",
            "satFat": "baja",
            "glyLoad": "media",
            "vegetableVolume": "bajo",
            "energyDensity": "alta"
        },
        "mealPrep": {
            "usesBases": [],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "milanesa_pollo_nime",
        "name": "Milanesa de Pollo al Horno",
        "family": "pollo",
        "format": "plato",
        "description": "Pechuga de pollo empanizada y horneada para evitar frituras. Crujiente y saludable.",
        "ingredientsRequired": [
            "pollo",
            "pan_molido",
            "huevo"
        ],
        "ingredientsOptional": [
            "lechuga",
            "limon"
        ],
        "cravings": [
            "crujiente",
            "casero",
            "llenador"
        ],
        "timeMin": 30,
        "effort": "medio",
        "mealType": "comida",
        "lowFriction": false,
        "profile": {
            "fiber": "media",
            "protein": "alta",
            "satFat": "baja",
            "glyLoad": "media",
            "vegetableVolume": "medio",
            "energyDensity": "media"
        },
        "mealPrep": {
            "usesBases": [],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "enmoladas_nime",
        "name": "Enmoladas (Enchiladas de Mole)",
        "family": "pollo",
        "format": "tortilla",
        "description": "Tortillas rellenas de pollo deshebrado bañadas en mole negro artesanal.",
        "ingredientsRequired": [
            "tortilla_maiz",
            "pollo_deshebrado",
            "mole_negro"
        ],
        "ingredientsOptional": [
            "queso_fresco",
            "cebolla",
            "ajonjoli"
        ],
        "cravings": [
            "antojo_mexicano",
            "reconfortante",
            "picante"
        ],
        "timeMin": 25,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
        "profile": {
            "fiber": "media",
            "protein": "alta",
            "satFat": "baja",
            "glyLoad": "alta",
            "vegetableVolume": "alto",
            "energyDensity": "baja"
        },
        "mealPrep": {
            "usesBases": [
                "pollo_deshebrado"
            ],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "tacos_dorados_pollo",
        "name": "Tacos Dorados de Pollo",
        "family": "pollo",
        "format": "taco",
        "description": "Tacos de pollo deshebrado, horneados o en air fryer para un toque crujiente sin grasa.",
        "ingredientsRequired": [
            "tortilla_maiz",
            "pollo_deshebrado"
        ],
        "ingredientsOptional": [
            "lechuga",
            "crema",
            "salsa_roja",
            "queso_fresco"
        ],
        "cravings": [
            "crujiente",
            "casero",
            "antojo_mexicano"
        ],
        "timeMin": 25,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
        "profile": {
            "fiber": "media",
            "protein": "alta",
            "satFat": "media",
            "glyLoad": "media",
            "vegetableVolume": "alto",
            "energyDensity": "baja"
        },
        "mealPrep": {
            "usesBases": [
                "pollo_deshebrado"
            ],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "quesadillas_milpa",
        "name": "Quesadillas de la Milpa",
        "family": "queso",
        "format": "tortilla",
        "description": "Quesadillas con queso Oaxaca, flor de calabaza y champiñones. Pura esencia de la milpa.",
        "ingredientsRequired": [
            "tortilla_maiz",
            "queso_oaxaca",
            "flor_calabaza",
            "hongo"
        ],
        "ingredientsOptional": [
            "epazote",
            "salsa_verde"
        ],
        "cravings": [
            "ligero",
            "casero",
            "antojo_mexicano"
        ],
        "timeMin": 15,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
        "profile": {
            "fiber": "media",
            "protein": "media",
            "satFat": "media",
            "glyLoad": "baja",
            "vegetableVolume": "muy alto",
            "energyDensity": "baja"
        },
        "mealPrep": {
            "usesBases": [],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "marry_me_chicken_nime",
        "name": "Marry Me Chicken NiME",
        "family": "pollo",
        "format": "plato",
        "description": "Pollo en salsa cremosa de jitomate deshidratado y albahaca. Versión ligera con yogurt.",
        "ingredientsRequired": [
            "pollo",
            "jitomate",
            "yogurt_natural",
            "albahaca",
            "ajo"
        ],
        "ingredientsOptional": [
            "pasta_seca",
            "parmesano"
        ],
        "cravings": [
            "cremoso",
            "elegante",
            "sabroso"
        ],
        "timeMin": 30,
        "effort": "medio",
        "mealType": "comida",
        "lowFriction": true,
        "profile": {
            "fiber": "media",
            "protein": "alta",
            "satFat": "baja",
            "glyLoad": "baja",
            "vegetableVolume": "medio",
            "energyDensity": "media"
        },
        "mealPrep": {
            "usesBases": [],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "pancakes_clasicos_nime",
        "name": "Pancakes de Avena y Plátano",
        "family": "desayuno",
        "format": "plato",
        "description": "Pancakes saludables sin harina procesada. Solo avena, plátano y huevo.",
        "ingredientsRequired": [
            "avena",
            "platano_dulce",
            "huevo"
        ],
        "ingredientsOptional": [
            "vainilla",
            "canela_molida",
            "platano_dulce"
        ],
        "cravings": [
            "dulce",
            "saludable",
            "rapido"
        ],
        "timeMin": 15,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
        "profile": {
            "fiber": "media",
            "protein": "alta",
            "satFat": "baja",
            "glyLoad": "media",
            "vegetableVolume": "bajo",
            "energyDensity": "alta"
        },
        "mealPrep": {
            "usesBases": [],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "shakshuka_milpa_nime",
        "name": "Shakshuka de la Milpa",
        "family": "huevo",
        "format": "plato",
        "description": "Huevos pochados en salsa de jitomate y chiles, con un toque de calabacita y epazote.",
        "ingredientsRequired": [
            "huevo",
            "jitomate",
            "cebolla",
            "calabacita",
            "epazote"
        ],
        "ingredientsOptional": [
            "chile_serrano",
            "queso_fresco"
        ],
        "cravings": [
            "calientito",
            "saludable",
            "fresco"
        ],
        "timeMin": 25,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
        "profile": {
            "fiber": "alta",
            "protein": "alta",
            "satFat": "baja",
            "glyLoad": "baja",
            "vegetableVolume": "muy alto",
            "energyDensity": "baja"
        },
        "mealPrep": {
            "usesBases": [],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "pizza_margherita_tortilla",
        "name": "Pizza Margherita en Tortilla de Harina",
        "family": "basicos",
        "format": "plato",
        "description": "Pizza ultrarrápida con base de tortilla de harina, jitomate fresco y queso Oaxaca.",
        "ingredientsRequired": [
            "tortilla_harina",
            "jitomate",
            "queso_oaxaca",
            "albahaca"
        ],
        "ingredientsOptional": [
            "ajo",
            "aceite_oliva"
        ],
        "cravings": [
            "rapido",
            "italiano",
            "ligero"
        ],
        "timeMin": 10,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
        "profile": {
            "fiber": "media",
            "protein": "media",
            "satFat": "media",
            "glyLoad": "media",
            "vegetableVolume": "medio",
            "energyDensity": "media"
        },
        "mealPrep": {
            "usesBases": [],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "classic_burger_nime",
        "name": "Hamburguesa de Res Magra NiME",
        "family": "res",
        "format": "plato",
        "description": "Hamburguesa casera con carne magra, mucho vegetal y pan integral.",
        "ingredientsRequired": [
            "res_molida",
            "pan_integral",
            "lechuga",
            "jitomate",
            "cebolla"
        ],
        "ingredientsOptional": [
            "queso_manchego",
            "chile_jalapeño"
        ],
        "cravings": [
            "llenador",
            "divertido",
            "casero"
        ],
        "timeMin": 25,
        "effort": "medio",
        "mealType": "comida",
        "lowFriction": true,
        "profile": {
            "fiber": "media",
            "protein": "alta",
            "satFat": "baja",
            "glyLoad": "media",
            "vegetableVolume": "muy alto",
            "energyDensity": "baja"
        },
        "mealPrep": {
            "usesBases": [],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "ramen_express_nime",
        "name": "Ramen Express de Pollo y Nopal",
        "family": "pollo",
        "format": "sopa",
        "description": "Sopa de fideos rápida con caldo de pollo, pollo deshebrado y tiras de nopal.",
        "ingredientsRequired": [
            "ramen",
            "caldo_pollo",
            "pollo_deshebrado",
            "nopal"
        ],
        "ingredientsOptional": [
            "huevo",
            "cebollin"
        ],
        "cravings": [
            "caldosa",
            "rapido",
            "calientito"
        ],
        "timeMin": 15,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
        "profile": {
            "fiber": "alta",
            "protein": "alta",
            "satFat": "baja",
            "glyLoad": "media",
            "vegetableVolume": "medio",
            "energyDensity": "media"
        },
        "mealPrep": {
            "usesBases": [
                "pollo_deshebrado"
            ],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "spaghetti_bolognese_nime",
        "name": "Spaghetti Bolognese NiME",
        "family": "res",
        "format": "pasta",
        "description": "Salsa ragú de res molida y tomate sobre pasta integral. Alta fibra y proteína.",
        "ingredientsRequired": [
            "pasta_integral",
            "res_molida",
            "jitomate",
            "cebolla",
            "ajo"
        ],
        "ingredientsOptional": [
            "zanahoria",
            "parmesano"
        ],
        "cravings": [
            "reconfortante",
            "llenador",
            "italiano"
        ],
        "timeMin": 35,
        "effort": "medio",
        "mealType": "comida",
        "lowFriction": false,
        "profile": {
            "fiber": "media",
            "protein": "alta",
            "satFat": "baja",
            "glyLoad": "media",
            "vegetableVolume": "muy alto",
            "energyDensity": "baja"
        },
        "mealPrep": {
            "usesBases": [],
            "leavesBases": [
                "bolognese_base"
            ],
            "derivatives": [
                "lasagna_nime"
            ]
        }
    },
    {
        "id": "lasagna_nime",
        "name": "Lasagna de Verduras y Res",
        "family": "res",
        "format": "plato",
        "description": "Capas de pasta, res molida, calabacita y queso. Usamos menos pasta y más vegetales.",
        "ingredientsRequired": [
            "pasta_seca",
            "res_molida",
            "queso_oaxaca",
            "calabacita",
            "jitomate"
        ],
        "ingredientsOptional": [
            "espinaca",
            "champiñon"
        ],
        "cravings": [
            "reconfortante",
            "familia",
            "llenador"
        ],
        "timeMin": 60,
        "effort": "alto",
        "mealType": "comida",
        "lowFriction": false,
        "profile": {
            "fiber": "muy alta",
            "protein": "alta",
            "satFat": "media",
            "glyLoad": "media",
            "vegetableVolume": "muy alto",
            "energyDensity": "baja"
        },
        "mealPrep": {
            "usesBases": [
                "bolognese_base"
            ],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "pad_thai_home_nime",
        "name": "Pad Thai Casero NiME",
        "family": "pollo",
        "format": "plato",
        "description": "Fideos de arroz con pollo, cacahuate y limón. Sabor tailandés con ingredientes locales.",
        "ingredientsRequired": [
            "pasta_seca",
            "pollo",
            "cacahuate",
            "limon",
            "cebolla"
        ],
        "ingredientsOptional": [
            "huevo",
            "cilantro",
            "chile_seco_molido"
        ],
        "cravings": [
            "exotico",
            "sabroso",
            "fresco"
        ],
        "timeMin": 30,
        "effort": "medio",
        "mealType": "comida",
        "lowFriction": true,
        "profile": {
            "fiber": "media",
            "protein": "alta",
            "satFat": "baja",
            "glyLoad": "media",
            "vegetableVolume": "medio",
            "energyDensity": "media"
        },
        "mealPrep": {
            "usesBases": [],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "pho_home_nime",
        "name": "Pho (Sopa Vietnamita) Casero",
        "family": "res",
        "format": "sopa",
        "description": "Caldo aromático de res con fideos, hierbabuena y limón. Reparador y ligero.",
        "ingredientsRequired": [
            "caldo_res",
            "res_magra",
            "pasta_seca",
            "hierba_buena",
            "limon"
        ],
        "ingredientsOptional": [
            "jengibre",
            "cebolla",
            "cilantro"
        ],
        "cravings": [
            "caldosa",
            "ligero",
            "reconfortante"
        ],
        "timeMin": 40,
        "effort": "medio",
        "mealType": "comida",
        "lowFriction": true,
        "profile": {
            "fiber": "media",
            "protein": "alta",
            "satFat": "baja",
            "glyLoad": "media",
            "vegetableVolume": "medio",
            "energyDensity": "media"
        },
        "mealPrep": {
            "usesBases": [],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "ensalada_caesar_pollo_nime",
        "name": "Ensalada Caesar con Pollo Grill",
        "family": "pollo",
        "format": "lechuga",
        "description": "Lechuga orejona, pechuga a la plancha y aderezo de yogurt y anchos. Crujiente y fresca.",
        "ingredientsRequired": [
            "lechuga",
            "pollo",
            "yogurt_natural",
            "ajo",
            "anchoa"
        ],
        "ingredientsOptional": [
            "parmesano",
            "pan_caja"
        ],
        "cravings": [
            "fresco",
            "ligero",
            "saludable"
        ],
        "timeMin": 20,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
        "profile": {
            "fiber": "media",
            "protein": "alta",
            "satFat": "baja",
            "glyLoad": "baja",
            "vegetableVolume": "medio",
            "energyDensity": "media"
        },
        "mealPrep": {
            "usesBases": [],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "beef_stew_goulash_nime",
        "name": "Goulash de Res (Estofado)",
        "family": "res",
        "format": "plato",
        "description": "Carne de res cocida lentamente con pimentón y verduras. Gran sabor y nutrición.",
        "ingredientsRequired": [
            "res_magra",
            "papa",
            "zanahoria",
            "cebolla",
            "pimenton"
        ],
        "ingredientsOptional": [
            "jitomate",
            "ajo"
        ],
        "cravings": [
            "calientito",
            "llenador",
            "casero"
        ],
        "timeMin": 90,
        "effort": "medio",
        "mealType": "comida",
        "lowFriction": false,
        "profile": {
            "fiber": "media",
            "protein": "alta",
            "satFat": "baja",
            "glyLoad": "media",
            "vegetableVolume": "muy alto",
            "energyDensity": "baja"
        },
        "mealPrep": {
            "usesBases": [],
            "leavesBases": [
                "stew_base"
            ],
            "derivatives": []
        }
    },
    {
        "id": "frijoles_jengibre_ajo_asado",
        "name": "Frijoles con jengibre y ajo asado",
        "family": "frijol",
        "format": "plato",
        "description": "Sabor profundo y antiinflamatorio con ajo asado dulce y jengibre.",
        "ingredientsRequired": [
            "frijol",
            "jengibre",
            "ajo"
        ],
        "ingredientsOptional": [
            "cebolla"
        ],
        "cravings": [
            "reconfortante",
            "saludable"
        ],
        "timeMin": 25,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
        "profile": {
            "fiber": "media",
            "protein": "media",
            "satFat": "baja",
            "glyLoad": "baja",
            "vegetableVolume": "alto",
            "energyDensity": "baja"
        },
        "mealPrep": {
            "usesBases": [
                "frijoles_olla"
            ],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "chiles_poblanos_queso_nopales",
        "name": "Chiles poblanos rellenos de queso y nopales",
        "family": "queso",
        "format": "plato",
        "description": "Poblano asado relleno de queso fresco y nopales. Sin fritura.",
        "ingredientsRequired": [
            "chile_poblano",
            "queso_fresco",
            "nopal"
        ],
        "ingredientsOptional": [
            "ajo",
            "cebolla"
        ],
        "cravings": [
            "antojo_mexicano",
            "casero",
            "saludable",
            "picante"
        ],
        "timeMin": 35,
        "effort": "medio",
        "mealType": "comida",
        "lowFriction": false,
        "profile": {
            "fiber": "alta",
            "protein": "media",
            "satFat": "baja",
            "glyLoad": "baja",
            "vegetableVolume": "muy alto",
            "energyDensity": "baja"
        },
        "mealPrep": {
            "usesBases": [
                "nopales_cocidos"
            ],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "papadzules_nime",
        "name": "Papadzules",
        "family": "huevo",
        "format": "tortilla",
        "description": "Tortilla rellena de huevo cocido, salsa de pepita de calabaza y queso.",
        "ingredientsRequired": [
            "tortilla_maiz",
            "huevo",
            "pepita_calabaza"
        ],
        "ingredientsOptional": [
            "queso_fresco"
        ],
        "cravings": [
            "antojo_mexicano",
            "casero",
            "llenador"
        ],
        "timeMin": 40,
        "effort": "medio",
        "mealType": "comida",
        "lowFriction": false,
        "profile": {
            "fiber": "media",
            "protein": "alta",
            "satFat": "baja",
            "glyLoad": "media",
            "vegetableVolume": "medio",
            "energyDensity": "media"
        },
        "mealPrep": {
            "usesBases": [],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "atun_parrilla_jengibre_tomate",
        "name": "Atún a la parrilla con salsa de jengibre-tomate",
        "family": "atun",
        "format": "plato",
        "description": "Filete de atún con salsa fresca de tomate y jengibre rallado.",
        "ingredientsRequired": [
            "atun_fresco",
            "jitomate",
            "jengibre"
        ],
        "ingredientsOptional": [
            "ajo",
            "cilantro"
        ],
        "cravings": [
            "saludable",
            "calientito",
            "fresco"
        ],
        "timeMin": 20,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
        "profile": {
            "fiber": "media",
            "protein": "alta",
            "satFat": "baja",
            "glyLoad": "baja",
            "vegetableVolume": "medio",
            "energyDensity": "media"
        },
        "mealPrep": {
            "usesBases": [],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "sushi_roll_masa_maiz",
        "name": "Sushi roll sin arroz (con pasta de maíz)",
        "family": "atun",
        "format": "bowl",
        "description": "Adaptación creativa con base de masa, atún cocido, nopales y aguacate.",
        "ingredientsRequired": [
            "masa_maiz",
            "atun_fresco",
            "nopal"
        ],
        "ingredientsOptional": [
            "aguacate",
            "jengibre"
        ],
        "cravings": [
            "ligero",
            "fresco",
            "saludable"
        ],
        "timeMin": 30,
        "effort": "medio",
        "mealType": "comida",
        "lowFriction": false,
        "profile": {
            "fiber": "alta",
            "protein": "alta",
            "satFat": "baja",
            "glyLoad": "media",
            "vegetableVolume": "alto",
            "energyDensity": "baja"
        },
        "mealPrep": {
            "usesBases": [
                "nopales_cocidos"
            ],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "pollo_jengibre_chino_mexicano",
        "name": "Pollo al jengibre estilo chino-mexicano",
        "family": "pollo",
        "format": "plato",
        "description": "Pollo con jengibre abundante, ajo y cilantro fresco.",
        "ingredientsRequired": [
            "pollo",
            "jengibre"
        ],
        "ingredientsOptional": [
            "ajo",
            "cebolla",
            "cilantro"
        ],
        "cravings": [
            "casero",
            "saludable",
            "calientito"
        ],
        "timeMin": 25,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
        "profile": {
            "fiber": "media",
            "protein": "alta",
            "satFat": "baja",
            "glyLoad": "baja",
            "vegetableVolume": "medio",
            "energyDensity": "media"
        },
        "mealPrep": {
            "usesBases": [
                "pollo_deshebrado"
            ],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "enchiladas_rajas_queso",
        "name": "Enchiladas de rajas con queso",
        "family": "frijol",
        "format": "tortilla",
        "description": "Tortilla rellena de queso y rajas, bañada en salsa de frijol.",
        "ingredientsRequired": [
            "tortilla_maiz",
            "queso_fresco",
            "chile_poblano"
        ],
        "ingredientsOptional": [
            "frijol",
            "epazote"
        ],
        "cravings": [
            "antojo_mexicano",
            "casero",
            "reconfortante",
            "picante"
        ],
        "timeMin": 25,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
        "profile": {
            "fiber": "media",
            "protein": "media",
            "satFat": "baja",
            "glyLoad": "media",
            "vegetableVolume": "muy alto",
            "energyDensity": "baja"
        },
        "mealPrep": {
            "usesBases": [
                "frijoles_olla"
            ],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "tostones_platano_verde_frijoles",
        "name": "Tostones de plátano verde con frijoles",
        "family": "frijol",
        "format": "plato",
        "description": "Plátano verde (almidón resistente) con frijoles refritos y queso.",
        "ingredientsRequired": [
            "platano_verde",
            "frijol"
        ],
        "ingredientsOptional": [
            "queso_fresco",
            "salsa_verde"
        ],
        "cravings": [
            "llenador",
            "casero",
            "saludable"
        ],
        "timeMin": 30,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
        "profile": {
            "fiber": "media",
            "protein": "media",
            "satFat": "baja",
            "glyLoad": "baja",
            "vegetableVolume": "alto",
            "energyDensity": "baja"
        },
        "mealPrep": {
            "usesBases": [
                "frijoles_olla"
            ],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "tlacoyos_garbanzo_hongos",
        "name": "Tlacoyos de Garbanzo y Hongos",
        "family": "frijol",
        "format": "antojito",
        "description": "Masa nixtamalizada rellena de garbanzo con topping de champiñones. Alta en fibra prebiótica.",
        "ingredientsRequired": [
            "masa_maiz",
            "lenteja",
            "hongo",
            "cebolla",
            "ajo"
        ],
        "ingredientsOptional": [
            "epazote",
            "salsa_verde",
            "queso_fresco"
        ],
        "cravings": [
            "mexicano",
            "callejero",
            "saludable"
        ],
        "timeMin": 40,
        "effort": "medio",
        "mealType": "comida",
        "lowFriction": false,
        "profile": {
            "fiber": "alta",
            "protein": "alta",
            "satFat": "baja",
            "glyLoad": "media",
            "vegetableVolume": "muy alto",
            "energyDensity": "baja"
        },
        "mealPrep": {
            "usesBases": [],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "pozole_pollo_nime",
        "name": "Pozole de Pollo 'Libre de Culpas'",
        "family": "pollo",
        "format": "caldo",
        "description": "Versión ligera del pozole con pechuga de pollo y abundante guarnición vegetal.",
        "ingredientsRequired": [
            "maiz_pozolero",
            "pollo_deshebrado",
            "chile_ancho",
            "cebolla",
            "ajo"
        ],
        "ingredientsOptional": [
            "lechuga",
            "rábano",
            "limon",
            "oregano"
        ],
        "cravings": [
            "antojo_mexicano",
            "calientito",
            "caldosa",
            "picante"
        ],
        "timeMin": 50,
        "effort": "medio",
        "mealType": "comida",
        "lowFriction": true,
        "profile": {
            "fiber": "media",
            "protein": "alta",
            "satFat": "baja",
            "glyLoad": "media",
            "vegetableVolume": "muy alto",
            "energyDensity": "baja"
        },
        "mealPrep": {
            "usesBases": [
                "pollo_deshebrado"
            ],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "cod_roasted_pepper_beans",
        "name": "Bacalao con Pimientos y Alubias",
        "family": "pescado_blanco",
        "format": "plato",
        "description": "Proteína magra con fibra de legumbres y antioxidantes del pimiento. Estilo mediterráneo.",
        "ingredientsRequired": [
            "pescado_blanco",
            "lenteja",
            "pimiento_rojo",
            "aceituna_verde",
            "ajo"
        ],
        "ingredientsOptional": [
            "pimenton",
            "limon"
        ],
        "cravings": [
            "ligero",
            "mediterraneo"
        ],
        "timeMin": 25,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
        "profile": {
            "fiber": "alta",
            "protein": "alta",
            "satFat": "baja",
            "glyLoad": "baja",
            "vegetableVolume": "medio",
            "energyDensity": "media"
        },
        "mealPrep": {
            "usesBases": [],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "lentejas_huevo_poached",
        "name": "Lentejas NiME con Huevo Ponché",
        "family": "frijol",
        "format": "bowl",
        "description": "Súper bowl de hierro y fibra. Las lentejas y el huevo crean una proteína completa.",
        "ingredientsRequired": [
            "lenteja",
            "huevo",
            "espinaca",
            "limon",
            "ajo"
        ],
        "ingredientsOptional": [
            "perejil",
            "aceite_oliva"
        ],
        "cravings": [
            "confort",
            "saludable",
            "hierro"
        ],
        "timeMin": 25,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
        "profile": {
            "fiber": "muy alta",
            "protein": "alta",
            "satFat": "baja",
            "glyLoad": "baja",
            "vegetableVolume": "medio",
            "energyDensity": "media"
        },
        "mealPrep": {
            "usesBases": [],
            "leavesBases": [
                "frijoles_olla"
            ],
            "derivatives": [
                "ensalada_lentejas"
            ]
        }
    },
    {
        "id": "pollo_stuffed_espinaca_ricotta",
        "name": "Pollo relleno de espinaca y ricotta (Diabetes Food Hub)",
        "family": "pollo",
        "format": "plato",
        "description": "Pechuga magra rellena de espinacas y queso ligero. Alta densidad nutricional.",
        "ingredientsRequired": [
            "pollo",
            "espinaca",
            "queso_fresco"
        ],
        "ingredientsOptional": [
            "ajo",
            "limon"
        ],
        "cravings": [
            "elegante",
            "saludable"
        ],
        "timeMin": 35,
        "effort": "medio",
        "mealType": "comida",
        "lowFriction": true,
        "profile": {
            "fiber": "alta",
            "protein": "alta",
            "satFat": "baja",
            "glyLoad": "baja",
            "vegetableVolume": "medio",
            "energyDensity": "media"
        },
        "mealPrep": {
            "usesBases": [
                "pollo_deshebrado"
            ],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "thattu_chicken_airfryer",
        "name": "Pollo Thattu Estilo Indio (Simplificado Joshua Weissman)",
        "family": "pollo",
        "format": "plato",
        "description": "Versión NiME-ificada: Pollo marinado en especias indias y cocinado en Air Fryer en lugar de frito.",
        "ingredientsRequired": [
            "pollo",
            "yogurt_natural",
            "jengibre",
            "ajo"
        ],
        "ingredientsOptional": [
            "chile_ancho",
            "cúrcuma"
        ],
        "cravings": [
            "exotico",
            "especiado",
            "saludable"
        ],
        "timeMin": 25,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
        "profile": {
            "fiber": "media",
            "protein": "alta",
            "satFat": "baja",
            "glyLoad": "baja",
            "vegetableVolume": "medio",
            "energyDensity": "media"
        },
        "mealPrep": {
            "usesBases": [],
            "leavesBases": [
                "pollo_deshebrado"
            ],
            "derivatives": []
        }
    },
    {
        "id": "hazelnut_nime_ocasional",
        "name": "Slice de Avellana y Chocolate NiME",
        "family": "postres",
        "format": "plato",
        "description": "Postre para ocasiones especiales. Versión NiME con sustitución de azúcar por monkfruit y harina de avellana.",
        "ingredientsRequired": [
            "avellana",
            "huevo",
            "leche"
        ],
        "ingredientsOptional": [
            "chocolate_amargo",
            "monkfruit",
            "limon"
        ],
        "cravings": [
            "dulce",
            "fiesta",
            "chocolate"
        ],
        "timeMin": 60,
        "effort": "alto",
        "mealType": "postre",
        "lowFriction": false,
        "profile": {
            "fiber": "media",
            "protein": "alta",
            "satFat": "baja",
            "glyLoad": "baja",
            "vegetableVolume": "bajo",
            "energyDensity": "alta"
        },
        "mealPrep": {
            "usesBases": [],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "chileatole_nime",
        "name": "Chileatole (Turquía/Puebla)",
        "family": "elote",
        "format": "sopa",
        "description": "Sopa espesa de elote con epazote y chile. Versión NiME usando harina de maíz integral.",
        "ingredientsRequired": [
            "elote",
            "masa_maiz",
            "chile_serrano",
            "epazote"
        ],
        "ingredientsOptional": [
            "limon"
        ],
        "cravings": [
            "calientito",
            "caldosa",
            "picante",
            "antojo_mexicano"
        ],
        "timeMin": 50,
        "effort": "medio",
        "mealType": "comida",
        "lowFriction": true,
        "profile": {
            "fiber": "media",
            "protein": "media",
            "satFat": "baja",
            "glyLoad": "media",
            "vegetableVolume": "muy alto",
            "energyDensity": "baja"
        },
        "ingredientsDetailed": [
            {
                "id": "elote",
                "amount": 300,
                "unit": "g",
                "notes": "granos frescos"
            },
            {
                "id": "masa_maiz",
                "amount": 100,
                "unit": "g",
                "notes": "harina de maíz integral o masa"
            },
            {
                "id": "epazote",
                "amount": 10,
                "unit": "g",
                "notes": "seco o una rama fresca"
            },
            {
                "id": "chile_serrano",
                "amount": 30,
                "unit": "g",
                "notes": "o chile verde/serrano"
            },
            {
                "id": "ajo",
                "amount": 2,
                "unit": "piezas",
                "notes": "dientes"
            }
        ],
        "mealPrep": {
            "usesBases": [],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "joroches_yucatecos_nime",
        "name": "Joroches Yucatecos (Serbia/Yucatán)",
        "family": "frijol",
        "format": "sopa",
        "description": "Bolitas de masa en caldo de frijol negro. Alta densidad de fibra prebiótica.",
        "ingredientsRequired": [
            "masa_maiz",
            "frijol",
            "jitomate",
            "cebolla",
            "ajo"
        ],
        "ingredientsOptional": [
            "epazote",
            "beli_sir",
            "kajmak"
        ],
        "cravings": [
            "confort",
            "tradicional",
            "yucateco"
        ],
        "timeMin": 80,
        "effort": "medio",
        "mealType": "comida",
        "lowFriction": false,
        "profile": {
            "fiber": "media",
            "protein": "media",
            "satFat": "baja",
            "glyLoad": "media",
            "vegetableVolume": "muy alto",
            "energyDensity": "baja"
        },
        "mealPrep": {
            "usesBases": [
                "frijoles_olla"
            ],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "enchiladas_mineras_nime",
        "name": "Enchiladas Mineras NiME (Chile/Guanajuato)",
        "family": "pollo",
        "format": "tortilla",
        "description": "Enchiladas tradicionales con zanahoria y papa. Versión NiME con menos aceite y más vegetales.",
        "ingredientsRequired": [
            "tortilla_maiz",
            "pollo_deshebrado",
            "papa",
            "zanahoria",
            "chile_guajillo"
        ],
        "ingredientsOptional": [
            "lechuga",
            "queso_fresco",
            "crema"
        ],
        "cravings": [
            "casero",
            "llenador",
            "antojo_mexicano",
            "picante"
        ],
        "timeMin": 75,
        "effort": "medio",
        "mealType": "comida",
        "lowFriction": false,
        "profile": {
            "fiber": "media",
            "protein": "alta",
            "satFat": "media",
            "glyLoad": "alta",
            "vegetableVolume": "muy alto",
            "energyDensity": "baja"
        },
        "mealPrep": {
            "usesBases": [
                "pollo_deshebrado"
            ],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "tostadas_vietnamitas_nime",
        "name": "Tostadas Fusion Vietnam (Vietnam)",
        "family": "pollo",
        "format": "plato",
        "description": "Tostadas de frijol and pollo con hierbas frescas vietnamitas. Máxima frescura y fitonutrientes.",
        "ingredientsRequired": [
            "frijol",
            "pollo_deshebrado",
            "perilla",
            "menta",
            "cilantro"
        ],
        "ingredientsOptional": [
            "limon",
            "chile_serrano"
        ],
        "cravings": [
            "fresco",
            "fusion",
            "exotico"
        ],
        "timeMin": 15,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
        "profile": {
            "fiber": "media",
            "protein": "alta",
            "satFat": "baja",
            "glyLoad": "baja",
            "vegetableVolume": "alto",
            "energyDensity": "baja"
        },
        "mealPrep": {
            "usesBases": [
                "frijoles_olla",
                "pollo_deshebrado"
            ],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "tamales_vasterbotten_nime",
        "name": "Tamales de Rajas y Queso Västerbotten (Suecia)",
        "family": "maiz",
        "format": "antojito",
        "description": "Tamales fusion con queso sueco y chiles. Versión NiME con aceite de oliva en lugar de manteca.",
        "ingredientsRequired": [
            "masa_maiz",
            "queso_vasterbotten",
            "elote",
            "chile_poblano"
        ],
        "ingredientsOptional": [
            "aceite_oliva",
            "yogurt_natural",
            "cebolla"
        ],
        "cravings": [
            "tradicional",
            "fusion",
            "llenador"
        ],
        "timeMin": 120,
        "effort": "alto",
        "mealType": "comida",
        "lowFriction": false,
        "profile": {
            "fiber": "media",
            "protein": "media",
            "satFat": "baja",
            "glyLoad": "media",
            "vegetableVolume": "muy alto",
            "energyDensity": "baja"
        },
        "mealPrep": {
            "usesBases": [],
            "leavesBases": [
                "tamales_congelados"
            ],
            "derivatives": []
        }
    },
    {
        "id": "chilaquiles_bisonte_nime",
        "name": "Chilaquiles de Bisonte al Maple (Canadá)",
        "family": "res",
        "format": "tortilla",
        "description": "Bisonte magro con totopos horneados en salsa verde. Alta proteína y fibra.",
        "ingredientsRequired": [
            "masa_maiz",
            "bisonte",
            "tomate_verde",
            "chile_serrano"
        ],
        "ingredientsOptional": [
            "aguacate",
            "cilantro",
            "crema"
        ],
        "cravings": [
            "antojo_mexicano",
            "llenador",
            "picante"
        ],
        "timeMin": 40,
        "effort": "medio",
        "mealType": "comida",
        "lowFriction": false,
        "profile": {
            "fiber": "media",
            "protein": "alta",
            "satFat": "media",
            "glyLoad": "media",
            "vegetableVolume": "muy alto",
            "energyDensity": "baja"
        },
        "mealPrep": {
            "usesBases": [
                "salsa_verde"
            ],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "caldo_res_enchipotlado_nime",
        "name": "Caldo de Res Enchipotlado (Paraguay)",
        "family": "res",
        "format": "caldo",
        "description": "Caldo potente con mandioca, chipotle y res magra. Rico en fibra compleja.",
        "ingredientsRequired": [
            "res_magra",
            "yuca",
            "chile_chipotle",
            "jitomate"
        ],
        "ingredientsOptional": [
            "calabacita",
            "zanahoria",
            "cilantro"
        ],
        "cravings": [
            "caliente",
            "reconfortante",
            "casero"
        ],
        "timeMin": 60,
        "effort": "medio",
        "mealType": "comida",
        "lowFriction": true,
        "profile": {
            "fiber": "alta",
            "protein": "alta",
            "satFat": "baja",
            "glyLoad": "media",
            "vegetableVolume": "muy alto",
            "energyDensity": "baja"
        },
        "mealPrep": {
            "usesBases": [],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "sopa_azteca_masamadre_nime",
        "name": "Sopa Azteca en Tazón de Masa Madre (Global)",
        "family": "maiz",
        "format": "sopa",
        "description": "Sopa de tortilla servida en tazón de pan de masa madre. Fusión moderna saludable.",
        "ingredientsRequired": [
            "tortilla_maiz",
            "jitomate",
            "masa_madre"
        ],
        "ingredientsOptional": [
            "chile_pasilla",
            "aguacate",
            "queso_fresco"
        ],
        "cravings": [
            "mexicano",
            "pan_blanco",
            "creativo"
        ],
        "timeMin": 45,
        "effort": "medio",
        "mealType": "comida",
        "lowFriction": false,
        "profile": {
            "fiber": "media",
            "protein": "media",
            "satFat": "baja",
            "glyLoad": "alta",
            "vegetableVolume": "muy alto",
            "energyDensity": "baja"
        },
        "mealPrep": {
            "usesBases": [],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "rollitos_chile_nogada_nime",
        "name": "Rollitos de Chile en Nogada (California)",
        "family": "res",
        "format": "antojito",
        "description": "Versión ligera sin capeado. Chile poblano relleno de picadillo de frutas y nogada natural.",
        "ingredientsRequired": [
            "chile_poblano",
            "res_molida_magra",
            "nuez_castilla",
            "granada"
        ],
        "ingredientsOptional": [
            "manzana",
            "pera",
            "almendra"
        ],
        "cravings": [
            "mexicano",
            "elegante",
            "tradicional"
        ],
        "timeMin": 60,
        "effort": "alto",
        "mealType": "comida",
        "lowFriction": false,
        "profile": {
            "fiber": "media",
            "protein": "alta",
            "satFat": "baja",
            "glyLoad": "media",
            "vegetableVolume": "medio",
            "energyDensity": "media"
        },
        "ingredientsDetailed": [
            {
                "id": "res_molida_magra",
                "amount": 600,
                "unit": "g",
                "notes": "se puede mezclar con cerdo"
            },
            {
                "id": "chile_poblano",
                "amount": 8,
                "unit": "piezas",
                "notes": "asados y limpios"
            },
            {
                "id": "jitomate",
                "amount": 300,
                "unit": "g",
                "notes": "picado"
            },
            {
                "id": "nuez_castilla",
                "amount": 100,
                "unit": "g",
                "notes": "para la nogada"
            },
            {
                "id": "granada",
                "amount": 100,
                "unit": "g",
                "notes": "para decorar"
            },
            {
                "id": "manzana",
                "amount": 200,
                "unit": "g",
                "notes": "picada"
            }
        ],
        "mealPrep": {
            "usesBases": [],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "tortas_ahogadas_nime",
        "name": "Tortas Ahogadas NiME (Miami/Jalisco)",
        "family": "cerdo",
        "format": "taco",
        "description": "Carnitas magras en pan marraqueta, ahogadas en salsa de jitomate y chile de árbol.",
        "ingredientsRequired": [
            "marraqueta",
            "cerdo_magro",
            "jitomate",
            "chile_seco_molido"
        ],
        "ingredientsOptional": [
            "frijol",
            "cebolla_morada",
            "limon"
        ],
        "cravings": [
            "torta",
            "picante",
            "mexicano"
        ],
        "timeMin": 60,
        "effort": "medio",
        "mealType": "comida",
        "lowFriction": false,
        "profile": {
            "fiber": "media",
            "protein": "alta",
            "satFat": "baja",
            "glyLoad": "alta",
            "vegetableVolume": "muy alto",
            "energyDensity": "baja"
        },
        "mealPrep": {
            "usesBases": [
                "frijoles_olla"
            ],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "sausage_sliders_cranberry_apple_nime",
        "name": "Sliders de Cerdo con Slaw de Manzana y Arándano",
        "family": "cerdo",
        "format": "taco",
        "description": "Mini hamburguesas de cerdo magro con ensalada fresca de col, manzana y arándanos. Contraste fibra-proteína.",
        "ingredientsRequired": [
            "cerdo_magro",
            "repollo",
            "manzana",
            "arandanos_secos",
            "mostaza"
        ],
        "ingredientsOptional": [
            "nuez",
            "queso_fresco",
            "pan_integral"
        ],
        "cravings": [
            "divertido",
            "agridulce",
            "mezcla_texturas"
        ],
        "timeMin": 25,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
        "profile": {
            "fiber": "media",
            "protein": "alta",
            "satFat": "baja",
            "glyLoad": "media",
            "vegetableVolume": "medio",
            "energyDensity": "media"
        },
        "mealPrep": {
            "usesBases": [],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "white_beans_sage_garlic_nime",
        "name": "Alubias con Salvia y Ajo NiME",
        "family": "leguminosas",
        "format": "plato",
        "description": "Frijoles blancos cocidos con salvia y mucho ajo. Excelente fuente de fibra prebiótica.",
        "ingredientsRequired": [
            "frijol",
            "ajo",
            "aceite_oliva"
        ],
        "ingredientsOptional": [
            "albahaca",
            "limon"
        ],
        "cravings": [
            "reconfortante",
            "saludable",
            "hierbas"
        ],
        "timeMin": 20,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
        "profile": {
            "fiber": "media",
            "protein": "media",
            "satFat": "baja",
            "glyLoad": "media",
            "vegetableVolume": "medio",
            "energyDensity": "media"
        },
        "mealPrep": {
            "usesBases": [
                "frijoles_olla"
            ],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "green_eggs_pesto_nime",
        "name": "Huevos Verdes con Pesto NiME",
        "family": "huevo",
        "format": "plato",
        "description": "Huevos revueltos con pesto fresco y cebollín. Proteína rápida y grasas saludables.",
        "ingredientsRequired": [
            "huevo",
            "pesto",
            "cebolla",
            "aceite_oliva"
        ],
        "ingredientsOptional": [
            "parmesano",
            "pimienta"
        ],
        "cravings": [
            "desayuno",
            "rapido",
            "herbal"
        ],
        "timeMin": 10,
        "effort": "bajo",
        "mealType": "desayuno",
        "lowFriction": true,
        "profile": {
            "fiber": "media",
            "protein": "alta",
            "satFat": "baja",
            "glyLoad": "baja",
            "vegetableVolume": "medio",
            "energyDensity": "media"
        },
        "mealPrep": {
            "usesBases": [],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "stuffed_peppers_cauliflower_nime",
        "name": "Pimientos Rellenos con 'Arroz' de Coliflor NiME",
        "family": "verduras",
        "format": "plato",
        "description": "Pimientos horneados rellenos de coliflor rallada, ajo y parmesano. Muy bajo en carbohidratos.",
        "ingredientsRequired": [
            "pimenton",
            "coliflor",
            "ajo",
            "parmesano"
        ],
        "ingredientsOptional": [
            "cebolla",
            "pimienta"
        ],
        "cravings": [
            "ligero",
            "vegano_prep",
            "textura"
        ],
        "timeMin": 50,
        "effort": "medio",
        "mealType": "comida",
        "lowFriction": true,
        "profile": {
            "fiber": "media",
            "protein": "media",
            "satFat": "baja",
            "glyLoad": "muy baja",
            "vegetableVolume": "alto",
            "energyDensity": "baja"
        },
        "mealPrep": {
            "usesBases": [],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "zucchini_butter_noodles_nime",
        "name": "Pasta de Calabacita al Burro NiME",
        "family": "verduras",
        "format": "plato",
        "description": "Noodles de calabacita salteados con ajo y un toque de mantequilla/oliva. Saciante y ligero.",
        "ingredientsRequired": [
            "calabacita",
            "ajo",
            "aceite_oliva"
        ],
        "ingredientsOptional": [
            "mantequilla",
            "parmesano",
            "pimienta"
        ],
        "cravings": [
            "pasta",
            "ligero",
            "rapido"
        ],
        "timeMin": 15,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
        "profile": {
            "fiber": "alta",
            "protein": "media",
            "satFat": "baja",
            "glyLoad": "baja",
            "vegetableVolume": "medio",
            "energyDensity": "media"
        },
        "mealPrep": {
            "usesBases": [],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "black_beans_rice_panic_nime",
        "name": "Arroz con Frijoles Negros 'Panic-Fried' NiME",
        "family": "leguminosas",
        "format": "plato",
        "description": "Arroz y frijoles negros salteados con cebolla, jalapeño y comino. Proteína completa y mucha fibra.",
        "ingredientsRequired": [
            "arroz_blanco",
            "frijol",
            "cebolla",
            "comino",
            "chile_jalapeño"
        ],
        "ingredientsOptional": [
            "cilantro",
            "limon"
        ],
        "cravings": [
            "llenador",
            "reconfortante",
            "picosito"
        ],
        "timeMin": 30,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
        "profile": {
            "fiber": "media",
            "protein": "media",
            "satFat": "baja",
            "glyLoad": "media",
            "vegetableVolume": "muy alto",
            "energyDensity": "baja"
        },
        "mealPrep": {
            "usesBases": [
                "arroz_blanco",
                "frijoles_olla"
            ],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "smeared_chicken_hummus_nime",
        "name": "Pollo Untado con Hummus NiME",
        "family": "pollo",
        "format": "plato",
        "description": "Pechuga de pollo horneada con una capa protectora de hummus que mantiene la jugosidad.",
        "ingredientsRequired": [
            "pechuga_pollo",
            "hummus"
        ],
        "ingredientsOptional": [
            "mostaza",
            "pimienta",
            "limon"
        ],
        "cravings": [
            "rapido",
            "proteina",
            "jugoso"
        ],
        "timeMin": 30,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
        "profile": {
            "fiber": "alta",
            "protein": "alta",
            "satFat": "baja",
            "glyLoad": "baja",
            "vegetableVolume": "bajo",
            "energyDensity": "media"
        },
        "mealPrep": {
            "usesBases": [],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "tostadas_sardina_aguacate",
        "name": "Tostadas de Sardina y Aguacate",
        "family": "pescados",
        "format": "tostada",
        "description": "Omega-3 puro: sardinas en lata con aguacate sobre tostadas horneadas.",
        "ingredientsRequired": [
            "sardina",
            "aguacate",
            "tostada"
        ],
        "ingredientsOptional": [
            "limon",
            "cebolla_morada",
            "cilantro"
        ],
        "cravings": [
            "rapido",
            "saludable",
            "fresco"
        ],
        "timeMin": 10,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
        "profile": {
            "fiber": "media",
            "protein": "alta",
            "satFat": "baja",
            "glyLoad": "baja",
            "vegetableVolume": "medio",
            "energyDensity": "media"
        },
        "mealPrep": {
            "usesBases": [],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "bowl_lentejas_madre",
        "name": "Bowl de Lentejas y Masa Madre",
        "family": "leguminosas",
        "format": "bowl",
        "description": "Lentejas guisadas servidas con pan de masa madre y espinacas frescas.",
        "ingredientsRequired": [
            "lenteja",
            "pan_bolillo",
            "espinaca"
        ],
        "ingredientsOptional": [
            "jitomate",
            "ajo",
            "limon"
        ],
        "cravings": [
            "llenador",
            "saludable",
            "reconfortante"
        ],
        "timeMin": 30,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
        "profile": {
            "fiber": "muy alta",
            "protein": "alta",
            "satFat": "baja",
            "glyLoad": "media",
            "vegetableVolume": "alto",
            "energyDensity": "baja"
        },
        "mealPrep": {
            "usesBases": [
                "frijoles_olla"
            ],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "tofu_asado_nopal",
        "name": "Tofu Asado con Nopales",
        "family": "tofu",
        "format": "plato",
        "description": "Una opción 100% vegetal: tofu firme a la plancha con nopales asados.",
        "ingredientsRequired": [
            "tofu_firme",
            "nopal"
        ],
        "ingredientsOptional": [
            "salsa_roja",
            "cebolla",
            "cilantro"
        ],
        "cravings": [
            "ligero",
            "saludable",
            "antojo_mexicano"
        ],
        "timeMin": 15,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
        "profile": {
            "fiber": "alta",
            "protein": "alta",
            "satFat": "baja",
            "glyLoad": "baja",
            "vegetableVolume": "alto",
            "energyDensity": "baja"
        },
        "mealPrep": {
            "usesBases": [
                "nopales_cocidos"
            ],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "ceviche_lentejas",
        "name": "Ceviche de Lentejas",
        "family": "leguminosas",
        "format": "bowl",
        "description": "Frescura total: lentejas cocidas con pepino, limón y un toque de chile.",
        "ingredientsRequired": [
            "lenteja",
            "limon",
            "pepino"
        ],
        "ingredientsOptional": [
            "jitomate",
            "cebolla_morada",
            "cilantro"
        ],
        "cravings": [
            "fresco",
            "ligero",
            "saludable"
        ],
        "timeMin": 15,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
        "profile": {
            "fiber": "alta",
            "protein": "media",
            "satFat": "baja",
            "glyLoad": "baja",
            "vegetableVolume": "muy alto",
            "energyDensity": "baja"
        },
        "mealPrep": {
            "usesBases": [
                "frijoles_olla"
            ],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "pasta_garbanzo_jitomate",
        "name": "Pasta de Garbanzo al Jitomate",
        "family": "leguminosas",
        "format": "pasta",
        "description": "Pasta de leguminosas con salsa de jitomate natural y ajo asado.",
        "ingredientsRequired": [
            "pasta_garbanzo",
            "jitomate",
            "ajo"
        ],
        "ingredientsOptional": [
            "albahaca",
            "aceite_oliva"
        ],
        "cravings": [
            "rapido",
            "saludable",
            "llenador"
        ],
        "timeMin": 20,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
        "profile": {
            "fiber": "media",
            "protein": "media",
            "satFat": "baja",
            "glyLoad": "media",
            "vegetableVolume": "medio",
            "energyDensity": "media"
        },
        "mealPrep": {
            "usesBases": [],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "hamburguesas_lenteja_maiz",
        "name": "Hamburguesas de Lenteja y Maíz",
        "family": "leguminosas",
        "format": "plato",
        "description": "Tortitas de lenteja y elote. Perfectas para comer solas o en pan integral.",
        "ingredientsRequired": [
            "lenteja",
            "elote",
            "cebolla"
        ],
        "ingredientsOptional": [
            "ajo",
            "cilantro",
            "pan_integral"
        ],
        "cravings": [
            "divertido",
            "saludable",
            "casero"
        ],
        "timeMin": 35,
        "effort": "medio",
        "mealType": "comida",
        "lowFriction": false,
        "profile": {
            "fiber": "alta",
            "protein": "alta",
            "satFat": "baja",
            "glyLoad": "media",
            "vegetableVolume": "alto",
            "energyDensity": "baja"
        },
        "mealPrep": {
            "usesBases": [
                "frijoles_olla"
            ],
            "leavesBases": [
                "tortitas_lenteja"
            ],
            "derivatives": []
        }
    },
    {
        "id": "sopa_habas_nopal",
        "name": "Sopa de Habas y Nopales",
        "family": "leguminosas",
        "format": "sopa",
        "description": "Leguminosas tradicionales con la fibra y frescura del nopal.",
        "ingredientsRequired": [
            "haba",
            "nopal"
        ],
        "ingredientsOptional": [
            "jitomate",
            "cebolla",
            "cilantro"
        ],
        "cravings": [
            "calientito",
            "casero",
            "reconfortante"
        ],
        "timeMin": 40,
        "effort": "medio",
        "mealType": "comida",
        "lowFriction": false,
        "profile": {
            "fiber": "muy alta",
            "protein": "alta",
            "satFat": "baja",
            "glyLoad": "media",
            "vegetableVolume": "muy alto",
            "energyDensity": "baja"
        },
        "mealPrep": {
            "usesBases": [
                "nopales_cocidos"
            ],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "quesadillas_huitlacoche_tofu",
        "name": "Quesadillas de Huitlacoche y Tofu",
        "family": "milpa",
        "format": "tortilla",
        "description": "Fusión mexicana: huitlacoche con el toque proteico del tofu desmenuzado.",
        "ingredientsRequired": [
            "tortilla_maiz",
            "huitlacoche",
            "tofu_firme"
        ],
        "ingredientsOptional": [
            "epazote",
            "cebolla",
            "salsa_verde"
        ],
        "cravings": [
            "antojo_mexicano",
            "casero",
            "exotico"
        ],
        "timeMin": 20,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
        "profile": {
            "fiber": "media",
            "protein": "alta",
            "satFat": "baja",
            "glyLoad": "media",
            "vegetableVolume": "muy alto",
            "energyDensity": "baja"
        },
        "mealPrep": {
            "usesBases": [],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "tacos_jamaica_asada",
        "name": "Tacos de Jamaica Asada",
        "family": "verduras",
        "format": "taco",
        "description": "Fibra máxima: flor de jamaica hidratada y salteada como carne.",
        "ingredientsRequired": [
            "tortilla_maiz",
            "jamaica"
        ],
        "ingredientsOptional": [
            "cebolla",
            "cilantro",
            "aguacate"
        ],
        "cravings": [
            "ligero",
            "fresco",
            "mexicano"
        ],
        "timeMin": 30,
        "effort": "medio",
        "mealType": "comida",
        "lowFriction": false,
        "profile": {
            "fiber": "media",
            "protein": "media",
            "satFat": "baja",
            "glyLoad": "media",
            "vegetableVolume": "alto",
            "energyDensity": "baja"
        },
        "mealPrep": {
            "usesBases": [],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "ensalada_garbanzo_atun",
        "name": "Ensalada de Garbanzo y Atún",
        "family": "leguminosas",
        "format": "lechuga",
        "description": "Proteína rápida: garbanzos de lata y atún con un toque de vinagreta.",
        "ingredientsRequired": [
            "garbanzo",
            "atun",
            "cebolla"
        ],
        "ingredientsOptional": [
            "limon",
            "chives",
            "pepino"
        ],
        "cravings": [
            "rapido",
            "llenador",
            "fresco"
        ],
        "timeMin": 10,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
        "profile": {
            "fiber": "alta",
            "protein": "alta",
            "satFat": "baja",
            "glyLoad": "baja",
            "vegetableVolume": "alto",
            "energyDensity": "baja"
        },
        "mealPrep": {
            "usesBases": [],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "chilaquiles_tofu_verde",
        "name": "Chilaquiles de Tofu con Salsa Verde",
        "family": "tofu",
        "format": "tortilla",
        "description": "Versión ligera de los chilaquiles usando tofu desmenuzado en lugar de crema.",
        "ingredientsRequired": [
            "totopos",
            "salsa_verde",
            "tofu_firme"
        ],
        "ingredientsOptional": [
            "cebolla",
            "cilantro",
            "aguacate"
        ],
        "cravings": [
            "mexicano",
            "calientito",
            "saludable"
        ],
        "timeMin": 20,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
        "profile": {
            "fiber": "media",
            "protein": "alta",
            "satFat": "baja",
            "glyLoad": "media",
            "vegetableVolume": "medio",
            "energyDensity": "media"
        },
        "mealPrep": {
            "usesBases": [
                "salsa_verde"
            ],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "tinga_zanahoria_tostadas",
        "name": "Tostadas de Tinga de Zanahoria",
        "family": "verduras",
        "format": "tostada",
        "description": "Zanahoria rallada y cebolla en salsa de chipotle. Muy económica y alta en fibra.",
        "ingredientsRequired": [
            "tostada",
            "zanahoria",
            "chile_chipotle_lata"
        ],
        "ingredientsOptional": [
            "cebolla",
            "crema",
            "frijol"
        ],
        "cravings": [
            "casero",
            "ligero",
            "antojo_mexicano"
        ],
        "timeMin": 25,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
        "profile": {
            "fiber": "media",
            "protein": "media",
            "satFat": "media",
            "glyLoad": "media",
            "vegetableVolume": "muy alto",
            "energyDensity": "baja"
        },
        "mealPrep": {
            "usesBases": [
                "frijoles_olla"
            ],
            "leavesBases": [
                "tinga_vegetal"
            ],
            "derivatives": []
        }
    },
    {
        "id": "aguaguile_hongos_pepino",
        "name": "Aguachile de Hongos y Pepino",
        "family": "verduras",
        "format": "bowl",
        "description": "Frescura picante: hongos en láminas marinados en limón, chile y pepino.",
        "ingredientsRequired": [
            "hongo",
            "limon",
            "pepino"
        ],
        "ingredientsOptional": [
            "cebolla_morada",
            "cilantro",
            "chile_serrano"
        ],
        "cravings": [
            "fresco",
            "ligero",
            "picante"
        ],
        "timeMin": 15,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
        "profile": {
            "fiber": "media",
            "protein": "media",
            "satFat": "baja",
            "glyLoad": "baja",
            "vegetableVolume": "muy alto",
            "energyDensity": "baja"
        },
        "mealPrep": {
            "usesBases": [],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "ceviche_coliflor_mango",
        "name": "Ceviche de Coliflor y Mango",
        "family": "verduras",
        "format": "bowl",
        "description": "Mezcla agridulce y crujiente de coliflor picada finamente con mango fresco.",
        "ingredientsRequired": [
            "coliflor",
            "mango",
            "limon"
        ],
        "ingredientsOptional": [
            "cebolla_morada",
            "cilantro",
            "jitomate"
        ],
        "cravings": [
            "fresco",
            "frutal",
            "ligero"
        ],
        "timeMin": 20,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
        "profile": {
            "fiber": "media",
            "protein": "media",
            "satFat": "baja",
            "glyLoad": "media",
            "vegetableVolume": "muy alto",
            "energyDensity": "baja"
        },
        "mealPrep": {
            "usesBases": [],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "fajitas_setas_pimiento",
        "name": "Fajitas de Setas y Pimiento",
        "family": "verduras",
        "format": "plato",
        "description": "Setas salteadas con pimientos de colores, ajo y un toque de comino.",
        "ingredientsRequired": [
            "hongo",
            "pimiento_rojo",
            "cebolla"
        ],
        "ingredientsOptional": [
            "tortilla_maiz",
            "ajo",
            "cilantro"
        ],
        "cravings": [
            "calientito",
            "saludable",
            "rapido"
        ],
        "timeMin": 20,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
        "profile": {
            "fiber": "media",
            "protein": "media",
            "satFat": "baja",
            "glyLoad": "baja",
            "vegetableVolume": "muy alto",
            "energyDensity": "baja"
        },
        "mealPrep": {
            "usesBases": [],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "tacos_papa_epazote",
        "name": "Tacos de Papa al Epazote",
        "family": "cereales",
        "format": "taco",
        "description": "Sencillez pura: papas cocidas y salteadas con epazote fresco en tortilla de maíz.",
        "ingredientsRequired": [
            "tortilla_maiz",
            "papa",
            "epazote"
        ],
        "ingredientsOptional": [
            "cebolla",
            "salsa_roja",
            "ajo"
        ],
        "cravings": [
            "casero",
            "reconfortante",
            "antojo_mexicano"
        ],
        "timeMin": 25,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
        "profile": {
            "fiber": "media",
            "protein": "media",
            "satFat": "baja",
            "glyLoad": "media",
            "vegetableVolume": "muy alto",
            "energyDensity": "baja"
        },
        "mealPrep": {
            "usesBases": [],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "caldo_habas_secas",
        "name": "Caldo de Habas Secas",
        "family": "leguminosas",
        "format": "sopa",
        "description": "Sopa nutritiva de habas con un sofrito de jitomate y cebolla.",
        "ingredientsRequired": [
            "haba",
            "jitomate",
            "cebolla"
        ],
        "ingredientsOptional": [
            "ajo",
            "cilantro",
            "limon"
        ],
        "cravings": [
            "calientito",
            "casero",
            "reconfortante"
        ],
        "timeMin": 50,
        "effort": "medio",
        "mealType": "comida",
        "lowFriction": false,
        "profile": {
            "fiber": "alta",
            "protein": "media",
            "satFat": "baja",
            "glyLoad": "media",
            "vegetableVolume": "alto",
            "energyDensity": "baja"
        },
        "mealPrep": {
            "usesBases": [],
            "leavesBases": [
                "caldo_habas"
            ],
            "derivatives": []
        }
    },
    {
        "id": "arroz_lentejas_cebolla",
        "name": "Arroz con Lentejas y Cebolla Caramelizada",
        "family": "leguminosas",
        "format": "plato",
        "description": "Inspiración del medio oriente adaptada a ingredientes locales. Alto en fibra.",
        "ingredientsRequired": [
            "arroz_blanco",
            "lenteja",
            "cebolla"
        ],
        "ingredientsOptional": [
            "comino",
            "aceite_oliva",
            "yogurt_natural"
        ],
        "cravings": [
            "llenador",
            "reconfortante",
            "exotico"
        ],
        "timeMin": 40,
        "effort": "medio",
        "mealType": "comida",
        "lowFriction": false,
        "profile": {
            "fiber": "alta",
            "protein": "alta",
            "satFat": "baja",
            "glyLoad": "media",
            "vegetableVolume": "medio",
            "energyDensity": "media"
        },
        "mealPrep": {
            "usesBases": [
                "frijoles_olla"
            ],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "pancita_setas_huauzontle",
        "name": "Pancita de Setas con Huauzontle",
        "family": "verduras",
        "format": "caldo",
        "description": "Caldo rojo de chiles secos con setas y huauzontle (o quelites). Muy reconfortante.",
        "ingredientsRequired": [
            "hongo",
            "quelites",
            "chile_guajillo"
        ],
        "ingredientsOptional": [
            "ajo",
            "epazote",
            "cebolla"
        ],
        "cravings": [
            "caliente",
            "mexicano",
            "reconfortante"
        ],
        "timeMin": 15,
        "effort": "medio",
        "mealType": "comida",
        "lowFriction": false,
        "profile": {
            "fiber": "alta",
            "protein": "media",
            "satFat": "baja",
            "glyLoad": "baja",
            "vegetableVolume": "muy alto",
            "energyDensity": "baja"
        },
        "mealPrep": {
            "usesBases": [],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "hamburguesa_casera_simple",
        "name": "Hamburguesa Casera Simple",
        "family": "res_molida",
        "format": "sandwich",
        "description": "Hamburguesa casera con carne molida, pan, queso y los clásicos. Fácil de preparar.",
        "ingredientsRequired": [
            "res_molida",
            "pan_blanco"
        ],
        "ingredientsOptional": [
            "queso_amarillo",
            "jitomate",
            "lechuga",
            "cebolla",
            "mayonesa"
        ],
        "cravings": [
            "antojo",
            "rapido",
            "indulgente",
            "casero"
        ],
        "timeMin": 15,
        "effort": "bajo",
        "mealType": "comida_indulgente",
        "lowFriction": true,
        "profile": {
            "fiber": "media",
            "protein": "alta",
            "satFat": "baja",
            "glyLoad": "media",
            "vegetableVolume": "muy alto",
            "energyDensity": "baja"
        },
        "mealPrep": {
            "usesBases": [],
            "leavesBases": [
                "carne_molida_cocida"
            ],
            "derivatives": []
        }
    },
    {
        "id": "quesadillas_queso_jamon",
        "name": "Quesadillas de Queso y Jamón",
        "family": "tortilla",
        "format": "tortilla",
        "description": "Quesadillas fritas rellenas de queso derretido y jamón. Clásico indulgente mexicano.",
        "ingredientsRequired": [
            "tortilla_maiz",
            "queso_amarillo",
            "jamon"
        ],
        "ingredientsOptional": [
            "salsa_roja",
            "nata",
            "cebolla"
        ],
        "cravings": [
            "antojo",
            "rapido",
            "indulgente",
            "frito"
        ],
        "timeMin": 10,
        "effort": "bajo",
        "mealType": "comida_indulgente",
        "lowFriction": true,
        "profile": {
            "fiber": "media",
            "protein": "alta",
            "satFat": "baja",
            "glyLoad": "baja",
            "vegetableVolume": "alto",
            "energyDensity": "baja"
        },
        "mealPrep": {
            "usesBases": [],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "tacos_carne_asada_queso",
        "name": "Tacos de Carne Asada con Queso",
        "family": "carne",
        "format": "tortilla",
        "description": "Tacos rellenos con carne asada, queso derretido y todo lo que se antoje. Indulgencia pura.",
        "ingredientsRequired": [
            "carne_asada",
            "tortilla_maiz",
            "queso_amarillo"
        ],
        "ingredientsOptional": [
            "cebolla",
            "cilantro",
            "limon",
            "salsa_roja"
        ],
        "cravings": [
            "antojo",
            "indulgente",
            "rapido",
            "mexicano"
        ],
        "timeMin": 15,
        "effort": "bajo",
        "mealType": "comida_indulgente",
        "lowFriction": true,
        "profile": {
            "fiber": "media",
            "protein": "alta",
            "satFat": "baja",
            "glyLoad": "baja",
            "vegetableVolume": "alto",
            "energyDensity": "baja"
        },
        "mealPrep": {
            "usesBases": [
                "carne_asada_cocida"
            ],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "burritos_queso_frijol",
        "name": "Burritos de Queso y Frijol",
        "family": "tortilla",
        "format": "burrito",
        "description": "Burritos grandes rellenos de frijoles refritos, queso fundido y nata. Muy llenadores.",
        "ingredientsRequired": [
            "tortilla_grande",
            "frijol",
            "queso_amarillo"
        ],
        "ingredientsOptional": [
            "nata",
            "cebolla",
            "salsa_roja"
        ],
        "cravings": [
            "llenador",
            "antojo",
            "indulgente",
            "rapido"
        ],
        "timeMin": 15,
        "effort": "bajo",
        "mealType": "comida_indulgente",
        "lowFriction": true,
        "profile": {
            "fiber": "media",
            "protein": "media",
            "satFat": "baja",
            "glyLoad": "media",
            "vegetableVolume": "alto",
            "energyDensity": "baja"
        },
        "mealPrep": {
            "usesBases": [
                "frijoles_refritos"
            ],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "enchiladas_verdes_queso_nata",
        "name": "Enchiladas Verdes con Queso y Nata",
        "family": "tortilla",
        "format": "plato",
        "description": "Enchiladas rellenas de queso y baño de salsa verde con abundante nata. Reconfortante e indulgente.",
        "ingredientsRequired": [
            "tortilla_maiz",
            "salsa_verde",
            "queso_amarillo"
        ],
        "ingredientsOptional": [
            "nata",
            "cebolla",
            "cilantro"
        ],
        "cravings": [
            "reconfortante",
            "antojo",
            "indulgente",
            "casero"
        ],
        "timeMin": 30,
        "effort": "bajo",
        "mealType": "comida_indulgente",
        "lowFriction": true,
        "profile": {
            "fiber": "media",
            "protein": "media",
            "satFat": "baja",
            "glyLoad": "media",
            "vegetableVolume": "alto",
            "energyDensity": "baja"
        },
        "mealPrep": {
            "usesBases": [
                "salsa_verde"
            ],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "pizza_casera_basica",
        "name": "Pizza Casera Básica",
        "family": "pan_blanco",
        "format": "pizza",
        "description": "Pizza hecha en casa con base de pan, salsa de tomate y queso derretido. Rápida y satisfactoria.",
        "ingredientsRequired": [
            "pan_blanco",
            "jitomate",
            "queso_amarillo"
        ],
        "ingredientsOptional": [
            "jamon",
            "pepperoni",
            "cebolla"
        ],
        "cravings": [
            "antojo",
            "rapido",
            "indulgente"
        ],
        "timeMin": 20,
        "effort": "bajo",
        "mealType": "comida_indulgente",
        "lowFriction": true,
        "profile": {
            "fiber": "media",
            "protein": "alta",
            "satFat": "baja",
            "glyLoad": "alta",
            "vegetableVolume": "alto",
            "energyDensity": "baja"
        },
        "mealPrep": {
            "usesBases": [],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "chilaquiles_fritos_queso",
        "name": "Chilaquiles Fritos con Queso y Nata",
        "family": "tortilla",
        "format": "plato",
        "description": "Tortillas fritas crujientes cubiertas con salsa roja, queso derretido, huevo y abundante nata. Desayuno contundente.",
        "ingredientsRequired": [
            "tortilla_maiz",
            "salsa_roja",
            "queso_amarillo"
        ],
        "ingredientsOptional": [
            "nata",
            "huevo",
            "cebolla",
            "cilantro"
        ],
        "cravings": [
            "antojo",
            "frito",
            "indulgente",
            "contundente"
        ],
        "timeMin": 20,
        "effort": "bajo",
        "mealType": "comida_indulgente",
        "lowFriction": true,
        "profile": {
            "fiber": "media",
            "protein": "alta",
            "satFat": "baja",
            "glyLoad": "media",
            "vegetableVolume": "alto",
            "energyDensity": "baja"
        },
        "mealPrep": {
            "usesBases": [
                "salsa_roja"
            ],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "torta_mexicana_completa",
        "name": "Torta Mexicana Completa",
        "family": "pan_blanco",
        "format": "sandwich",
        "description": "Pan telera relleno de jamón, queso, aguacate, mayonesa, lechuga y jitomate. Clásico callejero.",
        "ingredientsRequired": [
            "pan_telera",
            "jamon",
            "queso_amarillo"
        ],
        "ingredientsOptional": [
            "aguacate",
            "mayonesa",
            "lechuga",
            "jitomate",
            "cebolla"
        ],
        "cravings": [
            "rapido",
            "indulgente",
            "casero",
            "llenador"
        ],
        "timeMin": 10,
        "effort": "bajo",
        "mealType": "comida_indulgente",
        "lowFriction": true,
        "profile": {
            "fiber": "media",
            "protein": "alta",
            "satFat": "baja",
            "glyLoad": "media",
            "vegetableVolume": "muy alto",
            "energyDensity": "baja"
        },
        "mealPrep": {
            "usesBases": [],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "taquitos_dorados_papa",
        "name": "Taquitos Dorados de Papa",
        "family": "tortilla",
        "format": "taco",
        "description": "Tortillas enrolladas rellenas de papa cocida y frita hasta doradas, servidas con guacamole y salsa.",
        "ingredientsRequired": [
            "tortilla_maiz",
            "papa"
        ],
        "ingredientsOptional": [
            "aceite_maiz",
            "salsa_roja",
            "guacamole",
            "nata"
        ],
        "cravings": [
            "frito",
            "antojo",
            "rapido",
            "indulgente"
        ],
        "timeMin": 20,
        "effort": "bajo",
        "mealType": "comida_indulgente",
        "lowFriction": true,
        "profile": {
            "fiber": "media",
            "protein": "media",
            "satFat": "baja",
            "glyLoad": "media",
            "vegetableVolume": "medio",
            "energyDensity": "media"
        },
        "mealPrep": {
            "usesBases": [],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "flautas_carne_queso",
        "name": "Flautas de Carne y Queso",
        "family": "tortilla",
        "format": "tortilla",
        "description": "Tortillas enrolladas crujientes rellenas de carne deshebrada y queso, fritas hasta doradas.",
        "ingredientsRequired": [
            "tortilla_grande",
            "res_molida",
            "queso_amarillo"
        ],
        "ingredientsOptional": [
            "salsa_roja",
            "nata",
            "lechuga",
            "jitomate"
        ],
        "cravings": [
            "frito",
            "antojo",
            "indulgente",
            "contundente"
        ],
        "timeMin": 25,
        "effort": "bajo",
        "mealType": "comida_indulgente",
        "lowFriction": true,
        "profile": {
            "fiber": "media",
            "protein": "alta",
            "satFat": "baja",
            "glyLoad": "baja",
            "vegetableVolume": "alto",
            "energyDensity": "baja"
        },
        "mealPrep": {
            "usesBases": [
                "carne_molida_cocida"
            ],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "sopa_tortilla_crema",
        "name": "Sopa de Tortilla con Crema y Queso",
        "family": "sopa",
        "format": "sopa",
        "description": "Caldo de pollo con tiras de tortilla frita crujiente, aguacate, queso y nata. Indulgencia pura.",
        "ingredientsRequired": [
            "pollo",
            "tortilla_maiz",
            "queso_amarillo"
        ],
        "ingredientsOptional": [
            "nata",
            "aguacate",
            "cebolla",
            "cilantro"
        ],
        "cravings": [
            "caldosa",
            "indulgente",
            "reconfortante",
            "antojo"
        ],
        "timeMin": 30,
        "effort": "bajo",
        "mealType": "comida_indulgente",
        "lowFriction": true,
        "profile": {
            "fiber": "media",
            "protein": "alta",
            "satFat": "baja",
            "glyLoad": "baja",
            "vegetableVolume": "alto",
            "energyDensity": "baja"
        },
        "mealPrep": {
            "usesBases": [
                "pollo_deshebrado"
            ],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "quesadillas_huitlacoche",
        "name": "Quesadillas de Huitlacoche",
        "family": "tortilla",
        "format": "tortilla",
        "description": "Quesadillas rellenas de huitlacoche, queso derretido y cebolla frita. Gourmet indulgente.",
        "ingredientsRequired": [
            "tortilla_maiz",
            "huitlacoche",
            "queso_amarillo"
        ],
        "ingredientsOptional": [
            "cebolla",
            "cilantro",
            "salsa_roja"
        ],
        "cravings": [
            "antojo",
            "indulgente",
            "casero",
            "mexicano"
        ],
        "timeMin": 15,
        "effort": "bajo",
        "mealType": "comida_indulgente",
        "lowFriction": true,
        "profile": {
            "fiber": "media",
            "protein": "media",
            "satFat": "baja",
            "glyLoad": "baja",
            "vegetableVolume": "muy alto",
            "energyDensity": "baja"
        },
        "mealPrep": {
            "usesBases": [],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "tamales_queso_rajas",
        "name": "Tamales de Queso y Rajas",
        "family": "masa",
        "format": "tamal",
        "description": "Tamales de masa de maíz con queso derretido y rajas poblanas. Clásico reconfortante.",
        "ingredientsRequired": [
            "tamal_masa",
            "queso_amarillo",
            "rajas_poblano"
        ],
        "ingredientsOptional": [
            "manteca",
            "cilantro"
        ],
        "cravings": [
            "caliente",
            "indulgente",
            "reconfortante",
            "casero"
        ],
        "timeMin": 40,
        "effort": "medio",
        "mealType": "comida_indulgente",
        "lowFriction": false,
        "profile": {
            "fiber": "media",
            "protein": "media",
            "satFat": "media",
            "glyLoad": "media",
            "vegetableVolume": "medio",
            "energyDensity": "media"
        },
        "mealPrep": {
            "usesBases": [],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "chimichangas_carne",
        "name": "Chimichangas de Carne",
        "family": "tortilla",
        "format": "burrito",
        "description": "Burritos grandes de carne deshebrada y queso, fritos hasta crujientes y dorados.",
        "ingredientsRequired": [
            "tortilla_grande",
            "res_molida",
            "queso_amarillo"
        ],
        "ingredientsOptional": [
            "salsa_roja",
            "nata",
            "cebolla"
        ],
        "cravings": [
            "frito",
            "indulgente",
            "rapido",
            "llenador"
        ],
        "timeMin": 20,
        "effort": "bajo",
        "mealType": "comida_indulgente",
        "lowFriction": true,
        "profile": {
            "fiber": "media",
            "protein": "alta",
            "satFat": "baja",
            "glyLoad": "media",
            "vegetableVolume": "medio",
            "energyDensity": "media"
        },
        "mealPrep": {
            "usesBases": [
                "carne_molida_cocida"
            ],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "elote_mayo_queso",
        "name": "Elote con Mayo y Queso",
        "family": "verdura",
        "format": "plato",
        "description": "Elote asado o cocido cubierto de mayonesa, queso fresco desmenuzado y pimentón. Antojo callejero.",
        "ingredientsRequired": [
            "elote",
            "mayonesa",
            "queso_fresco"
        ],
        "ingredientsOptional": [
            "queso_cotija",
            "limon"
        ],
        "cravings": [
            "rapido",
            "antojo",
            "callejero",
            "indulgente"
        ],
        "timeMin": 10,
        "effort": "bajo",
        "mealType": "comida_indulgente",
        "lowFriction": true,
        "profile": {
            "fiber": "media",
            "protein": "media",
            "satFat": "baja",
            "glyLoad": "media",
            "vegetableVolume": "medio",
            "energyDensity": "media"
        },
        "mealPrep": {
            "usesBases": [],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "churros_chocolate",
        "name": "Churros con Chocolate",
        "family": "postre",
        "format": "postre",
        "description": "Churros caseros fritos crujientes, servidos con chocolate caliente espeso para acompañar.",
        "ingredientsRequired": [
            "harina",
            "aceite_maiz"
        ],
        "ingredientsOptional": [
            "azucar",
            "canela",
            "chocolate"
        ],
        "cravings": [
            "dulce",
            "antojo",
            "indulgente",
            "postre"
        ],
        "timeMin": 25,
        "effort": "medio",
        "mealType": "postre",
        "lowFriction": false,
        "profile": {
            "fiber": "media",
            "protein": "media",
            "satFat": "baja",
            "glyLoad": "muy alta",
            "vegetableVolume": "bajo",
            "energyDensity": "alta"
        },
        "mealPrep": {
            "usesBases": [],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "arroz_leche_nime",
        "name": "Arroz con Leche NiME",
        "family": "postres",
        "format": "bowl",
        "description": "Clásico reconfortante con arroz integral, leche vegetal y endulzado con dátil.",
        "ingredientsRequired": [
            "arroz_integral",
            "leche_almendra",
            "canela_rama",
            "datil"
        ],
        "ingredientsOptional": [
            "vainilla",
            "limon"
        ],
        "cravings": [
            "dulce",
            "casero",
            "reconfortante"
        ],
        "timeMin": 40,
        "effort": "medio",
        "mealType": "postre",
        "lowFriction": true,
        "profile": {
            "fiber": "media",
            "protein": "media",
            "satFat": "baja",
            "glyLoad": "media",
            "vegetableVolume": "bajo",
            "energyDensity": "alta"
        },
        "mealPrep": {
            "usesBases": [],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "manzanas_asadas_canela",
        "name": "Manzanas Asadas con Canela",
        "family": "postres",
        "format": "plato",
        "description": "Postre tibio y ligero. Manzanas horneadas con canela y un toque de nuez.",
        "ingredientsRequired": [
            "manzana",
            "canela_molida"
        ],
        "ingredientsOptional": [
            "nuez",
            "yogurt_griego"
        ],
        "cravings": [
            "dulce",
            "calientito",
            "ligero"
        ],
        "timeMin": 25,
        "effort": "bajo",
        "mealType": "postre",
        "lowFriction": true,
        "profile": {
            "fiber": "media",
            "protein": "media",
            "satFat": "baja",
            "glyLoad": "baja",
            "vegetableVolume": "bajo",
            "energyDensity": "alta"
        },
        "mealPrep": {
            "usesBases": [],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "fresas_crema_coco",
        "name": "Fresas con Crema de Coco",
        "family": "postres",
        "format": "bowl",
        "description": "Fresas frescas con una crema batida de coco ligera y vainilla.",
        "ingredientsRequired": [
            "fresa",
            "leche"
        ],
        "ingredientsOptional": [
            "nuez",
            "menta"
        ],
        "cravings": [
            "fresco",
            "dulce",
            "frutal"
        ],
        "timeMin": 10,
        "effort": "bajo",
        "mealType": "postre",
        "lowFriction": true,
        "profile": {
            "fiber": "media",
            "protein": "media",
            "satFat": "baja",
            "glyLoad": "baja",
            "vegetableVolume": "bajo",
            "energyDensity": "alta"
        },
        "mealPrep": {
            "usesBases": [],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "molletes_manchego_nime",
        "name": "Molletes con Queso Manchego y Pico de Gallo",
        "family": "queso",
        "format": "plato",
        "description": "Pan integral con frijoles refritos sanos y queso Manchego gratinado.",
        "ingredientsRequired": [
            "pan_integral",
            "frijol",
            "queso_manchego"
        ],
        "ingredientsOptional": [
            "jitomate",
            "cebolla",
            "chile_serrano",
            "aguacate"
        ],
        "cravings": [
            "casero",
            "quesoso",
            "antojo_mexicano"
        ],
        "timeMin": 15,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
        "profile": {
            "fiber": "media",
            "protein": "media",
            "satFat": "baja",
            "glyLoad": "media",
            "vegetableVolume": "muy alto",
            "energyDensity": "baja"
        },
        "mealPrep": {
            "usesBases": [
                "frijoles_olla"
            ],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "tacos_costra_manchego",
        "name": "Tacos con Costra de Manchego",
        "family": "basicos",
        "format": "taco",
        "description": "Queso Manchego caramelizado en la plancha formando una costra crujiente para tus tacos.",
        "ingredientsRequired": [
            "queso_manchego",
            "tortilla_maiz",
            "champiñon"
        ],
        "ingredientsOptional": [
            "salsa_roja",
            "cebolla_asada"
        ],
        "cravings": [
            "crujiente",
            "quesoso",
            "sabroso"
        ],
        "timeMin": 15,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
        "profile": {
            "fiber": "media",
            "protein": "media",
            "satFat": "baja",
            "glyLoad": "media",
            "vegetableVolume": "muy alto",
            "energyDensity": "baja"
        },
        "mealPrep": {
            "usesBases": [],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "pimientos_rellenos_manchego",
        "name": "Pimientos Rellenos de Manchego y Res",
        "family": "res",
        "format": "plato",
        "description": "Pimientos morrones rellenos de carne molida magra y cubiertos de Manchego fundido.",
        "ingredientsRequired": [
            "pimiento_morron",
            "res_molida",
            "queso_manchego"
        ],
        "ingredientsOptional": [
            "ajo",
            "cebolla",
            "elote"
        ],
        "cravings": [
            "colorido",
            "llenador",
            "casero"
        ],
        "timeMin": 35,
        "effort": "medio",
        "mealType": "comida",
        "lowFriction": false,
        "profile": {
            "fiber": "media",
            "protein": "alta",
            "satFat": "baja",
            "glyLoad": "baja",
            "vegetableVolume": "muy alto",
            "energyDensity": "baja"
        },
        "mealPrep": {
            "usesBases": [],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "enchiladas_suizas_manchego",
        "name": "Enchiladas Suizas NiME",
        "family": "pollo",
        "format": "tortilla",
        "description": "Enchiladas verdes con una salsa cremosa de yogurt y mucho queso Manchego.",
        "ingredientsRequired": [
            "tortilla_maiz",
            "pollo_deshebrado",
            "salsa_verde",
            "yogurt_natural",
            "queso_manchego"
        ],
        "ingredientsOptional": [
            "cilantro",
            "cebolla"
        ],
        "cravings": [
            "cremoso",
            "quesoso",
            "picante"
        ],
        "timeMin": 25,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
        "profile": {
            "fiber": "media",
            "protein": "alta",
            "satFat": "baja",
            "glyLoad": "alta",
            "vegetableVolume": "alto",
            "energyDensity": "baja"
        },
        "mealPrep": {
            "usesBases": [
                "pollo_deshebrado",
                "salsa_verde"
            ],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "champis_ajillo_gratinados",
        "name": "Champiñones al Ajillo Gratinados",
        "family": "verduras",
        "format": "plato",
        "description": "Champiñones salteados con ajo y guajillo, terminados con una capa de Manchego.",
        "ingredientsRequired": [
            "champiñon",
            "ajo",
            "chile_guajillo",
            "queso_manchego"
        ],
        "ingredientsOptional": [
            "epazote",
            "limon"
        ],
        "cravings": [
            "sabroso",
            "picante",
            "ligero"
        ],
        "timeMin": 20,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
        "profile": {
            "fiber": "media",
            "protein": "media",
            "satFat": "baja",
            "glyLoad": "baja",
            "vegetableVolume": "muy alto",
            "energyDensity": "baja"
        },
        "mealPrep": {
            "usesBases": [],
            "leavesBases": [],
            "derivatives": []
        }
    }
];

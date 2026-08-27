/**
 * RECIPES – Milpa NiME
 *
 * Base de datos de recetas optimizada para cocina mexicana cotidiana,
 * enfocada en accesibilidad, nutrición (NiME) y productos de temporada.
 *
 * Formato estándar documentado en data/RECIPE_FORMAT.md — sigue ese
 * formato al agregar o editar recetas.
 */

export const RECIPES = [
    {
        "id": "enfrijoladas_verdes_nopales",
        "name": "Enfrijoladas verdes con nopales",
        "family": "leguminosas",
        "format": "tortilla",
        "description": "Plato casero y reconfortante con base de frijol, tortilla de maíz y nopales.",
        "servings": 4,
        "timeMin": 20,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
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
        "steps": [
            "Calienta el frijol negro cocido con un poco de su caldo en una cazuela hasta obtener una salsa espesa y sazona con sal.",
            "Si tienes salsa verde, mézclala con el frijol para darle color y un toque ácido.",
            "Calienta las tortillas de maíz una por una en un comal, unos 20 seg por lado, hasta que estén flexibles.",
            "Si tienes nopal cocido, córtalo en tiras y caliéntalo ligeramente para el relleno.",
            "Sumerge cada tortilla en la salsa de frijol, rellena con el nopal y enrolla o dobla en cuartos.",
            "Acomoda las enfrijoladas en un plato y báñalas con más salsa de frijol.",
            "Decora con queso fresco desmoronado y cebolla y cilantro picados, si tienes, y sirve calientes."
        ],
        "cravings": [
            "reconfortante",
            "mexicano",
            "picante"
        ],
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
        "family": "verduras",
        "format": "plato",
        "description": "Nopales asados, vinagre casero y atún desmenuzado. Alto en fibra y proteína magra.",
        "servings": 2,
        "timeMin": 20,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
        "ingredientsRequired": [
            "nopal",
            "atun_fresco"
        ],
        "ingredientsOptional": [
            "cebolla",
            "cilantro",
            "limon"
        ],
        "steps": [
            "Asa los nopales limpios y cortados en tiras en un comal o sartén caliente 6-8 min, hasta que se ablanden.",
            "Sella el atún fresco en un sartén con un poco de aceite y sal, 2-3 min por lado, hasta que dore por fuera y quede rosado por dentro.",
            "Deja enfriar el atún unos minutos y desmenúzalo con un tenedor.",
            "Prepara una vinagreta con aceite, vinagre o limón y sal; si tienes, agrega cebolla y cilantro picados finamente.",
            "Mezcla los nopales con la vinagreta y el atún desmenuzado.",
            "Exprime limón al gusto, si tienes, y sirve frío o a temperatura ambiente."
        ],
        "cravings": [
            "ligero",
            "saludable",
            "fresco"
        ],
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
        "family": "leguminosas",
        "format": "lechuga",
        "description": "Nopales cocidos, frijol de olla y queso freso. Equilibrio NiME perfecto.",
        "servings": 2,
        "timeMin": 15,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
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
        "steps": [
            "Calienta el nopal cocido en un sartén con un poco de aceite 3-4 min, solo para tibiarlo.",
            "Agrega el frijol negro cocido y calienta 2-3 min más, moviendo con cuidado para no deshacerlo.",
            "Sazona con sal y, si tienes, agrega cebolla picada.",
            "Sirve en un plato o sobre una cama de lechuga y desmorona el queso fresco encima.",
            "Espolvorea cilantro picado y exprime limón, si tienes.",
            "Sirve tibia."
        ],
        "cravings": [
            "ligero",
            "fresco",
            "saludable"
        ],
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
        "servings": 4,
        "timeMin": 30,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
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
        "steps": [
            "Coloca la pechuga de pollo en una olla con agua y sal suficiente para cubrir, y cuece a fuego medio 20 min hasta que esté bien cocida.",
            "Retira el pollo, deshébralo y reserva el caldo en la olla.",
            "Si tienes ajo y cebolla, pícalos y sofríelos en un poco de aceite 2 min, luego incorpóralos al caldo.",
            "Agrega el elote desgranado y el nopal en tiras al caldo y cuece 8-10 min, hasta que el nopal esté suave y el elote tierno.",
            "Regresa el pollo deshebrado a la olla y calienta 2 min más.",
            "Ajusta la sal, espolvorea cilantro picado si tienes, y sirve caliente."
        ],
        "cravings": [
            "reconfortante",
            "caldoso"
        ],
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
        "servings": 4,
        "timeMin": 60,
        "effort": "medio",
        "mealType": "comida",
        "lowFriction": false,
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
        "steps": [
            "Corta la res magra en trozos y colócala en una olla grande con agua y sal.",
            "Cuece a fuego medio-bajo 40 min, retirando la espuma que suba a la superficie, hasta que la carne esté suave.",
            "Si tienes chayote y calabacita, pélalos y córtalos en cubos, y agrégalos al caldo.",
            "Si tienes jitomate, pícalo y añádelo también.",
            "Incorpora el nopal en tiras y cuece 10-12 min más, hasta que todas las verduras estén tiernas.",
            "Ajusta la sal, espolvorea cilantro picado si tienes, y sirve caliente en platos hondos."
        ],
        "cravings": [
            "reconfortante",
            "llenador",
            "caldoso"
        ],
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
        "family": "verduras",
        "format": "pasta",
        "description": "Nopales en tiras finas como pasta, salsa de tomate fresco y jengibre rallado.",
        "servings": 2,
        "timeMin": 20,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
        "ingredientsRequired": [
            "nopal",
            "jitomate",
            "jengibre"
        ],
        "ingredientsOptional": [
            "ajo",
            "cilantro"
        ],
        "steps": [
            "Corta los nopales limpios en tiras muy delgadas, como si fueran espagueti.",
            "Blanquea las tiras de nopal en agua hirviendo con sal 3-4 min, hasta que estén suaves pero firmes; escurre y reserva.",
            "Licua el jitomate con el jengibre pelado y un poco de sal, y si tienes, ajo, hasta obtener una salsa tersa.",
            "Calienta la salsa en un sartén con un poco de aceite 6-8 min, hasta que espese y concentre sabor.",
            "Incorpora las tiras de nopal a la salsa y mezcla 2 min para que se calienten.",
            "Sirve caliente y decora con cilantro picado, si tienes."
        ],
        "cravings": [
            "ligero",
            "saludable",
            "fresco"
        ],
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
        "family": "leguminosas",
        "format": "plato",
        "description": "Frijol pinto, jalapeño y atún fresco para una proteína completa y fibra.",
        "servings": 4,
        "timeMin": 30,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
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
        "steps": [
            "Calienta el frijol de olla con un poco de su caldo en una cazuela a fuego medio.",
            "Si tienes cebolla y chile serrano, pícalos finamente y sofríelos en un poco de aceite 3 min hasta que acitronen.",
            "Si tienes jitomate, pícalo y agrégalo al sofrito, cocinando 3-4 min más.",
            "Incorpora el sofrito al frijol y deja hervir 10 min para integrar los sabores.",
            "Sella el atún fresco en cubos en un sartén aparte con un poco de aceite y sal, 3-4 min, hasta que esté cocido por fuera.",
            "Agrega el atún a los frijoles y cuece 2 min más.",
            "Sirve caliente con cilantro picado encima, si tienes."
        ],
        "cravings": [
            "llenador",
            "reconfortante",
            "mexicano"
        ],
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
        "family": "cereales",
        "format": "plato",
        "description": "Clásico desayuno con pan de caja integral, huevo y canela. Endulzado naturalmente.",
        "servings": 2,
        "timeMin": 15,
        "effort": "bajo",
        "mealType": "desayuno",
        "lowFriction": true,
        "ingredientsRequired": [
            "pan_caja",
            "huevo",
            "leche",
            "canela_molida"
        ],
        "ingredientsOptional": [
            "vainilla",
            "platano_dulce",
            "miel"
        ],
        "steps": [
            "Bate el huevo con la leche y la canela molida en un tazón amplio.",
            "Si tienes vainilla, agrégala a la mezcla.",
            "Remoja cada rebanada de pan de caja en la mezcla unos segundos por lado, hasta que se empape sin deshacerse.",
            "Calienta un sartén con un poco de mantequilla o aceite a fuego medio.",
            "Cocina las rebanadas 2-3 min por lado, hasta que doren.",
            "Si tienes plátano dulce, rebánalo y colócalo encima.",
            "Sirve caliente con un chorrito de miel, si tienes."
        ],
        "cravings": [
            "dulce",
            "reconfortante"
        ],
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
        "servings": 4,
        "timeMin": 30,
        "effort": "medio",
        "mealType": "comida",
        "lowFriction": false,
        "ingredientsRequired": [
            "pollo",
            "pan_molido",
            "huevo"
        ],
        "ingredientsOptional": [
            "lechuga",
            "limon"
        ],
        "steps": [
            "Precalienta el horno a 200°C y forra una charola con papel encerado.",
            "Corta la pechuga de pollo en filetes delgados y sazona con sal.",
            "Bate el huevo en un plato hondo y coloca el pan molido en otro.",
            "Pasa cada filete primero por el huevo y luego por el pan molido, cubriendo bien ambos lados.",
            "Acomoda los filetes empanizados en la charola y hornea 20-25 min, volteando a la mitad, hasta que estén dorados y bien cocidos.",
            "Sirve con lechuga y exprime limón encima, si tienes."
        ],
        "cravings": [
            "crujiente",
            "reconfortante",
            "llenador"
        ],
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
        "servings": 4,
        "timeMin": 25,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
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
        "steps": [
            "Diluye el mole negro con un poco de agua o caldo caliente en una cazuela, moviendo hasta que espese ligeramente, 5-8 min.",
            "Calienta las tortillas de maíz una por una en un comal, unos 20 seg por lado.",
            "Sumerge cada tortilla en el mole y rellena con pollo deshebrado.",
            "Enrolla las tortillas y acomódalas en un plato.",
            "Baña las enmoladas con más mole caliente.",
            "Si tienes, desmorona queso fresco y espolvorea cebolla picada y ajonjolí encima.",
            "Sirve calientes."
        ],
        "cravings": [
            "mexicano",
            "reconfortante",
            "picante"
        ],
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
        "servings": 4,
        "timeMin": 25,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
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
        "steps": [
            "Precalienta el horno a 200°C o el air fryer a 190°C.",
            "Rellena las tortillas de maíz con el pollo deshebrado y enróllalas apretadas, sujetando con un palillo si es necesario.",
            "Barniza los tacos con un poco de aceite por fuera.",
            "Hornea 15-18 min, volteando a la mitad, hasta que estén dorados y crujientes.",
            "Retira los palillos y acomoda los tacos en un plato.",
            "Si tienes, agrega lechuga picada, crema, salsa roja y queso fresco encima.",
            "Sirve de inmediato mientras estén crujientes."
        ],
        "cravings": [
            "crujiente",
            "reconfortante",
            "mexicano"
        ],
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
        "servings": 2,
        "timeMin": 15,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
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
        "steps": [
            "Limpia la flor de calabaza y pica los hongos en trozos pequeños.",
            "Calienta un poco de aceite en un sartén y sofríe los hongos 4-5 min, hasta que suelten su agua y doren ligeramente.",
            "Agrega la flor de calabaza y, si tienes, epazote picado; cocina 2 min más hasta que la flor se marchite.",
            "Calienta las tortillas de maíz en un comal, coloca queso Oaxaca deshebrado y el relleno de hongos y flor de calabaza encima.",
            "Dobla las tortillas por la mitad y cocina 2-3 min por lado, hasta que el queso derrita y la tortilla dore.",
            "Sirve calientes con salsa verde, si tienes."
        ],
        "cravings": [
            "ligero",
            "reconfortante",
            "mexicano"
        ],
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
        "servings": 4,
        "timeMin": 30,
        "effort": "medio",
        "mealType": "comida",
        "lowFriction": true,
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
        "steps": [
            "Sazona la pechuga de pollo con sal y séllala en un sartén con un poco de aceite, 4-5 min por lado, hasta que dore; retira y reserva.",
            "En el mismo sartén, sofríe el ajo picado 1 min hasta que aromatice.",
            "Agrega el jitomate picado y cocina 8-10 min a fuego medio, aplastando un poco, hasta que se concentre y espese.",
            "Retira del fuego e incorpora el yogurt natural, moviendo rápido para que no se corte, y sazona con sal.",
            "Regresa el pollo al sartén y cocina 5-8 min más, hasta que esté bien cocido y la salsa lo cubra.",
            "Agrega la albahaca picada al final.",
            "Si tienes, sirve sobre pasta seca cocida y espolvorea parmesano encima."
        ],
        "cravings": [
            "cremoso",
            "elegante",
            "antojo"
        ],
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
        "family": "cereales",
        "format": "plato",
        "description": "Pancakes saludables sin harina procesada. Solo avena, plátano y huevo.",
        "servings": 2,
        "timeMin": 15,
        "effort": "bajo",
        "mealType": "desayuno",
        "lowFriction": true,
        "ingredientsRequired": [
            "avena",
            "platano_dulce",
            "huevo"
        ],
        "ingredientsOptional": [
            "vainilla",
            "canela_molida"
        ],
        "steps": [
            "Machaca el plátano dulce en un tazón hasta hacerlo puré.",
            "Agrega la avena y el huevo, y mezcla bien hasta integrar.",
            "Si tienes, añade vainilla y canela molida para dar sabor.",
            "Deja reposar la mezcla 2-3 min para que la avena se hidrate un poco.",
            "Calienta un sartén antiadherente con un poco de aceite o mantequilla a fuego medio-bajo.",
            "Vierte porciones de la mezcla y cocina 2-3 min por lado, hasta que doren y burbujeen en la superficie.",
            "Sirve calientes."
        ],
        "cravings": [
            "dulce",
            "saludable",
            "rapido"
        ],
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
        "servings": 2,
        "timeMin": 25,
        "effort": "bajo",
        "mealType": "desayuno",
        "lowFriction": true,
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
        "steps": [
            "Pica la cebolla y la calabacita en cubos pequeños.",
            "Calienta un poco de aceite en un sartén y sofríe la cebolla 3 min hasta que acitrone.",
            "Agrega la calabacita y, si tienes, chile serrano picado; cocina 4-5 min hasta que suavicen.",
            "Incorpora el jitomate picado y el epazote, y cocina 8-10 min hasta formar una salsa espesa.",
            "Haz pequeños huecos en la salsa y casca los huevos directamente sobre ella.",
            "Tapa el sartén y cocina a fuego bajo 5-6 min, hasta que las claras cuajen y la yema quede a tu gusto.",
            "Si tienes, desmorona queso fresco encima y sirve caliente directo del sartén."
        ],
        "cravings": [
            "reconfortante",
            "saludable",
            "fresco"
        ],
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
        "servings": 2,
        "timeMin": 10,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
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
        "steps": [
            "Calienta un sartén o comal a fuego medio.",
            "Si tienes, frota las tortillas de harina con un poco de aceite de oliva y ajo picado.",
            "Coloca la tortilla de harina en el sartén y distribuye rodajas de jitomate encima.",
            "Agrega el queso Oaxaca deshebrado sobre el jitomate.",
            "Cocina tapado 4-5 min, hasta que el queso derrita y la base esté dorada y crujiente.",
            "Agrega hojas de albahaca fresca encima.",
            "Corta en triángulos y sirve de inmediato."
        ],
        "cravings": [
            "rapido",
            "internacional",
            "ligero"
        ],
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
        "servings": 4,
        "timeMin": 25,
        "effort": "medio",
        "mealType": "comida",
        "lowFriction": true,
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
        "steps": [
            "Mezcla la res molida magra con sal y forma 4 hamburguesas de grosor uniforme.",
            "Calienta un sartén o parrilla a fuego medio-alto y cocina las hamburguesas 4-5 min por lado, hasta que estén doradas y bien cocidas.",
            "Si tienes queso manchego, colócalo encima de cada hamburguesa en el último minuto de cocción para que se derrita.",
            "Tuesta ligeramente el pan integral en el mismo sartén, 1 min por lado.",
            "Rebana la cebolla y el jitomate, y lava la lechuga.",
            "Arma las hamburguesas en el pan con lechuga, jitomate y cebolla.",
            "Si tienes, agrega rodajas de chile jalapeño para un toque picante y sirve de inmediato."
        ],
        "cravings": [
            "llenador",
            "antojo",
            "reconfortante"
        ],
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
        "servings": 2,
        "timeMin": 15,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
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
        "steps": [
            "Calienta el caldo de pollo en una olla a fuego medio hasta que hierva.",
            "Agrega el nopal en tiras y cuece 4-5 min hasta que se ablanden.",
            "Incorpora el pollo deshebrado y calienta 2 min.",
            "Agrega los fideos ramen y cuece 3-4 min, hasta que estén suaves pero firmes.",
            "Si tienes, agrega un huevo cocido partido a la mitad encima de cada plato.",
            "Sirve caliente y espolvorea cebollín picado, si tienes."
        ],
        "cravings": [
            "caldoso",
            "rapido",
            "reconfortante"
        ],
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
        "servings": 4,
        "timeMin": 35,
        "effort": "medio",
        "mealType": "comida",
        "lowFriction": false,
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
        "steps": [
            "Pon a hervir agua con sal para la pasta integral.",
            "Pica la cebolla, el ajo y, si tienes, la zanahoria en trozos pequeños.",
            "Sofríe la cebolla, el ajo y la zanahoria en un poco de aceite 4-5 min hasta que suavicen.",
            "Agrega la res molida magra y cocina 6-8 min, deshaciendo los grumos, hasta que dore por completo.",
            "Incorpora el jitomate picado, sazona con sal y cocina a fuego medio-bajo 12-15 min, hasta que la salsa espese.",
            "Cuece la pasta integral en el agua hirviendo 8-10 min o según el paquete, hasta que esté al dente; escurre.",
            "Mezcla la pasta con la salsa bolognesa.",
            "Sirve caliente y espolvorea parmesano encima, si tienes."
        ],
        "cravings": [
            "reconfortante",
            "llenador",
            "internacional"
        ],
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
        "servings": 6,
        "timeMin": 60,
        "effort": "alto",
        "mealType": "comida",
        "lowFriction": false,
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
        "steps": [
            "Precalienta el horno a 190°C.",
            "Dora la res molida magra en un sartén y agrega el jitomate picado y sal; cocina 15 min hasta obtener una salsa espesa.",
            "Corta la calabacita en rodajas delgadas y, si tienes, el champiñón en láminas.",
            "Cuece la pasta seca en agua con sal hasta que esté un poco antes del punto al dente; escurre.",
            "Arma la lasaña en capas alternando pasta, salsa de res, calabacita, champiñón y espinaca si tienes, y queso Oaxaca deshebrado, repitiendo hasta terminar.",
            "Cubre con una última capa de queso Oaxaca.",
            "Hornea 25-30 min, hasta que burbujee y el queso dore.",
            "Deja reposar 5 min antes de cortar y servir."
        ],
        "cravings": [
            "reconfortante",
            "llenador"
        ],
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
        "servings": 4,
        "timeMin": 30,
        "effort": "medio",
        "mealType": "comida",
        "lowFriction": true,
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
        "steps": [
            "Cuece la pasta seca en agua con sal hasta que esté al dente; escurre y reserva.",
            "Corta la pechuga de pollo en tiras delgadas y sazona con sal.",
            "Calienta un poco de aceite en un wok o sartén grande y sofríe la cebolla fileteada 2 min.",
            "Agrega el pollo y cocina 5-6 min hasta que esté bien dorado y cocido.",
            "Si tienes, empuja todo a un lado, agrega el huevo batido y revuelve hasta que cuaje; luego mezcla con el pollo.",
            "Incorpora la pasta cocida, el jugo de limón y el cacahuate picado, y saltea 2-3 min para integrar todo.",
            "Si tienes, espolvorea cilantro y chile en polvo al gusto.",
            "Sirve caliente con más limón al lado."
        ],
        "cravings": [
            "internacional",
            "antojo",
            "fresco"
        ],
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
        "servings": 4,
        "timeMin": 40,
        "effort": "medio",
        "mealType": "comida",
        "lowFriction": true,
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
        "steps": [
            "Calienta el caldo de res en una olla grande con, si tienes, jengibre y cebolla en trozos, y deja hervir 15-20 min para que tome sabor.",
            "Corta la res magra en rebanadas muy delgadas y reserva.",
            "Cuece la pasta seca aparte en agua hasta que esté suave, según el paquete; escurre.",
            "Cuela el caldo si usaste jengibre y cebolla en trozo, y regrésalo a la olla hirviendo.",
            "Reparte la pasta en tazones y coloca las rebanadas de res crudas encima.",
            "Vierte el caldo hirviendo sobre la res y la pasta; el calor terminará de cocer la carne.",
            "Agrega hojas de hierbabuena y exprime limón encima.",
            "Si tienes, decora con cilantro picado y sirve de inmediato."
        ],
        "cravings": [
            "caldoso",
            "ligero",
            "reconfortante"
        ],
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
        "servings": 2,
        "timeMin": 20,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
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
        "steps": [
            "Sazona la pechuga de pollo con sal y ásala en un sartén o parrilla 5-6 min por lado, hasta que esté bien cocida y con marcas doradas.",
            "Deja reposar el pollo 3 min y córtalo en tiras.",
            "Prepara el aderezo mezclando el yogurt natural, el ajo picado o machacado y las anchoas picadas finamente hasta integrar.",
            "Lava y trocea la lechuga en trozos grandes.",
            "Mezcla la lechuga con el aderezo hasta cubrir bien las hojas.",
            "Si tienes, corta el pan de caja en cubos y tuéstalo para hacer crutones.",
            "Sirve la ensalada con las tiras de pollo encima y espolvorea parmesano y los crutones, si tienes."
        ],
        "cravings": [
            "fresco",
            "ligero",
            "saludable"
        ],
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
        "servings": 6,
        "timeMin": 90,
        "effort": "medio",
        "mealType": "comida",
        "lowFriction": false,
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
        "steps": [
            "Corta la res magra en cubos y sazona con sal.",
            "Calienta un poco de aceite en una olla y sella la carne por todos lados, 5-6 min, hasta que dore.",
            "Agrega la cebolla picada y cocina 3-4 min hasta que acitrone.",
            "Espolvorea el pimentón sobre la carne y mezcla 1 min para que se tueste ligeramente sin quemarse.",
            "Si tienes, agrega el jitomate y el ajo picados, y cocina 2 min más.",
            "Cubre con agua o caldo hasta cubrir la carne y cuece tapado a fuego bajo 45-50 min.",
            "Agrega la papa y la zanahoria en cubos, y cuece 20-25 min más, hasta que todo esté suave y el caldo espese.",
            "Ajusta la sal y sirve caliente en platos hondos."
        ],
        "cravings": [
            "reconfortante",
            "llenador"
        ],
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
        "family": "leguminosas",
        "format": "plato",
        "description": "Sabor profundo y antiinflamatorio con ajo asado dulce y jengibre.",
        "servings": 4,
        "timeMin": 25,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
        "ingredientsRequired": [
            "frijol",
            "jengibre",
            "ajo"
        ],
        "ingredientsOptional": [
            "cebolla"
        ],
        "steps": [
            "Asa los dientes de ajo con cáscara en un comal seco a fuego medio 8-10 min, volteando, hasta que se ablanden y doren; deja enfriar y pélalos.",
            "Ralla o pica finamente el jengibre.",
            "Si tienes, pica la cebolla y sofríela en un poco de aceite 3 min hasta que acitrone.",
            "Machaca el ajo asado e incorpóralo junto con el jengibre a la cebolla, cocinando 1-2 min hasta que aromatice.",
            "Agrega el frijol de olla con un poco de su caldo y cuece 8-10 min a fuego medio para integrar los sabores.",
            "Ajusta la sal y sirve caliente."
        ],
        "cravings": [
            "reconfortante",
            "saludable"
        ],
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
        "servings": 4,
        "timeMin": 35,
        "effort": "medio",
        "mealType": "comida",
        "lowFriction": false,
        "ingredientsRequired": [
            "chile_poblano",
            "queso_fresco",
            "nopal"
        ],
        "ingredientsOptional": [
            "ajo",
            "cebolla"
        ],
        "steps": [
            "Asa los chiles poblanos directamente sobre la flama o en un comal, volteando, hasta que la piel se ampolle y ennegrezca por completo, 8-10 min.",
            "Coloca los chiles en una bolsa de plástico cerrada 10 min para que suden, luego pélalos con cuidado y haz un corte a lo largo para retirar las semillas sin romperlos.",
            "Pica el nopal cocido y, si tienes, sofríelo con ajo y cebolla picados en un poco de aceite 3-4 min.",
            "Mezcla el nopal sofrito con el queso fresco desmoronado.",
            "Rellena cada chile poblano con la mezcla de queso y nopal.",
            "Coloca los chiles rellenos en un sartén tapado a fuego bajo 5-6 min, solo para calentar y que el queso se suavice.",
            "Sirve calientes, dos chiles por persona."
        ],
        "cravings": [
            "mexicano",
            "reconfortante",
            "saludable",
            "picante"
        ],
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
        "servings": 4,
        "timeMin": 40,
        "effort": "medio",
        "mealType": "comida",
        "lowFriction": false,
        "ingredientsRequired": [
            "tortilla_maiz",
            "huevo",
            "pepita_calabaza"
        ],
        "ingredientsOptional": [
            "queso_fresco"
        ],
        "steps": [
            "Cuece los huevos en agua hirviendo 10 min hasta que estén duros; enfríalos, pélalos y pícalos.",
            "Tuesta la pepita de calabaza en un comal a fuego medio 3-4 min, moviendo constantemente, hasta que empiece a tronar; deja enfriar.",
            "Muele la pepita tostada con un poco de agua y sal hasta obtener una salsa espesa de color verde claro.",
            "Calienta la salsa de pepita en una olla a fuego bajo 5 min, sin dejar que hierva fuerte, hasta que espese ligeramente.",
            "Calienta las tortillas de maíz en un comal y rellena cada una con huevo picado.",
            "Enrolla las tortillas y báñalas con la salsa de pepita caliente.",
            "Si tienes, desmorona queso fresco encima y sirve de inmediato."
        ],
        "cravings": [
            "mexicano",
            "reconfortante",
            "llenador"
        ],
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
        "family": "pescados",
        "format": "plato",
        "description": "Filete de atún con salsa fresca de tomate y jengibre rallado.",
        "servings": 2,
        "timeMin": 20,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
        "ingredientsRequired": [
            "atun_fresco",
            "jitomate",
            "jengibre"
        ],
        "ingredientsOptional": [
            "ajo",
            "cilantro"
        ],
        "steps": [
            "Sazona los filetes de atún fresco con sal.",
            "Licua o pica finamente el jitomate con el jengibre pelado hasta obtener una salsa fresca.",
            "Si tienes, agrega ajo picado a la salsa y sazona con sal.",
            "Calienta una parrilla o sartén a fuego alto y sella el atún 2 min por lado, hasta que dore por fuera y quede rosado en el centro.",
            "Calienta la salsa de jitomate y jengibre en un sartén aparte 5 min, hasta que espese ligeramente.",
            "Sirve el atún bañado con la salsa y espolvorea cilantro picado, si tienes."
        ],
        "cravings": [
            "saludable",
            "reconfortante",
            "fresco"
        ],
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
        "family": "pescados",
        "format": "bowl",
        "description": "Adaptación creativa con base de masa, atún cocido, nopales y aguacate.",
        "servings": 2,
        "timeMin": 30,
        "effort": "medio",
        "mealType": "comida",
        "lowFriction": false,
        "ingredientsRequired": [
            "masa_maiz",
            "atun_fresco",
            "nopal"
        ],
        "ingredientsOptional": [
            "aguacate",
            "jengibre"
        ],
        "steps": [
            "Cuece la masa de maíz con un poco de agua y sal en una olla a fuego bajo, moviendo constantemente, 8-10 min, hasta obtener una pasta espesa y moldeable; deja enfriar un poco.",
            "Sella el atún fresco en un sartén con un poco de aceite 1-2 min por lado, dejando el centro rosado, y córtalo en tiras.",
            "Cuece el nopal en tiras en agua con sal 5 min hasta que esté suave; escurre y deja enfriar.",
            "Si tienes, corta el aguacate en tiras.",
            "Extiende la masa de maíz sobre un plástico o papel encerado formando un rectángulo delgado.",
            "Coloca las tiras de atún, nopal y, si tienes, aguacate y jengibre encima, y enrolla apretando bien con ayuda del plástico.",
            "Corta el rollo en piezas con un cuchillo húmedo.",
            "Sirve frío o a temperatura ambiente."
        ],
        "cravings": [
            "ligero",
            "fresco",
            "saludable"
        ],
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
        "servings": 4,
        "timeMin": 25,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
        "ingredientsRequired": [
            "pollo",
            "jengibre"
        ],
        "ingredientsOptional": [
            "ajo",
            "cebolla",
            "cilantro"
        ],
        "steps": [
            "Corta la pechuga de pollo en tiras delgadas y sazona con sal.",
            "Ralla o pica finamente el jengibre.",
            "Si tienes, pica el ajo y la cebolla.",
            "Calienta un poco de aceite en un wok o sartén a fuego alto y sofríe el ajo y la cebolla 1-2 min hasta que aromaticen.",
            "Agrega el pollo y cocina 6-8 min, moviendo con frecuencia, hasta que esté dorado y bien cocido.",
            "Incorpora el jengibre en los últimos 2 min de cocción para que no se amargue.",
            "Sirve caliente y espolvorea cilantro picado, si tienes."
        ],
        "cravings": [
            "reconfortante",
            "saludable"
        ],
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
        "family": "leguminosas",
        "format": "tortilla",
        "description": "Tortilla rellena de queso y rajas, bañada en salsa de frijol.",
        "servings": 2,
        "timeMin": 25,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
        "ingredientsRequired": [
            "tortilla_maiz",
            "queso_fresco",
            "chile_poblano"
        ],
        "ingredientsOptional": [
            "frijol",
            "epazote"
        ],
        "steps": [
            "Asa los chiles poblanos sobre la flama o en un comal hasta que la piel se ampolle, unos 5 min; mételos en una bolsa de plástico 10 min y pélalos.",
            "Corta los chiles poblanos en rajas delgadas, retirando las semillas.",
            "Si tienes frijoles negros cocidos, lícualos con un poco de su caldo y epazote hasta lograr una salsa tersa; caliéntala en un sartén a fuego bajo.",
            "Calienta las tortillas de maíz una por una en un comal, unos 20 seg por lado, hasta que estén suaves.",
            "Rellena cada tortilla con las rajas de poblano y queso fresco desmoronado; enróllalas y acomódalas en un plato.",
            "Baña las enchiladas con la salsa de frijol caliente (o con un poco de caldo sazonado si no tienes frijoles) y espolvorea más queso fresco encima.",
            "Sirve de inmediato, bien calientes."
        ],
        "cravings": [
            "mexicano",
            "reconfortante",
            "picante"
        ],
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
        "family": "leguminosas",
        "format": "plato",
        "description": "Plátano verde (almidón resistente) con frijoles refritos y queso.",
        "servings": 2,
        "timeMin": 30,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
        "ingredientsRequired": [
            "platano_verde",
            "frijol"
        ],
        "ingredientsOptional": [
            "queso_fresco",
            "salsa_verde"
        ],
        "steps": [
            "Pela los plátanos verdes y córtalos en rodajas de 2 cm de grosor.",
            "Fríe las rodajas en un poco de aceite caliente 3-4 min por lado, hasta que doren ligeramente; retíralas.",
            "Aplánalas con un plato o tostonera hasta dejarlas delgadas.",
            "Vuelve a freírlas 2 min más por lado hasta que queden crujientes y doradas; escúrrelas sobre papel absorbente y sazona con sal.",
            "Calienta el frijol negro (o fríelo ligeramente para hacerlo refrito) hasta que espese.",
            "Sirve los tostones con los frijoles al lado o encima; si tienes, agrega queso fresco desmoronado y un poco de salsa verde."
        ],
        "cravings": [
            "llenador",
            "reconfortante",
            "saludable"
        ],
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
        "family": "leguminosas",
        "format": "antojito",
        "description": "Masa nixtamalizada rellena de garbanzo con topping de champiñones. Alta en fibra prebiótica.",
        "servings": 4,
        "timeMin": 40,
        "effort": "medio",
        "mealType": "comida",
        "lowFriction": false,
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
        "steps": [
            "Cuece las lentejas en agua con sal hasta que estén suaves, unos 20 min; escúrrelas y machácalas hasta formar una pasta.",
            "Pica finamente la cebolla y el ajo; sofríelos en un poco de aceite 3 min hasta que acitronen, incorpóralos a la pasta de lentejas y sazona con sal.",
            "Amasa la masa de maíz con un poco de agua tibia hasta que esté suave y no se agriete en los bordes.",
            "Forma bolitas de masa, haz un hueco en el centro con los dedos y rellena con la pasta de lentejas; cierra y da forma ovalada de tlacoyo, aplanando ligeramente.",
            "Cuece los tlacoyos en un comal a fuego medio 4-5 min por lado, hasta que la masa esté cocida y con manchitas doradas.",
            "Rebana los hongos y saltéalos en un sartén con un poco de aceite 5 min hasta que doren; sazona con sal (si tienes epazote, agrégalo picado).",
            "Sirve los tlacoyos con los hongos salteados encima; si tienes, añade salsa verde y queso fresco desmoronado."
        ],
        "cravings": [
            "mexicano",
            "saludable"
        ],
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
        "servings": 4,
        "timeMin": 50,
        "effort": "medio",
        "mealType": "comida",
        "lowFriction": true,
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
        "steps": [
            "Remoja los chiles anchos en agua caliente 10 min hasta que suavicen; lícualos con un poco de agua, la cebolla y el ajo hasta obtener una salsa tersa.",
            "Cuela la salsa y sofríela en una olla con un poco de aceite 5 min, hasta que espese y oscurezca ligeramente.",
            "Agrega el maíz pozolero (ya cocido) junto con 6-8 tazas de agua o caldo; deja hervir a fuego medio 20 min para que los sabores se integren.",
            "Incorpora el pollo deshebrado y cuece 10 min más; ajusta de sal.",
            "Pica finamente la lechuga y el rábano, si tienes; corta el limón en cuartos.",
            "Sirve el pozole caliente en tazones y acompaña con lechuga, rábano, limón y orégano al gusto."
        ],
        "cravings": [
            "mexicano",
            "reconfortante",
            "caldoso",
            "picante"
        ],
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
        "family": "pescados",
        "format": "plato",
        "description": "Proteína magra con fibra de legumbres y antioxidantes del pimiento. Estilo mediterráneo.",
        "servings": 2,
        "timeMin": 25,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
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
        "steps": [
            "Corta el pimiento rojo en tiras y pica el ajo finamente.",
            "Calienta un poco de aceite de oliva en un sartén a fuego medio y sofríe el ajo y el pimiento rojo 5 min, hasta que suavicen; si tienes, agrega pimentón para dar color.",
            "Añade la lenteja cocida y las aceitunas, y cocina 3 min más para que se calienten e integren los sabores.",
            "Sazona el pescado blanco con sal y pimienta, y colócalo sobre la mezcla de verduras en el sartén.",
            "Tapa y cocina a fuego medio-bajo 8-10 min, hasta que el pescado esté opaco y se deshaga fácilmente con un tenedor.",
            "Sirve el pescado sobre las lentejas y pimientos; exprime un poco de limón encima si tienes."
        ],
        "cravings": [
            "ligero",
            "internacional"
        ],
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
        "family": "leguminosas",
        "format": "bowl",
        "description": "Súper bowl de hierro y fibra. Las lentejas y el huevo crean una proteína completa.",
        "servings": 2,
        "timeMin": 25,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
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
        "steps": [
            "Calienta la lenteja cocida en una olla pequeña con un chorrito de agua o caldo, junto con el ajo picado, hasta que esté caliente, unos 5 min.",
            "Agrega la espinaca y cocina 2 min más, solo hasta que se marchite.",
            "Pon a hervir agua en otra olla; baja a fuego suave, forma un remolino con una cuchara y desliza el huevo con cuidado para escalfarlo 3 min, hasta que la clara esté firme y la yema suave.",
            "Retira el huevo con una espumadera y escúrrelo sobre papel absorbente.",
            "Sirve las lentejas con espinaca en un tazón, coloca el huevo ponché encima y exprime limón por arriba.",
            "Si tienes, agrega perejil picado y un chorrito de aceite de oliva antes de servir."
        ],
        "cravings": [
            "reconfortante",
            "saludable",
            "llenador"
        ],
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
        "name": "Pollo Relleno de Espinaca y Ricotta",
        "family": "pollo",
        "format": "plato",
        "description": "Pechuga magra rellena de espinacas y queso ligero. Alta densidad nutricional.",
        "servings": 2,
        "timeMin": 35,
        "effort": "medio",
        "mealType": "comida",
        "lowFriction": true,
        "ingredientsRequired": [
            "pollo",
            "espinaca",
            "queso_fresco"
        ],
        "ingredientsOptional": [
            "ajo",
            "limon"
        ],
        "steps": [
            "Precalienta el horno a 200°C.",
            "Marchita la espinaca en un sartén con un poco de aceite y, si tienes, ajo picado, 2 min; escúrrela y pícala.",
            "Mezcla la espinaca con el queso fresco desmoronado para hacer el relleno.",
            "Haz un corte horizontal en cada pechuga de pollo para formar una bolsa, sin atravesarla por completo; rellénala con la mezcla de espinaca y queso, y cierra con palillos.",
            "Sella el pollo en un sartén con aceite caliente 2 min por lado hasta dorar.",
            "Termina de cocinar en el horno 15-18 min, hasta que el pollo alcance los 74°C internos y ya no esté rosado.",
            "Retira los palillos, exprime un poco de limón si tienes, y sirve caliente."
        ],
        "cravings": [
            "elegante",
            "saludable"
        ],
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
        "name": "Pollo Estilo Indio en Air Fryer",
        "family": "pollo",
        "format": "plato",
        "description": "Versión NiME-ificada: Pollo marinado en especias indias y cocinado en Air Fryer en lugar de frito.",
        "servings": 2,
        "timeMin": 25,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
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
        "steps": [
            "Corta el pollo en trozos medianos.",
            "Ralla el jengibre y pica el ajo; mézclalos con el yogurt natural en un tazón grande.",
            "Si tienes, agrega chile ancho remojado y picado, y cúrcuma, para dar color y sabor a la marinada.",
            "Añade el pollo a la marinada, cubre bien y deja reposar al menos 10 min (idealmente 30 min o toda la noche en el refrigerador).",
            "Acomoda el pollo marinado en la canasta del air fryer sin encimar las piezas.",
            "Cocina a 200°C 12-14 min, volteando a la mitad, hasta que esté dorado y bien cocido por dentro.",
            "Sirve caliente."
        ],
        "cravings": [
            "internacional",
            "picante",
            "saludable"
        ],
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
        "servings": 6,
        "timeMin": 60,
        "effort": "alto",
        "mealType": "postre",
        "lowFriction": false,
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
        "steps": [
            "Precalienta el horno a 180°C y engrasa un molde rectangular.",
            "Muele las avellanas en un procesador hasta obtener una harina gruesa.",
            "Bate los huevos con el monkfruit (o azúcar al gusto, si no tienes) hasta que blanqueen y dupliquen su volumen, unos 5 min.",
            "Incorpora la leche poco a poco, alternando con la harina de avellana, hasta obtener una mezcla homogénea; si tienes, agrega ralladura de limón.",
            "Vierte la mezcla en el molde y hornea 30-35 min, hasta que al insertar un palillo salga limpio.",
            "Deja enfriar por completo antes de desmoldar.",
            "Si tienes, derrite el chocolate amargo y báñalo sobre el pastel antes de rebanar.",
            "Corta en rebanadas y sirve."
        ],
        "cravings": [
            "dulce",
            "antojo"
        ],
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
        "name": "Chileatole",
        "family": "maiz",
        "format": "sopa",
        "description": "Sopa espesa de elote con epazote y chile. Versión NiME usando harina de maíz integral.",
        "servings": 4,
        "timeMin": 50,
        "effort": "medio",
        "mealType": "comida",
        "lowFriction": true,
        "ingredientsRequired": [
            "elote",
            "masa_maiz",
            "chile_serrano",
            "epazote"
        ],
        "ingredientsOptional": [
            "limon"
        ],
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
        "steps": [
            "Desgrana los elotes; muele la mitad de los granos con un poco de agua hasta obtener un puré y reserva el resto entero.",
            "Asa los chiles serranos en un comal 3 min hasta que se ampollen ligeramente; pícalos finamente (quítales las semillas si prefieres menos picor).",
            "Disuelve la masa de maíz en 4 tazas de agua hasta que no queden grumos.",
            "Vierte la mezcla de masa en una olla junto con el puré y los granos de elote enteros; cocina a fuego medio, moviendo seguido para que no se pegue, 15 min.",
            "Agrega el chile serrano picado y las hojas de epazote, y cocina 10 min más hasta que espese como atole.",
            "Ajusta de sal y, si tienes, exprime un poco de limón al final.",
            "Sirve caliente en tazones."
        ],
        "cravings": [
            "reconfortante",
            "caldoso",
            "picante",
            "mexicano"
        ],
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
        "id": "joroches_yucatecos_nime",
        "name": "Joroches Yucatecos",
        "family": "leguminosas",
        "format": "sopa",
        "description": "Bolitas de masa en caldo de frijol negro, al estilo yucateco. Alta densidad de fibra prebiótica.",
        "servings": 4,
        "timeMin": 80,
        "effort": "medio",
        "mealType": "comida",
        "lowFriction": false,
        "ingredientsRequired": [
            "masa_maiz",
            "frijol",
            "jitomate",
            "cebolla",
            "ajo"
        ],
        "ingredientsOptional": [
            "epazote",
            "queso_fresco",
            "crema"
        ],
        "steps": [
            "Licúa el frijol negro cocido con un poco de su caldo hasta obtener un puré espeso.",
            "Pica la cebolla y el ajo; sofríelos en una olla con un poco de aceite 5 min hasta acitronar.",
            "Agrega el jitomate picado y cocina 5 min más, hasta que suelte su jugo.",
            "Incorpora el puré de frijol y 4-5 tazas de agua o caldo; deja hervir a fuego medio 20 min. Si tienes epazote, agrégalo.",
            "Mientras tanto, amasa la masa de maíz con un poco de agua y sal, y forma bolitas alargadas (joroches) del tamaño de un dedo.",
            "Agrega los joroches al caldo hirviendo y cuece 15-20 min, hasta que floten y estén cocidos por dentro.",
            "Sirve caliente en tazones; si tienes, corona con queso fresco desmoronado y un chorrito de crema."
        ],
        "cravings": [
            "reconfortante",
            "mexicano"
        ],
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
        "name": "Enchiladas Mineras",
        "family": "pollo",
        "format": "tortilla",
        "description": "Enchiladas tradicionales con zanahoria y papa. Versión NiME con menos aceite y más vegetales.",
        "servings": 4,
        "timeMin": 75,
        "effort": "medio",
        "mealType": "comida",
        "lowFriction": false,
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
        "steps": [
            "Pela y corta la papa y la zanahoria en cubos pequeños; cuécelas en agua con sal 10-12 min hasta que estén suaves. Escurre.",
            "Remoja los chiles guajillo en agua caliente 10 min hasta suavizar; lícualos con un poco de esa agua hasta obtener una salsa tersa y cuélala.",
            "Sofríe la salsa de guajillo en un sartén con un poco de aceite 5 min, hasta que espese.",
            "Calienta las tortillas de maíz en un comal y pásalas rápidamente por la salsa de guajillo caliente para suavizarlas.",
            "Rellena cada tortilla con pollo deshebrado, enróllala y acomódala en un plato; baña con más salsa.",
            "Corona con la papa y la zanahoria cocidas.",
            "Si tienes, agrega lechuga picada, queso fresco desmoronado y un chorrito de crema antes de servir."
        ],
        "cravings": [
            "reconfortante",
            "llenador",
            "mexicano",
            "picante"
        ],
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
        "name": "Tostadas Frescas de Pollo y Hierbas",
        "family": "pollo",
        "format": "plato",
        "description": "Tostadas de frijol y pollo deshebrado con hierbas frescas (menta, albahaca y cilantro). Máxima frescura.",
        "servings": 2,
        "timeMin": 15,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
        "ingredientsRequired": [
            "frijol",
            "pollo_deshebrado",
            "albahaca",
            "menta",
            "cilantro"
        ],
        "ingredientsOptional": [
            "limon",
            "chile_serrano"
        ],
        "steps": [
            "Calienta el frijol negro cocido en un sartén con un poco de su caldo, machacándolo ligeramente para que quede como puré untable, 3 min.",
            "Calienta el pollo deshebrado en el mismo sartén o en el microondas, 2 min.",
            "Lava y deshoja la albahaca, la menta y el cilantro.",
            "Unta una capa de frijoles sobre cada tostada.",
            "Corona con el pollo deshebrado y las hierbas frescas encima.",
            "Si tienes, agrega chile serrano en rodajas y un chorrito de limón antes de servir."
        ],
        "cravings": [
            "fresco",
            "ligero",
            "saludable"
        ],
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
        "name": "Tamales de Rajas con Queso",
        "family": "maiz",
        "format": "antojito",
        "description": "Tamales de rajas de chile poblano y queso. Versión NiME con aceite de oliva en lugar de manteca.",
        "servings": 6,
        "timeMin": 120,
        "effort": "alto",
        "mealType": "comida",
        "lowFriction": false,
        "ingredientsRequired": [
            "masa_maiz",
            "queso_oaxaca",
            "elote",
            "chile_poblano"
        ],
        "ingredientsOptional": [
            "aceite_oliva",
            "yogurt_natural",
            "cebolla"
        ],
        "steps": [
            "Remoja las hojas de maíz secas en agua caliente al menos 30 min, hasta que estén flexibles.",
            "Asa los chiles poblanos hasta que la piel se ampolle, pélalos y córtalos en rajas; si tienes, acitrona un poco de cebolla picada con aceite de oliva y agrégala.",
            "Desgrana los elotes y muele la mitad de los granos; mezcla con el resto de granos enteros.",
            "Bate la masa de maíz con aceite de oliva (o, si tienes, un poco de yogurt natural para dar suavidad) y sal, hasta que esponje: al poner una bolita en agua, debe flotar.",
            "Incorpora el elote molido y entero a la masa batida.",
            "Extiende una capa de masa sobre cada hoja de maíz, rellena con rajas de poblano y queso Oaxaca, y envuelve doblando los lados y la punta.",
            "Acomoda los tamales de pie en una vaporera con agua hirviendo y cuece 60-75 min, hasta que la masa se desprenda fácilmente de la hoja.",
            "Deja reposar 10 min antes de servir calientes."
        ],
        "cravings": [
            "mexicano",
            "internacional",
            "llenador"
        ],
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
        "name": "Chilaquiles Verdes con Res",
        "family": "res",
        "format": "tortilla",
        "description": "Res magra deshebrada con totopos horneados en salsa verde. Alta proteína y fibra.",
        "servings": 4,
        "timeMin": 40,
        "effort": "medio",
        "mealType": "desayuno",
        "lowFriction": false,
        "ingredientsRequired": [
            "masa_maiz",
            "res_magra",
            "tomate_verde",
            "chile_serrano"
        ],
        "ingredientsOptional": [
            "aguacate",
            "cilantro",
            "crema"
        ],
        "steps": [
            "Extiende porciones de masa de maíz y forma tortillas delgadas; cuécelas en un comal 1 min por lado.",
            "Corta las tortillas en triángulos y fríelos en un poco de aceite hasta que doren y queden crujientes (o hornéalos a 200°C 10 min); escúrrelos sobre papel absorbente.",
            "Cuece el tomate verde y el chile serrano en agua hirviendo 8 min, hasta que cambien de color y se suavicen.",
            "Licúa el tomate verde y el chile serrano con un poco del agua de cocción hasta obtener una salsa tersa; sofríela en un sartén 5 min hasta que espese.",
            "Deshebra la res magra (previamente cocida) y agrégala a la salsa verde; cocina 5 min para que se impregne de sabor.",
            "Añade los totopos a la salsa con res y mezcla suavemente hasta que se humedezcan sin perder toda su textura.",
            "Sirve de inmediato; si tienes, corona con aguacate en rodajas, cilantro picado y un chorrito de crema."
        ],
        "cravings": [
            "mexicano",
            "llenador",
            "picante"
        ],
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
        "name": "Caldo de Res Enchipotlado",
        "family": "res",
        "format": "caldo",
        "description": "Caldo potente con mandioca, chipotle y res magra. Rico en fibra compleja.",
        "servings": 4,
        "timeMin": 60,
        "effort": "medio",
        "mealType": "comida",
        "lowFriction": true,
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
        "steps": [
            "Corta la res magra en cubos medianos y séllala en una olla con un poco de aceite a fuego alto, 5 min, hasta que dore por todos lados.",
            "Agrega 6 tazas de agua y deja hervir; baja el fuego y cuece tapado 30 min, hasta que la carne esté suave.",
            "Licúa el jitomate con 1-2 chiles chipotle hasta obtener una salsa; agrégala al caldo.",
            "Pela la yuca, córtala en trozos y añádela a la olla; si tienes, incorpora también calabacita y zanahoria en cubos.",
            "Cuece 15-20 min más, hasta que la yuca y las verduras estén tiernas.",
            "Ajusta de sal y sirve caliente, adornado con cilantro picado si tienes."
        ],
        "cravings": [
            "reconfortante"
        ],
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
        "name": "Sopa Azteca en Tazón de Pan",
        "family": "maiz",
        "format": "sopa",
        "description": "Sopa de tortilla servida en tazón de pan de masa madre. Fusión moderna saludable.",
        "servings": 2,
        "timeMin": 45,
        "effort": "medio",
        "mealType": "comida",
        "lowFriction": false,
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
        "steps": [
            "Corta las tortillas de maíz en tiras delgadas y fríelas en un poco de aceite hasta que doren y queden crujientes; escúrrelas.",
            "Asa los jitomates en un comal 8 min, hasta que la piel se ennegrezca ligeramente; lícualos con un poco de agua.",
            "Si tienes, tuesta un chile pasilla sin semillas 30 seg por lado y agrégalo a la licuadora para dar profundidad de sabor.",
            "Cuela la salsa y cocínala en una olla con un poco de aceite 10 min, hasta que espese y oscurezca.",
            "Agrega 3 tazas de agua o caldo y deja hervir 10 min más; ajusta de sal.",
            "Corta la parte superior de cada pan de masa madre y ahueca el centro para formar un tazón; tuesta ligeramente en el horno 5 min.",
            "Sirve la sopa dentro de los tazones de pan, con las tiras de tortilla encima; si tienes, agrega aguacate en cubos y queso fresco."
        ],
        "cravings": [
            "mexicano",
            "reconfortante",
            "antojo"
        ],
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
        "name": "Rollitos de Chile en Nogada",
        "family": "res",
        "format": "antojito",
        "description": "Versión ligera sin capeado. Chile poblano relleno de picadillo de frutas y nogada natural.",
        "servings": 4,
        "timeMin": 60,
        "effort": "alto",
        "mealType": "comida",
        "lowFriction": false,
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
        "steps": [
            "Asa los chiles poblanos hasta que la piel se ampolle, mételos en una bolsa 10 min, pélalos y haz un corte lateral para retirar las semillas sin romperlos; resérvalos.",
            "Dora la res molida magra en un sartén con un poco de aceite, 8 min, desbaratándola con una cuchara.",
            "Si tienes, pica la manzana y la pera en cubos pequeños y agrégalas a la carne; cocina 5 min más hasta que suavicen. Sazona con sal.",
            "Rellena cada chile poblano con el picadillo de res (y fruta, si la usaste); enróllalos en forma de rollito y asegura con un palillo si es necesario.",
            "Muele las nueces de Castilla con un poco de leche o agua hasta obtener una nogada tersa y cremosa; si tienes, agrega almendra para espesar.",
            "Baña los rollitos con la nogada.",
            "Desgrana la granada y espolvorea los granos encima antes de servir."
        ],
        "cravings": [
            "mexicano",
            "elegante"
        ],
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
        "id": "tortas_ahogadas_nime",
        "name": "Tortas Ahogadas",
        "family": "cerdo",
        "format": "taco",
        "description": "Carnitas magras en birote o bolillo, ahogadas en salsa de jitomate y chile de árbol.",
        "servings": 4,
        "timeMin": 60,
        "effort": "medio",
        "mealType": "comida",
        "lowFriction": false,
        "ingredientsRequired": [
            "pan_bolillo",
            "cerdo_magro",
            "jitomate",
            "chile_seco_molido"
        ],
        "ingredientsOptional": [
            "frijol",
            "cebolla_morada",
            "limon"
        ],
        "steps": [
            "Cuece el lomo de cerdo en agua con sal hasta que esté suave, unos 35-40 min; deja enfriar y deshébralo o córtalo en trozos.",
            "Licúa el jitomate con el chile en polvo y un poco del caldo de cocción hasta obtener una salsa; cuela y cocínala en una olla 10 min hasta que espese.",
            "Agrega el cerdo deshebrado a la salsa y cocina 5 min más para que se impregne.",
            "Abre los bolillos a lo largo sin partirlos por completo; si tienes, unta frijol negro machacado por dentro.",
            "Rellena cada bolillo con el cerdo en salsa.",
            "\"Ahoga\" la torta bañándola por completo con más salsa de jitomate y chile.",
            "Sirve de inmediato; si tienes, corona con cebolla morada fileteada y un chorrito de limón."
        ],
        "cravings": [
            "mexicano",
            "picante"
        ],
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
        "servings": 4,
        "timeMin": 25,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
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
        "steps": [
            "Muele o pica finamente el lomo de cerdo hasta obtener una textura de carne molida; sazona con sal y forma mini hamburguesas (sliders).",
            "Cocina los sliders en un sartén con un poco de aceite a fuego medio, 3-4 min por lado, hasta que estén bien cocidos por dentro.",
            "Ralla el repollo y la manzana; mézclalos con los arándanos secos y una cucharada de mostaza para hacer el slaw.",
            "Si tienes, agrega nueces picadas al slaw para dar textura.",
            "Corta los panecillos por la mitad; si tienes, usa pan integral.",
            "Arma los sliders colocando la carne sobre el pan, corona con el slaw de manzana y arándano; si tienes, agrega queso fresco.",
            "Sirve de inmediato."
        ],
        "cravings": [
            "antojo",
            "dulce",
            "crujiente"
        ],
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
        "servings": 2,
        "timeMin": 20,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
        "ingredientsRequired": [
            "frijol",
            "ajo",
            "aceite_oliva"
        ],
        "ingredientsOptional": [
            "albahaca",
            "limon"
        ],
        "steps": [
            "Pica el ajo finamente; si tienes, deshoja unas ramitas de salvia fresca.",
            "Calienta el aceite de oliva en una olla a fuego medio y fríe el ajo 1-2 min, hasta que aromatice sin dorarse demasiado (si usas salvia, fríela también hasta que quede crujiente, unos 30 seg).",
            "Agrega el frijol negro cocido junto con un poco de su caldo, y cocina a fuego bajo 10 min, para que se impregne de los sabores.",
            "Machaca ligeramente algunos frijoles con el dorso de una cuchara para espesar el caldo.",
            "Ajusta de sal y, si tienes, agrega un chorrito de limón y hojas de albahaca picadas al final.",
            "Sirve caliente en un plato hondo, con un hilo de aceite de oliva encima."
        ],
        "cravings": [
            "reconfortante",
            "saludable",
            "ligero"
        ],
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
        "servings": 2,
        "timeMin": 10,
        "effort": "bajo",
        "mealType": "desayuno",
        "lowFriction": true,
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
        "steps": [
            "Pica finamente la cebolla.",
            "Calienta el aceite de oliva en un sartén a fuego medio y acitrona la cebolla 3 min, hasta que esté suave y translúcida.",
            "Bate los huevos con el pesto hasta integrar bien.",
            "Vierte los huevos en el sartén y revuelve suavemente con una pala, 2-3 min, hasta que cuajen pero queden cremosos.",
            "Sazona con sal y, si tienes, pimienta recién molida.",
            "Sirve de inmediato; si tienes, espolvorea queso parmesano rallado encima."
        ],
        "cravings": [
            "reconfortante",
            "rapido",
            "ligero"
        ],
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
        "servings": 4,
        "timeMin": 50,
        "effort": "medio",
        "mealType": "comida",
        "lowFriction": true,
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
        "steps": [
            "Precalienta el horno a 190°C.",
            "Corta la parte superior de los pimientos y retira las semillas; resérvalos para rellenar.",
            "Ralla la coliflor cruda con un rallador o procesador hasta que quede con textura de arroz.",
            "Pica el ajo (y la cebolla, si tienes) finamente; sofríelos en un poco de aceite de oliva 3 min, hasta que aromaticen.",
            "Agrega la coliflor rallada y cocina 5 min, hasta que suavice ligeramente; sazona con pimentón, sal y, si tienes, pimienta.",
            "Retira del fuego e incorpora la mitad del queso parmesano rallado.",
            "Rellena los pimientos con la mezcla, colócalos en una charola y hornea 25-30 min, hasta que estén suaves; espolvorea el resto del parmesano en los últimos 5 min para que gratine.",
            "Sirve caliente."
        ],
        "cravings": [
            "ligero",
            "saludable",
            "crujiente"
        ],
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
        "servings": 2,
        "timeMin": 15,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
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
        "steps": [
            "Corta la calabacita en tiras largas tipo espagueti, usando un espiralizador, un pelador o un cuchillo.",
            "Pica el ajo finamente.",
            "Calienta el aceite de oliva (y, si tienes, un poco de mantequilla) en un sartén a fuego medio, y sofríe el ajo 1 min hasta que aromatice sin dorarse.",
            "Agrega los noodles de calabacita y saltea 3-4 min, moviendo seguido, hasta que estén suaves pero aún con un poco de firmeza (al dente).",
            "Sazona con sal y, si tienes, pimienta recién molida.",
            "Sirve de inmediato; si tienes, espolvorea queso parmesano rallado encima."
        ],
        "cravings": [
            "internacional",
            "ligero",
            "rapido"
        ],
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
        "servings": 4,
        "timeMin": 30,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
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
        "steps": [
            "Pica la cebolla y el chile jalapeño finamente.",
            "Calienta un poco de aceite en un sartén grande o wok a fuego alto y sofríe la cebolla y el chile jalapeño 3 min, hasta que suavicen.",
            "Agrega el comino y cocina 30 seg, hasta que aromatice.",
            "Incorpora el arroz blanco cocido y el frijol negro cocido (con un poco de su caldo), y saltea a fuego alto 5-6 min, moviendo constantemente, hasta que se doren ligeramente los bordes.",
            "Ajusta de sal.",
            "Si tienes, agrega cilantro picado y un chorrito de limón antes de servir.",
            "Sirve caliente."
        ],
        "cravings": [
            "llenador",
            "reconfortante",
            "picante"
        ],
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
        "servings": 2,
        "timeMin": 30,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
        "ingredientsRequired": [
            "pechuga_pollo",
            "hummus"
        ],
        "ingredientsOptional": [
            "mostaza",
            "pimienta",
            "limon"
        ],
        "steps": [
            "Precalienta el horno a 200°C y forra una charola con papel para hornear.",
            "Sazona la pechuga de pollo con sal y, si tienes, pimienta recién molida.",
            "Si tienes, mezcla el hummus con una cucharadita de mostaza y un chorrito de limón para intensificar el sabor.",
            "Unta una capa generosa de hummus sobre toda la pechuga de pollo, cubriéndola por completo.",
            "Coloca el pollo en la charola y hornea 20-22 min, hasta que alcance 74°C internos y el hummus forme una costra ligeramente dorada.",
            "Deja reposar 3 min antes de cortar.",
            "Sirve caliente."
        ],
        "cravings": [
            "rapido",
            "llenador",
            "antojo"
        ],
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
        "servings": 2,
        "timeMin": 10,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
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
        "steps": [
            "Escurre las sardinas de lata y desmenúzalas con un tenedor.",
            "Machaca el aguacate en un tazón con un poco de sal y, si tienes, un chorrito de limón, hasta obtener una pasta con textura.",
            "Unta el aguacate machacado sobre cada tostada.",
            "Corona con las sardinas desmenuzadas.",
            "Si tienes, agrega cebolla morada fileteada y cilantro picado encima.",
            "Sirve de inmediato para que las tostadas no se humedezcan."
        ],
        "cravings": [
            "rapido",
            "saludable",
            "fresco"
        ],
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
        "servings": 2,
        "timeMin": 30,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
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
        "steps": [
            "Calienta la lenteja cocida en una olla con un poco de agua o caldo; si tienes, agrega ajo picado y cocina 8 min, hasta que esté bien caliente y ligeramente espesa.",
            "Agrega la espinaca y cocina 2 min más, solo hasta que se marchite.",
            "Corta el bolillo en rebanadas y tuéstalo en el horno o comal 5 min, hasta que esté crujiente.",
            "Si tienes, pica el jitomate en cubos.",
            "Sirve las lentejas con espinaca en un tazón; si tienes, agrega jitomate picado y un chorrito de limón.",
            "Acompaña con el pan tostado a un lado."
        ],
        "cravings": [
            "llenador",
            "saludable",
            "reconfortante"
        ],
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
        "family": "verduras",
        "format": "plato",
        "description": "Una opción 100% vegetal: tofu firme a la plancha con nopales asados.",
        "servings": 2,
        "timeMin": 15,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
        "ingredientsRequired": [
            "tofu_firme",
            "nopal"
        ],
        "ingredientsOptional": [
            "salsa_roja",
            "cebolla",
            "cilantro"
        ],
        "steps": [
            "Corta el tofu firme en rebanadas gruesas y sécalas con papel absorbente para retirar el exceso de agua.",
            "Corta los nopales (ya cocidos, o límpialos y cuécelos 10 min en agua con sal si están crudos) en tiras.",
            "Calienta un poco de aceite en una plancha o sartén a fuego medio-alto.",
            "Asa el tofu 3-4 min por lado, hasta que esté dorado y crujiente por fuera.",
            "Agrega los nopales a la plancha y saltéalos 3 min junto con el tofu; si tienes, agrega cebolla en tiras.",
            "Sazona con sal y, si tienes, agrega cilantro picado y un poco de salsa roja al servir."
        ],
        "cravings": [
            "ligero",
            "saludable",
            "mexicano"
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
        "id": "ceviche_lentejas",
        "name": "Ceviche de Lentejas",
        "family": "leguminosas",
        "format": "bowl",
        "description": "Frescura total: lentejas cocidas con pepino, limón y un toque de chile.",
        "servings": 2,
        "timeMin": 15,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
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
        "steps": [
            "Escurre y enjuaga la lenteja cocida.",
            "Corta el pepino en cubos pequeños; si tienes, pica también el jitomate y la cebolla morada.",
            "Mezcla las lentejas con el pepino (y jitomate y cebolla morada, si los usas) en un tazón.",
            "Exprime el jugo de limón sobre la mezcla, hasta cubrir bien todos los ingredientes.",
            "Deja reposar 10 min en el refrigerador para que se \"cocine\" el sabor con el limón.",
            "Si tienes, agrega cilantro picado antes de servir.",
            "Sirve frío en un tazón."
        ],
        "cravings": [
            "fresco",
            "ligero",
            "saludable"
        ],
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
        "servings": 2,
        "timeMin": 20,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
        "ingredientsRequired": [
            "pasta_garbanzo",
            "jitomate",
            "ajo"
        ],
        "ingredientsOptional": [
            "albahaca",
            "aceite_oliva"
        ],
        "steps": [
            "Pon a hervir agua con sal en una olla grande y cuece la pasta de garbanzo según el paquete, unos 8-10 min, hasta que esté al dente.",
            "Mientras tanto, asa los dientes de ajo enteros con cáscara en un comal o sartén seco a fuego medio, volteando, hasta que la piel se manche de negro, unos 5 min; pélalos.",
            "Pica o licua el jitomate junto con el ajo asado hasta obtener una salsa martajada.",
            "Calienta un poco de aceite (opcional: usa aceite de oliva) en un sartén y vierte la salsa; cocina a fuego medio 5-6 min hasta que espese ligeramente y sazona con sal.",
            "Escurre la pasta y mézclala con la salsa directamente en el sartén, integrando bien.",
            "Sirve caliente y decora con hojas de albahaca si tienes."
        ],
        "cravings": [
            "rapido",
            "saludable",
            "llenador"
        ],
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
        "servings": 4,
        "timeMin": 35,
        "effort": "medio",
        "mealType": "comida",
        "lowFriction": false,
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
        "steps": [
            "Cuece las lentejas en agua con sal hasta que estén suaves pero no deshechas, unos 20 min (si ya las tienes cocidas, omite este paso).",
            "Desgrana el elote y pica finamente la cebolla; si tienes, pica también el ajo y el cilantro.",
            "Machaca la mitad de las lentejas cocidas hasta formar una pasta y mezcla con el resto de las lentejas enteras, el elote, la cebolla y, si tienes, el ajo y el cilantro picados.",
            "Sazona con sal y forma tortitas de unos 8 cm de diámetro con las manos.",
            "Calienta aceite en un sartén a fuego medio y fríe las tortitas 4-5 min por lado, hasta que doren y se forme una costra firme.",
            "Sirve las hamburguesas solas o dentro de pan integral si tienes, con tus toppings favoritos."
        ],
        "cravings": [
            "antojo",
            "saludable",
            "reconfortante"
        ],
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
        "servings": 4,
        "timeMin": 40,
        "effort": "medio",
        "mealType": "comida",
        "lowFriction": false,
        "ingredientsRequired": [
            "haba",
            "nopal"
        ],
        "ingredientsOptional": [
            "jitomate",
            "cebolla",
            "cilantro"
        ],
        "steps": [
            "Remoja las habas peladas en agua un par de horas si son secas, o usa habas ya cocidas para ahorrar tiempo.",
            "Pon las habas en una olla con agua y sal, y cuece a fuego medio 25-30 min hasta que estén suaves.",
            "Mientras tanto, limpia los nopales, córtalos en cuadros y cuécelos aparte en agua con sal 10 min hasta que suelten su baba y cambien a un verde más oscuro; escurre.",
            "Si tienes, pica el jitomate y la cebolla y sofríelos en un poco de aceite 5 min hasta que acitronen.",
            "Incorpora el sofrito y los nopales a la olla de habas, ajusta de sal y deja hervir 5 min más para que se integren los sabores.",
            "Sirve caliente adornada con cilantro picado si tienes."
        ],
        "cravings": [
            "reconfortante"
        ],
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
        "family": "verduras",
        "format": "tortilla",
        "description": "Fusión mexicana: huitlacoche con el toque proteico del tofu desmenuzado.",
        "servings": 2,
        "timeMin": 20,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
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
        "steps": [
            "Desmorona el tofu firme con un tenedor hasta obtener una textura similar a queso desmenuzado.",
            "Calienta un poco de aceite en un sartén y, si tienes, acitrona la cebolla picada 3 min.",
            "Agrega el huitlacoche y cocina 5 min a fuego medio hasta que reduzca su líquido; si tienes epazote, incorpora unas hojas picadas para dar el sabor tradicional.",
            "Añade el tofu desmenuzado, sazona con sal y cocina 3 min más hasta que se integre y tome color del huitlacoche.",
            "Calienta las tortillas de maíz en un comal, rellénalas con la mezcla y dóblalas por la mitad.",
            "Deja que se calienten 1-2 min por lado en el comal hasta que la tortilla esté ligeramente tostada.",
            "Sirve las quesadillas calientes acompañadas de salsa verde si tienes."
        ],
        "cravings": [
            "mexicano",
            "reconfortante",
            "internacional"
        ],
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
        "servings": 4,
        "timeMin": 30,
        "effort": "medio",
        "mealType": "comida",
        "lowFriction": false,
        "ingredientsRequired": [
            "tortilla_maiz",
            "jamaica"
        ],
        "ingredientsOptional": [
            "cebolla",
            "cilantro",
            "aguacate"
        ],
        "steps": [
            "Enjuaga la flor de jamaica y remójala en agua caliente 15 min hasta que se hidrate y suavice; escurre muy bien exprimiendo el exceso de agua.",
            "Pica finamente la cebolla y sofríela en un poco de aceite a fuego medio 3 min hasta que acitrone, si tienes.",
            "Agrega la jamaica escurrida al sartén y cocina 8-10 min a fuego medio-alto, moviendo ocasionalmente, hasta que se dore ligeramente y tome una textura fibrosa parecida a la carne deshebrada.",
            "Sazona con sal y cocina 2 min más.",
            "Calienta las tortillas de maíz en un comal hasta que estén flexibles.",
            "Arma los tacos con la jamaica asada y agrega cilantro picado y rebanadas de aguacate si tienes.",
            "Sirve de inmediato con tu salsa favorita."
        ],
        "cravings": [
            "ligero",
            "fresco",
            "mexicano"
        ],
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
        "servings": 2,
        "timeMin": 10,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
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
        "steps": [
            "Escurre el garbanzo y el atún de lata.",
            "Pica finamente la cebolla y, si tienes, el pepino en cubos pequeños.",
            "Mezcla en un tazón el garbanzo, el atún desmenuzado, la cebolla y el pepino.",
            "Exprime jugo de limón sobre la mezcla si tienes, agrega un chorrito de aceite y sazona con sal.",
            "Espolvorea cebollín picado si tienes, y revuelve todo bien.",
            "Sirve fría o a temperatura ambiente."
        ],
        "cravings": [
            "rapido",
            "llenador",
            "fresco"
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
            "usesBases": [],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "chilaquiles_tofu_verde",
        "name": "Chilaquiles de Tofu con Salsa Verde",
        "family": "verduras",
        "format": "tortilla",
        "description": "Versión ligera de los chilaquiles usando tofu desmenuzado en lugar de crema.",
        "servings": 2,
        "timeMin": 20,
        "effort": "bajo",
        "mealType": "desayuno",
        "lowFriction": true,
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
        "steps": [
            "Calienta la salsa verde en un sartén amplio a fuego medio hasta que suelte el hervor.",
            "Agrega los totopos a la salsa y mueve con cuidado para bañarlos bien, cocinando 2-3 min hasta que se suavicen un poco pero conserven algo de textura crujiente.",
            "Desmorona el tofu firme y espárcelo sobre los chilaquiles, dejando que se caliente 2 min más con la salsa.",
            "Si tienes, pica la cebolla y el cilantro para decorar.",
            "Sirve de inmediato en un plato, corona con cebolla, cilantro y rebanadas de aguacate si tienes."
        ],
        "cravings": [
            "mexicano",
            "reconfortante",
            "saludable"
        ],
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
        "servings": 4,
        "timeMin": 25,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
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
        "steps": [
            "Ralla la zanahoria en tiras gruesas con un rallador.",
            "Pica finamente la cebolla, si tienes, y sofríela en un poco de aceite a fuego medio 3 min hasta que acitrone.",
            "Agrega la zanahoria rallada y cocina 5 min hasta que empiece a suavizar.",
            "Pica el chipotle en adobo de lata y agrégalo al sartén junto con un par de cucharadas del adobo; cocina 6-8 min más hasta que la zanahoria esté suave y tome un color rojizo, sazona con sal.",
            "Unta cada tostada con frijol si tienes, y encima coloca una porción generosa de la tinga de zanahoria.",
            "Sirve con un toque de crema encima si tienes."
        ],
        "cravings": [
            "reconfortante",
            "ligero",
            "mexicano"
        ],
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
        "servings": 2,
        "timeMin": 15,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
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
        "steps": [
            "Limpia los hongos con un trapo húmedo y córtalos en láminas delgadas.",
            "Corta el pepino en rodajas finas o medias lunas.",
            "Si tienes, licua chile serrano con un poco de jugo de limón y cilantro para hacer la base picante; si no, exprime el limón directamente.",
            "Coloca los hongos y el pepino en un tazón, baña con el jugo de limón (o la mezcla picante) y deja marinar 8-10 min hasta que los hongos cambien ligeramente de color y se sientan más suaves.",
            "Rebana cebolla morada finamente y agrégala si tienes, junto con más cilantro picado.",
            "Sazona con sal al gusto y sirve bien frío."
        ],
        "cravings": [
            "fresco",
            "ligero",
            "picante"
        ],
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
        "servings": 2,
        "timeMin": 20,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
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
        "steps": [
            "Pica la coliflor cruda muy finamente, casi como si fuera arroz, o rállala con un rallador grueso.",
            "Coloca la coliflor picada en un tazón y báñala con abundante jugo de limón; deja marinar 10-15 min hasta que se suavice y \"cueza\" ligeramente en el ácido.",
            "Mientras tanto, pela y corta el mango en cubos pequeños.",
            "Si tienes, pica finamente la cebolla morada, el cilantro y el jitomate.",
            "Escurre el exceso de líquido de la coliflor y mezcla con el mango y las verduras picadas.",
            "Sazona con sal al gusto y revuelve bien.",
            "Sirve frío, en tostadas o directo en un tazón."
        ],
        "cravings": [
            "fresco",
            "ligero"
        ],
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
        "servings": 2,
        "timeMin": 20,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
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
        "steps": [
            "Limpia los hongos y córtalos en tiras gruesas; corta el pimiento rojo y la cebolla en tiras delgadas.",
            "Calienta aceite en un sartén grande a fuego alto y, si tienes, agrega el ajo picado, dejando que aromatice 30 seg.",
            "Añade la cebolla y el pimiento y saltea 4-5 min hasta que empiecen a suavizar pero mantengan un poco de firmeza.",
            "Incorpora los hongos y cocina 5-6 min más, moviendo con frecuencia, hasta que suelten su agua y esta se evapore.",
            "Espolvorea comino y sal al gusto y cocina 1 min más para que se integren los sabores.",
            "Calienta tortillas de maíz en un comal si tienes.",
            "Sirve las fajitas calientes, con cilantro picado encima y las tortillas al lado para armar."
        ],
        "cravings": [
            "reconfortante",
            "saludable",
            "rapido"
        ],
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
        "family": "verduras",
        "format": "taco",
        "description": "Sencillez pura: papas cocidas y salteadas con epazote fresco en tortilla de maíz.",
        "servings": 4,
        "timeMin": 25,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
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
        "steps": [
            "Pela las papas y córtalas en cubos pequeños; cuécelas en agua con sal 12-15 min hasta que estén suaves al picarlas con un tenedor. Escurre.",
            "Calienta aceite en un sartén y, si tienes, sofríe la cebolla y el ajo picados 3 min hasta que acitronen.",
            "Agrega las papas cocidas al sartén y machácalas ligeramente con la pala, dejando algunos trozos enteros; cocina 5 min hasta que doren un poco.",
            "Deshoja el epazote y añádelo picado a las papas, mezclando bien; sazona con sal.",
            "Calienta las tortillas de maíz en un comal hasta que estén suaves y ligeramente tostadas.",
            "Rellena las tortillas con las papas al epazote y dobla para armar los tacos.",
            "Sirve con salsa roja si tienes."
        ],
        "cravings": [
            "reconfortante",
            "mexicano"
        ],
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
        "servings": 4,
        "timeMin": 50,
        "effort": "medio",
        "mealType": "comida",
        "lowFriction": false,
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
        "steps": [
            "Enjuaga las habas secas y colócalas en una olla con abundante agua; deja hervir a fuego medio 35-40 min hasta que estén completamente suaves y se empiecen a deshacer.",
            "Mientras se cuecen, pica el jitomate, la cebolla y, si tienes, el ajo.",
            "En un sartén aparte, calienta un poco de aceite y sofríe el jitomate, la cebolla y el ajo 6-8 min hasta formar un sofrito espeso y aromático.",
            "Incorpora el sofrito a la olla de habas, ajusta la cantidad de agua según qué tan espeso lo quieras y sazona con sal.",
            "Deja hervir todo junto 10 min más para que se integren los sabores.",
            "Sirve caliente con cilantro picado y un chorrito de limón si tienes."
        ],
        "cravings": [
            "reconfortante"
        ],
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
        "servings": 4,
        "timeMin": 40,
        "effort": "medio",
        "mealType": "comida",
        "lowFriction": false,
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
        "steps": [
            "Enjuaga las lentejas y cuécelas en agua con sal 18-20 min hasta que estén suaves pero no deshechas; escurre.",
            "Enjuaga el arroz y cuécelo aparte con el doble de agua, sal y, si tienes, un chorrito de aceite de oliva, 15-18 min hasta que esté esponjado.",
            "Mientras tanto, corta la cebolla en medias lunas delgadas y fríela en aceite a fuego medio-bajo 15-20 min, moviendo de vez en cuando, hasta que caramelice y quede dorada y suave.",
            "Cuando la cebolla esté casi lista, si tienes, agrega comino y deja que se tueste ligeramente 1 min.",
            "Mezcla el arroz cocido con las lentejas y la mitad de la cebolla caramelizada.",
            "Sirve el arroz con lentejas coronado con el resto de la cebolla caramelizada y, si tienes, una cucharada de yogurt natural al lado."
        ],
        "cravings": [
            "llenador",
            "reconfortante",
            "internacional"
        ],
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
        "servings": 4,
        "timeMin": 15,
        "effort": "medio",
        "mealType": "comida",
        "lowFriction": false,
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
        "steps": [
            "Retira las semillas y venas de los chiles guajillo y tuéstalos ligeramente en un comal 30 seg por lado, sin que se quemen.",
            "Hierve los chiles en un poco de agua 5 min hasta que se suavicen, luego lícualos con esa misma agua y, si tienes, ajo, hasta obtener una salsa tersa; cuela si prefieres una textura más fina.",
            "Calienta un poco de aceite en una olla y, si tienes, sofríe la cebolla picada 2 min; vierte la salsa de guajillo colada y deja hervir 3-4 min.",
            "Agrega agua hasta obtener la consistencia de caldo, sazona con sal y deja hervir.",
            "Incorpora los hongos en láminas y los quelites limpios y picados; cocina 4-5 min hasta que los hongos estén suaves y los quelites se marchiten.",
            "Si tienes, agrega unas hojas de epazote al final para dar el toque tradicional.",
            "Sirve caliente en tazones hondos."
        ],
        "cravings": [
            "reconfortante",
            "mexicano"
        ],
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
        "family": "res",
        "format": "sandwich",
        "description": "Hamburguesa casera con carne molida, pan, queso y los clásicos. Fácil de preparar.",
        "servings": 2,
        "timeMin": 15,
        "effort": "bajo",
        "mealType": "comida_indulgente",
        "lowFriction": true,
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
        "steps": [
            "Forma la res molida en 2 tortitas gruesas y sazona ambos lados con sal.",
            "Calienta un sartén o comal a fuego alto y cocina las tortitas 3-4 min por lado, hasta que se doren y alcancen el término deseado.",
            "Si tienes, coloca una rebanada de queso amarillo sobre cada tortita en el último minuto de cocción para que se derrita.",
            "Corta el pan blanco por la mitad y tuéstalo ligeramente en el mismo sartén 1 min.",
            "Unta mayonesa en el pan si tienes, y arma la hamburguesa con la tortita, lechuga, jitomate en rodajas y cebolla, todo si tienes.",
            "Sirve de inmediato."
        ],
        "cravings": [
            "antojo",
            "rapido",
            "reconfortante"
        ],
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
        "family": "maiz",
        "format": "tortilla",
        "description": "Quesadillas fritas rellenas de queso derretido y jamón. Clásico indulgente mexicano.",
        "servings": 2,
        "timeMin": 10,
        "effort": "bajo",
        "mealType": "comida_indulgente",
        "lowFriction": true,
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
        "steps": [
            "Coloca una tortilla de maíz sobre una superficie y rellena la mitad con queso amarillo y una rebanada de jamón; si tienes, agrega cebolla picada.",
            "Dobla la tortilla por la mitad para cerrar la quesadilla.",
            "Calienta un poco de aceite en un sartén a fuego medio-alto.",
            "Fríe las quesadillas 2-3 min por lado hasta que la tortilla esté dorada y crujiente y el queso se haya derretido por completo.",
            "Repite con el resto de las tortillas, el queso y el jamón.",
            "Sirve calientes con salsa roja y nata si tienes."
        ],
        "cravings": [
            "antojo",
            "rapido",
            "crujiente"
        ],
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
        "family": "res",
        "format": "tortilla",
        "description": "Tacos rellenos con carne asada, queso derretido y todo lo que se antoje. Indulgencia pura.",
        "servings": 4,
        "timeMin": 15,
        "effort": "bajo",
        "mealType": "comida_indulgente",
        "lowFriction": true,
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
        "steps": [
            "Calienta un sartén o comal a fuego alto y cocina la carne asada 2-3 min por lado hasta que esté bien dorada y jugosa por dentro.",
            "Pica la carne en trozos pequeños.",
            "Coloca el queso amarillo sobre la carne caliente en el mismo sartén y deja que se derrita 1-2 min, mezclando un poco.",
            "Calienta las tortillas de maíz en un comal hasta que estén suaves.",
            "Rellena las tortillas con la mezcla de carne y queso derretido.",
            "Si tienes, agrega cebolla y cilantro picados, y un chorrito de limón.",
            "Sirve de inmediato con salsa roja al gusto si tienes."
        ],
        "cravings": [
            "antojo",
            "rapido",
            "mexicano"
        ],
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
        "family": "maiz",
        "format": "burrito",
        "description": "Burritos grandes rellenos de frijoles refritos, queso fundido y nata. Muy llenadores.",
        "servings": 2,
        "timeMin": 15,
        "effort": "bajo",
        "mealType": "comida_indulgente",
        "lowFriction": true,
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
        "steps": [
            "Si no tienes frijoles refritos ya preparados, machaca el frijol cocido en un sartén con un poco de aceite hasta obtener una pasta espesa, cocinando 5 min a fuego medio.",
            "Si tienes, sofríe la cebolla picada en el mismo sartén antes de agregar el frijol.",
            "Calienta las tortillas grandes en un comal o sartén seco 30 seg por lado hasta que estén flexibles.",
            "Unta una capa generosa de frijoles sobre cada tortilla y espolvorea queso amarillo encima.",
            "Enrolla las tortillas doblando los extremos hacia adentro para formar los burritos.",
            "Calienta los burritos armados en el sartén 1-2 min por lado hasta que el queso se derrita y la tortilla dore ligeramente.",
            "Sirve con nata y salsa roja encima si tienes."
        ],
        "cravings": [
            "llenador",
            "antojo",
            "rapido"
        ],
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
        "family": "maiz",
        "format": "plato",
        "description": "Enchiladas rellenas de queso y baño de salsa verde con abundante nata. Reconfortante e indulgente.",
        "servings": 4,
        "timeMin": 30,
        "effort": "bajo",
        "mealType": "comida_indulgente",
        "lowFriction": true,
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
        "steps": [
            "Calienta la salsa verde en un sartén amplio a fuego medio hasta que suelte el hervor; baja el fuego para mantenerla caliente.",
            "Pasa cada tortilla de maíz por la salsa caliente unos segundos por lado para suavizarla, y resérvala en un plato.",
            "Rellena cada tortilla con un poco de queso amarillo y, si tienes, cebolla picada; enróllala y colócala en un platón.",
            "Repite hasta terminar con todas las tortillas, acomodándolas una junto a otra.",
            "Baña las enchiladas con el resto de la salsa verde caliente y espolvorea más queso amarillo encima.",
            "Corona con nata si tienes y deja reposar 2 min para que el queso se derrita con el calor de la salsa.",
            "Sirve de inmediato adornadas con cilantro picado si tienes."
        ],
        "cravings": [
            "reconfortante",
            "antojo"
        ],
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
        "family": "cereales",
        "format": "pizza",
        "description": "Pizza hecha en casa con base de pan, salsa de tomate y queso derretido. Rápida y satisfactoria.",
        "servings": 2,
        "timeMin": 20,
        "effort": "bajo",
        "mealType": "comida_indulgente",
        "lowFriction": true,
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
        "steps": [
            "Precalienta el horno a 200°C, o si no tienes horno, prepara un sartén con tapa a fuego bajo.",
            "Corta el pan blanco a la mitad a lo largo para formar 2 bases de pizza.",
            "Pica finamente el jitomate hasta obtener una salsa espesa y sazónala con sal.",
            "Unta la salsa de jitomate sobre cada mitad de pan y cubre con queso amarillo.",
            "Si tienes, agrega jamón, pepperoni o cebolla en rodajas encima.",
            "Hornea 8-10 min, o cocina tapado en el sartén a fuego bajo 6-8 min, hasta que el queso se derrita y burbujee y el pan esté crujiente por debajo.",
            "Sirve caliente, cortada en trozos."
        ],
        "cravings": [
            "antojo",
            "rapido"
        ],
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
        "family": "maiz",
        "format": "plato",
        "description": "Tortillas fritas crujientes cubiertas con salsa roja, queso derretido, huevo y abundante nata. Desayuno contundente.",
        "servings": 2,
        "timeMin": 20,
        "effort": "bajo",
        "mealType": "desayuno",
        "lowFriction": true,
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
        "steps": [
            "Corta las tortillas de maíz en triángulos y déjalas orear un poco si están muy frescas.",
            "Calienta suficiente aceite en un sartén y fríe los triángulos de tortilla en tandas 2-3 min hasta que estén dorados y crujientes; escurre sobre papel absorbente.",
            "Calienta la salsa roja en un sartén amplio a fuego medio hasta que hierva.",
            "Agrega las tortillas fritas a la salsa y mezcla rápido para bañarlas sin que se remojen demasiado, unos 30 seg.",
            "Si tienes, fríe un huevo aparte o revuélvelo directamente con los chilaquiles 2-3 min.",
            "Sirve los chilaquiles cubiertos con queso amarillo y nata, y espolvorea cebolla y cilantro picados si tienes."
        ],
        "cravings": [
            "antojo",
            "crujiente",
            "reconfortante"
        ],
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
        "family": "cereales",
        "format": "sandwich",
        "description": "Pan telera relleno de jamón, queso, aguacate, mayonesa, lechuga y jitomate. Clásico callejero.",
        "servings": 2,
        "timeMin": 10,
        "effort": "bajo",
        "mealType": "comida_indulgente",
        "lowFriction": true,
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
        "steps": [
            "Corta el pan telera por la mitad a lo largo, sin separar completamente.",
            "Si quieres, calienta el pan en un comal o sartén 1-2 min por lado hasta que esté ligeramente tostado.",
            "Unta mayonesa en ambas caras del pan si tienes.",
            "Coloca el jamón y el queso amarillo dentro, y si quieres que el queso se derrita, calienta la torta armada 1-2 min en el sartén.",
            "Agrega aguacate en rebanadas, lechuga y jitomate si tienes, y cebolla al gusto.",
            "Cierra la torta presionando ligeramente.",
            "Sirve de inmediato, cortada a la mitad."
        ],
        "cravings": [
            "rapido",
            "antojo",
            "reconfortante",
            "llenador"
        ],
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
        "family": "maiz",
        "format": "taco",
        "description": "Tortillas enrolladas rellenas de papa cocida y frita hasta doradas, servidas con guacamole y salsa.",
        "servings": 4,
        "timeMin": 20,
        "effort": "bajo",
        "mealType": "comida_indulgente",
        "lowFriction": true,
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
        "steps": [
            "Pela las papas, córtalas en cubos y cuécelas en agua con sal 12-15 min hasta que estén suaves; escurre y machácalas.",
            "Sazona el puré de papa con sal.",
            "Calienta las tortillas de maíz en un comal para que estén flexibles y no se rompan al enrollar.",
            "Rellena cada tortilla con una cucharada de puré de papa, enróllala apretada y asegúrala con un palillo si es necesario.",
            "Calienta aceite de maíz en un sartén hondo a fuego medio-alto y fríe los taquitos por tandas 3-4 min, girándolos, hasta que estén dorados y crujientes por todos lados.",
            "Escurre sobre papel absorbente.",
            "Sirve calientes con guacamole, salsa roja y nata si tienes."
        ],
        "cravings": [
            "crujiente",
            "antojo",
            "rapido"
        ],
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
        "family": "maiz",
        "format": "tortilla",
        "description": "Tortillas enrolladas crujientes rellenas de carne deshebrada y queso, fritas hasta doradas.",
        "servings": 4,
        "timeMin": 25,
        "effort": "bajo",
        "mealType": "comida_indulgente",
        "lowFriction": true,
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
        "steps": [
            "Si no tienes carne molida ya cocida, dórala en un sartén a fuego medio-alto 8-10 min, desmenuzándola con la pala hasta que pierda el color rosado; sazona con sal.",
            "Mezcla la carne molida cocida con el queso amarillo.",
            "Calienta las tortillas grandes en un comal para que estén flexibles.",
            "Coloca una porción de la mezcla de carne y queso en un extremo de cada tortilla y enróllala apretada, como un cigarro; asegura con un palillo si hace falta.",
            "Calienta suficiente aceite en un sartén hondo y fríe las flautas por tandas 3-4 min, girándolas, hasta que doren y queden crujientes.",
            "Escurre sobre papel absorbente.",
            "Sirve con salsa roja, nata, lechuga y jitomate si tienes."
        ],
        "cravings": [
            "crujiente",
            "antojo",
            "reconfortante"
        ],
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
        "family": "maiz",
        "format": "sopa",
        "description": "Caldo de pollo con tiras de tortilla frita crujiente, aguacate, queso y nata. Indulgencia pura.",
        "servings": 4,
        "timeMin": 30,
        "effort": "bajo",
        "mealType": "comida_indulgente",
        "lowFriction": true,
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
        "steps": [
            "Si no tienes pollo deshebrado ya listo, cuece la pechuga de pollo en agua con sal 15-18 min hasta que esté bien cocida, luego deshébrala.",
            "Corta las tortillas de maíz en tiras delgadas y fríelas en aceite caliente 2-3 min hasta que doren y queden crujientes; escurre sobre papel absorbente.",
            "Si tienes, sofríe la cebolla picada en un poco de aceite 3 min en una olla.",
            "Agrega caldo o agua a la olla junto con el pollo deshebrado y deja hervir 8-10 min para que tome sabor.",
            "Sazona con sal al gusto.",
            "Sirve el caldo caliente en tazones y corona con las tiras de tortilla fritas, el queso amarillo, y si tienes, aguacate, nata y cilantro."
        ],
        "cravings": [
            "caldoso",
            "antojo",
            "reconfortante"
        ],
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
        "family": "maiz",
        "format": "tortilla",
        "description": "Quesadillas rellenas de huitlacoche, queso derretido y cebolla frita. Gourmet indulgente.",
        "servings": 2,
        "timeMin": 15,
        "effort": "bajo",
        "mealType": "comida_indulgente",
        "lowFriction": true,
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
        "steps": [
            "Si tienes, pica la cebolla y sofríela en un poco de aceite 3 min hasta que acitrone.",
            "Agrega el huitlacoche al sartén y cocina 5-6 min a fuego medio hasta que reduzca su líquido y se concentre el sabor; sazona con sal.",
            "Coloca una tortilla de maíz en un comal, rellena la mitad con queso amarillo y una cucharada del huitlacoche guisado.",
            "Dobla la tortilla y deja que se caliente 2 min por lado hasta que el queso se derrita y la tortilla se dore ligeramente.",
            "Repite con el resto de las tortillas.",
            "Sirve calientes con cilantro picado y salsa roja si tienes."
        ],
        "cravings": [
            "antojo",
            "reconfortante",
            "mexicano"
        ],
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
        "family": "maiz",
        "format": "tamal",
        "description": "Tamales de masa de maíz con queso derretido y rajas poblanas. Clásico reconfortante.",
        "servings": 6,
        "timeMin": 40,
        "effort": "medio",
        "mealType": "comida_indulgente",
        "lowFriction": false,
        "ingredientsRequired": [
            "tamal_masa",
            "queso_amarillo",
            "rajas_poblano"
        ],
        "ingredientsOptional": [
            "manteca",
            "cilantro"
        ],
        "steps": [
            "Bate la masa para tamales con un poco de manteca si tienes, hasta que esponje y una pequeña porción flote en un vaso con agua.",
            "Remoja las hojas de maíz en agua caliente 10 min hasta que estén flexibles.",
            "Extiende una capa de masa sobre cada hoja de maíz, dejando espacio en los bordes.",
            "Coloca en el centro un poco de queso amarillo y unas tiras de rajas de poblano.",
            "Dobla la hoja para cerrar el tamal envolviendo la masa alrededor del relleno.",
            "Acomoda los tamales de pie en una vaporera con agua hirviendo y cuece 30-35 min a fuego medio, hasta que la masa se despegue fácilmente de la hoja.",
            "Deja reposar los tamales 5 min antes de destaparlos.",
            "Sirve calientes, espolvoreados con cilantro picado si tienes."
        ],
        "cravings": [
            "reconfortante",
            "antojo"
        ],
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
        "family": "maiz",
        "format": "burrito",
        "description": "Burritos grandes de carne deshebrada y queso, fritos hasta crujientes y dorados.",
        "servings": 4,
        "timeMin": 20,
        "effort": "bajo",
        "mealType": "comida_indulgente",
        "lowFriction": true,
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
        "steps": [
            "Si no tienes carne molida ya cocida, dórala en un sartén a fuego medio-alto 8-10 min hasta que pierda el color rosado, desmenuzándola con la pala; sazona con sal.",
            "Si tienes, sofríe la cebolla picada junto con la carne los últimos 2 min.",
            "Calienta las tortillas grandes en un comal para que estén flexibles.",
            "Rellena cada tortilla con la carne y el queso amarillo, doblando los extremos hacia adentro y enrollando como burrito compacto.",
            "Calienta suficiente aceite en un sartén hondo y fríe los burritos con la unión hacia abajo primero, 2-3 min por lado, hasta que estén dorados y crujientes por todos lados.",
            "Escurre sobre papel absorbente.",
            "Sirve calientes con salsa roja y nata encima si tienes."
        ],
        "cravings": [
            "crujiente",
            "antojo",
            "rapido",
            "llenador"
        ],
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
        "family": "verduras",
        "format": "plato",
        "description": "Elote asado o cocido cubierto de mayonesa, queso fresco desmenuzado y pimentón. Antojo callejero.",
        "servings": 2,
        "timeMin": 10,
        "effort": "bajo",
        "mealType": "comida_indulgente",
        "lowFriction": true,
        "ingredientsRequired": [
            "elote",
            "mayonesa",
            "queso_fresco"
        ],
        "ingredientsOptional": [
            "queso_cotija",
            "limon"
        ],
        "steps": [
            "Cuece el elote en agua con sal 10-12 min hasta que los granos estén suaves, o ásalo directo sobre la flama volteándolo hasta que se manche de negro en varios puntos.",
            "Unta el elote caliente con una capa generosa de mayonesa por todos lados.",
            "Desmorona el queso fresco y cúbrelo bien sobre la mayonesa.",
            "Si tienes, espolvorea queso cotija encima para más sabor.",
            "Exprime limón encima si tienes.",
            "Sirve de inmediato, caliente."
        ],
        "cravings": [
            "rapido",
            "antojo",
            "mexicano"
        ],
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
        "family": "postres",
        "format": "postre",
        "description": "Churros caseros fritos crujientes, servidos con chocolate caliente espeso para acompañar.",
        "servings": 4,
        "timeMin": 25,
        "effort": "medio",
        "mealType": "postre",
        "lowFriction": false,
        "ingredientsRequired": [
            "harina",
            "aceite_maiz"
        ],
        "ingredientsOptional": [
            "azucar",
            "canela",
            "chocolate"
        ],
        "steps": [
            "Mezcla la harina con agua caliente, una pizca de sal y, si tienes, canela, hasta formar una masa tersa y sin grumos.",
            "Deja reposar la masa 5 min y pásala a una manga con duya de estrella.",
            "Calienta el aceite de maíz en una olla a fuego medio hasta que esté bien caliente.",
            "Forma tiras de masa directo al aceite con ayuda de unas tijeras y fríe por tandas 3-4 min, volteando, hasta que doren y estén crujientes.",
            "Escurre los churros sobre papel absorbente y revuélcalos en azúcar mezclada con canela, si tienes.",
            "Si tienes chocolate, derrítelo con un poco de leche o agua a fuego bajo, moviendo hasta que espese.",
            "Sirve los churros calientes acompañados del chocolate caliente para remojar."
        ],
        "cravings": [
            "dulce",
            "antojo"
        ],
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
        "servings": 4,
        "timeMin": 40,
        "effort": "medio",
        "mealType": "postre",
        "lowFriction": true,
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
        "steps": [
            "Enjuaga el arroz integral bajo agua fría hasta que salga clara.",
            "En una olla, combina el arroz con la leche de almendra y la canela en rama, y lleva a hervor.",
            "Baja el fuego y cuece tapado, moviendo de vez en cuando, 25-30 min hasta que el arroz esté suave y la mezcla espese.",
            "Pica los dátiles en trozos pequeños y agrégalos en los últimos 5 min de cocción para que se suavicen y endulcen el postre.",
            "Si tienes, añade unas gotas de vainilla y ralladura de limón para aromatizar.",
            "Retira la canela en rama y deja reposar 5 min; espesará más al enfriarse un poco.",
            "Sirve tibio o frío, en tazones individuales."
        ],
        "cravings": [
            "dulce",
            "reconfortante"
        ],
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
        "servings": 2,
        "timeMin": 25,
        "effort": "bajo",
        "mealType": "postre",
        "lowFriction": true,
        "ingredientsRequired": [
            "manzana",
            "canela_molida"
        ],
        "ingredientsOptional": [
            "nuez",
            "yogurt_griego"
        ],
        "steps": [
            "Precalienta el horno a 180°C.",
            "Lava las manzanas, retira el corazón con un descorazonador dejando la base intacta, y colócalas en un refractario.",
            "Espolvorea la canela molida dentro y sobre cada manzana, y agrega un chorrito de agua al refractario.",
            "Si tienes, rellena el centro de cada manzana con nuez picada.",
            "Hornea 20-25 min hasta que estén suaves al picarlas con un tenedor pero conserven su forma.",
            "Sirve tibias, con una cucharada de yogurt griego encima si tienes."
        ],
        "cravings": [
            "dulce",
            "reconfortante",
            "ligero"
        ],
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
        "servings": 2,
        "timeMin": 10,
        "effort": "bajo",
        "mealType": "postre",
        "lowFriction": true,
        "ingredientsRequired": [
            "fresa",
            "leche"
        ],
        "ingredientsOptional": [
            "nuez",
            "menta"
        ],
        "steps": [
            "Lava y rebana las fresas en mitades o cuartos, según su tamaño.",
            "Vierte la leche bien fría en un tazón y bate con batidora de mano 3-4 min hasta que espese y forme una crema ligera y espumosa.",
            "Si quieres, endulza la crema con un poco de azúcar al gusto.",
            "Distribuye las fresas en tazones individuales.",
            "Corona con la crema batida.",
            "Si tienes, agrega nuez picada y hojas de menta para decorar.",
            "Sirve de inmediato, bien frío."
        ],
        "cravings": [
            "fresco",
            "dulce"
        ],
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
        "servings": 2,
        "timeMin": 15,
        "effort": "bajo",
        "mealType": "desayuno",
        "lowFriction": true,
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
        "steps": [
            "Corta el pan integral a la mitad a lo largo y colócalo con el lado abierto hacia arriba en una charola.",
            "Calienta el frijol y unta una capa generosa sobre cada mitad de pan.",
            "Cubre con queso Manchego rallado o en rebanadas.",
            "Gratina en la parte alta del horno 5-7 min, hasta que el queso burbujee y dore ligeramente.",
            "Mientras tanto, si tienes, pica jitomate, cebolla y chile serrano en cubos pequeños y mezcla con sal para un pico de gallo rápido.",
            "Retira los molletes del horno y corona con el pico de gallo y, si tienes, rebanadas de aguacate.",
            "Sirve calientes."
        ],
        "cravings": [
            "reconfortante",
            "cremoso",
            "mexicano"
        ],
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
        "servings": 2,
        "timeMin": 15,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
        "ingredientsRequired": [
            "queso_manchego",
            "tortilla_maiz",
            "champiñon"
        ],
        "ingredientsOptional": [
            "salsa_roja",
            "cebolla_asada"
        ],
        "steps": [
            "Limpia y rebana los champiñones.",
            "Calienta una plancha o sartén amplio a fuego medio-alto y saltea los champiñones con una pizca de sal 4-5 min hasta que suelten su agua y doren.",
            "Retira los champiñones y en la misma plancha esparce el queso Manchego rallado formando un círculo del tamaño de la tortilla.",
            "Deja que el queso se derrita y forme una costra dorada y crujiente por debajo, 2-3 min.",
            "Coloca la tortilla de maíz encima de la costra de queso justo antes de que esté lista, para que se peguen.",
            "Voltea con cuidado, rellena con los champiñones salteados y, si tienes, cebolla asada.",
            "Dobla el taco y sirve de inmediato con salsa roja al gusto, si tienes."
        ],
        "cravings": [
            "crujiente",
            "cremoso",
            "antojo"
        ],
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
        "servings": 4,
        "timeMin": 35,
        "effort": "medio",
        "mealType": "comida",
        "lowFriction": false,
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
        "steps": [
            "Precalienta el horno a 190°C.",
            "Corta la parte superior de los pimientos morrones y retira las semillas; resérvalos.",
            "Si tienes, pica finamente el ajo y la cebolla, y sofríelos en un sartén con un poco de aceite 2 min hasta que doren.",
            "Agrega la res molida y cocina 6-8 min a fuego medio, deshaciendo con una cuchara, hasta que pierda el color rosado; sazona con sal.",
            "Si tienes, incorpora granos de elote y cocina 2 min más.",
            "Rellena los pimientos con la mezcla de carne y colócalos de pie en un refractario.",
            "Cubre cada pimiento con queso Manchego rallado y hornea 20-25 min hasta que los pimientos estén suaves y el queso dore.",
            "Sirve calientes."
        ],
        "cravings": [
            "fresco",
            "llenador",
            "reconfortante"
        ],
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
        "servings": 4,
        "timeMin": 25,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
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
        "steps": [
            "Precalienta el horno a 180°C.",
            "Calienta la salsa verde en una olla a fuego medio, retira del fuego e incorpora el yogurt natural poco a poco, moviendo, hasta obtener una salsa cremosa y tersa.",
            "Calienta las tortillas de maíz una por una en un comal para que estén flexibles.",
            "Rellena cada tortilla con pollo deshebrado, enróllala y acomódala en un refractario.",
            "Baña las enchiladas con la salsa verde cremosa y cubre con queso Manchego rallado.",
            "Gratina en el horno 10-12 min, hasta que el queso se derrita y burbujee.",
            "Si tienes, espolvorea cilantro y cebolla picados encima.",
            "Sirve de inmediato, bien calientes."
        ],
        "cravings": [
            "cremoso",
            "picante"
        ],
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
        "servings": 2,
        "timeMin": 20,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
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
        "steps": [
            "Desvena el chile guajillo, ábrelo y tuéstalo ligeramente en un comal 30 seg por lado; remójalo en agua caliente 10 min hasta que suavice.",
            "Licúa el chile guajillo con un poco del agua de remojo hasta obtener una salsa tersa.",
            "Rebana los champiñones y pica finamente el ajo.",
            "Calienta aceite en un sartén a fuego medio y saltea el ajo hasta que aromatice, sin dejar que se queme.",
            "Agrega los champiñones y cocina 5 min hasta que suelten su jugo, luego incorpora la salsa de guajillo y sazona con sal; cocina 3 min más.",
            "Si tienes, agrega epazote picado.",
            "Pasa todo a un refractario, cubre con queso Manchego y gratina en el horno 5 min hasta que dore.",
            "Sirve caliente, con un chorrito de limón si tienes."
        ],
        "cravings": [
            "antojo",
            "picante",
            "ligero"
        ],
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
        "id": "huevos_a_la_mexicana",
        "name": "Huevos a la Mexicana",
        "family": "huevo",
        "format": "plato",
        "description": "Huevos revueltos con jitomate, cebolla y chile serrano. Desayuno rápido y clásico.",
        "servings": 2,
        "timeMin": 10,
        "effort": "bajo",
        "mealType": "desayuno",
        "lowFriction": true,
        "ingredientsRequired": [
            "huevo",
            "jitomate",
            "cebolla",
            "chile_serrano"
        ],
        "ingredientsOptional": [
            "cilantro",
            "tortilla_maiz"
        ],
        "steps": [
            "Pica el jitomate, la cebolla y el chile serrano en cubos pequeños.",
            "Calienta un poco de aceite en un sartén a fuego medio y sofríe la cebolla y el chile serrano 2 min hasta que acitronen.",
            "Agrega el jitomate y cocina 3-4 min hasta que suelte su jugo y se reduzca un poco.",
            "Bate los huevos ligeramente e incorpóralos al sartén; revuelve constantemente hasta que cuajen, unos 3 min.",
            "Sazona con sal y, si tienes, espolvorea cilantro picado.",
            "Sirve caliente, acompañado de tortillas de maíz calientes si tienes."
        ],
        "cravings": [
            "mexicano",
            "rapido",
            "reconfortante"
        ],
        "seasonalBoostIngredients": [
            "jitomate"
        ],
        "profile": {
            "fiber": "baja",
            "protein": "alta",
            "satFat": "media",
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
        "id": "huevos_rancheros_nime",
        "name": "Huevos Rancheros",
        "family": "huevo",
        "format": "plato",
        "description": "Huevos estrellados sobre tortilla, bañados en salsa roja. Desayuno mexicano por excelencia.",
        "servings": 2,
        "timeMin": 15,
        "effort": "bajo",
        "mealType": "desayuno",
        "lowFriction": true,
        "ingredientsRequired": [
            "huevo",
            "tortilla_maiz",
            "salsa_roja"
        ],
        "ingredientsOptional": [
            "frijol",
            "aguacate",
            "queso_fresco"
        ],
        "steps": [
            "Calienta la salsa roja en un sartén pequeño a fuego bajo.",
            "En otro sartén, calienta un poco de aceite y fríe las tortillas de maíz ligeramente por ambos lados, hasta que doren un poco pero sigan flexibles.",
            "En el mismo sartén o en uno aparte, estrella los huevos y cocínalos a fuego medio hasta que la clara cuaje y la yema quede a tu gusto, 3-4 min.",
            "Si tienes, calienta el frijol y unta una capa sobre cada tortilla antes de servir.",
            "Coloca las tortillas en un plato, encima un huevo estrellado y báñalo con la salsa roja caliente.",
            "Corona con aguacate rebanado y queso fresco desmoronado, si tienes.",
            "Sirve de inmediato."
        ],
        "cravings": [
            "mexicano",
            "reconfortante",
            "picante"
        ],
        "seasonalBoostIngredients": [
            "jitomate"
        ],
        "profile": {
            "fiber": "media",
            "protein": "alta",
            "satFat": "media",
            "glyLoad": "media",
            "vegetableVolume": "medio",
            "energyDensity": "media"
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
        "id": "sopa_fideo_jitomate",
        "name": "Sopa de Fideo",
        "family": "cereales",
        "format": "sopa",
        "description": "Sopa aguada de fideo en caldillo de jitomate. Entrada casera económica y reconfortante.",
        "servings": 4,
        "timeMin": 25,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
        "ingredientsRequired": [
            "pasta_seca",
            "jitomate",
            "cebolla",
            "ajo",
            "caldo_pollo"
        ],
        "ingredientsOptional": [
            "aguacate",
            "limon"
        ],
        "steps": [
            "Licúa el jitomate con un trozo de cebolla y un diente de ajo hasta obtener un puré terso.",
            "Calienta un poco de aceite en una olla a fuego medio y fríe la pasta seca 2-3 min, moviendo, hasta que dore ligeramente.",
            "Vierte el puré de jitomate colado sobre la pasta y cocina 2 min hasta que espese un poco y se sazone.",
            "Agrega el caldo de pollo caliente y sal al gusto, y deja hervir.",
            "Baja el fuego y cuece tapado 10-12 min hasta que la pasta esté suave.",
            "Sirve caliente, con aguacate en cubos y un chorrito de limón si tienes."
        ],
        "cravings": [
            "reconfortante",
            "caldoso",
            "mexicano"
        ],
        "seasonalBoostIngredients": [
            "jitomate"
        ],
        "profile": {
            "fiber": "baja",
            "protein": "baja",
            "satFat": "baja",
            "glyLoad": "media",
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
        "id": "arroz_rojo_mexicano",
        "name": "Arroz Rojo a la Mexicana",
        "family": "basicos",
        "format": "plato",
        "description": "Arroz frito y guisado en jitomate con zanahoria y chícharo. Guarnición indispensable.",
        "servings": 4,
        "timeMin": 30,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
        "ingredientsRequired": [
            "arroz_blanco",
            "jitomate",
            "cebolla",
            "ajo"
        ],
        "ingredientsOptional": [
            "zanahoria",
            "chícharo",
            "caldo_pollo"
        ],
        "steps": [
            "Enjuaga el arroz blanco bajo agua hasta que salga clara y escurre bien.",
            "Licúa el jitomate con la cebolla y el ajo hasta obtener un puré terso.",
            "Calienta aceite en una olla y fríe el arroz 4-5 min a fuego medio, moviendo constantemente, hasta que se vuelva opaco y ligeramente dorado.",
            "Vierte el puré de jitomate colado y cocina 2-3 min hasta que se sazone y reduzca.",
            "Si tienes, agrega zanahoria en cubos y chícharos.",
            "Añade caldo de pollo o agua caliente (el doble de volumen que el arroz) y sal al gusto, y deja hervir.",
            "Baja el fuego, tapa y cuece 18-20 min sin destapar, hasta que el arroz absorba el líquido y esté suave.",
            "Deja reposar 5 min tapado, esponja con un tenedor y sirve."
        ],
        "cravings": [
            "mexicano",
            "reconfortante",
            "llenador"
        ],
        "seasonalBoostIngredients": [
            "jitomate",
            "zanahoria"
        ],
        "profile": {
            "fiber": "baja",
            "protein": "baja",
            "satFat": "baja",
            "glyLoad": "alta",
            "vegetableVolume": "medio",
            "energyDensity": "media"
        },
        "mealPrep": {
            "usesBases": [
                "arroz_blanco"
            ],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "tinga_pollo_clasica",
        "name": "Tinga de Pollo",
        "family": "pollo",
        "format": "plato",
        "description": "Pollo deshebrado guisado con cebolla, jitomate y chipotle. Para tacos, tostadas o tortas.",
        "servings": 4,
        "timeMin": 25,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
        "ingredientsRequired": [
            "pollo_deshebrado",
            "jitomate",
            "cebolla",
            "chile_chipotle_lata"
        ],
        "ingredientsOptional": [
            "tostada",
            "aguacate",
            "crema"
        ],
        "steps": [
            "Rebana la cebolla en tiras finas y corta el jitomate en cubos.",
            "Calienta un poco de aceite en un sartén a fuego medio y acitrona la cebolla 3-4 min.",
            "Agrega el jitomate y cocina 5 min hasta que se suavice y suelte su jugo.",
            "Pica el chipotle en adobo (lata) y agrégalo junto con un poco de su adobo; cocina 2 min.",
            "Incorpora el pollo deshebrado, sazona con sal y cocina 8-10 min a fuego medio-bajo, moviendo de vez en cuando, hasta que se integre y espese.",
            "Sirve la tinga sobre tostadas, si tienes, con aguacate y un toque de crema."
        ],
        "cravings": [
            "mexicano",
            "picante",
            "llenador"
        ],
        "seasonalBoostIngredients": [
            "jitomate"
        ],
        "profile": {
            "fiber": "media",
            "protein": "alta",
            "satFat": "media",
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
        "id": "picadillo_res_papa",
        "name": "Picadillo de Res con Papa",
        "family": "res",
        "format": "plato",
        "description": "Carne molida guisada con papa, zanahoria y jitomate. Relleno versátil y rendidor.",
        "servings": 4,
        "timeMin": 30,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
        "ingredientsRequired": [
            "res_molida",
            "papa",
            "jitomate",
            "cebolla"
        ],
        "ingredientsOptional": [
            "zanahoria",
            "chícharo",
            "chile_serrano"
        ],
        "steps": [
            "Pela y corta la papa en cubos pequeños.",
            "Pica la cebolla y el jitomate finamente; si tienes, pica también el chile serrano.",
            "Calienta aceite en una olla y sofríe la cebolla y el chile serrano 2 min hasta que acitronen.",
            "Agrega la res molida y cocina 6-8 min, deshaciendo grumos, hasta que pierda el color rosado.",
            "Incorpora el jitomate y cocina 3 min hasta que suelte su jugo.",
            "Añade la papa y, si tienes, zanahoria y chícharo; vierte un poco de agua hasta cubrir a la mitad.",
            "Tapa y cuece a fuego medio-bajo 12-15 min hasta que la papa esté suave; sazona con sal.",
            "Sirve caliente."
        ],
        "cravings": [
            "reconfortante",
            "llenador",
            "mexicano"
        ],
        "seasonalBoostIngredients": [
            "jitomate",
            "zanahoria"
        ],
        "profile": {
            "fiber": "media",
            "protein": "alta",
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
        "id": "nopales_con_huevo",
        "name": "Nopales con Huevo",
        "family": "huevo",
        "format": "plato",
        "description": "Nopales asados revueltos con huevo y cebolla. Desayuno ligero, alto en fibra.",
        "servings": 2,
        "timeMin": 15,
        "effort": "bajo",
        "mealType": "desayuno",
        "lowFriction": true,
        "ingredientsRequired": [
            "nopal",
            "huevo",
            "cebolla"
        ],
        "ingredientsOptional": [
            "chile_serrano",
            "jitomate",
            "queso_fresco"
        ],
        "steps": [
            "Si el nopal es fresco, límpialo de espinas, córtalo en cuadros y cuécelo en agua con sal 10 min hasta que suelte la baba y esté suave, luego escurre (si ya tienes nopales cocidos preparados, úsalos directamente y sáltate este paso).",
            "Pica la cebolla finamente y, si tienes, el chile serrano y el jitomate.",
            "Calienta un poco de aceite en un sartén a fuego medio y sofríe la cebolla 2 min hasta que acitrone.",
            "Agrega el nopal cocido y, si tienes, chile serrano y jitomate; cocina 3-4 min.",
            "Bate los huevos e incorpóralos al sartén; revuelve hasta que cuajen, 3 min.",
            "Sazona con sal y sirve caliente, con queso fresco desmoronado encima si tienes."
        ],
        "cravings": [
            "saludable",
            "ligero",
            "mexicano"
        ],
        "seasonalBoostIngredients": [
            "nopal"
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
        "id": "calabacitas_a_la_mexicana",
        "name": "Calabacitas a la Mexicana",
        "family": "verduras",
        "format": "plato",
        "description": "Calabacita guisada con elote, jitomate y cebolla. Plato de verdura ligero y colorido.",
        "servings": 4,
        "timeMin": 20,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
        "ingredientsRequired": [
            "calabacita",
            "elote",
            "jitomate",
            "cebolla"
        ],
        "ingredientsOptional": [
            "chile_serrano",
            "queso_fresco",
            "epazote"
        ],
        "steps": [
            "Corta la calabacita en cubos medianos y desgrana el elote.",
            "Pica la cebolla y el jitomate; si tienes, pica también el chile serrano.",
            "Calienta aceite en un sartén a fuego medio y sofríe la cebolla y el chile serrano 2 min.",
            "Agrega el jitomate y cocina 3-4 min hasta que se suavice.",
            "Incorpora la calabacita y el elote, sazona con sal, tapa y cocina 10-12 min moviendo ocasionalmente, hasta que la calabacita esté suave pero no deshecha.",
            "Si tienes, agrega epazote los últimos minutos de cocción.",
            "Sirve caliente, con queso fresco desmoronado si tienes."
        ],
        "cravings": [
            "saludable",
            "ligero",
            "fresco"
        ],
        "seasonalBoostIngredients": [
            "calabacita",
            "elote",
            "jitomate"
        ],
        "profile": {
            "fiber": "alta",
            "protein": "baja",
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
        "id": "caldo_pollo_verduras",
        "name": "Caldo de Pollo con Verduras",
        "family": "pollo",
        "format": "caldo",
        "description": "Caldo casero de pollo con zanahoria, calabacita y papa. Reconfortante y nutritivo.",
        "servings": 4,
        "timeMin": 40,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
        "ingredientsRequired": [
            "pollo_muslo",
            "zanahoria",
            "calabacita",
            "papa"
        ],
        "ingredientsOptional": [
            "elote",
            "cilantro",
            "limon",
            "arroz_blanco"
        ],
        "steps": [
            "Coloca el pollo (muslo/pierna) en una olla grande con agua suficiente para cubrirlo y una pizca de sal, y lleva a hervor a fuego alto.",
            "Baja el fuego, retira la espuma que se forme en la superficie, y cuece tapado 20 min.",
            "Mientras tanto, pela y corta la zanahoria y la papa en trozos medianos, y corta la calabacita en trozos.",
            "Agrega la zanahoria y la papa al caldo y cuece 10 min más.",
            "Incorpora la calabacita y, si tienes, elote en rodajas; cuece 8-10 min hasta que todas las verduras estén suaves y el pollo se deshebre fácilmente.",
            "Retira un poco del pollo cocido, deshébralo y resérvalo aparte si quieres usarlo luego en otras recetas de la semana.",
            "Si tienes, sirve con arroz blanco cocido en el fondo del plato.",
            "Sirve el caldo bien caliente, con cilantro picado y un chorrito de limón si tienes."
        ],
        "cravings": [
            "reconfortante",
            "caldoso",
            "saludable"
        ],
        "seasonalBoostIngredients": [
            "zanahoria",
            "calabacita"
        ],
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
            "derivatives": [
                "pollo_deshebrado"
            ]
        }
    },
    {
        "id": "tacos_chorizo_papa",
        "name": "Tacos de Chorizo con Papa",
        "family": "cerdo",
        "format": "taco",
        "description": "Chorizo dorado con papa en cubos, servido en tortilla de maíz. Taquería de cazo en casa.",
        "servings": 4,
        "timeMin": 25,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
        "ingredientsRequired": [
            "chorizo",
            "papa",
            "tortilla_maiz"
        ],
        "ingredientsOptional": [
            "cebolla",
            "cilantro",
            "salsa_verde"
        ],
        "steps": [
            "Pela la papa y córtala en cubos pequeños.",
            "Cuece la papa en agua con sal 8-10 min hasta que esté suave; escurre.",
            "Calienta un sartén a fuego medio y dora el chorizo, desmoronándolo con una cuchara, 5-6 min hasta que suelte su grasa.",
            "Agrega la papa cocida al sartén y cocina 5-7 min más, moviendo, hasta que se dore ligeramente y se integre con el chorizo.",
            "Si tienes, agrega cebolla picada los últimos minutos.",
            "Calienta las tortillas de maíz en un comal.",
            "Rellena las tortillas con la mezcla de chorizo y papa.",
            "Sirve con cilantro picado y salsa verde al gusto, si tienes."
        ],
        "cravings": [
            "mexicano",
            "antojo",
            "llenador"
        ],
        "seasonalBoostIngredients": [],
        "profile": {
            "fiber": "baja",
            "protein": "media",
            "satFat": "alta",
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
        "id": "pollo_entomatado",
        "name": "Pollo Entomatado",
        "family": "pollo",
        "format": "plato",
        "description": "Piezas de pollo guisadas en salsa de jitomate con cebolla y ajo. Comida sencilla de diario.",
        "servings": 4,
        "timeMin": 35,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
        "ingredientsRequired": [
            "pollo_muslo",
            "jitomate",
            "cebolla",
            "ajo"
        ],
        "ingredientsOptional": [
            "chile_serrano",
            "arroz_blanco"
        ],
        "steps": [
            "Sazona las piezas de pollo (muslo/pierna) con sal.",
            "Calienta aceite en una olla y dora el pollo por ambos lados, 4-5 min por lado; retira y reserva.",
            "Licúa el jitomate con la cebolla y el ajo hasta obtener un puré terso; si tienes, agrega el chile serrano.",
            "Vierte el puré en la misma olla y cocina 5 min hasta que se sazone y reduzca un poco.",
            "Regresa el pollo a la olla, agrega un poco de agua si hace falta para casi cubrirlo, tapa y cuece a fuego medio-bajo 20-25 min hasta que el pollo esté suave y bien cocido.",
            "Sirve caliente, acompañado de arroz blanco si tienes."
        ],
        "cravings": [
            "reconfortante",
            "mexicano",
            "llenador"
        ],
        "seasonalBoostIngredients": [
            "jitomate"
        ],
        "profile": {
            "fiber": "baja",
            "protein": "alta",
            "satFat": "media",
            "glyLoad": "baja",
            "vegetableVolume": "medio",
            "energyDensity": "media"
        },
        "mealPrep": {
            "usesBases": [],
            "leavesBases": [],
            "derivatives": [
                "pollo_deshebrado"
            ]
        }
    },
    {
        "id": "quesadillas_champinon",
        "name": "Quesadillas de Champiñón",
        "family": "maiz",
        "format": "tortilla",
        "description": "Quesadillas de champiñón salteado con epazote y queso Oaxaca. Antojo vegetariano rápido.",
        "servings": 2,
        "timeMin": 15,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
        "ingredientsRequired": [
            "tortilla_maiz",
            "champiñon",
            "queso_oaxaca"
        ],
        "ingredientsOptional": [
            "epazote",
            "cebolla",
            "salsa_verde"
        ],
        "steps": [
            "Rebana los champiñones y, si tienes, pica la cebolla finamente.",
            "Calienta un poco de aceite en un sartén a fuego medio y saltea la cebolla 2 min, luego agrega los champiñones y cocina 5-6 min hasta que suelten su agua y doren.",
            "Si tienes, agrega epazote picado al final y sazona con sal.",
            "Calienta las tortillas de maíz en un comal, coloca queso Oaxaca deshebrado y un poco del relleno de champiñón sobre una mitad.",
            "Dobla la tortilla y cocina en el comal 2 min por lado hasta que el queso se derrita y la tortilla dore ligeramente.",
            "Sirve caliente con salsa verde al gusto, si tienes."
        ],
        "cravings": [
            "mexicano",
            "rapido",
            "cremoso"
        ],
        "seasonalBoostIngredients": [],
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
        "id": "ensalada_nopales_clasica",
        "name": "Ensalada de Nopales",
        "family": "verduras",
        "format": "lechuga",
        "description": "Nopales cocidos con jitomate, cebolla, cilantro y queso fresco. Fresca y muy mexicana.",
        "servings": 4,
        "timeMin": 15,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
        "ingredientsRequired": [
            "nopales_cocidos",
            "jitomate",
            "cebolla",
            "cilantro"
        ],
        "ingredientsOptional": [
            "queso_fresco",
            "aguacate",
            "oregano",
            "limon"
        ],
        "steps": [
            "Escurre bien los nopales cocidos y córtalos en tiras o cuadros si no vienen ya cortados.",
            "Pica el jitomate y la cebolla en cubos pequeños, y el cilantro finamente.",
            "En un tazón grande, mezcla los nopales cocidos con el jitomate, la cebolla y el cilantro.",
            "Sazona con sal y, si tienes, orégano y un chorrito de limón; mezcla bien.",
            "Si tienes, agrega aguacate en cubos y queso fresco desmoronado encima.",
            "Deja reposar 5 min para que se integren los sabores y sirve fría o a temperatura ambiente."
        ],
        "cravings": [
            "fresco",
            "saludable",
            "ligero"
        ],
        "seasonalBoostIngredients": [
            "nopal",
            "jitomate"
        ],
        "profile": {
            "fiber": "alta",
            "protein": "baja",
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
        "id": "pescado_veracruzana",
        "name": "Pescado a la Veracruzana",
        "family": "pescados",
        "format": "plato",
        "description": "Filete de pescado blanco en salsa de jitomate con cebolla, ajo y hierbas. Ligero y festivo.",
        "servings": 2,
        "timeMin": 30,
        "effort": "medio",
        "mealType": "comida",
        "lowFriction": false,
        "ingredientsRequired": [
            "pescado_blanco",
            "jitomate",
            "cebolla",
            "ajo"
        ],
        "ingredientsOptional": [
            "chile_serrano",
            "laurel",
            "limon"
        ],
        "steps": [
            "Sazona los filetes de pescado blanco con sal y, si tienes, limón; deja reposar 5 min.",
            "Pica finamente la cebolla y el ajo, y corta el jitomate en cubos.",
            "Calienta aceite en un sartén amplio y sofríe la cebolla y el ajo 2-3 min hasta que acitronen.",
            "Agrega el jitomate y, si tienes, el chile serrano y la hoja de laurel, y cocina 8-10 min a fuego medio hasta que la salsa espese.",
            "Coloca los filetes de pescado sobre la salsa, tapa y cocina 8-10 min a fuego medio-bajo, sin voltear, hasta que el pescado esté opaco y se deshaga fácilmente con el tenedor.",
            "Retira la hoja de laurel si la usaste y sirve caliente, bañado con la salsa."
        ],
        "cravings": [
            "saludable",
            "ligero",
            "elegante"
        ],
        "seasonalBoostIngredients": [
            "jitomate"
        ],
        "profile": {
            "fiber": "baja",
            "protein": "alta",
            "satFat": "baja",
            "glyLoad": "baja",
            "vegetableVolume": "medio",
            "energyDensity": "baja"
        },
        "mealPrep": {
            "usesBases": [],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "rajas_con_crema",
        "name": "Rajas con Crema",
        "family": "verduras",
        "format": "plato",
        "description": "Rajas de chile poblano con cebolla, elote y crema. Guiso cremoso para tacos o guarnición.",
        "servings": 4,
        "timeMin": 20,
        "effort": "bajo",
        "mealType": "comida",
        "lowFriction": true,
        "ingredientsRequired": [
            "rajas_poblano",
            "cebolla",
            "crema",
            "elote"
        ],
        "ingredientsOptional": [
            "queso_oaxaca",
            "tortilla_maiz"
        ],
        "steps": [
            "Rebana la cebolla en tiras finas.",
            "Calienta aceite en un sartén a fuego medio y acitrona la cebolla 3 min.",
            "Agrega las rajas de poblano y el elote desgranado, y cocina 6-8 min moviendo ocasionalmente, hasta que las rajas estén suaves.",
            "Baja el fuego, incorpora la crema y sal al gusto, y cocina 3-4 min más sin dejar que hierva fuerte, hasta que espese ligeramente.",
            "Si tienes, agrega queso Oaxaca deshebrado y deja que se derrita.",
            "Sirve caliente, con tortillas de maíz calientes si tienes."
        ],
        "cravings": [
            "cremoso",
            "reconfortante",
            "mexicano"
        ],
        "seasonalBoostIngredients": [
            "chile_poblano",
            "elote"
        ],
        "profile": {
            "fiber": "media",
            "protein": "baja",
            "satFat": "alta",
            "glyLoad": "media",
            "vegetableVolume": "alto",
            "energyDensity": "media"
        },
        "mealPrep": {
            "usesBases": [],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "chiles_rellenos_queso",
        "name": "Chiles Rellenos de Queso",
        "family": "verduras",
        "format": "plato",
        "description": "Chile poblano relleno de queso en caldillo de jitomate. Clásico de domingo, versión al horno.",
        "servings": 4,
        "timeMin": 45,
        "effort": "medio",
        "mealType": "comida",
        "lowFriction": false,
        "ingredientsRequired": [
            "chile_poblano",
            "queso_oaxaca",
            "jitomate",
            "huevo"
        ],
        "ingredientsOptional": [
            "cebolla",
            "harina_trigo",
            "arroz_blanco"
        ],
        "steps": [
            "Asa los chiles poblanos directamente sobre la flama o comal hasta que la piel se ampolle y ennegrezca por completo; mételos en una bolsa de plástico 10 min para que suden.",
            "Pela los chiles con cuidado, haz un corte a lo largo y retira semillas y venas sin romperlos.",
            "Rellena cada chile con queso Oaxaca deshebrado.",
            "Separa las claras de las yemas de huevo; bate las claras a punto de turrón y luego incorpora las yemas con movimientos envolventes.",
            "Si tienes, pasa los chiles por harina de trigo y luego capea en el huevo batido.",
            "Fríe los chiles capeados en aceite caliente 2-3 min por lado hasta dorar; escurre sobre papel absorbente.",
            "Licúa el jitomate con un trozo de cebolla si tienes, cuela y cocina en un sartén 8-10 min hasta formar un caldillo sazonado; baña los chiles con él.",
            "Sirve caliente, acompañado de arroz blanco si tienes."
        ],
        "cravings": [
            "mexicano",
            "reconfortante",
            "elegante"
        ],
        "seasonalBoostIngredients": [
            "chile_poblano",
            "jitomate"
        ],
        "profile": {
            "fiber": "media",
            "protein": "media",
            "satFat": "alta",
            "glyLoad": "media",
            "vegetableVolume": "alto",
            "energyDensity": "media"
        },
        "mealPrep": {
            "usesBases": [],
            "leavesBases": [],
            "derivatives": []
        }
    },
    {
        "id": "albondigas_chipotle",
        "name": "Albóndigas al Chipotle",
        "family": "res",
        "format": "caldo",
        "description": "Albóndigas de res en caldillo de jitomate y chipotle. Reconfortantes y llenadoras.",
        "servings": 4,
        "timeMin": 40,
        "effort": "medio",
        "mealType": "comida",
        "lowFriction": false,
        "ingredientsRequired": [
            "res_molida",
            "arroz_blanco",
            "huevo",
            "jitomate",
            "chile_chipotle_lata"
        ],
        "ingredientsOptional": [
            "cebolla",
            "zanahoria",
            "hierba_buena"
        ],
        "steps": [
            "En un tazón, mezcla la res molida con el arroz blanco crudo, el huevo, sal y, si tienes, hierbabuena picada; forma bolitas medianas (albóndigas).",
            "Licúa el jitomate con cebolla, si tienes, y el chipotle en adobo (lata) hasta obtener un puré.",
            "Vierte el puré en una olla, agrega agua hasta llenar la olla a dos terceras partes, y lleva a hervor.",
            "Si tienes, agrega zanahoria en rodajas al caldo.",
            "Con cuidado, deja caer las albóndigas una por una en el caldo hirviendo.",
            "Baja el fuego a medio-bajo, tapa parcialmente y cuece 25-30 min sin mover mucho, hasta que las albóndigas estén bien cocidas y el arroz dentro esté suave.",
            "Sirve caliente en platos hondos, con hierbabuena fresca encima si tienes."
        ],
        "cravings": [
            "reconfortante",
            "caldoso",
            "picante"
        ],
        "seasonalBoostIngredients": [
            "jitomate",
            "zanahoria"
        ],
        "profile": {
            "fiber": "media",
            "protein": "alta",
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
        "id": "platanos_machos_fritos",
        "name": "Plátanos Machos Fritos con Crema",
        "family": "postres",
        "format": "postre",
        "description": "Plátano macho dorado en sartén, servido con crema y queso. Postre o cena dulce de toda la vida.",
        "servings": 2,
        "timeMin": 15,
        "effort": "bajo",
        "mealType": "postre",
        "lowFriction": true,
        "ingredientsRequired": [
            "platano_macho",
            "crema"
        ],
        "ingredientsOptional": [
            "queso_fresco",
            "azucar",
            "canela_molida"
        ],
        "steps": [
            "Pela el plátano macho, que debe estar bien maduro con cáscara oscura, y córtalo en rebanadas diagonales de 1 cm.",
            "Calienta aceite en un sartén a fuego medio.",
            "Fríe las rebanadas de plátano 2-3 min por lado hasta que doren y caramelicen ligeramente.",
            "Escurre sobre papel absorbente.",
            "Sirve caliente con un chorro generoso de crema encima.",
            "Si tienes, espolvorea azúcar y canela molida, o agrega queso fresco desmoronado para un contraste salado."
        ],
        "cravings": [
            "dulce",
            "reconfortante",
            "antojo"
        ],
        "seasonalBoostIngredients": [],
        "profile": {
            "fiber": "media",
            "protein": "baja",
            "satFat": "media",
            "glyLoad": "alta",
            "vegetableVolume": "bajo",
            "energyDensity": "alta"
        },
        "mealPrep": {
            "usesBases": [],
            "leavesBases": [],
            "derivatives": []
        }
    }
];

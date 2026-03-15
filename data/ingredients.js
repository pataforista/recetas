/**
 * INGREDIENTS – Milpa NiME
 *
 * Fuente de frecuencias:
 *   "alta"  → top consumidos según ENSANUT 2018-2022, Atlas SADER y Kaggle "What's Cooking?" (mexican)
 *   "media" → presencia habitual en cocina mexicana cotidiana / recetarios regionales
 *   "baja"  → ingredientes especializados, regionales o de uso esporádico
 *
 * Campos:
 *   id          – identificador único (snake_case)
 *   name        – nombre en español para mostrar en UI
 *   category    – grupo de alimento para filtros de inventario
 *   aliases     – sinónimos alternativos para scoring
 *   seasonal    – si varía con temporada
 *   frequency   – "alta" | "media" | "baja"  (frecuencia de consumo en México)
 *   mexican_alt – sustituto local cuando el ingrediente es foráneo
 *   allergens   – array de alergenos (gluten, lacteos, huevo, cacahuate, frutos_secos, mariscos, pescado, soya, sesamo)
 */

// Alérgenos comunes
export const ALLERGEN_TYPES = {
    gluten: { label: "Gluten", icon: "grain" },
    lacteos: { label: "Lácteos", icon: "local_cafe" },
    huevo: { label: "Huevo", icon: "egg" },
    cacahuate: { label: "Cacahuate/Maní", icon: "nuts" },
    frutos_secos: { label: "Frutos secos (nueces, almendras, etc)", icon: "nature" },
    mariscos: { label: "Mariscos", icon: "waves" },
    pescado: { label: "Pescado", icon: "water" },
    soya: { label: "Soya", icon: "favorite" },
    sesamo: { label: "Sésamo", icon: "circle" }
};
export const INGREDIENTS = [

    // ─── MILPA ──────────────────────────────────────────────────────────
    // Base de la dieta mexicana (patrimonio UNESCO). Fuentes: SADER, ENSANUT, BAM-INSP
    { id: "tortilla_maiz", name: "Tortilla de maíz", category: "milpa", aliases: ["tortilla"], seasonal: false, frequency: "alta", allergens: [] },
    { id: "masa_maiz", name: "Masa de maíz", category: "milpa", aliases: ["masa"], seasonal: false, frequency: "alta", allergens: [] },
    { id: "elote", name: "Elote", category: "milpa", aliases: ["maíz tierno", "corn"], seasonal: true, frequency: "alta", allergens: [] },
    { id: "nopal", name: "Nopal", category: "milpa", aliases: ["nopales"], seasonal: true, frequency: "alta", allergens: [] },
    { id: "frijol", name: "Frijol negro", category: "milpa", aliases: ["frijoles negros", "black beans"], seasonal: false, frequency: "alta", allergens: [] },
    { id: "calabacita", name: "Calabacita", category: "milpa", aliases: ["zucchini", "calabaza tierna"], seasonal: true, frequency: "alta", allergens: [] },
    { id: "epazote", name: "Epazote", category: "milpa", seasonal: true, frequency: "media", allergens: [] },
    { id: "flor_calabaza", name: "Flor de calabaza", category: "milpa", seasonal: true, frequency: "media", allergens: [] },
    { id: "chayote", name: "Chayote", category: "milpa", seasonal: true, frequency: "media", allergens: [] },
    { id: "maiz_pozolero", name: "Maíz pozolero", category: "milpa", aliases: ["hominy"], seasonal: false, frequency: "media", allergens: [] },
    { id: "huitlacoche", name: "Huitlacoche", category: "milpa", aliases: ["cuitlacoche"], seasonal: true, frequency: "baja", allergens: [] },

    // ─── VERDURAS ────────────────────────────────────────────────────────
    // Hortalizas más consumidas: Atlas SADER 2016 + BAM-INSP + Kaggle mexican
    { id: "jitomate", name: "Jitomate", category: "verduras", aliases: ["tomate rojo", "tomato"], seasonal: true, frequency: "alta" },
    { id: "cebolla", name: "Cebolla", category: "verduras", aliases: ["onion"], seasonal: false, frequency: "alta" },
    { id: "chile_serrano", name: "Chile serrano", category: "verduras", aliases: ["serrano pepper"], seasonal: true, frequency: "alta" },
    { id: "tomate_verde", name: "Tomate verde", category: "verduras", aliases: ["tomatillo", "miltomate"], seasonal: true, frequency: "alta" },
    { id: "zanahoria", name: "Zanahoria", category: "verduras", aliases: ["carrot"], seasonal: false, frequency: "alta" },
    { id: "chile_poblano", name: "Chile poblano", category: "verduras", aliases: ["poblano chili"], seasonal: true, frequency: "alta" },
    { id: "pepino", name: "Pepino", category: "verduras", seasonal: true, frequency: "alta" },
    { id: "hongo", name: "Hongos", category: "verduras", aliases: ["champiñones", "mushrooms"], seasonal: true, frequency: "alta" },
    { id: "rajas_poblano", name: "Rajas de poblano", category: "verduras", seasonal: true, frequency: "alta" },
    { id: "chile_jalapeño", name: "Chile jalapeño", category: "verduras", aliases: ["jalapeño", "jalapeño pepper"], seasonal: true, frequency: "alta" },
    { id: "lechuga", name: "Lechuga", category: "verduras", aliases: ["romaine lettuce"], seasonal: true, frequency: "media" },
    { id: "espinaca", name: "Espinaca", category: "verduras", aliases: ["spinach"], seasonal: true, frequency: "media" },
    { id: "brocoli", name: "Brócoli", category: "verduras", aliases: ["broccoli"], seasonal: true, frequency: "media" },
    { id: "coliflor", name: "Coliflor", category: "verduras", aliases: ["cauliflower"], seasonal: true, frequency: "media" },
    { id: "berenjena", name: "Berenjena", category: "verduras", aliases: ["eggplant"], seasonal: true, frequency: "media" },
    { id: "cebolla_morada", name: "Cebolla morada", category: "verduras", aliases: ["red onion"], seasonal: false, frequency: "media" },
    { id: "ejote", name: "Ejote", category: "verduras", aliases: ["judía verde", "green bean"], seasonal: true, frequency: "media" },
    { id: "repollo", name: "Repollo / Col", category: "verduras", aliases: ["col", "cabbage"], seasonal: false, frequency: "media" },
    { id: "apio", name: "Apio", category: "verduras", aliases: ["celery"], seasonal: false, frequency: "media" },
    { id: "betabel", name: "Betabel", category: "verduras", aliases: ["remolacha", "beet"], seasonal: true, frequency: "media" },
    { id: "jicama", name: "Jícama", category: "verduras", seasonal: true, frequency: "media" },
    { id: "chícharo", name: "Chícharo", category: "verduras", aliases: ["guisante", "pea"], seasonal: true, frequency: "media" },
    { id: "pimiento_rojo", name: "Pimiento rojo", category: "verduras", aliases: ["morrón rojo", "red bell pepper"], seasonal: true, frequency: "media" },
    { id: "pimiento_verde", name: "Pimiento verde", category: "verduras", aliases: ["morrón verde", "green bell pepper"], seasonal: true, frequency: "media" },
    { id: "platano_verde", name: "Plátano verde", category: "verduras", aliases: ["green plantain"], seasonal: false, frequency: "media" },
    { id: "platano_macho", name: "Plátano macho", category: "verduras", aliases: ["plantain"], seasonal: false, frequency: "media" },
    { id: "chile_ancho", name: "Chile ancho", category: "verduras", aliases: ["ancho chili"], seasonal: false, frequency: "media" },
    { id: "chile_guajillo", name: "Chile guajillo", category: "verduras", aliases: ["guajillo chili"], seasonal: false, frequency: "media" },
    { id: "chile_pasilla", name: "Chile pasilla", category: "verduras", seasonal: false, frequency: "media" },
    { id: "chile_mulato", name: "Chile mulato", category: "verduras", seasonal: false, frequency: "baja" },
    { id: "esparragos", name: "Espárragos", category: "verduras", aliases: ["asparagus"], seasonal: true, frequency: "baja" },
    { id: "alcachofa", name: "Alcachofa", category: "verduras", aliases: ["artichoke"], seasonal: true, frequency: "baja" },
    { id: "col_morada", name: "Col morada", category: "verduras", aliases: ["red cabbage"], seasonal: false, frequency: "baja" },
    { id: "col_bruselas", name: "Coles de Bruselas", category: "verduras", aliases: ["brussels sprouts"], seasonal: true, frequency: "baja" },
    { id: "poro", name: "Poro", category: "verduras", aliases: ["puerro", "leek"], seasonal: true, frequency: "baja" },
    { id: "nabo", name: "Nabo", category: "verduras", aliases: ["turnip"], seasonal: true, frequency: "baja" },
    { id: "watercress", name: "Berros", category: "verduras", aliases: ["watercress"], seasonal: true, frequency: "baja" },
    { id: "hongo_portobello", name: "Portobello", category: "verduras", seasonal: false, frequency: "baja" },
    { id: "hongo_shitake", name: "Shiitake", category: "verduras", seasonal: false, frequency: "baja" },
    { id: "daikon", name: "Nabo Daikon", category: "verduras", seasonal: true, frequency: "baja" },
    { id: "burdock_root", name: "Raíz de Bardana", category: "verduras", aliases: ["gobo"], seasonal: true, frequency: "baja" },
    { id: "wakame", name: "Alga Wakame", category: "verduras", seasonal: false, frequency: "baja" },
    { id: "kombu", name: "Alga Kombu", category: "verduras", seasonal: false, frequency: "baja" },
    { id: "alga_nori", name: "Alga Nori", category: "verduras", seasonal: false, frequency: "baja" },
    { id: "konjac", name: "Konjac", category: "verduras", aliases: ["konnyaku"], seasonal: false, frequency: "baja" },
    // Nuevos — gap detectado vs Kaggle + BAM-INSP
    { id: "chile_chipotle", name: "Chile chipotle", category: "verduras", aliases: ["chipotle"], seasonal: false, frequency: "alta" },
    { id: "chile_habanero", name: "Chile habanero", category: "verduras", seasonal: true, frequency: "media" },
    { id: "chile_de_agua", name: "Chile de agua", category: "verduras", seasonal: true, frequency: "baja" },
    { id: "quelites", name: "Quelites", category: "verduras", aliases: ["verdolaga", "huauzontle"], seasonal: true, frequency: "media" },
    { id: "verdolaga", name: "Verdolaga", category: "verduras", seasonal: true, frequency: "media" },
    { id: "nopales_cocidos", name: "Nopales cocidos", category: "verduras", aliases: ["nopalitos"], seasonal: false, frequency: "alta" },
    { id: "xoconostle", name: "Xoconostle", category: "verduras", seasonal: true, frequency: "baja" },

    // ─── PROTEÍNAS ───────────────────────────────────────────────────────
    // ENSANUT: huevo y pollo son las proteínas + consumidas. Kaggle: chicken top en cocinaMX
    { id: "huevo", name: "Huevo", category: "proteinas", aliases: ["egg"], seasonal: false, frequency: "alta" },
    { id: "pollo", name: "Pollo (pechuga)", category: "proteinas", aliases: ["pechuga", "chicken breast"], seasonal: false, frequency: "alta" },
    { id: "pollo_muslo", name: "Pollo (muslo/pierna)", category: "proteinas", aliases: ["muslo", "pierna", "chicken thigh"], seasonal: false, frequency: "alta" },
    { id: "pollo_deshebrado", name: "Pollo deshebrado", category: "proteinas", aliases: ["pulled chicken", "tinga"], seasonal: false, frequency: "alta" },
    { id: "atun", name: "Atún (lata)", category: "proteinas", aliases: ["tuna"], seasonal: false, frequency: "alta" },
    { id: "res_magra", name: "Res magra (bistec)", category: "proteinas", aliases: ["bistec", "beef"], seasonal: false, frequency: "alta" },
    { id: "res_molida", name: "Res molida magra", category: "proteinas", aliases: ["ground beef"], seasonal: false, frequency: "alta" },
    { id: "tofu", name: "Tofu", category: "proteinas", aliases: ["tofu firm"], seasonal: false, frequency: "media" },
    { id: "tofu_firme", name: "Tofu firme", category: "proteinas", seasonal: false, frequency: "media" },
    { id: "salmon", name: "Salmón", category: "proteinas", aliases: ["salmon"], seasonal: false, frequency: "media" },
    { id: "sardina", name: "Sardina (lata)", category: "proteinas", aliases: ["sardine"], seasonal: false, frequency: "media" },
    { id: "pescado_blanco", name: "Pescado blanco", category: "proteinas", aliases: ["bacalao", "tilapia"], seasonal: false, frequency: "media" },
    { id: "cerdo_magro", name: "Cerdo (lomo)", category: "proteinas", aliases: ["lomo", "pork loin"], seasonal: false, frequency: "media" },
    { id: "camaron", name: "Camarón", category: "proteinas", aliases: ["shrimp"], seasonal: true, frequency: "media" },
    { id: "chicharron", name: "Chicharrón", category: "proteinas", seasonal: false, frequency: "media" },
    { id: "anchoa", name: "Anchoas", category: "proteinas", aliases: ["anchovies"], seasonal: false, frequency: "baja" },
    { id: "atun_fresco", name: "Atún fresco", category: "proteinas", seasonal: false, frequency: "baja" },
    { id: "pulpo", name: "Pulpo", category: "proteinas", aliases: ["octopus"], seasonal: true, frequency: "baja" },
    { id: "brisket", name: "Brisket", category: "proteinas", aliases: ["pecho de res"], seasonal: false, frequency: "baja" },
    { id: "tempeh", name: "Tempeh", category: "proteinas", seasonal: false, frequency: "baja" },
    { id: "bonito_flakes", name: "Katsuobushi", category: "proteinas", aliases: ["copos de bonito"], seasonal: false, frequency: "baja", mexican_alt: "Sal de pescado" },
    // Nuevos — gap Kaggle + ENSANUT
    { id: "pollo_entero", name: "Pollo entero/pieza", category: "proteinas", aliases: ["whole chicken"], seasonal: false, frequency: "alta" },
    { id: "chorizo", name: "Chorizo", category: "proteinas", seasonal: false, frequency: "alta" },
    { id: "cecina", name: "Cecina", category: "proteinas", seasonal: false, frequency: "media" },
    { id: "longaniza", name: "Longaniza", category: "proteinas", seasonal: false, frequency: "media" },
    { id: "barbacoa", name: "Barbacoa (res/borrego)", category: "proteinas", seasonal: false, frequency: "media" },
    { id: "carnitas", name: "Carnitas", category: "proteinas", seasonal: false, frequency: "media" },
    { id: "cabrito", name: "Cabrito", category: "proteinas", seasonal: false, frequency: "baja" },

    // ─── LEGUMINOSAS ─────────────────────────────────────────────────────
    // ENSANUT: frijol = leguminosa dominante. Garbanzo y lenteja en ascenso
    { id: "frijol_pinto", name: "Frijol pinto", category: "leguminosas", seasonal: false, frequency: "alta" },
    { id: "frijol_bayo", name: "Frijol bayo", category: "leguminosas", seasonal: false, frequency: "alta" },
    { id: "frijol_canario", name: "Frijol canario", category: "leguminosas", seasonal: false, frequency: "media" },
    { id: "garbanzo", name: "Garbanzo", category: "leguminosas", aliases: ["chickpeas"], seasonal: false, frequency: "media" },
    { id: "lenteja", name: "Lentejas", category: "leguminosas", aliases: ["lentils"], seasonal: false, frequency: "media" },
    { id: "lenteja_roja", name: "Lentejas rojas", category: "leguminosas", aliases: ["red lentils"], seasonal: false, frequency: "baja" },
    { id: "haba", name: "Haba", category: "leguminosas", aliases: ["habas", "fava beans"], seasonal: true, frequency: "media" },
    { id: "edamame", name: "Edamame", category: "leguminosas", seasonal: false, frequency: "baja" },
    { id: "hummus", name: "Hummus", category: "leguminosas", seasonal: false, frequency: "baja" },
    // Nuevo — gap BAM-INSP
    { id: "ayocote", name: "Ayocote / Frijol gordo", category: "leguminosas", seasonal: false, frequency: "baja" },

    // ─── CEREALES Y CARBOHIDRATOS ────────────────────────────────────────
    // Papa y arroz son base junto con tortilla. Kaggle: rice muy freq en mexican
    { id: "arroz_blanco", name: "Arroz blanco", category: "cereales", aliases: ["white rice"], seasonal: false, frequency: "alta" },
    { id: "papa", name: "Papa", category: "cereales", aliases: ["patata", "potato"], seasonal: false, frequency: "alta" },
    { id: "tortilla_harina", name: "Tortilla de harina", category: "cereales", aliases: ["flour tortilla"], seasonal: false, frequency: "alta" },
    { id: "pan_blanco", name: "Pan blanco / Bolillo", category: "cereales", aliases: ["bolillo", "telera"], seasonal: false, frequency: "alta" },
    { id: "tostada", name: "Tostada", category: "cereales", seasonal: false, frequency: "media" },
    { id: "arroz_integral", name: "Arroz integral", category: "cereales", aliases: ["brown rice"], seasonal: false, frequency: "media" },
    { id: "pasta_seca", name: "Pasta seca", category: "cereales", aliases: ["spaghetti", "penne", "pasta"], seasonal: false, frequency: "media" },
    { id: "camote", name: "Camote", category: "cereales", aliases: ["batata", "sweet potato"], seasonal: true, frequency: "media" },
    { id: "avena", name: "Avena", category: "cereales", aliases: ["oats"], seasonal: false, frequency: "media" },
    { id: "pan_integral", name: "Pan integral", category: "cereales", seasonal: false, frequency: "media" },
    { id: "pasta_integral", name: "Pasta integral", category: "cereales", seasonal: false, frequency: "media" },
    { id: "arroz_sushi", name: "Arroz sushi", category: "cereales", seasonal: false, frequency: "baja" },
    { id: "pasta_garbanzo", name: "Pasta de garbanzo", category: "cereales", aliases: ["pasta de lenteja"], seasonal: false, frequency: "baja" },
    { id: "quinoa", name: "Quinoa", category: "cereales", seasonal: false, frequency: "baja" },
    { id: "amaranto", name: "Amaranto", category: "cereales", seasonal: false, frequency: "media" },
    { id: "soba", name: "Fideos soba", category: "cereales", seasonal: false, frequency: "baja" },
    { id: "udon", name: "Fideos udon", category: "cereales", seasonal: false, frequency: "baja" },
    { id: "ramen", name: "Fideos ramen", category: "cereales", seasonal: false, frequency: "baja" },
    // Nuevos — gap BAM + Kaggle
    { id: "yuca", name: "Yuca / Mandioca", category: "cereales", aliases: ["cassava", "mandioca"], seasonal: false, frequency: "media" },
    { id: "tamal_masa", name: "Masa para tamales", category: "cereales", seasonal: false, frequency: "media" },
    { id: "totopos", name: "Totopos / Nachos", category: "cereales", aliases: ["tortilla chips", "nachos"], seasonal: false, frequency: "alta" },

    // ─── LÁCTEOS ────────────────────────────────────────────────────────
    // Crema y queso fresco son los más usados en MX. Kaggle: sour cream, cheese muy frecuentes
    { id: "crema", name: "Crema", category: "lacteos", aliases: ["sour cream", "crema mexicana"], seasonal: false, frequency: "alta" },
    { id: "queso_fresco", name: "Queso fresco", category: "lacteos", seasonal: false, frequency: "alta" },
    { id: "panela", name: "Queso panela", category: "lacteos", seasonal: false, frequency: "alta" },
    { id: "queso_oaxaca", name: "Queso Oaxaca", category: "lacteos", aliases: ["quesillo"], seasonal: false, frequency: "alta" },
    { id: "leche", name: "Leche", category: "lacteos", aliases: ["milk"], seasonal: false, frequency: "alta" },
    { id: "yogurt_natural", name: "Yogurt natural", category: "lacteos", aliases: ["yogurt"], seasonal: false, frequency: "media" },
    { id: "yogurt_griego", name: "Yogurt griego", category: "lacteos", aliases: ["greek yogurt"], seasonal: false, frequency: "media" },
    { id: "queso_chihuahua", name: "Queso Chihuahua", category: "lacteos", aliases: ["queso menonita", "chihuahua cheese"], seasonal: false, frequency: "media" },
    { id: "mantequilla", name: "Mantequilla", category: "lacteos", aliases: ["butter"], seasonal: false, frequency: "media" },
    { id: "leche_coco", name: "Leche de coco", category: "lacteos", aliases: ["coconut milk"], seasonal: false, frequency: "media" },
    { id: "parmesano", name: "Queso Parmesano", category: "lacteos", aliases: ["parmesan"], seasonal: false, frequency: "baja" },
    { id: "feta", name: "Queso Feta", category: "lacteos", seasonal: false, frequency: "baja" },
    { id: "kefir", name: "Kéfir", category: "lacteos", seasonal: false, frequency: "baja" },
    { id: "crema_fresca", name: "Crème fraîche", category: "lacteos", aliases: ["crema fresca"], seasonal: false, frequency: "baja" },
    // Nuevos — gap Kaggle
    { id: "queso_cotija", name: "Queso Cotija", category: "lacteos", aliases: ["cotija cheese"], seasonal: false, frequency: "alta" },
    { id: "crema_acida", name: "Crema ácida", category: "lacteos", aliases: ["sour cream"], seasonal: false, frequency: "alta" },
    { id: "queso_manchego", name: "Queso Manchego", category: "lacteos", seasonal: false, frequency: "media" },

    // ─── GRASAS Y FRUTOS SECOS ────────────────────────────────────────────
    // Aguacate: 2do producto más exportado de MX y altamente consumido internamente
    { id: "aguacate", name: "Aguacate", category: "grasas", aliases: ["avocado"], seasonal: true, frequency: "alta" },
    { id: "aceite_oliva", name: "Aceite de oliva", category: "grasas", aliases: ["olive oil"], seasonal: false, frequency: "alta" },
    { id: "cacahuate", name: "Cacahuate", category: "grasas", aliases: ["maní", "peanut"], seasonal: false, frequency: "alta" },
    { id: "pepita_calabaza", name: "Pepita de calabaza", category: "grasas", aliases: ["pepitas", "pumpkin seed"], seasonal: false, frequency: "media" },
    { id: "ajonjoli", name: "Ajonjolí", category: "grasas", aliases: ["sésamo", "sesame"], seasonal: false, frequency: "media" },
    { id: "nuez", name: "Nuez", category: "grasas", aliases: ["nuez de Castilla", "walnut"], seasonal: false, frequency: "media" },
    { id: "aceite_ajonjoli", name: "Aceite de ajonjolí", category: "grasas", aliases: ["aceite de sésamo", "sesame oil"], seasonal: false, frequency: "baja" },
    { id: "aceite_coco", name: "Aceite de coco", category: "grasas", aliases: ["coconut oil"], seasonal: false, frequency: "media" },
    { id: "nuez_india", name: "Nuez de la India", category: "grasas", aliases: ["cashew"], seasonal: false, frequency: "baja" },
    { id: "almendra", name: "Almendra", category: "grasas", aliases: ["almond"], seasonal: false, frequency: "media" },
    { id: "tahini", name: "Tahini", category: "grasas", seasonal: false, frequency: "baja" },
    { id: "mantequilla_cacahuate", name: "Mantequilla de cacahuate", category: "grasas", aliases: ["peanut butter"], seasonal: false, frequency: "media" },
    { id: "piñon", name: "Piñón", category: "grasas", aliases: ["pine nut"], seasonal: false, frequency: "baja" },
    { id: "avellana", name: "Avellana", category: "grasas", aliases: ["hazelnut"], seasonal: false, frequency: "baja" },
    // Nuevos — gap Kaggle + uso cotidiano
    { id: "aceite_maiz", name: "Aceite de maíz", category: "grasas", aliases: ["corn oil"], seasonal: false, frequency: "alta" },
    { id: "manteca_cerdo", name: "Manteca de cerdo", category: "grasas", aliases: ["lard"], seasonal: false, frequency: "alta" },

    // ─── HIERBAS ────────────────────────────────────────────────────────
    { id: "cilantro", name: "Cilantro", category: "hierbas", aliases: ["coriander"], seasonal: true, frequency: "alta" },
    { id: "perejil", name: "Perejil", category: "hierbas", aliases: ["parsley"], seasonal: false, frequency: "media" },
    { id: "albahaca", name: "Albahaca", category: "hierbas", aliases: ["basil"], seasonal: true, frequency: "media" },
    { id: "menta", name: "Menta", category: "hierbas", aliases: ["mint"], seasonal: true, frequency: "media" },
    { id: "hierba_santa", name: "Hierba santa", category: "hierbas", seasonal: true, frequency: "media" },
    { id: "mejorana", name: "Mejorana", category: "hierbas", aliases: ["marjoram"], seasonal: false, frequency: "media" },
    { id: "tomillo", name: "Tomillo", category: "hierbas", aliases: ["thyme"], seasonal: false, frequency: "media" },
    { id: "romero", name: "Romero", category: "hierbas", aliases: ["rosemary"], seasonal: false, frequency: "media" },
    { id: "hoja_aguacate", name: "Hoja de aguacate", category: "hierbas", seasonal: false, frequency: "media" },
    { id: "chives", name: "Cebollín", category: "hierbas", aliases: ["chives"], seasonal: false, frequency: "media" },
    { id: "perilla", name: "Perilla / Shiso", category: "hierbas", seasonal: true, frequency: "baja" },
    { id: "lemongrass", name: "Té limón / Lemongrass", category: "hierbas", seasonal: true, frequency: "baja" },
    // Nuevos — gap BAM-INSP
    { id: "hierba_buena", name: "Hierbabuena", category: "hierbas", aliases: ["spearmint"], seasonal: true, frequency: "alta" },
    { id: "laurel", name: "Hoja de laurel", category: "hierbas", aliases: ["bay leaf"], seasonal: false, frequency: "alta" },
    { id: "hoja_maiz", name: "Hoja de maíz seca", category: "hierbas", aliases: ["corn husk"], seasonal: false, frequency: "media" },
    { id: "hoja_platano", name: "Hoja de plátano", category: "hierbas", seasonal: false, frequency: "media" },

    // ─── BÁSICOS / DESPENSA ───────────────────────────────────────────────
    // ENSANUT: limón = 14 kg/persona/año — el ingrediente fresco + consumido en MX
    { id: "ajo", name: "Ajo", category: "basicos", aliases: ["garlic"], seasonal: false, frequency: "alta" },
    { id: "limon", name: "Limón", category: "basicos", aliases: ["lime", "limón mexicano"], seasonal: true, frequency: "alta" },
    { id: "sal", name: "Sal", category: "basicos", aliases: ["salt"], seasonal: false, frequency: "alta" },
    { id: "comino", name: "Comino", category: "basicos", aliases: ["cumin"], seasonal: false, frequency: "alta" },
    { id: "oregano", name: "Orégano", category: "basicos", aliases: ["oregano"], seasonal: false, frequency: "alta" },
    { id: "chile_seco_molido", name: "Chile en polvo", category: "basicos", aliases: ["chili powder"], seasonal: false, frequency: "alta" },
    { id: "caldo_pollo", name: "Caldo de pollo", category: "basicos", aliases: ["chicken broth", "chicken stock"], seasonal: false, frequency: "alta" },
    { id: "jengibre", name: "Jengibre", category: "basicos", aliases: ["ginger"], seasonal: false, frequency: "media" },
    { id: "naranja", name: "Naranja", category: "basicos", aliases: ["orange"], seasonal: true, frequency: "alta" },
    { id: "vinagre_blanco", name: "Vinagre blanco", category: "basicos", aliases: ["white vinegar"], seasonal: false, frequency: "alta" },
    { id: "achiote", name: "Achiote", category: "basicos", aliases: ["annatto"], seasonal: false, frequency: "media" },
    { id: "canela", name: "Canela", category: "basicos", aliases: ["cinnamon"], seasonal: false, frequency: "media" },
    { id: "mole_negro", name: "Mole negro (pasta)", category: "basicos", seasonal: false, frequency: "media" },
    { id: "pimenton", name: "Pimentón / Paprika", category: "basicos", aliases: ["paprika"], seasonal: false, frequency: "media" },
    { id: "cúrcuma", name: "Cúrcuma", category: "basicos", aliases: ["turmeric"], seasonal: false, frequency: "media" },
    { id: "pasta_tamarindo", name: "Pasta de tamarindo", category: "basicos", seasonal: false, frequency: "media" },
    { id: "caldo_res", name: "Caldo de res", category: "basicos", aliases: ["beef broth"], seasonal: false, frequency: "media" },
    { id: "caldo_verduras", name: "Caldo de verduras", category: "basicos", aliases: ["vegetable broth"], seasonal: false, frequency: "media" },
    { id: "salsa_soja", name: "Salsa de soja / Tamari", category: "basicos", aliases: ["soy sauce", "tamari"], seasonal: false, frequency: "media" },
    { id: "mostaza", name: "Mostaza", category: "basicos", aliases: ["mustard"], seasonal: false, frequency: "media" },
    { id: "vinagre_balsamico", name: "Vinagre balsámico", category: "basicos", aliases: ["balsamic vinegar"], seasonal: false, frequency: "baja" },
    { id: "vinagre_arroz", name: "Vinagre de arroz", category: "basicos", aliases: ["rice vinegar"], seasonal: false, frequency: "baja" },
    { id: "miso", name: "Miso", category: "basicos", seasonal: false, frequency: "baja" },
    { id: "mirin", name: "Mirin", category: "basicos", seasonal: false, frequency: "baja" },
    { id: "dashi", name: "Dashi", category: "basicos", aliases: ["caldo bonito"], seasonal: false, frequency: "baja" },
    { id: "garam_masala", name: "Garam Masala", category: "basicos", seasonal: false, frequency: "baja" },
    { id: "curry_powder", name: "Curry en polvo", category: "basicos", aliases: ["curry powder"], seasonal: false, frequency: "baja" },
    { id: "shichimi", name: "Shichimi Togarashi", category: "basicos", seasonal: false, frequency: "baja" },
    { id: "salsa_pescado", name: "Salsa de pescado", category: "basicos", aliases: ["fish sauce"], seasonal: false, frequency: "baja" },
    { id: "pesto", name: "Pesto", category: "basicos", seasonal: false, frequency: "baja" },
    { id: "alcaparras", name: "Alcaparras", category: "basicos", aliases: ["capers"], seasonal: false, frequency: "baja" },
    { id: "aceituna_verde", name: "Aceitunas", category: "basicos", aliases: ["olivas", "olives"], seasonal: false, frequency: "baja" },
    { id: "chocolate_amargo", name: "Chocolate amargo 85%+", category: "basicos", aliases: ["dark chocolate"], seasonal: false, frequency: "baja" },
    { id: "monkfruit", name: "Monkfruit / Eritritol", category: "basicos", seasonal: false, frequency: "baja" },
    { id: "agave", name: "Miel de agave", category: "basicos", aliases: ["agave nectar"], seasonal: false, frequency: "media" },
    { id: "miel", name: "Miel", category: "basicos", aliases: ["honey"], seasonal: false, frequency: "media" },
    { id: "pomegranate_molasses", name: "Melaza de granada", category: "basicos", seasonal: false, frequency: "baja", mexican_alt: "Jarabe de agave con limón" },
    // Nuevos — gap Kaggle + BAM-INSP
    { id: "limon_amarillo", name: "Limón amarillo", category: "basicos", aliases: ["lemon"], seasonal: false, frequency: "media" },
    { id: "tomatillo_lata", name: "Tomatillo (lata)", category: "basicos", aliases: ["canned tomatillo"], seasonal: false, frequency: "media" },
    { id: "enchilada_sauce", name: "Salsa para enchiladas", category: "basicos", aliases: ["red enchilada sauce"], seasonal: false, frequency: "alta" },
    { id: "salsa_verde", name: "Salsa verde", category: "basicos", aliases: ["green salsa", "green sauce"], seasonal: false, frequency: "alta" },
    { id: "salsa_roja", name: "Salsa roja", category: "basicos", aliases: ["red salsa", "red sauce"], seasonal: false, frequency: "alta" },
    { id: "crema_cacahuate", name: "Crema de cacahuate", category: "basicos", aliases: ["peanut sauce"], seasonal: false, frequency: "media" },
    { id: "jamaica", name: "Flor de Jamaica", category: "basicos", aliases: ["hibiscus"], seasonal: false, frequency: "alta" },
    { id: "piloncillo", name: "Piloncillo", category: "basicos", aliases: ["panela", "raw cane sugar"], seasonal: false, frequency: "media" },
    { id: "nescafe", name: "Café / Nescafé", category: "basicos", aliases: ["coffee"], seasonal: false, frequency: "alta" },
    { id: "chile_chipotle_lata", name: "Chipotle en adobo (lata)", category: "basicos", aliases: ["chipotle in adobo"], seasonal: false, frequency: "alta" },

    // ─── FRUTAS ─────────────────────────────────────────────────────────
    // ENSANUT: plátano, naranja y mango entre las más consumidas
    { id: "platano_dulce", name: "Plátano (dulce)", category: "frutas", aliases: ["banana"], seasonal: false, frequency: "alta" },
    { id: "mango", name: "Mango", category: "frutas", seasonal: true, frequency: "alta" },
    { id: "papaya", name: "Papaya", category: "frutas", seasonal: true, frequency: "alta" },
    { id: "manzana", name: "Manzana", category: "frutas", aliases: ["apple"], seasonal: true, frequency: "alta" },
    { id: "pina", name: "Piña", category: "frutas", aliases: ["pineapple"], seasonal: true, frequency: "alta" },
    { id: "pera", name: "Pera", category: "frutas", aliases: ["pear"], seasonal: true, frequency: "media" },
    { id: "toronja", name: "Toronja", category: "frutas", aliases: ["grapefruit"], seasonal: true, frequency: "media" },
    { id: "sandía", name: "Sandía", category: "frutas", aliases: ["watermelon"], seasonal: true, frequency: "alta" },
    { id: "melón", name: "Melón", category: "frutas", aliases: ["cantaloupe"], seasonal: true, frequency: "alta" },
    { id: "fresa", name: "Fresa", category: "frutas", aliases: ["strawberry"], seasonal: true, frequency: "alta" },
    { id: "guayaba", name: "Guayaba", category: "frutas", aliases: ["guava"], seasonal: true, frequency: "alta" },
    { id: "tejocote", name: "Tejocote", category: "frutas", seasonal: true, frequency: "media" },
    { id: "granada", name: "Granada", category: "frutas", aliases: ["pomegranate"], seasonal: true, frequency: "media" },
    { id: "arandanos_secos", name: "Arándanos secos", category: "frutas", aliases: ["dried cranberries"], seasonal: false, frequency: "baja" },
    { id: "kiwi", name: "Kiwi", category: "frutas", seasonal: false, frequency: "baja" },
    { id: "datil", name: "Dátil", category: "frutas", aliases: ["date"], seasonal: false, frequency: "baja" },
    { id: "higo", name: "Higo", category: "frutas", aliases: ["fig"], seasonal: true, frequency: "baja" },
    { id: "tuna", name: "Tuna (nopal)", category: "frutas", aliases: ["prickly pear"], seasonal: true, frequency: "media" },
    { id: "tamarindo", name: "Tamarindo", category: "frutas", aliases: ["tamarind"], seasonal: false, frequency: "alta" },
    { id: "ciruela_mexicana", name: "Ciruela mexicana", category: "frutas", aliases: ["jocote"], seasonal: true, frequency: "media" },
    { id: "mamey", name: "Mamey", category: "frutas", seasonal: true, frequency: "media" },
];

/**
 * SHELF LIFE DATABASE – Duración esperada de ingredientes
 *
 * Define cuántos días típicamente dura cada ingrediente desde su compra.
 * Usado para calcular urgencia en listas de compra.
 */
// Helper function to get allergens for an ingredient
export function getIngredientAllergens(ingredientId) {
    const allergens = [];

    // Lácteos
    if (ingredientId.includes('queso') || ingredientId.includes('leche') || ingredientId.includes('yogurt') ||
        ingredientId.includes('crema') || ingredientId.includes('mantequilla') || ingredientId.includes('panela')) {
        allergens.push('lacteos');
    }

    // Huevo
    if (ingredientId === 'huevo') {
        allergens.push('huevo');
    }

    // Gluten
    if (ingredientId.includes('pan') || ingredientId === 'pasta_seca' || ingredientId === 'pasta_integral' ||
        ingredientId === 'pasta_garbanzo' || ingredientId.includes('ramen') || ingredientId.includes('udon') ||
        ingredientId.includes('soba') || ingredientId.includes('harina') || ingredientId === 'pan_blanco') {
        allergens.push('gluten');
    }

    // Cacahuate/Maní
    if (ingredientId.includes('cacahuate') || ingredientId.includes('mantequilla_cacahuate') ||
        ingredientId.includes('crema_cacahuate')) {
        allergens.push('cacahuate');
    }

    // Frutos secos
    if (ingredientId.includes('nuez') || ingredientId === 'almendra' || ingredientId === 'avellana' ||
        ingredientId === 'piñon' || ingredientId.includes('cashew')) {
        allergens.push('frutos_secos');
    }

    // Mariscos
    if (ingredientId.includes('camaron') || ingredientId.includes('marisco') || ingredientId === 'pulpo') {
        allergens.push('mariscos');
    }

    // Pescado
    if (ingredientId.includes('atun') || ingredientId.includes('salmon') || ingredientId.includes('sardina') ||
        ingredientId.includes('pescado') || ingredientId.includes('anchoa') || ingredientId === 'bonito_flakes') {
        allergens.push('pescado');
    }

    // Soya
    if (ingredientId === 'edamame' || ingredientId === 'tofu' || ingredientId === 'tofu_firme' ||
        ingredientId === 'tempeh' || ingredientId === 'miso' || ingredientId === 'salsa_soja') {
        allergens.push('soya');
    }

    // Sésamo
    if (ingredientId.includes('ajonjoli') || ingredientId === 'tahini') {
        allergens.push('sesamo');
    }

    return allergens;
}

export const INGREDIENT_SHELF_LIFE = {
    dairy: {
        default: 14,
        items: {
            queso: 21,
            queso_fresco: 7,
            queso_oaxaca: 10,
            leche: 10,
            yogurt: 14,
            mantequilla: 30,
            crema_fraiche: 14,
            chamoy: 30,
            dulce_leche: 30
        }
    },
    produce: {
        default: 7,
        items: {
            jitomate: 5,
            tomate_verde: 6,
            lechuga: 5,
            espinaca: 4,
            cilantro: 8,
            zanahoria: 21,
            cebolla: 30,
            cebollín: 10,
            ajo: 30,
            papa: 30,
            chile_habanero: 21,
            chile_serrano: 14,
            chile_poblano: 14,
            chile_guajillo: 60,
            chayote: 14,
            calabacita: 7,
            calabaza: 30,
            nopal: 3,
            nopales: 3,
            hongos: 4,
            champiñones: 4,
            brócoli: 5,
            coliflor: 7,
            papaya: 7,
            plátano: 5,
            aguacate: 3,
            limón: 30,
            naranja: 21,
            toronja: 21,
            manzana: 30,
            pera: 14,
            durazno: 7,
            sandía: 14,
            melón: 14,
            fresa: 4,
            guayaba: 7,
            tamarindo: 30
        }
    },
    meat: {
        default: 3,
        items: {
            pollo: 2,
            pechuga_pollo: 2,
            muslo_pollo: 3,
            res_molida: 2,
            res_magra: 4,
            res_bistec: 3,
            cerdo_molida: 2,
            cerdo: 4,
            chorizo: 7,
            cecina: 14,
            longaniza: 7,
            salchicha: 7,
            atun: 180,
            salmon: 3,
            sardina: 3,
            camaron: 2,
            pulpo: 2,
            huevo: 30,
            huevos: 30
        }
    },
    pantry: {
        default: 180,
        items: {
            arroz: 365,
            frijol: 365,
            frijol_negro: 365,
            frijol_pinto: 365,
            lenteja: 365,
            harina_maiz: 365,
            masa_maiz: 14,
            tortilla_maiz: 3,
            pan: 3,
            pan_bolillo: 2,
            aceite: 365,
            sal: 365,
            especias: 180,
            canela: 365,
            pimienta: 365,
            comino: 365,
            orégano: 365,
            ajo_polvo: 365,
            cebolla_polvo: 365,
            caldo_pollo: 365,
            vinagre: 365,
            salsa_soya: 365,
            salsa_tabasco: 365,
            mayonesa: 180
        }
    },
    frozen: {
        default: 180,
        items: {
            pollo_congelado: 365,
            verduras_congeladas: 180,
            pays_congelados: 180
        }
    },
    other: {
        default: 14,
        items: {}
    }
};

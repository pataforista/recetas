# Formato estándar de recetas — Milpa NiME

Este documento define el formato que debe seguir **toda** receta agregada o editada en
`data/recipes.js`. El objetivo es que cualquier persona pueda seguir la preparación paso a
paso (no solo ver una lista de ingredientes), y que el catálogo sea fácil de rastrear,
comparar y mantener con el tiempo.

Antes de agregar una receta nueva, copia el ejemplo de `_TEMPLATE` al final de este archivo.

## Orden de campos

Usa siempre este orden para que las recetas sean fáciles de comparar en el diff/código:

| # | Campo | Tipo | Obligatorio | Descripción |
|---|-------|------|:---:|-------------|
| 1 | `id` | string (snake_case) | Sí | Único, estable — no cambiar una vez publicado (se usa como llave de historial de cocinado). |
| 2 | `name` | string | Sí | Nombre para mostrar, con mayúscula inicial. |
| 3 | `family` | string | Sí | Familia/base principal (`leguminosas`, `nopal`, `verduras`, `pollo`, etc.). Debe coincidir con una familia ya usada — revisa `getAllFamilies()`. |
| 4 | `format` | string | Sí | Formato físico del platillo (`tortilla`, `plato`, `sopa`, `guisado`, `taco`, etc.). |
| 5 | `description` | string | Sí | 1 frase, gancho + qué lo hace bueno (sabor, nutrición o practicidad). |
| 6 | `servings` | number | Sí | Porciones que rinde la receta tal como está escrita (personas). |
| 7 | `timeMin` | number | Sí | Tiempo total en minutos (activo + pasivo), de inicio a servir. |
| 8 | `effort` | `"bajo" \| "medio" \| "alto"` | Sí | Esfuerzo/técnica requerida, no solo tiempo. |
| 9 | `mealType` | string | Sí | `desayuno`, `comida`, `cena`, `colacion`, `comida_indulgente`, `postre`. |
| 10 | `lowFriction` | boolean | Sí | `true` si son pocos pasos y sin técnica complicada (se usa para "Sorpréndeme" y filtros rápidos). |
| 11 | `ingredientsRequired` | string[] (ids) | Sí | IDs de `data/ingredients.js`. Todo lo que aparece aquí debe usarse en `steps`. |
| 12 | `ingredientsOptional` | string[] (ids) | No | Ingredientes que mejoran la receta pero no son indispensables. |
| 13 | `ingredientsDetailed` | `{id, amount, unit, notes?}[]` | No | Cantidades para `ingredientsRequired`/`ingredientsOptional` cuando se conocen. Ver sección abajo. |
| 14 | `steps` | string[] | **Sí** | Instrucciones ordenadas, una acción por elemento. Ver reglas abajo. |
| 15 | `cravings` | string[] | Sí | Antojos que satisface (`rapido`, `casero`, `ligero`, `reconfortante`, etc.). |
| 16 | `seasonalBoostIngredients` | string[] (ids) | No | Ingredientes de temporada que mejoran el score cuando están en temporada. |
| 17 | `profile` | object | Sí | `fiber`, `protein`, `satFat`, `glyLoad`, `vegetableVolume`, `energyDensity` — cada uno `"baja"/"media"/"alta"` (o equivalentes). |
| 18 | `mealPrep` | `{usesBases, leavesBases, derivatives}` | Sí | Puede ser arrays vacíos si no aplica. IDs de `usesBases`/derivados de `data/mealprep_bases.js`. |
| 19 | `pro_tip` | string | No | Un consejo técnico opcional (sustitución, atajo, error común a evitar). |

## Reglas para `steps`

1. **Un elemento del arreglo = un paso.** La UI los numera automáticamente; no escribas
   "1.", "2." dentro del texto.
2. **Verbo imperativo en tú** al inicio de cada paso ("Pica…", "Cuece…", "Sirve…"), en
   español neutro de México.
3. **Usa los nombres de los ingredientes**, no sus `id`. Consulta `data/ingredients.js`
   (campo `name`) para el nombre exacto mostrado en la app.
4. **Todo ingrediente en `ingredientsRequired` debe mencionarse en al menos un paso.**
   Los `ingredientsOptional` se mencionan como "si tienes…" / "opcional:".
5. **Sal, agua y aceite** pueden mencionarse aunque no estén en la lista de ingredientes
   (se consideran básicos de despensa siempre disponibles).
6. Entre **4 y 8 pasos**. Si necesitas más, probablemente el paso se puede dividir o
   fusionar — prioriza claridad sobre exhaustividad.
7. Incluye **tiempos y señales visuales/sensoriales** cuando ayuden ("hasta que doren,
   unos 5 min", "hasta que espese"), no solo "cocina hasta que esté listo".
8. El último paso siempre es el de emplatado/servido.
9. La suma implícita de tiempos en `steps` debe ser coherente con `timeMin`.

## `ingredientsDetailed` (cantidades)

Cuando agregues cantidades, usa este formato por ingrediente:

```js
{ id: "frijol", amount: 300, unit: "g", notes: "cocido" }
```

- `amount` es numérico o string (para fracciones tipo `"1/2"`); `unit` es una palabra sin
  espacios extra (`"g"`, `"tazas"`, `"piezas"`, `"cucharadas"`) — la UI ya agrega los
  espacios/preposición al mostrarlo (`${amount} ${unit}`, o `${amount}${unit} de ${nombre}`
  según la vista).
- `notes` es opcional, para aclaraciones breves ("picado", "sin piel", "al gusto").
- No es obligatorio detallar cantidades de todos los ingredientes; puedes dejar
  `ingredientsDetailed` fuera si no se conocen con precisión — la receta sigue siendo
  válida solo con `ingredientsRequired`/`ingredientsOptional` + `steps`.

## Historial de cocinado

No agregues campos de historial (veces cocinada, última vez) a `data/recipes.js` — ese
dato es específico de cada usuario y vive en `localStorage` (`state.cookHistory`,
manejado en `app.js`), indexado por `id` de receta. Por eso el `id` debe mantenerse
estable una vez publicado.

## Plantilla (`_TEMPLATE`)

```js
{
    "id": "nombre_corto_snake_case",
    "name": "Nombre para mostrar",
    "family": "familia_existente",
    "format": "plato",
    "description": "Una frase que resume el platillo y por qué vale la pena.",
    "servings": 2,
    "timeMin": 25,
    "effort": "bajo",
    "mealType": "comida",
    "lowFriction": true,
    "ingredientsRequired": [
        "ingrediente_id_1",
        "ingrediente_id_2"
    ],
    "ingredientsOptional": [
        "ingrediente_opcional_1"
    ],
    "steps": [
        "Pica el ingrediente_id_1 en cubos pequeños.",
        "Calienta un poco de aceite en un sartén a fuego medio.",
        "Agrega el ingrediente_id_1 y cocina 5 min hasta que suavice.",
        "Incorpora el ingrediente_id_2, sazona con sal y cocina 8 min más.",
        "Sirve caliente."
    ],
    "cravings": [
        "casero",
        "rapido"
    ],
    "profile": {
        "fiber": "media",
        "protein": "media",
        "satFat": "baja",
        "glyLoad": "media",
        "vegetableVolume": "alto",
        "energyDensity": "media"
    },
    "mealPrep": {
        "usesBases": [],
        "leavesBases": [],
        "derivatives": []
    }
}
```

# Plan de Mejoras - Milpa NiME PWA

## Objetivo
Mejorar la app de recetas considerando características de Supercook, Paprika, Cooklang, Yummly y ReciMe.

## Estado Actual
✅ Inventario de ingredientes
✅ Sugerencias personalizadas
✅ Planificador semanal y meal prep
✅ Listas de compra automáticas/manuales
✅ ~1755 recetas + 295 ingredientes

❌ Importación de recetas desde URLs
❌ Filtros avanzados (dieta, alergias)
❌ Información nutricional expandida
❌ Búsqueda mejorada
❌ Optimizaciones de performance

---

## FASES DE IMPLEMENTACIÓN

### FASE 1: INFRAESTRUCTURA (Crítica)
**Tiempo: 3-4 días**

1. **Expandir estructura de nutrición en RECIPES**
   - Agregar: calories, carbs, protein, fat, sodium, sugar, calcio, hierro, vitaminas
   - Archivo: `data/recipes.js`

2. **Crear sistema de dietas y alergenos**
   - Nuevos archivos: `data/diets.js`, `data/allergens.js`
   - Mapear a cada receta: vegetariano, vegano, sin gluten, bajo sodio, keto, paleo, etc.
   - Alergenos: gluten, lácteos, huevos, nueces, mariscos, soya, etc.

3. **Importación de recetas desde URLs**
   - Nuevo módulo: `modules/recipe_importer.js`
   - Parsear JSON-LD, Open Graph, microdata
   - Validar y normalizar importadas

---

### FASE 2: BÚSQUEDA Y FILTROS (Alta)
**Tiempo: 3-4 días**

1. **Filtros avanzados en UI**
   - Rango de calorías (slider)
   - Proteína mínima
   - Seleccionar dietas
   - Excluir alergenos
   - Tiempo máximo

2. **Búsqueda mejorada**
   - Debounce (reducir re-renders)
   - Fuzzy matching
   - Resultados más rápidos

3. **Panel de nutrición visual**
   - Mostrar macros en cards de recetas
   - Detalles nutricionales en vista completa
   - Warnings (alto sodio, alto azúcar, etc.)

---

### FASE 3: OPTIMIZACIONES (Media)
**Tiempo: 3-4 días**

1. **Performance**
   - Virtualización de listas grandes (100+ recetas)
   - Caching inteligente de resultados
   - Lazy loading de imágenes

2. **Service Worker mejorado**
   - Precaching de recetas comunes
   - Mejor sincronización offline

---

### FASE 4: FUNCIONES EXTRAS (Baja)
**Tiempo: Opcional**

- Gestor de favoritos avanzado
- Comparador de 2-3 recetas
- Analytics (qué se cocina más)
- Historial de importaciones

---

## CAMBIOS EN DATOS

### Cada receta añadirá:
```javascript
nutrition: { calories, carbs, protein, fat, fiber, sodium, sugar, vitaminas... },
diets: ["vegetariano", "sin_gluten", ...],
allergens: ["gluten", ...],
servings: 4,
totalTime: 45,
source: { type: "manual|imported", url: "..." }
```

### Cada ingrediente:
```javascript
allergen: "gluten", // si aplica
nutritionPer100g: { calories, protein, carbs, fat }
```

---

## ESFUERZO TOTAL

| Fase | Esfuerzo | Impacto |
|------|----------|--------|
| Infraestructura | 8 puntos | Muy Alto |
| Búsqueda/Filtros | 9 puntos | Muy Alto |
| Optimizaciones | 9 puntos | Alto |
| Extras | 6 puntos | Medio |
| **TOTAL** | **32 puntos** | Transformador |

**Estimación: 4-6 semanas de trabajo** (1 punto = 3-4 horas)
**MVP (Fases 1-2): 2-3 semanas**

---

## PRIORIZACIÓN RECOMENDADA

### SEMANA 1: Estructura + Importación
- ✅ Expandir nutrition en recetas existentes
- ✅ Crear diets.js y allergens.js
- ✅ Mapear a todas las recetas
- ✅ Importador básico (JSON-LD)

### SEMANA 2: Filtros Avanzados
- ✅ UI de filtros avanzados
- ✅ Lógica de filtrado
- ✅ Panel nutricional visual
- ✅ Búsqueda mejorada (debounce + fuzzy)

### SEMANA 3: Performance + Pulido
- ✅ Virtualización de listas
- ✅ Caching de resultados
- ✅ Mejoras Service Worker
- ✅ Testing y ajustes

---

## RIESGOS

| Riesgo | Mitigación |
|--------|-----------|
| CORS en scraping | Usar proxy público O método manual (copy-paste JSON-LD) |
| Datos nutricionales inconsistentes | Validación contra base USDA/INSP |
| Performance con 2K recetas | Virtual scrolling + Web Workers |
| Alergenos sin especificar | Warnings conservadores por defecto |

---

## ¿COMENZAMOS?

El plan está listo. Recomiendo empezar por **Fase 1** (infraestructura) que es bloqueador para las otras fases.

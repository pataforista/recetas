import { INGREDIENTS } from "./data/ingredients.js";
import { SEASONALITY_MX } from "./data/seasonality_mx.js";
import { MEALPREP_BASES } from "./data/mealprep_bases.js";
import { HEALTH_RULES } from "./data/health_rules.js";
import { RECIPES } from "./data/recipes.js";

const STORAGE_KEYS = {
    inventory: "milpa_nime_inventory_v1",
    cravings: "milpa_nime_cravings_v1",
    weeklyPlan: "milpa_nime_weekly_plan_v1",
    shoppingList: "milpa_nime_shopping_list_v1"
};

const CRAVINGS = [
    "rapido",
    "casero",
    "calientito",
    "reconfortante",
    "ligero",
    "fresco",
    "llenador",
    "antojo_mexicano",
    "mealprep",
    "saludable"
];

const CATEGORY_ORDER = ["milpa", "leguminosas", "verduras", "proteinas", "lacteos", "cereales", "basicos", "grasas", "hierbas"];

const state = {
    inventory: loadInventory(),
    selectedCravings: loadCravings(),
    weeklyPlan: loadWeeklyPlan(),
    shoppingList: loadShoppingList(),
    currentMonth: new Date().getMonth() + 1
};

const inventoryFiltersEl = document.getElementById("inventoryFilters");
const inventoryListEl = document.getElementById("inventoryList");
const cravingChipsEl = document.getElementById("cravingChips");
const suggestBtn = document.getElementById("suggestBtn");
const resetBtn = document.getElementById("resetBtn");
const resultsEl = document.getElementById("results");
const summaryBoxEl = document.getElementById("summaryBox");
const mealPrepBoxEl = document.getElementById("mealPrepBox");
const timeSelectEl = document.getElementById("timeSelect");
const modeSelectEl = document.getElementById("modeSelect");
const lowEnergyEl = document.getElementById("lowEnergy");
const seasonBoostEl = document.getElementById("seasonBoost");

let activeCategoryFilter = "all";

function init() {
    renderInventoryFilters();
    renderInventory();
    renderCravings();
    bindEvents();
    renderInitialMessage();
    setupPWAInstall();
    registerSW();
    initNavigation();
}

function bindEvents() {
    suggestBtn.addEventListener("click", handleSuggest);
    resetBtn.addEventListener("click", resetSelections);
    const clearPlanBtn = document.getElementById("clearPlanBtn");
    if (clearPlanBtn) {
        clearPlanBtn.addEventListener("click", () => {
            if (confirm("¿Estás seguro de que quieres borrar el plan de toda la semana?")) {
                state.weeklyPlan = {};
                persistWeeklyPlan();
                renderPlanner();
            }
        });
    }
}

function initNavigation() {
    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach((btn) => {
        btn.addEventListener("click", () => {
            const viewId = btn.getAttribute("data-view");
            showView(viewId);
        });
    });
}

function showView(viewId) {
    // Update active nav item
    document.querySelectorAll(".nav-item").forEach((btn) => {
        btn.classList.toggle("active", btn.getAttribute("data-view") === viewId);
    });

    // Update active page view
    document.querySelectorAll(".page-view").forEach((view) => {
        view.classList.toggle("active", view.id === `view-${viewId}`);
    });

    // Specific view renders
    if (viewId === "planner") renderPlanner();
    if (viewId === "mealprep") renderMealPrepInitial();
    if (viewId === "grocery") renderGroceryList();
}

function renderInitialMessage() {
    summaryBoxEl.textContent = "Selecciona ingredientes, antojo y tiempo para obtener sugerencias.";
    mealPrepBoxEl.innerHTML = renderMealPrepSuggestions([]);
}

function renderInventoryFilters() {
    const categories = ["all", ...CATEGORY_ORDER.filter((cat) => INGREDIENTS.some((i) => i.category === cat))];

    inventoryFiltersEl.innerHTML = "";
    categories.forEach((category) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = `chip ${activeCategoryFilter === category ? "active" : ""}`;

        const iconName = getCategoryIcon(category);
        btn.innerHTML = `<span class="material-symbols-outlined">${iconName}</span> ${category === "all" ? "Todos" : capitalize(category)}`;

        btn.addEventListener("click", () => {
            activeCategoryFilter = category;
            renderInventoryFilters();
            renderInventory();
        });
        inventoryFiltersEl.appendChild(btn);
    });
}

function getCategoryIcon(category) {
    const icons = {
        all: "category",
        milpa: "agriculture",
        leguminosas: "eco",
        verduras: "nutrition",
        proteinas: "egg_alt",
        lacteos: "water_drop",
        cereales: "grass",
        basicos: "kitchen",
        grasas: "oil_barrel",
        hierbas: "potted_plant"
    };
    return icons[category] || "inventory_2";
}

function renderInventory() {
    inventoryListEl.innerHTML = "";

    const filtered = INGREDIENTS.filter((item) =>
        activeCategoryFilter === "all" ? true : item.category === activeCategoryFilter
    );

    filtered.forEach((ingredient) => {
        const wrapper = document.createElement("div");
        wrapper.className = "inventory-item";

        const row1 = document.createElement("div");
        row1.className = "inventory-row";

        const name = document.createElement("div");
        name.innerHTML = `
      <div class="inventory-name">${ingredient.name}</div>
      <div class="inventory-meta">${capitalize(ingredient.category)}</div>
    `;

        const hasIt = document.createElement("input");
        hasIt.type = "checkbox";
        hasIt.checked = !!state.inventory[ingredient.id]?.has;
        hasIt.addEventListener("change", () => {
            ensureInventoryItem(ingredient.id);
            state.inventory[ingredient.id].has = hasIt.checked;
            if (!hasIt.checked) {
                state.inventory[ingredient.id].urgency = "normal";
            }
            persistInventory();
            renderInventory();
        });

        row1.appendChild(name);
        row1.appendChild(hasIt);

        const row2 = document.createElement("div");
        row2.className = "small-controls";

        const urgencySelect = document.createElement("select");
        urgencySelect.innerHTML = `
      <option value="normal">Normal</option>
      <option value="soon">Usar pronto</option>
      <option value="urgent">Urgente</option>
    `;
        urgencySelect.value = state.inventory[ingredient.id]?.urgency || "normal";
        urgencySelect.disabled = !state.inventory[ingredient.id]?.has;
        urgencySelect.addEventListener("change", () => {
            ensureInventoryItem(ingredient.id);
            state.inventory[ingredient.id].urgency = urgencySelect.value;
            persistInventory();
        });

        const seasonalTag = document.createElement("span");
        const isInSeason = SEASONALITY_MX[state.currentMonth]?.includes(ingredient.id);
        seasonalTag.className = "inventory-meta";
        seasonalTag.textContent = isInSeason ? "En temporada" : (ingredient.seasonal ? "Estacional" : "Todo el año");

        row2.appendChild(urgencySelect);
        row2.appendChild(seasonalTag);

        wrapper.appendChild(row1);
        wrapper.appendChild(row2);
        inventoryListEl.appendChild(wrapper);
    });
}

function renderCravings() {
    cravingChipsEl.innerHTML = "";
    CRAVINGS.forEach((craving) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = `chip ${state.selectedCravings.includes(craving) ? "active" : ""}`;

        const iconName = getCravingIcon(craving);
        btn.innerHTML = `<span class="material-symbols-outlined">${iconName}</span> ${humanizeCraving(craving)}`;

        btn.addEventListener("click", () => {
            if (state.selectedCravings.includes(craving)) {
                state.selectedCravings = state.selectedCravings.filter((c) => c !== craving);
            } else {
                state.selectedCravings.push(craving);
            }
            persistCravings();
            renderCravings();
        });
        cravingChipsEl.appendChild(btn);
    });
}

function getCravingIcon(craving) {
    const icons = {
        rapido: "speed",
        casero: "home",
        calientito: "hot_tub",
        reconfortante: "volunteer_activism",
        ligero: "air",
        fresco: "ac_unit",
        llenador: "restaurant",
        antojo_mexicano: "flag",
        mealprep: "inventory",
        saludable: "favorite"
    };
    return icons[craving] || "star";
}

function handleSuggest() {
    const userContext = {
        cravings: [...state.selectedCravings],
        maxTime: Number(timeSelectEl.value),
        mode: modeSelectEl.value,
        lowEnergy: lowEnergyEl.checked,
        seasonBoost: seasonBoostEl.checked,
        inventory: state.inventory,
        month: state.currentMonth
    };

    const ranked = rankRecipes(RECIPES, userContext).slice(0, 6);

    if (!ranked.length) {
        summaryBoxEl.textContent = "No encontré coincidencias suficientes. Marca más ingredientes o usa un modo más flexible.";
        resultsEl.innerHTML = "";
        mealPrepBoxEl.innerHTML = renderMealPrepSuggestions([]);
        return;
    }

    summaryBoxEl.textContent = buildSummary(userContext, ranked);
    resultsEl.innerHTML = "";
    ranked.forEach((item) => resultsEl.appendChild(createRecipeCard(item)));
    mealPrepBoxEl.innerHTML = renderMealPrepSuggestions(ranked);
}

function rankRecipes(recipes, context) {
    return recipes
        .map((recipe) => scoreRecipe(recipe, context))
        .filter((item) => item.score > 10)
        .sort((a, b) => b.score - a.score);
}

function scoreRecipe(recipe, context) {
    let score = 0;
    const reasons = [];

    const ownedIngredients = Object.entries(context.inventory)
        .filter(([, value]) => value.has)
        .map(([id]) => id);

    const requiredMatches = recipe.ingredientsRequired.filter((id) => ownedIngredients.includes(id)).length;
    const optionalMatches = recipe.ingredientsOptional.filter((id) => ownedIngredients.includes(id)).length;
    const requiredRatio = recipe.ingredientsRequired.length ? requiredMatches / recipe.ingredientsRequired.length : 0;

    score += requiredMatches * 18;
    score += optionalMatches * 4;

    if (requiredRatio === 1) {
        score += 12;
        reasons.push("Tienes todos los ingredientes requeridos");
    } else if (requiredRatio >= 0.5) {
        score += 4;
        reasons.push("Tienes buena parte de la base");
    } else {
        score -= 12;
    }

    const cravingMatches = recipe.cravings.filter((c) => context.cravings.includes(c));
    score += cravingMatches.length * 10;
    if (cravingMatches.length) reasons.push(`Coincide con tu antojo: ${cravingMatches.map(humanizeCraving).join(", ")}`);

    if (recipe.timeMin <= context.maxTime) {
        score += 14;
        reasons.push(`Cabe en tu tiempo (${recipe.timeMin} min)`);
    } else {
        const excess = recipe.timeMin - context.maxTime;
        score -= Math.min(excess, 15);
    }

    if (context.lowEnergy && recipe.lowFriction) {
        score += 10;
        reasons.push("Es de baja fricción");
    } else if (context.lowEnergy && !recipe.lowFriction) {
        score -= 8;
    }

    const urgencies = ownedIngredients
        .filter((id) => recipe.ingredientsRequired.includes(id) || recipe.ingredientsOptional.includes(id))
        .map((id) => context.inventory[id]?.urgency);

    const urgentCount = urgencies.filter((u) => u === "urgent").length;
    const soonCount = urgencies.filter((u) => u === "soon").length;

    if (urgentCount) {
        score += urgentCount * 10;
        reasons.push("Aprovecha ingredientes urgentes");
    }
    if (soonCount) {
        score += soonCount * 5;
    }

    if (context.seasonBoost) {
        const seasonalMatches = (recipe.seasonalBoostIngredients || []).filter((id) =>
            SEASONALITY_MX[context.month]?.includes(id)
        ).length;
        score += seasonalMatches * 3;
        if (seasonalMatches) reasons.push("Usa ingredientes en temporada");
    }

    score += metabolicScore(recipe, context.mode, reasons);
    score += mealPrepScore(recipe, context.mode, reasons);

    return { recipe, score, reasons };
}

function metabolicScore(recipe, mode, reasons) {
    let score = 0;
    const p = recipe.profile;

    if (p.fiber === "alta") score += HEALTH_RULES.scoringBonuses.highFiber;
    if (p.fiber === "baja") score += HEALTH_RULES.scoringPenalties.lowFiber;

    if (p.satFat === "baja") score += HEALTH_RULES.scoringBonuses.lowSatFat;
    if (p.satFat === "alta") score += HEALTH_RULES.scoringPenalties.highSatFat;

    if (p.glyLoad === "alta") score += HEALTH_RULES.scoringPenalties.highGlyLoad;
    if (p.vegetableVolume === "alto") score += HEALTH_RULES.scoringBonuses.highVegetableVolume;
    if (p.protein === "alta") score += HEALTH_RULES.scoringBonuses.goodProtein;

    if (mode === "metabolic") {
        if (p.fiber === "alta") score += 10;
        if (p.satFat === "baja") score += 8;
        if (p.glyLoad === "baja") score += 8;
        if (p.energyDensity === "baja") score += 6;
        reasons.push("Favorecido por modo metabólico suave");
    }

    return score;
}

function mealPrepScore(recipe, mode, reasons) {
    let score = 0;
    const uses = recipe.mealPrep?.usesBases?.length || 0;
    const leaves = recipe.mealPrep?.leavesBases?.length || 0;
    const derivatives = recipe.mealPrep?.derivatives?.length || 0;

    score += uses * 2 + leaves * 4 + derivatives * 2;

    if (mode === "mealprep") {
        score += uses * 4 + leaves * 6 + derivatives * 4;
        reasons.push("Favorecido por meal prep");
    }

    if (mode === "today" && recipe.timeMin <= 20) {
        score += 6;
    }

    if (mode === "rescue" && (uses > 0 || derivatives > 0)) {
        score += 3;
    }

    return score;
}

function createRecipeCard(item) {
    const template = document.getElementById("recipeCardTemplate");
    const node = template.content.firstElementChild.cloneNode(true);
    const { recipe, score, reasons } = item;

    node.querySelector(".recipe-title").textContent = recipe.name;
    node.querySelector(".recipe-meta").innerHTML = `
        <span class="material-symbols-outlined" style="font-size: 16px; vertical-align: middle;">restaurant</span> ${capitalize(recipe.family)} · 
        <span class="material-symbols-outlined" style="font-size: 16px; vertical-align: middle;">flatware</span> ${recipe.format} · 
        <span class="material-symbols-outlined" style="font-size: 16px; vertical-align: middle;">schedule</span> ${recipe.timeMin} min
    `;
    node.querySelector(".score-badge").textContent = Math.round(score);
    node.querySelector(".recipe-description").textContent = recipe.description;
    const allIngredients = recipe.ingredientsDetailed || [
        ...recipe.ingredientsRequired,
        ...recipe.ingredientsOptional
    ];
    node.querySelector(".ingredients-text").textContent = prettyIngredients(allIngredients);
    node.querySelector(".profile-text").innerHTML = buildProfileText(recipe.profile);
    node.querySelector(".mealprep-text").textContent = buildMealPrepText(recipe.mealPrep);

    const whyList = node.querySelector(".why-list");
    reasons.slice(0, 5).forEach((reason) => {
        const li = document.createElement("li");
        li.textContent = reason;
        whyList.appendChild(li);
    });

    const assignBtn = document.createElement("button");
    assignBtn.className = "secondary";
    assignBtn.style.marginTop = "16px";
    assignBtn.style.width = "100%";
    assignBtn.innerHTML = `<span class="material-symbols-outlined" style="vertical-align: middle;">calendar_add_on</span> Asignar a la semana`;

    assignBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        openDayPicker(recipe.id);
    });

    node.appendChild(assignBtn);

    return node;
}

function buildProfileText(profile) {
    const fiberClass = profile.fiber === "alta" ? "tag-good" : profile.fiber === "baja" ? "tag-bad" : "tag-warn";
    const satClass = profile.satFat === "baja" ? "tag-good" : profile.satFat === "alta" ? "tag-bad" : "tag-warn";
    const glyClass = profile.glyLoad === "baja" ? "tag-good" : profile.glyLoad === "alta" ? "tag-bad" : "tag-warn";

    return `
    <span class="${fiberClass}"><span class="material-symbols-outlined" style="font-size: 14px; vertical-align: middle;">forest</span> Fibra: ${profile.fiber}</span> ·
    <span class="${satClass}"><span class="material-symbols-outlined" style="font-size: 14px; vertical-align: middle;">oil_barrel</span> Grasa saturada: ${profile.satFat}</span> ·
    <span class="${glyClass}"><span class="material-symbols-outlined" style="font-size: 14px; vertical-align: middle;">bolt</span> Carga glucémica: ${profile.glyLoad}</span> ·
    <span class="material-symbols-outlined" style="font-size: 14px; vertical-align: middle;">nutrition</span> Volumen vegetal: ${profile.vegetableVolume}
  `;
}

function buildMealPrepText(mealPrep) {
    const uses = mealPrep?.usesBases?.length ? `Usa bases: ${mealPrep.usesBases.join(", ")}` : "No requiere bases";
    const leaves = mealPrep?.leavesBases?.length ? ` · Deja: ${mealPrep.leavesBases.join(", ")}` : "";
    const derivatives = mealPrep?.derivatives?.length ? ` · Deriva a: ${mealPrep.derivatives.join(", ")}` : "";
    return `${uses}${leaves}${derivatives}`;
}

function renderMealPrepSuggestions(ranked) {
    if (!ranked.length) {
        const topBases = MEALPREP_BASES.map((base) => `
      <div class="mealprep-block">
        <strong>${base.name}</strong>
        <p>Ingredientes: ${prettyIngredients(base.ingredients)}</p>
        <p>Sirve para: ${base.derivatives.join(", ")}</p>
      </div>
    `).join("");

        return `<p class="hint">Bases recomendadas para preparar una vez y reutilizar después.</p>${topBases}`;
    }

    const baseCounts = new Map();

    ranked.forEach(({ recipe }) => {
        (recipe.mealPrep?.usesBases || []).forEach((baseId) => {
            baseCounts.set(baseId, (baseCounts.get(baseId) || 0) + 1);
        });
    });

    const suggestedBases = [...baseCounts.entries()]
        .sort((a, b) => b[1] - a[1])
        .map(([baseId]) => MEALPREP_BASES.find((base) => base.id === baseId))
        .filter(Boolean)
        .slice(0, 3);

    if (!suggestedBases.length) {
        return "<p class='hint'>Estas recetas no dependen mucho de bases previas.</p>";
    }

    return suggestedBases.map((base) => `
    <div class="mealprep-block">
      <strong>${base.name}</strong>
      <p>Ingredientes base: ${prettyIngredients(base.ingredients)}</p>
      <p>Te abre estas opciones: ${base.derivatives.join(", ")}</p>
    </div>
  `).join("");
}

function buildSummary(context, ranked) {
    const top = ranked[0]?.recipe?.name || "sin resultado";
    const inventoryCount = Object.values(context.inventory).filter((v) => v.has).length;
    const cravingsText = context.cravings.length ? context.cravings.map(humanizeCraving).join(", ") : "sin antojo específico";
    return `Top sugerencia: ${top}. Evalué ${inventoryCount} ingredientes marcados, tiempo máximo de ${context.maxTime} min y antojo ${cravingsText}.`;
}

function prettyIngredients(ingredients) {
    if (!ingredients || !ingredients.length) return "Sin ingredientes";

    return ingredients
        .map((item) => {
            if (typeof item === "string") {
                const ing = INGREDIENTS.find((i) => i.id === item);
                return ing ? ing.name : item;
            } else if (typeof item === "object") {
                const ing = INGREDIENTS.find((i) => i.id === item.id);
                const name = ing ? ing.name : item.id;
                const alt = ing?.mexican_alt ? ` (Alt MX: ${ing.mexican_alt})` : "";
                if (item.amount && item.unit) {
                    return `${item.amount}${item.unit} de ${name}${alt}`;
                }
                return `${name}${alt}`;
            }
            return item;
        })
        .join(", ");
}

function ensureInventoryItem(id) {
    if (!state.inventory[id]) {
        state.inventory[id] = { has: false, urgency: "normal" };
    }
}

function loadInventory() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.inventory)) || {};
    } catch {
        return {};
    }
}

function persistInventory() {
    localStorage.setItem(STORAGE_KEYS.inventory, JSON.stringify(state.inventory));
}

function loadWeeklyPlan() {
    const saved = localStorage.getItem(STORAGE_KEYS.weeklyPlan);
    return saved ? JSON.parse(saved) : {};
}

function persistWeeklyPlan() {
    localStorage.setItem(STORAGE_KEYS.weeklyPlan, JSON.stringify(state.weeklyPlan));
}

function loadShoppingList() {
    const saved = localStorage.getItem(STORAGE_KEYS.shoppingList);
    return saved ? JSON.parse(saved) : [];
}

function persistShoppingList() {
    localStorage.setItem(STORAGE_KEYS.shoppingList, JSON.stringify(state.shoppingList));
}

function renderMealPrepInitial() {
    mealPrepBoxEl.innerHTML = renderMealPrepSuggestions([]);
}

function renderPlanner() {
    const grid = document.getElementById("weeklyPlannerGrid");
    const days = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"];
    grid.innerHTML = "";

    days.forEach((day) => {
        const dayEl = document.createElement("div");
        dayEl.className = "planner-day";
        dayEl.innerHTML = `<h3>${day}</h3>`;

        const slot = document.createElement("div");
        slot.className = "planner-slot";
        const plannedId = state.weeklyPlan[day];
        const recipe = plannedId ? RECIPES.find(r => r.id === plannedId) : null;

        if (recipe) {
            slot.innerHTML = `
                <strong>${recipe.name}</strong><br>
                <small>Toca para cambiar</small>
                <button class="remove-btn" style="background:none; border:none; padding: 4px; color: var(--md-sys-color-error); cursor: pointer;" title="Quitar">
                    <span class="material-symbols-outlined" style="font-size: 18px;">delete</span>
                </button>
            `;
            slot.style.borderStyle = "solid";
            slot.style.borderColor = "var(--md-sys-color-primary)";

            const btn = slot.querySelector(".remove-btn");
            btn.addEventListener("click", (e) => {
                e.stopPropagation();
                delete state.weeklyPlan[day];
                persistWeeklyPlan();
                renderPlanner();
            });
        } else {
            slot.textContent = "+ Agregar receta";
        }

        slot.addEventListener("click", () => {
            // Focus Today view to pick a recipe (simple flow for now)
            alert("Ve a la pestaña 'Hoy' y elige una receta para asignar (sección en desarrollo)");
            // In a full version, we'd open a recipe picker modal or change state to 'picking'
        });

        dayEl.appendChild(slot);
        grid.appendChild(dayEl);
    });
}

function openDayPicker(recipeId) {
    const days = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"];
    const input = prompt("¿A qué día quieres asignar esta receta?\n(Escribe: lunes, martes, miércoles, etc.)");

    if (!input) return;

    const day = input.toLowerCase().trim();
    const validDay = days.find(d => d.normalize("NFD").replace(/[\u0300-\u036f]/g, "") === day.normalize("NFD").replace(/[\u0300-\u036f]/g, ""));

    if (validDay) {
        state.weeklyPlan[validDay] = recipeId;
        persistWeeklyPlan();
        alert(`Receta asignada al ${validDay}`);
    } else {
        alert("Día no válido. Asegúrate de escribirlo correctamente.");
    }
}

function renderGroceryList() {
    const container = document.getElementById("shoppingListContainer");
    container.innerHTML = "<h3>Cargando...</h3>";

    const derivedList = generateGroceryListFromPlan();

    if (Object.keys(derivedList).length === 0) {
        container.innerHTML = "<p class='hint'>Agrega recetas a tu plan semanal para generar la lista de compra.</p>";
        return;
    }

    container.innerHTML = "";
    Object.entries(derivedList).forEach(([ingredientId, data]) => {
        const item = document.createElement("div");
        item.className = "grocery-item";
        const hasIt = !!state.inventory[ingredientId]?.has;

        item.innerHTML = `
            <input type="checkbox" ${hasIt ? "checked" : ""}>
            <span>${data.amount} ${data.unit} de <strong>${data.name}</strong></span>
        `;

        if (hasIt) item.classList.add("checked");

        item.querySelector("input").addEventListener("change", (e) => {
            item.classList.toggle("checked", e.target.checked);
        });

        container.appendChild(item);
    });

    const copyBtn = document.createElement("button");
    copyBtn.className = "secondary";
    copyBtn.style.marginTop = "24px";
    copyBtn.style.width = "100%";
    copyBtn.innerHTML = `<span class="material-symbols-outlined">content_copy</span> Copiar lista`;
    copyBtn.addEventListener("click", () => {
        const text = Object.values(derivedList)
            .map(d => `- ${d.amount} ${d.unit} de ${d.name}`)
            .join("\n");
        navigator.clipboard.writeText(`Lista de Compra Milpa NiME:\n${text}`)
            .then(() => alert("¡Lista copiada al portapapeles!"));
    });
    container.appendChild(copyBtn);
}

function generateGroceryListFromPlan() {
    const list = {};
    Object.values(state.weeklyPlan).forEach(recipeId => {
        const recipe = RECIPES.find(r => r.id === recipeId);
        if (!recipe) return;

        const ingredients = recipe.ingredientsDetailed || recipe.ingredientsRequired.map(id => ({ id }));

        ingredients.forEach(ing => {
            const ingredient = INGREDIENTS.find(i => i.id === ing.id);
            if (!ingredient) return;

            // Simple check: if user HAS it in inventory, skip it
            if (state.inventory[ing.id]?.has) return;

            if (!list[ing.id]) {
                list[ing.id] = {
                    name: ingredient.name,
                    amount: ing.amount || 0,
                    unit: ing.unit || "unidad"
                };
            } else if (ing.amount && list[ing.id].unit === ing.unit) {
                list[ing.id].amount += ing.amount;
            }
        });
    });
    return list;
}

function loadCravings() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.cravings)) || [];
    } catch {
        return [];
    }
}

function persistCravings() {
    localStorage.setItem(STORAGE_KEYS.cravings, JSON.stringify(state.selectedCravings));
}

function resetSelections() {
    state.inventory = {};
    state.selectedCravings = [];
    state.weeklyPlan = {};
    persistInventory();
    persistCravings();
    persistWeeklyPlan();
    renderInventory();
    renderCravings();
    renderInitialMessage();
    resultsEl.innerHTML = "";
}

function humanizeCraving(value) {
    const table = {
        rapido: "Rápido",
        casero: "Casero",
        calientito: "Calientito",
        reconfortante: "Reconfortante",
        ligero: "Ligero",
        fresco: "Fresco",
        llenador: "Llenador",
        antojo_mexicano: "Antojo mexicano",
        mealprep: "Meal prep",
        saludable: "Saludable"
    };
    return table[value] || capitalize(value);
}

function capitalize(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function setupPWAInstall() {
    let deferredPrompt;
    const installBtn = document.getElementById("installBtn");
    if (!installBtn) return;

    window.addEventListener("beforeinstallprompt", (e) => {
        e.preventDefault();
        deferredPrompt = e;
        installBtn.classList.remove("hidden");
    });

    installBtn.addEventListener("click", () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === "accepted") {
                installBtn.classList.add("hidden");
            }
            deferredPrompt = null;
        });
    });
}

function registerSW() {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("./sw.js").catch(console.error);
    }
}

init();

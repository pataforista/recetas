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

const DAYS = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"];

const state = {
    inventory: loadInventory(),
    selectedCravings: loadCravings(),
    weeklyPlan: loadWeeklyPlan(),
    shoppingList: loadShoppingList(),
    currentMonth: new Date().getMonth() + 1
};

// ─── DOM refs ───
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
// Pending day assignment state for day picker modal
let _pendingRecipeId = null;

// ─── Init ───
function init() {
    renderInventoryFilters();
    renderInventory();
    renderCravings();
    bindEvents();
    renderInitialMessage();
    setupPWAInstall();
    registerSW();
    initNavigation();
    setupOfflineDetection();
    handleShortcutParam();
}

// Handle ?view= query param from manifest shortcuts
function handleShortcutParam() {
    const params = new URLSearchParams(window.location.search);
    const view = params.get("view");
    if (view && ["today", "planner", "mealprep", "grocery"].includes(view)) {
        showView(view);
    }
}

function bindEvents() {
    suggestBtn.addEventListener("click", handleSuggest);
    resetBtn.addEventListener("click", handleReset);

    const clearPlanBtn = document.getElementById("clearPlanBtn");
    if (clearPlanBtn) {
        clearPlanBtn.addEventListener("click", () => {
            showConfirm(
                "¿Borrar el plan semanal?",
                "Se eliminarán todas las recetas asignadas a la semana.",
                () => {
                    state.weeklyPlan = {};
                    persistWeeklyPlan();
                    renderPlanner();
                    showToast("Plan semanal borrado");
                }
            );
        });
    }

    // Modal: Day Picker
    document.getElementById("cancelDayPicker").addEventListener("click", closeDayPicker);
    document.getElementById("dayPickerModal").addEventListener("click", (e) => {
        if (e.target === e.currentTarget) closeDayPicker();
    });

    // Modal: Confirm
    document.getElementById("confirmCancel").addEventListener("click", closeConfirmModal);
    document.getElementById("confirmModal").addEventListener("click", (e) => {
        if (e.target === e.currentTarget) closeConfirmModal();
    });

    // Build day picker buttons once
    buildDayPickerButtons();
}

// ─── Navigation ───
function initNavigation() {
    document.querySelectorAll(".nav-item").forEach((btn) => {
        btn.addEventListener("click", () => {
            const viewId = btn.getAttribute("data-view");
            showView(viewId);
        });
    });
}

function showView(viewId) {
    document.querySelectorAll(".nav-item").forEach((btn) => {
        btn.classList.toggle("active", btn.getAttribute("data-view") === viewId);
    });
    document.querySelectorAll(".page-view").forEach((view) => {
        view.classList.toggle("active", view.id === `view-${viewId}`);
    });

    if (viewId === "planner") renderPlanner();
    if (viewId === "mealprep") renderMealPrepInitial();
    if (viewId === "grocery") renderGroceryList();
}

// ─── Offline Detection ───
function setupOfflineDetection() {
    const banner = document.getElementById("offlineBanner");
    const update = () => banner.classList.toggle("hidden", navigator.onLine);
    update();
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
}

// ─── Toast ───
function showToast(message, duration = 3000) {
    const container = document.getElementById("toastContainer");
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("exit");
        toast.addEventListener("animationend", () => toast.remove());
    }, duration);
}

// ─── Confirm Modal ───
let _confirmCallback = null;

function showConfirm(title, message, onConfirm) {
    document.getElementById("confirmTitle").textContent = title;
    document.getElementById("confirmMessage").textContent = message;
    _confirmCallback = onConfirm;

    const modal = document.getElementById("confirmModal");
    modal.classList.remove("hidden");

    const okBtn = document.getElementById("confirmOk");
    const handler = () => {
        closeConfirmModal();
        _confirmCallback?.();
        okBtn.removeEventListener("click", handler);
    };
    okBtn.addEventListener("click", handler);
}

function closeConfirmModal() {
    document.getElementById("confirmModal").classList.add("hidden");
    _confirmCallback = null;
}

// ─── Day Picker Modal ───
function buildDayPickerButtons() {
    const grid = document.getElementById("dayPickerGrid");
    grid.innerHTML = "";
    DAYS.forEach((day) => {
        const btn = document.createElement("button");
        btn.className = "day-btn";
        btn.type = "button";
        btn.textContent = capitalize(day);
        btn.addEventListener("click", () => assignRecipeToDay(day));
        grid.appendChild(btn);
    });
}

function openDayPicker(recipeId) {
    const recipe = RECIPES.find((r) => r.id === recipeId);
    _pendingRecipeId = recipeId;
    document.getElementById("dayPickerRecipeName").textContent = recipe ? `"${recipe.name}"` : "";
    document.getElementById("dayPickerModal").classList.remove("hidden");
}

function closeDayPicker() {
    document.getElementById("dayPickerModal").classList.add("hidden");
    _pendingRecipeId = null;
}

function assignRecipeToDay(day) {
    if (!_pendingRecipeId) return;
    state.weeklyPlan[day] = _pendingRecipeId;
    persistWeeklyPlan();
    const recipe = RECIPES.find((r) => r.id === _pendingRecipeId);
    closeDayPicker();
    showToast(`${recipe?.name ?? "Receta"} asignada al ${day}`);
}

// ─── Inventory ───
function renderInventoryFilters() {
    const categories = ["all", ...CATEGORY_ORDER.filter((cat) => INGREDIENTS.some((i) => i.category === cat))];
    inventoryFiltersEl.innerHTML = "";
    categories.forEach((category) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = `chip ${activeCategoryFilter === category ? "active" : ""}`;
        const iconName = getCategoryIcon(category);
        btn.innerHTML = `<span class="material-symbols-outlined" aria-hidden="true">${iconName}</span> ${category === "all" ? "Todos" : capitalize(category)}`;
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
        const hasItem = !!state.inventory[ingredient.id]?.has;
        wrapper.className = `inventory-item${hasItem ? " has-item" : ""}`;

        const row1 = document.createElement("div");
        row1.className = "inventory-row";

        const nameEl = document.createElement("div");
        nameEl.innerHTML = `
            <div class="inventory-name">${ingredient.name}</div>
            <div class="inventory-meta">${capitalize(ingredient.category)}</div>
        `;

        const hasIt = document.createElement("input");
        hasIt.type = "checkbox";
        hasIt.checked = hasItem;
        hasIt.setAttribute("aria-label", `Tengo ${ingredient.name}`);
        hasIt.addEventListener("change", () => {
            ensureInventoryItem(ingredient.id);
            state.inventory[ingredient.id].has = hasIt.checked;
            if (!hasIt.checked) {
                state.inventory[ingredient.id].urgency = "normal";
            }
            persistInventory();
            renderInventory();
        });

        row1.appendChild(nameEl);
        row1.appendChild(hasIt);

        const row2 = document.createElement("div");
        row2.className = "small-controls";

        const urgencySelect = document.createElement("select");
        urgencySelect.setAttribute("aria-label", `Urgencia de ${ingredient.name}`);
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

        const isInSeason = SEASONALITY_MX[state.currentMonth]?.includes(ingredient.id);
        const seasonalTag = document.createElement("span");
        seasonalTag.className = "inventory-meta";
        seasonalTag.textContent = isInSeason ? "🌱 Temporada" : (ingredient.seasonal ? "Estacional" : "Todo el año");

        row2.appendChild(urgencySelect);
        row2.appendChild(seasonalTag);

        wrapper.appendChild(row1);
        wrapper.appendChild(row2);
        inventoryListEl.appendChild(wrapper);
    });
}

// ─── Cravings ───
function renderCravings() {
    cravingChipsEl.innerHTML = "";
    CRAVINGS.forEach((craving) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = `chip ${state.selectedCravings.includes(craving) ? "active" : ""}`;
        const iconName = getCravingIcon(craving);
        btn.innerHTML = `<span class="material-symbols-outlined" aria-hidden="true">${iconName}</span> ${humanizeCraving(craving)}`;
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
        calientito: "local_fire_department",
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

// ─── Suggest ───
function handleSuggest() {
    suggestBtn.disabled = true;

    const userContext = {
        cravings: [...state.selectedCravings],
        maxTime: Number(timeSelectEl.value),
        mode: modeSelectEl.value,
        lowEnergy: lowEnergyEl.checked,
        seasonBoost: seasonBoostEl.checked,
        inventory: state.inventory,
        month: state.currentMonth
    };

    // Use rAF to allow button state to render before heavy work
    requestAnimationFrame(() => {
        const ranked = rankRecipes(RECIPES, userContext).slice(0, 6);

        if (!ranked.length) {
            summaryBoxEl.textContent = "No encontré coincidencias suficientes. Marca más ingredientes o usa un modo más flexible.";
            resultsEl.innerHTML = "";
            mealPrepBoxEl.innerHTML = renderMealPrepSuggestions([]);
            suggestBtn.disabled = false;
            return;
        }

        summaryBoxEl.textContent = buildSummary(userContext, ranked);
        resultsEl.innerHTML = "";
        ranked.forEach((item) => resultsEl.appendChild(createRecipeCard(item)));
        mealPrepBoxEl.innerHTML = renderMealPrepSuggestions(ranked);
        suggestBtn.disabled = false;

        // Scroll to results on mobile
        document.getElementById("resultsPanel")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
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

// ─── Recipe Card ───
function createRecipeCard(item) {
    const template = document.getElementById("recipeCardTemplate");
    const node = template.content.firstElementChild.cloneNode(true);
    const { recipe, score, reasons } = item;

    node.querySelector(".recipe-title").textContent = recipe.name;
    node.querySelector(".recipe-meta").innerHTML = `
        <span class="material-symbols-outlined" style="font-size:15px" aria-hidden="true">restaurant</span>${capitalize(recipe.family)}&nbsp;·&nbsp;
        <span class="material-symbols-outlined" style="font-size:15px" aria-hidden="true">flatware</span>${recipe.format}&nbsp;·&nbsp;
        <span class="material-symbols-outlined" style="font-size:15px" aria-hidden="true">schedule</span>${recipe.timeMin} min
    `;
    node.querySelector(".score-badge").textContent = Math.round(score);
    node.querySelector(".score-badge").setAttribute("aria-label", `Puntuación ${Math.round(score)}`);
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
    assignBtn.innerHTML = `<span class="material-symbols-outlined" style="font-size:18px" aria-hidden="true">calendar_add_on</span> Asignar a la semana`;
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
        <span class="${fiberClass}"><span class="material-symbols-outlined" style="font-size:13px;vertical-align:middle" aria-hidden="true">forest</span> Fibra: ${profile.fiber}</span> ·
        <span class="${satClass}"><span class="material-symbols-outlined" style="font-size:13px;vertical-align:middle" aria-hidden="true">oil_barrel</span> Grasa sat.: ${profile.satFat}</span> ·
        <span class="${glyClass}"><span class="material-symbols-outlined" style="font-size:13px;vertical-align:middle" aria-hidden="true">bolt</span> CG: ${profile.glyLoad}</span> ·
        <span><span class="material-symbols-outlined" style="font-size:13px;vertical-align:middle" aria-hidden="true">nutrition</span> Vegetal: ${profile.vegetableVolume}</span>
    `;
}

function buildMealPrepText(mealPrep) {
    const uses = mealPrep?.usesBases?.length ? `Usa bases: ${mealPrep.usesBases.join(", ")}` : "No requiere bases";
    const leaves = mealPrep?.leavesBases?.length ? ` · Deja: ${mealPrep.leavesBases.join(", ")}` : "";
    const derivatives = mealPrep?.derivatives?.length ? ` · Deriva a: ${mealPrep.derivatives.join(", ")}` : "";
    return `${uses}${leaves}${derivatives}`;
}

// ─── Meal Prep View ───
function renderMealPrepInitial() {
    mealPrepBoxEl.innerHTML = renderMealPrepSuggestions([]);
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

// ─── Summary ───
function buildSummary(context, ranked) {
    const top = ranked[0]?.recipe?.name || "sin resultado";
    const inventoryCount = Object.values(context.inventory).filter((v) => v.has).length;
    const cravingsText = context.cravings.length ? context.cravings.map(humanizeCraving).join(", ") : "sin antojo específico";
    return `Top sugerencia: ${top}. Evalué ${inventoryCount} ingrediente${inventoryCount !== 1 ? "s" : ""} marcado${inventoryCount !== 1 ? "s" : ""}, tiempo máximo de ${context.maxTime} min y antojo ${cravingsText}.`;
}

// ─── Planner ───
function renderPlanner() {
    const grid = document.getElementById("weeklyPlannerGrid");
    grid.innerHTML = "";

    DAYS.forEach((day) => {
        const dayEl = document.createElement("div");
        dayEl.className = "planner-day";
        dayEl.innerHTML = `<h3>${capitalize(day)}</h3>`;

        const slot = document.createElement("div");
        const plannedId = state.weeklyPlan[day];
        const recipe = plannedId ? RECIPES.find((r) => r.id === plannedId) : null;

        if (recipe) {
            slot.className = "planner-slot has-recipe";
            const nameSpan = document.createElement("span");
            nameSpan.className = "planner-slot-name";
            nameSpan.textContent = recipe.name;

            const removeBtn = document.createElement("button");
            removeBtn.className = "remove-btn";
            removeBtn.title = "Quitar receta";
            removeBtn.innerHTML = `<span class="material-symbols-outlined" style="font-size:18px" aria-hidden="true">delete</span>`;
            removeBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                delete state.weeklyPlan[day];
                persistWeeklyPlan();
                renderPlanner();
                showToast(`Receta quitada del ${day}`);
            });

            slot.appendChild(nameSpan);
            slot.appendChild(removeBtn);
        } else {
            slot.className = "planner-slot";
            slot.innerHTML = `<span class="material-symbols-outlined" style="font-size:18px;opacity:0.4" aria-hidden="true">add_circle</span><br>Agregar receta`;
            slot.addEventListener("click", () => {
                showView("today");
                showToast("Sugiere recetas y toca 'Asignar' para programarlas");
            });
        }

        dayEl.appendChild(slot);
        grid.appendChild(dayEl);
    });
}

// ─── Grocery List ───
function renderGroceryList() {
    const container = document.getElementById("shoppingListContainer");
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
        const amountText = data.amount ? `${data.amount} ${data.unit} de ` : "";

        item.innerHTML = `
            <input type="checkbox" ${hasIt ? "checked" : ""} aria-label="${data.name}">
            <span>${amountText}<strong>${data.name}</strong></span>
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
    copyBtn.innerHTML = `<span class="material-symbols-outlined" aria-hidden="true">content_copy</span> Copiar lista`;
    copyBtn.addEventListener("click", () => {
        const text = Object.values(derivedList)
            .map((d) => `- ${d.amount ? `${d.amount} ${d.unit} de ` : ""}${d.name}`)
            .join("\n");
        navigator.clipboard.writeText(`Lista de Compra Milpa NiME:\n${text}`)
            .then(() => showToast("¡Lista copiada al portapapeles!"))
            .catch(() => showToast("No se pudo copiar. Intenta de nuevo."));
    });
    container.appendChild(copyBtn);
}

function generateGroceryListFromPlan() {
    const list = {};
    Object.values(state.weeklyPlan).forEach((recipeId) => {
        const recipe = RECIPES.find((r) => r.id === recipeId);
        if (!recipe) return;

        const ingredients = recipe.ingredientsDetailed || recipe.ingredientsRequired.map((id) => ({ id }));

        ingredients.forEach((ing) => {
            const ingredient = INGREDIENTS.find((i) => i.id === ing.id);
            if (!ingredient) return;
            if (state.inventory[ing.id]?.has) return;

            if (!list[ing.id]) {
                list[ing.id] = {
                    name: ingredient.name,
                    amount: ing.amount || 0,
                    unit: ing.unit || ""
                };
            } else if (ing.amount && list[ing.id].unit === ing.unit) {
                list[ing.id].amount += ing.amount;
            }
        });
    });
    return list;
}

// ─── Initial message ───
function renderInitialMessage() {
    summaryBoxEl.textContent = "Selecciona ingredientes, antojo y tiempo para obtener sugerencias.";
    mealPrepBoxEl.innerHTML = renderMealPrepSuggestions([]);
}

// ─── Reset ───
function handleReset() {
    showConfirm(
        "¿Limpiar todo?",
        "Se borrarán el inventario, antojos y plan seleccionados.",
        () => {
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
            showToast("Selecciones limpiadas");
        }
    );
}

// ─── Utilities ───
function prettyIngredients(ingredients) {
    if (!ingredients || !ingredients.length) return "Sin ingredientes";
    return ingredients.map((item) => {
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
    }).join(", ");
}

function ensureInventoryItem(id) {
    if (!state.inventory[id]) {
        state.inventory[id] = { has: false, urgency: "normal" };
    }
}

function capitalize(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
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

// ─── Storage ───
function loadInventory() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEYS.inventory)) || {}; } catch { return {}; }
}
function persistInventory() {
    localStorage.setItem(STORAGE_KEYS.inventory, JSON.stringify(state.inventory));
}
function loadWeeklyPlan() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEYS.weeklyPlan)) || {}; } catch { return {}; }
}
function persistWeeklyPlan() {
    localStorage.setItem(STORAGE_KEYS.weeklyPlan, JSON.stringify(state.weeklyPlan));
}
function loadShoppingList() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEYS.shoppingList)) || []; } catch { return []; }
}
function persistShoppingList() {
    localStorage.setItem(STORAGE_KEYS.shoppingList, JSON.stringify(state.shoppingList));
}
function loadCravings() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEYS.cravings)) || []; } catch { return []; }
}
function persistCravings() {
    localStorage.setItem(STORAGE_KEYS.cravings, JSON.stringify(state.selectedCravings));
}

// ─── PWA Install ───
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
                showToast("¡App instalada! Búscala en tu pantalla de inicio.");
            }
            deferredPrompt = null;
        });
    });

    window.addEventListener("appinstalled", () => {
        installBtn.classList.add("hidden");
    });
}

// ─── Service Worker ───
function registerSW() {
    if (!("serviceWorker" in navigator)) return;

    navigator.serviceWorker.register("./sw.js").then((registration) => {
        // Detect when a new SW is waiting
        const onUpdateFound = () => {
            const newWorker = registration.installing;
            if (!newWorker) return;
            newWorker.addEventListener("statechange", () => {
                if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                    showUpdateBanner(registration);
                }
            });
        };

        registration.addEventListener("updatefound", onUpdateFound);

        // If there's already a waiting SW on load
        if (registration.waiting && navigator.serviceWorker.controller) {
            showUpdateBanner(registration);
        }
    }).catch(console.error);

    // When the SW controller changes (after skipWaiting), reload
    navigator.serviceWorker.addEventListener("controllerchange", () => {
        window.location.reload();
    });
}

function showUpdateBanner(registration) {
    const banner = document.getElementById("updateBanner");
    const updateBtn = document.getElementById("updateBtn");
    banner.classList.remove("hidden");

    updateBtn.addEventListener("click", () => {
        const sw = registration.waiting;
        if (sw) sw.postMessage("skipWaiting");
    }, { once: true });
}

init();

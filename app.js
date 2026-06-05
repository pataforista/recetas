import { INGREDIENTS, INGREDIENT_SHELF_LIFE } from "./data/ingredients.js";
import { SEASONALITY_MX } from "./data/seasonality_mx.js";
import { MEALPREP_BASES } from "./data/mealprep_bases.js";
import { HEALTH_RULES } from "./data/health_rules.js";
import { RECIPES } from "./data/recipes.js";
import {
    getAllRecipes,
    getRecipeById,
    searchRecipesByName,
    filterRecipesByFamily,
    filterRecipesByMealType,
    filterRecipesByTime,
    filterRecipesByEffort,
    filterRecipes,
    sortRecipes,
    getAllFamilies,
    getAllMealTypes,
    getRecipeStats,
    getIngredientName
} from "./modules/recipes-module.js";

const STORAGE_KEYS = {
    inventory: "milpa_nime_inventory_v1",
    cravings: "milpa_nime_cravings_v1",
    weeklyPlan: "milpa_nime_weekly_plan_v1",
    shoppingList: "milpa_nime_shopping_list_v1",
    customLists: "milpa_nime_custom_lists_v1",
    wasteLog: "milpa_nime_waste_log_v1",
    recentSuggestedRecipes: "milpa_nime_recent_recipes_v1"
};

const CRAVINGS = [
    { id: "rapido", label: "Rápido", icon: "⚡" },
    { id: "casero", label: "Casero", icon: "🏠" },
    { id: "ligero", label: "Ligero", icon: "🥗" },
    { id: "llenador", label: "Llenador", icon: "🍲" },
    { id: "saludable", label: "Saludable", icon: "❤️" }
];

const CATEGORY_ORDER = ["milpa", "leguminosas", "verduras", "proteinas", "lacteos", "cereales", "basicos", "grasas", "hierbas", "frutas"];

// ─── Storage Location System ───
const LOCATIONS = {
    refri:      { label: "Refri",      icon: "ac_unit",           shelfMultiplier: 1.0 },
    congelador: { label: "Congelador", icon: "kitchen",           shelfMultiplier: 6.0 },
    despensa:   { label: "Despensa",   icon: "shelves",           shelfMultiplier: 1.0 },
    otro:       { label: "Otro",       icon: "inventory_2",       shelfMultiplier: 1.0 }
};

// Default location based on ingredient category
function getDefaultLocation(category) {
    const refriCategories = ["lacteos", "proteinas", "frutas", "verduras", "milpa"];
    const despensaCategories = ["leguminosas", "cereales", "basicos", "grasas", "hierbas"];
    if (refriCategories.includes(category)) return "refri";
    if (despensaCategories.includes(category)) return "despensa";
    return "otro";
}

const CATEGORY_DESCRIPTIONS = {
    all: { name: "Todos", description: "Ver todos los ingredientes" },
    milpa: { name: "Milpa", description: "Base de la cocina mexicana 🌽" },
    verduras: { name: "Verduras y chiles", description: "Hortalizas frescas" },
    proteinas: { name: "Proteínas", description: "Carnes, huevos, pescado" },
    leguminosas: { name: "Leguminosas", description: "Frijoles y lentejas" },
    cereales: { name: "Cereales", description: "Granos y harinas" },
    lacteos: { name: "Lácteos", description: "Quesos y leche" },
    basicos: { name: "Básicos", description: "Aceite, sal, especias" },
    grasas: { name: "Grasas y aceites", description: "Ingredientes para cocinar" },
    hierbas: { name: "Hierbas y especias", description: "Para sazonar" },
    frutas: { name: "Frutas", description: "Frutas frescas" }
};

// Subcategorías para expandir - mapeo de keywords en ingredient IDs
const SUBCATEGORIES = {
    proteinas: [
        { id: "carnes_rojas", name: "Carnes rojas", keywords: ["res_", "cerdo_", "chorizo", "cecina", "longaniza", "barbacoa", "carnitas", "cabrito", "brisket"] },
        { id: "pollo", name: "Pollo", keywords: ["pollo", "pechuga"] },
        { id: "pescado", name: "Pescado y mariscos", keywords: ["atun", "salmon", "sardina", "pescado_", "camaron", "pulpo", "anchoa"] },
        { id: "huevos", name: "Huevos", keywords: ["huevo"] },
        { id: "vegetariano", name: "Vegetariano", keywords: ["tofu", "tempeh", "edamame", "hummus"] }
    ],
    verduras: [
        { id: "chiles", name: "Chiles", keywords: ["chile_", "rajas_"] },
        { id: "jitomates", name: "Tomates", keywords: ["jitomate", "tomate_"] },
        { id: "leafy_greens", name: "Verduras de hoja", keywords: ["lechuga", "espinaca", "verdolaga", "quelites"] },
        { id: "otros", name: "Otros" }
    ]
};

// ─── Urgency Calculation System ───

/**
 * Calcula el estado de urgencia de un item según fecha de compra y vida útil
 * @param {number} purchaseDate - timestamp de cuando se compró
 * @param {number} estimatedShelfLife - días de vida útil estimada
 * @returns {Object} {status, percentage, daysRemaining}
 */
function calculateUrgency(purchaseDate, estimatedShelfLife) {
    if (!purchaseDate) return { status: "unknown", percentage: 0, daysRemaining: estimatedShelfLife };
    const now = Date.now();
    const daysElapsed = Math.floor((now - purchaseDate) / (1000 * 60 * 60 * 24));
    const percentageUsed = (daysElapsed / estimatedShelfLife) * 100;
    const daysRemaining = estimatedShelfLife - daysElapsed;

    let status;
    if (percentageUsed > 100) {
        status = "expired";
    } else if (percentageUsed >= 70) {
        status = "urgent";
    } else if (percentageUsed >= 30) {
        status = "aging";
    } else {
        status = "fresh";
    }

    return { status, percentage: percentageUsed, daysRemaining };
}

/**
 * Obtiene la vida útil estimada para un ingrediente
 */
function getDefaultShelfLife(ingredientId, category) {
    const shelfLifeCategory = mapCategoryToShelfLifeKey(category);
    const categoryData = INGREDIENT_SHELF_LIFE[shelfLifeCategory];
    if (!categoryData) return 14;

    if (ingredientId && categoryData.items && categoryData.items[ingredientId]) {
        return categoryData.items[ingredientId];
    }

    return categoryData.default || 14;
}

const DAYS = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"];

const state = {
    inventory: loadInventory(),
    selectedCravings: loadCravings(),
    weeklyPlan: loadWeeklyPlan(),
    shoppingList: loadShoppingList(),
    wasteLog: loadWasteLog(),
    currentMonth: new Date().getMonth() + 1,
    recentSuggestedRecipes: loadRecentSuggestedRecipes(),
    customLists: [],
    activeCustomListId: null,
    groceryView: "auto"
};

// ─── Global State & Timers ───
let _inventoryDebounceTimer = null;
let _globalSearchDebounceTimer = null;
let _browserDebounceTimer = null;
let _recipesSearchDebounceTimer = null;

function maybeImportFromUrl() {
    // Import sync payload from URL hash if present
    const hash = window.location.hash;
    if (!hash.includes("sync=")) return;
    try {
        const payload = decodeURIComponent(hash.split("sync=")[1]);
        const data = JSON.parse(payload);
        if (data.inventory) {
            showConfirm(
                "¿Importar datos del enlace?",
                "Se importarán tu inventario, plan y lista de compras desde el enlace compartido.",
                () => {
                    if (data.inventory) state.inventory = data.inventory;
                    if (data.weeklyPlan) state.weeklyPlan = data.weeklyPlan;
                    if (data.shoppingList) state.shoppingList = data.shoppingList;
                    if (data.selectedCravings) state.selectedCravings = data.selectedCravings;
                    persistInventory();
                    persistWeeklyPlan();
                    persistShoppingList();
                    persistCravings();
                    init();
                    showToast("Datos importados desde enlace");
                    history.replaceState(null, "", window.location.pathname);
                }
            );
        }
    } catch { /* silently ignore malformed URLs */ }
}

// ─── Helper Functions ───

function capitalize(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function normalizeString(str) {
    if (!str) return "";
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

function highlight(text, query) {
    if (!query) return escapeHtml(text);
    const escaped = escapeHtml(text);
    const re = new RegExp(`(${escapeRegExp(query)})`, "gi");
    return escaped.replace(re, "<mark>$1</mark>");
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
        hierbas: "potted_plant",
        frutas: "nutrition"
    };
    return icons[category] || "inventory_2";
}

function getCravingIcon(craving) {
    const icons = {
        rapido: "speed",
        casero: "home",
        calientito: "soup_kitchen",
        reconfortante: "volunteer_activism",
        ligero: "leafy_greens",
        fresco: "ac_unit",
        fria: "ac_unit",
        llenador: "restaurant",
        antojo_mexicano: "flag",
        mealprep: "inventory",
        saludable: "favorite",
        picante: "local_fire_department",
        caldosa: "soup_kitchen",
        cozy: "bed"
    };
    return icons[craving] || "mood";
}

function humanizeCraving(value) {
    const table = {
        rapido: "Rápido",
        casero: "Casero",
        calientito: "Calientito",
        reconfortante: "Reconfortante",
        ligero: "Ligero",
        fresco: "Fresco",
        fria: "Fría",
        llenador: "Llenador",
        antojo_mexicano: "Antojo mexicano",
        mealprep: "Meal prep",
        saludable: "Saludable",
        picante: "Picante 🌶️",
        caldosa: "Caldosa",
        cozy: "Acogedor"
    };
    return table[value] || value.split("_").map(capitalize).join(" ");
}

/**
 * Mapea categorías de ingredientes (español) a categorías de vida útil (inglés)
 */
function mapCategoryToShelfLifeKey(category) {
    const map = {
        lacteos: "dairy",
        verduras: "produce",
        frutas: "produce",
        proteinas: "meat",
        milpa: "pantry",
        leguminosas: "pantry",
        cereales: "pantry",
        basicos: "pantry",
        grasas: "pantry",
        hierbas: "pantry"
    };
    return map[category] || "other";
}

// ─── DOM refs ───
const inventoryFiltersEl = document.getElementById("inventoryFilters");
const inventoryListEl = document.getElementById("inventoryList");
const cravingChipsEl = document.getElementById("cravingChips");
const suggestBtn = document.getElementById("suggestBtn");
const resultsEl = document.getElementById("results");
const summaryBoxEl = document.getElementById("summaryBox");
const mealPrepBoxEl = document.getElementById("mealPrepBox");

// ─── Chip group helper ───
function getSelectedChipValue(groupId) {
    const active = document.querySelector(`#${groupId} .option-chip.active`);
    return active ? active.dataset.value : null;
}

let activeCategoryFilter = "all";
// Pending day assignment state for day picker modal
let _pendingRecipeId = null;

// ─── Init ───
function init() {
    // Load customLists from storage on every init
    state.customLists = loadCustomLists();

    initCollapsibles();
    // Critical path - render UI immediately
    renderInventoryFilters();
    renderInventory();
    renderCravings();
    bindEvents();
    renderInitialMessage();

    updateGroceryBadge();
    setupBackupEvents();
    setupOfflineDetection();
    setupPWAInstall();

    // FAB starts hidden (default view is "today", FAB only shows in grocery)
    const fabContainer = document.getElementById("fabContainer");
    if (fabContainer) fabContainer.classList.add("fab-hidden");

    // Initialize FAB immediately (needed for quick navigation)
    initFAB();

    // Defer non-critical initialization to avoid blocking
    requestIdleCallback(() => {
        handleShortcutParam();
        maybeImportFromUrl();
        initSearch();
        registerSW();
    }, { timeout: 2000 });
}

function initCollapsibles() {
    document.querySelectorAll('.section-toggle').forEach(toggle => {
        toggle.addEventListener('click', () => {
            const panel = toggle.closest('.panel');
            panel.classList.toggle('collapsed');
        });
    });
}

// Handle ?view= query param from manifest shortcuts
function handleShortcutParam() {
    const params = new URLSearchParams(window.location.search);
    const view = params.get("view");
    if (view && ["today", "planner", "mealprep", "grocery", "recipes"].includes(view)) {
        showView(view);
    }
}

function bindEvents() {
    if (document.body.dataset.eventsWired) return;
    document.body.dataset.eventsWired = "true";

    suggestBtn.addEventListener("click", handleSuggest);

    document.getElementById("clearFiltersBtn")?.addEventListener("click", () => {
        state.selectedCravings = [];
        renderCravings();
        document.querySelectorAll('.option-chip').forEach(c => c.classList.remove('active'));
        document.querySelector('#timeChips .option-chip[data-value="30"]')?.classList.add('active');
        document.querySelector('#modeChips .option-chip[data-value="today"]')?.classList.add('active');
    });

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

    // Chip groups for Time and Mode
    document.querySelectorAll('#timeChips .option-chip, #modeChips .option-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            chip.closest('.option-chips-group').querySelectorAll('.option-chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
        });
    });

    // Expiring banner: "Cocinar esto" button
    document.getElementById("expiringRescueBtn")?.addEventListener("click", () => {
        const rescueChip = document.querySelector('#modeChips .option-chip[data-value="rescue"]');
        if (rescueChip) {
            document.querySelectorAll('#modeChips .option-chip').forEach(c => c.classList.remove('active'));
            rescueChip.classList.add('active');
        }
        document.getElementById("section-context").classList.remove("collapsed");
        showToast("Modo Rescate activado - encuentra recetas para lo urgente");
    });


    buildDayPickerButtons();
    setupGroceryEvents();
    initNavigation();

    // ─── Modal: Day Picker ───
    document.getElementById("cancelDayPicker")?.addEventListener("click", closeDayPicker);

    // ─── Modal: Confirm ───
    document.getElementById("confirmCancel")?.addEventListener("click", closeConfirmModal);

    // ─── Craving Menu Button ───
    document.getElementById("cravingMenuBtn")?.addEventListener("click", openCravingModal);
    document.getElementById("cravingMenuModal")?.addEventListener("click", (e) => {
        if (e.target === e.currentTarget) closeCravingModal();
    });
    document.querySelector("#cravingMenuModal .modal-close")?.addEventListener("click", closeCravingModal);

    // ─── Inventory Menu Button ───
    document.getElementById("inventoryMenuBtn")?.addEventListener("click", openInventoryModal);
    document.getElementById("inventoryFilterModal")?.addEventListener("click", (e) => {
        if (e.target === e.currentTarget) closeInventoryModal();
    });
    document.querySelector("#inventoryFilterModal .modal-close")?.addEventListener("click", closeInventoryModal);

    // ─── Sync / Share ───
    document.getElementById("shareSyncBtn")?.addEventListener("click", handleShareSync);
    document.getElementById("importSyncBtn")?.addEventListener("click", () => {
        document.getElementById("syncModal")?.classList.remove("hidden");
    });
    document.getElementById("syncCancel")?.addEventListener("click", () => {
        document.getElementById("syncModal")?.classList.add("hidden");
    });
    document.getElementById("syncApply")?.addEventListener("click", () => {
        const payload = document.getElementById("syncPayloadInput")?.value || "";
        if (payload) {
            try {
                const hashIdx = payload.indexOf("sync=");
                const rawData = hashIdx >= 0 ? decodeURIComponent(payload.slice(hashIdx + 5)) : payload;
                const data = JSON.parse(rawData);
                if (data.inventory) {
                    state.inventory = data.inventory;
                    if (data.weeklyPlan) state.weeklyPlan = data.weeklyPlan;
                    if (data.shoppingList) state.shoppingList = data.shoppingList;
                    if (data.selectedCravings) state.selectedCravings = data.selectedCravings;
                    persistInventory(); persistWeeklyPlan(); persistShoppingList(); persistCravings();
                    document.getElementById("syncModal")?.classList.add("hidden");
                    init();
                    showToast("Datos importados correctamente");
                } else {
                    showToast("Error: el enlace no contiene datos válidos");
                }
            } catch {
                showToast("Error: el enlace o código no es válido");
            }
        }
    });

    // ─── Add Recipe to List modal ───
    initAddRecipeToList();
}

function updateInventoryBadge() {
    const count = Object.values(state.inventory).filter((v) => v.has).length;
    const badge = document.getElementById("inventoryCount");
    if (badge) {
        badge.textContent = count > 0 ? `${count} seleccionados` : "Sin selección";
    }
}

function initNavigation() {
    if (document.body.dataset.navWired) return;
    document.body.dataset.navWired = "true";
    document.querySelectorAll(".nav-item").forEach((btn) => {
        btn.addEventListener("click", () => {
            const viewId = btn.getAttribute("data-view");
            showView(viewId);
        });
    });
}

const VIEW_META = {
    today:    { subtitle: "Qué cocinar hoy con lo que hay" },
    planner:  { subtitle: "Plan de comidas de la semana" },
    mealprep: { subtitle: "Prepara bases para la semana" },
    grocery:  { subtitle: "Lista de compras" },
    recipes:  { subtitle: "Consulta el catálogo completo de recetas" },
};

function showView(viewId) {
    document.querySelectorAll(".nav-item").forEach((btn) => {
        btn.classList.toggle("active", btn.getAttribute("data-view") === viewId);
    });
    document.querySelectorAll(".page-view").forEach((view) => {
        view.classList.toggle("active", view.id === `view-${viewId}`);
    });

    // FAB only makes sense in grocery view
    const fabContainer = document.getElementById("fabContainer");
    if (fabContainer) fabContainer.classList.toggle("fab-hidden", viewId !== "grocery");

    // Update header subtitle
    const subtitle = document.querySelector(".app-header .subtitle");
    if (subtitle && VIEW_META[viewId]) subtitle.textContent = VIEW_META[viewId].subtitle;

    if (viewId === "planner") renderPlanner();
    if (viewId === "mealprep") renderMealPrepInitial();
    if (viewId === "grocery") { renderGroceryHub(); updateGroceryBadge(); }
    if (viewId === "recipes") initializeRecipesView();
}

// ─── Grocery Nav Badge ───
function updateGroceryBadge() {
    const badge = document.getElementById("groceryNavBadge");
    if (!badge) return;
    // Count unchecked items across all grocery lists
    const autoItems = (state.shoppingList || []).filter(i => !i.checked).length;
    const customLists = loadCustomLists();
    const customItems = customLists.reduce((sum, l) => sum + (l.items || []).filter(i => !i.checked).length, 0);
    const total = autoItems + customItems;
    if (total > 0) {
        badge.textContent = total > 99 ? "99+" : String(total);
        badge.classList.remove("hidden");
    } else {
        badge.classList.add("hidden");
    }
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
function showToast(message, actionText = null, actionCb = null, duration = 4000) {
    const container = document.getElementById("toastContainer");
    const toast = document.createElement("div");
    toast.className = "toast";

    const textSpan = document.createElement("span");
    textSpan.textContent = message;
    toast.appendChild(textSpan);

    if (actionText && actionCb) {
        const btn = document.createElement("button");
        btn.className = "toast-action";
        btn.textContent = actionText;
        btn.addEventListener("click", () => {
            actionCb();
            toast.classList.add("exit");
            setTimeout(() => toast.remove(), 300);
        });
        toast.appendChild(btn);
    }

    container.appendChild(toast);

    setTimeout(() => {
        if (toast.parentElement) {
            toast.classList.add("exit");
            toast.addEventListener("animationend", () => toast.remove());
        }
    }, duration);
}

/**
 * Shows a toast with multiple action buttons (choice toast).
 * choices = [{text, cb}]
 */

// ─── Shopping List Helpers ───


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
    showToast(`${recipe?.name ?? "Receta"} asignada al ${day}`, "Ver Plan", () => showView("planner"));
}

// ─── Craving Modal ───
function openCravingModal() {
    const modal = document.getElementById("cravingMenuModal");
    if (modal) {
        modal.classList.remove("hidden");
    }
}

function closeCravingModal() {
    const modal = document.getElementById("cravingMenuModal");
    if (modal) {
        modal.classList.add("hidden");
    }
}

// ─── Inventory Modal ───
function openInventoryModal() {
    const modal = document.getElementById("inventoryFilterModal");
    if (modal) {
        modal.classList.remove("hidden");
    }
}

function closeInventoryModal() {
    const modal = document.getElementById("inventoryFilterModal");
    if (modal) {
        modal.classList.add("hidden");
    }
}

// ─── Inventory ───
function renderInventoryFilters() {
    const categories = ["all", ...CATEGORY_ORDER.filter((cat) => INGREDIENTS.some((i) => i.category === cat))];
    inventoryFiltersEl.innerHTML = "";

    const inventoryFilterGrid = document.getElementById("inventoryFilterGrid");
    if (inventoryFilterGrid) inventoryFilterGrid.innerHTML = "";

    // Mostrar solo 3 categorías principales en scroll, el resto en modal
    const visibleCount = 3;
    const visibleCategories = categories.slice(0, visibleCount);
    const hiddenCategories = categories.slice(visibleCount);

    const createCategoryChip = (category, showCounter = false) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = `chip ${activeCategoryFilter === category ? "active" : ""}`;
        const iconName = getCategoryIcon(category);
        const categoryName = CATEGORY_DESCRIPTIONS[category]?.name || capitalize(category);
        btn.setAttribute("aria-label", `Filtrar por ${categoryName}`);

        if (showCounter && category !== "all") {
            const count = countIngredientsByCategory(category);
            btn.innerHTML = `<span class="material-symbols-outlined" aria-hidden="true">${iconName}</span> <span>${categoryName}</span> <span class="chip-counter">${count}</span>`;
        } else {
            btn.innerHTML = `<span class="material-symbols-outlined" aria-hidden="true">${iconName}</span> ${categoryName}`;
        }

        btn.addEventListener("click", () => {
            activeCategoryFilter = category;
            closeInventoryModal();
            renderInventoryFilters();
            renderInventory();
        });
        return btn;
    };

    // Render visible filters in scrollable container
    const filtersFragment = document.createDocumentFragment();
    visibleCategories.forEach((category) => {
        filtersFragment.appendChild(createCategoryChip(category));
    });
    inventoryFiltersEl.appendChild(filtersFragment);

    // Show/hide menu button based on hidden categories
    const menuBtn = document.getElementById("inventoryMenuBtn");
    if (hiddenCategories.length > 0) {
        menuBtn.style.display = "flex";
    } else {
        menuBtn.style.display = "none";
    }

    // Populate modal grid with enhanced category cards
    if (inventoryFilterGrid) {
        const gridFragment = document.createDocumentFragment();
        categories.forEach((category) => {
            const categoryCard = document.createElement("div");
            categoryCard.className = "category-card";
            const hasSubcategories = SUBCATEGORIES[category] && SUBCATEGORIES[category].length > 0;

            const iconName = getCategoryIcon(category);
            const desc = CATEGORY_DESCRIPTIONS[category] || { name: capitalize(category), description: "" };
            const count = countIngredientsByCategory(category);

            categoryCard.innerHTML = `
                <div class="category-card-inner ${activeCategoryFilter === category ? "active" : ""}">
                    <div class="category-icon">
                        <span class="material-symbols-outlined" aria-hidden="true">${iconName}</span>
                    </div>
                    <div class="category-info">
                        <div class="category-name">${desc.name}</div>
                        <div class="category-count">${count} ingredientes</div>
                        <div class="category-description">${desc.description}</div>
                    </div>
                    ${hasSubcategories ? `<div class="category-expand-icon">
                        <span class="material-symbols-outlined" aria-hidden="true">expand_more</span>
                    </div>` : ''}
                </div>
                ${hasSubcategories ? `<div class="category-subcategories hidden">
                    ${SUBCATEGORIES[category].map(sub => `
                        <button type="button" class="subcategory-btn" data-category="${category}" data-subcategory="${sub.id}">
                            <span class="material-symbols-outlined" aria-hidden="true">subdirectory_arrow_right</span>
                            ${sub.name}
                        </button>
                    `).join('')}
                </div>` : ''}
            `;

            // Evento para categoría principal
            const cardInner = categoryCard.querySelector(".category-card-inner");
            if (cardInner) {
                cardInner.addEventListener("click", (e) => {
                    if (e.target.closest(".category-expand-icon")) {
                        // Expandir/contraer subcategorías
                        const subcats = categoryCard.querySelector(".category-subcategories");
                        if (subcats) {
                            subcats.classList.toggle("hidden");
                            categoryCard.querySelector(".category-expand-icon span").textContent =
                                subcats.classList.contains("hidden") ? "expand_more" : "expand_less";
                        }
                    } else {
                        // Click en categoría principal
                        activeCategoryFilter = category;
                        closeInventoryModal();
                        renderInventoryFilters();
                        renderInventory();
                    }
                });
            }

            // Eventos para subcategorías
            categoryCard.querySelectorAll(".subcategory-btn").forEach(btn => {
                btn.addEventListener("click", (e) => {
                    e.stopPropagation();
                    activeCategoryFilter = category;
                    // TODO: En futuras versiones, permitir filtrar por subcategoría
                    closeInventoryModal();
                    renderInventoryFilters();
                    renderInventory();
                });
            });

            gridFragment.appendChild(categoryCard);
        });
        inventoryFilterGrid.appendChild(gridFragment);
    }
}


// Contar ingredientes por categoría
function countIngredientsByCategory(category) {
    if (category === "all") {
        return INGREDIENTS.length;
    }
    return INGREDIENTS.filter(i => i.category === category).length;
}

function renderInventory() {
    inventoryListEl.innerHTML = "";
    renderExpiringBanner();

    const categories = CATEGORY_ORDER.filter(cat => 
        INGREDIENTS.some(ing => ing.category === cat)
    );

    const fragment = document.createDocumentFragment();

    categories.forEach(cat => {
        const categoryIngs = INGREDIENTS.filter(ing => ing.category === cat);
        const selectedCount = categoryIngs.filter(ing => state.inventory[ing.id]?.has).length;
        
        // Category Header
        const header = document.createElement("div");
        header.className = "inventory-section-header";
        header.id = `cat-header-${cat}`;
        header.innerHTML = `
            <span class="cat-icon material-symbols-outlined" aria-hidden="true">${getCategoryIcon(cat)}</span>
            <h3>${capitalize(cat)} <span class="cat-count">(${selectedCount}/${categoryIngs.length})</span></h3>
        `;
        fragment.appendChild(header);

        categoryIngs.forEach(item => {
            const isOwned = !!state.inventory[item.id]?.has;
            const row = document.createElement("div");
            row.className = `inventory-item ${isOwned ? "has-item" : ""}`;
            row.dataset.id = item.id;

            row.innerHTML = `
                <div class="checkbox-wrap">
                    <input type="checkbox" ${isOwned ? "checked" : ""} />
                </div>
                <div class="item-main">
                    <span class="item-icon">${getCategoryIcon(item.category)}</span>
                    <span class="item-name">${item.name}</span>
                </div>
                <div class="item-controls">
                    <select class="urgency-select" title="Urgencia">
                        <option value="normal" ${state.inventory[item.id]?.urgency === "normal" ? "selected" : ""}>Normal</option>
                        <option value="soon" ${state.inventory[item.id]?.urgency === "soon" ? "selected" : ""}>Pronto</option>
                        <option value="urgent" ${state.inventory[item.id]?.urgency === "urgent" ? "selected" : ""}>Urgente</option>
                    </select>
                    <select class="location-select" title="Ubicación">
                        <option value="pantry" ${state.inventory[item.id]?.location === "pantry" ? "selected" : ""}>Despensa</option>
                        <option value="fridge" ${state.inventory[item.id]?.location === "fridge" ? "selected" : ""}>Refri</option>
                        <option value="freezer" ${state.inventory[item.id]?.location === "freezer" ? "selected" : ""}>Congela</option>
                    </select>
                    ${isOwned ? `<button type="button" class="spoiled-btn" title="Se echó a perder" aria-label="Marcar ${item.name} como desperdiciado"><span class="material-symbols-outlined" aria-hidden="true">delete</span></button>` : ""}
                </div>
            `;

            const checkbox = row.querySelector('input[type="checkbox"]');
            checkbox.addEventListener('change', (e) => {
                e.stopPropagation();
                toggleIngredient(item.id);
            });

            const urgencySelect = row.querySelector('.urgency-select');
            urgencySelect.addEventListener('change', (e) => {
                e.stopPropagation();
                updateUrgency(item.id, e.target.value);
            });

            const locationSelect = row.querySelector('.location-select');
            locationSelect.addEventListener('change', (e) => {
                e.stopPropagation();
                updateLocation(item.id, e.target.value);
            });

            const spoiledBtn = row.querySelector('.spoiled-btn');
            if (spoiledBtn) {
                spoiledBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    markSpoiled(item.id);
                });
            }

            row.addEventListener('click', (e) => {
                if (e.target.tagName !== "SELECT" && e.target.tagName !== "INPUT") {
                    checkbox.click();
                }
            });

            fragment.appendChild(row);
        });
    });

    inventoryListEl.appendChild(fragment);
    renderInventoryQuickNav(categories);
    updateInventoryBadge();
}

function renderInventoryQuickNav(categories) {
    const nav = document.getElementById("categoryQuickNav");
    if (!nav) return;
    nav.innerHTML = "";

    categories.forEach(cat => {
        const btn = document.createElement("button");
        btn.className = "nav-chip";
        btn.innerHTML = `<span class="material-symbols-outlined" aria-hidden="true">${getCategoryIcon(cat)}</span> ${capitalize(cat)}`;
        btn.addEventListener("click", () => {
            const el = document.getElementById(`cat-header-${cat}`);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
        nav.appendChild(btn);
    });
}

// ─── Expiring Banner ───
function renderExpiringBanner() {
    const banner = document.getElementById("expiringBanner");
    if (!banner) return;

    const urgentItems = Object.entries(state.inventory)
        .filter(([id, item]) => {
            if (!item.has) return false;
            if (item.urgency === "urgent" || item.urgency === "soon") return true;
            if (item.dateAdded) {
                const ing = INGREDIENTS.find(i => i.id === id);
                const shelfLife = getDefaultShelfLife(id, ing?.category || "other");
                const urgency = calculateUrgency(item.dateAdded, shelfLife);
                return urgency.status === "urgent" || urgency.status === "expired";
            }
            return false;
        })
        .map(([id]) => INGREDIENTS.find(i => i.id === id)?.name)
        .filter(Boolean);

    if (!urgentItems.length) {
        banner.classList.add("hidden");
        return;
    }

    banner.classList.remove("hidden");
    const countEl = document.getElementById("expiringCount");
    const namesEl = document.getElementById("expiringNames");
    if (countEl) countEl.textContent = `${urgentItems.length} ingrediente${urgentItems.length !== 1 ? "s" : ""} para usar pronto`;
    if (namesEl) namesEl.textContent = urgentItems.slice(0, 3).join(", ") + (urgentItems.length > 3 ? "…" : "");
}


// ─── Cravings ───
function renderCravings() {
    cravingChipsEl.innerHTML = "";
    const cravingModalGrid = document.getElementById("cravingModalGrid");
    if (cravingModalGrid) cravingModalGrid.innerHTML = "";

    // Normalize CRAVINGS: support both string IDs and {id, label, icon} objects
    const cravingIds = CRAVINGS.map(c => (typeof c === 'object' && c !== null) ? c.id : c);

    const createCravingChip = (cravingId) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = `chip ${state.selectedCravings.includes(cravingId) ? "active" : ""}`;
        btn.setAttribute("aria-label", `Seleccionar antojo: ${humanizeCraving(cravingId)}`);
        const iconName = getCravingIcon(cravingId);
        btn.innerHTML = `<span class="material-symbols-outlined" aria-hidden="true">${iconName}</span> ${humanizeCraving(cravingId)}`;
        btn.addEventListener("click", () => {
            if (state.selectedCravings.includes(cravingId)) {
                state.selectedCravings = state.selectedCravings.filter((c) => c !== cravingId);
            } else {
                state.selectedCravings.push(cravingId);
            }
            persistCravings();
            renderCravings();
        });
        return btn;
    };

    // Render chips in scrollable container - show first 6 items
    const visibleCount = 6;
    const cravingsFragment = document.createDocumentFragment();
    cravingIds.slice(0, visibleCount).forEach((cravingId) => {
        cravingsFragment.appendChild(createCravingChip(cravingId));
    });
    cravingChipsEl.appendChild(cravingsFragment);

    // Show menu toggle button if there are more items
    const menuBtn = document.getElementById("cravingMenuBtn");
    if (cravingIds.length > visibleCount) {
        menuBtn.style.display = "flex";
    } else {
        menuBtn.style.display = "none";
    }

    // Render all chips in modal
    if (cravingModalGrid) {
        const modalFragment = document.createDocumentFragment();
        cravingIds.forEach((cravingId) => {
            modalFragment.appendChild(createCravingChip(cravingId));
        });
        cravingModalGrid.appendChild(modalFragment);
    }
}



// ─── Suggest ───
function handleSuggest() {
    const originalText = suggestBtn.innerHTML;
    suggestBtn.disabled = true;
    suggestBtn.innerHTML = `<span class="material-symbols-outlined spinning" aria-hidden="true">sync</span> Pensando...`;

    const mode = getSelectedChipValue('modeChips') || 'today';
    const userContext = {
        cravings: [...state.selectedCravings],
        maxTime: Number(getSelectedChipValue('timeChips') || 30),
        mode,
        lowEnergy: mode === 'low_effort',
        seasonBoost: true,
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
            _lastRanked = [];
            document.getElementById("resultsToolbar")?.classList.add("hidden");
            suggestBtn.disabled = false;
            suggestBtn.innerHTML = originalText;
            return;
        }

        _lastRanked = ranked;

        // Save suggested recipes to history for diversity tracking
        addToRecentRecipes(ranked.map(item => item.recipe.id));

        _sortCriterion = "score";
        document.querySelectorAll(".sort-chip").forEach(c => c.classList.toggle("active", c.dataset.sort === "score"));
        document.getElementById("resultsToolbar")?.classList.remove("hidden");

        summaryBoxEl.textContent = buildSummary(userContext, ranked);
        renderRankedResults(ranked);
        const countEl = document.getElementById("resultsCount");
        if (countEl) countEl.textContent = `${ranked.length} receta${ranked.length !== 1 ? "s" : ""}`;
        mealPrepBoxEl.innerHTML = renderMealPrepSuggestions(ranked);
        suggestBtn.disabled = false;
        suggestBtn.innerHTML = originalText;

        // Scroll to results
        const resultsHeader = document.getElementById("resultsPanel");
        if (resultsHeader) {
            resultsHeader.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

const SUBSTITUTIONS = {
    // Milpa / Proteína
    pollo: ["tofu", "huevo", "atun", "setas", "cerdo_magro"],
    tofu: ["pollo", "huevo", "atun", "garbanzo"],
    res_magra: ["pollo", "cerdo_magro", "setas", "res_molida"],
    frijol: ["garbanzo", "lenteja", "haba", "ayocote"],
    garbanzo: ["frijol", "lenteja", "haba"],
    lenteja: ["frijol", "garbanzo"],
    // Salsas / Bases / Grasas
    salsa_verde: ["salsa_roja", "jitomate", "tomate_verde", "chile_serrano", "chile_poblano"],
    salsa_roja: ["salsa_verde", "jitomate", "chile_guajillo", "chile_ancho"],
    crema: ["yogurt_natural", "crema_acida", "leche_coco"],
    manteca: ["aceite_vegtal", "aceite_oliva", "mantequilla"],
    aceite_oliva: ["aguacate", "aceite_vegtal"],
    // Carbohidratos
    tortilla_maiz: ["tostada", "pan_blanco", "masa_maiz", "totopos", "tlayuda"],
    arroz_blanco: ["arroz_integral", "quinoa", "pasta_seca", "maiz_pozolero", "coliflor"],
    papa: ["camote", "yuca", "chayote", "mandioca"],
    // Verduras
    calabacita: ["chayote", "nopal", "pimiento_verde", "pepino"],
    chayote: ["calabacita", "papa", "nopal", "mandioca"],
    pimiento_verde: ["chile_poblano", "calabacita", "nopal"],
    pimiento_rojo: ["jitomate", "chile_ancho", "zanahoria"],
    espinaca: ["acelga", "verdolaga", "quelites", "kale"],
};


function rankRecipes(recipes, context) {
    // Calculate frequency of each recipe in recent history
    const recipeFrequency = {};
    state.recentSuggestedRecipes.forEach(item => {
        recipeFrequency[item.id] = (recipeFrequency[item.id] || 0) + 1;
    });

    const scored = recipes.map((recipe) => {
        const baseScore = scoreRecipe(recipe, context);

        // Apply penalties based on frequency in history
        const frequency = recipeFrequency[recipe.id] || 0;
        const lastEntry = state.recentSuggestedRecipes.slice().reverse().find(item => item.id === recipe.id);

        if (frequency > 0 && lastEntry) {
            const daysSince = (Date.now() - lastEntry.timestamp) / (24 * 60 * 60 * 1000);

            // Frequency-based penalty: every appearance adds 150 points of penalty
            const frequencyPenalty = frequency * 150;

            // Recency penalty: much longer cooldown (30 days instead of 7)
            // 300 points immediately, decays at 10 points/day
            const recencyPenalty = Math.max(0, 300 - (daysSince * 10));

            const totalPenalty = frequencyPenalty + recencyPenalty;
            baseScore.score -= totalPenalty;

            if (totalPenalty > 0) {
                baseScore.reasons.push(`Sugerida ${frequency}x recientemente (${Math.ceil(totalPenalty)} pts penalidad)`);
            }
        }

        return baseScore;
    })
        .filter((item) => item.score > 10 && item.requiredMatches > 0);

    // Sort by score first
    scored.sort((a, b) => b.score - a.score);

    // DIVERSITY: Use soft penalties instead of strict exclusion
    // This allows exceptionally good matches to override diversity while still promoting variety
    const finalRanked = [];
    const familyCounts = {};

    scored.forEach((item) => {
        const family = item.recipe.family || 'none';
        const count = familyCounts[family] || 0;

        // Apply a penalty per existing member of the same family
        const diversityPenalty = count * 25;
        item.adjustedScore = item.score - diversityPenalty;

        if (count > 0 && diversityPenalty > 0) {
            item.reasons.push(`Variedad: Penalidad por familia "${family}" (-${diversityPenalty} pts)`);
        }

        finalRanked.push(item);
        familyCounts[family] = count + 1;
    });

    // Re-sort based on adjusted score
    return finalRanked.sort((a, b) => b.adjustedScore - a.adjustedScore);
}

function scoreRecipe(recipe, context) {
    let score = 0;
    const reasons = [];

    const ownedIngredients = Object.entries(context.inventory)
        .filter(([, value]) => value.has)
        .map(([id]) => id);

    // Ingredient matching with substitution logic
    const requiredMatches = recipe.ingredientsRequired.filter((id) => {
        if (ownedIngredients.includes(id)) return true;
        // Check substitutions
        const subs = SUBSTITUTIONS[id] || [];
        return subs.some(subId => ownedIngredients.includes(subId));
    }).length;

    const optionalMatches = recipe.ingredientsOptional.filter((id) => ownedIngredients.includes(id)).length;
    const requiredRatio = recipe.ingredientsRequired.length ? requiredMatches / recipe.ingredientsRequired.length : 0;

    score += requiredMatches * 20; // Increased base weight
    score += optionalMatches * 5;

    // Detect if we are using substitutions
    const usedSubs = recipe.ingredientsRequired.filter(id => !ownedIngredients.includes(id) && (SUBSTITUTIONS[id] || []).some(sid => ownedIngredients.includes(sid)));
    if (usedSubs.length) {
        score -= usedSubs.length * 5; // Slight penalty for not having precise ingredient
        reasons.push(`Puedes sustituir: ${usedSubs.join(', ')}`);
    }

    if (requiredRatio === 1) {
        score += 15;
        reasons.push("Tienes (o puedes sustituir) todos los ingredientes requeridos");
    } else if (requiredRatio >= 0.5) {
        score += 6;
        reasons.push("Tienes buena parte de la base");
    } else {
        score -= 15;
    }

    const cravingMatches = recipe.cravings.filter((c) => context.cravings.includes(c));
    // Moderate boost for cravings, prioritizing ingredients
    score += cravingMatches.length * 10;
    if (cravingMatches.length) reasons.push(`Coincide con tu antojo: ${cravingMatches.map(humanizeCraving).join(", ")}`);

    // ─── Accessibility & Frequency (New!) ───
    const allIngsInRecipe = [...recipe.ingredientsRequired, ...(recipe.ingredientsOptional || [])];
    const ingsData = allIngsInRecipe.map(id => INGREDIENTS.find(i => i.id === id)).filter(Boolean);
    
    const highFreqCount = ingsData.filter(i => i.frequency === "alta").length;
    const highFreqRatio = allIngsInRecipe.length ? highFreqCount / allIngsInRecipe.length : 0;
    
    if (highFreqRatio >= 0.6) {
        score += 15;
        reasons.push("Ingredientes muy comunes y fáciles de conseguir 🇲🇽");
    }

    const bajaRequiredMissing = recipe.ingredientsRequired.filter(id => {
        const ing = INGREDIENTS.find(i => i.id === id);
        return ing?.frequency === "baja" && !ownedIngredients.includes(id);
    });

    if (bajaRequiredMissing.length > 0) {
        score -= bajaRequiredMissing.length * 10;
        reasons.push(`Requiere ingredientes especializados: ${bajaRequiredMissing.join(", ")}`);
    }

    // ─── Milpa / Clásico Bonus ───
    const milpaIngs = ["tortilla_maiz", "masa_maiz", "elote", "frijol", "nopal", "calabacita", "jitomate", "tomate_verde", "chile_serrano", "chile_poblano"];
    const milpaMatches = recipe.ingredientsRequired.filter(id => milpaIngs.includes(id)).length;
    if (milpaMatches >= 2) {
        score += 8;
        reasons.push("Bono: Base Milpa / Clásico Mexicano 🌽");
    }

    if (recipe.timeMin <= context.maxTime) {
        score += 14;
        reasons.push(`Cabe en tu tiempo (${recipe.timeMin} min)`);
    } else {
        const excess = recipe.timeMin - context.maxTime;
        score -= Math.min(excess, 15);
    }

    if (context.lowEnergy || context.mode === "low_effort") {
        if (recipe.lowFriction) {
            score += 12;
            reasons.push("Ideal para poca energía (baja fricción)");
        } else if (recipe.effort === "alto") {
            score -= 20;
            reasons.push("Evitado: requiere mucho esfuerzo");
        } else if (recipe.effort === "medio") {
            score -= 10;
            reasons.push("Evitado: requiere esfuerzo moderado");
        }
    }

    // Complete Protein Bonus (Cereal + Legume matching)
    const combinedIngs = [...recipe.ingredientsRequired, ...recipe.ingredientsOptional];
    const categoriesInRecipe = combinedIngs.map(id => INGREDIENTS.find(i => i.id === id)?.category).filter(Boolean);
    const hasCereal = categoriesInRecipe.includes('cereales') || combinedIngs.some(id => id.includes('maiz') || id.includes('tortilla') || id.includes('platano'));
    const hasLegume = categoriesInRecipe.includes('leguminosas') || combinedIngs.some(id => id.includes('frijol') || id.includes('lenteja') || id.includes('garbanzo'));
    
    if (hasCereal && hasLegume) {
        score += 10;
        reasons.push("Bono NiME: Proteína completa (Cereal + Leguminosa)");
    }

    const urgencies = ownedIngredients
        .filter((id) => recipe.ingredientsRequired.includes(id) || recipe.ingredientsOptional.includes(id))
        .map((id) => context.inventory[id]?.urgency);

    const urgentCount = urgencies.filter((u) => u === "urgent").length;
    const soonCount = urgencies.filter((u) => u === "soon").length;

    if (context.mode === "rescue" && urgentCount > 0) {
        score += urgentCount * 30; // High priority in rescue mode
        reasons.push(`PRIORIDAD RESCATE: Aprovecha ${urgentCount} ingrediente(s) crítico(s)`);
    } else if (urgentCount) {
        score += urgentCount * 12;
        reasons.push("Aprovecha ingredientes urgentes");
    }

    if (soonCount) {
        score += soonCount * 6;
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
    score += frequencyScore(recipe, reasons);

    return { recipe, score, reasons, requiredMatches };
}

/**
 * frequencyScore – bonus para recetas donde la mayoría de ingredientes
 * requeridos son de alta frecuencia de consumo en México (ENSANUT/SADER/Kaggle).
 * Refleja accesibilidad y familiaridad cultural del platillo.
 */
function frequencyScore(recipe, reasons) {
    const allIds = [...recipe.ingredientsRequired, ...recipe.ingredientsOptional];
    const highFreqCount = allIds.filter((id) => {
        const ing = INGREDIENTS.find((i) => i.id === id);
        return ing?.frequency === "alta";
    }).length;
    const ratio = allIds.length ? highFreqCount / allIds.length : 0;
    if (ratio >= 0.6) {
        reasons.push("Usa ingredientes muy accesibles en México");
        return 8;
    }
    if (ratio >= 0.35) return 4;
    return 0;
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
    
    // Add Milpa/Clásico badges based on scoring reasons
    const isMilpa = reasons.some(r => r.includes("Bono: Base Milpa"));
    const isCommon = reasons.some(r => r.includes("Ingredientes muy comunes"));
    
    if (isMilpa || isCommon) {
        const badgesWrap = document.createElement("div");
        badgesWrap.className = "recipe-badges";
        if (isMilpa) badgesWrap.innerHTML += `<span class="badge-tag milpa" title="Basado en la milpa">🌽 Milpa</span>`;
        if (isCommon) badgesWrap.innerHTML += `<span class="badge-tag classico" title="Ingredientes comunes">🇲🇽 Clásico</span>`;
        node.querySelector(".recipe-top").appendChild(badgesWrap);
    }

    node.querySelector(".recipe-description").textContent = recipe.description;

    const allIngredients = recipe.ingredientsDetailed || [
        ...recipe.ingredientsRequired,
        ...recipe.ingredientsOptional
    ];
    node.querySelector(".ingredients-text").innerHTML = prettyIngredients(allIngredients);
    node.querySelector(".profile-text").innerHTML = buildProfileText(recipe.profile);
    node.querySelector(".mealprep-text").textContent = buildMealPrepText(recipe.mealPrep);

    // Populate Pro Tip if exists
    const protipSection = node.querySelector(".protip-section");
    if (recipe.pro_tip) {
        protipSection.classList.remove("hidden");
        protipSection.querySelector(".protip-text").textContent = recipe.pro_tip;
    } else {
        protipSection.classList.add("hidden");
    }

    const whyList = node.querySelector(".why-list");
    reasons.slice(0, 5).forEach((reason) => {
        const li = document.createElement("li");
        li.textContent = reason;
        whyList.appendChild(li);
    });

    // Wire template action buttons
    const addToPlanBtn = node.querySelector(".add-to-plan-btn");
    if (addToPlanBtn) {
        addToPlanBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            openDayPicker(recipe.id);
        });
    }

    // Wire expand/collapse button
    const expandBtn = node.querySelector('.recipe-expand-btn');
    const collapsible = node.querySelector('.recipe-collapsible');
    if (expandBtn && collapsible) {
        expandBtn.setAttribute('aria-label', `Ver detalles de ${recipe.name}`);
        expandBtn.addEventListener('click', () => {
            const isExpanded = expandBtn.getAttribute('aria-expanded') === 'true';
            expandBtn.setAttribute('aria-expanded', String(!isExpanded));
            expandBtn.setAttribute('aria-label', !isExpanded ? `Ocultar detalles de ${recipe.name}` : `Ver detalles de ${recipe.name}`);
            expandBtn.querySelector('.expand-label').textContent = isExpanded ? 'Ver detalles' : 'Ocultar detalles';
            expandBtn.querySelector('.material-symbols-outlined').textContent = isExpanded ? 'expand_more' : 'expand_less';
            collapsible.classList.toggle('expanded', !isExpanded);
        });
    }

    const cookBtn = node.querySelector(".start-cooking-btn");
    if (cookBtn) {
        cookBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            handleCook(recipe.id);
        });
    }

    const viewDetailBtn = node.querySelector(".view-detail-btn");
    if (viewDetailBtn) {
        viewDetailBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            openRecipesBrowserModal(false);
            openRecipeDetail(recipe.id);
        });
    }

    return node;
}

function handleCook(recipeId) {
    const recipe = RECIPES.find(r => r.id === recipeId);
    if (!recipe) return;

    showConfirm(
        `¿Ya preparaste "${recipe.name}"?`,
        "Los ingredientes se quitarán de tu inventario automáticamente.",
        () => {
            // 1. Consume ingredients
            recipe.ingredientsRequired.forEach(ingId => {
                if (state.inventory[ingId]?.has) {
                    state.inventory[ingId].has = false;
                    state.inventory[ingId].urgency = "normal";
                    logWaste(ingId, INGREDIENTS.find(i => i.id === ingId)?.name || ingId, "consumed");
                }
            });

            persistInventory();
            renderInventory();
            
            // Celebration
            showConfetti();
            showToast("¡Buen provecho! Ingredientes actualizados.");
        }
    );
}

function showConfetti() {
    const duration = 3000;
    const confettiEl = document.createElement("div");
    confettiEl.className = "confetti-overlay";
    confettiEl.innerHTML = "🎉🥘🌽✨";
    document.body.appendChild(confettiEl);
    setTimeout(() => confettiEl.remove(), duration);
}

function toggleIngredient(id) {
    if (!state.inventory[id]) {
        state.inventory[id] = { has: false, urgency: "normal", category: INGREDIENTS.find(i => i.id === id)?.category || "other" };
    }
    state.inventory[id].has = !state.inventory[id].has;
    
    if (state.inventory[id].has) {
        state.inventory[id].dateAdded = Date.now();
        if (!state.inventory[id].location) {
            state.inventory[id].location = getDefaultLocation(state.inventory[id].category);
        }
    } else {
        delete state.inventory[id].dateAdded;
    }
    
    persistInventory();
    updateInventoryBadge();
    renderInventory();
}

function updateUrgency(id, val) {
    if (!state.inventory[id]) return;
    state.inventory[id].urgency = val;
    persistInventory();
    renderExpiringBanner();
}

function updateLocation(id, val) {
    if (!state.inventory[id]) return;
    state.inventory[id].location = val;
    persistInventory();
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
            removeBtn.setAttribute("aria-label", `Quitar ${recipe.name} del ${day}`);
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
            slot.className = "planner-slot empty";
            slot.innerHTML = `
                <div class="planner-slot-empty-content">
                    <span class="material-symbols-outlined" aria-hidden="true">add_circle</span>
                    <span>Añadir receta</span>
                </div>
            `;
            slot.addEventListener("click", () => {
                openRecipesBrowserModal(true, (recipeId) => {
                    state.weeklyPlan[day] = recipeId;
                    persistWeeklyPlan();
                    renderPlanner();
                    const recipeName = RECIPES.find(r => r.id === recipeId)?.name || "Receta";
                    showToast(`${recipeName} añadida al ${day}`);
                });
            });
        }

        dayEl.appendChild(slot);
        grid.appendChild(dayEl);
    });
}

// ─── Grocery List ───
function renderGroceryHub() {
    renderGroceryList();
    setupUnifiedQuickAdd();
    setupGroceryEvents();
    renderWasteStats();
}

function renderGroceryList() {
    const container = document.getElementById("shoppingListContainer");
    if (!container) return;
    
    // 1. Get Plan Items
    const planItems = generateGroceryListFromPlan(); 
    
    // 2. Get Manual Items
    const manualItems = state.shoppingList || [];
    
    // 3. Group by Aisle (Category)
    const groups = {}; 
    
    // Process Plan Items
    Object.entries(planItems).forEach(([id, data]) => {
        const ing = INGREDIENTS.find(i => i.id === id);
        const cat = ing?.category || "basicos";
        if (!groups[cat]) groups[cat] = [];
        groups[cat].push({
            id,
            name: data.name,
            amount: data.amount,
            unit: data.unit,
            checked: !!state.inventory[id]?.has,
            type: 'plan'
        });
    });
    
    // Process Manual Items
    manualItems.forEach(item => {
        const cat = item.category || "basicos";
        if (!groups[cat]) groups[cat] = [];
        groups[cat].push({
            ...item,
            type: 'manual'
        });
    });
    
    // 4. Render
    container.innerHTML = "";
    const sortedCats = CATEGORY_ORDER.filter(c => groups[c]);
    
    if (sortedCats.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <span class="empty-icon">🛒</span>
                <p class="empty-title">Lista vacía</p>
                <p class="empty-sub">Tus ingredientes del plan y manuales aparecerán aquí.</p>
            </div>`;
        return;
    }
    
    const fragment = document.createDocumentFragment();
    sortedCats.forEach(cat => {
        const section = document.createElement("div");
        section.className = "grocery-aisle";
        section.innerHTML = `<h3 class="aisle-header">${getCategoryIcon(cat)} ${capitalize(cat)}</h3>`;
        
        const list = document.createElement("div");
        list.className = "aisle-list";
        
        groups[cat].forEach(item => {
            const row = document.createElement("div");
            row.className = `grocery-row ${item.checked ? "checked" : ""}`;

            const cbWrap = document.createElement("div");
            cbWrap.className = "checkbox-wrap";
            const cb = document.createElement("input");
            cb.type = "checkbox";
            if (item.checked) cb.checked = true;
            cbWrap.appendChild(cb);

            const info = document.createElement("div");
            info.className = "item-info";
            const nameSpan = document.createElement("span");
            nameSpan.className = "item-name";
            nameSpan.textContent = item.name;
            info.appendChild(nameSpan);
            if (item.amount) {
                const qtySpan = document.createElement("span");
                qtySpan.className = "item-qty";
                qtySpan.textContent = `${item.amount}${item.unit || ""}`;
                info.appendChild(qtySpan);
            }

            row.appendChild(cbWrap);
            row.appendChild(info);

            if (item.type === 'manual') {
                const rmBtn = document.createElement("button");
                rmBtn.className = "remove-btn";
                rmBtn.title = "Quitar";
                rmBtn.innerHTML = `<span class="material-symbols-outlined">close</span>`;
                row.appendChild(rmBtn);
            }
            
            cb.addEventListener("change", () => {
                if (item.type === 'plan') {
                    toggleIngredient(item.id);
                } else {
                    item.checked = cb.checked;
                    persistShoppingList();
                    renderGroceryList();
                }
            });

            const rm = row.querySelector(".remove-btn");
            if (rm) {
                rm.addEventListener("click", (e) => {
                    e.stopPropagation();
                    state.shoppingList = state.shoppingList.filter(i => i.id !== item.id);
                    persistShoppingList();
                    renderGroceryList();
                });
            }
            
            list.appendChild(row);
        });
        
        section.appendChild(list);
        fragment.appendChild(section);
    });
    container.appendChild(fragment);
}

function setupUnifiedQuickAdd() {
    const form = document.getElementById("unifiedQuickAddForm");
    const input = document.getElementById("unifiedQuickAddInput");
    if (!form || form.dataset.wired) return;
    
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = input.value.trim();
        if (!name) return;
        
        // Try to find category if it's a known ingredient
        const known = INGREDIENTS.find(i => i.name.toLowerCase() === name.toLowerCase());
        const item = {
            id: `manual_${Date.now()}`,
            name,
            category: known ? known.category : "basicos",
            checked: false,
            type: "manual"
        };
        
        if (!state.shoppingList) state.shoppingList = [];
        state.shoppingList.push(item);
        persistShoppingList();
        input.value = "";
        renderGroceryList();
    });
    form.dataset.wired = "true";
}

function setupGroceryEvents() {
    const clearBtn = document.getElementById("clearGroceryBtn");
    if (!clearBtn || clearBtn.dataset.wired) return;
    clearBtn.dataset.wired = "true";
    clearBtn.addEventListener("click", () => {
        showConfirm(
            "¿Limpiar lista?",
            "Se borrarán todos los items manuales. Los del plan se mantendrán hasta que borres el plan.",
            () => {
                state.shoppingList = [];
                persistShoppingList();
                renderGroceryList();
            }
        );
    });
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

// ─── Utilities ───
function prettyIngredients(ingredients) {
    if (!ingredients || !ingredients.length) return "Sin ingredientes";
    return ingredients.map((item) => {
        let id, name, amount, unit;
        if (typeof item === "string") {
            id = item;
            const ing = INGREDIENTS.find((i) => i.id === item);
            name = ing ? ing.name : item;
        } else if (typeof item === "object") {
            id = item.id;
            const ing = INGREDIENTS.find((i) => i.id === item.id);
            name = ing ? ing.name : item.id;
            amount = item.amount;
            unit = item.unit;
        }

        const hasIt = state.inventory[id]?.has;
        const alt = INGREDIENTS.find(i => i.id === id)?.mexican_alt ? ` (o ${INGREDIENTS.find(i => i.id === id).mexican_alt})` : "";
        
        let text = amount && unit ? `${amount}${unit} de ${name}` : name;
        if (alt) text += alt;

        return hasIt ? `<span class="ing-owned" title="Lo tienes">${text} ✅</span>` : text;
    }).join(", ");
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
    updateGroceryBadge();
}

function loadCustomLists() {
    try {
        const data = JSON.parse(localStorage.getItem(STORAGE_KEYS.customLists)) || [];
        // Migrate old items to new schema (add missing fields)
        return data.map(list => ({
            ...list,
            items: (list.items || []).map(item => ({
                ...item,
                purchaseDate: (item.purchaseDate !== undefined) ? item.purchaseDate : null,
                estimatedShelfLife: item.estimatedShelfLife || getDefaultShelfLife(null, item.category || "other"),
                category: item.category || "other",
                ingredientId: item.ingredientId || null
            }))
        }));
    } catch {
        return [];
    }
}
function loadCravings() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEYS.cravings)) || []; } catch { return []; }
}
function persistCravings() {
    localStorage.setItem(STORAGE_KEYS.cravings, JSON.stringify(state.selectedCravings));
}
function loadWasteLog() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEYS.wasteLog)) || []; } catch { return []; }
}
function persistWasteLog() {
    localStorage.setItem(STORAGE_KEYS.wasteLog, JSON.stringify(state.wasteLog));
}

// ─── Waste Logging ───
function logWaste(ingredientId, ingredientName, action) {
    const now = new Date();
    state.wasteLog.push({
        ingredientId,
        ingredientName,
        action, // "consumed" | "wasted"
        month: now.getMonth() + 1,
        year: now.getFullYear(),
        date: now.getTime()
    });
    persistWasteLog();
}

function markSpoiled(ingredientId) {
    const entry = state.inventory[ingredientId];
    if (!entry?.has) return;
    const name = INGREDIENTS.find(i => i.id === ingredientId)?.name || ingredientId;
    entry.has = false;
    entry.urgency = "normal";
    delete entry.dateAdded;
    logWaste(ingredientId, name, "wasted");
    persistInventory();
    renderInventory();
    renderWasteStats();
    showToast(`"${name}" marcado como desperdiciado`);
}

// ─── Waste Stats Rendering ───
function renderWasteStats() {
    const section = document.getElementById("wasteStatsSection");
    const content = document.getElementById("wasteStatsContent");
    if (!section || !content) return;

    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    const monthLog = state.wasteLog.filter(e => e.month === month && e.year === year);

    if (!monthLog.length) {
        section.classList.add("hidden");
        return;
    }

    section.classList.remove("hidden");
    const consumed = monthLog.filter(e => e.action === "consumed").length;
    const wasted = monthLog.filter(e => e.action === "wasted").length;
    const total = consumed + wasted;
    const consumedPct = total ? Math.round((consumed / total) * 100) : 0;
    const monthNames = ["Enero","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
    const monthName = monthNames[month - 1];

    content.innerHTML = `
        <div class="waste-stat-row">
            <span class="waste-stat-label"><span class="material-symbols-outlined waste-icon consumed">check_circle</span> Usados este ${monthName}</span>
            <span class="waste-stat-num consumed">${consumed}</span>
        </div>
        <div class="waste-stat-row">
            <span class="waste-stat-label"><span class="material-symbols-outlined waste-icon wasted">delete</span> Desperdiciados</span>
            <span class="waste-stat-num wasted">${wasted}</span>
        </div>
        <div class="waste-progress-track">
            <div class="waste-progress-fill" style="width:${consumedPct}%"></div>
        </div>
        <p class="hint" style="margin-top:4px;text-align:center;">${consumedPct}% aprovechado este mes</p>
    `;
}

function loadRecentSuggestedRecipes() {
    try {
        const data = JSON.parse(localStorage.getItem(STORAGE_KEYS.recentSuggestedRecipes)) || [];
        // Keep only recipes from the last 7 days and max 30 recipes
        const oneWeekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
        return data.filter(item => item.timestamp > oneWeekAgo).slice(-30);
    } catch {
        return [];
    }
}

function persistRecentSuggestedRecipes() {
    localStorage.setItem(STORAGE_KEYS.recentSuggestedRecipes, JSON.stringify(state.recentSuggestedRecipes));
}

function addToRecentRecipes(recipeIds) {
    const now = Date.now();
    recipeIds.forEach(id => {
        state.recentSuggestedRecipes = state.recentSuggestedRecipes.filter(item => item.id !== id);
        state.recentSuggestedRecipes.push({ id, timestamp: now });
    });
    // Keep only last 30 entries
    state.recentSuggestedRecipes = state.recentSuggestedRecipes.slice(-30);
    persistRecentSuggestedRecipes();
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

// ─── FAB (Floating Action Button) ───
function initFAB() {
    const fabMainBtn = document.getElementById("fabMainBtn");
    const fabMenu = document.getElementById("fabMenu");
    const fabBackdrop = document.getElementById("fabBackdrop");
    const fabQuickAdd = document.getElementById("fabQuickAdd");
    const fabGoToGrocery = document.getElementById("fabGoToGrocery");

    if (!fabMainBtn) return;

    // Toggle FAB menu
    fabMainBtn.addEventListener("click", () => {
        const isExpanded = fabMainBtn.getAttribute("aria-expanded") === "true";
        fabMainBtn.setAttribute("aria-expanded", !isExpanded);
        fabMenu.classList.toggle("hidden");
        fabBackdrop.classList.toggle("hidden");
    });

    // Close FAB menu when clicking backdrop
    fabBackdrop.addEventListener("click", () => {
        fabMainBtn.setAttribute("aria-expanded", "false");
        fabMenu.classList.add("hidden");
        fabBackdrop.classList.add("hidden");
    });

    // FAB actions
    fabQuickAdd?.addEventListener("click", () => {
        showView("grocery");
        setTimeout(() => {
            const input = document.getElementById("unifiedQuickAddInput");
            input?.focus();
            input?.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 300);
        closeFABMenu();
    });

    fabGoToGrocery?.addEventListener("click", () => {
        showView("grocery");
        closeFABMenu();
    });

    function closeFABMenu() {
        fabMainBtn.setAttribute("aria-expanded", "false");
        fabMenu.classList.add("hidden");
        fabBackdrop.classList.add("hidden");
    }
}

// ─── Add Recipe to Shopping List ───
function initAddRecipeToList() {
    document.addEventListener("click", (e) => {
        if (e.target.closest(".add-to-list-btn")) {
            const card = e.target.closest(".recipe-card");
            if (!card) return;

            const titleEl = card.querySelector(".recipe-title");
            const recipeName = titleEl?.textContent || "Receta";
            const ingredientsText = card.querySelector(".ingredients-text")?.textContent || "";

            addRecipeIngredientsToShoppingList(recipeName, ingredientsText);
        }
    });
}

function addRecipeIngredientsToShoppingList(recipeName, ingredientsText) {
    const names = ingredientsText.split(",").map(s => s.trim()).filter(Boolean);
    if (!names.length) {
        showToast("Esta receta no tiene ingredientes para agregar");
        return;
    }
    if (!state.shoppingList) state.shoppingList = [];
    const existing = new Set(state.shoppingList.map(i => (i.name || "").toLowerCase()));
    let added = 0;
    names.forEach((name, idx) => {
        if (existing.has(name.toLowerCase())) return;
        const known = INGREDIENTS.find(i => i.name.toLowerCase() === name.toLowerCase());
        state.shoppingList.push({
            id: `manual_${Date.now()}_${idx}`,
            name,
            category: known ? known.category : "basicos",
            checked: false,
            type: "manual"
        });
        existing.add(name.toLowerCase());
        added++;
    });
    persistShoppingList();
    renderGroceryList();
    updateGroceryBadge();
    showToast(added > 0
        ? `${added} ingrediente${added !== 1 ? "s" : ""} de "${recipeName}" agregado${added !== 1 ? "s" : ""} a Compras`
        : `Los ingredientes de "${recipeName}" ya están en tu lista`);
}



// Service Worker ───
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

// ─── Search System ───────────────────────────────────────────────────────────

/** Ranked recipes kept in module scope so search/sort can re-render without re-ranking */
let _lastRanked = [];
let _sortCriterion = "score";

/**
 * Wraps every occurrence of `query` inside `text` with <mark> tags.
 * Returns a safe HTML string.
 */

/** Returns true if `query` matches an ingredient by name, alias, or category */
function ingredientMatches(ing, query) {
    const q = normalizeString(query);
    if (!q) return true;
    if (normalizeString(ing.name).includes(q)) return true;
    if (normalizeString(ing.category).includes(q)) return true;
    
    // Match humanized category name
    const categoryName = CATEGORY_DESCRIPTIONS[ing.category]?.name || "";
    if (normalizeString(categoryName).includes(q)) return true;

    if (ing.aliases?.some(a => normalizeString(a).includes(q))) return true;
    return false;
}

/** Returns true if `query` matches a recipe by name, description, or ingredients */
function recipeMatches(recipe, query) {
    const q = normalizeString(query);
    if (!q) return true;
    if (normalizeString(recipe.name).includes(q)) return true;
    if (normalizeString(recipe.description || "").includes(q)) return true;
    const allIds = [...(recipe.ingredientsRequired || []), ...(recipe.ingredientsOptional || [])];
    return allIds.some(id => {
        const ing = INGREDIENTS.find(i => i.id === id);
        return ing && normalizeString(ing.name).includes(q);
    });
}

// ── Inventory search ──────────────────────────────────────────────────────────

function filterInventory(query) {
    const q = query.trim();
    const items = inventoryListEl.querySelectorAll(".inventory-item");

    // If query is empty, show all and restore normal rendering
    if (!q) {
        items.forEach(item => { item.style.display = ""; });
        // Remove highlights
        inventoryListEl.querySelectorAll(".inventory-name mark").forEach(m => {
            const parent = m.parentNode;
            parent.innerHTML = parent.innerHTML.replace(/<\/?mark>/gi, "");
        });
        return;
    }

    const filtered = INGREDIENTS.filter(ing => ingredientMatches(ing, q));
    const matchIds = new Set(filtered.map(i => i.id));

    items.forEach(item => {
        const nameEl = item.querySelector(".inventory-name");
        const ingId = item.dataset.ingId;
        if (matchIds.has(ingId)) {
            item.style.display = "";
            if (nameEl) {
                nameEl.innerHTML = highlight(
                    // strip existing marks first
                    nameEl.textContent,
                    q
                );
            }
        } else {
            item.style.display = "none";
        }
    });
}

// ── Results search & sort ─────────────────────────────────────────────────────

function renderRankedResults(ranked, query = "") {
    resultsEl.innerHTML = "";
    if (!ranked.length) {
        resultsEl.innerHTML = `<div class="empty-state">
            <span class="empty-icon">🔍</span>
            <p class="empty-title">Sin resultados</p>
            <p class="empty-sub">Intenta con otro término o amplía el inventario</p>
        </div>`;
        return;
    }
    ranked.forEach(item => {
        const card = createRecipeCard(item);
        // Highlight recipe title if searching
        if (query) {
            const titleEl = card.querySelector(".recipe-title");
            if (titleEl) titleEl.innerHTML = highlight(titleEl.textContent, query);
        }
        resultsEl.appendChild(card);
    });
}

function applySortAndFilter() {
    let working = [..._lastRanked];

    // "Solo comunes" Toggle
    const commonOnly = document.getElementById("commonOnlyToggle")?.checked;
    if (commonOnly) {
        working = working.filter(item => {
            const allIngs = [...item.recipe.ingredientsRequired, ...(item.recipe.ingredientsOptional || [])];
            return allIngs.every(id => {
                const ing = INGREDIENTS.find(i => i.id === id);
                return !ing || ing.frequency !== "baja";
            });
        });
    }

    // Sort
    if (_sortCriterion === "time") {
        working.sort((a, b) => a.recipe.timeMin - b.recipe.timeMin);
    } else if (_sortCriterion === "name") {
        working.sort((a, b) => a.recipe.name.localeCompare(b.recipe.name, "es"));
    }
    // default: score (already sorted from rankRecipes)

    renderRankedResults(working);
    const countEl = document.getElementById("resultsCount");
    if (countEl) countEl.textContent = `${working.length} receta${working.length !== 1 ? "s" : ""}`;
}

function sortResults(criterion) {
    _sortCriterion = criterion;
    document.querySelectorAll(".sort-chip").forEach(chip => {
        chip.classList.toggle("active", chip.dataset.sort === criterion);
    });
    applySortAndFilter();
}

// ── Recipe Browser Modal ──────────────────────────────────────────────────────

const _browserState = { 
    search: "", 
    family: "", 
    maxTime: 0,
    selectionMode: false,
    onSelect: null
};

const FAMILY_LABELS = {
    pollo: "Pollo", frijol: "Frijol", nopal: "Nopal", huevo: "Huevo",
    verduras: "Verduras", pescado: "Pescado", res: "Res", cerdo: "Cerdo",
    tofu: "Tofu", elote: "Elote", pasta: "Pasta", postres: "Postres",
    leguminosas: "Leguminosas", cereales: "Cereales", milpa: "Milpa",
    atun: "Atún", atun_fresco: "Atún fresco", pescado_blanco: "Pez blanco",
    pescados: "Pescados", queso: "Queso", maiz: "Maíz", miso: "Miso"
};

function openRecipesBrowserModal(selectionMode = false, onSelect = null) {
    const modal = document.getElementById("recipesBrowserModal");
    const list = document.getElementById("recipesBrowserList");
    const detail = document.getElementById("recipeDetailPanel");

    _browserState.selectionMode = selectionMode;
    _browserState.onSelect = onSelect;

    if (list) list.classList.remove("hidden");
    if (detail) detail.classList.add("hidden");

    modal.classList.remove("hidden");

    // Reset internal state
    _browserState.search = "";
    _browserState.family = "";
    _browserState.maxTime = 0;
    
    // Update title based on mode
    const titleEl = document.getElementById("recipesBrowserTitle");
    if (titleEl) {
        titleEl.textContent = selectionMode ? "Seleccionar receta" : "Explorar recetas";
    }

    // Clear search and rebuild family filters to ensure clean state
    const searchInput = document.getElementById("recipesBrowserSearch");
    if (searchInput) {
        searchInput.value = "";
        const clearBtn = document.getElementById("recipesBrowserSearchClear");
        if (clearBtn) clearBtn.classList.add("hidden");
    }

    const familyContainer = document.getElementById("recipesFamilyFilter");
    if (familyContainer) familyContainer.innerHTML = "";

    _buildFamilyFilterChips();

    // Reset filter buttons to default state
    document.querySelectorAll("#recipesFamilyFilter .option-chip").forEach(b => {
        b.classList.toggle("active", b.dataset.family === "");
    });
    document.querySelectorAll("#recipesTimeFilter .option-chip").forEach(b => {
        b.classList.toggle("active", b.dataset.time === "0");
    });

    _renderRecipesBrowser();
    requestAnimationFrame(() => {
        document.getElementById("recipesBrowserSearch")?.focus();
    });
    document.body.style.overflow = "hidden";
}

function closeRecipesBrowserModal() {
    const modal = document.getElementById("recipesBrowserModal");
    if (!modal) return;
    
    modal.classList.add("hidden");
    document.getElementById("recipeDetailPanel")?.classList.add("hidden");
    
    _browserState.search = "";
    _browserState.family = "";
    _browserState.maxTime = 0;
    _browserState.selectionMode = false;
    _browserState.onSelect = null;
    
    const input = document.getElementById("recipesBrowserSearch");
    if (input) input.value = "";

    // Reset active states on all filter buttons
    document.querySelectorAll("#recipesFamilyFilter .option-chip").forEach(b => b.classList.remove("active"));
    document.querySelectorAll("#recipesTimeFilter .option-chip").forEach(b => b.classList.remove("active"));

    document.body.style.overflow = "";
}

function _buildFamilyFilterChips() {
    const container = document.getElementById("recipesFamilyFilter");
    if (!container) return;

    const families = [...new Set(RECIPES.map(r => r.family))].sort();
    const allBtn = document.createElement("button");
    allBtn.type = "button";
    allBtn.className = "option-chip active";
    allBtn.dataset.family = "";
    allBtn.textContent = "Todas";
    allBtn.addEventListener("click", () => _setBrowserFamily("", allBtn));
    container.appendChild(allBtn);

    families.forEach(fam => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "option-chip";
        btn.dataset.family = fam;
        btn.textContent = FAMILY_LABELS[fam] || capitalize(fam);
        btn.addEventListener("click", () => _setBrowserFamily(fam, btn));
        container.appendChild(btn);
    });
}

function _setBrowserFamily(family, clickedBtn) {
    _browserState.family = family;
    document.querySelectorAll("#recipesFamilyFilter .option-chip").forEach(b => b.classList.remove("active"));
    clickedBtn.classList.add("active");
    _renderRecipesBrowser();
}

function _setBrowserTime(maxTime, clickedBtn) {
    _browserState.maxTime = maxTime;
    document.querySelectorAll("#recipesTimeFilter .option-chip").forEach(b => b.classList.remove("active"));
    clickedBtn.classList.add("active");
    _renderRecipesBrowser();
}

function _renderRecipesBrowser() {
    const box = document.getElementById("recipesBrowserResults");
    const countEl = document.getElementById("recipesBrowserCount");
    if (!box) return;

    const q = _browserState.search.toLowerCase().trim();
    const fam = _browserState.family;
    const maxT = _browserState.maxTime;

    const filtered = RECIPES.filter(r => {
        if (fam && r.family !== fam) return false;
        if (maxT && r.timeMin > maxT) return false;
        if (q) {
            const normalizedQ = normalizeString(q);
            return normalizeString(r.name).includes(normalizedQ) ||
                   normalizeString(r.description || "").includes(normalizedQ) ||
                   normalizeString(r.family || "").includes(normalizedQ);
        }
        return true;
    });

    if (countEl) countEl.textContent = filtered.length;

    if (!filtered.length) {
        box.innerHTML = `<div class="recipes-browser-empty">
            <span class="material-symbols-outlined">search_off</span>
            <p>Sin resultados para los filtros seleccionados</p>
        </div>`;
        return;
    }

    box.innerHTML = "";
    filtered.forEach(recipe => {
        const card = document.createElement("button");
        card.type = "button";
        let cardClass = `recipe-browser-card rbc-f-${recipe.family || 'default'}`;
        if (_browserState.selectionMode) cardClass += " selection-mode";
        card.className = cardClass;
        card.setAttribute("aria-label", _browserState.selectionMode ? `Seleccionar ${recipe.name}` : `Ver detalle de ${recipe.name}`);
        
        card.innerHTML = `
            <div class="rbc-top">
                <span class="rbc-name">${escapeHtml(recipe.name)}</span>
                <span class="rbc-arrow material-symbols-outlined" aria-hidden="true">${_browserState.selectionMode ? 'add_circle' : 'chevron_right'}</span>
            </div>
            <div class="rbc-meta">
                <span class="rbc-badge">
                    <span class="material-symbols-outlined" aria-hidden="true">restaurant</span>
                    ${escapeHtml(FAMILY_LABELS[recipe.family] || capitalize(recipe.family || ""))}
                </span>
                <span class="rbc-badge">
                    <span class="material-symbols-outlined" aria-hidden="true">schedule</span>
                    ${recipe.timeMin} min
                </span>
            </div>
            <p class="rbc-desc">${escapeHtml(recipe.description || "")}</p>
        `;
        
        card.addEventListener("click", () => {
            if (_browserState.selectionMode && _browserState.onSelect) {
                _browserState.onSelect(recipe.id);
                closeRecipesBrowserModal();
            } else {
                openRecipeDetail(recipe.id);
            }
        });
        box.appendChild(card);
    });
}

function openRecipeDetail(recipeId) {
    const recipe = RECIPES.find(r => String(r.id) === String(recipeId));
    if (!recipe) return;

    const panel = document.getElementById("recipeDetailPanel");
    const titleEl = document.getElementById("recipeDetailTitle");
    const contentEl = document.getElementById("recipeDetailContent");

    titleEl.textContent = recipe.name;

    // Build ingredients HTML
    const detailedIds = new Set((recipe.ingredientsDetailed || []).map(i => i.id || i));
    const allRequired = recipe.ingredientsDetailed?.length
        ? recipe.ingredientsDetailed
        : recipe.ingredientsRequired.map(id => ({ id }));

    const requiredHtml = allRequired.map(item => {
        const id = typeof item === "string" ? item : item.id;
        const ing = INGREDIENTS.find(i => i.id === id);
        const name = ing ? ing.name : id;
        const amountStr = item.amount && item.unit ? `${item.amount} ${item.unit}` : "";
        const notes = item.notes ? ` — ${item.notes}` : "";
        return `<li class="rd-ingredient-item">
            <span class="rd-ingredient-name">${escapeHtml(name)}${escapeHtml(notes)}</span>
            ${amountStr ? `<span class="rd-ingredient-amount">${escapeHtml(amountStr)}</span>` : ""}
        </li>`;
    }).join("");

    const optionalIngredients = recipe.ingredientsOptional?.filter(id => !detailedIds.has(id)) || [];
    const optionalHtml = optionalIngredients.map(id => {
        const ing = INGREDIENTS.find(i => i.id === id);
        const name = ing ? ing.name : id;
        return `<li class="rd-ingredient-item optional"><span class="rd-ingredient-name">${escapeHtml(name)}</span></li>`;
    }).join("");

    // Profile colors
    function profileColor(field, value) {
        const goodHigh = ["fiber", "protein", "vegetableVolume"];
        const goodLow = ["satFat", "glyLoad", "energyDensity"];
        if (goodHigh.includes(field)) {
            return value === "alta" || value === "alto" || value === "muy alta" ? "good" : value === "baja" || value === "bajo" ? "bad" : "warn";
        }
        if (goodLow.includes(field)) {
            return value === "baja" || value === "bajo" ? "good" : value === "alta" || value === "alto" ? "bad" : "warn";
        }
        return "";
    }

    const profileLabels = {
        fiber: "Fibra", protein: "Proteína", satFat: "Grasa sat.",
        glyLoad: "Carga gluc.", vegetableVolume: "Vol. vegetal", energyDensity: "Dens. energética"
    };
    const profileHtml = Object.entries(recipe.profile || {}).map(([key, val]) => `
        <div class="rd-profile-item">
            <span class="rd-profile-label">${profileLabels[key] || key}</span>
            <span class="rd-profile-value ${profileColor(key, val)}">${val}</span>
        </div>
    `).join("");

    // Cravings
    const cravingsHtml = (recipe.cravings || []).map(c =>
        `<span class="rd-craving-chip">${humanizeCraving(c)}</span>`
    ).join("");

    // Meal prep
    const mp = recipe.mealPrep || {};
    const mpParts = [];
    if (mp.usesBases?.length) mpParts.push(`<strong>Usa bases:</strong> ${mp.usesBases.join(", ")}`);
    if (mp.leavesBases?.length) mpParts.push(`<strong>Deja bases:</strong> ${mp.leavesBases.join(", ")}`);
    if (mp.derivatives?.length) mpParts.push(`<strong>Deriva en:</strong> ${mp.derivatives.join(", ")}`);
    const mpHtml = mpParts.length ? mpParts.join("<br>") : "Sin relaciones de meal prep";

    // Pro Tip
    const protipHtml = recipe.pro_tip ? `
        <div class="rd-section rd-protip-section">
            <p class="rd-section-title"><span class="material-symbols-outlined" aria-hidden="true">psychology_alt</span>Pro Tip Técnico</p>
            <p class="rd-protip-text">${escapeHtml(recipe.pro_tip)}</p>
        </div>` : "";

    const effortLabel = { bajo: "Esfuerzo bajo", medio: "Esfuerzo medio", alto: "Esfuerzo alto" };
    const mealTypeLabel = { comida: "Comida", desayuno: "Desayuno", cena: "Cena", colacion: "Colación", comida_indulgente: "Comida no tan sana" };

    contentEl.innerHTML = `
        <div class="rd-hero">
            <h3 class="rd-title">${escapeHtml(recipe.name)}</h3>
            <div class="rd-badges">
                <span class="rd-badge"><span class="material-symbols-outlined" aria-hidden="true">restaurant</span>${escapeHtml(FAMILY_LABELS[recipe.family] || capitalize(recipe.family || ""))}</span>
                <span class="rd-badge"><span class="material-symbols-outlined" aria-hidden="true">schedule</span>${recipe.timeMin} min</span>
                <span class="rd-badge"><span class="material-symbols-outlined" aria-hidden="true">flatware</span>${escapeHtml(recipe.format || "")}</span>
                ${recipe.effort ? `<span class="rd-badge"><span class="material-symbols-outlined" aria-hidden="true">fitness_center</span>${effortLabel[recipe.effort] || recipe.effort}</span>` : ""}
                ${recipe.mealType ? `<span class="rd-badge"><span class="material-symbols-outlined" aria-hidden="true">sunny</span>${mealTypeLabel[recipe.mealType] || recipe.mealType}</span>` : ""}
            </div>
            <p class="rd-desc">${escapeHtml(recipe.description || "")}</p>
        </div>

        ${cravingsHtml ? `
        <div class="rd-section">
            <p class="rd-section-title"><span class="material-symbols-outlined" aria-hidden="true">mood</span>Antojos que satisface</p>
            <div class="rd-craving-chips">${cravingsHtml}</div>
        </div>` : ""}

        <div class="rd-section">
            <p class="rd-section-title"><span class="material-symbols-outlined" aria-hidden="true">grocery</span>Ingredientes necesarios</p>
            <ul class="rd-ingredients-list">${requiredHtml}</ul>
        </div>

        ${optionalHtml ? `
        <div class="rd-section">
            <p class="rd-section-title"><span class="material-symbols-outlined" aria-hidden="true">add_circle</span>Ingredientes opcionales</p>
            <ul class="rd-ingredients-list">${optionalHtml}</ul>
        </div>` : ""}

        ${profileHtml ? `
        <div class="rd-section">
            <p class="rd-section-title"><span class="material-symbols-outlined" aria-hidden="true">nutrition</span>Perfil nutricional</p>
            <div class="rd-profile-grid">${profileHtml}</div>
        </div>` : ""}

        ${protipHtml}

        <div class="rd-section">
            <p class="rd-section-title"><span class="material-symbols-outlined" aria-hidden="true">inventory</span>Meal prep</p>
            <p class="rd-mealprep-text">${mpHtml}</p>
        </div>

        <div class="rd-actions">
            <button type="button" class="action-btn" id="rdAddToPlanBtn">
                <span class="material-symbols-outlined" aria-hidden="true">calendar_add_on</span>
                Añadir al plan
            </button>
        </div>
    `;

    document.getElementById("rdAddToPlanBtn")?.addEventListener("click", () => {
        openDayPicker(recipe.id);
    });
    
    const list = document.getElementById("recipesBrowserList");
    const detail = document.getElementById("recipeDetailPanel");
    if (list) list.classList.add("hidden");
    if (detail) {
        detail.classList.remove("hidden");
        const content = detail.querySelector(".recipe-detail-content");
        if (content) content.scrollTop = 0;
    }
}

function closeRecipeDetail() {
    document.getElementById("recipeDetailPanel").classList.add("hidden");
    document.getElementById("recipesBrowserList").classList.remove("hidden");
}

// ── Global Search Modal ───────────────────────────────────────────────────────

function openSearchModal() {
    const modal = document.getElementById("searchModal");
    modal.classList.remove("hidden");
    requestAnimationFrame(() => {
        document.getElementById("globalSearch")?.focus();
    });
}

function closeSearchModal() {
    document.getElementById("searchModal").classList.add("hidden");
    const input = document.getElementById("globalSearch");
    if (input) input.value = "";
    const resultsBox = document.getElementById("searchResults");
    if (resultsBox) resultsBox.innerHTML = `<p class="search-placeholder">Escribe para buscar entre ${INGREDIENTS.length} ingredientes y recetas</p>`;
}

function searchAll(query) {
    const q = query.trim();
    const box = document.getElementById("searchResults");
    if (!box) return;

    if (!q) {
        box.innerHTML = `<p class="search-placeholder">Escribe para buscar entre ${INGREDIENTS.length} ingredientes y recetas</p>`;
        return;
    }

    const matchedIngredients = INGREDIENTS.filter(ing => ingredientMatches(ing, q)).slice(0, 12);
    const matchedRecipes = RECIPES.filter(r => recipeMatches(r, q)).slice(0, 8);

    if (!matchedIngredients.length && !matchedRecipes.length) {
        box.innerHTML = `<p class="search-placeholder">Sin resultados para "<strong>${escapeHtml(q)}</strong>"</p>`;
        return;
    }

    const freqIcon = { alta: "🇲🇽", media: "🍽️", baja: "✨" };
    const catIcon = getCategoryIcon;

    let html = "";

    if (matchedIngredients.length) {
        html += `<div class="search-result-group">
            <span class="material-symbols-outlined" aria-hidden="true">inventory_2</span>
            Ingredientes
        </div>`;
        html += matchedIngredients.map(ing => {
            const hasIt = !!state.inventory[ing.id]?.has;
            return `<button class="search-result-item" role="option" data-type="ingredient" data-id="${ing.id}">
                <span class="sri-icon material-symbols-outlined" aria-hidden="true">${catIcon(ing.category)}</span>
                <span class="sri-main">
                    <span class="sri-name">${highlight(ing.name, q)}</span>
                    <span class="sri-sub">${capitalize(ing.category)} · ${freqIcon[ing.frequency || "media"]}</span>
                </span>
                <span class="sri-check ${hasIt ? "has" : ""} material-symbols-outlined" aria-hidden="true">${hasIt ? "check_circle" : "add_circle"}</span>
            </button>`;
        }).join("");
    }

    if (matchedRecipes.length) {
        html += `<div class="search-result-group">
            <span class="material-symbols-outlined" aria-hidden="true">restaurant_menu</span>
            Recetas
        </div>`;
        html += matchedRecipes.map(r => {
            const inPlan = Object.values(state.weeklyPlan).includes(r.id);
            return `<button class="search-result-item" role="option" data-type="recipe" data-id="${r.id}">
                <span class="sri-icon material-symbols-outlined" aria-hidden="true">skillet</span>
                <span class="sri-main">
                    <span class="sri-name">${highlight(r.name, q)}</span>
                    <span class="sri-sub">${r.timeMin} min · ${capitalize(r.family || "")}</span>
                </span>
                ${inPlan ? `<span class="sri-check has material-symbols-outlined" aria-hidden="true">event_available</span>` : ""}
            </button>`;
        }).join("");
    }

    box.innerHTML = html;

    // Wire click handlers
    box.querySelectorAll(".search-result-item[data-type='ingredient']").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = btn.dataset.id;
            // Toggle has
            if (!state.inventory[id]) state.inventory[id] = { has: false, urgency: "normal" };
            state.inventory[id].has = !state.inventory[id].has;
            persistInventory();
            updateInventoryBadge();

            // Find and selectively update main inventory list DOM node if visible
            const invNode = document.querySelector(`.inventory-item[data-ing-id="${id}"]`);
            if (invNode) {
                invNode.classList.toggle("has-item", state.inventory[id].has);
                const checkbox = invNode.querySelector("input[type='checkbox']");
                if (checkbox) checkbox.checked = state.inventory[id].has;
                const select = invNode.querySelector("select");
                if (select) {
                    if (!state.inventory[id].has) select.value = "normal";
                    select.disabled = !state.inventory[id].has;
                }
            }
            
            // Re-render this result to reflect change in search modal
            searchAll(document.getElementById("globalSearch")?.value || "");
            showToast(
                state.inventory[id].has
                    ? `${INGREDIENTS.find(i => i.id === id)?.name} añadido al inventario ✓`
                    : `${INGREDIENTS.find(i => i.id === id)?.name} retirado del inventario`,
                null, null, 2500
            );
        });
    });

    box.querySelectorAll(".search-result-item[data-type='recipe']").forEach(btn => {
        btn.addEventListener("click", () => {
            closeSearchModal();
            openDayPicker(btn.dataset.id);
        });
    });
}

// ── initSearch ────────────────────────────────────────────────────────────────

function initSearch() {
    // ── Global palette trigger ─────────────────────────────────
    document.getElementById("searchBtn")?.addEventListener("click", openSearchModal);

    document.addEventListener("keydown", (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === "k") {
            e.preventDefault();
            openSearchModal();
        }
        if (e.key === "Escape") {
            const modal = document.getElementById("searchModal");
            if (modal && !modal.classList.contains("hidden")) closeSearchModal();
        }
    });

    document.getElementById("searchModal")?.addEventListener("click", (e) => {
        if (e.target === e.currentTarget) closeSearchModal();
    });

    const globalInput = document.getElementById("globalSearch");
    if (globalInput) {
        globalInput.addEventListener("input", () => {
            clearTimeout(_globalSearchDebounceTimer);
            _globalSearchDebounceTimer = setTimeout(() => searchAll(globalInput.value), 150);
        });
    }

    // ── Inventory search ───────────────────────────────────────
    const invSearch = document.getElementById("inventorySearch");
    const invClear = document.getElementById("inventorySearchClear");

    if (invSearch) {
        invSearch.addEventListener("input", () => {
            const q = invSearch.value;
            invClear?.classList.toggle("hidden", !q);
            clearTimeout(_inventoryDebounceTimer);
            _inventoryDebounceTimer = setTimeout(() => filterInventory(q), 120);
        });
    }

    if (invClear) {
        invClear.addEventListener("click", () => {
            invSearch.value = "";
            invClear.classList.add("hidden");
            filterInventory("");
            invSearch.focus();
        });
    }

    // ── Results toolbar ────────────────────────────────────────
    document.querySelectorAll(".sort-chip").forEach(chip => {
        chip.addEventListener("click", () => sortResults(chip.dataset.sort));
    });

    document.getElementById("commonOnlyToggle")?.addEventListener("change", () => {
        applySortAndFilter();
    });

    // ── Recipe Browser Modal ────────────────────────────────────
    document.getElementById("browseAllRecipesBtn")?.addEventListener("click", () => openRecipesBrowserModal());

    document.getElementById("closeRecipesBrowser")?.addEventListener("click", closeRecipesBrowserModal);

    document.getElementById("recipesBrowserModal")?.addEventListener("click", (e) => {
        if (e.target === e.currentTarget) closeRecipesBrowserModal();
    });

    document.getElementById("backToRecipesList")?.addEventListener("click", closeRecipeDetail);

    document.getElementById("closeRecipeDetail")?.addEventListener("click", closeRecipesBrowserModal);

    const rbSearch = document.getElementById("recipesBrowserSearch");
    const rbClear = document.getElementById("recipesBrowserSearchClear");
    if (rbSearch) {
        rbSearch.addEventListener("input", () => {
            rbClear?.classList.toggle("hidden", !rbSearch.value);
            _browserState.search = rbSearch.value;
            clearTimeout(_recipesSearchDebounceTimer);
            _recipesSearchDebounceTimer = setTimeout(() => _renderRecipesBrowser(), 150);
        });
    }
    if (rbClear) {
        rbClear.addEventListener("click", () => {
            rbSearch.value = "";
            rbClear.classList.add("hidden");
            _browserState.search = "";
            _renderRecipesBrowser();
            rbSearch.focus();
        });
    }

    document.querySelectorAll("#recipesTimeFilter .option-chip").forEach(btn => {
        btn.addEventListener("click", () => _setBrowserTime(Number(btn.dataset.time), btn));
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            const browser = document.getElementById("recipesBrowserModal");
            if (browser && !browser.classList.contains("hidden")) {
                const detail = document.getElementById("recipeDetailPanel");
                if (detail && !detail.classList.contains("hidden")) {
                    closeRecipeDetail();
                } else {
                    closeRecipesBrowserModal();
                }
            }
        }
    });
}

// ─── Recipes Module Functions ───

let _recipesFilterState = {
    family: "",
    mealType: "",
    maxTime: "",
    effort: "",
    search: "",
    sortBy: "name",
    sortOrder: "asc"
};

function initializeRecipesView() {
    loadRecipeFilters();
    renderRecipes();
    setupRecipesEventListeners();
}

function loadRecipeFilters() {
    const familySelect = document.getElementById("recipeFilterFamily");
    if (familySelect && familySelect.options.length <= 1) {
        getAllFamilies().forEach((family) => {
            const option = document.createElement("option");
            option.value = family;
            option.textContent = family.charAt(0).toUpperCase() + family.slice(1);
            familySelect.appendChild(option);
        });
    }

    const mealTypeSelect = document.getElementById("recipeFilterMealType");
    if (mealTypeSelect && mealTypeSelect.options.length <= 1) {
        getAllMealTypes().forEach((type) => {
            const option = document.createElement("option");
            option.value = type;
            option.textContent = type.charAt(0).toUpperCase() + type.slice(1);
            mealTypeSelect.appendChild(option);
        });
    }
}

function renderRecipes() {
    // Get all recipes and apply filters
    let recipes = getAllRecipes();

    // Apply filters
    if (_recipesFilterState.family) {
        recipes = recipes.filter((r) => r.family === _recipesFilterState.family);
    }

    if (_recipesFilterState.mealType) {
        recipes = recipes.filter((r) => r.mealType === _recipesFilterState.mealType);
    }

    if (_recipesFilterState.maxTime) {
        recipes = recipes.filter((r) => r.timeMin <= Number(_recipesFilterState.maxTime));
    }

    if (_recipesFilterState.effort) {
        recipes = recipes.filter((r) => r.effort === _recipesFilterState.effort);
    }

    if (_recipesFilterState.search) {
        const search = _recipesFilterState.search.toLowerCase();
        recipes = recipes.filter((r) =>
            r.name.toLowerCase().includes(search) ||
            (r.description && r.description.toLowerCase().includes(search))
        );
    }

    // Sort recipes
    recipes = sortRecipes(recipes, _recipesFilterState.sortBy, _recipesFilterState.sortOrder);

    // Update stats
    const statsEl = document.getElementById("recipeCount");
    if (statsEl) {
        const total = getAllRecipes().length;
        statsEl.textContent = `Mostrando ${recipes.length} de ${total} receta${total !== 1 ? "s" : ""}`;
    }

    // Render recipes
    const container = document.getElementById("recipesContainer");
    if (!container) return;

    if (recipes.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <span class="empty-icon">🍳</span>
                <p class="empty-title">Sin resultados</p>
                <p class="empty-sub">Intenta cambiar los filtros de búsqueda</p>
            </div>
        `;
        return;
    }

    container.innerHTML = recipes.map((recipe) => `
        <article class="recipe-card" data-recipe-id="${recipe.id}">
            <div class="recipe-card-header">
                <h3 class="recipe-card-title">${escapeHtml(recipe.name)}</h3>
                <span class="recipe-family-badge">${recipe.family}</span>
            </div>
            <p class="recipe-card-description">${escapeHtml(recipe.description || "")}</p>
            <div class="recipe-card-meta">
                <span class="recipe-meta-item">
                    <span class="material-symbols-outlined" aria-hidden="true">schedule</span>
                    ${recipe.timeMin} min
                </span>
                <span class="recipe-meta-item">
                    <span class="material-symbols-outlined" aria-hidden="true">psychology</span>
                    ${recipe.effort}
                </span>
                <span class="recipe-meta-item">
                    <span class="material-symbols-outlined" aria-hidden="true">restaurant</span>
                    ${recipe.mealType}
                </span>
                ${recipe.lowFriction ? '<span class="recipe-meta-item low-friction-badge">⚡ Rápido</span>' : ""}
            </div>
            <div class="recipe-card-cravings">
                ${(recipe.cravings || []).slice(0, 3).map((craving) =>
                    `<span class="craving-chip">${craving}</span>`
                ).join("")}
            </div>
            <button class="recipe-card-view-btn" type="button">Ver detalle</button>
        </article>
    `).join("");

    // Add event listeners to recipe cards
    container.querySelectorAll(".recipe-card-view-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const card = e.target.closest(".recipe-card");
            const recipeId = card.dataset.recipeId;
            showRecipeDetail(recipeId);
        });
    });
}

function showRecipeDetail(recipeId) {
    const recipe = getRecipeById(recipeId);
    if (!recipe) return;

    // Create a modal-like detail view
    const modal = document.createElement("div");
    modal.className = "recipe-detail-modal";
    modal.innerHTML = `
        <div class="recipe-detail-overlay" role="dialog" aria-modal="true">
            <div class="recipe-detail-content">
                <div class="recipe-detail-header">
                    <h2>${escapeHtml(recipe.name)}</h2>
                    <button class="close-btn" aria-label="Cerrar" type="button">
                        <span class="material-symbols-outlined" aria-hidden="true">close</span>
                    </button>
                </div>

                <div class="recipe-detail-body">
                    <p class="recipe-detail-description">${escapeHtml(recipe.description || "")}</p>

                    <div class="recipe-detail-info-grid">
                        <div class="info-card">
                            <span class="info-label">Familia</span>
                            <span class="info-value">${recipe.family}</span>
                        </div>
                        <div class="info-card">
                            <span class="info-label">Tiempo</span>
                            <span class="info-value">${recipe.timeMin} min</span>
                        </div>
                        <div class="info-card">
                            <span class="info-label">Esfuerzo</span>
                            <span class="info-value">${recipe.effort}</span>
                        </div>
                        <div class="info-card">
                            <span class="info-label">Tipo</span>
                            <span class="info-value">${recipe.mealType}</span>
                        </div>
                    </div>

                    <h3>Ingredientes Requeridos</h3>
                    <ul class="ingredients-list required">
                        ${recipe.ingredientsRequired.map((id) =>
                            `<li><span class="material-symbols-outlined" aria-hidden="true">done</span>${escapeHtml(getIngredientName(id))}</li>`
                        ).join("")}
                    </ul>

                    ${recipe.ingredientsOptional && recipe.ingredientsOptional.length > 0 ? `
                        <h3>Ingredientes Opcionales</h3>
                        <ul class="ingredients-list optional">
                            ${recipe.ingredientsOptional.map((id) =>
                                `<li><span class="material-symbols-outlined" aria-hidden="true">edit</span>${escapeHtml(getIngredientName(id))}</li>`
                            ).join("")}
                        </ul>
                    ` : ""}

                    ${recipe.cravings && recipe.cravings.length > 0 ? `
                        <h3>Cravings</h3>
                        <div class="cravings-list">
                            ${recipe.cravings.map((craving) =>
                                `<span class="craving-chip">${craving}</span>`
                            ).join("")}
                        </div>
                    ` : ""}
                </div>

                <div class="recipe-detail-actions">
                    <button class="primary-btn add-to-plan-btn" type="button" data-recipe-id="${recipe.id}">
                        <span class="material-symbols-outlined" aria-hidden="true">add</span>
                        Agregar al plan
                    </button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    const closeBtn = modal.querySelector(".close-btn");
    const overlay = modal.querySelector(".recipe-detail-overlay");
    const addBtn = modal.querySelector(".add-to-plan-btn");

    closeBtn.addEventListener("click", () => modal.remove());
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) modal.remove();
    });

    addBtn?.addEventListener("click", () => {
        openDayPicker(recipeId);
        modal.remove();
    });
}

function setupRecipesEventListeners() {
    // Filter listeners
    document.getElementById("recipeFilterFamily")?.addEventListener("change", (e) => {
        _recipesFilterState.family = e.target.value;
        renderRecipes();
    });

    document.getElementById("recipeFilterMealType")?.addEventListener("change", (e) => {
        _recipesFilterState.mealType = e.target.value;
        renderRecipes();
    });

    document.getElementById("recipeFilterTime")?.addEventListener("change", (e) => {
        _recipesFilterState.maxTime = e.target.value;
        renderRecipes();
    });

    document.getElementById("recipeFilterEffort")?.addEventListener("change", (e) => {
        _recipesFilterState.effort = e.target.value;
        renderRecipes();
    });

    // Search listener
    let searchDebounceTimer;
    document.getElementById("recipeSearchInput")?.addEventListener("input", (e) => {
        _recipesFilterState.search = e.target.value;
        clearTimeout(searchDebounceTimer);
        searchDebounceTimer = setTimeout(() => renderRecipes(), 200);
    });

    // Sort listeners
    document.querySelectorAll(".sort-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const sortBy = e.currentTarget.dataset.sort;

            // Toggle sort order if same button clicked
            if (_recipesFilterState.sortBy === sortBy) {
                _recipesFilterState.sortOrder = _recipesFilterState.sortOrder === "asc" ? "desc" : "asc";
            } else {
                _recipesFilterState.sortBy = sortBy;
                _recipesFilterState.sortOrder = "asc";
            }

            // Update active button
            document.querySelectorAll(".sort-btn").forEach((b) => b.classList.remove("active"));
            e.currentTarget.classList.add("active");

            renderRecipes();
        });
    });
}

function setupBackupEvents() {
    document.getElementById("exportJsonBtn")?.addEventListener("click", exportDataAsJson);
    document.getElementById("importJsonBtn")?.addEventListener("click", () => {
        document.getElementById("importJsonInput")?.click();
    });
    document.getElementById("importJsonInput")?.addEventListener("change", importDataFromJson);
}

function handleShareSync() {
    const data = {
        inventory: state.inventory,
        weeklyPlan: state.weeklyPlan,
        shoppingList: state.shoppingList,
        selectedCravings: state.selectedCravings,
        version: "1.0",
        timestamp: Date.now()
    };
    const encoded = encodeURIComponent(JSON.stringify(data));
    const url = `${location.origin}${location.pathname}#sync=${encoded}`;
    
    if (navigator.share) {
        navigator.share({ title: "Milpa NiME – mis datos", url }).catch(() => {});
    } else if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => {
            showToast("¡Enlace copiado! Ábrelo en otro dispositivo.");
        }).catch(() => {
            showToast("No se pudo copiar. Comparte manualmente.");
        });
    } else {
        showToast("Comparte la URL de tu barra de direcciones (incluye #sync=...)");
    }
}

function exportDataAsJson() {
    const data = {
        inventory: state.inventory,
        weeklyPlan: state.weeklyPlan,
        shoppingList: state.shoppingList,
        wasteLog: state.wasteLog,
        selectedCravings: state.selectedCravings,
        version: "1.0",
        timestamp: Date.now()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `milpa_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("Respaldo exportado con éxito");
}

function importDataFromJson(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            const data = JSON.parse(event.target.result);
            if (!data.inventory) throw new Error("Archivo inválido");
            
            showConfirm(
                "¿Importar respaldo?",
                "Se reemplazarán todos tus datos actuales (inventario, plan, etc.).",
                () => {
                    state.inventory = data.inventory || {};
                    state.weeklyPlan = data.weeklyPlan || {};
                    state.shoppingList = data.shoppingList || [];
                    state.wasteLog = data.wasteLog || [];
                    state.selectedCravings = data.selectedCravings || [];
                    
                    persistInventory();
                    persistWeeklyPlan();
                    persistShoppingList();
                    persistWasteLog();
                    persistCravings();
                    
                    // Reload UI
                    init();
                    showToast("Datos importados con éxito");
                }
            );
        } catch (err) {
            showToast("Error: El archivo no es un respaldo válido");
        }
    };
    reader.readAsText(file);
    e.target.value = ""; 
}

init();

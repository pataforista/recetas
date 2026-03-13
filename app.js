import { INGREDIENTS, INGREDIENT_SHELF_LIFE } from "./data/ingredients.js";
import { SEASONALITY_MX } from "./data/seasonality_mx.js";
import { MEALPREP_BASES } from "./data/mealprep_bases.js";
import { HEALTH_RULES } from "./data/health_rules.js";
import { RECIPES } from "./data/recipes.js";

const STORAGE_KEYS = {
    inventory: "milpa_nime_inventory_v1",
    cravings: "milpa_nime_cravings_v1",
    weeklyPlan: "milpa_nime_weekly_plan_v1",
    shoppingList: "milpa_nime_shopping_list_v1",
    customLists: "milpa_nime_custom_lists_v1",
    recentSuggestedRecipes: "milpa_nime_recent_recipes_v1"
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

const CATEGORY_ORDER = ["milpa", "leguminosas", "verduras", "proteinas", "lacteos", "cereales", "basicos", "grasas", "hierbas", "frutas"];

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
 * Obtiene la clase CSS para el estado de urgencia
 */
function getUrgencyClass(urgencyStatus) {
    const map = {
        fresh: "urgency-fresh",
        aging: "urgency-aging",
        urgent: "urgency-urgent",
        expired: "urgency-expired"
    };
    return map[urgencyStatus] || "urgency-fresh";
}

/**
 * Formatea mensaje de días restantes/expirado
 */
function formatDaysRemaining(daysRemaining, urgencyStatus) {
    if (urgencyStatus === "expired") {
        return `Expirado hace ${Math.abs(daysRemaining)} ${Math.abs(daysRemaining) === 1 ? "día" : "días"}`;
    }
    if (daysRemaining === 0) return "Expira hoy";
    if (daysRemaining === 1) return "Expira mañana";
    return `Expira en ${daysRemaining} ${daysRemaining === 1 ? "día" : "días"}`;
}

/**
 * Obtiene la vida útil estimada para un ingrediente
 */
function getDefaultShelfLife(ingredientId, category) {
    if (!category) category = "other";

    const categoryData = INGREDIENT_SHELF_LIFE[category];
    if (!categoryData) return 14;

    if (ingredientId && categoryData.items[ingredientId]) {
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
    customLists: loadCustomLists(),
    activeCustomListId: null,
    groceryView: "auto",
    currentMonth: new Date().getMonth() + 1,
    recentSuggestedRecipes: loadRecentSuggestedRecipes()
};

// ─── DOM refs ───
const inventoryFiltersEl = document.getElementById("inventoryFilters");
const inventoryListEl = document.getElementById("inventoryList");
const cravingChipsEl = document.getElementById("cravingChips");
const suggestBtn = document.getElementById("suggestBtn");
const resultsEl = document.getElementById("results");
const summaryBoxEl = document.getElementById("summaryBox");
const mealPrepBoxEl = document.getElementById("mealPrepBox");
const timeSelectEl = document.getElementById("timeSelect");
const modeSelectEl = document.getElementById("modeSelect");
const lowEnergyEl = document.getElementById("lowEnergy");
const seasonBoostEl = document.getElementById("seasonBoost");

// ─── Chip group helper ───
function getSelectedChipValue(groupId) {
    const active = document.querySelector(`#${groupId} .option-chip.active`);
    return active ? active.dataset.value : null;
}

let activeCategoryFilter = "all";
// Pending day assignment state for day picker modal
let _pendingRecipeId = null;

/**
 * Inicializa la fecha de compra al valor de hoy en el formulario
 */
function setupDefaultPurchaseDate() {
    const dateInput = document.getElementById("customItemDate");
    if (dateInput && !dateInput.value) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.value = today;
    }

    // Initialize shelf life with default value
    const categoryInput = document.getElementById("customItemCategory");
    const shelfLifeInput = document.getElementById("customItemShelfLife");
    if (shelfLifeInput && !shelfLifeInput.value) {
        const category = categoryInput?.value || "other";
        shelfLifeInput.value = getDefaultShelfLife(null, category);
    }
}

// ─── Init ───
function init() {
    renderInventoryFilters();
    renderInventory();
    renderCravings();
    initializeCustomListState();
    bindEvents();
    renderInitialMessage();
    setupPWAInstall();
    registerSW();
    initNavigation();
    initAccordions();
    setupOfflineDetection();
    handleShortcutParam();
    maybeImportFromUrl();
    initSearch();
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

    // Modal: Inventory Menu
    const inventoryMenuBtn = document.getElementById("inventoryMenuBtn");
    const inventoryModal = document.getElementById("inventoryFilterModal");
    const closeInventoryModalBtn = document.getElementById("closeInventoryModal");

    if (inventoryMenuBtn && inventoryModal) {
        inventoryMenuBtn.addEventListener("click", openInventoryModal);
        closeInventoryModalBtn.addEventListener("click", closeInventoryModal);
        inventoryModal.addEventListener("click", (e) => {
            if (e.target === e.currentTarget) closeInventoryModal();
        });
    }

    // Modal: Craving Menu
    const cravingMenuBtn = document.getElementById("cravingMenuBtn");
    const cravingMenuModal = document.getElementById("cravingMenuModal");
    const closeCravingModalBtn = document.getElementById("closeCravingModal");

    if (cravingMenuBtn && cravingMenuModal) {
        cravingMenuBtn.addEventListener("click", openCravingModal);
        closeCravingModalBtn.addEventListener("click", closeCravingModal);
        cravingMenuModal.addEventListener("click", (e) => {
            if (e.target === e.currentTarget) closeCravingModal();
        });
    }

    // Chip groups for Time and Mode
    document.querySelectorAll('#timeChips .option-chip, #modeChips .option-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            chip.closest('.option-chips-group').querySelectorAll('.option-chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
        });
    });

    // Wizard button navigation
    document.getElementById("nextToContext")?.addEventListener("click", () => switchToStep("panel-context"));
    document.getElementById("backToInventory")?.addEventListener("click", () => switchToStep("panel-inventory"));
    document.getElementById("backToContext")?.addEventListener("click", () => switchToStep("panel-context"));

    // Stepper navigation (Global skip)
    document.querySelectorAll('.flow-step[data-panel]').forEach(stepBtn => {
        stepBtn.addEventListener('click', () => {
            switchToStep(stepBtn.dataset.panel);
        });
    });

    // Build day picker buttons once
    buildDayPickerButtons();

    setupGroceryEvents();
}

/**
 * Strict Step Navigation for the today view
 */
function switchToStep(panelId) {
    const panels = document.querySelectorAll('#view-today .wizard-panel');
    const targetPanel = document.getElementById(panelId);
    if (!targetPanel) return;

    panels.forEach(p => p.classList.remove('active'));
    targetPanel.classList.add('active');

    updateStepperState(panelId);

    // Context specific behavior
    if (panelId === 'panel-context') {
        renderCravings(); // Ensure cravings are fresh
    }

    // Scroll to top of the panel for better visibility on mobile
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateStepperState(activePanelId) {
    const steps = document.querySelectorAll('.flow-step');
    const panelOrder = ['panel-inventory', 'panel-context', 'resultsPanel'];
    const activeIdx = panelOrder.indexOf(activePanelId);
    steps.forEach((step, i) => {
        step.classList.remove('active', 'done');
        if (i < activeIdx) step.classList.add('done');
        else if (i === activeIdx) step.classList.add('active');
    });
}

// ─── Inventory Badge ───
function initAccordions() {
    updateInventoryBadge();
}

function updateInventoryBadge() {
    const count = Object.values(state.inventory).filter((v) => v.has).length;
    const badge = document.getElementById("inventoryCount");
    if (badge) {
        badge.textContent = count > 0 ? `${count} seleccionados` : "Sin selección";
    }
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
    if (viewId === "grocery") renderGroceryHub();
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
    visibleCategories.forEach((category) => {
        inventoryFiltersEl.appendChild(createCategoryChip(category));
    });

    // Show/hide menu button based on hidden categories
    const menuBtn = document.getElementById("inventoryMenuBtn");
    if (hiddenCategories.length > 0) {
        menuBtn.style.display = "flex";
    } else {
        menuBtn.style.display = "none";
    }

    // Populate modal grid with enhanced category cards
    if (inventoryFilterGrid) {
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

            inventoryFilterGrid.appendChild(categoryCard);
        });
    }
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

// Contar ingredientes por categoría
function countIngredientsByCategory(category) {
    if (category === "all") {
        return INGREDIENTS.length;
    }
    return INGREDIENTS.filter(i => i.category === category).length;
}

function renderInventory() {
    inventoryListEl.innerHTML = "";

    const filtered = INGREDIENTS.filter((item) =>
        activeCategoryFilter === "all" ? true : item.category === activeCategoryFilter
    );

    const fragment = document.createDocumentFragment();

    filtered.forEach((ingredient) => {
        const wrapper = document.createElement("div");
        const hasItem = !!state.inventory[ingredient.id]?.has;
        wrapper.className = `inventory-item${hasItem ? " has-item" : ""}`;
        wrapper.dataset.ingId = ingredient.id;

        const row1 = document.createElement("div");
        row1.className = "inventory-row";

        const freqLabel = { alta: "🇲🇽 Muy común", media: "Común", baja: "Especializado" };
        const freqClass = { alta: "freq-alta", media: "freq-media", baja: "freq-baja" };
        const freq = ingredient.frequency || "media";

        const nameEl = document.createElement("div");
        nameEl.innerHTML = `
            <div class="inventory-name">${ingredient.name}</div>
            <div class="inventory-meta">
                ${capitalize(ingredient.category)}
                <span class="freq-badge ${freqClass[freq]}">${freqLabel[freq]}</span>
            </div>
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
            updateInventoryItemUrgency(ingredient.id, wrapper);
            persistInventory();
            updateInventoryBadge();
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
        wrapper.dataset.urgencySelect = urgencySelect;
        fragment.appendChild(wrapper);
    });

    inventoryListEl.appendChild(fragment);
    updateInventoryBadge();
}

function updateInventoryItemUrgency(ingredientId, wrapper) {
    const urgencySelect = wrapper.dataset.urgencySelect || wrapper.querySelector("select");
    const hasItem = !!state.inventory[ingredientId]?.has;
    if (urgencySelect) {
        urgencySelect.disabled = !hasItem;
        urgencySelect.value = state.inventory[ingredientId]?.urgency || "normal";
    }
    wrapper.classList.toggle("has-item", hasItem);
}

// ─── Cravings ───
function renderCravings() {
    cravingChipsEl.innerHTML = "";
    const cravingModalGrid = document.getElementById("cravingModalGrid");
    if (cravingModalGrid) cravingModalGrid.innerHTML = "";

    const createCravingChip = (craving) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = `chip ${state.selectedCravings.includes(craving) ? "active" : ""}`;
        btn.setAttribute("aria-label", `Seleccionar antojo: ${humanizeCraving(craving)}`);
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
        return btn;
    };

    // Render chips in scrollable container - show first 6 items
    const visibleCount = 6;
    CRAVINGS.slice(0, visibleCount).forEach((craving) => {
        cravingChipsEl.appendChild(createCravingChip(craving));
    });

    // Show menu toggle button if there are more items
    const menuBtn = document.getElementById("cravingMenuBtn");
    if (CRAVINGS.length > visibleCount) {
        menuBtn.style.display = "flex";
    } else {
        menuBtn.style.display = "none";
    }

    // Render all chips in modal
    if (cravingModalGrid) {
        CRAVINGS.forEach((craving) => {
            cravingModalGrid.appendChild(createCravingChip(craving));
        });
    }
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
        maxTime: Number(getSelectedChipValue('timeChips') || 30),
        mode: getSelectedChipValue('modeChips') || 'today',
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
            _lastRanked = [];
            document.getElementById("resultsToolbar")?.classList.add("hidden");
            suggestBtn.disabled = false;
            return;
        }

        _lastRanked = ranked;

        // Save suggested recipes to history for diversity tracking
        addToRecentRecipes(ranked.map(item => item.recipe.id));

        _sortCriterion = "score";
        document.querySelectorAll(".sort-chip").forEach(c => c.classList.toggle("active", c.dataset.sort === "score"));
        document.getElementById("resultsToolbar")?.classList.remove("hidden");
        const resSearch = document.getElementById("resultsSearch");
        if (resSearch) resSearch.value = "";

        summaryBoxEl.textContent = buildSummary(userContext, ranked);
        renderRankedResults(ranked);
        const countEl = document.getElementById("resultsCount");
        if (countEl) countEl.textContent = `${ranked.length} receta${ranked.length !== 1 ? "s" : ""}`;
        mealPrepBoxEl.innerHTML = renderMealPrepSuggestions(ranked);
        suggestBtn.disabled = false;

        // Jump to results step
        switchToStep('resultsPanel');
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
    // Salsas / Bases
    salsa_verde: ["salsa_roja", "jitomate", "tomate_verde", "chile_serrano"],
    salsa_roja: ["salsa_verde", "jitomate", "chile_guajillo"],
    crema: ["yogurt_natural", "crema_acida", "leche_coco"],
    // Carbohidratos
    tortilla_maiz: ["tostada", "pan_blanco", "masa_maiz", "totopos"],
    arroz_blanco: ["arroz_integral", "quinoa", "pasta_seca", "maiz_pozolero"],
    papa: ["camote", "yuca", "chayote"],
    // Verduras
    calabacita: ["chayote", "nopal", "pimiento_verde"],
    chayote: ["calabacita", "papa", "nopal"],
    pimiento_verde: ["chile_poblano", "calabacita"],
    pimiento_rojo: ["jitomate", "chile_ancho"],
};

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

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
        .filter((item) => item.score > 10);

    // Sort by score first
    scored.sort((a, b) => b.score - a.score);

    // STRICT DIVERSITY: max 1 recipe per family in final results
    // This ensures we never see 2+ recipes from the same family
    const finalRanked = [];
    const familyUsed = new Set();

    scored.forEach((item) => {
        const family = item.recipe.family;

        // Skip this recipe if we already have one from this family
        if (familyUsed.has(family)) {
            return;
        }

        item.adjustedScore = item.score;
        finalRanked.push(item);
        familyUsed.add(family);
    });

    return finalRanked;
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
    score += cravingMatches.length * 10;
    if (cravingMatches.length) reasons.push(`Coincide con tu antojo: ${cravingMatches.map(humanizeCraving).join(", ")}`);

    if (recipe.timeMin <= context.maxTime) {
        score += 14;
        reasons.push(`Cabe en tu tiempo (${recipe.timeMin} min)`);
    } else {
        const excess = recipe.timeMin - context.maxTime;
        score -= Math.min(excess, 15);
    }

    if (context.lowEnergy) {
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
    score += frequencyScore(recipe, reasons);

    return { recipe, score, reasons };
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

    // Wire template action buttons
    const addToPlanBtn = node.querySelector(".add-to-plan-btn");
    if (addToPlanBtn) {
        addToPlanBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            openDayPicker(recipe.id);
        });
    }

    const saveBtn = node.querySelector(".save-recipe-btn");
    if (saveBtn) {
        saveBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            showToast(`"${recipe.name}" guardada ⭐`, null, null, 3000);
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
function initializeCustomListState() {
    if (!state.customLists.length) return;
    state.activeCustomListId = state.customLists[0].id;
}

function renderGroceryHub() {
    renderGroceryMode();
    renderGroceryList();
    renderCustomLists();
    renderCustomListItems();
    setupDefaultPurchaseDate();
}

function renderGroceryMode() {
    const isAuto = state.groceryView === "auto";
    document.getElementById("autoListTab")?.classList.toggle("active", isAuto);
    document.getElementById("customListTab")?.classList.toggle("active", !isAuto);
    document.getElementById("autoListView")?.classList.toggle("active", isAuto);
    document.getElementById("customListView")?.classList.toggle("active", !isAuto);
}

function setupGroceryEvents() {
    document.getElementById("autoListTab")?.addEventListener("click", () => {
        state.groceryView = "auto";
        renderGroceryMode();
    });
    document.getElementById("customListTab")?.addEventListener("click", () => {
        state.groceryView = "custom";
        renderGroceryMode();
    });

    document.getElementById("createCustomListForm")?.addEventListener("submit", (e) => {
        e.preventDefault();
        const input = document.getElementById("customListName");
        const name = input.value.trim();
        if (!name) return;
        const list = {
            id: `lst_${Date.now()}`,
            name,
            items: []
        };
        state.customLists.unshift(list);
        state.activeCustomListId = list.id;
        persistCustomLists();
        input.value = "";
        state.groceryView = "custom";
        renderGroceryHub();
        showToast("Lista creada");
    });

    document.getElementById("addCustomItemForm")?.addEventListener("submit", (e) => {
        e.preventDefault();
        const list = getActiveCustomList();
        if (!list) return;
        const nameInput = document.getElementById("customItemName");
        const qtyInput = document.getElementById("customItemQty");
        const unitInput = document.getElementById("customItemUnit");
        const categoryInput = document.getElementById("customItemCategory");
        const dateInput = document.getElementById("customItemDate");
        const shelfLifeInput = document.getElementById("customItemShelfLife");

        const name = nameInput.value.trim();
        if (!name) return;

        const dateValue = dateInput?.value || new Date().toISOString().split('T')[0];
        const purchaseDate = new Date(dateValue).getTime();
        const category = categoryInput?.value || "other";
        const estimatedShelfLife = Number(shelfLifeInput?.value) || getDefaultShelfLife(null, category);

        list.items.push({
            id: `itm_${Date.now()}`,
            name,
            qty: qtyInput.value ? Number(qtyInput.value) : null,
            unit: unitInput.value.trim(),
            have: false,
            bought: false,
            purchaseDate,
            estimatedShelfLife,
            category,
            ingredientId: null
        });

        persistCustomLists();
        nameInput.value = "";
        qtyInput.value = "";
        unitInput.value = "";
        categoryInput && (categoryInput.value = "");
        dateInput && (dateInput.value = new Date().toISOString().split('T')[0]);
        shelfLifeInput && (shelfLifeInput.value = "");
        renderCustomListItems();
        showToast("Producto agregado");
    });

    // Event listeners for new form fields
    document.getElementById("customItemCategory")?.addEventListener("change", (e) => {
        const shelfLifeInput = document.getElementById("customItemShelfLife");
        if (shelfLifeInput) {
            const shelfLife = getDefaultShelfLife(null, e.target.value);
            shelfLifeInput.value = shelfLife;
        }
    });

    document.getElementById("customItemDate")?.addEventListener("change", () => {
        // Trigger recalculation on form submission
    });

    // Initialize default date on page load
    setupDefaultPurchaseDate();

    document.getElementById("shareSyncBtn")?.addEventListener("click", shareSyncData);
    document.getElementById("importSyncBtn")?.addEventListener("click", openSyncModal);
    document.getElementById("syncCancel")?.addEventListener("click", closeSyncModal);
    document.getElementById("syncModal")?.addEventListener("click", (e) => {
        if (e.target === e.currentTarget) closeSyncModal();
    });
    document.getElementById("syncApply")?.addEventListener("click", importFromSyncInput);
}

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
            <label class="grocery-checkline">
              <input type="checkbox" ${hasIt ? "checked" : ""} aria-label="${data.name}">
              <span>${amountText}<strong>${data.name}</strong></span>
            </label>
            <small>Ya lo tengo</small>
        `;

        if (hasIt) item.classList.add("checked");

        item.querySelector("input").addEventListener("change", (e) => {
            if (!state.inventory[ingredientId]) {
                state.inventory[ingredientId] = { has: false, urgency: "normal" };
            }
            state.inventory[ingredientId].has = e.target.checked;
            persistInventory();
            updateInventoryBadge();
            
            // Find and selectively update main inventory list DOM node if visible
            const invNode = document.querySelector(`.inventory-item[data-ing-id="${ingredientId}"]`);
            if (invNode) {
                invNode.classList.toggle("has-item", state.inventory[ingredientId].has);
                const checkbox = invNode.querySelector("input[type='checkbox']");
                if (checkbox) checkbox.checked = state.inventory[ingredientId].has;
                const select = invNode.querySelector("select");
                if (select) {
                    if (!state.inventory[ingredientId].has) select.value = "normal";
                    select.disabled = !state.inventory[ingredientId].has;
                }
            }

            renderGroceryList();
        });

        container.appendChild(item);
    });

    const copyBtn = document.createElement("button");
    copyBtn.className = "secondary";
    copyBtn.style.marginTop = "16px";
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

function renderCustomLists() {
    const container = document.getElementById("customListsContainer");
    const addForm = document.getElementById("addCustomItemForm");
    container.innerHTML = "";

    if (!state.customLists.length) {
        addForm?.classList.add("hidden");
        container.innerHTML = "<p class='hint'>Crea tu primera lista para organizar tus compras.</p>";
        return;
    }

    addForm?.classList.remove("hidden");
    state.customLists.forEach((list) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = `chip ${list.id === state.activeCustomListId ? "active" : ""}`;
        btn.textContent = `${list.name} (${list.items.length})`;
        btn.addEventListener("click", () => {
            state.activeCustomListId = list.id;
            renderCustomLists();
            renderCustomListItems();
        });
        container.appendChild(btn);
    });
}

function renderCustomListItems() {
    const list = getActiveCustomList();
    const title = document.getElementById("activeCustomListTitle");
    const container = document.getElementById("customListItems");
    container.innerHTML = "";

    if (!list) {
        title.textContent = "Nueva compra";
        return;
    }

    title.textContent = `Agregar a: ${list.name}`;

    if (!list.items.length) {
        container.innerHTML = "<p class='hint'>Tu lista está vacía. Agrega elementos arriba.</p>";
        return;
    }

    // Sort items by urgency: expired → urgent → aging → fresh → no date
    const sortedItems = [...list.items].sort((a, b) => {
        // Items without purchaseDate go to the end
        if (!a.purchaseDate && !b.purchaseDate) return 0;
        if (!a.purchaseDate) return 1;
        if (!b.purchaseDate) return -1;

        // Calculate urgency for both items
        const urgencyA = calculateUrgency(a.purchaseDate, a.estimatedShelfLife || 14);
        const urgencyB = calculateUrgency(b.purchaseDate, b.estimatedShelfLife || 14);

        // Order by urgency: expired > urgent > aging > fresh
        const urgencyOrder = { expired: 0, urgent: 1, aging: 2, fresh: 3 };
        if (urgencyOrder[urgencyA.status] !== urgencyOrder[urgencyB.status]) {
            return urgencyOrder[urgencyA.status] - urgencyOrder[urgencyB.status];
        }

        // If same urgency level, show more urgent first (less days remaining)
        return urgencyA.daysRemaining - urgencyB.daysRemaining;
    });

    sortedItems.forEach((item) => {
        const row = document.createElement("div");
        row.className = `grocery-item ${item.bought ? "checked" : ""}`;

        // Calculate urgency if item has purchaseDate
        let urgencyBadge = "";
        if (item.purchaseDate) {
            const urgency = calculateUrgency(item.purchaseDate, item.estimatedShelfLife || 14);
            const urgencyClass = getUrgencyClass(urgency.status);
            const daysText = formatDaysRemaining(urgency.daysRemaining, urgency.status);
            urgencyBadge = `
                <span class="urgency-badge ${urgencyClass}">
                    <span class="urgency-dot"></span>
                    <span class="urgency-label">${urgency.status.toUpperCase()}</span>
                </span>
                <span class="days-remaining">${daysText}</span>
            `;
        }

        row.innerHTML = `
            <label class="grocery-checkline">
              <input type="checkbox" ${item.bought ? "checked" : ""} aria-label="Comprado ${item.name}">
              <span>
                <strong>${item.name}</strong>
                ${item.qty ? `• ${item.qty}${item.unit ? ` ${item.unit}` : ""}` : ""}
                ${item.category && item.category !== "other" ? `<small class="category-tag">${item.category}</small>` : ""}
              </span>
            </label>
            <div class="item-urgency">
              ${urgencyBadge}
            </div>
            <label class="mini-toggle">Tengo <input type="checkbox" ${item.have ? "checked" : ""}></label>
            <button type="button" class="text-btn">Eliminar</button>
        `;

        const [boughtInput, haveInput] = row.querySelectorAll("input[type='checkbox']");
        boughtInput.addEventListener("change", (e) => {
            item.bought = e.target.checked;
            persistCustomLists();
            row.classList.toggle("checked", item.bought);
        });
        haveInput.addEventListener("change", (e) => {
            item.have = e.target.checked;
            persistCustomLists();
        });
        row.querySelector("button").addEventListener("click", () => {
            list.items = list.items.filter((it) => it.id !== item.id);
            persistCustomLists();
            renderCustomLists();
            renderCustomListItems();
        });

        container.appendChild(row);
    });
}

function getActiveCustomList() {
    if (!state.activeCustomListId) return null;
    return state.customLists.find((l) => l.id === state.activeCustomListId) || null;
}

function shareSyncData() {
    const payload = {
        inventory: state.inventory,
        selectedCravings: state.selectedCravings,
        weeklyPlan: state.weeklyPlan,
        customLists: state.customLists,
        at: Date.now()
    };
    const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
    const url = `${window.location.origin}${window.location.pathname}#sync=${encoded}`;

    if (navigator.share) {
        navigator.share({ title: "Sincronización Milpa NiME", text: "Importa tus datos", url })
            .catch(() => navigator.clipboard.writeText(url));
    } else {
        navigator.clipboard.writeText(url)
            .then(() => showToast("Enlace de sincronización copiado"))
            .catch(() => showToast("No se pudo copiar el enlace"));
    }
}

function openSyncModal() {
    document.getElementById("syncModal")?.classList.remove("hidden");
}

function closeSyncModal() {
    document.getElementById("syncModal")?.classList.add("hidden");
}

function importFromSyncInput() {
    const input = document.getElementById("syncPayloadInput");
    const value = input.value.trim();
    if (!value) return;
    const success = importSyncPayload(value);
    if (success) {
        input.value = "";
        closeSyncModal();
    }
}

function maybeImportFromUrl() {
    const hash = window.location.hash || "";
    if (!hash.includes("sync=")) return;
    importSyncPayload(hash);
    history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
}

function importSyncPayload(raw) {
    try {
        const encoded = raw.includes("sync=") ? raw.split("sync=")[1].split("&")[0] : raw;
        const decoded = decodeURIComponent(escape(atob(encoded)));
        const parsed = JSON.parse(decoded);

        state.inventory = parsed.inventory || {};
        state.selectedCravings = parsed.selectedCravings || [];
        state.weeklyPlan = parsed.weeklyPlan || {};
        state.customLists = parsed.customLists || [];
        state.activeCustomListId = state.customLists[0]?.id || null;

        persistInventory();
        persistCravings();
        persistWeeklyPlan();
        persistCustomLists();

        renderInventory();
        renderCravings();
        renderPlanner();
        renderGroceryHub();
        showToast("Datos importados y sincronizados");
        return true;
    } catch {
        showToast("No se pudo importar ese enlace");
        return false;
    }
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
        "Se borrarán inventario, antojos, plan y listas personalizadas.",
        () => {
            state.inventory = {};
            state.selectedCravings = [];
            state.weeklyPlan = {};
            state.customLists = [];
            state.activeCustomListId = null;
            persistInventory();
            persistCravings();
            persistWeeklyPlan();
            persistCustomLists();
            renderInventory();
            renderCravings();
            renderInitialMessage();
            renderGroceryHub();
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

function loadCustomLists() {
    try {
        const data = JSON.parse(localStorage.getItem(STORAGE_KEYS.customLists)) || [];
        // Migrate old items to new schema (add missing fields)
        return data.map(list => ({
            ...list,
            items: (list.items || []).map(item => ({
                ...item,
                purchaseDate: item.purchaseDate || Date.now(),
                estimatedShelfLife: item.estimatedShelfLife || getDefaultShelfLife(null, item.category || "other"),
                category: item.category || "other",
                ingredientId: item.ingredientId || null
            }))
        }));
    } catch {
        return [];
    }
}
function persistCustomLists() {
    localStorage.setItem(STORAGE_KEYS.customLists, JSON.stringify(state.customLists));
}
function loadCravings() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEYS.cravings)) || []; } catch { return []; }
}
function persistCravings() {
    localStorage.setItem(STORAGE_KEYS.cravings, JSON.stringify(state.selectedCravings));
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

// ─── Search System ───────────────────────────────────────────────────────────

/** Ranked recipes kept in module scope so search/sort can re-render without re-ranking */
let _lastRanked = [];
let _sortCriterion = "score";
let _inventoryDebounceTimer = null;
let _globalDebounceTimer = null;

/**
 * Wraps every occurrence of `query` inside `text` with <mark> tags.
 * Returns a safe HTML string.
 */
function highlight(text, query) {
    if (!query) return escapeHtml(text);
    const escaped = escapeHtml(text);
    const re = new RegExp(`(${escapeRegExp(query)})`, "gi");
    return escaped.replace(re, "<mark>$1</mark>");
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

/** Returns true if `query` matches an ingredient by name, alias, or category */
function ingredientMatches(ing, query) {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    if (ing.name.toLowerCase().includes(q)) return true;
    if (ing.category.toLowerCase().includes(q)) return true;
    if (ing.aliases?.some(a => a.toLowerCase().includes(q))) return true;
    return false;
}

/** Returns true if `query` matches a recipe by name, description, or ingredients */
function recipeMatches(recipe, query) {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    if (recipe.name.toLowerCase().includes(q)) return true;
    if (recipe.description?.toLowerCase().includes(q)) return true;
    const allIds = [...(recipe.ingredientsRequired || []), ...(recipe.ingredientsOptional || [])];
    return allIds.some(id => {
        const ing = INGREDIENTS.find(i => i.id === id);
        return ing?.name.toLowerCase().includes(q);
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
    const query = document.getElementById("resultsSearch")?.value || "";
    let working = [..._lastRanked];

    // Filter
    if (query.trim()) {
        working = working.filter(item => recipeMatches(item.recipe, query));
    }

    // Sort
    if (_sortCriterion === "time") {
        working.sort((a, b) => a.recipe.timeMin - b.recipe.timeMin);
    } else if (_sortCriterion === "name") {
        working.sort((a, b) => a.recipe.name.localeCompare(b.recipe.name, "es"));
    }
    // default: score (already sorted from rankRecipes)

    renderRankedResults(working, query.trim());
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

const _browserState = { search: "", family: "", maxTime: 0 };

const FAMILY_LABELS = {
    pollo: "Pollo", frijol: "Frijol", nopal: "Nopal", huevo: "Huevo",
    verduras: "Verduras", pescado: "Pescado", res: "Res", cerdo: "Cerdo",
    tofu: "Tofu", elote: "Elote", pasta: "Pasta", postres: "Postres",
    leguminosas: "Leguminosas", cereales: "Cereales", milpa: "Milpa",
    atun: "Atún", atun_fresco: "Atún fresco", pescado_blanco: "Pez blanco",
    pescados: "Pescados", queso: "Queso", maiz: "Maíz", miso: "Miso"
};

function openRecipesBrowserModal() {
    const modal = document.getElementById("recipesBrowserModal");
    modal.classList.remove("hidden");
    _buildFamilyFilterChips();
    _renderRecipesBrowser();
    requestAnimationFrame(() => {
        document.getElementById("recipesBrowserSearch")?.focus();
    });
    document.body.style.overflow = "hidden";
}

function closeRecipesBrowserModal() {
    document.getElementById("recipesBrowserModal").classList.add("hidden");
    document.getElementById("recipeDetailPanel").classList.add("hidden");
    _browserState.search = "";
    _browserState.family = "";
    _browserState.maxTime = 0;
    const input = document.getElementById("recipesBrowserSearch");
    if (input) input.value = "";
    document.body.style.overflow = "";
}

function _buildFamilyFilterChips() {
    const container = document.getElementById("recipesFamilyFilter");
    if (!container || container.children.length > 0) return;

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
            return r.name.toLowerCase().includes(q) ||
                   r.description?.toLowerCase().includes(q) ||
                   r.family?.toLowerCase().includes(q);
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
        card.className = "recipe-browser-card";
        card.setAttribute("aria-label", `Ver detalle de ${recipe.name}`);
        card.innerHTML = `
            <div class="rbc-top">
                <span class="rbc-name">${escapeHtml(recipe.name)}</span>
                <span class="rbc-arrow material-symbols-outlined" aria-hidden="true">chevron_right</span>
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
                <span class="rbc-badge">
                    <span class="material-symbols-outlined" aria-hidden="true">flatware</span>
                    ${escapeHtml(recipe.format || "")}
                </span>
                ${recipe.lowFriction ? `<span class="rbc-badge"><span class="material-symbols-outlined" aria-hidden="true">bolt</span>Fácil</span>` : ""}
            </div>
            <p class="rbc-desc">${escapeHtml(recipe.description || "")}</p>
        `;
        card.addEventListener("click", () => openRecipeDetail(recipe.id));
        box.appendChild(card);
    });
}

function openRecipeDetail(recipeId) {
    const recipe = RECIPES.find(r => r.id === recipeId);
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

    const effortLabel = { bajo: "Esfuerzo bajo", medio: "Esfuerzo medio", alto: "Esfuerzo alto" };
    const mealTypeLabel = { comida: "Comida", desayuno: "Desayuno", cena: "Cena", colacion: "Colación" };

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

    panel.classList.remove("hidden");
}

function closeRecipeDetail() {
    document.getElementById("recipeDetailPanel").classList.add("hidden");
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
            clearTimeout(_globalDebounceTimer);
            _globalDebounceTimer = setTimeout(() => searchAll(globalInput.value), 150);
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

    const resSearch = document.getElementById("resultsSearch");
    const resClear = document.getElementById("resultsSearchClear");

    if (resSearch) {
        resSearch.addEventListener("input", () => {
            resClear?.classList.toggle("hidden", !resSearch.value);
            clearTimeout(_inventoryDebounceTimer);
            _inventoryDebounceTimer = setTimeout(() => applySortAndFilter(), 150);
        });
    }

    if (resClear) {
        resClear.addEventListener("click", () => {
            resSearch.value = "";
            resClear.classList.add("hidden");
            applySortAndFilter();
            resSearch.focus();
        });
    }

    // ── Recipe Browser Modal ────────────────────────────────────
    document.getElementById("browseAllRecipesBtn")?.addEventListener("click", openRecipesBrowserModal);

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
            clearTimeout(_inventoryDebounceTimer);
            _inventoryDebounceTimer = setTimeout(() => _renderRecipesBrowser(), 150);
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

init();

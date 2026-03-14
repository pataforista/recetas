/**
 * VirtualList – Performance-optimized list rendering
 *
 * Renders only visible items when scrolling through large lists (100+).
 * Dramatically improves performance for recipe results, eliminating layout thrashing.
 *
 * Usage:
 *   const vList = new VirtualList(containerEl, itemHeight);
 *   vList.setItems(recipes);
 *   vList.onScroll(scrollTop);  // Call from scroll event
 */

export class VirtualList {
    constructor(containerEl, itemHeight = 300) {
        this.container = containerEl;
        this.itemHeight = itemHeight;
        this.items = [];
        this.visibleRange = { start: 0, end: 0 };
        this.viewport = null;
        this.spacer = null;
        this.contentWrapper = null;

        this.setupDOM();
    }

    /**
     * Setup container structure for virtual scrolling
     */
    setupDOM() {
        // Create spacer that takes up full list height
        this.spacer = document.createElement("div");
        this.spacer.style.height = "0px";

        // Create content wrapper for visible items
        this.contentWrapper = document.createElement("div");
        this.contentWrapper.className = "virtual-list-content";
        this.contentWrapper.style.position = "relative";
        this.contentWrapper.style.width = "100%";

        this.container.innerHTML = "";
        this.container.appendChild(this.spacer);
        this.container.appendChild(this.contentWrapper);

        // Setup scroll listener
        this.container.addEventListener("scroll", (e) => {
            this.onScroll(e.target.scrollTop);
        });
    }

    /**
     * Set items and update spacer height
     */
    setItems(items) {
        this.items = items;
        const totalHeight = items.length * this.itemHeight;
        this.spacer.style.height = totalHeight + "px";

        // Initial render
        this.onScroll(this.container.scrollTop);
    }

    /**
     * Handle scroll event: calculate visible range and re-render
     */
    onScroll(scrollTop) {
        const viewportHeight = this.container.clientHeight;
        const bufferItems = 3; // Render extra items above/below viewport for smoothness

        const start = Math.max(0, Math.floor(scrollTop / this.itemHeight) - bufferItems);
        const end = Math.min(
            this.items.length,
            Math.ceil((scrollTop + viewportHeight) / this.itemHeight) + bufferItems
        );

        // Only re-render if range changed
        if (start === this.visibleRange.start && end === this.visibleRange.end) {
            return;
        }

        this.visibleRange = { start, end };
        this.renderRange(start, end);
    }

    /**
     * Render only items in visible range
     */
    renderRange(start, end) {
        const fragment = document.createDocumentFragment();

        for (let i = start; i < end; i++) {
            const item = this.items[i];
            const itemEl = this.createItemElement(item);

            // Position item absolutely with transform for performance
            itemEl.style.position = "absolute";
            itemEl.style.top = (i * this.itemHeight) + "px";
            itemEl.style.width = "100%";
            itemEl.style.height = this.itemHeight + "px";

            fragment.appendChild(itemEl);
        }

        this.contentWrapper.innerHTML = "";
        this.contentWrapper.appendChild(fragment);
    }

    /**
     * Override this to customize item rendering
     */
    createItemElement(item) {
        const el = document.createElement("div");
        el.textContent = JSON.stringify(item);
        return el;
    }

    /**
     * Cleanup
     */
    destroy() {
        if (this.container) {
            this.container.removeEventListener("scroll", this.onScroll);
        }
    }
}

/**
 * Creates a VirtualList specifically for recipe cards
 * Integrates with existing createRecipeCard() function
 */
export class RecipeVirtualList extends VirtualList {
    constructor(containerEl, createRecipeCardFn) {
        super(containerEl, 250); // Recipe cards are ~250px tall
        this.createRecipeCardFn = createRecipeCardFn;
    }

    createItemElement(item) {
        return this.createRecipeCardFn(item);
    }
}

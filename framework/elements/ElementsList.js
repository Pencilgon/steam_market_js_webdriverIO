import Logger from '../utils/Logger.js';

/**
 * ElementsList class
 * Provides functionality to work with a list of elements of the same type
 */
export class ElementsList {
    /**
     * @param {class} elementType - Class of elements (e.g., Button, Label)
     * @param {string} locator - Locator to find the list of elements
     * @param {string} name - Descriptive name for logging
     */
    constructor(elementType, locator, name) {
        this.elementType = elementType;
        this.locator = locator;
        this.name = name;
    }

    /**
     * Returns a single representative element state (used for waiting)
     */
    state() {
        return $(this.locator);
    }

    /**
     * Get list of elements on the page as wrapped objects
     * Ensures each element is unique (no duplicate first elements)
     * @returns {Promise<Array>} Array of wrapped element instances
     */
    async getListOfElements() {
        Logger.info(`Get all elements "${this.name}"`);

        // Wait until at least one element exists
        await this.state().waitForExist();

        // Get all elements using the locator
        const listOfElements = await $$(this.locator);
        Logger.info(`Found '${listOfElements.length}' elements for "${this.name}"`);

        const elements = [];

        // Use index-based locators to ensure unique element references
        for (let i = 1; i <= listOfElements.length; i++) {
            const indexedLocator = `(${this.locator})[${i}]`;
            const element = new this.elementType(indexedLocator, `${this.name} #${i}`);
            elements.push(element);
        }

        Logger.info(`Created ${elements.length} wrapped elements for "${this.name}"`);
        return elements;
    }
}

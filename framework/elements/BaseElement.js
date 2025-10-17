import ElementType from '../constants/ElementType.js';
import Logger from '../utils/Logger.js';
import ElementStateProvider from './helper/StateProvider.js';

export default class BaseElement {
    constructor(locator, name) {
        this.locator = locator;
        this.name = name;
        this.type = ElementType.ELEMENT;
    }

    getLocator = () => typeof this.locator === 'string' ? this.locator : this.locator.selector;

    log = () => `${this.type} - "${this.name}" - by locator "${this.getLocator()}":\n\t`;

    state = () => new ElementStateProvider(this._get$(), this.name);

    _get$() {
        return typeof this.locator === 'string' ? $(this.locator) : this.locator;
    }

    async findChild(childType, childSelector, childName, options = {}) {
        Logger.info(`${this.log()}Find child element "${childName}" by locator: "${childSelector}"`);
        await this.state().waitForExist();
        const element = await this._get$().$(`.${childSelector}`);
        return new childType(element, childName, options);
    }

    async findAll(childType, childSelector, childName, options = {}) {
        Logger.info(`${this.log()}Find all child elements named "${childName}" by locator: "${childSelector}"`);

        await this.state().waitForExist();
        const listOfElements = await this._get$().$$(`.${childSelector}`);
        Logger.info(`${this.log()}Found '${listOfElements.length}' child elements`);

        return listOfElements.map((el, index) => new childType(el, `${childName} #${index}`, options));
    }

    async _click({ byJS } = { byJS: false }) {
        const logMsg = byJS ? ' by JS executing' : '';
        Logger.info(`${this.log()}Click at element${logMsg}`);
        await this.state().waitForExist();
        await this.state().waitForClickable();

        const element = await this._get$();
        if (byJS) {
            // ✅ Call browser.executeScript dynamically (no import)
            await browser.execute('arguments[0].click();', element);
        } else {
            await element.click();
        }
    }

    async click() {
        return this._click({ byJS: false });
    }

    async clickByJS() {
        return this._click({ byJS: true });
    }

    async moveTo() {
        Logger.info(`${this.log()}Move to element`);
        await this.state().waitForExist();
        await this.state().waitForDisplayed();

        const element = await this._get$();
        return element.moveTo();
    }

    async scrollIntoView(scrollIntoViewOptions = { block: 'center' }) {
        Logger.info(`${this.log()}Scroll to element`);
        await this.state().waitForExist();
        await this.state().waitForDisplayed();

        const element = await this._get$();
        return element.scrollIntoView(scrollIntoViewOptions);
    }

    async dragAndDropToPosition(target) {
        Logger.info(`${this.log()}Drag and drop element to position {x: ${target.x}, y:${target.y}}`);
        await this.state().waitForExist();
        await this.state().waitForDisplayed();

        const element = await this._get$();
        return element.dragAndDrop(target);
    }

    async dragAndDropToElement(targetElement) {
        Logger.info(`${this.log()}Drag and drop element to another element "${targetElement.name}"`);
        await this.state().waitForExist();
        await this.state().waitForDisplayed();

        await targetElement.state().waitForExist();
        await targetElement.state().waitForDisplayed();

        const element = await this._get$();
        const target = await targetElement._get$();
        return element.dragAndDrop(target);
    }

    async getText() {
        Logger.info(`${this.log()}Get text from element`);
        await this.state().waitForExist();

        const element = await this._get$();
        const text = await element.getText();
        Logger.info(`Received text: "${text}"`);
        return text;
    }

    async getAttribute(attributeName) {
        Logger.info(`${this.log()}Get attribute "${attributeName}" from element`);
        await this.state().waitForExist();

        const element = await this._get$();
        const attr = await element.getAttribute(attributeName);
        Logger.info(`Received attribute "${attributeName}" value: "${attr}"`);
        return attr;
    }

    async getCSSProperty(property) {
        Logger.info(`${this.log()}Get CSS property "${property}" from element`);
        await this.state().waitForExist();

        const element = await this._get$();
        const { value } = await element.getCSSProperty(property);
        Logger.info(`Received CSS property "${property}" = "${value}"`);
        return value;
    }

    async getHTML() {
        Logger.info(`${this.log()}Get HTML from element`);
        await this.state().waitForExist();

        const element = await this._get$();
        const html = await element.getHTML();
        Logger.info(`Received html: "${html}"`);
        return html;
    }
}

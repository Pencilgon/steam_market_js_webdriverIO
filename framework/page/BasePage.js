import Timeouts from '../constants/Timeouts.js';
import Logger from '../utils/Logger.js';

export default class BasePage {
  #uniqueElement;

  constructor(uniqueElement, name) {
    this.#uniqueElement = uniqueElement;
    this.name = name;
  }

  /**
   * Get name of the page
   * @returns {string} Name of the page
   */
  getPageName() {
    return this.name;
  }

  /**
   * Check if the form is opened, with 'pageLoadTime' timeout
   * @returns {Promise<boolean>} true if opened else false
   */
  async isPageOpened() {
    Logger.info(`Waiting for page "${this.name}" to load`);
    const isOpened = await this.#uniqueElement.state().waitForDisplayed({
      timeout: Timeouts.pageLoadTime
    });
    Logger.info(`Page "${this.name}" is opened - "${isOpened}"`);
    return isOpened;
  }
}

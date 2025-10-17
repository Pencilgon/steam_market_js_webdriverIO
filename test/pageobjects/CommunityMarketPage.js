import { Button } from '../../framework/elements/Button.js';
import { Label } from '../../framework/elements/Label.js';
import { ElementsList } from '../../framework/elements/ElementsList.js';
import BasePage from '../../framework/page/BasePage.js';

class CommunityMarketPage extends BasePage {
  buttonWithText = (text) => new Button(`//span[contains(text(),'${text}')]`, `${text} Button`);

  resultsTable = new ElementsList(Button, "//a[@class='market_listing_row_link']", 'Results Table');

  listOfTagsOfSearchResults = (text) => new ElementsList(Button, `//*[contains(text(),'${text}')]/following-sibling::div/div`, `${text} Tags`);

  buttonWithColumnName = (columnName) => new Button(`//div[@data-sorttype='${columnName}']`, `${columnName} Button`);

  sortArrow = (columnName) => new Label(`//div[@data-sorttype='${columnName}']/span[@class='market_sort_arrow']`, `${columnName} Sort Arrow`);

  listOfPrices = new ElementsList(Label, "//span[@class='normal_price']", 'List of Prices');

  searchResultsTableContainer = new Label("//div[contains(@class,'market_listing_table_active')]", 'Search Results Table');

  constructor() {
    super(new Label("//span[@class='market_title_text' and text()='Community Market']", 'Page Header'), 'Community Market Page');
  }

  async clickButtonWithText(text) {
    await this.buttonWithText(text).click();
  }

  async getResultsTable() {
    return this.resultsTable.getListOfElements();
  }

  async getTagsOfSearchResults(text) {
    return this.listOfTagsOfSearchResults(text).getListOfElements();
  }

  async getPricesOfResults() {
    const priceElements = await this.listOfPrices.getListOfElements();

    const prices = await Promise.all(priceElements.map(async (el) => {
      const text = await el.getText();
      const cleaned = text.replace(/[^0-9.]/g, '');
      const price = parseFloat(cleaned);
      return isNaN(price) ? null : price;
    }));

    return prices.filter((price) => price !== null);
  }

  async setSortOrderForTheColumn(columnName, order) {
    const arrow = this.sortArrow(columnName);

    const getState = async () => {
      const text = await arrow.getText();
      if (!text || text.trim() === '') return 'none';
      return text.includes('▲') ? 'ascending' : 'descending';
    };

    let current = await getState();

    while (current !== order) {
      const button = this.buttonWithColumnName(columnName);
      await button.click();

      await browser.waitUntil(async () => await this.searchResultsTableContainer._get$().isDisplayed(), {
        timeoutMsg: 'Table container did not reappear (indicating table did not load)',
      });

      current = await getState();
    }
  }
}

export default new CommunityMarketPage();

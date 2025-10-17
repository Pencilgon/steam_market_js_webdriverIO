import { Button } from '../../framework/elements/Button.js';
import { Label } from '../../framework/elements/Label.js';
import { ElementsList } from '../../framework/elements/ElementsList.js';
import BasePage from '../../framework/page/BasePage.js';

class CommunityMarketPage extends BasePage {
  buttonWithText = (text) => new Button(`//span[contains(text(),'${text}')]`, `${text} Button`);

  resultsTable = new ElementsList(Button, "//a[@class='market_listing_row_link']", 'Results Table');

  listOfTagsOfSearchResults = (text) => new ElementsList(Button, `//h2[contains(text(),'${text}')]/following-sibling::div/div`, `${text} Tags`);

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

    return Promise.all(priceElements.map(async (el) => {
      const text = await el.getText();
      const cleaned = text.replace(/[^0-9.,]/g, '').replace(',', '');
      return parseFloat(cleaned);
    }));
  }

  async setSortOrderForTheColumn(columnName, desiredOrder) {
    const arrow = this.sortArrow(columnName);
    const button = this.buttonWithColumnName(columnName);

    const getState = async () => {
      const text = (await arrow.getText()).trim();
      return text.includes('▲') ? 'ascending' : 'descending';
    };

    await browser.waitUntil(async () => {
      const currentOrder = await getState();

      if (currentOrder !== desiredOrder) {
        await button.click();

        await this.searchResultsTableContainer.state().waitForDisplayed();

        return false;
      }

      return true;
    });
  }
}

export default new CommunityMarketPage();

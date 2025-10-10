import { Button } from "../../framework/elements/Button.js";
import { Label } from "../../framework/elements/Label.js";
import { ElementsList } from "../../framework/elements/ElementsList.js";
import BasePage from "../../framework/page/BasePage.js";

class CommunityMarketPage extends BasePage {
    buttonWithText = (text) => new Button(`//*[contains(text(),'${text}')]`, `${text} Button`);
    resultsTable = new ElementsList(Button, "//a[@class='market_listing_row_link']", "Results Table");
    listOfTagsOfSearchResults = (text) => new ElementsList(Button, `//*[contains(text(),'${text}')]/following-sibling::div/div`, `${text} Tags`);
    buttonWithColumnName = (columnName) => new Button(`//div[@data-sorttype='${columnName}']`, `${columnName} Button`);
    sortArrow = (columnName) => new Label(`//div[@data-sorttype='${columnName}']/span[@class='market_sort_arrow']`, `${columnName} Sort Arrow`);
    listOfPrices = new ElementsList(Label, "//span[@class='normal_price']", "List of Prices");

    constructor() {
        super(new Label("//span[@class='market_title_text' and text()='Community Market']", "Page Header"), "Community Market Page");
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
        return this.listOfPrices.getListOfElements();
    }

    async setSortOrderForTheColumn(columnName, order) {
        const arrow = this.sortArrow(columnName);

        const getState = async () => {
            const text = await arrow.getText();
            if (!text || text.trim() === "") return "none";
            return text.includes("▲") ? "ascending" : "descending";
        };

        const current = await getState();

        const clicksNeeded =
            order === "ascending"
                ? (current === "ascending" ? 0 : 1)
                : (current === "descending" ? 0 : (current === "none" ? 2 : 1));

        for (let i = 0; i < clicksNeeded; i++) {
            await this.buttonWithColumnName(columnName).click();
            await browser.pause(5000);
        }
    }
}

export default new CommunityMarketPage();

import { ElementsList } from "../../framework/elements/ElementsList.js";
import { Button } from "../../framework/elements/Button.js";
import BasePage from "../../framework/page/BasePage.js";
import { Label } from "../../framework/elements/Label.js";

export class CommunityMarketPage extends BasePage{
    resultsTable = new ElementsList(Button, "//a[@class='market_listing_row_link']", "Results table");
    priceManipulationButton = new Button("//div[@class='market_listing_table_header']//div[contains(@class,'market_listing_their_price')]", "Price Manipulation Button");
    listOfPrices = new ElementsList(Label, "//*[@class='normal_price']", "List of prices");

    constructor(){
        super(new Button("//div[contains(@class,'sell')]", "Sell an item button"), "Community Market Page");
    }

    async clickButtonWithText(text){
        let showAdvancedOptionsButton = new Button(`//*[contains(text(),'${text}')]/..`, `${text} Button`);
        await showAdvancedOptionsButton.click();
    }

    async getResultsTable(){
        return await this.resultsTable.getListOfElements();
    }

    async getTagsOfSearchResults(text){
        let listOfTagsOfSearchResults = new ElementsList(Button, `//*[@class='market_search_results_title' and contains(text(),'${text}')]//following-sibling::div/div`, `${text}`);
        return await listOfTagsOfSearchResults.getListOfElements();
    }

    async clickPriceButton(){
        await this.priceManipulationButton.click();
    }

    async getPricesOfResults(){
        return await this.listOfPrices.getListOfElements();
    }
}
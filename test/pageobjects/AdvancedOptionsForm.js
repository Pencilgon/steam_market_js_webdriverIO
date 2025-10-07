import BasePage from "../../framework/page/BasePage.js";
import Browser from "../../framework/browser/Browser.js";
import { Button } from "../../framework/elements/Button.js";
import { Input } from "../../framework/elements/Input.js";

export class AdvancedOptionsForm extends BasePage{
    filterByGameField = new Input("//div[@role='listbox']//input", "Filter By Game Field");
    selectAHeroButton = new Button("//div[contains(@class,'_16FZUyKiH6Z7trthKypJwf')]/*[1]", "Select a Hero Button");
    filterByHeroField = new Input("//div[contains(@class,'_1PUg8GjnBeN7rBK-dcyQFl')]//input", "Filter By Hero Field");
    selectARarityButton = new Button("//div[contains(@class,'_16FZUyKiH6Z7trthKypJwf')]/*[3]", "Select a Rarity Button");

    constructor(){
        let selectAGameButton = new Button("//div[contains(@class,'_1dhvtWTnQHytZWk5i-f-We')]", "Select a Game Button");
        super(selectAGameButton, "Advanced Search Form");
        this.selectAGameButton = selectAGameButton;
    }

    async clickSelectAGameButton(){
        await this.selectAGameButton.click();
    }

    async typeIntoFilterByGameField(gameName){
        await this.filterByGameField.typeTextWithClear(gameName);
        await Browser.pressKeys('Enter');
    }

    async clickSelectAHeroButton(){
        await this.selectAHeroButton.click();
    }

    async typeIntoFilterByHeroField(heroName){
        await this.filterByHeroField.typeTextWithClear(heroName);
        await Browser.pressKeys('Enter');
    }

    async clickSelectARarityButton(){
        await this.selectARarityButton.click();
    }

    async clickSelectARarityFromOptions(rarity){
        let selectRarityFromOptions = new Button(`//div[@role='option']/*[text()='${rarity}']/..`, "Select a Rarity From the Options");
        await selectRarityFromOptions.click();
    }

    async clickButtonWithText(text){
        let searchButton = new Button(`//button[text()='${text}']`, `${text} Buttom`);
        await searchButton.click();
    }
}
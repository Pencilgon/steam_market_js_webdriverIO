import allure from '@wdio/allure-reporter';
import Browser from "../../framework/browser/Browser.js";
import BasePage from "../../framework/page/BasePage.js";
import { Button } from "../../framework/elements/Button.js";
import { Input } from "../../framework/elements/Input.js";
import { Label } from "../../framework/elements/Label.js";

class AdvancedOptionsForm extends BasePage {
    buttonContainsText = (text) => new Button(`//span[contains(text(),'${text}')]/..`, `${text} Button`);
    filterField = new Input("//input[contains(@placeholder,'Filter')]", "Filter Field");
    buttonWithText = (text) => new Button(`//*[text()='${text}']`, `${text} Button`);
    selectFromOptions = (text) => new Button(`//div[@role='checkbox']/following-sibling::div[text()='${text}']`, `Select ${text} from options`);

    constructor() {
        super(
            new Label("//*[contains(text(),'Search Community Market')]", "Form Header"),
            "Advanced Search Form"
        );
    }

    async clickButtonContainsText(text) {
        allure.startStep(`Click button containing text: ${text}`);
        await this.buttonContainsText(text).click();
        allure.endStep();
    }

    async clickButtonWithText(text) {
        allure.startStep(`Click button with exact text: ${text}`);
        await this.buttonWithText(text).click();
        allure.endStep();
    }

    async typeIntoFilter(text) {
        allure.startStep(`Type into filter: ${text}`);
        await this.filterField.typeTextWithClear(text);
        await Browser.pressKeys('Enter');
        allure.endStep();
    }

    async clickElementFromOptions(text) {
        allure.startStep(`Select option: ${text}`);
        await this.selectFromOptions(text).click();
        allure.endStep();
    }
}

export default new AdvancedOptionsForm();

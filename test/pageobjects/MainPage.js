import BasePage from "../../framework/page/BasePage.js";
import { Button } from "../../framework/elements/Button.js";
import { Input } from "../../framework/elements/Input.js";

export class MainPage extends BasePage{
    communityButtonInNavBar = new Button("//div[@class='supernav_container']/a[contains(@data-tooltip-content,'Community')]", "Community Button in the Navigation Button");
    communityMarketButton = new Button("//div[@class='supernav_container']//div[@data-submenuid='Community']/*[4]", "Link to the Community Market")
    constructor(){
        super(new Input("//input[@class='_2tlUAG6WNyYFlk9caIiLj5']", "Search Field TextBox"), "Steam Main Page");
    }

    async clickCommunityMarketLink(){
        this.communityButtonInNavBar.moveTo();
        await this.communityMarketButton.click();
    }
}
import { Label } from "../../framework/elements/Label.js";
import BasePage from "../../framework/page/BasePage.js";

export class ItemPage extends BasePage{
    gameName = new Label("//div[@id='largeiteminfo_game_name']", "Name of the Game");
    itemType = new Label("//div[@id='largeiteminfo_item_type']", "Item info");
    itemIsUsedBy = new Label("//div[contains(text(),'Used By')]", "Item is Used By");

    constructor(){
        super(new Label("//div[@id='largeiteminfo']", "Item info"), "Item Page");
    }

    async getGameName(){
        return await this.gameName.getText();
    }

    async getItemType(){
        return await this.itemType.getText();
    }

    async getHeroName(){
        return await this.itemIsUsedBy.getText();
    }
}
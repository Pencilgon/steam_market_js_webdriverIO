import BasePage from '../../framework/page/BasePage.js';
import { Label } from '../../framework/elements/Label.js';

class ItemPage extends BasePage {
  gameName = new Label("//div[@id='largeiteminfo_game_name']", 'Name of the Game');

  itemType = new Label("//div[@id='largeiteminfo_item_type']", 'Item info');

  itemIsUsedBy = new Label("//div[contains(text(),'Used By')]", 'Item is Used By');

  constructor() {
    super(new Label("//div[@id='largeiteminfo']", 'Item info'), 'Item Page');
  }

  async getGameName() {
    return this.gameName.getText();
  }

  async getItemType() {
    return this.itemType.getText();
  }

  async getHeroName() {
    return this.itemIsUsedBy.getText();
  }
}

export default new ItemPage();

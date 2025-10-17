import BasePage from '../../framework/page/BasePage.js';
import { Button } from '../../framework/elements/Button.js';
import { Input } from '../../framework/elements/Input.js';

class MainPage extends BasePage {
  navigationBarLinkWithText = (text) => new Button(`//div[@role='navigation']/a[contains(@class,'menuitem') and contains(text(),'${text}')]`, `${text} Link in the Navigation Bar`);

  dropdownItemLinkWithText = (navLink, text) => new Button(`//div[@data-submenuid='${navLink}' and not(contains(@style, 'display: none'))]/a[contains(text(),'${text}')]`, `Link to the ${text} inside Dropdown under ${navLink}`);

  constructor() {
    super(new Input("//h2[@id='home_featured_and_recommended']", 'Featured and Recommended'), 'Steam Main Page');
  }

  async clickToTheLink(navLink, dropdownItemName) {
    await this.navigationBarLinkWithText(navLink.toUpperCase()).moveTo();
    await this.dropdownItemLinkWithText(navLink, dropdownItemName).click();
  }
}

export default new MainPage();

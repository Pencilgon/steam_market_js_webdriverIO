import Browser from '../../framework/browser/Browser.js';
import BasePage from '../../framework/page/BasePage.js';
import { Button } from '../../framework/elements/Button.js';
import { Input } from '../../framework/elements/Input.js';
import { Label } from '../../framework/elements/Label.js';

class AdvancedOptionsForm extends BasePage {
  buttonWithName = (text) => new Button(`//span[contains(text(),'${text}')]/..`, `${text} Button`);

  filterField = new Input("//input[contains(@placeholder,'Filter')]", 'Filter Field');

  optionButtonWithText = (text) => new Button(`//span[text()='${text}']`, `${text} Button`);

  selectFromOptions = (text) => new Button(`//div[@role='checkbox']/following-sibling::div[text()='${text}']`, `Select ${text} from options`);

  searchButton = new Button("//button[@type='submit']", "Search Button");

  constructor() {
    super(
      new Label("//h1[contains(text(),'Search Community Market')]", 'Form Header'),
      'Advanced Search Form',
    );
  }

  async clickButtonWithName(text) {
    await this.buttonWithName(text).click();
  }

  async clickOptionButtonWithText(text) {
    await this.optionButtonWithText(text).click();
  }

  async typeIntoFilter(text) {
    await this.filterField.typeTextWithClear(text);
    await Browser.pressKeys('Enter');
  }

  async clickElementFromOptions(text) {
    await this.selectFromOptions(text).click();
  }

  async clickSearchButton(){
    await this.searchButton.click();
  }
}

export default new AdvancedOptionsForm();

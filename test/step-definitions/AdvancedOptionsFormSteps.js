import allure from '@wdio/allure-reporter';
import { When } from '@wdio/cucumber-framework';
import { assert } from 'chai';
import advancedOptionsForm from '../pageobjects/AdvancedOptionsForm.js';

When(/^The advanced options window is displayed$/, async () => {
  allure.startStep('Verify that the advanced options window is displayed');
  const isOpened = await advancedOptionsForm.isPageOpened();
  assert.isTrue(isOpened, 'Advanced Options Form is not opened');
  allure.endStep();
});

When(/^I click "([^"]*)" button and type "([^"]*)"$/, async function (buttonName, text) {
  allure.startStep(`Click "${buttonName}" button and type "${text}"`);
  await advancedOptionsForm.clickButtonWithName(buttonName);
  await advancedOptionsForm.typeIntoFilter(text);

  this.selectedFilters ??= {};
  this.selectedFilters.game = text;

  allure.endStep();
});

When(/^I select "([^"]*)" as "([^"]*)"$/, async function (buttonName, text) {
  allure.startStep(`Select "${buttonName}" as "${text}"`);
  await advancedOptionsForm.clickOptionButtonWithText(buttonName);
  await advancedOptionsForm.clickElementFromOptions(text);
  await advancedOptionsForm.clickOptionButtonWithText(buttonName);

  this.selectedFilters ??= {};
  this.selectedFilters[buttonName.toLowerCase()] = text;

  allure.endStep();
});

When(/^I click "([^"]*)" in the advanced options$/, async (text) => {
  allure.startStep(`Click "${text}" in the advanced options`);
  await advancedOptionsForm.clickSearchButton(text);
  allure.endStep();
});

import { Given, When } from '@wdio/cucumber-framework';
import { assert } from 'chai';
import allure from '@wdio/allure-reporter';
import { config } from '../../configs/chrome.cucumber.conf.js';
import Browser from '../../framework/browser/Browser.js';
import mainPage from '../pageobjects/MainPage.js';

Given(/^I open the Steam store$/, async () => {
  allure.startStep('Open Steam store');
  await Browser.openUrl(config.baseUrl);
  allure.endStep();
});

When(/^The main page is opened$/, async () => {
  allure.startStep('Verify main page is opened');
  assert.isTrue(await mainPage.isPageOpened(), 'Main Page is not opened');
  allure.endStep();
});

When(/^I open the "([^"]*)" page from the "([^"]*)" dropdown$/, async (dropdownItemName, navLink) => {
  allure.startStep(`Navigate to ${dropdownItemName} from the ${navLink}`);
  await mainPage.clickToTheLink(navLink, dropdownItemName);
});

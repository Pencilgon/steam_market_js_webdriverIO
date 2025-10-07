import { Given, When } from '@wdio/cucumber-framework';
import { MainPage } from '../pageobjects/MainPage.js';
import Browser from '../../framework/browser/Browser.js';
import { assert } from 'chai';
import allure from '@wdio/allure-reporter';

let mainPage = new MainPage();

Given(/^I open the Steam store$/, async () => {
    allure.startStep('Open Steam store');
    await Browser.openUrl("https://store.steampowered.com/");
    allure.endStep();
});

When(/^the main page is opened$/, async () => {
    allure.startStep('Verify main page is opened');
    assert.isTrue(await mainPage.isPageOpened(), "Main Page is not opened");
    allure.endStep();
});

When(/^I navigate to the Community Market$/, async () => {
    allure.startStep('Navigate to Community Market');
    await mainPage.clickCommunityMarketLink();
    allure.endStep();
});

import { When } from '@wdio/cucumber-framework';
import { assert } from "chai";
import { AdvancedOptionsForm } from '../pageobjects/AdvancedOptionsForm.js';
import allure from '@wdio/allure-reporter';

let advancedOptionsForm = new AdvancedOptionsForm();

When(/^the advanced options window is displayed$/, async () => {
    allure.startStep('Verify advanced options window is displayed');
    await assert.isTrue(await advancedOptionsForm.isPageOpened(), "Advanced Options Form is not opened");
    allure.endStep();
});

When(/^I select game "([^"]*)"$/, async function (gameName) {
    allure.startStep(`Select game: ${gameName}`);
    await advancedOptionsForm.clickSelectAGameButton();
    await advancedOptionsForm.typeIntoFilterByGameField(gameName);
    this.selectedFilters = this.selectedFilters || {};
    this.selectedFilters.game = gameName;
    allure.endStep();
});

When(/^I select hero "([^"]*)"$/, async function (heroName) {
    allure.startStep(`Select hero: ${heroName}`);
    await advancedOptionsForm.clickSelectAHeroButton();
    await advancedOptionsForm.typeIntoFilterByHeroField(heroName);
    this.selectedFilters = this.selectedFilters || {};
    this.selectedFilters.hero = heroName;
    allure.endStep();
});

When(/^I select rarity "([^"]*)"$/, async function (rarity) {
    allure.startStep(`Select rarity: ${rarity}`);
    await advancedOptionsForm.clickSelectARarityButton();
    await advancedOptionsForm.clickSelectARarityFromOptions(rarity);
    this.selectedFilters = this.selectedFilters || {};
    this.selectedFilters.rarity = rarity;
    allure.endStep();
});

When(/^I click "([^"]*)" in the advanced options$/, async (text) => {
    allure.startStep(`Click "${text}" in advanced options`);
    await advancedOptionsForm.clickButtonWithText(text);
    allure.endStep();
});

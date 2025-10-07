import { When, Then } from '@wdio/cucumber-framework';
import { CommunityMarketPage } from '../pageobjects/CommunityMarketPage.js';
import { assert } from 'chai';
import allure from '@wdio/allure-reporter';

let communityMarketPage = new CommunityMarketPage();

Then(/^the Community Market page is opened$/, async () => {
    allure.startStep('Verify Community Market page is opened');
    assert.isTrue(await communityMarketPage.isPageOpened(), "Community market page is not opened");
    allure.endStep();
});

When(/^I click the button "([^"]*)"$/, async (text) => {
    allure.startStep(`Click button with text: ${text}`);
    await communityMarketPage.clickButtonWithText(text);
    allure.endStep();
});

Then(/^the results table is loaded$/, async () => {
    allure.startStep('Verify results table is loaded');
    let resultsTable = await communityMarketPage.getResultsTable();
    await expect(resultsTable.length).toBeGreaterThan(0);
    allure.endStep();
});

Then(/^correct tags are displayed under "([^"]*)"$/, async function (text) {
    allure.startStep(`Verify tags under: ${text}`);
    const displayedTags = await communityMarketPage.getTagsOfSearchResults(text) || [];
    const tagTexts = await Promise.all(displayedTags.map(tag => tag.getText()));

    for (const value of Object.values(this.selectedFilters)) {
        assert.include(tagTexts, value, `There is no tag ${value}`);
    }
    allure.endStep();
});

When(/^I click the first item in the list$/, async () => {
    allure.startStep('Click first item in results list');
    let resultsTable = await communityMarketPage.getResultsTable();
    await resultsTable[0].click();
    allure.endStep();
});

When(/^I sort items by price ascending$/, async () => {
    allure.startStep('Sort items by ascending price');
    await communityMarketPage.clickPriceButton();
    await browser.pause(2000);
    allure.endStep();
});

Then(/^items are sorted in ascending price order$/, async () => {
    allure.startStep('Verify ascending price order');
    let pricesOfResults = await communityMarketPage.getPricesOfResults();
    let pricesText = [];

    for (const priceButton of pricesOfResults) {
        const text = await priceButton.getText();
        pricesText.push(text);
    }

    pricesText.shift();

    let priceValues = pricesText.map(price => parseFloat(price.replace('$', '')));

    for (let i = 0; i < priceValues.length - 1; i++) {
        const current = priceValues[i];
        const next = priceValues[i + 1];

        assert.ok(
            current <= next,
            `Prices are not in ascending order at index ${i}: ${current} > ${next}`
        );
    }
    allure.endStep();
});

When(/^I sort items by price descending$/, async () => {
    allure.startStep('Sort items by descending price');
    await communityMarketPage.clickPriceButton();
    await browser.pause(2000);
    allure.endStep();
});

Then(/^items are sorted in descending price order$/, async () => {
    allure.startStep('Verify descending price order');
    let pricesOfResults = await communityMarketPage.getPricesOfResults();
    let pricesText = [];

    for (const priceButton of pricesOfResults) {
        const text = await priceButton.getText();
        pricesText.push(text);
    }

    pricesText.shift();

    let priceValues = pricesText.map(price => parseFloat(price.replace('$', '')));

    for (let i = 0; i < priceValues.length - 1; i++) {
        const current = priceValues[i];
        const next = priceValues[i + 1];

        assert.ok(
            current >= next,
            `Prices are not in descending order at index ${i}: ${current} < ${next}`
        );
    }
    allure.endStep();
});

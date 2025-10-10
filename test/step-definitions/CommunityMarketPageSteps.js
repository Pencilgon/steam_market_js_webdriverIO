import { When, Then } from '@wdio/cucumber-framework';
import { assert } from 'chai';
import allure from '@wdio/allure-reporter';
import communityMarketPage from '../pageobjects/CommunityMarketPage.js';

Then(/^The community market page is opened$/, async () => {
    allure.startStep('Verify Community Market page is opened');
    assert.isTrue(await communityMarketPage.isPageOpened(), 'Community Market page is not opened');
    allure.endStep();
});

When(/^I click the button "([^"]*)"$/, async (text) => {
    allure.startStep(`Click button with text: ${text}`);
    await communityMarketPage.clickButtonWithText(text);
    allure.endStep();
});

Then(/^The results table is loaded$/, async () => {
    allure.startStep('Verify results table is loaded');
    const resultsTable = await communityMarketPage.getResultsTable();
    assert.isAbove(resultsTable.length, 0, 'Expected at least one result in the results table');
    allure.endStep();
});

Then(/^Correct tags are displayed under "([^"]*)"$/, async function (text) {
    allure.startStep(`Verify tags under: ${text}`);
    const displayedTags = await communityMarketPage.getTagsOfSearchResults(text) || [];
    const tagTexts = await Promise.all(displayedTags.map(tag => tag.getText()));

    for (const value of Object.values(this.selectedFilters)) {
        assert.include(tagTexts, value, `Tag "${value}" is missing under ${text}`);
    }

    allure.endStep();
});

When(/^I click the (\d+) item in the list$/, async (number) => {
    allure.startStep(`Click item #${number} in results list`);
    const resultsTable = await communityMarketPage.getResultsTable();
    await resultsTable[number - 1].click();
    allure.endStep();
});

When(/^I sort items by "([^"]*)" in (ascending|descending) order$/, async (columnName, order) => {
    allure.startStep(`Sort items by ${columnName} in ${order} order`);
    await communityMarketPage.setSortOrderForTheColumn(columnName.toLowerCase(), order.toLowerCase());
    allure.endStep();
});

Then(/^Items are sorted in (ascending|descending) order$/, async (order) => {
    allure.startStep(`Verify items are sorted in ${order} order`);

    const priceElements = await communityMarketPage.getPricesOfResults();
    const priceValues = [];

    for (const el of priceElements) {
        const text = await el.getText();
        const cleaned = text.replace(/[^0-9.]/g, '');
        const price = parseFloat(cleaned);
        if (!isNaN(price)) priceValues.push(price);
    }

    const sortedPrices = [...priceValues].sort((a, b) =>
        order === 'ascending' ? a - b : b - a
    );

    assert.deepEqual(priceValues, sortedPrices, `Prices are not in ${order} order`);
    allure.endStep();
});

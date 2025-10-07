import { Then } from "@wdio/cucumber-framework";
import { ItemPage } from "../pageobjects/ItemPage.js";
import { assert } from "chai";
import allure from '@wdio/allure-reporter';

let itemPage = new ItemPage();

Then(/^the item page is opened$/, async () => {
    allure.startStep('Verify item page is opened');
    assert.isTrue(await itemPage.isPageOpened(), "The Item Page is not opened");
    allure.endStep();
});

Then(/^the item info matches the selected filters$/, async () => {
    allure.startStep('Get displayed item information');
    let gameName = await this.getGameName();
    let itemType = await this.getItemType();
    let itemUsedBy = await this.getHeroName();
    allure.endStep();

    allure.startStep('Verify item info matches selected filters');
    let pageValues = [gameName, itemType, itemUsedBy];

    for (const expected of this.selectedFilters) {
        assert.isTrue(pageValues.some(value => value.includes(expected)));
    }
    allure.endStep();
});

import { Then } from '@wdio/cucumber-framework';
import { assert } from 'chai';
import allure from '@wdio/allure-reporter';
import itemPage from '../pageobjects/ItemPage.js';

Then(/^The item page is opened$/, async () => {
  allure.startStep('Verify item page is opened');
  assert.isTrue(await itemPage.isPageOpened(), 'The Item Page is not opened');
  allure.endStep();
});

Then(/^The (game name|item type|hero name) matches the selected filter$/, async function (fieldName) {
  allure.startStep(`Verify ${fieldName} matches the selected filter`);

  const fieldMap = {
    'game name': { method: 'getGameName', key: 'game' },
    'item type': { method: 'getItemType', key: 'rarity' },
    'hero name': { method: 'getHeroName', key: 'hero' },
  };

  const { method, key } = fieldMap[fieldName];
  const actualValue = await itemPage[method]();
  const expectedValue = this.selectedFilters[key];

  assert.include(
    actualValue,
    expectedValue,
    `Expected ${fieldName} to be "${expectedValue}", but got "${actualValue}"`,
  );

  allure.endStep();
});

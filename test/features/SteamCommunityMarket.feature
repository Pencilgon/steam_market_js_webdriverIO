Feature: Steam Community Market search and filtering

  Background:
    Given I open the Steam store
    And the main page is opened
    When I navigate to the Community Market
    Then the Community Market page is opened
    When I click the button "Show advanced options"
    Then the advanced options window is displayed

  Scenario: Filter Dota 2 items by Phantom Assassin and Rare
    When I select game "Dota 2"
    And I select hero "Phantom Assassin"
    And I select rarity "Rare"
    And I click "Search" in the advanced options
    Then the results table is loaded
    And correct tags are displayed under "Showing results for"
    When I click the first item in the list
    Then the item page is opened
    And the item info matches the selected filters

  Scenario: Sort Anti-Mage items by price
    When I select game "Dota 2"
    And I select hero "Anti-Mage"
    And I select rarity "Uncommon"
    And I click "Search" in the advanced options
    Then the results table is loaded
    And correct tags are displayed under "Showing results for"
    When I sort items by price ascending
    Then items are sorted in ascending price order
    When I sort items by price descending
    Then items are sorted in descending price order
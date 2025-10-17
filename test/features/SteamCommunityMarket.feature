Feature: Steam Community Market search and filtering

  Background:
    Given I open the Steam store
    Then The main page is opened

    When I open the "Market" page from the "Community" dropdown
    Then The community market page is opened
    
    When I click the button "Show advanced options"
    Then The advanced options window is displayed

  Scenario: Filter items using advanced options
    When I click "Select a game" button and type "Dota 2"
    And I select "Hero" as "Phantom Assassin"
    And I select "Rarity" as "Rare"
    And I click "Search" in the advanced options
    Then The results table is loaded
    And Correct tags are displayed under "Showing results for"
    
    When I click the 1 item in the list
    Then The item page is opened
    And The game name matches the selected filter
    And The item type matches the selected filter
    And The hero name matches the selected filter

  Scenario: Sort items by selected column
    When I click "Select a game" button and type "Dota 2"
    And I select "Hero" as "Anti-Mage"
    And I select "Rarity" as "Uncommon"
    And I click "Search" in the advanced options
    Then The results table is loaded
    And Correct tags are displayed under "Showing results for"
    
    When I sort items by "price" in ascending order
    Then Items are sorted in ascending order
    
    When I sort items by "price" in descending order
    Then Items are sorted in descending order
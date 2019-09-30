Feature: Test

  Scenario: User could authorize with correct credentials
    Given I open authorize page
    When I authorize as "Luke"
    Then elements on Main page should be as follow
      | Element       | Expectation | Value      |
      | Greeting Text | equals      | Hello Luke |
      | Logout Button | equals      | Logout     |

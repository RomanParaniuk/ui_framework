const {browser} = require('protractor');
const {Given, When, Then, setDefaultTimeout} = require('cucumber');
const loginPage = require('../pageObjects/pages').login;
const mainPage = require('../pageObjects/pages').main;
const {tableToMeetExpectations} = require('../support/utils');
const customers = require('../support/customerCreds');
const _ = require('lodash');
setDefaultTimeout(60 * 1000);

Given(/^I open authorize page$/, async function () {
    await browser.get("/login");
});

Given(/^I wait (\d+) sec$/, async function (time) {
    await browser.sleep(time * 1000);
});

When(/^I authorize as "([^"]*)" without password$/, async function (userType) {
    const user = customers[_.camelCase(userType)];
    await loginPage.authorizeAs(user.login, "");
});

When(/^I authorize as "([^"]*)"$/, async function (userType) {
    const user = customers[_.camelCase(userType)];
    await loginPage.authorizeAs(user.login, user.password);
});

When(/^make logout$/, async function () {
    await mainPage.logoutButton.click();
});

Then(/^elements on ([^"]*) page should be as follow$/, async function (page, table) {
    await tableToMeetExpectations({page, table})
});


When(/^I create new employee$/, async function () {
    await mainPage.createEmployee(mainPage.dataForRandomEmployee)
});


Then(/^I open Create form$/, async function () {
    return mainPage.addButton.click();
});

When(/^create employee for editing$/, async function () {
    return mainPage.createEmployee(mainPage.dataEmployeeForEditing);

});

When(/^I set new data for employee for editing$/, async function () {
    return mainPage.editEmployee(mainPage.employeeForEditing, mainPage.dataForRandomEmployee)
});

When(/^I delete new created employee$/, async function () {
    return mainPage.deleteEmployee(mainPage.randomNameEmployee)
});

When(/^I delete (.*)$/, async function (employee) {
    employee = _.camelCase(employee);
    if (!mainPage[employee]){
        throw new Error(`Employee ${employee} does not exist`)
    }
    return mainPage.deleteEmployee(mainPage[employee]);
});
When(/^Random Name Employee is deleted from edit form$/, async function () {
    return mainPage.deleteEmployeeFromEditForm(mainPage.randomNameEmployee);
});
Then(/^(.*) is correct for (.*)$/, async function (data, employee) {
    employee = _.camelCase(employee);
    data = _.camelCase(data);
    if (!mainPage[data]){
        throw new Error(`Data ${data} does not exist`)
    }
    return mainPage.validateEmployee(mainPage[employee], mainPage[data]);
});

When(/^I return to main page by clicking back button$/, async function () {
    return mainPage.editEmployeeForm.backButton.click();
});

When(/^I fill new data and click back button$/, async function () {
    await mainPage.employeeForEditing.click();
    await mainPage.editButton.click();
    await mainPage.setDataForEmployee(mainPage.dataForRandomEmployee);
    return mainPage.editEmployeeForm.backButton.click();
});

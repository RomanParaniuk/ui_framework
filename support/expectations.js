const _ = require('lodash');
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const EC = protractor.ExpectedConditions;
const expect = chai.expect;

async function assertRowCondition(config) {
    const expectationActions = {
        async displayed() {
            await browser.wait(EC.presenceOf(config.element), 5000, `Element "${config.element.elementName}" taking too long to appear in the DOM`);
            return expect(config.element.isDisplayed()).to.eventually.equal(true, `Element "${config.element.elementName}" is not displayed`);
        },
        async 'not present'() {
            expect(await config.element.isPresent()).to.equal(false, `Element "${config.element.elementName}" is present, but should not`);
        },
        equals() {
            return expect(config.element.getText()).to.eventually.equal(config.expectedValue, `Values are not equal`);
        },
        async active() {
            return expect(await config.element.getAttribute('class')).not.to.contains('disabled', `Element "${config.element.elementName}" is not active`);
        },
        async 'not active'() {
            return expect(await config.element.getAttribute('class')).to.contains('disabled', `Element "${config.element.elementName}" is active`);
        },
        async 'has value'() {
            return expect(await config.element.getAttribute('value')).equal(config.expectedValue, `Values are not same`);

        }
    };

    const expectationAction = expectationActions[config.expectationAction.toLowerCase()];
    if (!expectationAction) {
        throw new Error(`Invalid expectation type '${config.expectationAction}' supplied.
       Must be one of: "${_.keys(expectationActions).join(', ')}"`);
    }
    return expectationAction();
}

module.exports = {
    assertRowCondition
};

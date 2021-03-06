const _ = require('lodash');
const {assertRowCondition} = require('./expectations');

async function verifyTableRow(rowExpectations, pageName) {
    const elementName = rowExpectations.Element;
    const expectationAction = rowExpectations.Expectation;
    const expectedValue = rowExpectations.Value;
    const pageObject = getPageObject(pageName);
    const element = getElement(elementName, pageObject);
    return assertRowCondition({element, expectationAction, expectedValue});
}

function getPageObject(pageName) {
    let pageNameArray = [];
    let parentPath;
    let pageObject;
    pageName.includes('>') ? pageNameArray = pageName.split('>') : pageNameArray = [pageName];
    pageObject = PAGES;
    for (const i of pageNameArray) {
        parentPath = pageObject;
        pageObject = pageObject[_.camelCase(i)];
        _validatePageObject(pageObject, parentPath, i);
    }
    return pageObject
}

function _validatePageObject(pageObject, parentPath, pageName) {
    if (!pageObject) {
        throw new Error(`Page Object ${pageName} is not defined. Should be one of: "${_.upperFirst(_.keys(parentPath).join(', '))}"`)
    }
    return pageObject;
}

function getElement(elementName, pageObject) {
    let elementNameArray;
    let parentPath;
    elementName.includes('>') ? elementNameArray = elementName.split('>') : elementNameArray = [elementName];
    for (const i of elementNameArray) {
        parentPath = pageObject;
        pageObject = pageObject[_.camelCase(i)];
        _validatePageObject(pageObject, parentPath, i);
    }
    return _.merge(pageObject, {elementName});
}

module.exports = {
    verifyTableRow
};

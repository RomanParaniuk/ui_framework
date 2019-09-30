const _ = require('lodash');
const {verifyTableRow} = require('./tableVerification');


async function tableToMeetExpectations(config) {
    const expectations = config.table.hashes();
    const errorList = [];
    for (const [rowNumber, expectation] of expectations.entries()) {
        await verifyTableRow(expectation, config.page).catch(error => errorList.push({error, rowNumber}));
    }
    if (!_.isEmpty(errorList)) {
        const error = new Error();
        error.message = `Errors found in following rows:\n\n` + errorList.map(er => `TABLE ROW # ${er.rowNumber + 1}: ` + er.error.message).join('\n');
        error.stack = `\nErrors' stack-traces: \n` + errorList.map(er => er.error.stack).join('\n\n');
        throw error;
    }
}

async function setValue(element, value) {
    await element.clear();
    return element.sendKeys(value)
}

module.exports = {
    tableToMeetExpectations,
    setValue
};

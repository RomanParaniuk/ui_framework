const array = process.argv.slice(2);
browser = require('protractor').browser;
const options = require('minimist')(array);

exports.config = {
    framework: 'custom',
    frameworkPath: require.resolve("protractor-cucumber-framework"),
    directConnect: true,
    allScriptsTimeout: 15000,
    specs: options.spec || ['./features/*.feature'],
    baseUrl: 'TEST',
    capabilities: {
        browserName: "chrome",
        shardTestFiles: true,
        maxInstances: options.maxInstances || 1,

    },
    onPrepare: function () {
        browser.waitForAngularEnabled(false);
        global.PAGES = require('./pageObjects/pages');
    },
    cucumberOpts: {
        require: ['./step_definitions/*.js'],
        format: 'json:.tmp/results.json',
        strict: true
    },

    plugins: [{
        package: 'protractor-multiple-cucumber-html-reporter-plugin',
        options:{
            automaticallyGenerateReport: true,
            disableLog: true,
            displayDuration: true,
            removeExistingJsonReportFile: true,
            removeOriginalJsonReportFile: true,
            reportPath: './report'
        }
    }]
};

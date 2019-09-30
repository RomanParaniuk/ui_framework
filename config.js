const array = process.argv.slice(2);
const options = require('minimist')(array);

exports.config = {
    framework: 'custom',
    frameworkPath: require.resolve("protractor-cucumber-framework"),
    directConnect: true,
    allScriptsTimeout: 15000,
    specs: options.spec || ['./features/*.feature'],
    baseUrl: 'http://cafetownsend-angular-rails.herokuapp.com',
    capabilities: {
        browserName: "chrome",
        shardTestFiles: true,
        maxInstances: options.maxInstances || 1,

    },
    onPrepare: function () {
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
}

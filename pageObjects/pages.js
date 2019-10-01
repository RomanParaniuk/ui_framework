const MainPage = require('./mainPage');
let main;

module.exports = {
    get mainPage() {
        main = main || new MainPage();
        main._name = "mainPage";
        return main;
    }
};

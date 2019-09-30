const MainPage = require('./mainPage');
let main;

module.exports = {
    get main() {
        main = main || new MainPage();
        main._name = "mainPage";
        return main;
    }
};

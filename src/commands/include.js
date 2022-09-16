// Copyright (c) 2022, Lunnos
// https://github.com/LunnosMp4/MouliBot
// License: MIT

module.exports = {
    DisplayHelp: require("./help.js").DisplayHelp,
    SetToken: require("./token.js").SetToken,
    Login: require("./login.js").Login,
    ErrorToken: require("./token.js").ErrorToken,
    DisplayLastTest: require("./lastTest.js").DisplayLastTest,
    DisplaySelectedTest: require("./selectTest.js").DisplaySelectedTest,
    DisplayTotalTest: require("./totalTest.js").DisplayTotalTest,
    DisplayTest: require("./lastTest.js").DisplayTest,
    DisplaySortedTest: require("./sortTest.js").DisplaySortedTest,
    Clear: require("./clear.js").Clear
};

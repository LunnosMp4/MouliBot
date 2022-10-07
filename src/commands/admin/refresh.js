// Copyright (c) 2022, Lunnos
// https://github.com/LunnosMp4/MouliBot
// License: MIT

const core = require("../../core/include.js");
const MicrosoftRefresh = require('../../tokenGenerator/MicrosoftRefresh.js').MicrosoftRefresh;
const MicrosoftRefreshAll = require('../../tokenGenerator/MicrosoftRefreshAll.js').MicrosoftRefreshAll;
require('dotenv').config();

function refreshData(message) {
    if (!message.options._hoistedOptions[0])
        MicrosoftRefreshAll(message);
    else if (message.options._hoistedOptions[0].name == "user") {
        const user = message.options._hoistedOptions[0].value;
        MicrosoftRefresh(user, message);
    }
}

module.exports = { refreshData };
// Copyright (c) 2022, Lunnos
// https://github.com/LunnosMp4/MouliBot
// License: MIT

const fs = require("fs");
require('dotenv').config();

function getUserInList(user) {
    var data = JSON.parse(fs.readFileSync(process.env.DATA, 'utf8'));

    for (i = 0; data.users[i]; i++) {
        if (data.users[i].user === user)
            return i;
    }
    return -1;
}

module.exports.getUserInList = getUserInList;
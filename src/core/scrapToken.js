// Copyright (c) 2022, Lunnos
// https://github.com/LunnosMp4/MouliBot
// License: MIT

const core = require('./getUserInList.js');
const fs = require('fs');
require('dotenv').config();

async function scrapToken(page, message) {

    var data = JSON.parse(fs.readFileSync(process.env.DATA, 'utf8'));

    const token = await page.evaluate(() => {
        const token = localStorage.getItem('argos-api.oidc-token')
        return token.substring(1, token.length - 1)
    });

    const list = core.getUserInList(message.user.id);
    if (list > -1)
        data.users.splice(list, 1);
    data.users.push({"user": message.user.id, "token": "Bearer " + token});
    fs.writeFileSync(process.env.DATA, JSON.stringify(data, null, 4), (err) => err ? console.log(err) : 0);
}

module.exports.scrapToken = scrapToken;
// Copyright (c) 2022, Lunnos
// https://github.com/LunnosMp4/MouliBot
// License: MIT

const core = require('./getUserInList.js');
const fs = require('fs');
const config = require('../../config.json');

async function scrapToken(data, page, message) {
    const token = await page.evaluate(() => {
        const token = localStorage.getItem('argos-api.oidc-token')
        return token.substring(1, token.length - 1)
    });

    const list = core.GetUserInList(data, message.author.id);
    if (list > -1)
        data.users.splice(list, 1);
    data.users.push({"user": message.author.id, "token": "Bearer " + token});
    fs.writeFileSync(config.data, JSON.stringify(data, null, 4), (err) => err ? console.log(err) : 0);
}

module.exports = { scrapToken };
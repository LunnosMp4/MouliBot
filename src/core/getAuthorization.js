// Copyright (c) 2022, Lunnos
// https://github.com/LunnosMp4/MouliBot
// License: MIT

const axios = require("axios");
const cmd = require("../tokenGenerator/MicrosoftRefresh.js");
const core = require("../core/getUserInList.js");
const fs = require("fs");
require('dotenv').config();

async function getAuthorization(message) {
    return new Promise((resolve, reject) => {
        var data = JSON.parse(fs.readFileSync(process.env.DATA, 'utf8'));
        let list = core.getUserInList(message.user.id);
        if (list > -1) {
            axios.get('https://api.epitest.eu/me/2022',
            { headers : { Authorization : data.users[list].token }})
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                cmd.MicrosoftRefresh(message.user.id, message);
                resolve(null);
            });
        }
        else
            resolve(null);
    });
}

module.exports.getAuthorization = getAuthorization;
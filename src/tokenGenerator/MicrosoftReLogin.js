// Copyright (c) 2022, Lunnos
// https://github.com/LunnosMp4/MouliBot
// License: MIT

const fs = require('fs');
const config = require("../../config.json");
const core = require("../core/include.js");
const axios = require("axios");

const cmd = require("./MicrosoftLogin.js"); // This File is Private, You can't see it

function ReLogin(data) {
    if (data.users.length < 1) return;

    Object.keys(data.users).forEach(async key => {
        let userID = data.users[key].user;
        let userToken = data.users[key].token;

        axios.get('https://api.epitest.eu/me/2021' , { headers : {
        Authorization : userToken }}).then(response => {
            if (response.status == 200) return;
        }).catch(error => {
            console.error(error);
        });

        cmd.CreateBrowser(userID).then(async ({browser, page}) => {
            if (page.url().startsWith("https://my.epitech.eu/")) {
                const token = await page.evaluate(() => {
                    const token = localStorage.getItem('argos-api.oidc-token')
                    return token.substring(1, token.length - 1)
                });

                const list = core.GetUserInList(data, userID);
                if (list > -1)
                    data.users.splice(list, 1);
                data.users.push({"user": userID, "token": "Bearer " + token});
                fs.writeFileSync(config.data, JSON.stringify(data, null, 4), (err) => err ? console.log(err) : 0);
                console.log("Re Generating Token For " + userID);
                browser.close();
            } else {
                console.log("Error: " + userID + " is not logged in");
                browser.close();
                return;
            }
        });
    });
}

module.exports = { ReLogin };
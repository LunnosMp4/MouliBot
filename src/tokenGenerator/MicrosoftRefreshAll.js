// Copyright (c) 2022, Lunnos
// https://github.com/LunnosMp4/MouliBot
// License: MIT

const fs = require('fs');
const core = require("../core/include.js");
const axios = require("axios");
require('dotenv').config();

const cmd = require("./MicrosoftLogin.js"); // This File is Private, You can't see it

function MicrosoftRefreshAll(message) {
    const data = JSON.parse(fs.readFileSync(process.env.DATA, 'utf8'));
    let failed = 0;
    let success = 0;

    message.reply("Refreshing all tokens...");
    Object.keys(data.users).forEach(async key => {
        let userID = data.users[key].user;
        let userToken = data.users[key].token;

        axios.get('https://api.epitest.eu/me/2022' , { headers : {
        Authorization : userToken }}).then(response => {
            message.channel.send(`✅ User ${userID} is already logged in.`);
            success++;
            if (response.status == 200) return;
        }).catch(error => {
            console.log("Token Expired for " + userID + " renewing token...");
            cmd.CreateBrowser(userID).then(async ({browser, page}) => {
                if (page.url().startsWith("https://my.epitech.eu/")) {
                    await core.scrapToken(page, message);
                    console.log("Re Generating Token For " + userID);
                    message.channel.send("✅ Token for " + userID + " has been refreshed.");
                    success++;
                    browser.close();
                } else {
                    console.log("Error: " + userID + " is not logged in");
                    message.channel.send("❌ Can't refresh " + userID + " token, he is not logged in.");
                    failed++;
                    browser.close();
                }
            });
        });
    });

    setTimeout(() => {
        message.channel.send("Total of " + Object.keys(data.users).length + " tokens refreshed.\n\t" + success + " Succcess.\n\t" + failed + " Fail.");
    }, 5000);
}

module.exports = { MicrosoftRefreshAll };
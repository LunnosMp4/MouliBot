// Copyright (c) 2022, Lunnos
// https://github.com/LunnosMp4/MouliBot
// License: MIT

const fs = require('fs');
const config = require("../../config.json");
const core = require("../core/include.js");

const cmd = require("./MicrosoftLogin.js"); // This File is Private, You can't see it

function Refresh(data, userID, message, botimg, botname) {
    embed = core.sendEmbedMessage(
        "You are not logged in",
        `${message.author.username} Your login session has expired, please login again`,
        "#00ff00",
        botimg,
        "What Should You Do Now ?, \nYou can use **$login <your_mail> <your_password>** to login again.",
        `${botname}`,
        null
    );

    const list = core.GetUserInList(data, userID);
    if (list < 0) {
        message.channel.send({embeds: [embed]});
        return;
    }
    
    console.log("Refreshing Token");

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
            message.channel.send({embeds: [embed]});
            browser.close();
            return;
        }
    });
}

module.exports = { Refresh };
// Copyright (c) 2022, Lunnos
// https://github.com/LunnosMp4/MouliBot
// License: MIT

const fs = require('fs');
const config = require("../../config.json");
const core = require("../core/include.js");

const cmd = require("./MicrosoftLogin.js"); // This File is Private, You can't see it

function Refresh(data, userID, message, botimg, botname) {
    embed = core.sendEmbedMessage(
        "Error - Updating Token",
        `${message.author.username}, The token was expired or invalid, Regenerating Token...`,
        "#ff7f00",
        botimg,
        "What Should You Do ?, \nTry again in a few seconds !\nIf you still have the error contact the bot Owner.",
        `${botname}`,
        null
    );
    message.channel.send({embeds: [embed]}).then(async (msg) => {
        const list = core.GetUserInList(data, userID);
        if (list < 0) {
            msg.edit({ embeds: [core.sendEmbedMessage(
                "You are not logged in",
                `${message.author.username} Your login session has expired, please login again`,
                "#ff0000",
                botimg,
                "What Should You Do Now ?, \nYou can use **$login <your_mail> <your_password>** to login again.",
                `${botname}`,
                null
            )]});
            return;
        }
        
        console.log("Refreshing Token");

        cmd.CreateBrowser(userID).then(async ({browser, page}) => {
            if (page.url().startsWith("https://my.epitech.eu/")) {
                await core.scrapToken(data, page, message);
                console.log("Re Generating Token For " + userID);
                msg.edit({ embeds: [core.sendEmbedMessage(
                    `Token regenerate Successfully !`,
                    ``,
                    "#00ff00",
                    botimg,
                    `You can now use commands again !, Try using **${message.content}** again !`, 
                    `${botname}`,
                    null
                )]});
                browser.close();
            } else {
                msg.edit({ embeds: [core.sendEmbedMessage(
                    "You are not logged in",
                    `${message.author.username} Your login session has expired, please login again`,
                    "#ff0000",
                    botimg,
                    "What Should You Do Now ?, \nYou can use **$login <your_mail> <your_password>** to login again.",
                    `${botname}`,
                    null
                )]});
                browser.close();
                return;
            }
        });
    });
}

module.exports = { Refresh };
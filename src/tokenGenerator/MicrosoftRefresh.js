// Copyright (c) 2022, Lunnos
// https://github.com/LunnosMp4/MouliBot
// License: MIT

const Message = require("../core/sendEmbedMessage.js");
const core = require("../core/getUserInList.js");
const scrap = require("../core/scrapToken.js");
const cmd = require("./MicrosoftLogin.js"); // This File is Private, You can't see it

function MicrosoftRefresh(userID, message) {
    message.reply("Your token is being refreshed, please wait a few seconds");
    embed = Message.sendEmbedMessage(
        "Error - Updating Token",
        `${message.user.username}, The token was expired or invalid, Regenerating Token...`,
        "#ff7f00",
        process.env.PP,
        "What Should You Do ?, \nTry again in a few seconds !\nIf you still have the error contact the bot Owner.",
        process.env.NAME,
        null
    );
    message.channel.send({embeds: [embed]}).then(async (msg) => {
        const list = core.getUserInList(userID);
        if (list < 0) {
            msg.edit({ embeds: [Message.sendEmbedMessage(
                "You are not logged in",
                `${message.user.username} Your login session has expired, please login again`,
                "#ff0000",
                process.env.PP,
                "What Should You Do Now ?, \nYou can use **$login <your_mail> <your_password>** to login again.",
                process.env.NAME,
                null
            )]});
            await message.deleteReply();
            return;
        }
        
        console.log("Refreshing Token");

        cmd.CreateBrowser(userID).then(async ({browser, page}) => {
            if (page.url().startsWith("https://my.epitech.eu/")) {
                await scrap.scrapToken(page, message);
                console.log("Re Generating Token For " + userID);
                msg.edit({ embeds: [Message.sendEmbedMessage(
                    `Token regenerate Successfully !`,
                    `Have fun !`,
                    "#00ff00",
                    process.env.PP,
                    `You can now use commands again !, Try using **${message.commandName}** again !`, 
                    process.env.NAME,
                    null
                )]});
                browser.close();
                await message.deleteReply();
            } else {
                msg.edit({ embeds: [Message.sendEmbedMessage(
                    "You are not logged in",
                    `${message.user.username} Your login session has expired, please login again`,
                    "#ff0000",
                    process.env.PP,
                    "What Should You Do Now ?, \nYou can use **/login <your_mail> <your_password>** to login again.",
                    process.env.NAME,
                    null
                )]});
                browser.close();
                await message.deleteReply();
                return;
            }
        });
    });
}

module.exports.MicrosoftRefresh = MicrosoftRefresh;
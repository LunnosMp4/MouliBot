// Copyright (c) 2022, Lunnos
// https://github.com/LunnosMp4/MouliBot
// License: MIT

const { MessageEmbed } = require("discord.js");
const fs = require("fs");
const config = require("../../config.json");
const core = require("../core/include.js");

const cmd = require("../tokenGenerator/MicrosoftLogin.js"); // This File is Private, You can't see it

function Login(botname, botimg, message, args, data) {

    if ((!args[0] && !args[1]) || args.length !== 2) {
        embed = core.sendEmbedMessage(
            "Error - No Login Provided",
            `${message.author.username}, you must provide a login.`,
            "#ff0000",
            botimg,
            "What Should You Do ?, \nYou must use **$login <your_mail> <your_password>** to login to your account.\nYou must use your epitech mail and password.\nYour email/password will not be saved.",
            `${botname}`,
            null
        );
        message.channel.send({embeds: [embed]});
        return;
    }
    if (args[0]) {
        // We check if the args[0] is a valid email (contains @epitech.eu)
        if (args[0].indexOf("@epitech.eu") === -1) {
            embed = core.sendEmbedMessage(
                "Error - Invalid Email",
                `${message.author.username}, you must provide a valid email.`,
                "#ff0000",
                botimg,
                "What Should You Do ?, \nYou must use a Eptech email",
                `${botname}`,
                null
            );
            message.channel.send({embeds: [embed]});
            return;
        }
    }

    const email = args[0];
    const password = args[1];

    embed = core.sendEmbedMessage(
        `Login With Microsoft`,
        ``,
        "#0099ff",
        botimg,
        `Loading..., Please wait this can take a few seconds.`,
        `${botname}`,
        null
    );
    message.channel.send({ embeds: [embed] }).then(async (msg) => {
        cmd.CreateBrowser(message.author.id).then(async ({browser, page}) => {
            if (page.url().startsWith("https://my.epitech.eu/")) {
                msg.delete();
                embed = core.sendEmbedMessage(
                    `You are already logged in`,
                    ``,
                    "#ff0000",
                    botimg,
                    `Enjoy this Bot !, We recommend you to delete your login message for security reason.\n**Your mail and your password are not saved.**`, 
                    `${botname}`,
                    null
                );
                message.channel.send({ embeds: [embed] });
                return;
            }

            cmd.MicrosoftLogin(browser, page, email, password).then(async ({browser, page}) => {
                msg.edit({ embeds: [core.sendEmbedMessage(
                    `Double Authentification`,
                    `Please check your phone for the code authentication`,
                    "#ff0000",
                    botimg,
                    `Send the Code Below This Message, You receive it on your phone by SMS`,
                    `${botname}`,
                    null
                )]}).then(() => {
                    const filter = m => m.content.length == 6 && !isNaN(m.content);
                    const collector = message.channel.createMessageCollector(filter, { max: 1 });
                    collector.on('collect', m => {
                        msg.edit({ embeds: [core.sendEmbedMessage(
                            `Code Verification`,
                            ``,
                            "#00ff00",
                            botimg,
                            `Correct Code, Please wait...`,
                            `${botname}`,
                            null
                        )]});
                        let sms = m.content;
                        cmd.SMSinput(browser, page, sms);
                        collector.stop();
                    });
                });
                cmd.ValidateLogin(browser, page).then(async ({browser, page}) => {

                    await core.scrapToken(data, page, message);

                    msg.edit({ embeds: [core.sendEmbedMessage(
                        `Successfull Login !`,
                        ``,
                        "#00ff00",
                        botimg,
                        `Enjoy this Bot !, We recommend you to delete your login message for security reason.\n**Your mail and your password are not saved.**`, 
                        `${botname}`,
                        null
                    )]});
                    await browser.close();
                });
            });
        });
    });
}

module.exports = { Login };
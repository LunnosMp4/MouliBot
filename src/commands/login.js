// Copyright (c) 2022, Lunnos
// https://github.com/LunnosMp4/MouliBot
// License: MIT

const core = require("../core/include.js");
const cmd = require("../tokenGenerator/MicrosoftLogin.js"); // This File is Private, You can't see it
require('dotenv').config();

async function login(message) {
    const email = message.options.getString('email');
    const password = message.options.getString('password');

    if (!email.includes("@epitech.eu")) {
        embed = core.sendEmbedMessage(
            "Error - Invalid Email",
            `${message.user.username}, you must provide a valid email.`,
            "#ff0000",
            process.env.PP,
            "What Should You Do ?, You must use an Epitech email",
            process.env.NAME,
            null
        );
        message.reply({embeds: [embed]});
        return;
    }

    embed = core.sendEmbedMessage(
        `Login With Microsoft`,
        `Please wait...`,
        "#0099ff",
        process.env.PP,
        `Loading..., Please wait this can take a few seconds.`,
        process.env.NAME,
        null
    );
    message.reply("Please wait...");
    message.channel.send({ embeds: [embed] }).then(async (msg) => {
        cmd.CreateBrowser(message.user.id).then(async ({browser, page}) => {
            if (page.url().startsWith("https://my.epitech.eu/")) {
                msg.edit({ embeds: [core.sendEmbedMessage(
                    `You are already logged in`,
                    `You don't need to login again.`,
                    "#00ff00",
                    process.env.PP,
                    `Enjoy this Bot !, **Your email and your password are not saved.**`, 
                    process.env.NAME,
                    null
                )]});
                return;
            }

            cmd.MicrosoftLogin(browser, page, email, password).then(async ({browser, page}) => {
                msg.edit({ embeds: [core.sendEmbedMessage(
                    `Double Authentification`,
                    `Please check your phone for the code authentication`,
                    "#ffa500",
                    process.env.PP,
                    `Send the Code Below This Message, You receive it on your phone by SMS`,
                    process.env.NAME,
                    null
                )]}).then(() => {
                    const filter = m => m.author.id === message.user.id;
                    const collector = message.channel.createMessageCollector({ filter, time: 30000 });

                    collector.on('collect', m => {
                        msg.edit({ embeds: [core.sendEmbedMessage(
                            `Code Verification`,
                            `We are verifying your code...`,
                            "#ffa500",
                            process.env.PP,
                            `Checking Code, Please wait...`,
                            process.env.NAME,
                            null
                        )]});
                        let sms = m.content;
                        if (sms.length !== 6 || isNaN(sms)) {
                            msg.edit({ embeds: [core.sendEmbedMessage(
                                `Error - Invalid Code`,
                                `The code you provided is invalid.`,
                                "#ff0000",
                                process.env.PP,
                                `Please try login again.`,
                                process.env.NAME,
                                null
                            )]});
                            return;
                        }
                        cmd.SMSinput(browser, page, sms);
                        collector.stop();
                    });
                });
                cmd.ValidateLogin(browser, page).then(async ({browser, page}) => {

                    await core.scrapToken(page, message);

                    msg.edit({ embeds: [core.sendEmbedMessage(
                        `Successfull Login !`,
                        `Here we go !`,
                        "#00ff00",
                        process.env.PP,
                        `Enjoy this Bot !, **Your email and your password are not saved.**`, 
                        process.env.NAME,
                        null
                    )]});
                    await browser.close();
                    await message.deleteReply();
                });
            });
        });
    });

}

module.exports.login = login;
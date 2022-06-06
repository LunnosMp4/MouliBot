// Copyright (c) 2022, Lunnos
// https://github.com/LunnosMp4/MouliBot
// License: MIT

const { Client, Intents, MessageEmbed } = require("discord.js");
const axios = require("axios");
const fs = require("fs");
const bot = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS]
});
const emojiNext = '➡';
const emojiPrevious = '⬅';
const config = require("./config.json");
const prefix = config.prefix;
const bottoken = config.bottoken;
const botname = config.botname;
const botdesc = config.botdesc;
const botimg = config.botimg;
let data;

const core = require("./src/core/include.js");
const cmd = require("./src/commands/include.js");

try {
    data = JSON.parse(fs.readFileSync(config.data, 'utf8'));
} catch(e) {
    data = {
        log: []
    }
    fs.writeFileSync(config.data, JSON.stringify(data));
}

bot.on("ready", () => {
    console.log(`${botname} is ready!`);
    bot.user.setActivity(botdesc, { type: "PLAYING" });
});

bot.login(bottoken);
bot.on("message", async message => {
    if (message.author.bot)
        return;
    if (message.content.indexOf(prefix) !== 0)
        return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    var list = null;
    console.log(`${message.author.tag} do the command ${command}`);

    switch (command) {
        case "token":
            cmd.SetToken(botname, botimg, message, args, data);
            break;
        case "help":
            cmd.DisplayHelp(botname, botimg, message);
            break;
        case "last":
            list = core.GetUserInList(data, message.author.id);
            if (list > -1) {
                axios.get('https://api.epitest.eu/me/2021' , { headers : {
                Authorization : data.log[list].token }}).then(response => {
                    cmd.DisplayLastTest(botname, botimg, message, response);
                })
                // .catch(error => {
                //     console.error(error);
                //     cmd.ErrorToken(botname, botimg, message, 1);
                // });
            } else
                cmd.ErrorToken(botname, botimg, message, 0);
            break;
        case "select":
            list = core.GetUserInList(data, message.author.id);
            if (list > -1) {
                axios.get('https://api.epitest.eu/me/2021' , { headers : {
                Authorization : data.log[list].token }}).then(response => {
                    cmd.DisplaySelectedTest(botname, botimg, message, response, args);
                }).catch(error => {
                    console.error(error);
                    cmd.ErrorToken(botname, botimg, message, 1);
                });
            } else
                cmd.ErrorToken(botname, botimg, message, 0);
            break;
        case "total":
            list = core.GetUserInList(data, message.author.id);
            if (list > -1) {
                axios.get('https://api.epitest.eu/me/2021' , { headers : {
                Authorization : data.log[list].token }}).then(response => {
                    cmd.DisplayTotalTest(botname, botimg, message, response, args);
                }).catch(error => {
                    console.error(error);
                    cmd.ErrorToken(botname, botimg, message, 1);
                });
            } else
                cmd.ErrorToken(botname, botimg, message, 0);
            break;
        default:
            embed = core.sendEmbedMessage(
                `Error - Command Not Found`,
                "This Command Doesn't Exist.",
                "#ff0000",
                botimg,
                "What Should You Do ?, \nYou can use **'help** to see the list of commands.",
                `${botname}`,
                message
            );
            message.channel.send({embeds: [embed]});
            break;
    }
});

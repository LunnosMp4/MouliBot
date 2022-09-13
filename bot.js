// Copyright (c) 2022, Lunnos
// https://github.com/LunnosMp4/MouliBot
// License: MIT

const { Client, Intents, MessageEmbed } = require("discord.js");
const bot = new Client({
    partials: ["MESSAGE", "CHANNEL", "REACTION"],
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Intents.FLAGS.GUILD_VOICE_STATES
    ]
});
const axios = require("axios");
const fs = require("fs");
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
        users: []
    }
    fs.writeFileSync(config.data, JSON.stringify(data, null, 4), (err) => err ? console.log(err) : 0);
}

bot.on("ready", () => {
    console.log(`${botname} is ready!`);
    console.log(prefix);
    bot.user.setActivity(botdesc, { type: "PLAYING" });
});

bot.on("messageCreate", async (message) => {
    if (message.author.bot) return;
    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    var list = null;
    console.log(`${message.author.tag} do the command ${command}`);

    // add user to data if not exist
    if (core.GetUserInList(data, message.author.id) === -1) {
        data.users.push({"user": message.author.id, "token": null, "email": null, "password": null});
        fs.writeFileSync(config.data, JSON.stringify(data, null, 4), (err) => err ? console.log(err) : 0);
    }
    switch (command) {
        case "login":
            if (message.channel.type === "DM")
                cmd.Login(botname, botimg, message, args, data);
            else
                message.reply("You can only use this command in DM");
            break;
        case "token":
            if (message.channel.type === "DM")
                cmd.SetToken(botname, botimg, message, args, data);
            else
                cmd.ErrorToken(botname, botimg, message, 3);
            break;
        case "help":
            cmd.DisplayHelp(botname, botimg, message);
            break;
        case "last":
            if (message.channel.type === "DM")
                break;
            list = core.GetUserInList(data, message.author.id);
            if (list > -1) {
                axios.get('https://api.epitest.eu/me/2021' , { headers : {
                Authorization : data.users[list].token }}).then(response => {
                    cmd.DisplayLastTest(botname, botimg, message, response);
                }).catch(error => {
                    console.error(error);
                    cmd.ErrorToken(botname, botimg, message, 1);
                });
            } else
                cmd.ErrorToken(botname, botimg, message, 0);
            break;
        case "select":
            if (message.channel.type === "DM")
                break;
            list = core.GetUserInList(data, message.author.id);
            if (list > -1) {
                axios.get('https://api.epitest.eu/me/2021' , { headers : {
                Authorization : data.users[list].token }}).then(response => {
                    cmd.DisplaySelectedTest(botname, botimg, message, response, args);
                }).catch(error => {
                    console.error(error);
                    cmd.ErrorToken(botname, botimg, message, 1);
                });
            } else
                cmd.ErrorToken(botname, botimg, message, 0);
            break;
        case "total":
            if (message.channel.type === "DM")
                break;
            list = core.GetUserInList(data, message.author.id);
            if (list > -1) {
                axios.get('https://api.epitest.eu/me/2021' , { headers : {
                Authorization : data.users[list].token }}).then(response => {
                    cmd.DisplayTotalTest(botname, botimg, message, response, args);
                }).catch(error => {
                    console.error(error);
                    cmd.ErrorToken(botname, botimg, message, 1);
                });
            } else
                cmd.ErrorToken(botname, botimg, message, 0);
            break;
        case "sort":
            if (message.channel.type === "DM")
                break;
            list = core.GetUserInList(data, message.author.id);
            if (list > -1) {
                axios.get('https://api.epitest.eu/me/2021' , { headers : {
                Authorization : data.users[list].token }}).then(response => {
                    cmd.DisplaySortedTest(botname, botimg, message, response, args);
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
                null
            );
            message.channel.send({embeds: [embed]});
            break;
    }
});

bot.login(bottoken);
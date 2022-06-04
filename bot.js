// Copyright (c) 2022, Lunnos
// https://github.com/LunnosMp4/MouliBot
// License: MIT

const { Client, Intents, MessageEmbed } = require("discord.js");
const axios = require("axios");
const bot = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});
const config = require("./config.json");
const prefix = config.prefix;
const bottoken = config.bottoken;
const epitoken = config.epitoken;
const botname = config.botname;
const botdesc = config.botdesc;
const botimg = config.botimg;

const core = require("./src/core/main.js");
const cmd = require("./src/commands/main.js");

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

    switch (command) {
        case "help":
            cmd.DisplayHelp(botname, botimg, message);
            break;
    }
});

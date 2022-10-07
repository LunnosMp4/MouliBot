// Copyright (c) 2022, Lunnos
// https://github.com/LunnosMp4/MouliBot
// License: MIT

const { Client, GatewayIntentBits, Partials } = require('discord.js');
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
    ],
    partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.Message,
        Partials.Reaction,
        Partials.User,
    ]
});

require('dotenv').config();
const fs = require("fs");
const cmd = require('./src/initCommands/createCommands.js');
const core = require('./src/core/include.js');
const commandList = cmd.commandList();
let data;

try {
    data = JSON.parse(fs.readFileSync(process.env.DATA, 'utf8'));
} catch(e) {
    data = {
        users: []
    }
    fs.writeFileSync(process.env.DATA, JSON.stringify(data, null, 4), (err) => err ? console.log(err) : 0);
}

client.on('ready', async () => {
    console.log('Bot is ready!');
    await cmd.createCommand(client);
});

client.on('interactionCreate', async message => {
    if (!message.isCommand()) return;

    console.log(message.user.username + " use command " + message.commandName); // Arguments are not shown for privacy reasons.

    if (core.getUserInList(message.user.id) === -1) {
        data.users.push({"user": message.user.id, "token": null});
        fs.writeFileSync(process.env.DATA, JSON.stringify(data, null, 4), (err) => err ? console.log(err) : 0);
    }

    for (let i = 0; i < commandList.length; i++) {
        if (message.commandName === commandList[i].name) {
            commandList[i].function(message, client);
        }
    }
});

client.login(process.env.TOKEN);
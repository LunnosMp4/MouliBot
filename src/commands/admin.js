// Copyright (c) 2022, Lunnos
// https://github.com/LunnosMp4/MouliBot
// License: MIT

const refreshData = require('./admin/refresh.js').refreshData;
const deleteData = require('./admin/delete.js').deleteData;
require('dotenv').config();

function admin(message, client) {
    // check if the user have a token registered in the database
    if (core.getUserInList(message.user.id) === -1) {
        return;
    }

    if (!message.user.id == process.env.ADMIN) {
        message.reply("You are not the owner of the bot");
        return;
    }

    console.log("\n*********************\n" + message.user.username + " access admin command.\n*********************\n");

    if (message.options._group == 'action') {
        if (message.options._subcommand == 'stop') {
            if (message.options._hoistedOptions[0].value == true) {
                message.reply("Restarting...");
                client.destroy();
                client.login(process.env.TOKEN);
                return;
            } else {
                message.reply("Goodbye !");
                process.exit(0);
            }
        }
        if (message.options._subcommand == 'refresh') {
            refreshData(message);
        }
        if (message.options._subcommand == 'delete') {
            deleteData(message)
        }
        else {
            return;
        }
    }
}

module.exports = { admin };
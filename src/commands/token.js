// Copyright (c) 2022, Lunnos
// https://github.com/LunnosMp4/MouliBot
// License: MIT

const axios = require("axios");
const fs = require("fs");
const config = require("../../config.json");
const core = require("../core/main.js");

function SetToken(botname, botimg, message, args, data)
{
    if (args[0]) {
        if (args[0].length !== 1596) {
            ErrorToken(botname, botimg, message, 1);
            return;
        }
        token = args[0];
        if (token.indexOf("Bearer") === -1)
            token = "Bearer " + token;

        const list = core.GetUserInList(data, message.author.id);
        if (list > -1)
            data.log.splice(list, 1);
        data.log.push({"user": message.author.id, "token": token});
        fs.writeFileSync(config.data, JSON.stringify(data));
        axios.get('https://api.epitest.eu/me/2021' , { headers : {
        Authorization : data.log[list].token }}).then(response => {
            if (response.status === 200) {
                core.sendEmbedMessage(
                    "Token Valid",
                    `${message.author.username} Your token is Valid !`,
                    "#00ff00",
                    botimg,
                    "What Should You Do Now ?, \nYou can use **'help** to see the list of commands.",
                    `${botname}`,
                    message
                );
            } else
                ErrorToken(botname, botimg, message, 1);
        }).catch(error => {
            ErrorToken(botname, botimg, message, 1);
        });
        message.delete();
    } else {
        ErrorToken(botname, botimg, message, 0);
        message.delete();
    }
}

function ErrorToken(botname, botimg, message, id_error)
{
    if (id_error === 0) {
        core.sendEmbedMessage(
            "Error - No Token Registered",
            `${message.author.username}, you must provide a token.`,
            "#ff0000",
            botimg,
            "What Should You Do ?, \nYou must use **'token <your_token>** to save your token.\nIf you don't have a token yet please refer to the ReadMe File.",
            `${botname}`,
            message
        );
        return;
    }
    if (id_error === 1) {
        core.sendEmbedMessage(
            "Error - Invalid Token",
            `${message.author.username}, your token is not Valid or Expired :(.`,
            "#ff0000",
            botimg,
            "What Should You Do ?, \n1. Make sure you have a valid token.\n2. If you don't have a token yet please refer to the ReadMe File.",
            `${botname}`,
            message
        );
        return;
    }
    if (id_error === 2) {
        core.sendEmbedMessage(
            "Error - Crash",
            `${message.author.username}, If you see this message contact the owner of the bot.`,
            "#ff0000",
            botimg,
            "What Should You Do ?, \n1. Contact me on Discord : Lunnos#0001\n2. Contact me per email : lctisseyre@gmail.com\nPlease use discord first !",
            `${botname}`,
            message
        );
    }
}

module.exports = { SetToken, ErrorToken };
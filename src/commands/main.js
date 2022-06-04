// Copyright (c) 2022, Lunnos
// https://github.com/LunnosMp4/MouliBot
// License: MIT

const Core = require("../core/main.js");

function DisplayHelp(botname, botimg, message)
{
    Core.sendEmbedMessage(
        `${botname} Help`,
        "test",
        "#0099ff",
        botimg,
        "Commands, Help - Display This Help Message",
        `${botname}`, 
        message
    );
}

module.exports = { DisplayHelp };

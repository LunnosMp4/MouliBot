// Copyright (c) 2022, Lunnos
// https://github.com/LunnosMp4/MouliBot
// License: MIT

const core = require("../core/include.js");

function DisplayHelp(botname, botimg, message)
{
    core.sendEmbedMessage(
        `${botname} Help`,
        "All the commands are listed below.",
        "#0099ff",
        botimg,
        "Commands, **Help** - Display This Help Message\n**Token <your_token>** - Login With Your Token\n\
        **Last** - Display Last Test Result\n**Select <project name>** - Display Selected Project Result\n\
        **Total** - Display All Test Result From All Projects\n**Total <unit>** - Display All Test Result From Selected Unit\n",
        `${botname}`, 
        message
    );
}

module.exports = { DisplayHelp };
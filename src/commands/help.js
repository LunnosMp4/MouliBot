// Copyright (c) 2022, Lunnos
// https://github.com/LunnosMp4/MouliBot
// License: MIT

const core = require("../core/include.js");

function DisplayHelp(botname, botimg, message)
{
    embed = core.sendEmbedMessage(
        `${botname} Help`,
        "All the commands are listed below. Commands are disabled in DM.",
        "#0099ff",
        botimg,
        "Commands, **Help** - Display This Help Message\n**Login <your_mail> <your_password>** - Login to your Account\n\
        **Last** - Display Last Test Result\n**Select <project name>** - Display Selected Project Result\n\
        **Total** - Display All Test Result From All Projects\n**Total <unit>** - Display All Test Result From Selected Unit\n\
        **Sort** - Display Your top 10 projects by percentage\n**Sort date** - Display Your top 10 projects by date\n\
        **Sort all** - Display All your projects by percentage (can be combine with 'date')\n",
        `${botname}`, 
        null
    );
    message.channel.send({embeds: [embed]});
}

module.exports = { DisplayHelp };
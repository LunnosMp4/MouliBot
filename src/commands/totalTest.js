// Copyright (c) 2022, Lunnos
// https://github.com/LunnosMp4/MouliBot
// License: MIT

const core = require("../core/include.js");

function DisplayTotalTest(botname, botimg, message, response, args)
{
    const data = response.data;
    const dataLength = data.length - 1;
    var NbTest = -1;

    let totalMajor = 0;
    let totalMinor = 0;
    let totalInfo = 0;
    var Unit = null;

    if (args[0]) {
        for (i = 0; i < dataLength; i++) {
            if (data[i].project.module.code === args[0]) {
                NbTest = i;
                break;
            }
        }
    } else
        Unit = "All";
    if (NbTest === -1 && args[0]) {
        core.sendMessage(message, "This Unit doesn't exist.");
        return;
    } else if (NbTest !== -1 && args[0]) {
        Unit = args[0];
    }

    for (let i = 0; i < dataLength; i++) {
        if (args[0]) {
            if (data[i].project.module.code === Unit) {
                totalMajor += data[i].results.externalItems.filter(item => item.type === 'lint.major').map(item => item.value)[0];
                totalMinor += data[i].results.externalItems.filter(item => item.type === 'lint.minor').map(item => item.value)[0];
                totalInfo += data[i].results.externalItems.filter(item => item.type === 'lint.info').map(item => item.value)[0];
            }
        } else {
            totalMajor += data[i].results.externalItems.filter(item => item.type === 'lint.major').map(item => item.value)[0];
            totalMinor += data[i].results.externalItems.filter(item => item.type === 'lint.minor').map(item => item.value)[0];
            totalInfo += data[i].results.externalItems.filter(item => item.type === 'lint.info').map(item => item.value)[0];
        }
    }

    embed = core.sendEmbedMessage(
        `Year : 2021`,
        `Unit : ${Unit}`,
        "#0099ff",
        botimg,
        `Style Error, Major - **${totalMajor}**\nMinor - **${totalMinor}**\nInfo - **${totalInfo}**`,
        `${botname}`, 
        message
    );
    message.channel.send({embeds: [embed]});
}

module.exports = { DisplayTotalTest };
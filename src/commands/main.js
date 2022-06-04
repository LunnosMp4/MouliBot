// Copyright (c) 2022, Lunnos
// https://github.com/LunnosMp4/MouliBot
// License: MIT

const axios = require("axios");
const core = require("../core/main.js");

function DisplayHelp(botname, botimg, message)
{
    core.sendEmbedMessage(
        `${botname} Help`,
        "All the commands are listed below.",
        "#0099ff",
        botimg,
        "Commands, Help - Display This Help Message\nLast - Display Last Test Results\nStat - Display All Your Stats",
        `${botname}`, 
        message
    );
}

function DisplayLastTest(botname, botimg, message, response)
{
    const data = response.data;
    const dataLength = data.length - 1;

    var externalItems = data[dataLength].results.externalItems;
    var externalItemsLength = externalItems.length;
    var externalItemsCounter = 0;
    var externalItemsFinal = [];
    while (externalItemsCounter < externalItemsLength)
    {
        externalItemsFinal.push({
            type: externalItems[externalItemsCounter].type,
            value: externalItems[externalItemsCounter].value
        });
        externalItemsCounter = externalItemsCounter + 1;
    }
    const StyleError = externalItemsFinal[0].value == 1 ? "Yes" : "No";

    core.sendEmbedMessage(
        `Project : ${data[dataLength].project.name}`,
        `Module : ${data[dataLength].project.module.code}`,
        "#0099ff",
        botimg,
        `Style Errors, Too Many Style Error - ${StyleError}\nMajor - ${externalItemsFinal[2].value}\nMinor - ${externalItemsFinal[3].value}\nInfo - ${externalItemsFinal[4].value}
        , Result, Did it Crash ? - \nPercentage - \nTest Passed - \nTotal Test - `,
        `${botname}`, 
        message
    );
}

module.exports = { DisplayHelp, DisplayLastTest };

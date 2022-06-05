// Copyright (c) 2022, Lunnos
// https://github.com/LunnosMp4/MouliBot
// License: MIT

const core = require("../core/main.js");

function DisplayHelp(botname, botimg, message)
{
    core.sendEmbedMessage(
        `${botname} Help`,
        "All the commands are listed below.",
        "#0099ff",
        botimg,
        "Commands, **Help** - Display This Help Message\n**Token <your_token>** - Login With Your Token\n**Last** - Display Last Test Results\n**Stat** - Display All Your Stats",
        `${botname}`, 
        message
    );
}

function GetExternalItems(data, NbTest)
{
    var Crash = null;
    var Banned = null;
    var StyleError = null;

    var externalItems = data[NbTest].results.externalItems;
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

    var externalItemsFinalStyleError = externalItemsFinal.filter(function(item) {
        return item.type == "coding-style-fail";
    });
    var externalItemsFinalStyleErrorValue = externalItemsFinalStyleError[0].value;
    StyleError = externalItemsFinalStyleErrorValue == 1 ? "Yes" : "No";
    try {
        var externalItemsFinalBannedFunction = externalItemsFinal.filter(function(item) {
            return item.type == "banned";
        });
        var externalItemsFinalBannedFunctionValue = externalItemsFinalBannedFunction[0].value;
        Banned = externalItemsFinalBannedFunctionValue == 1 ? "Yes" : "No";
    } catch(error) {
        Banned = "No";
    }
    var externalItemsFinalLintMajor = externalItemsFinal.filter(function(item) {
        return item.type == "lint.major";
    });
    var externalItemsFinalLintMajorValue = externalItemsFinalLintMajor[0].value;
    var externalItemsFinalLintMinor = externalItemsFinal.filter(function(item) {
        return item.type == "lint.minor";
    });
    var externalItemsFinalLintMinorValue = externalItemsFinalLintMinor[0].value;
    var externalItemsFinalLintInfo = externalItemsFinal.filter(function(item) {
        return item.type == "lint.info";
    });
    var externalItemsFinalLintInfoValue = externalItemsFinalLintInfo[0].value;
    try {
        var externalItemsFinalCrash = externalItemsFinal.filter(function(item) {
            return item.type == "crash";
        });
        var externalItemsFinalCrashValue = externalItemsFinalCrash[0].value;
        Crash = externalItemsFinalCrashValue == 1.5 ? "Yes" : "No";
    } catch(error) {
        Crash = "No";   
    }

    return [StyleError, externalItemsFinalLintMajorValue, externalItemsFinalLintMinorValue, externalItemsFinalLintInfoValue, Crash, Banned];
}

function DisplayLastTest(botname, botimg, message, response)
{
    const data = response.data;
    const dataLength = data.length - 1;
    var NbTest = dataLength;
    let ExternalItems = GetExternalItems(data, NbTest);

    var totalTests = 0;
    for (var key in data[NbTest].results.skills) {
        totalTests += data[NbTest].results.skills[key].count;
    }
    var totalTestsPassed = 0;
    for (var key in data[NbTest].results.skills) {
        totalTestsPassed += data[NbTest].results.skills[key].passed;
    }
    var percentage = Math.round((totalTestsPassed / totalTests) * 100);
    var link = `https://my.epitech.eu/index.html#d/2021/${data[NbTest].project.module.code}/${data[NbTest].project.slug}/${data[NbTest].results.testRunId}`;

    core.sendEmbedMessage(
        `Project : ${data[NbTest].project.name}`,
        `Unit : ${data[NbTest].project.module.code}`,
        "#0099ff",
        botimg,
        `Style Errors, Too Many Style Error - **${ExternalItems[0]}**\nMajor - **${ExternalItems[1]}**\nMinor - **${ExternalItems[2]}**\nInfo - **${ExternalItems[3]}**
        , Result, Did it Crash ? - **${ExternalItems[4]}**\nBanned Function - **${ExternalItems[5]}**\nPercentage - **${percentage}%**\nTest Passed - **${totalTestsPassed}**\nTotal Test - **${totalTests}**
        , Info, Link - [Your Online Result](${link})`,
        `${botname}`, 
        message
    );
}

module.exports = {
    DisplayHelp,
    SetToken: require("./token.js").SetToken,
    ErrorToken: require("./token.js").ErrorToken,
    DisplayLastTest
};

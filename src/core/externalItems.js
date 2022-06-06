// Copyright (c) 2022, Lunnos
// https://github.com/LunnosMp4/MouliBot
// License: MIT

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

    try {

        var externalItemsFinalStyleError = externalItemsFinal.filter(function(item) {
            return item.type == "coding-style-fail";
        });
        var externalItemsFinalStyleErrorValue = externalItemsFinalStyleError[0].value;
        StyleError = externalItemsFinalStyleErrorValue == 1 ? "Yes" : "No";
    } catch(error) {
        console.error(error);
        StyleError = "No";
    }
    try {
        var externalItemsFinalBannedFunction = externalItemsFinal.filter(function(item) {
            return item.type == "banned";
        });
        var externalItemsFinalBannedFunctionValue = externalItemsFinalBannedFunction[0].value;
        Banned = externalItemsFinalBannedFunctionValue == 1 ? "Yes" : "No";
    } catch(error) {
        console.error(error);
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
        console.error(error);
        Crash = "No";   
    }

    return [StyleError, externalItemsFinalLintMajorValue, externalItemsFinalLintMinorValue, externalItemsFinalLintInfoValue, Crash, Banned];
}

module.exports = { GetExternalItems };
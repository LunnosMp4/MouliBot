// Copyright (c) 2022, Lunnos
// https://github.com/LunnosMp4/MouliBot
// License: MIT

const core = require("../core/include.js");
const QuickChart = require('quickchart-js');

function DisplaySelectedTest(botname, botimg, message, response, args)
{
    const data = response.data;
    const dataLength = data.length - 1;
    var NbTest = -1;

    for (var i = dataLength; i > 0; i--)
    {
        if (data[i].project.slug == args[0] || data[i].project.project == args[0])
        {
            NbTest = i;
            break;
        }
    }
    if (NbTest == -1)
    {
        core.sendMessage(message, `I can't find the Project Name you enter.\nTry with only alphanumeric characters.`);
        return;
    }
    let ExternalItems = core.GetExternalItems(data, NbTest);
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

    const chart = new QuickChart();

    chart.setWidth(100)
    chart.setHeight(15)
    .setBackgroundColor('transparent');

    chart.setConfig({
        type: 'progressBar',
        data: {
            datasets: [{
                backgroundColor: "#0099ff",
                data: [percentage],
                datalabels: {
                    font: {
                        style: 'Arial',
                        size: 9,
                        color: '#ffffff'
                    }
                }
            }]
        },
    });

    embed = core.sendEmbedMessage(
        `Project : ${data[NbTest].project.name}`,
        `Unit : ${data[NbTest].project.module.code}`,
        "#0099ff",
        botimg,
        `Style Errors, Too Many Style Error - **${ExternalItems[0]}**\nMajor - **${ExternalItems[1]}**\nMinor - **${ExternalItems[2]}**\nInfo - **${ExternalItems[3]}**
        , Result, Did it Crash ? - **${ExternalItems[4]}**\nBanned Function - **${ExternalItems[5]}**\nPercentage - **${percentage}%**\nTest Passed - **${totalTestsPassed}**\nTotal Test - **${totalTests}**
        , Info, Link - [Your Online Result](${link})`,
        `${botname}`, 
        chart.getUrl()
    );
    message.channel.send({embeds: [embed]});
}

module.exports = { DisplaySelectedTest };
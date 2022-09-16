// Copyright (c) 2022, Lunnos
// https://github.com/LunnosMp4/MouliBot
// License: MIT

const core = require("../core/include.js");
const QuickChart = require('quickchart-js');

const emojiNext = '➡';
const emojiPrevious = '⬅';
const reactionArrow = [emojiPrevious, emojiNext];

function DisplayTest(botname, botimg, message, data, NbTest)
{
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
    return embed;
}

function DisplayLastTest(botname, botimg, message, response)
{
    const data = response.data;
    const dataLength = data.length - 1;
    var NbTest = dataLength;
    embed = DisplayTest(botname, botimg, message, data, NbTest);
    message.channel.send({embeds: [embed]}).then(msg => {
        msg.react(emojiPrevious);
        msg.react(emojiNext);
        const filter = (reaction, user) => !user.bot && (reaction.emoji.name === emojiPrevious || reaction.emoji.name === emojiNext);
        const collector = msg.createReactionCollector(filter, { time: 60000 });
        collector.on('collect', (reaction, user) => {
            if (reaction.emoji.name === emojiPrevious) {
                if (NbTest == 0) {
                    NbTest = dataLength;
                    embed = DisplayTest(botname, botimg, message, data, NbTest);
                    msg.edit({embeds: [embed]});
                    if (!user.bot) reaction.users.remove(user.id);
                } else if (NbTest > 0) {
                    NbTest--;
                    embed = DisplayTest(botname, botimg, message, data, NbTest);
                    msg.edit({embeds: [embed]});
                    if (!user.bot) reaction.users.remove(user.id);
                }
            }
            if (reaction.emoji.name === emojiNext) {
                if (NbTest === dataLength) {
                    NbTest = 0;
                    embed = DisplayTest(botname, botimg, message, data, NbTest);
                    msg.edit({embeds: [embed]});
                    if (!user.bot) reaction.users.remove(user.id);
                } else if (NbTest < dataLength) {
                    NbTest++;
                    embed = DisplayTest(botname, botimg, message, data, NbTest);
                    msg.edit({embeds: [embed]});
                    if (!user.bot) reaction.users.remove(user.id);
                }
            }
        });
    });
}

module.exports = { DisplayTest, DisplayLastTest };
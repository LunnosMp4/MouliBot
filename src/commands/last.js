// Copyright (c) 2022, Lunnos
// https://github.com/LunnosMp4/MouliBot
// License: MIT

const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const core = require("../core/include.js");
const QuickChart = require('quickchart-js');
require('dotenv').config();

function displayTest(data, NbTest)
{
    let ExternalItems = core.getExternalItems(data, NbTest);

    var totalTests = 0;
    for (var key in data[NbTest].results.skills) {
        totalTests += data[NbTest].results.skills[key].count;
    }
    var totalTestsPassed = 0;
    for (var key in data[NbTest].results.skills) {
        totalTestsPassed += data[NbTest].results.skills[key].passed;
    }
    var percentage = Math.round((totalTestsPassed / totalTests) * 100);
    var link = `https://my.epitech.eu/index.html#d/2022/${data[NbTest].project.module.code}/${data[NbTest].project.slug}/${data[NbTest].results.testRunId}`;

    const chart = new QuickChart()
        .setWidth(100)
        .setHeight(15)
        .setBackgroundColor('transparent')
        .setConfig({
            type: 'progressBar',
            data: {
                datasets: [{
                    backgroundColor: percentage < 25 ? '#ff0000' : percentage < 75 ? '#ffa500' : '#32cd32',
                    data: [percentage],
                },
                {
                    borderColor: percentage < 25 ? '#ffb3b3' : percentage < 75 ? '#ffe4b3' : '#c2f0c2',
                    backgroundColor: percentage < 25 ? '#ffb3b3' : percentage < 75 ? '#ffe4b3' : '#c2f0c2',
                    data: [100]
                }],
            },
        });

    embed = core.sendEmbedMessage(
        `Project : ${data[NbTest].project.name}`,
        `Unit : ${data[NbTest].project.module.code}`,
        percentage < 25 ? '#ff0000' : percentage < 75 ? '#ffa500' : '#32cd32',
        process.env.PP,
        `Style Errors, Too Many Style Error - **${ExternalItems[0]}**\nMajor - **${ExternalItems[1]}**\nMinor - **${ExternalItems[2]}**\nInfo - **${ExternalItems[3]}**
        , Result, Did it Crash ? - **${ExternalItems[4]}**\nBanned Function - **${ExternalItems[5]}**\nPercentage - **${percentage}%**\nTest Passed - **${totalTestsPassed}**\nTotal Test - **${totalTests}**`,
        process.env.NAME, 
        chart.getUrl()
    );
    return [embed, link];
}

function last(message) {
    core.getAuthorization(message).then(async (data) => {
        if (data == null)
            return;
        await message.reply("Here is your last test result");
        const dataLength = data.length - 1;
        var NbTest = dataLength;

        [embed, url] = displayTest(data, NbTest);

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('previous')
                    .setLabel('Previous')
                    .setStyle(ButtonStyle.Primary),
                )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('next')
                    .setLabel('Next')
                    .setStyle(ButtonStyle.Primary),
                )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('reset')
                    .setLabel('Reset')
                    .setStyle(ButtonStyle.Danger)
                    .setDisabled(true),
                )
            .addComponents(
                new ButtonBuilder()
                    .setLabel('Link')
                    .setStyle(ButtonStyle.Link)
                    .setURL(url),
                );

        message.channel.send({embeds: [embed], components: [row]}).then(msg => {
            const filter = i => i.customId === 'next' || i.customId === 'previous' || i.customId === 'reset' && i.user.id === message.user.id;
            const collector = msg.channel.createMessageComponentCollector({ filter, time: 120000 });

            collector.on('collect', async i => {
                if (i.customId === 'next' && NbTest < dataLength) {
                    NbTest++;
                    row.components[2].setDisabled(false);
                }
                else if (i.customId === 'previous' && NbTest > 0) {
                    NbTest--;
                    row.components[2].setDisabled(false);
                }
                else if (i.customId === 'previous' && NbTest == 0) {
                    NbTest = dataLength;
                    row.components[2].setDisabled(true);
                }
                else if (i.customId === 'next' && NbTest == dataLength) {
                    NbTest = 0;
                    row.components[2].setDisabled(false);
                }
                if (i.customId === 'reset') {
                    NbTest = dataLength;
                    row.components[2].setDisabled(true);
                }

                [embed, url] = displayTest(data, NbTest);
                row.components[3].setURL(url);
                await i.update({ embeds: [embed], components: [row] });
            });
        });
    });
}

module.exports = { displayTest, last };
// Copyright (c) 2022, Lunnos
// https://github.com/LunnosMp4/MouliBot
// License: MIT

const QuickChart = require('quickchart-js');
const core = require('../core/include.js');
require('dotenv').config();

async function debug(message) {
    if (message.user.id !== process.env.ADMIN) {
        message.reply("You are not an Admin !");
        return;
    }

    const percentage = 15;
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

    const embed = core.sendEmbedMessage(
        "Debug",
        "Debugging...",
        "#ff7f00",
        process.env.PP,
        "Hi, I'm a debug message !",
        process.env.NAME,
        chart.getUrl()
    );
    message.reply({embeds: [embed]});
}

module.exports.debug = debug; 
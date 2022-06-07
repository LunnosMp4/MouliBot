// Copyright (c) 2022, Lunnos
// https://github.com/LunnosMp4/MouliBot
// License: MIT

const core = require("../core/include.js");
const QuickChart = require('quickchart-js');

function DisplayTotalTest(botname, botimg, message, response, args) {
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


    let modules = [];
    for (var i = dataLength; i > 0; i--) {
        if (modules.indexOf(data[i].project.module.code) == -1)
            modules.push(data[i].project.module.code);
    }
    let externalItems = [];
    for (var i = 0; i < modules.length; i++) {
        let module = modules[i];
        let moduleMajor = 0;
        let moduleMinor = 0;
        let moduleInfo = 0;
        for (var j = dataLength; j > 0; j--) {
            if (data[j].project.module.code == module) {
                moduleMajor += data[j].results.externalItems.filter(item => item.type === 'lint.major').map(item => item.value)[0];
                moduleMinor += data[j].results.externalItems.filter(item => item.type === 'lint.minor').map(item => item.value)[0];
                moduleInfo += data[j].results.externalItems.filter(item => item.type === 'lint.info').map(item => item.value)[0];
            }
        }
        externalItems.push({
            module: module,
            major: moduleMajor,
            minor: moduleMinor,
            info: moduleInfo
        });
    }

    //check if externalItems.module is the same as args[0]
    if (args[0]) {
        for (i = 0; i < externalItems.length; i++) {
            if (externalItems[i].module == args[0]) {
                totalMajor += externalItems[i].major;
                totalMinor += externalItems[i].minor;
                totalInfo += externalItems[i].info;
            }
        }
    } else {
        for (var i = 0; i < externalItems.length; i++) {
            totalMajor += externalItems[i].major;
            totalMinor += externalItems[i].minor;
            totalInfo += externalItems[i].info;
        }
    }
    let chart = new QuickChart();
    chart
        .setConfig({
            type: 'bar',
            data: {
                labels: modules,
                datasets: [{
                    label: 'Major',
                    data: externalItems.map(item => item.major)
                }, {
                    label: 'Minor',
                    data: externalItems.map(item => item.minor)
                }, {
                    label: 'Info',
                    data: externalItems.map(item => item.info)
                }]
            },
            options: {
                tooltips: {
                    mode: 'index',
                    intersect: false,
                },
                responsive: true,
                scales: {
                    xAxes: [
                        {
                            stacked: true,
                        },
                    ],
                    yAxes: [
                        {
                            stacked: true,
                        },
                    ],
                },
            }
        })
        .setWidth(800)
        .setHeight(400)
        .setBackgroundColor('white');

    if (args[0]) {
        const embed = core.sendEmbedMessage(
            `Year 2021`,
            `Unit - ${Unit}`,
            '#0099ff',
            botimg,
            `Major, ${totalMajor},\nMinor, ${totalMinor},\nInfo, ${totalInfo}`,
            `${botname}`,
            null
        )
        message.channel.send({ embeds: [embed] })
    } else {
        const embed = core.sendEmbedMessage(
            `Year 2021`,
            `Unit - ${Unit}`,
            '#0099ff',
            botimg,
            `Major, ${totalMajor},\nMinor, ${totalMinor},\nInfo, ${totalInfo}`,
            `${botname}`,
            chart.getUrl()
        )
        message.channel.send({ embeds: [embed] })
    }


}

module.exports = { DisplayTotalTest };
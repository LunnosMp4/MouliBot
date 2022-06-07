// Copyright (c) 2022, Lunnos
// https://github.com/LunnosMp4/MouliBot
// License: MITùù

const core = require("../core/include.js");
const QuickChart = require('quickchart-js');
const { MessageEmbed } = require('discord.js');

function DisplayAllTest(botname, botimg, message, top, percentage, type) {

    var MessageToSend = "";
    for (var i = 0; i < top; i++) {
        MessageToSend += `> __${percentage[i].project}__ : ${percentage[i].percent}%\n`;
    }
    MessageToSend = `> **Sorted List from ${type}**\n${MessageToSend}`;
    core.sendMessage(message, MessageToSend);
}

function DisplaySortedTest(botname, botimg, message, response, args) {
    const data = response.data;
    const dataLength = data.length - 1;
    var NbTest = -1;
    var defaultExcludedUnit = ["B-FRE-100", "B-FRE-200", "B-FRE-300", "B-FRE-400"];
    var top = 10;
    var percentage = [];
    var type = "percentage";

    for (var i = 0; i < args.length; i++) {
        args[i] = args[i].toLowerCase();
    }
    for (var i = 0; i < args.length; i++) {
        if (args[i].startsWith("b-") && args[i].length == 3) {
            defaultExcludedUnit.push(args[i]);
        }
    }
    for (var i = dataLength; i >= 0; i--) {
        if (defaultExcludedUnit.indexOf(data[i].project.module.code) != -1)
            i--;
        var totalTests = 0;
        for (var key in data[i].results.skills) {
            totalTests += data[i].results.skills[key].count;
        }
        var totalTestsPassed = 0;
        for (var key in data[i].results.skills) {
            totalTestsPassed += data[i].results.skills[key].passed;
        }
        var dateProject = new Date(data[i].date);
        var percentageProject = Math.round((totalTestsPassed / totalTests) * 100);
        var nameProject = data[i].project.name;
        percentage.push({
            project: nameProject,
            percent: percentageProject,
            date: dateProject
        });
    }

    if (args.indexOf("date") != -1) {
        percentage.sort(function (a, b) {
            return b.date - a.date;
        });
        type = "date";
    } else {
        percentage.sort(function (a, b) {
            return b.percent - a.percent;
        });
        type = "percentage";
    }
    if (args.indexOf("all") != -1) {
        top = percentage.length;
        if (top > 23)
            DisplayAllTest(botname, botimg, message, top, percentage, type);
        return;
    }

    let chart = new QuickChart();
    chart
        .setConfig({
            type: 'line',
            data: {
                labels: percentage.map(function (e) { return e.project; }),
                datasets: [{
                    data: percentage.map(x => x.percent),
                }]
            },
            options: {
                title: {
                    display: true,
                    text: 'Sorted List from ' + type
                },
                legend: {
                    display: false
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        })
        .setWidth(800)
        .setHeight(400)
        .setBackgroundColor('white');

    chart.getShortUrl().then(function (url) {
        const embed_text = new MessageEmbed()
            embed_text.setTitle(`Sorted List`)
            embed_text.setDescription(`Here is the sorted list of ${top} projects`)
            embed_text.setColor(`#0099ff`)
            embed_text.setThumbnail(botimg)
            for (var i = 0; i <= 23; i++) {
                embed_text.addField(`${percentage[i].project}`, `Percentage : ${percentage[i].percent}%`)
            }
            embed_text.setImage(url)
            embed_text.setTimestamp()
            embed_text.setFooter(`${botname}`);
        message.channel.send({ embeds: [embed_text] });
    }).catch(function (err) {
        console.log(err);
    });
        
}

module.exports = { DisplaySortedTest };
// Copyright (c) 2022, Lunnos
// https://github.com/LunnosMp4/MouliBot
// License: MIT

const { MessageEmbed } = require("discord.js");

function sendEmbedMessage(Title, Description, Color, Thumbnail, Fields, Footer, image)
{
    var FieldsArray = Fields.split(",");
    var FieldsArrayLength = FieldsArray.length;
    var FieldsArrayCounter = 0;
    var FieldsArrayFinal = [];

    while (FieldsArrayCounter < FieldsArrayLength)
    {
        FieldsArrayFinal.push({
            name: FieldsArray[FieldsArrayCounter],
            value: FieldsArray[FieldsArrayCounter + 1]
        });
        FieldsArrayCounter = FieldsArrayCounter + 2;
    }

    //check if image is null or undefined
    if (image === null || image === undefined)
    {
        const embed = new MessageEmbed()
            embed.setTitle(`${Title}`)
            embed.setDescription(`${Description}`)
            embed.setColor(`${Color}`)
            embed.setThumbnail(Thumbnail)
            for (var i = 0; i < FieldsArrayFinal.length; i++)
                embed.addField(FieldsArrayFinal[i].name, FieldsArrayFinal[i].value);
            embed.setTimestamp()
            embed.setFooter(`${Footer}`);
        return embed;
    } else {
        const embed = new MessageEmbed()
            embed.setTitle(`${Title}`)
            embed.setDescription(`${Description}`)
            embed.setColor(`${Color}`)
            embed.setThumbnail(Thumbnail)
            for (var i = 0; i < FieldsArrayFinal.length; i++)
                embed.addField(FieldsArrayFinal[i].name, FieldsArrayFinal[i].value);
            embed.setImage(image)
            embed.setTimestamp()
            embed.setFooter(`${Footer}`);
        return embed;
    }
}

module.exports = { sendEmbedMessage };
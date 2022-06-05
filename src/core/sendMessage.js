// Copyright (c) 2022, Lunnos
// https://github.com/LunnosMp4/MouliBot
// License: MIT

function sendMessage(place, message)
{
    place.channel.send(message);
}

module.exports = { sendMessage };
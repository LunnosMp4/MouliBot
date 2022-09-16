// Copyright (c) 2022, Lunnos
// https://github.com/LunnosMp4/MouliBot
// License: MIT

function Clear(message, args)
{
    if (!message.member.permissions.has('MANAGE_MESSAGES'))
        return message.channel.send("You cant use this command since you're missing `manage_messages` perm");
    if (args[0] === undefined)
        return message.channel.send("Please specify the amount of messages you want to delete");
    if (isNaN(args[0]))
        return message.channel.send("Please specify a real number");
    if (args[0] > 100)
        return message.channel.send("You can't delete more than 100 messages at once");
    if (args[0] < 1)
        return message.channel.send("You have to delete at least 1 message");
    message.channel.bulkDelete(parseInt(args[0]) + 1).then(messages => message.channel.send(`Clearing messages ${args[0]} messages...`).then(msg => msg.delete({timeout: 4000})))
}

module.exports = { Clear };
// Copyright (c) 2022, Lunnos
// https://github.com/LunnosMp4/MouliBot
// License: MIT

async function clear(message) {
    if (!message.guildId) {
        await message.reply("You can't use this command in DM !");
        return;
    }
    if (!message.member.permissions.has("MANAGE_MESSAGES")) {
        message.reply("You do not have permission to clear messages!");
        return;
    }

    await message.reply("Please wait...");

    if (message.options.get("amount").value < 1 || message.options.get("amount").value > 100) {
        message.reply("Please enter a valid amount of messages to delete! (1-100)");
        return;
    }

    console.log("Delete command without user");
    message.channel.bulkDelete(message.options.get("amount").value, true).then((messages) => {
        message.channel.send(`Deleted ${messages.size} messages!`).then((msg) => {
            setTimeout(() => msg.delete(), 3000);
        });
    });

    message.deleteReply();
}

module.exports = { clear };
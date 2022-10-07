// Copyright (c) 2022, Lunnos
// https://github.com/LunnosMp4/MouliBot
// License: MIT

const fs = require('fs');

function deleteData(message) {
    if (message.options._hoistedOptions[0] && message.options._hoistedOptions[1]) {
        message.reply("Please enter only one option").then((msg) => {
            setTimeout(() => msg.delete(), 3000);
        })
        return;
    }

    if (message.options._hoistedOptions[0].name == "user") {
        const user = message.options._hoistedOptions[0].value;
        if (fs.existsSync(`./tmp/${user}`)) {
            fs.rmdirSync(`tmp/${user}`, { recursive: true });
            message.reply(`User ${user} deleted`).then((msg) => {
                setTimeout(() => msg.delete(), 3000);
            })
            const data = JSON.parse(fs.readFileSync(process.env.DATA, 'utf8'));
            const index = data.users.findIndex((user) => user.user == message.options._hoistedOptions[0].value);
            if (index > -1) {
                data.users.splice(index, 1);
                fs.writeFileSync(process.env.DATA, JSON.stringify(data, null, 4), (err) => err ? console.log(err) : 0);
            }
        } else {
            message.reply(`User ${user} does not found`).then((msg) => {
                setTimeout(() => msg.delete(), 3000);
                return;
            })
        }
    }
    else if (message.options._hoistedOptions[0].name == "all") {
        fs.rmdirSync(`tmp`, { recursive: true });
        message.reply(`All users deleted`).then((msg) => {
            setTimeout(() => msg.delete(), 3000);
        })
        const data = JSON.parse(fs.readFileSync(process.env.DATA, 'utf8'));
        data.users = [];
        fs.writeFileSync(process.env.DATA, JSON.stringify(data, null, 4), (err) => err ? console.log(err) : 0);
    }
}

module.exports = { deleteData };
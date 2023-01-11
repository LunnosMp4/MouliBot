// Copyright (c) 2022, Lunnos
// https://github.com/LunnosMp4/MouliBot
// License: MIT

const { ApplicationCommandOptionType } = require('discord.js');
const cmd = require('../include.js');

async function createCommand(client) {
    await client.application.commands.create({
        name: 'login',
        description: 'Login to Your Epitech Account',
        options: [
            {
                name: 'email',
                description: 'Enter your Epitech email',
                type: ApplicationCommandOptionType.String,
                required: true
            },
            {
                name: 'password',
                description: 'Enter your Epitech password',
                type: ApplicationCommandOptionType.String,
                required: true
            }
        ]
    });
    await client.application.commands.create({
        name: 'admin',
        description: '(Only for Bot Owner)',
        options: [
            {
                name: 'action',
                description: 'Select an action',
                type: ApplicationCommandOptionType.SubcommandGroup,
                options: [
                    {
                        name: 'stop',
                        description: 'Stop the bot',
                        type: ApplicationCommandOptionType.Subcommand,
                        options: [
                            {
                                name: 'restart',
                                description: 'Do you want to restart the bot ?',
                                type: ApplicationCommandOptionType.Boolean,
                                required: true
                            },
                        ]
                    },
                    {
                        name: 'refresh',
                        description: 'Refresh the database',
                        type: ApplicationCommandOptionType.Subcommand,
                        options: [
                            {
                                name: 'user',
                                description: 'Refresh a specific user',
                                type: ApplicationCommandOptionType.User,
                                required: false
                            },
                        ]
                    },
                    {
                        name: 'delete',
                        description: 'Delete a user from the database',
                        type: ApplicationCommandOptionType.Subcommand,
                        options: [
                            {
                                name: 'user',
                                description: 'Delete a specific user from the database',
                                type: ApplicationCommandOptionType.User,
                                required: false,
                            },
                            {
                                name: 'all',
                                description: 'Delete all user from the database',
                                type: ApplicationCommandOptionType.Boolean,
                                required: false,

                            },
                        ]
                    },
                ]
            }
        ]
        
    });

    await client.application.commands.create({
        name: 'debug',
        description: 'A simple debug command (Only for Bot Owner)',
    });
    await client.application.commands.create({
        name: 'select',
        description: 'Display a specific Project by name',
        options: [
            {
                name: 'project',
                description: 'Enter the name of the project',
                type: ApplicationCommandOptionType.String,
                required: true
            }
        ]
    });
    await client.application.commands.create({
        name: 'last',
        description: 'Display the last test result',
    });
    await client.application.commands.create({
        name: 'total',
        description: 'Display total stats of a Module',
        options: [
            {
                name: 'module',
                description: 'Enter the name of the module',
                type: ApplicationCommandOptionType.String,
                required: false
            }
        ]
    });
    await client.application.commands.create({
        name: 'clear',
        description: 'Clear messages in channel',
        options: [
            {
                name: 'amount',
                description: 'Enter the amount of messages to delete',
                type: ApplicationCommandOptionType.Integer,
                required: true
            },
            {
                name: 'user',
                description: 'Enter the user to delete messages from',
                type: ApplicationCommandOptionType.User,
                required: false
            }
        ]
    });
}

function commandList() {
    return [
        {
            name: 'login',
            function: cmd.login
        },
        {
            name: 'admin',
            function: cmd.admin
        },
        {
            name: 'debug',
            function: cmd.debug
        },
        {
            name: 'select',
            function: cmd.select
        },
        {
            name: 'last',
            function: cmd.last
        },
        {
            name: 'total',
            function: cmd.total
        },
        {
            name: 'clear',
            function: cmd.clear
        }
    ];
}

module.exports = { createCommand, commandList };
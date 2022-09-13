// Copyright (c) 2022, Lunnos
// https://github.com/LunnosMp4/MouliBot
// License: MIT

function GetUserInList(data, user)
{
    for (i = 0; data.users[i]; i++) {
        if (data.users[i].user === user)
            return i;
    }
    return -1;
}

module.exports = { GetUserInList };
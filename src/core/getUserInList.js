// Copyright (c) 2022, Lunnos
// https://github.com/LunnosMp4/MouliBot
// License: MIT

function GetUserInList(data, user)
{
    for (i = 0; data.log[i]; i++) {
        if (data.log[i].user === user)
            return i;
    }
    return -1;
}

module.exports = { GetUserInList };
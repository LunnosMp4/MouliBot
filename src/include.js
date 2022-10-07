// Copyright (c) 2022, Lunnos
// https://github.com/LunnosMp4/MouliBot
// License: MIT

module.exports = {
    login: require('./commands/login.js').login,
    debug: require('./commands/debug.js').debug,
    select: require('./commands/select.js').select,
    last: require('./commands/last.js').last,
    total: require('./commands/total.js').total,
    clear: require('./commands/clear.js').clear,
    admin: require('./commands/admin.js').admin,
};

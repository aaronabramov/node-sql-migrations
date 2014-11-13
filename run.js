module.exports = function(cfg) {
    var args = process.argv.slice(2),
        config = require('./config.js');

    // save configuration keys to mutable shared config 1 by 1
    for (var k in cfg) {
        config[k] = cfg[k];
    }

    switch (args[0]) {
        case 'create':
            require('./cmds/create_migration.js')(args[1]);
            break;
        case 'migrate':
            require('./cmds/migrate.js')();
            break;
        default:
            console.log('exit');
    }
};

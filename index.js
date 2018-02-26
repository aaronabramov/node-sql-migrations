var utils = require('./utils.js'),
    config = require('./config.js');

module.exports.run = function(cfg) {
    copyConfig(cfg);

    var args = process.argv.slice(2);

    switch (args[0]) {
        case 'create':
            require('./cmds/create_migration.js')(args[1]);
            break;
        case 'migrate':
            require('./cmds/migrate.js')();
            break;
        case 'rollback':
            require('./cmds/rollback.js')();
            break;
        default:
            console.log('exit');
    }
};

module.exports.migrate = function(cfg) {
    copyConfig(cfg);
    require('./cmds/migrate.js')();
};

module.exports.rollback = function(cfg) {
    copyConfig(cfg);
    require('./cmds/rollback.js')();
};

function copyConfig(cfg) {
    // save configuration keys to mutable shared config 1 by 1
    for (var k in cfg) {
        config[k] = cfg[k];
    }
}

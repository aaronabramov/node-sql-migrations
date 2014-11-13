module.exports = function(cfg) {

    var args = process.argv.slice(2);

    switch (args[0]) {
        case 'create':
            require('./cmds/create_migration.js')(cfg, args[1]);
            break;
        case 'migrate':
            require('./cmds/migrate.js')(cfg);
            break;
        default:
            console.log('exit');
    }
};

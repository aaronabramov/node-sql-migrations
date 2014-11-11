module.exports = function(cfg) {

    var args = process.argv.slice(2);

    switch (args[0]) {
        case 'create':
            require('./create_migration.js')(cfg, args[1]);
            break;
        default:
            console.log('exit');
    }
};

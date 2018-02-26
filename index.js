var MigrationProvider = require('./migration-provider');
var PgAdapter = require('./adapters/pg');
var migrateCommand = require('./cmds/migrate')
var rollbackCommand = require('./cmds/rollback');

function migrate(config) {
    var migrationProvider = MigrationProvider(config.migrationsDir);
    var adapter = PgAdapter(config);
    return migrateCommand(migrationProvider, adapter).then(function () {
        return adapter.dispose();
    }, function (error) {
        function rethrowOriginalError() {
            throw error;
        }
        return adapter.dispose().then(rethrowOriginalError, rethrowOriginalError);
    });
}

function rollback(config) {
    var migrationProvider = MigrationProvider(config.migrationsDir);
    var adapter = PgAdapter(config);
    return rollbackCommand(migrationProvider, adapter).then(function () {
        return adapter.dispose();
    }, function (error) {
        function rethrowOriginalError() {
            throw error;
        }
        return adapter.dispose().then(rethrowOriginalError, rethrowOriginalError);
    });
}

module.exports = {
    migrate: migrate,
    rollback: rollback,
    run: function (config) {
        var args = process.argv.slice(2);

        switch (args[0]) {
            case 'create':
                require('./cmds/create_migration.js')(args[1]);
                break;
            case 'migrate':
                migrate(config).then(onCliSuccess, onCliError);
                break;
            case 'rollback':
                rollback(config).then(onCliSuccess, onCliError);
                break;
            default:
                console.log('exit');
        }

        function onCliSuccess() {
            console.log('done');
            process.exit();
        }

        function onCliError(error) {
            console.error('ERROR:', error);
            process.exit(1);
        }
    }
};

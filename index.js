var MigrationProvider = require('./migration-provider');
var PgAdapter = require('./adapters/pg');
var createMigrationCommand = require('./commands/create-migration-command');
var runMigrationsCommand = require('./commands/run-migrations-command')
var rollbackMigrationCommand = require('./commands/rollback-migration-command');

var LOGGER = console;

function migrate(config) {
    var migrationProvider = MigrationProvider(config);
    var adapter = PgAdapter(config, LOGGER);
    return runMigrationsCommand(migrationProvider, adapter, config.minMigrationTime, LOGGER).then(function () {
        return adapter.dispose();
    }, function (error) {
        function rethrowOriginalError() {
            throw error;
        }
        return adapter.dispose().then(rethrowOriginalError, rethrowOriginalError);
    });
}

function rollback(config) {
    var migrationProvider = MigrationProvider(config);
    var adapter = PgAdapter(config, LOGGER);
    return rollbackMigrationCommand(migrationProvider, adapter, LOGGER).then(function () {
        return adapter.dispose();
    }, function (error) {
        function rethrowOriginalError() {
            throw error;
        }
        return adapter.dispose().then(rethrowOriginalError, rethrowOriginalError);
    });
}

module.exports = {
    setLogger: function (logger) {
        LOGGER = logger;
    },
    migrate: migrate,
    rollback: rollback,
    run: function (config) {
        var args = process.argv.slice(2);

        switch (args[0]) {
            case 'create':
                createMigrationCommand(config, LOGGER, args[1]);
                break;
            case 'migrate':
                migrate(config).then(onCliSuccess, onCliError);
                break;
            case 'rollback':
                rollback(config).then(onCliSuccess, onCliError);
                break;
            default:
                LOGGER.log('exit');
        }

        function onCliSuccess() {
            LOGGER.log('done');
            process.exit();
        }

        function onCliError(error) {
            LOGGER.error('ERROR:', error);
            process.exit(1);
        }
    }
};

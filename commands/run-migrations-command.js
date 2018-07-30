var chalk = require('chalk');

module.exports = function (migrationProvider, adapter, minMigrationTime, logger) {
    return adapter.appliedMigrations()
        .then(function (appliedMigrationIds) {
            var migrationsList = migrationProvider.getMigrationsList();
            var pending = getPending(migrationsList, appliedMigrationIds, minMigrationTime);

            if (pending.length === 0) {
                logger.log('No pending migrations');
                return;
            }

            logger.log('Pending migrations:');
            pending.forEach(function (m) {
                logger.log(chalk.green('>>'), m);
            });

            var migration;
            var migrationProgress = Promise.resolve();
            while (migration = pending.shift()) {
                (function (migration) {
                    migrationProgress = migrationProgress.then(function () {
                        var sql = migrationProvider.getSql(migration);
                        return adapter.applyMigration(migration, sql);
                    });
                })(migration);
            }
            return migrationProgress;
        });
};

function getPending(migrationsList, appliedMigrationIds, minMigrationTime) {
    var pending = [];
    migrationsList.forEach(function (migration) {
        var id = migration.match(/^(\d+)/)[0];
        if ((!minMigrationTime || id >= minMigrationTime) && !~appliedMigrationIds.indexOf(id) && migration.match(/^\d+\_up.*$/)) {
            pending.push(migration);
        }
    });
    return pending;
}

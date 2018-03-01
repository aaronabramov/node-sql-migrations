module.exports = function (migrationProvider, adapter, logger) {
    return adapter.appliedMigrations().then(function (ids) {
        var lastAppliedMigrationId = ids[ids.length - 1];

        if (!lastAppliedMigrationId) {
            logger.log('Nothing to rollback');
            return;
        }

        var migration = migrationProvider.getMigrationsList().find(function (migration) {
            var baseName = migration.match(/^(\d+)_down/);
            if (baseName && baseName[1] == lastAppliedMigrationId) {
                return true
            }
            return false;
        });

        if (!migration) {
            throw new Error('Can\'t find migration with id ', lastAppliedMigrationId);
        }

        var sql = migrationProvider.getSql(migration);
        return adapter.rollbackMigration(migration, sql);
    });
};

module.exports = function(cfg) {
    var adapter = require('../adapters/pg.js'),
        utils = require('../utils.js'),
        conn = utils.makeConnString(
            cfg.user,
            cfg.password,
            cfg.host,
            cfg.db
        );

    adapter.appliedMigrations(conn, function(ids) {
        var migrationsList = utils.getMigrationsList(cfg),
            pending = utils.getPending(migrationsList, ids);
        process.exit();
    });
};

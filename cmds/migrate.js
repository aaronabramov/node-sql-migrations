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
        console.log('ids', ids);
        process.exit();
    });
};

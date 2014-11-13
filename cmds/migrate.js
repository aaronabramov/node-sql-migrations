var cfg = require('../config.js');

module.exports = function() {
    var adapter = require('../adapters/pg.js'),
        utils = require('../utils.js');

    cfg.conn = utils.makeConnString();

    adapter.appliedMigrations(function(ids) {
        var migrationsList = utils.getMigrationsList(),
            pending = utils.getPending(migrationsList, ids);
        console.log(pending);
        process.exit();
    });
};

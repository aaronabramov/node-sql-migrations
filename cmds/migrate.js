var cfg = require('../config.js'),
    adapter = require('../adapters/pg.js'),
    utils = require('../utils.js');

module.exports = function() {

    cfg.conn = utils.makeConnString();

    adapter.appliedMigrations(function(ids) {
        var migrationsList = utils.getMigrationsList(),
            pending = utils.getPending(migrationsList, ids);
        if (pending.length) {
            console.log('Pending migrations:');
            pending.forEach(function(m) {
                console.log('\033[32m>>\033[0m', m);
            });
        } else {
            console.log('No pending migrations');
            process.exit();
        }

        function apply() {
            // base case
            if (!pending.length) {
                console.log('done');
                return process.exit();
            }
            adapter.applyMigration(pending.shift(), function() {
                // recur
                apply();
            });
        }

        apply();
    });
};

var cfg = require('../config.js');
var adapter = require('../adapters/pg.js');
var utils = require('../utils.js');
var chalk = require('chalk');

module.exports = function() {

    adapter.appliedMigrations(function(ids) {
        var migrationsList = utils.getMigrationsList(),
            pending = utils.getPending(migrationsList, ids);
        if (pending.length) {
            console.log('Pending migrations:');
            pending.forEach(function(m) {
                console.log(chalk.green('>>'), m);
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

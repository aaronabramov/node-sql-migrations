var cfg = require('../config.js'),
    adapter = require('../adapters/pg.js'),
    utils = require('../utils.js');

module.exports = function() {
    adapter.appliedMigrations(function(ids) {
        var id = ids[ids.length - 1],
            migration;
        console.log(id, ids);
        if (id) {
            utils.getMigrationsList().forEach(function(m) {
                var match = m.match(/^(\d+)_down/);
                if (match && match[1] == id) {
                    migration = m;
                }
            });
            if (!migration) {
                utils.panic(new Error('can\'t find migration with id ', id));
            }
            adapter.rollbackMigration(migration, function() {
                console.log('done');
                process.exit();
            });
        } else {
            console.log('Nothing to rollback');
            process.exit();
        }
    });
};

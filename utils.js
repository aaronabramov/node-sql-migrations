var fs = require('fs');
var path = require('path');
var cfg = require('./config.js');

module.exports = {
    panic: function(err) {
        console.error('ERROR:', err);
        process.exit(1);
    },
    getMigrationsList: function() {
        return fs.readdirSync(cfg.migrationsDir);
    },
    /**
     * @param {Array} migrationsList list of filenames
     * @param {Array<Number>} ids of applied migration from db table
     * @return {Array} of migration filenames that have not been applied
     */
    getPending: function(migrationsList, ids) {
        var pending = [];
        migrationsList.forEach(function(migration) {
            var id = migration.match(/^(\d+)/)[0];
            if (!~ids.indexOf(id) && migration.match(/^\d+\_up.*$/)) {
                pending.push(migration);
            }
        });
        return pending;
    },
    getSql: function(migration) {
        return fs.readFileSync(path.join(cfg.migrationsDir, migration)).toString();
    }
};

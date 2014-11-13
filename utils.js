var fs = require('fs');

module.exports = {
    makeConnString: function(user, password, host, db) {
        // TODO: database dependent
        var result = 'postgress://' + user;
        if (password) {
            result += ':' + password;
        }
        result += '@' + host + '/' + db;
        return result;
    },
    panic: function(err) {
        console.error('ERROR:', err);
        process.exit(1);
    },
    getMigrationsList: function(cfg) {
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
            if (!!~ids.indexOf(id) && migration.match(/^\d+\_up.*$/)) {
                pending.push(migration);
            }
        });
        return pending;
    }
};
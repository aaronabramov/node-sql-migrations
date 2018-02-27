var fs = require('fs');
var path = require('path');

module.exports = function (migrationsDir) {
    return {
        getMigrationsList: function () {
            return fs.readdirSync(migrationsDir);
        },
        /**
         * @param {Array} migrationsList list of filenames
         * @param {Array<Number>} ids of applied migration from db table
         * @return {Array} of migration filenames that have not been applied
         */

        getSql: function (migration) {
            return fs.readFileSync(path.join(migrationsDir, migration)).toString();
        }
    };
};

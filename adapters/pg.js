var pg = require('pg');

module.exports = function (config, logger) {
    var pool = new pg.Pool({
        host: config.host,
        port: config.port,
        database: config.db,
        user: config.user,
        password: config.password
    });

    function exec(query, values) {
        return pool.query(query, values).catch(function (err) {
            //add the sql line number to the error output if available
            if (err && err.position) {
                err.sql_line = (query.substring(0, err.position).match(/\n/g) || []).length + 1;
            }
            throw err;
        });
    }

    function ensureMigrationTableExists() {
        return exec('create table if not exists "__migrations__" (id bigint NOT NULL)');
    }

    return {
        appliedMigrations: function appliedMigrations() {
            return ensureMigrationTableExists().then(function () {
                return exec('select * from __migrations__');
            }).then(function (result) {
                return result.rows.map(function (row) { return row.id; });
            });
        },
        applyMigration: function applyMigration(migration, sql) {
            return exec(sql).then(function (result) {
                logger.log('Applying ' + migration);
                logger.log(result)
                logger.log('===============================================');
                var values = [migration.match(/^(\d)+/)[0]];
                return exec('insert into __migrations__ (id) values ($1)', values);
            });
        },
        rollbackMigration: function rollbackMigration(migration, sql) {
            return exec(sql).then(function (result) {
                logger.log('Reverting ' + migration);
                logger.log(result)
                logger.log('===============================================');
                var values = [migration.match(/^(\d)+/)[0]];
                return exec('delete from __migrations__ where id = $1', values);
            });
        },
        dispose: function dispose() {
            return pool.end();
        }
    };
};

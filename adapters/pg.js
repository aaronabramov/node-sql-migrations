var pg = require('pg'),
    cfg = require('../config.js'),
    utils = require('../utils.js'),
    ENSURE_SQL = 'create table if not exists "__migrations__" (id bigint NOT NULL)';



module.exports = {
    exec: function(query, values, cb) {
        cb || (cb = values);
        var client = new pg.Client({
          host: cfg.host,
          port: cfg.port,
          database: cfg.db,
          user: cfg.user,
          password: cfg.password
        });
        client.connect(function(err) {
            err && utils.panic(err);
            client.query(query, values, function(err, result) {
                //call `end()` to release the client back to the pool
                client.end()
                //add the sql line number to the error output if available
                if (err && err.position) {
                  err.sql_line = (query.substring(0, err.position).match(/\n/g) || []).length + 1;
                }
                err && utils.panic(err);
                cb(result);
            });
        });
    },
    appliedMigrations: function(cb) {
        this.ensureMigrationTableExists(function() {
            this.exec('select * from __migrations__', function(result) {
                cb(result.rows.map(function(row) {
                    return row.id;
                }));
            });
        }.bind(this));
    },
    applyMigration: function(migration, cb) {
        var sql = utils.getSql(migration);
        this.exec(sql, function(result) {
            console.log('Applying ' + migration);
            console.log(result)
            console.log('===============================================');
            var values = [migration.match(/^(\d)+/)[0]];
            this.exec(
                'insert into __migrations__ (id) values ($1)',
                values,
                cb
            );
        }.bind(this));
    },
    rollbackMigration: function(migration, cb) {
        var sql = utils.getSql(migration);
        this.exec(sql, function(result) {
            console.log('Reverting ' + migration);
            console.log(result)
            console.log('===============================================');
            var values = [migration.match(/^(\d)+/)[0]];
            this.exec(
                'delete from __migrations__ where id = $1',
                values,
                cb
            );
        }.bind(this));
    },
    ensureMigrationTableExists: function(cb) {
        this.exec(ENSURE_SQL, cb)
    }
};

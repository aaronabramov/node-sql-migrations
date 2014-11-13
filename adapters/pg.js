var pg = require('pg'),
    cfg = require('../config.js'),
    utils = require('../utils.js'),
    ENSURE_SQL = 'create table if not exists "__migrations__" (id bigint NOT NULL)';



module.exports = {
    exec: function(query, cb) {
        pg.connect(cfg.conn, function(err, client, done) {
            err && utils.panic(err);
            client.query(query, function(err, result) {
                //call `done()` to release the client back to the pool
                done();
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
            cb();
        });
    },
    rollbackMigration: function(id, cb) {},
    ensureMigrationTableExists: function(cb) {
        this.exec(ENSURE_SQL, cb)
    }
};

var pg = require('pg'),
    utils = require('../utils.js'),
    ENSURE_SQL = 'create table if not exists "__migrations__" (id bigint NOT NULL)';



module.exports = {
    exec: function(conn, query, cb) {
        pg.connect(conn, function(err, client, done) {
            err && utils.panic(err);
            client.query(query, function(err, result) {
                //call `done()` to release the client back to the pool
                done();
                err && utils.panic(err);
                cb(result);
            });
        });
    },
    appliedMigrations: function(conn, cb) {
        this.ensureMigrationTableExists(conn, function() {
            this.exec(conn, 'select * from __migrations__', function(result) {
                cb(result.rows.map(function(row) {
                    return row.id;
                }));
            });
        }.bind(this));
    },
    addMigration: function() {},
    removeMigration: function() {},
    ensureMigrationTableExists: function(conn, cb) {
        this.exec(conn, ENSURE_SQL, function(result) {
            cb(result);
        });
    }
};

var pg = require('pg');

module.exports = {
    exec: function(con, query, cb) {
        pg.connect(con, function(err, client, done) {
            if (err) {
                return console.error('error fetching client from pool', err);
            }
            client.query(query, function(err, result) {
                //call `done()` to release the client back to the pool
                done();

                if (err) {
                    return console.error('error running query', err);
                }
                console.log(result.rows[0]);
                //output: 1
            });
        });
    },
    appliedMigrations: function() {},
    addMigration: function() {},
    removeMigration: function() {}
};

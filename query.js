var pg = require('pg'),
    con = 'postgres://dabramov@localhost/esl_development',
    query = 'select 1;';

module.exports = function(con, query, cb) {
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
};

module.exports(con, query, function(err) {
    err ? console.error(err) : console.log('done');
});

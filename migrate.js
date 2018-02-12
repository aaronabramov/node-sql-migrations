var path = require('path');

require('./').run({
    basedir: __dirname,
    migrationsDir: path.resolve(__dirname, 'migrations'),
    user: 'dabramov',
    host: 'localhost',
    db: 'sql_migrations',
    password: 'pgpassword',
    port: 5432
});

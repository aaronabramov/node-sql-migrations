var path = require('path');

require('./').run({
    migrationsDir: path.resolve(process.cwd(), 'migrations'),
    user: 'dabramov',
    host: 'localhost',
    db: 'sql_migrations',
    password: 'pgpassword',
    port: 5432
});

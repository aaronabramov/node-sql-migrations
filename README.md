node-sql-migrations
===================

raw SQL migrations for node

### Example

In your project
```js
// migrate.js
var path = require('path');

require('sql_migrations').run({
    basedir: __dirname,
    migrationsDir: path.resolve(__dirname, 'migrations'),
    user: 'dabramov',
    host: 'localhost',
    password: 'password',
    db: 'sql_migrations'
});
```

### CLI
run `node ./migrate.js` with arguments

##### `node ./migrate create migration_name`
will create two migration files (up and down)
```
./migrations/1415860098827_up_migration_name.sql
./migrations/1415860098827_down_migration_name.sql
```


##### `node ./migrate migrate`
will run all pending migrations

##### `node ./migrate.js rollback`
will rollback the last migration if there is one

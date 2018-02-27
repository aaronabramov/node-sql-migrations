node-sql-migrations
===================

raw SQL migrations for node

### Example

In your project
```js
// migrate.js
var path = require('path');

require('sql-migrations').run({
    migrationsDir: path.resolve(__dirname, 'migrations'),
    user: 'dabramov',
    host: 'localhost',
    password: 'password',
    db: 'sql_migrations',
    port: 5432
});
```

### CLI
run `node ./migrate.js` with arguments

---

#### `node ./migrate create migration_name`
will create two migration files (up and down)
```
./migrations/1415860098827_up_migration_name.sql
./migrations/1415860098827_down_migration_name.sql
```

---

#### `node ./migrate migrate`
will run all pending migrations

---

#### `node ./migrate.js rollback`
will rollback the last migration if there is one

### Programmatic API
#### Migrate
In your project
```js
require('sql-migrations').migrate({
    migrationsDir: path.resolve(__dirname, 'migrations'),
    user: 'dabramov',
    host: 'localhost',
    password: 'password',
    db: 'sql_migrations',
    port: 5432
});
```
This returns a promise which resolves/rejects whenever the migration is complete.

#### Rollback
In your project
```js
require('sql-migrations').rollback({
    migrationsDir: path.resolve(__dirname, 'migrations'),
    user: 'dabramov',
    host: 'localhost',
    password: 'password',
    db: 'sql_migrations',
    port: 5432
});
```
This returns a promise which resolves/rejects whenever the rollback is complete.

### Migration files
write raw sql in your migrations
example
```sql
-- ./migrations/1415860098827_up_migration_name.sql
create table "test_table" (id bigint, name varchar(255));

```
```sql
-- ./migrations/1415860098827_down_migration_name.sql
drop table "test_table";
```

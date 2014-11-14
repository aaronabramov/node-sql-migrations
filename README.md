node-sql-migrations
===================

raw SQL migrations for node

### Example

In your project
```js
// migrate.js
var path = require('path');

require('sql-migrations').run({
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

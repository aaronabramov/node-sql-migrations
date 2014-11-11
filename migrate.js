var path = require('path');

require('./run.js')({
    basedir: __dirname,
    migrationsDir: path.resolve(__dirname, 'migrations')
});

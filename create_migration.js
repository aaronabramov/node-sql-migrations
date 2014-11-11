var fs = require('fs'),
    mkdirp = require('mkdirp'),
    path = require('path');

module.exports = function(cfg, migrationName) {
    var up, down,
        ts = Date.now();

    mkdirp.sync(cfg.migrationsDir);

    up = ts + '_up_' + migrationName + '.sql';
    down = ts + '_down_' + migrationName + '.sql';

    up = path.resolve(cfg.migrationsDir, up);
    down = path.resolve(cfg.migrationsDir, down);

    console.log(up);
    console.log(down);

    fs.openSync(up, 'w');
    fs.openSync(down, 'w');
};

var fs = require('fs'),
    mkdirp = require('mkdirp'),
    path = require('path');

module.exports = function (config, logger, migrationName) {
    var up, down,
        ts = Date.now();

    if (typeof config.migrationsDir !== 'string') {
        throw new Error('configuration "migrationsDir" is missing');
    }

    mkdirp.sync(config.migrationsDir);

    up = ts + '_up_' + migrationName + '.sql';
    down = ts + '_down_' + migrationName + '.sql';

    up = path.resolve(config.migrationsDir, up);
    down = path.resolve(config.migrationsDir, down);

    logger.log(up);
    logger.log(down);

    fs.openSync(up, 'w');
    fs.openSync(down, 'w');
};

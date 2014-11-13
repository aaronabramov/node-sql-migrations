module.exports = {
    makeConnString: function(user, password, host, db) {
        // TODO: database dependent
        var result = 'postgress://' + user;
        if (password) {
            result += ':' + password;
        }
        result += '@' + host + '/' + db;
        return result;
    },
    panic: function(err) {
        console.error('ERROR:', err);
        process.exit(1);
    }
};

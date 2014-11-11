module.exports = function(cfg) {

    var args = process.argv.slice(2);

    switch (args[0]) {
        case 'create':
            console.log('mya');
            break;
        default:
            console.log('mur');
    }
};

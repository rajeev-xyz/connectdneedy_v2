var nconf = require('nconf');

nconf.argv()
    .file({ file: './config.json' });

module.exports = nconf;
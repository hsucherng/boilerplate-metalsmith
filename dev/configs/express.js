const argv    = require('../custom-modules/argv.js');
let host = argv('host') ? argv('host') : 'localhost';
let expressPort = argv('port') ? Number(argv('port')) : 8080;
let liveReloadPort = argv('liveReloadPort') ? Number(argv('liveReloadPort')) : 35729;

module.exports = {
    host: host,
    port: expressPort,
    liveReloadPort: liveReloadPort,
};

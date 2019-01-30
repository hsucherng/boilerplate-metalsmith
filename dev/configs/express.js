const netstat = require('node-netstat');
const colors  = require('colors/safe');
const argv    = require('../custom-modules/argv.js');

let expressPort = argv('port') ? Number(argv('port')) : 8080;
let liveReloadPort = argv('liveReloadPort') ? Number(argv('liveReloadPort')) : 35729;

let expressPortConflict = false;
let expressPortReady = false;
let expressPortIncrementLimit = 5;
let expressPortIncrementCount = 0;
let liveReloadPortConflict = false;
let liveReloadPortReady = false;
let liveReloadPortIncrementLimit = 5;
let liveReloadPortIncrementCount = 0;

while(!expressPortReady) {
    netstat(
        {
            sync: true,
            filter: {
                local: {
                    port: expressPort
                }
            },
            done: () => {
                if(expressPortConflict) {
                    console.log(colors.yellow.bold(`Port ${expressPort} is already in use. Checking port ${expressPort+1} instead.`));
                    expressPort++;
                    expressPortIncrementCount++;
                    expressPortConflict = false;

                    if(expressPortIncrementCount >= expressPortIncrementLimit) {
                        console.log(colors.cyan.bold(`Reached increment limit. Ending at port ${expressPort}.`));
                        expressPortReady = true;
                    }
                } else {
                    expressPortReady = true;
                }
            }
        },
        () => {
            expressPortConflict = true;
            return false;
        }
    );
}

while(!liveReloadPortReady) {
    netstat(
        {
            sync: true,
            filter: {
                local: {
                    port: liveReloadPort
                }
            },
            done: () => {
                if(liveReloadPortConflict) {
                    console.log(colors.yellow.bold(`Port ${liveReloadPort} is already in use. Checking port ${liveReloadPort+1} instead.`));
                    liveReloadPort++;
                    liveReloadPortIncrementCount++;
                    liveReloadPortConflict = false;

                    if(liveReloadPortIncrementCount >= liveReloadPortIncrementLimit) {
                        console.log(colors.cyan.bold(`Reached increment limit. Ending at port ${liveReloadPort}.`));
                        liveReloadPortReady = true;
                    }
                } else {
                    liveReloadPortReady = true;
                }
            }
        },
        () => {
            liveReloadPortConflict = true;
            return false;
        }
    );
}

module.exports = {
    host: 'localhost',
    port: expressPort,
    liveReloadPort: liveReloadPort,
};
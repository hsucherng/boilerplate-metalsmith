/*
 * Set default metadata for plugins to consume.
 *
 *  .use(defaultMeta({
 *      'your-pattern-here': {
 *          prop: 'value'
 *      }
 *  }));
 */
const minimatch = require('minimatch');

module.exports = function(options) {
    const patterns = Object.keys(options);

    return function(files, metalsmith, done) {
        const fileKeys = Object.keys(files);

        patterns.forEach(function(patternStr) {
            const metaObj = options[patternStr];
            const metaKeys = Object.keys(metaObj);

            fileKeys
                .filter(function(keystr) {
                    return minimatch(keystr, patternStr);
                })
                .forEach(function(keystr) {
                    const file = files[keystr];

                    for(let i = 0; i < metaKeys.length; i++) {
                        if(typeof file[metaKeys[i]] === 'undefined') {
                            if(typeof metaObj[metaKeys[i]] === 'function') {
                                file[metaKeys[i]] = metaObj[metaKeys[i]](keystr, file, files, metalsmith);
                            } else {
                                file[metaKeys[i]] = metaObj[metaKeys[i]];
                            }
                        }
                    }
                });
        });

        done();
    }
};
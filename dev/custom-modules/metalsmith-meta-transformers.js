const minimatch = require('minimatch');

module.exports = function(metaTransformerFilepath) {
    let metaTransformers;

    return function(files, metalsmith, done) {
        let metaTransformers = require(metaTransformerFilepath);

        let filepaths = Object.keys(files);

        metaTransformers.forEach((metaTransformer) => {
            filepaths
                .filter(filepath => minimatch(filepath, metaTransformer.pattern))
                .forEach(filepath => {
                    metaTransformer.transform(filepath, files[filepath]);
                });
        });

        done();
    }
};

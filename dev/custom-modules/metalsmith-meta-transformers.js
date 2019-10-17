const minimatch = require('minimatch');

module.exports = function(metaTransformerFilepath) {
    let metaTransformers;

    return function(files, metalsmith, done) {
        let latestMetaTransformers = files[metaTransformerFilepath];

        if(latestMetaTransformers) {
            metaTransformers = eval(latestMetaTransformers.contents.toString());
        }

        if(!metaTransformers || !metaTransformers.length) {
            done();
            return;
        }

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
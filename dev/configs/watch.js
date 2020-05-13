const argv = require('../custom-modules/argv.js');
const expressConfig = require('./express.js');

module.exports = {
    paths: {
        "${source}/*": true,
        "${source}/!(assets)/**/*": true,
        "${source}/**/assets/!(js|scss)/**": true,
        "${source}/**/assets/js/**/*.js": "**/assets/js/**/*.js",
        "${source}/**/assets/scss/**/*.scss": "**/assets/scss/**/*.scss",
        "templates/**": "**/*.njk",
        "configs/meta-transformers.js": "**/*.njk",
    },
    livereload: expressConfig.liveReloadPort
};

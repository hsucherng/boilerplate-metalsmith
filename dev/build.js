/* Modules from npm */
const Metalsmith     = require('metalsmith');
const beautify       = require('metalsmith-beautify');
const cleanCss       = require('metalsmith-clean-css');
const copy           = require('metalsmith-copy');
const colors         = require('colors/safe');
const dataLoader     = require('metalsmith-data-loader');
const express        = require('metalsmith-express');
const filenames      = require('metalsmith-filenames'); // Not absolutely necessary, but it's useful metadata, especially for navigation
const inPlace        = require('metalsmith-in-place');
const minimatch      = require('minimatch');
const postcss        = require('metalsmith-with-postcss');
const postcssSCSS    = require('postcss-scss');
const sass           = require('metalsmith-sass');
const uglify         = require('metalsmith-uglify');
const watch          = require('metalsmith-watch');

/* Custom modules */
const argv               = require('./custom-modules/argv.js');
const jsPartials         = require('./custom-modules/metalsmith-js-partial.js');
const metaTransformers   = require('./custom-modules/metalsmith-meta-transformers.js');
const run                = require('./custom-modules/metalsmith-run.js');
const virtualFolder      = require('./custom-modules/metalsmith-virtual-folder.js');

/* Static configs */
const configs = {
        express:     require('./configs/express.js'),
        misc:        require('./configs/misc.js'),
        watch:       require('./configs/watch.js')
    };

/* Starting the entire build process */

if(!configs.misc.setupComplete) {
    console.log(colors.yellow.bold(`Before building, you must first complete the initial setup. You can do that by running ${ colors.green('node setup') }.`));
    return;
}

console.log(`\r\n${ colors.green.bold('Building...') }\r\n`);

/* Starting Metalsmith */

Metalsmith(__dirname)
    .source('src')
    .destination('build')

    /* Metadata */
    .use(dataLoader({
        removeSource: true
    }))
    .use(metaTransformers(__dirname + '/configs/meta-transformers.js'))

    /* CSS */
    .use(sass({
        outputStyle: "expanded",
        outputDir: function(originalPath) {
            return originalPath.replace('scss', 'css');
        },
        sourceMap: true,
        sourceMapContents: true
    }))
    .use(postcss({
        map: false,
        plugins: {
            "autoprefixer": {},
            "postcss-reporter": {
                throwError: true
            }
        },
    }))
    .use(copy({ // Making a copy...
        pattern: '**/*.css',
        extension: '.min.css'
    }))
    .use(cleanCss({ // ... so that we can minify it.
        files: '**/*.min.css',
        cleanCSS: {
            rebase: false
        }
    }))

    /* JS */
    .use(jsPartials())
    .use(uglify({
        uglify: {
            sourceMap: false
        }
    }))

    /* HTML */
    .use(filenames()) // Not absolutely necessary, but it's useful metadata, especially for navigation
    .use(inPlace({
        pattern: '**/*.njk',
        engineOptions: {
            path: __dirname + '/templates'
        },
        suppressNoFilesError: true
    }))
    .use(beautify({
        js: false,
        css: false,
        html: {
            wrap_line_length: 120
        }
    }))

    /* Virtual folder */
    .use(virtualFolder(configs.misc.virtualFolder))

    /* Watch and serve */
    .use(run({
        condition: function(files, metalsmith, done) {
            return !argv('--dist');
        },
        plugin: express(configs.express)
    }))
    .use(run({
        condition: function(files, metalsmith, done) {
            return !argv('--dist');
        },
        plugin: watch(configs.watch)
    }))

    /* END! */
    .build(function(err, files) {
        if(err) {
            console.error(colors.red(err));
            return;
        }

        console.log(`
${ colors.green.bold('Build complete!') }
 - Open your browser and navigate to ${ colors.yellow.bold(`http://${configs.express.host}:${configs.express.port}/${configs.misc.virtualFolder}`) } to view the site
`
        );
    });

# WEBSITE-NAME

This project uses [Metalsmith](http://metalsmith.io), and has been setup with the following:

- Third party plugins:
    - [Autoprefixer](https://github.com/postcss/autoprefixer)
    - [Express](https://github.com/chiefy/metalsmith-express) (which also comes with LiveReload)
    - [Nunjucks](https://mozilla.github.io/nunjucks/)
    - [SCSS](http://sass-lang.com/)
    - [Stylelint](https://stylelint.io/)
    - [Uglify](https://github.com/ksmithut/metalsmith-uglify)

- Custom-written functions:
    - Set default metadata for all source files.
    - A concatenation function to allow for the splitting of JavaScript files into smaller partial files.

## Initial setup

1. Make sure you have [NodeJS](http://nodejs.org) and [Yarn](http://yarnpkg.com/) installed. Currently tested with NodeJS v10.14.0 and Yarn v1.12.3.
2. Clone this repository onto your machine.
3. Open up the command-line and `cd` into this repository folder.
4. Run `yarn`. This should install all the required dependencies.
5. Double-click on `setup.bat` to run a basic initial setup.
6. You are now ready to start building. Double-click on `serve.bat`, then navigate to the full localhost path to view the site.

## Configurations

Check the files in the `configs` folder for the configurations that affect the build and its output.

### Default Meta

Just a note: metadata set in the page's YAML always take precedence over those set in `configs/default-meta.js`.

## Debugging notes

For certain plugins, we can get the build to log information in the console by setting the `DEBUG` environment variable.

On Windows, use the `set` command to set a value for the `DEBUG` environment variable. Setting it to `*` would turn on debugging for all configured plugins:

    set DEBUG=*

To turn on debugging for only one plugin, set its name as the value:

    set DEBUG=metalsmith-in-place

To turn off debugging, set the value to nothing:

    set DEBUG=
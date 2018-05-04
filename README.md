# Metalsmith boilerplate

The [Metalsmith](http://metalsmith.io) boilerplate has been setup with the following:

- Third party plugins:
    - [Autoprefixer](https://github.com/postcss/autoprefixer)
    - [Express](https://github.com/chiefy/metalsmith-express) (which also comes with LiveReload)
    - [Nunjucks](https://mozilla.github.io/nunjucks/)
    - [SCSS](http://sass-lang.com/)
    - [Stylelint](https://stylelint.io/)
    - [Uglify](https://github.com/ksmithut/metalsmith-uglify)

- Custom-written functions:
    - A slightly more elaborate setup to allow for the addition of default metadata to all the source files.
    - A concatenation function to allow for the splitting of JavaScript files into smaller partial files.

## Initial setup

1. Make sure you have [NodeJS](http://nodejs.org) and [Yarn](http://yarnpkg.com/) installed. Currently tested with NodeJS v6.9.3.
2. Clone this repository onto your machine.
3. Make a copy of this folder and paste it at where you want your development files to be.
4. Open up the CLI (command-line interface, e.g. cmd.exe) and `cd` into the fresh copy of the boilerplate folder.
5. Run `yarn`. This should install all the required dependencies.
6. Delete the `.git` folder that was cloned together with the boilerplate, then initialise the folder as a new Git repository.
7. You are now ready to start building.

Remember to change the `Website Title` in the `<title>` tag within the `templates/default.html` file, as well as `[Website Title]` in `src/assets/scss/style.scss` and `page.scss`.

## Build flow

To start the build, open up your CLI and `cd` into the folder. Then type `node build` and press enter to start the process, which does the following:

1. Deletes the existing `build` folder.
2. Starts up Metalsmith, which will compile all the necessary files into a *new* `build` folder.
3. Once the compilation is complete, the files are served up on localhost - it is `http://localhost:8080/site/` by default.

## Configurations

Check the files in the `configs` folder for the configurations that affect the build and its output.

### Default Meta

Just a note: metadata set in the page's YAML always take precedence over those set in `configs/default-meta.js`.

### Virtual Folder

The build has a "virtual folder" setup by default — basically, the build sends all the output files into the `virtualFolder` path that is set inside `configs/misc.js`. This is to allow for a more organised browser history.

So, for example, if you are developing a website called *The Jackson Five's*, you should change the value of the `virtualFolder` from `'site'` to `'the-jackson-fives'`. After that, your files will be served under `http://localhost:8080/the-jackson-fives/`, and will be distinct in your browser history.

To disable this, set the `virtualFolder` value to `''`.

## Debugging notes

For certain plugins, we can get the build to log information in the console by setting the `DEBUG` environment variable. Currently, in this build, it seems that `metalsmith-in-place` and `metalsmith-copy` have been setup for this behaviour.

On Windows, use the `set` command to set a value for the `DEBUG` environment variable. Setting it to `*` would turn on debugging for all configured plugins:

    set DEBUG=*

To turn on debugging for only one plugin, set its name as the value:

    set DEBUG=metalsmith-in-place

To turn off debugging, set the value to nothing:

    set DEBUG=
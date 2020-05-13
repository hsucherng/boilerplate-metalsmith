# WEBSITE-NAME

This boilerplate has been setup with the following:

- [Metalsmith](https://metalsmith.io/), with the following plugins:
    - [Autoprefixer](https://github.com/postcss/autoprefixer)
    - [Beautify](https://github.com/boushley/metalsmith-beautify) (only set up to beautify HTML)
    - [Express](https://github.com/chiefy/metalsmith-express) (which also comes with LiveReload)
    - [Nunjucks](https://mozilla.github.io/nunjucks/)
    - [SCSS](http://sass-lang.com/)
    - [Uglify](https://github.com/ksmithut/metalsmith-uglify)
    - Some custom functions:
        - A metadata transformation function for all source files.
        - A concatenation function to allow for the splitting of JavaScript files into smaller partial files.

- Settings for the following Sublime Text packages, recommended that you install them if you're on Sublime Text:
    - [SublimeLinter-stylelint](https://github.com/SublimeLinter/SublimeLinter-stylelint)
    - [sublime-postcss-sorting](https://github.com/hudochenkov/sublime-postcss-sorting)

## Initial setup

1. Make sure you have [NodeJS](http://nodejs.org) and [Yarn](http://yarnpkg.com/) installed. Currently tested with NodeJS v10.16.3 and Yarn v1.21.1.
2. Clone this repository onto your machine.
3. Open up the command-line and `cd` into this repository folder.
4. Run `yarn`. This should install all the required dependencies.
5. You are now ready to start building. Run `node build`, then navigate to the full localhost path to view the site.
    - Note that you may be prompted to run `node setup` first, if it is the very first time the project is being built.

## Notes

### YAML

Each page can have its own unique metadata through the YAML frontmatter. The format is typically as follows:

```
---
title: Home
subtitle: Welcome to Home
---

<p>Put your page contents here.</p>
```

Using the above example, inserting `{{ title }}` into your `.njk` file will then be replaced with `Home`, while inserting `{{ subtitle }}` will be replaced with `Welcome to Home`.

### Paths

There is a `path` object that you can use within the `.njk` files for page and asset URLs:

- `{{ path.root }}` leads to the root `src` folder.
- `{{ path.css }}` leads to the CSS folder.
- `{{ path.js }}` leads to the JS folder.
- `{{ path.images.base }}` leads to the base images folder.
- `{{ path.images.page }}` leads to the page images folder.
    - The value of this is dependent on the folder path and file name, e.g. if you are currently working on `about/creative-team/art-director.njk`, then `{{ path.images.page }}` will result in `{{ path.root }}assets/images/pages/about/creative-team/art-director/`.

This `path` object is setup using `configs/meta-transformers.js`. Feel free to edit it if you require additional path information.

## Additional configurations

Check the files in the `configs` folder for the configurations that affect the build and its output:

- `meta-transformers.js`: This is the metadata transformation config files for the project. The metadata that is set here are exposed for template usage, which comes in very handy for use with `.njk` files.
- `express.js`: This determines the `host` and `port` to serve your site on. By default it is set to `localhost:8080`.
- `misc.js`: Miscellaneous settings:
    - `setupComplete`: This boolean is used to determine whether we've run the `setup` command. Once the `setup` command is completed, this property will be updated accordingly.
    - `virtualFolderName`: This determines the final path that the site will be served on. Once the `setup` command is completed, this property will be updated accordingly.
- `watch.js`: This determines what files are watched, as well as how the files trigger rebuilds of other files whenever they are changed.

## Debugging notes

For certain plugins, we can get the build to log information in the console by setting the `DEBUG` environment variable.

On Windows, use the `set` command to set a value for the `DEBUG` environment variable. Setting it to `*` would turn on debugging for all configured plugins:

    set DEBUG=*

To turn on debugging for only one plugin, set its name as the value:

    set DEBUG=metalsmith-in-place

To turn off debugging, set the value to nothing:

    set DEBUG=

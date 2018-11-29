module.exports = {
    /*------------
        FORMAT
    --------------

    'minimatch-pattern': {
        'key': 'value',
        'key': function(filepath, file, files, metalsmith) {
            return 'value';
        }
    }

    */

    '**/*.njk': {
        path: function(filepath, file, files, metalsmith) {
            const rootPath = getRootPath(filepath);

            return {
                root: rootPath,
                css: rootPath + 'assets/css/',
                js: rootPath + 'assets/js/',

                images: {
                    base: rootPath + 'assets/images/',

                    /*
                     * Set the page's image folder based on its folder path and
                     * file name:
                     *
                     * - If folder path & file name = plans/prepaid/ultimate.njk,
                     *   then {{ path.images.page }} = {{ path.root }}assets/images/pages/plans/prepaid/ultimate/
                     *
                     * - If folder path & file name = about/team/index.njk,
                     *   then {{ path.images.page }} = {{ path.root }}assets/images/pages/about/team/index/
                     */
                    page: rootPath + 'assets/images/pages/' + filepath.replace(/\.(\w+)$/, '').replace(/\\/g, '/') + '/',
                }
            };
        }
    }
};

function getRootPath(filepath) {
    const splitFilepath = filepath.split('\\');
    let rootPath = '';

    for(let i = 0; i < splitFilepath.length-1; i++) {
        rootPath += '../';
    }

    return rootPath;
}
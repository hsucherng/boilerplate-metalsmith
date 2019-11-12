const path = require('path');

let imageBasePath = 'assets/images/pages/';

module.exports = [
    {
        pattern: '**/*.njk',

        transform: (filepath, file) => {
            let root = path.relative(path.dirname(filepath), './').split(path.sep).join('/');
            if(root) root += '/';

            let pathFormat = path.parse(filepath);
            let pageImagePath = imageBasePath + (pathFormat.dir ? pathFormat.dir + '/' : '') + pathFormat.name + '/';
            let pageParentImagePath = path.join(pageImagePath, '../').split(path.sep).join('/');

            file.path = {
                root,
                css: root + 'assets/css/',
                js: root + 'assets/js/',

                images: {
                    base: root + 'assets/images/',

                    /*
                     * Set the page's image folder based on its folder path and
                     * file name:
                     *
                     * - If folder path & file name = plans/prepaid/ultimate.njk,
                     *   then {{ path.images.page }} = {{ path.root }}assets/images/pages/plans/prepaid/ultimate/
                     *   and {{ path.images.pageParent }} = {{ path.root }}assets/images/pages/plans/prepaid/
                     *
                     * - If folder path & file name = about/team/index.njk,
                     *   then {{ path.images.page }} = {{ path.root }}assets/images/pages/about/team/index/
                     *   and {{ path.images.pageParent }} = {{ path.root }}assets/images/pages/about/team/
                     */
                    page: root + pageImagePath,
                    pageParent: root + pageParentImagePath
                }
            };
        }
    }
];
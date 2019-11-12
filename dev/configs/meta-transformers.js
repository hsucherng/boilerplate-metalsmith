module.exports = [
    {
        pattern: '**/*.njk',

        transform: (filepath, file) => {
            const splitFilepath = filepath.split('\\');
            let root = '';

            for(let i = 0; i < splitFilepath.length - 1; i++) {
                root += '../';
            }

            let pageImagePath = 'assets/images/pages/' + filepath.replace(/\.(\w+)$/, '').replace(/\\/g, '/') + '/';
            let splitPageImagePath = pageImagePath.split('/');
            let pageParentImagePath = 'assets/images/pages/';

            if(splitPageImagePath.length > 2) {
                pageParentImagePath = splitPageImagePath.slice(0, splitPageImagePath.length - 2).join('/') + '/';
            }

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
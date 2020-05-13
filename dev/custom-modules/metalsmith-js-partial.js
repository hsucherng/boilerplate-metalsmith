/*
 * Concatenate partial javascript files inline.
 *
 * Only applying it to Javascript files, because both Swig and SASS already
 * have ways to import partials.
 *
 * In the JavaScript file, use the following line:
 *
 *     //@js-partial "link/from/current/file/folder/file.ext"
 *
 * The entire partial file's contents will be receive indentation based on the
 * @z-concat line's indentation. To ignore that, add a - infront of the @:
 *
 *     //-@js-partial "link/from/current/file/folder/file.ext"
 *
 * Simlar to SASS, putting an underscore at the start of the partial file name
 * would remove it from the build output.
 *
 * Does NOT support nested concatenation.
 */
const minimatch = require('minimatch');

module.exports = function(options) {
    const regexp = /^([ \t]+)?\/\/(-)?@js-partial(.+)$/gm;

    return function(files, metalsmith, done) {
        const jsFiles = Object.keys(files).filter(function(filepath) {
                return minimatch(filepath, '**/*.js');
            });

        jsFiles.forEach(function(filepath) {
            const file = files[filepath];
            const splitFilepath = filepath.split('\\');
            const currentFolder = splitFilepath.slice(0, splitFilepath.length-1).join('\\');
            const fileContents = file.contents.toString();

            file.contents = fileContents.replace(regexp, function(matchStr, indentStr, ignoreIndent, argStr) {
                let targetFilepath;

                if(typeof indentStr === 'undefined') {
                    indentStr = '';
                }

                argStr = argStr.trim();

                const argStr__firstChar = argStr.charAt(0);
                const argStr__lastChar = argStr.charAt(argStr.length-1);

                if(argStr__firstChar === '"' && argStr__lastChar === '"'
                || argStr__firstChar === "'" && argStr__lastChar === "'") {
                    targetFilepath = argStr.substr(1, argStr.length-2);
                }

                if(targetFilepath) {
                    const splitTargetFilepath = targetFilepath.split('/');
                    const reverseSlashTargetFilepath = splitTargetFilepath.join('\\');
                    const targetFile = files[currentFolder + '\\' + reverseSlashTargetFilepath];

                    if(targetFile) {
                        let targetFileContents = targetFile.contents.toString();

                        if(ignoreIndent !== '-') {
                            targetFileContents = targetFileContents
                                .split('\n')
                                .map(function(contentStr) {
                                    return indentStr + contentStr;
                                })
                                .join('\n');
                        }

                        return targetFileContents;
                    } else {
                        let errorStr = `console.error('@js-partial ERROR: File "${currentFolder.replace(/[\\]/g, '/')}/${targetFilepath}" does not exist.');`;

                        if(ignoreIndent !== '-') {
                            errorStr = indentStr + errorStr;
                        }

                        return errorStr;
                    }
                }
            });
        });

        jsFiles
            .filter(function(filepath) {
                const splitFilepath = filepath.split('\\');
                const filename = splitFilepath[splitFilepath.length-1];

                return filename.charAt(0) === '_';
            })
            .forEach(function(filepath) {
                delete files[filepath];
            });

        done();
    }
};

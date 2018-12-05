var nsg = require('node-sprite-generator');

nsg({
    compositor: 'jimp',
    src: [
        './sprites/FILENAME/*.png'
    ],
    layout: 'packed',
    spritePath: './src/assets/images/ui/sprites/FILENAME.png',
    stylesheet: 'scss',
    stylesheetPath: './src/assets/scss/partials/generated/sprites/FILENAME.scss',
    stylesheetOptions: {
        prefix: 'FILENAME-',
        spritePath: '../images/ui/sprites/FILENAME.png'
    }
}, function (err) {
    if(err) {
        console.log('FULLNAME sprite error.');
        console.error(err);
    } else {
        console.log('FULLNAME sprite generated.');
    }
});
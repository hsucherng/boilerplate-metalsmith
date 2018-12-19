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
        console.log('FILENAME sprite error.');
        console.error(err);
    } else {
        console.log('FILENAME sprite generated.');
    }
});
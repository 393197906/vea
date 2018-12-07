const CFonts = require('cfonts');
module.exports = () => {
    CFonts.say('VEA', {
        font: 'simple',              // define the font face
        align: 'left',              // define text alignment
        colors: ['red', 'yellow', 'blue'],         // define all colors
        background: 'transparent',  // define the background color, you can also use `backgroundColor` here as key
        letterSpacing: 1,           // define letter spacing
        lineHeight: 1,              // define the line height
        space: false,                // define if the output text should have empty lines on top and on the bottom
        maxLength: '0',             // define how many character can be on one line
    });
}

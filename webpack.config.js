const path = require('path');

module.exports = {
    entry: './Game.js',
    output: {
        filename: 'game.js',
        path: path.resolve(__dirname, 'public')
    },
    mode: 'production'
};

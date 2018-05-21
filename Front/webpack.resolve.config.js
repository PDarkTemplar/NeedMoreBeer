const path = require('path');

module.exports = {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
        '~': 'src',
        'common-components': 'src/components',
        'mock-setup': 'mock-setup',
    },
    modules: [path.resolve(__dirname), 'node_modules'],
};

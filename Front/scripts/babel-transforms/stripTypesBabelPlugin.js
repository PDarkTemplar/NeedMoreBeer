module.exports = function stripTypes() {
    return {
        name: 'transform-remove-type-import',
        visitor: {
            ImportDeclaration(path) {
                const { node } = path;

                if (!node) return;

                const { value } = node.source;
                if (/[\\/]types[\\/]/.test(value)) {
                    path.remove();
                }
            },
        },
    };
};

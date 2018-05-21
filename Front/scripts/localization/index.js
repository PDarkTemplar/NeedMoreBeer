// @flow
import { echo } from 'shelljs';
import chalk from 'chalk';
import glob from 'glob';
import fs from 'fs-extra';
import prettier from 'prettier';

import constants from '../../src/constants';

const prettierOptions = {
    tabWidth: 4,
    singleQuote: true,
    trailingComma: 'es5',
    printWidth: 100,
    parser: 'babylon',
};

function camelCased(str: string) {
    return str.replace(/-([a-z])/g, g => g[1].toUpperCase());
}

function firstToLower(str: string) {
    return str && str[0].toLowerCase() + str.slice(1);
}

function search(): string[] {
    const ignore = ['**/__tests__/**', 'src/types/**'];

    echo(chalk.blue('Start searching files...'));

    const pathes = glob.sync('src/**/@(*.|*)en.json', { ignore });

    echo(chalk.yellow('Searching files completed'));

    return pathes;
}

function generateKeys(pathes: string[]) {
    echo(chalk.blue('Start generating keys...'));
    const generated = pathes.map(path => {
        const name = path.replace(/.*locales\//, '').replace(/(\.[a-z]*|[a-z]*)\.json$/, '');

        let namespace = firstToLower(
            path
                .replace(/src/, '')
                .replace(/\/locales.+/, '')
                .replace(/.+\//, '')
                .replace('.', '')
        );

        if (!namespace) {
            namespace = constants.localization.defaultNamespace;
        } else if (name) {
            namespace = firstToLower(name);
        }

        const data = JSON.parse(fs.readFileSync(path, 'utf8'));
        let locKeys = Object.keys(data);

        const isDefaultNamespace = namespace === constants.localization.defaultNamespace;

        locKeys = locKeys.map(x => x.replace(/(.*)(_\d*)/, '$1'));
        locKeys = [...new Set(locKeys)];

        const result = `${namespace}: {${locKeys
            .map(key => `${camelCased(key)}: "${isDefaultNamespace ? '' : `${namespace}:`}${key}"`)
            .join(',')}}`;

        return result;
    });

    echo(chalk.yellow('Generating keys completed'));

    return generated;
}

function generateFile(data: string[]) {
    return `// @flow\n// generated file\nexport default {${data.join(',')}};`;
}

function writeFile(data: string, filePath: string) {
    fs.writeFileSync(filePath, prettier.format(data, prettierOptions));
}

export default function build() {
    echo(chalk.green('Localization keys generator 1.0 started...'));

    const pathes = search();
    const keys = generateKeys(pathes);
    writeFile(generateFile(keys), 'src/constants/localization.js');
}

build();

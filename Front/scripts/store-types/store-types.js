// @flow
import { echo, exit } from 'shelljs';
import chalk from 'chalk';
import glob from 'glob-promise';
import deasync from 'deasync';
import fs from 'fs-extra';
import prettier from 'prettier';

import typesIndex from './types-index';
import globalStore from './global-store';

import type { Files } from './types';

import constants from './constants';

function search(): Files {
    echo(chalk.blue('Start searching files...'));

    const ignore = ['**/__tests__/**', 'src/types/**'];

    let domainModels = [];
    let viewModels = [];
    let services = [];

    const domainModelsPr = glob('src/**/domainModels/*.js', { ignore })
        .then(paths => {
            domainModels = paths;
        })
        .catch(er => {
            echo(chalk.red(`Error while parsing domainModel pathes. ${er}`));
            exit(1);
        });

    const viewModelsPr = glob('src/**/viewModels/*.js', { ignore })
        .then(paths => {
            viewModels = paths;
        })
        .catch(er => {
            echo(chalk.red(`Error while parsing viewModels pathes. ${er}`));
            exit(1);
        });

    const servicesPr = glob('src/**/services/*.js', { ignore })
        .then(paths => {
            services = paths.filter(x => !x.match(/^src\/services/));
        })
        .catch(er => {
            echo(chalk.red(`Error while parsing services pathes. ${er}`));
            exit(1);
        });

    let complete = false;
    Promise.all([servicesPr, viewModelsPr, domainModelsPr]).then(() => {
        complete = true;
    });

    deasync.loopWhile(() => !complete);

    echo(chalk.yellow('Searching files completed'));

    return {
        domainModels,
        viewModels,
        services,
    };
}

function writeFile(data: string, filePath: string) {
    fs.writeFileSync(filePath, prettier.format(data, constants.prettierOptions));
}

export default function build() {
    echo(chalk.green('Store type generator 1.0 started...'));
    echo('');

    const files = search();
    echo(chalk.blue('Start generating index...'));
    const indexData = typesIndex(files);
    echo(chalk.yellow('Generating index completed'));

    echo(chalk.blue('Start generating global store...'));
    const globalStoreData = globalStore(indexData.names);
    echo(chalk.yellow('Generating global store completed'));

    echo(chalk.blue('Start writing index...'));
    writeFile(indexData.data, 'src/types/stores.js');
    echo(chalk.yellow('Writing completed'));

    echo(chalk.blue('Start writing global store...'));
    writeFile(globalStoreData, 'src/types/globalStore.js');
    echo(chalk.yellow('Writing completed'));

    echo('');
    echo(chalk.green('Complete'));
}

build();

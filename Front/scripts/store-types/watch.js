// @flow
import chokidar from 'chokidar';
import { echo } from 'shelljs';
import chalk from 'chalk';

import storeTypes from './store-types';

let ready = false;

function add(filePath: string) {
    if (!ready) return;

    storeTypes();

    echo(chalk.blue(`File added: ${filePath}`));
}

function remove(filePath: string) {
    if (!ready) return;

    storeTypes();
    echo(chalk.blue(`File removed: ${filePath}`));
}

function start() {
    echo(chalk.yellow('Store type watching starting...'));

    const ignore = ['**/__tests__/**', 'src/types/**', 'src/services'];
    const watch = chokidar.watch(
        ['src/**/domainModels/*.js', 'src/**/viewModels/*.js', 'src/**/services/*.js'],
        { ignored: ignore }
    );

    watch
        .on('ready', () => {
            ready = true;
        })
        .on('add', add)
        .on('unlink', remove);

    echo(chalk.green('Store type watching started...'));
}

start();

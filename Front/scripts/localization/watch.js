// @flow
import chokidar from 'chokidar';
import { echo } from 'shelljs';
import chalk from 'chalk';

import build from './index';

let ready = false;

function add(filePath: string) {
    if (!ready) return;

    build();

    echo(chalk.blue(`File added: ${filePath}`));
}

function remove(filePath: string) {
    if (!ready) return;

    build();
    echo(chalk.blue(`File removed: ${filePath}`));
}

function change(filePath: string) {
    if (!ready) return;

    build();
    echo(chalk.blue(`File changed: ${filePath}`));
}

function start() {
    echo(chalk.yellow('Localization keys watching starting...'));

    const ignore = ['**/__tests__/**'];
    const watch = chokidar.watch(['src/**/locales/*.json'], { ignored: ignore });

    watch
        .on('ready', () => {
            ready = true;
        })
        .on('add', add)
        .on('change', change)
        .on('unlink', remove);

    echo(chalk.green('Store type watching started...'));
}

start();

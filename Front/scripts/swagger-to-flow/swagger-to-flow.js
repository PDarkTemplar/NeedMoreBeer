// @flow
import fs from 'fs';
import program from 'commander';
import prettier from 'prettier';
import request from 'request-promise-native';

import { stripBrackets, propertiesList, propertiesTemplate } from './common';

function generate(swagger: Object) {
    const g = Object.keys(swagger.definitions)
        .reduce((acc: Array<Object>, definitionName: string) => {
            const arr = acc.concat({
                title: stripBrackets(definitionName),
                properties: propertiesList(swagger.definitions[definitionName]),
            });
            return arr;
        }, [])
        .map(definition => {
            const s = `export type ${definition.title} = ${propertiesTemplate(
                definition.properties
            ).replace(/"/g, '')};`;
            return s;
        })
        .join(' ');
    return g;
}

function generator(url: string) {
    return request(url).then(body => {
        const doc = JSON.parse(body);
        const options = {
            tabWidth: 4,
            singleQuote: true,
            trailingComma: 'es5',
            printWidth: 100,
            parser: 'babylon',
        };
        const result = `// @flow\n// generated file\n${generate(doc)}`;
        return prettier.format(result, options);
    });
}

function writeToFile(dist: string = './flowtype.js', result: string) {
    fs.writeFile(dist, result, err => {
        if (err) {
            throw err;
        }
    });
}

program
    .arguments('<url>')
    .action(file => {
        try {
            generator(file).then(result => {
                writeToFile('./src/types/api.js', result);
                console.log('Generated flow types');
            });
        } catch (e) {
            console.log(e);
        }
    })
    .parse(process.argv);

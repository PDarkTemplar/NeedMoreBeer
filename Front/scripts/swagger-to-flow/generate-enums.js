// @flow
import fs from 'fs';
import program from 'commander';
import prettier from 'prettier';
import request from 'request-promise-native';

import { stripBrackets, propertiesList } from './common';

function formatStringProps(props: string) {
    return props
        .replace(/('| )/g, '')
        .split('|')
        .map(x => `${x}: '${x}'`)
        .join(',');
}

function formatArrayProps(props: Array<string>) {
    return props.map(e => `${e}: '${e}'`).join(',');
}

function firstToLower(str: string) {
    return str && str[0].toLowerCase() + str.slice(1);
}

function generateDefinitionEnums(swagger: Object) {
    return Object.keys(swagger.definitions)
        .reduce((acc: Array<Object>, definitionName: string) => {
            const arr = acc.concat({
                type: swagger.definitions[definitionName].type,
                enum: swagger.definitions[definitionName].enum,
                title: stripBrackets(definitionName),
                properties: propertiesList(swagger.definitions[definitionName]),
            });
            return arr;
        }, [])
        .filter(x => x.type === 'string' && x.enum)
        .map(x => `${firstToLower(x.title)}: {${formatStringProps(x.properties)}}`);
}

function generatePathParams(type: 'get' | 'post' | 'put' | 'delete', paths: Object, path: string) {
    const params = paths[path][type].parameters || [];
    return params
        .filter(x => (x.in === 'path' || x.in === 'query') && x.enum && x.type === 'string')
        .map(x => `${firstToLower(x['x-enum-name']) || x.name}: {${formatArrayProps(x.enum)}}`);
}

function generatePathEnums(swagger: Object) {
    const result = Object.keys(swagger.paths).map(path => {
        if (swagger.paths[path].get) {
            return generatePathParams('get', swagger.paths, path);
        }
        if (swagger.paths[path].post) {
            return generatePathParams('post', swagger.paths, path);
        }
        if (swagger.paths[path].put) {
            return generatePathParams('put', swagger.paths, path);
        }
        if (swagger.paths[path].delete) {
            return generatePathParams('delete', swagger.paths, path);
        }
        return undefined;
    });

    return [].concat(...result);
}

function generate(swagger: Object) {
    let enums = generateDefinitionEnums(swagger);
    enums = enums.concat(generatePathEnums(swagger));
    enums = [...new Set(enums)];

    return `export default {${enums.join(',')}}`;
}

const prettierOptions = {
    tabWidth: 4,
    singleQuote: true,
    trailingComma: 'es5',
    printWidth: 100,
    parser: 'babylon',
};

function generator(url: string) {
    return request(url).then(body => {
        const doc = JSON.parse(body);

        const result = `// @flow\n// generated file\n${generate(doc)}`;
        return prettier.format(result, prettierOptions);
    });
}

function writeToFile(destination: string, result: string) {
    fs.writeFile(destination, result, err => {
        if (err) {
            throw err;
        }
    });
}

program
    .arguments('<url>')
    .action(url => {
        try {
            generator(url).then(
                result => {
                    writeToFile('./src/constants/enums.js', result);
                    console.log('Generated enums');
                },
                e => {
                    throw Error(e);
                }
            );
        } catch (e) {
            console.log(e);
        }
    })
    .parse(process.argv);

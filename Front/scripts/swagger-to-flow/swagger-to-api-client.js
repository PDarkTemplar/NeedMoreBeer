// @flow
import fs from 'fs';
import program from 'commander';
import prettier from 'prettier';
import request from 'request-promise-native';

import { typeFor, typeForImport } from './common';

const apiImports = [];

function clearOperation(operationId: string) {
    return operationId.replace(/-[a-z]/g, x => x[1].toUpperCase());
}

function clearPath(path: string, params?: Array<Object>) {
    let internalPath = path.replace(/\\/, '');
    if (params) {
        const names = [];
        params.forEach(p => {
            const regexp = new RegExp(`{${p.name}}`);
            if (regexp.test(internalPath)) {
                names.push(p.name);
            }
            internalPath = internalPath.replace(regexp, `\${${p.name}}`);
        });

        let queryParams = params
            .filter(
                x =>
                    x.in === 'query' &&
                    !names.includes(x.name) &&
                    x.type !== 'array' &&
                    (x.type || x.schema)
            )
            .map(x => `${x.name}=\${${x.name}}`)
            .join('&');

        queryParams += params
            .filter(
                x =>
                    x.in === 'query' &&
                    !names.includes(x.name) &&
                    x.type === 'array' &&
                    (x.type || x.schema)
            )
            .map(x => `\${${x.name}.map(arr => \`&${x.name}=\${arr}\`).join('')}`)
            .join('');

        if (queryParams) {
            internalPath += '?';
            internalPath += queryParams;
        }
    }

    internalPath += '`';
    return internalPath;
}

function firstToLower(str: string) {
    return str && str[0].toLowerCase() + str.slice(1);
}

function generateHeader(
    type: 'get' | 'post' | 'put' | 'delete',
    operationId: string,
    parameters: Array<Object>,
    responses: Array<Object>
) {
    let header = `${firstToLower(clearOperation(operationId))}(`;

    const params = parameters
        .filter(x => ['path', 'body', 'query'].includes(x.in) && (x.type || x.schema))
        .map(x => {
            if (x.schema && x.schema.$ref) {
                apiImports.push(typeForImport(x.schema));
            }
            return `${x.name}: ${x.type ? typeFor(x) : typeFor(x.schema)}`;
        })
        .join(', ');
    header += params;

    if (params.length) {
        header += ', ';
    }

    header += 'options?: AxiosConfig';

    header += ')';

    // $FlowFixMe
    if (responses['200'] && responses['200'].schema) {
        // $FlowFixMe
        apiImports.push(typeForImport(responses['200'].schema));
        // $FlowFixMe
        header += `: FetchResponseType<${typeFor(responses['200'].schema)}>`;
    } else {
        header += `: FetchResponseType<void>`;
    }

    return header;
}

function getBodyParam(params: Array<Object>) {
    const body = params.find(x => x.in === 'body');
    if (body) {
        return body.name;
    }
    return 'undefined';
}

function generateBody(
    type: 'get' | 'post' | 'put' | 'delete',
    path: string,
    pathParams: Array<Object>,
    params: Array<Object>,
    withBodyPart?: boolean = false
) {
    let body = '{';

    body += `return this.globalStore.services.fetch.${type}(\`\${REST_UI_URL}${clearPath(
        path,
        pathParams
    )}`;

    if (withBodyPart) {
        body += `, ${getBodyParam(params)}`;
    }

    body += ', options';
    body += ');';

    body += '}\n\n';

    return body;
}

function generateMethod(
    type: 'get' | 'post' | 'put' | 'delete',
    paths: Object,
    path: string,
    withBodyPart?: boolean = false
) {
    const params = paths[path][type].parameters || [];
    const pathParams = params.filter(x => ['path', 'query'].includes(x.in));

    const header = generateHeader(
        type,
        paths[path][type].operationId,
        params,
        paths[path][type].responses
    );

    const body = generateBody(type, path, pathParams, params, withBodyPart);

    return header + body;
}

function generate(swagger: Object) {
    const result = Object.keys(swagger.paths).map(path => {
        let methodResult = '';
        if (swagger.paths[path].get) {
            methodResult += generateMethod('get', swagger.paths, path, false);
        }
        if (swagger.paths[path].post) {
            methodResult += generateMethod('post', swagger.paths, path, true);
        }
        if (swagger.paths[path].put) {
            methodResult += generateMethod('put', swagger.paths, path, true);
        }
        if (swagger.paths[path].delete) {
            methodResult += generateMethod('delete', swagger.paths, path, false);
        }

        return methodResult || undefined;
    });

    return result.filter(x => x).join(' ');
}

function classDescription(data: string) {
    let file = '// @flow\n';
    file += '// generated file\n';
    file += "import type {GlobalStore} from '~/types/globalStore';\n";
    file += "import {FetchResponseType, AxiosConfig} from '~/types/fetch';\n";
    file += `import type {${[...new Set(apiImports)]
        .filter(x => x)
        .join(', ')}} from '~/types/api';\n\n`;
    file += 'class ApiClient {\n';
    file += 'globalStore: GlobalStore;\n\n';
    file += 'constructor(globalStore: GlobalStore){this.globalStore = globalStore;}\n\n';
    file += data;
    file += '\n}\n\n';
    file += 'export default ApiClient;';
    return file;
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

        const result = classDescription(generate(doc));

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
                    writeToFile('./src/stores/services/ApiClient.js', result);
                    console.log('Generated client api');
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

// @flow
import type { StoreType } from './types';

const storeTypes = {
    viewModels: 'viewModels',
    domainModels: 'domainModels',
    services: 'services',
};

const storePostfix = {
    view: 'View',
    domain: 'Domain',
    service: 'Service',
};

function addPostfix(name: string, type: StoreType) {
    switch (type) {
        case storeTypes.viewModels:
            return `${name}${storePostfix.view}`;
        case storeTypes.services:
            return `${name}${storePostfix.service}`;
        case storeTypes.domainModels:
            return `${name}${storePostfix.domain}`;
        default:
            return '';
    }
}

function removePostfix(name: string, type: StoreType) {
    switch (type) {
        case storeTypes.viewModels:
            return name.replace(storePostfix.view, '');
        case storeTypes.services:
            return name.replace(storePostfix.service, '');
        case storeTypes.domainModels:
            return name.replace(storePostfix.domain, '');
        default:
            return name;
    }
}

export default {
    firstToUpper: (str: string) => str && str[0].toUpperCase() + str.slice(1),
    firstToLower: (str: string) => str && str[0].toLowerCase() + str.slice(1),
    addPostfix,
    removePostfix,
    storeTypes,
    storePostfix,
    prettierOptions: {
        tabWidth: 4,
        singleQuote: true,
        trailingComma: 'es5',
        printWidth: 100,
        parser: 'babylon',
    },
};

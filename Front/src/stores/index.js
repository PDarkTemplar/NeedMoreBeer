import { firstToLower } from '~/utils';
import { observable, action } from 'mobx';

function importAll(modules, globalStore) {
    const cache = {};
    modules.keys().forEach(key => {
        // eslint-disable-next-line
        let mod = new (modules(key)).default();
        if (globalStore) {
            // eslint-disable-next-line
            mod = new (modules(key)).default(globalStore);
        }
        cache[firstToLower(key.replace(/^.*\//, '').replace(/\.js$/, ''))] = mod;
    });

    return cache;
}

function importDomainModels() {
    return require.context(
        '~',
        true,
        /(components|stores|scenes).*\/domainModels\/(?!(__tests__|__mocks__)).*\.js$/
    );
}

function importViewModels() {
    return require.context(
        '~',
        true,
        /(components|stores|scenes).*\/viewModels\/(?!(__tests__|__mocks__)).*\.js$/
    );
}

function importServices() {
    return require.context(
        '~',
        true,
        /(components|stores|scenes).*\/services\/(?!(__tests__|__mocks__)).*\.js$/
    );
}

export default new class {
    @observable domainModels = importAll(importDomainModels());
    @observable viewModels = importAll(importViewModels());
    @observable services = importAll(importServices(), this);

    constructor() {
        this.afterInit();
    }

    afterInit() {
        Object.keys(this.services).forEach(key => {
            if (this.services[key].afterInit) {
                this.services[key].afterInit();
            }
        });
    }

    @action
    reset() {
        this.domainModels = importAll(importDomainModels());
        this.viewModels = importAll(importViewModels());
        this.services = importAll(importServices(), this);

        this.afterInit();
    }
}();

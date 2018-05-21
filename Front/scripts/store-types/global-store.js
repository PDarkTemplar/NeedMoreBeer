// @flow
import type { ImportName, StoreType } from './types';

import constants from './constants';

function generateImports(imports: ImportName[]) {
    return imports.map(x => `import type { ${x.exportName} } from '~/types/stores';`);
}

function generateStoreObject(imports: ImportName[], type: StoreType) {
    const storeModels = imports.filter(x => x.type === type).map(x => x.exportName);
    let data = `type ${constants.firstToUpper(type)} = {\n`;
    data += storeModels
        .map(x => `${constants.firstToLower(constants.removePostfix(x, type))}: ${x}`)
        .join(',\n');
    data += '};';

    return data;
}

function generateGlobalStore() {
    let data =
        'export interface GlobalStore {\n' +
        `${constants.storeTypes.domainModels}: ${constants.firstToUpper(
            constants.storeTypes.domainModels
        )};\n` +
        `${constants.storeTypes.viewModels}: ${constants.firstToUpper(
            constants.storeTypes.viewModels
        )};\n` +
        `${constants.storeTypes.services}: ${constants.firstToUpper(
            constants.storeTypes.services
        )};\n` +
        'reset(): void;\n' +
        '}\n';

    data += 'export type GlobalStoreInjected = {\nglobalStore: GlobalStore,\n};\n';

    return data;
}

export default function create(imports: ImportName[]) {
    let data = '// @flow\n// generated file\n';
    data += generateImports(imports).join('\n');
    data += generateStoreObject(imports, constants.storeTypes.domainModels);
    data += generateStoreObject(imports, constants.storeTypes.services);
    data += generateStoreObject(imports, constants.storeTypes.viewModels);
    data += generateGlobalStore();

    return data;
}

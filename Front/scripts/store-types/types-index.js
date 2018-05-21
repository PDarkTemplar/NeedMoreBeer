// @flow
import path from 'path';
import type { Files, StoreType } from './types';

import constants from './constants';

function createReexportPath(filePath: string, type: StoreType) {
    const fn = path.basename(filePath, '.js');
    const exportName = constants.addPostfix(fn, type);
    return {
        exportString: `export type { default as ${exportName} } from '${filePath
            .replace('src', '~')
            .replace('.js', '')}';`,
        exportName: { exportName, type },
    };
}

export default function create(files: Files) {
    let data = '// @flow\n// generated file\n';

    const domainModelsImports = files.domainModels.map(x =>
        createReexportPath(x, constants.storeTypes.domainModels)
    );

    const servicesImports = files.services.map(x =>
        createReexportPath(x, constants.storeTypes.services)
    );

    const viewModelsImports = files.viewModels.map(x =>
        createReexportPath(x, constants.storeTypes.viewModels)
    );

    data += domainModelsImports.map(x => x.exportString).join('\n');
    data += servicesImports.map(x => x.exportString).join('\n');
    data += viewModelsImports.map(x => x.exportString).join('\n');

    const names = [
        ...domainModelsImports.map(x => x.exportName),
        ...servicesImports.map(x => x.exportName),
        ...viewModelsImports.map(x => x.exportName),
    ];

    return {
        data,
        names,
    };
}

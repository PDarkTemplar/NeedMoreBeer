// @flow
import type { Message } from '~/types/localization';

import { firstToLower } from '~/utils';
import constants from '~/constants';

function merge(modules: Object) {
    const localization = [];
    modules.keys().forEach(key => {
        // eslint-disable-next-line
        // $FlowFixMe
        const mod = modules(key);

        const name = key.replace(/.*locales\//, '').replace(/(\.[a-z]*|[a-z]*)\.json$/, '');

        let namespace = firstToLower(
            key
                .replace(/\/locales.+/, '')
                .replace(/.+\//, '')
                .replace('.', '')
        );
        const moduleLocalization: Message = { data: {}, namespace: '' };

        if (!namespace) {
            namespace = constants.localization.defaultNamespace;
        } else if (name) {
            namespace = firstToLower(name);
        }

        moduleLocalization.namespace = namespace;
        moduleLocalization.data = {};

        Object.keys(mod).forEach(moduleKey => {
            moduleLocalization.data[moduleKey] = mod[moduleKey];
        });

        localization.push(moduleLocalization);
    });

    return localization;
}

export default merge;
